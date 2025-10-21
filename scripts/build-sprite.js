const fs = require('node:fs');
const path = require('node:path');

const ICONS_DIR = path.join(__dirname, '../src/icons');
const OUTPUT_DIR = path.join(__dirname, '../public');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'sprite.svg');

function generateSprite() {
  console.log('🔧 Generating SVG sprite...');
  
  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Read all SVG files
  const iconFiles = fs.readdirSync(ICONS_DIR).filter(file => file.endsWith('.svg'));
  
  let spriteContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
`;

  for (const file of iconFiles) {
    const iconName = path.basename(file, '.svg');
    const filePath = path.join(ICONS_DIR, file);
    let svgContent = fs.readFileSync(filePath, 'utf8');
    
    // Extract the inner content of the SVG (everything between <svg> tags)
    const svgMatch = svgContent.match(/<svg[^>]*>(.*?)<\/svg>/s);
    if (svgMatch) {
      const innerContent = svgMatch[1];
      
      // Extract viewBox from original SVG
      const viewBoxMatch = svgContent.match(/viewBox="([^"]*)"/);
      const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 24 24';
      
      // Extract fill and stroke attributes
      const fillMatch = svgContent.match(/fill="([^"]*)"/);
      const strokeMatch = svgContent.match(/stroke="([^"]*)"/);
      
      spriteContent += `  <symbol id="${iconName}" viewBox="${viewBox}"`;
      
      if (fillMatch && fillMatch[1] !== 'none') {
        spriteContent += ` fill="${fillMatch[1]}"`;
      }
      if (strokeMatch && strokeMatch[1] !== 'none') {
        spriteContent += ` stroke="${strokeMatch[1]}"`;
      }
      
      spriteContent += `>
${innerContent}
  </symbol>
`;
    }
  }

  spriteContent += '</svg>';

  // Write the sprite file
  fs.writeFileSync(OUTPUT_FILE, spriteContent);
  
  console.log(`✅ Generated sprite with ${iconFiles.length} icons: ${OUTPUT_FILE}`);
  console.log(`📁 Icons: ${iconFiles.map(f => path.basename(f, '.svg')).join(', ')}`);
}

// Generate sprite
generateSprite();