import React, { useState } from 'react';
import { Plus, RefreshCw, Droplets, Thermometer, Wind, Sprout, X } from 'lucide-react';

export default function GardenView({ plants, onAddPlant, onSimulateTick }) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    taxon: '',
    growthEnvironment: 'Indoor Space',
    potArchitecture: 'Terra Cotta 8"',
    soilMoistureVwc: 45.0
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.name) return;
    onAddPlant(formState);
    setShowAddModal(false);
    setFormState({ name: '', taxon: '', growthEnvironment: 'Indoor Space', potArchitecture: 'Terra Cotta 8"', soilMoistureVwc: 45.0 });
  };

  return (
    <div className="view-container">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h2 style={{ fontSize: '1.3rem' }}>My Botanical Specimen Garden</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Real-time telemetry and soil volumetric water content tracking across active specimens.
          </p>
        </div>

        <button className="primary-btn" onClick={() => setShowAddModal(true)}>
          <Plus size={18} /> Add Specimen
        </button>
      </div>

      <div className="garden-grid">
        {plants.map((p) => (
          <div key={p.id} className="plant-card">
            <div className="plant-card-img-container">
              <img src={p.image || 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=600&q=80'} alt={p.name} className="plant-card-img" />
              <div style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(10, 19, 21, 0.85)', padding: '4px 10px', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary-emerald)', backdropFilter: 'blur(6px)' }}>
                {p.healthStatus}
              </div>
            </div>

            <div className="plant-card-body">
              <div>
                <h3 className="plant-title">{p.name}</h3>
                <div className="plant-taxon">{p.taxon}</div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Soil VWC:</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--primary-emerald)' }}>{p.soilMoistureVwc}%</span>
                </div>
                <div className="progress-bar-bg">
                  <div className="progress-bar-fill" style={{ width: `${Math.min(100, p.soilMoistureVwc)}%` }}></div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.78rem', color: 'var(--text-dim)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Thermometer size={14} color="var(--accent-amber)" /> {p.ambientTemp}°C
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Wind size={14} color="var(--accent-cyan)" /> {p.ambientRh}% RH
                </div>
              </div>

              <button 
                className="chip-btn" 
                style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}
                onClick={() => onSimulateTick(p.id)}
              >
                <RefreshCw size={14} /> Simulate Sensor Tick
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Specimen Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Sprout color="var(--primary-emerald)" size={22} />
                <h2 style={{ fontSize: '1.2rem' }}>Add New Plant Specimen</h2>
              </div>
              <button onClick={() => setShowAddModal(false)} style={{ background: 'none', color: 'var(--text-muted)' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Plant Common Name</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. Peace Lily"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Botanical Taxon</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. Spathiphyllum wallisii"
                  value={formState.taxon}
                  onChange={(e) => setFormState({ ...formState, taxon: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Pot Architecture</label>
                <select 
                  className="form-select"
                  value={formState.potArchitecture}
                  onChange={(e) => setFormState({ ...formState, potArchitecture: e.target.value })}
                >
                  <option value="Terra Cotta 8&quot;">Terra Cotta 8"</option>
                  <option value="Ceramic Pot 10&quot;">Ceramic Pot 10"</option>
                  <option value="Self-Watering 12&quot;">Self-Watering 12"</option>
                  <option value="Fabric Smart Pot">Fabric Smart Pot</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Initial Soil Moisture VWC (%)</label>
                <input 
                  type="number" 
                  className="form-input" 
                  value={formState.soilMoistureVwc}
                  onChange={(e) => setFormState({ ...formState, soilMoistureVwc: e.target.value })}
                  min="5" max="95"
                />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
                <button type="button" className="chip-btn" style={{ flex: 1, justifyContent: 'center' }} onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="primary-btn" style={{ flex: 1, justifyContent: 'center' }}>
                  Register Specimen
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
