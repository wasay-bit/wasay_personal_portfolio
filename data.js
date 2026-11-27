// All of the site's words live here (projects are in projects.js). Edit this file to change what
// the site says.
// Style: labels, headings, buttons and tags use Title Case; sentences stay as sentences.

export const meta = {
  title: "Wasay Omair | Security Engineering, IAM & Automation",
  description:
    "Explore Wasay Omair's cybersecurity portfolio, featuring experience in identity security, security engineering, cloud automation, defensive cybersecurity, and AI-assisted development.",
};

export const profile = {
  first: "Wasay",
  last: "Omair",
  initials: "WO",
  handle: "wasay",
  location: "Frisco, Texas",
  roles: [
    "Security Engineering",
    "Identity & Access Management",
    "Cloud Security",
    "Security Automation",
    "AI-Assisted Engineering",
    "Phishing & Email Security",
    "Defensive Cybersecurity",
  ],
  tagline: "Defensive Security, One Least-Privileged Account at a Time.",
  // Short intro. The terminal's "about" command reads this too.
  bio: [
    "I'm a Computer Information Systems & Technology student at The University of Texas at Dallas, and I build security tools around identity, access, and the cloud.",
    "As an Enterprise Identity & Access Management intern at Cloudflare, I design identity security automation, define the requirements and workflows, direct AI coding agents on the build, then integrate and test the results. At Austin Industries, I triaged phishing and email security incidents, ran vendor risk assessments, and wrote cybersecurity procedures and playbooks.",
  ],
  email: "wasayusa@gmail.com",
  linkedin: { label: "linkedin.com/in/wasay-omair", url: "https://www.linkedin.com/in/wasay-omair" },
  github: { label: "github.com/wasay-bit/wasay_personal_portfolio", url: "https://github.com/wasay-bit/wasay_personal_portfolio" },
  current: { role: "EIAM Intern", org: "Cloudflare", logo: "cloudflare" },
  badgeRole: "EIAM Intern",
  badgeStatus: "Access Granted",
  badgeTags: [
    { text: "Cloudflare", tone: "cf" },
    { text: "UT Dallas '27" },
    { text: "Identity Security" },
    { text: "Least Privilege" },
  ],
  // Which square of the stored photo to show on the badge, in pixels of the original image.
  photoCrop: { x: 465, y: 110, size: 580, width: 1536 },
  open: "Open to opportunities in security engineering, identity and access management, cloud security, cybersecurity operations, and security automation.",
  beyond:
    "Outside of cybersecurity, I'm a Formula 1 fan who likes to understand how things work. I'm always learning something new, and I like trying things out to see how they behave.",
};

export const focus = [
  { icon: "shield", title: "Identity Security", text: "SSO, role-based access, access reviews, and least privilege." },
  { icon: "code", title: "Security Engineering", text: "Building small tools that cut down manual security work." },
  { icon: "arrow", title: "Cloud & Automation", text: "Building cloud-based tools and using AI-assisted development to speed up my work." },
  { icon: "mail", title: "Defensive Security", text: "Phishing and email triage, vendor risk assessments, and clear procedures and playbooks." },
];

// `source` says which experience each number comes from; `detail` says what it measures.
export const stats = [
  {
    value: 596,
    suffix: "",
    label: "Reported Emails Analyzed",
    detail: "User-reported email tickets reviewed during phishing and email security triage.",
    source: "Austin Industries",
  },
  {
    value: 448,
    suffix: "",
    label: "Confirmed Phishing Threats",
    detail: "The reports confirmed as phishing.",
    source: "Austin Industries",
  },
  {
    value: 20,
    suffix: "+",
    label: "Vendor Risk Assessments",
    detail: "Security reviews of vendors using UpGuard ratings, with findings documented for compliance.",
    source: "Austin Industries",
  },
  {
    value: 80,
    suffix: "%",
    label: "Reduction In Fulfillment Errors",
    detail: "Achieved with a new process built on fulfillment and inventory data.",
    source: "Blue Ocean Sports",
  },
];

export const education = {
  school: "The University of Texas at Dallas",
  degree: "B.S. Computer Information Systems & Technology (MIS)",
  when: "Expected Dec 2027",
  gpa: "3.54",
  courses: ["Cybersecurity Governance", "Cybersecurity Risk Management", "Network & Information Security"],
  orgs: [
    {
      name: "Professional Program in IT at UT Dallas",
      role: "Member",
      when: "Jan 2026 – Present",
      url: "https://www.linkedin.com/in/ppit/",
    },
  ],
};

// `summary` is the one-line version shown while a card is collapsed.
export const experience = [
  {
    id: "cloudflare",
    role: "EIAM Business Enablement & Operations Intern",
    org: "Cloudflare",
    logo: "cloudflare",
    place: "Austin, TX",
    when: "Sept 2026 – Present",
    current: true,
    featured: true,
    summary: "Identity security, access governance, and AI-assisted automation on the Enterprise Identity & Access Management team.",
    points: [
      "Executed defensive security initiatives to strengthen overall enterprise security posture and mitigate unauthorized access risks.",
      "Optimized Enterprise Identity & Access Management (EIAM) by auditing user provisioning workflows and enforcing Role-Based Access Control (RBAC) across organizational units.",
      "Enforced the principle of least privilege by analyzing group ownership structures, reviewing access logs, and identifying over-privileged accounts.",
    ],
    tags: ["IAM", "SSO", "SAML", "OIDC", "RBAC", "Least Privilege", "Workers", "APIs", "AI Agents", "Automation", "GitLab", "Jira"],
  },
  {
    id: "austin-industries",
    article: {
      label: "Read My Internship Article",
      url: "https://www.linkedin.com/pulse/my-internship-experience-austin-industries-wasay-omair-qr3nc/",
    },
    role: "IT Cybersecurity Intern",
    org: "Austin Industries",
    logo: "austin",
    place: "Dallas, TX",
    when: "May 2026 – Sept 2026",
    summary: "Phishing and email security triage, vendor risk assessments, and security documentation.",
    points: [
      "Investigated and triaged cybersecurity events involving phishing, email security, web filtering blocks, and user-reported incidents using Mimecast, Microsoft Defender, and Zscaler.",
      "Conducted 20+ vendor risk assessments using UpGuard, reviewing external security ratings and documenting findings to support security control enforcement and compliance reviews.",
      "Authored cybersecurity procedures, knowledge base articles, SOPs, and playbooks to standardize operational processes and improve team effectiveness.",
    ],
    tags: ["Phishing Triage", "Email Security", "Microsoft Defender", "Mimecast", "Zscaler", "UpGuard", "SOPs & Playbooks", "Knowledge Base", "Incident Triage"],
  },
  {
    id: "blue-ocean-sports",
    role: "Technology Operations and Logistics Analyst",
    org: "Blue Ocean Sports",
    place: "Richardson, TX",
    when: "Jan 2025 – Jan 2026",
    summary: "Fulfillment and inventory data analysis, workflow optimization, and process improvement.",
    points: [
      "Standardized packing and order tracking processes, ensuring fulfillment of 150+ orders daily.",
      "Used project management practices to streamline fulfillment workflows and improve order tracking accuracy.",
      "Leveraged fulfillment and inventory data to implement a new business process that reduced fulfillment errors by 80%.",
    ],
    tags: ["Data Analysis", "Inventory", "Fulfillment", "Workflow Optimization", "Process Improvement", "Project Management"],
  },
];

// Each skill is [name, level]: "h" hands-on experience, "f" foundational knowledge,
// "l" currently learning. No percentage bars, on purpose.
export const skillLevels = { h: "Hands-On Experience", f: "Foundational Knowledge", l: "Currently Learning" };

export const skills = [
  {
    group: "Identity & Access Management",
    items: [["SSO", "h"], ["RBAC", "h"], ["Least Privilege", "h"], ["Access Governance", "h"], ["Access Reviews", "h"], ["SAML", "f"], ["OIDC", "f"], ["ABAC", "f"]],
  },
  {
    group: "Security Operations & Tools",
    items: [
      ["Phishing Analysis", "h"], ["Email Security", "h"], ["Vendor Risk", "h"], ["Security Automation", "h"],
      ["Microsoft Defender", "h"], ["Mimecast", "h"], ["Zscaler", "h"], ["KnowBe4 (PhishER)", "h"], ["UpGuard", "h"],
      ["MS Intune", "f"], ["Incident Response", "f"], ["Detection Engineering", "l"],
    ],
  },
  {
    group: "Cloud & Infrastructure",
    items: [["Cloudflare Workers", "h"], ["GitHub", "h"], ["GitLab", "h"], ["Jira", "h"], ["Azure", "f"], ["Linux", "f"], ["REST APIs", "f"]],
  },
  {
    group: "AI-Assisted Engineering",
    items: [["AI-Assisted Development", "h"], ["Directing Coding Agents", "h"], ["Workflow Design", "h"], ["Validation & Guardrails", "h"], ["Prompt Engineering", "h"], ["Integration & Testing", "h"]],
  },
  {
    group: "Programming & Data",
    items: [["Python", "f"], ["Java", "f"], ["SQL", "f"], ["MySQL", "f"], ["SQLite", "f"], ["Oracle", "f"], ["Excel", "h"], ["Tableau", "f"], ["Power BI", "f"], ["Alteryx", "f"]],
  },
  {
    group: "Frameworks & Standards",
    items: [["NIST CSF", "f"], ["ISO 27001", "f"], ["SOC 2", "f"], ["SOX", "f"], ["OSI Model", "f"]],
  },
];

// `url` (optional) is a verification link. `pending: true` means the exact title still needs
// confirming: it shows in the working view with a note and is left out of exported files.
export const certifications = [
  { name: "Junior Cyber Analyst", issuer: "Cisco" },
  { name: "Cybersecurity", issuer: "Google" },
  { name: "IT Support", issuer: "Google" },
  { name: "Intro to Programming Using Python", issuer: "Microsoft" },
];

export const learning = [
  { name: "Security+", issuer: "CompTIA", status: "In Progress", detail: "Studying for the certification exam." },
];

// "Beyond the Day-to-Day". No photos yet, so each entry draws a neutral placeholder tile.
export const involvement = [
  {
    id: "mimecast",
    alt: "Mimecast Elevate conference stage screen",
    url: "https://lnkd.in/p/gPNGdx4E",
    title: "Mimecast Elevate Conference",
    when: "2026",
    caption: "Attended during my cybersecurity internship at Austin Industries.",
  },
  {
    id: "ppit",
    logo: true,
    alt: "Professional Program in IT logo",
    title: "Professional Program in IT",
    url: "https://www.linkedin.com/in/ppit/",
    when: "January 2026 – Present",
    place: "UT Dallas",
    caption: "Member of the Professional Program in IT at The University of Texas at Dallas.",
  },
  {
    id: "cloudflare-first-week",
    alt: "Cloudflare office lobby in Austin with a colourful hanging installation and the Cloudflare logo",
    title: "My First Week at Cloudflare",
    url: "https://lnkd.in/p/gaEGJzNw",
    when: "October 2026",
    place: "Austin, TX",
    caption:
      "Started as an Enterprise IAM Business Enablement & Operations Intern on the Security team, after a summer as an IT Cybersecurity Intern at Austin Industries.",
  },
  {
    id: "austin-volunteering",
    alt: "Austin Industries interns and employee-owners posing at Feed My Starving Children",
    url: "https://lnkd.in/p/gMc-qWKF",
    title: "Volunteering With Austin Industries",
    when: "July 2026",
    place: "Dallas–Fort Worth, TX",
    caption:
      "Packed 22,032 meals with Austin Industries interns and employee-owners at Feed My Starving Children, in the fight against childhood hunger.",
  },
];


export const interests = [
  { title: "Formula 1", text: "The engineering and the strategy behind every race." },
  { title: "Building & Experimenting", text: "Trying new tools and building things to understand how they work." },
  { title: "Continuous Learning", text: "Always studying something. Right now, that's CompTIA Security+." },
  { title: "Community Involvement", text: "Sharing what I learn publicly, through LinkedIn posts and an article about my internship." },
];

export const recommendations = [
  {
    name: "Jerry (Jay) Blanchard, CISSP",
    title: "Cyber Security Manager at Austin Industries",
    relationship: "Managed Wasay Directly · June 2026",
    source: "LinkedIn",
    // Copied word for word from LinkedIn. Blank lines separate paragraphs.
    quote:
      "I have had the unique pleasure of managing Wasay during his Cybersecurity Internship with Austin Industries.\n\n" +
      "Just saying that he has been an exceptional person and exceptional addition to our team, although true, is an understatement. After his internship ends, he will forever be a part of our family.\n\n" +
      "I have found him to be dedicated, hard working, loyal, ethical and passionate. I truly foresee that the book he writes of his life and career is going to be great, and I am honored to have a small part in it.\n\n" +
      "If anyone is looking for an exceptional person to join their team, then I highly recommend Wasay Omair as that person.",
  },
];
