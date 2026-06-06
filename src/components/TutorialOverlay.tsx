import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, ArrowLeft } from 'lucide-react';
import { useFloating, offset, flip, shift, arrow, autoUpdate, Placement } from '@floating-ui/react';

interface Step {
  targetIds: string[];
  text: string;
  position: Placement;
}

const steps: Step[] = [
  { targetIds: ['dashboard-header'], text: "Welcome to your personal Sentry Dashboard. Here you'll track your overall progress and journey.", position: 'bottom' },
  { targetIds: ['dashboard-posture'], text: "Your Posture Score is calculated based on how many courses, tasks, and modules you've completed.", position: 'bottom' },
  { targetIds: ['dashboard-badges-section'], text: "Here is your Badge Shelf. Unlock all badges to prove your security mastery.", position: 'top' },
  { targetIds: ['nav-desktop-academy', 'nav-mobile-academy'], text: "The Academy tab contains theoretical courses to level up your general knowledge.", position: 'right' },
  { targetIds: ['nav-desktop-games', 'nav-mobile-games'], text: "Games let you practically test your skills against real-life attack patterns.", position: 'right' },
  { targetIds: ['nav-desktop-checklist', 'nav-mobile-checklist'], text: "The Cyber Checklist contains simple, real-world tasks to secure your accounts.", position: 'right' },
  { targetIds: ['nav-desktop-leaderboard', 'nav-mobile-leaderboard'], text: "Compete on the global Leaderboard to see how your rank compares to others.", position: 'right' },
  { targetIds: ['nav-desktop-profile', 'nav-mobile-profile'], text: "Lastly, visit your Profile Settings to customize your avatar, credentials, or reset your journey.", position: 'right' },
  { targetIds: ['dashboard-xp-card'], text: "As you complete modules, you'll earn XP and level up. Good luck!", position: 'bottom' }
];

export default function TutorialOverlay({ onComplete }: { onComplete: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [targetEl, setTargetEl] = useState<HTMLElement | null>(null);
  const [coords, setCoords] = useState<{ top: number, left: number, width: number, height: number } | null>(null);
  
  const arrowRef = useRef<HTMLDivElement>(null);

  // Re-eval target element when step changes
  useEffect(() => {
    const step = steps[currentStep];
    let el: HTMLElement | null = null;
    for (const id of step.targetIds) {
      const found = document.getElementById(id);
      if (found && found.offsetParent !== null) {
        el = found;
        break;
      }
    }
    setTargetEl(el);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
    }
  }, [currentStep]);

  // Keep bounding box updated on every frame (so scroll matches frame perfectly)
  useEffect(() => {
    if (!targetEl) {
      setCoords(null);
      return;
    }
    let animationFrameId: number;
    const update = () => {
      const rect = targetEl.getBoundingClientRect();
      setCoords({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height
      });
      animationFrameId = requestAnimationFrame(update);
    };
    update();
    return () => cancelAnimationFrame(animationFrameId);
  }, [targetEl]);

  const { refs, floatingStyles, middlewareData, placement } = useFloating({
    placement: steps[currentStep].position,
    elements: {
      reference: targetEl
    },
    middleware: [
      offset(16),
      flip({ fallbackAxisSideDirection: 'end' }),
      shift({ padding: 16 }),
      arrow({ element: arrowRef })
    ],
    whileElementsMounted: autoUpdate
  });

  const step = steps[currentStep];

  const staticSide = {
    top: 'bottom',
    right: 'left',
    bottom: 'top',
    left: 'right',
  }[placement.split('-')[0]] as any;

  const { x: arrowX, y: arrowY } = middlewareData.arrow || {};

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none overflow-hidden">
      {coords ? (
        <div 
          className="absolute border-2 border-[#58A6FF] rounded-xl pointer-events-auto"
          style={{
            top: coords.top - 4,
            left: coords.left - 4,
            width: coords.width + 8,
            height: coords.height + 8,
            boxShadow: '0 0 0 9999px rgba(13, 15, 18, 0.7)',
            transition: 'width 0.3s, height 0.3s, top 0.3s, left 0.3s'
          }}
        />
      ) : (
        <div className="absolute inset-0 bg-[#0D0F12]/70 pointer-events-auto" />
      )}

      <AnimatePresence mode="wait">
        {targetEl && (
          <motion.div
            key={currentStep}
            ref={refs.setFloating}
            style={{
              ...floatingStyles,
              zIndex: 101,
            }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="bg-[#161B22] border border-[#30363D] w-72 p-5 rounded-2xl shadow-2xl pointer-events-auto"
          >
            {/* Arrow */}
            <div
              ref={arrowRef}
              className="absolute w-4 h-4 bg-[#161B22] border-[#30363D] border-t border-l"
              style={{
                left: arrowX != null ? `${arrowX}px` : '',
                top: arrowY != null ? `${arrowY}px` : '',
                [staticSide]: '-8px',
                transform: `rotate(${
                  staticSide === 'top' ? 45 
                  : staticSide === 'bottom' ? 225 
                  : staticSide === 'left' ? -45 
                  : 135
                }deg)`
              }}
            />

            <button 
              onClick={onComplete}
              className="absolute top-3 right-3 text-[#8B949E] hover:text-[#F0F6FC] transition-colors z-10"
            >
              <X className="w-4 h-4" />
            </button>

            <p className="text-[13px] font-medium leading-relaxed text-[#F0F6FC] mt-3 mb-6 relative z-10">
              {step.text}
            </p>

            <div className="flex items-center justify-between border-t border-[#30363D] pt-4 relative z-10">
              <span className="text-[10px] font-bold text-[#8B949E] font-mono tracking-widest">
                STEP {currentStep + 1}/{steps.length}
              </span>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setCurrentStep(prev => prev - 1)}
                  disabled={currentStep === 0}
                  className="p-1.5 rounded bg-[#30363D] text-[#E2E8F0] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#8B949E]/20 transition-colors"
                  title="Previous"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => {
                    if (currentStep === steps.length - 1) onComplete();
                    else setCurrentStep(prev => prev + 1);
                  }}
                  className="py-1.5 px-3 rounded bg-[#58A6FF] text-[#0D0F12] font-bold text-xs hover:bg-[#58A6FF]/80 transition-colors flex items-center gap-1.5"
                  title={currentStep === steps.length - 1 ? 'Finish' : 'Next'}
                >
                  {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
                  {currentStep < steps.length - 1 && <ArrowRight className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
            
            <button 
              onClick={onComplete}
              className="w-full text-center mt-4 text-[10px] text-[#8B949E] hover:text-[#F0F6FC] uppercase font-bold tracking-widest transition-colors cursor-pointer relative z-10"
            >
              Skip Tutorial
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
