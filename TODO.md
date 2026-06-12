# Blue by 2032 — Open Items

Status as of June 11, 2026. The technical launch-day checklist (flipping
the site out of pre-launch mode) lives in `report-site/README.md`.

## ✅ Done

- [x] Domain — purchased/handled (client side)
- [x] Netlify — Jordan's account; site deployed at blueby2032.netlify.app
- [x] Form detection enabled; both forms verified working
- [x] Client preview of the launch scaffold at `/preview/`

## 🚨 Site plumbing (Jordan manages all tech; client is non-technical)

The only input needed from the client: **which email address(es) should
receive site activity.** Everything else below is Jordan's setup work.

- [ ] Get the client's receiving email address(es)
- [ ] Netlify → Forms → Notifications: route `briefing-request` to the
      client's email (CC Jordan to keep an eye on delivery). Until set,
      check the Netlify dashboard manually so requests don't sit unseen.
- [ ] Set up `press@blueby2032.com` as a forwarding alias at the domain
      registrar/DNS host (most offer free email forwarding) → client's
      inbox. It's on the press page and the privacy policy.
- [ ] Kit (ConvertKit): Jordan's account; configure at launch — sends
      the "report is out" email to the notify list. Until then,
      `report-download` signups collect in the Netlify Forms dashboard
      (exportable as CSV).
- [ ] Decide a cadence for forwarding/exporting download signups to the
      client (they'll want to see list growth)

## 📋 Decisions / confirmations needed

- [ ] Report title & subtitle — site says "Blue by 2032 — Power-Sharing
      and the Future of Party Reform"; the subtitle is invented, not
      client-supplied
- [ ] Homepage thesis line ("the case, the evidence, and a ten-year
      agenda") — provisional copy
- [ ] © line — "© 2026 Blue by 2032" — right legal entity?
- [ ] Privacy policy — minimal real copy is live; needs author review
- [ ] Launch date — site says "Coming soon"; a concrete month converts
      better
- [ ] Organization/Role dropdown options on the capture form — drive the
      client's donor segmentation; worth their sign-off
- [ ] Spec completeness — the spec PDF's sections jump 1, 2, 4, 5, 8
      (no §3, §6, §7); ask for the full document
- [x] Point blueby2032.com at the Netlify site — DONE June 11: DNS cut over
      from Squarespace parked records, SSL provisioned, www→apex redirect
      verified

## 📦 Launch assets owed by the author (spec §8 + implied)

- [ ] Full report manuscript — chaptered, numbered subsections, flagged
      pull quotes, real part titles (current ten are placeholders)
- [ ] Executive summary — 600–900 words
- [ ] Designed PDF — the gated asset → `report-site/assets/report.pdf`
- [ ] Author name, bio, headshot
- [ ] 6–12 praise blurbs — named, with titles (collect pre-launch)
- [ ] Epigraph quotes — 2–3, cleared
- [ ] Commissioned wordmark SVG — doubles as PDF cover + social-card art
- [ ] Social card — 1200×630 PNG (og:image is commented out until then)
- [ ] Press kit — release, fact sheet, headshot + photographer credit,
      cover art
- [ ] Bibliography / public source documents
- [ ] Corrections policy copy
