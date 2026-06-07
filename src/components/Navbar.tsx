/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Trophy, 
  Gamepad2, 
  ShieldCheck, 
  GraduationCap, 
  User, 
  Compass, 
  ShieldAlert,
  Flame,
  Award,
  Sun,
  Moon
} from 'lucide-react';
import { UserProfile } from '../types';
import { AVATARS } from '../data';
import PixelAvatar from './PixelAvatar';

interface NavbarProps {
  activeTab: 'dashboard' | 'games' | 'checklist' | 'academy' | 'leaderboard' | 'profile';
  setActiveTab: (tab: 'dashboard' | 'games' | 'checklist' | 'academy' | 'leaderboard' | 'profile') => void;
  profile: UserProfile | null;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

export default function Navbar({ activeTab, setActiveTab, profile, theme, toggleTheme }: NavbarProps) {
  
  const navItems = [
    { id: 'dashboard' as const, label: 'Dashboard', icon: Compass },
    { id: 'academy' as const, label: 'Academy', icon: GraduationCap },
    { id: 'games' as const, label: 'Games', icon: Gamepad2 },
    { id: 'checklist' as const, label: 'Checklist', icon: ShieldCheck },
    { id: 'leaderboard' as const, label: 'Leaderboard', icon: Trophy },
    { id: 'profile' as const, label: 'Profile Settings', icon: User }
  ];

  const getActiveAvatar = () => {
    if (!profile) return '⚔️';
    const found = AVATARS.find(av => av.id === profile.avatarId);
    return found ? found.emoji : '🛡️';
  };

  return (
    <>
      {/* 1. DESKTOP SIDEBAR NAVIGATION (Large screens) */}
      <aside className="hidden md:flex flex-col w-64 bg-[#161B22] border-r border-[#30363D] text-[#8B949E] h-screen sticky top-0 font-sans shrink-0 overflow-y-auto">
        {/* Brand Banner */}
        <div className="p-6 border-b border-[#30363D] flex items-center justify-between gap-2.5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-[#58A6FF]/10 border border-[#58A6FF]/20 text-[#58A6FF] rounded-lg flex items-center justify-center shadow-sm">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-sm font-black tracking-widest text-[#F0F6FC] font-mono leading-none">AEGISACADEMY</h1>
            </div>
          </div>
          
          {/* Desktop Theme Switcher */}
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-lg bg-[#0D0F12]/40 hover:bg-[#0D0F12] border border-[#30363D] text-[#8B949E] hover:text-[#58A6FF] transition-all cursor-pointer flex items-center justify-center shrink-0"
            title={theme === 'dark' ? 'Toggle Light Mode' : 'Toggle Dark Mode'}
          >
            {theme === 'dark' ? (
              <Sun className="w-3.5 h-3.5 text-amber-400" />
            ) : (
              <Moon className="w-3.5 h-3.5 text-indigo-500" />
            )}
          </button>
        </div>

        {/* User Stats Card inside sidebar */}
        {profile && (
          <div className="p-4 mx-4 my-4 bg-[#0D0F12] border border-[#30363D] rounded-xl space-y-3 shrink-0">
            <div className="flex items-center gap-2.5">
              <PixelAvatar id={profile.avatarId} size={32} className="shrink-0 rounded bg-[#161B22] p-0.5 border border-[#30363D]" />
              <div className="min-w-0">
                <p className="text-xs font-bold text-[#F0F6FC] truncate leading-tight select-all">{profile.defenderName}</p>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <span className="text-[9px] bg-[#238636]/10 text-[#3FB950] border border-[#238636]/40 px-1.5 py-0.2 rounded font-mono font-bold leading-none">
                    LVL {profile.level}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-[#30363D] flex items-center justify-between text-[11px] font-mono font-bold text-[#8B949E]">
              <span className="text-[10px] text-[#8B949E] uppercase font-semibold">Balance Score</span>
              <span className="text-[#3FB950]">{profile.xp} XP</span>
            </div>
          </div>
        )}

        {/* Menu selections */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-desktop-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all border outline-none cursor-pointer ${
                  isActive
                    ? 'bg-[#1f242c] border-[#30363D] text-[#58A6FF] shadow-sm font-black'
                    : 'border-transparent text-[#8B949E] hover:bg-[#1a202c]/50 hover:text-[#F0F6FC]'
                }`}
              >
                <Icon className={`w-4.5 h-4.5 ${isActive ? 'text-[#58A6FF]' : 'text-[#8B949E]'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
        
        {/* Footer details */}
        <div className="p-4 text-center border-t border-[#30363D] shrink-0">
          <p className="text-[9px] text-[#8B949E] font-medium">CyberSecurity Project</p>
          <p className="text-[8px] text-slate-600 tracking-tight leading-loose">© 2026 AegisAcademy • Nigeria</p>
        </div>
      </aside>

      {/* 2. MOBILE TOP BAR */}
      <header className="md:hidden sticky top-0 left-0 right-0 h-14 bg-[#161B22] border-b border-[#30363D] flex items-center justify-between px-4 text-white z-40 font-sans shadow-md">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-[#58A6FF] shrink-0" />
          <h1 className="text-xs font-black tracking-widest font-mono text-[#F0F6FC]">AEGISACADEMY</h1>
        </div>

        <div className="flex items-center gap-2">
          {/* Mobile Theme Switcher */}
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-lg bg-[#0D0F12]/60 hover:bg-[#0D0F12] border border-[#30363D] text-[#8B949E] hover:text-[#58A6FF] transition-all cursor-pointer flex items-center justify-center shrink-0"
            title={theme === 'dark' ? 'Toggle Light Mode' : 'Toggle Dark Mode'}
          >
            {theme === 'dark' ? (
              <Sun className="w-3.5 h-3.5 text-amber-400" />
            ) : (
              <Moon className="w-3.5 h-3.5 text-indigo-400" />
            )}
          </button>

          {profile && (
            <div className="flex items-center gap-2 bg-[#0D0F12] p-1 px-2 rounded-lg border border-[#30363D]">
              <PixelAvatar id={profile.avatarId} size={20} className="shrink-0" />
              <span className="text-[10px] font-black text-[#3FB950] font-mono select-none">{profile.xp} XP</span>
            </div>
          )}
        </div>
      </header>

      {/* 3. MOBILE BOTTOM TABS (Phone screen controls) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#161B22] border-t border-[#30363D] flex justify-around py-1 px-1 text-[#8B949E] z-40 text-[9px] font-medium shadow-2xl">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              id={`nav-mobile-${item.id}`}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center flex-1 py-1.5 focus:outline-none transition-all outline-none cursor-pointer border-t-2 ${
                isActive 
                  ? 'text-[#58A6FF] border-[#58A6FF] font-extrabold bg-[#1f242c]/40' 
                  : 'text-[#8B949E] border-transparent hover:text-[#F0F6FC]'
              }`}
            >
              <Icon className="w-4 h-4 mb-0.5 shrink-0" />
              <span className="scale-95 text-[8.5px] tracking-tight">{item.label.split(' ')[0]}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
