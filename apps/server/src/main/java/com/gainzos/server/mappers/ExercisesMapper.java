package com.gainzos.server.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;


import com.gainzos.server.dto.ExerciseDTO;

import com.gainzos.server.entities.Exercise;


@Mapper(componentModel = "spring", uses = { MediaMapper.class, ExercisesTypeMapper.class })
public interface ExercisesMapper {

    @Mapping(target = "exercisesType", ignore = true)
    ExerciseDTO toDTO(Exercise exercise);

    @Mapping(target = "image", ignore = true)
    @Mapping(target = "video", ignore = true)
    @Mapping(target = "exercisesType", ignore = true)
    ExerciseDTO toDTONoMedia(Exercise exercise);
}