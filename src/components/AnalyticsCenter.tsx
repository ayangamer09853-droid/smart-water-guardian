import React from 'react';
import { useFarmContext } from '../context/FarmContext';
import { MOCK_WATER_ANALYTICS } from '../data/mockData';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend, 
  AreaChart, 
  Area 
} from 'recharts';
import { BarChart3, TrendingUp, IndianRupee, Leaf, Droplet } from 'lucide-react';

export const AnalyticsCenter: React.FC = () => {
  const { selectedFarm } = useFarmContext();

  return (
    <div className="space-y-8 py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900/90 border border-slate-800 p-6 rounded-2xl">
        <div>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-7 h-7 text-emerald-400" />
            <h1 className="text-2xl font-bold text-white">Water & Carbon Savings Analytics</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Quantifiable environmental & financial metrics for <strong className="text-emerald-400">{selectedFarm.name}</strong>
          </p>
        </div>

        <div className="flex gap-2">
          <button className="px-3 py-1.5 rounded-lg bg-agri-600 text-white text-xs font-semibold">Weekly</button>
          <button className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white text-xs font-semibold">Monthly</button>
          <button className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white text-xs font-semibold">Season</button>
        </div>
      </div>

      {/* KPI HIGHLIGHT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="glass-card rounded-2xl p-5 space-y-2 border border-slate-800">
          <div className="flex justify-between text-slate-400 text-xs">
            <span>Water Saved This Week</span>
            <Droplet className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold text-emerald-400">18,700 L</div>
          <div className="text-[10px] text-emerald-300 font-semibold bg-emerald-950/60 px-2 py-0.5 rounded w-max">
            ↓ 44% vs Flood Irrigation
          </div>
        </div>

        <div className="glass-card rounded-2xl p-5 space-y-2 border border-slate-800">
          <div className="flex justify-between text-slate-400 text-xs">
            <span>Electricity Bill Saved</span>
            <IndianRupee className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-extrabold text-amber-400">₹1,435</div>
          <div className="text-[10px] text-amber-300 font-semibold bg-amber-950/60 px-2 py-0.5 rounded w-max">
            Saved 18.5 Pump Hours
          </div>
        </div>

        <div className="glass-card rounded-2xl p-5 space-y-2 border border-slate-800">
          <div className="flex justify-between text-slate-400 text-xs">
            <span>CO₂ Footprint Reduced</span>
            <Leaf className="w-4 h-4 text-teal-400" />
          </div>
          <div className="text-3xl font-extrabold text-teal-400">{selectedFarm.carbonSavedKg} kg</div>
          <div className="text-[10px] text-teal-300 font-semibold bg-teal-950/60 px-2 py-0.5 rounded w-max">
            Diesel Generator Off
          </div>
        </div>

        <div className="glass-card rounded-2xl p-5 space-y-2 border border-slate-800">
          <div className="flex justify-between text-slate-400 text-xs">
            <span>Yield Improvement</span>
            <TrendingUp className="w-4 h-4 text-aqua-400" />
          </div>
          <div className="text-3xl font-extrabold text-aqua-400">+{selectedFarm.yieldBoostPercent}%</div>
          <div className="text-[10px] text-aqua-300 font-semibold bg-aqua-950/60 px-2 py-0.5 rounded w-max">
            Prevents Root Rot
          </div>
        </div>

      </div>

      {/* CHART 1: WATER CONSUMPTION vs SAVINGS */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Droplet className="w-5 h-5 text-emerald-400" />
          <span>Smart Water Guardian vs Traditional Flood Irrigation (Liters)</span>
        </h3>

        <div className="h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={MOCK_WATER_ANALYTICS}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
              />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Bar dataKey="actualUsed" name="Smart Water Guardian (L)" fill="#22c55e" radius={[6, 6, 0, 0]} />
              <Bar dataKey="traditionalUsed" name="Traditional Irrigation (L)" fill="#475569" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* CHART 2: DAILY WATER SAVINGS TREND AREA CHART */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-aqua-400" />
          <span>Daily Net Water Conserved Trend (Liters)</span>
        </h3>

        <div className="h-64 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={MOCK_WATER_ANALYTICS}>
              <defs>
                <linearGradient id="colorSaved" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
              />
              <Area type="monotone" dataKey="saved" name="Net Conserved (L)" stroke="#0ea5e9" fillOpacity={1} fill="url(#colorSaved)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};
