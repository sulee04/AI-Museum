# AI 자연사 박물관

심해 하강형 스크롤텔링 웹사이트 — AI의 멸종과 진화를 관람하고, 최종적으로 CLI 터미널로 붕괴하는 경험.

## Stack

- Vite + React 19 + TypeScript
- GSAP + ScrollTrigger + Lenis
- Three.js + React Three Fiber
- Framer Motion, Zustand, xterm.js, Howler.js
- Tailwind CSS 4

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Project Structure

- `src/components/sections/` — Narrative acts (Hero → Terminal)
- `src/components/canvas/` — WebGL deep-sea scene
- `src/animations/timelines/` — GSAP ScrollTrigger orchestration
- `src/content/narrative.ts` — Copy, depth ranges, phase mapping
- `src/stores/narrativeStore.ts` — Global scroll/phase state

## Assets

Place audio files in `public/audio/` and wire them in `AudioProvider.tsx`.
