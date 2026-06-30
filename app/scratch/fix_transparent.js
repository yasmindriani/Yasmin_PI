const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');

function fixImage(filename, holesParams) {
  const filePath = path.join(__dirname, '../../public/images', filename);
  if (!fs.existsSync(filePath)) return console.log(filename, 'not found');

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

        const keepTransparent = new Set();

        function floodFillHole(startX, startY) {
          let q = [];
          for (let radius = 0; radius < Math.max(w, h); radius+=5) {
            if (isTransparent.call(this, startX, startY + radius)) { q.push([startX, startY + radius]); break; }
            if (isTransparent.call(this, startX, startY - radius)) { q.push([startX, startY - radius]); break; }
          }
          if (q.length === 0) return;

          while (q.length > 0) {
            const [x, y] = q.pop();
            const key = `${x},${y}`;
            if (keepTransparent.has(key)) continue;
            keepTransparent.add(key);

            if (isTransparent.call(this, x+1, y) && !keepTransparent.has(`${x+1},${y}`)) q.push([x+1, y]);
            if (isTransparent.call(this, x-1, y) && !keepTransparent.has(`${x-1},${y}`)) q.push([x-1, y]);
            if (isTransparent.call(this, x, y+1) && !keepTransparent.has(`${x},${y+1}`)) q.push([x, y+1]);
            if (isTransparent.call(this, x, y-1) && !keepTransparent.has(`${x},${y-1}`)) q.push([x, y-1]);
          }
        }

        // Fill holes
        holesParams.forEach(params => {
          floodFillHole.call(this, Math.floor(w * params.x), Math.floor(h * params.y));
        });

        // Now turn every other transparent pixel to white
        for (let y = 0; y < h; y++) {
          for (let x = 0; x < w; x++) {
            const idx = (w * y + x) << 2;
            if (this.data[idx + 3] < 128 && !keepTransparent.has(`${x},${y}`)) {
              this.data[idx] = 255;
              this.data[idx + 1] = 255;
              this.data[idx + 2] = 255;
              this.data[idx + 3] = 255;
            }
          }
        }

        this.pack().pipe(fs.createWriteStream(filePath)).on('finish', () => {
          console.log(`Fixed ${filename}`);
          resolve();
        });
      });
  });
}

async function run() {
  await fixImage('single frame polos (1).png', [{x: 0.5, y: 0.5}]);
  await fixImage('triple frame polos (1).png', [
    {x: 0.5, y: 1/6},
    {x: 0.5, y: 1/2},
    {x: 0.5, y: 5/6}
  ]);
}

run();
