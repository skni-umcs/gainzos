package com.gainzos.server.dto;

public record UserDTO(
        Long id,
        String username,
        String email,
        String password,
        String role,
        java.time.LocalDateTime createdAt
) {
}
