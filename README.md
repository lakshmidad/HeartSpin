# HeartSpin — Valentine's Confession (React + Vite)

This repository is a small interactive Valentine experience built with React, Vite, Three.js and Tailwind CSS. It provides a polished 3D "Crystal Heart" scene with a glassmorphism UI on top so you can send short love messages to someone special.

## What we built
- **3D Crystal Heart**: a faceted heart that slowly rotates and pulses like a heartbeat (built with `three` + `@react-three/fiber` + `@react-three/drei`).
- **Glassmorphism UI**: centered translucent card with Dancing Script typography and a short message prompt.
- **Interactive buttons**:
	- **YES**: triggers a large particle explosion and a confetti success screen.
	- **NO**: the playful "impossible" button — it moves away when the user approaches and changes the prompt text.
- **Send / Share**: compose a short message in the overlay and share it via the Web Share API or copy a shareable link to the clipboard.
- **3D Message Text**: the message entered in the UI also appears as 3D text near the heart in the scene.

## Tech stack
- React 19
- Vite
- Three.js, @react-three/fiber, @react-three/drei
- Framer Motion
- Tailwind CSS
- canvas-confetti (for the success burst)

## Files of interest
- `src/App.jsx` — main app and scene wiring
- `src/components/Heart.jsx` — 3D heart mesh and pulse animation
- `src/components/Particles.jsx` — floating particles / starfield
- `src/components/Explosion.jsx` — particle explosion used by YES
- `src/components/Message3D.jsx` — renders the entered message as 3D text
- `src/components/Overlay.jsx` — glass UI card, message input, YES/NO behavior, Send/Share button
- `tailwind.config.js` and `src/index.css` — styling and glassmorphism utilities

## Run locally

Prerequisites: Node.js (recommended LTS), npm

1. Install dependencies:

```bash
npm install
```

2. Start dev server:

```bash
npm run dev
```

Open the URL printed by Vite (e.g. `http://localhost:5177/`).

## How to use
- Type a short message into the overlay input (default: "I love you"). The message will appear in the 3D scene.
- Click **YES** to trigger the particle explosion and success confetti.
- Hover over **NO** — it will dodge and update the prompt text.
- Click **Send / Share** to copy a shareable URL (or open the native share dialog on supported devices).

## Notes & debugging
- If the page is blank, check the browser console for errors and ensure the dev server is running.
- Tailwind utilities and the scene are configured in `tailwind.config.js` and `src/index.css`.
- If you add large textures or fonts, prefer hosting them locally under `public/` and reference by absolute path (`/assets/...`).

## Next improvements (ideas)
- Add persistent shareable URLs that prefill the message when opened.
- Add audio (romantic piano) with mute control and an auto-play friendly setup.
- Improve mobile layout and make the heart touch-interactive.

---

If you want, I can also add a small demo GIF or prepare a production build (`npm run build`) and a short README badge showing the local URL.
