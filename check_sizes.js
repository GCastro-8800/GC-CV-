
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');

fs.readdir(publicDir, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  files.forEach(file => {
    const filePath = path.join(publicDir, file);
    fs.stat(filePath, (err, stats) => {
      if (err) {
        console.error('Error stating file:', err);
        return;
      }
      const sizeInMB = stats.size / (1024 * 1024);
      if (sizeInMB > 1) {
        console.log(`${file}: ${sizeInMB.toFixed(2)} MB`);
      }
    });
  });
});
