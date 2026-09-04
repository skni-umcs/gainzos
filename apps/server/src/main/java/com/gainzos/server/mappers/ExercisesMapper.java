package com.gainzos.server.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.gainzos.server.dto.ExerciseDTO;
import com.gainzos.server.entities.Exercise;

@Mapper(componentModel = "spring", uses = {MediaMapper.class, ExercisesTypeMapper.class})
public interface ExercisesMapper {
    @Mapping(source = "exerciseType", target = "exercisesType", qualifiedByName = "toDTO")
    ExerciseDTO toDTO(Exercise exercise);

    @Mapping(source = "exercisesType", target = "exerciseType", qualifiedByName = "toEntity")
    Exercise toEntity(ExerciseDTO exerciseDTO);

    @Mapping(target = "image", ignore = true)
    @Mapping(target = "video", ignore = true)
    ExerciseDTO toDTONoMedia(Exercise exercise);
}