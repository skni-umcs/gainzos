package com.gainzos.server.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

import com.gainzos.server.enums.Activity;
import com.gainzos.server.enums.Goal;
import com.gainzos.server.enums.Gender;


@Entity
@Table(name = "user_metrics")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class UserMetrics {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Enumerated(EnumType.STRING)
    @Column(name = "gender", nullable = true)
    private Gender gender;

    @Column(name = "birth_date" , nullable = true)
    private LocalDate birthDate;

    @Column(name = "weight", nullable = true)
    private Double weight;

    @Column(name = "height", nullable = true)
    private Double height;

    @Column(name = "biceps_circumference", nullable = true)
    private Double bicepsCircumference;

    @Column(name = "chest_circumference", nullable = true)
    private Double chestCircumference;

    @Column(name = "waist_circumference", nullable = true)
    private Double waistCircumference;

    @Column(name = "body_fat_percentage", nullable = true)
    private Double bodyFatPercentage;

    @Enumerated(EnumType.STRING)
    @Column(name = "activity_level", nullable = true)
    private Activity activityLevel;

    @Enumerated(EnumType.STRING)
    @Column(name = "goal", nullable = true)
    private Goal goal;
}
