# Blue by 2032 — Report Site

Static report site modeled on decidingtowin.org: one long-form report page,
gated PDF download, briefing request, and press kit. No build step, no
framework — deployable to Netlify as-is.

## ⚠️ CURRENT STATE: PRE-LAUNCH (June 2026)

Launch model (client decision, June 13): the site and the report go live
TOGETHER — no pre-launch email capture. The whole site is PASSWORD-GATED via
a Netlify edge function (`netlify/edge-functions/auth.ts` + the
`SITE_PASSWORD` env var). Going public = deleting that env var.

**July 22 update:** the client's site copy is POURED — real section copy
for the exec summary and all ten parts, launch-state copy on the utility
pages ("Send it!", "Blue by 2032 is now live"), all safe behind the gate.
Remaining placeholders are the assets/copy still owed (see checklist).

- `index.html` — the full report, real section copy; placeholders remain
  for publish date, Part VI title, and conclusion. (Byline author,
  epigraph, About the Author, and Methodology & Corrections were REMOVED
  per client markup, July 22 — don't reintroduce them.)
- `/download/` — launch copy, promises EMAIL delivery → Kit is REQUIRED
  before launch (see comment in the file)
- `/thanks/` — still "you're on the list" (needs copy aligned with the
  email-delivery flow; auto-download block still commented)
- `/press/` — client copy live; kit file list preserved in a comment
- `/briefing/` — fully live, client copy
- `/preview/` → 301 to `/`

### Launch checklist (when assets arrive)

1. Fill the remaining `index.html` placeholders: publish date (byline),
   Part VI title (client to supply), conclusion. Then delete the
   `.preview-note` banner div near the top.
2. Drop the designed PDF at `assets/report.pdf` (rename the file, not links).
3. **Wire Kit before launch** — the download copy promises the PDF "arrives
   in your inbox," and only Kit's incentive email delivers it. Steps in the
   comment in `download/index.html`.
4. `thanks/index.html` — replace the "you're on the list" h1/lede with copy
   matching the email-delivery flow (e.g. "It's on its way to your inbox"),
   or restore the commented instant-download block if delivery ends up
   download+email per spec §4. Get client copy.
5. `press/index.html` — drop press files in `/assets/`, uncomment the kit
   list. (Page stays titled "Press" — client decision, July 22.)
6. Add `assets/social-card.png` (1200×630) — the `og:image` meta is already
   on every page.
7. Replace the placeholder wordmark SVG (`index.html` + `assets/wordmark.svg`)
   with the commissioned one.
8. **Go public:** delete the `SITE_PASSWORD` env var in Netlify and redeploy.

Done already: download-page launch copy + button (July 22, client copy),
"Get Notified"→"Download" labels (July 22), privacy policy (client-approved
copy applied July 22), briefing-request notifications → info@blueby2032.com
(July 10).

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
