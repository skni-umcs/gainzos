package com.gainzos.server.entities;

import jakarta.persistence.*;
import lombok.*;
import com.gainzos.server.enums.MuscleGroup;

@Entity
@Table(name = "exercises")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class Exercise {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "exercise_type_id", nullable = false)
    private ExercisesType exerciseType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "image_id")
    private Media image;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "video_id")
    private Media video;
}