package com.gainzos.server.mappers;
import org.mapstruct.Mapper;

import com.gainzos.server.dto.ExercisesTypeDTO;
import com.gainzos.server.entities.ExercisesType;

@Mapper(componentModel = "spring", uses = {MediaMapper.class})
public interface ExercisesTypeMapper {
    ExercisesTypeDTO toDTO(ExercisesType exercisesType);
    ExercisesType toEntity(ExercisesTypeDTO exercisesTypeDTO);
    @Mapping(target = "image", ignore = true)
    ExercisesTypeDTO toDTONoMedia(ExercisesType entity);
}
