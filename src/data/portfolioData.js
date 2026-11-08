// ============================================================
// portfolioData.js — ALL content for the portfolio lives here.
// Components only read from this file.
// ============================================================

export const personalInfo = {
  name: "PACHIPALA SNEHALATHA REDDY",
  brandName: "PACHIPALA SNEHALATHA REDDY", // used for the big hero / footer typography
  role: "DATA ANALYTICS", // first word = bold, rest = light italic in the hero
  city: "Bengaluru, India",
  phone: "+91 79890 03300",
  email: "snehapachipa1a23@gmail.com",
};

export const academy = {
  name: "TAP Academy",
  url: "https://thetapacademy.com/",
};

export const socialLinks = {
  instagram: "",
  youtube: "",
  linkedin: "https://linkedin.com/in/sneha-pachipalapachipala",
  github: "https://github.com/snehapachipala123-jpg",
};

export const heroContent = {
  finalWord: "PORTFOLIO", // the word the big text scrambles into
  ctaLabel: "Contact",
};

export const aboutContent = {
  heading: "Intro",
  greeting: "Hey, I'm Snehalatha.",
  paragraph:
    "I am a hardworking and motivated B.Tech Computer Science graduate who enjoys learning new technologies, solving problems, and sharpening my skills through the placement training program at TAP Academy. My goal is to start my career in a good organization, gain practical experience, and grow professionally by turning complex data into clear, actionable business insights.",
  highlights: ["Python", "SQL", "Pandas", "NumPy", "Excel"],
};

export const skillRows = [
  {
    label: "Programming & Databases",
    items: ["Python", "SQL", "MySQL", "PostgreSQL", "Database Design", "Relational Queries"],
  },
  {
    label: "Data Analysis",
    items: ["Pandas", "NumPy", "Data Cleaning", "Exploratory Data Analysis", "Feature Engineering", "Statistical Analysis"],
  },
  {
    label: "Spreadsheets & BI",
    items: ["Microsoft Excel", "Advanced Formulas", "Pivot Tables", "VLOOKUP / XLOOKUP", "Data Modeling", "Executive Reports"],
  },
  {
    label: "Tools & Environments",
    items: ["Jupyter Notebook", "Git", "GitHub", "VS Code", "Google Colab", "Process Mining"],
  },
];

export const servicesContent = {
  headingLines: ["WHAT I", "CAN DO"],
  items: [
    {
      title: "DATA ANALYSIS & INSIGHTS",
      description:
        "I extract, clean, and analyze complex datasets to uncover hidden patterns and provide data-driven insights that empower businesses to make informed, strategic decisions.",
      capabilities: [
        "Data cleaning and preprocessing with Pandas & NumPy",
        "Exploratory Data Analysis (EDA) on structured datasets",
        "Identifying trends, correlations, and business KPIs",
        "Automating data reporting pipelines using Python",
        "Delivering clean, interpretable analytical summaries",
      ],
      cta: { label: "VIEW PROJECTS", href: "#projects" },
    },
    {
      title: "SQL & DATABASE QUERYING",
      description:
        "I design, query, and optimize relational databases to retrieve structured datasets accurately and efficiently for analytics and reporting workflows.",
      capabilities: [
        "Writing complex SQL queries, joins, and aggregations",
        "Database schema design and normalization",
        "Data extraction and transformation with MySQL",
        "Performance optimization and query indexing",
        "Data validation and integrity auditing",
      ],
    },
    {
      title: "SPREADSHEET & DASHBOARD MODELING",
      description:
        "I build dynamic Excel spreadsheets and visual reports that transform raw metrics into intuitive, executive-ready presentations.",
      capabilities: [
        "Advanced Excel formulas, VLOOKUP, and XLOOKUP",
        "Interactive Pivot Tables and dynamic charts",
        "Data reconciliation and automated spreadsheets",
        "Visual storytelling through KPI metric tracking",
        "Business report generation and presentation",
      ],
    },
    {
      title: "MACHINE LEARNING & FRAUD MODELING",
      description:
        "I apply predictive machine learning models and process mining techniques to detect anomalous behaviors, prevent fraud, and solve real-world predictive challenges.",
      capabilities: [
        "Supervised classification and anomaly detection",
        "Process mining for multi-participant transactions",
        "Feature engineering and model evaluation metrics",
        "Fraud detection pattern identification",
        "Scikit-learn pipeline implementation",
      ],
    },
  ],
};

// Words wrapped in *asterisks* are shown as light italic serif in gray.
export const projectsContent = {
  headingMain: "Selected",
  headingAccent: "work",
  description:
    "A showcase of real-world data analytics and machine learning projects, demonstrating data-driven problem solving and process optimization.",
  readMore: { label: "Read More", href: "#projects" },
  items: [
    {
      id: "project-1",
      number: "01",
      title: ["MULTI-PERSPECTIVE *fraud* DETECTION", "IN E-COMMERCE TRANSACTIONS"],
      description:
        "A machine learning-based fraud detection system engineered to identify fraudulent vs normal transactions in multi-participant e-commerce networks using process mining techniques and behavioral perspective modeling.",
      liveUrl: "https://github.com/snehapachipala123-jpg",
      githubUrl: "https://github.com/snehapachipala123-jpg",
    },
    {
      id: "project-2",
      number: "02",
      title: ["E-COMMERCE CUSTOMER *churn*", "PREDICTIVE ANALYTICS"],
      description:
        "An end-to-end analytics workflow that evaluates customer transaction history, identifies churn risk factors, and applies classification algorithms to help businesses proactively boost retention.",
      liveUrl: "https://github.com/snehapachipala123-jpg",
      githubUrl: "https://github.com/snehapachipala123-jpg",
    },
    {
      id: "project-3",
      number: "03",
      title: ["EXCEL SALES *analytics*", "& KPI PERFORMANCE DASHBOARD"],
      description:
        "A comprehensive corporate sales performance dashboard built in Microsoft Excel featuring automated data ingestion, interactive pivot filters, revenue forecasting, and regional profitability breakdowns.",
      liveUrl: "https://github.com/snehapachipala123-jpg",
      githubUrl: "https://github.com/snehapachipala123-jpg",
    },
    {
      id: "project-4",
      number: "04",
      title: ["HEALTHCARE DATA *insights*", "& PATIENT OUTCOME MODELING"],
      description:
        "An exploratory data analytics and statistical modeling project examining clinical indicators to uncover critical risk variables, correlation trends, and recovery outcomes across medical patient cohorts.",
      liveUrl: "https://github.com/snehapachipala123-jpg",
      githubUrl: "https://github.com/snehapachipala123-jpg",
    },
  ],
};

export const contactContent = {
  heading: "Get in touch",
  followLabel: "Follow us",
};

export const footerContent = {
  connectLabel: "Connect with me",
  navLinks: [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Projects", href: "#projects" },
  ],
  ctaHeading: "Let's build something",
  ctaText: "Open for full-time opportunities, internships, and data analytics collaborations.",
  ctaLabel: "Get in touch",
};

// EmailJS — values come from .env.local (variables must start with VITE_)
export const emailjsConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || "YOUR_EMAILJS_SERVICE_ID",
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "YOUR_EMAILJS_TEMPLATE_ID",
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "YOUR_EMAILJS_PUBLIC_KEY",
};
