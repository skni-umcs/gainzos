package com.gainzos.server.mappers;

import com.gainzos.server.dto.MediaDTO;
import com.gainzos.server.entities.Media;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-03-08T23:21:38+0100",
    comments = "version: 1.5.5.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-9.3.1.jar, environment: Java 25.0.2 (Oracle Corporation)"
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
