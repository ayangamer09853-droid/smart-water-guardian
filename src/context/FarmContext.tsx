import React, { createContext, useContext, useState, type ReactNode } from 'react';
import type { Farm, SensorNode, AIRecommendation, Language, UserRole } from '../types';
import { INITIAL_FARMS, INITIAL_SENSORS, INITIAL_RECOMMENDATIONS } from '../data/mockData';

interface FarmContextType {
  farms: Farm[];
  selectedFarmId: string;
  selectedFarm: Farm;
  sensors: SensorNode[];
  recommendations: Record<string, AIRecommendation>;
  activeTab: string;
  language: Language;
  userRole: UserRole;
  isVoiceAssistantOpen: boolean;
  isPumpLoading: boolean;
  notificationMessage: string | null;
  setSelectedFarmId: (id: string) => void;
  setActiveTab: (tab: string) => void;
  setLanguage: (lang: Language) => void;
  setUserRole: (role: UserRole) => void;
  setIsVoiceAssistantOpen: (open: boolean) => void;
  togglePump: (farmId: string) => void;
  setPumpMode: (farmId: string, mode: 'AUTO' | 'MANUAL') => void;
  updateSoilMoisture: (farmId: string, moisture: number) => void;
  addSensorNode: (farmId: string, nodeName: string) => void;
  showNotification: (msg: string) => void;
}

const FarmContext = createContext<FarmContextType | undefined>(undefined);

export const FarmProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [farms, setFarms] = useState<Farm[]>(INITIAL_FARMS);
  const [selectedFarmId, setSelectedFarmId] = useState<string>('farm-1');
  const [sensors, setSensors] = useState<SensorNode[]>(INITIAL_SENSORS);
  const [recommendations, setRecommendations] = useState<Record<string, AIRecommendation>>(INITIAL_RECOMMENDATIONS);
  const [activeTab, setActiveTab] = useState<string>('landing');
  const [language, setLanguage] = useState<Language>('en');
  const [userRole, setUserRole] = useState<UserRole>('farmer');
  const [isVoiceAssistantOpen, setIsVoiceAssistantOpen] = useState<boolean>(false);
  const [isPumpLoading, setIsPumpLoading] = useState<boolean>(false);
  const [notificationMessage, setNotificationMessage] = useState<string | null>(null);

  const selectedFarm = farms.find(f => f.id === selectedFarmId) || farms[0];

  const showNotification = (msg: string) => {
    setNotificationMessage(msg);
    setTimeout(() => {
      setNotificationMessage(null);
    }, 4000);
  };

  const togglePump = (farmId: string) => {
    setIsPumpLoading(true);
    setTimeout(() => {
      setFarms(prev => prev.map(f => {
        if (f.id === farmId) {
          const newStatus = f.pumpStatus === 'ON' ? 'OFF' : 'ON';
          showNotification(`Water Pump turned ${newStatus} for ${f.name}`);
          return {
            ...f,
            pumpStatus: newStatus,
            lastIrrigated: newStatus === 'ON' ? 'Just now' : f.lastIrrigated,
            soilMoisture: newStatus === 'ON' ? Math.min(100, f.soilMoisture + 15) : f.soilMoisture
          };
        }
        return f;
      }));
      setIsPumpLoading(false);
    }, 800);
  };

  const setPumpMode = (farmId: string, mode: 'AUTO' | 'MANUAL') => {
    setFarms(prev => prev.map(f => {
      if (f.id === farmId) {
        showNotification(`Irrigation mode set to ${mode} for ${f.name}`);
        return { ...f, pumpMode: mode };
      }
      return f;
    }));
  };

  const updateSoilMoisture = (farmId: string, moisture: number) => {
    setFarms(prev => prev.map(f => {
      if (f.id === farmId) {
        // Recalculate recommendation based on new moisture
        let status: 'OPTIMAL' | 'IRRIGATE_NOW' | 'DELAY_RAIN' | 'CRITICAL_LOW' = 'OPTIMAL';
        let actionText = 'Soil moisture is optimal.';
        let reasoning = `Current soil moisture level is ${moisture}%.`;

        if (moisture < 20) {
          status = 'CRITICAL_LOW';
          actionText = 'CRITICAL: Irrigate immediately for 35 minutes!';
          reasoning = `Moisture has dropped to ${moisture}%. Root stress detected for ${f.cropType}.`;
        } else if (moisture < 35) {
          status = 'IRRIGATE_NOW';
          actionText = 'Irrigation recommended within 4 hours.';
          reasoning = `Soil moisture is ${moisture}%. Weather is clear. Recommended 25 min cycle.`;
        } else if (moisture > 70) {
          status = 'OPTIMAL';
          actionText = 'Soil is well saturated. Do not irrigate.';
          reasoning = `Moisture level ${moisture}% is sufficient for current growth stage.`;
        }

        setRecommendations(recPrev => ({
          ...recPrev,
          [farmId]: {
            ...recPrev[farmId],
            status,
            actionText,
            reasoning,
          }
        }));

        return { ...f, soilMoisture: moisture };
      }
      return f;
    }));

    // Update sensor reading too
    setSensors(prev => prev.map(s => {
      if (s.farmId === farmId) {
        return { ...s, moistureReading: moisture, lastUpdated: 'Just now' };
      }
      return s;
    }));
  };

  const addSensorNode = (farmId: string, nodeName: string) => {
    const newNode: SensorNode = {
      id: `sns-${Date.now()}`,
      farmId,
      nodeName,
      batteryLevel: 100,
      signalStrength: 95,
      status: 'ONLINE',
      moistureReading: selectedFarm.soilMoisture,
      tempReading: selectedFarm.temperature,
      lastUpdated: 'Just now',
      firmwareVersion: 'v2.2.0-smart',
    };
    setSensors(prev => [...prev, newNode]);
    showNotification(`New Sensor Node "${nodeName}" added & paired via LoRaWAN / ESP32!`);
  };

  return (
    <FarmContext.Provider
      value={{
        farms,
        selectedFarmId,
        selectedFarm,
        sensors,
        recommendations,
        activeTab,
        language,
        userRole,
        isVoiceAssistantOpen,
        isPumpLoading,
        notificationMessage,
        setSelectedFarmId,
        setActiveTab,
        setLanguage,
        setUserRole,
        setIsVoiceAssistantOpen,
        togglePump,
        setPumpMode,
        updateSoilMoisture,
        addSensorNode,
        showNotification,
      }}
    >
      {children}
    </FarmContext.Provider>
  );
};

export const useFarmContext = () => {
  const context = useContext(FarmContext);
  if (!context) throw new Error('useFarmContext must be used within FarmProvider');
  return context;
};
