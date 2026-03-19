const fs = require('fs');
const path = require('path');

const updates = [
  { folder: 'wedding', event: 'Wedding' },
  { folder: 'Home Coming', event: 'Home Coming' }
];

for (const group of updates) {
  const dir = path.join(__dirname, group.folder);
  if (!fs.existsSync(dir)) continue;

  const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

  for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Make sure we only add it if it's not already there
    if (!content.includes(`formData.append('event', '${group.event}');`)) {
      content = content.replace(
        "formData.append('attendance', attending === 'yes' ? 'Attending' : 'Declined');",
        `formData.append('attendance', attending === 'yes' ? 'Attending' : 'Declined');\n      formData.append('event', '${group.event}');`
      );
      
      // Also update the UI messages just to be slightly nicer, although not strictly needed, 
      // but the core fix is the formData event append.
      
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Updated', filePath);
    }
  }
}
