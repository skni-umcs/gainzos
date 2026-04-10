package com.gainzos.server.services;

import com.gainzos.server.dto.WorkoutItemDTO;
import com.gainzos.server.dto.WorkoutTemplateDTO;
import com.gainzos.server.entities.Exercise;
import com.gainzos.server.entities.User;
import com.gainzos.server.entities.WorkoutItem;
import com.gainzos.server.entities.WorkoutTemplate;
import com.gainzos.server.mappers.WorkoutTemplateMapper;
import com.gainzos.server.repository.ExerciseRepository;
import com.gainzos.server.repository.UserRepository;
import com.gainzos.server.repository.WorkoutTemplateRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WorkoutTemplateService {

    private final WorkoutTemplateRepository workoutTemplateRepository;
    private final UserRepository userRepository;
    private final ExerciseRepository exerciseRepository;
    private final WorkoutTemplateMapper workoutTemplateMapper;

    public List<WorkoutTemplateDTO> getAllPublic() {
        return workoutTemplateRepository.findAllByIsPublicTrue().stream()
                .map(workoutTemplateMapper::toDTO)
                .toList();
    }

    public List<WorkoutTemplateDTO> getByOwnerId(Long ownerId) {
        return workoutTemplateRepository.findAllByOwnerId(ownerId).stream()
                .map(workoutTemplateMapper::toDTO)
                .toList();
    }

    public WorkoutTemplateDTO getById(Long id) {
        WorkoutTemplate template = workoutTemplateRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Template not found: " + id));
        return workoutTemplateMapper.toDTO(template);
    }

    public WorkoutTemplateDTO addTemplate(WorkoutTemplateDTO dto) {
        if (dto.ownerId() == null) {
            throw new IllegalArgumentException("Owner ID is required");
        }

        User owner = userRepository.findById(dto.ownerId())
                .orElseThrow(() -> new EntityNotFoundException("User not found: " + dto.ownerId()));

        List<WorkoutItem> items = buildWorkoutItems(dto.items());

        WorkoutTemplate template = WorkoutTemplate.builder()
                .name(dto.name())
                .description(dto.description())
                .muscleGroups(dto.muscleGroups())
                .owner(owner)
                .isPublic(dto.isPublic())
                .items(items)
                .build();

        WorkoutTemplate saved = workoutTemplateRepository.save(template);
        return workoutTemplateMapper.toDTO(saved);
    }

    public WorkoutTemplateDTO updateTemplate(WorkoutTemplateDTO dto) {
        if (dto.id() == null) {
            throw new IllegalArgumentException("Template ID is required for update");
        }

        WorkoutTemplate template = workoutTemplateRepository.findById(dto.id())
                .orElseThrow(() -> new EntityNotFoundException("Template not found: " + dto.id()));

        template.setName(dto.name());
        template.setDescription(dto.description());
        template.setMuscleGroups(dto.muscleGroups());
        template.setIsPublic(dto.isPublic());

        WorkoutTemplate updated = workoutTemplateRepository.save(template);
        return workoutTemplateMapper.toDTO(updated);
    }

    public void deleteTemplate(Long id) {
        if (!workoutTemplateRepository.existsById(id)) {
            throw new EntityNotFoundException("Template not found: " + id);
        }
        workoutTemplateRepository.deleteById(id);
    }

    private List<WorkoutItem> buildWorkoutItems(List<WorkoutItemDTO> itemDTOs) {
        if (itemDTOs == null)
            return new java.util.ArrayList<>();

        return itemDTOs.stream().map(itemDto -> {
            Exercise exercise = exerciseRepository.findById(itemDto.exercise().id())
                    .orElseThrow(() -> new EntityNotFoundException("Exercise not found: " + itemDto.exercise().id()));

            return WorkoutItem.builder()
                    .exercise(exercise)
                    .sets(itemDto.sets())
                    .reps(itemDto.reps())
                    .durationSeconds(itemDto.durationSeconds())
                    .restTimeSeconds(itemDto.restTimeSeconds())
                    .weight(itemDto.weight())
                    .build();
        }).collect(Collectors.toList());
    }
}