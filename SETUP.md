# Setup Instructions

## Initial Setup (One-time)

1. **Navigate to the project directory:**
   ```bash
   cd "/Users/kshiekh/Library/CloudStorage/OneDrive-VirginiaTech/GAI Research Ethics Game"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

   This will install:
   - Next.js 14
   - React 18
   - TypeScript
   - ESLint

## Running the Project

### Development Mode

```bash
npm run dev
```

The app will be available at: **http://localhost:3000**

Press `Ctrl+C` to stop the server.

### Production Build

```bash
npm run build
npm start
```

## Project Files Checklist

✅ **Configuration Files:**
- `package.json` — Dependencies & scripts
- `tsconfig.json` — TypeScript configuration
- `next.config.js` — Next.js configuration
- `.eslintrc.json` — ESLint rules
- `.npmrc` — NPM configuration
- `.gitignore` — Git ignore rules

✅ **App Files (App Router):**
- `app/layout.tsx` — Root layout with header/footer
- `app/globals.css` — Global dark theme styles
- `app/page.tsx` — Landing page
- `app/play/page.tsx` — Game interface (24 cases)
- `app/results/page.tsx` — Results & ethical profile

✅ **Components:**
- `components/ProgressBar.tsx` — Case progress display
- `components/CaseCard.tsx` — Scenario vignette display
- `components/ConditionsChecklist.tsx` — Condition selector
- `components/ResultsBlocks.tsx` — Report builder

✅ **Logic Libraries:**
- `lib/types.ts` — TypeScript type definitions
- `lib/storage.ts` — localStorage helpers
- `lib/engine.ts` — Game logic (shuffle, session, report generation)

✅ **Data Files:**
- `data/cases.json` — 24 research scenarios (10 families + 2 wildcards)
- `data/conditions.json` — 10 ethical safeguards

✅ **Documentation:**
- `README.md` — Project overview and usage guide

## Key Features

- ✅ **100% Client-Side**: Everything uses `localStorage`, no server uploads
- ✅ **24 Research Vignettes**: 10 variant families + 2 wildcards
- ✅ **Ethical Profile Inference**: Reports your style & dealbreakers
- ✅ **No Dependencies on External CDNs**: Pure Next.js + TypeScript
- ✅ **Dark Theme**: Pre-built CSS with no Tailwind
- ✅ **Responsive Design**: Works on desktop and mobile

## Troubleshooting

### Port Already in Use
If port 3000 is already in use:
```bash
npm run dev -- -p 3001
```

### Node.js Not Installed
Make sure you have Node.js 18+ installed. Check with:
```bash
node --version
npm --version
```

### Build Errors
Clear the Next.js cache and reinstall:
```bash
rm -rf .next node_modules
npm install
npm run dev
```

## Next Steps

1. Start the dev server: `npm run dev`
2. Open http://localhost:3000 in your browser
3. Click "Start Playing" to begin
4. Complete all 24 cases
5. View your ethical profile in the Results page
6. Download your results as JSON (stays on your device)

---

## Shareable Link Options (Send Instead of Git Repo)

### Option 1: GitHub Pages (Recommended for quick sharing)

Easiest way to share a public link with others — no cloning required.

**Setup:**

1. Push this repo to GitHub (create a public repo if not already done).

2. Build the static export:
   ```bash
   npm install
   npm run export
   ```
   This creates an `out/` folder with static files.

3. Configure GitHub Pages:
   - Go to your repository **Settings** → **Pages**
   - Under "Source," select "Deploy from a branch"
   - Choose `main` (or your branch) and `/root` or `/docs` folder
   - **If using root folder:** rename `out/` to the repo root or copy contents
   - **If using docs folder:** copy `out/` contents into `docs/`

4. GitHub will auto-publish to `https://<yourusername>.github.io/<repo-name>`

5. Share this public URL — no setup needed on recipient's end.

**Test locally before pushing:**
```bash
npx serve out/
# Opens at http://localhost:3000
```

### Option 2: Netlify (Also very easy)

Even simpler UI than GitHub Pages.

1. Run the export:
   ```bash
   npm run export
   ```

2. Go to [netlify.com](https://netlify.com) → "New site from Git" (or drag-and-drop the `out/` folder).

3. Netlify auto-detects and deploys. You get a public URL immediately.

4. Share the Netlify URL.

### Option 3: Docker + Docker Hub (For production-grade sharing)

If you want people to run via a container:

1. Create a `Dockerfile` in the repo root (I can add this).
2. Build and push:
   ```bash
   docker build -t <yourhubusername>/gai-research-ethics .
   docker push <yourhubusername>/gai-research-ethics
   ```
3. Share the Docker image name. Others can run:
   ```bash
   docker run -p 3000:3000 <yourhubusername>/gai-research-ethics
   ```

---

**Questions?** See `README.md` for more details.
