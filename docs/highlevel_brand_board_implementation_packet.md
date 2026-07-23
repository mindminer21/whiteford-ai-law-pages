# Whiteford + Schell IP HighLevel Brand Board Implementation Packet

Task: `t_1844120e`
Location: Whiteford Schell IP (`tm68WWMrcAa3TqQbEAMa`)
Pipeline context: Whiteford Schell IP Pipeline (`Tbx4tA6wHv5lTwZPSHyZ`)
Status: Approval-ready internal setup packet only. Do not publish, activate, or imply any unapproved external affiliation.

## 1. Source assets verified

| Asset | Path | Observed role | Notes |
| --- | --- | --- | --- |
| Whiteford stacked logo | `/Users/jeff/Downloads/whiteford_logo.png` | Primary Whiteford square logo lockup | 400 x 400 PNG; SHA-256 `07c94337767562397d07f3244906843ef11ed054027aa44fffff3b891602fd64`. |
| Whiteford app copy | `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/public/brand/whiteford-logo.png` | App/HighLevel upload candidate | Same checksum as the Downloads source. |
| Schell IP logo | `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/public/brand/schellip-logo.png` | Square/logo asset | 874 x 874 PNG; use only where the square canvas is acceptable. |
| Schell IP wordmark | `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/public/brand/schellip-wordmark.png` | Header/email wordmark | 874 x 150 PNG; preferred Schell IP asset for horizontal layouts. |

## 2. Logo hierarchy for HighLevel

Recommended HighLevel brand hierarchy:

1. Primary business identity: Whiteford.
   - Use the Whiteford stacked logo as the main square brand mark in HighLevel account/company branding where a single logo is required.
   - Suggested upload file: `public/brand/whiteford-logo.png`.
   - Preserve the dark navy square and white monogram/wordmark exactly as supplied.
2. Supporting trust bridge: Schell IP.
   - Use the Schell IP wordmark in email headers, form headers, landing-page headers, and internal campaign assets where the context is Jeff/Schell IP-led authority or intake.
   - Suggested upload file: `public/brand/schellip-wordmark.png`.
3. Co-brand lockup pattern.
   - Preferred internal layout: `Schell IP wordmark | Whiteford stacked mark` with a neutral vertical divider.
   - Existing app implementation in `src/components/brand.tsx` uses Schell IP first, a divider, and the Whiteford mark, then text label `Schell IP + Whiteford`.
   - Do not merge the marks, redraw either logo, or create a new combined logo without human approval.
4. Favicon/avatar/social thumbnail.
   - Use the Whiteford square mark when the asset must crop to a square or circle.
   - Use Schell IP square only for Schell IP-specific supporting placements where the black/dark canvas is approved.

Usage boundaries:

- Internal HighLevel sync and setup are approved for this task.
- Do not publish brand assets externally, send branded email, activate campaigns, post to social, or expose co-branded pages without Jeff/human approval.
- Do not describe the relationship as a partnership, affiliation, or sponsorship beyond the already-used approved positioning language unless legal/brand approval confirms it.
- Safe phrasing for internal assets: `Whiteford Mountain West`, `Schell IP + Whiteford`, `Schell IP trust bridge, Whiteford institutional bench`.

## 3. Recommended global custom colors

Use these as HighLevel Global Custom Colors so email, forms, pages, calendars, and payment links stay consistent.

| HighLevel color name | Hex | Role | Use |
| --- | ---: | --- | --- |
| `WF Ink` | `#121827` | Primary text / dark CTA | Body text, primary buttons, footer background. |
| `WF Paper` | `#FFFDF8` | Card background | Email body blocks, form cards, page cards. |
| `WF Background` | `#F7F5EF` | Page background | Landing pages and form embed backgrounds. |
| `WF Blue` | `#213F77` | Primary blue | Links, headings, hover state, secondary CTA. |
| `WF Navy Mark` | `#003858` | Whiteford logo field | Do not overuse as text background unless paired with white. |
| `SIP Navy` | `#002048` | Schell IP wordmark navy | Headings, dark accents, not on black. |
| `SIP Purple` | `#6830E8` | Tech/IP accent | Small highlights, progress indicators, selected states. |
| `WF Gold` | `#B99057` | Premium accent | Borders, dividers, badges on dark backgrounds; not small text on light. |
| `WF Sage` | `#55776A` | Supporting accent | Low-volume trust/risk/compliance accent. |
| `WF Muted` | `#5D6678` | Secondary text | Subheads and captions on light backgrounds. |
| `WF Line` | `#D8D0C3` | Borders/dividers | Form borders, card borders, separators. |
| `WF Charcoal` | `#354054` | Secondary dark text | Navigation and explanatory text. |
| `WF White` | `#FFFFFF` | Reverse text | Text on dark buttons/backgrounds. |

HighLevel setup notes:

- Add colors manually under HighLevel brand/theme settings; this task does not mutate live HighLevel settings.
- If HighLevel limits custom color slots, prioritize: `WF Ink`, `WF Paper`, `WF Background`, `WF Blue`, `SIP Purple`, `WF Gold`, `WF Line`, `WF White`.
- Use exact hex values; avoid approximate picker values from screenshots.

## 4. Accessibility contrast checks

Calculated WCAG contrast checks:

| Foreground on background | Ratio | Result |
| --- | ---: | --- |
| `#003858` Whiteford Navy on white | 12.31:1 | Pass AA normal and large. |
| `#002048` Schell Navy on white | 16.15:1 | Pass AA normal and large. |
| `#6830E8` Schell Purple on white | 6.61:1 | Pass AA normal and large. |
| `#213F77` WF Blue on white | 10.28:1 | Pass AA normal and large. |
| `#55776A` WF Sage on white | 4.96:1 | Pass AA normal and large. |
| `#121827` WF Ink on `#F7F5EF` | 16.25:1 | Pass AA normal and large. |
| `#5D6678` WF Muted on `#F7F5EF` | 5.30:1 | Pass AA normal and large. |
| `#354054` WF Charcoal on `#F7F5EF` | 9.57:1 | Pass AA normal and large. |
| `#B99057` WF Gold on white | 2.92:1 | Fail for text. Use as border/accent only on light backgrounds. |
| `#B99057` WF Gold on `#F7F5EF` | 2.68:1 | Fail for text. Use as border/accent only on light backgrounds. |
| White on `#003858` Whiteford Navy | 12.31:1 | Pass AA normal and large. |
| White on `#002048` Schell Navy | 16.15:1 | Pass AA normal and large. |
| `#002048` Schell Navy on black | 1.30:1 | Fail. Do not place Schell navy text/logo detail on black. |
| `#6830E8` Schell Purple on black | 3.18:1 | Large text only; avoid as normal body text. |
| `#B99057` Gold on `#121827` Ink | 6.06:1 | Pass AA normal and large. |

Accessibility rules for HighLevel builders:

- Use `WF Ink` or `WF Charcoal` for body text on light sections.
- Use white text on `WF Ink`, `WF Blue`, `WF Navy Mark`, or `SIP Navy` buttons.
- Use `WF Gold` for lines, badges, and premium accents; do not use it as small body text on white/paper backgrounds.
- Avoid the Schell IP dark navy on black/dark backgrounds unless an official reversed logo variant is provided.
- Test every published email/page/form with keyboard navigation, mobile preview, image-alt text, and visible focus states.

## 5. Font recommendations

Current app styling uses system sans via `Arial, Helvetica, sans-serif` and Next/Tailwind theme hooks for Geist. HighLevel-safe font stack:

- Primary: Inter, Arial, Helvetica, sans-serif.
- If Inter is unavailable in a HighLevel builder: Arial/Helvetica fallback.
- Headings: 600 weight, tight leading, restrained letter spacing.
- Labels/kickers: uppercase, 0.16em-0.22em tracking, 12-13px equivalent.
- Body: 16px minimum for email/pages; 14px only for supporting captions.
- Avoid decorative typefaces that fight the Whiteford monogram or Schell IP geometric wordmark.

## 6. Co-branding rules

Approved internal direction:

- Whiteford should lead institutional credibility.
- Schell IP may function as the Jeff/Schell IP trust bridge for AI law, AI patent, tech outside GC, and M&A readiness funnels.
- Use clear separation: logos side-by-side with divider, not fused.
- Keep a minimum clear space around each logo equal to at least the height of the Whiteford divider line or the Schell IP `IP` letter height.
- Keep logo lockups on clean, low-noise backgrounds.

Do not:

- Claim HighLevel, Whiteford, or Schell IP have approved a public co-branded affiliation unless Jeff confirms.
- Recolor the logos, add gradients, stretch, rotate, shadow, outline, or place over photographs.
- Use the Schell IP wordmark on black/dark backgrounds unless contrast is manually approved.
- Use logo screenshots when the PNG files above are available.
- Put legal advice, guarantee language, or attorney-client relationship language in brand-board samples.

Required disclaimer pattern for external-facing page/email/form samples:

`Educational material only. No attorney-client relationship is formed by using these pages, submitting a form, or receiving an automated report. Do not submit confidential information through assessment or landing-page forms.`

## 7. HighLevel manual setup checklist

Manual setup is required in HighLevel for these items:

1. Brand Board / Global Theme
   - Upload primary logo: Whiteford stacked logo.
   - Upload secondary/logo header asset: Schell IP wordmark if HighLevel allows multiple logos.
   - Add Global Custom Colors from Section 3.
   - Set primary font stack to Inter/Arial/Helvetica where available.
2. Email Builder
   - Create a draft-only header block with Schell IP wordmark + Whiteford mark.
   - Create reusable footer block with disclaimer and unsubscribe/preferences links.
   - Save reusable button style: `WF Ink` fill, white text, hover `WF Blue` where supported.
3. Funnel/Page Builder
   - Create page section presets: paper card, neutral page background, dark footer, gold divider accent.
   - Add image alt text for every logo.
   - Verify logo scaling on mobile.
4. Forms/Surveys
   - Use `WF Paper` card, `WF Ink` labels, `WF Line` borders, `WF Blue` focused state, `SIP Purple` for selected progress where appropriate.
   - Add non-confidentiality warning above free-text fields.
5. Calendars
   - Brand confirmation/reminder pages with Whiteford mark and clear disclaimer.
   - Do not let booking confirmations imply legal representation before conflict check/engagement.
6. Payment Links
   - Use Whiteford-led logo hierarchy if payment is for Whiteford work.
   - Include scope/fee disclaimers and confirm compliance with law-firm payment handling rules before publishing.
7. Social Planner
   - Store only draft brand assets and templates.
   - Do not auto-publish LinkedIn profile posts; route to Jeff/manual review.

## 8. Sample QA matrix

| Asset type | Draft HighLevel object name | Brand QA | Legal/consent QA | Publish rule |
| --- | --- | --- | --- | --- |
| Email template | `DRAFT - WF/SIP Brand Header Test` | Header renders Schell IP wordmark + Whiteford mark; footer uses dark `WF Ink`; all logo alt text present. | Unsubscribe/preference link present; disclaimer present; no legal advice/guarantees. | Keep draft until Jeff approves send test. |
| Landing page | `DRAFT - WF/SIP Brand Board Page Test` | `WF Background` page, `WF Paper` cards, `WF Ink` text, `WF Blue` CTA, gold only as accent. | No attorney-client relationship disclaimer visible near form and footer. | Do not publish; preview only. |
| Form | `DRAFT - AI Law Intake Brand QA` | Labels legible; focus states visible; required fields clear; no gold small text on light background. | Consent checkbox and non-confidentiality warning included before long-answer fields. | Do not embed live until form routing is approved. |
| Calendar/booking page | `DRAFT - Strategy Call Brand QA` | Whiteford logo does not crop; mobile header readable; button contrast passes. | Conflict-check/engagement caveat included before confirmation. | Do not activate public calendar links without approval. |
| Payment link | `DRAFT - Readiness Review Payment Brand QA` | Whiteford-led branding, no distorted logos, accessible checkout contrast. | Scope, refunds, trust/payment handling reviewed by Jeff/human. | Do not publish/payment-enable until approved. |
| Newsletter | `DRAFT - AI Law Brief Brand QA` | Header and footer modules match email template; image sizes optimized. | Physical address, unsubscribe, preference link, disclaimer present. | Do not schedule or send. |

## 9. Recommended HighLevel implementation sequence

1. Upload/confirm logos in Media Library with names:
   - `WF Whiteford stacked logo - primary - 400x400`
   - `SIP Schell IP wordmark - horizontal`
   - `SIP Schell IP square logo - supporting`
2. Create Global Custom Colors using Section 3.
3. Build one reusable email header/footer pair in draft mode.
4. Build one draft page section set and one draft form theme.
5. Build the QA objects listed in Section 8 as draft/manual-start only.
6. Run accessibility preview on desktop/mobile/email client previews.
7. Ask Jeff to approve:
   - Whether Whiteford or Schell IP should lead each external channel.
   - Whether the Schell IP black/dark logo variant is approved or needs replacement with a transparent/reversed asset.
   - Whether payment-link branding can be configured for any specific offer.
8. Only after approval: apply the brand board to specific workflows/campaigns.

## 10. Approval packet for Jeff

Approval requested before external use:

- Confirm the official public-facing wording for the brand relationship: `Schell IP + Whiteford`, `Whiteford Mountain West`, or another approved line.
- Confirm whether the Schell IP dark/black square logo is an official approved variant or an export artifact.
- Confirm whether HighLevel should use Whiteford as the default primary logo in all account-level brand settings.
- Confirm whether payment links are in scope for HighLevel branding and whether any law-firm payment/trust-account rules apply.
- Confirm whether any official Whiteford brand guidelines supersede the colors/font recommendations here.

Implementation recommendation: proceed with internal HighLevel draft setup using the colors, logo hierarchy, and QA matrix above; do not publish or send until Jeff approves the relationship wording and logo variant rules.
