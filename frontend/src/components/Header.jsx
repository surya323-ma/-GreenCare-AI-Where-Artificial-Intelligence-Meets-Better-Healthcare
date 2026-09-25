import React from 'react';
import { Scan, Droplets, Server, CheckCircle2, AlertCircle } from 'lucide-react';

export default function Header({ 
  activeTab, 
  onQuickScan, 
  totalWaterConserved, 
  isBackendConnected 
}) {
  const titles = {
    dashboard: 'Dashboard Overview & Real-Time Telemetry',
    scanner: 'AI Optical Leaf Health Diagnostics',
    garden: 'My Garden Specimen Inventory',
    assistant: 'Botanical RAG Engine & AI Assistant',
    water: 'SDG 6 Water Conservation & Impact Hub'
  };

  return (
    <header className="app-header">
      <div className="header-left">
        <h1 className="page-title">{titles[activeTab] || 'GreenCare AI'}</h1>
      </div>

      <div className="header-right">
        <div className="stat-pill">
          <Droplets size={16} color="var(--primary-emerald)" />
          <span>Water Saved:</span>
          <span className="value">{totalWaterConserved.toFixed(2)} L</span>
        </div>

        <div className={`status-badge ${isBackendConnected ? 'online' : 'mock'}`}>
          <div className="status-dot"></div>
          {isBackendConnected ? (
            <>
              <CheckCircle2 size={13} />
              <span>Spring Boot REST Active</span>
            </>
          ) : (
            <>
              <AlertCircle size={13} />
              <span>Offline / Mock Mode</span>
            </>
          )}
        </div>

        <button className="primary-btn" onClick={onQuickScan}>
          <Scan size={18} />
          <span>Scan Specimen</span>
        </button>
      </div>
    </header>
  );
}
