package com.gainzos.server.routers;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.gainzos.server.services.UserService;

import lombok.RequiredArgsConstructor;

import com.gainzos.server.dto.UserDTO;
import org.springframework.web.bind.annotation.RequestBody;
import com.gainzos.server.dto.UserSessionDTO;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;

    @GetMapping("/validate")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<UserSessionDTO> validate(Authentication authentication) {
        var userSession = userService.getSession(authentication.getName());
        return ResponseEntity.ok(userSession);
    }

    @PostMapping("/register")
    public ResponseEntity<Void> register(@Valid @RequestBody UserDTO userDTO) {
        userService.register(userDTO);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/me")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<UserSessionDTO> getMe(Authentication authentication) {
        var userSession = userService.getSession(authentication.getName());
        return ResponseEntity.ok(userSession);
    }

}