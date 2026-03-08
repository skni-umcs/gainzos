package com.gainzos.server.dto;
public record UserPostDTO(
        Long id,
        String username,
        String email,
        String password
) {}
