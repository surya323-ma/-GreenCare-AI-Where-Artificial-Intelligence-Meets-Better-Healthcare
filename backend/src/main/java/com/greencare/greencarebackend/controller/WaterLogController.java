package com.greencare.greencarebackend.controller;

import com.greencare.greencarebackend.model.WaterLog;
import com.greencare.greencarebackend.repository.WaterLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/water-logs")
@CrossOrigin(origins = "*")
public class WaterLogController {

    @Autowired
    private WaterLogRepository repository;

    @GetMapping
    public List<WaterLog> getAllLogs() {
        return repository.findByOrderByLoggedAtDesc();
    }

    @PostMapping
    public WaterLog logWateringEvent(@RequestBody WaterLog log) {
        if (log.getLoggedAt() == null) {
            log.setLoggedAt(LocalDateTime.now());
        }
        return repository.save(log);
    }

    @GetMapping("/total-conserved")
    public ResponseEntity<Double> getTotalConserved() {
        Double total = repository.findAll().stream()
                .mapToDouble(WaterLog::getLitersConserved)
                .sum();
        return ResponseEntity.ok(Math.round(total * 100.0) / 100.0);
    }
}
