import React from 'react';
import { useFarmContext } from '../context/FarmContext';
import { 
  Droplet, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  CloudRain, 
  TrendingUp, 
  Mic, 
  Cpu, 
  Sliders,
  Flame,
  Activity
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setActiveTab, setIsVoiceAssistantOpen } = useFarmContext();

  return (
    <div className="space-y-16 py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border border-slate-800 p-8 sm:p-12 lg:p-16 shadow-2xl">
        {/* Glow Effects */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-aqua-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-agri-500/15 border border-agri-500/30 text-agri-400 font-semibold text-xs tracking-wide">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>NextStep Hacks 2026 Winner Submission</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
              Smart Water <span className="agri-gradient-text">Guardian</span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 font-light leading-relaxed">
              AI + IoT based Smart Irrigation and Water Conservation Platform. Save up to <strong className="text-emerald-400 font-semibold">50% water</strong>, cut electricity costs, and boost crop productivity with precision soil moisture telemetry & weather intelligence.
            </p>

            <blockquote className="border-l-4 border-emerald-500 pl-4 text-slate-400 italic text-sm py-1 bg-slate-900/50 rounded-r-lg">
              "FarmSphere helps farmers save water, reduce resource waste, and improve crop yields through AI-powered irrigation recommendations."
            </blockquote>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => setActiveTab('dashboard')}
                className="agri-button-primary px-6 py-3.5 text-sm flex items-center gap-2 shadow-xl hover:scale-105"
              >
                <span>Launch Farmer Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setActiveTab('ai-advisor')}
                className="agri-button-aqua px-6 py-3.5 text-sm flex items-center gap-2 shadow-xl hover:scale-105"
              >
                <BrainCircuitIcon className="w-4 h-4" />
                <span>Test AI Recommendation Engine</span>
              </button>

              <button
                onClick={() => setIsVoiceAssistantOpen(true)}
                className="px-5 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-sm flex items-center gap-2 transition-all"
              >
                <Mic className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span>Try Voice Assistant (Hindi/English)</span>
              </button>
            </div>

            {/* Micro Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800">
              <div>
                <div className="text-2xl font-bold text-emerald-400">30 - 50%</div>
                <div className="text-xs text-slate-400">Water Saved</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-aqua-400">₹4,200/mo</div>
                <div className="text-xs text-slate-400">Electricity Saved</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-amber-400">+15%</div>
                <div className="text-xs text-slate-400">Crop Yield Boost</div>
              </div>
            </div>
          </div>

          {/* Right Hero Interactive Teaser Card */}
          <div className="lg:col-span-5">
            <div className="glass-panel rounded-2xl p-6 border border-agri-500/30 shadow-2xl space-y-5">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></span>
                  <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">Live IoT Telemetry Node</span>
                </div>
                <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-mono">ESP32 Online</span>
              </div>

              {/* Moisture Gauge Widget */}
              <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-800 space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Soil Moisture (Root Zone)</span>
                  <span className="text-emerald-400 font-bold">26% (Threshold Warning)</span>
                </div>
                <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden p-0.5 border border-slate-700">
                  <div className="bg-gradient-to-r from-amber-500 to-emerald-500 h-full rounded-full w-[26%] transition-all duration-500"></div>
                </div>
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>0% Dry</span>
                  <span>35% Optimal Target</span>
                  <span>100% Saturation</span>
                </div>
              </div>

              {/* AI Recommendation Teaser */}
              <div className="bg-gradient-to-br from-slate-900 to-emerald-950/40 rounded-xl p-4 border border-agri-500/40 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                  <CloudRain className="w-4 h-4 text-sky-400" />
                  <span>AI Weather Decision Engine</span>
                </div>
                <p className="text-xs text-slate-300 leading-snug">
                  "Rain expected tomorrow (75% probability). Delay irrigation by 18 hours to prevent over-irrigation & save ~4,200L water."
                </p>
              </div>

              {/* Interactive Quick Pump Switch */}
              <div className="flex items-center justify-between p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                <div className="text-xs">
                  <div className="font-semibold text-slate-200">Main Tube-well Pump</div>
                  <div className="text-slate-400 text-[10px]">Auto-Mode Enabled</div>
                </div>
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className="px-3 py-1.5 rounded-lg bg-agri-600 hover:bg-agri-500 text-white font-semibold text-xs shadow"
                >
                  Manage Pump
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* PROBLEM vs SOLUTION SECTION */}
      <section className="space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="text-3xl font-bold text-white tracking-tight">The Agricultural Water Crisis & Our Solution</h2>
          <p className="text-slate-400 text-sm">
            Agriculture consumes nearly 70% of freshwater globally. Traditional experience-based irrigation leads to over-watering, falling water tables, and high electricity bills.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Problem Card */}
          <div className="glass-card rounded-2xl p-6 border-red-500/20 bg-gradient-to-b from-red-950/20 to-slate-900 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
              <Flame className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">The Problem</h3>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">•</span>
                <span><strong>70% Freshwater Waste:</strong> Farmers over-irrigate fields based on fixed timers rather than actual soil moisture.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">•</span>
                <span><strong>Groundwater Depletion:</strong> Rapidly sinking water tables require deeper borewells and high electricity consumption.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">•</span>
                <span><strong>Crop Root Damage & Salinization:</strong> Over-watering suffocates crop roots and degrades soil fertility.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">•</span>
                <span><strong>Late Disease Identification:</strong> Fungal outbreaks triggered by excess moisture are detected too late.</span>
              </li>
            </ul>
          </div>

          {/* Solution Card */}
          <div className="glass-card rounded-2xl p-6 border-agri-500/30 bg-gradient-to-b from-emerald-950/20 to-slate-900 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Droplet className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Smart Water Guardian Solution</h3>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong>Real-time IoT Soil Sensing:</strong> Low-cost capacitive sensors deliver live moisture & temperature feeds.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong>AI Irrigation Scheduling:</strong> Machine learning evaluates crop growth stage + weather forecasts to prescribe exact irrigation duration.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong>Voice Assistant in Regional Languages:</strong> Simple voice queries in Hindi, Punjabi, Gujarati, Marathi, Tamil for non-tech-savvy farmers.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong>Automated Valve Control:</strong> Smart relays turn pumps ON/OFF based on precise moisture thresholds.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CORE FEATURES GRID */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-white">Key Platform Features</h2>
          <p className="text-slate-400 text-sm mt-2">Built for hackathons, designed for real-world agricultural impact.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="glass-card rounded-xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Activity className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">Real-Time Telemetry</h4>
            <p className="text-xs text-slate-400">Tracks soil moisture, ambient humidity, temperature, and pump status live from ESP32 field nodes.</p>
          </div>

          <div className="glass-card rounded-xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-aqua-500/20 flex items-center justify-center text-aqua-400">
              <CloudRain className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">Weather Intelligence</h4>
            <p className="text-xs text-slate-400">Integrates 7-day rainfall forecasts to delay irrigation when rain is expected, preventing water waste.</p>
          </div>

          <div className="glass-card rounded-xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400">
              <Mic className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">Multilingual Voice Bot</h4>
            <p className="text-xs text-slate-400">Supports Hindi ("Mere khet ko paani kab dena hai?"), Punjabi, Gujarati, Marathi, Tamil voice queries.</p>
          </div>

          <div className="glass-card rounded-xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400">
              <Sliders className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">Auto Pump Relay</h4>
            <p className="text-xs text-slate-400">Smart trigger rules turn pumps ON when moisture drops below threshold and OFF when saturated.</p>
          </div>

          <div className="glass-card rounded-xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">Water & Carbon Impact</h4>
            <p className="text-xs text-slate-400">Calculates liters saved, electricity cost savings (₹), and CO₂ footprint reduction for sustainability reporting.</p>
          </div>

          <div className="glass-card rounded-xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-teal-500/20 flex items-center justify-center text-teal-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">FPO & NGO Portal</h4>
            <p className="text-xs text-slate-400">Multi-farm regional dashboard for cooperatives to track water conservation across hundreds of acres.</p>
          </div>

        </div>
      </section>

      {/* HARDWARE PROTOTYPE ARCHITECTURE */}
      <section className="glass-panel rounded-2xl p-8 border border-slate-800 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-2xl font-bold text-white">Hardware & System Architecture</h3>
            <p className="text-xs text-slate-400">Low-cost IoT prototype stack (~₹3,500 total cost per field node)</p>
          </div>
          <div className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs text-emerald-400 font-mono">
            ESP32 + MQTT + Node.js + React
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 text-center">
          <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="text-emerald-400 font-bold text-sm">1. Soil Sensors</div>
            <p className="text-[11px] text-slate-400">Capacitive Moisture v1.2 + DHT22 Temp/Humidity</p>
          </div>
          <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="text-emerald-400 font-bold text-sm">2. ESP32 Gateway</div>
            <p className="text-[11px] text-slate-400">Microcontroller transmitting via Wi-Fi / GSM</p>
          </div>
          <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="text-emerald-400 font-bold text-sm">3. MQTT Broker</div>
            <p className="text-[11px] text-slate-400">Low-latency sensor telemetry streaming</p>
          </div>
          <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="text-emerald-400 font-bold text-sm">4. AI Engine</div>
            <p className="text-[11px] text-slate-400">Crop Evapotranspiration + Weather API ML model</p>
          </div>
          <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="text-emerald-400 font-bold text-sm">5. Farmer App</div>
            <p className="text-[11px] text-slate-400">Voice Assistant + SMS + Web Dashboard</p>
          </div>
        </div>
      </section>

    </div>
  );
};

function BrainCircuitIcon(props: any) {
  return <Cpu {...props} />;
}
