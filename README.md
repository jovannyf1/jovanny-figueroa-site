# Jovanny Figueroa personal site

This is a static HTML/CSS/JavaScript portfolio site for Jovanny Figueroa. It includes a home page, a dedicated projects page with interactive viewers for the complete HearMeOut and Clarity presentations, the demo videos embedded in those source files, and a local site guide that answers questions about Jovanny and the site without an API key.

## Open locally

Open `index.html` in a browser, or serve the folder with any static web server:

```bash
python3 -m http.server 4173
```

Then visit `http://localhost:4173`.

## Check that it works

With Google Chrome installed, run `npm ci` once, then `npm test` after a local edit. The browser checks cover the six pages, the JOVANNY entry, project and contact paths, Águila's known and out-of-scope answers, both presentation viewers and their media, and phone-width overflow in Chrome. GitHub Actions runs the same local checks on pushes and pull requests using a fresh checkout. After publishing, run `npm run test:live` against the public address. These tests do not replace a visit from someone who has not seen the site; the current evidence and a short visitor task are in [VERIFICATION.md](VERIFICATION.md).

## Publish later

The folder can be deployed directly to GitHub Pages, Netlify, Vercel, or another static host. Once a domain is chosen, update the site metadata and any canonical URL settings you want to add.

The browser-ready video files are included in `assets/`, so keep the entire folder together when deploying.

## Site guide

Águila, the assistant in the lower-right corner, is intentionally local and rule-based. It does not call OpenAI, Anthropic, or another paid API. A future generative version would need a server-side endpoint and an API key; never place that key in the browser-facing files.

## Included project visuals

- `assets/hearmeout-preview.jpg` comes from the supplied HearMeOut Keynote file.
- `assets/clarity-features.png` comes from the supplied Clarity presentation.
- `assets/hearmeout-slides/` contains the nine HearMeOut slide previews in presentation order.
- `assets/clarity-slides/` contains all eight rendered Clarity slides.
- `assets/hearmeout-demo.mp4` is the browser-ready conversion of the video extracted from the HearMeOut Keynote package.
- `assets/hearmeout-demo.mov` is the original video extracted from the HearMeOut Keynote package.
- `assets/clarity-demo-web.mp4` is the web-optimized version of the video extracted from the Clarity PowerPoint package.
- `projects.html` contains the full project archive, slide viewers, and embedded demos.
