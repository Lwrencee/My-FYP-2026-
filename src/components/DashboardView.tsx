/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Award, 
  Bolt, 
  BookOpen, 
  Calendar, 
  CheckCircle2, 
  Flame, 
  Gamepad2, 
  GraduationCap, 
  Info, 
  KeyRound, 
  Lock, 
  Search, 
  ShieldAlert, 
  ShieldCheck, 
  Sparkles, 
  Trophy 
} from 'lucide-react';
import { UserProfile, Badge } from '../types';
import { BADGES, AVATARS, getLevelTitle, getXpThresholdsForLevel } from '../data';
import PixelAvatar from './PixelAvatar';

// Helper to look up Badge Icons
const BadgeIcon = ({ name, className }: { name: string; className?: string }) => {
  switch (name) {
    case 'Sparkles':
      return <Sparkles className={className} />;
    case 'Search':
      return <Search className={className} />;
    case 'KeyRound':
      return <KeyRound className={className} />;
    case 'Trophy':
      return <Trophy className={className} />;
    case 'ShieldCheck':
      return <ShieldCheck className={className} />;
    case 'GraduationCap':
      return <GraduationCap className={className} />;
    default:
      return <Award className={className} />;
  }
};

interface DashboardViewProps {
  profile: UserProfile;
  setTab: (tab: 'dashboard' | 'games' | 'checklist' | 'academy' | 'leaderboard' | 'profile') => void;
}

// Staggered load animation variants setup
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05
    }
  }
};

const itemVariants = {
  hidden: { y: 24, opacity: 0 },
  show: { 
    y: 0, 
    opacity: 1,
    transition: { 
      type: "spring" as const, 
      stiffness: 100, 
      damping: 15
    } 
  }
};

export default function DashboardView({ profile, setTab }: DashboardViewProps) {
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);

  const [showAllBadges, setShowAllBadges] = useState(false);

  const currentLevelTitle = getLevelTitle(profile.level);

  // Calculate XP requirements
  const thresholds = getXpThresholdsForLevel(profile.level);
  const totalInLevel = thresholds.max - thresholds.min;
  const currentLevelProgress = Math.max(0, profile.xp - thresholds.min);
  const xpPercent = Math.min(100, Math.floor((currentLevelProgress / totalInLevel) * 100));

  // Math for Cyber Security Posture Percentage (KAP integration)
  const checklistProgress = (profile.completedChecklist.length / 8) * 100;
  const academyProgress = (profile.completedQuizzes.length / 9) * 100;
  const gamesProgress = (profile.completedGames.length / 4) * 100; // 4 games: Phish Finder, Race to Servers, Cryptic Pulse, Password Tester
  const overallPosture = Math.round((checklistProgress * 0.4) + (academyProgress * 0.4) + (gamesProgress * 0.2));

  // Find user's avatar
  const avatar = AVATARS.find(av => av.id === profile.avatarId) || AVATARS[0];

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-8 font-sans pb-12 text-[#E2E8F0]"
    >
      {/* Welcome Banner */}
      <motion.div 
        id="dashboard-header"
        variants={itemVariants}
        className="relative overflow-hidden bg-[#161B22] rounded-2xl p-6 md:p-8 shadow-lg border border-[#30363D]"
      >
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-8 w-64 h-64 bg-[#238636]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-1/3 bottom-0 w-48 h-48 bg-[#58A6FF]/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className={`p-2.5 rounded-xl border border-[#30363D] shadow-md ${avatar.color}`}>
              <PixelAvatar id={profile.avatarId} size={44} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold tracking-wider text-[#3FB950] uppercase">
                  Defender Profile
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-black tracking-tight mt-1 text-[#F0F6FC]">
                Aegis Sentry: <span className="text-[#58A6FF] font-black">{profile.defenderName}</span>
              </h1>
              <p className="text-sm text-[#8B949E] mt-1.5 max-w-xl">
                Current Level {profile.level}: <span className="font-semibold text-[#F0F6FC]">{currentLevelTitle}</span>.
              </p>
            </div>
          </div>
          
          {/* Level Badge Circle */}
          <div id="dashboard-xp-card" className="flex flex-col items-center justify-center -space-y-0.5 py-2 px-5 border border-[#30363D] bg-[#0D0F12] rounded-xl shrink-0">
            <span className="text-[10px] text-[#8B949E] font-bold uppercase tracking-wider">Total XP</span>
            <span className="text-3xl font-black text-[#3FB950] font-mono">{profile.xp}</span>
            <span className="text-[10px] text-[#8B949E] font-medium">Next Level At: {thresholds.max} XP</span>
          </div>
        </div>

        {/* Level Progress Bar */}
        <div className="mt-6 pt-4 border-t border-[#30363D]">
          <div className="flex justify-between text-xs text-[#8B949E] font-medium mb-1.5">
            <span>Level {profile.level} Progress</span>
            <span className="text-[#F0F6FC] font-mono font-bold">{currentLevelProgress} / {totalInLevel} XP ({xpPercent}%)</span>
          </div>
          <div className="w-full bg-[#0D0F12] h-2.5 rounded-full overflow-hidden border border-[#30363D]">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${xpPercent}%` }}
              transition={{ duration: 0.8 }}
              className="bg-[#3FB950] h-full rounded-full"
            />
          </div>
        </div>
      </motion.div>

      {/* Posture Score */}
      <div className="flex justify-center" id="dashboard-posture">
        <motion.div 
          variants={itemVariants}
          className="w-full max-w-3xl bg-[#161B22] border border-[#30363D] rounded-2xl p-6 md:p-8 shadow-sm flex flex-col items-center justify-between"
        >
          <div className="text-center">
            <h3 className="text-xl font-bold text-[#F0F6FC] flex items-center justify-center gap-2">
              <ShieldCheck className="w-6 h-6 text-[#3FB950]" />
              Cyber Security Posture
            </h3>
            <p className="text-sm text-[#8B949E] mt-2">
              Your empirical safety rating integrated across the KAP (Knowledge, Attitude, Practice) framework.
            </p>
          </div>

          <div className="my-8 flex flex-col items-center justify-center relative">
            {/* Custom SVG Radial Gauge */}
            <svg className="w-48 h-48" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                stroke="#21262d"
                strokeWidth="8"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                stroke={overallPosture >= 75 ? '#3FB950' : overallPosture >= 40 ? '#58A6FF' : '#F85149'}
                strokeWidth="8"
                strokeDasharray="251.2"
                initial={{ strokeDashoffset: 251.2 }}
                animate={{ strokeDashoffset: 251.2 - (251.2 * overallPosture) / 100 }}
                transition={{ duration: 1 }}
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
              />
            </svg>
            <div className="absolute text-center">
              <span className="text-4xl font-black text-[#F0F6FC] font-mono">{overallPosture}%</span>
              <p className="text-xs text-[#8B949E] font-bold tracking-wider uppercase mt-1">Active Shield</p>
            </div>
          </div>

          <div className="w-full space-y-3 border-t border-[#30363D] pt-6 max-w-md mx-auto">
            <div className="flex justify-between items-center text-sm">
              <span className="text-[#8B949E] font-medium">Academy Courses Complete</span>
              <span className="font-bold text-[#F0F6FC] font-mono">{profile.completedQuizzes.length} / 9</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-[#8B949E] font-medium">Real-World Tasks Active</span>
              <span className="font-bold text-[#F0F6FC] font-mono">{profile.completedChecklist.length} / 8</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-[#8B949E] font-medium">Defense Gaming Modules</span>
              <span className="font-bold text-[#F0F6FC] font-mono">{profile.completedGames.length} / 4</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Badge Shelf / Achievements */}
      <motion.div 
        id="dashboard-badges-section"
        variants={itemVariants}
        className="bg-[#161B22] border border-[#30363D] rounded-2xl p-6 shadow-sm"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-[#30363D] mb-6 font-sans gap-4">
          <div>
            <h3 className="text-lg font-bold text-[#F0F6FC] flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              Tactical Shield Badge Shelf
            </h3>
            <p className="text-xs text-[#8B949E] mt-1">
              Autonomous indicators representing your growing competence and security mastery achievements.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs bg-[#0D0F12] text-amber-400 border border-amber-500/20 px-3 py-1.5 rounded-full font-bold font-mono whitespace-nowrap">
              {profile.badges.length} / {BADGES.length} Active
            </span>
            <button
              onClick={() => setShowAllBadges(true)}
              className="text-xs bg-[#30363D] hover:bg-[#30363D]/80 text-[#F0F6FC] px-4 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer whitespace-nowrap"
            >
              Show All
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {BADGES.slice(0, 6).map((badge) => {
            const hasBadge = profile.badges.indexOf(badge.id) !== -1;
            return (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedBadge(badge)}
                key={badge.id}
                className={`flex flex-col items-center text-center p-4 rounded-xl border transition-all relative outline-none cursor-pointer ${
                  hasBadge
                    ? 'border-amber-500/30 bg-amber-500/5 text-[#F0F6FC] shadow-sm'
                    : 'border-[#30363D] bg-[#0D0F12] text-slate-400 dark:text-[#8B949E]'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${
                    hasBadge ? 'bg-amber-500/10 border border-amber-500/30 text-amber-400' : 'bg-[#161B22] border border-[#30363D] text-[#8B949E] opacity-50'
                  }`}
                >
                  <BadgeIcon name={badge.iconName} className="w-5 h-5" />
                </div>
                <h4 className="text-xs font-bold truncate w-full text-center">{badge.name}</h4>
                <p className="text-[10px] text-[#8B949E] font-medium mt-1 uppercase tracking-wider scale-95 font-sans opacity-70">
                  {hasBadge ? 'Unlocked' : 'Locked'}
                </p>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Badge Modal popup */}
      {selectedBadge && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#161B22] border border-[#30363D] rounded-2xl max-w-sm w-full p-6 shadow-xl relative"
          >
            <div className="flex flex-col items-center text-center">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                  profile.badges.indexOf(selectedBadge.id) !== -1
                    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                    : 'bg-[#0D0F12] text-[#8B949E] opacity-50 border border-[#30363D]'
                }`}
              >
                <BadgeIcon name={selectedBadge.iconName} className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-[#F0F6FC]">{selectedBadge.name}</h3>
              <p className="text-xs text-amber-400 font-bold bg-amber-500/10 px-2.5 py-0.5 rounded-full mt-1.5 uppercase font-mono tracking-wider border border-amber-500/20">
                Category: {selectedBadge.category}
              </p>
              
              <div className="border-t border-b border-[#30363D] w-full py-4 my-4 font-sans text-left space-y-3">
                <div>
                  <h4 className="text-[10px] font-bold text-[#8B949E] uppercase tracking-widest">Description</h4>
                  <p className="text-xs text-[#E2E8F0] font-medium mt-1">{selectedBadge.description}</p>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-[#8B949E] uppercase tracking-widest">How to Unlock</h4>
                  <p className="text-xs text-[#58A6FF] font-medium mt-1 bg-[#58A6FF]/10 p-2 rounded-lg border border-[#58A6FF]/20">{selectedBadge.criteria}</p>
                </div>
              </div>

              <div className="flex justify-between w-full gap-3 mt-1.5">
                <button
                  onClick={() => setSelectedBadge(null)}
                  className="w-full bg-[#30363D] hover:bg-[#30363D]/80 text-[#F0F6FC] py-2.5 px-4 rounded-lg font-semibold text-xs transition-colors cursor-pointer"
                >
                  Close Shelf
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Show All Badges Modal popup */}
      {showAllBadges && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#161B22] border border-[#30363D] rounded-2xl max-w-4xl w-full p-6 shadow-xl relative max-h-[85vh] flex flex-col"
          >
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-[#30363D]">
              <h2 className="text-xl font-bold text-[#F0F6FC] flex items-center gap-2">
                <Award className="w-6 h-6 text-amber-500" />
                Full Badge Registry
              </h2>
              <button 
                onClick={() => setShowAllBadges(false)}
                className="px-4 py-2 bg-[#30363D] hover:bg-[#30363D]/80 rounded-lg text-[#F0F6FC] text-xs font-bold transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>

            <div className="overflow-y-auto pr-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {BADGES.map(badge => {
                const hasBadge = profile.badges.indexOf(badge.id) !== -1;
                return (
                  <div key={badge.id} className={`flex items-start gap-4 p-4 rounded-xl border ${hasBadge ? 'bg-amber-500/5 border-amber-500/30' : 'bg-[#0D0F12] border-[#30363D]'}`}>
                    <div className={`w-12 h-12 rounded-full shrink-0 flex items-center justify-center ${hasBadge ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' : 'bg-[#161B22] text-[#8B949E] border border-[#30363D] opacity-50'}`}>
                      <BadgeIcon name={badge.iconName} className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className={`text-sm font-bold ${hasBadge ? 'text-[#F0F6FC]' : 'text-slate-400 dark:text-[#8B949E]'}`}>{badge.name}</h4>
                      <p className="text-[10px] text-[#8B949E] uppercase tracking-wider font-bold mb-1 opacity-70">
                        {hasBadge ? 'Unlocked' : 'Locked'}
                      </p>
                      <p className="text-xs text-[#E2E8F0] mt-1 line-clamp-3">{badge.criteria}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
