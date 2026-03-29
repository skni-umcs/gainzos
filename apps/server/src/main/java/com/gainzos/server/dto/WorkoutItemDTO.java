package com.gainzos.server.dto;

public record WorkoutItemDTO(
        Long id,
        Long exerciseId,
        Integer sets,
        Integer reps,
        Integer durationSeconds,
        Integer restTimeSeconds,
        Double weight
) {}