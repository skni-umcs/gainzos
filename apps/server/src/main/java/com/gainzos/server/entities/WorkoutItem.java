package com.gainzos.server.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "workout_items")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class WorkoutItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @Column(name = "exercise_id", nullable = false)
    private Exercise exercise;

    @Column(name = "sets", nullable = false)
    private Integer sets;

    @Column(name = "reps", nullable = false)
    private Integer reps;

    @Column(name = "duration_seconds", nullable = false)
    private Integer durationSeconds;

    @Column(name = "rest_time_seconds", nullable = false)
    private Integer restTimeSeconds;

    @Column(name = "weight", nullable = true)
    private Double weight;
}
