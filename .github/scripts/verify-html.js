const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.join(__dirname, '../../');
const htmlFiles = ['index.html', 'terms.html', 'contributing.html', 'security.html', 'license.html'];
let hasErrors = false;

console.log('--- Verifying HTML files, references, and mobile navigation ---');

htmlFiles.forEach(file => {
    const fullPath = path.join(rootDir, file);
    if (!fs.existsSync(fullPath)) {
        console.error(`Missing file: ${file}`);
        hasErrors = true;
        return;
    }

    const content = fs.readFileSync(fullPath, 'utf8');
    console.log(`Checking ${file} (${content.length} bytes)...`);

    if (!content.includes('<!DOCTYPE html>')) {
        console.error(`[${file}] Missing <!DOCTYPE html>`);
        hasErrors = true;
    }
    if (!content.includes('style.css')) {
        console.error(`[${file}] Missing stylesheet link to style.css`);
        hasErrors = true;
    }
    if (!content.includes('logo.png')) {
        console.error(`[${file}] Missing logo.png reference`);
        hasErrors = true;
    }
    if (!content.includes('mobileMenuBtn') || !content.includes('mobileDrawer')) {
        console.error(`[${file}] Missing mobile navigation elements (mobileMenuBtn / mobileDrawer)`);
        hasErrors = true;
    }
    if (!content.includes('yabp-theme')) {
        console.error(`[${file}] Missing theme pre-init / persistence script`);
        hasErrors = true;
    }

    // Check href references
    const hrefRegex = /href=["']([^"']+)["']/g;
    let match;
    while ((match = hrefRegex.exec(content)) !== null) {
        const url = match[1];
        if (!url.startsWith('http') && !url.startsWith('#') && !url.startsWith('mailto:') && !url.startsWith('data:')) {
            const localFile = url.split('#')[0];
            if (localFile && !fs.existsSync(path.join(rootDir, localFile))) {
                console.error(`[${file}] Broken local link: ${url}`);
                hasErrors = true;
            }
        }
    }

    // Check src references
    const srcRegex = /src=["']([^"']+)["']/g;
    while ((match = srcRegex.exec(content)) !== null) {
        const url = match[1];
        if (!url.startsWith('http') && !url.startsWith('data:')) {
            if (!fs.existsSync(path.join(rootDir, url))) {
                console.error(`[${file}] Broken local asset: ${url}`);
                hasErrors = true;
            }
        }
    }

    // Check copy targets
    const copyTargetRegex = /data-copy-target=["']([^"']+)["']/g;
    while ((match = copyTargetRegex.exec(content)) !== null) {
        const targetId = match[1];
        const idPattern = new RegExp(`id=["']${targetId}["']`);
        if (!idPattern.test(content)) {
            console.error(`[${file}] Missing element for data-copy-target="${targetId}"`);
            hasErrors = true;
        }
    }
});

// Check JS syntax
const jsFiles = ['app.js', 'docs.js', '.github/scripts/verify-projects.js'];
jsFiles.forEach(jsFile => {
    try {
        execSync(`node -c "${path.join(rootDir, jsFile)}"`, { stdio: 'pipe' });
    } catch (e) {
        console.error(`[${jsFile}] JavaScript syntax error:`, e.message);
        hasErrors = true;
    }
});

// Check support email yabp.support@gmail.com on required doc pages
const requiredEmailPages = ['security.html', 'terms.html', 'contributing.html'];
requiredEmailPages.forEach(page => {
    const content = fs.readFileSync(path.join(rootDir, page), 'utf8');
    if (!content.includes('yabp.support@gmail.com')) {
        console.error(`[${page}] Missing support email: yabp.support@gmail.com`);
        hasErrors = true;
    }
});

// Check that duplicate segmented menus are not present on doc pages
const docPages = ['terms.html', 'contributing.html', 'security.html', 'license.html'];
docPages.forEach(page => {
    const content = fs.readFileSync(path.join(rootDir, page), 'utf8');
    if (/class=["'][^"']*segmented/i.test(content)) {
        console.error(`[${page}] Contains unexpected segmented menu`);
        hasErrors = true;
    }
});

// Check curation policy notices on contributing.html & terms.html
const contributingContent = fs.readFileSync(path.join(rootDir, 'contributing.html'), 'utf8');
const termsContent = fs.readFileSync(path.join(rootDir, 'terms.html'), 'utf8');
if (!contributingContent.includes('without prior notice')) {
    console.error('[contributing.html] Missing curation policy notice: without prior notice');
    hasErrors = true;
}
if (!termsContent.includes('without prior notice')) {
    console.error('[terms.html] Missing curation policy notice: without prior notice');
    hasErrors = true;
}

// Check checkbox checked selectors in style.css
const cssContent = fs.readFileSync(path.join(rootDir, 'style.css'), 'utf8');
if (!cssContent.includes('.checklist-item input:checked ~ .agreement-custom-check') ||
    !cssContent.includes('.checklist-item input:checked ~ .agreement-custom-check i')) {
    console.error('[style.css] Missing checked feedback selectors for .checklist-item');
    hasErrors = true;
}

// Check that em-dashes and en-dashes are completely removed across all repo files
function scanDashes(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        if (entry.name === '.git' || entry.name === 'node_modules') continue;
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            scanDashes(fullPath);
        } else if (/\.(html|js|css|md|json)$/i.test(entry.name)) {
            const text = fs.readFileSync(fullPath, 'utf8');
            const dashMatch = text.match(/[\u2013\u2014]|&[mn]dash;|&#821[12];/g);
            if (dashMatch) {
                console.error(`[${path.relative(rootDir, fullPath)}] Found ${dashMatch.length} long dash(es)`);
                hasErrors = true;
            }
        }
    }
}
scanDashes(rootDir);

if (hasErrors) {
    console.error('Validation completed with errors.');
    process.exit(1);
} else {
    console.log('✓ All HTML files, links, assets, mobile navigation, styles, and scripts are valid!');
    process.exit(0);
}
