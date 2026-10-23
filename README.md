# Chicken CEO — The World's Worst Boss

A browser-only corporate comedy game built with React, Vite, TypeScript, custom CSS, Framer Motion, and Lucide React. No backend or API keys required.

## Play

Survive five days at Eggzecutive Industries. Make three decisions each day, handle the consequences, review the daily report, and face the final audit. Cash, workforce happiness, or investor confidence reaching zero ends your tenure early.

The game includes interactive banana breaks, investor calls and an egg-printing office printer (pick two each day), plus an optional daily investor-pitch timing challenge with a no-timing safe option. These change real company stats without consuming the three regular business decisions. Limits and feedback persist across reloads, and older saves migrate automatically.

The prototype includes 42 original events with three choices each, seeded state-aware event selection, delayed consequences, egg-sales income and payroll, eight local achievements, eight possible evaluation titles, optional synthesized audio, a potato workforce, a news feed, and browser-local progress, settings and high scores. The cinematic office uses original generated 3D-style key art with lightweight CSS effects and an artwork-unavailable fallback, rather than a real-time 3D engine or a fully rigged animated character.

## Development

```sh
npm install
npm run dev
npm test
npm run build
npm run preview
```

## Publishing

Build from the project folder, then deploy the built assets folder explicitly (never the project/work directory):

```sh
npm run build
npx wrangler deploy ./dist --name chicken-ceo --temporary
```

`wrangler.jsonc` deploys only `dist/`. A temporary deployment must be claimed within 60 minutes using the private claim URL printed by Wrangler. That URL is an ownership credential: never put it in public files or the game.

## Project layout

- `src/game/`: typed reducer, original event data, score/ending/achievement rules, automated tests.
- `src/components/`: opening screen, office, live statistics, employee roster and news.
- `src/App.tsx`: game presentation, decisions, reports, ending, modals and notifications.
- `src/persistence.ts`: resilient browser-only save and validation.
- `src/audio.ts`: original Web Audio effects.
- `public/office.jpg`: original generated illustration.
- `public/fonts/`: bundled Google Fonts with SIL Open Font licenses.

## Verification performed

- TypeScript and Vite production build pass.
- All 15 automated test groups pass: all 126 choices, duplicate protection, early failures, endings, 100 seeded runs, office action limits/costs, pitch grades, five-day bonus runs, and legacy-save migration/round trips.
- Browser: complete five-day run reached the final evaluation; new-game restart, banana/phone/printer actions, stat feedback, action blocking, timed pitch, safe pitch, and refresh/resume persistence checked. Browser console returned no errors.
- Mobile: 390px iframe (375px content viewport) checked on home and gameplay with no horizontal overflow; all three decisions present. Office targets measure 103×65px.
- Missing artwork: office fallback renders and gameplay remains present.

Progress is local to the browser and origin; a preview and a deployed site have separate saves. No online leaderboard or multiplayer is claimed.
