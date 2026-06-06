import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { Course } from '../types';
import { X, ChevronLeft, ChevronRight, CheckCircle2, CheckCircle, XCircle } from 'lucide-react';

interface CourseSwipeViewProps {
  course: Course;
  onClose: () => void;
  onComplete: (earnedXp: number, courseId: string) => void;
  theme?: 'light' | 'dark';
}

export default function CourseSwipeView({ course, onClose, onComplete, theme = 'dark' }: CourseSwipeViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<number, number>>({});
  const [hasAnsweredMap, setHasAnsweredMap] = useState<Record<number, boolean>>({});
  const [earnedInteractiveXp, setEarnedInteractiveXp] = useState(0);
  const [showCompletion, setShowCompletion] = useState(false);
  const lessons = course.lessons;

  if (!lessons || lessons.length === 0) {
    return (
      <div className={`flex flex-col items-center justify-center p-8 rounded-2xl border ${theme === 'light' ? 'bg-white border-slate-200' : 'bg-[#161B22] border-[#30363D]'}`}>
        <p className={`text-lg font-medium mb-4 ${theme === 'light' ? 'text-slate-600' : 'text-[#8B949E]'}`}>This course is coming soon.</p>
        <button onClick={onClose} className={`px-4 py-2 rounded-lg font-bold ${theme === 'light' ? 'bg-slate-100 text-slate-800' : 'bg-[#30363D] text-[#F0F6FC]'}`}>
          Go Back
        </button>
      </div>
    );
  }

  const handleOptionSelect = (optionIdx: number) => {
    if (hasAnsweredMap[currentIndex]) return;
    
    setSelectedOptions((prev) => ({ ...prev, [currentIndex]: optionIdx }));
    setHasAnsweredMap((prev) => ({ ...prev, [currentIndex]: true }));

    const lesson = lessons[currentIndex];
    if (lesson.interactiveCheck && optionIdx === lesson.interactiveCheck.correctOptionIndex) {
      setEarnedInteractiveXp(prev => prev + lesson.interactiveCheck!.xpReward);
    }
  };

  const canGoNext = () => {
    const lesson = lessons[currentIndex];
    if (lesson.interactiveCheck && !hasAnsweredMap[currentIndex]) {
      return false;
    }
    return true;
  };

  const goNext = () => {
    if (!canGoNext()) return;
    
    if (currentIndex < lessons.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowCompletion(true);
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const renderInteractiveCheck = () => {
    const lesson = lessons[currentIndex];
    if (!lesson.interactiveCheck) return null;

    const check = lesson.interactiveCheck;
    const hasAnswered = hasAnsweredMap[currentIndex];
    const selectedIdx = selectedOptions[currentIndex];
    const isCorrect = selectedIdx === check.correctOptionIndex;

    return (
      <div className="mt-8 space-y-4">
        <h4 className={`text-base font-bold ${theme === 'light' ? 'text-slate-900' : 'text-[#F0F6FC]'}`}>
          {check.question}
        </h4>
        <div className="space-y-2">
          {check.options.map((opt, idx) => {
            let btnClass = `w-full text-left p-4 rounded-xl border text-sm font-medium transition-colors `;
            
            if (!hasAnswered) {
              btnClass += theme === 'light' 
                ? 'bg-white border-slate-200 hover:border-slate-400 text-slate-700 hover:bg-slate-50' 
                : 'bg-[#161B22] border-[#30363D] hover:border-[#8B949E] text-[#8B949E] hover:text-[#F0F6FC] hover:bg-[#21262d]';
            } else {
              if (idx === check.correctOptionIndex) {
                btnClass += theme === 'light'
                  ? 'bg-green-50 border-green-500 text-green-800'
                  : 'bg-green-900/20 border-green-500/50 text-green-400';
              } else if (idx === selectedIdx && !isCorrect) {
                btnClass += theme === 'light'
                  ? 'bg-red-50 border-red-500 text-red-800'
                  : 'bg-red-900/20 border-red-500/50 text-red-400';
              } else {
                btnClass += theme === 'light'
                  ? 'bg-white border-slate-200 text-slate-400 opacity-50'
                  : 'bg-[#161B22] border-[#30363D] text-[#4b5563] opacity-50';
              }
            }

            return (
              <button 
                key={idx}
                disabled={hasAnswered}
                onClick={() => handleOptionSelect(idx)}
                className={btnClass}
              >
                {opt}
              </button>
            );
          })}
        </div>

        {hasAnswered && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`relative p-4 rounded-xl mt-4 flex items-start gap-3 pr-20 ${
              isCorrect 
                ? theme === 'light' ? 'bg-green-50 text-green-800' : 'bg-green-900/20 text-green-300' 
                : theme === 'light' ? 'bg-red-50 text-red-800' : 'bg-red-900/20 text-red-300'
            }`}
          >
            {isCorrect ? <CheckCircle className="shrink-0 mt-0.5" size={20} /> : <XCircle className="shrink-0 mt-0.5" size={20} />}
            <div className="text-sm">
              <ReactMarkdown
                components={{
                  a: ({ node, ...props }) => <a {...props} target="_blank" rel="noopener noreferrer" />
                }}
              >
                {isCorrect ? check.successMessage : check.failureMessage}
              </ReactMarkdown>
              {isCorrect && (
                <p className={`absolute top-4 right-4 font-bold inline-block px-2.5 py-0.5 rounded-full text-xs ${theme === 'light' ? 'bg-green-100 text-green-700' : 'bg-green-500/20 text-green-300'}`}>
                  +{check.xpReward} XP
                </p>
              )}
            </div>
          </motion.div>
        )}
      </div>
    );
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12 ${theme === 'light' ? 'bg-slate-100/90' : 'bg-[#0D0F12]/90'} backdrop-blur-sm`} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <AnimatePresence mode="wait">
        {!showCompletion ? (
          <motion.div 
            key="course-swipe"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className={`relative w-full max-w-lg h-[90vh] max-h-[800px] flex flex-col rounded-[2rem] shadow-2xl overflow-hidden border ${theme === 'light' ? 'bg-white border-slate-200' : 'bg-[#161B22] border-[#30363D]'}`}
          >
            {/* Progress Bars (Story style) */}
            <div className="absolute top-0 left-0 w-full z-20 px-4 py-4 flex gap-1">
              {lessons.map((_, idx) => (
                <div key={idx} className={`h-1.5 flex-1 rounded-full overflow-hidden ${theme === 'light' ? 'bg-slate-200' : 'bg-[#30363D]'}`}>
                  <motion.div 
                    className={`h-full ${theme === 'light' ? 'bg-slate-800' : 'bg-white'}`}
                    initial={{ width: "0%" }}
                    animate={{ width: idx < currentIndex ? "100%" : idx === currentIndex ? "100%" : "0%" }}
                    transition={{ duration: idx === currentIndex ? 0.3 : 0 }}
                  />
                </div>
              ))}
            </div>

            {/* Header Options */}
            <div className="relative z-20 px-6 pt-10 pb-2 flex justify-between items-center">
              <button onClick={onClose} className={`p-2 -ml-2 rounded-full transition-colors ${theme === 'light' ? 'hover:bg-slate-100 text-slate-500' : 'hover:bg-[#30363D] text-[#8B949E]'}`}>
                <X size={20} />
              </button>
            </div>

            {/* Card Content Area */}
            <div className="flex-1 relative overflow-hidden flex flex-col">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ type: "spring" as const, stiffness: 300, damping: 30 }}
                  className="absolute inset-0 p-6 sm:p-8 flex flex-col overflow-y-auto"
                >
                  <div className="flex items-center gap-3 mb-6 shrink-0">
                    <div className={`p-2 rounded-lg ${theme === 'light' ? 'bg-slate-100' : 'bg-[#30363D]'}`}>
                      <CheckCircle2 size={24} className={theme === 'light' ? 'text-blue-600' : 'text-[#58A6FF]'} />
                    </div>
                    <h3 className={`text-sm font-bold tracking-widest uppercase ${theme === 'light' ? 'text-slate-500' : 'text-[#8B949E]'}`}>
                      {lessons[currentIndex].title}
                    </h3>
                  </div>
                  
                  <div className={`prose prose-sm sm:prose-base max-w-none ${theme === 'light' ? 'prose-slate' : 'prose-invert'} prose-p:leading-relaxed prose-li:leading-relaxed`}>
                    <div className="markdown-body">
                      <ReactMarkdown
                        components={{
                          a: ({ node, ...props }) => <a {...props} target="_blank" rel="noopener noreferrer" />
                        }}
                      >
                        {lessons[currentIndex].content}
                      </ReactMarkdown>
                    </div>
                  </div>

                  {renderInteractiveCheck()}

                  {/* Extra spacing at the bottom of scrollable area */}
                  <div className="h-10 shrink-0"></div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer Navigation */}
            <div className={`p-6 flex items-center justify-between border-t ${theme === 'light' ? 'border-slate-100' : 'border-[#30363D]/50'}`}>
              <button 
                onClick={goPrev} 
                disabled={currentIndex === 0}
                className={`flex items-center gap-2 p-3 pr-4 rounded-xl font-bold transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${
                  theme === 'light' 
                    ? 'bg-slate-100 hover:bg-slate-200 text-slate-700' 
                    : 'bg-[#0D0F12] hover:bg-[#30363D] text-[#F0F6FC]'
                }`}
              >
                <ChevronLeft size={18} />
                Previous
              </button>
              
              <button 
                onClick={goNext}
                disabled={!canGoNext()}
                className={`flex items-center gap-2 p-3 pl-4 rounded-xl font-bold transition-colors shadow-sm disabled:opacity-30 disabled:cursor-not-allowed ${
                  theme === 'light' 
                    ? 'bg-blue-600 hover:bg-blue-700 disabled:hover:bg-blue-600 text-white' 
                    : 'bg-[#F0F6FC] hover:bg-white disabled:hover:bg-[#F0F6FC] text-[#0D0F12]'
                }`}
              >
                {currentIndex === lessons.length - 1 ? 'Finish Module' : 'Next'}
                <ChevronRight size={18} />
              </button>
            </div>

            {/* Tap areas for quick navigation like actual stories */}
            <div className="absolute inset-y-24 left-0 w-1/5 z-10" onClick={goPrev} />
            <div className="absolute inset-y-24 right-0 w-1/5 z-10" onClick={goNext} />
          </motion.div>
        ) : (
          <motion.div 
            key="completion"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className={`relative w-full max-w-md flex flex-col items-center justify-center p-8 sm:p-10 rounded-[2rem] shadow-2xl overflow-hidden border ${theme === 'light' ? 'bg-white border-slate-200' : 'bg-[#161B22] border-[#30363D]'}`}
          >
            <div className={`p-4 rounded-full mb-6 ${theme === 'light' ? 'bg-green-100 text-green-600' : 'bg-green-900/30 text-green-400'}`}>
              <CheckCircle size={56} strokeWidth={2} />
            </div>
            
            <h2 className={`text-2xl font-black mb-2 text-center tracking-tight ${theme === 'light' ? 'text-slate-900' : 'text-[#F0F6FC]'}`}>
              Module Completed!
            </h2>
            <p className={`text-sm text-center mb-8 ${theme === 'light' ? 'text-slate-600' : 'text-[#8B949E]'}`}>
              You have successfully completed <strong>{course.title}</strong>. 
            </p>

            <div className={`w-full p-5 rounded-2xl mb-8 space-y-4 border shadow-sm ${theme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-[#0D0F12] border-[#30363D]'}`}>
              <div className="flex justify-between items-center">
                <span className={`text-sm font-semibold ${theme === 'light' ? 'text-slate-600' : 'text-[#8B949E]'}`}>Course completion</span>
                <span className={`font-bold ${theme === 'light' ? 'text-slate-800' : 'text-[#F0F6FC]'}`}>+{course.xpWorth} XP</span>
              </div>
              <div className="flex justify-between items-center">
                <span className={`text-sm font-semibold ${theme === 'light' ? 'text-slate-600' : 'text-[#8B949E]'}`}>Interactive Quiz</span>
                <span className={`font-bold ${theme === 'light' ? 'text-slate-800' : 'text-[#F0F6FC]'}`}>+{earnedInteractiveXp} XP</span>
              </div>
              <div className={`pt-4 mt-4 border-t flex justify-between items-center ${theme === 'light' ? 'border-slate-200' : 'border-[#30363D]'}`}>
                <span className={`font-bold ${theme === 'light' ? 'text-slate-900' : 'text-[#F0F6FC]'}`}>Total Earned</span>
                <span className={`font-black tracking-wider text-xl ${theme === 'light' ? 'text-green-600' : 'text-green-400'}`}>+{course.xpWorth + earnedInteractiveXp} XP</span>
              </div>
            </div>

            <button 
              onClick={() => onComplete(course.xpWorth + earnedInteractiveXp, course.id)}
              className={`w-full py-3.5 rounded-xl text-sm font-bold shadow-md transition-all ${
                theme === 'light' 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                  : 'bg-[#58A6FF] hover:bg-[#3182CE] text-white'
              }`}
            >
              Collect Rewards & Return
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
