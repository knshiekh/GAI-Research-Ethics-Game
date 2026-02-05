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

**Questions?** See `README.md` for more details.
