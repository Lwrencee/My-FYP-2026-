import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { Course } from '../types';
import { X, ChevronLeft, ChevronRight, CheckCircle2, CheckCircle, XCircle, Lock, ShieldCheck, Server, Bot, Zap, KeyRound, Smartphone, BookOpen, Headphones, MonitorPlay, Mail, MessageSquare, AlertTriangle, Key, ShieldAlert, LockKeyhole, Unlock, Hash, Eye, EyeOff, Database, Search, Shield, Users, UserCheck, Fingerprint, QrCode, Globe, Layers, Wifi, Network } from 'lucide-react';

interface CourseSwipeViewProps {
  course: Course;
  onClose: () => void;
  onComplete: (earnedXp: number, courseId: string) => void;
  theme?: 'light' | 'dark';
}

export default function CourseSwipeView({ course, onClose, onComplete, theme = 'dark' }: CourseSwipeViewProps) {
  const [learningMode, setLearningMode] = useState<'text' | 'audio' | 'video'>('text');
  const [lastMediaMode, setLastMediaMode] = useState<'audio' | 'video'>('audio');
  const [isRetentionCheckOnly, setIsRetentionCheckOnly] = useState(false);
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
    
    if (isRetentionCheckOnly) {
      const nextIdx = lessons.findIndex((l, i) => i > currentIndex && l.interactiveCheck);
      if (nextIdx !== -1) {
        setCurrentIndex(nextIdx);
      } else {
        setShowCompletion(true);
      }
    } else {
      if (currentIndex < lessons.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setShowCompletion(true);
      }
    }
  };

  const goPrev = () => {
    if (isRetentionCheckOnly) {
      let prevIdx = -1;
      for (let i = currentIndex - 1; i >= 0; i--) {
        if (lessons[i].interactiveCheck) {
          prevIdx = i;
          break;
        }
      }
      if (prevIdx !== -1) {
        setCurrentIndex(prevIdx);
      } else {
        setLearningMode(lastMediaMode);
        setIsRetentionCheckOnly(false);
      }
    } else {
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      }
    }
  };

  const handleMediaFinish = () => {
    const checkIdx = lessons.findIndex(l => l.interactiveCheck);
    if (checkIdx !== -1) {
      setIsRetentionCheckOnly(true);
      setCurrentIndex(checkIdx);
      setLearningMode('text');
    } else {
      setShowCompletion(true);
    }
  };

  const handleModeSwitch = (mode: 'text' | 'audio' | 'video') => {
    setLearningMode(mode);
    setIsRetentionCheckOnly(false);
    if (mode === 'audio' || mode === 'video') {
      setLastMediaMode(mode);
    }
  };

  const renderIllustration = (type?: string) => {
    if (!type) return null;

    if (type === 'cia-triad') {
      return (
        <div className={`mt-4 mb-8 flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 p-4 sm:p-6 rounded-2xl border ${theme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-[#0D0F12] border-[#30363D]'}`}>
          <div className="flex flex-col items-center gap-1 sm:gap-2">
            <div className={`p-3 sm:p-4 rounded-full ${theme === 'light' ? 'bg-blue-100 text-blue-600' : 'bg-[#58A6FF]/20 text-[#58A6FF]'}`}>
              <Lock size={24} className="sm:w-8 sm:h-8" />
            </div>
            <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider text-center ${theme === 'light' ? 'text-slate-500' : 'text-[#8B949E]'}`}>Confidentiality</span>
          </div>
          <div className={`h-6 w-px sm:h-px sm:w-8 ${theme === 'light' ? 'bg-slate-200' : 'bg-[#30363D]'}`} />
          <div className="flex flex-col items-center gap-1 sm:gap-2">
            <div className={`p-3 sm:p-4 rounded-full ${theme === 'light' ? 'bg-green-100 text-green-600' : 'bg-[#3FB950]/20 text-[#3FB950]'}`}>
              <ShieldCheck size={24} className="sm:w-8 sm:h-8" />
            </div>
            <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider text-center ${theme === 'light' ? 'text-slate-500' : 'text-[#8B949E]'}`}>Integrity</span>
          </div>
          <div className={`h-6 w-px sm:h-px sm:w-8 ${theme === 'light' ? 'bg-slate-200' : 'bg-[#30363D]'}`} />
          <div className="flex flex-col items-center gap-1 sm:gap-2">
            <div className={`p-3 sm:p-4 rounded-full ${theme === 'light' ? 'bg-purple-100 text-purple-600' : 'bg-[#BC8CFF]/20 text-[#BC8CFF]'}`}>
              <Server size={24} className="sm:w-8 sm:h-8" />
            </div>
            <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider text-center ${theme === 'light' ? 'text-slate-500' : 'text-[#8B949E]'}`}>Availability</span>
          </div>
        </div>
      );
    }

    if (type === 'bot-attack') {
      return (
        <div className={`mt-4 mb-8 flex flex-col items-center justify-center p-6 sm:p-8 rounded-2xl border ${theme === 'light' ? 'bg-red-50 border-red-100' : 'bg-[#F85149]/10 border-[#F85149]/20'}`}>
          <div className="relative">
            <Bot size={48} className={`sm:w-14 sm:h-14 ${theme === 'light' ? 'text-red-600' : 'text-[#F85149]'}`} />
            <motion.div
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="absolute -top-2 -right-4"
            >
              <Zap size={20} className="sm:w-6 sm:h-6 text-yellow-500 fill-yellow-500" />
            </motion.div>
          </div>
          <p className={`mt-4 text-xs sm:text-sm font-medium text-center ${theme === 'light' ? 'text-red-700' : 'text-[#F85149]'}`}>
            Automated bots scan the internet 24/7.
          </p>
        </div>
      );
    }

    if (type === 'security-measures') {
      return (
         <div className={`mt-4 mb-8 flex justify-center items-center p-8 sm:p-10 rounded-2xl border ${theme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-[#0D0F12] border-[#30363D]'}`}>
          <div className="relative">
            <div className={`p-4 z-10 relative rounded-full border-4 ${theme === 'light' ? 'bg-white border-slate-50 text-emerald-600' : 'bg-[#161B22] border-[#0D0F12] text-emerald-400'}`}>
              <ShieldCheck size={32} className="sm:w-8 sm:h-8" />
            </div>
            <div className={`absolute -left-6 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full ${theme === 'light' ? 'bg-slate-200 text-slate-600' : 'bg-[#30363D] text-[#8B949E]'}`}>
              <KeyRound size={16} className="sm:w-5 sm:h-5" />
            </div>
            <div className={`absolute -right-6 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full ${theme === 'light' ? 'bg-slate-200 text-slate-600' : 'bg-[#30363D] text-[#8B949E]'}`}>
              <Smartphone size={16} className="sm:w-5 sm:h-5" />
            </div>
          </div>
        </div>
      );
    }

    if (type === 'phishing-email') {
      return (
        <div className={`mt-4 mb-8 flex flex-col items-center justify-center p-6 sm:p-8 rounded-2xl border ${theme === 'light' ? 'bg-red-50 border-red-100' : 'bg-[#F85149]/10 border-[#F85149]/20'}`}>
          <div className="flex gap-4">
            <div className={`p-4 rounded-xl shadow-lg border ${theme === 'light' ? 'bg-white border-red-200 text-red-600' : 'bg-[#161B22] border-[#F85149]/30 text-[#F85149]'}`}>
              <Mail size={32} className="sm:w-10 sm:h-10" />
            </div>
            <div className={`flex items-center justify-center p-2 rounded-full ${theme === 'light' ? 'text-red-500' : 'text-[#F85149]'}`}>
              <AlertTriangle size={24} className="sm:w-8 sm:h-8 animate-pulse" />
            </div>
          </div>
          <p className={`mt-4 text-xs sm:text-sm font-medium text-center ${theme === 'light' ? 'text-red-700' : 'text-[#F85149]'}`}>
            Suspicious Urgent Email Detected
          </p>
        </div>
      );
    }

    if (type === 'smishing-text') {
      return (
        <div className={`mt-4 mb-8 flex flex-col items-center justify-center p-6 sm:p-8 rounded-2xl border ${theme === 'light' ? 'bg-orange-50 border-orange-100' : 'bg-[#D29922]/10 border-[#D29922]/20'}`}>
          <div className={`p-4 rounded-xl shadow border flex gap-3 items-center ${theme === 'light' ? 'bg-white border-orange-200' : 'bg-[#161B22] border-[#D29922]/30'}`}>
            <MessageSquare size={28} className={theme === 'light' ? 'text-orange-600' : 'text-[#D29922]'} />
            <div className="flex flex-col gap-1 w-24 sm:w-32">
              <div className={`h-2 rounded-full w-full ${theme === 'light' ? 'bg-orange-200' : 'bg-[#D29922]/30'}`} />
              <div className={`h-2 rounded-full w-3/4 ${theme === 'light' ? 'bg-orange-200' : 'bg-[#D29922]/30'}`} />
            </div>
            <ShieldAlert size={20} className={`ml-2 animate-bounce ${theme === 'light' ? 'text-orange-500' : 'text-[#D29922]'}`} />
          </div>
          <p className={`mt-4 text-xs sm:text-sm font-medium text-center ${theme === 'light' ? 'text-orange-700' : 'text-[#D29922]'}`}>
            SMS with malicious link
          </p>
        </div>
      );
    }

    if (type === 'scam-warning') {
      return (
        <div className={`mt-4 mb-8 flex justify-center p-6 sm:p-8 rounded-2xl border ${theme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-[#0D0F12] border-[#30363D]'}`}>
           <div className="flex gap-2">
             <AlertTriangle size={32} className="text-yellow-500" />
             <div className="flex flex-col justify-center">
               <span className={`text-sm font-bold ${theme === 'light' ? 'text-slate-800' : 'text-slate-200'}`}>Verify Sender URL</span>
               <span className={`text-xs ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>Check for subtle typos like 1 instead of l</span>
             </div>
           </div>
        </div>
      );
    }

    if (type === 'password-strength') {
      return (
        <div className={`mt-4 mb-8 flex flex-col p-6 sm:p-8 rounded-2xl border ${theme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-[#0D0F12] border-[#30363D]'}`}>
          <div className="flex gap-4 items-center">
            <LockKeyhole size={32} className={theme === 'light' ? 'text-emerald-600' : 'text-emerald-400'} />
            <div className="flex-1 space-y-1.5">
               <div className="flex justify-between items-center text-xs sm:text-sm font-bold">
                 <span className={theme === 'light' ? 'text-slate-700' : 'text-slate-300'}>Password Strength</span>
                 <span className="text-emerald-500">Strong</span>
               </div>
               <div className="flex gap-1 h-2">
                 <div className="flex-1 bg-emerald-500 rounded-l-full" />
                 <div className="flex-1 bg-emerald-500" />
                 <div className="flex-1 bg-emerald-500" />
                 <div className="flex-1 bg-emerald-500 rounded-r-full" />
               </div>
            </div>
          </div>
        </div>
      );
    }

    if (type === 'brute-force') {
      return (
         <div className={`mt-4 mb-8 flex flex-col items-center justify-center p-6 sm:p-8 rounded-2xl border ${theme === 'light' ? 'bg-red-50 border-red-100' : 'bg-[#F85149]/10 border-[#F85149]/20'}`}>
           <div className="relative flex items-center justify-center">
             <Unlock size={40} className={theme === 'light' ? 'text-slate-300' : 'text-slate-600'} />
             <Hash size={32} className={`absolute text-red-500 animate-spin`} />
           </div>
           <p className={`mt-4 text-xs sm:text-sm font-medium text-center ${theme === 'light' ? 'text-red-700' : 'text-[#F85149]'}`}>
            Brute Force Attack in progress...
          </p>
         </div>
      );
    }

    if (type === 'password-manager') {
      return (
        <div className={`mt-4 mb-8 flex justify-center items-center p-8 sm:p-10 rounded-2xl border ${theme === 'light' ? 'bg-blue-50 border-blue-200' : 'bg-[#58A6FF]/10 border-[#58A6FF]/20'}`}>
          <div className="relative">
            <div className={`p-4 z-10 relative rounded-xl border-2 ${theme === 'light' ? 'bg-white border-blue-200 text-blue-600 shadow-sm' : 'bg-[#161B22] border-[#58A6FF]/30 text-[#58A6FF]'}`}>
              <ShieldCheck size={32} className="sm:w-8 sm:h-8" />
            </div>
            <div className={`absolute -left-6 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full border shadow-sm ${theme === 'light' ? 'bg-white border-slate-200 text-slate-600' : 'bg-[#21262D] border-[#30363D] text-[#8B949E]'}`}>
              <Key size={16} className="sm:w-5 sm:h-5 text-yellow-500" />
            </div>
            <div className={`absolute -right-6 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full border shadow-sm ${theme === 'light' ? 'bg-white border-slate-200 text-slate-600' : 'bg-[#21262D] border-[#30363D] text-[#8B949E]'}`}>
              <Key size={16} className="sm:w-5 sm:h-5 text-indigo-500" />
            </div>
          </div>
        </div>
      );
    }

    if (type === 'footprint-types') {
      return (
        <div className={`mt-4 mb-8 flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 p-4 sm:p-6 rounded-2xl border ${theme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-[#0D0F12] border-[#30363D]'}`}>
          <div className="flex flex-col items-center gap-1 sm:gap-2">
            <div className={`p-3 sm:p-4 rounded-full ${theme === 'light' ? 'bg-blue-100 text-blue-600' : 'bg-[#58A6FF]/20 text-[#58A6FF]'}`}>
              <Eye size={24} className="sm:w-8 sm:h-8" />
            </div>
            <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider text-center ${theme === 'light' ? 'text-slate-500' : 'text-[#8B949E]'}`}>Active</span>
          </div>
          <div className={`h-6 w-px sm:h-px sm:w-8 ${theme === 'light' ? 'bg-slate-200' : 'bg-[#30363D]'}`} />
          <div className="flex flex-col items-center gap-1 sm:gap-2">
            <div className={`p-3 sm:p-4 rounded-full ${theme === 'light' ? 'bg-slate-200 text-slate-500' : 'bg-[#30363D] text-[#8B949E]'}`}>
              <EyeOff size={24} className="sm:w-8 sm:h-8" />
            </div>
            <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider text-center ${theme === 'light' ? 'text-slate-500' : 'text-[#8B949E]'}`}>Passive</span>
          </div>
        </div>
      );
    }

    if (type === 'data-scraping') {
      return (
        <div className={`mt-4 mb-8 flex flex-col items-center justify-center p-6 sm:p-8 rounded-2xl border ${theme === 'light' ? 'bg-violet-50 border-violet-100' : 'bg-[#BC8CFF]/10 border-[#BC8CFF]/20'}`}>
          <div className="flex gap-4">
            <div className={`p-4 rounded-xl shadow border relative overflow-hidden ${theme === 'light' ? 'bg-white border-violet-200 text-purple-600' : 'bg-[#161B22] border-[#BC8CFF]/30 text-[#BC8CFF]'}`}>
              <Database size={32} />
              <Search size={20} className={`absolute bottom-2 right-2 animate-pulse ${theme === 'light' ? 'text-purple-400' : 'text-[#BC8CFF]'}`} />
            </div>
          </div>
          <p className={`mt-4 text-xs sm:text-sm font-medium text-center ${theme === 'light' ? 'text-violet-700' : 'text-[#BC8CFF]'}`}>
            Data Scrapers Extracting Info
          </p>
        </div>
      );
    }

    if (type === 'privacy-settings') {
      return (
        <div className={`mt-4 mb-8 flex justify-center p-6 sm:p-8 rounded-2xl border ${theme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-[#0D0F12] border-[#30363D]'}`}>
           <div className="flex gap-4 items-center">
             <div className={`p-3 rounded-full border ${theme === 'light' ? 'bg-blue-100 border-blue-200 text-blue-600' : 'bg-[#58A6FF]/20 border-[#58A6FF]/30 text-[#58A6FF]'}`}>
               <Shield size={28} />
             </div>
             <div className="flex flex-col justify-center">
               <span className={`text-sm font-bold ${theme === 'light' ? 'text-slate-800' : 'text-slate-200'}`}>Check Privacy Settings</span>
               <span className={`text-xs ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>Limit personal info visibility.</span>
             </div>
           </div>
        </div>
      );
    }

    if (type === 'social-manipulation') {
      return (
        <div className={`mt-4 mb-8 flex flex-col items-center justify-center p-6 sm:p-8 rounded-2xl border ${theme === 'light' ? 'bg-orange-50 border-orange-100' : 'bg-[#D29922]/10 border-[#D29922]/20'}`}>
           <div className="relative">
             <div className={`p-4 z-10 relative rounded-xl border-2 ${theme === 'light' ? 'bg-white border-orange-200 text-orange-600 shadow-sm' : 'bg-[#161B22] border-[#D29922]/30 text-[#D29922]'}`}>
               <Users size={40} className="sm:w-12 sm:h-12" />
             </div>
             <div className={`absolute -top-3 -right-3 p-1.5 sm:p-2 flex items-center justify-center rounded-full border shadow-sm animate-pulse ${theme === 'light' ? 'bg-white border-red-200 text-red-500' : 'bg-[#21262D] border-red-500/50 text-red-500'}`}>
               <AlertTriangle size={16} className="sm:w-5 sm:h-5" />
             </div>
           </div>
           <p className={`mt-4 text-xs sm:text-sm font-medium text-center ${theme === 'light' ? 'text-orange-700' : 'text-[#D29922]'}`}>
            Preying on Emotion & Urgency
          </p>
        </div>
      );
    }

    if (type === 'verify-identity') {
      return (
        <div className={`mt-4 mb-8 flex justify-center p-6 sm:p-8 rounded-2xl border ${theme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-[#0D0F12] border-[#30363D]'}`}>
           <div className="flex gap-4 items-center">
             <div className={`p-3 rounded-full border ${theme === 'light' ? 'bg-emerald-100 border-emerald-200 text-emerald-600' : 'bg-[#3FB950]/20 border-[#3FB950]/30 text-[#3FB950]'}`}>
               <UserCheck size={28} />
             </div>
             <div className="flex flex-col justify-center">
               <span className={`text-sm font-bold ${theme === 'light' ? 'text-slate-800' : 'text-slate-200'}`}>Verify the Caller</span>
               <span className={`text-xs ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>Hang up and call standard channels.</span>
             </div>
           </div>
        </div>
      );
    }

    if (type === 'mfa-factors') {
      return (
        <div className={`mt-4 mb-8 flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 p-4 sm:p-6 rounded-2xl border ${theme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-[#0D0F12] border-[#30363D]'}`}>
          <div className="flex flex-col items-center gap-1 sm:gap-2">
            <div className={`p-3 sm:p-4 rounded-full ${theme === 'light' ? 'bg-blue-100 text-blue-600' : 'bg-[#58A6FF]/20 text-[#58A6FF]'}`}>
              <Key size={24} className="sm:w-8 sm:h-8" />
            </div>
            <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider text-center ${theme === 'light' ? 'text-slate-500' : 'text-[#8B949E]'}`}>Know</span>
          </div>
          <div className="flex flex-col items-center gap-1 sm:gap-2">
            <div className={`p-3 sm:p-4 rounded-full ${theme === 'light' ? 'bg-green-100 text-green-600' : 'bg-[#3FB950]/20 text-[#3FB950]'}`}>
              <Smartphone size={24} className="sm:w-8 sm:h-8" />
            </div>
            <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider text-center ${theme === 'light' ? 'text-slate-500' : 'text-[#8B949E]'}`}>Have</span>
          </div>
          <div className="flex flex-col items-center gap-1 sm:gap-2">
            <div className={`p-3 sm:p-4 rounded-full ${theme === 'light' ? 'bg-purple-100 text-purple-600' : 'bg-[#BC8CFF]/20 text-[#BC8CFF]'}`}>
              <Fingerprint size={24} className="sm:w-8 sm:h-8" />
            </div>
            <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider text-center ${theme === 'light' ? 'text-slate-500' : 'text-[#8B949E]'}`}>Are</span>
          </div>
        </div>
      );
    }

    if (type === 'authenticator-app') {
      return (
        <div className={`mt-4 mb-8 flex justify-center items-center p-8 sm:p-10 rounded-2xl border ${theme === 'light' ? 'bg-indigo-50 border-indigo-200' : 'bg-[#79C0FF]/10 border-[#79C0FF]/20'}`}>
          <div className="relative">
            <div className={`p-4 z-10 relative rounded-xl border-2 ${theme === 'light' ? 'bg-white border-indigo-200 text-indigo-600 shadow-sm' : 'bg-[#161B22] border-[#79C0FF]/30 text-[#79C0FF]'}`}>
              <Smartphone size={32} className="sm:w-8 sm:h-8" />
            </div>
            <div className={`absolute -right-4 -bottom-2 p-1.5 sm:p-2 rounded-full border shadow-sm ${theme === 'light' ? 'bg-white border-slate-200 text-slate-800' : 'bg-[#21262D] border-[#30363D] text-[#C9D1D9]'}`}>
              <QrCode size={16} className="sm:w-5 sm:h-5 text-indigo-500" />
            </div>
          </div>
        </div>
      );
    }

    if (type === 'symmetric-keys') {
      return (
        <div className={`mt-4 mb-8 flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 p-6 sm:p-8 rounded-2xl border ${theme === 'light' ? 'bg-amber-50 border-amber-200' : 'bg-[#D29922]/10 border-[#D29922]/20'}`}>
          <div className="flex items-center gap-4">
            <div className={`p-4 rounded-xl border-2 shadow-sm ${theme === 'light' ? 'bg-white border-amber-200 text-amber-600' : 'bg-[#161B22] border-[#D29922]/30 text-[#D29922]'}`}>
              <Lock size={32} />
            </div>
            <div className={`h-1 w-12 rounded-full ${theme === 'light' ? 'bg-amber-300' : 'bg-[#D29922]/50'}`} />
            <div className={`p-4 rounded-xl shadow-sm ${theme === 'light' ? 'bg-amber-300 text-amber-800' : 'bg-[#D29922] text-[#0D0F12]'}`}>
              <Key size={32} />
            </div>
            <div className={`h-1 w-12 rounded-full ${theme === 'light' ? 'bg-amber-300' : 'bg-[#D29922]/50'}`} />
            <div className={`p-4 rounded-xl border-2 shadow-sm ${theme === 'light' ? 'bg-white border-amber-200 text-amber-600' : 'bg-[#161B22] border-[#D29922]/30 text-[#D29922]'}`}>
              <Unlock size={32} />
            </div>
          </div>
        </div>
      );
    }

    if (type === 'asymmetric-keys') {
      return (
        <div className={`mt-4 mb-8 flex justify-center items-center p-8 sm:p-10 rounded-2xl border ${theme === 'light' ? 'bg-blue-50 border-blue-200' : 'bg-[#58A6FF]/10 border-[#58A6FF]/20'}`}>
          <div className="relative">
            <div className={`p-4 z-10 relative rounded-xl border-2 ${theme === 'light' ? 'bg-white border-blue-200 text-blue-600 shadow-sm' : 'bg-[#161B22] border-[#58A6FF]/30 text-[#58A6FF]'}`}>
              <Lock size={32} />
            </div>
            <div className={`absolute -left-8 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full border shadow-sm ${theme === 'light' ? 'bg-green-100 border-green-200 text-green-600' : 'bg-[#3FB950]/20 border-[#3FB950]/30 text-[#3FB950]'}`}>
              <Globe size={20} className="sm:w-6 sm:h-6" />
            </div>
            <div className={`absolute -right-8 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full border shadow-sm ${theme === 'light' ? 'bg-red-100 border-red-200 text-red-600' : 'bg-[#F85149]/20 border-[#F85149]/30 text-[#F85149]'}`}>
              <KeyRound size={20} className="sm:w-6 sm:h-6" />
            </div>
          </div>
        </div>
      );
    }

    if (type === 'hacker-mitm') {
      return (
        <div className={`mt-4 mb-8 flex flex-col items-center justify-center p-6 sm:p-8 rounded-2xl border ${theme === 'light' ? 'bg-red-50 border-red-100' : 'bg-[#F85149]/10 border-[#F85149]/20'}`}>
          <div className="flex items-center gap-2 sm:gap-4">
            <div className={`p-4 rounded-full ${theme === 'light' ? 'bg-white text-slate-400' : 'bg-[#0D0F12] text-[#8B949E]'}`}>
              <Smartphone size={28} />
            </div>
            <div className={`h-px w-8 sm:w-12 border-t border-dashed ${theme === 'light' ? 'border-red-400' : 'border-[#F85149]'}`} />
            <div className={`p-4 rounded-xl shadow-lg border relative overflow-hidden ${theme === 'light' ? 'bg-white border-red-200 text-red-600' : 'bg-[#161B22] border-[#F85149]/30 text-[#F85149]'}`}>
              <Bot size={32} />
              <Wifi size={16} className="absolute bottom-2 right-2 animate-pulse text-red-400" />
            </div>
            <div className={`h-px w-8 sm:w-12 border-t border-dashed ${theme === 'light' ? 'border-red-400' : 'border-[#F85149]'}`} />
            <div className={`p-4 rounded-full ${theme === 'light' ? 'bg-white text-slate-400' : 'bg-[#0D0F12] text-[#8B949E]'}`}>
              <Server size={28} />
            </div>
          </div>
          <p className={`mt-4 text-xs sm:text-sm font-medium text-center ${theme === 'light' ? 'text-red-700' : 'text-[#F85149]'}`}>
            Man-in-the-Middle Network Hijack
          </p>
        </div>
      );
    }

    if (type === 'dark-web-layers') {
      return (
        <div className={`mt-4 mb-8 flex flex-col items-center gap-2 p-6 sm:p-8 rounded-2xl border ${theme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-[#0D0F12] border-[#30363D]'}`}>
          <div className={`w-full max-w-[200px] py-3 text-center rounded-t-xl font-bold text-sm ${theme === 'light' ? 'bg-blue-100 text-blue-700' : 'bg-[#58A6FF]/20 text-[#58A6FF]'}`}>
            Surface Web
          </div>
          <div className={`w-full max-w-[240px] py-3 text-center font-bold text-sm ${theme === 'light' ? 'bg-slate-300 text-slate-700' : 'bg-[#30363D] text-[#8B949E]'}`}>
            Deep Web
          </div>
          <div className={`w-full max-w-[280px] py-4 text-center rounded-b-xl font-bold text-sm border-t-2 ${theme === 'light' ? 'bg-slate-900 text-slate-200 border-slate-700' : 'bg-black text-[#58A6FF] border-[#30363D]'}`}>
            <span className="flex items-center justify-center gap-2">
              <Layers size={16} /> Dark Web
            </span>
          </div>
        </div>
      );
    }

    if (type === 'credential-leak') {
      return (
        <div className={`mt-4 mb-8 flex flex-col items-center justify-center p-6 sm:p-8 rounded-2xl border ${theme === 'light' ? 'bg-rose-50 border-rose-100' : 'bg-rose-900/10 border-rose-900/30'}`}>
          <div className="relative">
            <div className={`p-4 z-10 relative rounded-xl border-2 ${theme === 'light' ? 'bg-white border-rose-200 text-rose-600 shadow-sm' : 'bg-[#161B22] border-rose-900/50 text-rose-500'}`}>
              <Database size={40} className="sm:w-12 sm:h-12" />
            </div>
            <div className={`absolute -top-3 -right-3 p-1.5 sm:p-2 flex items-center justify-center rounded-full border shadow-sm ${theme === 'light' ? 'bg-white border-slate-200 text-slate-600' : 'bg-[#21262D] border-[#30363D] text-[#C9D1D9]'}`}>
              <Unlock size={16} className="sm:w-5 sm:h-5 text-rose-500" />
            </div>
          </div>
          <p className={`mt-4 text-xs sm:text-sm font-medium text-center ${theme === 'light' ? 'text-rose-700' : 'text-rose-400'}`}>
            Exposed Data & Passwords
          </p>
        </div>
      );
    }

    return null;
  }

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

            {/* Learning Mode Tabs */}
            <div className={`flex justify-center p-3 border-b z-20 shrink-0 relative ${theme === 'light' ? 'bg-slate-50/50 border-slate-200' : 'bg-[#0D0F12]/50 border-[#30363D]'}`}>
              <div className={`flex rounded-xl w-full max-w-sm ${theme === 'light' ? 'bg-slate-200/70 p-1.5' : 'bg-[#161B22] border border-[#30363D] p-1.5'}`}>
                <button 
                  onClick={() => handleModeSwitch('text')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 text-xs sm:text-sm font-semibold rounded-lg transition-all ${learningMode === 'text' ? (theme === 'light' ? 'bg-white text-slate-800 shadow-sm' : 'bg-[#21262D] text-white shadow-sm border border-[#30363D]') : (theme === 'light' ? 'text-slate-500 hover:text-slate-700' : 'text-[#8B949E] hover:text-slate-300')}`}
                >
                  <BookOpen size={16} /> Read
                </button>
                <button 
                  onClick={() => handleModeSwitch('audio')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 text-xs sm:text-sm font-semibold rounded-lg transition-all ${learningMode === 'audio' ? (theme === 'light' ? 'bg-white text-slate-800 shadow-sm' : 'bg-[#21262D] text-white shadow-sm border border-[#30363D]') : (theme === 'light' ? 'text-slate-500 hover:text-slate-700' : 'text-[#8B949E] hover:text-slate-300')}`}
                >
                  <Headphones size={16} /> Listen
                </button>
                <button 
                  onClick={() => handleModeSwitch('video')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 text-xs sm:text-sm font-semibold rounded-lg transition-all ${learningMode === 'video' ? (theme === 'light' ? 'bg-white text-slate-800 shadow-sm' : 'bg-[#21262D] text-white shadow-sm border border-[#30363D]') : (theme === 'light' ? 'text-slate-500 hover:text-slate-700' : 'text-[#8B949E] hover:text-slate-300')}`}
                >
                  <MonitorPlay size={16} /> Watch
                </button>
              </div>
            </div>

            <div className="flex-1 relative overflow-hidden flex flex-col">
              <AnimatePresence mode="wait">
                {learningMode === 'text' ? (
                  <motion.div 
                    key="mode-text" 
                    initial={{ opacity: 0, scale: 0.98 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="flex-1 flex flex-col w-full h-full relative"
                  >
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
                          {isRetentionCheckOnly ? 'Retention Check' : lessons[currentIndex].title}
                        </h3>
                      </div>

                      {renderIllustration(lessons[currentIndex].illustrationType)}

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
                <div className={`p-6 flex items-center justify-between border-t shrink-0 ${theme === 'light' ? 'border-slate-100' : 'border-[#30363D]/50'}`}>
                  <button 
                    onClick={goPrev} 
                    disabled={!isRetentionCheckOnly && currentIndex === 0}
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
                    {isRetentionCheckOnly || currentIndex === lessons.length - 1 ? 'Finish Module' : 'Next'}
                    <ChevronRight size={18} />
                  </button>
                </div>

                {/* Tap areas for quick navigation like actual stories */}
                <div className="absolute inset-y-24 left-0 w-1/5 z-10" onClick={goPrev} />
                <div className="absolute inset-y-24 right-0 w-1/5 z-10" onClick={goNext} />
                  </motion.div>
                ) : learningMode === 'audio' ? (
                  <motion.div 
                    key="mode-audio"
                    initial={{ opacity: 0, scale: 0.98 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="flex-1 flex flex-col overflow-y-auto w-full p-8 md:p-10 justify-center"
                  >
                    <div className={`flex flex-col items-center justify-center p-8 rounded-[2rem] border ${theme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-[#0D0F12] border-[#30363D]'}`}>
                      <div className={`p-6 mb-6 rounded-full inline-block ${theme === 'light' ? 'bg-blue-100/50 text-blue-600' : 'bg-[#21262D] text-[#58A6FF]'}`}>
                        <Headphones size={64} strokeWidth={1} />
                      </div>
                      <h3 className={`text-2xl font-bold mb-4 text-center ${theme === 'light' ? 'text-slate-900' : 'text-[#F0F6FC]'}`}>
                        {course.title} Audio
                      </h3>
                      <p className={`text-center mb-8 text-sm ${theme === 'light' ? 'text-slate-500' : 'text-[#8B949E]'}`}>
                        Listen to the complete lesson for this module.
                      </p>
                      
                      {course.audioSrc ? (
                        <audio controls src={course.audioSrc} onEnded={handleMediaFinish} className="w-full mb-10" />
                      ) : (
                        <div className={`w-full p-4 mb-10 rounded-xl text-center text-sm font-semibold border ${theme === 'light' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-amber-900/20 text-amber-400 border-amber-900/40'}`}>
                          Audio coming soon. Check back later!
                        </div>
                      )}

                      <button 
                        onClick={handleMediaFinish}
                        className={`w-full max-w-xs flex items-center justify-center gap-2 p-4 rounded-xl font-bold transition-all ${
                          theme === 'light' 
                            ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg' 
                            : 'bg-[#F0F6FC] hover:bg-white text-[#0D0F12] shadow-sm hover:shadow-md'
                        }`}
                      >
                        Finish Module
                        <CheckCircle2 size={20} />
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="mode-video"
                    initial={{ opacity: 0, scale: 0.98 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="flex-1 flex flex-col overflow-y-auto w-full p-6 md:p-8 justify-center"
                  >
                    <div className={`flex flex-col items-center justify-center p-6 rounded-[2rem] border ${theme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-[#0D0F12] border-[#30363D]'}`}>
                      {course.videoSrc ? (
                        <div className="w-full aspect-video rounded-xl overflow-hidden mb-8 border border-[#30363D]/30 shadow-lg bg-black">
                          <video controls src={course.videoSrc} onEnded={handleMediaFinish} className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center w-full aspect-video mb-8">
                          <div className={`p-4 mb-4 rounded-full ${theme === 'light' ? 'bg-slate-200 text-slate-500' : 'bg-[#30363D] text-[#8B949E]'}`}>
                            <MonitorPlay size={40} />
                          </div>
                          <p className={`text-sm font-medium ${theme === 'light' ? 'text-slate-500' : 'text-[#8B949E]'}`}>
                            Video coming soon
                          </p>
                        </div>
                      )}

                      <h3 className={`text-xl font-bold mb-8 text-center ${theme === 'light' ? 'text-slate-900' : 'text-[#F0F6FC]'}`}>
                        {course.title} Guide
                      </h3>

                      <button 
                        onClick={handleMediaFinish}
                        className={`w-full max-w-xs flex items-center justify-center gap-2 p-4 rounded-xl font-bold transition-all ${
                          theme === 'light' 
                            ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg' 
                            : 'bg-[#F0F6FC] hover:bg-white text-[#0D0F12] shadow-sm hover:shadow-md'
                        }`}
                      >
                        Finish Module
                        <CheckCircle2 size={20} />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
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
