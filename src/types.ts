/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface UserProfile {
  defenderName: string;
  avatarId: string;
  profileImageUrl?: string;
  xp: number;
  level: number;
  streak: number;
  badges: string[];
  completedQuizzes: string[]; // Quiz IDs
  completedChecklist: string[]; // Task IDs
  completedGames: string[]; // Game IDs
  completedCourses?: string[]; // Course IDs
  university: string;
  completedWalkthrough?: boolean;
  selectedLevel?: 'Newbie' | 'Beginner' | 'Intermediate';
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  iconName: string; // lucide icon name
  criteria: string;
  category: 'academy' | 'games' | 'checklist' | 'general';
}

export interface InteractiveCheck {
  question: string;
  options: string[];
  correctOptionIndex: number;
  successMessage: string;
  failureMessage: string;
  xpReward: number;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  content: string; // Markdown / Text content
  interactiveCheck?: InteractiveCheck;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface Course {
  id: string;
  title: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  description: string;
  iconName: string;
  xpWorth: number;
  learningObjectives?: string[];
  lessons: Lesson[];
  quiz: {
    id: string;
    xpWorth: number;
    questions: QuizQuestion[];
  };
}

export interface ChecklistTask {
  id: string;
  title: string;
  description: string;
  whyItMatters?: string;
  rewardXp: number;
  category: 'account' | 'mobile' | 'phishing' | 'password';
  interactiveGuide: string[]; // Step by step instructions
}

export interface LeaderboardEntry {
  defenderName: string;
  avatarId: string;
  xp: number;
  level: number;
  university: string;
  isUser?: boolean;
}

export interface PhishingScenario {
  id: string;
  sender: string;
  senderEmail: string;
  subject: string;
  body: string;
  isPhishing: boolean;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  clues: string[]; // elements that make it suspicious (e.g., misspelled domain, urgeny)
  baitType: 'Free Data' | 'Scholarship' | 'Bank Security' | 'WhatsApp Fraud' | 'General';
  level?: number;
  isWhatsApp?: boolean;
}

export interface BoardCell {
  index: number;
  type: 'normal' | 'snake-head' | 'ladder-start' | 'ladder-end' | 'snake-tail';
  connectsTo?: number; // Target cell index if snake or ladder
  message?: string; // Reason for snake or ladder
  habitName?: string; // E.g., "Enabled 2FA" or "Clicked Phishing link"
}
