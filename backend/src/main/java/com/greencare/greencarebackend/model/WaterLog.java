package com.greencare.greencarebackend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "water_logs")
public class WaterLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "plant_name", nullable = false)
    private String plantName;

    @Column(nullable = false)
    private String directive;

    @Column(columnDefinition = "TEXT")
    private String rationale;

    @Column(name = "liters_conserved")
    private Double litersConserved;

    @Column(name = "logged_at")
    private LocalDateTime loggedAt;

    public WaterLog() {
        this.loggedAt = LocalDateTime.now();
    }

    public WaterLog(String plantName, String directive, String rationale, Double litersConserved) {
        this.plantName = plantName;
        this.directive = directive;
        this.rationale = rationale;
        this.litersConserved = litersConserved;
        this.loggedAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getPlantName() { return plantName; }
    public void setPlantName(String plantName) { this.plantName = plantName; }

    public String getDirective() { return directive; }
    public void setDirective(String directive) { this.directive = directive; }

    public String getRationale() { return rationale; }
    public void setRationale(String rationale) { this.rationale = rationale; }

    public Double getLitersConserved() { return litersConserved; }
    public void setLitersConserved(Double litersConserved) { this.litersConserved = litersConserved; }

    public LocalDateTime getLoggedAt() { return loggedAt; }
    public void setLoggedAt(LocalDateTime loggedAt) { this.loggedAt = loggedAt; }
}
