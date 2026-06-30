const fs = require('fs');
const path = require('path');

const srcDir = 'C:/Users/yasmi/Downloads';
const destDir = 'C:/Users/yasmi/Downloads/Berrie_Booth/public/images';

function copyFile(srcName, destName) {
  const srcPath = path.join(srcDir, srcName);
  const destPath = path.join(destDir, destName);
  try {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Successfully copied ${srcName} -> ${destName} (${fs.statSync(destPath).size} bytes)`);
  } catch (err) {
    console.error(`Failed to copy ${srcName} -> ${destName}:`, err.message);
  }
}

copyFile('single frame polos.png', 'single frame polos (1).png');
copyFile('double frame polos.png', 'double frame polos (1).png');
copyFile('triple frame polos.png', 'triple frame polos (1).png');
