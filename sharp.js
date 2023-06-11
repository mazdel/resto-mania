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
    .webp({ lossless: true })
    .toFile(
      path.resolve(
        __dirname,
        `${dest}/${image.split('.').slice(0, -1).join('.')}.webp`,
      ),
    );

  sharp(`${target}/${image}`)
    .webp({ lossless: true })
    .resize(768)
    .toFile(
      path.resolve(
        __dirname,
        `${dest}/${image.split('.').slice(0, -1).join('.')}-medium.webp`,
      ),
    );

  sharp(`${target}/${image}`)
    .webp({ lossless: true })
    .resize(480)
    .toFile(
      path.resolve(
        __dirname,
        `${dest}/${image.split('.').slice(0, -1).join('.')}-small.webp`,
      ),
    );

  sharp(`${target}/${image}`)
    .webp({ lossless: true })
    .resize(200)
    .toFile(
      path.resolve(
        __dirname,
        `${dest}/${image.split('.').slice(0, -1).join('.')}-lqip.webp`,
      ),
    );
});
