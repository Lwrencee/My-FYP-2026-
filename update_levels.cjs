const fs = require('fs');

const logic = `
export const LEVEL_THRESHOLDS = [
  { level: 1, minXP: 0, maxXP: 200, title: 'Recruit' },
  { level: 2, minXP: 200, maxXP: 450, title: 'Recruit' },
  { level: 3, minXP: 450, maxXP: 750, title: 'Novice' },
  { level: 4, minXP: 750, maxXP: 1100, title: 'Novice' },
  { level: 5, minXP: 1100, maxXP: 1500, title: 'Guardian' },
  { level: 6, minXP: 1500, maxXP: 1950, title: 'Guardian' },
  { level: 7, minXP: 1950, maxXP: 2450, title: 'Specialist' },
  { level: 8, minXP: 2450, maxXP: 3000, title: 'Specialist' },
  { level: 9, minXP: 3000, maxXP: 3600, title: 'Vanguard' },
  { level: 10, minXP: 3600, maxXP: 4250, title: 'Vanguard' },
  { level: 11, minXP: 4250, maxXP: 4950, title: 'Captain' },
  { level: 12, minXP: 4950, maxXP: 5700, title: 'Captain' },
  { level: 13, minXP: 5700, maxXP: 6500, title: 'Commander' },
  { level: 14, minXP: 6500, maxXP: 7350, title: 'Commander' },
  { level: 15, minXP: 7350, maxXP: 9999999, title: 'Cyber Sentinel' },
];

export function calculateLevelFromXP(xp: number): number {
  const matching = LEVEL_THRESHOLDS.find((t) => xp >= t.minXP && xp < t.maxXP);
  return matching ? matching.level : 15;
}

export function getLevelTitle(level: number): string {
  const match = LEVEL_THRESHOLDS.find((t) => t.level === level);
  return match ? match.title : 'Cyber Sentinel';
}

export function getXpThresholdsForLevel(level: number): { min: number, max: number } {
  const match = LEVEL_THRESHOLDS.find((t) => t.level === level);
  return match ? { min: match.minXP, max: match.maxXP } : { min: 7350, max: 7350 };
}
`;

let data = fs.readFileSync('src/data.ts', 'utf8');
data += '\n' + logic;
fs.writeFileSync('src/data.ts', data);
