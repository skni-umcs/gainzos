package com.gainzos.server.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.gainzos.server.entities.Exercise;
import java.util.List;
import java.util.Optional;

public interface ExerciseRepository extends JpaRepository<Exercise, Long> {
    public List<Exercise> findByExerciseType_Id(Long id);
    public Optional<Exercise> findByNameIgnoreCaseContaining(String name);
}