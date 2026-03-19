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
        
        // Change button text
        content = content.replace(
          />Send My RSVP<\/button>/g, 
          '>Send RSVP</button>'
        );
        
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Fixed button in', filePath);
      }
    });
  }
});
