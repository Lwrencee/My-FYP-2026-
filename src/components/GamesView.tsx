/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Dice5, 
  RotateCcw, 
  Search, 
  KeyRound, 
  Lock, 
  AlertCircle, 
  CheckCircle2, 
  XCircle, 
  ChevronRight, 
  Sparkles, 
  Smartphone, 
  ShieldAlert, 
  ArrowRight,
  HelpCircle,
  TrendingUp,
  Award,
  Trophy,
  Play,
  Pause
} from 'lucide-react';
import { UserProfile, PhishingScenario, BoardCell } from '../types';
import { PHISHING_SCENARIOS, BOARD_CELLS, calculateLevelFromXP } from '../data';
import RaceToServersGame from './RaceToServersGame';
import CrypticPulseGame from './CrypticPulseGame';
import PasswordTester from './PasswordTester';

interface GamesViewProps {
  profile: UserProfile;
  updateProfile: (profile: UserProfile | ((prev: UserProfile) => UserProfile)) => void;
  theme?: 'light' | 'dark';
  onActiveStateChange?: (isActive: boolean) => void;
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

export default function GamesView({ profile, updateProfile, theme = 'dark', onActiveStateChange }: GamesViewProps) {
  const [activeSubMode, setActiveSubMode] = useState<'menu' | 'phish' | 'snakes' | 'cryptic' | 'password'>('menu');

  useEffect(() => {
    if (onActiveStateChange) {
      onActiveStateChange(activeSubMode !== 'menu');
    }
  }, [activeSubMode, onActiveStateChange]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [activeSubMode]);

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6 font-sans text-[#E2E8F0]"
    >
      
      {/* Interactive Sub Header */}
      {activeSubMode === 'menu' && (
        <motion.div variants={itemVariants} className={`flex items-center justify-between pb-3 border-b ${theme === 'light' ? 'border-slate-200' : 'border-[#30363D]'}`}>
          <div>
            <h2 className={`text-xl font-bold ${theme === 'light' ? 'text-slate-900' : 'text-[#F0F6FC]'}`}>Defensive Gamification Hub</h2>
            <p className={`text-xs mt-1 ${theme === 'light' ? 'text-slate-600' : 'text-[#8B949E]'}`}>Interactive challenges testing your theoretical Knowledge.</p>
          </div>
        </motion.div>
      )}

      <AnimatePresence mode="wait">
        {activeSubMode === 'menu' && (
          <motion.div
            key="menu"
            variants={containerVariants}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {/* Game 1 Selector */}
            <motion.div variants={itemVariants} className={`border rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between h-auto md:min-h-[320px] ${theme === 'light' ? 'bg-white border-slate-200' : 'bg-[#161B22] border-[#30363D]'}`}>
              <div>
                <div className="w-12 h-12 rounded-xl bg-orange-500/15 border border-orange-500/30 text-orange-400 flex items-center justify-center mb-4">
                  <span className="text-2xl select-none">🎣</span>
                </div>
                <h3 className={`text-lg font-bold ${theme === 'light' ? 'text-slate-900' : 'text-[#F0F6FC]'}`}>Phish Tank</h3>
                <p className={`text-xs mt-1 ${theme === 'light' ? 'text-slate-500' : 'text-[#8B949E]'}`}>
                  Inspect suspicious emails and WhatsApp forwards. Decide whether they are legitimate communications or phishing setups targeting undergraduate students.
                </p>
                <div className="flex gap-1.5 mt-3 mb-4">
                  <span className="text-[10px] bg-orange-500/15 text-orange-600 px-2 py-0.5 rounded-full font-bold">Nigeria Themed</span>
                </div>
              </div>
              <button
                onClick={() => setActiveSubMode('phish')}
                className="w-full text-center py-2.5 bg-orange-600 hover:bg-orange-500 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer border border-transparent"
              >
                Launch Phish Tank
              </button>
            </motion.div>

            {/* Game 2 Selector */}
            <motion.div 
              variants={itemVariants} 
              className={`rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between h-auto md:min-h-[320px] ${
                theme === 'light' ? 'bg-white border border-slate-200' : 'bg-[#161B22] border border-[#30363D]'
              }`}
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-500 flex items-center justify-center mb-4">
                  <Dice5 className="w-6 h-6 animate-pulse" />
                </div>
                <h3 className={`text-lg font-bold ${theme === 'light' ? 'text-slate-900' : 'text-[#F0F6FC]'}`}>
                  Race to the School Servers! (Snakes & Ladders)
                </h3>
                <p className={`text-xs mt-1 lines-clamp-3 ${theme === 'light' ? 'text-slate-600' : 'text-[#8B949E]'}`}>
                  A thrilling Board Game Race against a hacker bot! Answer secure-action questions to trigger shortcut boosts (Ladders) or defend against slip risks (Snakes) to lock down square 100 first!
                </p>
                <div className="flex gap-1.5 mt-3 mb-4">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    theme === 'light' ? 'bg-blue-100 text-blue-800' : 'bg-blue-500/10 text-blue-400'
                  }`}>Interactive Board Game</span>
                </div>
              </div>
              <button
                onClick={() => setActiveSubMode('snakes')}
                className="w-full text-center py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer border border-transparent"
              >
                Launch Server Race
              </button>
            </motion.div>
            {/* Game 3 Selector */}
            <motion.div 
              variants={itemVariants} 
              className={`rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between h-auto md:min-h-[320px] ${
                theme === 'light' ? 'bg-white border border-slate-200' : 'bg-[#161B22] border border-[#30363D]'
              }`}
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/30 text-fuchsia-500 flex items-center justify-center mb-4">
                  <KeyRound className="w-6 h-6 animate-pulse" />
                </div>
                <h3 className={`text-lg font-bold ${theme === 'light' ? 'text-slate-900' : 'text-[#F0F6FC]'}`}>
                  Operation: Cryptic Pulse
                </h3>
                <p className={`text-xs mt-1 lines-clamp-3 ${theme === 'light' ? 'text-slate-600' : 'text-[#8B949E]'}`}>
                  Act as an encryption engine against a ticking clock! Scramble outbound data or descramble incoming emergency instructions before the hacker sniffs the packets.
                </p>
                <div className="flex gap-1.5 mt-3 mb-4">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    theme === 'light' ? 'bg-fuchsia-100 text-fuchsia-800' : 'bg-fuchsia-500/10 text-fuchsia-400'
                  }`}>Speed Typing</span>
                </div>
              </div>
              <button
                onClick={() => setActiveSubMode('cryptic')}
                className="w-full text-center py-2.5 bg-fuchsia-600 hover:bg-fuchsia-500 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer border border-transparent"
              >
                Launch Cryptic Pulse
              </button>
            </motion.div>

            {/* Game 4 Selector (Password Tester) */}
            <motion.div 
              variants={itemVariants} 
              className={`rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between h-auto md:min-h-[320px] ${
                theme === 'light' ? 'bg-white border border-slate-200' : 'bg-[#161B22] border border-[#30363D]'
              }`}
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/30 text-green-500 flex items-center justify-center mb-4">
                  <Lock className="w-6 h-6" />
                </div>
                <h3 className={`text-lg font-bold ${theme === 'light' ? 'text-slate-900' : 'text-[#F0F6FC]'}`}>
                  Password Tester 
                </h3>
                <p className={`text-xs mt-1 lines-clamp-3 ${theme === 'light' ? 'text-slate-600' : 'text-[#8B949E]'}`}>
                  Test your password resilience safely offline against simulated hacking computer rigs. See how fast different setups can crack your keys.
                </p>
                <div className="flex gap-1.5 mt-3 mb-4">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    theme === 'light' ? 'bg-green-100 text-green-800' : 'bg-green-500/10 text-green-400'
                  }`}>Testing Simulator</span>
                </div>
              </div>
              <button
                onClick={() => setActiveSubMode('password')}
                className="w-full text-center py-2.5 bg-green-600 hover:bg-green-500 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer border border-transparent"
              >
                Launch Password Tester
              </button>
            </motion.div>
          </motion.div>
        )}

        {/* ===================== GAME 1: PHISH FINDER ===================== */}
        {activeSubMode === 'phish' && (
          <div className="space-y-4">
            <button
              onClick={() => setActiveSubMode('menu')}
              className={`px-4 py-2 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                theme === 'light' 
                  ? 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200' 
                  : 'bg-[#21262D] border-[#30363D] text-[#C9D1D9] hover:bg-[#30363D]'
              }`}
            >
              ← Back to Games Menu
            </button>
            <PhishFinderGame updateProfile={updateProfile} profile={profile} theme={theme} onQuit={() => setActiveSubMode('menu')} />
          </div>
        )}

        {/* ===================== GAME 2: RACE TO THE SCHOOL SERVERS ===================== */}
        {activeSubMode === 'snakes' && (
          <div className="space-y-4">
            <button
              onClick={() => setActiveSubMode('menu')}
              className={`px-4 py-2 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                theme === 'light' 
                  ? 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200' 
                  : 'bg-[#21262D] border-[#30363D] text-[#C9D1D9] hover:bg-[#30363D]'
              }`}
            >
              ← Back to Games Menu
            </button>
            <RaceToServersGame updateProfile={updateProfile} profile={profile} theme={theme} onQuit={() => setActiveSubMode('menu')} />
          </div>
        )}

        {/* ===================== GAME 3: CRYPTIC PULSE ===================== */}
        {activeSubMode === 'cryptic' && (
          <div className="space-y-4">
            <button
              onClick={() => setActiveSubMode('menu')}
              className={`px-4 py-2 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                theme === 'light' 
                  ? 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200' 
                  : 'bg-[#21262D] border-[#30363D] text-[#C9D1D9] hover:bg-[#30363D]'
              }`}
            >
              ← Back to Games Menu
            </button>
            <CrypticPulseGame updateProfile={updateProfile} profile={profile} theme={theme} onQuit={() => setActiveSubMode('menu')} />
          </div>
        )}

        {/* ===================== GAME 4: PASSWORD TESTER ===================== */}
        {activeSubMode === 'password' && (
          <div className="space-y-4">
            <button
              onClick={() => setActiveSubMode('menu')}
              className={`px-4 py-2 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                theme === 'light' 
                  ? 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200' 
                  : 'bg-[#21262D] border-[#30363D] text-[#C9D1D9] hover:bg-[#30363D]'
              }`}
            >
              ← Back to Games Menu
            </button>
            <PasswordTester profile={profile} updateProfile={updateProfile} theme={theme} />
          </div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}

// ==========================================
// SUB GAME 1: PHISHTANK IMPLEMENTATION
// ==========================================

const REINFORCEMENT_CASES: Record<string, {
  concept: string;
  sender: string;
  senderEmail: string;
  subject: string;
  body: string;
  isPhishing: boolean;
  explanation: string;
  clues: string[];
}> = {
  'level-1-phish': {
    concept: 'Sender Domain Spelling Typos',
    sender: 'Caleb Support Sentry',
    senderEmail: 'support@calebun1versity.edu.ng',
    subject: 'Exam verification required immediately',
    body: 'Verify your ID card at our registration desk link: http://calebun1versity.edu.ng/verify',
    isPhishing: true,
    explanation: 'Notice the spelling mistake "calebun1versity" which uses the number "1" instead of the letter "i". Scammers make small spelling changes to trick you.',
    clues: ['Spelling typo "calebun1versity" (using number "1") in its domain.']
  },
  'level-1-safe': {
    concept: 'Legitimate Sender Account Domain',
    sender: 'Netflix Alerting',
    senderEmail: 'alert@account.netflix.com',
    subject: 'Your password was successfully updated',
    body: 'The login password connected to your Netflix account has been set to a new passphrase.',
    isPhishing: false,
    explanation: 'This address ends with "netflix.com" which is the official website of the real business with no spelling errors.',
    clues: ['Proper sub-domain "account.netflix.com" of the official brand netflix.com.']
  },
  'level-2-phish': {
    concept: 'Hyperlink Redirect to External Domains',
    sender: 'Financial Clearance Office',
    senderEmail: 'clearance@unilag.edu.ng',
    subject: 'Verify tuition deposits online',
    body: 'We are reviewing student accounts. View your outstanding portal ledger on: http://unilag-ledger-status.com/pay',
    isPhishing: true,
    explanation: 'The website link takes you to "unilag-ledger-status.com" instead of your real school website address.',
    clues: ['Directs traffic to unilag-ledger-status.com which is not part of unilag.edu.ng.']
  },
  'level-2-safe': {
    concept: 'Lobby Subdomain URL Verification',
    sender: 'UI Portal Sentry',
    senderEmail: 'help@portal.ui.edu.ng',
    subject: 'Course booking registration confirmation',
    body: 'Inspect your active semester listings at the standard portal line: https://portal.ui.edu.ng/courses',
    isPhishing: false,
    explanation: 'This link is safe and secure. It goes straight to the real university portal website.',
    clues: ['Correct HTTPS schema used with official university portal subdomain ui.edu.ng.']
  },
  'level-3-phish': {
    concept: 'High-Pressure Psychological Threat Tone',
    sender: 'Security Patrol Bot',
    senderEmail: 'alerts@sys-security-verify.co',
    subject: 'DEVICE LOCK DETECTED WITHIN 5 MINUTES',
    body: '"We noted an active malware on your system. You must click verify within 5 minutes or your account access will be terminated forever!"',
    isPhishing: true,
    explanation: 'Demanding that you do something in 5 minutes is a scary speed trap. Scammers use immediate deadlines to pressure and panic you so you act without thinking.',
    clues: ['Highly pressuring tone demanding compliance within an extremely short 5-minute timeframe.']
  },
  'level-3-safe': {
    concept: 'Calm Standard Administrative Notification',
    sender: 'Google Workspace Desk',
    senderEmail: 'no-reply@accounts.google.com',
    subject: 'Your security alert details',
    body: '"You recently verified a browser sign-in on Windows. If this was you, there is no action needed. If not, please review your dashboard at your earliest convenience."',
    isPhishing: false,
    explanation: 'This notice uses a calm, polite tone. Honest companies ask you to double-check info at your convenience rather than using hostile threats.',
    clues: ['Calm administrative tone giving recommendations rather than hostile threats.']
  },
  'level-4-phish': {
    concept: 'Credential Harvesting Visual QR Trap',
    sender: 'Campus Coffee Hub',
    senderEmail: 'free-gifts-info@yandex.com',
    subject: 'Flyer: Claim N5,000 campus lunch voucher!',
    body: '📷 WALL FLYER NOTICE:\nClaim N5,000 campus lunch voucher! Scan QR Code below now.',
    isPhishing: true,
    explanation: 'Printed flyers with QR codes can be visual traps. QR codes hide the web link so you cannot inspect the website before scanning.',
    clues: ['Baiting students with free cash and hiding the target URL link behind a custom QR code.']
  },
  'level-4-safe': {
    concept: 'Local Device MFA Code Delivery',
    sender: 'Microsoft Authenticator',
    senderEmail: 'no-reply@microsoft.com',
    subject: 'Verification dynamic security digit code',
    body: '📱 DEVICE POPUP ALERT:\nYour Microsoft multi-factor access verification code is: 829-103.',
    isPhishing: false,
    explanation: 'This is a real security message on your screen. It just displays a code number and does not ask you to click links or enter passwords.',
    clues: ['MFA token push notification code with no redirect URLs or suspicious entry actions requested.']
  }
};

const getReinforcementCase = (conceptScenarioId: string) => {
  if (REINFORCEMENT_CASES[conceptScenarioId]) {
    return REINFORCEMENT_CASES[conceptScenarioId];
  }
  const levelScenario = PHISHING_SCENARIOS.find(s => s.id === conceptScenarioId);
  if (levelScenario) {
    const key = `level-${levelScenario.level}-${levelScenario.isPhishing ? 'phish' : 'safe'}`;
    return REINFORCEMENT_CASES[key] || REINFORCEMENT_CASES['level-1-phish'];
  }
  return REINFORCEMENT_CASES['level-1-phish'];
};

const LEVEL_METADATA = [
  {
    id: 1,
    title: "Level 1: Domain Typo Check",
    focus: "Sender address & character spellings",
    description: "Detect hidden lookalike letters, numbers replacing vowels, and typo domains used by phishing operators.",
    xp: 50,
    badge: "🔎 Typo Spotter"
  },
  {
    id: 2,
    title: "Level 2: Tricky Web Links",
    focus: "Hyperlinks & Redirects",
    description: "Learn to spot fake web links hiding in your emails and WhatsApp chats before you click them.",
    xp: 75,
    badge: "🔗 Link Auditor"
  },
  {
    id: 3,
    title: "Level 3: Mind Games",
    focus: "Urgency, Fear, and Secrecy",
    description: "Learn to spot the emotional tricks hackers use—like panic, fake emergencies, and authority figures—to make you react without thinking.",
    xp: 100,
    badge: "🧠 Threat Resistant"
  }
];

const LEVEL_OVERVIEWS: Record<number, { title: string; overview: string; whatToLookFor: string[] }> = {
  1: {
    title: "Level 1: Typo Check",
    overview: "Hackers often use look-alike email addresses and sloppy grammar to trick you into thinking they are a legitimate company.",
    whatToLookFor: [
      "Spelling mistakes",
      "Odd symbols (like a 0 (zero) instead of an 'O' letter)",
      "Suspicious, random sender domains"
    ]
  },
  2: {
    title: "Level 2: Tricky Web Links",
    overview: "Just because a link says \"Google\" or looks legitimate doesn't mean it goes there. Links can easily be masked to take you to dangerous clone sites.",
    whatToLookFor: [
      "Mismatched text links",
      "Hidden redirects",
      "Completely unofficial website domains"
    ]
  },
  3: {
    title: "Level 3: Mind Games",
    overview: "Phishing isn't just a technical trick; it's an emotional one. Attackers want to panic you so you stop thinking critically.",
    whatToLookFor: [
      "Extreme urgency (\"Do this in 10 minutes!\")",
      "Threats of punishment (\"Your account will be deleted\")",
      "Demands for Secrecy (\"Do not let anyone know about this email\")"
    ]
  }
};

function PhishFinderGame({ updateProfile, profile, theme = 'dark', onQuit }: { updateProfile: any; profile: UserProfile; theme?: 'light' | 'dark'; onQuit: () => void }) {
  const [activeScreen, setActiveScreen] = useState<'dashboard' | 'gameplay' | 'victory'>('dashboard');
  const [activeLevel, setActiveLevel] = useState<number | null>(null);
  const [clearedLevels, setClearedLevels] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('phish_cleared_levels_v1');
      if (saved) return JSON.parse(saved);
    } catch {
      return [];
    }
    return [];
  });
  const [tutorialTriggerMode, setTutorialTriggerMode] = useState<'force' | 'manual'>('manual');

  const [currentIdx, setCurrentIdx] = useState(0);
  const [userScore, setUserScore] = useState(0);
  const [checked, setChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [reviewAll, setReviewAll] = useState(false);

  // New game states requested
  const [showHint, setShowHint] = useState(false);
  const [showPause, setShowPause] = useState(false);
  const [showOverviewPopup, setShowOverviewPopup] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [activeScreen, showOverviewPopup, showPause]);
  const [showLevel3Clarification, setShowLevel3Clarification] = useState(false);
  const [hasFailedCurrentLevel, setHasFailedCurrentLevel] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [wrongAttempt, setWrongAttempt] = useState(false);
  const [reinforcementAnswered, setReinforcementAnswered] = useState(false);
  const [reinforcementSelected, setReinforcementSelected] = useState<'phish' | 'safe' | null>(null);
  const [reinforcementCorrect, setReinforcementCorrect] = useState<boolean | null>(null);

  // Dynamic scoring states
  const [scenarioScores, setScenarioScores] = useState<Record<string, number>>({});
  const [failedOnFirstTry, setFailedOnFirstTry] = useState<Record<string, boolean>>({});
  const [earnedXp, setEarnedXp] = useState(0);

  const levelScenarios = activeLevel 
    ? (activeLevel === 1 
        ? PHISHING_SCENARIOS.filter(s => s.level === 1).slice(0, 5) 
        : PHISHING_SCENARIOS.filter(s => s.level === activeLevel))
    : PHISHING_SCENARIOS.filter(s => s.level === 1).slice(0, 5);

  const scenario = levelScenarios[currentIdx] || levelScenarios[0];

  const renderLevel3Clarification = () => {
    if (!showLevel3Clarification) return null;
    return (
      <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[60] flex items-center justify-center p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, translateY: 15, scale: 0.98 }}
          animate={{ opacity: 1, translateY: 0, scale: 1 }}
          className={`max-w-xl w-full p-6 sm:p-8 rounded-3xl border shadow-2xl flex flex-col space-y-5 text-left my-8 select-text ${
            theme === 'light' ? 'bg-white border-slate-200 text-slate-800' : 'bg-[#161B22] border-[#30363D] text-[#E2E8F0]'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-500/10 rounded-2xl text-amber-500">
              💡
            </div>
            <div>
              <span className="text-[10px] font-bold font-mono tracking-wider text-amber-600 dark:text-amber-400 uppercase">
                Level 3 Complete: Critical Insights
              </span>
              <h3 className={`text-xl font-black mt-0.5 ${theme === 'light' ? 'text-slate-900' : 'text-[#F0F6FC]'}`}>
                The Golden Rule
              </h3>
            </div>
          </div>

          <div className={`text-xs sm:text-sm leading-relaxed space-y-4 p-5 rounded-2xl border ${
            theme === 'light' ? 'bg-amber-50/40 border-amber-100 text-slate-700' : 'bg-amber-950/5 border-amber-500/10 text-slate-300'
          }`}>
            <p className="font-semibold text-sm leading-relaxed">
              You just saw how scammers try to scare you into making mistakes. But here is a golden rule to remember:
            </p>
            
            <div className="p-3.5 bg-amber-500/10 border-l-4 border-amber-500 rounded-r-xl font-bold text-xs sm:text-sm text-amber-700 dark:text-amber-400 leading-relaxed">
              Just because a message sounds urgent does not automatically mean it&apos;s a scam!
            </div>

            <p className="text-xs sm:text-sm">
              Your university, department, or bank will occasionally send real, time-sensitive emails. The difference is how you handle them:
            </p>

            <ul className="space-y-3 pl-1">
              <li className="flex items-start gap-2.5">
                <span className="text-orange-550 dark:text-orange-400 font-bold mt-1 select-none">•</span>
                <span>
                  <strong>Don&apos;t Rush:</strong> If an email makes you panic, take a deep breath. Never rush to click links or type your password.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-orange-550 dark:text-orange-400 font-bold mt-1 select-none">•</span>
                <span>
                  <strong>Verify with People You Trust:</strong> If a lecturer or friend supposedly sends an urgent, weird request, call them directly or ask a classmate if they got the same message.
                </span>
              </li>
            </ul>

            <div className="text-xs border-t border-dashed border-slate-250 dark:border-slate-800 pt-3 mt-1 space-y-2">
              <p className="font-bold text-center text-orange-600 dark:text-orange-400 pt-1.5 uppercase tracking-wide text-[10px]">
                🛡️ Scammers rely on you acting fast out of fear. When you slow down, you win.
              </p>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => setShowLevel3Clarification(false)}
              className="w-full py-3 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-black text-xs rounded-xl shadow-md cursor-pointer transition-all active:scale-[0.99] text-center"
            >
              I Understand, Continue
            </button>
          </div>
        </motion.div>
      </div>
    );
  };

  // Dynamic Audio Chimes & Dull Tones using Web Audio Synth API
  const playCorrectSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;
      
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(523.25, now); // C5 note
      gain1.gain.setValueAtTime(0.06, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.12);

      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(659.25, now + 0.08); // E5 note
      gain2.gain.setValueAtTime(0.06, now + 0.08);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.08);
      osc2.stop(now + 0.28);
    } catch (e) {
      console.error(e);
    }
  };

  const playIncorrectSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.linearRampToValueAtTime(95, now + 0.22);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.22);
    } catch (e) {
      console.error(e);
    }
  };

  const completeOnboarding = () => {
    setShowOnboarding(false);
    try {
      localStorage.setItem('phishtank_onboarded_v2', 'true');
    } catch (e) {
      console.error(e);
    }
    if (tutorialTriggerMode === 'force') {
      startLevel(1);
    } else {
      setActiveScreen('dashboard');
    }
  };

  const isLevelUnlocked = (id: number) => {
    if (id === 1) return true;
    return clearedLevels.includes(id - 1);
  };

  const handleSelectLevel = (levelId: number) => {
    if (!isLevelUnlocked(levelId)) return;

    if (levelId === 1 && !clearedLevels.includes(1)) {
      setTutorialTriggerMode('force');
      setOnboardingStep(1);
      setShowOnboarding(true);
    } else {
      startLevel(levelId);
    }
  };

  const startLevel = (levelId: number, bypassPopup = false) => {
    setActiveLevel(levelId);
    setCurrentIdx(0);
    setUserScore(0);
    setChecked(false);
    setIsCorrect(false);
    setReviewAll(false);
    setHasFailedCurrentLevel(false);
    setShowHint(false);
    setWrongAttempt(false);
    setReinforcementAnswered(false);
    setReinforcementSelected(null);
    setReinforcementCorrect(null);
    setScenarioScores({});
    setFailedOnFirstTry({});
    setEarnedXp(0);
    setActiveScreen('gameplay');
    if (bypassPopup) {
      setShowOverviewPopup(false);
    } else {
      setShowOverviewPopup(true);
    }
  };

  const handleBackToMap = () => {
    setActiveScreen('dashboard');
    setActiveLevel(null);
  };

  const handleDecision = (choiceIsPhishing: boolean) => {
    if (checked) return;
    const correct = choiceIsPhishing === scenario.isPhishing;
    setIsCorrect(correct);
    if (correct) {
      playCorrectSound();
      if (!hasFailedCurrentLevel) {
        setUserScore(prev => prev + 1);
      }
      // Calculate XP for this question
      const wasFailed = failedOnFirstTry[scenario.id];
      const earned = wasFailed ? 4 : 8;
      setScenarioScores(prev => ({
        ...prev,
        [scenario.id]: earned
      }));
    } else {
      playIncorrectSound();
      setHasFailedCurrentLevel(true);
      setWrongAttempt(true);
      // Mark as failed on first try
      setFailedOnFirstTry(prev => ({
        ...prev,
        [scenario.id]: true
      }));
    }
    setChecked(true);
  };

  const handleReinforcementDecision = (choiceIsPhishing: boolean) => {
    const isCorrectReinforcement = choiceIsPhishing === getReinforcementCase(scenario.id).isPhishing;
    setReinforcementSelected(choiceIsPhishing ? 'phish' : 'safe');
    setReinforcementCorrect(isCorrectReinforcement);
    setReinforcementAnswered(true);
    if (isCorrectReinforcement) {
      playCorrectSound();
    } else {
      playIncorrectSound();
    }
  };

  const handleTryAgain = () => {
    setWrongAttempt(false);
    setReinforcementAnswered(false);
    setReinforcementSelected(null);
    setReinforcementCorrect(null);
    setChecked(false);
    setIsCorrect(false);
  };

  const handleNext = () => {
    setChecked(false);
    setHasFailedCurrentLevel(false);
    setShowHint(false);
    if (currentIdx < levelScenarios.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      // Completed Level Successfully! Update progress
      const updatedCleared = [...clearedLevels];
      if (!updatedCleared.includes(activeLevel!)) {
        updatedCleared.push(activeLevel!);
        setClearedLevels(updatedCleared);
        try {
          localStorage.setItem('phish_cleared_levels_v1', JSON.stringify(updatedCleared));
        } catch (e) {
          console.error(e);
        }
      }

      // Dynamic XP Calculation Engine (Applies to ALL Levels)
      const totalLevelXp = levelScenarios.reduce((sum, s) => {
        return sum + (scenarioScores[s.id] || 0); // Correct on first try (8), retry (4), unanswered/skipped/quit (0)
      }, 0);
      setEarnedXp(totalLevelXp);

      updateProfile((prev: UserProfile) => {
        let newGames = prev.completedGames.filter(g => !g.startsWith('phish-level-'));
        const allCleared = [1, 2, 3].every(l => updatedCleared.includes(l));
        
        if (allCleared && !newGames.includes('game-phish')) {
          newGames.push('game-phish');
        }
        
        let newBadges = [...prev.badges];
        if (allCleared && prev.badges.indexOf('badge-phish-perfect') === -1) {
          newBadges.push('badge-phish-perfect');
        }

        const calculatedLevel = calculateLevelFromXP(prev.xp + totalLevelXp);

        return {
          ...prev,
          xp: prev.xp + totalLevelXp, // Award dynamic calculated XP
          completedGames: newGames,
          badges: newBadges,
          level: Math.max(prev.level, calculatedLevel)
        };
      });

      // For level 3 finish, trigger explanation clarification pop-up
      if (activeLevel === 3) {
        setShowLevel3Clarification(true);
      }

      // Show the victory container screen
      setActiveScreen('victory');
    }
  };

  const handleReset = () => {
    setCurrentIdx(0);
    setUserScore(0);
    setChecked(false);
    setReviewAll(false);
    setHasFailedCurrentLevel(false);
    setShowHint(false);
  };

  // If game onboarding sequence is running
  if (showOnboarding) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        className={`max-w-xl w-full mx-auto p-8 rounded-3xl border shadow-xl flex flex-col justify-between min-h-[480px] transition-all duration-300 ${
          theme === 'light' ? 'bg-white border-slate-200 text-slate-850' : 'bg-[#161B22] border-[#30363D] text-[#E2E8F0]'
        }`}
      >
        <div className="flex items-center justify-between pb-4 border-b border-dashed border-slate-350 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse" />
            <span className={`text-xs font-mono font-bold uppercase ${theme === 'light' ? 'text-slate-500' : 'text-[#8B949E]'}`}>Phish Tank Onboarding</span>
          </div>
          <span className={`text-xs font-mono px-2 py-0.5 rounded leading-none ${theme === 'light' ? 'bg-slate-100 text-slate-600 border border-slate-200' : 'bg-slate-800 text-[#8B949E]'}`}>
            Step {onboardingStep} of 5
          </span>
        </div>

        <div className="flex-1 my-8 flex flex-col justify-center space-y-6">
          {onboardingStep === 1 && (
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-orange-500 flex items-center justify-center">
                <Search className="w-6 h-6" />
              </div>
              <h3 className={`text-2xl font-black tracking-tight ${theme === 'light' ? 'text-slate-900' : 'text-[#F0F6FC]'}`}>Phase 1: The Definition</h3>
              <p className={`text-base leading-relaxed ${theme === 'light' ? 'text-slate-600' : 'text-[#8B949E]'}`}>
                Phishing is when cybercriminals send fake messages to trick you into giving away secrets, like passwords or banking info. Think of it like a digital trap with juicy bait.
              </p>
            </div>
          )}
          {onboardingStep === 2 && (
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-550 dark:text-indigo-400 flex items-center justify-center">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h3 className={`text-2xl font-black tracking-tight ${theme === 'light' ? 'text-slate-900' : 'text-[#F0F6FC]'}`}>Phase 2: The Purpose</h3>
              <p className={`text-base leading-relaxed ${theme === 'light' ? 'text-slate-600' : 'text-[#8B949E]'}`}>
                This game trains your eyes to spot the specific mistakes hackers make, so you can catch them in real life before they catch you.
              </p>
            </div>
          )}
          {onboardingStep === 3 && (
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-500 flex items-center justify-center">
                <RotateCcw className="w-6 h-6" />
              </div>
              <h3 className={`text-2xl font-black tracking-tight ${theme === 'light' ? 'text-slate-900' : 'text-[#F0F6FC]'}`}>Phase 3: The Goal</h3>
              <p className={`text-base leading-relaxed ${theme === 'light' ? 'text-slate-600' : 'text-[#8B949E]'}`}>
                Examine the communication snippets on screen.
              </p>
            </div>
          )}
          {onboardingStep === 4 && (
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h3 className={`text-2xl font-black tracking-tight ${theme === 'light' ? 'text-slate-900' : 'text-[#F0F6FC]'}`}>Phase 4: The Actions</h3>
              <p className={`text-base leading-relaxed ${theme === 'light' ? 'text-slate-600' : 'text-[#8B949E]'}`}>
                Click the green <strong className="text-emerald-600 font-extrabold">✅ Trust</strong> button if the message looks safe. Click the red <strong className="text-rose-600 font-extrabold">🚨 Report</strong> button if you spot a red flag.
              </p>
            </div>
          )}
          {onboardingStep === 5 && (
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className={`text-2xl font-black tracking-tight ${theme === 'light' ? 'text-slate-900' : 'text-[#F0F6FC]'}`}>Phase 5: Hints & Clues Navigation</h3>
              <p className={`text-base leading-relaxed ${theme === 'light' ? 'text-slate-600' : 'text-[#8B949E]'}`}>
                Stuck? Click the <strong className="text-amber-550 dark:text-amber-400 font-extrabold">💡 Hint</strong> button in the corner for a quick tip on what to look for in this level.
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-slate-200 dark:border-slate-800">
          <div className="flex gap-1.5">
            {[1, 2, 3, 4, 5].map((idx) => (
              <span
                key={idx}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx === onboardingStep ? 'w-5 bg-orange-500' : 'bg-slate-300 dark:bg-slate-700'
                }`}
              />
            ))}
          </div>

          <div className="flex gap-2">
            {onboardingStep > 1 && (
              <button
                onClick={() => setOnboardingStep(prev => (prev - 1) as any)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg border cursor-pointer ${
                  theme === 'light' ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700' : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300'
                }`}
              >
                Back
              </button>
            )}
            
            {onboardingStep < 5 ? (
              <button
                onClick={() => setOnboardingStep(prev => (prev + 1) as any)}
                className="px-4 py-1.5 text-xs font-black rounded-lg bg-orange-600 hover:bg-orange-500 text-white shadow-md cursor-pointer transition-all"
              >
                Continue
              </button>
            ) : (
              <button
                onClick={completeOnboarding}
                className="px-5 py-1.5 text-xs font-black rounded-lg bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white shadow-md cursor-pointer animate-pulse"
              >
                Let's Play! 🎬
              </button>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  // SCREEN A: Level Selection Dashboard (Main Hub)
  if (activeScreen === 'dashboard') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`border rounded-2xl p-6 max-w-2xl w-full mx-auto space-y-6 ${
          theme === 'light' ? 'bg-white border-slate-200 text-slate-800 shadow-lg' : 'bg-[#161B22] border-[#30363D] text-[#E2E8F0]'
        }`}
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-200 dark:border-[#30363D]">
          <div>
            <h3 className={`text-xl font-black ${theme === 'light' ? 'text-slate-900' : 'text-[#F0F6FC]'}`}>🎣 Phish Tank</h3>
            <p className={`text-xs mt-1 ${theme === 'light' ? 'text-slate-500' : 'text-[#8B949E]'}`}>
              Audit secure vs fraudulent alerts sequentially. Learn to identify hidden threats.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => {
                setTutorialTriggerMode('manual');
                setOnboardingStep(1);
                setShowOnboarding(true);
              }}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-colors cursor-pointer flex items-center gap-1.5 ${
                theme === 'light' ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700' : 'bg-[#30363D] hover:bg-slate-700 border-[#30363D] text-[#E2E8F0]'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5 text-orange-505" />
              How to Play
            </button>
          </div>
        </div>

        {/* 4-Level Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {LEVEL_METADATA.map((lvl) => {
            const unlocked = isLevelUnlocked(lvl.id);

            return (
              <motion.div
                key={lvl.id}
                whileHover={unlocked ? { scale: 1.015, y: -2 } : {}}
                transition={{ type: "spring", stiffness: 120 }}
                onClick={() => handleSelectLevel(lvl.id)}
                className={`border rounded-2xl p-5 flex flex-col justify-between transition-all relative ${
                  unlocked
                    ? theme === 'light'
                      ? 'bg-slate-50/70 hover:bg-white border-slate-250 cursor-pointer shadow-sm hover:shadow-md'
                      : 'bg-[#0D0F12] hover:bg-[#161B22] border-[#30363D] hover:border-orange-500/40 cursor-pointer'
                    : theme === 'light'
                      ? 'bg-slate-100/50 border-slate-200 opacity-60 select-none cursor-not-allowed'
                      : 'bg-[#0D0F12]/30 border-[#30363D]/60 opacity-55 select-none cursor-not-allowed'
                }`}
              >
                <div className="space-y-2.5">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-bold font-mono tracking-wider text-orange-650 dark:text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded">
                      BLOCK 0{lvl.id}
                    </span>
                    {!unlocked ? (
                      <div className="flex items-center gap-1 text-[10px] text-slate-400 dark:text-slate-500 font-bold bg-slate-500/10 px-2 py-0.5 rounded">
                        <Lock className="w-3 h-3" /> Locked
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-[10px] text-cyan-600 dark:text-sky-455 font-bold bg-cyan-500/10 px-2 py-0.5 rounded animate-pulse">
                        🔥 Playable
                      </div>
                    )}
                  </div>

                  <div>
                    <h4 className={`text-base font-extrabold ${theme === 'light' ? 'text-slate-900' : 'text-[#F0F6FC]'} ${!unlocked && 'opacity-70'}`}>
                      {lvl.title}
                    </h4>
                    <span className={`text-[10px] block font-semibold mt-0.5 ${theme === 'light' ? 'text-slate-500' : 'text-[#8B949E]'}`}>
                      Focus: <span className="font-bold underline text-orange-505 dark:text-orange-400">{lvl.focus}</span>
                    </span>
                    <p className={`text-xs mt-2 leading-relaxed ${theme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
                      {lvl.description}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-dashed border-slate-200 dark:border-slate-800/80 flex items-center justify-between">
                  <span className={`text-[10px] font-bold font-mono ${theme === 'light' ? 'text-slate-400' : 'text-slate-500'}`}>
                    Max Reward:{" "}
                    <span className="text-emerald-600 dark:text-emerald-400 font-black font-sans">
                      {lvl.id === 1 ? "40 XP" : lvl.id === 2 ? "64 XP" : "64 XP"}
                    </span>
                  </span>
                  {unlocked ? (
                    <span className={`text-[10px] font-black uppercase flex items-center gap-1 ${theme === 'light' ? 'text-orange-600' : 'text-orange-400'}`}>
                      Start Level <ChevronRight className="w-3 h-3" />
                    </span>
                  ) : (
                    <span className="text-[10px] text-slate-500 dark:text-slate-600 font-bold flex items-center gap-1">
                      Complete Level {lvl.id - 1} to unlock
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    );
  }

  // SCREEN B: Victory Screen (Popup when level successfully cleared)
  if (activeScreen === 'victory') {
    const levelData = LEVEL_METADATA.find(l => l.id === activeLevel);
    const accuracy = Math.round((userScore / levelScenarios.length) * 100);

    return (
      <>
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`border rounded-2xl p-8 max-w-md w-full mx-auto text-center space-y-6 ${
            theme === 'light' ? 'bg-white border-slate-200 text-slate-800 shadow-xl' : 'bg-[#161B22] border-[#30363D] text-[#E2E8F0]'
          }`}
        >
          <div className="space-y-2">
            <Trophy className="w-16 h-16 text-amber-500 mx-auto animate-bounce" />
            <h3 className={`text-2xl font-black ${theme === 'light' ? 'text-slate-900' : 'text-[#F0F6FC]'}`}>
              Level {activeLevel} Cleared!
            </h3>
            <p className={`text-xs ${theme === 'light' ? 'text-slate-500' : 'text-[#8B949E]'}`}>
              You have successfully completed this interactive threat audit.
            </p>
          </div>

          <div className={`border rounded-xl p-4 grid grid-cols-2 gap-4 ${
            theme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-[#0D0F12] border-[#30363D]'
          }`}>
            <div>
              <span className={`text-[10px] font-bold uppercase block tracking-wider ${theme === 'light' ? 'text-slate-400' : 'text-[#8B949E]'}`}>
                Score Accuracy
              </span>
              <span className={`text-xl font-mono font-black ${theme === 'light' ? 'text-slate-850' : 'text-[#F0F6FC]'}`}>
                {userScore} / {levelScenarios.length}
              </span>
            </div>
            <div>
              <span className={`text-[10px] font-bold uppercase block tracking-wider ${theme === 'light' ? 'text-slate-400' : 'text-[#8B949E]'}`}>
                XP Awarded
              </span>
              <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                +{earnedXp} XP
              </span>
            </div>
          </div>

          {/* Badge description info */}
          {levelData?.badge && (
            <div className="bg-amber-500/10 border border-amber-500/20 text-amber-550 rounded-xl p-3 text-left flex items-start gap-3">
              <Award className="w-8 h-8 shrink-0 text-amber-500 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-amber-500 leading-tight">Achievement Unlocked!</p>
                <p className="text-[11px] font-black uppercase text-amber-600 dark:text-amber-400 mt-0.5">
                  {levelData.badge}
                </p>
                <p className="text-[10px] opacity-80 leading-normal mt-0.5">
                  Dynamic skills certified for audits concerning "{levelData.focus}". Keep up the strong defense!
                </p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={handleBackToMap}
              className={`py-2.5 px-4 text-xs font-bold rounded-xl transition-all border cursor-pointer ${
                theme === 'light' ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-750' : 'bg-[#30363D] hover:bg-[#30363D]/85 text-[#F0F6FC] border-[#30363D]'
              }`}
            >
              Back to Map
            </button>
            
            {activeLevel! < 4 ? (
              <button
                onClick={() => startLevel(activeLevel! + 1)}
                className="py-2.5 px-4 bg-orange-600 hover:bg-orange-500 text-white text-xs font-black rounded-xl transition-all cursor-pointer shadow-md"
              >
                Next Level
              </button>
            ) : (
              <button
                onClick={handleBackToMap}
                className="py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black rounded-xl transition-all cursor-pointer shadow-md"
              >
                All Levels Beaten!
              </button>
            )}
          </div>
        </motion.div>
        {renderLevel3Clarification()}
      </>
    );
  }

  // Active Gameplay UI Frame
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.99 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`border rounded-2xl p-6 shadow-md space-y-5 max-w-xl mx-auto font-sans ${
        theme === 'light' ? 'bg-white border-slate-200 text-slate-850 shadow-lg' : 'bg-[#161B22] border-[#30363D] text-[#E2E8F0]'
      }`}
    >
      {/* Header bar controls */}
      <div className={`flex justify-between items-center p-2 rounded-lg border transition-all ${
        theme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-[#0D0F12] border-[#30363D]'
      }`}>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowPause(true)}
            className={`p-1 rounded-md border text-center transition-colors hover:text-red-500 ${
              theme === 'light' ? 'bg-white border-slate-305 text-slate-500 hover:bg-slate-100' : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'
            }`}
            title="Pause game"
          >
            <Pause className="w-3.5 h-3.5" />
          </button>
          <span className={`text-[10px] font-bold uppercase tracking-wider ${theme === 'light' ? 'text-slate-400' : 'text-[#8B949E]'}`}>
            Phish Tank
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowHint(prev => !prev)}
            className={`px-2 py-0.5 rounded text-[10px] font-bold border transition-colors flex items-center gap-1 ${
              showHint 
                ? 'bg-amber-500/10 border-amber-500/40 text-amber-500' 
                : theme === 'light' ? 'bg-slate-100 border-slate-250 text-slate-600 hover:bg-slate-205' : 'bg-slate-800 border-slate-700 text-[#8B949E] hover:bg-slate-700'
            }`}
          >
            💡 Hint
          </button>
          <span className="text-xs font-black font-mono text-cyan-600 dark:text-[#58A6FF] bg-cyan-500/10 w-[77px] pl-1.5 pr-[11px] py-1 text-center rounded-full border border-cyan-500/10 ml-0">
            {currentIdx + 1} of {levelScenarios.length}
          </span>
        </div>
      </div>

      {/* Level Hint Area */}
      {showHint && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-3 rounded-xl border text-xs leading-relaxed flex items-start gap-2 ${
            theme === 'light' ? 'bg-amber-50/70 border-amber-200 text-amber-800' : 'bg-amber-500/10 border-amber-500/30 text-amber-500'
          }`}
        >
          <span className="text-base select-none">💡</span>
          <div>
            <p className="font-bold">Security Hint Guidance:</p>
            <p className="mt-0.5 italic">{scenario.clues[0] || 'Observe domain names and urgency tricks inside headers.'}</p>
          </div>
        </motion.div>
      )}

      {/* The Display Card: pristine level-based message layouts */}
      <div className={`border rounded-2xl overflow-hidden shadow-sm flex flex-col transition-all ${
        theme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-[#0D0F12] border-[#30363D]'
      }`}>
        {/* Email Header for standard levels (with Sender details) */}
        {scenario.level !== 4 && (
          <div className={`border-b p-4 space-y-1 text-xs transition-all ${
            theme === 'light' ? 'bg-slate-100/50 border-slate-200 text-slate-500' : 'bg-[#161B22] border-[#30363D] text-[#8B949E]'
          }`}>
            <div>
              <span className="font-semibold">From: </span>
              <span className={`font-bold ${theme === 'light' ? 'text-slate-850' : 'text-[#F0F6FC]'}`}>
                {scenario.sender}
              </span>{' '}
              <span className={`font-mono text-[10px] select-all px-1 py-0.5 rounded ${theme === 'light' ? 'bg-slate-200/80 text-slate-700' : 'bg-[#30363D] text-[#58A6FF]'}`}>
                &lt;{scenario.senderEmail}&gt;
              </span>
            </div>
            {scenario.level !== 1 && (
              <div>
                <span className="font-semibold">Subject: </span>
                <span className={`font-bold ${theme === 'light' ? 'text-slate-850' : 'text-[#F0F6FC]'}`}>
                  {scenario.subject}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Dynamic Level-Specific Main Views */}
        {scenario.level === 1 ? (
          /* Level 1: Sender Address & Typos Only */
          <div className={`p-6 text-center space-y-4 ${theme === 'light' ? 'bg-white' : 'bg-[#161B22]'}`}>
            <div 
              className={`p-4 rounded-xl border text-left space-y-2.5 ${theme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-[#0D0F12] border-[#30363D]'}`}
              style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}
            >
              <div>
                <span className="font-semibold text-[10px] uppercase tracking-wider text-slate-400" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>Sender Display Name</span> 
                <span className={`block font-extrabold text-sm ${theme === 'light' ? 'text-slate-800' : 'text-[#F0F6FC]'}`} style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
                  {scenario.sender}
                </span>
              </div>
              <div className="pt-2.5 border-t border-dashed border-slate-250 dark:border-slate-800">
                <span className="font-semibold text-[10px] uppercase tracking-wider text-slate-400" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>Email Address String</span> 
                <span 
                  className={`block text-xs select-all px-2 py-1.5 rounded mt-1 overflow-x-auto ${theme === 'light' ? 'bg-amber-50 text-amber-705 border border-amber-200' : 'bg-[#30363D]/40 text-[#58A6FF]'}`}
                  style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}
                >
                  {scenario.senderEmail}
                </span>
              </div>
            </div>
            <p className="text-[10px] text-amber-500 font-bold block bg-amber-500/5 py-1 px-2 rounded border border-amber-550/10">
              🔍 Inspect the letter layout of the domain above closely.
            </p>
          </div>
        ) : scenario.level === 2 ? (
          /* Level 2: URL & Link Inspections (Tricky Web Links) */
          <div className={`p-4 space-y-4 select-text ${theme === 'light' ? 'bg-slate-50' : 'bg-[#0D0F12]'}`}>
            {scenario.isWhatsApp ? (
              /* WhatsApp Presentation Card */
              <div 
                className={`border rounded-2xl overflow-hidden shadow-sm flex flex-col font-sans max-w-sm mx-auto ${
                  theme === 'light' ? 'bg-[#E5DDD5] border-slate-200 text-slate-800' : 'bg-[#0b141a] border-[#222e35] text-[#e9edef]'
                }`}
                style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}
              >
                {/* WhatsApp Chat Header */}
                <div className={`p-3 flex items-center justify-between ${
                  theme === 'light' ? 'bg-[#075E54] text-white' : 'bg-[#202c33] text-[#e9edef]'
                }`}>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#128C7E] flex items-center justify-center text-white font-bold text-xs">
                      💬
                    </div>
                    <div>
                      <div className="font-bold text-xs truncate max-w-[160px] text-left">{scenario.sender}</div>
                      <div className="text-[9px] opacity-80 text-left">{scenario.senderEmail}</div>
                    </div>
                  </div>
                  <div className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full font-mono">
                    WhatsApp Chat
                  </div>
                </div>

                {/* WhatsApp Chat Area */}
                <div 
                  className="p-4 flex flex-col space-y-2 relative"
                  style={{
                    backgroundImage: theme === 'light' 
                      ? 'radial-gradient(#dfdcd6 1px, transparent 1px)' 
                      : 'radial-gradient(#1e2c34 1px, transparent 1px)',
                    backgroundSize: '12px 12px'
                  }}
                >
                  <div className={`p-3 rounded-lg max-w-[85%] self-start text-xs leading-relaxed shadow-sm relative text-left ${
                    theme === 'light' 
                      ? 'bg-white text-slate-800 rounded-tl-none border-l-4 border-emerald-500' 
                      : 'bg-[#1f2c34] text-[#e9edef] rounded-tl-none border-l-4 border-teal-500'
                  }`}>
                    {/* Neutral Link Styling: Display body without active hyperlinks or color clues */}
                    <div className="whitespace-pre-wrap select-text selection:bg-orange-500/25">
                      {scenario.body}
                    </div>
                    <span className="text-[9px] opacity-65 block text-right mt-1.5 font-mono">
                      12:14 PM
                    </span>
                  </div>
                </div>

                <div className={`p-2 py-1.5 text-center text-[9px] opacity-60 border-t ${
                  theme === 'light' ? 'border-slate-200 text-slate-600 bg-white/40' : 'border-[#222e35] text-slate-400 bg-black/10'
                }`}>
                  🔒 Messages are end-to-end encrypted. Inspect text elements.
                </div>
              </div>
            ) : (
              /* Email Presentation Card */
              <div 
                className={`border rounded-2xl overflow-hidden shadow-sm flex flex-col font-sans max-w-md mx-auto text-left ${
                  theme === 'light' ? 'bg-white border-slate-200 text-slate-800' : 'bg-[#161B22] border-[#30363D] text-[#E2E8F0]'
                }`}
                style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}
              >
                {/* Email Header */}
                <div className={`p-3.5 border-b space-y-1.5 ${
                  theme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-[#0D0F12] border-[#30363D]'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono tracking-wider font-extrabold uppercase text-slate-400">
                      📧 EMAIL MESSAGE INPUT
                    </span>
                    <span className="text-[9px] font-mono bg-blue-500/10 text-blue-500 dark:text-blue-400 px-2 py-0.5 rounded-full">
                      Inbox
                    </span>
                  </div>
                  <div className="text-[11px] leading-relaxed">
                    <div>
                      <strong className="font-bold">From:</strong> {scenario.sender} &lt;<span className="font-mono">{scenario.senderEmail}</span>&gt;
                    </div>
                    <div>
                      <strong className="font-bold">Subject:</strong> {scenario.subject}
                    </div>
                  </div>
                </div>

                {/* Email Body */}
                <div className="p-4 text-xs leading-relaxed min-h-[100px] whitespace-pre-wrap select-text selection:bg-sky-500/20">
                  {/* Neutral Link Styling: Display body without active hyperlinks or color clues */}
                  {scenario.body}
                </div>
              </div>
            )}

            <p className="text-[10px] text-cyan-600 dark:text-[#58A6FF] font-medium block border-t border-slate-100 dark:border-slate-800 pt-3 text-center">
              💡 Don't trust the label! Is that link taking you to the real company's website, or a sketchy look-alike trap?
            </p>
          </div>
        ) : scenario.level === 3 ? (
          /* Level 3: Mind Games (Psychological Red Flags) */
          <div className={`p-4 space-y-4 select-text ${theme === 'light' ? 'bg-slate-50' : 'bg-[#0D0F12]'}`}>
            <div 
              className={`border rounded-2xl overflow-hidden shadow-sm flex flex-col font-sans max-w-md mx-auto text-left ${
                theme === 'light' ? 'bg-white border-slate-200 text-slate-800' : 'bg-[#161B22] border-[#30363D] text-[#E2E8F0]'
              }`}
              style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}
            >
              {/* Email Header */}
              <div className={`p-3.5 border-b space-y-1.5 ${
                theme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-[#0D0F12] border-[#30363D]'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono tracking-wider font-extrabold uppercase text-slate-400">
                    🧠 PSYCHOLOGICAL TONE INBOUND
                  </span>
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-slate-500/10 text-slate-500 dark:text-slate-400">
                    Priority Mail
                  </span>
                </div>
                <div className="text-[11px] leading-relaxed">
                  <div>
                    <strong className="font-bold">From:</strong> {scenario.sender} &lt;<span className="font-mono">{scenario.senderEmail}</span>&gt;
                  </div>
                  <div>
                    <strong className="font-bold">Subject:</strong> {scenario.subject}
                  </div>
                </div>
              </div>

              {/* Email Body */}
              <div className="p-4 text-xs leading-relaxed min-h-[100px] whitespace-pre-wrap select-text selection:bg-rose-500/10">
                {scenario.body}
              </div>
            </div>

            <p className="text-[10px] text-amber-500 font-medium block border-t border-slate-100 dark:border-slate-800 pt-3 text-center">
              💡 Hackers may try to manipulate your emotions with fear, extreme panic, fake rewards, or urgent deadlines.
            </p>
          </div>
        ) : (
          /* Level 4: The Modern Visual Traps (QR Codes & Notifications) */
          <div className={`p-5 text-xs select-text font-sans rounded-2xl ${theme === 'light' ? 'text-slate-700 bg-white border border-slate-100 shadow-inner' : 'text-[#F0F6FC] bg-[#161B22]'}`}>
            {(() => {
              const isQrTask = scenario.id.includes('-task-1') || scenario.id.includes('-task-3') || scenario.id.includes('-task-5') || scenario.id.includes('-task-6') || scenario.id.includes('-task-9') || scenario.id.includes('-task-10');
              
              if (isQrTask) {
                // Determine layout visual assets based on scenario ID
                const getQrDetails = (id: string) => {
                  switch (id) {
                    case 'level-4-task-1':
                      return {
                        icon: "🍔",
                        headline: "FREE CAMPUS MEAL VOUCHERS",
                        bgClass: "bg-gradient-to-br from-amber-50 to-orange-100 border-amber-300 text-slate-800 dark:from-amber-950/20 dark:to-orange-950/10 dark:border-amber-900/40 dark:text-amber-100",
                        destUrl: "http://uni-vouchers-meal-claim.tk/free-claim",
                        placement: "University Bulletin Boards"
                      };
                    case 'level-4-task-3':
                      return {
                        icon: "🏫",
                        headline: "BLACKBOARD platform UPGRADE",
                        bgClass: "bg-gradient-to-br from-slate-50 to-zinc-100 border-slate-350 text-slate-800 dark:from-slate-900/40 dark:to-zinc-950/20 dark:border-slate-800 dark:text-[#E2E8F0]",
                        destUrl: "http://blackboard-upgrade.mfa-helper.org/login",
                        placement: "Classroom Main Building Board Poster"
                      };
                    case 'level-4-task-5':
                      return {
                        icon: "🚌",
                        headline: "NAIRA STUDENT TRAVEL CASH",
                        bgClass: "bg-gradient-to-br from-emerald-50 to-teal-100 border-emerald-300 text-slate-800 dark:from-emerald-950/15 dark:to-teal-950/10 dark:border-emerald-900/30 dark:text-emerald-100",
                        destUrl: "http://subsidies.fmg-nigeria.online/travel-subsidy",
                        placement: "Transit Platform Glass Window Sticker"
                      };
                    case 'level-4-task-6':
                      return {
                        icon: "📶",
                        headline: "CAFETERIA HIGH-SPEED 5G WI-FI",
                        bgClass: "bg-gradient-to-br from-blue-50 to-sky-100 border-blue-300 text-slate-800 dark:from-blue-950/15 dark:to-sky-950/10 dark:border-blue-900/30 dark:text-blue-100",
                        destUrl: "http://campus-connect-wifi.free-net-hub.top/connect",
                        placement: "Laminated Cafeteria Table Sticker"
                      };
                    case 'level-4-task-9':
                      return {
                        icon: "📚",
                        headline: "UNIVERSITY LIBRARY SEAT BOOKING",
                        bgClass: "bg-gradient-to-br from-indigo-50 to-violet-100 border-indigo-300 text-slate-800 dark:from-indigo-950/15 dark:to-violet-950/10 dark:border-indigo-900/30 dark:text-indigo-100",
                        destUrl: "https://library.university.edu.ng/reserve",
                        placement: "Acrylic Study Table Stand"
                      };
                    case 'level-4-task-10':
                      return {
                        icon: "🎮",
                        headline: "NAIJA STUDENT GAMING CHAMPIONSHIP",
                        bgClass: "bg-gradient-to-br from-purple-50 to-fuchsia-100 border-purple-300 text-slate-800 dark:from-purple-950/15 dark:to-fuchsia-950/10 dark:border-purple-900/30 dark:text-purple-100",
                        destUrl: "http://championship-registration.naija-gamer-hub.online/join",
                        placement: "Hostel Entrance Wall Poster"
                      };
                    default:
                      return {
                        icon: "📷",
                        headline: "CAMPUS NOTIFICATION ADVERTISEMENT",
                        bgClass: "bg-slate-100 border-slate-350 text-slate-800 dark:bg-slate-900 dark:border-slate-800 dark:text-[#E2E8F0]",
                        destUrl: "http://university-security-registration.info",
                        placement: "Unknown bulletin board"
                      };
                  }
                };
                
                const qrDetails = getQrDetails(scenario.id);
                
                return (
                  <div className="space-y-4 max-w-sm mx-auto">
                    {/* Simulated Physical Poster / Flyer / Sticker */}
                    <div className={`p-4 border rounded-2xl shadow-sm text-center relative ${qrDetails.bgClass}`}>
                      <div className="absolute top-2 right-3 text-[8px] font-mono tracking-wider opacity-60 font-bold uppercase">
                        📍 {qrDetails.placement}
                      </div>
                      
                      <div className="w-10 h-10 rounded-full bg-slate-500/10 flex items-center justify-center text-2xl mx-auto mb-2.5">
                        {qrDetails.icon}
                      </div>
                      
                      <div className="space-y-1 mb-3.5">
                        <h4 className="font-extrabold tracking-tight text-xs uppercase leading-none text-slate-900 dark:text-white">
                          {qrDetails.headline}
                        </h4>
                        <p className="text-[10px] leading-relaxed px-1 font-medium opacity-90 mt-1">
                          {scenario.body.replace(/📷 .*\n/, '')}
                        </p>
                      </div>
                      
                      {/* Detailed QR Graphic Block */}
                      <div className="p-3 bg-white w-24 h-24 mx-auto rounded-xl border border-slate-200/80 shadow flex items-center justify-center">
                        <div className="w-full h-full border border-slate-900 relative p-1 bg-white">
                          {/* Simulated QR Pattern */}
                          <div className="w-full h-full grid grid-cols-5 gap-0.5">
                            {/* Position Anchors */}
                            <div className="bg-slate-900 border-2 border-white"></div>
                            <div className="bg-white"></div>
                            <div className="bg-white"></div>
                            <div className="bg-white"></div>
                            <div className="bg-slate-900 border-2 border-white"></div>
                            
                            <div className="bg-white"></div>
                            <div className="bg-slate-900"></div>
                            <div className="bg-slate-900"></div>
                            <div className="bg-white"></div>
                            <div className="bg-white"></div>
                            
                            <div className="bg-slate-900"></div>
                            <div className="bg-white"></div>
                            <div className="bg-slate-900"></div>
                            <div className="bg-slate-900"></div>
                            <div className="bg-slate-900"></div>
                            
                            <div className="bg-white"></div>
                            <div className="bg-slate-900"></div>
                            <div className="bg-white"></div>
                            <div className="bg-white"></div>
                            <div className="bg-white"></div>
                            
                            <div className="bg-slate-900 border-2 border-white"></div>
                            <div className="bg-white"></div>
                            <div className="bg-slate-900"></div>
                            <div className="bg-slate-900"></div>
                            <div className="bg-white"></div>
                          </div>
                          {/* Scanning Indicator overlay */}
                          <div className="absolute inset-0 border-2 border-blue-500/40 rounded-sm animate-pulse"></div>
                        </div>
                      </div>
                      
                      <div className="text-[9px] font-mono opacity-50 italic mt-2.5">
                        {scenario.sender}
                      </div>
                    </div>
                    
                    {/* Simulated Camera Viewfinder Scanner Tooltip popup */}
                    <div className="bg-[#0D1117] border border-[#21262d] rounded-xl p-3 shadow-md font-sans text-left space-y-2">
                      <div className="flex items-center gap-1.5 text-[9px] text-[#58A6FF] font-bold uppercase tracking-wider">
                        <span className="animate-ping w-1.5 h-1.5 rounded-full bg-blue-500 inline-block"></span>
                        <span>📷 Smartphone Scanner Lens</span>
                      </div>
                      
                      <div>
                        <div className="text-[10px] text-slate-400 font-medium">Scanned Hyperlink Destination:</div>
                        <div className="text-[11px] font-mono font-semibold text-white break-all bg-black/40 p-1.5 rounded-md border border-slate-800 mt-1 select-all">
                          {qrDetails.destUrl}
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center text-[9px]">
                        <span className="text-slate-500 italic">Target URL Verification Protocol</span>
                        <span className="text-[#8B949E] bg-slate-800/60 px-2 py-0.5 rounded font-bold">
                          {scenario.isPhishing ? "Unverified SSL Host" : "Verified SSL Subdomain"}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              } else {
                // Determine lockscreen system push or device verification layout
                const isDuo = scenario.id === 'level-4-task-2';
                const isMicrosoft = scenario.id === 'level-4-task-4';
                const isGoogle = scenario.id === 'level-4-task-7';
                const isWhatsAppBomb = scenario.id === 'level-4-task-8';
                
                if (isDuo) {
                  return (
                    <div className="p-4 flex flex-col justify-center items-center space-y-4 max-w-sm mx-auto">
                      {/* High legibility mock authentication card - always highly legible regardless of light/dark mode */}
                      <div className="w-full p-4 border border-slate-700 bg-[#0F141C] text-slate-100 rounded-2xl shadow-xl space-y-3 font-sans text-left">
                        <div className="flex justify-between items-center text-slate-400 text-[10px]">
                          <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[#58A6FF]">
                            <span>🔑 DUO MULTI-FACTOR</span>
                          </div>
                          <span>Just now</span>
                        </div>
                        
                        <div>
                          <h5 className="font-extrabold text-xs text-white">Login Request Verification Code</h5>
                          <p className="text-[11px] text-[#8B949E] mt-0.5 leading-relaxed">
                            {scenario.body.replace(/📱 .*\n/, '')}
                          </p>
                        </div>
                        
                        {/* Perfect High Contrast Number Container Box */}
                        <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 flex justify-center items-center shadow-inner">
                          <span className="text-emerald-400 font-mono text-xl font-black tracking-widest block animate-pulse select-all">
                            881-229
                          </span>
                        </div>
                        
                        <div className="text-[9px] text-[#8B949E] font-mono italic text-right leading-none">
                          Locked Security Auth Session Delivery Token
                        </div>
                      </div>
                    </div>
                  );
                }
                
                if (isMicrosoft) {
                  return (
                    <div className="p-4 flex flex-col justify-center items-center space-y-4 max-w-sm mx-auto">
                      <div className="w-full p-4 border border-slate-700 bg-[#111827] text-slate-100 rounded-2xl shadow-xl space-y-3 font-sans text-left">
                        <div className="flex justify-between items-center text-slate-400 text-[10px]">
                          <div className="flex items-center gap-1.5 font-extrabold text-[#38BDF8] tracking-widest uppercase">
                            <span>🔒 MICROSOFT AUTHENTICATOR</span>
                          </div>
                          <span>1m ago</span>
                        </div>
                        
                        <div>
                          <h5 className="font-extrabold text-xs text-white">Approve Your Connection Request</h5>
                          <p className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">
                            {scenario.body.replace(/📱 .*\n/, '')}
                          </p>
                        </div>
                        
                        {/* Interactive Verification Grid Mockup */}
                        <div className="p-2 border border-slate-800 bg-slate-950 rounded-xl space-y-2">
                          <div className="text-[9px] text-slate-400 font-mono font-semibold text-center uppercase tracking-wider">Select the matching number:</div>
                          <div className="grid grid-cols-3 gap-2">
                            <div className="py-2.5 px-3 bg-slate-900 border border-slate-800 text-center text-xs font-mono font-bold text-slate-400 rounded-lg">27</div>
                            <div className="py-2.5 px-3 bg-blue-600/20 border-2 border-blue-500 text-center text-xs font-mono font-black text-blue-400 rounded-lg animate-pulse">49</div>
                            <div className="py-2.5 px-3 bg-slate-900 border border-slate-800 text-center text-xs font-mono font-bold text-slate-400 rounded-lg">82</div>
                          </div>
                        </div>
                        
                        <div className="text-[9px] text-slate-500 font-mono text-right italic">
                          Session Approval Request Active
                        </div>
                      </div>
                    </div>
                  );
                }
                
                if (isGoogle) {
                  return (
                    <div className="p-4 flex flex-col justify-center items-center space-y-4 max-w-sm mx-auto">
                      <div className="w-full p-4 border border-slate-700 bg-slate-955 bg-[#202124] text-[#E8EAED] rounded-2xl shadow-xl space-y-3 font-sans text-left">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-1.5">
                            {/* Simple Google G brand icon */}
                            <span className="font-extrabold text-[#8AB4F8] text-[10px] uppercase font-mono tracking-widest">
                              Google Accounts
                            </span>
                          </div>
                          <span className="text-[10px] text-slate-400">Security Alert</span>
                        </div>
                        
                        <div className="space-y-2 border-t border-slate-800 pt-2">
                          <h5 className="font-extrabold text-xs text-white">Is this you trying to sign in?</h5>
                          <p className="text-[11px] text-[#9AA0A6] leading-relaxed">
                            A browser was used to log into your Google Account from a Windows machine.
                          </p>
                          
                          <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800 text-[10px] space-y-1 font-mono">
                            <div><span className="text-[#9AA0A6]">Device:</span> Windows Laptop PC</div>
                            <div><span className="text-[#9AA0A6]">Location:</span> Lagos, Nigeria</div>
                          </div>
                        </div>
                        
                        <div className="flex gap-2 pt-1">
                          <button className="flex-1 py-1.5 px-3 bg-[#303134] hover:bg-[#3C4043] font-bold text-[#8AB4F8] text-[10px] rounded-lg transition-all text-center">
                            No, secure account
                          </button>
                          <button className="flex-1 py-1.5 px-3 bg-[#8AB4F8]/10 hover:bg-[#8AB4F8]/20 font-bold text-[#8AB4F8] border border-[#8AB4F8]/20 text-[10px] rounded-lg transition-all text-center animate-pulse">
                            Yes, it's me
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                }
                
                if (isWhatsAppBomb) {
                  return (
                    <div className="p-3 flex flex-col justify-center items-center space-y-3 max-w-sm mx-auto">
                      <div className="text-center font-mono text-[9px] text-red-500 dark:text-rose-400 font-bold bg-rose-500/10 border border-rose-500/20 py-1.5 px-3 rounded-md w-full mb-1">
                        ⚠️ ALERT: ATTACKER REPETITIVELY SPAWNING CODES (FATIGUE BOMB)
                      </div>
                      
                      {/* Realistic stack/multi-listing representing phone lockscreen piling of notification abuse */}
                      <div className="w-full space-y-2 select-none relative font-sans">
                        {[1, 2, 3, 4].map((index) => {
                          const scale = 1 - (4 - index) * 0.02;
                          const opacity = index === 4 ? 1 : 0.4 + (index * 0.15);
                          return (
                            <div 
                              key={index} 
                              className="p-3 bg-[#202C33] border border-[#222E35] text-[#E9EDEF] rounded-xl shadow-lg text-left flex gap-3 items-start transform transition-all"
                              style={{ 
                                scale: `${scale}`,
                                opacity: opacity,
                                transform: `translateY(${index * -1.5}px)`
                              }}
                            >
                              <div className="w-6 h-6 rounded-full bg-emerald-600 border border-emerald-500/10 flex items-center justify-center text-[10px] shrink-0">
                                💬
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-center">
                                  <span className="font-extrabold text-[10px] text-emerald-400 uppercase tracking-wide leading-none">WhatsApp Security</span>
                                  <span className="text-[8px] text-slate-500 leading-none">Just now</span>
                                </div>
                                <p className="text-[10px] text-slate-300 font-semibold mt-1 leading-tight truncate">
                                  Pin verification code requested. Tap here to approve.
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      
                      <p className="text-[9px] font-mono text-slate-500 text-center italic mt-1.5 leading-none">
                        (Receiving duplicate authorization pings incessantly on user walk...)
                      </p>
                    </div>
                  );
                }
                
                // Fallback rendering
                return (
                  <div className="p-4 border border-slate-700 bg-slate-900 text-slate-100 rounded-xl max-w-sm mx-auto text-left font-mono">
                    <div className="text-xs font-bold text-red-400 uppercase">🚨 UNKNOWN SECURITY VIEW:</div>
                    <div className="whitespace-pre-wrap text-[10px] text-slate-300 mt-2">{scenario.body}</div>
                  </div>
                );
              }
            })()}
            
            <p className="text-[10px] text-cyan-500 dark:text-[#58A6FF] font-semibold block border-t border-slate-100 dark:border-slate-800/80 pt-3.5 text-center mt-3 leading-relaxed">
              💡 Recognize modern visual traps. Anonymous bulletin boards featuring QR codes mask their target destination website, while expected push authentication signals correspond directly to user-initiated logons.
            </p>
          </div>
        )}
      </div>

      {/* Explicit Button Controls / Verification states */}
      {!checked ? (
        <div className="grid grid-cols-2 gap-4 pt-1">
          <button
            onClick={() => handleDecision(true)} // 'Report' correlates to classification of IS phishing (true)
            className="py-3 px-4 border border-[#F85149] bg-[#F85149]/10 text-[#F85149] rounded-xl font-bold text-xs hover:bg-[#F85149]/20 active:scale-95 transition-all text-center cursor-pointer flex items-center justify-center gap-2 shadow-sm uppercase font-mono tracking-wider-sm"
          >
            🚨 Report
          </button>
          <button
            onClick={() => handleDecision(false)} // 'Trust' correlates to classification of SAFE (false)
            className="py-3 px-4 border border-[#238636] bg-[#238636]/10 text-[#3FB950] rounded-xl font-bold text-xs hover:bg-[#238636]/20 active:scale-95 transition-all text-center cursor-pointer flex items-center justify-center gap-2 shadow-sm uppercase font-mono tracking-wider-sm"
          >
            ✅ Trust
          </button>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-xl border ${
            isCorrect 
              ? theme === 'light' ? 'bg-emerald-50 border-emerald-250 text-emerald-800' : 'bg-[#238636]/15 border-[#238636]/30 text-[#3FB950]' 
              : theme === 'light' ? 'bg-red-50 border-red-200 text-red-800' : 'bg-[#F85149]/15 border-[#F85149]/30 text-[#F85149]'
          } space-y-3`}
        >
          <div className="flex items-center gap-2">
            {isCorrect ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <XCircle className="w-5 h-5 text-red-505" />}
            <span className="font-bold text-xs">{isCorrect ? 'Correct Decision!' : 'Assessment Failed!'}</span>
          </div>
          
          <div className={`text-[11px] select-text leading-relaxed font-sans space-y-1 ${theme === 'light' ? 'text-slate-600' : 'text-[#8B949E]'}`}>
            <p className={`font-bold ${theme === 'light' ? 'text-slate-800' : 'text-[#F0F6FC]'}`}>Security Feedback Breakdown:</p>
            <p className="italic">{scenario.explanation}</p>
          </div>

          <button
            onClick={handleNext}
            className={`w-full flex items-center justify-center gap-1 py-1.5 rounded-lg text-xs font-bold cursor-pointer border transition-colors ${
              theme === 'light' ? 'bg-slate-900 hover:bg-slate-850 border-slate-900 text-white font-extrabold' : 'bg-[#30363D] hover:bg-[#30363D]/80 text-[#F0F6FC] border-[#30363D]'
            }`}
          >
            Review Next Case <ChevronRight className="w-4 h-4" />
          </button>
        </motion.div>
      )}

      {/* Pause Modal overlay */}
      {showPause && (
        <div className="fixed inset-0 bg-black/65 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`max-w-sm w-full p-6 rounded-2xl border text-center space-y-6 shadow-2xl ${
              theme === 'light' ? 'bg-white border-slate-200 text-slate-800' : 'bg-[#161B22] border-[#30363D] text-[#E2E8F0]'
            }`}
          >
            <div className="mx-auto w-12 h-12 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-500 flex items-center justify-center">
              <Pause className="w-5 h-5 fill-current" />
            </div>
            
            <div>
              <h4 className={`text-lg font-black tracking-tight uppercase ${theme === 'light' ? 'text-slate-900' : 'text-[#F0F6FC]'}`}>Simulation Paused</h4>
              <p className={`text-xs mt-1 ${theme === 'light' ? 'text-slate-500' : 'text-[#8B949E]'}`}>Your Phish Tank audit session is currently halted.</p>
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={() => setShowPause(false)}
                className="w-full py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
              >
                Resume Simulation
              </button>

              <button
                onClick={() => {
                  setShowPause(false);
                  startLevel(activeLevel!, true); // bypass overview popup
                }}
                className={`w-full py-2.5 border transition-all cursor-pointer text-xs font-bold rounded-xl ${
                  theme === 'light' ? 'bg-slate-105 hover:bg-slate-200 border-slate-300 text-slate-755' : 'bg-[#30363D] hover:bg-slate-700 border-[#30363D] text-[#E2E8F0]'
                }`}
              >
                Restart Level
              </button>
              
              <button
                onClick={() => {
                  setShowPause(false);
                  onQuit();
                }}
                className={`w-full py-2.5 border transition-all cursor-pointer text-xs font-bold rounded-xl ${
                  theme === 'light' ? 'bg-slate-100 hover:bg-rose-50 hover:text-rose-600 border-slate-300 text-slate-750' : 'bg-transparent hover:bg-rose-950/20 hover:border-rose-900 hover:text-rose-400 border-[#30363D] text-[#8B949E]'
                }`}
              >
                Quit to Main Lobby
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Level Overview Popup overlay */}
      {showOverviewPopup && (
        <div className="fixed inset-0 bg-slate-950/75 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`max-w-md w-full p-6 sm:p-8 rounded-3xl border shadow-2xl flex flex-col space-y-6 text-left ${
              theme === 'light' ? 'bg-white border-slate-200 text-slate-805' : 'bg-[#161B22] border-[#30363D] text-[#E2E8F0]'
            }`}
          >
            {/* Dynamic Header */}
            <div>
              <span className="text-[10px] font-bold font-mono tracking-wider text-orange-655 dark:text-orange-400 bg-orange-500/10 px-2.5 py-1 rounded">
                MISSION BRIEFING
              </span>
              <h3 className={`text-xl font-black mt-3 ${theme === 'light' ? 'text-slate-900' : 'text-[#F0F6FC]'}`}>
                {LEVEL_OVERVIEWS[activeLevel || 1]?.title}
              </h3>
            </div>

            {/* Brief Overview Section */}
            <div className={`text-xs sm:text-sm leading-relaxed p-4 rounded-xl border ${
              theme === 'light' ? 'bg-slate-50 border-slate-200 text-slate-700' : 'bg-[#0D0F12] border-[#30363D] text-[#8B949E]'
            }`}>
              <p className="font-semibold text-[10px] uppercase tracking-wider mb-1.5 opacity-75">Concept Overview</p>
              <p>{LEVEL_OVERVIEWS[activeLevel || 1]?.overview}</p>
            </div>

            {/* What to Look For (Mission Clues) */}
            <div className="space-y-2">
              <h4 className={`text-xs font-black uppercase tracking-wider ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>
                🛡️ Your Mission: What to Look For
              </h4>
              <ul className="space-y-2">
                {LEVEL_OVERVIEWS[activeLevel || 1]?.whatToLookFor.map((clue, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs leading-relaxed">
                    <span className="text-orange-500 font-bold select-none">•</span>
                    <span>{clue}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Call to Action */}
            <div className="pt-2">
              <button
                onClick={() => setShowOverviewPopup(false)}
                className="w-full py-3 bg-orange-600 hover:bg-orange-505 text-white font-extrabold text-sm rounded-xl shadow-md cursor-pointer transition-all active:scale-95 text-center flex items-center justify-center gap-2"
              >
                Let&apos;s Go!
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Level 3 Golden Rule Clarification Popup */}
      {renderLevel3Clarification()}

      {/* Failure Feedback popup and learning loop modal */}
      {wrongAttempt && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`max-w-xl w-full p-6 rounded-2xl border shadow-2xl flex flex-col space-y-5 max-h-[85vh] overflow-y-auto ${
              theme === 'light' ? 'bg-white border-slate-200 text-slate-800' : 'bg-[#161B22] border-[#30363D] text-[#E2E8F0]'
            }`}
          >
            <div className="flex items-center gap-2 text-rose-500 pb-3 border-b border-slate-200 dark:border-slate-800">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <h4 className="text-base font-black uppercase tracking-tight leading-none">Incorrect Audit Assessment!</h4>
            </div>

            {/* Educational Breakdown */}
            <div className="space-y-2.5">
              <p className={`text-xs font-bold leading-none ${theme === 'light' ? 'text-slate-800' : 'text-[#F0F6FC]'}`}>
                Why your decision was incorrect:
              </p>
              <div className={`p-4 rounded-xl text-xs space-y-2 border ${
                theme === 'light' ? 'bg-rose-50 border-rose-200 text-slate-700' : 'bg-[#F85149]/10 border-[#F85149]/20 text-[#8B949E]'
              }`}>
                <p className="italic font-medium leading-relaxed">{scenario.explanation}</p>
                <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                  <span className="font-bold uppercase tracking-wider text-[10px] text-rose-500">Key tells & red flags in that level:</span>
                  <ul className="list-disc pl-4 space-y-1 text-[11px] mt-1.5 leading-relaxed">
                    {scenario.clues.map((cl, i) => (
                      <li key={i}>{cl}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Try Again CTA */}
            <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
              <button
                onClick={handleTryAgain}
                className="w-full py-3 bg-orange-600 hover:bg-orange-500 text-white font-extrabold text-sm rounded-xl shadow-md cursor-pointer transition-all active:scale-98 text-center flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4 text-white" />
                Try Again (Return to Scenario)
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
