export type SignalStage = "Pre-Seed" | "Seed" | "Series A" | "Series B";

export type SignalListLink = {
  stage: SignalStage;
  href: string;
};

export type SignalVertical = {
  label: string;
  links: SignalListLink[];
};

export type SignalRegion = {
  label: string;
  href: string;
};

export const signalSource = {
  label: "NFX Signal investor lists",
  homepage: "https://signal.nfx.com",
  note:
    "Signal's public investor-list pages are used as source links for category and stage matching. The tool should not copy or republish Signal's full investor database; it should send users to Signal and store only categorical preferences unless a licensed/API data source is approved later.",
} as const;

export const investorOutreachStages = [
  "Find investors",
  "Identify introduction sources",
  "Connect with introducers",
  "Request introduction",
  "Meeting set with investor",
  "Follow up and data room",
  "Due diligence",
  "Funding",
  "Archive",
] as const;

export const signalVerticals = [
  {
    "label": "AI",
    "links": [
      {
        "stage": "Pre-Seed",
        "href": "https://signal.nfx.com/investor-lists/top-ai-pre-seed-investors"
      },
      {
        "stage": "Seed",
        "href": "https://signal.nfx.com/investor-lists/top-ai-seed-investors"
      },
      {
        "stage": "Series A",
        "href": "https://signal.nfx.com/investor-lists/top-ai-series-a-investors"
      },
      {
        "stage": "Series B",
        "href": "https://signal.nfx.com/investor-lists/top-ai-series-b-investors"
      }
    ]
  },
  {
    "label": "Generative Tech/AI",
    "links": [
      {
        "stage": "Pre-Seed",
        "href": "https://signal.nfx.com/investor-lists/top-generative-tech-pre-seed-investors"
      },
      {
        "stage": "Seed",
        "href": "https://signal.nfx.com/investor-lists/top-generative-tech-seed-investors"
      },
      {
        "stage": "Series A",
        "href": "https://signal.nfx.com/investor-lists/top-generative-tech-series-a-investors"
      },
      {
        "stage": "Series B",
        "href": "https://signal.nfx.com/investor-lists/top-generative-tech-series-b-investors"
      }
    ]
  },
  {
    "label": "SaaS",
    "links": [
      {
        "stage": "Pre-Seed",
        "href": "https://signal.nfx.com/investor-lists/top-saas-pre-seed-investors"
      },
      {
        "stage": "Seed",
        "href": "https://signal.nfx.com/investor-lists/top-saas-seed-investors"
      },
      {
        "stage": "Series A",
        "href": "https://signal.nfx.com/investor-lists/top-saas-series-a-investors"
      },
      {
        "stage": "Series B",
        "href": "https://signal.nfx.com/investor-lists/top-saas-series-b-investors"
      }
    ]
  },
  {
    "label": "Enterprise",
    "links": [
      {
        "stage": "Pre-Seed",
        "href": "https://signal.nfx.com/investor-lists/top-enterprise-pre-seed-investors"
      },
      {
        "stage": "Seed",
        "href": "https://signal.nfx.com/investor-lists/top-enterprise-seed-investors"
      },
      {
        "stage": "Series A",
        "href": "https://signal.nfx.com/investor-lists/top-enterprise-series-a-investors"
      },
      {
        "stage": "Series B",
        "href": "https://signal.nfx.com/investor-lists/top-enterprise-series-b-investors"
      }
    ]
  },
  {
    "label": "Enterprise Applications",
    "links": [
      {
        "stage": "Pre-Seed",
        "href": "https://signal.nfx.com/investor-lists/top-enterprise-applications-pre-seed-investors"
      },
      {
        "stage": "Seed",
        "href": "https://signal.nfx.com/investor-lists/top-enterprise-applications-seed-investors"
      },
      {
        "stage": "Series A",
        "href": "https://signal.nfx.com/investor-lists/top-enterprise-applications-series-a-investors"
      },
      {
        "stage": "Series B",
        "href": "https://signal.nfx.com/investor-lists/top-enterprise-applications-series-b-investors"
      }
    ]
  },
  {
    "label": "Enterprise Infrastructure",
    "links": [
      {
        "stage": "Pre-Seed",
        "href": "https://signal.nfx.com/investor-lists/top-enterprise-infrastructure-pre-seed-investors"
      },
      {
        "stage": "Seed",
        "href": "https://signal.nfx.com/investor-lists/top-enterprise-infrastructure-seed-investors"
      },
      {
        "stage": "Series A",
        "href": "https://signal.nfx.com/investor-lists/top-enterprise-infrastructure-series-a-investors"
      },
      {
        "stage": "Series B",
        "href": "https://signal.nfx.com/investor-lists/top-enterprise-infrastructure-series-b-investors"
      }
    ]
  },
  {
    "label": "FinTech",
    "links": [
      {
        "stage": "Pre-Seed",
        "href": "https://signal.nfx.com/investor-lists/top-fintech-pre-seed-investors"
      },
      {
        "stage": "Seed",
        "href": "https://signal.nfx.com/investor-lists/top-fintech-seed-investors"
      },
      {
        "stage": "Series A",
        "href": "https://signal.nfx.com/investor-lists/top-fintech-series-a-investors"
      },
      {
        "stage": "Series B",
        "href": "https://signal.nfx.com/investor-lists/top-fintech-series-b-investors"
      }
    ]
  },
  {
    "label": "BioTech",
    "links": [
      {
        "stage": "Pre-Seed",
        "href": "https://signal.nfx.com/investor-lists/top-biotech-pre-seed-investors"
      },
      {
        "stage": "Seed",
        "href": "https://signal.nfx.com/investor-lists/top-biotech-seed-investors"
      },
      {
        "stage": "Series A",
        "href": "https://signal.nfx.com/investor-lists/top-biotech-series-a-investors"
      },
      {
        "stage": "Series B",
        "href": "https://signal.nfx.com/investor-lists/top-biotech-series-b-investors"
      }
    ]
  },
  {
    "label": "Digital Health",
    "links": [
      {
        "stage": "Pre-Seed",
        "href": "https://signal.nfx.com/investor-lists/top-digital-health-pre-seed-investors"
      },
      {
        "stage": "Seed",
        "href": "https://signal.nfx.com/investor-lists/top-digital-health-seed-investors"
      },
      {
        "stage": "Series A",
        "href": "https://signal.nfx.com/investor-lists/top-digital-health-series-a-investors"
      },
      {
        "stage": "Series B",
        "href": "https://signal.nfx.com/investor-lists/top-digital-health-series-b-investors"
      }
    ]
  },
  {
    "label": "Medical Devices",
    "links": [
      {
        "stage": "Pre-Seed",
        "href": "https://signal.nfx.com/investor-lists/top-medical-devices-pre-seed-investors"
      },
      {
        "stage": "Seed",
        "href": "https://signal.nfx.com/investor-lists/top-medical-devices-seed-investors"
      },
      {
        "stage": "Series A",
        "href": "https://signal.nfx.com/investor-lists/top-medical-devices-series-a-investors"
      },
      {
        "stage": "Series B",
        "href": "https://signal.nfx.com/investor-lists/top-medical-devices-series-b-investors"
      }
    ]
  },
  {
    "label": "ClimateTech/CleanTech",
    "links": [
      {
        "stage": "Pre-Seed",
        "href": "https://signal.nfx.com/investor-lists/top-climatetech-cleantech-pre-seed-investors"
      },
      {
        "stage": "Seed",
        "href": "https://signal.nfx.com/investor-lists/top-climatetech-cleantech-seed-investors"
      },
      {
        "stage": "Series A",
        "href": "https://signal.nfx.com/investor-lists/top-climatetech-cleantech-series-a-investors"
      },
      {
        "stage": "Series B",
        "href": "https://signal.nfx.com/investor-lists/top-climatetech-cleantech-series-b-investors"
      }
    ]
  },
  {
    "label": "DeepTech",
    "links": [
      {
        "stage": "Pre-Seed",
        "href": "https://signal.nfx.com/investor-lists/top-deeptech-pre-seed-investors"
      },
      {
        "stage": "Seed",
        "href": "https://signal.nfx.com/investor-lists/top-deeptech-seed-investors"
      },
      {
        "stage": "Series A",
        "href": "https://signal.nfx.com/investor-lists/top-deeptech-series-a-investors"
      },
      {
        "stage": "Series B",
        "href": "https://signal.nfx.com/investor-lists/top-deeptech-series-b-investors"
      }
    ]
  },
  {
    "label": "Developer Tools",
    "links": [
      {
        "stage": "Pre-Seed",
        "href": "https://signal.nfx.com/investor-lists/top-developer-tools-pre-seed-investors"
      },
      {
        "stage": "Seed",
        "href": "https://signal.nfx.com/investor-lists/top-developer-tools-seed-investors"
      },
      {
        "stage": "Series A",
        "href": "https://signal.nfx.com/investor-lists/top-developer-tools-series-a-investors"
      },
      {
        "stage": "Series B",
        "href": "https://signal.nfx.com/investor-lists/top-developer-tools-series-b-investors"
      }
    ]
  },
  {
    "label": "Cybersecurity",
    "links": [
      {
        "stage": "Pre-Seed",
        "href": "https://signal.nfx.com/investor-lists/top-cybersecurity-pre-seed-investors"
      },
      {
        "stage": "Seed",
        "href": "https://signal.nfx.com/investor-lists/top-cybersecurity-seed-investors"
      },
      {
        "stage": "Series A",
        "href": "https://signal.nfx.com/investor-lists/top-cybersecurity-series-a-investors"
      },
      {
        "stage": "Series B",
        "href": "https://signal.nfx.com/investor-lists/top-cybersecurity-series-b-investors"
      }
    ]
  },
  {
    "label": "Data Services",
    "links": [
      {
        "stage": "Pre-Seed",
        "href": "https://signal.nfx.com/investor-lists/top-data-services-pre-seed-investors"
      },
      {
        "stage": "Seed",
        "href": "https://signal.nfx.com/investor-lists/top-data-services-seed-investors"
      },
      {
        "stage": "Series A",
        "href": "https://signal.nfx.com/investor-lists/top-data-services-series-a-investors"
      },
      {
        "stage": "Series B",
        "href": "https://signal.nfx.com/investor-lists/top-data-services-series-b-investors"
      }
    ]
  },
  {
    "label": "Hardware",
    "links": [
      {
        "stage": "Pre-Seed",
        "href": "https://signal.nfx.com/investor-lists/top-hardware-pre-seed-investors"
      },
      {
        "stage": "Seed",
        "href": "https://signal.nfx.com/investor-lists/top-hardware-seed-investors"
      },
      {
        "stage": "Series A",
        "href": "https://signal.nfx.com/investor-lists/top-hardware-series-a-investors"
      },
      {
        "stage": "Series B",
        "href": "https://signal.nfx.com/investor-lists/top-hardware-series-b-investors"
      }
    ]
  },
  {
    "label": "Robotics",
    "links": [
      {
        "stage": "Pre-Seed",
        "href": "https://signal.nfx.com/investor-lists/top-robotics-pre-seed-investors"
      },
      {
        "stage": "Seed",
        "href": "https://signal.nfx.com/investor-lists/top-robotics-seed-investors"
      },
      {
        "stage": "Series A",
        "href": "https://signal.nfx.com/investor-lists/top-robotics-series-a-investors"
      },
      {
        "stage": "Series B",
        "href": "https://signal.nfx.com/investor-lists/top-robotics-series-b-investors"
      }
    ]
  },
  {
    "label": "Manufacturing",
    "links": [
      {
        "stage": "Pre-Seed",
        "href": "https://signal.nfx.com/investor-lists/top-manufacturing-pre-seed-investors"
      },
      {
        "stage": "Seed",
        "href": "https://signal.nfx.com/investor-lists/top-manufacturing-seed-investors"
      }
    ]
  },
  {
    "label": "Marketplaces",
    "links": [
      {
        "stage": "Pre-Seed",
        "href": "https://signal.nfx.com/investor-lists/top-marketplaces-pre-seed-investors"
      },
      {
        "stage": "Seed",
        "href": "https://signal.nfx.com/investor-lists/top-marketplaces-seed-investors"
      },
      {
        "stage": "Series A",
        "href": "https://signal.nfx.com/investor-lists/top-marketplaces-series-a-investors"
      },
      {
        "stage": "Series B",
        "href": "https://signal.nfx.com/investor-lists/top-marketplaces-series-b-investors"
      }
    ]
  },
  {
    "label": "Consumer Internet",
    "links": [
      {
        "stage": "Pre-Seed",
        "href": "https://signal.nfx.com/investor-lists/top-consumer-internet-pre-seed-investors"
      },
      {
        "stage": "Seed",
        "href": "https://signal.nfx.com/investor-lists/top-consumer-internet-seed-investors"
      },
      {
        "stage": "Series A",
        "href": "https://signal.nfx.com/investor-lists/top-consumer-internet-series-a-investors"
      },
      {
        "stage": "Series B",
        "href": "https://signal.nfx.com/investor-lists/top-consumer-internet-series-b-investors"
      }
    ]
  },
  {
    "label": "GovTech",
    "links": [
      {
        "stage": "Pre-Seed",
        "href": "https://signal.nfx.com/investor-lists/top-govtech-pre-seed-investors"
      },
      {
        "stage": "Seed",
        "href": "https://signal.nfx.com/investor-lists/top-govtech-seed-investors"
      },
      {
        "stage": "Series A",
        "href": "https://signal.nfx.com/investor-lists/top-govtech-series-a-investors"
      },
      {
        "stage": "Series B",
        "href": "https://signal.nfx.com/investor-lists/top-govtech-series-b-investors"
      }
    ]
  },
  {
    "label": "DefenseTech",
    "links": [
      {
        "stage": "Pre-Seed",
        "href": "https://signal.nfx.com/investor-lists/top-defensetech-pre-seed-investors"
      },
      {
        "stage": "Seed",
        "href": "https://signal.nfx.com/investor-lists/top-defensetech-seed-investors"
      },
      {
        "stage": "Series A",
        "href": "https://signal.nfx.com/investor-lists/top-defensetech-series-a-investors"
      },
      {
        "stage": "Series B",
        "href": "https://signal.nfx.com/investor-lists/top-defensetech-series-b-investors"
      }
    ]
  },
  {
    "label": "LegalTech",
    "links": [
      {
        "stage": "Pre-Seed",
        "href": "https://signal.nfx.com/investor-lists/top-legaltech-pre-seed-investors"
      },
      {
        "stage": "Seed",
        "href": "https://signal.nfx.com/investor-lists/top-legaltech-seed-investors"
      },
      {
        "stage": "Series A",
        "href": "https://signal.nfx.com/investor-lists/top-legaltech-series-a-investors"
      },
      {
        "stage": "Series B",
        "href": "https://signal.nfx.com/investor-lists/top-legaltech-series-b-investors"
      }
    ]
  },
  {
    "label": "Space",
    "links": [
      {
        "stage": "Pre-Seed",
        "href": "https://signal.nfx.com/investor-lists/top-space-pre-seed-investors"
      },
      {
        "stage": "Seed",
        "href": "https://signal.nfx.com/investor-lists/top-space-seed-investors"
      }
    ]
  },
  {
    "label": "Supply Chain Tech",
    "links": [
      {
        "stage": "Pre-Seed",
        "href": "https://signal.nfx.com/investor-lists/top-supply-chain-tech-pre-seed-investors"
      },
      {
        "stage": "Seed",
        "href": "https://signal.nfx.com/investor-lists/top-supply-chain-tech-seed-investors"
      },
      {
        "stage": "Series A",
        "href": "https://signal.nfx.com/investor-lists/top-supply-chain-tech-series-a-investors"
      },
      {
        "stage": "Series B",
        "href": "https://signal.nfx.com/investor-lists/top-supply-chain-tech-series-b-investors"
      }
    ]
  },
  {
    "label": "Web3/Blockchain",
    "links": [
      {
        "stage": "Pre-Seed",
        "href": "https://signal.nfx.com/investor-lists/top-web3-blockchain-pre-seed-investors"
      },
      {
        "stage": "Seed",
        "href": "https://signal.nfx.com/investor-lists/top-web3-blockchain-seed-investors"
      },
      {
        "stage": "Series A",
        "href": "https://signal.nfx.com/investor-lists/top-web3-blockchain-series-a-investors"
      },
      {
        "stage": "Series B",
        "href": "https://signal.nfx.com/investor-lists/top-web3-blockchain-series-b-investors"
      }
    ]
  }
] satisfies SignalVertical[];

export const signalRegions = [
  {
    "label": "Colorado / Utah",
    "href": "https://signal.nfx.com/investor-lists/top-colorado-utah-investors"
  },
  {
    "label": "San Francisco Bay Area",
    "href": "https://signal.nfx.com/investor-lists/top-san-francisco-bay-area-investors"
  },
  {
    "label": "New York City",
    "href": "https://signal.nfx.com/investor-lists/top-new-york-city-investors"
  },
  {
    "label": "Boston / New England",
    "href": "https://signal.nfx.com/investor-lists/top-boston-new-england-investors"
  },
  {
    "label": "Austin",
    "href": "https://signal.nfx.com/investor-lists/top-austin-investors"
  },
  {
    "label": "Los Angeles / Southern California",
    "href": "https://signal.nfx.com/investor-lists/top-los-angeles-southern-california-investors"
  },
  {
    "label": "Seattle / Portland",
    "href": "https://signal.nfx.com/investor-lists/top-seattle-portland-investors"
  },
  {
    "label": "Washington, D.C.",
    "href": "https://signal.nfx.com/investor-lists/top-washington-d-c-investors"
  },
  {
    "label": "Midwest",
    "href": "https://signal.nfx.com/investor-lists/top-midwest-investors"
  },
  {
    "label": "Raleigh-Durham / Southeast US",
    "href": "https://signal.nfx.com/investor-lists/top-raleigh-durham-southeast-us-investors"
  },
  {
    "label": "Canada",
    "href": "https://signal.nfx.com/investor-lists/top-canada-investors"
  },
  {
    "label": "London",
    "href": "https://signal.nfx.com/investor-lists/top-london-investors"
  },
  {
    "label": "Israel",
    "href": "https://signal.nfx.com/investor-lists/top-israel-investors"
  }
] satisfies SignalRegion[];
