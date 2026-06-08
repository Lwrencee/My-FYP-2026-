/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Dice5, 
  RotateCcw, 
  KeyRound, 
  ShieldCheck, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  Info, 
  Sparkles,
  HelpCircle as QuestionIcon,
  Play,
  Flame,
  User,
  AlertTriangle,
  ArrowRight,
  Zap,
  Trophy
} from 'lucide-react';
import { UserProfile } from '../types';
import { calculateLevelFromXP } from '../data';

interface RaceToServersGameProps {
  profile: UserProfile;
  updateProfile: (profile: UserProfile | ((prev: UserProfile) => UserProfile)) => void;
  theme?: 'light' | 'dark';
  onQuit?: () => void;
}

interface GameScenario {
  id: string;
  context: string;
  optionA: string;
  optionB: string;
  optionC?: string;
  correctOption: 'A' | 'B' | 'C';
  explanation: string;
}

// 8 Ladder scenarios (Proactive defense)
const LADDER_SCENARIOS: GameScenario[] = [
  {
    id: 'L1',
    context: "The school website now asks for your password plus a 6-digit code sent to your phone. Why does this actually keep you safe?",
    optionA: "It scrambles your typing so anyone watching your screen cannot see your password.",
    optionB: "Even if someone steals your password online, they can't log in without your physical phone.",
    optionC: "It runs an automatic clean-up to erase dangerous files hidden on your device.",
    correctOption: 'B',
    explanation: "Passwords can be guessed or leaked. Requiring a code from your physical phone stops scammers from breaking into your profile from somewhere else!"
  },
  {
    id: 'L2',
    context: "Your laptop alerts you about a \"critical system update.\" Why shouldn't you just click \"remind me in a week\"?",
    optionA: "It patches up hidden software glitches before internet scammers can use them to break in.",
    optionB: "It resets your network defense system to block unauthorized background connections.",
    optionC: "It clears out tracking data that shady websites use to spy on your screen.",
    correctOption: 'A',
    explanation: "Think of an update like fixing a broken lock on your door. Delaying it leaves an open window for people to mess with your device."
  },
  {
    id: 'L3',
    context: "You hear a campus safety speaker mention \"Social Engineering.\" What does this term mean?",
    optionA: "A privacy setting that automatically blocks suspicious profiles on your social media feeds.",
    optionB: "A data tracking system that schools use to monitor student online habits and behavior.",
    optionC: "A trick where scammers use fake identities or urgent stories to lie and steal your data.",
    correctOption: 'C',
    explanation: "Social engineering targets people, not computers. It is often much easier to trick a person with a fake story than it is to hack into a system!"
  },
  {
    id: 'L4',
    context: "An art major says, \"I don't have anything valuable, so hackers won't bother targeting my accounts.\" Why is this wrong?",
    optionA: "Scammers explicitly look for student art portfolios to lock them up and demand money.",
    optionB: "Stolen student profiles are automatically used to send scams to the rest of the school.",
    optionC: "Having an unsecure account will automatically crash the main school internet network.",
    correctOption: 'B',
    explanation: "Everyone is a target. Bad actors love using normal student accounts as a stepping stone to slip into the larger school network."
  },
  {
    id: 'L5',
    context: "The school IT desk is testing \"Passwordless Login\" using Face ID or fingerprints. What is the main safety benefit?",
    optionA: "It completely stops your phone from connecting to dangerous websites.",
    optionB: "It forces your apps to lock up your files before they get saved to the internet.",
    optionC: "It stops scammers from using your old leaked passwords on other accounts.",
    correctOption: 'C',
    explanation: "Reusing the same simple password is a bad habit most of us have. Fingerprints and Face ID solve this by getting rid of typed passwords entirely."
  },
  {
    id: 'L6',
    context: "Why do safety experts warn against logging into private accounts while on free, public café Wi-Fi?",
    optionA: "Open networks automatically copy your phone's digital ownership certificates.",
    optionB: "People sharing the connection can use basic spying tools to see information you send.",
    optionC: "Public internet routers can remotely unlock your phone’s biometric face scan.",
    correctOption: 'B',
    explanation: "Open Wi-Fi is like shouting your information across a crowded room. Use your phone's cellular data instead when typing things like passwords!"
  },
  {
    id: 'L7',
    context: "You see a warning that the school's \"Firewall\" blocked a connection. What does a firewall actually do?",
    optionA: "It cleans out infected files that have already made it past your regular defenses.",
    optionB: "It generates random lock keys to shield the physical storage drive inside your computer.",
    optionC: "It acts like a digital security guard, checking web traffic and blocking anything suspicious.",
    correctOption: 'C',
    explanation: "A firewall is your first line of defense. It watches data going in and out and blocks untrusted sources before they can touch your device."
  },
  {
    id: 'L8',
    context: "A new viral app says it needs \"Full File Access\" permission just to edit a photo. What is the danger here?",
    optionA: "The app can bypass your phone's store ratings to install nasty hidden programs.",
    optionB: "You are giving the app creators permission to read and copy your private files.",
    optionC: "The software rewires your phone settings to turn off your automatic system updates.",
    correctOption: 'B',
    explanation: "Apps often ask for way more access than they actually need to do their job. Always double-check what you are agreeing to share!"
  }
];

// 8 Snake scenarios
const SNAKE_SCENARIOS: GameScenario[] = [
  {
    id: 'S1',
    context: "You get an urgent email from your \"bank\" asking you to update your profile. What is the most reliable way to check if it is a scam?",
    optionA: "Look at the sender's profile picture to see if it matches the bank's official logo.",
    optionB: "Check if the message uses your correct first name instead of a generic greeting.",
    optionC: "Look closely at the sender's actual web address to see if the bank's name is misspelled.",
    correctOption: 'C',
    explanation: "Logos and names are easily faked. Checking the actual web link characters behind the sender name reveals who really sent it."
  },
  {
    id: 'S2',
    context: "Your friend says downloading a free game file from a random forum is totally safe if your phone's scanner didn't flag it. Why is this wrong?",
    optionA: "Phone security scanners are programmed to only check files bought from official app stores.",
    optionB: "Brand-new malicious files can easily bypass basic scanners until the security system updates.",
    optionC: "Downloading unverified files will instantly and permanently burn out your phone's processor chip.",
    correctOption: 'B',
    explanation: "Brand-new malware easily bypasses basic scanners. Unverified downloads are never completely safe."
  },
  {
    id: 'S3',
    context: "What makes using a digital password manager application safer than writing your login details down in a standard notes app?",
    optionA: "Password managers automatically hide your phone's screen from nearby people while you log in.",
    optionB: "Password managers use advanced network signals to block hackers from guessing your accounts.",
    optionC: "They securely lock your data behind a single master key and scramble the stored information.",
    correctOption: 'C',
    explanation: "Standard notes apps store text in plain view. If someone accesses your phone, they get everything. Password managers keep data locked and encrypted."
  },
  {
    id: 'S4',
    context: "You post a trendy \"Get to know me\" challenge online listing your first pet's name and childhood school. Is this a security hazard?",
    optionA: "Yes, because scammers use these specific personal details to guess your account safety questions.",
    optionB: "Yes, because social media apps will automatically flag your profile as a bot and restrict your account.",
    optionC: "No, because public posts are automatically filtered by your phone's built-in network firewall.",
    correctOption: 'A',
    explanation: "Cybercriminals research targets online. Scammers use these casual personal details to guess your security questions and bypass account recovery screens."
  },
  {
    id: 'S5',
    context: "Why do modern chat applications use \"End-to-End Encryption\" for sending messages and files?",
    optionA: "It speeds up your cellular data network so large photos upload twice as fast.",
    optionB: "It automatically deletes your chat history from your local device after 24 hours.",
    optionC: "It scrambles the data so that anyone intercepting the internet signal cannot read the text.",
    correctOption: 'C',
    explanation: "Encryption scrambles your data so it can't be read if intercepted. Without it, your online info is open to anyone along the path."
  },
  {
    id: 'S6',
    context: "Why do hackers use automated software \"bots\" to attack student portals instead of targeting people manually?",
    optionA: "Bots consume less electricity.",
    optionB: "Bots can try thousands of stolen password combinations every second across multiple profiles at once.",
    optionC: "Automated programs are legally allowed to bypass data privacy laws on public networks.",
    correctOption: 'B',
    explanation: "Bots automate the guessing process, testing thousands of stolen passwords every second to crack weak accounts instantly."
  },
  {
    id: 'S7',
    context: "Your laptop has a security feature that locks the screen after 2 minutes of inactivity. What major risk does this actually solve?",
    optionA: "It stops your computer hardware from overheating when running heavy background apps.",
    optionB: "It prevents dangerous websites from downloading hidden browser extensions while you are away.",
    optionC: "It stops unauthorized people nearby from physically accessing your open data or logged-in accounts.",
    correctOption: 'C',
    explanation: "Digital defenses don't matter if a stranger can physically walk up to your unlocked device and access your info."
  },
  {
    id: 'S8',
    context: "You find an unauthorized \"modded\" version of a premium app available for free on a random website. What is the main security risk?",
    optionA: "The app store will remotely block your device from ever installing official software updates.",
    optionB: "The developers likely injected hidden data-stealing code into the app before making it free.",
    optionC: "Your phone's battery life will permanently drop to zero percent within a few days of use.",
    correctOption: 'B',
    explanation: "Free versions of paid apps are major traps. Fake clones are frequently used to harvest login details and spy on private device data."
  }
];

// Set up the board data
// Grid coordinates for player movement calculations
interface BoardSquare {
  idx: number; // 1 to 49
  type: 'normal' | 'ladder-start' | 'ladder-end' | 'snake-head' | 'snake-tail';
  connectsTo?: number;
  label?: string;
}

// Spacing out 4 ladders and 7 snakes on 7x7 board perfectly
const LADDERS_MAP: Record<number, number> = {
  2: 17,
  10: 23,
  27: 39,
  35: 46
};

const SNAKES_MAP: Record<number, number> = {
  48: 33,
  44: 24,
  40: 19,
  29: 11,
  25: 6,
  20: 4,
  12: 3
};

export default function RaceToServersGame({ profile, updateProfile, theme = 'dark', onQuit }: RaceToServersGameProps) {
  const [playerPosition, setPlayerPosition] = useState<number>(1);
  const [hackerPosition, setHackerPosition] = useState<number>(1);
  const [activeTurn, setActiveTurn] = useState<'player' | 'hacker'>('player');
  const [diceRoll, setDiceRoll] = useState<number>(1);
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const [gameWon, setGameWon] = useState<boolean>(false);
  const [winner, setWinner] = useState<'player' | 'hacker' | null>(null);
  const [showIntroModal, setShowIntroModal] = useState<boolean>(true);
  
  // Game log feed (narrative logs)
  const [gameLogs, setGameLogs] = useState<string[]>([
    "🚨 Security dispatch received: An active hacker is sniffing the campus networks! Reach the School Servers on square 49 first to deploy the lockout shield!"
  ]);

  // Modal State for Scenarios
  const [showScenarioModal, setShowScenarioModal] = useState<boolean>(false);
  const [currentScenario, setCurrentScenario] = useState<GameScenario | null>(null);
  const [scenarioType, setScenarioType] = useState<'ladder' | 'snake' | null>(null);
  const [landmarkSquare, setLandmarkSquare] = useState<number>(1);
  const [destinationSquare, setDestinationSquare] = useState<number>(1);
  const [selectedScenarioAnswer, setSelectedScenarioAnswer] = useState<'A' | 'B' | 'C' | 'IDK' | null>(null);
  const [scenarioAnswered, setScenarioAnswered] = useState<boolean>(false);
  const [scenarioSuccess, setScenarioSuccess] = useState<boolean>(false);
  const [usedLadderScenarios, setUsedLadderScenarios] = useState<string[]>([]);
  const [usedSnakeScenarios, setUsedSnakeScenarios] = useState<string[]>([]);

  // Transition Popup state
  const [showTransitionPopup, setShowTransitionPopup] = useState<boolean>(false);
  const [transitionDetails, setTransitionDetails] = useState<{
    character: 'player' | 'hacker';
    type: 'ladder' | 'snake';
    success: boolean;
    fromSquare: number;
    toSquare: number;
    title: string;
    description: string;
    explanation: string;
  } | null>(null);

  // Automatically trigger Hacker AI Turn rolls
  useEffect(() => {
    if (activeTurn === 'hacker' && !isRolling && !gameWon && !showIntroModal) {
      const timeout = setTimeout(() => {
        executeHackerTurn();
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [activeTurn, isRolling, gameWon, showIntroModal]);

  // Stepping Animation for Player (moderate walk speed for normal moves, slightly faster for long slides/climbs)
  const animatePlayerMove = (from: number, to: number, onComplete: () => void) => {
    if (from === to) {
      onComplete();
      return;
    }
    const isUp = to > from;
    let current = from;
    const interval = setInterval(() => {
      current = isUp ? current + 1 : current - 1;
      setPlayerPosition(current);
      if (current === to) {
        clearInterval(interval);
        onComplete();
      }
    }, Math.abs(to - from) > 6 ? 90 : 250);
  };

  // Stepping Animation for Hacker (moderate walk speed for normal moves, slightly faster for long slides/climbs)
  const animateHackerMove = (from: number, to: number, onComplete: () => void) => {
    if (from === to) {
      onComplete();
      return;
    }
    const isUp = to > from;
    let current = from;
    const interval = setInterval(() => {
      current = isUp ? current + 1 : current - 1;
      setHackerPosition(current);
      if (current === to) {
        clearInterval(interval);
        onComplete();
      }
    }, Math.abs(to - from) > 6 ? 90 : 250);
  };

  // Roll dice for the active character
  const handleRollClick = () => {
    if (isRolling || gameWon || activeTurn !== 'player' || showIntroModal) return;

    setIsRolling(true);
    let finalRoll = 1;
    let iterations = 0;
    
    const interval = setInterval(() => {
      finalRoll = Math.floor(Math.random() * 6) + 1;
      setDiceRoll(finalRoll);
      iterations++;
      
      if (iterations > 6) {
        clearInterval(interval);
        executePlayerMove(finalRoll);
      }
    }, 100);
  };

  // Move the student (Player) step-by-step
  const executePlayerMove = (roll: number) => {
    const startPos = playerPosition;
    let targetPos = startPos + roll;
    if (targetPos > 49) targetPos = 49;

    animatePlayerMove(startPos, targetPos, () => {
      handlePlayerLand(targetPos, roll, startPos);
    });
  };

  const handlePlayerLand = (targetPos: number, roll: number, startPos: number) => {
    if (targetPos >= 49) {
      setPlayerPosition(49);
      setGameWon(true);
      setWinner('player');
      setGameLogs(prev => [
        `🏆 CONGRATULATIONS! You reached Square 49, locked down the central School Server Room, and successfully saved everybody's student data!`,
        ...prev
      ]);
      setIsRolling(false);

      // Reward points securely
      updateProfile((prev: UserProfile) => {
        const alreadyGames = prev.completedGames.indexOf('game-snakes') !== -1;
        const newGames = alreadyGames ? prev.completedGames : [...prev.completedGames, 'game-snakes'];
        
        let newBadges = [...prev.badges];
        if (prev.badges.indexOf('badge-snake-survivor') === -1) {
          newBadges.push('badge-snake-survivor');
        }

        const calculatedLevel = calculateLevelFromXP(prev.xp + 100);

        return {
          ...prev,
          xp: prev.xp + 100,
          completedGames: newGames,
          badges: newBadges,
          level: Math.max(prev.level, calculatedLevel)
        };
      });
      return;
    }

    setGameLogs(prev => [
      `🎒 You rolled a ${roll} and walked to square ${targetPos}.`,
      ...prev
    ]);

    // Check if the target position triggers a snake or a ladder
    if (LADDERS_MAP[targetPos]) {
      // Trigger Ladder Scenario (Challenge)
      const destination = LADDERS_MAP[targetPos];
      // Pick random ladder scenario
      const availableLadders = LADDER_SCENARIOS.filter(s => !usedLadderScenarios.includes(s.id));
      const pool = availableLadders.length > 0 ? availableLadders : LADDER_SCENARIOS;
      const scenario = pool[Math.floor(Math.random() * pool.length)];
      setUsedLadderScenarios(prev => [...prev, scenario.id]);
      
      setTimeout(() => {
        setLandmarkSquare(targetPos);
        setDestinationSquare(destination);
        setCurrentScenario(scenario);
        setScenarioType('ladder');
        setSelectedScenarioAnswer(null);
        setScenarioAnswered(false);
        setShowScenarioModal(true);
        setIsRolling(false);
      }, 700);
      
    } else if (SNAKES_MAP[targetPos]) {
      // Trigger Snake Scenario (Hazard)
      const destination = SNAKES_MAP[targetPos];
      // Pick random snake scenario
      const availableSnakes = SNAKE_SCENARIOS.filter(s => !usedSnakeScenarios.includes(s.id));
      const snakePool = availableSnakes.length > 0 ? availableSnakes : SNAKE_SCENARIOS;
      const scenario = snakePool[Math.floor(Math.random() * snakePool.length)];
      setUsedSnakeScenarios(prev => [...prev, scenario.id]);
      
      setTimeout(() => {
        setLandmarkSquare(targetPos);
        setDestinationSquare(destination);
        setCurrentScenario(scenario);
        setScenarioType('snake');
        setSelectedScenarioAnswer(null);
        setScenarioAnswered(false);
        setShowScenarioModal(true);
        setIsRolling(false);
      }, 700);

    } else {
      // Clean square, turn passes to Hacker
      setTimeout(() => {
        setIsRolling(false);
        setActiveTurn('hacker');
      }, 1000);
    }
  };

  // Submit Answer in Scenario Modal
  const handleScenarioAnswerSubmit = (option: 'A' | 'B' | 'C' | 'IDK') => {
    if (!currentScenario || scenarioAnswered) return;

    setSelectedScenarioAnswer(option);
    const isCorrect = currentScenario.correctOption === option;
    setScenarioSuccess(isCorrect);
    setScenarioAnswered(true);
  };

  // Close Scenario modal and pass turn
  const handleCloseScenarioModal = () => {
    if (!currentScenario || !scenarioType) return;
    
    const isCorrect = scenarioSuccess;
    const option = selectedScenarioAnswer || 'IDK';

    setShowScenarioModal(false);

    if (scenarioType === 'ladder') {
      if (isCorrect) {
        setGameLogs(prev => [
          `🟩 BOOSTED! You solved the challenge successfully at cell ${landmarkSquare}! You leaped up to square ${destinationSquare}.`,
          ...prev
        ]);
        animatePlayerMove(landmarkSquare, destinationSquare, () => {
          checkAndPassTurn();
        });
      } else {
        const logMsg = option === 'IDK'
          ? `ℹ️ You were unsure about the security choice at cell ${landmarkSquare}, so you standardly stayed at square ${landmarkSquare}.`
          : `ℹ️ You missed the security boost opportunity at cell ${landmarkSquare}, but did not fall. You remain at cell ${landmarkSquare}.`;
        setGameLogs(prev => [logMsg, ...prev]);
        checkAndPassTurn();
      }
    } else { // snake
      if (isCorrect) {
        setGameLogs(prev => [
          `🛡️ BLOCKED! You spotted the hazard at square ${landmarkSquare}! Saved by your choice, you avoid the slide penalty.`,
          ...prev
        ]);
        checkAndPassTurn();
      } else {
        const logMsg = option === 'IDK'
          ? `🟥 SLIDED! You were unsure how to defend at square ${landmarkSquare}. The hacker circumvented your undecided status and you slipped backward to square ${destinationSquare}!`
          : `🟥 SLIDED! The hacker bypassed defenses at square ${landmarkSquare} because of a lapse. You slipped backward to square ${destinationSquare}!`;
        setGameLogs(prev => [logMsg, ...prev]);
        animatePlayerMove(landmarkSquare, destinationSquare, () => {
          checkAndPassTurn();
        });
      }
    }
  };

  // Close Transition Popup and execute visible move on the board
  const handleCloseTransitionPopup = () => {
    setShowTransitionPopup(false);
    
    if (!transitionDetails) return;

    const { fromSquare, toSquare } = transitionDetails;
    setTransitionDetails(null);

    // For Hacker: visibly move on board now
    animateHackerMove(fromSquare, toSquare, () => {
      setIsRolling(false);
      setActiveTurn('player');
    });
  };

  const checkAndPassTurn = () => {
    setCurrentScenario(null);
    setScenarioType(null);
    setIsRolling(false);
    
    if (!gameWon) {
      setActiveTurn('hacker');
    }
  };

  // Execute Hacker AI Move (Luck loop)
  const executeHackerTurn = () => {
    if (gameWon || showIntroModal) return;

    setIsRolling(true);
    let roll = 1;
    let iterations = 0;
    
    const interval = setInterval(() => {
      roll = Math.floor(Math.random() * 6) + 1;
      setDiceRoll(roll);
      iterations++;
      
      if (iterations > 6) {
        clearInterval(interval);
        finalizeHackerMove(roll);
      }
    }, 100);
  };

  const finalizeHackerMove = (roll: number) => {
    const startPos = hackerPosition;
    let targetPos = startPos + roll;

    if (targetPos >= 49) {
      targetPos = 49;
      animateHackerMove(startPos, 49, () => {
        setHackerPosition(49);
        setGameWon(true);
        setWinner('hacker');
        setGameLogs(prev => [
          `❌ OH NO! The Hacker reached Square 49, breezed past the central locks, compromised the School database, and stolen the students information! Better luck next time.`,
          ...prev
        ]);
        setIsRolling(false);
      });
      return;
    }

    animateHackerMove(startPos, targetPos, () => {
      let hackerLogs = [`💻 The Hacker rolled a ${roll} and moved from square ${startPos} to ${targetPos}.`];

      // Check if hacker landed on a ladder (auto success)
      if (LADDERS_MAP[targetPos]) {
        const destination = LADDERS_MAP[targetPos];
        const randomTexts = [
          // Authentication & Passwords
          "guessed a weak student portal key to bypass the entryway.",
          "successfully brute-forced a profile using a common default password: 'password123'.",
          "intercepted a login session because a user reused their exact portal password on a sketchy site.",
          "guessed a student's password easily because it was just their date of birth.",

          // Physical & Session Oversight
          "hijacked an active public session terminal left logged in by a busy student.",
          "walked right past a propped-open door into the central ICT admin room.",
          "spotted a student typing their portal PIN over their shoulder in a crowded lecture hall.",
          "found an unlocked laptop left completely unattended at a library workspace.",

          // Social & Interpersonal
          "tricked a student leader into forwarding an official verification code over DM.",
          "posed as an IT technician over a phone call to coax account access from an unsuspecting student.",
          "conned a student into downloading a malicious 'free assignment helper' app that logged their keys.",
          "baited students with a fake scholarship link, harvesting credentials from everyone who registered.",

          // Network & Data Exposure
          "extracted hardcoded credentials found exposed inside a shared repository.",
          "intercepted student traffic on an unencrypted, open campus public Wi-Fi access point.",
          "scraped a student's full registration details from an uncropped payment receipt posted in a group chat.",
          "harvested login tokens using a fraudulent third-party portal backup link shared during an outage."
        ];
        const chosenText = randomTexts[Math.floor(Math.random() * randomTexts.length)];

        setTransitionDetails({
          character: 'hacker',
          type: 'ladder',
          success: true,
          fromSquare: targetPos,
          toSquare: destination,
          title: '💻 Hacker Shortcut Exploited!',
          description: `The hacker ${chosenText} Hacker has leaped from Square ${targetPos} up to Square ${destination}!`,
          explanation: `System Weakness: ${chosenText}`
        });

        const updatedLogs = [
          `🔥 Hacker exploit: ${chosenText} Advanced from Square ${targetPos} up to Square ${destination}!`,
          ...hackerLogs
        ];
        setGameLogs(prev => [...updatedLogs, ...prev]);
        setShowTransitionPopup(true);

      } else if (SNAKES_MAP[targetPos]) {
        const destination = SNAKES_MAP[targetPos];
        const randomTexts = [
          // Active Student Defenses
          "A vigilant student reported a suspicious login alert, causing the system to lock the hacker out.",
          "A student refused to click a fake assignment submission link, completely ruining the hacker's phishing hook.",
          "A student cropped their private banking details out of a registration receipt, leaving the hacker with zero clues.",
          "A student noticed a stranger shoulder-surfing their password and blocked their view, cutting off the hacker's access.",
          
          // Physical & Environmental Security
          "A student closed and locked a propped-open computer lab door, keeping the hacker physically locked out.",
          "A student spotted a suspicious black tracking box taped under a desk and alerted the IT helpdesk immediately.",
          "A student safely handed an unknown flash drive to the front desk without checking the contents, dodging the trap.",
          "A student logged completely out of a library PC before leaving, stranding the hacker at an empty login screen.",

          // Platform & System Blocks
          "The hacker’s malicious script was flagged and instantly quarantined by the school's updated endpoint security.",
          "The hacker guessed a password but was completely blocked by a mandatory phone authentication prompt.",
          "The campus network triggered a high-alert tripwire and automatically isolated the hacker's connection.",
          "The school forced a system-wide critical software update, patching the exact security flaw the hacker was exploiting.",

          // Comedic / Local Mishaps
          "The hacker's power grid failed mid-attack, causing their local system to shut down abruptly before saving progress.",
          "The hacker accidentally ran their own malicious code internally, infecting their own system instead of the school's.",
          "The hacker spilled a drink directly onto their main system keyboard during a critical script deployment.",
          "The hacker's system crashed under heavy load because they forgot to clear their own background logs."
        ];
        const chosenText = randomTexts[Math.floor(Math.random() * randomTexts.length)];

        setTransitionDetails({
          character: 'hacker',
          type: 'snake',
          success: false,
          fromSquare: targetPos,
          toSquare: destination,
          title: '🛡️ Hacker Threat Neutralized!',
          description: `${chosenText} The hacker has moved from Square ${targetPos} back to Square ${destination}.`,
          explanation: `Defender Safeguard: ${chosenText}`
        });

        const updatedLogs = [
          `💥 Defender block: ${chosenText} Hacker slide penalty back to Square ${destination}!`,
          ...hackerLogs
        ];
        setGameLogs(prev => [...updatedLogs, ...prev]);
        setShowTransitionPopup(true);

      } else {
        setGameLogs(prev => [...hackerLogs, ...prev]);
        setIsRolling(false);
        setActiveTurn('player');
      }
    });
  };

  // Reset the Board Game
  const handleRestart = () => {
    setPlayerPosition(1);
    setHackerPosition(1);
    setActiveTurn('player');
    setDiceRoll(1);
    setIsRolling(false);
    setGameWon(false);
    setWinner(null);
    setUsedLadderScenarios([]);
    setUsedSnakeScenarios([]);
    setGameLogs([
      "🧹 Game reset! The threat levels have re-synchronized. Reach the Server Room on square 49 first to secure the campus data!"
    ]);
  };

  // Color mappings for Light vs Dark theme aesthetics
  const panelBg = theme === 'light' ? 'bg-[#F1F5F9] border-slate-200 text-slate-800' : 'bg-[#161B22] border-[#30363D] text-[#E2E8F0]';
  const cardBg = theme === 'light' ? 'bg-white border-slate-200' : 'bg-[#161B22] border-[#30363D]';
  const controlBoxBg = theme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-[#0D0F12] border-[#30363D]';
  const logBoxBg = theme === 'light' ? 'bg-white border-slate-200 text-slate-700' : 'bg-[#0D0F12] border-[#30363D] text-[#8B949E]';
  
  // Custom headers or highlights
  const headingText = theme === 'light' ? 'text-slate-900' : 'text-[#F0F6FC]';
  const descriptionText = theme === 'light' ? 'text-slate-600' : 'text-[#8B949E]';
  const primaryButton = theme === 'light' ? 'bg-blue-600 hover:bg-blue-500 text-white' : 'bg-[#58A6FF] hover:bg-[#58A6FF]/95 text-[#0D0F12]';

  const getButtonClass = (opt: 'A' | 'B' | 'C') => {
    if (!currentScenario) return '';
    const isThisCorrect = currentScenario.correctOption === opt;
    if (!scenarioAnswered) {
      return theme === 'light'
        ? 'bg-slate-50 border-slate-250 hover:bg-slate-100/70 text-slate-800'
        : 'bg-[#0D0F12] border-[#30363D] hover:border-[#8B949E]/30 text-[#F0F6FC]';
    }
    if (selectedScenarioAnswer === opt) {
      return isThisCorrect
        ? 'bg-emerald-500/15 border-emerald-500 text-emerald-600 dark:text-emerald-400'
        : 'bg-rose-500/15 border-rose-500 text-rose-600 dark:text-rose-400';
    }
    if (isThisCorrect && selectedScenarioAnswer === 'IDK') {
      return 'bg-emerald-500/10 border-emerald-400 text-emerald-600 dark:text-emerald-400 border-dashed';
    }
    return theme === 'light'
      ? 'opacity-40 bg-slate-50 border-slate-200 text-slate-400 pointer-events-none'
      : 'opacity-40 bg-[#0D0F12] border-[#30363D] text-slate-650 pointer-events-none';
  };

  const getIdkButtonClass = () => {
    if (!scenarioAnswered) {
      return theme === 'light'
        ? 'bg-slate-50 border-slate-250 hover:bg-slate-100/70 text-slate-800'
        : 'bg-[#0D0F12] border-[#30363D] hover:border-[#8B949E]/30 text-[#F0F6FC]';
    }
    if (selectedScenarioAnswer === 'IDK') {
      return 'bg-blue-500/15 border-blue-500 text-blue-600 dark:text-blue-550';
    }
    return theme === 'light'
      ? 'opacity-40 bg-slate-50 border-slate-200 text-slate-400 pointer-events-none'
      : 'opacity-40 bg-[#0D0F12] border-[#30363D] text-slate-650 pointer-events-none';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-2xl border p-4 sm:p-6 space-y-6 ${panelBg}`}
    >
      {/* Introfactions & Title headers */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-dashed border-slate-300 dark:border-[#30363D] pb-5">
        <div className="space-y-1.5 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold bg-rose-500/10 text-rose-500 border border-rose-500/20 px-2.5 py-0.5 rounded-full uppercase tracking-wider animate-pulse flex items-center gap-1">
              <Flame className="w-3 h-3 text-red-500" />
              Threat Level Mode
            </span>
          </div>
          <h3 className={`text-xl font-extrabold flex items-center gap-2 ${headingText}`}>
            <Dice5 className="w-5 h-5 text-blue-500 shrink-0" />
            Race to the School Servers!
          </h3>
          <p className={`text-xs ${descriptionText}`}>
            Deploy the lockout shield at <strong>Square 49</strong> first to win!
          </p>
        </div>

        <button
          onClick={handleRestart}
          className={`px-3.5 py-2 hover:opacity-90 text-xs font-black rounded-lg transition-all shrink-0 cursor-pointer flex items-center justify-center gap-1.5 border ${theme === 'light' ? 'bg-slate-200 hover:bg-slate-300 text-slate-900 border-slate-400' : 'bg-[#30363D] hover:bg-[#30363D]/80 text-slate-200 border-[#30363D]'}`}
        >
          <RotateCcw className="w-3.5 h-3.5" /> Re-sync Board
        </button>
      </div>

      {/* Primary Grid Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-12 justify-center">
        
        {/* LEFT COMPONENT: 10x10 Grid Board layout */}
        <div className="lg:col-span-7 xl:col-span-6 space-y-3 w-full lg:max-w-[500px] mx-auto">
          {/* Header indicator row showing progress bar */}
          <div className="flex items-center justify-between text-xs font-bold px-2 py-1 select-none">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-blue-500 flex items-center justify-center text-[7px] text-white">🎒</div>
              <span className={theme === 'light' ? 'text-slate-700' : 'text-slate-300'}>Your Progress: Sq. {playerPosition}</span>
            </div>
            
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-600 flex items-center justify-center text-[7px] text-white">💻</div>
              <span className="text-rose-500 font-extrabold">Hacker Progress: Sq. {hackerPosition}</span>
            </div>
          </div>

          <div className={`grid grid-cols-7 gap-1 sm:gap-1.5 p-2 sm:p-3 rounded-2xl border ${theme === 'light' ? 'bg-slate-200 border-slate-300' : 'bg-[#0D0F12] border-[#30363D]'}`}>
            {Array.from({ length: 49 }).map((_, i) => {
              // Row - Col arithmetic for a 7x7 grid moving in an aesthetic snake path layout (Boustrophedon)
              const visualRowIndex = Math.floor(i / 7); // Row 0 is visual TOP, Row 6 is visual BOTTOM
              const relativeCol = i % 7;
              const actualRowIndexFromBottom = 6 - visualRowIndex; // Row 0 is bottom row (squares 1-7)
              
              const squareIdx = actualRowIndexFromBottom % 2 === 1 
                ? (actualRowIndexFromBottom * 7) + (7 - relativeCol) // odd row maps right to left (indices start with row, offset by inverted column index)
                : (actualRowIndexFromBottom * 7) + (relativeCol + 1); // even row maps left to right

              const isUserPresent = playerPosition === squareIdx;
              const isHackerPresent = hackerPosition === squareIdx;

              const isLadderSource = !!LADDERS_MAP[squareIdx];
              const isSnakeHead = !!SNAKES_MAP[squareIdx];

              // Grid Item colors depending on theme
              let cellClass = theme === 'light' 
                ? 'bg-slate-50 border-slate-300/80 text-slate-800 hover:bg-white' 
                : 'bg-[#161B22] border-[#30363D] text-[#8B949E] hover:border-[#8B949E]/15';

              if (isLadderSource) {
                cellClass = theme === 'light'
                  ? 'bg-emerald-50 border-emerald-400 text-emerald-800'
                  : 'bg-emerald-950/20 border-emerald-500/40 text-emerald-400';
              } else if (isSnakeHead) {
                cellClass = theme === 'light'
                  ? 'bg-red-50 border-red-400 text-red-100 dark:text-red-800' // let's maintain simple readable text classes
                  : 'bg-rose-950/20 border-red-500/40 text-rose-400';
              } else if (squareIdx === 49) {
                cellClass = 'bg-blue-500/10 border-blue-500 text-blue-500 font-extrabold shadow-inner shadow-blue-500/5 pulse';
              } else if (squareIdx === 1) {
                cellClass = theme === 'light' ? 'bg-blue-50 border-blue-400 text-blue-800 font-semibold' : 'bg-blue-500/15 border-blue-500/40 text-[#58A6FF]';
              }

              return (
                <div
                  key={squareIdx}
                  className={`aspect-square rounded-lg flex flex-col items-center justify-between p-1 border transition-all relative ${cellClass} ${
                    isUserPresent && 'ring-2 ring-blue-500 ring-offset-1 dark:ring-offset-black z-20 scale-103 shadow-md'
                  } ${
                    isHackerPresent && !isUserPresent && 'ring-2 ring-rose-600 ring-offset-1 dark:ring-offset-black z-20 scale-103'
                  }`}
                  title={`Square ${squareIdx}`}
                >
                  {/* Square Indexing Number */}
                  <span className={`text-[8.5px] font-black font-mono self-start leading-none opacity-60 ${isUserPresent ? 'text-blue-500' : isHackerPresent ? 'text-rose-500' : ''}`}>
                    {squareIdx}
                  </span>

                  {/* Character pawn indicators overlay */}
                  <div className="flex items-center justify-center gap-1 select-none flex-1">
                    {isUserPresent && (
                      <motion.div
                        layoutId="raceUserPawn"
                        className="w-5 h-5 bg-blue-500 border border-white dark:border-slate-900 rounded-full flex items-center justify-center text-xs shadow-md z-30"
                        title="You (Student Defender)"
                      >
                        🎒
                      </motion.div>
                    )}
                    
                    {isHackerPresent && (
                      <motion.div
                        layoutId="raceHackerPawn"
                        className="w-5 h-5 bg-rose-600 border border-white dark:border-slate-900 rounded-full flex items-center justify-center text-xs shadow-md z-30"
                        title="Hacker AI"
                      >
                        💻
                      </motion.div>
                    )}

                    {!isUserPresent && !isHackerPresent && (
                      <>
                        {isLadderSource && (
                          <span className="text-[11px] animate-bounce shrink-0" title={`Ladder starts here, climbs up to square ${LADDERS_MAP[squareIdx]}`}>
                            🪜
                          </span>
                        )}
                        {isSnakeHead && (
                          <span className="text-[11px] animate-pulse shrink-0" title={`Snake starts here, slides back to square ${SNAKES_MAP[squareIdx]}`}>
                            🐍
                          </span>
                        )}
                      </>
                    )}
                  </div>

                  <span className="text-[6.5px] font-bold tracking-tight uppercase line-clamp-1 w-full text-center opacity-70">
                    {squareIdx === 1 ? 'Start' : squareIdx === 49 ? 'Servers!' : ''}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT COMPONENT: Visual Command consoles */}
        <div className="lg:col-span-5 xl:col-span-6 flex flex-col gap-4">
          
          {/* Active play controls block */}
          <div className={`p-4 sm:p-5 rounded-2xl border flex flex-col justify-between gap-4 ${cardBg}`}>
            <div className="space-y-3.5">
              <div className="text-center space-y-1 select-none">
                <span className="text-[10px] sm:text-xxs font-black text-slate-500 dark:text-[#8B949E] uppercase tracking-widest block">
                  Interactive Dice Module
                </span>

                <div className="flex items-center justify-center gap-4 py-2 border-b border-dashed border-slate-200 dark:border-slate-800">
                  <motion.div
                    animate={isRolling ? { rotate: [0, 180, 360], scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 0.5 }}
                    className="w-14 h-14 bg-slate-100 dark:bg-black/40 border-2 border-slate-300 dark:border-[#30363D] flex items-center justify-center text-4xl font-extrabold text-slate-900 dark:text-[#F0F6FC] rounded-2xl shadow-sm font-sans"
                  >
                    {diceRoll}
                  </motion.div>

                  <div className="text-left">
                    <span className="text-[9px] uppercase tracking-wider font-bold block opacity-78 text-slate-500 dark:text-slate-400">Current Turn</span>
                    <span className={`text-xs font-black block uppercase ${
                      activeTurn === 'player' ? 'text-blue-500' : 'text-rose-500 animate-pulse'
                    }`}>
                      {activeTurn === 'player' ? '🎒 Your Turn' : '💻 Hacker Turn'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Dynamic Status / Actions CTA buttons */}
              {activeTurn === 'player' ? (
                <div className="space-y-2">
                  <button
                    disabled={isRolling || gameWon}
                    onClick={handleRollClick}
                    className={`w-full py-4 rounded-xl text-xs font-black shadow-md cursor-pointer transition-all active:scale-98 flex items-center justify-center gap-2 ${primaryButton} disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    <Dice5 className="w-4 h-4" />
                    Roll Dice & Move 🚀
                  </button>
                  <p className="text-[10px] italic text-center text-slate-500 dark:text-slate-400 leading-normal">
                    Roll the system dice to advance. Correct decisions grant shortcut boosts; wrong ones trigger hacker slides!
                  </p>
                </div>
              ) : (
                <div className="space-y-2 p-3 bg-rose-500/5 rounded-xl border border-rose-500/10 text-center">
                  <div className="flex items-center justify-center gap-2 text-rose-500 font-bold text-xs uppercase animate-pulse">
                    <AlertTriangle className="w-4.5 h-4.5 text-rose-500" />
                    <span>Hacker Automating Attack...</span>
                  </div>
                  <p className="text-[10px] text-rose-450 font-mono leading-normal">
                    Wait for your turn! The hacker is calculating operations...
                  </p>
                </div>
              )}
            </div>

            {/* Tactical Security Log brought directly underneath */}
            <div className="flex flex-col border-t border-dashed border-slate-200 dark:border-slate-800 pt-3.5 mt-2">
              <span className={`text-[10px] font-bold uppercase tracking-wider block mb-2 font-mono ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>
                🛡️ Tactical Security Log
              </span>
              
              <div className={`h-48 overflow-y-auto text-[10px] font-mono space-y-2.5 p-3 rounded-xl border ${theme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-black/30 border-slate-800'} flex-1`}>
                {gameLogs.map((log, idx) => (
                  <div key={idx} className="border-b border-slate-200/50 dark:border-slate-800/10 pb-1.5 last:border-0 leading-relaxed">
                    {log}
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* GAME SCENARIO CHALLENGE MODAL: Sells the choice beautifully in light and dark mode */}
      <AnimatePresence>
        {showScenarioModal && currentScenario && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              className={`max-w-lg w-full max-h-[88vh] overflow-y-auto rounded-2xl p-6 shadow-2xl border space-y-6 ${
                theme === 'light' ? 'bg-white border-slate-300 text-slate-900' : 'bg-[#161B22] border-[#30363D] text-[#E2E8F0]'
              }`}
            >
              <div className="flex items-center gap-3 border-b border-dashed border-slate-200 dark:border-slate-800 pb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  scenarioType === 'ladder' 
                    ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 animate-bounce' 
                    : 'bg-rose-500/10 text-rose-500 border border-rose-500/20 animate-pulse'
                }`}>
                  {scenarioType === 'ladder' ? (
                    <ShieldCheck className="w-5.5 h-5.5" />
                  ) : (
                    <AlertTriangle className="w-5.5 h-5.5" />
                  )}
                </div>
                <div>
                  <h4 className="font-extrabold text-sm uppercase tracking-tight leading-none">
                    {scenarioType === 'ladder' ? '🛡️ Ladder Challenge' : '⚠️ Snake Trap!'}
                  </h4>
                  <p className={`text-[11px] mt-1 ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>
                    {scenarioType === 'ladder' 
                      ? `Landed on Ladder head at Square ${landmarkSquare}. Solve correctly to secure a shortcut up to ${destinationSquare}!`
                      : `Landed on Snake trap at Square ${landmarkSquare}. Solve correctly to defend your square; fail and slide down to ${destinationSquare}!`
                    }
                  </p>
                </div>
              </div>

              {/* Scenario Context - Large font and very clear narrative styling */}
              <div className={`p-4.5 rounded-xl border leading-relaxed text-xs sm:text-sm font-semibold ${
                theme === 'light' ? 'bg-slate-100 border-slate-250 text-slate-800' : 'bg-black/30 border-slate-850 text-[#F0F6FC]'
              }`}>
                {currentScenario.context}
              </div>

              {/* Scenario Choices */}
              <div className="space-y-3">
                <span className="text-[10px] font-strong uppercase tracking-wider block opacity-70">
                  Select your system decision:
                </span>

                <button
                  disabled={scenarioAnswered}
                  onClick={() => handleScenarioAnswerSubmit('A')}
                  className={`w-full text-left p-4 rounded-xl border text-xs sm:text-xs.5 font-bold transition-all relative cursor-pointer ${getButtonClass('A')}`}
                >
                  <div className="flex gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0 border border-blue-500/10 font-black">A</span>
                    <span>{currentScenario.optionA}</span>
                  </div>
                </button>

                <button
                  disabled={scenarioAnswered}
                  onClick={() => handleScenarioAnswerSubmit('B')}
                  className={`w-full text-left p-4 rounded-xl border text-xs sm:text-xs.5 font-bold transition-all relative cursor-pointer ${getButtonClass('B')}`}
                >
                  <div className="flex gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0 border border-blue-500/10 font-black">B</span>
                    <span>{currentScenario.optionB}</span>
                  </div>
                </button>

                {currentScenario.optionC && (
                  <button
                    disabled={scenarioAnswered}
                    onClick={() => handleScenarioAnswerSubmit('C')}
                    className={`w-full text-left p-4 rounded-xl border text-xs sm:text-xs.5 font-bold transition-all relative cursor-pointer ${getButtonClass('C')}`}
                  >
                    <div className="flex gap-2">
                      <span className="w-5 h-5 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0 border border-blue-500/10 font-black">C</span>
                      <span>{currentScenario.optionC}</span>
                    </div>
                  </button>
                )}

                <button
                  disabled={scenarioAnswered}
                  onClick={() => handleScenarioAnswerSubmit('IDK')}
                  className={`w-full text-left p-4 rounded-xl border text-xs sm:text-xs.5 font-bold transition-all relative cursor-pointer ${getIdkButtonClass()}`}
                >
                  <div className="flex gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0 border border-blue-500/10 font-black">?</span>
                    <span>I'm not sure</span>
                  </div>
                </button>
              </div>

              {/* Explanations shown AFTER answering */}
              <AnimatePresence>
                {scenarioAnswered && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="space-y-4 pt-3 border-t border-dashed border-slate-200 dark:border-slate-800"
                  >
                    <div className="flex items-center gap-2">
                      {scenarioSuccess ? (
                        <div className="flex items-center gap-1 text-emerald-600 dark:text-[#3FB950] font-extrabold text-xs">
                          <CheckCircle2 className="w-4.5 h-4.5 text-[#3FB950] shrink-0" />
                          <span>Safe Decision! Well Observed.</span>
                        </div>
                      ) : selectedScenarioAnswer === 'IDK' ? (
                        <div className="flex items-center gap-1 text-blue-600 dark:text-blue-500 font-extrabold text-xs">
                          <HelpCircle className="w-4.5 h-4.5 text-blue-500 shrink-0" />
                          <span>Safest Practice Lesson:</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-rose-600 dark:text-red-400 font-extrabold text-xs">
                          <XCircle className="w-4.5 h-4.5 text-rose-500 shrink-0" />
                          <span>Vuln Check Failed! Dangerous outcome.</span>
                        </div>
                      )}
                    </div>

                    <div className={`p-4 rounded-xl text-xs space-y-1 border ${
                      scenarioSuccess 
                        ? theme === 'light' 
                          ? 'bg-emerald-50 border-emerald-200 text-slate-750' 
                          : 'bg-emerald-500/5 border-emerald-500/10 text-slate-300'
                        : selectedScenarioAnswer === 'IDK'
                          ? theme === 'light'
                            ? 'bg-blue-55 border-blue-200 text-slate-750'
                            : 'bg-blue-500/5 border-blue-500/10 text-slate-350'
                          : theme === 'light'
                            ? 'bg-rose-50 border-rose-200 text-slate-750'
                            : 'bg-rose-500/5 border-rose-500/10 text-slate-350'
                    }`}>
                      <p className="font-semibold text-[10.5px] uppercase tracking-wider">Security Explanation Summary:</p>
                      <p className="leading-relaxed whitespace-pre-line text-xs italic">{currentScenario.explanation}</p>
                    </div>

                    <button
                      onClick={handleCloseScenarioModal}
                      className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs rounded-xl shadow-md transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                    >
                      Apply Action & Pass Turn
                      <ArrowRight className="w-4 h-4 shrink-0" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* TRANSITION RESULTS DIALOG */}
      <AnimatePresence>
        {showTransitionPopup && transitionDetails && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 z-55">
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              className={`max-w-md w-full rounded-2xl p-6 shadow-2xl border space-y-5 ${
                theme === 'light' ? 'bg-white border-slate-300 text-slate-900' : 'bg-[#161B22] border-[#30363D] text-[#E2E8F0]'
              }`}
            >
              <div className="flex items-center gap-3 border-b border-dashed border-slate-200 dark:border-slate-800 pb-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  transitionDetails.character === 'player'
                    ? transitionDetails.success
                      ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                      : 'bg-rose-500/10 text-rose-500 border border-rose-500/20'
                    : transitionDetails.type === 'ladder'
                      ? 'bg-[#ffeef0] dark:bg-rose-500/10 text-rose-500 border border-rose-500/20'
                      : 'bg-[#e6ffed] dark:bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                }`}>
                  {transitionDetails.character === 'player' ? (
                    transitionDetails.success ? <ShieldCheck className="w-5.5 h-5.5" /> : <XCircle className="w-5.5 h-5.5" />
                  ) : (
                    transitionDetails.type === 'ladder' ? <Zap className="w-5.5 h-5.5 text-rose-500" /> : <ShieldCheck className="w-5.5 h-5.5" />
                  )}
                </div>
                <div>
                  <h4 className="font-extrabold text-sm uppercase tracking-tight leading-none">
                    {transitionDetails.title}
                  </h4>
                  <p className={`text-[11px] mt-1 ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>
                    {transitionDetails.character === 'player' ? 'Verification Outcome & Action' : 'Automatic Network Event'}
                  </p>
                </div>
              </div>

              {/* Position Change Indicator */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-500/5 border border-dashed border-slate-200 dark:border-slate-800 text-center">
                <div className="flex flex-col items-center flex-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Start Square</span>
                  <span className="text-lg font-black font-mono">{transitionDetails.fromSquare}</span>
                </div>
                
                <div className="flex items-center justify-center px-2">
                  <ArrowRight className={`w-5 h-5 ${
                    transitionDetails.fromSquare === transitionDetails.toSquare 
                      ? 'text-slate-400' 
                      : transitionDetails.toSquare > transitionDetails.fromSquare 
                        ? 'text-emerald-500 animate-pulse' 
                        : 'text-rose-500 animate-pulse'
                  }`} />
                </div>

                <div className="flex flex-col items-center flex-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Target Square</span>
                  <span className="text-lg font-black font-mono">{transitionDetails.toSquare}</span>
                </div>
              </div>

              {/* Description */}
              <p className={`text-xs leading-relaxed font-semibold italic p-4 rounded-xl border ${
                theme === 'light' ? 'bg-slate-50 border-slate-200 text-slate-800' : 'bg-black/20 border-slate-850 text-[#F0F6FC]'
              }`}>
                "{transitionDetails.description}"
              </p>

              <button
                onClick={handleCloseTransitionPopup}
                className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs rounded-xl shadow-md transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-1.5"
              >
                Close & Update Board
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CONGRATULATIONS WIN DIALOG */}
      <AnimatePresence>
        {gameWon && winner === 'player' && (
          <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 z-55">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className={`max-w-md w-full rounded-3xl p-8 shadow-2xl border text-center space-y-6 ${
                theme === 'light' ? 'bg-white border-slate-300 text-slate-900' : 'bg-[#1D212A] border-[#30363D] text-[#E2E8F0]'
              }`}
            >
              {/* Trophy with Sparkles */}
              <div className="relative inline-block mx-auto">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 blur-sm opacity-75 animate-pulse"></div>
                <div className="relative w-20 h-20 rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/30 flex items-center justify-center animate-bounce">
                  <Trophy className="w-10 h-10 text-blue-500" />
                </div>
              </div>

              {/* Congratulations Message */}
              <div className="space-y-3">
                <h4 className="font-extrabold text-xl sm:text-2xl tracking-tight text-blue-500 uppercase">
                  Mission Accomplished!
                </h4>
                <p className="text-sm font-bold tracking-normal leading-relaxed px-2">
                  Congratulations! You reached the Server before the Hacker and successfully saved everyone's data.
                </p>
              </div>

              {/* Bonus Rewards Summary */}
              <div className={`p-4 rounded-xl border border-dashed ${
                theme === 'light' ? 'bg-slate-50 border-slate-250 text-slate-800' : 'bg-[#161B22]/50 border-slate-800 text-slate-200'
              } text-xs font-mono space-y-2`}>
                <span className="text-[10px] uppercase font-bold text-blue-500 tracking-wider block">Rewards Granted:</span>
                <div className="flex justify-around items-center pt-1">
                  <div className="flex flex-col items-center">
                    <span className="text-lg font-black text-emerald-500">+100 XP</span>
                    <span className="text-[9px] text-[#8B949E]">Security Mastery</span>
                  </div>
                  <div className="h-6 w-px bg-slate-200 dark:bg-slate-800" />
                  <div className="flex flex-col items-center">
                    <span className="text-lg">🛡️</span>
                    <span className="text-[9px] text-[#8B949E]">Snake Survivor Badge</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => {
                  if (onQuit) {
                    onQuit();
                  } else {
                    handleRestart();
                  }
                }}
                className="w-full py-4 bg-blue-500 hover:bg-blue-400 text-slate-950 font-black text-xs rounded-xl shadow-lg transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2 uppercase tracking-wider h-12"
              >
                Close & Return to Games
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* DEFEAT DIALOG */}
      <AnimatePresence>
        {gameWon && winner === 'hacker' && (
          <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 z-55">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className={`max-w-md w-full rounded-3xl p-8 shadow-2xl border text-center space-y-6 ${
                theme === 'light' ? 'bg-white border-slate-300 text-slate-900' : 'bg-[#1D212A] border-[#30363D] text-[#E2E8F0]'
              }`}
            >
              <div className="w-20 h-20 rounded-full bg-rose-500/10 text-rose-500 border border-rose-500/30 flex items-center justify-center mx-auto animate-pulse">
                <AlertTriangle className="w-10 h-10 text-rose-500" />
              </div>

              <div className="space-y-3">
                <h4 className="font-extrabold text-xl sm:text-2xl tracking-tight text-rose-500 uppercase">
                  Server Compromised!
                </h4>
                <p className="text-sm font-semibold leading-relaxed px-4">
                  The Hacker managed to bypass school networks and reached the central servers first.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleRestart}
                  className="flex-1 py-3 bg-slate-600 hover:bg-slate-500 text-white font-bold text-xs rounded-xl transition-all active:scale-98 cursor-pointer uppercase tracking-wider h-11"
                >
                  Try Again 🔄
                </button>
                <button
                  onClick={() => {
                    if (onQuit) {
                      onQuit();
                    } else {
                      handleRestart();
                    }
                  }}
                  className="flex-1 py-3 bg-[#30363D] hover:bg-[#30363D]/80 text-[#F0F6FC] font-bold text-xs rounded-xl transition-all active:scale-98 cursor-pointer border border-[#30363D] uppercase tracking-wider h-11"
                >
                  Exit Game
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* INTRO STORY DIALOG */}
      <AnimatePresence>
        {showIntroModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`max-w-md w-full rounded-2xl p-6 shadow-2xl border space-y-6 ${
                theme === 'light' ? 'bg-white border-slate-300 text-slate-900' : 'bg-[#161B22] border-[#30363D] text-[#E2E8F0]'
              }`}
            >
              <div className="text-center space-y-3">
                <div className="mx-auto w-14 h-14 rounded-full bg-rose-500/10 text-rose-500 border border-rose-500/20 flex items-center justify-center">
                  <Flame className="w-8 h-8 text-rose-500 animate-pulse" />
                </div>
                <h4 className="font-black text-lg sm:text-xl tracking-tight leading-none uppercase text-rose-500">
                  🎒 Race to the School Servers!
                </h4>
                <p className={`text-[10px] font-mono tracking-wider uppercase ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>
                  Cyber-Defense Mission Board
                </p>
              </div>

              <div className={`p-4 rounded-xl border leading-relaxed text-xs sm:text-sm space-y-3 ${
                theme === 'light' ? 'bg-slate-100 border-slate-200 text-slate-800' : 'bg-black/40 border-[#30363D] text-[#F0F6FC]'
              }`}>
                <p>
                  The stage is set! You have been notified that a hacker is attempting to break into the school's ICT department and steal all the students' private information.
                </p>
                <p>
                  But here is the good news: <strong>you have the power to stop them by making the right security choices!</strong> Safe choices will give you a dynamic boost, while poor mistakes will trigger hacker exploits that slide you backward.
                </p>
                <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg text-xs leading-relaxed text-blue-500 font-bold text-center">
                  Let the race to the servers begin! ⚡🏁
                </div>
              </div>

              <button
                onClick={() => setShowIntroModal(false)}
                className="w-full py-4 bg-rose-600 hover:bg-rose-500 text-white font-black text-xs rounded-xl shadow-lg transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2 tracking-wider uppercase"
              >
                Let's Play! 🚀
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}
