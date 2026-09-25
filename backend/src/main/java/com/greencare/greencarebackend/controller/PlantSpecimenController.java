package com.greencare.greencarebackend.controller;

import com.greencare.greencarebackend.model.PlantSpecimen;
import com.greencare.greencarebackend.repository.PlantSpecimenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/plants")
@CrossOrigin(origins = "*")
public class PlantSpecimenController {

    @Autowired
    private PlantSpecimenRepository repository;

    @GetMapping
    public List<PlantSpecimen> getAllPlants() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<PlantSpecimen> getPlantById(@PathVariable Long id) {
        return repository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public PlantSpecimen createPlant(@RequestBody PlantSpecimen specimen) {
        if (specimen.getLastScannedAt() == null) {
            specimen.setLastScannedAt(LocalDateTime.now());
        }
        return repository.save(specimen);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PlantSpecimen> updatePlant(@PathVariable Long id, @RequestBody PlantSpecimen updated) {
        return repository.findById(id).map(plant -> {
            plant.setName(updated.getName());
            plant.setTaxon(updated.getTaxon());
            plant.setGrowthEnvironment(updated.getGrowthEnvironment());
            plant.setPotArchitecture(updated.getPotArchitecture());
            plant.setSoilMoistureVwc(updated.getSoilMoistureVwc());
            plant.setAmbientTemp(updated.getAmbientTemp());
            plant.setAmbientRh(updated.getAmbientRh());
            plant.setHealthStatus(updated.getHealthStatus());
            plant.setOpticalConfidence(updated.getOpticalConfidence());
            plant.setHydricStressRisk(updated.getHydricStressRisk());
            plant.setLastScannedAt(LocalDateTime.now());
            return ResponseEntity.ok(repository.save(plant));
        }).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{id}/telemetry-tick")
    public ResponseEntity<PlantSpecimen> simulateTelemetryTick(@PathVariable Long id) {
        return repository.findById(id).map(plant -> {
            // Slight natural sensor variation
            double vwcDelta = (Math.random() - 0.5) * 1.2;
            double tempDelta = (Math.random() - 0.5) * 0.4;
            double rhDelta = (Math.random() - 0.5) * 0.8;

            double newVwc = Math.max(10.0, Math.min(95.0, plant.getSoilMoistureVwc() + vwcDelta));
            double newTemp = Math.max(15.0, Math.min(40.0, plant.getAmbientTemp() + tempDelta));
            double newRh = Math.max(30.0, Math.min(90.0, plant.getAmbientRh() + rhDelta));

            plant.setSoilMoistureVwc(Math.round(newVwc * 10.0) / 10.0);
            plant.setAmbientTemp(Math.round(newTemp * 10.0) / 10.0);
            plant.setAmbientRh(Math.round(newRh * 10.0) / 10.0);
            plant.setLastScannedAt(LocalDateTime.now());

            return ResponseEntity.ok(repository.save(plant));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlant(@PathVariable Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
