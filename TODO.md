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
- **Report expected July 21–22** (client update, July 20) — the manuscript,
  and hopefully some of the other materials too. That's the trigger for the
  pour-in-manuscript + flip-to-launch work. (Earlier June 15 estimate slipped.)

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

## 🚨 Site plumbing — goal: hands-off for Jordan (break-fix only)

**Operating model (Jordan decision, June 13):** Jordan does NOT want to be
the ongoing operator — only the technical custodian / break-fix contact.
So route all *operational outputs* to the client; Jordan owns only the
infra that needs zero routine work. Split:
- **Jordan = technical custodian:** owns Netlify (do NOT transfer to a
  non-technical client — that makes breakage worse). Static site = near-
  zero maintenance: SSL auto-renews, deploys auto, nothing to patch.
- **Client = operational owner:** leads → her email; list + broadcasts +
  signup numbers → her Kit account.

- [x] Form notifications working — tested end-to-end June 13 (both arrived,
      no spam). Currently both go to jordankahn2@gmail.com (interim).
- [x] **Repointed `briefing-request` notification to `info@blueby2032.com`**
      (July 10) — leads now reach the client directly (the hands-off change).
      Netlify form notifications are per-form, so `report-download` still
      goes to jordankahn2@gmail.com and is untouched (mute at launch).
- [ ] **At launch: remove/mute the `report-download` notification**
      (Netlify → Forms → Notifications → Options → Remove). One email per
      download buries an inbox once public; downloads belong in Kit.
- [x] **Email service chosen (client, July 10):** full Google Workspace
      mailbox `info@blueby2032.com` via Squarespace (~$6/mo, send + receive
      from the branded address). Squarespace manages DNS (nsc*.squarespacedns.com)
      so it auto-provisions the Workspace MX records — no manual DNS work, and
      no conflict with the Netlify web hosting (A record, separate from MX).
- [x] **Mailbox provisioned & working (July 10).** `info@blueby2032.com`
      Google Workspace account created via Squarespace (Business Starter,
      paid annually, admin user `info`). DNS all in place: MX (5 `aspmx`
      records), SPF (`v=spf1 include:_spf.google.com ~all`), DKIM
      (`google._domainkey` TXT), and two `google-site-verification` TXTs —
      Squarespace auto-added most; the web hosting A/CNAME records are
      untouched. DKIM turned ON in Google Admin (Gmail → Authenticate email
      → Start authentication). Send + receive both tested OK.
      - **Note (deliverability):** cold email to a brand-new recipient hit
        spam once — normal for a fresh domain with zero reputation. Self-
        corrects with warmup (real low-volume sending + recipients marking
        "not spam"). Skipped DMARC for now (needs a client 2FA code to add;
        add it whenever next in DNS — minor vs. DKIM + warmup).
- [x] **Outgoing sender name set to "Blue by 2032"** (was the client's
      personal name). Done via Google Admin profile name (First "Blue" /
      Last "by 2032" — Google requires two fields; displays joined as "Blue
      by 2032"). Account-wide, so it also shows in Calendar/Meet/Docs.
      Client confirmed the "Blue by 2032" sender name (July 10).
- [x] Handed the client the `info@blueby2032.com` login (July 10).
      **Confirmed: client accessed the mailbox (July 20).** Remind her to
      change the password on first sign-in if she hasn't.
- [x] Reconcile the site's `press@blueby2032.com` references → both mailto
      links (privacy page + press page) now point to `info@blueby2032.com`
      (client chose the single-inbox address over a press@ alias).
- [ ] **Kit (ConvertKit) on the CLIENT's account, not Jordan's.** Jordan
      configures once (download list + automatic PDF-delivery email), then
      hands her the login. She sends any newsletters and sees her own
      numbers — keeps Jordan out of the broadcast/reporting loop. Ties to
      the 100/mo Netlify Forms cap: once downloads run through Kit they
      bypass Netlify Forms entirely, so the cap only ever has to cover
      briefing requests (always well under 100). **Kit must be ready by
      launch** or downloads fall back to Netlify Forms and can hit the cap.
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
