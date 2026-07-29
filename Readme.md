# YABP: Yet Another Boring Project

Curated ecosystem of minimalist, highly reliable, and distraction-free open-source developer tools.

[![Ecosystem Directory](https://img.shields.io/badge/YABP-Ecosystem-0071e3?style=flat-square)](https://yabp.netlify.app)
[![Netlify Status](https://img.shields.io/netlify/yabp)](https://app.netlify.com/sites/yabp/deploys)

---

## About the Initiative

YABP provides developers of minimal, high-utility projects with a professional community brand. It acts as an umbrella namespace to showcase clean software tools built with Apple-style design aesthetics and strict privacy standards.

### Existing Showcase Projects

The initiative hosts several popular open-source projects:
*   **Thoughts**: A distraction-free micro-journaling diary.
*   **NoteKar**: A lightweight note log tool to record events and dates.
*   **Empty**: A plugin-first system where nothing exists by default.
*   **OriginJS**: Zero-config metadata utility for client visibility.

Live Showcase Platform: [yabp.netlify.app](https://yabp.netlify.app)

---

## Structure

*   [index.html](file:///d:/Github_Projects/Yet-Another-Boring-Project/index.html): Showcase landing portal.
*   [style.css](file:///d:/Github_Projects/Yet-Another-Boring-Project/style.css): Global layout and design system.
*   [app.js](file:///d:/Github_Projects/Yet-Another-Boring-Project/app.js): Application logic and dynamic queries.
*   [projects.json](file:///d:/Github_Projects/Yet-Another-Boring-Project/projects.json): Official project register.
*   [LICENSE](file:///d:/Github_Projects/Yet-Another-Boring-Project/LICENSE): Open-source terms.

---

## Submit Your Project

We welcome contributions of functional, aesthetic utility tools:
1.  Fork this repository.
2.  Add your project object to the `projects` array in [projects.json](file:///d:/Github_Projects/Yet-Another-Boring-Project/projects.json):
    ```json
    {
      "name": "Your Project Name",
      "date": "2026-07-30",
      "description": "A single sentence explaining the utility value of your project.",
      "link": "https://your-live-link.com",
      "github": "https://github.com/username/repo"
    }
    ```
3.  Include the YABP Logo Badge in your project README (see badge instructions below).
4.  Open a Pull Request. CI validation will check your JSON formatting automatically.

Read [CONTRIBUTING.md](file:///d:/Github_Projects/Yet-Another-Boring-Project/CONTRIBUTING.md) for full quality standards.

---

## 2-Way Trust Verification (Badge & Link Generator)

All directory projects must link back to YABP. By appending your project's URL, the YABP portal will dynamically verify your listing and display a verification trust modal.

You can instantly generate your custom badge links using the interactive **Badge & Link Generator** on the website: [yabp.netlify.app](https://yabp.netlify.app).

If you wish to copy them manually, replace `YOUR_PROJECT_URL` with your exact live project or GitHub URL (ensure this matches your `projects.json` entry):

### README HTML Badge (Mandatory for GitHub repositories)
```html
<a href="https://yabp.netlify.app/?verify=YOUR_PROJECT_URL">
  <img src="https://raw.githubusercontent.com/dheeraz101/Yet-Another-Boring-Project/main/logo.png" width="48" height="48" alt="YABP Initiative Logo" style="display: inline-block; vertical-align: middle;" />
</a>
```

### README Markdown Badge
```markdown
[![YABP Initiative Logo](https://raw.githubusercontent.com/dheeraz101/Yet-Another-Boring-Project/main/logo.png)](https://yabp.netlify.app/?verify=YOUR_PROJECT_URL)
```

### Direct Verification Link (Optional for App UI/Websites)
If you do not want the logo badge on your app UI, you can link directly to:
```
https://yabp.netlify.app/?verify=YOUR_PROJECT_URL
```

---

## Terms & License

*   This registry and website are licensed under the [MIT License](file:///d:/Github_Projects/Yet-Another-Boring-Project/LICENSE).
*   Listed member projects retain their own licensing terms.
*   Participation is subject to the [Terms of Use](file:///d:/Github_Projects/Yet-Another-Boring-Project/TERMS_OF_USE.md).
