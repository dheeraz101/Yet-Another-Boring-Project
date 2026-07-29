# YABP — Yet Another Boring Project

**A curated, community-driven collection of projects inspired by minimal design philosophy, high utility, and productivity.**
*Providing unbranded, minimal projects with a professional community brand umbrella. Built to help developers improve, create meaningful tools, and ship better work — together.*

[![Official Project](https://img.shields.io/badge/YABP-Official-0071e3?style=flat-square&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA6klEQVQ4y2Ng+M/A8J+B4T8D46n///8/ZWBguMDw//8LBgYGJgYmBoZ/DAz/GZgYGP4zMDIwMDAwMDIwMjAyMDIyMDIxMjIwMDIwMzEwMDAzMDAwMDIwMDIwMDAwMDAxMDIwMDAwMDAyMDAyMDAwMDMyMDIwMDAyMTAyMDAwMDAxMDIwMDAwMDAyMDAwMDAwMDAwMDAwQAEkYgKQAAAAASUVORK5CYII=)](https://yabp.netlify.app)
[![Netlify Status](https://api.netlify.com/api/v1/badges/00000000-0000-0000-0000-000000000000/deploy-status)](https://app.netlify.com/sites/yabp/deploys)

---

## ✨ About YABP

YABP is an **official open-source initiative** that lists projects adhering to a **minimal, productive, and aesthetic** philosophy—deeply inspired by Apple’s design principles. The brand umbrella provides developers of minimal projects with a professional community brand, giving them a unified home.

The initiative currently includes several popular open-source projects, such as:
- **Thoughts** — A distraction-free micro-journaling space.
- **NoteKar** — A clean, lightweight logging app that tracks notes and dates.
- ...and many other minimal tools created by the community!

🔗 **Live Showcase Directory:** [https://yabp.netlify.app](https://yabp.netlify.app)

---

## 🧩 Features

- **Apple HIG-Inspired UI** — Card-centric, minimalist design system, clean typography, and responsive grid layouts.
- **Subtle Interactions** — Glassmorphism headers, smooth hover animations, and intuitive dark/light mode toggles.
- **Live Search & Filter** — Instantly search and sort through community-submitted projects on the site.
- **Automated Verification** — Pull Requests are automatically verified using a GitHub Action to validate the structure of `projects.json`.
- **Netlify Build Efficiency** — Smart build-ignoring configuration keeps Netlify from rebuilding when only documentation or JSON records change, preserving resources.

---

## 📁 Repository Structure

- [index.html](file:///d:/Github_Projects/Yet-Another-Boring-Project/index.html) — Main showcase website.
- [projects.json](file:///d:/Github_Projects/Yet-Another-Boring-Project/projects.json) — Database of all listed community projects.
- [logo.png](file:///d:/Github_Projects/Yet-Another-Boring-Project/logo.png) — Official YABP Logo (512x512 PNG).
- [favicon.ico](file:///d:/Github_Projects/Yet-Another-Boring-Project/favicon.ico) — Official favicon.
- [LICENSE](file:///d:/Github_Projects/Yet-Another-Boring-Project/LICENSE) — MIT License.
- [SECURITY.md](file:///d:/Github_Projects/Yet-Another-Boring-Project/SECURITY.md) — Security policy and vulnerability reporting.
- [CONTRIBUTING.md](file:///d:/Github_Projects/Yet-Another-Boring-Project/CONTRIBUTING.md) — Contribution workflow and quality checklist.
- [TERMS_OF_USE.md](file:///d:/Github_Projects/Yet-Another-Boring-Project/TERMS_OF_USE.md) — Brand guidelines and community directory terms.

---

## 🚀 How to List Your Project

We welcome **well-crafted, thoughtful projects** that share our aesthetic and utility goals.

To list your project:
1. **Fork** this repository.
2. Edit [projects.json](file:///d:/Github_Projects/Yet-Another-Boring-Project/projects.json) and add your project detail to the `"projects"` array:
   ```json
   {
     "name": "Your Project Name",
     "date": "2026-07-29",
     "description": "Short, specific sentence describing what the project solves.",
     "link": "https://your-live-link.com",
     "github": "https://github.com/username/repo"
   }
   ```
3. Commit your changes and open a **Pull Request**. The automated GitHub Action workflow will verify your JSON syntax.

For more details, check out the full [CONTRIBUTING.md](file:///d:/Github_Projects/Yet-Another-Boring-Project/CONTRIBUTING.md).

---

## 🎨 Branding Requirement (YABP Logo Badge)

To help build the community network, all projects that are part of the YABP brand umbrella **must include the YABP logo badge** in their repository READMEs.

Please copy and paste one of these snippets at the top of your `README.md` file:

### Option 1: Clean HTML (Recommended)
```html
<a href="https://yabp.netlify.app">
  <img src="https://raw.githubusercontent.com/dheeraz101/Yet-Another-Boring-Project/main/logo.png" width="48" height="48" alt="YABP Initiative Logo" style="display: inline-block; vertical-align: middle;" />
</a>
```

### Option 2: Markdown Logo Link
```markdown
[![YABP Initiative Logo](https://raw.githubusercontent.com/dheeraz101/Yet-Another-Boring-Project/main/logo.png)](https://yabp.netlify.app)
```

---

## ⚖️ License & Terms

- This directory and infrastructure are licensed under the **MIT License**.
- Listed projects retain their own licensing (refer to their respective repositories).
- By participating, you agree to our **[Terms of Use](file:///d:/Github_Projects/Yet-Another-Boring-Project/TERMS_OF_USE.md)**.
