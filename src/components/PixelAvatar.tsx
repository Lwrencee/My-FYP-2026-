/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export interface AvatarConfig {
  id: string;
  name: string;
  color: string;
  emoji: string;
}

// 12x12 detailed pixel-art avatars matching the uploaded image exactly
export const AVATAR_PIXELS: Record<string, { 
  background: string; 
  colors: Record<string, string>; 
  grid: string[] 
}> = {
  '1': { // Bucket Hat Defender (The top character in the user's image)
    background: '#E0EBFF',
    colors: {
      '.': 'transparent',
      'w': '#FFFFFF', // white bucket hat
      'b': '#58A6FF', // blue hat stripe
      's': '#9C6644', // brown skin
      'h': '#FFD166', // blonde hair
      'e': '#000000', // eyes
      'g': '#06D6A0', // mint green shirt
      'p': '#8338EC', // purple suspender straps
      'd': '#7F5539', // darker brown shadow
    },
    grid: [
      '............',
      '...wwwww....',
      '..wwwwwww...',
      '..wbbbbbw...',
      '.wwwwwwwww..',
      '..hsssssh...',
      '..hsesesh...',
      '...sssss....',
      '...sdeds....',
      '..ggpggpgg..',
      '.gggggggggg.',
      '............'
    ]
  },
  '2': { // Cap Cyber Rogue (The middle character in the user's image)
    background: '#E2E6FF',
    colors: {
      '.': 'transparent',
      'w': '#FFFFFF', // white cap
      'l': '#8957E5', // lavender/purple logo on cap
      's': '#B07D62', // medium brown skin
      'h': '#FF6B6B', // reddish-pink hair peeking out
      'e': '#000000', // eyes
      'p': '#6C3082', // purple shirt
      'k': '#1A1D20', // dark stripe/collar
      'd': '#8D5B4C', // shadow skin
    },
    grid: [
      '............',
      '....wwww....',
      '...wwlwwwww.', // Cap visor extending to the right
      '...wwwww....',
      '..hhsssshh..',
      '..hseseshh..',
      '...sssss....',
      '...sddds....',
      '...ppkpp....',
      '..ppppppp...',
      '.ppppppppp..',
      '............'
    ]
  },
  '3': { // Visor Scout (The bottom character in the user's image)
    background: '#E5ECFF',
    colors: {
      '.': 'transparent',
      'w': '#FFFFFF', // white/light cap
      'b': '#8ECAE6', // blue shaded visor area
      's': '#F1C0B1', // light pinkish skin
      'h': '#FF79C6', // pink hair
      'e': '#12131C', // eyes
      'c': '#212529', // dark charcoal shirt
      'l': '#E5E5E5', // light collar lines
      'd': '#E09F8F', // shadowed light skin
    },
    grid: [
      '............',
      '...wwwww....',
      '..wwwwwwww..',
      '..wbbbbbw...', // Visor shade
      '..hhsssshh..',
      '..hseseshh..',
      '...sssss....',
      '...sddds....',
      '..cclllccc..',
      '.cccccccccc.',
      '..cccccccc..',
      '............'
    ]
  },
  '4': { // Matrix Cadet (Cyber Sentry with Green Visor and Black Cap)
    background: '#D2F4EA',
    colors: {
      '.': 'transparent',
      'c': '#161B22', // charcoal cap
      'g': '#3FB950', // neon green visor
      's': '#E7C697', // skin tone
      'h': '#111111', // black hair
      'e': '#3FB950', // cybernetic green eye
      'j': '#238636', // tech green jacket
      'w': '#FFFFFF',
    },
    grid: [
      '............',
      '....cccc....',
      '...cccccc...',
      '..cgggggwc..', // cyber visor
      '..hhsssshh..',
      '..hseseshh..',
      '...sssss....',
      '....sss.....',
      '..jjjjjjjj..',
      '.jjjjjjjjjj.',
      '..jjjjjjjj..',
      '............'
    ]
  },
  '5': { // Neon Valkyrie (Cyberpunk Magenta Hair and Gold Jacket)
    background: '#FEE5F1',
    colors: {
      '.': 'transparent',
      'p': '#FF4D6D', // bright pink hair
      's': '#F4D35E', // skin tone
      'h': '#F28482', // pastel pink
      'e': '#000814', // dark eyes
      'y': '#FFB703', // golden jacket
      'w': '#FFFFFF', // visor/headband
      'd': '#E29578', // shaded skin
    },
    grid: [
      '............',
      '...ppppp....',
      '..ppppppp...',
      '..pwwwwwp...', // Headband
      '..psesespp..',
      '..pssssppp..',
      '...sssspp...',
      '....sddpp...',
      '..yyyyyyy...',
      '.yyyyyyyyy..',
      '..yyyyyyy...',
      '............'
    ]
  },
  '6': { // Void Overseer (Mysterious Tech Cyber Drone / Hooded Sentry)
    background: '#ECECF1',
    colors: {
      '.': 'transparent',
      'h': '#1F2421', // dark shadow hood
      'r': '#F85149', // crimson red cyber energy
      's': '#D90429', // deep red glowing
      'm': '#30363D', // tech armor
      'w': '#FFFFFF', // glowing white visor
    },
    grid: [
      '............',
      '....hhhh....',
      '...hhhhhh...',
      '..hhhhhhhh..',
      '..hhrrrrhh..',
      '..hrwwhwrh..', // glowing white energy visor
      '..hrssssrh..',
      '...hrrrrh...',
      '..mmmmmmmm..',
      '.mmmmmmmmmm.',
      '..mmmmmmmm..',
      '............'
    ]
  },
  '7': { // Chronos Sentry (Aquamarine Cap & Teal Hoodie Boy)
    background: '#D4F5F5',
    colors: {
      '.': 'transparent',
      't': '#008080', // teal cap
      'w': '#FFFFFF', // white strip
      's': '#E0AC9D', // brown/tan skin
      'h': '#F4A261', // orange hair
      'e': '#212529',
      'c': '#2A9D8F', // light teal hoodie
    },
    grid: [
      '............',
      '....tttt....',
      '...ttwttttt.', // cap visor
      '...tttttt...',
      '..hhsssshh..',
      '..hseseshh..',
      '...sssss....',
      '...sddds....',
      '..ccccccc...',
      '.ccccccccc..',
      '..ccccccc..',
      '............'
    ]
  },
  's': { // Archon Guard (Royal Gold Crown Sentry / Elite Graduate)
    background: '#FFF5D6',
    colors: {
      '.': 'transparent',
      'c': '#FFD700', // gold crown
      'b': '#1F6FEB', // sapphire gems
      's': '#F1C0B1', // skin tone
      'h': '#8338EC', // purple futuristic hair
      'e': '#FFD166', // yellow cyber visor
      'r': '#D90429', // royal crimson cape
    },
    grid: [
      '...c...c....',
      '...ccrcc....',
      '..cccbccc...', // gold gemmed crown
      '..hheeeehh..', // visor eyes
      '..hhsesesh..',
      '...sssss....',
      '....sss.....',
      '..rrrrrrr...', // royal cape
      '.rrrrrrrrr..',
      '..rrrrrrr...',
      '............'
    ]
  }
};

interface PixelAvatarProps {
  id: string;
  size?: number; // width and height in px
  className?: string;
}

export default function PixelAvatar({ id, size = 48, className = '' }: PixelAvatarProps) {
  // Support custom uploaded base64 or URL image files
  if (id && (id.toLowerCase().startsWith('data:image/') || id.toLowerCase().startsWith('http'))) {
    return (
      <div
        style={{ 
          width: size, 
          height: size, 
        }}
        className={`rounded-2xl shrink-0 overflow-hidden border border-[#30363D]/40 shadow-inner flex items-center justify-center bg-[#161B22] ${className}`}
      >
        <img
          src={id}
          alt="Defender Avatar"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover rounded-xl"
        />
      </div>
    );
  }

  // Graceful fallback to id '1' if not found
  const avatarData = AVATAR_PIXELS[id] || AVATAR_PIXELS['1'];
  
  const grid = avatarData.grid;
  const colors = avatarData.colors;
  const background = avatarData.background;
  
  const rowsCount = grid.length;
  const colsCount = grid[0].length;
  
  return (
    <div 
      style={{ 
        width: size, 
        height: size, 
        backgroundColor: background,
        borderWidth: '1.5px',
        borderColor: 'rgba(56, 139, 253, 0.15)'
      }}
      className={`rounded-2xl shrink-0 flex items-center justify-center p-1 overflow-hidden shadow-inner ${className}`}
    >
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${colsCount} ${rowsCount}`}
        xmlns="http://www.w3.org/2000/svg"
        shapeRendering="crispEdges"
        className="select-none"
        aria-label="Defender Pixel Avatar"
      >
        {grid.map((row, rIdx) => {
          return row.split('').map((char, cIdx) => {
            const color = colors[char] || 'transparent';
            if (color === 'transparent') return null;
            
            return (
              <rect
                key={`${rIdx}-${cIdx}`}
                x={cIdx}
                y={rIdx}
                width={1.05} // slightly wider to avoid pixel gaps in rendering
                height={1.05}
                fill={color}
              />
            );
          });
        })}
      </svg>
    </div>
  );
}
