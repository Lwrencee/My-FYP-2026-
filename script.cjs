const fs = require('fs');
let data = fs.readFileSync('src/data.ts', 'utf8');
const lines = data.split('\n');
// We want to delete from "  // LEVEL 4: MODERN VISUAL TRAPS (5 tasks)" to the last level 4 object.
// We know it ends with " level: 4 \n  }\n];"
let start = data.indexOf('  // LEVEL 4: MODERN VISUAL TRAPS (5 tasks)');
// look up to the previous blank line to cut neatly.
start = data.lastIndexOf('\n', start) - 1;
start = data.lastIndexOf('\n', start);

const end = data.indexOf('];', start);
const new_data = data.substring(0, start) + '\n];' + data.substring(end + 2);
fs.writeFileSync('src/data.ts', new_data, 'utf8');
