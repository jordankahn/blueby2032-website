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

**Client edits arrived July 22** (email + marked-up PPT + site-copy doc) and
are APPLIED: real copy poured into exec summary + all ten parts, new
subtitle, utility-page launch copy, privacy approved. Resolved and still-open
items updated below.

- [x] Report subtitle — **"Designing Plans for and Pathways to Sustainable
      Democratic Majorities"** (client, July 22). Applied to masthead +
      <title>. (The old "Power-Sharing…" subtitle was invented; retired.)
- [x] Privacy policy — client-approved copy applied July 22. **Amended
      same day:** "Who processes it" now names Kit + Netlify and discloses
      Kit's IP/city-level location capture (signup + opens — no Kit
      setting to disable it, so disclosure is the fix). That paragraph
      needs her re-approval (recap item 29).
- [ ] Part VI title — missing from the site-copy doc, so it's live as
      **"The House"** (Jordan's call, July 22, matching Part V "The
      Senate"). Client to confirm or correct.
- [ ] **Impact-font ask (slide 2)** — Jordan is pushing back; if the client
      insists, counter-offer bold uppercase IBM Plex Sans, never Impact.
- [x] **Thanks-page copy updated (July 22)** — now "Sent! Check your inbox."
      with a Promotions/spam pointer; drafted our side (client gave no
      thanks-page guidance), flagged in the recap for her sign-off. Old
      instant-download block + main.js auto-download hook removed; share
      tweet no longer says "Coming soon."
- [x] **Kit wired July 22 — end-to-end test PASSED** (form → /thanks/ →
      incentive email from info@ → dummy PDF downloaded; landed in Gmail
      Promotions tab, which is inbox, not spam — fine). Account created on
      `info@blueby2032.com` (client's by construction — hand her this login
      too). Form 9716075: single opt-in (auto-confirm ON), incentive email
      from info@ delivers a Kit-hosted DUMMY report.pdf, success redirect
      → /thanks/. Site form swapped to post to Kit (our markup, Kit's
      canonical field names — Kit's embed export had first-name/email
      names SWAPPED, don't copy from it; dropdowns → Kit tags).
      Remaining at launch: upload the real PDF to Kit (replacing the
      dummy) and align /thanks/ copy with email delivery. Netlify
      report-download form is retired (cap concern gone; mute its
      notification whenever). Hand the client the Kit login with the
      mailbox credentials.
- [ ] © line — "© 2026 Blue by 2032" — right legal entity?
- [ ] **hello@blueby2032.com** (client request, July 22) — awaiting her
      answer: same inbox or separate? If just another address → FREE alias
      on the info@ user (Admin → Users → info → Email aliases → add
      "hello"; plus Gmail → Accounts → Send mail as, to reply from it).
      If a truly separate inbox/login → second Workspace seat (~$6-7/mo).
      No DNS work either way — MX already covers the domain.
- [ ] Launch date — site says "Coming soon"; a concrete month converts
      better
- [ ] Organization/Role dropdown options on the capture form — drive the
      client's donor segmentation; worth their sign-off
- [ ] Spec completeness — the spec PDF's sections jump 1, 2, 4, 5, 8
      (no §3, §6, §7); ask for the full document

## 📦 Launch assets owed by the author (spec §8 + implied)

- [x] Site copy — exec summary + all ten part bodies (poured July 22;
      Part VI title + conclusion still missing from the doc)
- [ ] Client confirm of Part VI title "The House". (Conclusion section
      HIDDEN July 22 — none supplied; commented out in index.html,
      restore if copy ever arrives)
- [ ] Publish date for the byline (launch date)
- [ ] Designed PDF — the gated asset → `report-site/assets/report.pdf`
- [ ] Commissioned wordmark SVG — doubles as PDF cover + social-card art
- [ ] Social card — 1200×630 PNG (og:image already wired on every page)
- [ ] Press kit — release, fact sheet, headshot + photographer credit,
      cover art
- ~~Author name/bio, praise blurbs, epigraphs, methodology/bibliography,
  corrections copy~~ — **cut per client markup July 22** (byline author,
  epigraph, About the Author, and Methodology & Corrections sections all
  removed; Share Your Thoughts is the corrections contact now). Headshot
  still wanted for the press kit only.
