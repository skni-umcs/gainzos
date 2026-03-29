package com.gainzos.server.dto;

import com.gainzos.server.enums.MuscleGroup;
import java.util.List;

public record WorkoutTemplateDTO(
        Long id,
        String name,
        String description,
        MuscleGroup[] muscleGroups,
        Long ownerId,
        Boolean isPublic,
        List<WorkoutItemDTO> items
) {}