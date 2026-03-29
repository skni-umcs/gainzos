package com.gainzos.server.routers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.gainzos.server.services.UserService;
import com.gainzos.server.dto.UserDTO;
import org.springframework.http.HttpStatus;
import com.gainzos.server.dto.UserSessionDTO;

import java.util.List;


// Cross Origin to change according to frontend address
@RestController
@RequestMapping("user")
@RequiredArgsConstructor
@Tag(name = "Users", description = "Endpoints for user management")
public class UserController {

  private final UserService userService;

  @GetMapping("/getAll")
  @Operation(summary = "Get all users", description = "Retrieve a list of all registered users")
  public ResponseEntity<List<UserDTO>> getAllUsers() {
    List<UserDTO> users = userService.getAll();
    return ResponseEntity.ok(users);
  }
  @PostMapping("/register")
    @Operation(summary = "Register a new user", description = "Creates a new user account")
    public ResponseEntity<String> registerUser(@RequestBody UserDTO userDTO) {
        userService.register(userDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully");
    }

    @GetMapping("/session")
    @Operation(summary = "Get user session", description = "Retrieves session data for a given email")
    public ResponseEntity<UserSessionDTO> getSession(@RequestParam String email) {
        // W prawdziwej aplikacji email prawdopodobnie będziesz wyciągać z tokenu JWT (np. z obiektu Principal)
        return ResponseEntity.ok(userService.getSession(email));
    }
}


