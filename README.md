# 💧 Smart Water Guardian (FarmSphere)
> **AI + IoT Smart Irrigation & Water Conservation Platform**  
> *Built for NextStep Hacks 2026*

![Smart Water Guardian Banner](/public/thumbnail.jpg)

---

## 🌟 Overview
**Smart Water Guardian** is an intelligent precision agriculture ecosystem that leverages IoT telemetry (ESP32, capacitive soil moisture sensors, temperature & humidity sensors) and AI-driven predictive modeling to optimize farm irrigation schedules. 

By integrating the **FAO-56 Penman-Monteith Evapotranspiration formula** with real-time weather forecasting and soil metrics, Smart Water Guardian reduces water waste by **30% to 50%**, cuts farm electricity bills, and boosts crop yields.

---

## ✨ Key Features

- 📊 **Live Telemetry & Field Monitoring**: Real-time soil moisture ($\theta_v$), ambient temperature, humidity, and solar battery status across multiple farm plots.
- 🤖 **AI Precision Irrigation Advisor**: Computes exact crop water requirements ($ET_c$) using dynamic crop growth coefficients ($K_c$) and automatically delays watering when rain ($\ge 70\%$) is forecasted.
- ⚡ **Automated & Manual Pump Control**: Smart solenoid valve and solar pump triggering with safety interlocks and manual overrides.
- 🎙️ **Multilingual Voice Assistant**: Rural-friendly voice interface supporting Hindi and English for hands-free query resolution.
- 🌦️ **Microclimate Weather Center**: 7-day predictive rain models, wind speed monitoring, and barometric pressure graphs.
- 📈 **Water & Cost Analytics**: Interactive telemetry charts showing daily water saved (liters) and electricity cost reductions (₹).
- 🤝 **Krishi Community & Subsidy Hub**: Farmer discussions, best practice sharing, and government subsidy guides (PM-KUSUM scheme).

---

## 🧮 Mathematical & Agronomic Modeling

### 1. Evapotranspiration Calculation (FAO-56)
$$ET_c = K_c \times ET_0$$

Where:
- $ET_0$ is the reference evapotranspiration.
- $K_c$ is the dynamic crop growth stage coefficient (e.g. Tillering vs Boll Formation).

### 2. Net Irrigation Requirement
$$V_{irr} = 10 \times A \times (\theta_{FC} - \theta_v) \times Z_r \times \frac{1}{\eta}$$

Where:
- $A$ = Field area (hectares)
- $\theta_{FC}$ = Soil Field Capacity moisture (%)
- $\theta_v$ = Current measured moisture (%)
- $Z_r$ = Root zone depth (meters)
- $\eta$ = Irrigation system efficiency factor

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS, Framer Motion, Lucide Icons
- **Visualizations**: Recharts
- **Voice Intelligence**: Web Speech API (Bilingual: Hindi & English)
- **Edge IoT Hardware**: ESP32 Microcontroller, Capacitive Soil Moisture Sensors v2.0, DHT22 Probes

---

## 🚀 Quick Start

### 1. Clone & Install
```bash
git clone https://github.com/<your-username>/smart-water-guardian.git
cd smart-water-guardian
npm install
```

### 2. Run Locally
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for Production
```bash
npm run build
```

---

## 📄 License
Distributed under the MIT License.
