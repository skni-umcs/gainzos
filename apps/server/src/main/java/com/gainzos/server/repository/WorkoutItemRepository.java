package com.gainzos.server.repository;

import com.gainzos.server.entities.WorkoutItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkoutItemRepository extends JpaRepository<WorkoutItem, Long> {
}