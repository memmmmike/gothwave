# GOTHWAVE — build ledger

Deployable port of the `gothwave-archive.jsx` prototype into a TanStack Start app,
modeled on github.com/memmmmike/zapoutdoorz.

## Stack (decided)
- TanStack Start (React 19 + Vite 7), TypeScript, file-based routing.
- Tailwind v4 (`@tailwindcss/vite`) + shadcn Dialog for the modal.
- Nitro `vercel` preset → `.vercel/output` (Build Output API v3). `vercel.json` pins build/install.
- Node >= 22.12 via `engines.node`.
- **No** `@lovable.dev/vite-tanstack-config` wrapper (reference uses it, but it pulls
  Lovable-only dev plugins). Wire `tanstackStart() + nitro() + viteReact() + tailwindcss() + tsConfigPaths()` directly.

## File set
- `vite.config.ts`, `tsconfig.json`, `package.json`, `vercel.json`, `components.json`
- `eslint.config.js`, `.prettierrc`, `.prettierignore`, `.gitignore`
- `src/router.tsx` (`getRouter`), `src/styles.css`
- `src/routes/__root.tsx` (shell, fonts, meta, error + 404 boundaries)
- `src/routes/index.tsx` (hero · sticky filter bar · grid · Dialog modal · empty state)
- `src/data/lineup.ts` (typed ENTRIES + SCENES + FLAG, ported verbatim)
- `src/lib/utils.ts` (cn), `src/components/ui/dialog.tsx` (shadcn)
- `README.md`
- `routeTree.gen.ts` auto-generated — never hand-edit.

## Data facts (from prototype, do not drift)
- 10 scenes: CLD WCH PWR SYN ETH DRK EBM FLK DUN LBL.
- ENTRIES count computed at runtime; 4 scene-note flags: fernow×2 (Vatican Shadow, Prurient), go (Genocide Organ), dtl (Drowning the Light).
- FLAG map (fernow/dtl/go) text preserved exactly. Footer safety note preserved exactly.
- `q()` encoder strips parens; links = Bandcamp/Discogs/YouTube search URLs.

## Tasks
1. [x] Scaffold + install, `npm run dev` works. (renders SSR on :3001, 200)
2. [x] Port data → `src/data/lineup.ts` (typed). 120 entries / 4 flags / 10 scenes — exact match to prototype.
3. [x] Build `index.tsx` UI (hero/filter/grid/modal/empty).
4. [x] Port design tokens → `styles.css` `@theme` (palette, fonts, grain, scanline, a11y, reduced-motion).
5. [x] `__root.tsx` shell (fonts, meta, boundaries).
6. [x] Streaming-link upgrade pass. 84 Bandcamp URLs web-confirmed (subagent fetched + named the artist;
       then independently re-verified: every URL HTTP 200 + page names the artist, FAIL=0). Applied as
       `bandcamp` field. Cocteau Twins → official site only, kept on search (no Bandcamp). oOoOO/Rome/Desire
       Records → no confirmable page, search default. Watch-outs (Christian Death Rozz-era, Medical/Avant
       name collisions, Sol Invictus) noted in lineup.ts header for manual review. No fabrications.
7. [x] README written; `npm run build` exit 0 (emits .vercel/output, tsc passes) + `npm run lint` exit 0.
       Verified bandcamp URL present in shipped client bundle.

## Handoff (final)
- GOTHWAVE is a complete, deployable TanStack Start app. Prototype ported faithfully: 120 entries / 10 scenes
  / 4 scene-notes, full design system (tokens, grain, scanline, RGB-split wordmark), filter+search+grid+modal,
  a11y (Radix Dialog Esc/focus-trap, focus-visible, reduced-motion, mobile down to ~320px).
- Deploy: import to Vercel (or `vercel deploy`). vercel.json pins build/install; build forces NITRO_PRESET=vercel
  → .vercel/output (Build Output API v3). No env vars needed.
- Verified: dev SSR render (200), `npm run build` exit 0, `npm run lint` exit 0, tsc clean, 84/84 bandcamp links
  resolve+match, link shipped in client bundle.
- NOT done (out of scope / honest gaps): no automated tests (TanStack Start scaffold has none); interactive
  click-through (open modal, filter) not browser-driven — relied on SSR render + tsc + Radix's tested behavior;
  no git repo initialized (folder is not a repo); no real OG image (meta uses summary card).
- Deviation from reference: skipped @lovable.dev/vite-tanstack-config wrapper (Lovable-only dev plugins); wired
  tanstackStart()+nitro()+viteReact()+tailwindcss()+tsConfigPaths() directly. Same stack, same Vercel output.

## Build facts (verified)
- `npm run build` → exit 0, tsc passes, emits `.vercel/output/{config.json,functions/__server.func,static}`.
  Preset forced via `NITRO_PRESET=vercel` in the build script (Nitro defaults to node preset / `.output` otherwise).
- "use client" Rollup warnings are benign (TanStack Router + Radix ship the directive; ignored when bundled).
- `npm run lint` → exit 0.
- Note: rtk command-rewrite hook mangles `npx`/output-redirection in Bash; call `./node_modules/.bin/*` directly.

## Constraints
- Never invent artists/URLs. Unsure → keep search link, note uncertainty in comment.
- Preserve scene-note content exactly (factual NSBM/far-right caveat). Measured, not preachy.
- Accessible: visible focus, Esc-to-close, mobile down to ~320px.

## Handoff log
- (start) Read prototype (498 lines, source of truth). Confirmed reference structure + current
  TanStack Start/Vercel config via web. Scaffolding next.
