const fs = require('fs');
const path = require('path');

// Read the admin page file
const filePath = path.join(__dirname, 'src/app/admin/page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Define patterns to remove
const patterns = [
    / dark:bg-[a-zA-Z0-9-]+(?:\/[0-9]+)?/g,
    / dark:text-[a-zA-Z0-9-]+/g,
    / dark:border-[a-zA-Z0-9-]+/g,
    / dark:divide-[a-zA-Z0-9-]+/g,
    / dark:hover:bg-[a-zA-Z0-9-]+/g,
    / dark:hover:text-[a-zA-Z0-9-]+/g,
    / dark:placeholder-[a-zA-Z0-9-]+/g
];

// Remove all dark mode patterns
patterns.forEach(pattern => {
    content = content.replace(pattern, '');
});

// Write back to file
fs.writeFileSync(filePath, content, 'utf8');

console.log('All dark mode classes have been removed from admin page');
