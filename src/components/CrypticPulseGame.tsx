import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Shield,
  Clock,
  TerminalSquare,
  RefreshCw,
  HandMetal,
} from "lucide-react";
import { UserProfile } from "../types";

interface CrypticPulseProps {
  profile: UserProfile;
  updateProfile: (
    profile: UserProfile | ((prev: UserProfile) => UserProfile),
  ) => void;
  theme?: "light" | "dark";
  onQuit: () => void;
}

// 1. Core Encryption Engine
const shiftChar = (char: string, shift: number): string => {
  const code = char.charCodeAt(0);
  if (code >= 65 && code <= 90) {
    // Uppercase
    let newCode = code + shift;
    while (newCode > 90) newCode -= 26;
    while (newCode < 65) newCode += 26;
    return String.fromCharCode(newCode);
  }
  return char;
};

const CORPUS = [
  // 3-letter
  "CAT", "DOG", "SUN", "HAT", "BOX", "CUP", "RED", "BUS", "CAR", "PEN", "RUN", "FLY", "SKY", "SEA", "ICE",
  "ANT", "BAT", "COW", "FOX", "OWL", "PIG", "RAT", "TOE", "EAR", "EYE", "ARM", "LIP", "LEG", "BOY", "MEN",
  "TOY", "MAP", "KEY", "JAM", "EGG", "CAN", "MUG", "PAN", "BED", "NET", "ZIP", "WEB", "VAN", "JET", "NUT",
  // 4-letter
  "BOOK", "TREE", "MILK", "BIRD", "FISH", "STAR", "MOON", "COIN", "DESK", "FIRE", "WIND", "SNOW", "RAIN",
  "ROCK", "SAND", "DIRT", "LEAF", "BUSH", "ROSE", "LILY", "BEAR", "LION", "WOLF", "DEER", "FROG", "TOAD",
  "DUCK", "SWAN", "CRAB", "CLAM", "SHOE", "SOCK", "COAT", "BELT", "RING", "DOOR", "WALL", "ROOF", "ROOM",
  // 5-letter
  "APPLE", "CHAIR", "TABLE", "BREAD", "WATER", "HOUSE", "TRAIN", "PLANT", "CLOCK", "SMILE", "SLEEP",
  "SNAKE", "MOUSE", "HORSE", "SHEEP", "GRASS", "CLOUD", "STORM", "STONE", "RIVER", "OCEAN", "BEACH",
  "SHIRT", "PANTS", "DRESS", "GLOVE", "SCARF", "WATCH", "FLOOR", "STAIR", "PORCH", "FENCE", "GATE",
  // 6-letter
  "PLANET", "FLOWER", "WINDOW", "CASTLE", "ROCKET", "GUITAR", "PENCIL", "CAMERA", "ISLAND", "ORANGE",
  "ANIMAL", "MONKEY", "RABBIT", "TURTLE", "LIZARD", "FOREST", "DESERT", "VALLEY", "CANYON", "STREAM",
  "JACKET", "SWEATY", "POCKET", "BUTTON", "COLLAR", "CEILING", "CLOSET", "GARAGE", "CELLAR", "ATTIC",
  // 7-letter
  "DIAMOND", "MACHINE", "JOURNEY", "MONSTER", "PICTURE", "VILLAGE", "BLANKET", "STATION", "WEATHER",
  "DOLPHIN", "PENGUIN", "OSTRICH", "GORILLA", "LEOPARD", "VOLCANO", "TORNADO", "TSUNAMI", "GLACIER",
  "SWEATER", "PAJAMAS", "SLIPPER", "SNEAKER", "SANDALS", "KITCHEN", "BEDROOM", "BALCONY", "HALLWAY",
  // 8-letter
  "MOUNTAIN", "COMPUTER", "DINOSAUR", "ELEVATOR", "ELEPHANT", "HOSPITAL", "SURPRISE", "TREASURE",
  "KANGAROO", "FLAMINGO", "ALLIGATOR", "HURRICANE", "BLIZZARD", "AVALANCHE", "SUNSHINE", "MOONLIGHT",
  "UMBRELLA", "SCARVES", "BATHROOM", "BASEMENT", "DRIVEWAY", "CORRIDOR", "ENTRANCE", "BACKYARD",
];

interface Task {
  word: string;
  mode: "encrypt" | "decrypt";
  key: number;
  target: string;
}

const generateTask = (score: number, usedWords: string[]): Task => {
  let targetLength = 3;
  if (score >= 10) {
    targetLength = 4 + Math.floor((score - 10) / 5);
  }
  targetLength = Math.min(8, targetLength);

  let wordCandidates = CORPUS.filter(
    (w) => w.length === targetLength && !usedWords.includes(w)
  );

  if (wordCandidates.length === 0) {
    wordCandidates = CORPUS.filter((w) => w.length === targetLength);
  }
  if (wordCandidates.length === 0) {
    wordCandidates = CORPUS;
  }

  const plainWord =
    wordCandidates[Math.floor(Math.random() * wordCandidates.length)];

  let mode: "encrypt" | "decrypt" = "encrypt";
  let shiftKey = 1;

  if (score < 5) {
    // 0-4 words: encrypt only with +1
    mode = "encrypt";
    shiftKey = 1;
  } else if (score < 10) {
    // 5-9 words: encrypt/decrypt +1 or -1
    mode = Math.random() > 0.5 ? "encrypt" : "decrypt";
    shiftKey = mode === "encrypt" ? 1 : -1;
  } else if (score < 15) {
    // 10-14 words: max +3 for encryption, min -3 for decryption
    mode = Math.random() > 0.5 ? "encrypt" : "decrypt";
    const mag = Math.floor(Math.random() * 3) + 1; // 1, 2, 3
    shiftKey = mode === "encrypt" ? mag : -mag;
  } else {
    // 15+ words: max +5 for encryption, min -5 for decryption
    mode = Math.random() > 0.5 ? "encrypt" : "decrypt";
    const mag = Math.floor(Math.random() * 5) + 1; // 1 to 5
    shiftKey = mode === "encrypt" ? mag : -mag;
  }

  let displayedWord = plainWord;
  let targetWord = "";

  if (mode === "encrypt") {
    // The user sees the plain word and applies the positive shiftKey
    targetWord = plainWord
      .split("")
      .map((c) => shiftChar(c, shiftKey))
      .join("");
  } else {
    // mode === "decrypt"
    // The user must apply the negative shiftKey to the displayed scrambled word to get the plain word
    targetWord = plainWord; 
    // If the user's shift is negative, it means: plainWord = displayedWord + shiftKey
    // Therefore, displayedWord = plainWord - shiftKey
    displayedWord = plainWord
      .split("")
      .map((c) => shiftChar(c, -shiftKey))
      .join("");
  }

  return {
    word: displayedWord,
    mode,
    key: shiftKey,
    target: targetWord,
  };
};

export default function CrypticPulseGame({
  profile,
  updateProfile,
  theme = "dark",
  onQuit,
}: CrypticPulseProps) {
  const [gameState, setGameState] = useState<
    | "idle"
    | "slide1"
    | "slide2"
    | "slide3"
    | "instructions"
    | "playing"
    | "gameover"
  >("slide1");
  const [timeLeft, setTimeLeft] = useState(60);
  const [score, setScore] = useState(0);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [logs, setLogs] = useState<
    { id: number; text: string; success: boolean }[]
  >([]);
  const [usedWords, setUsedWords] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const [flashColor, setFlashColor] = useState<"none" | "green" | "red">(
    "none",
  );

  // Trigger auto-focus
  useEffect(() => {
    if (gameState === "playing" && inputRef.current) {
      inputRef.current.focus();
    }
  }, [gameState, currentTask]);

  const beginGame = () => {
    setGameState("playing");
    setTimeLeft(60);
    setScore(0);
    setLogs([]);
    setUsedWords([]);
    setCurrentTask(generateTask(0, []));
    setInputValue("");
  };

  // 2. The Timer & Game Loop Engine
  useEffect(() => {
    let timer: any;
    if (gameState === "playing" && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && gameState === "playing") {
      setGameState("gameover");
      // Award XP based on score
      if (score > 0) {
        updateProfile((prev) => {
          const newGames = prev.completedGames.includes("cryptic")
            ? prev.completedGames
            : [...prev.completedGames, "cryptic"];
            
          let newBadges = [...prev.badges];
          if (score >= 5 && !newBadges.includes("badge-cryptic-pulse")) {
            newBadges.push("badge-cryptic-pulse");
          }

          return {
            ...prev,
            xp: prev.xp + score * 10, // 10 XP per packet
            completedGames: newGames,
            badges: newBadges,
          };
        });
      }
    }
    return () => clearInterval(timer);
  }, [gameState, timeLeft, score, updateProfile]);

  const addLog = (text: string, success: boolean) => {
    setLogs((prev) => [{ id: Date.now(), text, success }, ...prev].slice(0, 5));
  };

  const evaluateInput = (input: string) => {
    if (!currentTask) return;

    const filteredInput = input.replace(/[^a-zA-Z]/g, "");

    if (filteredInput.length >= currentTask.target.length) {
      if (filteredInput.toUpperCase() === currentTask.target) {
        setScore((prev) => prev + 1);
        setInputValue("");
        setFlashColor("green");
        setTimeout(() => setFlashColor("none"), 300);
        addLog(`[SECURED] ${currentTask.word} -> ${currentTask.target}`, true);
        const newUsed = [...usedWords, currentTask.word];
        setUsedWords(newUsed);
        setCurrentTask(generateTask(score + 1, newUsed));
      } else {
        setInputValue("");
        setFlashColor("red");
        setTimeout(() => setFlashColor("none"), 300);
        addLog(`[FAILED] Mismatch on ${currentTask.word}`, false);
        const newUsed = [...usedWords, currentTask.word];
        setUsedWords(newUsed);
        setCurrentTask(generateTask(score, newUsed));
      }
    } else {
      setInputValue(filteredInput.toUpperCase());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (
        inputValue.length > 0 &&
        currentTask &&
        inputValue.toUpperCase() !== currentTask.target
      ) {
        setInputValue("");
        setFlashColor("red");
        setTimeout(() => setFlashColor("none"), 300);
        addLog(`[FAILED] Mismatch on ${currentTask.word}`, false);
        const newUsed = [...usedWords, currentTask.word];
        setUsedWords(newUsed);
        setCurrentTask(generateTask(score, newUsed));
      }
    }
  };

  if (gameState === "idle") {
    return (
      <div
        className={`border rounded-2xl p-6 sm:p-10 max-w-2xl w-full mx-auto space-y-6 ${
          theme === "light"
            ? "bg-white border-slate-200 shadow-xl"
            : "bg-[#161B22] border-[#30363D]"
        }`}
      >
        <div className="text-center space-y-4">
          <TerminalSquare
            className={`w-16 h-16 mx-auto ${theme === "light" ? "text-fuchsia-600" : "text-fuchsia-500"}`}
          />
          <h2
            className={`text-2xl sm:text-3xl font-black tracking-tight ${theme === "light" ? "text-slate-900" : "text-[#F0F6FC]"}`}
          >
            Operation: Cryptic Pulse
          </h2>
          <p
            className={`text-sm leading-relaxed ${theme === "light" ? "text-slate-600" : "text-[#8B949E]"}`}
          >
            Welcome to the Campus IT Team! Before we put you on the front lines
            to protect our network, you need to sharpen your security skills. If
            a hacker ever tries to spy on our campus chats, you'll need to be
            fast enough to lock them out.
            <br />
            <br />
            This simulator is your training ground. You have exactly{" "}
            <strong>60 seconds</strong> to practice scrambling (encrypting)
            everyday words into secret codes, or unscrambling (decrypting) them.
            The faster you process these test words, the higher your defense
            score!
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setGameState("instructions")}
              className="px-6 py-3 w-full sm:w-auto bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-bold rounded-xl transition-colors shadow-md"
            >
              Start Training
            </button>
            <button
              onClick={onQuit}
              className={`px-6 py-3 w-full sm:w-auto font-bold rounded-xl transition-colors ${
                theme === "light"
                  ? "bg-slate-100 hover:bg-slate-200 text-slate-700"
                  : "bg-[#30363D] hover:bg-slate-700 text-[#E2E8F0]"
              }`}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (["slide1", "slide2", "slide3"].includes(gameState)) {
    return (
      <div
        className={`border rounded-2xl p-6 sm:p-10 max-w-2xl w-full mx-auto space-y-6 relative ${
          theme === "light"
            ? "bg-white border-slate-200 shadow-xl"
            : "bg-[#161B22] border-[#30363D]"
        }`}
      >
        <button
          onClick={beginGame}
          className={`absolute top-4 right-4 text-xs font-bold px-3 py-1.5 rounded-lg border transition-all ${
            theme === "light"
              ? "bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200"
              : "bg-[#0D0F12] border-[#30363D] text-[#8B949E] hover:text-[#C9D1D9]"
          }`}
        >
          Skip Intro
        </button>

        {gameState === "slide1" && (
          <div className="space-y-4 pt-4">
            <h2
              className={`text-2xl font-black ${theme === "light" ? "text-slate-900" : "text-[#F0F6FC]"}`}
            >
              Brief Intro to Caesar Cipher
            </h2>
            <h3
              className={`text-lg font-bold ${theme === "light" ? "text-fuchsia-600" : "text-fuchsia-400"}`}
            >
              What is a Caesar Cipher?
            </h3>
            <p
              className={`text-sm leading-relaxed ${theme === "light" ? "text-slate-600" : "text-[#8B949E]"}`}
            >
              Long ago, the famous Roman leader Julius Caesar needed to send
              secret messages to his generals. If an enemy intercepted the
              messenger, Caesar didn't want them reading his military plans.
              <br />
              <br />
              So, he invented a simple trick: shifting the alphabet. Instead of
              writing the real letters, he replaced them with letters further
              down the alphabet line.
            </p>
            <div className="pt-6 flex gap-4">
              <button
                onClick={onQuit}
                className={`px-6 py-2.5 font-bold rounded-xl transition-colors ${theme === "light" ? "bg-slate-100 hover:bg-slate-200 text-slate-700" : "bg-[#30363D] hover:bg-slate-700 text-[#E2E8F0]"}`}
              >
                Back
              </button>
              <button
                onClick={() => setGameState("slide2")}
                className="px-6 py-2.5 bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-bold rounded-xl transition-colors relative flex-1 text-center"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {gameState === "slide2" && (
          <div className="space-y-4 pt-4">
            <h2
              className={`text-2xl font-black ${theme === "light" ? "text-slate-900" : "text-[#F0F6FC]"}`}
            >
              Brief Intro to Caesar Cipher
            </h2>
            <h3
              className={`text-lg font-bold ${theme === "light" ? "text-fuchsia-600" : "text-fuchsia-400"}`}
            >
              How the Shift Works
            </h3>
            <p
              className={`text-sm leading-relaxed ${theme === "light" ? "text-slate-600" : "text-[#8B949E]"}`}
            >
              To use this code, you just need a secret number called{" "}
              <strong>The Key</strong>. The key tells you how many spaces each
              letter needs to "hop" forward or backward.
              <br />
              <br />
              For example, if your Key is <strong>+1</strong>:
              <br />
              <strong>A</strong> hops forward 1 space and becomes{" "}
              <strong>B</strong>.<br />
              <strong>B</strong> hops forward 1 space and becomes{" "}
              <strong>C</strong>.<br />
              <br />
              The word "<strong>CAT</strong>" easily turns into "
              <strong>DBU</strong>".
            </p>
            <div className="pt-6 flex gap-4">
              <button
                onClick={() => setGameState("slide1")}
                className={`px-6 py-2.5 font-bold rounded-xl transition-colors ${theme === "light" ? "bg-slate-100 hover:bg-slate-200 text-slate-700" : "bg-[#30363D] hover:bg-slate-700 text-[#E2E8F0]"}`}
              >
                Back
              </button>
              <button
                onClick={() => setGameState("slide3")}
                className="px-6 py-2.5 bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-bold rounded-xl transition-colors relative flex-1 text-center"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {gameState === "slide3" && (
          <div className="space-y-4 pt-4">
            <h2
              className={`text-2xl font-black ${theme === "light" ? "text-slate-900" : "text-[#F0F6FC]"}`}
            >
              Brief Intro to Caesar Cipher
            </h2>
            <h3
              className={`text-lg font-bold ${theme === "light" ? "text-fuchsia-600" : "text-fuchsia-400"}`}
            >
              Scramble vs. Unscramble
            </h3>
            <p
              className={`text-sm leading-relaxed ${theme === "light" ? "text-slate-600" : "text-[#8B949E]"}`}
            >
              In your training simulator, you will practice two modes:
              <br />
              <br />
              <strong>Encrypt (Scramble):</strong> You move the letters forward
              using the key to hide the message.
              <br />
              <br />
              <strong>Decrypt (Unscramble):</strong> You move the letters
              backward using the key to figure out what the original word was.
              <br />
              <br />
              Get ready to test your speed!
            </p>
            <div className="pt-6 flex gap-4">
              <button
                onClick={() => setGameState("slide2")}
                className={`px-6 py-2.5 font-bold rounded-xl transition-colors ${theme === "light" ? "bg-slate-100 hover:bg-slate-200 text-slate-700" : "bg-[#30363D] hover:bg-slate-700 text-[#E2E8F0]"}`}
              >
                Back
              </button>
              <button
                onClick={() => setGameState("idle")}
                className="px-6 py-2.5 bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-bold rounded-xl transition-colors relative flex-1 text-center"
              >
                I'm Ready!
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (gameState === "instructions") {
    return (
      <div
        className={`border rounded-2xl p-6 sm:p-10 max-w-2xl w-full mx-auto space-y-6 ${
          theme === "light"
            ? "bg-white border-slate-200 shadow-xl"
            : "bg-[#161B22] border-[#30363D]"
        }`}
      >
        <div className="space-y-4">
          <h2
            className={`text-2xl font-black ${theme === "light" ? "text-slate-900" : "text-[#F0F6FC]"}`}
          >
            How to Play: Cryptic Pulse
          </h2>
          <p
            className={`text-sm ${theme === "light" ? "text-slate-600" : "text-[#8B949E]"}`}
          >
            You are the encryption engine. To secure the network, you must shift
            letters forwards or backwards according to the rule provided. The
            faster you act, the more packets you secure! Note: The alphabet
            loops around, so after Z comes A.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div
              className={`p-4 rounded-xl border ${theme === "light" ? "bg-blue-50 border-blue-100" : "bg-blue-950/20 border-blue-500/20"}`}
            >
              <h3
                className={`text-sm font-bold uppercase mb-2 ${theme === "light" ? "text-blue-700" : "text-blue-400"}`}
              >
                Encrypt (Shift Forward)
              </h3>
              <p
                className={`text-xs mb-3 ${theme === "light" ? "text-slate-700" : "text-slate-300"}`}
              >
                Move letters ahead in the alphabet. For example, if shift is{" "}
                <strong>+1</strong>:
              </p>
              <ul className="text-sm font-mono space-y-1 font-bold">
                <li>CAT {"->"} DBU</li>
                <li>SUN {"->"} TVO</li>
                <li>DOG {"->"} EPH</li>
              </ul>
            </div>

            <div
              className={`p-4 rounded-xl border ${theme === "light" ? "bg-amber-50 border-amber-100" : "bg-amber-950/20 border-amber-500/20"}`}
            >
              <h3
                className={`text-sm font-bold uppercase mb-2 ${theme === "light" ? "text-amber-700" : "text-amber-400"}`}
              >
                Decrypt (Shift Backward)
              </h3>
              <p
                className={`text-xs mb-3 ${theme === "light" ? "text-slate-700" : "text-slate-300"}`}
              >
                Move letters back in the alphabet. For example, if shift is{" "}
                <strong>-1</strong>:
              </p>
              <ul className="text-sm font-mono space-y-1 font-bold">
                <li>DBU {"->"} CAT</li>
                <li>TVO {"->"} SUN</li>
                <li>EPH {"->"} DOG</li>
              </ul>
            </div>
          </div>

          <div className="pt-6 flex items-center justify-center gap-4">
            <button
              onClick={onQuit}
              className={`px-6 py-3 font-bold rounded-xl transition-colors ${
                theme === "light"
                  ? "bg-slate-100 hover:bg-slate-200 text-slate-700"
                  : "bg-[#30363D] hover:bg-slate-700 text-[#E2E8F0]"
              }`}
            >
              Cancel
            </button>
            <button
              onClick={beginGame}
              className="px-8 py-3 bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-bold rounded-xl transition-colors shadow-md"
            >
              Ready!
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === "gameover") {
    return (
      <div
        className={`border rounded-2xl p-6 sm:p-10 max-w-2xl w-full mx-auto space-y-6 text-center ${
          theme === "light"
            ? "bg-white border-slate-200 shadow-xl"
            : "bg-[#161B22] border-[#30363D]"
        }`}
      >
        <HandMetal className="w-16 h-16 mx-auto text-orange-500 mb-4" />
        <h2
          className={`text-3xl font-black ${theme === "light" ? "text-slate-900" : "text-[#F0F6FC]"}`}
        >
          Transmission Terminated
        </h2>
        <div
          className={`p-6 rounded-2xl border flex flex-col items-center justify-center gap-2 ${
            theme === "light"
              ? "bg-fuchsia-50 border-fuchsia-100"
              : "bg-[#0D0F12] border-fuchsia-500/20"
          }`}
        >
          <span
            className={`text-sm font-bold uppercase tracking-wider ${theme === "light" ? "text-fuchsia-600" : "text-fuchsia-400"}`}
          >
            Packets Secured
          </span>
          <span
            className={`text-6xl font-black font-mono ${theme === "light" ? "text-slate-900" : "text-[#F0F6FC]"}`}
          >
            {score}
          </span>
          <span
            className={`text-xs mt-2 ${theme === "light" ? "text-slate-500" : "text-[#8B949E]"}`}
          >
            +{score * 10} XP Earned
          </span>
        </div>
        <div className="flex gap-4 justify-center pt-4">
          <button
            onClick={beginGame}
            className="px-6 py-3 bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-bold rounded-xl transition-colors flex gap-2 items-center"
          >
            <RefreshCw className="w-4 h-4" /> Play Again
          </button>
          <button
            onClick={onQuit}
            className={`px-6 py-3 font-bold rounded-xl transition-colors ${
              theme === "light"
                ? "bg-slate-100 hover:bg-slate-200 text-slate-700"
                : "bg-[#30363D] hover:bg-slate-700 text-[#E2E8F0]"
            }`}
          >
            Back to Games
          </button>
        </div>
      </div>
    );
  }

  // Playing state
  const isEncrypt = currentTask?.mode === "encrypt";
  const bgColor = theme === "light" ? "bg-slate-50" : "bg-[#0D0F12]";
  const headerText = theme === "light" ? "text-slate-800" : "text-white";
  const borderColor =
    flashColor === "green"
      ? "border-emerald-500"
      : flashColor === "red"
        ? "border-rose-500"
        : theme === "light"
          ? "border-slate-300"
          : "border-[#30363D]";

  return (
    <div
      className={`border rounded-2xl p-6 max-w-2xl w-full mx-auto space-y-6 ${
        theme === "light"
          ? "bg-white border-slate-200 shadow-xl"
          : "bg-[#161B22] border-[#30363D]"
      }`}
    >
      <div className="flex justify-between items-center bg-slate-900 text-white px-5 py-3 rounded-xl shadow-inner font-mono">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-emerald-400" />
          <span className="font-bold">Secured: {score}</span>
        </div>
        <div
          className={`flex items-center gap-2 font-black text-xl ${timeLeft <= 10 ? "text-rose-500 animate-pulse" : "text-sky-400"}`}
        >
          <Clock className="w-5 h-5" />
          00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 space-y-6">
          <div
            className={`border-2 rounded-2xl p-6 text-center transition-colors duration-200 ${borderColor} ${
              isEncrypt
                ? theme === "light"
                  ? "bg-blue-50"
                  : "bg-blue-950/20"
                : theme === "light"
                  ? "bg-amber-50"
                  : "bg-amber-950/20"
            }`}
          >
            <h3
              className={`text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full inline-block mb-4 ${
                isEncrypt
                  ? "text-blue-600 bg-blue-100 dark:bg-blue-500/20 dark:text-blue-400"
                  : "text-amber-600 bg-amber-100 dark:bg-amber-500/20 dark:text-amber-400"
              }`}
            >
              {isEncrypt ? "ENCRYPT THIS" : "DECRYPT THIS"}
            </h3>

            <div
              className={`text-4xl sm:text-5xl font-black font-mono tracking-[0.2em] mb-4 ${headerText}`}
            >
              {currentTask?.word}
            </div>

            <div className={`text-sm font-bold opacity-80 ${headerText}`}>
              Shift:{" "}
              {currentTask?.key > 0 ? `+${currentTask.key}` : currentTask?.key}{" "}
              (A {"->"} {shiftChar("A", currentTask?.key || 0)})
            </div>
          </div>

          <div>
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => evaluateInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`Type ${currentTask?.target.length} letters...`}
              className={`w-full text-center text-3xl font-mono font-black uppercase tracking-[0.3em] py-4 rounded-xl border-2 outline-none transition-colors ${
                theme === "light"
                  ? "bg-white border-slate-300 focus:border-fuchsia-500 text-slate-900 placeholder:text-slate-300"
                  : "bg-[#0D0F12] border-[#30363D] focus:border-fuchsia-500 text-white placeholder:text-slate-700"
              }`}
              maxLength={currentTask?.target.length}
              autoComplete="off"
              spellCheck="false"
            />
          </div>
        </div>

        {/* Rolling Log */}
        <div
          className={`w-full md:w-64 border rounded-xl p-4 flex flex-col font-mono text-xs overflow-hidden ${
            theme === "light"
              ? "bg-slate-50 border-slate-200"
              : "bg-[#0D0F12] border-[#30363D]"
          }`}
        >
          <div
            className={`font-bold mb-3 pb-2 border-b ${theme === "light" ? "text-slate-500 border-slate-200" : "text-slate-500 border-slate-800"}`}
          >
            NETWORK LOG
          </div>
          <div className="flex-1 flex flex-col justify-start gap-2 relative">
            <AnimatePresence>
              {logs.map((log) => (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={
                    log.success
                      ? "text-emerald-500 dark:text-emerald-400"
                      : "text-rose-500 dark:text-rose-400"
                  }
                >
                  {log.text}
                </motion.div>
              ))}
            </AnimatePresence>
            {logs.length === 0 && (
              <div className="text-slate-400 dark:text-slate-600 italic">
                Waiting for input...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
