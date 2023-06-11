const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const target = path.resolve(__dirname, 'src/public/images/heroes');
const dest = path.resolve(__dirname, 'src/public/images/alt_heroes');

if (!fs.existsSync(dest)) {
  fs.mkdirSync(dest);
}

fs.readdirSync(target).forEach((image) => {
  sharp(`${target}/${image}`)
    .jpeg({ mozjpeg: true, quality: 60 })
    .resize(1280)
    .toFile(
      path.resolve(
        __dirname,
        `${dest}/${image.split('.').slice(0, -1).join('.')}.jpg`,
      ),
    );

  sharp(`${target}/${image}`)
    .jpeg({ mozjpeg: true })
    .resize(768)
    .toFile(
      path.resolve(
        __dirname,
        `${dest}/${image.split('.').slice(0, -1).join('.')}-medium.jpg`,
      ),
    );

  sharp(`${target}/${image}`)
    .jpeg({ mozjpeg: true })
    .resize(480)
    .toFile(
      path.resolve(
        __dirname,
        `${dest}/${image.split('.').slice(0, -1).join('.')}-small.jpg`,
      ),
    );

  sharp(`${target}/${image}`)
    .jpeg({ mozjpeg: true })
    .resize(200)
    .blur()
    .toFile(
      path.resolve(
        __dirname,
        `${dest}/${image.split('.').slice(0, -1).join('.')}-lqip.jpg`,
      ),
    );
});
