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
    .resize(768)
    .toFile(
      path.resolve(
        __dirname,
        `${dest}/${image.split('.').slice(0, -1).join('.')}-medium.jpg`,
      ),
    );

  sharp(`${target}/${image}`)
    .resize(480)
    .toFile(
      path.resolve(
        __dirname,
        `${dest}/${image.split('.').slice(0, -1).join('.')}-small.jpg`,
      ),
    );

  sharp(`${target}/${image}`)
    .resize(200)
    .toFile(
      path.resolve(
        __dirname,
        `${dest}/${image.split('.').slice(0, -1).join('.')}-lqip.jpg`,
      ),
    );
});
