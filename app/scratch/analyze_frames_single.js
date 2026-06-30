const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');

const dir = path.join(__dirname, '../../public/images/frame single');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.png'));

function analyzeImage(filePath) {
  return new Promise((resolve) => {
    fs.createReadStream(filePath)
      .pipe(new PNG({ filterType: 4 }))
      .on('parsed', function() {
        const w = this.width;
        const h = this.height;

        function isTransparent(x, y) {
          if (x < 0 || x >= w || y < 0 || y >= h) return false;
          const idx = (w * y + x) << 2;
          return this.data[idx + 3] < 128;
        }

        function floodFill(startX, startY) {
          let q = [];
          for (let radius = 0; radius < Math.max(w, h)/2; radius+=5) {
            if (isTransparent.call(this, startX, startY + radius)) { q.push([startX, startY + radius]); break; }
            if (isTransparent.call(this, startX, startY - radius)) { q.push([startX, startY - radius]); break; }
          }
          if (q.length === 0) return null;

          const visited = new Set();
          let minX = w, maxX = 0, minY = h, maxY = 0;

          while (q.length > 0) {
            const [x, y] = q.pop();
            const key = `${x},${y}`;
            if (visited.has(key)) continue;
            visited.add(key);

            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;

            if (isTransparent.call(this, x+1, y) && !visited.has(`${x+1},${y}`)) q.push([x+1, y]);
            if (isTransparent.call(this, x-1, y) && !visited.has(`${x-1},${y}`)) q.push([x-1, y]);
            if (isTransparent.call(this, x, y+1) && !visited.has(`${x},${y+1}`)) q.push([x, y+1]);
            if (isTransparent.call(this, x, y-1) && !visited.has(`${x},${y-1}`)) q.push([x, y-1]);
          }
          return { minX, maxX, minY, maxY };
        }

        const box = floodFill.call(this, Math.floor(w/2), Math.floor(h/2));

        if (box) {
          resolve({ w, h, box });
        } else {
          resolve(null);
        }
      });
  });
}

async function run() {
  for (const f of files) {
    const filePath = path.join(dir, f);
    const data = await analyzeImage(filePath);
    if (!data) continue;

    const className = '.frame-single-' + f.replace('.png', '').replace(/\s+/g, '-').replace('frame-single-', '');

    const box = data.box;
    
    const pTop = Math.max(0, (box.minY / data.h * 100) - 1.0).toFixed(2);
    const pBottom = Math.max(0, ((data.h - box.maxY) / data.h * 100) - 1.0).toFixed(2);
    const pLeft = Math.max(0, (box.minX / data.w * 100) - 1.0).toFixed(2);
    const pRight = Math.max(0, ((data.w - box.maxX) / data.w * 100) - 1.0).toFixed(2);
    
    console.log(`/* ${f} */`);
    console.log(`${className} .camera-overlay-container {`);
    console.log(`  padding: ${pTop}% ${pRight}% ${pBottom}% ${pLeft}%;`);
    console.log(`}\n`);
  }
}

run();
