package com.gainzos.server.mappers;

import com.gainzos.server.dto.WorkoutDTO;
import com.gainzos.server.entities.Workout;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface WorkoutMapper {

    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "workoutTemplate.id", target = "workoutTemplateId")
    WorkoutDTO toDTO(Workout entity);

    @Mapping(target = "user", ignore = true)
    @Mapping(target = "workoutTemplate", ignore = true)
    Workout toEntity(WorkoutDTO dto);
}