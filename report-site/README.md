# Blue by 2032 — Report Site

Static report site modeled on decidingtowin.org: one long-form report page,
gated PDF download, briefing request, and press kit. No build step, no
framework — deployable to Netlify as-is.

## ⚠️ CURRENT STATE: PRE-LAUNCH (June 2026)

The client wanted the site live before any author assets arrived, so the
site is deployed in a pre-launch shape. No page shows placeholder brackets;
everything live is real. The notify form IS the launch download form (same
Netlify form name `report-download`), so every pre-launch signup lands in
the same list as launch downloads.

- `index.html` — pre-launch homepage: masthead + notify form + briefing CTA
- `index-report.html` — the REAL homepage (full report shell), stashed,
  `noindex`ed, waiting for the manuscript
- `/download/` — same form, "notify me" copy
- `/thanks/` — "you're on the list" (auto-download commented out)
- `/press/` — "press kit at launch" note (kit list preserved in a comment)
- `/briefing/` — fully live (this works with zero assets)

### Flip-back checklist (when assets arrive)

1. Pour the manuscript into `index-report.html` per CLAUDE.md, then
   `mv index-report.html index.html` and delete the `noindex` meta, the
   stash comment at the top, and the `.preview-note` banner div.
   Also delete the `/preview/` rewrites in `_redirects` (the client
   preview URL).
2. Drop the designed PDF at `assets/report.pdf` (rename the file, not links).
3. `thanks/index.html` — swap the "you're on the list" h1/lede for the
   commented-out instant-download block.
4. `download/index.html` — restore download copy per the comment in the file
   (lede + button text).
5. `press/index.html` — drop press files in `/assets/`, uncomment the kit
   list, retitle "Press" → "Press Kit".
6. Add `assets/social-card.png` (1200×630) and restore the `og:image` meta.
7. Replace the placeholder wordmark SVG (index + `assets/wordmark.svg`)
   with the commissioned one.
8. Footer labels: "Get Notified" → "Download", "Home" → "Read the Report".
9. Have the author's team review `privacy.html` (minimal real copy is live)
   and confirm `press@blueby2032.com` exists as a mailbox/alias.

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
