package com.gainzos.server.mappers;

import com.gainzos.server.dto.WorkoutItemDTO;
import com.gainzos.server.entities.WorkoutItem;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface WorkoutItemMapper {

    @Mapping(source = "exercise.id", target = "exerciseId")
    WorkoutItemDTO toDTO(WorkoutItem entity);

    @Mapping(target = "exercise", ignore = true)
    WorkoutItem toEntity(WorkoutItemDTO dto);
}