# Gemini Mines

A high-stakes Mines game where you test your luck to find gems and avoid mines. Set your bet, choose the number of mines, and cash out with increasing multipliers.

## How to Deploy to GitHub Pages

This project is set up to be deployed directly to GitHub Pages without any build steps.

1.  **Create a new repository** on GitHub.
2.  **Upload all the project files** (`index.html`, `index.tsx`, `App.tsx`, `components/`, `utils/`, `types.ts`, `metadata.json`) to your new repository.
3.  **Enable GitHub Pages** for your repository:
    *   Go to your repository's **Settings** tab.
    *   In the left sidebar, click on **Pages**.
    *   Under "Build and deployment", select the **Source** as "Deploy from a branch".
    *   Choose the branch you uploaded your files to (usually `main` or `master`).
    *   Select the folder as `/ (root)`.
    *   Click **Save**.
4.  **That's it!** GitHub will build and deploy your site. It might take a few minutes. You'll find the link to your live site on the same Pages settings page.

The `index.html` file includes Babel Standalone, which transpiles the TypeScript/React code directly in the browser, so you don't need to worry about `npm`, `node`, or build commands.
