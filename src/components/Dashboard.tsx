import React from 'react';
import { useFarmContext } from '../context/FarmContext';
import { 
  Droplet, 
  Power, 
  CloudRain, 
  Thermometer, 
  Wind, 
  Clock, 
  TrendingUp, 
  Sliders, 
  Mic, 
  Sparkles,
  RefreshCw
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { 
    selectedFarm, 
    recommendations, 
    togglePump, 
    isPumpLoading, 
    setPumpMode, 
    updateSoilMoisture,
    setIsVoiceAssistantOpen,
    setActiveTab
  } = useFarmContext();

  const currentRec = recommendations[selectedFarm.id] || recommendations['farm-1'];

  // Moisture color indicator logic
  const getMoistureColor = (m: number) => {
    if (m < 25) return { text: 'text-amber-400', bg: 'bg-amber-500', border: 'border-amber-500/40', badge: 'bg-amber-500/20 text-amber-300', status: 'CRITICAL LOW' };
    if (m <= 65) return { text: 'text-emerald-400', bg: 'bg-emerald-500', border: 'border-emerald-500/40', badge: 'bg-emerald-500/20 text-emerald-300', status: 'OPTIMAL' };
    return { text: 'text-cyan-400', bg: 'bg-cyan-500', border: 'border-cyan-500/40', badge: 'bg-cyan-500/20 text-cyan-300', status: 'SATURATED' };
  };

  const moistureTheme = getMoistureColor(selectedFarm.soilMoisture);

  return (
    <div className="space-y-8 py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* HEADER BAR */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900/90 border border-slate-800 p-6 rounded-2xl shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{selectedFarm.name}</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-agri-500/20 text-agri-400 border border-agri-500/30">
              {selectedFarm.cropType}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Location: <strong className="text-slate-300">{selectedFarm.location}</strong> | Area: <strong className="text-slate-300">{selectedFarm.areaAcres} Acres</strong> | Stage: <strong className="text-emerald-400">{selectedFarm.growthStage}</strong>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsVoiceAssistantOpen(true)}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-2"
          >
            <Mic className="w-4 h-4 text-emerald-400" />
            <span>Voice Command</span>
          </button>

          <button
            onClick={() => setActiveTab('sensors')}
            className="px-4 py-2 rounded-xl bg-agri-600 hover:bg-agri-500 text-white text-xs font-semibold flex items-center gap-2 shadow-lg"
          >
            <Sliders className="w-4 h-4" />
            <span>IoT Sensors</span>
          </button>
        </div>
      </div>

      {/* AI RECOMMENDATION BANNER (TOP PRIORITY ALERT) */}
      <div className={`p-6 rounded-2xl border ${currentRec.status === 'CRITICAL_LOW' ? 'bg-amber-950/40 border-amber-500/50' : 'bg-gradient-to-r from-emerald-950/40 via-slate-900 to-aqua-950/40 border-agri-500/40'} shadow-2xl space-y-3`}>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-400 animate-pulse" />
            <h2 className="text-base font-bold text-white uppercase tracking-wider">AI Precision Advisory</h2>
          </div>
          <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
            {currentRec.timestamp}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-2">
            <h3 className="text-xl font-bold text-emerald-300">{currentRec.title}</h3>
            <p className="text-xs text-slate-200 leading-relaxed">{currentRec.actionText}</p>
            <p className="text-[11px] text-slate-400 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
              <strong className="text-slate-300">AI Reasoning:</strong> {currentRec.reasoning}
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col items-center justify-center bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="text-xs text-slate-400">Rain Forecasted Next 24h</div>
            <div className="text-3xl font-extrabold text-sky-400 flex items-center gap-1">
              <CloudRain className="w-6 h-6" />
              <span>{currentRec.rainProbabilityNext24h}%</span>
            </div>
            {currentRec.waterSavingsEstLiters > 0 && (
              <div className="text-[11px] text-emerald-400 font-semibold bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/30">
                Est. Water Saved: ~{currentRec.waterSavingsEstLiters.toLocaleString()} L
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CORE GAUGES & METRICS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Metric 1: Soil Moisture Gauge & Live Interactive Slider */}
        <div className="glass-card rounded-2xl p-6 space-y-4 border border-slate-800">
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold text-slate-400">Soil Moisture</span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${moistureTheme.badge}`}>
              {moistureTheme.status}
            </span>
          </div>

          <div className="flex items-baseline justify-between">
            <span className={`text-4xl font-extrabold ${moistureTheme.text}`}>
              {selectedFarm.soilMoisture}%
            </span>
            <Droplet className={`w-8 h-8 ${moistureTheme.text}`} />
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden p-0.5 border border-slate-700">
            <div 
              className={`h-full rounded-full transition-all duration-300 ${moistureTheme.bg}`}
              style={{ width: `${selectedFarm.soilMoisture}%` }}
            ></div>
          </div>

          {/* Interactive Slider for Hackathon Demo */}
          <div className="pt-2 border-t border-slate-800/80 space-y-1">
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>Simulate Sensor Reading:</span>
              <span className="font-mono text-emerald-400">{selectedFarm.soilMoisture}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="90"
              value={selectedFarm.soilMoisture}
              onChange={(e) => updateSoilMoisture(selectedFarm.id, parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>
        </div>

        {/* Metric 2: Ambient Temperature & Humidity */}
        <div className="glass-card rounded-2xl p-6 space-y-4 border border-slate-800">
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold text-slate-400">Ambient Climate</span>
            <span className="text-[10px] text-slate-400">Live Sensors</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
              <div className="text-[10px] text-slate-400 flex items-center gap-1">
                <Thermometer className="w-3.5 h-3.5 text-amber-400" /> Temp
              </div>
              <div className="text-2xl font-bold text-white mt-1">{selectedFarm.temperature}°C</div>
            </div>

            <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
              <div className="text-[10px] text-slate-400 flex items-center gap-1">
                <Wind className="w-3.5 h-3.5 text-aqua-400" /> Humidity
              </div>
              <div className="text-2xl font-bold text-white mt-1">{selectedFarm.humidity}%</div>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 flex items-center gap-1.5 pt-1">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            <span>Updated 2 minutes ago via ESP32</span>
          </div>
        </div>

        {/* Metric 3: Tube-well Pump State & Quick Controls */}
        <div className="glass-card rounded-2xl p-6 space-y-4 border border-slate-800">
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold text-slate-400">Tube-Well Motor</span>
            <span className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold ${selectedFarm.pumpStatus === 'ON' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-400'}`}>
              {selectedFarm.pumpStatus}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-slate-400">Mode</div>
              <div className="text-lg font-bold text-slate-200">{selectedFarm.pumpMode} TRIGGER</div>
            </div>
            
            <button
              onClick={() => togglePump(selectedFarm.id)}
              disabled={isPumpLoading}
              className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transition-all ${
                selectedFarm.pumpStatus === 'ON'
                  ? 'bg-red-600 hover:bg-red-500 text-white shadow-red-900/40 animate-pulse'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-900/40'
              }`}
            >
              {isPumpLoading ? (
                <RefreshCw className="w-6 h-6 animate-spin" />
              ) : (
                <Power className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-800">
            <span className="text-slate-400">Control Mode:</span>
            <div className="flex gap-1 bg-slate-900 p-0.5 rounded-lg border border-slate-800">
              <button
                onClick={() => setPumpMode(selectedFarm.id, 'AUTO')}
                className={`px-2 py-0.5 rounded text-[10px] font-bold ${selectedFarm.pumpMode === 'AUTO' ? 'bg-agri-600 text-white' : 'text-slate-400'}`}
              >
                AUTO
              </button>
              <button
                onClick={() => setPumpMode(selectedFarm.id, 'MANUAL')}
                className={`px-2 py-0.5 rounded text-[10px] font-bold ${selectedFarm.pumpMode === 'MANUAL' ? 'bg-aqua-600 text-white' : 'text-slate-400'}`}
              >
                MANUAL
              </button>
            </div>
          </div>
        </div>

        {/* Metric 4: Total Water & Sustainability Saved */}
        <div className="glass-card rounded-2xl p-6 space-y-4 border border-slate-800">
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold text-slate-400">Season Impact</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>

          <div>
            <div className="text-3xl font-extrabold text-emerald-400">
              {selectedFarm.waterSavedLiters.toLocaleString()} L
            </div>
            <div className="text-xs text-slate-400 mt-0.5">Water Conserved This Season</div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
            <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
              <span className="text-slate-400">CO₂ Reduced:</span>
              <div className="font-bold text-slate-200">{selectedFarm.carbonSavedKg} kg</div>
            </div>
            <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
              <span className="text-slate-400">Yield Boost:</span>
              <div className="font-bold text-emerald-400">+{selectedFarm.yieldBoostPercent}%</div>
            </div>
          </div>
        </div>

      </div>

      {/* QUICK ACTIONS BAR */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <button
          onClick={() => setActiveTab('weather')}
          className="p-4 rounded-2xl glass-card hover:bg-slate-800/80 border border-slate-800 flex items-center justify-between text-left group"
        >
          <div>
            <h4 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">7-Day Weather Radar</h4>
            <p className="text-xs text-slate-400">View humidity, rainfall probability & wind</p>
          </div>
          <CloudRain className="w-6 h-6 text-sky-400 group-hover:scale-110 transition-transform" />
        </button>

        <button
          onClick={() => setActiveTab('analytics')}
          className="p-4 rounded-2xl glass-card hover:bg-slate-800/80 border border-slate-800 flex items-center justify-between text-left group"
        >
          <div>
            <h4 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">Water & Cost Analytics</h4>
            <p className="text-xs text-slate-400">Weekly consumption vs savings graphs</p>
          </div>
          <TrendingUp className="w-6 h-6 text-emerald-400 group-hover:scale-110 transition-transform" />
        </button>

        <button
          onClick={() => setActiveTab('community')}
          className="p-4 rounded-2xl glass-card hover:bg-slate-800/80 border border-slate-800 flex items-center justify-between text-left group"
        >
          <div>
            <h4 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">Farmer Community</h4>
            <p className="text-xs text-slate-400">Share tips, pest alerts & government subsidies</p>
          </div>
          <Sparkles className="w-6 h-6 text-amber-400 group-hover:scale-110 transition-transform" />
        </button>
      </div>

    </div>
  );
};
