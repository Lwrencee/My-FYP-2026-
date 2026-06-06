const fs = require('fs');

function replaceFile(path) {
  let content = fs.readFileSync(path, 'utf8');
  content = content.replace(/amber-/g, 'blue-');
  content = content.replace(/bg-amber-55\b/g, 'bg-blue-50');
  content = content.replace(/text-amber-550\b/g, 'text-blue-500');
  content = content.replace(/to-yellow-500\b/g, 'to-cyan-500');
  fs.writeFileSync(path, content);
}

replaceFile('src/components/RaceToServersGame.tsx');
replaceFile('src/components/GamesView.tsx');
