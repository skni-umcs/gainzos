package com.gainzos.server.services;

import com.gainzos.server.dto.WorkoutDTO;
import com.gainzos.server.entities.User;
import com.gainzos.server.entities.Workout;
import com.gainzos.server.entities.WorkoutTemplate;
import com.gainzos.server.mappers.WorkoutMapper;
import com.gainzos.server.repository.UserRepository;
import com.gainzos.server.repository.WorkoutRepository;
import com.gainzos.server.repository.WorkoutTemplateRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class WorkoutService {

    private final WorkoutRepository workoutRepository;
    private final UserRepository userRepository;
    private final WorkoutTemplateRepository workoutTemplateRepository;
    private final WorkoutMapper workoutMapper;

    public List<WorkoutDTO> getAll() {
        return workoutRepository.findAll().stream()
                .map(workoutMapper::toDTO)
                .toList();
    }

    public List<WorkoutDTO> getByUserId(Long userId) {
        return workoutRepository.findAllByUserId(userId).stream()
                .map(workoutMapper::toDTO)
                .toList();
    }

    public WorkoutDTO getById(Long id) {
        Workout workout = workoutRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Workout with id " + id + " not found"));
        return workoutMapper.toDTO(workout);
    }

    public WorkoutDTO addWorkout(WorkoutDTO dto) {
        if (dto.userId() == null || dto.workoutTemplateId() == null) {
            throw new IllegalArgumentException("User ID and Workout Template ID are required");
        }

        User user = userRepository.findById(dto.userId())
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        WorkoutTemplate template = workoutTemplateRepository.findById(dto.workoutTemplateId())
                .orElseThrow(() -> new EntityNotFoundException("Workout template not found"));

        Workout workout = Workout.builder()
                .user(user)
                .workoutTemplate(template)
                .volume(dto.volume())
                .duration(dto.duration())
                .build();

        Workout saved = workoutRepository.save(workout);
        return workoutMapper.toDTO(saved);
    }

    public WorkoutDTO updateWorkout(WorkoutDTO dto) {
        if (dto.id() == null) {
            throw new IllegalArgumentException("Workout ID is required for update");
        }

        Workout workout = workoutRepository.findById(dto.id())
                .orElseThrow(() -> new EntityNotFoundException("Workout with id " + dto.id() + " not found"));

        workout.setVolume(dto.volume());
        workout.setDuration(dto.duration());

        Workout updated = workoutRepository.save(workout);
        return workoutMapper.toDTO(updated);
    }

    public void deleteWorkout(Long id) {
        if (!workoutRepository.existsById(id)) {
            throw new EntityNotFoundException("Workout with id " + id + " not found");
        }
        workoutRepository.deleteById(id);
    }
}