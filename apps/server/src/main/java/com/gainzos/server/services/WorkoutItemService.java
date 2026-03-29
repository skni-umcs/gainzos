package com.gainzos.server.services;

import com.gainzos.server.dto.WorkoutItemDTO;
import com.gainzos.server.entities.Exercise;
import com.gainzos.server.entities.WorkoutItem;
import com.gainzos.server.entities.WorkoutTemplate;
import com.gainzos.server.mappers.WorkoutItemMapper;
import com.gainzos.server.repository.ExerciseRepository;
import com.gainzos.server.repository.WorkoutItemRepository;
import com.gainzos.server.repository.WorkoutTemplateRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class WorkoutItemService {

    private final WorkoutItemRepository workoutItemRepository;
    private final ExerciseRepository exerciseRepository;
    private final WorkoutTemplateRepository workoutTemplateRepository;
    private final WorkoutItemMapper workoutItemMapper;

    public WorkoutItemDTO getById(Long id) {
        WorkoutItem item = workoutItemRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Workout item with id " + id + " not found"));
        return workoutItemMapper.toDTO(item);
    }
    public WorkoutItemDTO addItemToTemplate(Long templateId, WorkoutItemDTO dto) {
        WorkoutTemplate template = workoutTemplateRepository.findById(templateId)
                .orElseThrow(() -> new EntityNotFoundException("Template not found: " + templateId));

        Exercise exercise = exerciseRepository.findById(dto.exerciseId())
                .orElseThrow(() -> new EntityNotFoundException("Exercise not found: " + dto.exerciseId()));

        WorkoutItem newItem = WorkoutItem.builder()
                .exercise(exercise)
                .sets(dto.sets())
                .reps(dto.reps())
                .durationSeconds(dto.durationSeconds())
                .restTimeSeconds(dto.restTimeSeconds())
                .weight(dto.weight())
                .build();

        template.getItems().add(newItem);
        workoutTemplateRepository.save(template);
        return workoutItemMapper.toDTO(newItem); 
    }

    public WorkoutItemDTO updateItem(WorkoutItemDTO dto) {
        if (dto.id() == null) {
            throw new IllegalArgumentException("WorkoutItem ID is required for update");
        }

        WorkoutItem item = workoutItemRepository.findById(dto.id())
                .orElseThrow(() -> new EntityNotFoundException("Workout item not found: " + dto.id()));

        if (dto.exerciseId() != null && !dto.exerciseId().equals(item.getExercise().getId())) {
            Exercise exercise = exerciseRepository.findById(dto.exerciseId())
                    .orElseThrow(() -> new EntityNotFoundException("Exercise not found: " + dto.exerciseId()));
            item.setExercise(exercise);
        }

        item.setSets(dto.sets());
        item.setReps(dto.reps());
        item.setDurationSeconds(dto.durationSeconds());
        item.setRestTimeSeconds(dto.restTimeSeconds());
        item.setWeight(dto.weight());

        WorkoutItem saved = workoutItemRepository.save(item);
        return workoutItemMapper.toDTO(saved);
    }

    public void deleteItem(Long itemId) {
        if (!workoutItemRepository.existsById(itemId)) {
            throw new EntityNotFoundException("Workout item not found: " + itemId);
        }
        workoutItemRepository.deleteById(itemId);
    }
}