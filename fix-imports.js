const fs = require('fs');
const glob = require('glob');
const files = glob.sync('app/app/**/*.tsx');
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  const replaced = content.replace(/import images from \".*lib\/images\.json\";/g, 'import images from "@/lib/images.json";');
  if (content !== replaced) {
    fs.writeFileSync(file, replaced);
    console.log('Fixed ' + file);
  }
});

