package com.gainzos.server.mappers;

import com.gainzos.server.dto.ExercisesTypeDTO;
import com.gainzos.server.dto.MediaDTO;
import com.gainzos.server.entities.ExercisesType;
import javax.annotation.processing.Generated;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-03-08T23:21:38+0100",
    comments = "version: 1.5.5.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-9.3.1.jar, environment: Java 25.0.2 (Oracle Corporation)"
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
