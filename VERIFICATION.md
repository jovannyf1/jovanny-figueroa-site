# How we know the portfolio works

Checked October 23, 2026. The automated checks ran in headless Chrome against both the local site and the actual public address, <https://alittlebitaboutjovanny.vercel.app/>. All five checks passed in each place. This record describes what was observed, not a guarantee about later changes.

| Plain-language promise | Evidence on October 23 | Status |
| --- | --- | --- |
| A visitor can open all six pages and find a clear title and way to reach the site guide. | Browser opened each page; each returned HTTP 200 with its expected heading, skip link, main landmark, and Águila control. | Checked locally and publicly |
| A visitor can get through the JOVANNY entry and reach projects or contact. | Browser typed JOVANNY, saw the site unlock, checked the email link, and followed “See my projects.” | Checked locally and publicly, by keyboard |
| Águila answers a site question and admits when a question is outside its scope. | Asked how to contact Jovanny, then asked about weather on Mars. The first answer included the email address; the second declined. | Checked locally and publicly |
| Both presentations can be explored. | Advanced slides, selected the final thumbnail, loaded the final slide image, and received HTTP 200 for each served demo-video file. | Checked locally and publicly; playback and sound untested |
| The main pages fit a narrow phone screen. | Browser checked Home and Projects at 390 × 844 pixels for horizontal overflow and visible Projects navigation. | Checked locally and publicly in Chrome emulation; physical phones untested |

Repeat these checks after a change:

```bash
npm ci
npm test
npm run test:live # after the updated version has been published
```

The public check tests the deployed address at the time it runs. Passing locally does not mean a later deployment has succeeded. The automated checks do not confirm that Jovanny's biographical details are accurate, that the videos play with sound, that every browser or assistive technology works, or that a new visitor understands the site.

The site serves the tracked `assets/clarity-demo-web.mp4` and `assets/hearmeout-demo.mp4`. The 125 MB original `assets/clarity-demo.mp4` is ignored and is not needed for a fresh checkout or these tests. I reran the five local checks from a separate copy without that original file; all passed. The new GitHub Actions workflow is set to run the local checks from a fresh checkout on each push and pull request, but its first remote run is not yet observed. It does not certify the later Vercel deployment; run the live command after publishing.

The next independent check is to give the public address to someone unfamiliar with the site and ask, without hints: “Find one project, tell me what Jovanny built, and find how to contact him.” Record whether they finish, what they expected at the JOVANNY entry, and where they hesitate. This check has **not yet been done**.
