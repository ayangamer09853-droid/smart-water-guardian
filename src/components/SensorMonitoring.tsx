import React, { useState } from 'react';
import { useFarmContext } from '../context/FarmContext';
import { Cpu, Battery, Plus, Wifi } from 'lucide-react';

export const SensorMonitoring: React.FC = () => {
  const { sensors, selectedFarmId, selectedFarm, addSensorNode, showNotification } = useFarmContext();
  const [newSensorName, setNewSensorName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const farmSensors = sensors.filter(s => s.farmId === selectedFarmId);

  const handleAddSensor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSensorName.trim()) return;
    addSensorNode(selectedFarmId, newSensorName.trim());
    setNewSensorName('');
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8 py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* SECTION HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900/90 border border-slate-800 p-6 rounded-2xl">
        <div>
          <div className="flex items-center gap-2">
            <Cpu className="w-7 h-7 text-emerald-400" />
            <h1 className="text-2xl font-bold text-white">IoT Telemetry & Hardware Nodes</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Monitoring low-cost ESP32 microcontrollers, capacitive soil sensors & solar gateways for <strong className="text-emerald-400">{selectedFarm.name}</strong>
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="agri-button-primary px-4 py-2.5 text-xs flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Sensor Node</span>
        </button>
      </div>

      {/* SENSOR NODES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {farmSensors.map(sensor => (
          <div key={sensor.id} className="glass-card rounded-2xl p-6 space-y-4 border border-slate-800">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-base font-bold text-white">{sensor.nodeName}</h3>
                <div className="text-[10px] text-slate-400 font-mono mt-0.5">{sensor.firmwareVersion}</div>
              </div>

              <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                sensor.status === 'ONLINE' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-red-500/20 text-red-300'
              }`}>
                ● {sensor.status}
              </span>
            </div>

            {/* Readout Widgets */}
            <div className="grid grid-cols-2 gap-3 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
              <div>
                <div className="text-[10px] text-slate-400">Soil Moisture</div>
                <div className="text-2xl font-bold text-emerald-400">{sensor.moistureReading}%</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400">Soil Temp</div>
                <div className="text-2xl font-bold text-amber-400">{sensor.tempReading}°C</div>
              </div>
            </div>

            {/* Telemetry Status Bar */}
            <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-slate-800">
              <div className="flex items-center gap-2 text-slate-400">
                <Battery className="w-4 h-4 text-emerald-400" />
                <span>Battery: <strong className="text-slate-200">{sensor.batteryLevel}%</strong></span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <Wifi className="w-4 h-4 text-aqua-400" />
                <span>Signal: <strong className="text-slate-200">{sensor.signalStrength}%</strong></span>
              </div>
            </div>

            <div className="flex justify-between items-center text-[10px] text-slate-500 pt-2 border-t border-slate-800/60">
              <span>Last packet: {sensor.lastUpdated}</span>
              <button 
                onClick={() => showNotification(`Calibrated ${sensor.nodeName} offset successfully.`)}
                className="text-emerald-400 hover:underline cursor-pointer"
              >
                Calibrate Sensor
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* HARDWARE SPECIFICATIONS HACKATHON SUMMARY */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Cpu className="w-5 h-5 text-aqua-400" />
          <span>ESP32 Hardware Schematic & Cost Breakdown</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-slate-300">
            <thead className="bg-slate-900 text-slate-400 uppercase text-[10px]">
              <tr>
                <th className="p-3">Component</th>
                <th className="p-3">Model / Specification</th>
                <th className="p-3">Purpose</th>
                <th className="p-3">Est. Unit Cost (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              <tr>
                <td className="p-3 font-semibold text-white">Microcontroller Gateway</td>
                <td className="p-3 text-slate-400">ESP32-WROOM-32 (Wi-Fi + BLE + GSM)</td>
                <td className="p-3">Reads analog moisture data & sends MQTT packets</td>
                <td className="p-3 font-mono text-emerald-400">₹450</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-white">Soil Moisture Sensor</td>
                <td className="p-3 text-slate-400">Capacitive Moisture Sensor v1.2 (Corrosion resistant)</td>
                <td className="p-3">Measures dielectric permittivity of soil</td>
                <td className="p-3 font-mono text-emerald-400">₹120</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-white">Climate Sensor</td>
                <td className="p-3 text-slate-400">DHT22 / AM2302 Temp & Humidity Sensor</td>
                <td className="p-3">Measures ambient micro-climate evapotranspiration</td>
                <td className="p-3 font-mono text-emerald-400">₹220</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-white">Relay Module</td>
                <td className="p-3 text-slate-400">5V 10A Optocoupler Relay Board</td>
                <td className="p-3">Controls water pump starter relay</td>
                <td className="p-3 font-mono text-emerald-400">₹90</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-white">Solar Power & Battery</td>
                <td className="p-3 text-slate-400">5V Solar Panel + 18650 Li-ion 3.7V Battery</td>
                <td className="p-3">24/7 Off-grid power supply in fields</td>
                <td className="p-3 font-mono text-emerald-400">₹850</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD SENSOR MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4">
          <div className="glass-panel w-full max-w-md p-6 rounded-2xl border border-slate-800 space-y-4 animate-scale-up">
            <h3 className="text-lg font-bold text-white">Pair New ESP32 Field Sensor</h3>
            <form onSubmit={handleAddSensor} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Sensor Node Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. ESP32-Node #3 (North Plot)"
                  value={newSensorName}
                  onChange={(e) => setNewSensorName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-agri-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="agri-button-primary px-4 py-2 text-xs"
                >
                  Pair Node
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
