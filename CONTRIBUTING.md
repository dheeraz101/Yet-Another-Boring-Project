# Contributing to Yet Another Boring Project (YABP)

Thank you for your interest in contributing to YABP! We want to keep this directory curated with high-quality, minimal, and productive projects that help developers.

By contributing a project, you agree that it fits our philosophy and that you will maintain its quality.

---

## How to List Your Project

We use a simple JSON-based directory. To add your project to the landing page, follow these steps:

### Step 1: Fork and Clone the Repository
Fork this repository to your own GitHub account, then clone it locally.

### Step 2: Edit `projects.json`
Open the [projects.json](file:///d:/Github_Projects/Yet-Another-Boring-Project/projects.json) file and add your project inside the `"projects"` array. Make sure it follows this structure:

```json
{
  "name": "Your Project Name",
  "date": "2026-07-29",
  "description": "A clear, single-sentence explanation of what your project does and who it's for.",
  "link": "https://your-live-demo-or-website.com",
  "github": "https://github.com/yourusername/your-repository"
}
```

#### Field Specifications:
- `name` (string): The title of your project. Keep it concise.
- `date` (string): The date you are submitting or the date of release in `YYYY-MM-DD` format.
- `description` (string): A short summary. Limit to 120 characters. Avoid clickbait or fluff.
- `link` (string): A link to the live demo, landing page, or Chrome Web Store. Use an empty string `""` if not applicable.
- `github` (string): A link to the GitHub repository. Use an empty string `""` if not applicable.

### Step 3: Verify the File Structure
Your PR will be verified automatically by a GitHub action. You can run the validation script locally to check for errors before committing:
```bash
node .github/scripts/verify-projects.js
```

### Step 4: Include the YABP Logo Badge
Every project that joins the YABP Initiative **must include the official YABP logo badge** in its main repository `README.md`. 

Choose one of the formats below to paste at the top of your README file:

#### Option A: HTML Logo Link (Recommended, looks clean)
```html
<a href="https://yabp.netlify.app">
  <img src="https://raw.githubusercontent.com/dheeraz101/Yet-Another-Boring-Project/main/logo.png" width="48" height="48" alt="YABP Initiative Logo" style="display: inline-block; vertical-align: middle;" />
</a>
```

#### Option B: Markdown Logo Link
```markdown
[![YABP Initiative Logo](https://raw.githubusercontent.com/dheeraz101/Yet-Another-Boring-Project/main/logo.png)](https://yabp.netlify.app)
```

---

## Submission Guidelines & Quality Checklist

To maintain a premium collection, we vet all submissions. We will reject projects that do not meet these standards:

- **Minimalist Aesthetic:** Inspired by Apple's Human Interface Guidelines (HIG). Uncluttered layout, clean typography (e.g., Inter, SF Pro, system fonts), curated colors, and zero distraction.
- **Utility & Productivity:** The tool must serve a clear purpose, improve a workflow, or help developers create something meaningful. No joke projects or cookie-cutter tutorial forks.
- **Zero Placeholders:** Your project must be fully functioning. Do not submit sites with "Coming Soon" blocks or unfinished features.
- **Privacy & Safety:** No tracking, ad-heavy pages, or malicious client-side scripting.
- **Licensing:** Your project repository must include a valid open-source license (such as MIT, Apache-2.0, or GPL).
