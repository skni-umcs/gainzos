package com.gainzos.server.mappers;

import com.gainzos.server.dto.MediaDTO;
import com.gainzos.server.entities.Media;
import org.mapstruct.Mapper;
import org.springframework.beans.factory.annotation.Value;

@Mapper(componentModel = "spring")
public abstract class MediaMapper {

    @Value("${media.base-url}")
    protected String baseUrl;

    public MediaDTO toDTO(Media media) {
        if (media == null) return null;
        return new MediaDTO(media.getId(), baseUrl + "/files/" + media.getPath());
    }

    public abstract Media toEntity(MediaDTO mediaDTO);
}
