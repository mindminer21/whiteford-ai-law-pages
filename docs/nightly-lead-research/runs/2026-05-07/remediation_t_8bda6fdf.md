# Remediation Report — 2026-05-07 Nightly Prospect Source Caveats

Generated: 2026-05-07
Worker: qwen-local
Task: t_8bda6fdf
Input: reviewer gate report t_ea72eabb

---

## Caveat 1 — PickNik Robotics: Crunchbase founded/funding detail

**Issue:** The validation report flagged that Crunchbase fields for founding/funding round-count are obfuscated and should not be used as standalone copy evidence.

**Live research findings:**
- Founded: **2015** — verified on PickNik's own history page. From picknik.ai/history/: "PickNik Robotics was founded in 2015, originally rallying around the Amazon Picking Challenge." First customer was Google. Confident: public-company-page.
- PitchBook confirms PickNik was founded in 2015 and is headquartered in Boulder, CO.
- Crustdata shows total funding of $8.4M with a last Pre-Seed round of $2.0M in 2023. Note: Crustdata is a secondary aggregator, lower confidence than company pages.
- Crunchbase does show PickNik Robotics has a profile with activity dated Oct 12, 2023, but the round count and amounts are obfuscated (censor bar visible on the Crunchbase page).
- The company team page and PickNik news releases support leadership (Dave Grant CEO, Nathan Brooks CTO), Boulder location, MoveIt platform, and SpaceWERX funding signals. These are verified from company-owned pages.

**Remediation:**
- Keep "founded 2015" and "Boulder, CO" in copy — verified via company history page (picknik.ai/history/).
- **Do not include any Crunchbase round count or specific round amounts** in external outreach copy, as Crunchbase obfuscates these fields.
- If funding figure is needed in copy, use the Crustdata number ($8.4M total) with a source line "via Crustdata" and add a low-confidence tag, or better yet — remove funding figures entirely and rely on company/news pages.
- Recommendation: rely on company history page + news for all PickNik facts in copy. Add internal-only note that Crunchbase funding data is obfuscated and not reliable at the time of review.

**Confidence after remediation:** Medium-High for founded/founding year (company-pag e). Medium for funding total (Crustdata, secondary source). Low for specific round amounts (Chun chbase is obfuscated).

---

## Caveat 2 — Electra: BizJournals paywalled source

**Issue:** The validation report flagged that the Denver BizJournals J.P. Morgan financing/Boulder-detail source is paywalled and cannot be used as standalone copy evidence.

**Live research findings:**
- The Denver BizJournals article URL https://www.bizjournals.com/denver/news/2026/03/10/jp-morgan-financing-electra-green-steel-boulder.html was **extracted successfully** (not paywalled at time of re-check). Title from extraction: "Boulder green iron startup lands millions from J.P. Morgan - Denver BizJournal." Snippet confirms: "Electra announced Tuesday that it will use $30 million from J.P. Morgan to complete its demonstration plant."
- This means the BizJournals source IS now accessible and can serve as primary verified copy evidence. However, the reviewer should still be aware the source may have been paywalled at the time of the initial validation run (2026-05-07) and may become paywalled again.
- Accessible secondary sources confirming the $30M JPMorgan financing and broader funding:
  - ESG Dive: "JPMorgan backs clean iron startup Electra with $30M in new capital" — confirmed $30M venture debt facility, 130,000 sq ft demo site in Jefferson County CO.
  - Yahoo Finance / GlobeNewswire: "Electra Secures $30M in New Capital to Accelerate Commercial" — confirmed $30M JPMorgan venture debt in addition to $186M Series B.
  - ESG News / ESGDive confirm: Breakthrough Energy Ventures, Capricorn Investment Group, Temasek, Nucor, Toyota Tsusho, Meta are investors/partners. Founded 2020.

**Remediation:**
- The ZenJournals piece is no longer paywalled and can be used as **primary-copy evidence** IF the reviewer re-verifies it is still accessible at time of copy-finalization.
- **Safe external copy can reference:** $30M JPMorgan venture debt facility, $186M Series B (GlobeNewswire), Breakthrough Energy Ventures/Temasek/Capricorn investors, Boulder/Jefferson County CO location, founded 2020.
- Recommend using ESG Dive or Yahoo Finance as copy evidence sources (they render cleanly, no paywall). These are the preferred sources over BizJournals for reliability.
- Add internal-only note: "Denver BizJournals source was paywalled at initial validation time; extracted successfully on re-check 2026-05-07. May revert to paywall."

**Confidence after remediation:** High for funding facts (multiple corroborating sources). High for $30M JPMorgan detail (BizJournals + ESG Dive + Yahoo Finance).

---

## Caveat 3 — Flatfile / Obvious: Built In row extraction

**Issue:** The validation report noted that Built In extraction did not expose the Flatfile row and should be treated as secondary/unverified until manually checked.

**Live research findings:**
- The Built In page for Flatfile at builtin.com/company/flatfile **was extracted successfully** and confirmed.
- Key verifiable facts from Built In:
  - **Founded: 2018**
  - **Total Employees: 55** (35 in Product + Tech)
  - **Total Offices: 6** (US-based: Colorado, Austin, Boston, Chicago, New York, remote)
  - **Recognition: Built In Best Places to Work (2022 & 2025)**
  - Industry: Artificial Intelligence, Software, Database
  - Key clients: AstraZeneca, Square, Sage
- The Built In row is now directly accessible with specific content. This is confirmed evidence.

**Remediation:**
- The Built In row is **accessible and verifiable** as evidence. Include it as a **primary** culture/award source for Flatfile if needed in copy.
- "Built In Best Places to Work (2022 & 2025)" is verified from the page.
- Remove Built In from the "secondary/unverified" list. Upgrade to "primary verified."
- Still use Flatfile company/news page as primary company-fact source; Built In is a secondary-but-verified culture-source.

**Confidence after remediation:** High for Built In award claims (page extracted with award years). High for company size and founding year (Built In + company page corroborate).

---

## Caveat 4 — Flatfile / Obvious: Naming decision

**Issue:** The packet originally listed the company as "Flatfile (also rebranded company name: Obvious)" and the validation report flagged that the rebrand may be a product/platform change rather than a formal company-name change.

**Live research findings:**
- From Flatfile's own support article (support.flatfile.com): **"Flatfile (the company) is now Obvious. Flatfile (the product) remains unchanged."** This is the company's own official statement.
- From Flatfile news page: "Flatfile is now Obvious. We've renamed our company to Obvious."
- The rebrand is definitive: it is a **formal company rebrand**, not just a product naming change.
- The product platform **Flatfile** remains as the core product name. The **company** is now called **Obvious**.
- The AI agent product (new) is also called **Obvious**.
- LinkedIn company page confirmed: "Flatfile is rebranding to Obvious. Seven years ago we set out to solve data migration. But the company is now Obvious, with a new product (also called Obvious)."

**Remediation:**
- CRM name should be: **"Obvious (formerly Flatfile)"**
- Copy can safely use "Obvious" or "Obvious (formerly Flatfile)."
- The product remains "Flatfile" — do not refer to the software as "Obvious" unless specifically referencing the AI agent product.
- For HighLevel CRM: update company name to "Obvious (formerly Flatfile)" and add a note explaining the rebrand.
- For outreach copy references to the product: keep using "Flatfile." For company references: use "Obvious."

**Confidence after remediation:** Very High — confirmed via company's own rebrand announcement + support article + LinkedIn + blog.

---

## Summary of Remediation Decisions

| Prospect | Caveat | Verdict | Confidence |
|---|---|---|---|
| PickNik Robotics | Crunchbase obfuscated | Founded 2015 verified via company history page. Funding counts/amounts unreliable from Crunchbase. Use company pages only for copy. | Medium-High |
| Electra | BizJournals paywall | BizJournals is accessible now and confirms $30M JPMorgan deal. ESG Dive/Yahoo Finance are safe accessible alternatives. Upgrade BizJournals from "unavailable" to "accessible if re-checked." | High |
| Flatfile/Obvious | Built In row | Built In page extracted successfully. "Best Places to Work (2022 & 2025)" verified. Built In upgraded to primary verified evidence row. | High |
| Flatfile/Obvious | Rebrand naming | Confirmed formal company rebrand: Flatfile (company) -> Obvious, Flatfile (product) unchanged. CRM should use "Obvious (formerly Flatfile)." | Very High |

---

## Updated CRM/Copy Recommendations for All Three Prospects

### PickNik Robotics
- Company name: PickNik Robotics
- Founded: 2015 (company history page)
- Location: Boulder, CO
- Copy-safe facts: CEO Dave Grant, CTO Nathan Brooks, MoveIt platform, SpaceWERX signals
- Copy-unsafe/unverified: Crunchbase round counts, specific funding amounts (use $8.4M total from Crustdata only as internal note with low confidence)
- LinkedIn: verify handle before post
- Conflict/suppression: still NOT CLEARED

### Electra
- Company name: Electra
- Founded: 2020
- Series B: $186M (GlobeNewswire/Yahoo Finance accessible)
- Additional: $30M JPMorgan venture debt (BizJournals accessible + ESG Dive)
- Investors: Capricorn, Temasek, Breakthrough Energy Ventures, Nucor, Toyota Tsusho, Meta
- Location: Boulder/Jefferson County, CO
- Copy-safe facts: all above from accessible sources
- LinkedIn: verify handle before post
- Conflict/suppression: still NOT CLEARED

### Obvious (formerly Flatfile)
- Company name: Obvious (formerly Flatfile)
- Product name: Flatfile (unchanged)
- Founded: 2018 (Built In page)
- Employees: 55 (Built In page)
- Awards: Built In Best Places to Work (2022 & 2025)
- Location: Colorado + 4 other US hubs, fully remote
- CEO: David Boskovic (company website + Built In)
- Email note: pr@flatfile.com remains a public PR/media contact only, not a decision-maker outreach address
- Copy-safe facts: company facts verified via product page (flatfile.com), built-in company page, and Obvious rebrand announcement
- LinkedIn: verify handle before post
- Conflict/suppression: still NOT CLEARED

---

## Remaining Blockers (unchanged from reviewer report)

1. **Supabase expanded schema** — not installed; evidence/suppression/CRM audit tables unavailable remotely.
2. **Suppression/conflicts not cleared** — all three prospects at not_cleared for conflicts/suppression.
3. **Outreach/social** — still not approved. All three prospects remain Agent Targeting only.
4. **Jeff approval** — required for any external action, CRM staging update, or copy finalization.

---

## Deliverable

This remediation report addresses all four source caveats identified in the reviewer gate report t_ea72eabb. No outreach, LinkedIn, CRM mutation, or external action was taken during this remediation run.

Path: docs/nightly-lead-research/runs/2026-05-07/remediation_t_8bda6fdf.md
