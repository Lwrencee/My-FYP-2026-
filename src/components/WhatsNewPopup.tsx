import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, FileAudio, X } from 'lucide-react';

export default function WhatsNewPopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hasSeen = localStorage.getItem('aegis_whats_new_media');
    if (!hasSeen) {
      setShow(true);
    }
  }, []);

  const closePopup = () => {
    localStorage.setItem('aegis_whats_new_media', 'true');
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#0D0F12]/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-[#161B22] border border-[#30363D] rounded-2xl max-w-md w-full p-6 shadow-2xl relative flex flex-col text-[#E2E8F0]"
          >
            <button 
              onClick={closePopup}
              className="absolute top-4 right-4 p-1.5 bg-[#0D0F12] hover:bg-[#30363D] rounded-lg transition-colors border border-[#30363D] text-[#8B949E] hover:text-[#E2E8F0]"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="mx-auto w-12 h-12 bg-[#58A6FF]/10 rounded-full flex items-center justify-center mb-4">
              <Play className="w-6 h-6 text-[#58A6FF] ml-0.5" />
            </div>
            
            <div className="text-center mb-6">
              <h3 className="text-xl font-black text-[#F0F6FC] mb-2 uppercase tracking-tight">What's New!</h3>
              <p className="text-sm text-[#8B949E]">
                We've upgraded Aegis Academy with powerful new learning tools to enhance your training experience.
              </p>
            </div>
            
            <div className="space-y-3 mb-6">
              <div className="bg-[#0D0F12] border border-[#30363D] rounded-xl p-3 flex gap-3">
                <div className="w-10 h-10 bg-indigo-500/10 border border-indigo-500/30 rounded-lg flex items-center justify-center shrink-0">
                  <Play className="w-5 h-5 text-indigo-400 ml-0.5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#F0F6FC] mb-0.5">Video Courses</h4>
                  <p className="text-xs text-[#8B949E]">Immerse yourself in new visual training modules with interactive video content.</p>
                </div>
              </div>
              
              <div className="bg-[#0D0F12] border border-[#30363D] rounded-xl p-3 flex gap-3">
                <div className="w-10 h-10 bg-emerald-500/10 border border-emerald-500/30 rounded-lg flex items-center justify-center shrink-0">
                  <FileAudio className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#F0F6FC] mb-0.5">Audio Lessons</h4>
                  <p className="text-xs text-[#8B949E]">Listen to cybersecurity briefings and scenarios on the go, straight from the Academy.</p>
                </div>
              </div>
            </div>

            <button
              onClick={closePopup}
              className="w-full py-3 px-4 bg-[#58A6FF] hover:bg-[#58A6FF]/90 text-[#0D0F12] font-bold text-sm rounded-xl transition-all shadow-[0_0_15px_rgba(88,166,255,0.4)] cursor-pointer"
            >
              Awesome, Let's Go!
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
