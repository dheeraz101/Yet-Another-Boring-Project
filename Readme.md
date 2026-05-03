# YABP — Yet Another Boring Project

**A curated, community-driven collection of projects inspired by minimal design philosophy and productivity.**
*Built to help developers improve, create meaningful tools, and ship better work — together.*

[![Official Project](https://img.shields.io/badge/YABP-Official-0071e3?style=flat-square\&logo=data\:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA6klEQVQ4y2Ng+M/A8J+B4T8D46n///8/ZWBguMDw//8LBgYGJgYmBoZ/DAz/GZgYGP4zMDIwMDAwMDIwMjAyMDIyMDIxMjIwMDIwMzEwMDAzMDAwMDIwMDIwMDAwMDAxMDIwMDAwMDAyMDAyMDAwMDMyMDIwMDAyMTAyMDAwMDAxMDIwMDAwMDAyMDAwMDAwMDAwMDAwQAEkYgKQAAAAASUVORK5CYII=)](https://yabp.netlify.app)
[![Netlify Status](https://api.netlify.com/api/v1/badges/00000000-0000-0000-0000-000000000000/deploy-status)](https://app.netlify.com/sites/yabp/deploys)

---

## ✨ About

YABP is an **official open-source hub** that lists projects adhering to a **minimal, productive, and aesthetic** philosophy—
inspired by Apple’s design principles.

The site itself is a single-page experience with:

* A beautiful card-based layout
* Dark/light mode
* A dynamic modal that displays community projects from a single `projects.json` file

🔗 **Live site:** [https://yabp.netlify.app](https://yabp.netlify.app)

---

## 🧩 Features

* **Minimal UI** — Card-centric design, clean typography, subtle animations
* **Dark & Light Mode** — Toggle by clicking the logo (preference saved locally)
* **Dynamic Project Table** — Powered by `projects.json`
* **Remix Icons** — Crisp, modern icon set
* **Fully Responsive** — Works across desktop, tablet, and mobile
* **Easy Contribution** — Just edit one JSON file

---

## 📁 Project Structure

```
yabp/
├── index.html        # Main site
├── projects.json     # Community projects database
├── logo.png          # Official YABP logo (512×512)
├── favicon.ico       # Official favicon
└── README.md         # This file
```

---

## 🚀 How to Contribute a Project

We welcome **well-crafted, thoughtful projects** aligned with our philosophy:

> *“Minimal design, high utility, and genuine productivity enhancement.”*

### 1. Fork this repository

---

### 2. Edit `projects.json`

Add your project inside the `"projects"` array:

```json
{
  "name": "Your Project Name",
  "date": "2026-05-20",
  "description": "A short, one-line description of what it does and why it's useful.",
  "link": "https://your-demo-or-live-url.com",
  "github": "https://github.com/you/your-repo"
}
```

#### Field Guidelines

* **name** — Keep it short and clear
* **date** — Use ISO format (`YYYY-MM-DD`)
* **description** — One sentence, be specific
* **link** — Live URL (or `""` if none)
* **github** — Repo URL (or `""` if none)

---

### 3. Quality Guidelines

We only accept projects that:

* ✅ Are fully functional (no placeholders or “coming soon”)
* ✅ Have a clean README
* ✅ Show thoughtful design (not a basic tutorial clone)
* ✅ Solve a real problem (even a small one)
* ✅ Use proper licensing and attribution

❌ We reject:

* Spam
* Empty shells
* Poorly described projects
* Anything that wastes user time

---

### 4. Open a Pull Request

* Use a clear title:
  `Add project: [Your Project Name]`
* Explain what your project does and why it fits YABP
* Wait for review (improvements may be suggested)

---

## 🎨 Official Assets

All contributors are encouraged to use YABP branding.

### Logo → `logo.png`

Use for:

* Project headers
* GitHub previews
* “Part of YABP” badges

### Favicon → `favicon.ico`

Use for:

* Browser tabs
* Bookmarks

📥 Download directly from this repository and place in your project root.

---

## 💻 Tech Stack

* HTML5 / CSS3 (custom properties, animations, backdrop blur)
* Remix Icons (CDN)
* Vanilla JavaScript (no frameworks)
* Inter (Google Fonts)
* Netlify (hosting & deployment)

---

## 🧠 Philosophy

> “Boring” doesn’t mean useless.
> It means reliable, focused, and distraction-free.

We celebrate tools that:

* Do one thing extremely well
* Look clean and intentional
* Respect the user’s time and attention

If your project feels at home in a calm, productive workspace—it belongs here.

---

## 📝 License

This repository is licensed under the **MIT License**.

All listed projects retain their own licenses — check their respective repositories.

---

**Made with ❤️ by the YABP community.**
