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
    @Column(name = "id")
    private Long id;

    @Column(name = "name", nullable = false, length = 255)
    private String name;

    @Column(name = "description", nullable = false, length = 255)
    private String description;

    @Column(name = "force", nullable = false, length = 50)
    private String force;

    @Column(name = "primary_muscle", nullable = false, length = 50)
    private MuscleGroup primaryMuscle;

    @Column(name = "secondary_muscle", nullable = true, length = 50)
    private MuscleGroup secondaryMuscle;

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