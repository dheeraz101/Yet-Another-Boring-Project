const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../../projects.json');

try {
  if (!fs.existsSync(filePath)) {
    console.error('Error: projects.json not found!');
    process.exit(1);
  }

  const rawData = fs.readFileSync(filePath, 'utf8');
  let data;
  try {
    data = JSON.parse(rawData);
  } catch (parseErr) {
    console.error('Error: projects.json is not valid JSON!');
    console.error(parseErr.message);
    process.exit(1);
  }

  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    console.error('Error: Root of projects.json must be a JSON object.');
    process.exit(1);
  }

  if (!data.projects || !Array.isArray(data.projects)) {
    console.error('Error: projects.json must have a "projects" array.');
    process.exit(1);
  }

  const errors = [];
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

  data.projects.forEach((proj, idx) => {
    const projName = proj.name || `Project #${idx + 1}`;
    
    // Check required fields
    const fields = ['name', 'date', 'description', 'link', 'github'];
    fields.forEach(field => {
      if (proj[field] === undefined) {
        errors.push(`[${projName}] Missing field "${field}"`);
      }
    });

    if (proj.name !== undefined) {
      if (typeof proj.name !== 'string' || proj.name.trim() === '') {
        errors.push(`[${projName}] "name" must be a non-empty string.`);
      } else if (proj.name.length > 50) {
        errors.push(`[${projName}] "name" is too long (max 50 chars).`);
      }
    }

    if (proj.date !== undefined) {
      if (typeof proj.date !== 'string' || !dateRegex.test(proj.date)) {
        errors.push(`[${projName}] "date" must be in YYYY-MM-DD format.`);
      } else {
        const d = new Date(proj.date);
        if (isNaN(d.getTime())) {
          errors.push(`[${projName}] "date" is invalid.`);
        }
      }
    }

    if (proj.description !== undefined) {
      if (typeof proj.description !== 'string' || proj.description.trim() === '') {
        errors.push(`[${projName}] "description" must be a non-empty string.`);
      } else if (proj.description.length > 150) {
        errors.push(`[${projName}] "description" is too long (${proj.description.length} chars, max 150).`);
      } else if (proj.description.length < 10) {
        errors.push(`[${projName}] "description" is too short (min 10 chars).`);
      }
    }

    if (proj.link !== undefined && proj.link !== '') {
      if (typeof proj.link !== 'string') {
        errors.push(`[${projName}] "link" must be a string.`);
      } else {
        try {
          new URL(proj.link);
        } catch {
          errors.push(`[${projName}] "link" is not a valid URL: "${proj.link}"`);
        }
      }
    }

    if (proj.github !== undefined && proj.github !== '') {
      if (typeof proj.github !== 'string') {
        errors.push(`[${projName}] "github" must be a string.`);
      } else {
        try {
          new URL(proj.github);
        } catch {
          errors.push(`[${projName}] "github" is not a valid URL: "${proj.github}"`);
        }
      }
    }
  });

  if (errors.length > 0) {
    console.error('Validation failed with the following errors:');
    errors.forEach(err => console.error(`- ${err}`));
    process.exit(1);
  }

  console.log('✓ projects.json is valid and conforms to YABP standards!');
  process.exit(0);

} catch (err) {
  console.error('An unexpected error occurred during validation:');
  console.error(err);
  process.exit(1);
}
