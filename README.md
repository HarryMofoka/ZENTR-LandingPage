<div align="center">

# ◈ Z E N T R

**A motion-first digital design experiment**

*Exploring structure, rhythm, and digital systems through cutting-edge web technology*

![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.2-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-7-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)

---

</div>

## ◈ Overview

ZENTR is a premium, dark-themed design experiment that pushes the boundaries of what modern web experiences can achieve. Built with **React 19**, **Vite 7**, and **Tailwind CSS 4**, the site features a fully animated starfield background, glassmorphism UI components, and rich interactive elements across 5 distinct pages.

Every component is **modular**, **well-documented** with JSDoc + inline WHY comments, and **performance-optimised** with React.lazy, React.memo, and CSS compositor hints.

---

## ◈ Pages

| Route | Page | Description |
|-------|------|-------------|
| `/` | **Home** | Full landing page with hero, logo marquee, areas of exploration, features, testimonials |
| `/experiment` | **Experiment** | 6 SA-themed project cards with gradient thumbnails and hover-lift effects |
| `/studies` | **Studies** | 4 expandable case studies with animated stat counters and accordion panels |
| `/journal` | **Journal** | 6 blog article cards with featured/regular sizes and author profiles |
| `/connect` | **Connect** | Contact form, team member cards, and office locations (JHB & CPT) |

---

## ◈ Design System

### Colour Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `bg-primary` | `#050505` | Page background |
| `accent` | `#EF4444` | Brand red — CTAs, labels, hover states |
| `surface` | `rgba(255,255,255,0.03)` | Glass card backgrounds |
| `border` | `rgba(255,255,255,0.10)` | Subtle borders and dividers |
| `text-primary` | `#E5E5E5` | Body text |
| `text-muted` | `#737373` | Secondary text |

### Typography

| Font | Weight Range | Usage |
|------|-------------|-------|
| **Syne** | 400–800 | Headlines, page titles, nav links |
| **Inter** | 300–600 | Body text, UI elements |
| **JetBrains Mono** | 400 | Labels (`/// 01`), code blocks, monospace accents |

### Visual Language

- **Glassmorphism** — Frosted-glass sections and cards (`backdrop-blur`, translucent borders)
- **Beam dividers** — Animated red light beams on column borders
- **Starfield** — Canvas 2D particle field with twinkling dots
- **Shooting stars** — CSS-animated streaks in random directions
- **Reveal animations** — Scroll-triggered blur-to-focus entrance effects
- **Marquee** — Infinite-scroll strips for logos and testimonials

---

## ◈ Tech Stack

```
Frontend Framework    React 19.2
Build Tool            Vite 7.3
Routing               React Router 7
Styling               Tailwind CSS 4.2 (CSS-first config via @theme)
Animations            CSS keyframes + Canvas 2D + IntersectionObserver
Linting               ESLint 9
```

---

## ◈ Project Structure

```
src/
├── main.jsx                     # Entry point + BrowserRouter
├── App.jsx                      # Route definitions (5 routes, lazy-loaded)
├── index.css                    # Global styles, keyframes, design tokens
│
├── components/
│   ├── Layout.jsx               # Shared wrapper (Navbar + Background + GridOverlay)
│   ├── Navbar.jsx               # Fixed nav with desktop links + mobile hamburger
│   ├── Background.jsx           # Animated starfield + shooting stars (Canvas 2D)
│   ├── GridOverlay.jsx          # Decorative 4-column grid lines
│   ├── TextBanner.jsx           # Large "ZENTR" typography section
│   │
│   ├── Hero/
│   │   ├── Hero.jsx             # 4-column hero grid
│   │   ├── HeroItem.jsx         # Single hero column with beam divider
│   │   └── HeroCenterTitle.jsx  # Floating "ZENTR" brand title
│   │
│   ├── AreasOfExploration/
│   │   ├── AreasOfExploration.jsx
│   │   ├── ExplorationCard.jsx  # Interactive card with SVG illustration
│   │   └── SectionSidebar.jsx   # Reusable sidebar (shared across sections)
│   │
│   ├── Features/
│   │   ├── Features.jsx         # Core principles section
│   │   └── FeatureCard.jsx      # Individual feature card
│   │
│   ├── LogoMarquee/
│   │   ├── LogoMarquee.jsx      # Infinite-scroll capability strip
│   │   └── LogoItem.jsx         # Single marquee item with SVG icon
│   │
│   ├── Testimonials/
│   │   ├── Testimonials.jsx     # Client testimonials marquee
│   │   └── TestimonialCard.jsx  # Individual testimonial card
│   │
│   └── Footer/
│       ├── Footer.jsx           # Footer with sidebar + links + copyright
│       ├── FooterLinks.jsx      # Sitemap + social columns
│       └── Newsletter.jsx       # Email signup form
│
├── pages/
│   ├── HomePage.jsx             # Landing page (assembles all sections)
│   ├── ExperimentPage.jsx       # Design experiments showcase
│   ├── StudiesPage.jsx          # Case studies with accordion + stats
│   ├── JournalPage.jsx          # Blog / insights articles
│   └── ConnectPage.jsx          # Contact + team + locations
│
└── hooks/
    └── useRevealAnimation.js    # IntersectionObserver scroll-reveal hook
```

---

## ◈ Performance Optimisations

| Technique | Impact | Files |
|-----------|--------|-------|
| **React.lazy + Suspense** | Code splitting — pages load on demand | `App.jsx` |
| **React.memo** | Prevents re-renders on 7 static components | Various |
| **Canvas 2D starfield** | ~5MB GPU vs ~300MB from previous WebGL | `Background.jsx` |
| **CSS shooting stars** | GPU-accelerated, zero JS overhead | `index.css` |
| **`will-change` hints** | Compositor promotion for animated elements | `index.css` |
| **`display=swap`** | No invisible text during font loading | `index.css` |
| **Preconnect hints** | DNS/TLS pre-warming for Google Fonts | `index.html` |

---

## ◈ Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9

### Installation

```bash
# Clone the repository
git clone https://github.com/HarryMofoka/ZENTR-LandingPage.git
cd ZENTR-LandingPage

# Install dependencies
npm install

# Start the dev server
npm run dev
```

The site will be available at `http://localhost:5173`.

### Build for Production

```bash
npm run build
npm run preview    # Preview the production build locally
```

---

## ◈ South African References

All people, projects, and locations reference South African culture and geography:

| Category | Examples |
|----------|---------|
| **Projects** | Karoo Dunes, Table Mountain Rebrand, Kalahari Grid, Drakensberg Motion, Soweto Pulse, Cape Winelands |
| **Clients** | Thabo Nkosi (JHB), Naledi Molefe (CPT), Sipho Dlamini (Durban), Zanele Mthembu (Pretoria) |
| **Authors** | Lerato Khumalo, Andile Zulu, Mpho Sithole, Palesa Mokoena |
| **Team** | Kagiso Mokoena, Lindiwe Ndaba, Bongani Cele, Amahle Dube |
| **Offices** | The Zone @ Rosebank (JHB), Workshop17 V&A Waterfront (CPT) |

---

## ◈ Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint checks |

---

<div align="center">

**Built with precision.**

◈

</div>
