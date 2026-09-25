-- GreenCare AI MySQL / H2 Database Schema

CREATE TABLE IF NOT EXISTS plant_specimens (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    taxon VARCHAR(255) NOT NULL,
    growth_environment VARCHAR(100),
    pot_architecture VARCHAR(100),
    soil_moisture_vwc DOUBLE,
    ambient_temp DOUBLE,
    ambient_rh DOUBLE,
    health_status VARCHAR(100),
    optical_confidence DOUBLE,
    hydric_stress_risk DOUBLE,
    last_scanned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS water_logs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    plant_name VARCHAR(255) NOT NULL,
    directive VARCHAR(100) NOT NULL,
    rationale TEXT,
    liters_conserved DOUBLE,
    logged_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS rag_chunks (
    id VARCHAR(50) PRIMARY KEY,
    doc_ref VARCHAR(100) NOT NULL,
    category VARCHAR(100),
    chunk_text TEXT NOT NULL,
    similarity_score DOUBLE,
    sdg_alignment VARCHAR(100)
);
