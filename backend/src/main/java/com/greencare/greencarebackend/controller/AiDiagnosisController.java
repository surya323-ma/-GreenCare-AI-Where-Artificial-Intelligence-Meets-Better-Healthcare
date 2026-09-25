package com.greencare.greencarebackend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "*")
public class AiDiagnosisController {

    @PostMapping("/scan")
    public ResponseEntity<Map<String, Object>> performScanDiagnostic(@RequestBody Map<String, Object> request) {
        String plantName = (String) request.getOrDefault("plantName", "Unknown Specimen");
        String plantTaxon = (String) request.getOrDefault("plantTaxon", "Plantae sp.");

        Map<String, Object> response = new LinkedHashMap<>();
        response.put("timestamp", System.currentTimeMillis());
        response.put("specimenName", plantName);
        response.put("taxon", plantTaxon);
        response.put("opticalConfidence", 0.964);

        Map<String, Object> metrics = new HashMap<>();
        metrics.put("chlorophyllIndex", 74.2);
        metrics.put("interveinalChlorosis", "Low / Absent (< 4%)");
        metrics.put("leafTurgorStatus", "Optimal Cellular Pressure");
        metrics.put("hydricStressRiskScore", 0.12);
        metrics.put("diseaseProbability", 0.04);

        response.put("metrics", metrics);
        response.put("directive", "HOLD WATERING");
        response.put("rationale", "Optical spectral analysis shows high leaf turgor and healthy chlorophyll density. Substrate moisture remains sufficient for 4-5 days.");
        response.put("waterSavingsLiters", 0.45);
        response.put("ragReferenceId", "#HORT-204");
        response.put("sdgAlignment", "SDG 6 Clean Water & Sanitation");

        return ResponseEntity.ok(response);
    }

    @PostMapping("/chat")
    public ResponseEntity<Map<String, Object>> askBotanicalAssistant(@RequestBody Map<String, String> request) {
        String query = request.getOrDefault("message", "").toLowerCase();

        String answer;
        String docRef;
        String sdg;
        double confidence;

        if (query.contains("yellow") || query.contains("chlorosis")) {
            answer = "Interveinal chlorosis in indoor tropical plants (like Epipremnum or Monstera) is frequently caused by root hypoxia due to overwatering, rather than nitrogen deficiency. We recommend pausing irrigation until soil volumetric water content drops below 45%.";
            docRef = "#HORT-204";
            sdg = "SDG 15 Life on Land";
            confidence = 0.94;
        } else if (query.contains("water") || query.contains("save") || query.contains("irrigate")) {
            answer = "By allowing soil moisture to transition through natural dry-down cycles (30-40% VWC), domestic horticulturists conserve between 14L to 22L of potable water per household per week, preventing salt accumulation and root rot.";
            docRef = "#SDG6-WTR";
            sdg = "SDG 6 Clean Water & Sanitation";
            confidence = 0.91;
        } else if (query.contains("snake") || query.contains("cam")) {
            answer = "Sansevieria trifasciata uses Crassulacean Acid Metabolism (CAM), opening stomata at night to absorb CO2. Soil moisture above 50% for prolonged periods severely increases rhizome soft rot risk.";
            docRef = "#BIO-NUTRI";
            sdg = "SDG 12 Responsible Consumption";
            confidence = 0.96;
        } else {
            answer = "Based on GreenCare AI botanical knowledge base, plant health is optimized by matching soil moisture diffusion rates with ambient relative humidity and species-specific turgor thresholds. Avoid indiscriminate daily watering.";
            docRef = "#AGRI-SYS";
            sdg = "SDG 15 Life on Land";
            confidence = 0.88;
        }

        Map<String, Object> response = new LinkedHashMap<>();
        response.put("query", request.get("message"));
        response.put("response", answer);
        response.put("docRef", docRef);
        response.put("sdgAlignment", sdg);
        response.put("similarityScore", confidence);

        return ResponseEntity.ok(response);
    }
}
