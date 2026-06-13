# Blue by 2032 — Open Items

Status as of June 13, 2026. The technical launch-day checklist (flipping
the site out of pre-launch mode) lives in `report-site/README.md`.

## ⚑ Launch model (client decision, June 13)

**Site + report launch together. No pre-launch email capture.** The site
stays PASSWORD-GATED (client review only) until the report is ready, then
flips straight to the full report and unlocks — the public never sees the
"notify me" holding page. Implications:
- The notify/capture homepage and the Kit list are no longer needed as a
  pre-launch list-builder. (Kit may still be wanted at launch for the
  download incentive email — confirm.)
- No rush to unlock. Unlock happens AT launch, with real assets in place.
- **Assets expected Monday, June 15** (client may update). That's the
  trigger for the pour-in-manuscript + flip-to-launch work.

## ✅ Done

- [x] Domain — purchased/handled (client side)
- [x] Netlify — Jordan's account; site deployed
- [x] Form detection enabled; both forms verified working
- [x] Client preview of the launch scaffold at `/preview/`
- [x] **blueby2032.com connected** — DNS cut over from Squarespace parked
      records, Let's Encrypt SSL provisioned (auto-renews ~Sep 9),
      www→apex redirect verified end-to-end
- [x] Mobile header optimization — hamburger nav drawer on all pages
      (icon-only ≤640px)
- [x] Form UX — AJAX submits with success/error toasts; no-JS fallback
      kept; fixed missing hidden `form-name` inputs
- [x] "Site is live" text drafted for the client (live link + /preview/
      link + placeholder explanation)

## 🚨 Site plumbing (Jordan manages all tech; client is non-technical)

The only input needed from the client: **which email address(es) should
receive site activity.** Everything else below is Jordan's setup work.

- [x] Form notifications working — both `briefing-request` and
      `report-download` email jordankahn2@gmail.com; tested end-to-end
      June 13 (both arrived, no spam).
- [ ] **At launch: remove/mute the `report-download` notification**
      (Netlify → Forms → Notifications → Options → Remove). One email per
      download buries the inbox once public; downloads belong in the
      dashboard / Kit, not per-submission email.
- [ ] Get the client's receiving email → add it as a second recipient on
      the `briefing-request` notification (she should see donor/org leads).
- [ ] Set up `press@blueby2032.com` as a forwarding alias at the domain
      registrar/DNS host (most offer free email forwarding) → client's
      inbox. It's on the press page and the privacy policy.
- [ ] Kit (ConvertKit): Jordan's account; configure at launch — sends
      the "report is out" email to the notify list. Until then,
      `report-download` signups collect in the Netlify Forms dashboard
      (exportable as CSV).
- [ ] Decide a cadence for forwarding/exporting download signups to the
      client (they'll want to see list growth)
- [ ] Send the "site is live" text to the client, then (a day or so
      later) the asset-request follow-up — the 📦 list below translated
      into non-technical language
- [ ] Site is password-gated for client review (edge function +
      SITE_PASSWORD env var in Netlify). **Remember to unlock when the
      client approves** — delete the env var + redeploy. While gated,
      signups are paused and the client needs the password.

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
