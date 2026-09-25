package com.greencare.greencarebackend.repository;

import com.greencare.greencarebackend.model.PlantSpecimen;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlantSpecimenRepository extends JpaRepository<PlantSpecimen, Long> {
    List<PlantSpecimen> findByNameContainingIgnoreCaseOrTaxonContainingIgnoreCase(String name, String taxon);
}
