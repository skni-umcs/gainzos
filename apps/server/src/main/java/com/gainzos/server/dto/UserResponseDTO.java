package com.gainzos.server.dto;

public record UserResponseDTO(
        Long id,
        String username,
        String email,
        String role,
        java.time.LocalDateTime createdAt
) {}