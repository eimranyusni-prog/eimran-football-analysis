# Amir | Football Expert & Tactical Analyst Portfolio Website

> **"UNDERSTANDING FOOTBALL BEYOND THE GAME."**

A modern, high-performance, responsive CV and portfolio website for **Amir**, an elite Football Expert and Tactical Match Analyst. Built using pure **HTML5, CSS3, and Vanilla JavaScript** with zero heavy library dependencies.

Inspired by elite European football clubs, high-tempo match telemetry, and modern sports analytics platforms (*StatsBomb, Wyscout, The Athletic, Champions League Analytics*).

---

## ⚽ Key Features

- **Sporty Dark Theme:** Deep pitch black (`#05080c`) with electric green grass accents (`#00ff87`), subtle tactical grid lines, and glowing ambient stadium lighting.
- **Interactive SVG Tactical Board:** Live animated pitch visualizer with 4-3-3 positional structure, animated passing channels, pressing pockets, and telemetry badges (*Field Tilt: 68.4%*, *PPDA: 7.8*).
- **Navigation Bar:** Sticky blur glassmorphism, scroll-spy active state tracking, and mobile-friendly hamburger drawer menu.
- **Hero Section:** High-impact headlines, live animated statistic counters (500+ matches, 30+ systems), and CTA buttons.
- **About Me:** Engaging football philosophy narrative, analytical core pillars, and editable profile tags.
- **Football Expertise:** 6 dedicated tactical domains (Tactical Analysis, Match Analysis, Player Performance, Football Strategy, Football Data Analysis, Scouting & Player Development).
- **Competencies & Skills:** Animated progress bars with percentage counters triggered automatically via `IntersectionObserver`.
- **Experience & Education:** Dual-column career and qualification timeline with customizable placeholders tailored for an undergraduate university student.
- **Achievements & Milestones:** Dedicated recognition cards for campus tournaments, sports analytics challenges, published tactical writing, and certifications.
- **Football Projects & Studies:** Premium portfolio cards with interactive popup modal previews.
- **Tactical & Matchday Photo Gallery:**
  - 5 dynamic filter tabs (*All Moments, Matchday & Stadiums, Tactics & Training, Scouting & Talent ID, Analytics & Debriefs*).
  - High-resolution matchday, stadium, and scouting imagery.
  - Interactive full-screen Lightbox modal with next/prev arrows, image counter, and keyboard shortcuts (`←`, `→`, `Esc`).
- **Editorial Insights:** Modern sports media article layout with reading modal previews.
- **Contact Form & Toast System:** Full client-side form validation, real-time error hints, demo simulation notifications, and social links.
- **Back-to-Top:** Smooth scroll control button.

---

## 📁 Project Structure

```text
PROJECT WDM/
│
├── index.html       # Semantic HTML5 structure & content sections
├── style.css        # Responsive CSS3 styling, design tokens & animations
├── script.js        # Vanilla JS logic (Scroll-spy, Observer, Lightbox, Modals, Form validation)
├── .gitignore       # Git ignore configuration
└── README.md        # Project documentation
```

---

## 🚀 Getting Started

No compilation, bundler, or local server installation is required. Simply clone the repository and open `index.html` in any modern web browser:

```bash
# Clone the repository
git clone https://github.com/eimranyusni-prog/project-wdm.git

# Navigate to the project directory
cd project-wdm

# Open index.html in your browser
# On Windows:
start index.html
# On macOS:
open index.html
# On Linux:
xdg-open index.html
```

Or run a local static HTTP server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve .
```

---

## 🌐 Deploy to GitHub Pages

1. Push your repository to GitHub:
   ```bash
   git add .
   git commit -m "Update portfolio with achievements and responsive design"
   git branch -M main
   git remote add origin https://github.com/eimranyusni-prog/project-wdm.git
   git push -u origin main
   ```

2. Enable GitHub Pages on your repository:
   - Navigate to **Settings** > **Pages** in your GitHub repository (`https://github.com/eimranyusni-prog/project-wdm/settings/pages`).
   - Under **Build and deployment** > **Source**, choose **Deploy from a branch**.
   - Under **Branch**, select `main` and set the folder to `/ (root)`.
   - Click **Save**.

3. Your website will be live in 1–2 minutes at:
   `https://eimranyusni-prog.github.io/project-wdm/`

---

## 🛠️ Built With

- **HTML5:** Semantic markup, SVG vector graphics, accessibility attributes.
- **CSS3:** CSS Custom Properties (Variables), Flexbox, CSS Grid, Keyframe Animations, Glassmorphism.
- **Vanilla JavaScript (ES6+):** Intersection Observer API, Event Delegation, DOM Manipulation, Form Validation.
- **Google Fonts:** *Outfit*, *Plus Jakarta Sans*, *JetBrains Mono*.
- **Font Awesome 6.5.1:** Tactical and sports icons via CDN.

---

## 📄 License & Attribution

Designed and developed for **Amir | Football Expert**.
© 2026 Amir. All rights reserved.
