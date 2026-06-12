# Blue by 2032 — Report Website

The website for **Blue by 2032**, a forthcoming report on power-sharing
and party reform, published at [blueby2032.com](https://blueby2032.com).
Modeled on decidingtowin.org: one long-form report page, a gated PDF
download, a briefing-request form, and a press kit.

**No build step. No framework. No dependencies.** Plain HTML/CSS/JS,
deployed to Netlify as-is.

## Current state: pre-launch

The site is live ahead of the report itself. The homepage is a notify /
email-capture page; the full report page is stashed at
`report-site/index-report.html` waiting for the manuscript. The notify
form is the same Netlify form as the launch download gate
(`report-download`), so pre-launch signups and launch downloads share one
list. The full flip-back checklist for launch day is in
[`report-site/README.md`](report-site/README.md).

## Repo layout

```
report-site/          The deployable site — point Netlify here
  index.html          Pre-launch homepage (notify form)
  index-report.html   The full report page, stashed until launch
  download/ briefing/ press/ thanks/   Utility pages (clean URLs)
  privacy.html        Privacy policy
  css/style.css       Design system ("Newsprint Signal": ink, one signal blue)
  js/main.js          Progress bar, nav drawer, thanks-page auto-download
  assets/             wordmark.svg, report.pdf (placeholder until the designed PDF)
  README.md           Deploy steps, Kit (ConvertKit) swap, launch checklist
  CLAUDE.md           Working conventions for the codebase
preview-index.html    Standalone single-file design preview
```

## Deploy

1. Netlify → Add new site → Import from Git → this repo, **base directory
   `report-site`**, no build command, publish directory `report-site`.
2. Netlify auto-registers the two forms (`report-download`,
   `briefing-request`) on first deploy.
3. Netlify → Forms → Notifications → add an email notification on
   `briefing-request` to the author's address.
4. Domain management → add `blueby2032.com` → update DNS as shown.
   HTTPS is automatic.

## Conventions

- Design tokens live in `:root` at the top of `report-site/css/style.css` —
  use the tokens, never hardcode hex values.
- The accent (`--accent`, blue) means exactly two things: "click here" and
  "quote this." Nothing else.
- Form names, the `/thanks/` redirect, and `/assets/report.pdf` must not
  change — see `report-site/CLAUDE.md` for the full list.
