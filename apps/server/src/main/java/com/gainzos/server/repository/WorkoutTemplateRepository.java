package com.gainzos.server.repository;

import com.gainzos.server.entities.WorkoutTemplate;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WorkoutTemplateRepository extends JpaRepository<WorkoutTemplate, Long> {
    List<WorkoutTemplate> findAllByOwnerId(Long ownerId);
    List<WorkoutTemplate> findAllByIsPublicTrue();
}