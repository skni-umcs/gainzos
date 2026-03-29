package com.gainzos.server.repository;

import com.gainzos.server.entities.Workout;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WorkoutRepository extends JpaRepository<Workout, Long> {
    List<Workout> findAllByUserId(Long userId);
    List<Workout> findAllByWorkoutTemplateId(Long templateId);
}