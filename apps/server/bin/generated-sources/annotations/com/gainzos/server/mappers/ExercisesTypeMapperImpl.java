package com.gainzos.server.mappers;

import com.gainzos.server.dto.ExercisesTypeDTO;
import com.gainzos.server.dto.MediaDTO;
import com.gainzos.server.entities.ExercisesType;
import javax.annotation.processing.Generated;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-03-08T18:20:42+0100",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.45.0.v20260224-0835, environment: Java 21.0.10 (Eclipse Adoptium)"
)
@Component
public class ExercisesTypeMapperImpl implements ExercisesTypeMapper {

    @Autowired
    private MediaMapper mediaMapper;

    @Override
    public ExercisesTypeDTO toDTO(ExercisesType exercisesType) {
        if ( exercisesType == null ) {
            return null;
        }

        Long id = null;
        String name = null;
        MediaDTO image = null;

        id = exercisesType.getId();
        name = exercisesType.getName();
        image = mediaMapper.toDTO( exercisesType.getImage() );

        ExercisesTypeDTO exercisesTypeDTO = new ExercisesTypeDTO( id, name, image );

        return exercisesTypeDTO;
    }

    @Override
    public ExercisesType toEntity(ExercisesTypeDTO exercisesTypeDTO) {
        if ( exercisesTypeDTO == null ) {
            return null;
        }

        ExercisesType.ExercisesTypeBuilder exercisesType = ExercisesType.builder();

        exercisesType.id( exercisesTypeDTO.id() );
        exercisesType.name( exercisesTypeDTO.name() );
        exercisesType.image( mediaMapper.toEntity( exercisesTypeDTO.image() ) );

        return exercisesType.build();
    }
}
