import { Droplet, Heart, Cpu, Globe2, Award } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs py-12 px-4 sm:px-6 lg:px-8 mt-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Col 1: Brand & Overview */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
              <Droplet className="w-5 h-5 text-emerald-400" />
            </div>
            <span className="text-base font-bold text-white tracking-wide">Smart Water Guardian</span>
          </div>
          <p className="text-slate-400 leading-relaxed">
            AI & IoT powered smart irrigation and precision farming platform built for sustainable agriculture, climate adaptation, and groundwater conservation.
          </p>
          <div className="flex items-center gap-2 text-agri-400 font-semibold">
            <Award className="w-4 h-4 text-emerald-400" /> NextStep Hacks 2026 Environment Challenge
          </div>
        </div>

        {/* Col 2: SDG Goals */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-slate-200 tracking-wide uppercase">UN SDG Alignment</h4>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-400"></span>
              <span>SDG 6: Clean Water & Sanitation</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>SDG 13: Climate Action</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              <span>SDG 2: Zero Hunger & Sustainable Farming</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-400"></span>
              <span>SDG 9: Industry, Innovation & Infrastructure</span>
            </li>
          </ul>
        </div>

        {/* Col 3: Hardware & IoT Specs */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-slate-200 tracking-wide uppercase">IoT & Hardware Tech</h4>
          <ul className="space-y-2 text-slate-400">
            <li className="flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5 text-aqua-400" /> ESP32-WROOM-32 Microcontroller
            </li>
            <li className="flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5 text-aqua-400" /> Capacitive Soil Moisture Sensor (v1.2)
            </li>
            <li className="flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5 text-aqua-400" /> DHT22 Ambient Temp/Humidity Sensor
            </li>
            <li className="flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5 text-aqua-400" /> MQTT Protocol over GSM / LoRaWAN
            </li>
          </ul>
        </div>

        {/* Col 4: Regional Languages & Contact */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-slate-200 tracking-wide uppercase">Farmer Accessibility</h4>
          <p className="text-slate-400">
            Designed for low digital literacy with large UI buttons, voice recognition in Hindi, Punjabi, Gujarati, Marathi, Tamil, and offline SMS fallback.
          </p>
          <div className="pt-2 flex items-center gap-2 text-slate-500">
            <Globe2 className="w-4 h-4 text-slate-400" /> 
            <span>Built for Indian & Global Farmers</span>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-500">
        <p>© 2026 Smart Water Guardian. Open source for agricultural sustainability.</p>
        <div className="flex items-center gap-1">
          <span>Crafted with</span>
          <Heart className="w-4 h-4 text-red-500 fill-red-500" />
          <span>for Farmers & Climate Action</span>
        </div>
      </div>
    </footer>
  );
};
