package com.gainzos.server.routers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.gainzos.server.services.UserService;
import com.gainzos.server.dto.UserResponseDTO;

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
  public ResponseEntity<List<UserResponseDTO>> getAllUsers() {
    List<UserResponseDTO> users = userService.getAll();
    return ResponseEntity.ok(users);
  }
}


