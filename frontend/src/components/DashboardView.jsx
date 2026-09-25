import React from 'react';
import { 
  Droplets, 
  Thermometer, 
  Wind, 
  ShieldCheck, 
  TrendingUp, 
  AlertTriangle,
  Zap,
  ArrowUpRight
} from 'lucide-react';

export default function DashboardView({ plants, waterLogs, onNavigate }) {
  const avgMoisture = plants.length ? (plants.reduce((acc, p) => acc + p.soilMoistureVwc, 0) / plants.length).toFixed(1) : 45.0;
  const avgTemp = plants.length ? (plants.reduce((acc, p) => acc + p.ambientTemp, 0) / plants.length).toFixed(1) : 24.5;
  const avgRh = plants.length ? (plants.reduce((acc, p) => acc + p.ambientRh, 0) / plants.length).toFixed(1) : 55.0;

  return (
    <div className="view-container">
      {/* Real-time Telemetry Metrics Banner */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-header">
            <span>AVG SOIL MOISTURE (VWC)</span>
            <Droplets size={18} color="var(--primary-emerald)" />
          </div>
          <div className="metric-value">{avgMoisture}%</div>
          <div className="metric-footer">
            <TrendingUp size={14} color="var(--primary-emerald)" />
            <span>Optimal turgor range (35% - 65%)</span>
          </div>
        </div>

        <div className="metric-card temp">
          <div className="metric-header">
            <span>AMBIENT TEMPERATURE</span>
            <Thermometer size={18} color="var(--accent-amber)" />
          </div>
          <div className="metric-value">{avgTemp}°C</div>
          <div className="metric-footer">
            <span>Stable microclimate environment</span>
          </div>
        </div>

        <div className="metric-card rh">
          <div className="metric-header">
            <span>RELATIVE HUMIDITY (RH)</span>
            <Wind size={18} color="var(--accent-cyan)" />
          </div>
          <div className="metric-value">{avgRh}%</div>
          <div className="metric-footer">
            <span>Transpiration rate balanced</span>
          </div>
        </div>

        <div className="metric-card health">
          <div className="metric-header">
            <span>AI OPTICAL HEALTH INDEX</span>
            <ShieldCheck size={18} color="var(--accent-lime)" />
          </div>
          <div className="metric-value">94.8%</div>
          <div className="metric-footer">
            <span>0 critical pathogens detected</span>
          </div>
        </div>
      </div>

      {/* Main Grid: AI Directive & Recent Telemetry */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1.5rem' }}>
        <div className="glass-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Zap size={20} color="var(--primary-emerald)" />
              <h2 style={{ fontSize: '1.15rem' }}>Smart Water Directive Engine</h2>
            </div>
            <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', background: 'rgba(16, 185, 129, 0.15)', color: 'var(--primary-emerald)', padding: '3px 8px', borderRadius: '6px' }}>
              REALTIME AI FEED
            </span>
          </div>

          <div style={{ background: 'rgba(10, 19, 21, 0.8)', borderRadius: 'var(--radius-md)', padding: '1.25rem', border: '1px solid var(--bg-card-border)', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <div style={{ fontSize: '1rem', fontWeight: 700 }}>Monstera Deliciosa #04</div>
              <span style={{ background: 'rgba(16, 185, 129, 0.2)', color: 'var(--primary-emerald)', padding: '4px 10px', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.05em' }}>
                HOLD WATERING
              </span>
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: '1rem' }}>
              Soil VWC is currently at 64.0%. Root zone turgor is well within physiological bounds. Irrigation today would induce hypoxia and waste ~0.45L of potable water.
            </p>
            <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
              <span>Saved: +0.45 Liters</span>
              <span>•</span>
              <span>Next Check: 48 Hours</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button className="primary-btn" style={{ flex: 1, justifyContent: 'center' }} onClick={() => onNavigate('scanner')}>
              Run New Optical AI Scan
            </button>
            <button className="chip-btn" style={{ flex: 1, justifyContent: 'center' }} onClick={() => onNavigate('water')}>
              View SDG Impact Report <ArrowUpRight size={14} />
            </button>
          </div>
        </div>

        {/* Specimen Quick Status List */}
        <div className="glass-card">
          <h2 style={{ fontSize: '1.15rem', marginBottom: '1rem' }}>Specimen Health Overview</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {plants.slice(0, 4).map((p) => (
              <div key={p.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', background: 'rgba(15, 27, 29, 0.6)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255, 255, 255, 0.04)' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{p.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>VWC: {p.soilMoistureVwc}%</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--primary-emerald)', fontWeight: 700 }}>{p.healthStatus}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>Temp: {p.ambientTemp}°C</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
