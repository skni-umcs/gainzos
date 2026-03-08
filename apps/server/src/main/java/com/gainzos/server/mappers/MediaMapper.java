package com.gainzos.server.mappers;


import com.gainzos.server.dto.MediaDTO;
import com.gainzos.server.entities.Media;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MediaMapper {
    MediaDTO toDTO(Media media);
    Media toEntity(MediaDTO mediaDTO);
}
