# Contributing to YABP

Thank you for your interest in contributing. We curate this directory with high-quality, minimal developer tools that prioritize utility and design.

By submitting a project, you agree that it fits our design criteria and that you will actively maintain it.

---

## Submission Process

### 1. Fork and Clone
Fork this repository to your GitHub profile and clone it locally.

### 2. Update projects.json
Open [projects.json](file:///d:/Github_Projects/Yet-Another-Boring-Project/projects.json) and add your project listing to the `projects` array:

```json
{
  "name": "Your Project Name",
  "date": "2026-07-30",
  "description": "A clear, single-sentence explanation of what your project does.",
  "link": "https://your-live-demo-or-website.com",
  "github": "https://github.com/yourusername/your-repository"
}
```

#### Fields:
*   `name` (string): Title of your project. Keep it short.
*   `date` (string): Date of submission in `YYYY-MM-DD` format.
*   `description` (string): Summary under 150 characters. Avoid fluff or clickbait.
*   `link` (string): Live application link. Use an empty string if not applicable.
*   `github` (string): GitHub repository link. Use an empty string if not applicable.

### 3. Add Logo Badge (2-Way Verification)
To establish trust, you must link back to YABP. By appending your project's URL, the YABP site will dynamically verify your listing when clicked.

You can instantly generate your custom badge codes using our interactive **Badge & Link Generator** on the website: [yabp.netlify.app](https://yabp.netlify.app).

If you copy them manually, replace `YOUR_PROJECT_URL` with your exact live project or GitHub URL:

#### Option A: HTML Logo Link (Recommended, mandatory for GitHub)
```html
<a href="https://yabp.netlify.app/?verify=YOUR_PROJECT_URL">
  <img src="https://raw.githubusercontent.com/dheeraz101/Yet-Another-Boring-Project/main/logo.png" width="48" height="48" alt="YABP Initiative Logo" style="display: inline-block; vertical-align: middle;" />
</a>
```

#### Option B: Markdown Logo Link
```markdown
[![YABP Initiative Logo](https://raw.githubusercontent.com/dheeraz101/Yet-Another-Boring-Project/main/logo.png)](https://yabp.netlify.app/?verify=YOUR_PROJECT_URL)
```

#### Option C: Direct Verification Link (Optional for App UI/Websites)
If you do not want the logo badge on your app UI, you can link directly to:
```
https://yabp.netlify.app/?verify=YOUR_PROJECT_URL
```

### 4. PR Verification
Test your JSON formatting locally before committing:
```bash
node .github/scripts/verify-projects.js
```
Push changes and open a Pull Request. Automated CI checks will validate your JSON structure.

---

## Design and Quality Guidelines

We manually review all submissions and will reject projects that fall short of these principles:

*   **Minimalist Design**: Clean typography, high contrast, balanced grid structures, and zero visual clutter (inspired by Apple HIG).
*   **Utility Focus**: Solves a real problem, saves time, or increases focus. No basic tutorial copies or joke repos.
*   **Production Ready**: No broken links, "coming soon" placeholders, or incomplete components.
*   **Privacy First**: No third-party trackers, ad injection, or client-side analytics scripts.
*   **Open Source**: Repository must have an active open-source license.
