import React from 'react';
import { 
  LayoutDashboard, 
  Scan, 
  Sprout, 
  Bot, 
  Droplets, 
  Award,
  Globe2 
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, plantCount }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'scanner', label: 'AI Optical Scanner', icon: Scan, highlight: true },
    { id: 'garden', label: 'My Garden Specimen', icon: Sprout, badge: plantCount },
    { id: 'assistant', label: 'Botanical RAG & AI Chat', icon: Bot },
    { id: 'water', label: 'SDG 6 Water Impact', icon: Droplets }
  ];

  return (
    <aside className="sidebar">
      <div className="brand-header">
        <div className="brand-logo">
          <Sprout size={24} />
        </div>
        <div>
          <div className="brand-title">GreenCare AI</div>
          <div className="brand-subtitle">Smart Botanical Hydrology</div>
        </div>
      </div>

      <ul className="nav-list">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <li key={item.id}>
              <button
                className={`nav-item ${isActive ? 'active' : ''}`}
                onClick={() => setActiveTab(item.id)}
              >
                <Icon className="icon" />
                <span style={{ flex: 1 }}>{item.label}</span>
                {item.badge !== undefined && (
                  <span style={{ 
                    fontFamily: 'var(--font-mono)', 
                    fontSize: '0.72rem', 
                    background: 'rgba(16, 185, 129, 0.25)', 
                    color: 'var(--primary-emerald)',
                    padding: '2px 8px',
                    borderRadius: '999px',
                    fontWeight: 700
                  }}>
                    {item.badge}
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>

      <div className="sdg-badge-card">
        <div className="sdg-pill">
          <Globe2 size={12} /> UN SDG 6 & SDG 15
        </div>
        <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
          Conserving potable water through optical AI plant stress prediction & turgor modeling.
        </p>
      </div>
    </aside>
  );
}
