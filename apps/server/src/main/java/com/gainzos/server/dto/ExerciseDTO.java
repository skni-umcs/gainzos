package com.gainzos.server.dto;

import com.gainzos.server.enums.MuscleGroup;

public record ExerciseDTO(
        Long id,
        String name,
        String description,
        String force,
        MuscleGroup primaryMuscle,
        MuscleGroup secondaryMuscle,
        ExercisesTypeDTO exercisesType,
        MediaDTO image,
        MediaDTO video
        ) {}