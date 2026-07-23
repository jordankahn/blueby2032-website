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
- `/download/` — launch copy; the form posts to Kit (tested end-to-end
  July 22: signup → email from info@ → PDF). Dummy PDF until launch.
- `/thanks/` — "check your inbox" copy (drafted our side July 22 — get
  the client's sign-off; the old instant-download flow is retired)
- `/press/` — client copy live; kit file list preserved in a comment
- `/briefing/` — fully live, client copy
- `/preview/` → 301 to `/`

### Launch checklist (when assets arrive)

1. Fill the remaining `index.html` placeholder: publish date (byline).
   Confirm the provisional Part VI title "The House" with the client. If a
   conclusion arrives, restore the commented-out Conclusion section + its
   nav entry. (The `.preview-note` banner is already removed.)
2. Drop the designed PDF at `assets/report.pdf` (rename the file, not
   links) AND upload it to the Kit confirmation email in place of the
   dummy (Kit → form 9716075 → Settings → Confirmation email → Download).
3. Get the client's sign-off on the `/thanks/` "check your inbox" copy.
4. `press/index.html` — drop press files in `/assets/`, uncomment the kit
   list. (Page stays titled "Press" — client decision, July 22.)
5. Add `assets/social-card.png` (1200×630) — the `og:image` meta is already
   on every page.
6. Replace the placeholder wordmark SVG (`index.html` + `assets/wordmark.svg`)
   with the commissioned one.
7. **Go public:** delete the `SITE_PASSWORD` env var in Netlify and redeploy.

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
thanks/             Post-signup "check your inbox" page → /thanks/
privacy.html        Privacy policy stub
css/style.css       Design system (ink / signal-red / newsprint tokens at top)
js/main.js          Progress bar, nav drawer, outline scrollspy, form AJAX + toasts
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

## Kit (ConvertKit) — the download gate (LIVE, tested July 22)

The download form posts to **Kit form 9716075** in the client's Kit
account (login = info@blueby2032.com). Configuration:

- Single opt-in (auto-confirm ON); the confirmation email doubles as the
  incentive email — from info@blueby2032.com, button serves the PDF
  (Kit-hosted dummy until launch).
- Success action redirects to `/thanks/`.
- Organization/Role dropdowns post as Kit **tags** (numeric IDs in the
  form markup — they map to real tags in the account, don't invent).
- The form markup in `download/index.html` is ours (site classes, real
  labels) with Kit's canonical field names. **Kit's own embed export has
  the first-name/email `name`s swapped — never copy names from it.**
- Kit's `ck.5.js` on that page does the AJAX submit + redirect; without
  JS the form still posts natively to Kit's hosted confirmation page.
- The old `report-download` Netlify form is retired; the Netlify Forms
  100/mo cap now only covers briefing requests.

## Before launch — find & replace

- `[Author Name]`, `[Month Year]` (domain is done: blueby2032.com is
  applied site-wide; the legal line is © 2026 Blue by 2032 — the project
  name, confirmed by the client)
- All `✎ [bracketed placeholders]` — they're styled gray with a pencil mark
  so they're impossible to miss. The `.placeholder` class can be deleted as
  you replace each one.
- `assets/report.pdf` — replace with the designed PDF (keep the filename),
  and upload the same file to the Kit confirmation email.
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
