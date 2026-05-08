const fs = require('fs');

function extract(file, varName, outFile) {
    const content = fs.readFileSync(file, 'utf8');
    const regex = new RegExp(`const ${varName}.*?=\\s*(\\[[\\s\\S]*?\\])\\s*\\n(?:const|export|;)`, 'm');
    const match = content.match(regex);
    if (match) {
        let jsonStr = match[1];
        // naive cleanup for simple objects (removing trailing commas, fixing unquoted keys)
        // Actually, it's valid JS, so we can evaluate it if we stub out missing things.
        try {
            const data = eval(`(${jsonStr})`);
            fs.writeFileSync(outFile, JSON.stringify(data, null, 2));
            console.log(`Extracted ${varName} to ${outFile}`);
        } catch (e) {
            console.error(`Error evaluating ${varName}:`, e);
        }
    } else {
        console.log(`Could not find ${varName} in ${file}`);
    }
}

fs.mkdirSync('backend/src/main/resources/data', { recursive: true });
extract('app/colleges/page.tsx', 'colleges', 'backend/src/main/resources/data/colleges.json');
extract('app/career-paths/page.tsx', 'careerPaths', 'backend/src/main/resources/data/career-paths.json');
extract('app/scholarships/page.tsx', 'scholarshipData', 'backend/src/main/resources/data/scholarships.json');
