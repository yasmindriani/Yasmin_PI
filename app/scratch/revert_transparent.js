const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');

function revertImage(filename) {
  const filePath = path.join(__dirname, '../../public/images', filename);
  if (!fs.existsSync(filePath)) return console.log(filename, 'not found');

  return new Promise((resolve) => {
    fs.createReadStream(filePath)
      .pipe(new PNG({ filterType: 4 }))
      .on('parsed', function() {
        const w = this.width;
        const h = this.height;

        for (let y = 0; y < h; y++) {
          for (let x = 0; x < w; x++) {
            const idx = (w * y + x) << 2;
            if (this.data[idx] === 255 && this.data[idx + 1] === 255 && this.data[idx + 2] === 255 && this.data[idx + 3] === 255) {
              this.data[idx] = 0;
              this.data[idx + 1] = 0;
              this.data[idx + 2] = 0;
              this.data[idx + 3] = 0;
            }
          }
        }

        this.pack().pipe(fs.createWriteStream(filePath)).on('finish', () => {
          console.log(`Reverted ${filename}`);
          resolve();
        });
      });
  });
}

async function run() {
  await revertImage('single frame polos (1).png');
  await revertImage('triple frame polos (1).png');
}

run();
