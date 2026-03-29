package com.gainzos.server.services;

import com.gainzos.server.dto.UserMetricsDTO;
import com.gainzos.server.entities.User;
import com.gainzos.server.entities.UserMetrics;
import com.gainzos.server.mappers.UserMetricsMapper;
import com.gainzos.server.repository.UserMetricsRepository;
import com.gainzos.server.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserMetricsService {

    private final UserMetricsRepository userMetricsRepository;
    private final UserRepository userRepository;
    private final UserMetricsMapper userMetricsMapper;

    public List<UserMetricsDTO> getAll() {
        return userMetricsRepository.findAll().stream()
                .map(userMetricsMapper::toDTO)
                .toList();
    }

    public List<UserMetricsDTO> getByUserId(Long userId) {
        return userMetricsRepository.findAllByUserId(userId).stream()
                .map(userMetricsMapper::toDTO)
                .toList();
    }

    public UserMetricsDTO getById(Long id) {
        UserMetrics metrics = userMetricsRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User metrics with id " + id + " not found"));
        return userMetricsMapper.toDTO(metrics);
    }

    public UserMetricsDTO addMetrics(UserMetricsDTO dto) {
        if (dto.userId() == null) {
            throw new IllegalArgumentException("User ID is required to add metrics");
        }

        User user = userRepository.findById(dto.userId())
                .orElseThrow(() -> new EntityNotFoundException("User with id " + dto.userId() + " not found"));

        UserMetrics metrics = UserMetrics.builder()
                .user(user)
                .gender(dto.gender())
                .birthDate(dto.birthDate())
                .weight(dto.weight())
                .height(dto.height())
                .bicepsCircumference(dto.bicepsCircumference())
                .chestCircumference(dto.chestCircumference())
                .waistCircumference(dto.waistCircumference())
                .bodyFatPercentage(dto.bodyFatPercentage())
                .activityLevel(dto.activityLevel())
                .goal(dto.goal())
                .build();

        UserMetrics saved = userMetricsRepository.save(metrics);
        return userMetricsMapper.toDTO(saved);
    }

    public UserMetricsDTO updateMetrics(UserMetricsDTO dto) {
        if (dto.id() == null) {
            throw new IllegalArgumentException("Metrics ID is required for update");
        }

        UserMetrics metrics = userMetricsRepository.findById(dto.id())
                .orElseThrow(() -> new EntityNotFoundException("User metrics with id " + dto.id() + " not found"));

        metrics.setGender(dto.gender());
        metrics.setBirthDate(dto.birthDate());
        metrics.setWeight(dto.weight());
        metrics.setHeight(dto.height());
        metrics.setBicepsCircumference(dto.bicepsCircumference());
        metrics.setChestCircumference(dto.chestCircumference());
        metrics.setWaistCircumference(dto.waistCircumference());
        metrics.setBodyFatPercentage(dto.bodyFatPercentage());
        metrics.setActivityLevel(dto.activityLevel());
        metrics.setGoal(dto.goal());

        UserMetrics updated = userMetricsRepository.save(metrics);
        return userMetricsMapper.toDTO(updated);
    }

    public void deleteMetrics(Long id) {
        if (!userMetricsRepository.existsById(id)) {
            throw new EntityNotFoundException("User metrics with id " + id + " not found");
        }
        userMetricsRepository.deleteById(id);
    }
}