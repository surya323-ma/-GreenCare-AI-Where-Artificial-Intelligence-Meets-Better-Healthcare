package com.greencare.greencarebackend.repository;

import com.greencare.greencarebackend.model.WaterLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WaterLogRepository extends JpaRepository<WaterLog, Long> {
    List<WaterLog> findByOrderByLoggedAtDesc();
}
