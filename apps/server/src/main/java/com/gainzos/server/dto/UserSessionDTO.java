package com.gainzos.server.dto;

public record UserSessionDTO(
        String email,
        String role,
        String username
) {
}
