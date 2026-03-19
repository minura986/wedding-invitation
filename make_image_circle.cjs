const fs = require('fs');
const path = require('path');

const folders = ['wedding', 'Home Coming'];

folders.forEach(folder => {
  const dir = path.join(__dirname, folder);
  if (fs.existsSync(dir)) {
    fs.readdirSync(dir).forEach(file => {
      if (file.endsWith('.html')) {
        const filePath = path.join(dir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Find .hero-image-square block and replace border-radius
        const blockRegex = /\.hero-image-square\s*\{[^}]+\}/g;
        
        content = content.replace(blockRegex, match => {
          return match.replace(/border-radius:\s*12px;/, 'border-radius: 50%;');
        });
        
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Made profile picture circular in', filePath);
      }
    });
  }
});
