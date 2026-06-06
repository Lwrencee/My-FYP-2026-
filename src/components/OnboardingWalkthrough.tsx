import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Sparkles, Award, Compass, Play, ChevronRight, Sun, Moon } from 'lucide-react';
import { UserProfile } from '../types';

interface OnboardingWalkthroughProps {
  profile: UserProfile;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  onComplete: (selectedLevel: 'Newbie' | 'Beginner' | 'Intermediate') => void;
}

export default function OnboardingWalkthrough({ profile, theme, toggleTheme, onComplete }: OnboardingWalkthroughProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedLevel, setSelectedLevel] = useState<'Newbie' | 'Beginner' | 'Intermediate' | null>(null);

  const totalSteps = 4;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep((prev) => (prev + 1) as any);
    } else if (selectedLevel) {
      onComplete(selectedLevel);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0F12] relative flex flex-col items-center justify-center p-4 sm:p-6 md:p-12 overflow-hidden font-sans text-[#E2E8F0] select-none transition-colors duration-250">
      
      {/* Floating Theme Selector on top-right of induction walkthrough */}
      <div className="absolute top-4 right-4 z-50">
        <button
          onClick={toggleTheme}
          className="px-3 py-1.5 rounded-lg bg-[#161B22] border border-[#30363D] hover:bg-[#30363D]/40 hover:border-[#58A6FF]/40 text-[#8B949E] hover:text-[#58A6FF] transition-all cursor-pointer flex items-center gap-1.5 text-xs font-semibold select-none shadow-sm"
        >
          {theme === 'dark' ? (
            <>
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <span>Light</span>
            </>
          ) : (
            <>
              <Moon className="w-3.5 h-3.5 text-indigo-500" />
              <span>Dark</span>
            </>
          )}
        </button>
      </div>

      {/* Dynamic Ambient Blur Background elements */}
      <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-sky-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Grid Overlay decoration */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Main card */}
      <div className="relative max-w-xl w-full bg-[#161B22] backdrop-blur-xl rounded-3xl border border-[#30363D] p-6 sm:p-8 md:p-10 shadow-3xl z-10 flex flex-col justify-between overflow-hidden min-h-[520px] transition-colors duration-200">
        
        {/* Sleek top indicator line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500" />
        
        {/* Header progress info */}
        <div className="flex items-center justify-between pb-6 border-b border-[#30363D]/80">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-mono tracking-wider text-[#8B949E] font-bold uppercase">AegisAcademy Induction</span>
          </div>
          <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-md border transition-all ${
            theme === 'light'
              ? 'text-cyan-600 bg-cyan-50 border-cyan-200 shadow-sm'
              : 'text-cyan-400 bg-cyan-950/20 border-cyan-800/40'
          }`}>
            Phase 0{step} / 0{totalSteps}
          </span>
        </div>

        {/* Dynamic content with transitions */}
        <div className="my-8 flex-1 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div className="inline-flex p-3 bg-cyan-950/10 border border-cyan-500/20 text-cyan-400 rounded-2xl shadow-lg">
                  <Shield className="w-8 h-8" />
                </div>
                
                <h2 className="text-2xl md:text-3xl font-black text-[#F0F6FC] tracking-tight">The Origin of "Aegis"</h2>
                
                <div className="text-base text-[#E2E8F0] space-y-4">
                  <p className="leading-relaxed">
                    In ancient Greek myth, Aegis (pronounced EE-jis) was the legendary, unyielding armor carried by Zeus and Athena—forged specifically to withstand absolute chaos and protect frontline heroes. It also generally refers to protection.
                  </p>
                  
                  <p className="leading-relaxed">
                    With today's technology, a huge portion of your life is most likely online. And whether you like it or not, you bear the primary responsibility of your own digital safety. I hope to use this platform to help you replicate the shield to protect your digital identity and information, and improve your overall security awareness.
                  </p>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -25 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div className="inline-flex p-3 bg-indigo-950/10 border border-indigo-500/20 text-indigo-400 rounded-2xl shadow-lg">
                  <Compass className="w-8 h-8" />
                </div>
                
                <h2 className="text-2xl md:text-3xl font-black text-[#F0F6FC] tracking-tight">The Sentry Mission</h2>
                
                <div className="text-base text-[#E2E8F0] space-y-4">
                  <p className="leading-relaxed">
                    Welcome to the defense forces, Sentry <span className="text-indigo-400 font-bold">{profile.defenderName}</span>. Your core identity is now registered as an active Sentry in our national student defense network.
                  </p>
                  
                  <p className="leading-relaxed">
                    You will play defense games, decode deceptive traps, and learn from mini-lessons, and so on.
                  </p>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -25 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div className="inline-flex p-3 bg-blue-950/10 border border-blue-500/20 text-blue-400 rounded-2xl shadow-lg">
                  <Sparkles className="w-8 h-8" />
                </div>
                
                <h2 className="text-2xl md:text-3xl font-black text-[#F0F6FC] tracking-tight">Select Skill Level</h2>
                
                <div className="text-base text-[#E2E8F0] space-y-4">
                  <p className="leading-relaxed">
                    Choose your skill level. (You can always change this in the settings)
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <button
                    onClick={() => setSelectedLevel('Newbie')}
                    className={`w-full p-4 rounded-xl text-left border transition-all cursor-pointer flex items-start gap-3.5 ${
                      selectedLevel === 'Newbie'
                        ? 'bg-cyan-500/10 border-cyan-400 text-[#F0F6FC] shadow-lg ring-1 ring-cyan-500/20'
                        : 'bg-[#161B22] border-[#30363D] text-[#8B949E] hover:border-[#58A6FF]/40 hover:text-[#F0F6FC]'
                    }`}
                  >
                    <div className={`mt-0.5 w-4.5 h-4.5 rounded-full border-2 flex items-center justify-center shrink-0 ${selectedLevel === 'Newbie' ? 'border-cyan-400' : 'border-[#30363D]'}`}>
                      {selectedLevel === 'Newbie' && <div className="w-2.5 h-2.5 rounded-full bg-cyan-400" />}
                    </div>
                    <div>
                      <div className="font-bold text-sm text-[#F0F6FC] flex items-center gap-2">
                        Newbie Sentry
                      </div>
                      <p className="text-xs text-[#8B949E] mt-1 line-clamp-2">
                        I don't really know much about Cyber Security. Looking forward to starting my journey!
                      </p>
                    </div>
                  </button>

                  <button
                    onClick={() => setSelectedLevel('Beginner')}
                    className={`w-full p-4 rounded-xl text-left border transition-all cursor-pointer flex items-start gap-3.5 ${
                      selectedLevel === 'Beginner'
                        ? 'bg-blue-500/10 border-blue-400 text-[#F0F6FC] shadow-lg ring-1 ring-blue-500/20'
                        : 'bg-[#161B22] border-[#30363D] text-[#8B949E] hover:border-[#58A6FF]/40 hover:text-[#F0F6FC]'
                    }`}
                  >
                    <div className={`mt-0.5 w-4.5 h-4.5 rounded-full border-2 flex items-center justify-center shrink-0 ${selectedLevel === 'Beginner' ? 'border-blue-400' : 'border-[#30363D]'}`}>
                      {selectedLevel === 'Beginner' && <div className="w-2.5 h-2.5 rounded-full bg-blue-400" />}
                    </div>
                    <div>
                      <div className="font-bold text-sm text-[#F0F6FC] flex items-center gap-2">
                        Beginner Defender
                      </div>
                      <p className="text-xs text-[#8B949E] mt-1 line-clamp-2">
                        I know a bit about Cyber Security, but I'd like to learn more!
                      </p>
                    </div>
                  </button>

                  <button
                    onClick={() => setSelectedLevel('Intermediate')}
                    className={`w-full p-4 rounded-xl text-left border transition-all cursor-pointer flex items-start gap-3.5 ${
                      selectedLevel === 'Intermediate'
                        ? 'bg-indigo-500/10 border-indigo-400 text-[#F0F6FC] shadow-lg ring-1 ring-indigo-500/20'
                        : 'bg-[#161B22] border-[#30363D] text-[#8B949E] hover:border-[#58A6FF]/40 hover:text-[#F0F6FC]'
                    }`}
                  >
                    <div className={`mt-0.5 w-4.5 h-4.5 rounded-full border-2 flex items-center justify-center shrink-0 ${selectedLevel === 'Intermediate' ? 'border-indigo-400' : 'border-[#30363D]'}`}>
                      {selectedLevel === 'Intermediate' && <div className="w-2.5 h-2.5 rounded-full bg-indigo-400" />}
                    </div>
                    <div>
                      <div className="font-bold text-sm text-[#F0F6FC] flex items-center gap-2">
                        Intermediate Operator
                      </div>
                      <p className="text-xs text-[#8B949E] mt-1 line-clamp-2">
                        I know a lot about Cyber Security. But I'd still like to test the app.
                      </p>
                    </div>
                  </button>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="text-center space-y-6"
              >
                <div className="mx-auto inline-flex p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full animate-bounce">
                  <Award className="w-10 h-10" />
                </div>
                
                <h2 className="text-3xl font-black text-[#F0F6FC] uppercase tracking-tight">Active Sentry Status Granted</h2>
                
                <div className="text-base text-[#E2E8F0] space-y-4 max-w-sm mx-auto text-left">
                  <p className="leading-relaxed text-sm">
                    You have successfully initialised your Aegis account. A starting gift of <strong className="text-emerald-400 font-bold">50 XP</strong> has been deposited directly into your profile.
                  </p>
                  
                  <p className="leading-relaxed text-[#8B949E] text-xs">
                    Your Sentry Level has been cataloged as a <strong className="text-cyan-400 font-mono font-bold">{selectedLevel}</strong> Sentry.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Action Button Area */}
        <div className="border-t border-[#30363D] pt-6 flex justify-between items-center gap-4">
          {/* Bullet step tracker indicators */}
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((bulletIdx) => (
              <div
                key={bulletIdx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  bulletIdx === step
                    ? 'w-6 bg-cyan-400'
                    : bulletIdx < step
                    ? 'w-2 bg-emerald-500'
                    : 'w-2 bg-[#30363D]'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            {step > 1 && (
              <button
                onClick={() => setStep((prev) => (prev - 1) as any)}
                className="px-4 py-3 bg-[#161B22] border border-[#30363D] hover:bg-[#30363D]/45 hover:border-[#58A6FF]/40 text-[#8B949E] hover:text-[#58A6FF] rounded-xl font-bold text-xs transition-all cursor-pointer shadow-sm"
              >
                Back
              </button>
            )}

            <button
              onClick={handleNext}
              disabled={step === 3 && selectedLevel === null}
              className={`px-5 py-3 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ${
                step === 3 && selectedLevel === null
                  ? 'bg-[#30363D] bg-opacity-50 border border-[#30363D] text-[#8B949E] text-opacity-40 cursor-not-allowed opacity-50'
                  : step === 4
                  ? 'bg-[#F0F6FC] hover:bg-white text-[#0D0F12] font-black shadow-lg shadow-white/10 active:scale-[0.98]'
                  : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black shadow-lg shadow-cyan-950/20 active:scale-[0.98]'
              }`}
            >
              {step === 4 ? (
                <>
                  <span>To The Dashboard!</span>
                  <Play className="w-3.5 h-3.5 fill-current" />
                </>
              ) : (
                <>
                  <span>Continue</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
