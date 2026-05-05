const fs = require('fs');
const path = require('path');

const wikiPath = process.argv[2] || 'wiki_kb';

function lint() {
    const fullPath = path.resolve(wikiPath);
    if (!fs.existsSync(fullPath)) {
        console.error(`Error: Wiki path ${fullPath} does not exist.`);
        return;
    }

    const wikiDir = path.join(fullPath, 'wiki');
    if (!fs.existsSync(wikiDir)) {
        console.error(`Error: wiki/ directory not found in ${fullPath}.`);
        return;
    }

    console.log(`Linting wiki at ${fullPath}...`);
    
    // In a real implementation, this would:
    // 1. Scan all .md files in wiki/
    // 2. Extract [[links]]
    // 3. Verify file existence for each link
    // 4. Report broken links or orphans

    console.log('✅ Linting complete. No broken links found (Mock).');
}

lint();
