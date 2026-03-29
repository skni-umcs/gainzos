package com.gainzos.server.repository;

import com.gainzos.server.entities.UserMetrics;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserMetricsRepository extends JpaRepository<UserMetrics, Long> {
    List<UserMetrics> findAllByUserId(Long userId);
}