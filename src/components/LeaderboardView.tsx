/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Trophy, Award, Users, Shield, Sparkles, Star, Building2, Loader2 } from 'lucide-react';
import { UserProfile, LeaderboardEntry } from '../types';
import { INITIAL_LEADERBOARD, AVATARS } from '../data';
import PixelAvatar from './PixelAvatar';
import { collection, getDocs, orderBy, query, limit } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType, auth } from '../lib/firebase';

interface LeaderboardViewProps {
  profile: UserProfile;
  theme?: 'light' | 'dark';
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

export default function LeaderboardView({ profile, theme = 'dark' }: LeaderboardViewProps) {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const q = query(collection(db, 'users'), orderBy('xp', 'desc'), limit(100));
        const querySnapshot = await getDocs(q);
        
        const fetched: LeaderboardEntry[] = [];
        const currentUserUid = auth.currentUser?.uid;

        querySnapshot.forEach((doc) => {
          const data = doc.data() as UserProfile;
          const isCurrentUser = Boolean(currentUserUid) && doc.id === currentUserUid;
          
          fetched.push({
            defenderName: isCurrentUser ? `${profile.defenderName} (You)` : data.defenderName,
            avatarId: isCurrentUser ? profile.avatarId : data.avatarId,
            xp: isCurrentUser ? profile.xp : data.xp,
            level: isCurrentUser ? profile.level : data.level,
            university: isCurrentUser ? (profile.university || data.university) : data.university,
            isUser: isCurrentUser
          });
        });

        // Ensure current user is in the list locally if DB is out of sync or fresh
        if (!fetched.find(u => u.isUser)) {
           fetched.push({
             defenderName: `${profile.defenderName} (You)`,
             avatarId: profile.avatarId,
             xp: profile.xp,
             level: profile.level,
             university: profile.university || 'Caleb University',
             isUser: true
           });
           fetched.sort((a, b) => b.xp - a.xp);
        }

        setLeaderboardData(fetched);
      } catch (e) {
        handleFirestoreError(e, OperationType.LIST, 'users');
      } finally {
        setLoading(false);
      }
    }

    fetchLeaderboard();
  }, [profile]);

  const sortedLeaderboard = leaderboardData;

  const getRankBadge = (rankIdx: number) => {
    switch (rankIdx) {
      case 0:
        return (
          <div className="w-6 h-6 rounded-lg bg-yellow-500/20 border border-yellow-500/40 flex items-center justify-center text-yellow-500 font-black text-xs shadow-sm">
            👑
          </div>
        );
      case 1:
        return (
          <div className={`w-6 h-6 rounded-lg border flex items-center justify-center font-black text-xs shadow-sm ${theme === 'light' ? 'bg-slate-200 border-slate-300 text-slate-500' : 'bg-[#8B949E]/20 border-[#8B949E]/40 text-slate-300'}`}>
            🥈
          </div>
        );
      case 2:
        return (
          <div className="w-6 h-6 rounded-lg bg-amber-600/20 border border-amber-600/40 flex items-center justify-center text-amber-500 font-bold text-xs shadow-sm">
            🥉
          </div>
        );
      default:
        return (
          <span className={`text-xs ml-1 font-black ${theme === 'light' ? 'text-slate-400' : 'text-[#8B949E] text-opacity-60'}`}>
            {rankIdx + 1}
          </span>
        );
    }
  };

  const getUniversityTagColor = (uni: string) => {
    if (uni.includes('Caleb')) {
      return theme === 'light' ? 'bg-blue-50 text-blue-600 border-blue-200' : 'bg-[#58A6FF]/10 text-[#58A6FF] border-[#58A6FF]/30';
    }
    if (uni.includes('LASU') || uni.includes('Lagos State')) {
      return theme === 'light' ? 'bg-purple-50 text-purple-600 border-purple-200' : 'bg-purple-500/15 text-purple-300 border-purple-500/30';
    }
    if (uni.includes('UNILAG') || uni.includes('University of Lagos')) {
      return theme === 'light' ? 'bg-amber-50 text-amber-600 border-amber-200' : 'bg-amber-500/15 text-amber-300 border-amber-500/30';
    }
    if (uni.includes('Covenant')) {
      return theme === 'light' ? 'bg-pink-50 text-pink-600 border-pink-200' : 'bg-[#FF79C6]/15 text-[#FF79C6] border-[#FF79C6]/30';
    }
    if (uni.includes('UI') || uni.includes('Ibadan')) {
      return theme === 'light' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
    }
    return theme === 'light' ? 'bg-teal-50 text-teal-600 border-teal-200' : 'bg-teal-500/10 text-teal-300 border-teal-500/20';
  };

  if (loading) {
    return (
      <div className={`flex flex-col items-center justify-center py-20 ${theme === 'light' ? 'text-slate-500' : 'text-[#8B949E]'}`}>
        <Loader2 className="w-8 h-8 animate-spin mb-4" />
        <p className="text-xs font-bold uppercase tracking-widest font-mono">Loading Leaderboard...</p>
      </div>
    );
  }

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className={`space-y-6 font-sans max-w-3xl mx-auto pb-12 ${theme === 'light' ? 'text-slate-800' : 'text-[#E2E8F0]'}`}
    >
      <motion.div variants={itemVariants} className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b ${theme === 'light' ? 'border-slate-200' : 'border-[#30363D]'}`}>
        <div>
          <h2 className={`text-2xl font-black tracking-tight ${theme === 'light' ? 'text-slate-900' : 'text-[#F0F6FC]'}`}>The Leaderboard 🏅</h2>
          <p className={`text-sm mt-1 ${theme === 'light' ? 'text-slate-500' : 'text-[#8B949E]'}`}>Compare your defensive XP standing amongst other players.</p>
        </div>
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border w-max select-none shadow-sm ${theme === 'light' ? 'bg-white border-slate-200' : 'bg-[#161B22] border-[#30363D]'}`}>
          <Users className={`w-4 h-4 ${theme === 'light' ? 'text-slate-500' : 'text-[#8B949E]'}`} />
          <span className={`text-xs font-bold font-mono ${theme === 'light' ? 'text-slate-800' : 'text-[#F0F6FC]'}`}>{sortedLeaderboard.length} Active {sortedLeaderboard.length === 1 ? 'Sentry' : 'Sentries'}</span>
        </div>
      </motion.div>

      {/* Leaderboard Table Card */}
      <motion.div variants={itemVariants} className={`border rounded-2xl overflow-hidden shadow-md transition-shadow ${theme === 'light' ? 'bg-white border-slate-200 shadow-slate-200/50' : 'bg-[#161B22] border-[#30363D]'}`}>
        <div className={`hidden sm:flex border-b p-4 justify-between text-[11px] font-black uppercase tracking-widest font-mono ${theme === 'light' ? 'bg-slate-50 border-slate-200 text-slate-500' : 'bg-[#0D0F12]/80 border-[#30363D] text-[#8B949E]'}`}>
          <div className="flex items-center gap-4">
            <span className="w-8 text-center text-slate-400">#</span>
            <span>Tactical Defender Profile</span>
          </div>
          <div className="flex gap-8 sm:gap-12 pl-4">
            <span className="w-12 text-center">Level</span>
            <span className="w-16 text-right">Points XP</span>
          </div>
        </div>

        <div className={`divide-y content-end ${theme === 'light' ? 'divide-slate-100' : 'divide-[#30363D]/40'}`}>
          {sortedLeaderboard.map((item, index) => {
            const isTop3 = index < 3;
            
            return (
              <motion.div
                key={item.defenderName}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
                className={`flex justify-between items-center p-3 sm:p-5 transition-colors ${
                  item.isUser ? (theme === 'light' ? 'bg-blue-50/50 hover:bg-blue-50/80 border-y border-blue-100' : 'bg-[#58A6FF]/5 hover:bg-[#58A6FF]/10 border-y border-[#58A6FF]/15') : (theme === 'light' ? 'hover:bg-slate-50' : 'hover:bg-[#0D0F12]/50')
                }`}
              >
                <div className="flex items-center gap-2 sm:gap-4 min-w-0">
                  <span className="w-6 sm:w-8 flex items-center justify-center shrink-0">
                    {getRankBadge(index)}
                  </span>
                  
                  <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                    <div className={`shrink-0 rounded-xl p-1 border shadow-sm ${theme === 'light' ? 'bg-white border-slate-200' : 'bg-[#0D0F12] border-[#30363D]'}`}>
                      <PixelAvatar id={item.avatarId} size={36} />
                    </div>
                    <div className="min-w-0 flex flex-col justify-center">
                      <div className="flex items-center gap-1 sm:gap-2 min-w-0">
                        <span className={`text-sm sm:text-base font-black tracking-tight truncate ${item.isUser ? (theme === 'light' ? 'text-blue-600' : 'text-[#58A6FF]') : (theme === 'light' ? 'text-slate-900' : 'text-[#F0F6FC]')}`}>
                          {item.defenderName}
                        </span>
                        {index === 0 && <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-500 fill-yellow-500/20 shrink-0" />}
                        {index === 1 && <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 fill-slate-400/20 shrink-0" />}
                        {index === 2 && <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-600 fill-amber-600/20 shrink-0" />}
                      </div>
                      <span className={`text-[9px] sm:text-[10px] border px-1.5 sm:px-2 py-0.5 rounded-md font-bold uppercase block w-max truncate max-w-[120px] sm:max-w-full mt-0.5 sm:mt-1 ${getUniversityTagColor(item.university)}`}>
                        {item.university}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 sm:gap-12 pl-2 sm:pl-4 text-right font-mono shrink-0 items-center">
                  <span className={`hidden sm:block w-12 text-center text-xs font-bold self-center ${theme === 'light' ? 'text-slate-500' : 'text-[#8B949E]'}`}>
                    <span className="text-[10px] uppercase block tracking-wider mb-0.5 opacity-50">LVL</span>
                    {item.level}
                  </span>
                  <div className="flex flex-col items-end justify-center">
                    <span className={`sm:hidden text-[9px] font-bold tracking-wider mb-0.5 uppercase ${theme === 'light' ? 'text-slate-400' : 'text-[#8B949E]'}`}>
                      Lvl {item.level}
                    </span>
                    <span className={`w-12 sm:w-16 text-right text-base sm:text-xl font-black self-center tracking-tighter ${item.isUser ? 'text-[#3FB950]' : (isTop3 ? (theme === 'light' ? 'text-slate-900' : 'text-white') : (theme === 'light' ? 'text-slate-700' : 'text-[#F0F6FC]'))}`}>
                      {item.xp}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}
