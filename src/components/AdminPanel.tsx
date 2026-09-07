import React, { useState } from 'react';
import { useFarmContext } from '../context/FarmContext';
import { ShieldCheck, Send, Bell, MapPin } from 'lucide-react';

export const AdminPanel: React.FC = () => {
  const { farms, sensors, showNotification } = useFarmContext();
  const [broadcastMessage, setBroadcastMessage] = useState('');

  const totalAcres = farms.reduce((acc, f) => acc + f.areaAcres, 0);
  const totalWaterSaved = farms.reduce((acc, f) => acc + f.waterSavedLiters, 0);
  const onlineSensors = sensors.filter(s => s.status === 'ONLINE').length;

  const handleBroadcastAlert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastMessage.trim()) return;
    showNotification(`Emergency Broadcast dispatched via WhatsApp/SMS to all registered farmers: "${broadcastMessage.trim()}"`);
    setBroadcastMessage('');
  };

  return (
    <div className="space-y-8 py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900/90 border border-slate-800 p-6 rounded-2xl">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-7 h-7 text-aqua-400" />
            <h1 className="text-2xl font-bold text-white">FPO & Agricultural Agency Regional Portal</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Overseeing water conservation analytics, IoT hardware nodes, and heatwave alerts across district farm clusters.
          </p>
        </div>

        <div className="px-3 py-1.5 rounded-xl bg-aqua-950 border border-aqua-500/40 text-aqua-300 font-mono text-xs">
          Role: FPO Regional Director
        </div>
      </div>

      {/* REGIONAL STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-1">
          <div className="text-xs text-slate-400">Total Registered Farms</div>
          <div className="text-3xl font-extrabold text-white">{farms.length} Clusters</div>
          <div className="text-[10px] text-emerald-400">{totalAcres} Total Cultivated Acres</div>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-1">
          <div className="text-xs text-slate-400">Regional Water Conserved</div>
          <div className="text-3xl font-extrabold text-emerald-400">
            {totalWaterSaved.toLocaleString()} L
          </div>
          <div className="text-[10px] text-slate-400">Prevents Aquifer Depletion</div>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-1">
          <div className="text-xs text-slate-400">Active Field Sensors</div>
          <div className="text-3xl font-extrabold text-aqua-400">{onlineSensors} / {sensors.length}</div>
          <div className="text-[10px] text-emerald-400">100% Telemetry Uptime</div>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-1">
          <div className="text-xs text-slate-400">Active Crop Varieties</div>
          <div className="text-3xl font-extrabold text-amber-400">Wheat, Cotton, Rice</div>
          <div className="text-[10px] text-slate-400">Multi-crop AI models loaded</div>
        </div>

      </div>

      {/* MULTI-FARM TELEMETRY TABLE */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-white">Cluster Telemetry Overview</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-slate-300">
            <thead className="bg-slate-900 text-slate-400 uppercase text-[10px]">
              <tr>
                <th className="p-3">Farm Name</th>
                <th className="p-3">Location</th>
                <th className="p-3">Crop Type</th>
                <th className="p-3">Moisture %</th>
                <th className="p-3">Pump State</th>
                <th className="p-3">Season Water Saved</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {farms.map(f => (
                <tr key={f.id} className="hover:bg-slate-800/40">
                  <td className="p-3 font-semibold text-white">{f.name}</td>
                  <td className="p-3 text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-red-400" /> {f.location}
                  </td>
                  <td className="p-3 text-slate-300">{f.cropType}</td>
                  <td className="p-3 font-mono font-bold text-emerald-400">{f.soilMoisture}%</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      f.pumpStatus === 'ON' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {f.pumpStatus} ({f.pumpMode})
                    </span>
                  </td>
                  <td className="p-3 font-mono text-emerald-400">{f.waterSavedLiters.toLocaleString()} L</td>
                  <td className="p-3">
                    <button 
                      onClick={() => showNotification(`Audit report dispatched for ${f.name}`)}
                      className="text-xs text-aqua-400 hover:underline cursor-pointer"
                    >
                      Audit Report
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* DISPATCH SMS / WHATSAPP BROADCAST ALERT */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Bell className="w-5 h-5 text-amber-400" />
          <span>Dispatch District Emergency Alert (SMS & WhatsApp Gateway)</span>
        </h3>

        <form onSubmit={handleBroadcastAlert} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Broadcast Alert Message (Translates automatically to Hindi, Punjabi, Gujarati)</label>
            <textarea
              rows={3}
              required
              placeholder="e.g. Heatwave warning issued for Ludhiana district. Irrigate fields during early morning hours (5 AM - 7 AM) to prevent evaporation loss."
              value={broadcastMessage}
              onChange={(e) => setBroadcastMessage(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-agri-500"
            ></textarea>
          </div>

          <button
            type="submit"
            className="agri-button-aqua px-6 py-2.5 text-xs flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>Send Alert to All Farmers</span>
          </button>
        </form>
      </div>

    </div>
  );
};
