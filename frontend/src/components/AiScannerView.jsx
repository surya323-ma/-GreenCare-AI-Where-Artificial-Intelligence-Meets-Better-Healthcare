import React, { useState } from 'react';
import { Scan, Upload, RefreshCw, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { ApiService } from '../services/api';

export default function AiScannerView({ plants, onSaveScan }) {
  const [selectedSpecimen, setSelectedSpecimen] = useState(plants[0] || null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  const samplePresets = [
    { name: 'Monstera Deliciosa #04', taxon: 'Monstera deliciosa', image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=600&q=80' },
    { name: 'Golden Pothos', taxon: 'Epipremnum aureum', image: 'https://images.unsplash.com/photo-1596724817765-415aef29037c?auto=format&fit=crop&w=600&q=80' },
    { name: 'Snake Plant (CAM)', taxon: 'Sansevieria trifasciata', image: 'https://images.unsplash.com/photo-1593482892290-f54927ae1bf6?auto=format&fit=crop&w=600&q=80' },
    { name: 'Fiddle Leaf Fig', taxon: 'Ficus lyrata', image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=600&q=80' }
  ];

  const handleRunScan = async () => {
    setIsScanning(true);
    setScanResult(null);
    const specimen = selectedSpecimen || samplePresets[0];
    const res = await ApiService.performAiScan(specimen.name, specimen.taxon);
    setTimeout(() => {
      setScanResult(res.data);
      setIsScanning(false);
    }, 1800);
  };

  return (
    <div className="view-container">
      <div className="scanner-grid">
        {/* Left Column: Live AI Vision Preview */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Scan color="var(--primary-emerald)" size={22} />
              <h2 style={{ fontSize: '1.15rem' }}>Multispectral Optical Scanner</h2>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--primary-emerald)', fontFamily: 'var(--font-mono)' }}>
              MODEL v4.8-HYDRIC
            </span>
          </div>

          <div className="camera-preview-box">
            <img 
              src={selectedSpecimen?.image || samplePresets[0].image} 
              alt="Scan Preview" 
              className="scanner-image" 
            />
            {isScanning && <div className="laser-scan-line"></div>}

            <div className="bounding-box">
              <span className="bb-tag">LEAF TURGOR DETECTED [96.4%]</span>
              <span className="bb-tag" style={{ alignSelf: 'flex-end', background: 'rgba(6, 182, 212, 0.9)' }}>
                CHLOROPHYLL: 78.4 SPAD
              </span>
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
              Select Specimen Target:
            </div>
            <div className="preset-chips">
              {samplePresets.map((p) => (
                <button
                  key={p.name}
                  className={`chip-btn ${selectedSpecimen?.name === p.name ? 'active' : ''}`}
                  onClick={() => setSelectedSpecimen(p)}
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          <button 
            className="primary-btn" 
            style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem', padding: '0.75rem' }} 
            onClick={handleRunScan}
            disabled={isScanning}
          >
            {isScanning ? (
              <>
                <RefreshCw size={18} className="spin" style={{ animation: 'spin 1s linear infinite' }} />
                Analyzing Chlorophyll Absorption...
              </>
            ) : (
              <>
                <Sparkles size={18} />
                Execute Optical AI Diagnostic
              </>
            )}
          </button>
        </div>

        {/* Right Column: AI Scan Output & Directive */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShieldCheck color="var(--primary-emerald)" size={22} />
            <h2 style={{ fontSize: '1.15rem' }}>AI Diagnostic Breakdown</h2>
          </div>

          {scanResult ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ background: 'rgba(10, 19, 21, 0.9)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--bg-card-border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>{scanResult.specimenName}</div>
                  <span style={{ background: 'rgba(16, 185, 129, 0.2)', color: 'var(--primary-emerald)', padding: '4px 10px', borderRadius: '999px', fontSize: '0.78rem', fontWeight: 800 }}>
                    {scanResult.directive}
                  </span>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                  {scanResult.rationale}
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                <div style={{ background: 'rgba(15, 27, 29, 0.6)', padding: '0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255, 255, 255, 0.04)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>CHLOROPHYLL INDEX</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary-emerald)', fontFamily: 'var(--font-mono)' }}>
                    {scanResult.metrics.chlorophyllIndex} SPAD
                  </div>
                </div>

                <div style={{ background: 'rgba(15, 27, 29, 0.6)', padding: '0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255, 255, 255, 0.04)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>HYDRIC STRESS RISK</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>
                    {(scanResult.metrics.hydricStressRiskScore * 100).toFixed(1)}%
                  </div>
                </div>
              </div>

              <div style={{ background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: 'var(--radius-md)', padding: '0.85rem', fontSize: '0.82rem' }}>
                <div style={{ fontWeight: 700, color: 'var(--primary-emerald)', marginBottom: '0.25rem' }}>
                  SDG 6 Conservation Impact:
                </div>
                <div>Estimated water conserved: +{scanResult.waterSavingsLiters} Liters. Citation: {scanResult.ragReferenceId}</div>
              </div>

              <button className="primary-btn" style={{ justifyContent: 'center' }} onClick={() => onSaveScan(scanResult)}>
                <CheckCircle2 size={16} /> Save Diagnostic to Water Log
              </button>
            </div>
          ) : (
            <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-dim)', textAlign: 'center', gap: '0.75rem' }}>
              <Scan size={48} opacity={0.3} color="var(--primary-emerald)" />
              <p style={{ fontSize: '0.9rem' }}>Click "Execute Optical AI Diagnostic" to generate real-time leaf turgor analysis.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
