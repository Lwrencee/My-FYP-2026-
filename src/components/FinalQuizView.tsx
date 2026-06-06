import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { FINAL_QUIZ_QUESTIONS, INTERMEDIATE_FINAL_QUIZ, ADVANCED_FINAL_QUIZ } from '../data';

interface FinalQuizViewProps {
  theme: 'light' | 'dark';
  moduleLevel: string;
  onClose: () => void;
  onComplete: (earnedXp: number) => void;
}

export default function FinalQuizView({ theme, moduleLevel, onClose, onComplete }: FinalQuizViewProps) {
  const [questions, setQuestions] = useState<typeof FINAL_QUIZ_QUESTIONS>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    // Select the appropriate quiz based on the module level
    let sourceQuestions = FINAL_QUIZ_QUESTIONS;
    if (moduleLevel.toLowerCase().includes('intermediate')) {
      sourceQuestions = INTERMEDIATE_FINAL_QUIZ;
    } else if (moduleLevel.toLowerCase().includes('advanced')) {
      sourceQuestions = ADVANCED_FINAL_QUIZ;
    }
    
    // Randomize and pick 10
    const shuffled = [...sourceQuestions].sort(() => 0.5 - Math.random());
    setQuestions(shuffled.slice(0, 10));
  }, [moduleLevel]);

  if (questions.length === 0) return null;

  const currentQuestion = questions[currentIndex];
  const isCorrect = selectedOption === currentQuestion?.correctOptionIndex;

  const handleOptionSelect = (idx: number) => {
    if (selectedOption !== null) return; // Prevent changing answer
    setSelectedOption(idx);
    if (idx === currentQuestion.correctOptionIndex) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(c => c + 1);
      setSelectedOption(null);
    } else {
      setIsFinished(true);
    }
  };

  const calculateReward = () => {
    return score * 5; // 5xp per right question
  };

  if (!hasStarted) {
    return (
      <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12 ${theme === 'light' ? 'bg-slate-900/40' : 'bg-[#0D0F12]/90'} backdrop-blur-sm`} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
        <motion.div
           initial={{ opacity: 0, scale: 0.95, y: 10 }}
           animate={{ opacity: 1, scale: 1, y: 0 }}
           className={`relative w-full max-w-md rounded-[2rem] p-8 shadow-2xl border flex flex-col items-center justify-center text-center ${theme === 'light' ? 'bg-white border-slate-200' : 'bg-[#161B22] border-[#30363D]'}`}
        >
          <div className={`w-20 h-20 mx-auto rounded-full bg-purple-500/10 text-purple-500 flex items-center justify-center mb-6`}>
            <Icons.Brain size={40} />
          </div>
          <h2 className={`text-2xl font-black mb-2 ${theme === 'light' ? 'text-slate-900' : 'text-[#F0F6FC]'}`}>
            Final Quiz: {moduleLevel}
          </h2>
          <p className={`text-sm mb-6 ${theme === 'light' ? 'text-slate-600' : 'text-[#8B949E]'}`}>
            This test consists of <strong>{questions.length} questions</strong>. You will earn <strong>5 XP</strong> for each correct answer. Take your time, think carefully, and good luck!
          </p>
          
          <button 
            onClick={() => setHasStarted(true)}
            className={`w-full py-4 rounded-xl text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 ${
              theme === 'light' ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'bg-purple-600 hover:bg-purple-500 text-white'
            }`}
          >
            Start Quiz
          </button>
          
          <button 
            onClick={onClose}
            className={`mt-4 w-full py-3 rounded-xl text-sm font-bold transition-all ${
              theme === 'light' ? 'text-slate-500 hover:bg-slate-100' : 'text-[#8B949E] hover:bg-[#30363D]'
            }`}
          >
            Not right now
          </button>
        </motion.div>
      </div>
    );
  }

  if (isFinished) {
    const xpReward = calculateReward();
    return (
      <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12 ${theme === 'light' ? 'bg-slate-900/40' : 'bg-[#0D0F12]/90'} backdrop-blur-sm`} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
        <motion.div
           initial={{ opacity: 0, scale: 0.95, y: 10 }}
           animate={{ opacity: 1, scale: 1, y: 0 }}
           className={`relative w-full max-w-md rounded-[2rem] p-8 sm:p-10 shadow-2xl border flex flex-col items-center justify-center text-center ${theme === 'light' ? 'bg-white border-slate-200' : 'bg-[#161B22] border-[#30363D]'}`}
        >
          <div className={`p-4 rounded-full mb-6 ${theme === 'light' ? 'bg-purple-100 text-purple-600' : 'bg-purple-900/30 text-purple-400'}`}>
            <Icons.Trophy size={56} strokeWidth={2} />
          </div>
          <h2 className={`text-2xl font-black mb-2 tracking-tight ${theme === 'light' ? 'text-slate-900' : 'text-[#F0F6FC]'}`}>
            Quiz Complete!
          </h2>
          <p className={`text-sm mb-8 ${theme === 'light' ? 'text-slate-600' : 'text-[#8B949E]'}`}>
            You scored {score} out of {questions.length} correct.
          </p>
          <div className={`w-full p-5 rounded-2xl mb-8 space-y-4 border shadow-sm flex items-center justify-between ${theme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-[#0D0F12] border-[#30363D]'}`}>
            <span className={`text-sm font-semibold uppercase tracking-wider ${theme === 'light' ? 'text-slate-600' : 'text-[#8B949E]'}`}>XP Earned</span>
            <span className={`text-xl font-black ${theme === 'light' ? 'text-purple-600' : 'text-purple-400'}`}>+{xpReward} XP</span>
          </div>
          <button 
            onClick={() => onComplete(xpReward)}
            className={`w-full py-4 rounded-xl text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 ${
              theme === 'light' ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'bg-purple-600 hover:bg-purple-500 text-white'
            }`}
          >
            Claim Reward & Continue
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12 ${theme === 'light' ? 'bg-slate-100/90' : 'bg-[#0D0F12]/90'} backdrop-blur-sm`} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <motion.div
        key="quiz-card"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className={`relative w-full max-w-lg h-[90vh] max-h-[800px] flex flex-col rounded-[2rem] shadow-2xl overflow-hidden border ${theme === 'light' ? 'bg-white border-slate-200' : 'bg-[#161B22] border-[#30363D]'}`}
      >
        <div className="absolute top-0 left-0 w-full z-20 px-4 py-4 flex gap-1">
          {questions.map((_, idx) => (
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

        <div className="relative z-20 px-6 pt-10 pb-2 flex justify-between items-center">
          <div className="flex flex-col">
            <span className={`text-[10px] font-bold uppercase tracking-wider ${theme === 'light' ? 'text-purple-600' : 'text-purple-400'}`}>
              Final Quiz: {moduleLevel}
            </span>
          </div>
          <button onClick={onClose} className={`p-2 -ml-2 rounded-full transition-colors ${theme === 'light' ? 'hover:bg-slate-100 text-slate-500' : 'hover:bg-[#30363D] text-[#8B949E]'}`}>
            <Icons.X size={20} />
          </button>
        </div>

        <div className="flex-1 relative overflow-hidden flex flex-col">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute inset-0 p-6 flex flex-col overflow-y-auto"
            >
              <h3 className={`text-base font-bold mb-6 mt-4 ${theme === 'light' ? 'text-slate-900' : 'text-[#F0F6FC]'}`}>
                {currentQuestion.question}
              </h3>

              <div className="space-y-2">
                {currentQuestion.options.map((opt, idx) => {
                  const isSelected = selectedOption === idx;
                  const isActuallyCorrect = idx === currentQuestion.correctOptionIndex;
                  let btnClass = `w-full text-left p-4 rounded-xl border text-sm font-medium transition-colors cursor-pointer `;
                  
                  if (selectedOption !== null) {
                    if (isActuallyCorrect) {
                      btnClass += theme === 'light'
                        ? 'bg-green-50 border-green-500 text-green-800'
                        : 'bg-green-900/20 border-green-500/50 text-green-400';
                    } else if (isSelected && !isActuallyCorrect) {
                      btnClass += theme === 'light'
                        ? 'bg-red-50 border-red-500 text-red-800'
                        : 'bg-red-900/20 border-red-500/50 text-red-400';
                    } else {
                      btnClass += theme === 'light'
                        ? 'bg-white border-slate-200 text-slate-400 opacity-50'
                        : 'bg-[#161B22] border-[#30363D] text-[#4b5563] opacity-50';
                    }
                  } else {
                    btnClass += theme === 'light' 
                      ? 'bg-white border-slate-200 hover:border-slate-400 text-slate-700 hover:bg-slate-50' 
                      : 'bg-[#161B22] border-[#30363D] hover:border-[#8B949E] text-[#8B949E] hover:text-[#F0F6FC] hover:bg-[#21262d]';
                  }

                  return (
                    <button
                      key={idx}
                      disabled={selectedOption !== null}
                      onClick={() => handleOptionSelect(idx)}
                      className={btnClass}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {selectedOption !== null && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`relative p-4 rounded-xl mt-4 flex items-start gap-3 pr-20 ${
                    isCorrect 
                      ? theme === 'light' ? 'bg-green-50 text-green-800' : 'bg-green-900/20 text-green-300' 
                      : theme === 'light' ? 'bg-red-50 text-red-800' : 'bg-red-900/20 text-red-300'
                  }`}
                >
                  {isCorrect ? <Icons.CheckCircle className="shrink-0 mt-0.5" size={20} /> : <Icons.XCircle className="shrink-0 mt-0.5" size={20} />}
                  <div className="text-sm">
                    <ReactMarkdown
                      components={{
                        a: ({ node, ...props }) => <a {...props} target="_blank" rel="noopener noreferrer" />
                      }}
                    >
                      {isCorrect ? "**Correct!** " + currentQuestion.explanation : "**Incorrect.** " + currentQuestion.explanation}
                    </ReactMarkdown>
                    {isCorrect && (
                      <p className={`absolute top-4 right-4 font-bold inline-block px-2.5 py-0.5 rounded-full text-xs ${theme === 'light' ? 'bg-green-100 text-green-700' : 'bg-green-500/20 text-green-300'}`}>
                        +5 XP
                      </p>
                    )}
                  </div>
                </motion.div>
              )}
              
              <div className="h-10 shrink-0"></div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className={`p-6 flex items-center justify-between border-t ${theme === 'light' ? 'border-slate-100' : 'border-[#30363D]/50'}`}>
          <div /> {/* Placeholder for Previous button spot, to keep layout aligned since we can't go back */}
          <button 
            onClick={handleNext}
            disabled={selectedOption === null}
            className={`flex items-center gap-2 p-3 pl-4 rounded-xl font-bold transition-colors shadow-sm disabled:opacity-30 disabled:cursor-not-allowed ${
              theme === 'light' 
                ? 'bg-blue-600 hover:bg-blue-700 disabled:hover:bg-blue-600 text-white' 
                : 'bg-[#F0F6FC] hover:bg-white disabled:hover:bg-[#F0F6FC] text-[#0D0F12]'
            }`}
          >
            {currentIndex === questions.length - 1 ? 'Finish Quiz' : 'Next'}
            <Icons.ChevronRight size={18} />
          </button>
        </div>

      </motion.div>
    </div>
  );
}
