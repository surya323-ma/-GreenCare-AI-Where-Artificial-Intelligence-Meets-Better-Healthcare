// GreenCare AI Unified API Client with Backend REST & Local Fallback Engine

const API_BASE_URL = 'http://localhost:8080/api';

// Initial Mock Data Store for instant zero-dependency execution
const INITIAL_PLANTS = [
  {
    id: 1,
    name: 'Golden Pothos',
    taxon: 'Epipremnum aureum',
    growthEnvironment: 'Indoor Space',
    potArchitecture: 'Standard 6" Pot with Drainage',
    soilMoistureVwc: 41.8,
    ambientTemp: 24.1,
    ambientRh: 54.0,
    healthStatus: 'Optimal Health 91%',
    opticalConfidence: 0.91,
    hydricStressRisk: 0.25,
    lastScannedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    image: 'https://images.unsplash.com/photo-1596724817765-415aef29037c?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 2,
    name: 'Monstera Deliciosa #04',
    taxon: 'Monstera deliciosa',
    growthEnvironment: 'Balcony / Yard',
    potArchitecture: 'Ceramic Pot 10"',
    soilMoistureVwc: 64.0,
    ambientTemp: 26.0,
    ambientRh: 60.0,
    healthStatus: 'Optimal Health 98.2%',
    opticalConfidence: 0.98,
    hydricStressRisk: 0.15,
    lastScannedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 3,
    name: 'Snake Plant (CAM)',
    taxon: 'Sansevieria trifasciata',
    growthEnvironment: 'Living Room Bay',
    potArchitecture: 'Terra Cotta 8"',
    soilMoistureVwc: 28.5,
    ambientTemp: 25.5,
    ambientRh: 52.0,
    healthStatus: 'Hydrated - Hold Water',
    opticalConfidence: 0.96,
    hydricStressRisk: 0.10,
    lastScannedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    image: 'https://images.unsplash.com/photo-1593482892290-f54927ae1bf6?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 4,
    name: 'Fiddle Leaf Fig',
    taxon: 'Ficus lyrata',
    growthEnvironment: 'Sunroom Lounge',
    potArchitecture: 'Self-Watering 12"',
    soilMoistureVwc: 35.2,
    ambientTemp: 23.8,
    ambientRh: 48.5,
    healthStatus: 'Moderate Moisture Needed',
    opticalConfidence: 0.89,
    hydricStressRisk: 0.42,
    lastScannedAt: new Date(Date.now() - 3600000 * 1).toISOString(),
    image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=600&q=80'
  }
];

const INITIAL_WATER_LOGS = [
  {
    id: 101,
    plantName: 'Monstera Deliciosa #04',
    directive: 'HOLD WATERING',
    rationale: 'Soil VWC at 64% is well within safe turgor pressure bounds. Potable water conserved.',
    litersConserved: 0.45,
    loggedAt: new Date(Date.now() - 3600000 * 3).toISOString()
  },
  {
    id: 102,
    plantName: 'Snake Plant (CAM)',
    directive: 'HOLD WATERING',
    rationale: 'Rhizome waterlogging risk mitigated. Stomata closed during daylight (CAM metabolic pathway).',
    litersConserved: 0.38,
    loggedAt: new Date(Date.now() - 3600000 * 8).toISOString()
  },
  {
    id: 103,
    plantName: 'Golden Pothos',
    directive: 'EVALUATE SOIL',
    rationale: 'Interveinal chlorosis detected; root zone oxygenation optimal, skip watering cycle.',
    litersConserved: 0.22,
    loggedAt: new Date(Date.now() - 3600000 * 14).toISOString()
  }
];

const INITIAL_RAG_CHUNKS = [
  {
    id: 'CHUNK_0912',
    docRef: '#HORT-204',
    category: 'Araceae Care & Hydrology',
    chunkText: 'Araceae species exhibit early basal leaf chlorosis when substrate oxygen diffusion rates fall below critical thresholds due to repeated watering in saturated soil.',
    similarityScore: 0.94,
    sdgAlignment: 'SDG 15 Life on Land'
  },
  {
    id: 'CHUNK_0442',
    docRef: '#SDG6-WTR',
    category: 'Precision Water Conservation',
    chunkText: 'Targeted conservation in domestic horticulture: Withholding irrigation until field capacity reaches 30-40% preserves average municipal reserves by 14-22L per household per week.',
    similarityScore: 0.89,
    sdgAlignment: 'SDG 6 Clean Water & Sanitation'
  },
  {
    id: 'CHUNK_1108',
    docRef: '#BIO-NUTRI',
    category: 'Substrate Physiology',
    chunkText: 'Application of NPK compounds onto water-logged soils creates localized salinization and accelerates petiole rot in shade-adapted Epipremnum varieties.',
    similarityScore: 0.87,
    sdgAlignment: 'SDG 12 Responsible Consumption'
  },
  {
    id: 'CHUNK_2301',
    docRef: '#AGRI-SYS',
    category: 'Optical Diagnostic Vision',
    chunkText: 'Multispectral leaf imaging measuring 680nm chlorophyll absorption peaks allows automated early detection of hydric stress 72 hours before visible wilting occurs.',
    similarityScore: 0.92,
    sdgAlignment: 'SDG 9 Industry & Innovation'
  }
];

// Helper to fetch with fallback
async function fetchWithFallback(url, options, fallbackFn) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1500); // 1.5s fast timeout
    const res = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(timeoutId);
    if (res.ok) {
      const data = await res.json();
      return { data, isBackendConnected: true };
    }
  } catch (err) {
    // Backend unreachable or offline, fallback smoothly
  }
  return { data: fallbackFn(), isBackendConnected: false };
}

// In-Memory Local Storage backing
let localPlants = [...INITIAL_PLANTS];
let localWaterLogs = [...INITIAL_WATER_LOGS];
let localRagChunks = [...INITIAL_RAG_CHUNKS];

export const ApiService = {
  // Plant Specimens
  async getPlants() {
    return fetchWithFallback(`${API_BASE_URL}/plants`, {}, () => localPlants);
  },

  async addPlant(newPlant) {
    const plantObj = {
      ...newPlant,
      id: Date.now(),
      soilMoistureVwc: Number(newPlant.soilMoistureVwc) || 45.0,
      ambientTemp: Number(newPlant.ambientTemp) || 24.5,
      ambientRh: Number(newPlant.ambientRh) || 55.0,
      healthStatus: newPlant.healthStatus || 'Optimal Health 95%',
      opticalConfidence: 0.95,
      hydricStressRisk: 0.18,
      lastScannedAt: new Date().toISOString(),
      image: newPlant.image || 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=600&q=80'
    };

    return fetchWithFallback(
      `${API_BASE_URL}/plants`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(plantObj)
      },
      () => {
        localPlants.unshift(plantObj);
        return plantObj;
      }
    );
  },

  async simulateSensorTick(plantId) {
    return fetchWithFallback(
      `${API_BASE_URL}/plants/${plantId}/telemetry-tick`,
      { method: 'POST' },
      () => {
        const plant = localPlants.find((p) => p.id === plantId);
        if (plant) {
          const vwcDelta = (Math.random() - 0.5) * 2.0;
          const tempDelta = (Math.random() - 0.5) * 0.5;
          const rhDelta = (Math.random() - 0.5) * 1.0;

          plant.soilMoistureVwc = Math.max(10, Math.min(95, Math.round((plant.soilMoistureVwc + vwcDelta) * 10) / 10));
          plant.ambientTemp = Math.max(15, Math.min(40, Math.round((plant.ambientTemp + tempDelta) * 10) / 10));
          plant.ambientRh = Math.max(30, Math.min(90, Math.round((plant.ambientRh + rhDelta) * 10) / 10));
          plant.lastScannedAt = new Date().toISOString();
        }
        return plant || localPlants[0];
      }
    );
  },

  // Water Logs
  async getWaterLogs() {
    return fetchWithFallback(`${API_BASE_URL}/water-logs`, {}, () => localWaterLogs);
  },

  async logWaterEvent(plantName, directive, rationale, litersConserved) {
    const logObj = {
      id: Date.now(),
      plantName,
      directive: directive || 'HOLD WATERING',
      rationale: rationale || 'Soil moisture is in the optimal band. Potable water conserved.',
      litersConserved: Number(litersConserved) || 0.4,
      loggedAt: new Date().toISOString()
    };

    return fetchWithFallback(
      `${API_BASE_URL}/water-logs`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(logObj)
      },
      () => {
        localWaterLogs.unshift(logObj);
        return logObj;
      }
    );
  },

  // RAG Knowledge Base
  async getRagChunks(query = '') {
    return fetchWithFallback(`${API_BASE_URL}/rag/search?query=${encodeURIComponent(query)}`, {}, () => {
      if (!query.trim()) return localRagChunks;
      const q = query.toLowerCase();
      return localRagChunks.filter(
        (c) => c.category.toLowerCase().includes(q) || c.chunkText.toLowerCase().includes(q) || c.docRef.toLowerCase().includes(q)
      );
    });
  },

  // AI Diagnostic & Chat Assistant
  async performAiScan(plantName, plantTaxon) {
    return fetchWithFallback(
      `${API_BASE_URL}/ai/scan`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plantName, plantTaxon })
      },
      () => ({
        timestamp: Date.now(),
        specimenName: plantName || 'Selected Specimen',
        taxon: plantTaxon || 'Plantae sp.',
        opticalConfidence: 0.964,
        metrics: {
          chlorophyllIndex: 78.4,
          interveinalChlorosis: 'Low / Absent (< 3%)',
          leafTurgorStatus: 'Optimal Cellular Turgor',
          hydricStressRiskScore: 0.11,
          diseaseProbability: 0.03
        },
        directive: 'HOLD WATERING',
        rationale: 'Optical spectral analysis shows high leaf turgor and healthy chlorophyll density. Substrate moisture remains sufficient for 4-5 days.',
        waterSavingsLiters: 0.48,
        ragReferenceId: '#HORT-204',
        sdgAlignment: 'SDG 6 Clean Water & Sanitation'
      })
    );
  },

  async askBotanicalAi(userMessage) {
    return fetchWithFallback(
      `${API_BASE_URL}/ai/chat`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
      },
      () => {
        const q = userMessage.toLowerCase();
        let answer = 'Based on GreenCare AI botanical knowledge base, plant health is optimized by matching soil moisture diffusion rates with ambient relative humidity and species-specific turgor thresholds.';
        let docRef = '#AGRI-SYS';
        let sdg = 'SDG 15 Life on Land';
        let confidence = 0.88;

        if (q.includes('yellow') || q.includes('chlorosis')) {
          answer = 'Interveinal chlorosis in indoor tropical plants (like Epipremnum or Monstera) is frequently caused by root hypoxia due to overwatering, rather than nitrogen deficiency. We recommend pausing irrigation until soil volumetric water content drops below 45%.';
          docRef = '#HORT-204';
          sdg = 'SDG 15 Life on Land';
          confidence = 0.94;
        } else if (q.includes('water') || q.includes('save') || q.includes('irrigate') || q.includes('schedule')) {
          answer = 'By allowing soil moisture to transition through natural dry-down cycles (30-40% VWC), domestic horticulturists conserve between 14L to 22L of potable water per household per week, preventing salt accumulation and root rot.';
          docRef = '#SDG6-WTR';
          sdg = 'SDG 6 Clean Water & Sanitation';
          confidence = 0.91;
        } else if (q.includes('snake') || q.includes('cam') || q.includes('succulent')) {
          answer = 'Sansevieria trifasciata uses Crassulacean Acid Metabolism (CAM), opening stomata at night to absorb CO2. Soil moisture above 50% for prolonged periods severely increases rhizome soft rot risk.';
          docRef = '#BIO-NUTRI';
          sdg = 'SDG 12 Responsible Consumption';
          confidence = 0.96;
        }

        return {
          query: userMessage,
          response: answer,
          docRef,
          sdgAlignment: sdg,
          similarityScore: confidence
        };
      }
    );
  }
};
