package com.gainzos.server.mappers;

import com.gainzos.server.dto.ExerciseDTO;
import com.gainzos.server.dto.ExercisesTypeDTO;
import com.gainzos.server.dto.MediaDTO;
import com.gainzos.server.entities.Exercise;
import javax.annotation.processing.Generated;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-03-08T18:20:48+0100",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.45.0.v20260224-0835, environment: Java 21.0.10 (Eclipse Adoptium)"
)
@Component
public class ExercisesMapperImpl implements ExercisesMapper {

    @Autowired
    private MediaMapper mediaMapper;
    @Autowired
    private ExercisesTypeMapper exercisesTypeMapper;

    @Override
    public ExerciseDTO toDTO(Exercise exercise) {
        if ( exercise == null ) {
            return null;
        }

        ExercisesTypeDTO exercisesType = null;
        Long id = null;
        String name = null;
        String description = null;
        MediaDTO image = null;
        MediaDTO video = null;

        exercisesType = exercisesTypeMapper.toDTO( exercise.getExerciseType() );
        id = exercise.getId();
        name = exercise.getName();
        description = exercise.getDescription();
        image = mediaMapper.toDTO( exercise.getImage() );
        video = mediaMapper.toDTO( exercise.getVideo() );

        ExerciseDTO exerciseDTO = new ExerciseDTO( id, name, description, exercisesType, image, video );

        return exerciseDTO;
    }

    @Override
    public Exercise toEntity(ExerciseDTO exerciseDTO) {
        if ( exerciseDTO == null ) {
            return null;
        }

        Exercise.ExerciseBuilder exercise = Exercise.builder();

        exercise.exerciseType( exercisesTypeMapper.toEntity( exerciseDTO.exercisesType() ) );
        exercise.id( exerciseDTO.id() );
        exercise.name( exerciseDTO.name() );
        exercise.description( exerciseDTO.description() );
        exercise.image( mediaMapper.toEntity( exerciseDTO.image() ) );
        exercise.video( mediaMapper.toEntity( exerciseDTO.video() ) );

        return exercise.build();
    }
}
