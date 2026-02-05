# GitHub Pages Setup Guide (Root Folder Method)

Your static files are ready in the `out/` folder! Here's how to set up GitHub Pages to share a public link.

## Step 1: Copy Static Files to Root

Move the contents of `out/` to the repo root so GitHub Pages can serve them:

```bash
# From project root
cp -r out/* .
git add .
git commit -m "Add static export for GitHub Pages"
git push origin main
```

This copies:
- `index.html`
- `play.html`
- `results.html`
- `404.html`
- `_next/` (CSS, JavaScript bundles)
- `index.txt`, `play.txt`, `results.txt`

## Step 2: Configure GitHub Pages

1. Go to your GitHub repository
2. Click **Settings** → **Pages** (left sidebar)
3. Under "Source," select **Deploy from a branch**
4. Choose branch: `main` (or your default branch)
5. Choose folder: `/root`
6. Click **Save**

GitHub will deploy automatically and show you a public URL like:
```
https://<your-username>.github.io/<repo-name>
```

## Step 3: Share the Link

That's it! Share the GitHub Pages URL with others. They can visit it directly—no cloning, no installation needed.

## Step 4: Test Locally (Optional)

Before pushing, test the static site locally:

```bash
npx serve out/
# Opens at http://localhost:3000
```

Or use Python:
```bash
cd out
python -m http.server 8000
# Opens at http://localhost:8000
```

## How to Update the Site

When you make changes to the game:

1. Rebuild and export:
   ```bash
   npm run build
   ```

2. Copy new files to root:
   ```bash
   rm -rf index.html play.html results.html 404.html _next/
   cp -r out/* .
   ```

3. Commit and push:
   ```bash
   git add .
   git commit -m "Update game content"
   git push origin main
   ```

GitHub Pages will auto-deploy the changes (usually within 1-2 minutes).

## Notes

- The `next/` folder requires a GitHub Pages setting to work properly with static exports. If you see a 404 on styles/scripts, add a `.nojekyll` file to the root:
  ```bash
  touch .nojekyll
  git add .nojekyll
  git commit -m "Add .nojekyll for GitHub Pages static export"
  git push
  ```

- This method is best for static content. If you need server-side features later, use Vercel or Docker instead.

---

**Public URL format:** `https://<your-username>.github.io/<repo-name>`
