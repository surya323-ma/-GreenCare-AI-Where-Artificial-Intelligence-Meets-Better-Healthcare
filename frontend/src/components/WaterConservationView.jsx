import React from 'react';
import { Droplets, Award, Download, Globe2, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function WaterConservationView({ waterLogs, totalWaterConserved }) {
  const handleExportCSV = () => {
    let csv = 'ID,Plant Name,Directive,Rationale,Liters Conserved,Timestamp\n';
    waterLogs.forEach((log) => {
      csv += `"${log.id}","${log.plantName}","${log.directive}","${log.rationale.replace(/"/g, '""')}","${log.litersConserved}","${log.loggedAt}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `GreenCare_Water_Conservation_Audit_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="view-container">
      {/* Top Banner */}
      <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(6, 182, 212, 0.08))', border: '1px solid var(--bg-card-border-glow)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <div className="sdg-pill" style={{ marginBottom: '0.75rem' }}>
              <Globe2 size={14} /> UN SDG 6: Clean Water & Sanitation
            </div>
            <h2 style={{ fontSize: '1.6rem', marginBottom: '0.4rem' }}>Precision Hydrology & Water Conservation Hub</h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', maxWidth: '650px' }}>
              By suppressing indiscriminate routine watering and acting on AI optical turgor directives, this workspace has prevented municipal water waste.
            </p>
          </div>

          <div style={{ textAlign: 'center', background: 'rgba(10, 19, 21, 0.8)', padding: '1.25rem 2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--bg-card-border)' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '0.25rem' }}>TOTAL WATER SAVED</div>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary-emerald)', fontFamily: 'var(--font-mono)' }}>
              {totalWaterConserved.toFixed(2)} L
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--primary-emerald)' }}>+14.2% vs typical household baseline</div>
          </div>
        </div>
      </div>

      {/* Water Logs Table */}
      <div className="glass-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Droplets color="var(--primary-emerald)" size={22} />
            <h2 style={{ fontSize: '1.15rem' }}>Water Conservation Audit Log</h2>
          </div>

          <button className="primary-btn" onClick={handleExportCSV}>
            <Download size={16} /> Export Audit CSV
          </button>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--bg-card-border)', color: 'var(--text-dim)', fontSize: '0.78rem', textTransform: 'uppercase' }}>
                <th style={{ padding: '0.75rem' }}>Plant Specimen</th>
                <th style={{ padding: '0.75rem' }}>AI Directive</th>
                <th style={{ padding: '0.75rem' }}>Rationale</th>
                <th style={{ padding: '0.75rem' }}>Liters Conserved</th>
                <th style={{ padding: '0.75rem' }}>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {waterLogs.map((log) => (
                <tr key={log.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>
                  <td style={{ padding: '0.85rem', fontWeight: 700 }}>{log.plantName}</td>
                  <td style={{ padding: '0.85rem' }}>
                    <span style={{ background: 'rgba(16, 185, 129, 0.15)', color: 'var(--primary-emerald)', padding: '3px 8px', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 800 }}>
                      {log.directive}
                    </span>
                  </td>
                  <td style={{ padding: '0.85rem', color: 'var(--text-muted)', maxWidth: '380px' }}>{log.rationale}</td>
                  <td style={{ padding: '0.85rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--primary-emerald)' }}>
                    +{log.litersConserved} L
                  </td>
                  <td style={{ padding: '0.85rem', color: 'var(--text-dim)', fontSize: '0.78rem' }}>
                    {new Date(log.loggedAt).toLocaleTimeString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
