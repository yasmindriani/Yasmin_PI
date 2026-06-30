const fs = require('fs');
const path = require('path');

const dir = 'C:/Users/yasmi/Downloads';
const files = fs.readdirSync(dir);
console.log('Files in Downloads:');
files.forEach(f => {
  if (f.toLowerCase().includes('double') || f.toLowerCase().includes('polos')) {
    const stats = fs.statSync(path.join(dir, f));
    console.log(`- ${f}: ${stats.size} bytes`);
  }
});
