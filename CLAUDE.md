# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static website for Pimenta Cítrica, a sex educator and content creator. The site is built with vanilla HTML, CSS, and JavaScript, and uses a simple Express.js server for local development and deployment.

## Development Commands

### Running the development server
```bash
npm start
```
This starts the Express server on port 3000 (or the PORT environment variable). The server serves static files and handles routing with fallback to index.html for 404s.

### Installing dependencies
```bash
npm install
```

## Architecture

### Component System
The site uses a simple JavaScript-based component loading system (not a framework):

- **Header component**: Located at `components/header.html`, loaded dynamically via `js/components.js`
- **Dynamic loading**: The `loadHeader()` function fetches and injects the header HTML into placeholder divs on each page
- **Active navigation**: `setActiveNavLink()` automatically highlights the current page in navigation based on URL pathname
- **Mobile menu**: Responsive hamburger menu with toggle functionality initialized by `initMobileMenu()`

All pages include:
```html
<div id="header-placeholder"></div>
<script src="js/components.js"></script>
```

### Page Structure
Each HTML page follows this pattern:
1. Loads `css/style.css` for styling
2. Loads `js/components.js` for component functionality
3. Contains a `#header-placeholder` div that gets populated with navigation
4. Main content area with page-specific classes
5. Footer section

### Styling System
The site uses a distinctive color scheme defined in `css/style.css`:
- **Primary background**: `#ACFFAD` (bright green)
- **Primary text/accent**: `#FF0000` (red)
- **Hover state**: `#FF4444` (lighter red)
- **Secondary background**: `rgba(255, 255, 255, 0.3)` (semi-transparent white)

CSS organization:
- Reset and base styles at the top
- Navigation and dropdown menu styles
- Page-specific layouts (hero, about, services grid, etc.)
- Responsive design with breakpoints at 1024px, 768px, and 480px

Hover effect patterns:
- **Buttons** (`.download-btn`, `.submit-btn`): `translateY(-3px)` with color change from `#FF0000` to `#FF4444`
- **Text links** (`.press-list a`, `.article-list a`, `.blog-link`): Permanent underline with color change to `#FF4444` on hover

### Layout Patterns
Common layout classes used throughout:
- `.hero-section` + `.hero-container`: Two-column grid for homepage
- `.page-content` + `.content-container`: Standard page wrapper with border
- `.services-grid`: Three-column grid for service cards (responsive)
- `.two-column`: Generic two-column layout
- `.about-layout`, `.content-layout`, `.press-layout`: Page-specific two-column layouts

### Image Assets
All images are stored in `/images/` directory:
- `Logo.png`: Site logo used in navigation
- Social media icons: `ig.png`, `tiktok.png`, `X-Logo.png`, `youtube-logo-hd-8.png`, `linkedin.png`
- Media outlet logos for "Seen On" section
- Page-specific images for About, Press, Content Creation, etc.
- Language flags: `BR.png`, `EN.png`, `DE.png`

## Page Organization

The site consists of 11 HTML pages:
- `index.html`: Homepage with hero section and media logos
- `about.html`: Two-column layout with image and bio text
- `work-with-me.html`: Services overview with three-card grid
- `workshops.html`: Workshop offerings and testimonials
- `content-creation.html`: Content creation services
- `advocacy.html`: Advocacy and activism work
- `resources.html`: Downloadable resources (future implementation)
- `articles-stories.html`: Links to published articles
- `press.html`: Media appearances with language-tagged links
- `blog.html`: Link to external Substack blog
- `contact.html`: Contact form and email

## Server Configuration

The Express server (`server.js`) is minimal:
- Serves all files statically from the root directory
- Root route (`/`) explicitly serves `index.html`
- Catch-all route serves requested files or falls back to `index.html` on 404
- Configured to work with PORT environment variable for deployment platforms

## Responsive Design

The site implements mobile-first responsive design:
- **Desktop (>1024px)**: Full multi-column layouts, horizontal navigation
- **Tablet (768-1024px)**: Reduced columns, maintained horizontal nav
- **Mobile (<768px)**: Single column layouts, hamburger menu navigation with expanded dropdown menu
- **Small mobile (<480px)**: Compressed spacing and typography

Mobile navigation behavior:
- Hamburger menu toggles with animated icon transformation
- Navigation drawer slides in from top with max-height transition
- Dropdown submenu items always visible on mobile (indented)
- Menu closes on link click or outside click
- Social icons moved to bottom of mobile menu

## Git Workflow

This project uses conventional commits. Recent commit history shows:
- "aligned images nicer"
- "made the blog more accessible"
- "removed dead links"
- "added articles"
- "fixed the Blog page"

When making changes, ensure commit messages are descriptive and follow the established informal style.
