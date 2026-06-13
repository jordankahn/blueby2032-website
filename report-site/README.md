# Blue by 2032 — Report Site

Static report site modeled on decidingtowin.org: one long-form report page,
gated PDF download, briefing request, and press kit. No build step, no
framework — deployable to Netlify as-is.

## ⚠️ CURRENT STATE: PRE-LAUNCH (June 2026)

Launch model (client decision, June 13): the site and the report go live
TOGETHER — no pre-launch email capture. So `index.html` IS the full report
(placeholder content for now), and the whole site is PASSWORD-GATED via a
Netlify edge function (`netlify/edge-functions/auth.ts` + the `SITE_PASSWORD`
env var) until the manuscript is in. Going public = deleting that env var.

- `index.html` — the full report (single scrolling page), placeholder copy,
  with a `.preview-note` banner explaining the gray placeholders
- `/download/` — the gated download form, currently "notify me" copy
- `/thanks/` — post-submit page (auto-download commented out)
- `/press/` — "press kit at launch" note (kit list preserved in a comment)
- `/briefing/` — fully live
- `/preview/` → 301 to `/` (the old client preview link; the report is the
  homepage now)

### Launch checklist (when assets arrive)

1. Pour the manuscript into `index.html` per CLAUDE.md; remove each
   `.placeholder` class as you fill it. Then delete the `.preview-note`
   banner div near the top.
2. Drop the designed PDF at `assets/report.pdf` (rename the file, not links).
3. `thanks/index.html` — swap the "you're on the list" h1/lede for the
   commented-out instant-download block.
4. `download/index.html` — restore download copy per the comment in the file
   (lede + button text).
5. `press/index.html` — drop press files in `/assets/`, uncomment the kit
   list, retitle "Press" → "Press Kit".
6. Add `assets/social-card.png` (1200×630) — the `og:image` meta is already
   in `index.html`.
7. Replace the placeholder wordmark SVG (`index.html` + `assets/wordmark.svg`)
   with the commissioned one.
8. Footer labels on the utility pages: "Get Notified" → "Download".
9. Have the author's team review `privacy.html` (minimal real copy is live).
10. **Go public:** delete the `SITE_PASSWORD` env var in Netlify and redeploy.
    Optionally wire the `briefing-request` email notification first.

## Structure

```
index.html          The report (single scrolling page)
download/           Gated download form  → /download/
briefing/           Request-a-briefing   → /briefing/
press/              Press kit            → /press/
thanks/             Post-download page (auto-starts PDF) → /thanks/
privacy.html        Privacy policy stub
css/style.css       Design system (ink / signal-red / newsprint tokens at top)
js/main.js          Progress bar, section nav, auto-download
assets/             wordmark.svg, report.pdf (PLACEHOLDER), press assets
```

## Deploy (10 minutes)

1. Push this folder to a GitHub repo (or drag-and-drop the folder onto
   app.netlify.com → "Deploy manually").
2. Netlify auto-detects the two forms (`report-download`, `briefing-request`)
   on first deploy because of the `data-netlify="true"` attributes.
3. Netlify dashboard → Forms → Notifications → add an **email notification**
   on `briefing-request` to the author's address.
4. Domain: buy at Squarespace/Cloudflare/Porkbun, then Netlify →
   Domain management → add custom domain → update the DNS records it shows you.
   HTTPS is automatic.

## Swapping in Kit (ConvertKit) for the download gate

The download form works on day one as a Netlify form (submissions collect in
the dashboard, download still starts instantly). For list-building +
confirmation emails, swap to Kit:

1. In Kit: create a form with First/Last/Email + custom fields for
   Organization and Role. Set it to **single opt-in**.
2. Form settings → success action → **redirect to** `https://yourdomain.com/thanks/`.
3. Enable the **incentive email** containing a link to `/assets/report.pdf`
   (the durable link).
4. Replace the `<form>` block in `download/index.html` with Kit's **HTML embed**
   and reuse the existing CSS classes on the inputs/button.

## Before launch — find & replace

- `[Author Name]`, `[Month Year]` (domain is done: blueby2032.com is
  applied site-wide; the legal line is © 2026 Blue by 2032 — the project
  name, confirmed by the client)
- All `✎ [bracketed placeholders]` — they're styled gray with a pencil mark
  so they're impossible to miss. The `.placeholder` class can be deleted as
  you replace each one.
- `assets/report.pdf` — replace with the designed PDF (keep the filename, or
  update the link in `thanks/index.html` and the Kit incentive email).
- `assets/wordmark.svg` + the inline SVG in `index.html` — replace with the
  commissioned wordmark.
- Add `assets/social-card.png` (1200×630) for the link preview, plus the
  press assets referenced in `press/index.html`.
- Section titles in `index.html` and the Navigate menu — currently plausible
  placeholders; replace with the manuscript's real part titles.

## Notes

- The gate is intentionally soft (standard for report sites): the PDF URL is
  shareable. The form is a politeness toll that builds the list.
- Fonts load from Google Fonts (IBM Plex Serif, IBM Plex Sans).
- Reduced motion and keyboard focus styles are handled in the CSS.
