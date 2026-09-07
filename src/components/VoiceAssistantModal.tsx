import React, { useState, useEffect, useRef } from 'react';
import { useFarmContext } from '../context/FarmContext';
import type { Language } from '../types';
import { Mic, Volume2, X, Play, Globe } from 'lucide-react';

const SAMPLE_QUERIES: Record<Language, { question: string; answer: string }[]> = {
  hi: [
    { question: "Mere khet ko paani kab dena hai?", answer: "Aapke khet mein abhi 26% nami hai. Kal subah 7 baje 25 minute sinchai karna uchit rahega kyunki baarish ki sambhavna kam hai." },
    { question: "Kitna paani bacha hai iss mahine?", answer: "Aapne Smart Water Guardian se iss mahine 14,500 liter paani aur ₹1,435 bijli ka bil bachaya hai." },
    { question: "Aaj ka mausam kaisa rahega?", answer: "Aaj Ludhiana mein taapmaan 34°C rahega. Halka badal chhaaye rahenge." }
  ],
  en: [
    { question: "When should I irrigate my field?", answer: "Soil moisture is at 26%. Rain probability is 75% tomorrow. Delay irrigation by 18 hours to save 4,200L water." },
    { question: "How much water did I save this month?", answer: "You have conserved 14,500 Liters of water and saved ₹1,435 in electricity bills." },
    { question: "What is today's weather forecast?", answer: "Temperature is 34°C with 62% humidity. Partly cloudy conditions expected." }
  ],
  pa: [
    { question: "ਮੇਰੇ ਖੇਤ ਨੂੰ ਪਾਣੀ ਕਦੋਂ ਦੇਣਾ ਹੈ?", answer: "ਤੁਹਾਡੇ ਖੇਤ ਵਿੱਚ ਨਮੀ 26% ਹੈ। ਕੱਲ੍ਹ ਸਵੇਰੇ 7 ਵਜੇ ਸਿੰਚਾਈ ਕਰੋ।" }
  ],
  gu: [
    { question: "મારા ખેતરમાં પાણી ક્યારે આપવું?", answer: "જમીનમાં ભેજ 26% છે. આવતીકાલે સવારે 7 વાગ્યે સિંચાઈ કરો." }
  ],
  mr: [
    { question: "माझ्या शेताला पाणी कधी द्यायचे?", answer: "मातीत २६% ओलावा आहे. उद्या सकाळी ७ वाजता सिंचन करा." }
  ],
  ta: [
    { question: "எனது வயலுக்கு எப்போது நீர் பாய்ச்ச வேண்டும்?", answer: "மண்ணின் ஈரம் 26%. நாளை காலை 7 மணிக்கு நீர் பாய்ச்சவும்." }
  ]
};

export const VoiceAssistantModal: React.FC = () => {
  const { isVoiceAssistantOpen, setIsVoiceAssistantOpen, language, setLanguage } = useFarmContext();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [speechResponse, setSpeechResponse] = useState<string | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const sampleList = SAMPLE_QUERIES[language] || SAMPLE_QUERIES['en'];

  useEffect(() => {
    if (isVoiceAssistantOpen) {
      setSpeechResponse("Namaste! Ask me anything about irrigation, weather, or pump control.");
      closeBtnRef.current?.focus();
    }
  }, [isVoiceAssistantOpen]);

  // Keyboard Escape Key Handler for Accessibility (UI/UX Pro Max)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isVoiceAssistantOpen) {
        setIsVoiceAssistantOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isVoiceAssistantOpen, setIsVoiceAssistantOpen]);

  if (!isVoiceAssistantOpen) return null;

  const handleSimulateVoiceQuery = (queryObj: { question: string; answer: string }) => {
    setIsListening(true);
    setTranscript(queryObj.question);
    setSpeechResponse(null);

    setTimeout(() => {
      setIsListening(false);
      setSpeechResponse(queryObj.answer);
      
      // Web Speech API Synthesis
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel(); // Stop prior speech
        const utterance = new SpeechSynthesisUtterance(queryObj.answer);
        utterance.lang = language === 'hi' ? 'hi-IN' : 'en-US';
        window.speechSynthesis.speak(utterance);
      }
    }, 1200);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-4 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="voice-assistant-title"
    >
      <div className="glass-panel w-full max-w-xl p-6 sm:p-8 rounded-3xl border border-agri-500/40 shadow-2xl space-y-6 relative overflow-hidden">
        
        {/* Ambient Glow */}
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none"></div>

        {/* Header */}
        <div className="flex justify-between items-center border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-sky-500 flex items-center justify-center text-white shadow-lg">
              <Mic className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 id="voice-assistant-title" className="text-lg font-bold text-white">Smart Farmer Voice Assistant</h3>
              <p className="text-[11px] text-slate-400">Multilingual Speech Recognition & AI Voice Synthesis</p>
            </div>
          </div>

          <button
            ref={closeBtnRef}
            onClick={() => setIsVoiceAssistantOpen(false)}
            aria-label="Close voice assistant dialog"
            className="w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Language Selection Bar */}
        <div className="flex items-center justify-between bg-slate-900/90 p-3 rounded-xl border border-slate-800 text-xs">
          <div className="flex items-center gap-1.5 text-slate-400">
            <Globe className="w-4 h-4 text-sky-400" />
            <span>Select Voice Language:</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {(['en', 'hi', 'pa', 'gu', 'mr', 'ta'] as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                aria-pressed={language === lang}
                className={`min-h-[36px] px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all cursor-pointer ${
                  language === lang 
                    ? 'bg-emerald-600 text-white shadow' 
                    : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        {/* Voice Visualizer / Microphone Button */}
        <div className="flex flex-col items-center justify-center py-6 space-y-4 bg-gradient-to-b from-slate-900 to-slate-950 rounded-2xl border border-slate-800">
          <button
            onClick={() => handleSimulateVoiceQuery(sampleList[0])}
            aria-label="Activate voice microphone input"
            className={`w-20 h-20 rounded-full flex items-center justify-center shadow-2xl transition-all cursor-pointer ${
              isListening
                ? 'bg-red-500 text-white animate-ping ring-8 ring-red-500/30'
                : 'bg-gradient-to-tr from-emerald-600 via-emerald-500 to-sky-500 text-white hover:scale-105 shadow-emerald-500/30'
            }`}
          >
            <Mic className="w-9 h-9" />
          </button>

          <div className="text-center space-y-1">
            <div className="text-xs font-bold text-slate-200">
              {isListening ? "Listening to your voice..." : "Tap mic or select a voice prompt below"}
            </div>
            {transcript && (
              <div className="text-xs text-emerald-400 font-mono italic">
                "{transcript}"
              </div>
            )}
          </div>
        </div>

        {/* Voice Response Audio Output Box */}
        {speechResponse && (
          <div className="bg-slate-900 p-4 rounded-xl border border-emerald-500/40 space-y-2 animate-slide-up">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase text-emerald-400 flex items-center gap-1">
                <Volume2 className="w-4 h-4 animate-bounce" /> Audio Output Speaker
              </span>
              <span className="text-[10px] text-slate-400">AI Voice Assistant</span>
            </div>
            <p className="text-xs text-slate-100 font-medium leading-relaxed">{speechResponse}</p>
          </div>
        )}

        {/* Preset Spoken Farmer Queries */}
        <div className="space-y-2">
          <div className="text-xs font-semibold text-slate-400">Sample Spoken Farmer Queries ({language.toUpperCase()}):</div>
          <div className="space-y-2">
            {sampleList.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleSimulateVoiceQuery(item)}
                className="w-full text-left p-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-xs text-slate-200 flex items-center justify-between group transition-colors cursor-pointer min-h-[44px]"
              >
                <span className="font-medium">🗣️ "{item.question}"</span>
                <Play className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
