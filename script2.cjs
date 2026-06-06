const fs = require('fs');
let data = fs.readFileSync('src/data.ts', 'utf8');
data = data.replace(/rewardXp: 50/g, 'rewardXp: 100');
fs.writeFileSync('src/data.ts', data, 'utf8');
