const fs = require('fs');
const path = require('path');

fs.copyFileSync(path.join(__dirname, '..', 'package.json'), path.join(__dirname, '..', 'dist', 'package.json'));
fs.copyFileSync(path.join(__dirname, '..', 'README.md'), path.join(__dirname, '..', 'dist', 'README.md'));
