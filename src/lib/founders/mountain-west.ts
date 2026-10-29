/**
 * Content for /founders/mountain-west. Every resource listed in mountainWestStates must be verified
 * against the organization's official site before it is added (see the page footer's review date).
 */

export type MwResource = { name: string; url: string; description: string };
export type MwGroup = { title: string; items: MwResource[] };
export type MwState = { id: string; name: string; intro: string; groups: MwGroup[] };

export const mountainWestSteps: { title: string; body: string; tool?: { href: string; label: string } }[] = [
  {
    title: "Pick the entity and the state",
    body: "Decide between an LLC and a corporation, and whether to form in your home state or Delaware. Venture-backed companies usually form a Delaware C corporation and register in the state where they operate.",
    tool: { href: "/founders/entity-chooser", label: "Entity Chooser" },
  },
  {
    title: "Form and register",
    body: "File with the Secretary of State or Division of Corporations, get an EIN from the IRS, and register for state taxes and, once you hire, unemployment insurance.",
  },
  {
    title: "Issue founder equity cleanly",
    body: "Issue founder stock with vesting, assign the founders' existing IP to the company, and file any 83(b) elections within 30 days.",
    tool: { href: "/founders/83b-election", label: "83(b) Prep Sheet" },
  },
  {
    title: "Lock down IP ownership",
    body: "Get confidentiality and invention assignment agreements from everyone who builds anything, including contractors, before the work starts.",
    tool: { href: "/founders/ip-ownership-audit", label: "IP Ownership Audit" },
  },
  {
    title: "Use the free help",
    body: "Small Business Development Centers, SCORE mentors, university programs and state economic development offices offer free counseling and, in some cases, grants. The lists below are a starting point.",
  },
];

/** Each listing was checked against the organization's official site in October 2026. */
export const mountainWestStates: MwState[] = [
  {
    id: "colorado",
    name: "Colorado",
    intro:
      "Colorado runs most new-business registration online through the Secretary of State and MyBizColorado, and pairs a statewide Small Business Development Center network with state grant and capital programs aimed at advanced industries.",
    groups: [
      {
        title: "Form and register",
        items: [
          { name: "Colorado Secretary of State: business filings", url: "https://www.coloradosos.gov/pubs/business/fileAForm.html", description: "File formation documents online, such as articles of organization for an LLC or articles of incorporation for a corporation, and register an out-of-state company to do business in Colorado." },
          { name: "MyBizColorado", url: "https://mybiz.colorado.gov/", description: "One place to apply for a sales tax license and wage withholding account, and to open an unemployment insurance account with the Department of Labor and Employment." },
          { name: "Colorado Department of Revenue: new businesses", url: "https://tax.colorado.gov/new-businesses", description: "Step-by-step guidance on which state tax accounts a new business needs and how to register for them." },
          { name: "Colorado State Directory of New Hires", url: "https://childsupport.colorado.gov/new-hire-reporting", description: "Where employers report new hires; the state asks employers to report each new hire within 20 calendar days." },
        ],
      },
      {
        title: "State programs and capital",
        items: [
          { name: "OEDIT Advanced Industries Accelerator Program", url: "https://oedit.colorado.gov/advanced-industries-business-accelerator-grant", description: "State grants for Colorado's advanced industries, including early-stage capital grants for technology companies and proof-of-concept grants through research institutions. Check the page for current application windows." },
          { name: "Colorado Startup Loan Fund", url: "https://oedit.colorado.gov/colorado-startup-loan-fund", description: "Startup loans made through participating mission-based lenders rather than by the state; you apply to the lender directly." },
          { name: "Colorado Venture Capital Authority", url: "https://oedit.colorado.gov/category/venture-capital-authority-fund", description: "A state authority that invests in private venture funds that back Colorado companies; founders reach it through those funds." },
        ],
      },
      {
        title: "Free counseling",
        items: [
          { name: "Colorado Small Business Development Center Network", url: "https://sbdc.colorado.gov/about/colorado-small-business-development-center-sbdc", description: "No-cost advising and training through regional centers across the state." },
          { name: "Colorado SBDC TechSource", url: "https://sbdc.colorado.gov/programs-resources/techsource", description: "Free advising for science and technology founders on SBIR/STTR and other non-dilutive funding, including help with proposal costs." },
          { name: "SCORE Denver & Wyoming", url: "https://score.org/denver", description: "Free volunteer mentoring for businesses in Metro Denver, Northern Colorado and southeast Wyoming." },
          { name: "SBA Colorado District Office", url: "https://www.sba.gov/district/colorado", description: "Local SBA office for loan programs, government contracting certifications and referrals to partner counselors." },
        ],
      },
      {
        title: "Universities",
        items: [
          { name: "Deming Center for Entrepreneurship, CU Boulder", url: "https://www.colorado.edu/business/deming", description: "Entrepreneurship courses, venture programs and events connecting CU Boulder with the Boulder startup community." },
          { name: "Venture Partners at CU Boulder", url: "https://www.colorado.edu/venturepartners/about-us", description: "Licenses CU research to startups and runs programs including NSF I-Corps and SBIR/STTR grant-writing support for CU-connected founders." },
          { name: "CSU Institute for Entrepreneurship", url: "https://innovate.colostate.edu/", description: "Colorado State programming open to CSU affiliates and members of the Colorado community." },
          { name: "Colorado School of Mines: Tech Transfer and Beck Venture Center", url: "https://ventures.mines.edu/for-startups/", description: "Support for startups built on Mines technology, with mentors, prototyping resources and investor connections." },
          { name: "University of Denver: technology transfer for startups", url: "https://du.edu/techtransfer/entrepreneurship", description: "Licenses DU-owned intellectual property to faculty and student startups." },
        ],
      },
      {
        title: "Accelerators, incubators and associations",
        items: [
          { name: "Techstars Boulder Accelerator", url: "https://www.techstars.com/accelerators/boulder-accelerator", description: "A three-month, mentorship-driven accelerator program based in Boulder." },
          { name: "Innosphere", url: "https://www.innosphere.org", description: "Incubation programs, lab space and capital for science and technology startups." },
          { name: "Colorado Technology Association", url: "https://coloradotechnology.org/about/", description: "Statewide technology industry association offering membership, events and policy advocacy." },
          { name: "Colorado BioScience Association", url: "https://cobioscience.com", description: "Life sciences industry association focused on capital, networking, policy and workforce." },
          { name: "Colorado Startup Week", url: "https://www.costartupweek.com", description: "A free, statewide week of entrepreneur programming (formerly Denver Startup Week)." },
          { name: "Boulder Startup Week", url: "https://boulderstartupweek.com", description: "A free community festival of startup programming held each spring in Boulder." },
        ],
      },
      {
        title: "Patents and trademarks",
        items: [
          { name: "USPTO: Colorado resources", url: "https://www.uspto.gov/about-us/uspto-office-locations/colorado", description: "The USPTO's Denver regional office has permanently closed; this page lists the Colorado resources that remain and the regional contact. In-person regional outreach now runs from the Mountain West office at the University of Utah (see Utah)." },
          { name: "Denver Public Library Patent and Trademark Resource Center", url: "https://denverlibrary.org/patents", description: "A USPTO-designated library center with free patent and trademark search resources and one-on-one appointments with a librarian." },
          { name: "ProBoPat", url: "https://micasaresourcecenter.org/probopat/", description: "The USPTO-sponsored patent pro bono program for Colorado and neighboring states, matching income-qualified inventors with volunteer patent practitioners." },
        ],
      },
    ],
  },
  {
    id: "utah",
    name: "Utah",
    intro:
      "Utah registers new businesses through a single state portal, and its startup support now runs largely through the Governor's Office of Economic Development, the state's Startup State Initiative and the Nucleus Institute, alongside university programs and the USPTO's new Mountain West office in Salt Lake City.",
    groups: [
      {
        title: "Form and register",
        items: [
          { name: "Utah Business Registration", url: "https://businessregistration.utah.gov/", description: "One application that registers a business with the Department of Commerce, the State Tax Commission and the Department of Workforce Services. It replaced the former OneStop Business Registration system." },
          { name: "Utah Division of Corporations and Commercial Code", url: "https://corporations.utah.gov/", description: "The state office for entity registrations, renewals and business name questions." },
          { name: "Utah State Tax Commission: business", url: "https://tax.utah.gov/business", description: "Business tax accounts and licenses, and online filing through Taxpayer Access Point." },
          { name: "Utah DWS: new hire reporting", url: "https://jobs.utah.gov/UI/Employer/Public/Newhire/NewHireReportingOptions.aspx", description: "Report new hires to the state and manage your unemployment insurance employer account." },
        ],
      },
      {
        title: "State programs and capital",
        items: [
          { name: "Governor's Office of Economic Development", url: "https://business.utah.gov/", description: "Utah's economic development office (formerly the Governor's Office of Economic Opportunity, or Go Utah), covering incentives, grants and entrepreneur programs." },
          { name: "Startup State Initiative", url: "https://startup.utah.gov/", description: "The state's guide for founders, covering registration, funding sources, SBDCs and SBIR support." },
          { name: "Nucleus Institute", url: "https://www.nucleusutah.org/", description: "A state-created institute for commercializing research and deep technology, with funding programs and SBIR/STTR support." },
          { name: "Nucleus Grow", url: "https://www.nucleusutah.org/grow", description: "Help preparing SBIR/STTR proposals through workshops and one-on-one sessions (successor to the Utah Innovation Center)." },
        ],
      },
      {
        title: "Free counseling",
        items: [
          { name: "Utah Small Business Development Centers", url: "https://utahsbdc.org/", description: "Free consulting and low-cost training across the state, plus an online entrepreneur academy." },
          { name: "SCORE Utah", url: "https://www.score.org/ut/utah/", description: "Free volunteer mentoring for Utah businesses." },
          { name: "SBA Utah District Office", url: "https://www.sba.gov/district/utah", description: "Local SBA office in Salt Lake City for funding programs, counseling referrals and government contracting help." },
        ],
      },
      {
        title: "Universities",
        items: [
          { name: "Lassonde Entrepreneur Institute, University of Utah", url: "https://lassonde.utah.edu/", description: "Programs for student founders, including seed grants, a startup academy, Lassonde Studios and the Utah Entrepreneur Challenge." },
          { name: "University of Utah Technology Licensing Office", url: "https://technologylicensing.utah.edu/", description: "Licenses University of Utah research and offers grants to develop university technologies (formerly the PIVOT Center)." },
          { name: "BYU Rollins Center for Entrepreneurship and Technology", url: "https://rollins.byu.edu", description: "Mentoring, competitions, courses and clubs for BYU student founders." },
          { name: "Center for Entrepreneurship, Utah State University", url: "https://huntsman.usu.edu/ecenter/competition-resources/mentors", description: "One-on-one mentoring, startup competitions and entrepreneurship coursework at the Huntsman School of Business." },
        ],
      },
      {
        title: "Community, capital and associations",
        items: [
          { name: "Silicon Slopes", url: "https://siliconslopes.com/about", description: "A nonprofit for Utah's startup and technology community, offering events, education and networking, including the annual Silicon Slopes Summit." },
          { name: "Kickstart", url: "https://kickstart.com/", description: "A pre-seed and seed venture investor focused on Utah and Colorado." },
          { name: "BioUtah", url: "https://bioutah.org/membership/join-bioutah/", description: "Utah's life sciences industry association, with a membership level for companies in their first years." },
        ],
      },
      {
        title: "Patents and trademarks",
        items: [
          { name: "USPTO Mountain West Community Engagement Office", url: "https://www.uspto.gov/about-us/news-updates/utah-selected-new-uspto-community-engagement-office-location", description: "The USPTO's regional outreach office at the University of Utah's Research Park, offering IP education and outreach for an eight-state region that includes Colorado." },
          { name: "J. Willard Marriott Library Patent and Trademark Resource Center", url: "https://campusguides.lib.utah.edu/patents", description: "Patent and trademark search help and classes at the University of Utah." },
          { name: "Utah Tech University Library Patent and Trademark Resource Center", url: "https://utahtech.libguides.com/patents", description: "A USPTO-designated resource center in St. George." },
          { name: "ProBoPat", url: "https://micasaresourcecenter.org/probopat/", description: "Free patent help for income-qualified Utah inventors through volunteer patent practitioners." },
        ],
      },
    ],
  },
  {
    id: "federal",
    name: "Federal programs for both states",
    intro: "Non-dilutive federal research funding is available to small businesses in every Mountain West state.",
    groups: [
      {
        title: "Research funding",
        items: [
          { name: "SBIR and STTR programs", url: "https://www.sbir.gov", description: "Federal research and development funding for small businesses, reauthorized in 2026. The Colorado SBDC's TechSource program and Utah's Nucleus Grow both help with proposals." },
        ],
      },
    ],
  },
  {
    id: "wyoming-idaho",
    name: "Wyoming and Idaho",
    intro: "For founders forming or operating in the rest of the region:",
    groups: [
      {
        title: "Form, register and get free help",
        items: [
          { name: "Wyoming Secretary of State: Business Center", url: "https://wyobiz.wyo.gov/Business/RegistrationInstr.aspx", description: "Online formation, name searches, annual reports and certificates of good standing." },
          { name: "Wyoming SBDC Network", url: "https://www.wyomingsbdc.org/about", description: "No-cost, confidential advising and training, hosted by the University of Wyoming." },
          { name: "Idaho Secretary of State: SOSBiz", url: "https://sosbiz.idaho.gov/", description: "Online business filings, annual reports, trademark registrations and business search." },
          { name: "Idaho SBDC", url: "https://idahosbdc.org/", description: "No-cost consulting through university-affiliated regional offices across Idaho." },
        ],
      },
    ],
  },
];
