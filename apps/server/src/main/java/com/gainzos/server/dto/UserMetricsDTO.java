package com.gainzos.server.dto;

import java.time.LocalDate;

import com.gainzos.server.enums.Activity;
import com.gainzos.server.enums.Goal;
import com.gainzos.server.enums.Gender;

public record UserMetricsDTO(
        Long id,
        Long userId, 
        Gender gender,
        LocalDate birthDate,
        Double weight,
        Double height,
        Double bicepsCircumference,
        Double chestCircumference,
        Double waistCircumference,
        Double bodyFatPercentage,
        Activity activityLevel,
        Goal goal
) {}