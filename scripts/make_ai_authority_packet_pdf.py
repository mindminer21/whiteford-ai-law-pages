#!/usr/bin/env python3
"""Generate a Whiteford-branded AI Authority Packet PDF with no external dependencies."""
from __future__ import annotations

import os
import re
import subprocess
from pathlib import Path
from textwrap import wrap

ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "docs" / "daily-content" / "2026-05-13"
OUT_DIR.mkdir(parents=True, exist_ok=True)
PDF_PATH = OUT_DIR / "whiteford-ai-authority-packet-for-herb-2026-05-13.pdf"
TXT_PATH = OUT_DIR / "whiteford-ai-authority-packet-for-herb-2026-05-13-source.md"
LOGO_PNG = ROOT / "public" / "brand" / "whiteford-logo.png"
LOGO_JPG = OUT_DIR / "whiteford-logo-for-pdf.jpg"

# Convert the existing Whiteford logo PNG to JPEG so the custom PDF writer can embed it via DCTDecode.
subprocess.run(["sips", "-s", "format", "jpeg", str(LOGO_PNG), "--out", str(LOGO_JPG)], check=True, stdout=subprocess.DEVNULL)
logo_bytes = LOGO_JPG.read_bytes()

# PDF page constants (US Letter)
PAGE_W, PAGE_H = 612, 792
MARGIN_X = 54
BOTTOM = 56
TOP = 720
BLUE = (0.129, 0.247, 0.467)      # #213f77
INK = (0.071, 0.094, 0.153)       # #121827
MUTED = (0.365, 0.400, 0.471)     # #5d6678
GOLD = (0.725, 0.565, 0.341)      # #b99057
SAGE = (0.333, 0.467, 0.416)      # #55776a
LINE = (0.847, 0.816, 0.765)      # #d8d0c3
PAPER = (1.0, 0.992, 0.973)       # #fffdf8
SOFT_BLUE = (0.914, 0.933, 0.973) # #e9eef8
SOFT_GOLD = (0.965, 0.918, 0.843)# #f6ead7

SOURCE_MD = """# Whiteford AI Authority Packet

Prepared for: Herb / Whiteford Marketing Review  
Prepared by: Jeff Schell / Schell IP + Whiteford  
Date: May 13, 2026  
Status: Internal marketing review draft only. Do not publish, send externally, enroll contacts, or activate workflows until Whiteford review and approval.

## Executive positioning

AI readiness should become a launch discipline: one evidence file that connects human invention contribution, vendor/data rights, and Colorado AI governance posture before a demo becomes a product promise.

This packet translates the Whiteford/Schell IP AI authority workstream into marketing-ready building blocks: a LinkedIn post, short email/newsletter, YouTube concept, landing-page improvement, visual direction, research anchors, routing notes, and ethics/compliance guardrails.

## Content angle + executive hook

AI product launches are creating two evidence problems at once.

On the IP side, founders need a clean record of what humans actually conceived, selected, refined, tested, and reduced to a working technical solution when AI tools helped the R&D process.

On the governance side, executives need a clean record of where AI touches customers, employees, applicants, borrowers, tenants, or other consequential workflows — and which vendor, contract, data, notice, human-review, and recordkeeping controls apply.

Those should not be separate fire drills. A practical AI launch file should answer three questions before the demo becomes a product promise:

1. What human technical contribution might be protectable?
2. What AI/data/vendor terms could affect ownership, confidentiality, or use rights?
3. Does the product make, guide, or assist decisions that require governance documentation or consumer-facing process?

For Colorado and Mountain West companies, AI readiness should become a launch discipline — not late-stage legal cleanup.

## Draft LinkedIn post

AI product launches are creating two evidence problems at once.

On the IP side, founders need a clean record of what humans actually conceived, selected, refined, tested, and reduced to a working technical solution when AI tools helped the R&D process.

On the governance side, executives need a clean record of where AI touches customers, employees, applicants, borrowers, tenants, or other consequential workflows — and which vendor, contract, data, notice, human-review, and recordkeeping controls apply.

Those should not be separate fire drills.

A practical AI launch file should answer three questions before the demo becomes a product promise:

1. What human technical contribution might be protectable?
2. What AI/data/vendor terms could affect ownership, confidentiality, or use rights?
3. Does the product make, guide, or assist decisions that require governance documentation or consumer-facing process?

None of this determines patentability, inventorship, or compliance by itself. But it gives counsel and leadership the record needed to move deliberately instead of reconstructing the story during diligence, a customer security review, or a regulator question.

For Colorado and Mountain West companies, AI readiness should become a launch discipline — not late-stage legal cleanup.

Structured first pass: /ai-compliance-gameplan

## Short email / newsletter

Subject: Before the AI demo becomes a legal record

Preview: A practical launch file can connect patent, vendor, and Colorado AI governance issues before they become diligence problems.

Many AI legal problems are not caused by the model itself. They are caused by missing records.

When an AI-enabled product moves from prototype to customer-facing workflow, leadership should be able to answer three questions: who made the human technical contribution, which vendor or data terms may affect rights and confidentiality, and whether the system touches consequential decisions that require governance, notice, human review, or records.

This is not a request for confidential facts in a public form, and it is not a substitute for legal advice. It is a structured way to identify where counsel should focus first.

CTA: Build the first-pass AI launch file with the AI Compliance Gameplan Builder: /ai-compliance-gameplan

## @SchellIP YouTube idea

Title: The AI Launch File: What to Document Before Product, Patent, or Compliance Questions Hit

30-second hook: If your company is building with AI, the highest-value legal work may be the record you create before anyone asks for it. In this video, I’ll map the three-part AI launch file: human technical contribution for patent strategy, vendor/data terms for ownership and confidentiality, and decision-impact documentation for Colorado AI governance. This will not tell you whether you have a patent or whether you comply with any law — but it will show why executives should not wait until diligence or a customer review to reconstruct the story.

Mapped lead magnet: /ai-compliance-gameplan, with a verbal cross-reference to /ai-patent-strategy-scorecard for R&D-heavy teams.

## Conversion improvement

Add an “AI Launch Evidence Map” result module to the AI Compliance Gameplan thank-you/report screen.

It should score three lanes:

- Invention record
- Vendor/data rights
- Decision-impact governance

The module should recommend one next Whiteford workstream without asking for confidential details.

Primary CTA: /ai-compliance-gameplan
Cross-sell: /ai-patent-strategy-scorecard

## Visual direction

Whiteford-branded design direction: a restrained legal-operating-system board titled “Evidence Before Launch.”

Use:

- Paper background
- Ink text
- Whiteford blue for governance
- Muted gold for invention/IP
- Sage for vendor/data controls
- Fine grid
- Sharp rectangular cards
- Sparse executive copy

Three visual lanes:

1. Human contribution — conception, selection, refinement, testing, reduction to practice.
2. Vendor / data rights — confidentiality, ownership, model terms, customer commitments.
3. Decision impact — use-case inventory, human review, notices, records, escalation.

## Research anchors

- USPTO: AI-assisted inventions are not categorically unpatentable; focus remains on significant human contribution.
  https://www.uspto.gov/subscription-center/2024/uspto-issues-inventorship-guidance-and-examples-ai-assisted-inventions

- Colorado SB25B-004: extended SB24-205 AI requirements to June 30, 2026.
  https://leg.colorado.gov/bills/sb25b-004

- Google Search Central: create helpful, reliable, people-first content.
  https://developers.google.com/search/docs/fundamentals/creating-helpful-content

## HighLevel routing notes

Suggested campaign key: ai-compliance

Trigger tag: workflow:ai-compliance-readiness

Tags:

- leadmagnet:ai-compliance-gameplan
- interest:ai-compliance
- optional signal:ai-patent for R&D-heavy responses

Segment: Colorado / Mountain West founders, CEOs, COOs, CFOs, GCs, product, HR, and risk leaders preparing an AI product launch or AI-enabled workflow review.

Productized offer: AI Compliance Readiness Sprint, with cross-path to AI Patent Strategy Sprint when the launch file shows R&D/invention documentation gaps.

## Unpaid / organic content strategy

Use the AI Launch Evidence File theme as a repeatable organic content lane for Whiteford/Schell IP.

Recommended unpaid content assets:

- LinkedIn thought-leadership post from Jeff: the draft post in this packet.
- LinkedIn carousel: “3 records to create before your AI demo becomes a product promise.”
- Short website article: “The AI Launch Evidence File: patent, data-rights, and governance records before launch.”
- One-page downloadable checklist routed to /ai-compliance-gameplan.
- Internal attorney-review version for Whiteford lawyers to share manually with approved contacts.
- Follow-up post: “Why AI governance and AI patent records should not live in separate folders.”

Organic distribution sequence:

1. Publish attorney-reviewed article on the Whiteford/Schell IP site.
2. Post LinkedIn summary from Jeff with educational framing and no confidential-information invitation.
3. Repurpose into a short carousel and a 60-second video clip.
4. Share internally with Whiteford attorneys as a conversation starter for AI, technology, privacy, corporate, employment, and M&A contacts.
5. Use comments and inbound questions to identify webinar topics; do not treat engagement as consent for CRM enrollment.

## Paid content strategy: Google Ads + LinkedIn Ads

Google Ads posture: capture high-intent educational searches without overclaiming legal outcomes.

Suggested search themes:

- Colorado AI compliance lawyer
- Colorado AI Act compliance counsel
- AI governance lawyer Colorado
- AI product launch legal review
- AI vendor contract legal review
- AI patent strategy lawyer
- AI policy lawyer for technology companies

Suggested landing routes:

- Primary: /ai-compliance-gameplan
- Secondary: /colorado-ai-compliance-lawyer
- Cross-path: /ai-patent-strategy-scorecard

Google Ads guardrails:

- Use “readiness,” “issue spotting,” “counsel-led review,” and “educational checklist.”
- Avoid “certify compliance,” “guaranteed compliance,” “patent guaranteed,” or emergency-response framing.
- Add negative keywords around free legal advice, templates only, jobs, courses, and unrelated consumer AI.

LinkedIn Ads posture: target Colorado and Mountain West executives and product/legal leaders with educational assets.

Suggested LinkedIn audiences:

- Geography: Colorado, Denver, Boulder, Fort Collins, Colorado Springs, Mountain West expansion as approved.
- Functions/titles: Founder, CEO, COO, CFO, General Counsel, Product, Engineering, Risk, Compliance, HR, Privacy, Security.
- Industries: software, AI/ML, robotics, cybersecurity, aerospace/defense, data infrastructure, healthcare technology, enterprise SaaS.
- Company size: founder-led and growth-stage companies likely to need outside-GC support.

Suggested LinkedIn creative:

- Sponsored single image: “Evidence Before Launch.”
- Document ad: “AI Launch Evidence File Checklist.”
- Retargeting ad: “Turn your AI readiness notes into a counsel-led action plan.”

## YouTube strategy

Use @SchellIP to convert the authority packet into a small video series instead of a one-off post.

Recommended videos:

1. The AI Launch File: What to Document Before Product, Patent, or Compliance Questions Hit.
2. AI-assisted invention records: what founders should capture before patent strategy review.
3. Vendor/data-rights issues in AI product launches.
4. Colorado AI governance readiness: what executives should organize before counsel review.
5. Customer security reviews and AI product claims: why the evidence file matters.

Format:

- 6-10 minute main video.
- 60-second LinkedIn/YouTube Shorts cutdown.
- CTA in each video: run the AI Compliance Gameplan Builder, then consider the AI Patent Strategy Scorecard if R&D documentation is central.
- Keep all scripts educational; no legal conclusions, no confidential fact requests, no compliance/patentability guarantees.

## Online event / webinar strategy

Recommended webinar title: Evidence Before Launch: AI Product, Patent, Data-Rights, and Governance Readiness for Colorado Technology Companies.

Audience:

- Colorado and Mountain West founders, executives, product leaders, GCs, privacy/security leaders, HR leaders, and investors supporting AI-enabled companies.

Proposed 45-minute agenda:

1. Why AI launch records matter before diligence, customer review, or regulator questions.
2. The three-part AI Launch Evidence File: human contribution, vendor/data rights, decision-impact governance.
3. Colorado AI timing and governance caveats, with current-law review required.
4. Practical checklist: what to collect before the first counsel conversation.
5. Q&A with no legal advice and no confidential facts requested.

Event funnel:

- Registration page with no-confidential-information warning.
- Confirmation email with the one-page checklist.
- Post-event email linking to /ai-compliance-gameplan and /ai-patent-strategy-scorecard.
- Internal Whiteford follow-up only for approved, consented contacts.

## Colorado in-person event and natural-alignment strategy

Goal: align the “Evidence Before Launch” theme with existing Colorado AI and technology communities in a way that is useful, educational, and non-salesy.

Primary community targets and public contact paths:

1. Rocky Mountain AI / Rocky Mountain AI Interest Group (RMAI / RMAIIG)
   - Public site: https://www.rockymountainai.org/
   - Public contact: hello@rockymountainai.org
   - Public Meetup: https://www.meetup.com/rmaiig/
   - Key publicly listed people / subgroup paths:
     - Dan Murray — RMAIIG Founder.
     - Jason Cormier — Board President; also listed for AI Marketing Forum.
     - Andres Sepulveda-Morales — Board Treasurer; also listed for Fort Collins AI for Everyone.
     - Chris Brown — Board Secretary; listed for Legal AI.
     - Susan Adams — Women in AI subgroup contact.
     - Bill McIntyre — AI/ML Engineering subgroup contact.
     - Lauri Hofherr — AI & Product subgroup contact.
     - Bobby Hodgkinson — GenAI in Education subgroup contact.
     - Uche Ogbuji — AI for Entrepreneurs & Startups subgroup contact.
     - David Jitendranath — Denver AI subgroup contact.
     - Ken Fricklas — Ethics and Safety subgroup contact.
   - Natural alignment: offer an educational “AI Launch Evidence File” session for Legal AI, AI & Product, AI for Entrepreneurs & Startups, Ethics and Safety, or AI Marketing Forum.

2. Colorado Technology Association (CTA)
   - Public site: https://coloradotechnology.org/
   - Contact page: https://coloradotechnology.org/contact/
   - Public email: membership@coloradotechnology.org
   - Public phone listed on contact page: 303-592-4070
   - Relevant programs: Colorado Tech Summit, C-Level @ A Mile High, WIT Conference, events calendar, advocacy and member programming.
   - Natural alignment: propose a practical AI governance / product-readiness briefing for CTA members, framed around business readiness and executive records rather than legal scare tactics.

3. Boulder AI Builders
   - Public site: https://www.boulderaibuilders.org/
   - Public event path surfaced on site: Luma event signup links for Boulder/Denver meetups.
   - Natural alignment: offer a short founder/operator talk or checklist handout focused on AI launch documentation before demos, customer security reviews, or diligence.
   - Contact approach: use the site’s event signup / Luma path first, then identify current organizers from the event page before any outreach.

4. Denver-Boulder AI Tinkerers
   - Public site surfaced in search: https://denver-boulder.aitinkerers.org/
   - Public organizer path surfaced in search: https://denver-boulder.aitinkerers.org/organizers
   - Natural alignment: propose a builder-focused “what to document before shipping AI features” lightning talk; keep it practical for technical founders and engineers.
   - Contact approach: verify current organizers from the official organizer page before outreach; do not assume names from stale third-party listings.

5. DenAI / City and regional AI convenings
   - Public search surfaced Denver’s DenAI Summit as a relevant civic AI convening.
   - Natural alignment: monitor Denver AI civic events for sponsor, panel, or workshop opportunities around responsible AI adoption, records, and governance.
   - Contact approach: use official Denver event/contact pages only after current event details are verified.

In-person activation sequence:

1. Ask Herb/Whiteford marketing to approve the community-alignment posture and preferred sponsorship/speaking boundaries.
2. Prioritize RMAIIG Legal AI, AI & Product, AI for Entrepreneurs & Startups, and Ethics and Safety because they naturally fit AI policy, governance, product, and legal-readiness content.
3. Offer a practical checklist/session, not a pitch: “Evidence Before Launch: what AI companies should organize before counsel review.”
4. Bring a one-page handout with QR codes to /ai-compliance-gameplan and /ai-patent-strategy-scorecard.
5. Capture only consented contacts; do not add attendees to HighLevel or outreach workflows without explicit opt-in and approval.

## Compliance + ethics check

- Soften any statement that implies a company “is compliant” or “has patentable subject matter.” Use readiness, issue-spotting, and documentation language.
- Do not imply Colorado AI duties are static; note that timing and requirements continue to move and require current legal review.
- Keep the CTA framed as educational and non-confidential; no attorney-client relationship until conflicts review and written engagement.
- Avoid promising legal moats, outcomes, or regulatory protection from the lead magnet alone.
- Treat paid ads, event registrations, QR scans, comments, and webinar attendance as marketing signals only; they are not conflict clearance, matter acceptance, or consent to live CRM enrollment unless the exact consent and workflow are approved.

## Recommended ask for Herb

Please review this as an internal marketing concept packet for Whiteford/Schell IP AI authority content. The proposed marketing theme is “Evidence Before Launch”: helping technology companies understand why AI product, patent, data-rights, and governance records should be built before diligence, customer review, or regulator questions force reconstruction.

Also review the added channel plan: unpaid organic content, paid Google/LinkedIn ads, YouTube, webinar, and Colorado in-person community alignment through RMAIIG, CTA, Boulder AI Builders, Denver-Boulder AI Tinkerers, and Denver civic AI convenings.
"""

TXT_PATH.write_text(SOURCE_MD, encoding="utf-8")

# ---------- Tiny PDF writer ----------

def esc(s: str) -> str:
    s = (
        s.replace("—", "-")
        .replace("–", "-")
        .replace("“", '"')
        .replace("”", '"')
        .replace("‘", "'")
        .replace("’", "'")
        .replace("·", "-")
        .replace("•", "-")
    )
    s = s.encode("latin1", "replace").decode("latin1")
    return s.replace("\\", "\\\\").replace("(", "\\(").replace(")", "\\)")


def color_cmd(rgb):
    return f"{rgb[0]:.3f} {rgb[1]:.3f} {rgb[2]:.3f} rg\n"


def stroke_color_cmd(rgb):
    return f"{rgb[0]:.3f} {rgb[1]:.3f} {rgb[2]:.3f} RG\n"


def rect(x, y, w, h, fill=None, stroke=None, lw=1):
    ops = ["q\n"]
    if fill:
        ops.append(color_cmd(fill))
    if stroke:
        ops.append(stroke_color_cmd(stroke))
    ops.append(f"{lw} w\n{x:.2f} {y:.2f} {w:.2f} {h:.2f} re ")
    if fill and stroke:
        ops.append("B\n")
    elif fill:
        ops.append("f\n")
    else:
        ops.append("S\n")
    ops.append("Q\n")
    return "".join(ops)


def text_line(x, y, text, size=11, font="F1", rgb=INK):
    return color_cmd(rgb) + f"BT /{font} {size} Tf 1 0 0 1 {x:.2f} {y:.2f} Tm ({esc(text)}) Tj ET\n"


def draw_image(x, y, w, h):
    return f"q\n{w:.2f} 0 0 {h:.2f} {x:.2f} {y:.2f} cm\n/ImLogo Do\nQ\n"


def approximate_wrap(text: str, size: int, width: float):
    chars = max(18, int(width / (size * 0.50)))
    lines = []
    for raw in text.split("\n"):
        raw = raw.rstrip()
        if not raw:
            lines.append("")
            continue
        prefix = ""
        content = raw
        m = re.match(r"^(\s*[-•]\s+|\s*\d+\.\s+)(.*)$", raw)
        if m:
            prefix = m.group(1)
            content = m.group(2)
        wrapped = wrap(content, width=max(12, chars - len(prefix)), break_long_words=False, break_on_hyphens=False)
        if not wrapped:
            lines.append(prefix.rstrip())
        else:
            lines.append(prefix + wrapped[0])
            indent = " " * len(prefix)
            lines.extend(indent + w for w in wrapped[1:])
    return lines


pages = []
current = []
y = TOP
page_no = 0


def new_page(with_header=True):
    global current, y, page_no
    if current:
        # footer
        current.append(stroke_color_cmd(LINE) + f"0.8 w\n{MARGIN_X} 42 {PAGE_W-2*MARGIN_X} 0 l S\n")
        current.append(text_line(MARGIN_X, 25, "Internal marketing review draft — no publication or external campaign activation without Whiteford approval.", 7.5, rgb=MUTED))
        current.append(text_line(PAGE_W - 90, 25, f"Page {page_no}", 7.5, rgb=MUTED))
        pages.append("".join(current).encode("utf-8"))
    page_no += 1
    current = []
    current.append(rect(0, 0, PAGE_W, PAGE_H, fill=PAPER))
    if with_header:
        current.append(draw_image(MARGIN_X, 725, 36, 36))
        current.append(text_line(98, 747, "WHITEFORD", 11, "F2", BLUE))
        current.append(text_line(98, 733, "AI Authority Packet", 8.5, rgb=MUTED))
        current.append(stroke_color_cmd(LINE) + f"0.8 w\n{MARGIN_X} 712 {PAGE_W-2*MARGIN_X} 0 l S\n")
        y = 684
    else:
        y = TOP


def ensure(space):
    global y
    if y - space < BOTTOM:
        new_page(True)


def add_heading(text, level=1):
    global y
    size = 18 if level == 1 else 13
    font = "F2"
    rgb = BLUE if level == 1 else INK
    ensure(size + 24)
    y -= 12 if level == 1 else 8
    current.append(text_line(MARGIN_X, y, text, size, font, rgb))
    y -= size + (8 if level == 1 else 5)
    if level == 1:
        current.append(stroke_color_cmd(GOLD) + f"2 w\n{MARGIN_X} {y+4} 72 0 l S\n")
        y -= 8


def add_paragraph(text, size=10.5, rgb=INK, left=MARGIN_X, width=PAGE_W-2*MARGIN_X, leading=None):
    global y
    if leading is None:
        leading = size * 1.36
    lines = approximate_wrap(text, size, width)
    for line in lines:
        if line == "":
            y -= leading * 0.55
            continue
        ensure(leading + 2)
        current.append(text_line(left, y, line, size, rgb=rgb))
        y -= leading
    y -= 3


def add_box(title, body, fill=SOFT_BLUE, accent=BLUE):
    global y
    lines = approximate_wrap(body, 9.5, PAGE_W - 2*MARGIN_X - 28)
    h = 36 + len(lines)*13
    ensure(h + 8)
    current.append(rect(MARGIN_X, y-h+10, PAGE_W-2*MARGIN_X, h, fill=fill, stroke=LINE))
    current.append(rect(MARGIN_X, y-h+10, 5, h, fill=accent, stroke=accent))
    current.append(text_line(MARGIN_X+16, y-10, title, 11, "F2", accent))
    yy = y - 28
    for line in lines:
        current.append(text_line(MARGIN_X+16, yy, line, 9.5, rgb=INK))
        yy -= 13
    y -= h + 10


def parse_markdown(md: str):
    blocks = []
    cur = []
    for line in md.splitlines():
        if line.startswith("# ") or line.startswith("## "):
            if cur:
                blocks.append(("p", "\n".join(cur).strip()))
                cur = []
            blocks.append(("h1" if line.startswith("# ") else "h2", line.lstrip("# ").strip()))
        elif not line.strip():
            if cur:
                blocks.append(("p", "\n".join(cur).strip()))
                cur = []
        else:
            cur.append(line)
    if cur:
        blocks.append(("p", "\n".join(cur).strip()))
    return blocks

# Cover page
new_page(with_header=False)
current.append(rect(0, 0, PAGE_W, PAGE_H, fill=PAPER))
current.append(rect(0, PAGE_H-210, PAGE_W, 210, fill=BLUE))
current.append(draw_image(MARGIN_X, PAGE_H-170, 86, 86))
current.append(text_line(154, PAGE_H-112, "WHITEFORD", 24, "F2", (1, 1, 1)))
current.append(text_line(154, PAGE_H-137, "Schell IP + Whiteford · Mountain West AI law", 10, rgb=(0.88, 0.90, 0.94)))
current.append(text_line(MARGIN_X, 505, "AI Authority Packet", 38, "F2", INK))
current.append(text_line(MARGIN_X, 470, "Evidence Before Launch", 24, "F2", GOLD))
current.append(rect(MARGIN_X, 372, PAGE_W - 2*MARGIN_X, 58, fill=SOFT_GOLD, stroke=LINE))
current.append(rect(MARGIN_X, 372, 5, 58, fill=GOLD, stroke=GOLD))
current.append(text_line(MARGIN_X + 16, 410, "Prepared for Herb / Whiteford Marketing Review", 11, "F2", GOLD))
cover_note = "Internal marketing review draft for Whiteford/Schell IP AI authority content. Includes LinkedIn, email/newsletter, YouTube, conversion, visual, routing, and ethics guardrail recommendations."
yy_note = 393
for line in approximate_wrap(cover_note, 9.5, PAGE_W - 2*MARGIN_X - 32):
    current.append(text_line(MARGIN_X + 16, yy_note, line, 9.5, rgb=INK))
    yy_note -= 13
current.append(text_line(MARGIN_X, 300, "Core thesis", 14, "F2", BLUE))
cover_lines = approximate_wrap("AI readiness should become a launch discipline: one evidence file that connects human invention contribution, vendor/data rights, and Colorado AI governance posture before a demo becomes a product promise.", 12, PAGE_W-2*MARGIN_X)
yy = 276
for line in cover_lines:
    current.append(text_line(MARGIN_X, yy, line, 12, rgb=INK))
    yy -= 17
current.append(text_line(MARGIN_X, 120, "Status: internal draft only — not approved for public use, external send, or campaign activation.", 9.5, rgb=MUTED))
current.append(text_line(MARGIN_X, 100, "Date: May 13, 2026", 9.5, rgb=MUTED))
pages.append("".join(current).encode("utf-8"))
current = []
page_no = 1

# Body pages
new_page(with_header=True)
for kind, text in parse_markdown(SOURCE_MD):
    if kind == "h1":
        continue
    if kind == "h2":
        add_heading(text, level=1)
    else:
        # Box the status/metadata paragraph and core executive positioning if early.
        if text.startswith("Prepared for:"):
            add_box("Packet metadata", text.replace("  ", ""), fill=SOFT_GOLD, accent=GOLD)
        else:
            add_paragraph(text)

# Finish final page
if current:
    current.append(stroke_color_cmd(LINE) + f"0.8 w\n{MARGIN_X} 42 {PAGE_W-2*MARGIN_X} 0 l S\n")
    current.append(text_line(MARGIN_X, 25, "Internal marketing review draft — no publication or external campaign activation without Whiteford approval.", 7.5, rgb=MUTED))
    current.append(text_line(PAGE_W - 90, 25, f"Page {page_no}", 7.5, rgb=MUTED))
    pages.append("".join(current).encode("utf-8"))

objects = []

def add_obj(data: bytes | str):
    if isinstance(data, str):
        data = data.encode("utf-8")
    objects.append(data)
    return len(objects)

catalog_id = 1
pages_id = 2
font_regular_id = add_obj("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>")
font_bold_id = add_obj("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>")
image_id = add_obj(b"<< /Type /XObject /Subtype /Image /Width 400 /Height 400 /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length " + str(len(logo_bytes)).encode() + b" >>\nstream\n" + logo_bytes + b"\nendstream")
page_obj_ids = []
content_obj_ids = []
for stream in pages:
    content_id = add_obj(b"<< /Length " + str(len(stream)).encode() + b" >>\nstream\n" + stream + b"\nendstream")
    content_obj_ids.append(content_id)
    page_id = add_obj(f"<< /Type /Page /Parent {pages_id} 0 R /MediaBox [0 0 {PAGE_W} {PAGE_H}] /Resources << /Font << /F1 {font_regular_id} 0 R /F2 {font_bold_id} 0 R >> /XObject << /ImLogo {image_id} 0 R >> >> /Contents {content_id} 0 R >>")
    page_obj_ids.append(page_id)

# Insert catalog and pages objects at fixed ids by rebuilding with placeholders first.
# Current ids start at 1 for font, but catalog/pages need to be 1/2. Simpler: rebuild final order explicitly.
final_objects = []
final_objects.append(f"<< /Type /Catalog /Pages 2 0 R >>".encode())
# Need renumber all prior object ids by +2 because final objects 1,2 are catalog/pages.
# Original local object ids: font_regular=1, font_bold=2, image=3, etc. Final ids: +2.
page_refs = " ".join(f"{pid+2} 0 R" for pid in page_obj_ids)
final_objects.append(f"<< /Type /Pages /Kids [{page_refs}] /Count {len(page_obj_ids)} >>".encode())
for obj in objects:
    # Rewrite references inside page objects and content objects metadata if necessary.
    # Streams contain no object references. Page dictionaries contain font/image/content refs.
    s = obj.decode("latin1")
    # Replace only known object references from old object id space to new id space.
    for old in range(len(objects), 0, -1):
        s = s.replace(f"{old} 0 R", f"{old+2} 0 R")
    final_objects.append(s.encode("latin1"))

pdf = bytearray(b"%PDF-1.4\n%\xe2\xe3\xcf\xd3\n")
offsets = [0]
for i, obj in enumerate(final_objects, 1):
    offsets.append(len(pdf))
    pdf.extend(f"{i} 0 obj\n".encode())
    pdf.extend(obj)
    pdf.extend(b"\nendobj\n")
xref = len(pdf)
pdf.extend(f"xref\n0 {len(final_objects)+1}\n".encode())
pdf.extend(b"0000000000 65535 f \n")
for off in offsets[1:]:
    pdf.extend(f"{off:010d} 00000 n \n".encode())
pdf.extend(f"trailer\n<< /Size {len(final_objects)+1} /Root 1 0 R >>\nstartxref\n{xref}\n%%EOF\n".encode())

PDF_PATH.write_bytes(pdf)
print(PDF_PATH)
print(TXT_PATH)
print(f"pages={len(pages)} bytes={PDF_PATH.stat().st_size}")
