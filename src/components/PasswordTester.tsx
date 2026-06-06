/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  KeyRound, 
  ShieldCheck, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  Info, 
  Sparkles,
  Cpu,
  Eye,
  EyeOff
} from 'lucide-react';
import { UserProfile } from '../types';
import { calculateLevelFromXP } from '../data';

interface PasswordTesterProps {
  profile: UserProfile;
  updateProfile: (profile: UserProfile | ((prev: UserProfile) => UserProfile)) => void;
  theme?: 'light' | 'dark';
}

interface ComputePreset {
  name: string;
  description: string;
  speed: number; // guesses per second
  icon: string;
}

export default function PasswordTester({ profile, updateProfile, theme = 'dark' }: PasswordTesterProps) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [hasTested, setHasTested] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [lastCertifiedPassword, setLastCertifiedPassword] = useState<string | null>(null);

  // Compute presets representing different types of attacker guessing speeds
  const computePresets: ComputePreset[] = [
    {
      name: 'Everyday Login Screen (Safe)',
      description: 'A genuine website that signs you out or asks for verification after 5 failing attempts. Extremely slow guessing!',
      speed: 0.16, // Approx 10 attempts per minute
      icon: '🌐'
    },
    {
      name: 'Standard Home Laptop (Medium Risk)',
      description: 'A basic guessing software running directly on a standard student laptop.',
      speed: 1000000, // 1 Million guesses/second
      icon: '💻'
    },
    {
      name: 'Supercharged Hacking Rig (Severe Risk)',
      description: 'A high-speed cybercriminal computer designed specifically for super-fast guessing.',
      speed: 25000000000, // 25 Billion guesses/second
      icon: '🔥'
    },
    {
      name: 'Hacker Supercomputer (Extreme Risk)',
      description: 'A multi-server, high-budget network designed to break code locks on an industrial scale.',
      speed: 500000000000000, // 500 Trillion guesses/second
      icon: '🛸'
    }
  ];

  const [selectedComputeIdx, setSelectedComputeIdx] = useState(1); // Standard Home Laptop by default
  const activeCompute = computePresets[selectedComputeIdx];

  const mockPrephrases = [
    "wizkidfc2025",
    "Godisgood@1",
    "Chinedu2006!",
    "baddestboy1",
    "mypasswordissec",
    "12345678"
  ];

  const handleGenerate = () => {
    const rIdx = Math.floor(Math.random() * mockPrephrases.length);
    setPassword(mockPrephrases[rIdx]);
    setHasTested(true);
  };

  // Human-friendly calculator without dry math equations
  const analyzePassword = (pass: string, guessesPerSecond: number) => {
    if (!pass) return null;

    const length = pass.length;
    
    // Determine Pools Size
    const hasLower = /[a-z]/.test(pass);
    const hasUpper = /[A-Z]/.test(pass);
    const hasNum = /[0-9]/.test(pass);
    const hasSpec = /[^A-Za-z0-9]/.test(pass);

    let alphabetSize = 0;
    const poolBreakdown: string[] = [];

    if (hasLower) {
      alphabetSize += 26;
      poolBreakdown.push('Small letters');
    }
    if (hasUpper) {
      alphabetSize += 26;
      poolBreakdown.push('CAPITAL letters');
    }
    if (hasNum) {
      alphabetSize += 10;
      poolBreakdown.push('Numbers');
    }
    if (hasSpec) {
      alphabetSize += 33;
      poolBreakdown.push('Symbols');
    }

    if (alphabetSize === 0) alphabetSize = 10;

    // Calculate Entropy (H) = Log2(AlphabetSize ^ Length) = Length * Log2(AlphabetSize)
    const entropyBits = Math.round(length * Math.log2(alphabetSize) * 10) / 10;

    // Total combinations = AlphabetSize ^ Length
    const totalCombinations = Math.pow(alphabetSize, length);

    // On average, an attacker scans half of the search space before succeeding
    const averageAttemptsNeeded = totalCombinations / 2;

    // Seconds to crack = averageAttemptsNeeded / guessesPerSecond
    const secondsToCrack = averageAttemptsNeeded / guessesPerSecond;

    // Convert seconds to friendly human scale
    let timeResult = '';
    let colorPrefix = '';
    let scaleScore = 0; // rating out of 100

    if (secondsToCrack < 1) {
      timeResult = 'Instantly (less than 1 second!)';
      colorPrefix = theme === 'light' ? 'text-rose-600 font-extrabold' : 'text-[#F85149]';
      scaleScore = Math.min(25, Math.max(5, length * 2.5));
    } else if (secondsToCrack < 60) {
      timeResult = 'Under a single minute';
      colorPrefix = theme === 'light' ? 'text-red-500 font-bold' : 'text-red-400';
      scaleScore = 35;
    } else if (secondsToCrack < 3600) {
      timeResult = `About ${Math.round(secondsToCrack / 60)} minutes`;
      colorPrefix = 'text-amber-500 font-bold';
      scaleScore = 45;
    } else if (secondsToCrack < 86400) {
      timeResult = `About ${Math.round(secondsToCrack / 3600)} hours`;
      colorPrefix = 'text-amber-500 font-bold';
      scaleScore = 55;
    } else if (secondsToCrack < 31536000) {
      timeResult = `Around ${Math.round(secondsToCrack / 86400)} days`;
      colorPrefix = theme === 'light' ? 'text-green-600 font-bold' : 'text-[green-400]';
      scaleScore = 65;
    } else {
      const years = secondsToCrack / 31536000;
      if (years < 1000) {
        timeResult = `About ${Math.round(years)} years`;
        colorPrefix = theme === 'light' ? 'text-emerald-600 font-bold' : 'text-[#85EA2D]';
        scaleScore = 75;
      } else if (years < 1000000) {
        timeResult = `Over ${Math.round(years / 1000)} Thousand years`;
        colorPrefix = 'text-[#3FB950] font-extrabold';
        scaleScore = 85;
      } else if (years < 1000000000) {
        timeResult = `Over ${Math.round(years / 1000000)} Million years`;
        colorPrefix = 'text-[#3FB950] font-extrabold';
        scaleScore = 95;
      } else {
        const billionsStr = (years / 1000000000).toLocaleString(undefined, { maximumFractionDigits: 1 });
        timeResult = `Over ${billionsStr} Billion Years!`;
        colorPrefix = 'text-emerald-500 font-black tracking-tight';
        scaleScore = 100;
      }
    }

    // Nigerian-themed, human-friendly vulnerability checklist deduction
    const lower = pass.toLowerCase();
    const hasCaleb = lower.includes('caleb');
    const hasLagos = lower.includes('lagos');
    const hasNigeria = lower.includes('nigeria') || lower.includes('naija');
    const hasCommonSeq = lower.includes('123') || lower.includes('abc');
    
    let penaltyReason = '';
    if (hasCaleb || hasLagos || hasNigeria || hasCommonSeq) {
      scaleScore = Math.max(12, scaleScore - 30);
      if (hasCaleb) penaltyReason = `Uses the school name ('Caleb'). Guessing robots specifically check local university words first!`;
      else if (hasNigeria || hasLagos) penaltyReason = `Uses popular regional words like 'Lagos' or 'Nigeria'. Computers scan local terms instantly.`;
      else penaltyReason = `Uses weak keyboard pathways like '123' or 'abc' which are very easy for machines to guess.`;
    }

    const isPassphrase = length >= 18 && (pass.includes('-') || pass.includes(' '));

    return {
      length,
      alphabetSize,
      entropyBits,
      totalCombinations,
      poolBreakdown,
      timeResult,
      colorPrefix,
      scaleScore,
      isPassphrase,
      hasLower,
      hasUpper,
      hasNum,
      hasSpec,
      penaltyReason
    };
  };

  const analysisOutput = analyzePassword(password, activeCompute.speed);

  const handleApplyEarn = () => {
    if (!analysisOutput || analysisOutput.scaleScore < 80) return;
    if (password === lastCertifiedPassword) return;
    
    setLastCertifiedPassword(password);
    
    updateProfile((prev: UserProfile) => {
      let newBadges = [...prev.badges];
      const hasBadge = prev.badges.indexOf('badge-password-shield') !== -1;
      if (!hasBadge) {
        newBadges.push('badge-password-shield');
      }

      const newCompletedGames = prev.completedGames.includes('game-password')
        ? prev.completedGames
        : [...prev.completedGames, 'game-password'];

      const xpEarned = hasBadge ? 20 : 100;
      const calculatedLevel = calculateLevelFromXP(prev.xp + xpEarned);

      return {
        ...prev,
        xp: prev.xp + xpEarned,
        badges: newBadges,
        completedGames: newCompletedGames,
        level: Math.max(prev.level, calculatedLevel)
      };
    });
    setNotification('Security level approved! You earned +100 XP and unlocked the "Fortress Keymaker" badge!');
  };

  // Color constants for theme-aware elements
  const pageTextClass = theme === 'light' ? 'text-slate-800' : 'text-[#E2E8F0]';
  const labelColor = theme === 'light' ? 'text-slate-700' : 'text-[#8B949E]';
  const headerBorder = theme === 'light' ? 'border-slate-200' : 'border-[#30363D]';
  const tagBlue = theme === 'light' ? 'text-green-600 bg-green-50 border-green-100' : 'text-[green-400] bg-green-500/5 border-[green-400]/10';
  const baseCardBg = theme === 'light' ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#161B22] border-[#30363D]';
  const blockBoxBg = theme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-[#0D0F12] border-[#30363D]';
  const formulaBoxBg = theme === 'light' ? 'bg-slate-100 border-slate-200 text-slate-800' : 'bg-black/40 border-slate-850 text-[#F0F6FC]';
  const inlineCodeBg = theme === 'light' ? 'bg-slate-200 text-slate-900 border border-slate-300' : 'bg-black/30 text-emerald-400 border border-slate-800';

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className={`space-y-6 font-sans ${pageTextClass}`}
    >
      {/* Header block with friendly introduction */}
      <div className={`pb-3 border-b ${headerBorder}`}>
        <span className={`text-[10px] font-mono font-bold uppercase tracking-widest block mb-1 p-1 px-2 rounded-md border w-fit ${tagBlue}`}>
          Confidential Security Sandbox
        </span>
        <h2 className={`text-xl font-extrabold flex items-center gap-2 ${theme === 'light' ? 'text-slate-900' : 'text-[#F0F6FC]'}`}>
          <KeyRound className="w-5 h-5 text-amber-500 shrink-0" />
          Password Strength & Hacker Tester
        </h2>
        <p className={`text-xs mt-1 ${theme === 'light' ? 'text-slate-600' : 'text-[#8B949E]'}`}>
          Type any password to see how long a computer would need to guess it. Learn the secrets to strong passwords you can remember!
        </p>
      </div>

      {/* SENTRY PRIVACY GUARANTEE: Green banner highlighting local execution security */}
      <div className={`p-4 rounded-xl border flex gap-3 items-start leading-relaxed ${theme === 'light' ? 'bg-emerald-50 border-emerald-100/80 text-emerald-900' : 'bg-emerald-500/5 border-emerald-500/20 text-[#3FB950]'}`}>
        <ShieldCheck className="w-5.5 h-5.5 text-[#3FB950] shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="font-extrabold text-xs">Aegis 100% Local Privacy Standard</h4>
          <p className="text-[11px] leading-relaxed opacity-95">
            <strong>Your password never leaves this page!</strong> All calculations happen immediately right inside your own computer memory. We do not transmit, log, save, or share any credentials, meaning testing here is completely confidential.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT COLUMN: Input form and friendly prephrase generator */}
        <div className="lg:col-span-2 space-y-6">
          <div className={`p-6 rounded-2xl border ${baseCardBg}`}>
            <label className={`block text-xs font-bold uppercase tracking-wide mb-2 ${labelColor}`}>
              Enter a password to test here
            </label>
            
            <div className="relative flex gap-2">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setHasTested(true);
                }}
                placeholder="Type password string here... (e.g., mypassword123)"
                className={`block w-full px-4 py-3 border rounded-xl text-sm font-mono ${
                  theme === 'light'
                    ? 'border-slate-300 bg-slate-50 text-slate-900 focus:bg-white placeholder-slate-400' 
                    : 'border-[#30363D] bg-[#0D0F12] text-[#F0F6FC] placeholder-[#8B949E] placeholder-opacity-50'
                } focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute right-3 top-3 transition-colors cursor-pointer ${theme === 'light' ? 'text-slate-450 hover:text-slate-700' : 'text-slate-400 hover:text-slate-200'}`}
                title={showPassword ? 'Hide characters' : 'Reveal characters'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 mt-4">
              <div className={`text-[10px] italic font-medium ${theme === 'light' ? 'text-slate-500' : 'text-[#8B949E] opacity-60'}`}>
                Tip: Use random, everyday items joined by dashes to make them strong.
              </div>

              <button
                onClick={handleGenerate}
                className="px-3 py-1.5 bg-green-600/10 hover:bg-green-600/20 text-green-600 dark:text-[green-400] text-xs font-black rounded-lg border border-green-500/20 transition-all shrink-0 cursor-pointer flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                Generate Example Passphrase
              </button>
            </div>
          </div>

          {/* DYNAMIC RESULTS DISPLAY (Only visible if password contains values) */}
          <AnimatePresence mode="wait">
            {hasTested && password.length > 0 && analysisOutput && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                {/* 1. Attacker compute/testing speed settings */}
                <div className={`p-5 rounded-xl border ${theme === 'light' ? 'bg-slate-50 border-slate-200 text-slate-800' : 'bg-[#161B22]/60 border-[#30363D]'}`}>
                  <h4 className="text-xs font-extrabold uppercase tracking-widest mb-3 flex items-center gap-1.5 text-slate-500 dark:text-slate-300">
                    <Cpu className={`w-4 h-4 ${theme === 'light' ? 'text-green-600' : 'text-[green-400]'}`} />
                    Choose the Hacking Computer Speed to Test Against
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {computePresets.map((preset, idx) => {
                      const isSelected = selectedComputeIdx === idx;
                      return (
                        <div
                          key={preset.name}
                          onClick={() => setSelectedComputeIdx(idx)}
                          className={`p-3 rounded-xl border cursor-pointer transition-all ${
                            isSelected 
                              ? 'bg-green-500/10 border-green-600 text-green-600 dark:text-[green-400]' 
                              : theme === 'light'
                                ? 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900'
                                : 'bg-black/20 border-slate-800 text-[#8B949E] hover:border-slate-500/40 hover:text-[#F0F6FC]'
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-extrabold flex items-center gap-1.5">
                              <span className="text-base select-none">{preset.icon}</span>
                              {preset.name}
                            </span>
                            {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping"></span>}
                          </div>
                          <p className="text-[10px] opacity-85 mt-1 leading-relaxed">
                            {preset.description}
                          </p>
                          <div className={`text-[10px] font-mono font-bold mt-1.5 ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>
                            Speed: <span className="underline">{preset.speed >= 1000000 ? `${(preset.speed / 1000000).toLocaleString()} Million` : preset.speed} attempts/sec</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Timeline and Score Card Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Time box */}
                  <div className={`border rounded-2xl p-5 space-y-3.5 text-left relative overflow-hidden ${blockBoxBg}`}>
                    <div className="absolute -right-3 -top-3 w-16 h-16 bg-green-500/5 rounded-full flex items-center justify-center select-none text-3xl font-extrabold text-[#30363D]/20">
                      ⏱️
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-[#8B949E]">Time Needed to Hack This</span>
                      <p className={`text-xl font-black leading-none mt-1 ${analysisOutput.colorPrefix}`}>
                        {analysisOutput.timeResult}
                      </p>
                    </div>
                    
                    <p className={`text-[10px] leading-normal ${theme === 'light' ? 'text-slate-500' : 'text-[#8B949E]'}`}>
                      Calculated on how many different attempts the chosen system must make until it gets it right.
                    </p>
                  </div>

                  {/* Rating / Slider box */}
                  <div className={`border rounded-2xl p-5 space-y-3 ${blockBoxBg}`}>
                    <div>
                      <div className="flex justify-between text-[11px] font-bold text-slate-500 dark:text-[#8B949E]">
                        <span>Protection Shield Score</span>
                        <span>{analysisOutput.scaleScore} / 100</span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-[#30363D] h-2.5 rounded-full overflow-hidden mt-1.5">
                        <div
                          className={`h-full rounded-full transition-all duration-350 ${
                            analysisOutput.scaleScore >= 80 ? 'bg-[#3FB950]' : analysisOutput.scaleScore >= 50 ? 'bg-amber-500' : 'bg-rose-500'
                          }`}
                          style={{ width: `${analysisOutput.scaleScore}%` }}
                        />
                      </div>
                    </div>

                    <div className={`text-[10px] space-y-1 mt-2 font-medium ${theme === 'light' ? 'text-slate-600' : 'text-[#8B949E]'}`}>
                      <div className="flex justify-between items-center">
                        <span>Shield Integrity:</span>
                        <span className={`font-black uppercase text-xs ${analysisOutput.scaleScore >= 80 ? 'text-[#3FB950]' : 'text-rose-500'}`}>
                          {analysisOutput.scaleScore >= 80 ? 'Strong Fortress' : 'Risky / Low Shield'}
                        </span>
                      </div>
                      {analysisOutput.penaltyReason && (
                        <div className="text-rose-600 dark:text-red-400 font-bold bg-red-500/5 p-1 px-2 rounded border border-red-500/10 text-[9.5px]">
                          ⚠️ {analysisOutput.penaltyReason}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* 3. Logical Breakdown Card list */}
                <div className={`p-5 rounded-2xl border ${baseCardBg} space-y-4`}>
                  <h4 className={`text-xs font-black uppercase tracking-wider ${theme === 'light' ? 'text-slate-800' : 'text-[#F0F6FC]'}`}>
                    🛡️ Password Breakdown
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    <div className={`p-3.5 rounded-xl border flex flex-col justify-between ${blockBoxBg}`}>
                      <span className="text-[10px] text-slate-500 dark:text-[#8B949E] uppercase font-black leading-none">Character types</span>
                      <span className={`text-sm font-extrabold mt-1.5 block ${theme === 'light' ? 'text-slate-900' : 'text-[#F0F6FC]'}`}>{analysisOutput.alphabetSize} character options</span>
                      <span className={`text-[9px] mt-1 block leading-tight ${theme === 'light' ? 'text-slate-500' : 'text-[#8B949E]'}`}>
                        Includes: {analysisOutput.poolBreakdown.join(', ') || 'Letters only'}
                      </span>
                    </div>

                    <div className={`p-3.5 rounded-xl border flex flex-col justify-between ${blockBoxBg}`}>
                      <span className="text-[10px] text-slate-500 dark:text-[#8B949E] uppercase font-black leading-none">Shield Thickness</span>
                      <span className={`text-sm font-extrabold mt-1.5 block ${theme === 'light' ? 'text-green-600' : 'text-[green-400]'}`}>{analysisOutput.entropyBits} Strength Units</span>
                      <span className={`text-[9px] mt-1 block leading-tight ${theme === 'light' ? 'text-slate-500' : 'text-[#8B949E]'}`}>
                        Higher number means exponentially thicker shield defense!
                      </span>
                    </div>

                    <div className={`p-3.5 rounded-xl border flex flex-col justify-between ${blockBoxBg}`}>
                      <span className="text-[10px] text-slate-500 dark:text-[#8B949E] uppercase font-black leading-none">Total Possible Guesses</span>
                      <span className={`text-sm font-extrabold mt-1.5 block ${theme === 'light' ? 'text-amber-600' : 'text-amber-500'}`}>
                        {analysisOutput.totalCombinations > 1e12 
                          ? analysisOutput.totalCombinations.toExponential(1) 
                          : Math.round(analysisOutput.totalCombinations).toLocaleString()} keys
                      </span>
                      <span className={`text-[9px] mt-1 block leading-tight ${theme === 'light' ? 'text-slate-500' : 'text-[#8B949E]'}`}>
                        The total lock combinations that a guess program is forced to sift through.
                      </span>
                    </div>
                  </div>

                  {/* Checklist Indicators */}
                  <div className={`grid grid-cols-2 md:grid-cols-4 gap-2 text-[10px] font-medium border-t pt-4 ${theme === 'light' ? 'border-slate-200 text-slate-600' : 'border-[#30363D] text-[#8B949E]'}`}>
                    <div className="flex items-center gap-1.5">
                      {analysisOutput.length >= 12 ? <CheckCircle2 className="w-4 h-4 text-[#3FB950] shrink-0" /> : <XCircle className="w-4 h-4 text-slate-300 dark:text-[#30363D] shrink-0" />}
                      <span>Has 12+ letters ({analysisOutput.length})</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {analysisOutput.isPassphrase ? <CheckCircle2 className="w-4 h-4 text-[#3FB950] shrink-0" /> : <HelpCircle className="w-4 h-4 text-slate-300 dark:text-[#30363D] shrink-0" />}
                      <span title="Uses dashes between common everyday words">Dashed words pack</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {analysisOutput.hasUpper ? <CheckCircle2 className="w-4 h-4 text-[#3FB950] shrink-0" /> : <XCircle className="w-4 h-4 text-slate-300 dark:text-[#30363D] shrink-0" />}
                      <span>Has capital letters</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {analysisOutput.hasSpec || analysisOutput.hasNum ? <CheckCircle2 className="w-4 h-4 text-[#3FB950] shrink-0" /> : <XCircle className="w-4 h-4 text-slate-300 dark:text-[#30363D] shrink-0" />}
                      <span>Has numbers/symbols</span>
                    </div>
                  </div>

                  {/* Reward or warning banner bottom card */}
                  {analysisOutput.scaleScore >= 80 ? (
                    <div className={`p-4 rounded-xl border flex flex-col gap-2 ${theme === 'light' ? 'bg-emerald-50 border-emerald-100 text-slate-800' : 'bg-[#238636]/10 border-[#238636]/30 text-[#3FB950]'}`}>
                      <p className="font-extrabold text-xs text-emerald-700 dark:text-[#3FB950]">🔒 Incredible Shield Locked!</p>
                      <p className={`text-[11px] leading-relaxed ${theme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
                        {analysisOutput.isPassphrase 
                          ? "Excellent job! Your passphrase format (using words joined by dashes or spaces) creates a massive number of combinations, rendering dictionary attacks useless. Guessing software is completely locked out!"
                          : "Excellent job! Your password has an incredibly strong mix of length and character variety. Guessing software is completely locked out!"}
                      </p>
                      
                      {notification && (
                        <div className="border border-[#238636]/40 bg-[#238636]/20 text-[#3FB950] font-bold p-2.5 rounded-lg text-center text-[10px] mt-1 animate-pulse">
                          {notification}
                        </div>
                      )}

                      {password !== lastCertifiedPassword && (
                        <button
                          onClick={handleApplyEarn}
                          className="w-full mt-2 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs transition-all cursor-pointer shadow border border-transparent"
                        >
                          Certify This Configuration (+100 XP)
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20 text-rose-600 dark:text-red-400 space-y-1.5">
                      <p className="font-extrabold text-xs">⚠️ Vulnerable Shield</p>
                      <p className={`text-[11px] leading-relaxed ${theme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
                        A standard hacking computer could guess this password relatively quickly.
                        <br /><br />
                        {analysisOutput.penaltyReason ? (
                          <span><strong>Vulnerability found:</strong> {analysisOutput.penaltyReason}</span>
                        ) : analysisOutput.length < 12 ? (
                          <span><strong>Key Weakness:</strong> Length is too short. Increasing length is the single most effective way to multiply the combinations a hacker has to guess!</span>
                        ) : (
                          <span><strong>Key Weakness:</strong> It lacks character variety. Mix in more symbols, capital letters, and numbers to make the guessing pool larger.</span>
                        )}
                        <br /><br />
                        <strong>Helpful tip:</strong> Simply string four random words together with hyphens (for example: <code className={inlineCodeBg}>suya-pepper-jollof-yam</code>). It is incredibly easy to remember but takes supercomputers centuries to solve!
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* RIGHT COLUMN: Simple illustrations and layperson info */}
        <div className="space-y-6">
          <div className={`p-5 rounded-2xl border flex flex-col justify-between ${theme === 'light' ? 'bg-white border-slate-200 text-slate-800 shadow-sm' : 'bg-[#161B22] border-[#30363D]'}`}>
            <h3 className={`font-extrabold text-xs uppercase tracking-wide mb-3 flex items-center gap-1 ${theme === 'light' ? 'text-slate-800' : 'text-[#F0F6FC]'}`}>
              <Info className="w-4 h-4 text-green-500" />
              How Hacking Actually Works
            </h3>
            
            <div className={`space-y-4 text-[11px] leading-relaxed ${theme === 'light' ? 'text-slate-600' : 'text-[#8B949E]'}`}>
              <p>
                Forget what you see in movies! Hacking is usually just superfast mathematical guesswork:
              </p>

              {/* Box 1 (Formula 1 replaced with plain speak) */}
              <div className={`p-4 rounded-xl border space-y-2 ${formulaBoxBg}`}>
                <div className={`font-extrabold text-[11px] flex items-center gap-1.5 border-b pb-1.5 ${theme === 'light' ? 'border-slate-300 text-slate-900' : 'border-slate-800 text-[green-400]'}`}>
                  🤖 The Guessing Robot
                </div>
                <p className="leading-relaxed text-[10.5px]">
                  Hackers use automated programs that run through lists of common terms, birthdays, place names, and random characters at speeds of up to <strong>trillions of guesses every single second</strong>.
                </p>
              </div>

              {/* Box 2 (Formula 2 replaced with plain speak) */}
              <div className={`p-4 rounded-xl border space-y-2 ${formulaBoxBg}`}>
                <div className={`font-extrabold text-[11px] flex items-center gap-1.5 border-b pb-1.5 ${theme === 'light' ? 'border-slate-300 text-slate-900' : 'border-slate-800 text-amber-500'}`}>
                  ⭐ Why Length is King
                </div>
                <p className="leading-relaxed text-[10.5px]">
                  A password like <code className={inlineCodeBg}>P@ss1</code> feels complex, but because it is only 5 characters long, a normal computer guesses all of its variations inside <strong>fractional seconds</strong>.
                  <br /><br />
                  Every character you add doesn&apos;t just add danger linearly—it multiplies the complexity! An 18-character phrase creates a block size that remains impenetrable forever.
                </p>
              </div>

              {/* Box 3 (Formula 3 replaced with plain speak) */}
              <div className={`p-4 rounded-xl border space-y-2 ${formulaBoxBg}`}>
                <div className={`font-extrabold text-[11px] flex items-center gap-1.5 border-b pb-1.5 ${theme === 'light' ? 'border-slate-300 text-slate-900' : 'border-slate-800 text-emerald-400'}`}>
                  💡 The Passphrase Trick
                </div>
                <p className="leading-relaxed text-[10.5px]">
                  To construct a secure shield, join several simple words together with a hyphen (like <code className={inlineCodeBg}>book-ferry-stew-island</code>). 
                  <br /><br />
                  You will remember it easily because it consists of real nouns, but a computer program encounters trillions of random word-block permutations, rendering dictionary attack software completely useless.
                </p>
              </div>

              {/* Box 4 (Other password strength metrics) */}
              <div className={`p-4 rounded-xl border space-y-2 ${formulaBoxBg}`}>
                <div className={`font-extrabold text-[11px] flex items-center gap-1.5 border-b pb-1.5 ${theme === 'light' ? 'border-slate-300 text-slate-900' : 'border-slate-800 text-purple-400'}`}>
                  🔠 The Special Mix
                </div>
                <p className="leading-relaxed text-[10.5px]">
                  While length is critical, mixing in capital letters, numbers, and symbols (like <code className={inlineCodeBg}>!@#$</code>) forces hackers to check a much larger pool of characters.
                  <br /><br />
                  Combining a robust length (at least 12 characters) with a few capitals and symbols acts like a puzzle, scrambling the robot's automated guessing process even further!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
