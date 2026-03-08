package com.gainzos.server.services;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import com.gainzos.server.repository.ExerciseRepository;
import com.gainzos.server.repository.ExercisesTypeRepository;
import com.gainzos.server.repository.MediaRepository;
import com.gainzos.server.entities.Exercise;
import com.gainzos.server.entities.ExercisesType;
import com.gainzos.server.entities.Media;
import com.gainzos.server.dto.ExerciseDTO;
import com.gainzos.server.mappers.ExercisesMapper;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ExerciseService {

    private final ExerciseRepository exerciseRepository;
    private final ExercisesMapper exercisesMapper;
    private final ExercisesTypeRepository exercisesTypeRepository;
    private final MediaRepository mediaRepository;
    private final FileStorageService fileStorageService;

    public List<ExerciseDTO> getAll() {
        return exerciseRepository.findAll().stream()
                .map(exercisesMapper::toDTO)
                .toList();
    }

    public ExerciseDTO getById(Long id) {
        Exercise e = exerciseRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Exercise with id " + id + " not found"));
        return exercisesMapper.toDTO(e);
    }

    public ExerciseDTO getByName(String name) {
        Exercise e = exerciseRepository.findByNameIgnoreCaseContaining(name)
                .orElseThrow(() -> new EntityNotFoundException("Exercise with name " + name + " not found"));
        return exercisesMapper.toDTO(e);
    }

    public List<ExerciseDTO> getByType(Long typeId) {
        return exerciseRepository.findByExerciseType_Id(typeId).stream()
                .map(exercisesMapper::toDTO)
                .toList();
    }

    public ExerciseDTO addExercise(ExerciseDTO dto) {
        System.out.println(dto);
        Long typeId = dto.exercisesType() != null ? dto.exercisesType().id() : null;
        if (typeId == null) throw new EntityNotFoundException("ExerciseType id is required");
        ExercisesType type = exercisesTypeRepository.findById(typeId)
                .orElseThrow(() -> new EntityNotFoundException("ExerciseType with id " + typeId + " not found"));

        Exercise e = new Exercise();
        e.setName(dto.name());
        e.setDescription(dto.description());
        e.setExerciseType(type);

        if (dto.image() != null && dto.image().id() != null) {
            Media image = mediaRepository.findById(dto.image().id())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Media not found: " + dto.image().id()));
            e.setImage(image);
        }
        if (dto.video() != null && dto.video().id() != null) {
            Media video = mediaRepository.findById(dto.video().id())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Media not found: " + dto.video().id()));
            e.setVideo(video);
        }
        Exercise saved = exerciseRepository.save(e);
        return exercisesMapper.toDTO(saved);
    }

    public ExerciseDTO updateExercise(ExerciseDTO dto) {
        if (dto.id() == null) throw new IllegalArgumentException("Exercise id is required for update");

        Exercise e = exerciseRepository.findById(dto.id())
                .orElseThrow(() -> new EntityNotFoundException("Exercise with id " + dto.id() + " not found"));

        e.setName(dto.name());
        e.setDescription(dto.description());

        if (dto.exercisesType() != null && dto.exercisesType().id() != null) {
            ExercisesType type = exercisesTypeRepository.findById(dto.exercisesType().id())
                    .orElseThrow(() -> new EntityNotFoundException("ExerciseType with id " + dto.exercisesType().id() + " not found"));
            e.setExerciseType(type);
        }
        if (dto.image() == null) {
            e.setImage(null);
        } else if (dto.image().id() != null) {
            Media image = mediaRepository.findById(dto.image().id())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Media not found: " + dto.image().id()));
            e.setImage(image);
        }
        if (dto.video() == null) {
            e.setVideo(null);
        } else if (dto.video().id() != null) {
            Media video = mediaRepository.findById(dto.video().id())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Media not found: " + dto.video().id()));
            e.setVideo(video);
        }
        Exercise saved = exerciseRepository.save(e);
        return exercisesMapper.toDTO(saved);
    }

    public void deleteExercise(Long id) {
        Exercise e = exerciseRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Exercise with id " + id + " not found"));
        try {
            if (e.getImage() != null && e.getImage().getUrl() != null) {
                fileStorageService.delete(e.getImage().getUrl());
            }
            if (e.getVideo() != null && e.getVideo().getUrl() != null) {
                fileStorageService.delete(e.getVideo().getUrl());
            }
        } catch (Exception ex) {
            System.err.println("Error deleting media file: " + ex.getMessage());
        }
        exerciseRepository.delete(e);
    }
}
