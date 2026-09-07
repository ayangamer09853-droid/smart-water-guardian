import React from 'react';
import { useFarmContext } from '../context/FarmContext';
import { BrainCircuit, Sparkles, CheckCircle2, Zap } from 'lucide-react';

export const AiRecommendation: React.FC = () => {
  const { selectedFarm, recommendations, togglePump, setPumpMode } = useFarmContext();
  const currentRec = recommendations[selectedFarm.id] || recommendations['farm-1'];

  return (
    <div className="space-y-8 py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900/90 border border-slate-800 p-6 rounded-2xl">
        <div>
          <div className="flex items-center gap-2">
            <BrainCircuit className="w-7 h-7 text-emerald-400" />
            <h1 className="text-2xl font-bold text-white">AI Irrigation Advisor & Machine Learning Engine</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Calculating crop water requirement (ETc) using FAO Penman-Monteith equation, real-time sensor data, and hyper-local weather models.
          </p>
        </div>

        <div className="px-3 py-1.5 rounded-xl bg-emerald-950 border border-emerald-500/40 text-emerald-300 font-mono text-xs flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-400 animate-spin" />
          <span>Model Accuracy: 96.4%</span>
        </div>
      </div>

      {/* ACTIVE RECOMMENDATION CARD */}
      <div className="glass-panel rounded-2xl p-8 border border-agri-500/40 space-y-6 shadow-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/30">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs text-slate-400 uppercase tracking-widest font-semibold">Active Prescription</span>
            <h2 className="text-2xl font-extrabold text-emerald-300">{currentRec.title}</h2>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-800 text-slate-300 border border-slate-700">
            {currentRec.timestamp}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase">Recommended Action:</h4>
              <p className="text-sm font-semibold text-slate-100">{currentRec.actionText}</p>
            </div>

            <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase">Scientific Reasoning & Telemetry Analysis:</h4>
              <p className="text-xs text-slate-300 leading-relaxed">{currentRec.reasoning}</p>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => togglePump(selectedFarm.id)}
                className="agri-button-primary px-5 py-2.5 text-xs flex items-center gap-2"
              >
                <Zap className="w-4 h-4" />
                <span>Execute Recommendation (Toggle Pump)</span>
              </button>

              <button
                onClick={() => setPumpMode(selectedFarm.id, 'AUTO')}
                className="agri-button-aqua px-5 py-2.5 text-xs flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Enable Full AI Autonomous Mode</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-4">
            <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4 text-center">
              <div className="text-xs text-slate-400">Impact Analysis for {selectedFarm.name}</div>
              
              <div className="space-y-3">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <div className="text-[10px] text-slate-400">Estimated Water Savings</div>
                  <div className="text-2xl font-extrabold text-emerald-400">
                    ~{currentRec.waterSavingsEstLiters.toLocaleString()} L
                  </div>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <div className="text-[10px] text-slate-400">24-Hour Rain Risk</div>
                  <div className="text-2xl font-extrabold text-sky-400">
                    {currentRec.rainProbabilityNext24h}% Probability
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI FORMULA & MATHEMATICAL MODEL EXPLANATION */}
      <div className="glass-card rounded-2xl p-6 space-y-6 border border-slate-800">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <BrainCircuit className="w-5 h-5 text-emerald-400" />
          <span>How Smart Water Guardian AI Operates</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900/90 p-5 rounded-xl border border-slate-800 space-y-2">
            <div className="text-emerald-400 font-bold text-sm">Step 1: Telemetry Ingestion</div>
            <p className="text-xs text-slate-300">
              Reads soil moisture volumetric water content (VWC %), ambient temperature, relative humidity, and solar radiation from ESP32 field nodes every 15 minutes.
            </p>
          </div>

          <div className="bg-slate-900/90 p-5 rounded-xl border border-slate-800 space-y-2">
            <div className="text-aqua-400 font-bold text-sm">Step 2: Crop Coefficient (Kc)</div>
            <p className="text-xs text-slate-300">
              Calculates Crop Water Requirement: <br />
              <code className="text-emerald-300 font-mono text-[11px]">ETc = ETo × Kc</code><br />
              Tailored specifically for {selectedFarm.cropType} at the {selectedFarm.growthStage} stage.
            </p>
          </div>

          <div className="bg-slate-900/90 p-5 rounded-xl border border-slate-800 space-y-2">
            <div className="text-amber-400 font-bold text-sm">Step 3: Weather Fusion</div>
            <p className="text-xs text-slate-300">
              Fuses 7-day meteorological forecasts. If precipitation probability exceeds 65%, irrigation is automatically delayed to leverage natural rainfall.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
