package com.gainzos.server.mappers;

import com.gainzos.server.dto.WorkoutTemplateDTO;
import com.gainzos.server.entities.WorkoutTemplate;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {WorkoutItemMapper.class})
public interface WorkoutTemplateMapper {

    @Mapping(source = "owner.id", target = "ownerId")
    WorkoutTemplateDTO toDTO(WorkoutTemplate entity);

    @Mapping(target = "owner", ignore = true)
    WorkoutTemplate toEntity(WorkoutTemplateDTO dto);
}