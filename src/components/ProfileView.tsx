/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  User, 
  Sparkles, 
  RotateCcw, 
  Award, 
  Info,
  GraduationCap, 
  ShieldCheck,
  Building2,
  FileBadge,
  Upload,
  LogOut,
  Shield,
  ChevronDown
} from 'lucide-react';
import { UserProfile } from '../types';
import { AVATARS, NIGERIAN_UNIVERSITIES, getLevelTitle } from '../data';
import PixelAvatar from './PixelAvatar';
import { auth, db } from '../lib/firebase';
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect } from 'react';

interface ProfileViewProps {
  profile: UserProfile;
  updateProfile: (profile: UserProfile | ((prev: UserProfile) => UserProfile)) => void;
  onReset: () => void;
  setTab: (tab: any) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

export default function ProfileView({ profile, updateProfile, onReset, setTab }: ProfileViewProps) {
  const isCustom = profile.avatarId?.startsWith('data:image/') || profile.avatarId?.startsWith('http');
  const [name, setName] = useState(profile.defenderName);
  const [selectedAvatarId, setSelectedAvatarId] = useState(isCustom ? 'custom' : profile.avatarId);
  const [customImage, setCustomImage] = useState<string | null>(isCustom ? profile.avatarId : null);
  const [selectedUniversity, setSelectedUniversity] = useState(profile.university || 'Caleb University');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false);
  const [showResetSuccess, setShowResetSuccess] = useState(false);
  const [aboutText, setAboutText] = useState("Aegis Academy offers tactical training and simulations for young cyber defenders.");
  const [helpText, setHelpText] = useState("If you need assistance, please consult the academy handbook or reach out to an instructor.");
  const [fetchingSettings, setFetchingSettings] = useState(true);
  const [textModal, setTextModal] = useState<{title: string; text: string} | null>(null);
  const [showSkillModal, setShowSkillModal] = useState(false);
  const [draftSkillLevel, setDraftSkillLevel] = useState(profile.selectedLevel || 'Newbie');


  useEffect(() => {
    async function fetchSettings() {
      try {
        const settingsDoc = await getDoc(doc(db, 'appSettings', 'general'));
        if (settingsDoc.exists()) {
          const data = settingsDoc.data();
          if (data.aboutText) setAboutText(data.aboutText);
          if (data.helpText) setHelpText(data.helpText);
        }
      } catch (e) {
        console.error("Failed to load settings:", e);
      } finally {
        setFetchingSettings(false);
      }
    }
    fetchSettings();
  }, []);

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Compress image using canvas
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 200;
          const MAX_HEIGHT = 200;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
          setCustomImage(dataUrl);
          setSelectedAvatarId('custom'); // pseudo-id to indicate custom image
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const clearCustomImage = () => {
    setCustomImage(null);
    setSelectedAvatarId(AVATARS[0].id);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = name.trim();
    if (!cleanName) return;

    updateProfile((prev: UserProfile) => {
      // Award initiate badge if not already present
      let newBadges = [...prev.badges];
      if (prev.badges.indexOf('badge-welcome') === -1) {
        newBadges.push('badge-welcome');
      }

      return {
        ...prev,
        defenderName: cleanName,
        avatarId: selectedAvatarId === 'custom' && customImage ? customImage : selectedAvatarId,
        university: selectedUniversity,
        selectedLevel: draftSkillLevel as 'Newbie' | 'Beginner' | 'Intermediate',
        badges: newBadges
      };
    });

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const getActiveAvatar = () => {
    return AVATARS.find(av => av.id === profile.avatarId) || AVATARS[0];
  };

  const currentLevelTitle = getLevelTitle(profile.level);

  // Math totals for achievements certification
  const checklistCount = profile.completedChecklist.length;
  const academyCount = profile.completedQuizzes.length;
  const gamesCount = profile.completedGames.length;
  const isEligibleForCert = checklistCount >= 2 && academyCount >= 1 && gamesCount >= 1;

  // Formatted date
  const todayString = new Date().toLocaleDateString('en-NG', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-8 font-sans pb-12 text-[#E2E8F0] max-w-2xl mx-auto"
    >
      
      {/* Visual Settings Grid */}
      <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Left column: Quick Customizations */}
        <motion.div variants={itemVariants} className="md:col-span-12 bg-[#161B22] border border-[#30363D] rounded-2xl p-6 shadow-xl space-y-4">
          <div className="pb-4 border-b border-[#30363D]">
            <h3 className="text-lg font-bold text-[#F0F6FC] flex items-center gap-2">
              <User className="w-5 h-5 text-[#58A6FF]" />
              Modify Sentry Identity
            </h3>
            <p className="text-xs text-[#8B949E] mt-0.5">Configure your live handle, active academic shield, and custom pixel-art avatar.</p>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#8B949E] uppercase tracking-wider mb-2">Trainer Handle</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value.replace(/[^a-zA-Z0-9_]/g, ''))}
                  placeholder="e.g. SentryDelta"
                  className="block w-full px-4 py-3 bg-[#0D0F12] border border-[#30363D] rounded-lg text-sm font-sans text-[#F0F6FC] focus:outline-none focus:ring-2 focus:ring-[#58A6FF]/20 focus:border-[#58A6FF] transition-all font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#8B949E] uppercase tracking-wider mb-2 flex items-center gap-1">
                  <GraduationCap className="w-4 h-4 text-[#58A6FF]" />
                  Registered College
                </label>
                <select
                  value={selectedUniversity}
                  onChange={(e) => setSelectedUniversity(e.target.value)}
                  className="block w-full px-4 py-3 bg-[#0D0F12] border border-[#30363D] rounded-lg text-sm font-sans text-[#F0F6FC] focus:outline-none focus:ring-2 focus:ring-[#58A6FF]/20 focus:border-[#58A6FF] transition-all font-semibold cursor-pointer"
                >
                  {NIGERIAN_UNIVERSITIES.map((uni) => (
                    <option key={uni} value={uni} className="bg-[#161B22] text-[#E2E8F0]">
                      {uni}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#8B949E] uppercase tracking-wider mb-2 flex items-center gap-1">
                  <Shield className="w-4 h-4 text-[#58A6FF]" />
                  Skill Level
                </label>
                <button
                  type="button"
                  onClick={() => setShowSkillModal(true)}
                  className="block w-full px-4 py-3 bg-[#0D0F12] border border-[#30363D] rounded-lg text-sm font-sans text-[#F0F6FC] hover:bg-[#30363D]/40 transition-all font-semibold flex justify-between items-center text-left cursor-pointer"
                >
                  <span className="truncate">{draftSkillLevel} Sentry</span>
                  <ChevronDown className="w-5 h-5 text-[#8B949E] shrink-0" />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#8B949E] uppercase tracking-wider mb-3 flex items-center justify-between">
                <span>Choose Pixel-Art Mascot or Upload Image</span>
                {customImage && (
                  <button type="button" onClick={clearCustomImage} className="text-[10px] text-red-400 hover:underline">
                    Clear Image
                  </button>
                )}
              </label>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageUpload}
                className="hidden"
              />
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    if (customImage) {
                      setSelectedAvatarId('custom');
                    } else {
                      fileInputRef.current?.click();
                    }
                  }}
                  onDoubleClick={() => fileInputRef.current?.click()}
                  className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all outline-none cursor-pointer relative ${
                    selectedAvatarId === 'custom'
                      ? 'border-[#58A6FF] ring-2 ring-[#58A6FF]/20 bg-[#1f242c] scale-[1.03]'
                      : 'border-[#30363D] bg-[#0D0F12] hover:bg-[#0D0F12]/80'
                  }`}
                >
                  {customImage ? (
                    <img src={customImage} alt="Custom Profile" className="w-8 h-8 rounded shrink-0 object-cover" />
                  ) : (
                    <div className="w-8 h-8 bg-[#161B22] rounded shrink-0 flex items-center justify-center text-[#8B949E]">
                      <Upload className="w-4 h-4" />
                    </div>
                  )}
                  <span className="text-[9px] font-bold text-[#8B949E] truncate w-full text-center">Custom</span>
                </button>
                {AVATARS.map((av) => (
                  <button
                    key={av.id}
                    type="button"
                    onClick={() => setSelectedAvatarId(av.id)}
                    className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all outline-none cursor-pointer ${
                      selectedAvatarId === av.id
                        ? `${av.color} border-[#58A6FF] ring-2 ring-[#58A6FF]/20 bg-[#1f242c] scale-[1.03]`
                        : 'border-[#30363D] bg-[#0D0F12] hover:bg-[#0D0F12]/80'
                    }`}
                  >
                    <PixelAvatar id={av.id} size={32} className="shrink-0" />
                    <span className="text-[9px] font-bold text-[#8B949E] truncate w-full text-center">{av.name.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                type="submit"
                className="w-full sm:w-max px-6 py-2.5 bg-[#58A6FF] hover:bg-[#58A6FF]/95 font-bold text-[#0D0F12] text-xs rounded-lg shadow-md transition-all active:scale-[0.98] cursor-pointer"
              >
                Commit Changes
              </button>
              {saveSuccess && (
                <p className="text-[10px] text-[#3FB950] font-bold">✓ Profile settings saved securely to local cache!</p>
              )}
            </div>
          </form>

          <div className="pt-6 border-t border-[#30363D] flex flex-col gap-3">
            <button
              onClick={() => setShowResetConfirm(true)}
              className="w-full py-2.5 px-6 bg-[#F85149]/10 hover:bg-[#F85149]/20 border border-[#F85149]/30 text-[#F85149] font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset My Progress
            </button>
            {auth.currentUser && (
              <button
                onClick={() => setShowSignOutConfirm(true)}
                className="w-full py-2.5 px-6 bg-red-600 hover:bg-red-500 border border-red-700 text-white font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm"
              >
                <LogOut className="w-3.5 h-3.5" /> Log Out
              </button>
            )}
          </div>
        </motion.div>

        {/* About Section */}
        <motion.div 
          onClick={() => setTextModal({ title: 'About', text: aboutText })}
          variants={itemVariants} 
          className="md:col-span-6 bg-[#161B22] border border-[#30363D] hover:border-[#58A6FF]/50 hover:bg-[#161B22]/80 transition-all cursor-pointer rounded-2xl p-6 shadow-xl space-y-4 h-[200px] overflow-hidden relative group"
        >
          <div className="pb-4 border-b border-[#30363D] flex justify-between items-center group-hover:border-[#58A6FF]/30 transition-colors">
            <h3 className="text-lg font-bold text-[#F0F6FC] flex items-center gap-2">
              <Info className="w-5 h-5 text-[#58A6FF]" />
              About
            </h3>
            <span className="text-xs font-semibold text-[#58A6FF] opacity-0 group-hover:opacity-100 transition-opacity">Read more</span>
          </div>
          <p className="text-sm text-[#8B949E] leading-relaxed whitespace-pre-wrap line-clamp-4">
            {fetchingSettings ? "Loading..." : aboutText}
          </p>
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#161B22] to-transparent pointer-events-none" />
        </motion.div>
        
        {/* Help Section */}
        <motion.div 
          onClick={() => setTextModal({ title: 'Help', text: helpText })}
          variants={itemVariants} 
          className="md:col-span-6 bg-[#161B22] border border-[#30363D] hover:border-[#58A6FF]/50 hover:bg-[#161B22]/80 transition-all cursor-pointer rounded-2xl p-6 shadow-xl space-y-4 h-[200px] overflow-hidden relative group"
        >
          <div className="pb-4 border-b border-[#30363D] flex justify-between items-center group-hover:border-[#58A6FF]/30 transition-colors">
            <h3 className="text-lg font-bold text-[#F0F6FC] flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#58A6FF]" />
              Help
            </h3>
            <span className="text-xs font-semibold text-[#58A6FF] opacity-0 group-hover:opacity-100 transition-opacity">Read more</span>
          </div>
          <p className="text-sm text-[#8B949E] leading-relaxed whitespace-pre-wrap line-clamp-4">
            {fetchingSettings ? "Loading..." : helpText}
          </p>
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#161B22] to-transparent pointer-events-none" />
        </motion.div>

      </motion.div>

      {/* Dynamic DOM Graduation Certificate Showcase */}
      {showCertificate && (
        <div className="fixed inset-0 bg-[#0D0F12]/85 backdrop-blur-md flex items-center justify-center p-4 z-50 overflow-y-auto">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#161B22] border-4 border-[#30363D] rounded-3xl max-w-2xl w-full p-8 shadow-2xl relative space-y-6 flex flex-col items-center text-center select-text text-[#E2E8F0]"
          >
            {/* Certificate Header Borders */}
            <div className="border border-double border-[#30363D] p-6 md:p-10 w-full rounded-xl space-y-6">
              
              <div className="space-y-2">
                <span className="text-xs font-mono font-black tracking-widest text-[#58A6FF] uppercase block">
                  {profile.university || 'Nigerian Sentry Network'}
                </span>
                <span className="text-[10px] font-sans font-extrabold uppercase text-[#8B949E] border-b border-[#30363D] pb-2.5 tracking-wider block">
                  AegisAcademy Cybersecurity Initiative
                </span>
              </div>

              <div className="space-y-2 pt-3">
                <h2 className="text-xl md:text-2xl font-serif text-[#F0F6FC] font-black tracking-tight uppercase">
                  Hygiene Excellence Diploma
                </h2>
                <p className="text-[11px] text-[#8B949E] font-serif italic mt-0.5">
                  This authentication seal is officially awarded to the tactical defender
                </p>
              </div>

              <div className="py-4 border-b border-[#30363D]">
                <h1 className="text-2xl md:text-3xl font-mono font-black tracking-tight text-[#3FB950] select-all uppercase">
                  {profile.defenderName}
                </h1>
                <p className="text-[11px] text-[#58A6FF] font-sans font-bold mt-1.5 tracking-wider uppercase">
                  Tactical Sentry Level {profile.level} ({currentLevelTitle})
                </p>
              </div>

              <p className="text-[11px] text-[#8B949E] font-serif leading-relaxed max-w-lg mx-auto select-text font-medium">
                For outstanding retention, verification, and critical analysis scored on the 
                <strong> AegisAcademy Cyber Sentry Platform</strong>, effectively bridging the knowledge-action gap 
                against social engineering traps, credential brute forcing, and insecure wireless systems.
              </p>

              {/* Course and Date references */}
              <div className="grid grid-cols-2 gap-4 text-left border-t border-[#30363D] pt-6 font-sans">
                <div className="space-y-1 border-r border-[#30363D] pr-4 text-center sm:text-left">
                  <span className="text-[9px] text-[#8B949E] font-bold uppercase tracking-widest block">Authorized Signatures</span>
                  <p className="text-xs font-mono font-bold text-[#F0F6FC]">AegisAcademy Registrar</p>
                  <p className="text-[9px] text-[#8B949E] block font-medium">Verification Board, Nigeria</p>
                </div>
                <div className="space-y-1 pl-4 text-center sm:text-right">
                  <span className="text-[9px] text-[#8B949E] font-bold uppercase tracking-widest block">Authorization Date</span>
                  <p className="text-xs font-bold font-mono text-[#F0F6FC]">{todayString}</p>
                  <p className="text-[9px] text-[#8B949E] block font-medium">Registry Seal ID: AEGIS-CYB22</p>
                </div>
              </div>

            </div>

            {/* Certificate Actions */}
            <div className="flex gap-4 w-full max-w-sm pt-2">
              <button
                onClick={() => setShowCertificate(false)}
                className="w-full py-2.5 bg-[#30363D] hover:bg-[#30363D]/80 text-[#F0F6FC] rounded-lg text-xs font-bold transition-all cursor-pointer"
              >
                Close Certificate
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Skill Level Selection Modal */}
      {showSkillModal && (
        <div className="fixed inset-0 bg-[#0D0F12]/85 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#161B22] border border-[#30363D] rounded-2xl max-w-md w-full p-6 shadow-2xl relative space-y-6 flex flex-col text-[#E2E8F0]"
          >
            <div>
              <h3 className="text-xl font-black text-[#F0F6FC] mb-2">Modify Skill Level</h3>
              <p className="text-sm text-[#8B949E]">
                Select your appropriate level. This will not reset your progress.
              </p>
            </div>
            
            <div className="space-y-3">
              <button
                onClick={() => setDraftSkillLevel('Newbie')}
                className={`w-full p-4 rounded-xl text-left border transition-all cursor-pointer flex items-start gap-3.5 ${
                  draftSkillLevel === 'Newbie'
                    ? 'bg-[#58A6FF]/10 border-[#58A6FF] text-[#F0F6FC] shadow-lg ring-1 ring-[#58A6FF]/20'
                    : 'bg-[#0D0F12] border-[#30363D] text-[#8B949E] hover:border-[#58A6FF]/40 hover:text-[#F0F6FC]'
                }`}
              >
                <div className={`mt-0.5 w-4.5 h-4.5 rounded-full border-2 flex items-center justify-center shrink-0 ${draftSkillLevel === 'Newbie' ? 'border-[#58A6FF]' : 'border-[#30363D]'}`}>
                  {draftSkillLevel === 'Newbie' && <div className="w-2.5 h-2.5 rounded-full bg-[#58A6FF]" />}
                </div>
                <div>
                  <div className="font-bold text-sm text-[#F0F6FC] flex items-center gap-2">
                    Newbie Sentry
                  </div>
                  <p className="text-xs text-[#8B949E] mt-1 line-clamp-2">
                    I don't really know much about Cyber Security. Looking forward to starting my journey!
                  </p>
                </div>
              </button>

              <button
                onClick={() => setDraftSkillLevel('Beginner')}
                className={`w-full p-4 rounded-xl text-left border transition-all cursor-pointer flex items-start gap-3.5 ${
                  draftSkillLevel === 'Beginner'
                    ? 'bg-[#58A6FF]/10 border-[#58A6FF] text-[#F0F6FC] shadow-lg ring-1 ring-[#58A6FF]/20'
                    : 'bg-[#0D0F12] border-[#30363D] text-[#8B949E] hover:border-[#58A6FF]/40 hover:text-[#F0F6FC]'
                }`}
              >
                <div className={`mt-0.5 w-4.5 h-4.5 rounded-full border-2 flex items-center justify-center shrink-0 ${draftSkillLevel === 'Beginner' ? 'border-[#58A6FF]' : 'border-[#30363D]'}`}>
                  {draftSkillLevel === 'Beginner' && <div className="w-2.5 h-2.5 rounded-full bg-[#58A6FF]" />}
                </div>
                <div>
                  <div className="font-bold text-sm text-[#F0F6FC] flex items-center gap-2">
                    Beginner Defender
                  </div>
                  <p className="text-xs text-[#8B949E] mt-1 line-clamp-2">
                    I know a bit about Cyber Security, but I'd like to learn more!
                  </p>
                </div>
              </button>

              <button
                onClick={() => setDraftSkillLevel('Intermediate')}
                className={`w-full p-4 rounded-xl text-left border transition-all cursor-pointer flex items-start gap-3.5 ${
                  draftSkillLevel === 'Intermediate'
                    ? 'bg-[#58A6FF]/10 border-[#58A6FF] text-[#F0F6FC] shadow-lg ring-1 ring-[#58A6FF]/20'
                    : 'bg-[#0D0F12] border-[#30363D] text-[#8B949E] hover:border-[#58A6FF]/40 hover:text-[#F0F6FC]'
                }`}
              >
                <div className={`mt-0.5 w-4.5 h-4.5 rounded-full border-2 flex items-center justify-center shrink-0 ${draftSkillLevel === 'Intermediate' ? 'border-[#58A6FF]' : 'border-[#30363D]'}`}>
                  {draftSkillLevel === 'Intermediate' && <div className="w-2.5 h-2.5 rounded-full bg-[#58A6FF]" />}
                </div>
                <div>
                  <div className="font-bold text-sm text-[#F0F6FC] flex items-center gap-2">
                    Intermediate Operator
                  </div>
                  <p className="text-xs text-[#8B949E] mt-1 line-clamp-2">
                    I know a lot about Cyber Security. But I'd still like to test the app.
                  </p>
                </div>
              </button>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setDraftSkillLevel(profile.selectedLevel || 'Newbie');
                  setShowSkillModal(false);
                }}
                className="flex-1 py-3 px-4 bg-[#30363D] hover:bg-[#30363D]/80 text-[#F0F6FC] font-bold text-sm rounded-xl transition-all cursor-pointer shadow-sm"
              >
                Cancel
              </button>
              <button
                onClick={(e) => {
                  setShowSkillModal(false);
                  handleSaveProfile(e); // Autosave the changes using the regular save pipeline
                }}
                className="flex-1 py-3 px-4 bg-[#58A6FF] hover:bg-[#58A6FF]/90 text-[#0D0F12] font-bold text-sm rounded-xl transition-all shadow-[0_0_15px_rgba(88,166,255,0.4)] cursor-pointer"
              >
                Save Choice
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Sign Out Confirmation Modal */}
      {showSignOutConfirm && (
        <div className="fixed inset-0 bg-[#0D0F12]/85 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#161B22] border border-[#30363D] rounded-2xl max-w-sm w-full p-6 shadow-2xl relative space-y-6 flex flex-col text-center text-[#E2E8F0]"
          >
            <div className="mx-auto w-12 h-12 bg-[#30363D]/40 rounded-full flex items-center justify-center mb-2 text-[#8B949E]">
              <LogOut className="w-6 h-6 border-[#30363D]/40 text-[#8B949E]" />
            </div>
            <div>
              <h3 className="text-xl font-black text-[#F0F6FC] mb-2">Log Out</h3>
              <p className="text-sm text-[#8B949E] px-4">
                Are you sure you want to log out of your account?
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowSignOutConfirm(false)}
                className="flex-1 py-3 px-4 bg-[#30363D] hover:bg-[#30363D]/80 text-[#F0F6FC] font-bold text-sm rounded-xl transition-all cursor-pointer shadow-sm"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  try {
                    await signOut(auth);
                    localStorage.removeItem('defender_quest_profile');
                    window.location.reload();
                  } catch (e) {
                    console.error("Sign out fail", e);
                  }
                }}
                className="flex-1 py-3 px-4 bg-red-600 hover:bg-red-500 text-white font-bold text-sm rounded-xl transition-all shadow-md cursor-pointer"
              >
                Log Out
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 bg-[#0D0F12]/85 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#161B22] border border-[#30363D] rounded-2xl max-w-sm w-full p-6 shadow-2xl relative space-y-6 flex flex-col text-center text-[#E2E8F0]"
          >
            <div className="mx-auto bg-[#F85149]/10 p-3 rounded-full border border-[#F85149]/30">
              <RotateCcw className="w-6 h-6 text-[#F85149]" />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-lg font-bold text-[#F0F6FC]">Reset Profile?</h2>
              <p className="text-xs text-[#8B949E] leading-relaxed">
                Are you sure you want to reset all progress? Your username, avatar, and university will be kept, but your levels, XP, and badges will be permanently deleted. You will return to the introduction.
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 py-2.5 bg-[#30363D] hover:bg-[#30363D]/80 text-[#F0F6FC] rounded-lg text-xs font-bold transition-all cursor-pointer shadow-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowResetConfirm(false);
                  onReset();
                  setShowResetSuccess(true);
                }}
                className="flex-1 py-2.5 bg-[#F85149] hover:bg-[#F85149]/90 text-white rounded-lg text-xs font-bold transition-all cursor-pointer shadow-sm"
              >
                Confirm Reset
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Reset Success Modal */}
      {showResetSuccess && (
        <div className="fixed inset-0 bg-[#0D0F12]/85 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#161B22] border border-[#30363D] rounded-2xl max-w-sm w-full p-6 shadow-2xl relative space-y-6 flex flex-col text-center text-[#E2E8F0]"
          >
            <div className="mx-auto bg-[#3FB950]/10 p-3 rounded-full border border-[#3FB950]/30">
              <Sparkles className="w-6 h-6 text-[#3FB950]" />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-lg font-bold text-[#F0F6FC]">Data Reset Complete</h2>
              <p className="text-xs text-[#8B949E] leading-relaxed">
                Your memory has been wiped clean. Your progress has been reset successfully.
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  setShowResetSuccess(false);
                  setTab('dashboard');
                }}
                className="w-full py-2.5 bg-[#58A6FF] hover:bg-[#58A6FF]/90 text-[#0D0F12] rounded-lg text-xs font-bold transition-all cursor-pointer shadow-sm"
              >
                Go to Dashboard
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Text Content Modal */}
      {textModal && (
        <div className="fixed inset-0 bg-[#0D0F12]/85 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#161B22] border border-[#30363D] rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative flex flex-col text-[#E2E8F0] max-h-[80vh]"
          >
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-[#30363D]">
              <div className="flex items-center gap-2">
                {textModal.title === 'About' ? (
                   <Info className="w-5 h-5 text-[#58A6FF]" />
                ) : (
                   <ShieldCheck className="w-5 h-5 text-[#58A6FF]" />
                )}
                <h2 className="text-xl font-bold text-[#F0F6FC]">{textModal.title}</h2>
              </div>
              <button 
                onClick={() => setTextModal(null)}
                className="text-[#8B949E] hover:text-[#F0F6FC] transition-colors bg-[#30363D]/40 hover:bg-[#30363D]/80 rounded-full p-1"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="overflow-y-auto pr-2 space-y-4 text-[#8B949E] text-sm leading-relaxed whitespace-pre-wrap flex-1 min-h-[100px]">
              {textModal.text}
            </div>
            
            <div className="mt-6 pt-4 border-t border-[#30363D] flex justify-end">
               <button
                 onClick={() => setTextModal(null)}
                 className="py-2.5 px-6 bg-[#30363D] hover:bg-[#30363D]/80 text-[#F0F6FC] font-bold text-sm rounded-xl transition-all cursor-pointer"
               >
                 Close
               </button>
            </div>
          </motion.div>
        </div>
      )}

    </motion.div>
  );
}
