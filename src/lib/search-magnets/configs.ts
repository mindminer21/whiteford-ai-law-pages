// Ported from the reference HTML window.MAGNET_CONFIG objects in /Users/jeff/Downloads/lead-magnets.
export type SearchMagnetRoute = "colorado-non-compete-checker" | "trademark-brand-precheck" | "patent-readiness" | "sale-readiness-audit";

export type SearchMagnetOption = {
  text: string;
  weight: number;
};

export type SearchMagnetQuestion = {
  dim: string;
  dimLabel?: string;
  text: string;
  help?: string;
  options: readonly SearchMagnetOption[];
};

export type SearchMagnetConfig = {
  id: string;
  tags: readonly string[];
  kicker: string;
  titleHTML: string;
  lede: string;
  ctaStart: string;
  meta: string;
  preview: {
    tag: string;
    title: string;
    sub: string;
    bars: readonly { label: string; val: number; max: number }[];
    actions: readonly string[];
  };
  howTitleHTML: string;
  steps: readonly { num: string; title: string; text: string }[];
  areasLabel: string;
  areasTitleHTML: string;
  areasLede: string;
  areas: readonly { tag: string; title: string; text: string }[];
  getTitleHTML: string;
  whatYouGet: readonly string[];
  captureKicker: string;
  captureTitleHTML: string;
  captureSub: string;
  consentText: string;
  dimensions: readonly { key: string; label: string }[];
  questions: readonly SearchMagnetQuestion[];
  scoreLabel: string;
  result: {
    intro: string;
    tiers: readonly { maxPct: number; label: string; cls: string; blurb: string }[];
    dimActions: Readonly<Record<string, readonly string[]>>;
    ctaTitle: string;
    ctaText: string;
  };
  resultDisclaimer: string;
  byline: { name: string; role: string; bio: string };
  footerDisclaimer: string;
};

export const searchMagnetRoutes = [
  "colorado-non-compete-checker",
  "trademark-brand-precheck",
  "patent-readiness",
  "sale-readiness-audit"
] as const;

export const searchMagnetConfigs = {
  "colorado-non-compete-checker": {
    "id": "colorado-non-compete-checker",
    "tags": [
      "lead-magnet",
      "non-compete-checker",
      "employment",
      "trade-secrets",
      "colorado"
    ],
    "kicker": "5-minute check · 12 questions",
    "titleHTML": "Find out if your restrictive covenants are <em>quietly void.</em>",
    "lede": "Colorado voids most non-competes and many non-solicitation and confidentiality provisions — and presenting a void covenant carries a $5,000-per-worker penalty. This check maps where your agreements stand against current Colorado law before an employee, a regulator, or a buyer does.",
    "ctaStart": "Start the 5-minute check",
    "meta": "No login · Inline result · Email summary",
    "preview": {
      "tag": "Whiteford · Schell IP sample result",
      "title": "Restrictive-Covenant Exposure",
      "sub": "Prepared for [your company] · inline result + email summary",
      "bars": [
        {
          "label": "Enforceability",
          "val": 14,
          "max": 16
        },
        {
          "label": "Notice & process",
          "val": 7,
          "max": 8
        },
        {
          "label": "Confidentiality drafting",
          "val": 5,
          "max": 7
        },
        {
          "label": "Trade-secret protection",
          "val": 12,
          "max": 16
        },
        {
          "label": "Multi-state exposure",
          "val": 6,
          "max": 8
        }
      ],
      "actions": [
        "Templates use restrictions below the $130,014 threshold — generally void.",
        "Covenant notice is buried in the offer letter, not a standalone document.",
        "Protection rests on the covenant, not a documented trade-secret program."
      ]
    },
    "howTitleHTML": "Twelve questions. Five exposure areas. <em>One plain-English readiness profile.</em>",
    "steps": [
      {
        "num": "STEP 01",
        "title": "Tell us where to send it",
        "text": "Name, company, title, and work email first, so your summary can be routed and delivered correctly."
      },
      {
        "num": "STEP 02",
        "title": "Answer 12 questions",
        "text": "Quick multiple-choice on what your agreements contain, how they're presented, and who they bind."
      },
      {
        "num": "STEP 03",
        "title": "See your profile",
        "text": "A five-area exposure profile with color-coded zones and your highest-priority issues."
      },
      {
        "num": "STEP 04",
        "title": "Get the summary",
        "text": "Your profile and prioritized actions render inline and are queued for email follow-up."
      }
    ],
    "areasLabel": "The five areas",
    "areasTitleHTML": "Where Colorado quietly turns standard agreements <em>into liabilities.</em>",
    "areasLede": "Most restrictive-covenant exposure isn't created on purpose. It accumulates when out-of-state templates, old handbooks, and standard-form clauses outrun a law that has tightened repeatedly since 2022.",
    "areas": [
      {
        "tag": "A · Enforceability",
        "title": "Are your covenants even valid?",
        "text": "Colorado voids non-competes except in narrow cases. Most turn on the highly-compensated threshold ($130,014 in 2026) and a genuine trade-secret purpose — and the 2025 amendments narrowed the remaining exceptions further."
      },
      {
        "tag": "B · Notice & process",
        "title": "Was it presented the right way?",
        "text": "A covenant can be void on procedure alone: it must be a separate notice, delivered before a new hire accepts (or 14 days before it takes effect for current workers)."
      },
      {
        "tag": "C · Confidentiality drafting",
        "title": "Is your NDA language too broad?",
        "text": "Overbroad 'all information' confidentiality clauses can be swept into the statute — creating penalty exposure even where you never intended to enforce a non-compete."
      },
      {
        "tag": "D · Trade-secret protection",
        "title": "What protects you if the covenant fails?",
        "text": "If the restriction is unenforceable, a documented trade-secret program — access controls, NDAs, exit protocols, an inventory — is what actually protects the business."
      },
      {
        "tag": "E · Multi-state exposure",
        "title": "One national template for everyone?",
        "text": "National templates often pick another state's law and venue. For Colorado workers, requiring enforcement outside Colorado is itself a problem."
      }
    ],
    "getTitleHTML": "A profile your <em>leadership team can act on.</em>",
    "whatYouGet": [
      "Exposure score across five areas, color-coded by risk level",
      "Your three highest-priority areas to review, ranked",
      "Plain-English explanation of what current Colorado law requires",
      "A summary delivered through the approved follow-up workflow",
      "Optional consultation with Jeff in two clicks"
    ],
    "captureKicker": "Step 1 of 13 · Where to send your profile",
    "captureTitleHTML": "Where should we send your <em>exposure profile?</em>",
    "captureSub": "Your personalized profile renders on screen and a copy is emailed to you. No login required.",
    "consentText": "I'd like my profile emailed to me and understand Whiteford · Schell IP may follow up. This tool is general information, not legal advice, and creates no attorney-client relationship. I won't submit confidential or privileged information.",
    "dimensions": [
      {
        "key": "enforceability",
        "label": "Enforceability"
      },
      {
        "key": "procedure",
        "label": "Notice & process"
      },
      {
        "key": "confidentiality",
        "label": "Confidentiality drafting"
      },
      {
        "key": "substitute",
        "label": "Trade-secret protection"
      },
      {
        "key": "multistate",
        "label": "Multi-state exposure"
      }
    ],
    "questions": [
      {
        "dim": "enforceability",
        "dimLabel": "Enforceability",
        "text": "Do your employment or contractor agreements include non-compete or non-solicitation provisions?",
        "options": [
          {
            "text": "No — we've removed them",
            "weight": 0
          },
          {
            "text": "Yes, for some roles",
            "weight": 2
          },
          {
            "text": "Yes, as a standard clause for most hires",
            "weight": 4
          },
          {
            "text": "We're not certain what our templates contain",
            "weight": 3
          }
        ]
      },
      {
        "dim": "enforceability",
        "dimLabel": "Enforceability",
        "text": "For workers bound by a non-compete, what's their typical annual compensation?",
        "options": [
          {
            "text": "Above ~$130,000 (the 2026 highly-compensated threshold)",
            "weight": 1
          },
          {
            "text": "A mix — some above, many below",
            "weight": 3
          },
          {
            "text": "Most are below ~$130,000",
            "weight": 4
          },
          {
            "text": "We don't track comp against any threshold",
            "weight": 4
          }
        ]
      },
      {
        "dim": "enforceability",
        "dimLabel": "Enforceability",
        "text": "Are the restrictions tied to protecting specific, identified trade secrets?",
        "options": [
          {
            "text": "Yes — narrowly drafted around defined trade secrets",
            "weight": 1
          },
          {
            "text": "Somewhat — general references to confidential info",
            "weight": 3
          },
          {
            "text": "No — broad, standard-form restrictions",
            "weight": 4
          },
          {
            "text": "Not sure",
            "weight": 3
          }
        ]
      },
      {
        "dim": "enforceability",
        "dimLabel": "Enforceability",
        "text": "When were your covenants last reviewed against current Colorado law (HB 22-1317 and the 2025 amendments)?",
        "options": [
          {
            "text": "Within the last 12 months",
            "weight": 0
          },
          {
            "text": "1–3 years ago",
            "weight": 3
          },
          {
            "text": "Before 2022, or never",
            "weight": 4
          },
          {
            "text": "Not sure",
            "weight": 4
          }
        ]
      },
      {
        "dim": "procedure",
        "dimLabel": "Notice & process",
        "text": "How is a restrictive covenant presented to a new hire?",
        "options": [
          {
            "text": "Separate standalone notice, before they accept the offer",
            "weight": 0
          },
          {
            "text": "Signed day one with other onboarding paperwork",
            "weight": 3
          },
          {
            "text": "Buried in the offer letter or handbook",
            "weight": 4
          },
          {
            "text": "Not sure",
            "weight": 3
          }
        ]
      },
      {
        "dim": "procedure",
        "dimLabel": "Notice & process",
        "text": "For current employees asked to sign a covenant, do you give written notice at least 14 days before it takes effect?",
        "options": [
          {
            "text": "Yes, always",
            "weight": 0
          },
          {
            "text": "Sometimes",
            "weight": 3
          },
          {
            "text": "No — or wasn't aware this is required",
            "weight": 4
          },
          {
            "text": "We haven't asked current employees to sign",
            "weight": 1
          }
        ]
      },
      {
        "dim": "confidentiality",
        "dimLabel": "Confidentiality drafting",
        "text": "How broad is the confidentiality language in your agreements?",
        "options": [
          {
            "text": "Narrow — limited to defined confidential info / trade secrets",
            "weight": 1
          },
          {
            "text": "Fairly broad, but reviewed by counsel",
            "weight": 2
          },
          {
            "text": "Very broad 'all information' template language",
            "weight": 4
          },
          {
            "text": "Not sure what it says",
            "weight": 3
          }
        ]
      },
      {
        "dim": "confidentiality",
        "dimLabel": "Confidentiality drafting",
        "text": "Have your confidentiality clauses been reviewed specifically for the Colorado non-compete statute?",
        "options": [
          {
            "text": "Yes",
            "weight": 0
          },
          {
            "text": "Reviewed generally, not for this",
            "weight": 3
          },
          {
            "text": "No",
            "weight": 4
          },
          {
            "text": "Not sure",
            "weight": 3
          }
        ]
      },
      {
        "dim": "substitute",
        "dimLabel": "Trade-secret protection",
        "text": "If a key employee left for a competitor tomorrow, what protects your sensitive information?",
        "options": [
          {
            "text": "A documented program: access controls, NDAs, exit protocols",
            "weight": 0
          },
          {
            "text": "A mix, but nothing systematic",
            "weight": 3
          },
          {
            "text": "Mostly the non-compete itself",
            "weight": 4
          },
          {
            "text": "We haven't thought it through",
            "weight": 4
          }
        ]
      },
      {
        "dim": "substitute",
        "dimLabel": "Trade-secret protection",
        "text": "Do you have a current inventory of your trade secrets and who can access them?",
        "options": [
          {
            "text": "Yes — documented and maintained",
            "weight": 0
          },
          {
            "text": "Partially",
            "weight": 2
          },
          {
            "text": "No",
            "weight": 4
          },
          {
            "text": "Not sure",
            "weight": 3
          }
        ]
      },
      {
        "dim": "multistate",
        "dimLabel": "Multi-state exposure",
        "text": "Do your agreements require disputes to be governed or litigated outside Colorado?",
        "options": [
          {
            "text": "No — Colorado law and venue",
            "weight": 1
          },
          {
            "text": "Yes — another state's law/venue",
            "weight": 4
          },
          {
            "text": "We use a national template and haven't checked",
            "weight": 4
          },
          {
            "text": "Not sure",
            "weight": 3
          }
        ]
      },
      {
        "dim": "multistate",
        "dimLabel": "Multi-state exposure",
        "text": "Do you hire across multiple states using one standard agreement?",
        "options": [
          {
            "text": "No — Colorado-specific agreements",
            "weight": 1
          },
          {
            "text": "A mix",
            "weight": 2
          },
          {
            "text": "Yes — one national template for everyone",
            "weight": 4
          },
          {
            "text": "Not sure",
            "weight": 3
          }
        ]
      }
    ],
    "scoreLabel": "Restrictive-covenant exposure",
    "result": {
      "intro": "{company}'s restrictive-covenant exposure under current Colorado law.",
      "tiers": [
        {
          "maxPct": 0.34,
          "label": "Reasonably positioned",
          "cls": "tier-good",
          "blurb": "Your agreements appear broadly aligned with current Colorado law, but the statute keeps tightening — the areas below are still worth a periodic review."
        },
        {
          "maxPct": 0.66,
          "label": "Material gaps",
          "cls": "tier-warn",
          "blurb": "Several provisions likely don't match current Colorado requirements. Presenting or attempting to enforce a void covenant carries a $5,000-per-worker penalty, so the gaps below are worth closing deliberately."
        },
        {
          "maxPct": 1.01,
          "label": "High exposure",
          "cls": "tier-risk",
          "blurb": "Your agreements look out of step with current Colorado law in multiple areas — including the kind of drafting and notice defects that can void a covenant and trigger the $5,000-per-worker penalty. These are worth addressing before your next hire, dispute, or transaction."
        }
      ],
      "dimActions": {
        "enforceability": [
          "Have your non-compete and non-solicitation templates reviewed against the 2026 threshold ($130,014) and the narrowed 2025 exceptions — restrictions below the threshold are generally void.",
          "Replace standard-form restrictions with narrowly drafted, trade-secret-specific covenants only where an exception actually applies."
        ],
        "procedure": [
          "Move restrictive-covenant notice to a separate, standalone document delivered before offer acceptance (or 14 days before it takes effect for current workers) — a notice defect alone can void the covenant."
        ],
        "confidentiality": [
          "Tighten broad 'all information' confidentiality language, which can be swept into the statute and create penalty exposure even where you never intended to enforce a non-compete."
        ],
        "substitute": [
          "Stand up a documented trade-secret protection program — access controls, NDAs, exit protocols, and a trade-secret inventory — so your protection doesn't rest on covenants that may be unenforceable.",
          "Build a current inventory of your trade secrets and who can access them."
        ],
        "multistate": [
          "Reconcile national or out-of-state template agreements with Colorado law and venue — Colorado bars requiring enforcement outside the state for Colorado workers."
        ]
      },
      "ctaTitle": "Turn this profile into a fixed set of agreements.",
      "ctaText": "A short call is the fastest way to confirm which of your covenants are exposed and map the trade-secret protections that hold up when a covenant won't. Jeff can walk through your result and the Whiteford employment and trade-secret resources that support it."
    },
    "resultDisclaimer": "This profile is general information about Colorado law, not legal advice, and creates no attorney-client relationship.",
    "byline": {
      "name": "Jeff Schell",
      "role": "Managing Partner, Mountain West · Whiteford Taylor & Preston · Patent Attorney · AI Advisor",
      "bio": "Jeff Schell is Managing Partner of Whiteford's Mountain West practice. A patent attorney, venture capitalist, and former two-time founder, he works at the intersection of intellectual property, AI risk, and venture growth — and connects Colorado companies into Whiteford's employment, trade-secret, and corporate teams."
    },
    "footerDisclaimer": "This tool is for general informational purposes only and is not legal advice. Use of this tool does not create an attorney-client relationship between you, your company, and Whiteford Taylor & Preston LLP or Schell IP. Do not submit confidential, privileged, or trade-secret information through this tool. Any engagement is subject to a conflicts check and a written engagement letter. Attorney advertising. Prior results do not guarantee a similar outcome."
  },
  "trademark-brand-precheck": {
    "id": "trademark-brand-precheck",
    "tags": [
      "lead-magnet",
      "trademark-precheck",
      "brand-protection",
      "ip",
      "colorado"
    ],
    "kicker": "5-minute check · 11 questions",
    "titleHTML": "See the brand-protection gaps <em>before you invest in the name.</em>",
    "lede": "A rebrand, a product launch, or a new logo can be expensive to undo if the name is weak, already taken, or unprotectable. This check flags the conflict risks and protection gaps worth resolving before you commit — so you fix them on your terms, not after a cease-and-desist.",
    "ctaStart": "Start the brand pre-check",
    "meta": "No login · Inline result · Email summary",
    "preview": {
      "tag": "Whiteford · Schell IP sample result",
      "title": "Brand-Protection Readiness",
      "sub": "Prepared for [your company] · inline result + email summary",
      "bars": [
        {
          "label": "Name strength",
          "val": 6,
          "max": 8
        },
        {
          "label": "Conflict risk",
          "val": 9,
          "max": 12
        },
        {
          "label": "Use & rights",
          "val": 6,
          "max": 10
        },
        {
          "label": "Filing coverage",
          "val": 5,
          "max": 7
        },
        {
          "label": "Digital & assets",
          "val": 4,
          "max": 6
        }
      ],
      "actions": [
        "Name reads as descriptive — harder to register and to protect.",
        "No knockout search run against the USPTO database yet.",
        "Logo created by a contractor without a written IP assignment."
      ]
    },
    "howTitleHTML": "Eleven questions. Five protection areas. <em>One readiness profile.</em>",
    "steps": [
      {
        "num": "STEP 01",
        "title": "Tell us where to send it",
        "text": "Name, company, title, and work email first, so your summary can be routed and delivered correctly."
      },
      {
        "num": "STEP 02",
        "title": "Answer 11 questions",
        "text": "Quick multiple-choice on your name, your market, your searches, and how your brand assets were created."
      },
      {
        "num": "STEP 03",
        "title": "See your profile",
        "text": "A five-area readiness profile with color-coded zones and your highest-priority gaps."
      },
      {
        "num": "STEP 04",
        "title": "Get the summary",
        "text": "Your profile and prioritized actions render inline and are queued for email follow-up."
      }
    ],
    "areasLabel": "The five areas",
    "areasTitleHTML": "Where brand value <em>quietly leaks away.</em>",
    "areasLede": "This is a readiness check, not a legal clearance search. It surfaces the issues that most often turn a promising name into a problem — so you know what a real clearance and filing should look at.",
    "areas": [
      {
        "tag": "A · Name strength",
        "title": "Is the name protectable at all?",
        "text": "Invented and arbitrary names are strong and easy to defend. Descriptive names — that say what you do — are hard to register and hard to enforce."
      },
      {
        "tag": "B · Conflict risk",
        "title": "Is someone already using it?",
        "text": "A name that collides with an existing mark in a related field invites refusals and disputes. A real knockout search looks well beyond a quick web check."
      },
      {
        "tag": "C · Use & rights",
        "title": "What rights have you actually secured?",
        "text": "Using a name builds some rights; a federal registration secures far more. Heavy investment with no registration is exposure."
      },
      {
        "tag": "D · Filing coverage",
        "title": "Right classes, right footprint?",
        "text": "Multi-state and online businesses generally need federal protection in the right goods-and-services classes — not a single state filing."
      },
      {
        "tag": "E · Digital & assets",
        "title": "Do you own your own brand?",
        "text": "Matching domains and handles, and signed IP assignments for logos and brand work, determine whether the brand is truly yours."
      }
    ],
    "getTitleHTML": "A profile that tells you <em>what to fix first.</em>",
    "whatYouGet": [
      "Readiness score across five brand-protection areas, color-coded",
      "Your three highest-priority gaps to resolve, ranked",
      "Plain-English notes on what a real clearance and filing should cover",
      "A summary delivered through the approved follow-up workflow",
      "Optional consultation with Jeff in two clicks"
    ],
    "captureKicker": "Step 1 of 12 · Where to send your profile",
    "captureTitleHTML": "Where should we send your <em>brand-protection profile?</em>",
    "captureSub": "Your personalized profile renders on screen and a copy is emailed to you. No login required.",
    "consentText": "I'd like my profile emailed to me and understand Whiteford · Schell IP may follow up. This tool is general information, not legal advice or a trademark clearance opinion, and creates no attorney-client relationship. I won't submit confidential or privileged information.",
    "dimensions": [
      {
        "key": "strength",
        "label": "Name strength"
      },
      {
        "key": "conflict",
        "label": "Conflict risk"
      },
      {
        "key": "rights",
        "label": "Use & rights"
      },
      {
        "key": "coverage",
        "label": "Filing coverage"
      },
      {
        "key": "digital",
        "label": "Digital & assets"
      }
    ],
    "questions": [
      {
        "dim": "strength",
        "dimLabel": "Name strength",
        "text": "How would you describe your brand name?",
        "options": [
          {
            "text": "An invented or coined word (e.g., a made-up term)",
            "weight": 1
          },
          {
            "text": "A real word unrelated to what you sell",
            "weight": 1
          },
          {
            "text": "Suggestive — hints at what you do",
            "weight": 2
          },
          {
            "text": "Descriptive — it says what you do, or it's a personal/place name",
            "weight": 4
          }
        ]
      },
      {
        "dim": "strength",
        "dimLabel": "Name strength",
        "text": "Does the name describe a feature, ingredient, or the product category itself?",
        "options": [
          {
            "text": "No — it's fully distinct from the product",
            "weight": 1
          },
          {
            "text": "Partly",
            "weight": 3
          },
          {
            "text": "Yes — it's descriptive",
            "weight": 4
          },
          {
            "text": "Not sure",
            "weight": 3
          }
        ]
      },
      {
        "dim": "conflict",
        "dimLabel": "Conflict risk",
        "text": "Have you searched the USPTO database and the web for similar names in your industry?",
        "options": [
          {
            "text": "Yes — a thorough knockout search",
            "weight": 1
          },
          {
            "text": "A quick web/Google search only",
            "weight": 3
          },
          {
            "text": "No search yet",
            "weight": 4
          },
          {
            "text": "Not sure what was done",
            "weight": 3
          }
        ]
      },
      {
        "dim": "conflict",
        "dimLabel": "Conflict risk",
        "text": "Are there similar names used by others in a related field?",
        "options": [
          {
            "text": "None found",
            "weight": 1
          },
          {
            "text": "A few, but in unrelated fields",
            "weight": 2
          },
          {
            "text": "Yes — similar names in a related field",
            "weight": 4
          },
          {
            "text": "Haven't checked",
            "weight": 4
          }
        ]
      },
      {
        "dim": "conflict",
        "dimLabel": "Conflict risk",
        "text": "Have you received any objection, pushback, or cease-and-desist about the name?",
        "options": [
          {
            "text": "No",
            "weight": 1
          },
          {
            "text": "Informal pushback",
            "weight": 3
          },
          {
            "text": "Yes — a formal objection or C&D",
            "weight": 4
          },
          {
            "text": "Not yet in use",
            "weight": 1
          }
        ]
      },
      {
        "dim": "rights",
        "dimLabel": "Use & rights",
        "text": "What protection have you secured for the name?",
        "options": [
          {
            "text": "A federal trademark registration",
            "weight": 0
          },
          {
            "text": "An application is filed",
            "weight": 2
          },
          {
            "text": "State registration only",
            "weight": 2
          },
          {
            "text": "None",
            "weight": 4
          }
        ]
      },
      {
        "dim": "rights",
        "dimLabel": "Use & rights",
        "text": "How much have you invested in the name (branding, packaging, marketing, signage)?",
        "options": [
          {
            "text": "Significant — it's central to the business",
            "weight": 4
          },
          {
            "text": "Moderate",
            "weight": 2
          },
          {
            "text": "Minimal — still pre-launch",
            "weight": 1
          }
        ]
      },
      {
        "dim": "coverage",
        "dimLabel": "Filing coverage",
        "text": "Where do you operate or sell?",
        "options": [
          {
            "text": "Multiple states or online nationally",
            "weight": 3
          },
          {
            "text": "A single state / local",
            "weight": 1
          },
          {
            "text": "Not selling yet",
            "weight": 2
          }
        ]
      },
      {
        "dim": "coverage",
        "dimLabel": "Filing coverage",
        "text": "Do you know which trademark classes cover your goods and services?",
        "options": [
          {
            "text": "Yes — identified",
            "weight": 0
          },
          {
            "text": "Roughly",
            "weight": 2
          },
          {
            "text": "No",
            "weight": 4
          }
        ]
      },
      {
        "dim": "digital",
        "dimLabel": "Digital & assets",
        "text": "Do you own the matching .com and key social handles?",
        "options": [
          {
            "text": "All secured",
            "weight": 1
          },
          {
            "text": "Some",
            "weight": 2
          },
          {
            "text": "No",
            "weight": 3
          },
          {
            "text": "Not sure",
            "weight": 3
          }
        ]
      },
      {
        "dim": "digital",
        "dimLabel": "Digital & assets",
        "text": "Was your logo / brand created by someone with a signed IP assignment to the company?",
        "options": [
          {
            "text": "Yes — assignment signed",
            "weight": 0
          },
          {
            "text": "Employees only, no document",
            "weight": 2
          },
          {
            "text": "A contractor, assignment unclear",
            "weight": 4
          },
          {
            "text": "Not sure",
            "weight": 3
          }
        ]
      }
    ],
    "scoreLabel": "Brand-protection gaps",
    "result": {
      "intro": "{company}'s brand-protection readiness.",
      "tiers": [
        {
          "maxPct": 0.34,
          "label": "Well positioned",
          "cls": "tier-good",
          "blurb": "Your brand looks reasonably protectable and protected. A professional clearance search and filing strategy would confirm it and lock in your rights."
        },
        {
          "maxPct": 0.66,
          "label": "Gaps to close",
          "cls": "tier-warn",
          "blurb": "There are real gaps between what you've invested in this brand and what you've protected. Closing them before launch or rebrand is far cheaper than after a conflict surfaces."
        },
        {
          "maxPct": 1.01,
          "label": "Exposed brand",
          "cls": "tier-risk",
          "blurb": "This brand looks exposed — on strength, conflicts, or ownership of the assets themselves. These are the issues that turn into refusals, disputes, and forced rebrands, and they're worth resolving before you invest further."
        }
      ],
      "dimActions": {
        "conflict": [
          "Commission a real knockout / clearance search across the USPTO register and common-law uses before you invest further — a quick web search misses most conflicts.",
          "Resolve any existing objection or look-alike mark in a related field before launch or rebrand."
        ],
        "strength": [
          "Pressure-test the name's distinctiveness; a descriptive name may need to be reworked, supplemented, or supported by a different protection strategy to be registrable."
        ],
        "rights": [
          "File for federal trademark protection to convert your investment into enforceable, nationwide rights instead of relying on use alone."
        ],
        "coverage": [
          "Identify the correct goods-and-services classes and the right filing footprint for where you actually operate (multi-state and online usually means federal)."
        ],
        "digital": [
          "Secure signed IP assignments for your logo and brand assets, and lock down matching domains and handles, so the brand is unambiguously the company's."
        ]
      },
      "ctaTitle": "Turn this into a protected brand.",
      "ctaText": "A short call is the fastest way to scope a proper clearance search and filing strategy for your name and class footprint. Jeff can walk through your result and connect the Whiteford trademark and brand-protection resources that handle clearance, filing, and enforcement."
    },
    "resultDisclaimer": "This profile is general information and is not a trademark clearance opinion or legal advice; it creates no attorney-client relationship.",
    "byline": {
      "name": "Jeff Schell",
      "role": "Managing Partner, Mountain West · Whiteford Taylor & Preston · Patent Attorney · AI Advisor",
      "bio": "Jeff Schell is Managing Partner of Whiteford's Mountain West practice and a patent attorney focused on intellectual property and venture growth. He gives founders an IP and technology-law front door that connects into Whiteford's trademark, brand-protection, and enforcement resources."
    },
    "footerDisclaimer": "This tool is for general informational purposes only and is not legal advice or a trademark clearance opinion. Use of this tool does not create an attorney-client relationship between you, your company, and Whiteford Taylor & Preston LLP or Schell IP. Do not submit confidential, privileged, or trade-secret information through this tool. Any engagement is subject to a conflicts check and a written engagement letter. Attorney advertising. Prior results do not guarantee a similar outcome."
  },
  "patent-readiness": {
    "id": "patent-readiness-check",
    "tags": [
      "lead-magnet",
      "patent-readiness",
      "patents",
      "ip",
      "colorado"
    ],
    "kicker": "5-minute check · 11 questions",
    "titleHTML": "How to patent your idea — and what could <em>forfeit your rights first.</em>",
    "lede": "Most founders lose patent rights not at the patent office, but before they ever file — by disclosing, demoing, or selling too early, or by never papering who owns the invention. This check tells you whether your idea is patent-ready and what to lock down before a deadline you can't undo passes.",
    "ctaStart": "Start the readiness check",
    "meta": "No login · Inline result · Email summary",
    "preview": {
      "tag": "Whiteford · Schell IP sample result",
      "title": "Patent Readiness",
      "sub": "Prepared for [your company] · inline result + email summary",
      "bars": [
        {
          "label": "Novelty & prior art",
          "val": 6,
          "max": 8
        },
        {
          "label": "Disclosure timing",
          "val": 11,
          "max": 12
        },
        {
          "label": "Ownership",
          "val": 5,
          "max": 8
        },
        {
          "label": "Invention records",
          "val": 4,
          "max": 8
        },
        {
          "label": "Protection strategy",
          "val": 6,
          "max": 8
        }
      ],
      "actions": [
        "A public demo is planned in 90 days — the disclosure clock matters now.",
        "Contractor-built work without a signed assignment clouds ownership.",
        "No dated records of how and when the invention was developed."
      ]
    },
    "howTitleHTML": "Eleven questions. Five readiness areas. <em>One clear next step.</em>",
    "steps": [
      {
        "num": "STEP 01",
        "title": "Tell us where to send it",
        "text": "Name, company, title, and work email first, so your summary can be routed and delivered correctly."
      },
      {
        "num": "STEP 02",
        "title": "Answer 11 questions",
        "text": "Quick multiple-choice on your invention, who built it, what you've disclosed, and your timeline."
      },
      {
        "num": "STEP 03",
        "title": "See your profile",
        "text": "A five-area readiness profile with color-coded zones and your most time-sensitive issues."
      },
      {
        "num": "STEP 04",
        "title": "Get the summary",
        "text": "Your profile and prioritized actions render inline and are queued for email follow-up."
      }
    ],
    "areasLabel": "The five areas",
    "areasTitleHTML": "Where patent rights are <em>won or quietly lost.</em>",
    "areasLede": "Patentability and what to file are professional judgments — this check doesn't make them for you. It surfaces the readiness gaps and the timing traps that most often cost founders their rights before they ever talk to a patent attorney.",
    "areas": [
      {
        "tag": "A · Novelty & prior art",
        "title": "Is it new enough to patent?",
        "text": "An invention has to be new and non-obvious over what already exists. A real prior-art picture shapes whether — and how — to file."
      },
      {
        "tag": "B · Disclosure timing",
        "title": "Have you started a clock you can't stop?",
        "text": "Public disclosure, sale, or an offer for sale can trigger bars to patenting. The U.S. grace period is limited, and most other countries have none. Timing is often the whole game."
      },
      {
        "tag": "C · Ownership",
        "title": "Who actually owns the invention?",
        "text": "Founders, employees, contractors, and AI-assisted work all raise ownership and inventorship questions that need to be documented before filing."
      },
      {
        "tag": "D · Invention records",
        "title": "Can you show how you got here?",
        "text": "Dated development records — and, for AI-assisted work, the human contribution — support inventorship and defensibility."
      },
      {
        "tag": "E · Protection strategy",
        "title": "Patent, trade secret, or both?",
        "text": "Not everything should be patented. The right mix of provisional filing, full application, and trade-secret protection depends on your product and budget."
      }
    ],
    "getTitleHTML": "A profile that tells you <em>what to do before you file.</em>",
    "whatYouGet": [
      "Readiness score across five areas, color-coded by urgency",
      "Your three most time-sensitive actions, ranked",
      "Plain-English notes on disclosure bars and the grace period",
      "A summary delivered through the approved follow-up workflow",
      "Optional consultation with Jeff — a patent attorney — in two clicks"
    ],
    "captureKicker": "Step 1 of 12 · Where to send your profile",
    "captureTitleHTML": "Where should we send your <em>patent-readiness profile?</em>",
    "captureSub": "Your personalized profile renders on screen and a copy is emailed to you. No login required.",
    "consentText": "I'd like my profile emailed to me and understand Whiteford · Schell IP may follow up. This tool is general information, not legal advice or a patentability opinion, and creates no attorney-client relationship. I won't submit confidential, privileged, or trade-secret details — describe your invention only in general terms.",
    "dimensions": [
      {
        "key": "novelty",
        "label": "Novelty & prior art"
      },
      {
        "key": "timing",
        "label": "Disclosure timing"
      },
      {
        "key": "ownership",
        "label": "Ownership"
      },
      {
        "key": "records",
        "label": "Invention records"
      },
      {
        "key": "strategy",
        "label": "Protection strategy"
      }
    ],
    "questions": [
      {
        "dim": "novelty",
        "dimLabel": "Novelty & prior art",
        "text": "Have you searched existing patents and products for anything similar to your invention?",
        "options": [
          {
            "text": "Yes — a thorough search",
            "weight": 1
          },
          {
            "text": "A quick look",
            "weight": 3
          },
          {
            "text": "No",
            "weight": 4
          },
          {
            "text": "Not sure",
            "weight": 3
          }
        ]
      },
      {
        "dim": "novelty",
        "dimLabel": "Novelty & prior art",
        "text": "How different is your invention from what's already on the market?",
        "options": [
          {
            "text": "A clearly new approach",
            "weight": 1
          },
          {
            "text": "An improvement on existing products",
            "weight": 3
          },
          {
            "text": "Similar, with tweaks",
            "weight": 4
          },
          {
            "text": "Unsure",
            "weight": 3
          }
        ]
      },
      {
        "dim": "timing",
        "dimLabel": "Disclosure timing",
        "text": "Have you publicly disclosed, sold, or offered the invention for sale?",
        "options": [
          {
            "text": "Not yet — kept confidential",
            "weight": 1
          },
          {
            "text": "Only under NDA",
            "weight": 1
          },
          {
            "text": "Yes — within the last 12 months",
            "weight": 3
          },
          {
            "text": "Yes — more than 12 months ago",
            "weight": 4
          }
        ]
      },
      {
        "dim": "timing",
        "dimLabel": "Disclosure timing",
        "text": "Any public launch, demo, pitch, paper, or sale planned in the next 90 days?",
        "options": [
          {
            "text": "No",
            "weight": 1
          },
          {
            "text": "Yes — coming up",
            "weight": 4
          },
          {
            "text": "It already happened",
            "weight": 4
          },
          {
            "text": "Not sure",
            "weight": 3
          }
        ]
      },
      {
        "dim": "ownership",
        "dimLabel": "Ownership",
        "text": "Who created the invention?",
        "options": [
          {
            "text": "Founders/employees with IP assignment in place",
            "weight": 1
          },
          {
            "text": "Includes contractors or outside parties",
            "weight": 4
          },
          {
            "text": "A mix, some undocumented",
            "weight": 4
          },
          {
            "text": "AI tools did substantial work",
            "weight": 3
          }
        ]
      },
      {
        "dim": "ownership",
        "dimLabel": "Ownership",
        "text": "Are inventorship and ownership documented (assignments signed)?",
        "options": [
          {
            "text": "Yes",
            "weight": 0
          },
          {
            "text": "Partially",
            "weight": 2
          },
          {
            "text": "No",
            "weight": 4
          },
          {
            "text": "Not sure",
            "weight": 3
          }
        ]
      },
      {
        "dim": "records",
        "dimLabel": "Invention records",
        "text": "Do you keep dated records of how and when the invention was developed?",
        "options": [
          {
            "text": "Yes — systematic",
            "weight": 0
          },
          {
            "text": "Some",
            "weight": 2
          },
          {
            "text": "No",
            "weight": 4
          }
        ]
      },
      {
        "dim": "records",
        "dimLabel": "Invention records",
        "text": "For any AI-assisted work, do you record the human contribution?",
        "options": [
          {
            "text": "Yes",
            "weight": 1
          },
          {
            "text": "No",
            "weight": 4
          },
          {
            "text": "No AI used",
            "weight": 1
          },
          {
            "text": "Not sure",
            "weight": 3
          }
        ]
      },
      {
        "dim": "strategy",
        "dimLabel": "Protection strategy",
        "text": "What's your protection plan right now?",
        "options": [
          {
            "text": "A provisional or full application is planned",
            "weight": 1
          },
          {
            "text": "Trade-secret protection",
            "weight": 2
          },
          {
            "text": "Nothing yet",
            "weight": 4
          },
          {
            "text": "Not sure",
            "weight": 4
          }
        ]
      },
      {
        "dim": "strategy",
        "dimLabel": "Protection strategy",
        "text": "Have you set a budget and timeline for patent protection?",
        "options": [
          {
            "text": "Yes",
            "weight": 1
          },
          {
            "text": "A rough idea",
            "weight": 2
          },
          {
            "text": "No",
            "weight": 4
          }
        ]
      },
      {
        "dim": "novelty",
        "dimLabel": "Novelty & prior art",
        "text": "Will you need protection outside the United States?",
        "options": [
          {
            "text": "No — U.S. only",
            "weight": 1
          },
          {
            "text": "Yes — other countries matter",
            "weight": 3
          },
          {
            "text": "Possibly",
            "weight": 2
          },
          {
            "text": "Not sure",
            "weight": 3
          }
        ]
      }
    ],
    "scoreLabel": "Patent-readiness gaps",
    "result": {
      "intro": "{company}'s patent-readiness profile.",
      "tiers": [
        {
          "maxPct": 0.34,
          "label": "Filing-ready",
          "cls": "tier-good",
          "blurb": "You're in good shape to talk to a patent attorney about filing. A short professional assessment would confirm patentability and the right filing strategy."
        },
        {
          "maxPct": 0.66,
          "label": "Gaps before you file",
          "cls": "tier-warn",
          "blurb": "There are gaps to close before filing — most likely around ownership, records, or strategy. Worth resolving soon, especially if any public disclosure is on the horizon."
        },
        {
          "maxPct": 1.01,
          "label": "Act before you lose rights",
          "cls": "tier-risk",
          "blurb": "Your profile shows timing or ownership issues that can permanently forfeit patent rights — a planned or past disclosure, an undocumented inventor, or no records. These are worth addressing now, not later, because some deadlines can't be reopened."
        }
      ],
      "dimActions": {
        "timing": [
          "Talk to a patent attorney before your next public disclosure, demo, or sale — disclosure can start a clock that limits or eliminates your right to file, especially outside the U.S.",
          "If you've already disclosed, confirm whether you're still inside the limited U.S. grace period — this is time-sensitive."
        ],
        "ownership": [
          "Get signed assignments from every contributor — founders, employees, contractors — and resolve inventorship before filing, including for AI-assisted work."
        ],
        "records": [
          "Start keeping dated development records, and document the human contribution for any AI-assisted work, to support inventorship and defensibility."
        ],
        "novelty": [
          "Commission a prior-art assessment to shape whether — and how — to file, and to plan any non-U.S. protection."
        ],
        "strategy": [
          "Decide the right mix of provisional filing, full application, and trade-secret protection for your product and budget — not everything should be patented."
        ]
      },
      "ctaTitle": "Talk to a patent attorney before a deadline does.",
      "ctaText": "Jeff is a registered patent attorney. A short call is the fastest way to confirm whether your invention is patent-ready, whether any disclosure clock is running, and what to file first. He can walk through your result directly."
    },
    "resultDisclaimer": "This profile is general information and is not a patentability opinion or legal advice; it creates no attorney-client relationship.",
    "byline": {
      "name": "Jeff Schell",
      "role": "Managing Partner, Mountain West · Whiteford Taylor & Preston · Patent Attorney · AI Advisor",
      "bio": "Jeff Schell is a registered patent attorney and Managing Partner of Whiteford's Mountain West practice. A former two-time founder and venture investor, he helps Colorado technology companies protect inventions and build IP that holds up in financing, partnership, and sale."
    },
    "footerDisclaimer": "This tool is for general informational purposes only and is not legal advice or a patentability opinion. Use of this tool does not create an attorney-client relationship between you, your company, and Whiteford Taylor & Preston LLP or Schell IP. Do not submit confidential, privileged, or trade-secret information through this tool. Any engagement is subject to a conflicts check and a written engagement letter. Attorney advertising. Prior results do not guarantee a similar outcome."
  },
  "sale-readiness-audit": {
    "id": "sale-readiness-audit",
    "tags": [
      "lead-magnet",
      "sale-readiness",
      "ma-readiness",
      "investor-readiness",
      "corporate",
      "colorado"
    ],
    "kicker": "5-minute audit · 12 questions",
    "titleHTML": "Find the diligence friction that <em>drags down your valuation.</em>",
    "lede": "When you raise, sell, or take on a strategic partner, the buyer's lawyers go looking for problems — and every unsigned assignment, messy cap table, or unenforceable contract becomes a price cut, an escrow holdback, or a stalled deal. This audit finds that friction now, while you still have time to fix it on your terms.",
    "ctaStart": "Start the readiness audit",
    "meta": "No login · Inline result · Email summary",
    "preview": {
      "tag": "Whiteford · Schell IP sample result",
      "title": "Diligence Readiness",
      "sub": "Prepared for [your company] · inline result + email summary",
      "bars": [
        {
          "label": "Corporate & cap table",
          "val": 10,
          "max": 12
        },
        {
          "label": "IP ownership",
          "val": 8,
          "max": 12
        },
        {
          "label": "Contracts & customers",
          "val": 9,
          "max": 12
        },
        {
          "label": "Employment & people",
          "val": 6,
          "max": 10
        },
        {
          "label": "Data & privacy",
          "val": 5,
          "max": 8
        }
      ],
      "actions": [
        "IP not fully assigned from early contractors — a classic deal-killer.",
        "Customer contracts lack change-of-control / assignment terms.",
        "Restrictive covenants haven't been checked against Colorado law."
      ]
    },
    "howTitleHTML": "Twelve questions. Five diligence areas. <em>One friction map.</em>",
    "steps": [
      {
        "num": "STEP 01",
        "title": "Tell us where to send it",
        "text": "Name, company, title, and work email first, so your summary can be routed and delivered correctly."
      },
      {
        "num": "STEP 02",
        "title": "Answer 12 questions",
        "text": "Quick multiple-choice on your corporate records, IP, contracts, people, and data practices."
      },
      {
        "num": "STEP 03",
        "title": "See your map",
        "text": "A five-area friction map with color-coded zones and your highest-priority cleanup items."
      },
      {
        "num": "STEP 04",
        "title": "Get the summary",
        "text": "Your map and prioritized actions render inline and are queued for email follow-up."
      }
    ],
    "areasLabel": "The five areas",
    "areasTitleHTML": "Where deals <em>slow down, shrink, or die.</em>",
    "areasLede": "Diligence friction rarely kills a deal outright — it quietly costs you leverage, valuation, and time. These are the five areas a buyer's or investor's counsel probes first.",
    "areas": [
      {
        "tag": "A · Corporate & cap table",
        "title": "Is the company clean on paper?",
        "text": "Equity, options, SAFEs, notes, minutes, and consents all need to reconcile. A messy cap table or stale records is the first thing diligence finds."
      },
      {
        "tag": "B · IP ownership",
        "title": "Do you actually own your IP?",
        "text": "If founders, employees, or early contractors never assigned their work, the company may not own its core IP — a classic valuation hit or deal-breaker."
      },
      {
        "tag": "C · Contracts & customers",
        "title": "Will your contracts survive a sale?",
        "text": "Signed, current, assignable agreements with clean change-of-control terms — and no surprise concentration or exclusivity — keep a deal moving."
      },
      {
        "tag": "D · Employment & people",
        "title": "Are your people agreements compliant?",
        "text": "Enforceable, Colorado-compliant covenants and clean contractor classification keep employment off the issues list."
      },
      {
        "tag": "E · Data & privacy",
        "title": "Can your data practices withstand scrutiny?",
        "text": "A real privacy posture — aligned with applicable law and clean on AI and vendor data rights — is increasingly central to diligence."
      }
    ],
    "getTitleHTML": "A map you can <em>act on before you go to market.</em>",
    "whatYouGet": [
      "Friction score across five diligence areas, color-coded",
      "Your three highest-priority cleanup items, ranked",
      "Plain-English notes on what buyers and investors look for",
      "A summary delivered through the approved follow-up workflow",
      "Optional consultation with Jeff in two clicks"
    ],
    "captureKicker": "Step 1 of 13 · Where to send your map",
    "captureTitleHTML": "Where should we send your <em>diligence-friction map?</em>",
    "captureSub": "Your personalized map renders on screen and a copy is emailed to you. No login required.",
    "consentText": "I'd like my map emailed to me and understand Whiteford · Schell IP may follow up. This tool is general information, not legal advice, and creates no attorney-client relationship. I won't submit confidential or privileged information.",
    "dimensions": [
      {
        "key": "corporate",
        "label": "Corporate & cap table"
      },
      {
        "key": "ip",
        "label": "IP ownership"
      },
      {
        "key": "contracts",
        "label": "Contracts & customers"
      },
      {
        "key": "employment",
        "label": "Employment & people"
      },
      {
        "key": "data",
        "label": "Data & privacy"
      }
    ],
    "questions": [
      {
        "dim": "corporate",
        "dimLabel": "Corporate & cap table",
        "text": "Is your cap table clean and fully documented (equity, options, SAFEs, notes all papered)?",
        "options": [
          {
            "text": "Yes — reconciled and current",
            "weight": 0
          },
          {
            "text": "Mostly",
            "weight": 2
          },
          {
            "text": "Messy or uncertain",
            "weight": 4
          },
          {
            "text": "Not sure",
            "weight": 3
          }
        ]
      },
      {
        "dim": "corporate",
        "dimLabel": "Corporate & cap table",
        "text": "Are corporate records current (board minutes, consents, stock ledger)?",
        "options": [
          {
            "text": "Yes",
            "weight": 0
          },
          {
            "text": "Partially",
            "weight": 2
          },
          {
            "text": "No",
            "weight": 4
          },
          {
            "text": "Not sure",
            "weight": 3
          }
        ]
      },
      {
        "dim": "ip",
        "dimLabel": "IP ownership",
        "text": "Does the company own all its core IP via signed assignments from founders, employees, and contractors?",
        "options": [
          {
            "text": "Yes — all assigned",
            "weight": 0
          },
          {
            "text": "Mostly",
            "weight": 2
          },
          {
            "text": "Gaps, or early contractors never signed",
            "weight": 4
          },
          {
            "text": "Not sure",
            "weight": 4
          }
        ]
      },
      {
        "dim": "ip",
        "dimLabel": "IP ownership",
        "text": "Is your key IP actually protected (patents, trademarks, trade-secret program)?",
        "options": [
          {
            "text": "Yes",
            "weight": 1
          },
          {
            "text": "Some of it",
            "weight": 3
          },
          {
            "text": "No",
            "weight": 4
          },
          {
            "text": "Not sure",
            "weight": 3
          }
        ]
      },
      {
        "dim": "contracts",
        "dimLabel": "Contracts & customers",
        "text": "Are your customer and vendor contracts signed, current, and assignable (clean change-of-control terms)?",
        "options": [
          {
            "text": "Yes",
            "weight": 0
          },
          {
            "text": "Mostly",
            "weight": 2
          },
          {
            "text": "Old templates / unknown",
            "weight": 4
          },
          {
            "text": "Not sure",
            "weight": 3
          }
        ]
      },
      {
        "dim": "contracts",
        "dimLabel": "Contracts & customers",
        "text": "Any customer concentration or unusual terms (exclusivity, MFN, termination for convenience) a buyer might flag?",
        "options": [
          {
            "text": "None",
            "weight": 1
          },
          {
            "text": "Some",
            "weight": 3
          },
          {
            "text": "Yes, or unsure",
            "weight": 4
          }
        ]
      },
      {
        "dim": "employment",
        "dimLabel": "Employment & people",
        "text": "Are your restrictive covenants and employment agreements enforceable and Colorado-compliant?",
        "options": [
          {
            "text": "Yes — recently reviewed",
            "weight": 1
          },
          {
            "text": "No covenants in use",
            "weight": 2
          },
          {
            "text": "Not sure they're compliant",
            "weight": 4
          }
        ]
      },
      {
        "dim": "employment",
        "dimLabel": "Employment & people",
        "text": "Is your contractor classification (1099 vs. employee) clean and defensible?",
        "options": [
          {
            "text": "Yes",
            "weight": 1
          },
          {
            "text": "Mostly",
            "weight": 2
          },
          {
            "text": "Unsure / haven't reviewed",
            "weight": 4
          },
          {
            "text": "No contractors",
            "weight": 1
          }
        ]
      },
      {
        "dim": "data",
        "dimLabel": "Data & privacy",
        "text": "Do you have a privacy posture aligned with applicable law (e.g., the Colorado Privacy Act)?",
        "options": [
          {
            "text": "Yes — reviewed",
            "weight": 1
          },
          {
            "text": "Basic policy only",
            "weight": 3
          },
          {
            "text": "No",
            "weight": 4
          },
          {
            "text": "Not sure",
            "weight": 3
          }
        ]
      },
      {
        "dim": "data",
        "dimLabel": "Data & privacy",
        "text": "Any AI or data use a buyer's diligence might question (training-data rights, vendor terms, output ownership)?",
        "options": [
          {
            "text": "No",
            "weight": 1
          },
          {
            "text": "Some",
            "weight": 3
          },
          {
            "text": "Yes, or unsure",
            "weight": 4
          }
        ]
      },
      {
        "dim": "corporate",
        "dimLabel": "Corporate & cap table",
        "text": "How soon might you raise, sell, or take on a strategic partner?",
        "options": [
          {
            "text": "0–12 months",
            "weight": 4
          },
          {
            "text": "1–3 years",
            "weight": 2
          },
          {
            "text": "No timeline yet",
            "weight": 1
          }
        ]
      },
      {
        "dim": "contracts",
        "dimLabel": "Contracts & customers",
        "text": "Have you ever assembled a diligence data room?",
        "options": [
          {
            "text": "Yes",
            "weight": 0
          },
          {
            "text": "Partially",
            "weight": 2
          },
          {
            "text": "No",
            "weight": 3
          }
        ]
      }
    ],
    "scoreLabel": "Diligence friction",
    "result": {
      "intro": "{company}'s diligence-readiness profile.",
      "tiers": [
        {
          "maxPct": 0.34,
          "label": "Deal-ready",
          "cls": "tier-good",
          "blurb": "You look broadly ready for diligence. A focused pre-deal review would confirm it and tighten the few areas below before you go to market."
        },
        {
          "maxPct": 0.66,
          "label": "Friction to clear",
          "cls": "tier-warn",
          "blurb": "There's real diligence friction here — the kind that costs leverage and valuation rather than killing a deal. Clearing it before you go to market is far cheaper than negotiating against it mid-deal."
        },
        {
          "maxPct": 1.01,
          "label": "High diligence drag",
          "cls": "tier-risk",
          "blurb": "Your profile shows the issues that stall deals and shrink valuations — unassigned IP, messy records, or contracts that won't survive a sale. If a transaction is anywhere on your horizon, these are worth fixing now, while you still control the timeline."
        }
      ],
      "dimActions": {
        "ip": [
          "Close IP-ownership gaps now — get signed assignments from every founder, employee, and especially early contractors. Unassigned core IP is one of the most common deal-killers.",
          "Confirm your key IP is actually protected (patents, trademarks, a trade-secret program), since 'IP as a deal asset' is what buyers pay for."
        ],
        "corporate": [
          "Clean up and reconcile the cap table and corporate records (equity, options, SAFEs, notes, minutes, consents) before diligence — this is the first thing counsel checks."
        ],
        "contracts": [
          "Review customer and vendor contracts for signatures, currency, assignability, and change-of-control terms, and flag any concentration or unusual provisions before a buyer does."
        ],
        "employment": [
          "Confirm your restrictive covenants are enforceable and Colorado-compliant and your contractor classifications are defensible, so employment stays off the issues list."
        ],
        "data": [
          "Bring your privacy posture and AI/data practices into line with applicable law and clean up vendor and training-data rights, which increasingly drive diligence questions."
        ]
      },
      "ctaTitle": "Clean up the friction before you go to market.",
      "ctaText": "A short call is the fastest way to turn this map into a pre-deal cleanup plan — and to scope the work with the right hands on it. Jeff can walk through your result and connect the Whiteford corporate, M&A, IP, and employment resources that handle diligence readiness."
    },
    "resultDisclaimer": "This profile is general information about diligence readiness, not legal advice, and creates no attorney-client relationship.",
    "byline": {
      "name": "Jeff Schell",
      "role": "Managing Partner, Mountain West · Whiteford Taylor & Preston · Patent Attorney · AI Advisor",
      "bio": "Jeff Schell is Managing Partner of Whiteford's Mountain West practice. A former two-time founder, venture investor, and patent attorney, he helps Colorado companies get diligence-ready and connects them into Whiteford's corporate, M&A, private-capital, and IP resources."
    },
    "footerDisclaimer": "This tool is for general informational purposes only and is not legal advice. Use of this tool does not create an attorney-client relationship between you, your company, and Whiteford Taylor & Preston LLP or Schell IP. Do not submit confidential, privileged, or trade-secret information through this tool. Any engagement is subject to a conflicts check and a written engagement letter. Attorney advertising. Prior results do not guarantee a similar outcome."
  }
} as const satisfies Record<SearchMagnetRoute, SearchMagnetConfig>;

export function isSearchMagnetRoute(value: string): value is SearchMagnetRoute {
  return searchMagnetRoutes.includes(value as SearchMagnetRoute);
}

export function getSearchMagnetConfig(slug: SearchMagnetRoute) {
  return searchMagnetConfigs[slug];
}
