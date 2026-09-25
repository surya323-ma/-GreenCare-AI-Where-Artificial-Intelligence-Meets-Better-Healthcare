import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardView from './components/DashboardView';
import AiScannerView from './components/AiScannerView';
import GardenView from './components/GardenView';
import RagAssistantView from './components/RagAssistantView';
import WaterConservationView from './components/WaterConservationView';
import { ApiService } from './services/api';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [plants, setPlants] = useState([]);
  const [waterLogs, setWaterLogs] = useState([]);
  const [isBackendConnected, setIsBackendConnected] = useState(false);

  useEffect(() => {
    loadData();
    // Live sensor ticker simulation loop every 12 seconds
    const interval = setInterval(() => {
      setPlants((prevPlants) =>
        prevPlants.map((plant) => {
          const vwcDelta = (Math.random() - 0.5) * 0.8;
          const tempDelta = (Math.random() - 0.5) * 0.2;
          const rhDelta = (Math.random() - 0.5) * 0.4;
          return {
            ...plant,
            soilMoistureVwc: Math.max(10, Math.min(95, Math.round((plant.soilMoistureVwc + vwcDelta) * 10) / 10)),
            ambientTemp: Math.max(15, Math.min(40, Math.round((plant.ambientTemp + tempDelta) * 10) / 10)),
            ambientRh: Math.max(30, Math.min(90, Math.round((plant.ambientRh + rhDelta) * 10) / 10))
          };
        })
      );
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  const loadData = async () => {
    const plantsRes = await ApiService.getPlants();
    setPlants(plantsRes.data);
    setIsBackendConnected(plantsRes.isBackendConnected);

    const logsRes = await ApiService.getWaterLogs();
    setWaterLogs(logsRes.data);
  };

  const handleAddPlant = async (newPlant) => {
    const res = await ApiService.addPlant(newPlant);
    setPlants((prev) => [res.data, ...prev]);
  };

  const handleSimulateTick = async (plantId) => {
    const res = await ApiService.simulateSensorTick(plantId);
    setPlants((prev) => prev.map((p) => (p.id === plantId ? res.data : p)));
  };

  const handleSaveScanResult = async (scanResult) => {
    const res = await ApiService.logWaterEvent(
      scanResult.specimenName,
      scanResult.directive,
      scanResult.rationale,
      scanResult.waterSavingsLiters
    );
    setWaterLogs((prev) => [res.data, ...prev]);
    setActiveTab('water');
  };

  const totalWaterConserved = waterLogs.reduce((acc, log) => acc + (Number(log.litersConserved) || 0), 0);

  return (
    <div className="app-container">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        plantCount={plants.length} 
      />

      <div className="main-content">
        <Header 
          activeTab={activeTab} 
          onQuickScan={() => setActiveTab('scanner')} 
          totalWaterConserved={totalWaterConserved}
          isBackendConnected={isBackendConnected}
        />

        {activeTab === 'dashboard' && (
          <DashboardView 
            plants={plants} 
            waterLogs={waterLogs} 
            onNavigate={setActiveTab} 
          />
        )}

        {activeTab === 'scanner' && (
          <AiScannerView 
            plants={plants} 
            onSaveScan={handleSaveScanResult} 
          />
        )}

        {activeTab === 'garden' && (
          <GardenView 
            plants={plants} 
            onAddPlant={handleAddPlant} 
            onSimulateTick={handleSimulateTick} 
          />
        )}

        {activeTab === 'assistant' && (
          <RagAssistantView />
        )}

        {activeTab === 'water' && (
          <WaterConservationView 
            waterLogs={waterLogs} 
            totalWaterConserved={totalWaterConserved} 
          />
        )}
      </div>
    </div>
  );
}

export default App;
