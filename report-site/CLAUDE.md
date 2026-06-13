# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this is

A static report site ("Blue by 2032") modeled on decidingtowin.org: one
long-form scrolling report page, a gated PDF download, a briefing-request
form, and a press kit. The audiences are readers (mobile-first), press, and
donors. The site's jobs, in order: get the report read, capture emails via
the download gate, and convert high-intent readers to briefing requests.

**No build step. No framework. No dependencies.** Plain HTML/CSS/JS deployed
to Netlify as-is. Do not introduce a bundler, a framework, npm, or a CSS
preprocessor. If a change seems to require one, it's the wrong change.

**PRE-LAUNCH STATE (June 2026):** site + report launch together (client
decided against pre-launch email capture). `index.html` IS the full report
with placeholder content, and the WHOLE SITE is password-gated by a Netlify
edge function (`netlify/edge-functions/auth.ts` + the `SITE_PASSWORD` env
var) until the manuscript lands. `/download/` shows "notify me" copy,
`/thanks/` doesn't auto-download, `/press/` is a stub, `/preview/` 301s to
`/`. Launch checklist is in README.md; going public = deleting the
`SITE_PASSWORD` env var in Netlify and redeploying.

## Layout

```
index.html          The entire report (single scrolling page)
download/index.html Gated download form        → served at /download/
briefing/index.html Briefing request form      → /briefing/
press/index.html    Press kit                  → /press/
thanks/index.html   Post-download, auto-starts PDF → /thanks/
privacy.html        Privacy policy
css/style.css       The whole design system; tokens in :root at the top
js/main.js          Progress bar, nav drawer, thanks auto-download, form AJAX + toasts
assets/             report.pdf (the gated asset), wordmark.svg, press files
```

Clean URLs come from the folder structure — keep new pages as
`pagename/index.html`, not `pagename.html`.

## Design system — "Newsprint Signal"

Ink on near-white with heavy black rules and ONE signal blue. All values are
CSS custom properties in `:root` at the top of `css/style.css`. Use the
tokens; never hardcode hex values in HTML or new CSS.

- `--ink` #141414 · `--paper` #fbfbf8 · `--accent` #1d4ed8 · `--muted` #565656
- Type: IBM Plex Serif (headlines + body), IBM Plex Sans (nav, labels,
  forms, pull quotes). Loaded from Google Fonts in each page's <head>.
- **Red discipline is the design.** `--accent` means exactly two things:
  "click here" (CTAs, links) and "quote this" (pull-quote rules, part
  labels). Never use it for decoration, backgrounds of large areas, or body
  text. If a change adds red anywhere else, push back.
- No border-radius anywhere. No drop shadows. Structure comes from black
  rules (1px hairlines, 3px section breaks).
- Dark surfaces (CTA bands, footer, nav drawer) are `--ink`, never gray.
- Body measure stays at `--measure` (42rem). Don't widen it.

## Pouring in the manuscript (the most likely task)

All pending content is marked with the `.placeholder` class and
`[bracketed text]` — styled gray with a ✎ so it's findable. When inserting
real content:

1. Replace the bracketed text AND remove the `.placeholder` class.
2. Part titles must be updated in BOTH the section `<h2>` and the Navigate
   menu (`#site-nav`) in index.html. Keep `id`s (`part-1` … `part-10`,
   `executive-summary`, `conclusion`, `author`, `notes`) unchanged — the
   nav, anchor CTAs, and any external links depend on them.
3. Subsections use `<h3><span class="subsection-num">N.N</span>Title</h3>`.
4. Pull quotes flagged in the manuscript become
   `<div class="pull-quote"><p>…</p></div>` — bold sans, red rule. Use them
   sparingly (roughly one per part).
5. Keep the slim `part-cta` link at the end of every part and the two full
   `cta-band` blocks (after the executive summary, after the conclusion).
6. The executive summary is the most-read section; it gets the epigraph and
   the "Bottom Line" takeaway box.

## Things that must not break

- Form names `report-download` and `briefing-request`, their
  `data-netlify="true"` attributes, and the honeypot fields. Netlify
  registers forms by these names; renaming them orphans the submission
  history and notification rules.
- The download form's `action="/thanks/"` redirect, and the
  `id="auto-download"` link on thanks/index.html pointing at
  `/assets/report.pdf` — together these are the "instant download" flow.
- `/assets/report.pdf` is the gated asset's canonical path. If the designed
  PDF arrives under another name, rename the file rather than the links
  (the Kit incentive email will also point here).
- js/main.js has no dependencies; keep it that way.

## Email / list integration

The download gate currently runs on Netlify Forms (works on deploy, zero
config). The intended end state is a Kit (ConvertKit) HTML embed replacing
the form in download/index.html — same fields, success redirect to
/thanks/, incentive email carrying the durable PDF link. Full steps are in
README.md. When swapping, reuse the existing input/button classes so the
styling holds.

## Conventions

- Mobile first: test changes at ~375px width before desktop.
- Preserve `prefers-reduced-motion` handling and `:focus-visible` styles.
- Semantic HTML: sections, real headings in order, labeled form fields.
- Pages share the same header/footer markup pattern — if you edit one
  footer, mirror it across all six pages.
- Before-launch find/replace list lives in README.md ([Author Name],
  [Month Year], etc.). Don't invent values for these. Already applied:
  domain blueby2032.com; © line "2026 Blue by 2032". The site is branded
  "Blue by 2032" throughout (an earlier scaffold called the report "Built
  to Share" — that title was invented, not client-supplied, and has been
  retired; if the author later names the report something distinct,
  update the wordmark, <title>s, and og tags).
