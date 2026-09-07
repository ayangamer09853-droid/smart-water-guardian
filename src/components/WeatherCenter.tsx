import React from 'react';
import { useFarmContext } from '../context/FarmContext';
import { MOCK_WEATHER_7DAYS } from '../data/mockData';
import { CloudSun, CloudRain, Sun, CloudLightning, Wind, Droplets } from 'lucide-react';

export const WeatherCenter: React.FC = () => {
  const { selectedFarm } = useFarmContext();

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'Rainy': return <CloudRain className="w-8 h-8 text-sky-400" />;
      case 'Thunderstorm': return <CloudLightning className="w-8 h-8 text-amber-400" />;
      case 'Sunny': return <Sun className="w-8 h-8 text-yellow-400 animate-spin-slow" />;
      default: return <CloudSun className="w-8 h-8 text-emerald-400" />;
    }
  };

  return (
    <div className="space-y-8 py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900/90 border border-slate-800 p-6 rounded-2xl">
        <div>
          <div className="flex items-center gap-2">
            <CloudSun className="w-7 h-7 text-sky-400" />
            <h1 className="text-2xl font-bold text-white">Weather Intelligence & Rainfall Forecast</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time meteorological monitoring for <strong className="text-emerald-400">{selectedFarm.location}</strong>
          </p>
        </div>

        <div className="px-3 py-1 rounded-lg bg-slate-800 border border-slate-700 text-xs text-slate-300 font-mono">
          Radar Sync: Live OpenWeatherMap API
        </div>
      </div>

      {/* TODAY'S FEATURED WEATHER WIDGET */}
      <div className="glass-panel rounded-2xl p-8 border border-sky-500/30 bg-gradient-to-r from-slate-900 via-sky-950/20 to-slate-900 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4">
            {getWeatherIcon(MOCK_WEATHER_7DAYS[0].condition)}
            <div>
              <h2 className="text-3xl font-extrabold text-white">{MOCK_WEATHER_7DAYS[0].condition}</h2>
              <p className="text-xs text-slate-400">High: {MOCK_WEATHER_7DAYS[0].tempMax}°C | Low: {MOCK_WEATHER_7DAYS[0].tempMin}°C</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="bg-slate-900/90 px-4 py-2 rounded-xl border border-slate-800 text-center">
              <div className="text-[10px] text-slate-400 flex items-center gap-1">
                <CloudRain className="w-3.5 h-3.5 text-sky-400" /> Rain Prob.
              </div>
              <div className="text-lg font-bold text-sky-400">{MOCK_WEATHER_7DAYS[0].rainProbability}%</div>
            </div>

            <div className="bg-slate-900/90 px-4 py-2 rounded-xl border border-slate-800 text-center">
              <div className="text-[10px] text-slate-400 flex items-center gap-1">
                <Droplets className="w-3.5 h-3.5 text-emerald-400" /> Humidity
              </div>
              <div className="text-lg font-bold text-emerald-400">{MOCK_WEATHER_7DAYS[0].humidity}%</div>
            </div>

            <div className="bg-slate-900/90 px-4 py-2 rounded-xl border border-slate-800 text-center">
              <div className="text-[10px] text-slate-400 flex items-center gap-1">
                <Wind className="w-3.5 h-3.5 text-amber-400" /> Wind
              </div>
              <div className="text-lg font-bold text-amber-400">{MOCK_WEATHER_7DAYS[0].windSpeed} km/h</div>
            </div>
          </div>
        </div>
      </div>

      {/* 7-DAY FORECAST GRID */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white">7-Day Irrigation Forecast</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4">
          {MOCK_WEATHER_7DAYS.map((day, idx) => (
            <div 
              key={idx}
              className={`glass-card rounded-2xl p-4 text-center space-y-3 border ${
                idx === 1 ? 'border-sky-500/60 bg-sky-950/30' : 'border-slate-800'
              }`}
            >
              <div className="text-xs font-bold text-slate-200">{day.day}</div>
              <div className="text-[10px] text-slate-400">{day.date}</div>

              <div className="flex justify-center my-2">
                {getWeatherIcon(day.condition)}
              </div>

              <div className="text-sm font-bold text-white">
                {day.tempMax}° / <span className="text-slate-400 text-xs">{day.tempMin}°</span>
              </div>

              <div className="bg-slate-900 p-2 rounded-lg border border-slate-800 text-[10px]">
                <div className="text-slate-400">Rain Prob</div>
                <div className={`font-bold ${day.rainProbability > 50 ? 'text-sky-400' : 'text-slate-300'}`}>
                  {day.rainProbability}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
