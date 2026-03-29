package com.gainzos.server.entities;
import jakarta.persistence.*;
import lombok.*;
import com.gainzos.server.enums.MuscleGroup;
import java.util.List;

@Entity
@Table(name = "workout_templates")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class WorkoutTemplate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name", nullable = false, length = 255)
    private String name;

    @Column(name = "description", nullable = false, length = 255)
    private String description;

    @Column(name = "muscle_groups", nullable = false, length = 255)
    private MuscleGroup[] muscleGroups;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id", nullable = false)
    private User owner;

    @Column(name = "is_public", nullable = false)
    private Boolean isPublic;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JoinColumn(name = "workout_template_id", nullable = false)
    private List<WorkoutItem> items;
}
