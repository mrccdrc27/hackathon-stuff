const fs = require('fs');
const path = require('path');

const baseDir = process.argv[2] || 'wiki_kb';

const dirs = [
    '',
    'raw',
    'wiki',
    'wiki/sources',
    'wiki/concepts',
    'wiki/entities'
];

const files = {
    'wiki/index.md': '# Wiki Index\n\n## Sources\n\n## Concepts\n\n## Entities\n',
    'wiki/log.md': '# Operation Log\n\n- 2026-05-05: Wiki initialized.\n',
    'wiki/SCHEMA.md': '# Wiki Schema\n\nRefer to `wiki-organizer/references/wiki_schema.md` for full instructions.\n'
};

function init() {
    const fullBaseDir = path.resolve(baseDir);
    console.log(`Initializing wiki at ${fullBaseDir}...`);

    dirs.forEach(dir => {
        const dirPath = path.join(fullBaseDir, dir);
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
    });

    for (const [file, content] of Object.entries(files)) {
        const filePath = path.join(fullBaseDir, file);
        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, content);
        }
    }

    console.log('✅ Wiki structure initialized.');
}

init();
