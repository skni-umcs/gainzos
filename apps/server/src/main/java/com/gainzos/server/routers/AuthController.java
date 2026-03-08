package com.gainzos.server.routers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.web.bind.annotation.*;
import com.gainzos.server.services.UserService;
import com.gainzos.server.dto.UserPostDTO;
import com.gainzos.server.dto.UserResponseDTO;
import java.util.Map;

@RestController
@RequestMapping("auth")
@RequiredArgsConstructor
@Tag(name = "Authentication", description = "Endpoints for user authentication and registration")
public class AuthController {

    private final UserService userService;

    @PostMapping("/register")
    @Operation(summary = "Register a new user", description = "Create a new user account with the provided details")
    public ResponseEntity<?> registerUser(@RequestBody UserPostDTO userDTO) {
        try {
            UserResponseDTO registeredUser = userService.registerUser(userDTO);
            return ResponseEntity.ok(registeredUser);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/login")
    @Operation(summary = "Login user", description = "Authenticate user and create a session")
    public ResponseEntity<?> loginUser(@RequestBody UserPostDTO userDTO, HttpServletRequest request,
            HttpServletResponse response) {
        try {
            UserResponseDTO loggedInUser = userService.loginUser(userDTO);

            HttpSession session = request.getSession(true);

            request.changeSessionId();

            session.setAttribute("email", loggedInUser.email());

            SecurityContext context = SecurityContextHolder.getContext();
            session.setAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY, context);

            return ResponseEntity.ok(Map.of(
                    "user", loggedInUser,
                    "message", "Login successful"));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/logout")
    @Operation(summary = "Logout user", description = "Invalidate user session and logout")
    public ResponseEntity<?> logoutUser(HttpServletRequest request, HttpServletResponse response) {
        HttpSession session = request.getSession(false);

        if (session != null) {
            session.invalidate();
        }

        Cookie cookie = new Cookie("JSESSIONID", null);
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        cookie.setMaxAge(0);
        response.addCookie(cookie);

        return ResponseEntity.ok(Map.of("message", "Logout successful"));
    }

    @GetMapping("/session")
    @Operation(summary = "Check user session", description = "Check if the current JSESSIONID is valid and return user details")
    public ResponseEntity<?> sessionValidation(HttpServletRequest request, Authentication authentication,
            @RequestParam(required = false) boolean detailed) {

        HttpSession session = request.getSession(false);

        if (session == null || authentication == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of(
                            "status", HttpStatus.UNAUTHORIZED.value(),
                            "message", "No valid session"));
        }

        SecurityContext ctx = (SecurityContext) session.getAttribute(
                HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY);

        if (ctx == null || ctx.getAuthentication() == null || !ctx.getAuthentication().isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of(
                            "status", HttpStatus.UNAUTHORIZED.value(),
                            "message", "No valid session"));
        }

        String authority = authentication.getAuthorities().stream()
                .findFirst()
                .map(Object::toString)
                .orElse("N/A");

        if (detailed) {
            return ResponseEntity.ok(Map.of(
                    "status", HttpStatus.OK.value(),
                    "message", "Session is valid",
                    "session", Map.of(
                            "username", authentication.getName(),
                            "authority", authority,
                            "sessionId", session.getId(),
                            "email", session.getAttribute("email"))));
        } else {
            return ResponseEntity.ok(Map.of(
                    "status", HttpStatus.OK.value(),
                    "message", "Session is valid"));
        }
    }

}
