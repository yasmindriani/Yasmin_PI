const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');

const dir = path.join(__dirname, '../../public/images/frame triple');
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
          for (let radius = 0; radius < Math.max(w, h)/3; radius+=5) {
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

        const topBox = floodFill.call(this, Math.floor(w/2), Math.floor(h/6));
        const midBox = floodFill.call(this, Math.floor(w/2), Math.floor(h/2));
        const botBox = floodFill.call(this, Math.floor(w/2), Math.floor(h*5/6));

        if (topBox && midBox && botBox) {
          resolve({ w, h, topBox, midBox, botBox });
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

    const className = '.frame-triplet-' + f.replace('.png', '').replace(/\s+/g, '-').replace('frame-triplet-', '').replace('frame-triple-', '');

    const topBox = data.topBox;
    const midBox = data.midBox;
    const botBox = data.botBox;

    const globalMinX = Math.min(topBox.minX, midBox.minX, botBox.minX);
    const globalMaxX = Math.max(topBox.maxX, midBox.maxX, botBox.maxX);
    
    const pTop = Math.max(0, (topBox.minY / data.h * 100) - 1.0).toFixed(2);
    const pBottom = Math.max(0, ((data.h - botBox.maxY) / data.h * 100) - 1.0).toFixed(2);
    const pLeft = Math.max(0, (globalMinX / data.w * 100) - 1.0).toFixed(2);
    const pRight = Math.max(0, ((data.w - globalMaxX) / data.w * 100) - 1.0).toFixed(2);
    
    // gaps
    const gap1 = Math.max(0, ((midBox.minY - topBox.maxY) / data.h * 100) - 2.0).toFixed(2);
    const gap2 = Math.max(0, ((botBox.minY - midBox.maxY) / data.h * 100) - 2.0).toFixed(2);
    const avgGap = ((parseFloat(gap1) + parseFloat(gap2)) / 2).toFixed(2);

    const h1 = topBox.maxY - topBox.minY;
    const h2 = midBox.maxY - midBox.minY;
    const h3 = botBox.maxY - botBox.minY;
    
    let gridRows = "1fr 1fr 1fr";
    if (Math.max(Math.abs(h1-h2), Math.abs(h2-h3), Math.abs(h1-h3)) > 15) {
      gridRows = `${(h1/h2).toFixed(2)}fr 1fr ${(h3/h2).toFixed(2)}fr`;
    }

    console.log(`/* ${f} */`);
    console.log(`${className} .camera-overlay-container {`);
    console.log(`  padding: ${pTop}% ${pRight}% ${pBottom}% ${pLeft}%;`);
    if (avgGap > 0) {
      console.log(`  gap: ${avgGap}%;`);
    }
    if (gridRows !== "1fr 1fr 1fr") {
      console.log(`  grid-template-rows: ${gridRows};`);
    }
    console.log(`}\n`);
  }
}

run();
