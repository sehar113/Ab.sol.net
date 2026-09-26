import React, { useState, useEffect, useRef } from 'react';
import './css/home.css'; // Home Page CSS CONNECTION

const HERO_SLIDES = [
  {
    eyebrow: 'ABSOLUTE SOLUTION',
    title: 'Finance IT & ',
    titleEm: 'Cyber Security Solutions and Services',
    description:
      'Protect your business with Raptor Eye, a premier Cybersecurity Solution from Saudi Arabia, USA, and Australia. Advanced SIEM, SOAR, Threat Intelligence, and more. Real-time threat detection guaranteed.  ',
  },
  {
    eyebrow: 'ABSOLUTE SOLUTION',
    title: 'Logistics ',
    titleEm: 'AI Consulting Services & SQL Data Analytics',
    description:
      "With over 18 years of experience, Absolute Solution delivers excellence through nearshore software development, co development software, and advanced ai agent development services. We empower Riyadh and KSA enterprises with scalable data warehouse consulting, sql data analytics, data analytics ai, spatial analytics, and ai supply chain automated supply solutions. Streamline your operations with our enterprise DMS, CMS, human resources services, and Visage....",
  },
  {
    eyebrow: 'ABSOLUTE SOLUTION',
    title: 'OneDrive -',
    titleEm: 'Cloud Storage Services & Software Development Company',
    description:
      'Empower your enterprise across Saudi Arabia, USA, and Australia with high-performance cloud storage services, cloud based data storage, and secure cloud file storage solutions. As a trusted software development company, Absolute Solution integrates enterprise aws web services, google cloud platform, and scalable cloud technology services.',
  },
];

const SERVICE_FIELDS = {
  default: [
    { id: 'qName', label: 'Full Name', type: 'text' },
    { id: 'qEmail', label: 'Email Address', type: 'email' },
    { id: 'qPhone', label: 'Phone Number', type: 'tel' },
    { id: 'qMessage', label: 'Tell us about your requirement', type: 'textarea' },
  ],
};

/* =====================================================
   REAL COMPANY STATS (ab-sol.net se)
===================================================== */
const TRUST_STATS = [
  { value: 20, suffix: '+', label: 'Years of Experience', desc: 'For over two decades, we have built and measured software that runs in production. Our journey reflects an unwavering commitment to engineering excellence, industry best practices, and adapting to modern technological shifts. By continuously refining our development lifecycles and software architectures, we ensure that every digital solution we deliver remains robust, scalable, and tailored to long-term business goals.' },
  { value: 54, suffix: '', label: 'Experts Team', desc: 'Our executive team has guided the company through 20 years of continuous growth, including maintaining 100% client delivery. Alongside our core technical capabilities, our specialists excel in driving advanced SEO strategies, high-performing digital marketing, and user-centric UI/UX design. By combining deep technical proficiency with data-driven optimization, we ensure that every platform we launch scales effectively and delivers maximum digital impact.' },
  { value: 375, suffix: '', label: 'Projects Completed', desc: 'Absolute Solutions has set up a strong dedicated development team with wide expertise in PHP, JavaScript, and other technologies necessary for successful product delivery. Our team consists of several back-end software developers, a team lead, a QA specialist, and a project manager. Together with the client’s team and other distributed teams, we collaborate on the back-end of the website.' },
  { value: 340, suffix: '+', label: 'Happy Clients', desc: 'Trusted by enterprises across KSA, the US, UK, and Australia, we take pride in building long-lasting partnerships driven by transparency and exceptional results. Our commitment to quality software delivery, responsive communication, and continuous post-launch support ensures that every client achieves measurable business growth. We continuously adapt to evolving market demands to deliver secure, scalable, and high-performance digital solutions worldwide.' },
];

/* =====================================================
   REAL CLIENT LOGOS
===================================================== */
const TRUST_LOGOS = [
  { name: 'IBM',            img: '/images/IBM.png',       fallback: 'IBM' },
  { name: 'HP',             img: '/images/HP.png',        fallback: 'HP' },
  { name: 'Fortinet',       img: '/images/Fortinet.png',  fallback: 'FORTINET' },
  { name: 'Oracle',         img: '/images/Oracle.png',    fallback: 'ORACLE' },
  { name: 'Imperva',        img: '/images/Imperva.png',   fallback: 'IMPERVA' },
  { name: 'Microrage',      img: '/images/Microrage.png', fallback: 'MICRORAGE' },
  { name: 'Silver Peak',    img: '/images/SilverPeak.png',fallback: 'SILVER PEAK' },
  { name: 'GFi',            img: '/images/GFi.png',       fallback: 'GFi' },
  { name: 'Array Networks', img: '/images/ArrayNetworks.png', fallback: 'ARRAY NETWORKS' },
  { name: 'Paragon',        img: '/images/Paragon.svg',   fallback: 'PARAGON' },
];

/* =====================================================
   GLOBAL CERTIFICATIONS (old website se)
===================================================== */
const COMPLIANCE_CERTS = [
  {
    name: 'ISO 27001:2022 Certification',
    subtitle: 'Information Security Management System',
    desc: 'This certificate demonstrates our commitment to maintaining the highest standards of information security management. ISO 27001:2022 certification validates that Absolute Solutions has implemented robust security controls and risk management processes to protect client data and information assets.',
    img: '/images/certs/iso27001.png',
  },
  {
    name: 'ISO 9001:2015 Certification',
    subtitle: 'Quality Management System',
    desc: 'Our ISO 9001:2015 certification reflects our dedication to quality management and continuous improvement. This internationally recognized standard ensures that we consistently provide products and services that meet customer and regulatory requirements.',
    img: '/images/certs/iso9001.png',
  },
];

/* =====================================================
   GOOGLE G LOGO (official colors)
===================================================== */
const GoogleG = ({ size = 16 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);

/* =====================================================
   GOOGLE REVIEWS (real reviews — Google Maps se)
===================================================== */
const GOOGLE_REVIEWS = [
  {
    name: 'Sehar Dev ',
    meta: '1 review',
    stars: 5,
    time: '4 months ago',
    text: 'Absolute Solutions is a professional and reliable IT company in Riyadh. Their team is skilled, cooperative, and delivers high-quality software solutions on time. Highly recommended for anyone looking for modern and efficient IT services.',
    color: '#4285F4',
  },
  {
    name: 'moazzam qau',
    meta: '3 reviews',
    stars: 5,
    time: 'a year ago',
    text: 'Experienced and Professional staff. Deliver Project within time frame.',
    color: '#34A853',
  },
  {
    name: 'Mirza Munir Baig',
    meta: 'Local Guide · 47 reviews',
    stars: 4,
    time: '2 years ago',
    text: 'Very experts and genius IT people.',
    color: '#EA4335',
  },
  {
    name: 'Mahar Junaid',
    meta: '2 reviews',
    stars: 5,
    time: 'a year ago',
    text: 'I have a good experience.',
    color: '#FBBC05',
  },
  {
    name: 'programming solution',
    meta: '1 review',
    stars: 4,
    time: '4 years ago',
    text: 'Heard good remarks about this company.',
    color: '#7C4DFF',
  },
];

/* =====================================================
   CLIENT OUTCOMES BY INDUSTRY (luxury image cards)
===================================================== */
const INDUSTRY_OUTCOMES = [
  {
    id: 'banking',
    num: '01',
    theme: 'indigo',
    img: '/images/banking services.jpg',
    title: 'Banking Services',
    tag: 'Financial Technology & Digital Banking',
    desc: 'IT Infrastructure Services for Banking and Financial Companies:With 20 years of experience in IT for banking and financial services, Absolute Solutions builds and manages secure, reliable, and future-proof IT infrastructures for clients in these industries.IT infrastructure services enable banking and financial services companies to maintain uninterrupted, secure, and cost-effective IT operations through tailored infrastructure design, continuous monitoring, rapid issue resolution, and strategic optimization of infrastructure components. Absolute solutions  team can build and manage your IT infrastructure according to ITSM best practices to ensure business continuity, protect sensitive financial data, and avoid compliance breaches.',
    solutions: [
      { name: 'Account Statement', href: 'https://ab-sol.net/account-statement' },
      { name: 'Billing & VAT (EMS)', href: 'https://ab-sol.net/billing-vat-ems' },
      { name: 'Customer Account Master Data', href: 'https://ab-sol.net/customer-account-master-data' },
      { name: 'Federal Reporting', href: 'https://ab-sol.net/federal-reporting' },
      { name: 'MCI Link Application', href: 'https://ab-sol.net/mci-link-application' },
      { name: 'IPO Management Module', href: 'https://ab-sol.net/ipo-management-module' },
      { name: 'Auction Bidding System', href: 'https://ab-sol.net/auction-bidding' },
    ],
    cta: { label: 'Explore banking services', href: 'https://ab-sol.net/banking-services' },
  },
  {
    id: 'saas',
    num: '02',
    theme: 'crimson',
    img: '/images/Software-as-a-Service.jpg',
    title: 'Software as a Service',
    tag: 'Cloud-hosted platforms',
    desc: 'Software as a Service:The intelligent platform to manage the life cycle of your software needs. Software-as-a-Service applications is the best business solution delivery model of the latest generation — where the application is hosted remotely on the solution providers infrastructure.',
    solutions: [
      { name: 'Inventory Control & Management', href: 'https://ab-sol.net/inventory-control-management-solutions' },
      { name: 'Raptor Eye Solution', href: 'https://ab-sol.net/raptor-eye-solution' },
      { name: 'Document Management Solution', href: 'https://ab-sol.net/document-management-solution' },
    ],
    cta: { label: 'Explore SaaS platforms', href: 'https://ab-sol.net/software-as-a-service' },
  },
  {
    id: 'products',
    num: '03',
    theme: 'teal',
    img: '/images/Product-services-provider.jpg',
    title: 'Products',
    tag: 'Healthcare software products',
    desc: 'SOFTWARE SOLUTION FOR HEALTH INDUSTRY: An excellent national growth always requires a robust healthcare system because electronic health records provide safer and more reliable prescriptions. They also help in legible and complete documentation of patients medical history, so would not you like to check what Absolute Solutions offers you in the healthcare industry?',
    solutions: [
      { name: 'SMARTONCO', href: 'https://ab-sol.net/smartonco' },
      { name: 'Medical Care Registries', href: 'https://ab-sol.net/medical-care-registries' },
      { name: 'Medical & Health Care Solutions', href: 'https://ab-sol.net/medical-healthcare-industries-solutions' },
    ],
    cta: { label: 'Explore our products', href: 'https://ab-sol.net/products' },
  },
  {
    id: 'outsourcing',
    num: '04',
    theme: 'slate',
    img: '/images/Cyber-security-services-provider.jpg',
    title: 'Outsourcing Services',
    tag: 'Staffing & dedicated teams',
    desc: 'ABSOL STAFFING AND OUTSOURCING — Bringing up the right talent for your business can be the ultimate need of any successful business. If you are looking to outsource your staffing requirements, via Absolute Solutions, you can access the talent pool you would not otherwise access.Absolute Solutions provides comprehensive AI development, software development, business application development, healthcare technology, QA and testing, IBM integration, Maximo outsourcing, and IT staffing services.',
    solutions: [
      { name: 'AI Development & Outsourcing', href: 'https://ab-sol.net/artificial-intelligence-development-outsourcing-services' },
      { name: 'IBM Sphere + Message Brokers Staffing', href: 'https://ab-sol.net/ibm-sphere-message-brokers-staffing-outsourcing' },
      { name: 'Business Application Development', href: 'https://ab-sol.net/business-application-development' },
      { name: 'Health Care Services & Outsourcing', href: 'https://ab-sol.net/health-care-services-outsourcing' },
      { name: 'QA & Testing Services & Outsourcing', href: 'https://ab-sol.net/quality-assurance-testing-services-outsourcing' },
      { name: 'Maximo Outsourcing', href: 'https://ab-sol.net/maximo-outsourcing' },
    ],
    cta: { label: 'Explore outsourcing services', href: 'https://ab-sol.net/outsourcing-services' },
  },
];

const INDUSTRIES = [
  { name: 'Banking & Finance', desc: 'Core banking modernization, payment platforms, reconciliation automation, and regulatory reporting for banks and fintechs.', tags: ['Digital Banking', 'Payments', 'RegTech'] },
  { name: 'Healthcare & Life Sciences', desc: 'Secure patient registries, oncology management, and clinical analytics built for compliance and scale.', tags: ['EHR', 'Registries', 'Clinical Analytics'] },
  { name: 'Logistics & Supply Chain', desc: 'Fleet intelligence, warehouse management, and real-time shipment tracking across the region.', tags: ['Fleet Analytics', 'WMS', 'Tracking'] },
  { name: 'Retail & E-commerce', desc: 'Omnichannel commerce, inventory intelligence, and customer loyalty platforms.', tags: ['Omnichannel', 'Inventory', 'Loyalty'] },
  { name: 'Telecom', desc: 'OSS/BSS modernization, network automation, and billing transformation.', tags: ['OSS/BSS', 'Billing', 'Automation'] },
  { name: 'Energy & Utilities', desc: 'Smart metering, grid monitoring, and field-service management platforms.', tags: ['IoT', 'Smart Grid', 'Field Service'] },
  { name: 'Government & Public Sector', desc: 'Citizen-centric digital services and secure, compliant infrastructure.', tags: ['e-Gov', 'Compliance', 'Security'] },
  { name: 'Education', desc: 'Learning management systems and digital campus experiences.', tags: ['LMS', 'EdTech', 'Portals'] },
];

const TESTIMONIALS = [
  {
    quote: "Absolute Solution didn't just deliver a platform — they rebuilt how our engineering organization thinks about delivery. Six months in, our release frequency tripled.",
    name: 'James Carter',
    role: 'CTO, UK Financial Group',
    initials: 'JC',
  },
  {
    quote: 'Their cybersecurity team found what three previous vendors missed. The remediation roadmap was clear, prioritized, and actually executed on time.',
    name: 'Sarah Al-Otaibi',
    role: 'CISO, KSA Enterprise',
    initials: 'SA',
  },
  {
    quote: 'From discovery to launch in 14 weeks. The nearshore model gave us senior engineers in our time zone without the enterprise price tag.',
    name: 'Michael Chen',
    role: 'VP Product, US Logistics',
    initials: 'MC',
  },
];

const AWARDS = [
  { name: 'Top Software Development Company', org: 'Clutch', year: '2024' },
  { name: 'Best Cybersecurity Solution Provider', org: 'GSA UK', year: '2023' },
  { name: 'Data & Analytics Services Leader', org: 'ISG Provider Lens', year: '2024' },
  { name: 'ISO 27001:2022 Certified', org: 'Information Security', year: '2022' },
  { name: 'Microsoft Solutions Partner', org: 'Azure & Data', year: '2024' },
  { name: 'AWS Select Tier Partner', org: 'Cloud Services', year: '2024' },
];

const INSIGHTS = [
  { cat: 'AI & Data', title: 'How enterprise teams turn AI adoption into measurable delivery impact', date: 'Jan 12, 2025', read: '6 min read', theme: 'indigo' },
  { cat: 'Engineering', title: 'Nearshore vs offshore: building teams that actually ship on time', date: 'Dec 28, 2024', read: '8 min read', theme: 'teal' },
  { cat: 'Cybersecurity', title: 'Zero-trust readiness checklist for Saudi enterprises in 2025', date: 'Dec 15, 2024', read: '5 min read', theme: 'crimson' },
];

const CONTACT_SERVICES = [
  'Software Development',
  'Web Development & UI/UX',
  'Mobile Application Development',
  'Cyber Security & VAPT Services',
  'AI Consulting and Implementation',
  'Data Warehouse Consulting',
  'Cloud Migration & DevOps',
  'IT Staffing',
];

/* =====================================================
   RESOURCES / PDF DOWNLOADS (old website ke PDFs)
===================================================== */
const RESOURCES = {
  featured: {
    tag: 'Research Profile',
    title: 'AI Advantages Profile',
    desc: 'How enterprises across KSA, USA & Australia are using AI to predict threats, automate operations, and cut costs — real numbers, frameworks, and deployment models inside.',
    pdf: 'https://ab-sol.com/pdf/AI%20Advantages%20Profile.pdf',
    meta: '23 Pages · PDF · Free Download',
  },
  brochures: [
    {
      tag: 'AI Security',
      title: 'AI-Powered Cybersecurity',
      desc: 'Leverage AI to predict, detect, and respond to cyber threats in real-time — powered by our Raptor Eye security stack.',
      pdf: 'https://ab-sol.com/pdf/AI%20Advantages%20Profile.pdf',
    },
    {
      tag: 'AI Automation',
      title: 'Intelligent Automation',
      desc: 'Transform business processes with AI-driven automation to reduce costs and improve operational efficiency.',
      pdf: 'https://ab-sol.com/pdf/AI%20Advantages%20Profile.pdf',
    },
  ],
};

/* =====================================================
   ENGAGEMENT PHASES (N-iX style — apna content)
===================================================== */
const PHASES = [
  {
    num: '01',
    name: 'Assess',
    duration: '2 Weeks',
    title: 'Deep-dive into your codebase, cloud environment & delivery pipeline',
    desc: 'Our engineers work directly with your team to understand your technology landscape, software architecture, codebase, cloud environment, and existing workflows. We assess opportunities for AI strategy, AI workflow automation, generative AI, application modernization, and enterprise software development, identifying technical gaps, potential use cases, implementation requirements, and expected business impact.',
    points: [
      'Full codebase, workflow & technology assessment',
      'AI strategy, gap analysis & cost estimation',
      'Executive-ready assessment report',
    ],
  },
  {
    num: '02',
    name: 'Pilot',
    duration: '4–6 Weeks',
    title: 'Implement the highest-value AI workflow first',
    desc: 'A senior engineering team takes the most valuable opportunity from strategy to implementation. We develop and integrate a production-ready AI-powered workflow, AI application, or AI agent within your real technology environment, working with your existing cloud, data, security, and software infrastructure. Whether the opportunity involves AI software development, generative AI development, or AI agent development, success metrics are agreed before development begins.',
    points: [
      'Production-ready AI workflow or AI application',
      'AI agent development & integration',
      'Baseline metrics agreed upfront',
    ],
  },
  {
    num: '03',
    name: 'Expand',
    duration: '3–6 Months',
    title: 'Scale proven AI solutions across your organisation',
    desc: 'Once the pilot demonstrates measurable results, we expand proven solutions across engineering, QA, operations, and business teams. Our enterprise software development, software development consulting, cloud application development, and DevOps expertise helps integrate successful AI workflows into your wider technology environment.',
    points: [
      'Multi-team AI & software rollout plan',
      'Cloud, DevOps & workflow integration',
      'Playbooks, documentation & internal training',
    ],
  },
  {
    num: '04',
    name: 'eXceed',
    duration: 'Ongoing',
    title: 'Continuously optimise AI, automation & digital transformation',
    desc: 'AI adoption does not end with deployment. We continuously measure performance against real delivery and business metrics, identifying opportunities for AI orchestration, intelligent automation, cloud optimization, and digital transformation. Where the results support further automation, we introduce advanced AI agents, generative AI solutions, and automated workflows across development, deployment, and operational processes.',
    points: [
      'Quarterly AI impact & performance reviews',
      'AI orchestration, automation & optimisation',
      'Continuous digital transformation with no lock-in',
    ],
  },
];

/* =====================================================
   WHAT WE DO — SERVICES DIRECTORY DATA (N-iX style)
===================================================== */
const SERVICES_DIRECTORY = [
  {
    id: 'banking',
    num: '01',
    tab: 'Banking & Finance',
    tag: 'Banking & Financial Technology',
    title: 'Digital Banking Solutions & Financial Technology Provider',
    desc: 'Absolute Solutions provides innovative digital banking solutions and financial technology services designed to help financial institutions improve efficiency, security, and customer experience. We help banks modernize core banking systems, streamline customer onboarding and digital onboarding, strengthen risk and fraud management, and deliver secure payment solutions. Our banking software and digital banking platform capabilities support customer engagement, KYC processes, loan origination, and scalable digital banking services while helping financial institutions build secure and connected banking experiences.',
    links: [
      { name: 'Account Statement', desc: 'Automated account statement generation and delivery through secure banking software and digital banking services', href: '#' },
      { name: 'Payment Solutions & VAT (EMS)', desc: 'Advanced payment solutions, banking technology, and financial technology power modern workflows, where electronic billing and VAT compliance seamlessly fit.', href: '#' },
      { name: 'Customer Account Master Data', desc: 'Centralized customer data management seamlessly supports KYC, customer onboarding, and customer engagement within modern digital banking experiences.', href: '#' },
      { name: 'Federal Reporting', desc: 'Advanced financial technology and banking technology streamline regulatory reporting, seamlessly supporting compliance and risk management processes.', href: '#' },
      { name: 'MCI Link Application', desc: 'A robust integration platform seamlessly fits modern banking technology, financial technology, and connected digital banking services, streamlining daily operations.', href: '#' },
      { name: 'IPO Management Module', desc: 'End-to-end IPO process management, a financial-process management module fits banking software/fintech infrastructure.', href: '#' },
    ],
    cta: { label: 'Explore banking solutions', href: '#' },
  },
  {
    id: 'cyber',
    num: '02',
    tab: 'AI - ML & AI consultant services',
    tag: 'Cyber Security & VAPT',
    title: 'AI Consulting and Implementation',
    desc: 'Accelerate your growth with AI consulting services by Absolute Solutions. Enterprises in Riyadh today are tasked with unlocking the potential hidden within vast amounts of data. At Absolute Solutions, our experienced AI consultant services excel in crafting and deploying customized data and automation solutions. With our expertise in AI, ML, and Data Science, Generative AI, as well as Computer Vision, we enable organizations to streamline complex processes, enhance decision-making, and discover transformative opportunities. Our proven success in delivering AI tech consulting innovations equips us to generate significant business outcomes for your enterprise in Riyadh and beyond. Let us help you leverage AI not just to compete but also to lead in your industry.',
    links: [
      { name: 'AI strategy consulting', desc: 'Unlock your enterprise potential and drive peak organizational agility by aligning your business strategy with advanced AI capabilities. Our expert AI strategy consulting service helps you pinpoint high-impact opportunities, seamlessly embed AI solutions into your core workflows, and map out a clear roadmap for scalable adoption.', href: '#' },
      { name: 'Data Strategy & Architecture Providers', desc: 'We help you define comprehensive data governance, ensure data quality and integrity, and architect scalable data systems aligned with your AI needs. Improve the efficiency of your business with expert services from the Data Governance & Architecture team at Absolute Solutions.', href: '#' },
      { name: 'AI Implementation Services', desc: 'Our AI implementation roadmap service provides a detailed plan to deploy AI technologies effectively, addressing potential risks, timelines, and change management considerations. Tailored for enterprise impact with a clear, step-by-step roadmap aligned to your business objectives.', href: '#' },
      { name: 'AI Assessment & Feasibility', desc: 'Start with an AI assessment to understand how to practically apply AI in your business to get commercial results. Our comprehensive assessment service allows you to evaluate the technical and business feasibility of AI solutions for your specific enterprise use cases.', href: '#' },
      { name: 'AI solution design and development', desc: 'Your AI development partner for solutions that actually deliver. We design modular AI systems based on autonomous and cooperative agents. Using frameworks such as LangChain, LangGraph, and CrewAI, we orchestrate multi-agent workflows that connect models, APIs, and enterprise tools for autonomous decision-making and execution.', href: '#' },
      { name: 'Generative AI Consulting', desc: 'Generative AI consulting helps an enterprise identify high-value use cases, evaluate LLMs and platforms, design a secure architecture, implement and integrate, and govern for risk and compliance. Leverage the power of generative AI to transform enterprise content creation, data processing, and other critical business functions.', href: '#' },
    ],
    cta: { label: 'Explore AI consulting services', href: '#' },
  },
  {
    id: 'software',
    num: '03',
    tab: 'AI agent development',
    tag: 'AI agent development & AI-driven automation',
    title: 'AI agent development services',
    desc: 'Custom AI agents for workflow automation and multi-agent orchestration, with one team throughout. With deep expertise in AI, ML, data engineering, and system integration, we design intelligent, secure, and high-performing AI-driven solutions tailored to enterprise needs. Drive growth. Move faster. Reduce costs. AI Agents and Software built by top engineers — we build the apps and intelligent AI agents that 10× your team’s productivity, from customer-facing products to internal automation.',
    links: [
      { name: 'AI agent strategy', desc: 'AI Agents Services help organizations operationalize AI through assistants and autonomous agents that work across enterprise systems. From understanding your data landscape to designing AI governance frameworks, we ensure that AI integration aligns with your enterprise architecture and needs.', href: '#' },
      { name: 'Custom AI Agent Development Services', desc: 'We build AI agents tailored to specific enterprise needs, ensuring they align with operational workflows, security standards, and compliance requirements. By combining language model orchestration (like Gemini and Claude) with integration systems (like n8n), our custom AI agents operate directly inside your business environment.', href: '#' },
      { name: 'AI agent integration', desc: 'AI agent integration services — connect AI agents to your enterprise systems, APIs, identity and data with typed tools, allow-listed actions, human approvals and full step-level observability. Our approach involves API-driven integrations, middleware configurations, and data-pipeline orchestration to connect AI agents with CRMs, ERPs, cloud platforms, and on-premises environments.', href: '#' },
      { name: 'AI agent architecture and design', desc: 'AI agent architecture is the engineering discipline that defines how a model, tools, memory, orchestration, and runtime control combine into a coordinated workflow rather than isolated model calls. We design robust AI agent architectures that support scalability, efficiency, and real-time decision-making.', href: '#' },
      { name: 'AI agent lifecycle management', desc: 'Agent lifecycle management (ALM) is the end-to-end process of managing AI agents throughout their operational life — from planning and building through testing, deployment, monitoring, governance, optimization and decommissioning. Our approach incorporates AI observability practices, including traceability, performance monitoring, and behavior auditing.', href: '#' },
      { name: 'Multi-agent system (MAS)', desc: 'A multi-agent system (MAS) consists of multiple AI agents working collectively to perform tasks on behalf of a user or another system. At the core of AI agents are large language models (LLMs) that design workflows and use available tools autonomously.', href: '#' },
    ],
    cta: { label: 'Explore AI agent development services', href: '#' },
  },
  {
    id: 'ai-data',
    num: '04',
    tab: 'Software engineering Provider',
    tag: 'Software engineering services',
    title: 'Software Engineering Services & Solutions',
    desc: 'At Absolute Solutions, we specialize in developing custom software that transforms business operations, enhances productivity, and drives growth. Our team of experienced developers uses the latest technologies and industry best practices to deliver high-quality, scalable, and secure software solutions. Whether you need a simple business application or a complex enterprise system, we have the expertise to bring your vision to life. We follow agile methodologies to ensure timely delivery and full transparency throughout the development process. We have spent over two decades building and refining engineering practices for enterprise clients, growing from a product company into a global software development service provider.',
    links: [
      { name: 'Custom Software Development', desc: 'Tailored software solutions designed to meet your specific business needs and workflows — requirements analysis, custom architecture design, agile development, quality assurance. As an enterprise custom software development company, we help organizations improve critical operations through custom software, technology foundations, and AI-enabled workflows.', href: '#' },
      { name: 'Enterprise Software Solutions', desc: 'Scalable enterprise-grade applications for large organizations and complex operations. We provide ERP systems, CRM solutions, supply chain management, and business intelligence — designed for enterprise scale from the start and delivered in stages to reduce disruption.', href: '#' },
      { name: 'Cloud Based Application & Services', desc: 'Modern cloud-native applications with high availability and scalability. We provide AWS/Azure/GCP integration, SaaS development, microservices architecture, and API development. Cloud applications offer reduced resource needs, more convenience in updating, and access across devices.', href: '#' },
      { name: 'Legacy System Modernization', desc: 'Re-design legacy technology to support uninterrupted business growth. We modernize your data infrastructure by restructuring and optimizing existing software code to improve its quality, flexibility, longevity, and performance — reducing technical debt and minimizing risks.', href: '#' },
      { name: 'DevOps Services', desc: 'Bringing together business, development, and operations for rapid and continuous delivery. Our DevOps approach is built on four key pillars — People, Process, Technology, and Governance — to ensure high-quality software delivered collaboratively and regularly.', href: '#' },
      { name: 'Web & Mobile Development', desc: 'We build high-performance, scalable, low-latency web applications with intuitive interfaces and robust security — plus native and cross-platform mobile apps covering product discovery, roadmap planning, UI/UX design, QA, deployment, and ongoing maintenance and support.', href: '#' },
    ],
    cta: { label: 'Explore software engineering services', href: '#' },
  },
  {
    id: 'cloud',
    num: '05',
    tab: 'Cloud & DevOps',
    tag: 'Cloud & Infrastructure to carry AI workloads',
    title: 'Our cloud consulting and engineering services',
    desc: 'In today’s ever-changing business landscape, organizations need a fundamentally different approach to building and managing technology. We assess what you are running before recommending changes, then build and stay accountable for how the result performs in production. Our teams have delivered 200+ cloud projects over the last five years across 22+ industries. Our cloud consulting and engineering services help you design, implement, and manage cloud solutions that meet your business needs — end-to-end support for cloud adoption, migration, optimization, and management, ensuring your infrastructure is secure, scalable, and cost-effective.',
    links: [
      { name: 'Cloud strategy design', desc: 'Our cloud strategy consultants work closely with businesses to review priorities, assess current cloud usage and develop tailored cloud strategies — unlocking increased agility, improved scalability, enhanced security, reduced costs and access to the latest innovations.', href: '#' },
      { name: 'Migration to the cloud', desc: 'Cloud migration services: on-premises to cloud migration or cloud to cloud migration. A secure, structured, and risk-controlled approach to transitioning from on-premise infrastructure — executed through a phased approach that minimizes disruption and creates a cloud-ready foundation for analytics and AI.', href: '#' },
      { name: 'Cloud-native application development', desc: 'We offer cloud application consulting, custom application development, cloud infrastructure management, AI-accelerated app migration, hyperscaler AI platform implementation, and cloud application security — plus DevOps, continuous delivery, and ongoing maintenance and support.', href: '#' },
      { name: 'DevOps & CI/CD', desc: 'Our CI/CD services give your DevOps team secure, compliant, and fully automated pipelines, helping you deploy 10x faster with zero downtime. Our specialist services include CI/CD health check & roadmap, pipeline development, and secure-by-default CI/CD (DevSecOps).', href: '#' },
      { name: 'Cloud infrastructure assessment', desc: 'Improve the performance of your solutions by assessing, modernizing, and optimizing your cloud environment. Our cloud experts identify where resources are underused and what changes can improve performance, scalability, and ROI — including cost waste and right-sizing opportunities.', href: '#' },
      { name: 'Cloud security', desc: 'Cloud security and disaster recovery help you protect your data with encryption and continuous monitoring, and back up critical assets to keep operations resilient. We secure AI workloads and agents, enforce least-privilege access, and integrate identity governance with security operations.', href: '#' },
    ],
    cta: { label: 'Explore cloud services', href: '#' },
  },
  {
    id: 'staffing',
    num: '06',
    tab: 'Data analytics',
    tag: 'Advanced analytics for better performance',
    title: 'Data analytics services for growth',
    desc: 'With large volumes of data coming in from diverse sources, it is important to make the best use of data and extract actionable insights that can aid in making informed decisions. Our data analytics services allow clients to utilize advanced analytics and predictive ML & AI-focused capabilities across numerous industry verticals — including supply chain forecasting, Center of Excellence (CoE) strategy, industrial IoT and sensors, deep-learning based information retrieval, MLOps for model deployment, and optimization and scheduling. Each business has different goals but every business can be facilitated through our AI and data analytics services.',
    links: [
      { name: 'Supply chain forecasting', desc: 'Optimize your supply chain, enhance decision-making, and leverage real-time market information to gain a competitive edge with our end-to-end supply chain management process.', href: '#' },
      { name: 'Center of Excellence (CoE) strategy', desc: 'Identify AI opportunities that align with your company goals, and provide end-to-end implementation support in establishing an AI CoE — combining strategic alignment, operational execution, and knowledge retention for sustainable innovation.', href: '#' },
      { name: 'Industrial IoT and sensors', desc: 'Extract valuable insights from complex raw sensor data to create actionable metrics and gather predictive insights for applications such as machine maintenance, production plan optimization, and patient health measurement.', href: '#' },
      { name: 'Deep-learning based information retrieval', desc: 'Utilize both internal and publicly available text data, identify market needs, and gain a competitive advantage through accelerated innovation.', href: '#' },
      { name: 'MLOps for model deployment', desc: 'Get your business driven with strategic MLOps solutions. We provide insights and support that drive innovation while addressing your specific needs and aspirations in the ever-evolving world of AI.', href: '#' },
      { name: 'Optimization and scheduling', desc: 'Improve cost-efficiency and leverage advanced mathematical programming and simulations for optimized operational plans and decisions.', href: '#' },
    ],
    cta: { label: 'Explore data analytics services', href: '#' },
  },
];

/* Panel content — desktop & mobile dono jagah reuse hota hai */
function WwdPanel({ cat }) {
  return (
    <>
      <span className="wwd-tag">{cat.tag}</span>
      <h3 className="wwd-panel-title">{cat.title}</h3>
      <p className="wwd-panel-desc">{cat.desc}</p>
      <ul className="wwd-links">
        {cat.links.map((l) => (
          <li key={l.name}>
            <a href={l.href}>
              <span className="wwd-link-icon">→</span>
              <span className="wwd-link-text">
                <b>{l.name}</b>
                <small>{l.desc}</small>
              </span>
            </a>
          </li>
        ))}
      </ul>
      <a href={cat.cta.href} className="wwd-panel-cta">
        {cat.cta.label} <span>→</span>
      </a>
    </>
  );
}

export default function Home() {
  /* HERO SLIDER */
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  /* QUOTE FORM */
  const [selectedService, setSelectedService] = useState('');
  const [formValues, setFormValues] = useState({});
  const [formErrors, setFormErrors] = useState({});

  const activeFields = selectedService ? SERVICE_FIELDS.default : [];

  const handleFieldChange = (id, value) => {
    setFormValues((prev) => ({ ...prev, [id]: value }));
  };

  const handleQuoteSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!selectedService) errors.qService = true;
    activeFields.forEach((field) => {
      if (!formValues[field.id]) errors[field.id] = true;
    });
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      console.log('Quote request submitted:', { selectedService, ...formValues });
      alert('Thank you! Your quote request has been submitted.');
      setFormValues({});
      setSelectedService('');
    }
  };

  /* AI CHART — DRAW ON SCROLL */
  const chartRef = useRef(null);

  useEffect(() => {
    const el = chartRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('drawn');
          obs.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* TESTIMONIALS CAROUSEL */
  const [tIndex, setTIndex] = useState(0);
  const [tPaused, setTPaused] = useState(false);

  useEffect(() => {
    if (tPaused) return;
    const timer = setInterval(() => setTIndex((p) => (p + 1) % TESTIMONIALS.length), 6000);
    return () => clearInterval(timer);
  }, [tPaused]);

  /* CONTACT FORM */
  const [cValues, setCValues] = useState({ name: '', email: '', company: '', service: '', message: '' });
  const [cErrors, setCErrors] = useState({});
  const [cSent, setCSent] = useState(false);

  const handleCChange = (id, value) => setCValues((p) => ({ ...p, [id]: value }));

  const handleContactSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!cValues.name.trim()) errs.name = true;
    if (!/^\S+@\S+\.\S+$/.test(cValues.email)) errs.email = true;
    if (!cValues.message.trim()) errs.message = true;
    setCErrors(errs);
    if (Object.keys(errs).length === 0) {
      console.log('Contact request:', cValues);
      setCSent(true);
    }
  };

  /* CERTIFICATE LIGHTBOX */
  const [lightbox, setLightbox] = useState(null);

  /* ENGAGEMENT PHASES — interactive stepper */
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [phasePaused, setPhasePaused] = useState(false);

  useEffect(() => {
    if (phasePaused) return;
    const timer = setInterval(() => setPhaseIdx((p) => (p + 1) % PHASES.length), 6000);
    return () => clearInterval(timer);
  }, [phasePaused]);

  /* WHAT WE DO — active service tab (-1 = mobile pe sab band) */
  const [activeSvc, setActiveSvc] = useState(0);
  const desktopActive = activeSvc < 0 ? 0 : activeSvc;

  /* COUNT-UP ANIMATION */
  useEffect(() => {
    const animate = (el) => {
      const target = parseInt(el.dataset.target, 10) || 0;
      const suffix = el.dataset.suffix || '';
      const duration = 1900;
      const start = performance.now();
      const step = (now) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 4);
        el.textContent = Math.round(target * eased).toLocaleString() + suffix;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll('.trust-stat-num').forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);

  /* SCROLL REVEAL */
  const revealRefs = useRef([]);
  revealRefs.current = [];

  const addRevealRef = (el) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15 }
    );

    revealRefs.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ============ SECTION 1: HERO ============ */}
      <section className="hero">
        <div className="hero-bg-image"></div>
        <div className="hero-bg-overlay"></div>

        <div className="hero-copy" id="heroCopy">
          <div className="hero-slides">
            {HERO_SLIDES.map((slide, index) => (
              <div
                key={index}
                className={`hero-slide${index === activeSlide ? ' active' : ''}`}
              >
                <p className="eyebrow">{slide.eyebrow}</p>
                <h1>
                  {slide.title}
                  <em>{slide.titleEm}</em>
                </h1>
                <p className="hero-description">{slide.description}</p>
              </div>
            ))}
          </div>

          <div className="hero-slide-dots">
            {HERO_SLIDES.map((_, index) => (
              <span
                key={index}
                className={index === activeSlide ? 'active' : ''}
                data-slide={index}
                onClick={() => setActiveSlide(index)}
              ></span>
            ))}
          </div>

          <div className="hero-actions">
            <a href="https://ab-sol.net/products" className="btn btn-dark">
              Contact Now <span>→</span>
            </a>
            <a href="https://ab-sol.net/contact" className="btn btn-light">
              More Details <span>→</span>
            </a>
          </div>
        </div>

        <div className="hero-form-side" id="heroFormSide">
          <form className="booking-widget" id="quoteForm" noValidate onSubmit={handleQuoteSubmit}>
            <div className={`glass-group gf-anim${formErrors.qService ? ' has-error' : ''}`}>
              <select
                id="qService"
                required
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
              >
                <option value="">Select Service Type</option>
                <option value="Software Development">Software Development</option>
                <option value="Web Development">Web Development & UI/UX</option>
                <option value="Mobile Application Development">Mobile Application Development</option>
                <option value="Cyber Security">Cyber Security & VAPT Services</option>
                <option value="Quality Assurance and Testing">Quality Assurance and Testing (QA Automation)</option>
                <option value="Network & Infrastructure">Network & Infrastructure & Cloud</option>
                <option value="Business Process Re-Engineering">Business Process Re-Engineering</option>
                <option value="CCC Compliance">CCC Compliance</option>
                <option value="IT Staffing">IT Staffing</option>
                <option value="AI Consulting and Implementation">AI Consulting and Implementation</option>
                <option value="Data Warehouse Consulting">Data Warehouse Consulting Services</option>
                <option value="Cloud Migration and DevOps">Cloud Migration & DevOps</option>
              </select>
            </div>

            <div id="dynamicFields">
              {activeFields.map((field) => (
                <div className={`field-wrap${selectedService ? ' show' : ''}`} key={field.id}>
                  <div className={`glass-group${field.type === 'textarea' ? ' glass-group-textarea' : ''}${formErrors[field.id] ? ' has-error' : ''}`}>
                    {field.type === 'textarea' ? (
                      <textarea
                        placeholder={field.label}
                        value={formValues[field.id] || ''}
                        onChange={(e) => handleFieldChange(field.id, e.target.value)}
                      />
                    ) : (
                      <input
                        type={field.type}
                        placeholder={field.label}
                        value={formValues[field.id] || ''}
                        onChange={(e) => handleFieldChange(field.id, e.target.value)}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>

            <button className="search-btn gf-anim" type="submit">
              SUBMIT QUOTE REQUEST
            </button>

            <div className="wa-row gf-anim">
              <span>or reach us directly</span>
              <a
                href="https://wa.me/966508250090"
                target="_blank"
                rel="noopener noreferrer"
                className="wa-link"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                +966 508250090
              </a>
            </div>
          </form>
        </div>
      </section>

      {/* ============ SECTION 2: EXPERTISE / TRUST ============ */}
      <section className="trust-section" id="trustSection">
        <div className="trust-inner">

          <div className="trust-head reveal" ref={addRevealRef}>
            <div className="trust-head-left">
              <p className="trust-eyebrow">IT Company in Riyadh Saudi Arabia</p>
              <h1 className="trust-title">
                IT Company in Riyadh 20 Years of Experience in
                <em>AI Agent Development &amp; Cybersecurity - Cloud Computing Security Services</em>
                <span className="trust-title-tag">
                  Trusted Software Development Company in Saudi Arabia
                </span>
              </h1>
            </div>

            <div className="trust-head-right">
              <span className="trust-head-num">/ Founded 2006</span>
              <p className="trust-sub">
                Absolute Solutions is a trusted technology partner for comprehensive cybersecurity, IT infrastructure, and custom software development. Alongside our advanced security platforms like Raptoreye, we deliver top-tier nearshore software development company solutions and scalable custom application development company services for clients across KSA, the US, UK, and Australia. Whether you need robust devops services, ai agent development services, or agile software development outsourcing, our experts help global enterprises accelerate digital transformation with secure, high-performance tech stacks.
              </p>
              <a href="/about" className="trust-head-link">
                More about our company <span>→</span>
              </a>
            </div>
          </div>

          {/* STATS */}
          <div className="trust-stats reveal" ref={addRevealRef}>
            {TRUST_STATS.map((stat, i) => (
              <div className="trust-stat" key={i}>
                <span className="trust-stat-line"></span>
                <h3
                  className="trust-stat-num"
                  data-target={stat.value}
                  data-suffix={stat.suffix}
                >
                  0{stat.suffix}
                </h3>
                <p className="trust-stat-label">{stat.label}</p>
                <p className="trust-stat-desc">{stat.desc}</p>
              </div>
            ))}
          </div>

          {/* CERTIFICATES */}
          <div className="certs-wrap reveal" ref={addRevealRef}>
            <div className="certs-head">
              <p className="certs-eyebrow">Compliance &amp; Certifications</p>
              <h2 className="certs-title">
                Our Compliance<em>&amp; Global Certificates</em>
              </h2>
              <span className="certs-line"></span>
              <p className="certs-sub">
                Our commitment to excellence, security, and quality is validated by international standards.
                Absolute Solutions is proud to be certified with internationally recognized standards that demonstrate our commitment to quality, security, and continuous improvement
                — giving our clients complete confidence in every project we deliver.
              </p>
            </div>
            <div className="certs-grid">
              {COMPLIANCE_CERTS.map((cert, i) => (
                <article className="cert-card2" key={i}>
                  <button
                    type="button"
                    className="cert-frame"
                    onClick={() => setLightbox(cert)}
                    aria-label={`View ${cert.name}`}
                  >
                    <img src={cert.img} alt={`${cert.name} — Absolute Solutions`} loading="lazy" />
                    <span className="cert-zoom">View Certificate ⤢</span>
                  </button>
                  <div className="cert-body2">
                    <h4 className="cert-name2">{cert.name}</h4>
                    <p className="cert-subtitle">{cert.subtitle}</p>
                    <p className="cert-desc2">{cert.desc}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ============ SECTION 3: HAPPY CUSTOMER ============ */}
      <section className="happy-section" id="happy-customers">
        <div className="happy-inner reveal" ref={addRevealRef}>
          <p className="happy-eyebrow">Happy Customer</p>
          <h2 className="happy-title">
            Working at the Highest Level to Deliver Nearshore Software & AI Solutions
            <br />
            <em>with our clients</em>
          </h2>
          <span className="happy-line"></span>
        </div>

        <div className="happy-logos reveal" ref={addRevealRef}>
          <div className="trust-track">
            {[...TRUST_LOGOS, ...TRUST_LOGOS].map((logo, i) => (
              <div className="trust-logo" key={i}>
                <div className="trust-logo-box">
                  <img
                    className="trust-logo-img"
                    src={logo.img}
                    alt={`${logo.name} logo`}
                    loading="lazy"
                    onError={(e) => {
                      const box = e.currentTarget.parentElement;
                      e.currentTarget.style.display = 'none';
                      const fb = box.querySelector('.trust-logo-fallback');
                      if (fb) fb.style.display = 'block';
                    }}
                  />
                  <span className="trust-logo-fallback">{logo.fallback}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SECTION: GOOGLE REVIEWS ============ */}
      <section className="gr-section" id="google-reviews">
        <div className="gr-head reveal" ref={addRevealRef}>
          <p className="sec-eyebrow">Google Reviews</p>
          <h2 className="sec-h2">
            What Global Clients Say About Our offshore software development services,<em>straight from Google.</em>
          </h2>

          <div className="gr-summary">
            <span className="gr-score">4.4</span>
            <div className="gr-summary-right">
              <div className="gr-stars-large">
                <span className="gr-stars-bg">★★★★★</span>
                <span className="gr-stars-fill" style={{ width: '88%' }}>★★★★★</span>
              </div>
              <span className="gr-total">Based on 14 Google reviews</span>
            </div>
            <GoogleG size={34} />
          </div>
        </div>

        <div className="gr-cards reveal" ref={addRevealRef}>
          {GOOGLE_REVIEWS.map((r, i) => (
            <article className="gr-card" key={i}>
              <div className="gr-card-head">
                <span className="gr-avatar" style={{ background: r.color }}>
                  {r.name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase()}
                </span>
                <div className="gr-who">
                  <b>{r.name}</b>
                  <small>{r.meta}</small>
                </div>
                <span className="gr-g-mini"><GoogleG size={18} /></span>
              </div>

              <div className="gr-card-stars">
                {[1, 2, 3, 4, 5].map((s) => (
                  <span key={s} className={s <= r.stars ? 'star on' : 'star'}>★</span>
                ))}
              </div>

              <p className="gr-text">{r.text}</p>

              <div className="gr-card-foot">
                {r.time && <span>{r.time}</span>}
                <span className="gr-posted">
                  <GoogleG size={13} /> Posted on Google
                </span>
              </div>
            </article>
          ))}
        </div>

        <div className="gr-cta reveal" ref={addRevealRef}>
          <a
            href="https://www.google.com/maps/search/Absolute+Solutions+Riyadh"
            target="_blank"
            rel="noopener noreferrer"
            className="gr-view-all"
          >
            Read all reviews on Google <span>→</span>
          </a>
        </div>
      </section>

      {/* ============ SECTION 4: AI STATEMENT + PERSONAS ============ */}
      <section className="ai-statement" id="ai-statement">

        <div className="ai-bg-image" aria-hidden="true"></div>
        <span className="ai-glow ai-glow-1" aria-hidden="true"></span>
        <span className="ai-glow ai-glow-2" aria-hidden="true"></span>
        <span className="ai-glow ai-glow-3" aria-hidden="true"></span>

        <div className="ai-inner">
          <div className="ai-copy reveal" ref={addRevealRef}>
            <p className="ai-eyebrow">Engineering Intelligence Softwares</p>
            <h2 className="ai-title">
              Artificial Intelligence Consulting :
              <em>Advanced Cloud-to-Cloud Integration & AI Agent Development Services</em>
            </h2>
            <p className="ai-desc">
              Our Artificial Intelligence Consulting services help CTOs and CIOs adopt modern cloud technologies with secure, scalable solutions. We provide expert ai agent development services, generative ai consulting, and advanced cloud-to-cloud architectures to connect your applications and workflows seamlessly. We turn AI adoption into measurable engineering outcomes—improving operational efficiency without compromising enterprise security.
            </p>
            <div className="ai-actions">
              <a href="/contact" className="ai-btn">
                Measure your delivery gap <span>→</span>
              </a>
              <a href="/ai-development" className="ai-btn-ghost">
                How we do it
              </a>
            </div>
          </div>

          <div className="ai-visual reveal" ref={addRevealRef}>
            <div className="ai-chart-card" ref={chartRef}>
              <div className="ai-chart-head">
                <span>Engineering performance — last 12 months</span>
                <span className="ai-chart-badge">Illustrative</span>
              </div>
              <svg className="ai-chart-svg" viewBox="0 0 640 300" fill="none">
                {[60, 120, 180, 240].map((y) => (
                  <line key={y} x1="0" y1={y} x2="640" y2={y} className="ai-grid-line" />
                ))}
                <path
                  className="ai-line ai-line-metric"
                  d="M10 252 L90 250 L170 247 L250 248 L330 246 L410 247 L490 245 L570 246 L630 245"
                />
                <path
                  className="ai-line ai-line-adopt"
                  d="M10 258 L90 236 L170 224 L250 190 L330 168 L410 120 L490 96 L570 48 L630 30"
                />
                <circle className="ai-dot ai-dot-adopt" cx="630" cy="30" r="7" />
                <circle className="ai-dot ai-dot-metric" cx="630" cy="245" r="7" />
              </svg>
              <div className="ai-legend">
                <span className="ai-legend-item">
                  <i className="ai-swatch ai-swatch-adopt"></i>AI tool adoption
                </span>
                <span className="ai-legend-item">
                  <i className="ai-swatch ai-swatch-metric"></i>Delivery metrics
                </span>
              </div>
            </div>

            <div className="ai-terminal" aria-hidden="true">
              <div className="ai-terminal-bar">
                <span></span><span></span><span></span>
                <em>ai-delivery-monitor</em>
              </div>
              <div className="ai-terminal-body">
                <p><i className="t-green">✓</i> deploy: raptor-eye v2.4 <b>passed</b></p>
                <p><i className="t-green">✓</i> tests: 1,284 passed · 0 failed</p>
                <p><i className="t-yellow">▲</i> ai-assist coverage: <b>73%</b></p>
                <p><i className="t-blue">→</i> sprint velocity: <b>+38%</b></p>
              </div>
            </div>

            <div className="ai-float-badge" aria-hidden="true">
              <i></i> Live delivery tracking
            </div>
          </div>
        </div>

        {/* PERSONAS: For CTOs / For CIOs */}
        <div className="ai-personas reveal" ref={addRevealRef}>
          <div className="ai-persona">
            <div className="ai-persona-inner">
              <div className="ai-persona-top">
                <span className="ai-persona-num">01</span>
                <h3 className="ai-persona-eyebrow">For CTOs</h3>
              </div>
              <span className="ai-persona-icon">
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
              </span>
              <p className="ai-persona-line">Engineers are faster.</p>
              <p className="ai-persona-sub">Sprints are not.</p>
            </div>
          </div>

          <div className="ai-persona-sep" aria-hidden="true"></div>

          <div className="ai-persona">
            <div className="ai-persona-inner">
              <div className="ai-persona-top">
                <span className="ai-persona-num">02</span>
                <h3 className="ai-persona-eyebrow">For CIOs</h3>
              </div>
              <span className="ai-persona-icon">
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M17.5 19a4.5 4.5 0 100-9 6.5 6.5 0 00-12.6 1.7A3.5 3.5 0 006 19h11.5z" />
                </svg>
              </span>
              <p className="ai-persona-line">AI tools are live but disconnected.</p>
              <p className="ai-persona-sub">
                From the cloud, data, and security infrastructure they depend on.
              </p>
            </div>
          </div>
        </div>

        <p className="ai-position reveal" ref={addRevealRef}>
          <em>Pragmatic AI Software Engineering</em> is Absolute Solution's position on both —
          measured on your <span className="ai-position-mark">actual codebase</span>, connected to
          your <span className="ai-position-mark">actual infrastructure</span>, before it scales.
        </p>
      </section>

      {/* ============ SECTION 4-B: ENGAGEMENT PHASES ============ */}
      <section
        className="phases-section"
        id="phases"
        onMouseEnter={() => setPhasePaused(true)}
        onMouseLeave={() => setPhasePaused(false)}
      >
        <div className="phases-head reveal" ref={addRevealRef}>
          <p className="sec-eyebrow">How We Engage</p>
          <h2 className="phases-title">
            Four Phases. Measurable AI Agent Development & Technology Results.
            <em>No long-term commitment at any of them.</em>
          </h2>
        </div>

        <div className="phases-stepper reveal" ref={addRevealRef}>
          <span className="phases-rail">
            <span
              className="phases-rail-fill"
              style={{ width: `${(phaseIdx / (PHASES.length - 1)) * 100}%` }}
            ></span>
          </span>

          {PHASES.map((ph, i) => (
            <button
              type="button"
              key={ph.num}
              className={`phase-step${i === phaseIdx ? ' active' : ''}${i < phaseIdx ? ' done' : ''}`}
              onClick={() => setPhaseIdx(i)}
              aria-label={`Phase ${ph.num}: ${ph.name}`}
            >
              <span className="phase-circle">
                <b>{ph.num}</b>
              </span>
              <span className="phase-name">{ph.name}</span>
            </button>
          ))}
        </div>

        <div className="phase-panel reveal" ref={addRevealRef}>
          <div className="phase-panel-left">
            <span className="phase-duration">{PHASES[phaseIdx].duration}</span>
            <h3 className="phase-heading">{PHASES[phaseIdx].title}</h3>
            <p className="phase-desc">{PHASES[phaseIdx].desc}</p>
            <a href="/contact" className="phase-cta">
              Start with Phase {PHASES[phaseIdx].num} <span>→</span>
            </a>
          </div>
          <div className="phase-panel-right">
            {PHASES[phaseIdx].points.map((pt) => (
              <div className="phase-point" key={pt}>
                <span className="phase-point-check">✓</span>
                {pt}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SECTION 5: WHAT WE DO (N-iX STYLE — FIXED) ============ */}
      <section className="wwd-section" id="what-we-do">
        <div className="wwd-head reveal" ref={addRevealRef}>
          <div>
            <p className="sec-eyebrow">What We Do</p>
            <h2 className="wwd-title">
              Full-spectrum IT &amp; cybersecurity services,
              <em>engineered around your business goals</em>
            </h2>
          </div>
          <a href="https://ab-sol.net/products" className="sec-link">
            View all services <span>→</span>
          </a>
        </div>

        {/* ——— DESKTOP: interactive tabs (saare panels stacked, NO remount) ——— */}
        <div className="wwd-layout reveal" ref={addRevealRef}>
          <div className="wwd-tabs" role="tablist" aria-label="Service categories">
            {SERVICES_DIRECTORY.map((cat, i) => (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={desktopActive === i}
                className={`wwd-tab${desktopActive === i ? ' active' : ''}`}
                onClick={() => setActiveSvc(i)}
                onMouseEnter={() => setActiveSvc(i)}
              >
                <span className="wwd-tab-num">{cat.num}</span>
                <span className="wwd-tab-label">{cat.tab}</span>
                <span className="wwd-tab-arrow">→</span>
              </button>
            ))}

            <div className="wwd-tab-footer">
              <p>Not sure which service fits your needs?</p>
              <a href="/contact">Talk to our experts <span>→</span></a>
            </div>
          </div>

          {/* Saare 6 panels pehle se DOM mein — sirf crossfade hota hai */}
          <div className="wwd-panels">
            {SERVICES_DIRECTORY.map((cat, i) => (
              <div
                key={cat.id}
                role="tabpanel"
                className={`wwd-panel${desktopActive === i ? ' active' : ''}`}
                aria-hidden={desktopActive !== i}
              >
                <WwdPanel cat={cat} />
              </div>
            ))}
          </div>
        </div>

        {/* ——— MOBILE: smooth accordion (true toggle — open/close dono) ——— */}
        <div className="wwd-accordion reveal" ref={addRevealRef}>
          {SERVICES_DIRECTORY.map((cat, i) => (
            <div key={cat.id} className={`wwd-acc${activeSvc === i ? ' open' : ''}`}>
              <button
                type="button"
                className="wwd-acc-head"
                aria-expanded={activeSvc === i}
                onClick={() => setActiveSvc(activeSvc === i ? -1 : i)}
              >
                <span className="wwd-acc-num">{cat.num}</span>
                <span className="wwd-acc-label">{cat.tab}</span>
                <span className="wwd-acc-toggle">+</span>
              </button>
              <div className="wwd-acc-body">
                <div className="wwd-acc-body-inner">
                  <WwdPanel cat={cat} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

     {/* ============ SECTION 6: CLIENT OUTCOMES BY INDUSTRY (LUXURY) ============ */}
<section className="coi-section" id="client-outcomes">
  <div className="coi-head reveal" ref={addRevealRef}>
    <div>
      <p className="sec-eyebrow">CLIENT OUTCOMES BY INDUSTRY</p>
      <h2 className="sec-h2">
        One Stop Shop Technology Partners —
        <em>Technology That Delivers Real Business Outcomes</em>
      </h2>
    </div>
    <a href="https://ab-sol.net/products" className="sec-link">
      View all solutions <span>→</span>
    </a>
  </div>

  <div className="coi-grid">
    {INDUSTRY_OUTCOMES.map((ind, idx) => (
      <article
        className={`coi-card theme-${ind.theme}${idx === 0 ? ' featured' : ''} reveal`}
        key={ind.id}
        ref={addRevealRef}
        style={{ transitionDelay: `${idx * 0.1}s` }}
      >
        {/* ——— IMAGE MEDIA ——— */}
        <div className="coi-media">
          <img
            src={ind.img}
            alt={`${ind.title} — Absolute Solutions`}
            loading="lazy"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
          <div className="coi-media-overlay"></div>

          <span className="coi-ghost-num">{ind.num}</span>
          <span className="coi-count">{ind.solutions.length} Solutions</span>

          <div className="coi-media-caption">
            <h3 className="coi-title">{ind.title}</h3>
            <p className="coi-tagline">{ind.tag}</p>
          </div>
        </div>

        {/* ——— BODY ——— */}
        <div className="coi-body">
          <p className="coi-desc">{ind.desc}</p>

          <ul className="coi-list">
            {ind.solutions.map((s) => (
              <li key={s.name}>
                <a href={s.href}>
                  <span className="coi-link-icon">→</span>
                  <span className="coi-link-name">{s.name}</span>
                </a>
              </li>
            ))}
          </ul>

          <a href={ind.cta.href} className="coi-cta">
            {ind.cta.label} <span>→</span>
          </a>
        </div>
      </article>
    ))}
  </div>
</section>

      {/* ============ SECTION 7: INDUSTRIES ============ */}
      <section className="industries-section" id="industries">
        <div className="ind-head reveal" ref={addRevealRef}>
          <p className="sec-eyebrow">Industries We Serve</p>
          <h2 className="sec-h2">
            Domain expertise that speaks<em>your industry's language</em>
          </h2>
        </div>

        <div className="industries-list reveal" ref={addRevealRef}>
          {INDUSTRIES.map((ind, i) => (
            <div className="industry-row" key={i}>
              <div className="industry-top">
                <span className="industry-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="industry-name">{ind.name}</span>
                <span className="industry-arrow">→</span>
              </div>
              <div className="industry-info">
                <p>{ind.desc}</p>
                <div className="industry-tags">
                  {ind.tags.map((t) => <span key={t}>{t}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ SECTION 8: TESTIMONIALS ============ */}
      <section
        className="testimonials-section"
        id="testimonials"
        onMouseEnter={() => setTPaused(true)}
        onMouseLeave={() => setTPaused(false)}
      >
        <div className="testi-inner reveal" ref={addRevealRef}>
          <span className="testi-quote-mark">"</span>

          <div className="testi-slides">
            {TESTIMONIALS.map((t, i) => (
              <div className={`testi-slide${i === tIndex ? ' active' : ''}`} key={i}>
                <p className="testi-text">{t.quote}</p>
                <div className="testi-person">
                  <span className="testi-avatar">{t.initials}</span>
                  <div className="testi-meta">
                    <b>{t.name}</b>
                    <span>{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="testi-nav">
            <button
              type="button"
              className="testi-btn"
              aria-label="Previous testimonial"
              onClick={() => setTIndex((tIndex - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
            >
              ←
            </button>
            <span className="testi-count">
              {String(tIndex + 1).padStart(2, '0')} / {String(TESTIMONIALS.length).padStart(2, '0')}
            </span>
            <button
              type="button"
              className="testi-btn"
              aria-label="Next testimonial"
              onClick={() => setTIndex((tIndex + 1) % TESTIMONIALS.length)}
            >
              →
            </button>
          </div>
        </div>
      </section>

      {/* ============ SECTION 9: AWARDS ============ */}
      <section className="awards-section" id="awards">
        <div className="awards-head reveal" ref={addRevealRef}>
          <p className="sec-eyebrow">Recognition</p>
          <h2 className="sec-h2">
            Awards &amp;<em>industry recognition</em>
          </h2>
        </div>

        <div className="awards-grid reveal" ref={addRevealRef}>
          {AWARDS.map((a, i) => (
            <div className="award-card" key={i}>
              <span className="award-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 01-10 0V4z" />
                  <path d="M7 6H4a2 2 0 002 4h1M17 6h3a2 2 0 01-2 4h-1" />
                </svg>
              </span>
              <div>
                <h3 className="award-name">{a.name}</h3>
                <p className="award-org">{a.org} · {a.year}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ SECTION 10: INSIGHTS ============ */}
      <section className="insights-section" id="insights">
        <div className="section-heading reveal" ref={addRevealRef}>
          <div>
            <p className="sec-eyebrow">Insights</p>
            <h2 className="sec-h2">
              Latest thinking &amp;<em>engineering insights</em>
            </h2>
          </div>
          <a href="/blog" className="sec-link">View all insights <span>→</span></a>
        </div>

        <div className="insights-grid reveal" ref={addRevealRef}>
          {INSIGHTS.map((ins, i) => (
            <article className="insight-card" key={i}>
              <div className={`insight-media theme-${ins.theme}`}>
                <span className="insight-cat">{ins.cat}</span>
                <span className="insight-num">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <div className="insight-body">
                <h3>{ins.title}</h3>
                <p className="insight-meta">{ins.date} · {ins.read}</p>
                <a href="/blog" className="insight-link">
                  Read article <span>→</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ============ SECTION 11: RESOURCES / PDF DOWNLOADS ============ */}
      <section className="res-section" id="resources">
        <div className="res-head reveal" ref={addRevealRef}>
          <p className="sec-eyebrow">Resources</p>
          <h2 className="sec-h2">
            Free guides, reports<em>&amp; downloadable PDFs</em>
          </h2>
          <p className="res-sub">
            Practical playbooks, frameworks, and research from our engineering floor — no forms, no gates. Just download and read.
          </p>
        </div>

        {/* Featured banner */}
        <div className="res-banner reveal" ref={addRevealRef}>
          <div>
            <span className="res-banner-tag">{RESOURCES.featured.tag}</span>
            <h3 className="res-banner-title">{RESOURCES.featured.title}</h3>
            <p className="res-banner-desc">{RESOURCES.featured.desc}</p>
            <span className="res-banner-meta">{RESOURCES.featured.meta}</span>
            <div style={{ marginTop: 26 }}>
              <a
                href={RESOURCES.featured.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="res-banner-btn"
              >
                Download PDF <span>↓</span>
              </a>
            </div>
          </div>
          <div className="res-banner-visual" aria-hidden="true">
            <div className="res-doc">
              <span className="res-doc-fold"></span>
              <span className="res-doc-line w90"></span>
              <span className="res-doc-line w80"></span>
              <span className="res-doc-line w70"></span>
              <span className="res-doc-line w60"></span>
              <span className="res-doc-line w50"></span>
              <span className="res-doc-badge">PDF</span>
            </div>
          </div>
        </div>

        {/* Brochure cards */}
        <div className="res-grid reveal" ref={addRevealRef}>
          {RESOURCES.brochures.map((b, i) => (
            <a
              href={b.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="res-card"
              key={i}
            >
              <div className="res-card-doc" aria-hidden="true">
                <div className="res-mini-doc">
                  <span className="res-doc-line w90"></span>
                  <span className="res-doc-line w80"></span>
                  <span className="res-doc-line w70"></span>
                  <span className="res-doc-line w50"></span>
                  <span className="res-doc-badge sm">PDF</span>
                </div>
              </div>
              <div className="res-card-body">
                <span className="res-card-tag">{b.tag}</span>
                <h3>{b.title}</h3>
                <p>{b.desc}</p>
                <span className="res-card-link">Download now <span>↓</span></span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ============ SECTION 12: CONTACT ============ */}
      <section className="contact-section" id="contact">
        <div className="contact-inner">
          <div className="reveal" ref={addRevealRef}>
            <p className="sec-eyebrow" style={{ color: '#ff8a75' }}>Get In Touch</p>
            <h2 className="contact-title">
              Let's build something<em>exceptional together</em>
            </h2>
            <p className="contact-desc">
              Tell us about your project and get a free consultation with our senior engineers —
              no sales pitch, just technical answers to your hardest questions.
            </p>

            <div className="contact-rows">
              <a href="tel:+966508250090" className="contact-row">
                <span className="contact-row-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z" />
                  </svg>
                </span>
                <span>
                  <small>Call / WhatsApp</small>
                  <b>+966 50 825 0090</b>
                </span>
              </a>

              <a href="mailto:info@ab-sol.net" className="contact-row">
                <span className="contact-row-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="M22 7l-10 6L2 7" />
                  </svg>
                </span>
                <span>
                  <small>Email us</small>
                  <b>info@ab-sol.net</b>
                </span>
              </a>

              <div className="contact-row">
                <span className="contact-row-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </span>
                <span>
                  <small>Head Office</small>
                  <b>Riyadh, Saudi Arabia</b>
                </span>
              </div>
            </div>

            <div className="contact-offices">
              <span className="office-chip"><i></i> Riyadh — KSA</span>
              <span className="office-chip"><i></i> USA</span>
              <span className="office-chip"><i></i> Australia</span>
            </div>
          </div>

          <div className="contact-form-card reveal" ref={addRevealRef}>
            {cSent ? (
              <div className="c-success">
                <span className="c-success-check">✓</span>
                <h3>Message sent!</h3>
                <p>
                  Thanks for reaching out — our team will get back to you
                  within 24 hours.
                </p>
              </div>
            ) : (
              <form noValidate onSubmit={handleContactSubmit}>
                <div className="c-row2">
                  <input
                    className={`c-field${cErrors.name ? ' has-error' : ''}`}
                    type="text"
                    placeholder="Full Name *"
                    value={cValues.name}
                    onChange={(e) => handleCChange('name', e.target.value)}
                  />
                  <input
                    className={`c-field${cErrors.email ? ' has-error' : ''}`}
                    type="email"
                    placeholder="Email Address *"
                    value={cValues.email}
                    onChange={(e) => handleCChange('email', e.target.value)}
                  />
                </div>

                <div className="c-row2">
                  <input
                    className="c-field"
                    type="text"
                    placeholder="Company"
                    value={cValues.company}
                    onChange={(e) => handleCChange('company', e.target.value)}
                  />
                  <select
                    className="c-field"
                    value={cValues.service}
                    onChange={(e) => handleCChange('service', e.target.value)}
                  >
                    <option value="">Select Service</option>
                    {CONTACT_SERVICES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <textarea
                  className={`c-field${cErrors.message ? ' has-error' : ''}`}
                  placeholder="Tell us about your project *"
                  value={cValues.message}
                  onChange={(e) => handleCChange('message', e.target.value)}
                ></textarea>

                <button type="submit" className="c-submit">Send Message</button>
                <p className="c-note">
                  By submitting, you agree to our privacy policy. We never share your data.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer>
        <p className="footer-brand">
          <b>ABSOLUTE SOLUTIONS</b> — IT &amp; CYBERSECURITY
        </p>
        <p>Building secure, scalable software since 2006.</p>
      </footer>

      {/* ============ CERTIFICATE LIGHTBOX ============ */}
      {lightbox && (
        <div className="cert-lightbox" onClick={() => setLightbox(null)}>
          <div className="cert-lightbox-inner" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="cert-lightbox-close"
              onClick={() => setLightbox(null)}
              aria-label="Close"
            >
              ×
            </button>
            <img src={lightbox.img} alt={lightbox.name} />
            <p className="cert-lightbox-name">{lightbox.name}</p>
          </div>
        </div>
      )}
    </>
  );
}