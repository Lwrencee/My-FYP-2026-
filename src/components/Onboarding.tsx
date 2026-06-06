/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  Sparkles, 
  Wand2, 
  GraduationCap, 
  ArrowRight, 
  Upload, 
  Image as ImageIcon, 
  CheckCircle2, 
  X,
  Target,
  Trophy,
  BookOpen
} from 'lucide-react';
import { AVATARS, NIGERIAN_UNIVERSITIES } from '../data';
import { UserProfile } from '../types';
import PixelAvatar from './PixelAvatar';
import { auth, db, handleFirestoreError, OperationType } from '../lib/firebase';
import { signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

interface OnboardingProps {
  onComplete: (profile: UserProfile) => void;
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [authMode, setAuthMode] = useState<'select' | 'email-signup' | 'email-signin' | 'forgot-password'>('select');
  const [email, setEmail] = useState('');
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [name, setName] = useState('');
  const [selectedUniversity, setSelectedUniversity] = useState('Caleb University');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const [error, setError] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const randomNames = [
    'GhostProtocol',
    'ShadowBanist',
    'CryptoViper',
    'BlackOpsByte',
    'CyberPhantom',
    'OverdriveLock',
    'StaticVoid',
    'NetAssassin',
    'SpellKeeper',
    'HexBreaker',
    'RuneWarden',
    'ShadowMage',
    'AegisSorcerer',
    'AstralKnight',
    'VoidAlchemist',
    'JejeWarden',
    'AlafiaShield',
    'QuietGbona',
    'CoolKpari',
    'SoftSentry',
    'OdogwuGrid',
    'AsikoLock',
    'PlasmaWard',
    'PhotonSentry',
    'PulseBarrier',
    'VectorLaser',
    'KineticShield',
    'QuantumLock',
    'ArcWarden',
    'HelixDefender'
  ];

  const handleGenerateName = () => {
    const randomIndex = Math.floor(Math.random() * randomNames.length);
    const randomSuffix = Math.floor(100 + Math.random() * 899);
    setName(`${randomNames[randomIndex]}${randomSuffix}`);
    setError('');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Selected file is not an image. Guided upload supports jpg, png, and webp format.');
      return;
    }
    // Limit to ~2MB for local storage efficiency
    if (file.size > 2.5 * 1024 * 1024) {
      setError('Image is too large. Choose a file under 2.5MB for offline rendering cache.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setUploadedImage(event.target.result as string);
        setError('');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleRemoveImage = () => {
    setUploadedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = name.trim();
    if (!cleanName) {
      setError('Please provide a unique Sentry Defender Name');
      return;
    }
    if (cleanName.length < 3) {
      setError('Defender Name must be at least 3 characters long');
      return;
    }

    // Determine avatar ID:
    // If user uploaded an image, it is stored as the avatarId directly.
    // If not, randomly select one of the pixel-art IDs ('1' to '7')
    let finalAvatarId = '';
    if (uploadedImage) {
      finalAvatarId = uploadedImage;
    } else {
      const pixelArtIds = ['1', '2', '3', '4', '5', '6', '7'];
      const randomIdx = Math.floor(Math.random() * pixelArtIds.length);
      finalAvatarId = pixelArtIds[randomIdx];
    }

    const initialProfile: UserProfile = {
      defenderName: cleanName,
      avatarId: finalAvatarId,
      xp: 50, // Welcome bonus!
      level: 1,
      streak: 1,
      badges: ['badge-welcome'],
      completedQuizzes: [],
      completedChecklist: [],
      completedGames: [],
      university: selectedUniversity
    };

    onComplete(initialProfile);
  };

  return (
    <div className="min-h-screen bg-[#0D0F12] flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 font-sans text-[#E2E8F0] relative overflow-hidden">
      
      {/* Decorative Grid Overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(56,139,253,0.12),rgba(13,15,18,0))]" />
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#30363D] to-transparent" />

      <AnimatePresence mode="wait">
        {step === 1 ? (
          /* STEP 1: WELCOME SCREEN */
          <motion.div
            key="welcome"
            initial={{ opacity: 0, scale: 0.97, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.35 }}
            className="max-w-2xl w-full bg-[#161B22] p-6 sm:p-10 rounded-2xl border border-[#30363D] shadow-2xl relative z-10 space-y-8 flex flex-col items-center"
          >
            <div className="text-center space-y-3 max-w-lg">
              <div className="mx-auto h-16 w-16 bg-[#58A6FF]/10 border border-[#58A6FF]/20 flex items-center justify-center rounded-2xl text-[#58A6FF] shadow-inner mb-4">
                <Shield className="h-9 w-9 animate-pulse" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-[#F0F6FC]">
                AegisAcademy
              </h1>
              <p className="text-sm text-[#8B949E] leading-relaxed">
                <em>An interactive training platform that translates complex cybersecurity into fast, bite-sized lessons and mobile mini-games. Step into the training ground today and build strong, daily digital defense habits.</em>
              </p>
            </div>

            <div className="w-full pt-4 border-t border-[#30363D]">
              {authMode === 'select' ? (
                <div className="flex flex-col gap-3">
                  <button
                    disabled={authLoading}
                    onClick={async () => {
                      setAuthLoading(true);
                      try {
                        const provider = new GoogleAuthProvider();
                        const result = await signInWithPopup(auth, provider);
                        try {
                          const userDoc = await getDoc(doc(db, 'users', result.user.uid));
                          if (!userDoc.exists()) {
                             setStep(2);
                          }
                        } catch (e) {
                          handleFirestoreError(e, OperationType.GET, `users/${result.user.uid}`);
                        }
                      } catch (e) {
                        console.error("Sign in failed", e);
                      } finally {
                        setAuthLoading(false);
                      }
                    }}
                    className="w-full px-6 py-3.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-900 font-black text-sm rounded-xl shadow-sm flex items-center justify-center gap-3 transition-all cursor-pointer disabled:opacity-50 dark:bg-[#E2E8F0] dark:border-transparent"
                  >
                    <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    Sign-in with Google
                  </button>
                  <div className="flex gap-3">
                    <button
                      onClick={() => { setAuthMode('email-signup'); setAuthError(''); setEmail(''); setPassword(''); }}
                      className="flex-1 px-6 py-3.5 bg-[#30363D] border border-[#30363D] hover:bg-[#30363D]/80 text-[#F0F6FC] font-black text-sm rounded-xl shadow-sm transition-all cursor-pointer"
                    >
                      Sign Up with Email
                    </button>
                    <button
                      onClick={() => { setAuthMode('email-signin'); setAuthError(''); setEmail(''); setPassword(''); }}
                      className="flex-1 px-6 py-3.5 bg-transparent border border-[#30363D] hover:bg-[#30363D]/80 text-[#E2E8F0] font-black text-sm rounded-xl shadow-sm transition-all cursor-pointer"
                    >
                      Sign In with Email
                    </button>
                  </div>
                </div>
              ) : (
                <form 
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setAuthError('');
                    setAuthLoading(true);
                    try {
                      let authEmail = email.trim();
                      if (authEmail.toLowerCase() === 'admin') {
                        authEmail = 'admin@aegisacademy.com';
                      } else if (!authEmail.includes('@')) {
                        authEmail = `${authEmail}@aegisacademy.com`;
                      }

                      if (authMode === 'forgot-password') {
                        await sendPasswordResetEmail(auth, authEmail);
                        setResetEmailSent(true);
                        setAuthLoading(false);
                        return;
                      }

                      if (authMode === 'email-signup') {
                        const cred = await createUserWithEmailAndPassword(auth, authEmail, password);
                        setStep(2);
                      } else {
                        const cred = await signInWithEmailAndPassword(auth, authEmail, password);
                        // If it's admin, the App component will handle routing so we just wait.
                        if (cred.user.email !== 'admin@aegisacademy.com') {
                          try {
                            const userDoc = await getDoc(doc(db, 'users', cred.user.uid));
                            if (!userDoc.exists()) setStep(2);
                          } catch (e) {}
                        }
                      }
                    } catch (e: any) {
                      if (e.code === 'auth/operation-not-allowed') {
                        setAuthError('Email/Password auth is disabled. Please enable it in your Firebase Console (Authentication > Sign-in Method).');
                      } else if (e.code === 'auth/invalid-credential') {
                         setAuthError('Invalid credentials. If this is your first time, please use Sign Up instead.');
                      } else {
                        setAuthError(e.message || "Authentication Error");
                      }
                    } finally {
                      setAuthLoading(false);
                    }
                  }}
                  className="flex flex-col gap-4"
                >
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="text-sm font-bold text-[#F0F6FC]">
                      {authMode === 'forgot-password' ? 'Reset Password' : authMode === 'email-signup' ? 'Create an Account' : 'Sign in to Account'}
                    </h3>
                    <button 
                      type="button" 
                      onClick={() => { setAuthMode('select'); setResetEmailSent(false); setAuthError(''); setEmail(''); setPassword(''); }}
                      className="text-xs text-[#8B949E] hover:text-[#F0F6FC] transition-colors cursor-pointer font-semibold underline"
                    >
                      Back to options
                    </button>
                  </div>
                  
                  {authError && <div className="text-xs text-[#F85149] bg-[#F85149]/10 p-2 rounded-lg border border-[#F85149]/30 font-semibold">{authError}</div>}
                  
                  <input
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email or username"
                    className="w-full px-4 py-3 bg-[#0D0F12] border border-[#30363D] rounded-lg text-[#F0F6FC] placeholder-[#8B949E] focus:outline-none focus:ring-2 focus:ring-[#58A6FF]/20 focus:border-[#58A6FF] text-sm font-semibold"
                  />
                  {authMode !== 'forgot-password' && (
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                      className="w-full px-4 py-3 bg-[#0D0F12] border border-[#30363D] rounded-lg text-[#F0F6FC] placeholder-[#8B949E] focus:outline-none focus:ring-2 focus:ring-[#58A6FF]/20 focus:border-[#58A6FF] text-sm font-semibold"
                    />
                  )}
                  {(authMode === 'email-signin' || authMode === 'email-signup') && (
                    <div className="flex justify-end -mt-2">
                       <button 
                         type="button"
                         onClick={() => { setAuthMode('forgot-password'); setAuthError(''); setResetEmailSent(false); setEmail(''); setPassword(''); }}
                         className="text-xs text-[#58A6FF] hover:text-[#58A6FF]/80 font-medium cursor-pointer"
                       >
                         Forgot Password?
                       </button>
                    </div>
                  )}
                  {resetEmailSent && authMode === 'forgot-password' ? (
                    <div className="text-sm text-[#3FB950] font-semibold text-center mt-2 border border-[#3FB950]/30 bg-[#3FB950]/10 p-3 rounded-lg flex items-center justify-center gap-2">
                       <CheckCircle2 className="w-5 h-5" />
                       Password reset link sent!
                    </div>
                  ) : (
                    <button
                      type="submit"
                      disabled={authLoading}
                      className="w-full px-6 py-3.5 bg-[#58A6FF] hover:bg-[#58A6FF]/90 text-[#0D0F12] font-black text-sm rounded-xl shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 mt-2"
                    >
                      {authLoading ? 'Please wait...' : authMode === 'forgot-password' ? 'Send Reset Link' : authMode === 'email-signup' ? 'Sign Up' : 'Sign In'}
                      {!authLoading && authMode !== 'forgot-password' && <ArrowRight className="w-4 h-4" />}
                    </button>
                  )}
                </form>
              )}
            </div>
          </motion.div>
        ) : (
          /* STEP 2: PROFILE SETUP & IMAGE UPLOAD */
          <motion.div
            key="profile-setup"
            initial={{ opacity: 0, scale: 0.97, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.35 }}
            className="max-w-lg w-full bg-[#161B22] p-6 sm:p-9 rounded-2xl border border-[#30363D] shadow-2xl relative z-10 space-y-6"
          >
            <div className="flex items-center justify-between border-b border-[#30363D] pb-4">
              <div>
                <h2 className="text-2xl font-black text-[#F0F6FC] mt-0.5">Initialize Sentry Identity</h2>
              </div>
              <button
                onClick={() => setStep(1)}
                className="p-1 text-[#8B949E] hover:text-[#F0F6FC] transition-colors rounded-lg bg-[#0D0F12] border border-[#30363D] cursor-pointer text-xs font-bold"
              >
                Back
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                
                {/* 1. Defender Name Select */}
                <div>
                  <label htmlFor="defender-name" className="block text-xs font-bold text-[#8B949E] uppercase tracking-wider mb-2">
                    Your Defender Name (Username)
                  </label>
                  <div className="relative rounded-lg flex gap-2">
                    <input
                      id="defender-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value.replace(/[^a-zA-Z0-9_]/g, '')); // alphanumeric + underscore only
                        setError('');
                      }}
                      placeholder="e.g. DefenderMax"
                      className="block w-full px-4 py-3 bg-[#0D0F12] border border-[#30363D] rounded-lg text-[#F0F6FC] placeholder-[#8B949E] placeholder-opacity-50 focus:outline-none focus:ring-2 focus:ring-[#58A6FF]/20 focus:border-[#58A6FF] transition-all text-sm font-semibold"
                    />
                    <button
                      type="button"
                      onClick={handleGenerateName}
                      className="px-3.5 py-2 bg-[#30363D] hover:bg-[#30363D]/80 text-[#F0F6FC] rounded-lg border border-[#30363D] transition-colors flex items-center gap-1.5 text-xs font-semibold shrink-0 cursor-pointer"
                      title="Generate random username"
                    >
                      <Wand2 className="h-3.5 w-3.5 text-[#58A6FF]" />
                      Auto Name
                    </button>
                  </div>
                  {error && (
                    <p className="text-xs text-[#F85149] mt-1.5 font-semibold">{error}</p>
                  )}
                </div>

                {/* 2. University Selection Dropdown */}
                <div>
                  <label htmlFor="university" className="block text-xs font-bold text-[#8B949E] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-[#58A6FF]" />
                    Your Institution / University
                  </label>
                  <select
                    id="university"
                    value={selectedUniversity}
                    onChange={(e) => setSelectedUniversity(e.target.value)}
                    className="block w-full px-4 py-3 bg-[#0D0F12] border border-[#30363D] rounded-lg text-[#F0F6FC] focus:outline-none focus:ring-2 focus:ring-[#58A6FF]/20 focus:border-[#58A6FF] transition-all text-sm font-semibold select-none cursor-pointer"
                  >
                    {NIGERIAN_UNIVERSITIES.map((uni) => (
                      <option key={uni} value={uni} className="bg-[#161B22] text-[#E2E8F0]">
                        {uni}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 3. OPTIONAL IMAGE UPLOAD (Supports Drag & Drop + Manual Select) */}
                <div>
                  <label className="block text-xs font-bold text-[#8B949E] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-[#58A6FF]" />
                    Custom Sentry Photo (Optional)
                  </label>
                  
                  <div
                    onDragEnter={handleDrag}
                    onDragOver={handleDrag}
                    onDragLeave={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center gap-3 transition-all cursor-pointer text-center relative ${
                      isDragActive 
                        ? 'border-[#58A6FF] bg-[#58A6FF]/5' 
                        : 'border-[#30363D] bg-[#0D0F12] bg-opacity-40 hover:bg-[#0D0F12] border-opacity-40 hover:border-opacity-100 hover:border-[#8B949E]'
                    }`}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/*"
                      className="hidden"
                    />

                    {uploadedImage ? (
                      /* If image uploaded, show dynamic visual preview */
                      <div className="flex items-center gap-4 w-full px-2" onClick={(e) => e.stopPropagation()}>
                        <img 
                          src={uploadedImage} 
                          alt="Custom Avatar Preview" 
                          className="w-16 h-16 rounded-xl object-cover border border-[#30363D]" 
                        />
                        <div className="text-left flex-1 min-w-0">
                          <p className="text-xs font-bold text-[#3FB950] flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Completed Upload
                          </p>
                          <p className="text-[10px] text-[#8B949E] mt-0.5 truncate max-w-[200px]">
                            Saved custom file to local browser cache!
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className="p-1.5 hover:bg-slate-800 rounded-lg text-[#F85149] border border-transparent hover:border-[#F85149]/30 transition-all cursor-pointer"
                          title="Remove custom photo"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      /* Drag & Drop Prompt */
                      <>
                        <div className="w-10 h-10 rounded-full bg-[#161B22] border border-[#30363D] flex items-center justify-center text-[#8B949E]">
                          <Upload className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-[#F0F6FC]">
                            Drag & drop your photo, or <span className="text-[#58A6FF] underline">browse documents</span>
                          </p>
                          <p className="text-[10px] text-[#8B949E] mt-1 font-medium">
                            Not compulsory. If skipped, we will randomly assign a custom pixel-art cadet mascot!
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>

              </div>

              <div className="pt-4 border-t border-[#30363D]">
                <button
                  type="submit"
                  className="w-full flex justify-center items-center gap-2 py-3.5 px-4 rounded-xl text-sm font-bold text-[#0D0F12] bg-[#58A6FF] hover:bg-[#58A6FF]/90 active:scale-[0.98] shadow-md transition-all duration-150 cursor-pointer"
                >
                  <Sparkles className="h-4 w-4" />
                  Initialize Sentry Master & Begin Quest
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
