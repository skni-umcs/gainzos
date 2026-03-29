package com.gainzos.server.dto;

import java.time.LocalDateTime;

public record WorkoutDTO(
        Long id,
        Long userId,
        Long workoutTemplateId,
        String volume,
        Integer duration, 
        LocalDateTime createdAt
) {}