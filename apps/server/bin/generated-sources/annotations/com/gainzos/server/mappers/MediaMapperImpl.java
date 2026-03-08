package com.gainzos.server.mappers;

import com.gainzos.server.dto.MediaDTO;
import com.gainzos.server.entities.Media;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-03-08T18:20:37+0100",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.45.0.v20260224-0835, environment: Java 21.0.10 (Eclipse Adoptium)"
)
@Component
public class MediaMapperImpl implements MediaMapper {

    @Override
    public MediaDTO toDTO(Media media) {
        if ( media == null ) {
            return null;
        }

        Long id = null;
        String url = null;

        id = media.getId();
        url = media.getUrl();

        MediaDTO mediaDTO = new MediaDTO( id, url );

        return mediaDTO;
    }

    @Override
    public Media toEntity(MediaDTO mediaDTO) {
        if ( mediaDTO == null ) {
            return null;
        }

        Media.MediaBuilder media = Media.builder();

        media.id( mediaDTO.id() );
        media.url( mediaDTO.url() );

        return media.build();
    }
}
