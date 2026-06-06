const fs = require('fs');
let data = fs.readFileSync('src/components/FinalQuizView.tsx', 'utf8');

// The file literally contains '\`' where it should be '`'
data = data.replace(/\\`/g, '`');

fs.writeFileSync('src/components/FinalQuizView.tsx', data, 'utf8');
