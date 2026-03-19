const fs = require('fs');
const path = require('path');

const folders = ['Home Coming', 'wedding'];
const files = [];

folders.forEach(folder => {
  const dir = path.join(__dirname, folder);
  if (fs.existsSync(dir)) {
    fs.readdirSync(dir).forEach(file => {
      if (file.endsWith('.html')) {
        files.push(path.join(dir, file));
      }
    });
  }
});

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');

  // Replace 'public/images/' with '../public/images/' 
  // ONLY if it doesn't already have '../'
  content = content.replace(/(?<!\.\.\/)public\/images\//g, '../public/images/');
  
  // Replace css background urls
  content = content.replace(/url\(['"]?public\/images\//g, "url('../public/images/");

  content = content.replace(/'public\/images\//g, "'../public/images/");
  content = content.replace(/"public\/images\//g, '"../public/images/');

  fs.writeFileSync(file, content, 'utf8');
  console.log('Fixed images in', file);
}
