package com.gainzos.server.services;

import com.gainzos.server.dto.ExercisesTypeDTO;
import com.gainzos.server.entities.ExercisesType;
import com.gainzos.server.entities.Media;
import com.gainzos.server.mappers.ExercisesTypeMapper;
import com.gainzos.server.repository.ExercisesTypeRepository;
import com.gainzos.server.repository.MediaRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ExercisesTypeService {
    private final ExercisesTypeRepository exercisesTypeRepository;
    private final ExercisesTypeMapper exercisesTypeMapper;
    private final MediaRepository mediaRepository;
    private final FileStorageService fileStorageService;
    
    public List<ExercisesTypeDTO> getAll() {
        return exercisesTypeRepository.findAll()
                .stream()
                .map(exercisesTypeMapper::toDTO)
                .toList();
    }

    public ExercisesTypeDTO getById(Long id) {
        ExercisesType et = exercisesTypeRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Exercise type not found: " + id));
        return exercisesTypeMapper.toDTO(et);
    }

    public ExercisesTypeDTO addExercisesType(ExercisesTypeDTO dto) {
        ExercisesType entity = new ExercisesType();
        entity.setName(dto.name());

        if (dto.image() != null && dto.image().id() != null) {
            Media media = mediaRepository.findById(dto.image().id())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Media not found: " + dto.image().id()));
            entity.setImage(media);
        }

        ExercisesType saved = exercisesTypeRepository.save(entity);
        return exercisesTypeMapper.toDTO(saved);
    }

    public ExercisesTypeDTO updateExercisesType(ExercisesTypeDTO dto) {
        ExercisesType entity = exercisesTypeRepository.findById(dto.id())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Exercise type not found: " + dto.id()));

        entity.setName(dto.name());

        if (dto.image() == null) {
            entity.setImage(null);
        } else if (dto.image().id() != null) {
            Media media = mediaRepository.findById(dto.image().id())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Media not found: " + dto.image().id()));
            entity.setImage(media);
        }

        ExercisesType updated = exercisesTypeRepository.save(entity);
        return exercisesTypeMapper.toDTO(updated);
    }

    public void deleteExercisesType(Long id) {
        ExercisesType type = exercisesTypeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Type with id " + id + " not found"));

        try {
            if (type.getImage() != null && type.getImage().getUrl() != null) {
                fileStorageService.delete(type.getImage().getUrl());
            }
        } catch (Exception ex) {
            System.err.println("Error deleting type image: " + ex.getMessage());
        }
        exercisesTypeRepository.delete(type);
    }

}
