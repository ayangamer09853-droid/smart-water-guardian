import React from 'react';
import { useFarmContext } from '../context/FarmContext';
import type { Language } from '../types';
import { 
  Droplet, 
  LayoutDashboard, 
  Cpu, 
  BrainCircuit, 
  CloudSun, 
  BarChart3, 
  Mic, 
  Users, 
  ShieldCheck, 
  Globe, 
  Bell, 
  Sparkles
} from 'lucide-react';

const LANGUAGES: { code: Language; label: string; native: string }[] = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
  { code: 'pa', label: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
  { code: 'gu', label: 'Gujarati', native: 'ગુજરાતી' },
  { code: 'mr', label: 'Marathi', native: 'मराठी' },
  { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
];

export const Navbar: React.FC = () => {
  const { 
    farms, 
    selectedFarmId, 
    setSelectedFarmId, 
    activeTab, 
    setActiveTab, 
    language, 
    setLanguage,
    userRole,
    setUserRole,
    setIsVoiceAssistantOpen,
    notificationMessage
  } = useFarmContext();

  const navItems = [
    { id: 'landing', label: 'Home', icon: Droplet },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'sensors', label: 'Sensors IoT', icon: Cpu },
    { id: 'ai-advisor', label: 'AI Advisor', icon: BrainCircuit },
    { id: 'weather', label: 'Weather', icon: CloudSun },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'community', label: 'Community', icon: Users },
    { id: 'admin', label: 'Admin/FPO', icon: ShieldCheck },
  ];

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-800/80 shadow-2xl">
      {/* Top Banner Bar */}
      <div className="bg-gradient-to-r from-agri-950 via-slate-900 to-aqua-950 border-b border-agri-500/20 px-4 py-1.5 text-xs text-slate-300 flex flex-wrap justify-between items-center gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-agri-500/20 text-agri-400 border border-agri-500/30">
            <Sparkles className="w-3 h-3 mr-1" /> NextStep Hacks 2026
          </span>
          <span className="hidden sm:inline text-slate-400">|</span>
          <span className="font-medium text-emerald-300 hidden sm:inline">AI + IoT Smart Water & Climate Resilience Platform</span>
        </div>

        <div className="flex items-center gap-3">
          {/* Farm Quick Selector */}
          <div className="flex items-center gap-1.5 bg-slate-800/80 border border-slate-700 rounded-lg px-2.5 py-1 text-xs">
            <span className="text-slate-400">Farm:</span>
            <select
              value={selectedFarmId}
              onChange={(e) => setSelectedFarmId(e.target.value)}
              className="bg-transparent text-emerald-400 font-semibold focus:outline-none cursor-pointer"
            >
              {farms.map(f => (
                <option key={f.id} value={f.id} className="bg-slate-900 text-slate-200">
                  {f.name} ({f.cropType})
                </option>
              ))}
            </select>
          </div>

          {/* User Role Switcher */}
          <div className="flex items-center gap-1 bg-slate-800/80 border border-slate-700 rounded-lg p-0.5 text-xs">
            <button
              onClick={() => setUserRole('farmer')}
              className={`px-2 py-0.5 rounded-md font-medium transition-all ${userRole === 'farmer' ? 'bg-agri-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
            >
              Farmer
            </button>
            <button
              onClick={() => setUserRole('admin')}
              className={`px-2 py-0.5 rounded-md font-medium transition-all ${userRole === 'admin' ? 'bg-aqua-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
            >
              Admin/FPO
            </button>
          </div>

          {/* Multilingual Selector */}
          <div className="flex items-center gap-1 bg-slate-800/80 border border-slate-700 rounded-lg px-2 py-1 text-xs text-slate-300">
            <Globe className="w-3.5 h-3.5 text-aqua-400" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="bg-transparent text-slate-200 font-medium focus:outline-none cursor-pointer"
            >
              {LANGUAGES.map(l => (
                <option key={l.code} value={l.code} className="bg-slate-900 text-slate-200">
                  {l.native}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand Name */}
          <div 
            onClick={() => setActiveTab('landing')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-agri-600 via-emerald-500 to-aqua-500 p-0.5 shadow-lg shadow-agri-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Droplet className="w-6 h-6 text-emerald-400 fill-emerald-400/20 animate-pulse-slow" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold tracking-tight text-white">Smart Water</span>
                <span className="text-xl font-bold tracking-tight text-emerald-400">Guardian</span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium tracking-wide">AI & IoT FARM WATER RESILIENCE</p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-2xl border border-slate-800/80">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-agri-600 to-emerald-600 text-white shadow-lg shadow-agri-900/50 scale-[1.02]'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Action Callouts: Voice Assistant & Notifications */}
          <div className="flex items-center gap-3">
            {/* Multilingual Voice Assistant Button */}
            <button
              onClick={() => setIsVoiceAssistantOpen(true)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-aqua-600 via-sky-500 to-emerald-500 text-white font-semibold text-xs shadow-lg shadow-sky-500/20 hover:brightness-110 active:scale-95 transition-all animate-bounce-slow"
              title="Speak in Hindi, Punjabi, Gujarati..."
            >
              <Mic className="w-4 h-4 text-white animate-pulse" />
              <span className="hidden sm:inline font-bold">Voice Assistant</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Scrollable Sub-nav */}
      <div className="lg:hidden flex overflow-x-auto gap-2 px-4 py-2 bg-slate-950/90 border-t border-slate-800 scrollbar-none">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-1.5 whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-medium ${
                isActive ? 'bg-agri-600 text-white' : 'text-slate-400 hover:bg-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Floating Global Toast Notification */}
      {notificationMessage && (
        <div className="fixed top-20 right-4 z-50 bg-slate-900 text-emerald-300 border border-agri-500/40 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-slide-in">
          <Bell className="w-5 h-5 text-agri-400 animate-bounce" />
          <span className="text-xs font-semibold">{notificationMessage}</span>
        </div>
      )}
    </header>
  );
};
