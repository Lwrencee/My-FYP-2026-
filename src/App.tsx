/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import Onboarding from './components/Onboarding';
import OnboardingWalkthrough from './components/OnboardingWalkthrough';
import DashboardView from './components/DashboardView';
import AcademyView from './components/AcademyView';
import GamesView from './components/GamesView';
import ChecklistView from './components/ChecklistView';
import LeaderboardView from './components/LeaderboardView';
import ProfileView from './components/ProfileView';
import Navbar from './components/Navbar';
import AdminDashboard from './components/AdminDashboard';
import { UserProfile } from './types';
import { Sun, Moon, ArrowUpCircle, Trophy, Compass } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { getLevelTitle, BADGES, calculateLevelFromXP } from './data';
import TutorialOverlay from './components/TutorialOverlay';
import { auth, db } from './lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

export default function App() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'games' | 'checklist' | 'academy' | 'leaderboard' | 'profile'>('dashboard');
  const [loading, setLoading] = useState(true);
  const [firebaseReady, setFirebaseReady] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isImmersiveMode, setIsImmersiveMode] = useState(false);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [levelUpData, setLevelUpData] = useState<{ newLevel: number; newTitle: string; oldTitle: string } | null>(null);
  const prevLevelRef = useRef<number | null>(null);
  const isFirstMount = useRef(true);

  // Load user profile and theme on startup
  useEffect(() => {
    try {
      const saved = localStorage.getItem('defender_quest_profile');
      if (saved) {
        let parsed = JSON.parse(saved);
        
        // Backward compatibility fix
        if (parsed.completedGames) {
          let sanitizedGames = parsed.completedGames.filter((g: string) => !g.startsWith('phish-level-'));
          let phishLocal = localStorage.getItem('phish_cleared_levels_v1');
          if (phishLocal) {
            try {
              let cl = JSON.parse(phishLocal);
              if (Array.isArray(cl) && [1, 2, 3].every(x => cl.includes(x)) && !sanitizedGames.includes('game-phish')) {
                sanitizedGames.push('game-phish');
              }
            } catch (e) {}
          }
          parsed.completedGames = sanitizedGames;
        }

        const calculatedLevel = calculateLevelFromXP(parsed.xp);
        if (calculatedLevel > parsed.level) {
          parsed.level = calculatedLevel;
        }

        setProfile(parsed);
        prevLevelRef.current = parsed.level;
      }
      
      const savedTheme = localStorage.getItem('aegis_academy_theme') as 'dark' | 'light';
      if (savedTheme === 'light' || savedTheme === 'dark') {
        setTheme(savedTheme);
      }
    } catch (e) {
      console.error('Error loading profile or theme from local state', e);
    } finally {
      // Firebase auth listener
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          if (user.email === 'admin@aegisacademy.com') {
             setIsAdmin(true);
             setFirebaseReady(true);
             setLoading(false);
             return;
          }
          try {
            const userDoc = await getDoc(doc(db, 'users', user.uid));
            if (userDoc.exists()) {
               const data = userDoc.data() as UserProfile;
               
               const calculatedLevel = calculateLevelFromXP(data.xp);
               if (calculatedLevel > data.level) {
                 data.level = calculatedLevel;
                 // Since we're fixing data silently here, we might not trigger a pop up.
               }
               
               setProfile(data);
               localStorage.setItem('defender_quest_profile', JSON.stringify(data));
               // If they just logged in and had data, go to dashboard
               setActiveTab('dashboard');
            }
          } catch (e) {
            console.error('Error fetching user profile from Firebase', e);
          }
        } else {
          setIsAdmin(false);
          setProfile(null);
          localStorage.removeItem('defender_quest_profile');
        }
        setFirebaseReady(true);
        setLoading(false);
      });

      return () => unsubscribe();
    }
  }, []);

  // Sync profile to Firebase strictly when it changes
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    const syncProfile = async () => {
      if (profile && auth.currentUser) {
        try {
          const userDocRef = doc(db, 'users', auth.currentUser.uid);
          const userDoc = await getDoc(userDocRef);
          
          if (!userDoc.exists()) {
             // Create it for the first time
             await setDoc(userDocRef, {
               ...profile,
               uid: auth.currentUser.uid,
               createdAt: serverTimestamp(),
               updatedAt: serverTimestamp()
             });
          } else {
             // Profile updates
             const { createdAt, ...profileUpdates } = profile as any;
             await setDoc(userDocRef, {
               ...profileUpdates,
               uid: auth.currentUser.uid,
               updatedAt: serverTimestamp()
             }, { merge: true });
          }
        } catch (e) {
           console.error('Failed to sync profile to DB', e);
        }
      }
    };
    
    // Only debounce if we have a robust system, but for now simple invocation is okay as Firestore batches it for us locally.
    syncProfile();
  }, [profile]);

  // Watch for level up
  useEffect(() => {
    if (profile && prevLevelRef.current !== null && profile.level > prevLevelRef.current) {
      const oldTitle = getLevelTitle(prevLevelRef.current);
      const newTitle = getLevelTitle(profile.level);
      setLevelUpData({ newLevel: profile.level, newTitle, oldTitle });
      setShowLevelUp(true);
      prevLevelRef.current = profile.level;
    } else if (profile && prevLevelRef.current === null) {
      prevLevelRef.current = profile.level;
    }
  }, [profile?.level]);

  // Scroll to top when active tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [activeTab]);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem('aegis_academy_theme', next);
      return next;
    });
  };

  const [newBadgeEarned, setNewBadgeEarned] = useState<string | null>(null);

  // Sync profile edits to localStorage
  const handleUpdateProfile = (newProfileObjOrFn: UserProfile | ((prev: UserProfile) => UserProfile)) => {
    setProfile((prev) => {
      if (!prev) return prev;
      let next = typeof newProfileObjOrFn === 'function' ? newProfileObjOrFn(prev) : newProfileObjOrFn;
      
      const calculatedLevel = calculateLevelFromXP(next.xp);
      if (calculatedLevel > next.level) {
        next = { ...next, level: calculatedLevel };
      }
      
      const newlyEarnedBadges: string[] = [];
      const checkAward = (id: string, satisfied: boolean) => {
        if (satisfied && !next.badges.includes(id)) {
          next = { ...next, badges: [...next.badges, id] };
          newlyEarnedBadges.push(id);
        }
      };

      // Milestone conditions
      checkAward('badge-first-course', next.completedQuizzes.length >= 1);
      checkAward('badge-first-task', next.completedChecklist.length >= 1);
      checkAward('badge-level-5', next.level >= 5);
      checkAward('badge-level-10', next.level >= 10);
      checkAward('badge-checklist-complete', next.completedChecklist.length >= 8);
      checkAward('badge-academy-scholar', next.completedQuizzes.length >= 9);
      checkAward('badge-100-percent', next.completedGames.length >= 4 && next.completedChecklist.length >= 8 && next.completedQuizzes.length >= 9);

      if (newlyEarnedBadges.length > 0) {
        setNewBadgeEarned(newlyEarnedBadges[0]); // Show the first newly earned badge
      }

      localStorage.setItem('defender_quest_profile', JSON.stringify(next));
      return next;
    });
  };

  const handleOnboardingComplete = (newProfile: UserProfile) => {
    localStorage.setItem('defender_quest_profile', JSON.stringify(newProfile));
    setProfile(newProfile);
    setActiveTab('dashboard');
  };

  const handleResetProfile = () => {
    setProfile((prev) => {
      if (!prev) return prev;
      const resetProfile: UserProfile = {
        defenderName: prev.defenderName,
        avatarId: prev.avatarId,
        university: prev.university,
        xp: 0,
        level: 1,
        streak: 0,
        badges: [],
        completedQuizzes: [],
        completedChecklist: [],
        completedGames: [],
        completedCourses: [],
        completedWalkthrough: true,
        selectedLevel: prev.selectedLevel,
      };
      localStorage.setItem('defender_quest_profile', JSON.stringify(resetProfile));
      localStorage.removeItem('phish_cleared_levels_v1');
      localStorage.removeItem('phishtank_onboarded_v2');
      return resetProfile;
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0D0F12] flex items-center justify-center font-mono text-[#8B949E] text-xs">
        Booting Defender Sentry Systems...
      </div>
    );
  }

  if (isAdmin) {
    return <AdminDashboard />;
  }

  // Renders profile creator wizard if no user active
  if (!profile) {
    return (
      <div data-theme={theme} className="min-h-screen bg-[#0D0F12] transition-colors duration-200 relative">
        {/* Floating Theme Selector on top-right of onboarding */}
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
                <Moon className="w-3.5 h-3.5 text-indigo-450" />
                <span>Dark</span>
              </>
            )}
          </button>
        </div>
        <Onboarding onComplete={handleOnboardingComplete} />
      </div>
    );
  }

  // Renders custom 4-phase gamified Induction Walkthrough right after registration
  if (profile && !profile.completedWalkthrough) {
    return (
      <div data-theme={theme} className="min-h-screen bg-[#0D0F12] transition-colors duration-200">
        <OnboardingWalkthrough
          profile={profile}
          theme={theme}
          toggleTheme={toggleTheme}
          onComplete={(selectedLevel) => {
            handleUpdateProfile((prev) => ({
              ...prev,
              completedWalkthrough: true,
              selectedLevel,
              xp: prev.xp === 0 ? 50 : prev.xp, // Give 50 starting XP
            }));
            setTimeout(() => setShowWelcomePopup(true), 1500);
          }}
        />
      </div>
    );
  }

  return (
    <div data-theme={theme} className="min-h-screen bg-[#0D0F12] text-[#E2E8F0] flex flex-col md:flex-row font-sans transition-colors duration-200">
      
      {/* Shared Sidebar / Mobile Navigation Controls with theme configuration */}
      {!isImmersiveMode && (
        <Navbar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          profile={profile} 
          theme={theme} 
          toggleTheme={toggleTheme} 
        />
      )}

      {/* Main view container */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto max-w-5xl mx-auto w-full pb-20 md:pb-8">
        {/* Dynamic Top Header with Theme Switcher & Status */}
        {!isImmersiveMode && (
          <div className="flex justify-between items-center pb-4 mb-6 border-b border-[#30363D]/40 gap-4">
            <div className="flex items-center gap-2">
              <span className="text-[10px] sm:text-xs font-mono font-black text-[#8B949E] uppercase tracking-wider bg-[#161B22] py-1 px-3 border border-[#30363D] rounded-lg">
                Sentry Portal // <span className="text-[#58A6FF]">{activeTab}</span>
              </span>
            </div>
            
            {/* Tutorial Button */}
            {activeTab === 'dashboard' && (
              <button
                id="tutorial-button"
                onClick={() => setShowTutorial(true)}
                className="px-4 py-1.5 rounded-lg bg-[#58A6FF]/10 border border-[#58A6FF]/30 hover:bg-[#58A6FF]/20 text-[#58A6FF] transition-all cursor-pointer flex items-center gap-1.5 text-xs font-bold select-none shadow-sm shrink-0"
                title="Start Tutorial"
              >
                <Compass className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Tutorial</span>
              </button>
            )}
          </div>
        )}

        {activeTab === 'dashboard' && (
          <DashboardView profile={profile} setTab={setActiveTab} />
        )}
        {activeTab === 'academy' && (
          <AcademyView profile={profile} updateProfile={handleUpdateProfile} theme={theme} onActiveStateChange={setIsImmersiveMode} />
        )}
        {activeTab === 'games' && (
          <GamesView profile={profile} updateProfile={handleUpdateProfile} theme={theme} onActiveStateChange={setIsImmersiveMode} />
        )}
        {activeTab === 'checklist' && (
          <ChecklistView profile={profile} updateProfile={handleUpdateProfile} theme={theme} />
        )}
        {activeTab === 'leaderboard' && (
          <LeaderboardView profile={profile} theme={theme} />
        )}
        {activeTab === 'profile' && (
          <ProfileView 
            profile={profile} 
            updateProfile={handleUpdateProfile} 
            onReset={handleResetProfile} 
            setTab={setActiveTab}
          />
        )}

        <AnimatePresence>
          {showLevelUp && levelUpData && (
             <div className="fixed inset-0 bg-[#0D0F12]/85 backdrop-blur-sm flex items-center justify-center p-4 z-50">
               <motion.div
                 initial={{ scale: 0.9, opacity: 0 }}
                 animate={{ scale: 1, opacity: 1 }}
                 exit={{ scale: 0.9, opacity: 0 }}
                 className="bg-[#161B22] border border-[#30363D] rounded-2xl max-w-sm w-full p-6 shadow-2xl relative flex flex-col items-center text-center text-[#E2E8F0]"
               >
                 <div className="mx-auto bg-green-500/10 p-4 rounded-full border border-green-500/30 mb-4 shadow-[0_0_15px_rgba(34,197,94,0.3)]">
                   <ArrowUpCircle className="w-10 h-10 text-green-400" />
                 </div>
                 
                 <h2 className="text-2xl font-black text-[#F0F6FC] mb-1 uppercase tracking-tight">Level Up!</h2>
                 <p className="text-xl font-bold text-green-400 font-mono mb-4">Level {levelUpData.newLevel}</p>
                 
                 {levelUpData.oldTitle !== levelUpData.newTitle && (
                   <div className="bg-[#30363D]/40 p-3 rounded-xl mb-4 w-full border border-[#30363D]">
                     <p className="text-xs text-[#8B949E] uppercase tracking-wider font-semibold mb-1">New Tier Unlocked</p>
                     <p className="text-[#F0F6FC] font-black">{levelUpData.newTitle}</p>
                   </div>
                 )}
                 
                 <p className="text-sm text-[#8B949E] leading-relaxed mb-6">
                   Excellent work, Defender. Your actions are reinforcing the human firewall.
                 </p>

                 <button
                   onClick={() => setShowLevelUp(false)}
                   className="w-full py-3 bg-green-600 hover:bg-green-500 text-white rounded-lg text-sm font-bold transition-all shadow-lg active:scale-[0.98]"
                 >
                   Continue Mission
                 </button>
               </motion.div>
             </div>
          )}

          {newBadgeEarned && (
             <div className="fixed inset-0 bg-[#0D0F12]/85 backdrop-blur-sm flex items-center justify-center p-4 z-50">
               <motion.div
                 initial={{ scale: 0.9, opacity: 0 }}
                 animate={{ scale: 1, opacity: 1 }}
                 exit={{ scale: 0.9, opacity: 0 }}
                 className="bg-[#161B22] border border-[#30363D] rounded-2xl max-w-sm w-full p-6 shadow-2xl relative flex flex-col items-center text-center text-[#E2E8F0]"
               >
                 <div className="mx-auto bg-amber-500/10 p-4 rounded-full border border-amber-500/30 mb-4 shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                   <Trophy className="w-10 h-10 text-amber-400" />
                 </div>
                 
                 <h2 className="text-2xl font-black text-[#F0F6FC] mb-1 uppercase tracking-tight">Badge Earned!</h2>
                 <p className="text-base font-bold text-amber-400 mb-2">{BADGES.find(b => b.id === newBadgeEarned)?.name}</p>
                 
                 <div className="bg-[#30363D]/40 p-3 rounded-xl mb-6 w-full border border-[#30363D] text-sm text-[#8B949E]">
                   {BADGES.find(b => b.id === newBadgeEarned)?.description}
                 </div>

                 <button
                   onClick={() => setNewBadgeEarned(null)}
                   className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-sm font-bold transition-all shadow-lg active:scale-[0.98]"
                 >
                   Collect Badge
                 </button>
               </motion.div>
             </div>
          )}

          {showWelcomePopup && (
             <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0D0F12]/80 backdrop-blur-sm">
               <motion.div
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="bg-[#161B22] border border-[#30363D] rounded-2xl max-w-sm w-full p-6 shadow-2xl relative space-y-6 flex flex-col text-center z-50 text-[#E2E8F0]"
               >
                 <div className="mx-auto w-12 h-12 bg-[#58A6FF]/10 rounded-full flex items-center justify-center mb-2">
                   <Compass className="w-6 h-6 text-[#58A6FF]" />
                 </div>
                 <div>
                   <h3 className="text-xl font-black text-[#F0F6FC] mb-2">Welcome to Aegis!</h3>
                   <p className="text-sm text-[#8B949E] px-4">
                     Would you like a quick tour of your Sentry Dashboard and features?
                   </p>
                 </div>
                 <div className="flex gap-3">
                   <button
                     onClick={() => setShowWelcomePopup(false)}
                     className="flex-1 py-3 px-4 bg-transparent border border-[#30363D] hover:bg-[#30363D]/50 text-[#C9D1D9] font-bold text-sm rounded-xl transition-all cursor-pointer"
                   >
                     Skip Tutorial
                   </button>
                   <button
                     onClick={() => {
                        setShowWelcomePopup(false);
                        setShowTutorial(true);
                     }}
                     className="flex-1 py-3 px-4 bg-[#58A6FF] hover:bg-[#58A6FF]/90 text-[#0D0F12] font-bold text-sm rounded-xl transition-all shadow-[0_0_15px_rgba(88,166,255,0.4)] cursor-pointer"
                   >
                     Show Me Around
                   </button>
                 </div>
               </motion.div>
             </div>
          )}

          {showTutorial && <TutorialOverlay onComplete={() => setShowTutorial(false)} />}
        </AnimatePresence>
      </main>
    </div>
  );
}

