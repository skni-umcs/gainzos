package com.gainzos.server.dto;

import java.time.LocalDateTime;

public record UserDTO(
        Long id,
        String username,
        String email,
        String password, 
        String role,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}
