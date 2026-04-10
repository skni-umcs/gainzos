package com.gainzos.server.dto;


public record WorkoutItemDTO(
                Long id,
                ExerciseDTO exercise,
                Integer sets,
                Integer reps,
                Integer durationSeconds,
                Integer restTimeSeconds,
                Double weight) {
}