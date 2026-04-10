package com.gainzos.server.mappers;

import com.gainzos.server.dto.WorkoutItemDTO;
import com.gainzos.server.entities.WorkoutItem;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = { ExercisesMapper.class })
public interface WorkoutItemMapper {

    @Mapping(target = "exercise", source = "exercise", qualifiedByName = "exerciseToDTO")
    WorkoutItemDTO toDTO(WorkoutItem entity);

    @Mapping(target = "exercise", ignore = true)
    WorkoutItem toEntity(WorkoutItemDTO dto);
}