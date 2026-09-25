-- GreenCare AI Initial Knowledge Base & Telemetry Data

INSERT INTO plant_specimens (name, taxon, growth_environment, pot_architecture, soil_moisture_vwc, ambient_temp, ambient_rh, health_status, optical_confidence, hydric_stress_risk)
VALUES 
('Golden Pothos', 'Epipremnum aureum', 'Indoor Space', 'Standard 6" Pot with Drainage Holes', 41.8, 24.1, 54.0, 'Optimal Health 91%', 0.91, 0.25),
('Monstera Deliciosa #04', 'Monstera deliciosa', 'Balcony / Yard', 'Ceramic Pot 10"', 64.0, 26.0, 60.0, 'Optimal Health 98.2%', 0.98, 0.15),
('Snake Plant (CAM)', 'Sansevieria trifasciata', 'Living Room Bay', 'Terra Cotta 8"', 64.0, 25.5, 52.0, 'Hydrated - Hold Water', 0.96, 0.10);

INSERT INTO water_logs (plant_name, directive, rationale, liters_conserved)
VALUES
('Monstera Deliciosa #04', 'HOLD WATERING', 'Soil VWC at 64% is well within safe turgor pressure bounds. Potable water conserved.', 0.45),
('Snake Plant', 'HOLD WATERING', 'Rhizome waterlogging risk mitigated.', 0.38),
('Golden Pothos', 'EVALUATE SOIL', 'Interveinal chlorosis detected; root saturation high.', 0.22);

INSERT INTO rag_chunks (id, doc_ref, category, chunk_text, similarity_score, sdg_alignment)
VALUES
('CHUNK_0912', '#HORT-204', 'Araceae Care & Hydrology', 'Araceae species exhibit early basal leaf chlorosis when substrate oxygen diffusion rates fall below critical thresholds due to repeated watering in saturated soil.', 0.94, 'SDG 15 Life on Land'),
('CHUNK_0442', '#SDG6-WTR', 'Precision Water Conservation', 'Targeted conservation in domestic horticulture: Withholding irrigation until field capacity reaches 30-40% preserves average municipal reserves by 14-22L per household per week.', 0.89, 'SDG 6 Clean Water & Sanitation'),
('CHUNK_1108', '#BIO-NUTRI', 'Substrate Physiology', 'Application of NPK compounds onto water-logged soils creates localized salinization and accelerates petiole rot in shade-adapted Epipremnum varieties.', 0.87, 'SDG 12 Responsible Consumption');
