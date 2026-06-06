/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  Lock,
  Smartphone,
  ShieldCheck,
  Award,
  BellOff,
  Wifi,
  Mail,
  Users,
  Fingerprint,
  X
} from 'lucide-react';
import { UserProfile, ChecklistTask } from '../types';
import { CHECKLIST_TASKS, calculateLevelFromXP } from '../data';

interface ChecklistViewProps {
  profile: UserProfile;
  updateProfile: (profile: UserProfile | ((prev: UserProfile) => UserProfile)) => void;
  theme?: 'dark' | 'light';
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  show: { 
    y: 0, 
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 100, damping: 15 } 
  }
};

export default function ChecklistView({ profile, updateProfile, theme = 'light' }: ChecklistViewProps) {
  const [expandedTaskId, setExpandedTaskId] = useState<string | null>(CHECKLIST_TASKS[0].id);
  const [activeWhyMatters, setActiveWhyMatters] = useState<ChecklistTask | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedTaskId(prev => (prev === id ? null : id));
  };

  const handleCompleteTask = (task: ChecklistTask) => {
    const isAlreadyCompleted = profile.completedChecklist.indexOf(task.id) !== -1;
    if (isAlreadyCompleted) return;

    updateProfile((prev: UserProfile) => {
      const newCompleted = [...prev.completedChecklist, task.id];
      const xpEarned = task.rewardXp;
      const givesBadge = newCompleted.length === CHECKLIST_TASKS.length;

      let newBadges = [...prev.badges];
      if (givesBadge && prev.badges.indexOf('badge-checklist-complete') === -1) {
        newBadges.push('badge-checklist-complete');
      }

      const calculatedLevel = calculateLevelFromXP(prev.xp + xpEarned);

      return {
        ...prev,
        xp: prev.xp + xpEarned,
        completedChecklist: newCompleted,
        badges: newBadges,
        level: Math.max(prev.level, calculatedLevel)
      };
    });
  };

  // Helper icons for tasks
  const getTaskIcon = (taskId: string) => {
    switch (taskId) {
      case 'chk-app-lock':
        return <Lock className="w-5 h-5 text-indigo-600" />;
      case 'chk-hide-notifications':
        return <BellOff className="w-5 h-5 text-emerald-600" />;
      case 'chk-mifi-config':
        return <Wifi className="w-5 h-5 text-amber-600" />;
      case 'chk-mifi-limit':
        return <Users className="w-5 h-5 text-blue-600" />;
      case 'chk-wa-2sv':
        return <ShieldCheck className="w-5 h-5 text-rose-600" />;
      case 'chk-bank-bio':
        return <Fingerprint className="w-5 h-5 text-emerald-600" />;
      case 'chk-google-mfa':
        return <Mail className="w-5 h-5 text-blue-600" />;
      default:
        return <Smartphone className="w-5 h-5 text-slate-600" />;
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6 font-sans max-w-2xl mx-auto pb-12"
    >
      <motion.div variants={itemVariants} className={`flex items-center justify-between pb-3 border-b ${theme === 'light' ? 'border-slate-200' : 'border-[#30363D]'}`}>
        <div>
          <h2 className={`text-xl font-bold ${theme === 'light' ? 'text-slate-800' : 'text-[#F0F6FC]'}`}>Security Checklist</h2>
          <p className={`text-xs ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>Simple, high-impact security tasks you can carry out. These tasks are not compulsory, but do add to your XP.</p>
        </div>
        <span className={`text-xs w-[80.4px] text-center pl-2 pr-3 py-1 flex flex-col items-center justify-center rounded font-bold font-mono border ${theme === 'light' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'}`}>
          <span className="text-[13px]">{profile.completedChecklist.length} / {CHECKLIST_TASKS.length}</span>
          <span className="text-[11px] font-sans">Activated</span>
        </span>
      </motion.div>

      {profile.completedChecklist.length === CHECKLIST_TASKS.length && (
        <motion.div
          variants={itemVariants}
          className={`p-4 rounded-xl flex items-start gap-3 shadow-sm border ${theme === 'light' ? 'bg-emerald-50 border-emerald-200 text-emerald-950' : 'bg-emerald-900/20 border-emerald-500/20 text-emerald-100'}`}
        >
          <Award className={`w-10 h-10 shrink-0 mt-0.5 animate-bounce ${theme === 'light' ? 'text-emerald-600' : 'text-emerald-400'}`} />
          <div>
            <h4 className={`text-xs font-bold uppercase tracking-wider ${theme === 'light' ? 'text-emerald-800' : 'text-emerald-300'}`}>Absolute Shield Enforced!</h4>
            <p className={`text-xs mt-0.5 font-medium ${theme === 'light' ? 'text-emerald-900/80' : 'text-emerald-100/70'}`}>
              Excellent cyber diligence! You successfully audited and committed all {CHECKLIST_TASKS.length} high-impact defensive habits. 
              The <strong className={`font-bold ${theme === 'light' ? 'text-indigo-800' : 'text-indigo-300'}`}>Shield Enforcer</strong> gold achievement badge has been mounted to your profile shelf!
            </p>
          </div>
        </motion.div>
      )}

      <motion.div variants={itemVariants} className="space-y-4">
        {CHECKLIST_TASKS.map((task) => {
          const isCompleted = profile.completedChecklist.indexOf(task.id) !== -1;
          const isExpanded = expandedTaskId === task.id;

          return (
            <motion.div
              variants={itemVariants}
              key={task.id}
              className={`border rounded-xl overflow-hidden transition-all duration-205 ${
                isCompleted 
                  ? (theme === 'light' ? 'border-emerald-200/60 bg-emerald-50/10' : 'border-emerald-900/30 bg-emerald-900/5')
                  : isExpanded 
                    ? (theme === 'light' ? 'bg-white border-slate-350 shadow-md ring-1 ring-slate-100' : 'bg-[#161B22] border-slate-700 shadow-lg ring-1 ring-slate-800')
                    : (theme === 'light' ? 'bg-white border-slate-200 hover:border-slate-300 shadow-sm' : 'bg-[#161B22] border-[#30363D] hover:border-slate-600 shadow-sm')
              }`}
            >
              {/* Header card toggle */}
              <button
                onClick={() => toggleExpand(task.id)}
                className="w-full flex items-center justify-between p-4 cursor-pointer outline-none text-left"
              >
                <div className="flex items-center gap-3.5 pr-4">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border ${
                      isCompleted 
                        ? (theme === 'light' ? 'bg-emerald-100 border-emerald-200 text-emerald-600' : 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400')
                        : (theme === 'light' ? 'bg-slate-50 border-slate-100 text-slate-600' : 'bg-[#0D0F12] border-[#30363D] text-slate-400')
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : getTaskIcon(task.id)}
                  </div>
                  
                  <div>
                    <h3 className={`text-sm font-bold leading-tight ${isCompleted ? (theme === 'light' ? 'text-slate-500 line-through' : 'text-slate-500 line-through') : (theme === 'light' ? 'text-slate-800' : 'text-slate-200')}`}>
                      {task.title}
                    </h3>
                    <p className={`text-xs mt-0.5 ${isExpanded ? '' : 'line-clamp-1'} ${isCompleted ? (theme === 'light' ? 'text-slate-400' : 'text-slate-600') : (theme === 'light' ? 'text-slate-500' : 'text-slate-400')}`}>
                      {task.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 font-sans">
                  {!isCompleted && (
                    <span className={`text-[10px] font-black font-mono px-2 py-0.5 rounded-md uppercase border ${theme === 'light' ? 'text-emerald-500 bg-emerald-50 border-emerald-100' : 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'}`}>
                      +{task.rewardXp} XP
                    </span>
                  )}
                  {isExpanded ? <ChevronUp className={`w-4 h-4 ${theme === 'light' ? 'text-slate-400' : 'text-slate-500'}`} /> : <ChevronDown className={`w-4 h-4 ${theme === 'light' ? 'text-slate-400' : 'text-slate-500'}`} />}
                </div>
              </button>

              {/* Expanded Guide */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    className={`overflow-hidden border-t ${theme === 'light' ? 'border-slate-105 bg-slate-50/50' : 'border-[#30363D] bg-[#0D0F12]/50'}`}
                  >
                    <div className={`p-4 md:p-5 space-y-4 border-t text-xs ${theme === 'light' ? 'border-slate-100' : 'border-[#30363D]/50'}`}>
                      <div>
                        <span className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'light' ? 'text-slate-400' : 'text-slate-500'}`}>Tactical Implementation Guide</span>
                        <div className={`mt-2 space-y-2 border p-4 rounded-xl font-medium ${theme === 'light' ? 'bg-white border-slate-200 text-slate-700' : 'bg-[#161B22] border-[#30363D] text-slate-300'}`}>
                          {task.interactiveGuide.map((step, sIdx) => (
                            <div key={sIdx} className="flex gap-2.5 items-start">
                              <span className={`w-4.5 h-4.5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 font-mono border ${theme === 'light' ? 'bg-slate-100 border-slate-200 text-slate-600' : 'bg-[#0D0F12] border-slate-700 text-slate-400'}`}>
                                {sIdx + 1}
                              </span>
                              <span className={`text-xs leading-relaxed font-sans select-all ${theme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>{step}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-2">
                        {task.whyItMatters ? (
                          <button 
                            onClick={() => setActiveWhyMatters(task)}
                            className={`text-xs font-bold px-2 py-2 flex items-center gap-1.5 transition-colors cursor-pointer ${theme === 'light' ? 'text-indigo-600 hover:text-indigo-800' : 'text-indigo-400 hover:text-indigo-300'}`}
                          >
                            <HelpCircle className="w-4 h-4" /> Why It Matters
                          </button>
                        ) : (
                          <div />
                        )}
                        {isCompleted ? (
                          <div className={`flex items-center gap-1 px-4 py-2 rounded-lg font-bold text-xs border ${theme === 'light' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'}`}>
                            <CheckCircle2 className="w-4.5 h-4.5" /> Defended in Real-Life
                          </div>
                        ) : (
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleCompleteTask(task)}
                            className={`font-bold text-xs py-2.5 px-4 rounded-lg shadow-sm transition-all flex items-center gap-1.5 cursor-pointer ${theme === 'light' ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-600 hover:bg-blue-500 text-white'}`}
                          >
                            <ShieldCheck className="w-4 h-4" /> Commit Secure Action (+{task.rewardXp} XP)
                          </motion.button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Why It Matters Modal */}
      <AnimatePresence>
        {activeWhyMatters && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm ${theme === 'light' ? 'bg-slate-900/40' : 'bg-[#0D0F12]/80'}`}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className={`rounded-2xl shadow-xl w-full max-w-sm overflow-hidden ${theme === 'light' ? 'bg-white' : 'bg-[#161B22] border border-[#30363D]'}`}
            >
              <div className={`p-4 flex justify-between items-center text-white ${theme === 'light' ? 'bg-indigo-600' : 'bg-indigo-900 border-b border-indigo-700/50'}`}>
                <div className="flex items-center gap-2 font-bold">
                  <HelpCircle className="w-5 h-5 opacity-80" />
                  Why It Matters
                </div>
                <button 
                  onClick={() => setActiveWhyMatters(null)}
                  className="text-white/80 hover:text-white transition-colors cursor-pointer p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6">
                <h3 className={`font-bold mb-2 ${theme === 'light' ? 'text-slate-800' : 'text-slate-100'}`}>
                  {activeWhyMatters.title}
                </h3>
                <p className={`text-sm leading-relaxed ${theme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
                  {activeWhyMatters.whyItMatters}
                </p>
                <div className="mt-6 flex justify-end">
                  <button 
                    onClick={() => setActiveWhyMatters(null)}
                    className={`px-4 py-2 rounded-lg font-bold text-xs transition-colors cursor-pointer ${theme === 'light' ? 'bg-slate-100 hover:bg-slate-200 text-slate-700' : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'}`}
                  >
                    Got It
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
