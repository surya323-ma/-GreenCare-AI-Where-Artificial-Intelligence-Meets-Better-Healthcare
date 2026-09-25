package com.greencare.greencarebackend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "plant_specimens")
public class PlantSpecimen {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String taxon;

    @Column(name = "growth_environment")
    private String growthEnvironment;

    @Column(name = "pot_architecture")
    private String potArchitecture;

    @Column(name = "soil_moisture_vwc")
    private Double soilMoistureVwc;

    @Column(name = "ambient_temp")
    private Double ambientTemp;

    @Column(name = "ambient_rh")
    private Double ambientRh;

    @Column(name = "health_status")
    private String healthStatus;

    @Column(name = "optical_confidence")
    private Double opticalConfidence;

    @Column(name = "hydric_stress_risk")
    private Double hydricStressRisk;

    @Column(name = "last_scanned_at")
    private LocalDateTime lastScannedAt;

    public PlantSpecimen() {
        this.lastScannedAt = LocalDateTime.now();
    }

    public PlantSpecimen(String name, String taxon, String growthEnvironment, String potArchitecture,
                         Double soilMoistureVwc, Double ambientTemp, Double ambientRh,
                         String healthStatus, Double opticalConfidence, Double hydricStressRisk) {
        this.name = name;
        this.taxon = taxon;
        this.growthEnvironment = growthEnvironment;
        this.potArchitecture = potArchitecture;
        this.soilMoistureVwc = soilMoistureVwc;
        this.ambientTemp = ambientTemp;
        this.ambientRh = ambientRh;
        this.healthStatus = healthStatus;
        this.opticalConfidence = opticalConfidence;
        this.hydricStressRisk = hydricStressRisk;
        this.lastScannedAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getTaxon() { return taxon; }
    public void setTaxon(String taxon) { this.taxon = taxon; }

    public String getGrowthEnvironment() { return growthEnvironment; }
    public void setGrowthEnvironment(String growthEnvironment) { this.growthEnvironment = growthEnvironment; }

    public String getPotArchitecture() { return potArchitecture; }
    public void setPotArchitecture(String potArchitecture) { this.potArchitecture = potArchitecture; }

    public Double getSoilMoistureVwc() { return soilMoistureVwc; }
    public void setSoilMoistureVwc(Double soilMoistureVwc) { this.soilMoistureVwc = soilMoistureVwc; }

    public Double getAmbientTemp() { return ambientTemp; }
    public void setAmbientTemp(Double ambientTemp) { this.ambientTemp = ambientTemp; }

    public Double getAmbientRh() { return ambientRh; }
    public void setAmbientRh(Double ambientRh) { this.ambientRh = ambientRh; }

    public String getHealthStatus() { return healthStatus; }
    public void setHealthStatus(String healthStatus) { this.healthStatus = healthStatus; }

    public Double getOpticalConfidence() { return opticalConfidence; }
    public void setOpticalConfidence(Double opticalConfidence) { this.opticalConfidence = opticalConfidence; }

    public Double getHydricStressRisk() { return hydricStressRisk; }
    public void setHydricStressRisk(Double hydricStressRisk) { this.hydricStressRisk = hydricStressRisk; }

    public LocalDateTime getLastScannedAt() { return lastScannedAt; }
    public void setLastScannedAt(LocalDateTime lastScannedAt) { this.lastScannedAt = lastScannedAt; }
}
