import React, { useState, useEffect, useRef, useCallback } from 'react';
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
      'With over 18 years of experience, Absolute Solution delivers excellence through nearshore software development, co development software, and advanced ai agent development services. We empower Riyadh and KSA enterprises with scalable data warehouse consulting, sql data analytics, data analytics ai, spatial analytics, and ai supply chain automated supply solutions. Streamline your operations with our enterprise DMS, CMS, human resources services, and Visage....',
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
    { id: 'qName', label: 'Full Name', type: 'text', autoComplete: 'name' },
    { id: 'qEmail', label: 'Email Address', type: 'email', autoComplete: 'email' },
    { id: 'qPhone', label: 'Phone Number', type: 'tel', autoComplete: 'tel' },
    { id: 'qMessage', label: 'Tell us about your requirement', type: 'textarea' },
  ],
};

/* =====================================================
   REAL COMPANY STATS (ab-sol.net se)
===================================================== */
const TRUST_STATS = [
  {
    value: 20,
    suffix: '+',
    label: 'Years of Experience',
    desc: 'For over two decades, we have built and measured software that runs in production. Our journey reflects an unwavering commitment to engineering excellence, industry best practices, and adapting to modern technological shifts. By continuously refining our development lifecycles and software architectures, we ensure that every digital solution we deliver remains robust, scalable, and tailored to long-term business goals.',
  },
  {
    value: 54,
    suffix: '',
    label: 'Experts Team',
    desc: 'Our executive team has guided the company through 23 years of continuous growth, including maintaining 100% client delivery. Alongside our core technical capabilities, our specialists excel in driving advanced SEO strategies, high-performing digital marketing, and user-centric UI/UX design. By combining deep technical proficiency with data-driven optimization, we ensure that every platform we launch scales effectively and delivers maximum digital impact.',
  },
  {
    value: 375,
    suffix: '',
    label: 'Projects Completed',
    desc: 'Absolute Solutions has set up a strong dedicated development team with wide expertise in PHP, JavaScript, and other technologies necessary for successful product delivery. Our team consists of several back-end software developers, a team lead, a QA specialist, and a project manager. Together with the client’s team and other distributed teams, we collaborate on the back-end of the website.',
  },
  {
    value: 340,
    suffix: '+',
    label: 'Happy Clients',
    desc: 'Trusted by enterprises across KSA, the US, UK, and Australia, we take pride in building long-lasting partnerships driven by transparency and exceptional results. Our commitment to quality software delivery, responsive communication, and continuous post-launch support ensures that every client achieves measurable business growth. We continuously adapt to evolving market demands to deliver secure, scalable, and high-performance digital solutions worldwide.',
  },
];

/* =====================================================
   REAL CLIENT LOGOS
===================================================== */
const TRUST_LOGOS = [
  { name: 'IBM', img: '/images/IBM.png', fallback: 'IBM' },
  { name: 'HP', img: '/images/HP.png', fallback: 'HP' },
  { name: 'Fortinet', img: '/images/Fortinet.png', fallback: 'FORTINET' },
  { name: 'Oracle', img: '/images/Oracle.png', fallback: 'ORACLE' },
  { name: 'Imperva', img: '/images/Imperva.png', fallback: 'IMPERVA' },
  { name: 'Microrage', img: '/images/Microrage.png', fallback: 'MICRORAGE' },
  { name: 'Silver Peak', img: '/images/SilverPeak.png', fallback: 'SILVER PEAK' },
  { name: 'GFi', img: '/images/GFi.png', fallback: 'GFi' },
  { name: 'Array Networks', img: '/images/ArrayNetworks.png', fallback: 'ARRAY NETWORKS' },
  { name: 'Paragon', img: '/images/Paragon.svg', fallback: 'PARAGON' },
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
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
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
    desc: 'IT Infrastructure Services for Banking and Financial Companies:With 23 years of experience in IT for banking and financial services, Absolute Solutions builds and manages secure, reliable, and future-proof IT infrastructures for clients in these industries.IT infrastructure services enable banking and financial services companies to maintain uninterrupted, secure, and cost-effective IT operations through tailored infrastructure design, continuous monitoring, rapid issue resolution, and strategic optimization of infrastructure components. Absolute solutions  team can build and manage your IT infrastructure according to ITSM best practices to ensure business continuity, protect sensitive financial data, and avoid compliance breaches.',
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
      {
        name: 'Inventory Control & Management',
        href: 'https://ab-sol.net/inventory-control-management-solutions',
      },
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
      {
        name: 'Medical & Health Care Solutions',
        href: 'https://ab-sol.net/medical-healthcare-industries-solutions',
      },
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
      {
        name: 'AI Development & Outsourcing',
        href: 'https://ab-sol.net/artificial-intelligence-development-outsourcing-services',
      },
      {
        name: 'IBM Sphere + Message Brokers Staffing',
        href: 'https://ab-sol.net/ibm-sphere-message-brokers-staffing-outsourcing',
      },
      {
        name: 'Business Application Development',
        href: 'https://ab-sol.net/business-application-development',
      },
      {
        name: 'Health Care Services & Outsourcing',
        href: 'https://ab-sol.net/health-care-services-outsourcing',
      },
      {
        name: 'QA & Testing Services & Outsourcing',
        href: 'https://ab-sol.net/quality-assurance-testing-services-outsourcing',
      },
      { name: 'Maximo Outsourcing', href: 'https://ab-sol.net/maximo-outsourcing' },
    ],
    cta: { label: 'Explore outsourcing services', href: 'https://ab-sol.net/outsourcing-services' },
  },
];

/* =====================================================
   EXPERTISE / SERVICE DOMAINS (12 categories — ab-sol.net)
   NOTE: jahan href '#' hai wahan apna page URL dalna
===================================================== */
const EXPERTISE_DOMAINS = [
  {
    num: '01',
    name: 'Raptor Eye',
    href: 'https://ab-sol.net/raptor-eye-solution',
    desc: 'One-stop-shop AI-powered cybersecurity platform — real-time SIEM, SOAR, threat intelligence, and compliance readiness for enterprises in KSA and beyond.',
    services: [
      {
        name: 'Raptor Eye — One Stop Shop Cybersecurity Platform',
        href: 'https://ab-sol.net/raptor-eye-solution',
      },
      { name: 'General Cyber Security Services', href: '#' },
      { name: 'VAPT Services', href: '#' },
      { name: 'CCC Compliance', href: '#' },
      { name: 'CCC+ Compliance', href: '#' },
      { name: 'NCA ECC Journey', href: '#' },
    ],
  },
  {
    num: '02',
    name: 'Software Product Engineering',
    href: '#',
    desc: 'End-to-end product engineering — from custom software and enterprise applications to mobile apps and legacy modernization, built by senior engineers.',
    services: [
      { name: 'Software Development', href: '#' },
      {
        name: 'Business Application Development',
        href: 'https://ab-sol.net/business-application-development',
      },
      { name: 'Document Management System', href: 'https://ab-sol.net/document-management-solution' },
      {
        name: 'Inventory Management System',
        href: 'https://ab-sol.net/inventory-control-management-solutions',
      },
      { name: 'Time & Attendance Management System', href: '#' },
      { name: 'Procurement Automation System', href: '#' },
      { name: 'Mobile Application Development', href: '#' },
      { name: 'Case Management System', href: '#' },
      { name: 'Legal Case Management System', href: '#' },
      { name: 'Maximo Outsourcing', href: 'https://ab-sol.net/maximo-outsourcing' },
      {
        name: 'IBM Sphere & Message Brokers',
        href: 'https://ab-sol.net/ibm-sphere-message-brokers-staffing-outsourcing',
      },
      {
        name: 'Healthcare Services Outsourcing',
        href: 'https://ab-sol.net/health-care-services-outsourcing',
      },
    ],
  },
  {
    num: '03',
    name: 'Intelligent Platforms and Automation',
    href: '#',
    desc: 'Business process re-engineering and intelligent automation platforms — ERP, AML, billing, reporting, and workflow systems that eliminate manual work.',
    services: [
      { name: 'Business Process Re-Engineering', href: '#' },
      { name: 'Visage — ERP', href: '#' },
      { name: 'Anti-Money Laundering Application', href: '#' },
      { name: 'Auction & Bidding', href: 'https://ab-sol.net/auction-bidding' },
      { name: 'Billing & VAT', href: 'https://ab-sol.net/billing-vat-ems' },
      { name: 'Cash-In-Transit Tracker Application', href: '#' },
      { name: 'Federal Reporting Application', href: 'https://ab-sol.net/federal-reporting' },
      {
        name: 'Initial Public Offering (IPO) Management System',
        href: 'https://ab-sol.net/ipo-management-module',
      },
      { name: 'MCI Link Application', href: 'https://ab-sol.net/mci-link-application' },
      { name: 'Customer Account Master Data', href: 'https://ab-sol.net/customer-account-master-data' },
    ],
  },
  {
    num: '04',
    name: 'Cloud Solutions and Consulting',
    href: '#',
    desc: 'Cloud strategy, migration, and infrastructure services across AWS, Azure, GCP, and hybrid environments — secure, scalable, and cost-optimized.',
    services: [
      { name: 'Cloud Infrastructure', href: '#' },
      { name: 'AWS', href: '#' },
      { name: 'Azure', href: '#' },
      { name: 'GCP', href: '#' },
      { name: 'Hybrid Cloud', href: '#' },
      { name: 'Servers', href: '#' },
      { name: 'Storages', href: '#' },
      { name: 'Network & Infrastructure', href: '#' },
    ],
  },
  {
    num: '05',
    name: 'Data and Analytics',
    href: '#',
    desc: 'Turn enterprise data into decisions — registries, reporting applications, and analytics built on robust data foundations.',
    services: [
      { name: 'Customer Account Master Data', href: 'https://ab-sol.net/customer-account-master-data' },
      { name: 'Federal Reporting Application', href: 'https://ab-sol.net/federal-reporting' },
      { name: 'Medical Registry Application', href: 'https://ab-sol.net/medical-care-registries' },
      { name: 'Billing & VAT', href: 'https://ab-sol.net/billing-vat-ems' },
    ],
  },
  {
    num: '06',
    name: 'AI Consulting and Implementation',
    href: '#',
    desc: 'From AI strategy to production deployment — custom AI applications, solutions, and development outsourcing for measurable business outcomes.',
    services: [
      {
        name: 'AI Development & Outsourcing',
        href: 'https://ab-sol.net/artificial-intelligence-development-outsourcing-services',
      },
      { name: 'AI Application Development', href: '#' },
      { name: 'AI Solutions & Implementation', href: '#' },
    ],
  },
  {
    num: '07',
    name: 'Security and Quality',
    href: '#',
    desc: 'Complete security and quality coverage — VAPT, CCC & NCA compliance journeys, and independent QA and testing services.',
    services: [
      { name: 'General Cyber Security Services', href: '#' },
      { name: 'VAPT Services', href: '#' },
      { name: 'CCC Compliance', href: '#' },
      { name: 'CCC+ Compliance', href: '#' },
      { name: 'NCA ECC Journey', href: '#' },
      { name: 'Quality Assurance Testing Services', href: '#' },
      {
        name: 'Quality Assurance & Testing',
        href: 'https://ab-sol.net/quality-assurance-testing-services-outsourcing',
      },
      {
        name: 'QA & Testing Outsourcing',
        href: 'https://ab-sol.net/quality-assurance-testing-services-outsourcing',
      },
    ],
  },
  {
    num: '08',
    name: 'Embedded & IoT',
    href: '#',
    desc: 'Tracking, monitoring, and embedded solutions — from cash-in-transit trackers to custom IoT telemetry platforms.',
    services: [
      { name: 'Cash-In-Transit Tracker Application', href: '#' },
      { name: 'Tracking & Monitoring Solutions', href: '#' },
    ],
  },
  {
    num: '09',
    name: 'Game Development',
    href: '#',
    desc: 'Game development services — interactive experiences built with modern engines for entertainment, education, and brand engagement.',
    services: [{ name: 'Game Development Services', href: '#' }],
  },
  {
    num: '10',
    name: 'Web App Development',
    href: '#',
    desc: 'High-performance web applications — business portals, custom web solutions, and scalable front-end and back-end systems.',
    services: [
      { name: 'Web Development', href: '#' },
      { name: 'Web Application Development', href: '#' },
      { name: 'Business Web Applications', href: '#' },
      { name: 'Custom Web Solutions', href: '#' },
    ],
  },
  {
    num: '11',
    name: 'Healthcare Solutions',
    href: '#',
    desc: 'Healthcare software built for compliance and scale — oncology sales, medical registries, and complete healthcare industry solutions.',
    services: [
      { name: 'SmartOnco Pharmaceutical Sales', href: 'https://ab-sol.net/smartonco' },
      { name: 'Medical Registry Application', href: 'https://ab-sol.net/medical-care-registries' },
      {
        name: 'Medical & Healthcare Industries Solutions',
        href: 'https://ab-sol.net/medical-healthcare-industries-solutions',
      },
    ],
  },
  {
    num: '12',
    name: 'Banking & Financial Solutions',
    href: '#',
    desc: 'Banking-grade applications — AML, IPO management, federal reporting, payment and VAT billing, and customer data platforms for financial institutions.',
    services: [
      { name: 'Anti-Money Laundering Application', href: '#' },
      { name: 'Auction & Bidding', href: 'https://ab-sol.net/auction-bidding' },
      { name: 'Billing & VAT', href: 'https://ab-sol.net/billing-vat-ems' },
      { name: 'Cash-In-Transit Tracker Application', href: '#' },
      { name: 'Federal Reporting Application', href: 'https://ab-sol.net/federal-reporting' },
      {
        name: 'Initial Public Offering (IPO) Management System',
        href: 'https://ab-sol.net/ipo-management-module',
      },
      { name: 'MCI Link Application', href: 'https://ab-sol.net/mci-link-application' },
      { name: 'Customer Account Master Data', href: 'https://ab-sol.net/customer-account-master-data' },
    ],
  },
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
   RESOURCES / PDF DOWNLOADS (AI Advantages — local files)
===================================================== */
const RESOURCES = {
  featured: {
    tag: 'Company Profile',
    title: 'AI Advantages Profile',
    desc: 'Your trusted AI adoption partner — AI market growth, adoption challenges, and our five-step AI adoption approach. 10,000+ executives trained, Fortune 500 clients, delivered in partnership with Absolute Solutions, Riyadh.',
    pdf: '/pdf/AI Advantages Profile.pdf',
    meta: 'PDF · Free Download',
  },
  brochures: [
    {
      tag: 'Executive Education',
      title: 'AI Advantages — Executive Programs 2026',
      desc: "Empowering Saudi Arabia's AI leaders — CAIO program, ISO 42001 certification track, AI readiness assessment, hands-on workshops & engagement models. Vision 2030 aligned · SDAIA partner ready.",
      pdf: '/pdf/AI_Advantages_AbSol (1).pdf',
    },
    {
      tag: 'AI Adoption Guide',
      title: 'Your Trusted AI Adoption Partner',
      desc: 'How organizations adopt AI responsibly — market insights, adoption challenges, and our five-step approach: Assessment, Strategy, Education, Execution & Monitoring.',
      pdf: '/pdf/AI Advantages Profile.pdf',
    },
  ],
};

/* =====================================================
   OUR OFFICES (4 locations — with photos + map)
===================================================== */
const OFFICES = [
  {
    img: '/images/software company riyadh.jpg',
    country: 'Saudi Arabia',
    role: 'Headquarters — Riyadh',
    hq: true,
    address: 'King Abdullah Road – Exit 10, P.O. Box 7021, Code 12482, Riyadh, Saudi Arabia.',
    email: 'salesksa@ab-sol.net',
    phone: '+966 50 825 0090',
    phoneHref: 'tel:+966508250090',
    mapQuery: 'King Abdullah Road Exit 10 Riyadh Saudi Arabia',
  },
  {
    img: '/images/Venture X Naples (Tamiami Trail North).jpg',
    country: 'United States',
    role: 'USA Office — Naples, FL',
    address: '4850 Tamiami Trail North, Suite 301, Naples, FL 34103, USA.',
    email: 'salesusa@ab-sol.net',
    phone: '+1 (470) 233-5507',
    phoneHref: 'tel:+14702335507',
    mapQuery: '4850 Tamiami Trail North Naples FL 34103',
  },
  {
    img: '/images/Australia Post (Parramatta CBD Post Office).jpg',
    country: 'Australia',
    role: 'Australia Office — Parramatta',
    address: 'Parcel Collect 10016 58835, 57–59 Macquarie Street, Parramatta NSW 2150, Australia.',
    email: 'salesaus@ab-sol.net',
    phone: '+61 2 8107 0923',
    phoneHref: 'tel:+61281070923',
    mapQuery: '57-59 Macquarie Street Parramatta NSW 2150 Australia',
  },
  {
    img: '/images/Haly Tower.jpg',
    country: 'Pakistan',
    role: 'Offshore Development Center — Lahore',
    address: '902-B, Haly Tower, Block R, DHA, Lahore, Pakistan.',
    email: 'salespk@ab-sol.net',
    phone: '+92 322 884 4013',
    phoneHref: 'tel:+923228844013',
    mapQuery: 'Haly Tower DHA Phase 6 Block R Lahore Pakistan',
  },
];

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
      {
        name: 'Account Statement',
        desc: 'Automated account statement generation and delivery through secure banking software and digital banking services',
        href: '#',
      },
      {
        name: 'Payment Solutions & VAT (EMS)',
        desc: 'Advanced payment solutions, banking technology, and financial technology power modern workflows, where electronic billing and VAT compliance seamlessly fit.',
        href: '#',
      },
      {
        name: 'Customer Account Master Data',
        desc: 'Centralized customer data management seamlessly supports KYC, customer onboarding, and customer engagement within modern digital banking experiences.',
        href: '#',
      },
      {
        name: 'Federal Reporting',
        desc: 'Advanced financial technology and banking technology streamline regulatory reporting, seamlessly supporting compliance and risk management processes.',
        href: '#',
      },
      {
        name: 'MCI Link Application',
        desc: 'A robust integration platform seamlessly fits modern banking technology, financial technology, and connected digital banking services, streamlining daily operations.',
        href: '#',
      },
      {
        name: 'IPO Management Module',
        desc: 'End-to-end IPO process management, a financial-process management module fits banking software/fintech infrastructure.',
        href: '#',
      },
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
      {
        name: 'AI strategy consulting',
        desc: 'Unlock your enterprise potential and drive peak organizational agility by aligning your business strategy with advanced AI capabilities. Our expert AI strategy consulting service helps you pinpoint high-impact opportunities, seamlessly embed AI solutions into your core workflows, and map out a clear roadmap for scalable adoption.',
        href: '#',
      },
      {
        name: 'Data Strategy & Architecture Providers',
        desc: 'We help you define comprehensive data governance, ensure data quality and integrity, and architect scalable data systems aligned with your AI needs. Improve the efficiency of your business with expert services from the Data Governance & Architecture team at Absolute Solutions.',
        href: '#',
      },
      {
        name: 'AI Implementation Services',
        desc: 'Our AI implementation roadmap service provides a detailed plan to deploy AI technologies effectively, addressing potential risks, timelines, and change management considerations. Tailored for enterprise impact with a clear, step-by-step roadmap aligned to your business objectives.',
        href: '#',
      },
      {
        name: 'AI Assessment & Feasibility',
        desc: 'Start with an AI assessment to understand how to practically apply AI in your business to get commercial results. Our comprehensive assessment service allows you to evaluate the technical and business feasibility of AI solutions for your specific enterprise use cases.',
        href: '#',
      },
      {
        name: 'AI solution design and development',
        desc: 'Your AI development partner for solutions that actually deliver. We design modular AI systems based on autonomous and cooperative agents. Using frameworks such as LangChain, LangGraph, and CrewAI, we orchestrate multi-agent workflows that connect models, APIs, and enterprise tools for autonomous decision-making and execution.',
        href: '#',
      },
      {
        name: 'Generative AI Consulting',
        desc: 'Generative AI consulting helps an enterprise identify high-value use cases, evaluate LLMs and platforms, design a secure architecture, implement and integrate, and govern for risk and compliance. Leverage the power of generative AI to transform enterprise content creation, data processing, and other critical business functions.',
        href: '#',
      },
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
      {
        name: 'AI agent strategy',
        desc: 'AI Agents Services help organizations operationalize AI through assistants and autonomous agents that work across enterprise systems. From understanding your data landscape to designing AI governance frameworks, we ensure that AI integration aligns with your enterprise architecture and needs.',
        href: '#',
      },
      {
        name: 'Custom AI Agent Development Services',
        desc: 'We build AI agents tailored to specific enterprise needs, ensuring they align with operational workflows, security standards, and compliance requirements. By combining language model orchestration (like Gemini and Claude) with integration systems (like n8n), our custom AI agents operate directly inside your business environment.',
        href: '#',
      },
      {
        name: 'AI agent integration',
        desc: 'AI agent integration services — connect AI agents to your enterprise systems, APIs, identity and data with typed tools, allow-listed actions, human approvals and full step-level observability. Our approach involves API-driven integrations, middleware configurations, and data-pipeline orchestration to connect AI agents with CRMs, ERPs, cloud platforms, and on-premises environments.',
        href: '#',
      },
      {
        name: 'AI agent architecture and design',
        desc: 'AI agent architecture is the engineering discipline that defines how a model, tools, memory, orchestration, and runtime control combine into a coordinated workflow rather than isolated model calls. We design robust AI agent architectures that support scalability, efficiency, and real-time decision-making.',
        href: '#',
      },
      {
        name: 'AI agent lifecycle management',
        desc: 'Agent lifecycle management (ALM) is the end-to-end process of managing AI agents throughout their operational life — from planning and building through testing, deployment, monitoring, governance, optimization and decommissioning. Our approach incorporates AI observability practices, including traceability, performance monitoring, and behavior auditing.',
        href: '#',
      },
      {
        name: 'Multi-agent system (MAS)',
        desc: 'A multi-agent system (MAS) consists of multiple AI agents working collectively to perform tasks on behalf of a user or another system. At the core of AI agents are large language models (LLMs) that design workflows and use available tools autonomously.',
        href: '#',
      },
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
      {
        name: 'Custom Software Development',
        desc: 'Tailored software solutions designed to meet your specific business needs and workflows — requirements analysis, custom architecture design, agile development, quality assurance. As an enterprise custom software development company, we help organizations improve critical operations through custom software, technology foundations, and AI-enabled workflows.',
        href: '#',
      },
      {
        name: 'Enterprise Software Solutions',
        desc: 'Scalable enterprise-grade applications for large organizations and complex operations. We provide ERP systems, CRM solutions, supply chain management, and business intelligence — designed for enterprise scale from the start and delivered in stages to reduce disruption.',
        href: '#',
      },
      {
        name: 'Cloud Based Application & Services',
        desc: 'Modern cloud-native applications with high availability and scalability. We provide AWS/Azure/GCP integration, SaaS development, microservices architecture, and API development. Cloud applications offer reduced resource needs, more convenience in updating, and access across devices.',
        href: '#',
      },
      {
        name: 'Legacy System Modernization',
        desc: 'Re-design legacy technology to support uninterrupted business growth. We modernize your data infrastructure by restructuring and optimizing existing software code to improve its quality, flexibility, longevity, and performance — reducing technical debt and minimizing risks.',
        href: '#',
      },
      {
        name: 'DevOps Services',
        desc: 'Bringing together business, development, and operations for rapid and continuous delivery. Our DevOps approach is built on four key pillars — People, Process, Technology, and Governance — to ensure high-quality software delivered collaboratively and regularly.',
        href: '#',
      },
      {
        name: 'Web & Mobile Development',
        desc: 'We build high-performance, scalable, low-latency web applications with intuitive interfaces and robust security — plus native and cross-platform mobile apps covering product discovery, roadmap planning, UI/UX design, QA, deployment, and ongoing maintenance and support.',
        href: '#',
      },
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
      {
        name: 'Cloud strategy design',
        desc: 'Our cloud strategy consultants work closely with businesses to review priorities, assess current cloud usage and develop tailored cloud strategies — unlocking increased agility, improved scalability, enhanced security, reduced costs and access to the latest innovations.',
        href: '#',
      },
      {
        name: 'Migration to the cloud',
        desc: 'Cloud migration services: on-premises to cloud migration or cloud to cloud migration. A secure, structured, and risk-controlled approach to transitioning from on-premise infrastructure — executed through a phased approach that minimizes disruption and creates a cloud-ready foundation for analytics and AI.',
        href: '#',
      },
      {
        name: 'Cloud-native application development',
        desc: 'We offer cloud application consulting, custom application development, cloud infrastructure management, AI-accelerated app migration, hyperscaler AI platform implementation, and cloud application security — plus DevOps, continuous delivery, and ongoing maintenance and support.',
        href: '#',
      },
      {
        name: 'DevOps & CI/CD',
        desc: 'Our CI/CD services give your DevOps team secure, compliant, and fully automated pipelines, helping you deploy 10x faster with zero downtime. Our specialist services include CI/CD health check & roadmap, pipeline development, and secure-by-default CI/CD (DevSecOps).',
        href: '#',
      },
      {
        name: 'Cloud infrastructure assessment',
        desc: 'Improve the performance of your solutions by assessing, modernizing, and optimizing your cloud environment. Our cloud experts identify where resources are underused and what changes can improve performance, scalability, and ROI — including cost waste and right-sizing opportunities.',
        href: '#',
      },
      {
        name: 'Cloud security',
        desc: 'Cloud security and disaster recovery help you protect your data with encryption and continuous monitoring, and back up critical assets to keep operations resilient. We secure AI workloads and agents, enforce least-privilege access, and integrate identity governance with security operations.',
        href: '#',
      },
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
      {
        name: 'Supply chain forecasting',
        desc: 'Optimize your supply chain, enhance decision-making, and leverage real-time market information to gain a competitive edge with our end-to-end supply chain management process.',
        href: '#',
      },
      {
        name: 'Center of Excellence (CoE) strategy',
        desc: 'Identify AI opportunities that align with your company goals, and provide end-to-end implementation support in establishing an AI CoE — combining strategic alignment, operational execution, and knowledge retention for sustainable innovation.',
        href: '#',
      },
      {
        name: 'Industrial IoT and sensors',
        desc: 'Extract valuable insights from complex raw sensor data to create actionable metrics and gather predictive insights for applications such as machine maintenance, production plan optimization, and patient health measurement.',
        href: '#',
      },
      {
        name: 'Deep-learning based information retrieval',
        desc: 'Utilize both internal and publicly available text data, identify market needs, and gain a competitive advantage through accelerated innovation.',
        href: '#',
      },
      {
        name: 'MLOps for model deployment',
        desc: 'Get your business driven with strategic MLOps solutions. We provide insights and support that drive innovation while addressing your specific needs and aspirations in the ever-evolving world of AI.',
        href: '#',
      },
      {
        name: 'Optimization and scheduling',
        desc: 'Improve cost-efficiency and leverage advanced mathematical programming and simulations for optimized operational plans and decisions.',
        href: '#',
      },
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

  const [quoteSent, setQuoteSent] = useState(false);

  useEffect(() => {
    if (!quoteSent) return undefined;
    const t = setTimeout(() => setQuoteSent(false), 6000);
    return () => clearTimeout(t);
  }, [quoteSent]);

  const clearQuoteError = (id) => setFormErrors((prev) => (prev[id] ? { ...prev, [id]: false } : prev));

  const handleFieldChange = (id, value) => {
    setFormValues((prev) => ({ ...prev, [id]: value }));
    clearQuoteError(id);
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
      setQuoteSent(true);
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
      { threshold: 0.35 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* CONTACT FORM */
  const [cValues, setCValues] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [cErrors, setCErrors] = useState({});
  const [cSent, setCSent] = useState(false);

  const handleCChange = (id, value) => {
    setCValues((p) => ({ ...p, [id]: value }));
    setCErrors((p) => (p[id] ? { ...p, [id]: false } : p));
  };

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

  useEffect(() => {
    if (!lightbox) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setLightbox(null);
    };
    const prevOverflow = document.body.style.overflow;
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [lightbox]);

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

  /* EXPERTISE DOMAINS — kaun si row khuli hai (-1 = sab band) */
  const [openDomain, setOpenDomain] = useState(0);
  const [activeOffice, setActiveOffice] = useState(0);

  /* COUNT-UP ANIMATION */
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const animate = (el) => {
      const target = parseInt(el.dataset.target, 10) || 0;
      const suffix = el.dataset.suffix || '';
      if (reduceMotion) {
        el.textContent = target.toLocaleString() + suffix;
        return;
      }
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
      { threshold: 0.5 },
    );

    document.querySelectorAll('.trust-stat-num').forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);

  /* SCROLL REVEAL */
  const revealRefs = useRef(new Set());

  const addRevealRef = useCallback((el) => {
    if (el) revealRefs.current.add(el);
  }, []);

  useEffect(() => {
    const nodes = Array.from(revealRefs.current);

    if (typeof IntersectionObserver === 'undefined') {
      nodes.forEach((el) => el.classList.add('visible'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const delay = parseFloat(el.dataset.delay || '0');
          if (delay) {
            el.style.transitionDelay = `${delay}s`;
            // clear after the reveal so hover effects are not delayed
            setTimeout(
              () => {
                el.style.transitionDelay = '';
              },
              (delay + 0.9) * 1000,
            );
          }
          el.classList.add('visible');
          observer.unobserve(el);
        });
      },
      { threshold: 0, rootMargin: '0px 0px -8% 0px' },
    );

    nodes.forEach((el) => observer.observe(el));
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
            {HERO_SLIDES.map((slide, index) => {
              const Title = index === 0 ? 'h1' : 'h2';
              return (
                <div
                  key={index}
                  className={`hero-slide${index === activeSlide ? ' active' : ''}`}
                  aria-hidden={index !== activeSlide}
                >
                  <p className="eyebrow">{slide.eyebrow}</p>
                  <Title className="hero-title">
                    {slide.title}
                    <em>{slide.titleEm}</em>
                  </Title>
                  <p className="hero-description">{slide.description}</p>
                </div>
              );
            })}
          </div>

          <div className="hero-slide-dots">
            {HERO_SLIDES.map((_, index) => (
              <button
                type="button"
                key={index}
                className={index === activeSlide ? 'active' : ''}
                aria-label={`Show slide ${index + 1}`}
                aria-current={index === activeSlide}
                onClick={() => setActiveSlide(index)}
              ></button>
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
                name="qService"
                aria-label="Select service type"
                required
                value={selectedService}
                onChange={(e) => {
                  setSelectedService(e.target.value);
                  clearQuoteError('qService');
                }}
              >
                <option value="">Select Service Type</option>
                <option value="Software Development">Software Development</option>
                <option value="Web Development">Web Development & UI/UX</option>
                <option value="Mobile Application Development">Mobile Application Development</option>
                <option value="Cyber Security">Cyber Security & VAPT Services</option>
                <option value="Quality Assurance and Testing">
                  Quality Assurance and Testing (QA Automation)
                </option>
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
                  <div
                    className={`glass-group${field.type === 'textarea' ? ' glass-group-textarea' : ''}${formErrors[field.id] ? ' has-error' : ''}`}
                  >
                    {field.type === 'textarea' ? (
                      <textarea
                        id={field.id}
                        name={field.id}
                        aria-label={field.label}
                        placeholder={field.label}
                        value={formValues[field.id] || ''}
                        onChange={(e) => handleFieldChange(field.id, e.target.value)}
                      />
                    ) : (
                      <input
                        id={field.id}
                        name={field.id}
                        type={field.type}
                        autoComplete={field.autoComplete}
                        aria-label={field.label}
                        placeholder={field.label}
                        value={formValues[field.id] || ''}
                        onChange={(e) => handleFieldChange(field.id, e.target.value)}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {quoteSent && (
              <p className="quote-success" role="status">
                Thank you! Your quote request has been submitted.
              </p>
            )}

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
              <h2 className="trust-title">
                IT Company in Riyadh 23 Years of Experience in
                <em>AI Agent Development &amp; Cybersecurity - Cloud Computing Security Services</em>
                <span className="trust-title-tag">Trusted Software Development Company in Saudi Arabia</span>
              </h2>
            </div>

            <div className="trust-head-right">
              <span className="trust-head-num">/ Founded 2003</span>
              <p className="trust-sub">
                Absolute Solutions is a trusted technology partner for comprehensive cybersecurity, IT
                infrastructure, and custom software development. Alongside our advanced security platforms
                like Raptoreye, we deliver top-tier nearshore software development company solutions and
                scalable custom application development company services for clients across KSA, the US, UK,
                and Australia. Whether you need robust devops services, ai agent development services, or
                agile software development outsourcing, our experts help global enterprises accelerate digital
                transformation with secure, high-performance tech stacks.
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
                <h3 className="trust-stat-num" data-target={stat.value} data-suffix={stat.suffix}>
                  {`0${stat.suffix}`}
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
                Absolute Solutions is proud to be certified with internationally recognized standards that
                demonstrate our commitment to quality, security, and continuous improvement — giving our
                clients complete confidence in every project we deliver.
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
            What Global Clients Say About Our offshore software development services,
            <em>straight from Google.</em>
          </h2>

          <div className="gr-summary">
            <span className="gr-score">4.4</span>
            <div className="gr-summary-right">
              <div className="gr-stars-large">
                <span className="gr-stars-bg">★★★★★</span>
                <span className="gr-stars-fill" style={{ width: '88%' }}>
                  ★★★★★
                </span>
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
                  {r.name
                    .split(' ')
                    .map((w) => w[0])
                    .slice(0, 2)
                    .join('')
                    .toUpperCase()}
                </span>
                <div className="gr-who">
                  <b>{r.name}</b>
                  <small>{r.meta}</small>
                </div>
                <span className="gr-g-mini">
                  <GoogleG size={18} />
                </span>
              </div>

              <div className="gr-card-stars">
                {[1, 2, 3, 4, 5].map((s) => (
                  <span key={s} className={s <= r.stars ? 'star on' : 'star'}>
                    ★
                  </span>
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
              Our Artificial Intelligence Consulting services help CTOs and CIOs adopt modern cloud
              technologies with secure, scalable solutions. We provide expert ai agent development services,
              generative ai consulting, and advanced cloud-to-cloud architectures to connect your applications
              and workflows seamlessly. We turn AI adoption into measurable engineering outcomes—improving
              operational efficiency without compromising enterprise security.
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
                <span></span>
                <span></span>
                <span></span>
                <em>ai-delivery-monitor</em>
              </div>
              <div className="ai-terminal-body">
                <p>
                  <i className="t-green">✓</i> deploy: raptor-eye v2.4 <b>passed</b>
                </p>
                <p>
                  <i className="t-green">✓</i> tests: 1,284 passed · 0 failed
                </p>
                <p>
                  <i className="t-yellow">▲</i> ai-assist coverage: <b>73%</b>
                </p>
                <p>
                  <i className="t-blue">→</i> sprint velocity: <b>+38%</b>
                </p>
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
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
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
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
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
          <em>Pragmatic AI Software Engineering</em> is Absolute Solution's position on both — measured on
          your <span className="ai-position-mark">actual codebase</span>, connected to your{' '}
          <span className="ai-position-mark">actual infrastructure</span>, before it scales.
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

      {/* ============ SECTION 5: WHAT WE DO (N-iX STYLE) ============ */}
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

        {/* ——— DESKTOP: interactive tabs ——— */}
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
              <a href="/contact">
                Talk to our experts <span>→</span>
              </a>
            </div>
          </div>

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

        {/* ——— MOBILE: smooth accordion ——— */}
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
                <div className="wwd-acc-body-inner" aria-hidden={activeSvc !== i}>
                  <div className="wwd-acc-body-pad">
                    <WwdPanel cat={cat} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ SECTION 6: CLIENT OUTCOMES BY INDUSTRY ============ */}
      <section className="coi-section" id="client-outcomes">
        <div className="coi-head reveal" ref={addRevealRef}>
          <div>
            <p className="sec-eyebrow">Client Outcomes by Industry</p>
            <h2 className="sec-h2">
              Proven solutions in production —<em>outcomes across four industries</em>
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
              data-delay={idx * 0.1}
            >
              <div className="coi-media">
                <img
                  src={ind.img}
                  alt={`${ind.title} — Absolute Solutions`}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div className="coi-media-overlay"></div>

                <span className="coi-ghost-num">{ind.num}</span>
                <span className="coi-count">{ind.solutions.length} Solutions</span>

                <div className="coi-media-caption">
                  <h3 className="coi-title">{ind.title}</h3>
                  <p className="coi-tagline">{ind.tag}</p>
                </div>
              </div>

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

      {/* ============ SECTION 7: EXPERTISE / SERVICE DOMAINS ============ */}
      <section className="industries-section" id="industries">
        <div className="ind-head reveal" ref={addRevealRef}>
          <p className="sec-eyebrow">What We Deliver</p>
          <h2 className="sec-h2">
            Domain expertise that speaks<em>your industry's language</em>
          </h2>
          <p className="ind-sub">
            12 service domains, 60+ solutions — explore any category and jump straight to its dedicated page.
          </p>
        </div>

        <div className="industries-list reveal" ref={addRevealRef}>
          {EXPERTISE_DOMAINS.map((d, i) => (
            <div className={`industry-row${openDomain === i ? ' open' : ''}`} key={d.num}>
              <div
                className="industry-top"
                onClick={() => setOpenDomain(openDomain === i ? -1 : i)}
                role="button"
                tabIndex={0}
                aria-expanded={openDomain === i}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setOpenDomain(openDomain === i ? -1 : i);
                  }
                }}
              >
                <span className="industry-num">{d.num}</span>
                <span className="industry-name">{d.name}</span>
                <span className="industry-count">{d.services.length} services</span>
                <a
                  href={d.href}
                  className="industry-arrow"
                  aria-label={`Visit ${d.name} page`}
                  onClick={(e) => e.stopPropagation()}
                >
                  →
                </a>
              </div>

              <div className="industry-info">
                <p>{d.desc}</p>
                <ul className="industry-services">
                  {d.services.map((s) => (
                    <li key={s.name}>
                      <a href={s.href}>
                        <span>{s.name}</span>
                        <i>→</i>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ SECTION 8: RESOURCES / PDF DOWNLOADS ============ */}
      <section className="res-section" id="resources">
        <div className="res-head reveal" ref={addRevealRef}>
          <p className="sec-eyebrow">Resources</p>
          <h2 className="sec-h2">
            Free guides, reports <em>&amp; downloadable PDFs</em>
          </h2>
          <p className="res-sub">
            Practical playbooks, frameworks, and research from our engineering floor — no forms, no gates.
            Just download and read.
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
            <a href={b.pdf} target="_blank" rel="noopener noreferrer" className="res-card" key={i}>
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
                <span className="res-card-link">
                  Download now <span>↓</span>
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ============ SECTION 8-B: OUR OFFICES (photo cards + map) ============ */}
      <section className="offices-section" id="offices">
        <div className="offices-bg" aria-hidden="true"></div>

        <div className="offices-head reveal" ref={addRevealRef}>
          <p className="sec-eyebrow">Our Offices</p>
          <h2 className="sec-h2">
            Global presence, local expertise —<em>4 offices across 3 continents</em>
          </h2>
          <p className="offices-sub">
            Click any office to view it live on the map below — local support in your time zone.
          </p>
        </div>

        {/* ——— 4 photo cards ——— */}
        <div className="offices-grid">
          {OFFICES.map((o, i) => (
            <div key={o.country} className="reveal" ref={addRevealRef} data-delay={i * 0.1}>
              <article
                className={`office-card${o.hq ? ' is-hq' : ''}${activeOffice === i ? ' active' : ''}`}
                onClick={() => {
                  setActiveOffice(i);
                  if (window.innerWidth < 900) {
                    document
                      .getElementById('offices-map')
                      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                role="button"
                tabIndex={0}
                aria-pressed={activeOffice === i}
                aria-label={`${o.country} office — show on map`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveOffice(i);
                  }
                }}
              >
                {/* photo header */}
                <div className="office-media">
                  <img
                    src={o.img}
                    alt={`${o.country} office — Absolute Solutions`}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <div className="office-media-overlay"></div>
                  {o.hq && <span className="office-hq-badge">★ Headquarters</span>}
                  {activeOffice === i && <span className="office-on-map">● On Map</span>}
                </div>

                {/* body */}
                <div className="office-body">
                  <h3 className="office-country">{o.country}</h3>
                  <p className="office-role">{o.role}</p>
                  <p className="office-address">{o.address}</p>

                  <div className="office-contacts">
                    <a href={`mailto:${o.email}`} className="office-row" onClick={(e) => e.stopPropagation()}>
                      <span className="office-row-icon">
                        <svg
                          width="13"
                          height="13"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect x="2" y="4" width="20" height="16" rx="2" />
                          <path d="M22 7l-10 6L2 7" />
                        </svg>
                      </span>
                      {o.email}
                    </a>
                    <a href={o.phoneHref} className="office-row" onClick={(e) => e.stopPropagation()}>
                      <span className="office-row-icon">
                        <svg
                          width="13"
                          height="13"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z" />
                        </svg>
                      </span>
                      {o.phone}
                    </a>
                  </div>

                  <span className="office-map-hint">
                    {activeOffice === i ? '● Showing on map below' : 'View on map ↓'}
                  </span>
                </div>
              </article>
            </div>
          ))}
        </div>

        {/* ——— BIG MAP ——— */}
        <div className="offices-map reveal" ref={addRevealRef} id="offices-map">
          <div className="offices-map-label">
            <span className="offices-map-pin"></span>
            {OFFICES[activeOffice].country} — {OFFICES[activeOffice].role}
          </div>
          <iframe
            key={OFFICES[activeOffice].country}
            title={`Absolute Solutions office — ${OFFICES[activeOffice].country}`}
            src={`https://maps.google.com/maps?q=${encodeURIComponent(OFFICES[activeOffice].mapQuery)}&z=14&output=embed`}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>

      {/* ============ SECTION 9: CONTACT (split: form + trusted logos) ============ */}
      <section className="contact-section" id="contact">
        <div className="contact-inner">
          {/* ——— LEFT: heading + form ——— */}
          <div className="contact-main reveal" ref={addRevealRef}>
            <p className="sec-eyebrow" style={{ color: '#ff8a75' }}>
              Get In Touch
            </p>
            <h2 className="contact-title">
              Let's build something<em>exceptional together</em>
            </h2>
            <p className="contact-desc">
              Briefly outline your project or challenge, and our team will respond within one business day —
              no sales pitch, just technical answers from senior engineers.
            </p>

            <div className="contact-form-card">
              {cSent ? (
                <div className="c-success">
                  <span className="c-success-check">✓</span>
                  <h3>Message sent!</h3>
                  <p>Thanks for reaching out — our team will get back to you within 24 hours.</p>
                </div>
              ) : (
                <form noValidate onSubmit={handleContactSubmit}>
                  <div className="c-row2">
                    <input
                      className={`c-field${cErrors.name ? ' has-error' : ''}`}
                      type="text"
                      name="name"
                      autoComplete="name"
                      aria-label="Full name"
                      placeholder="Full Name *"
                      value={cValues.name}
                      onChange={(e) => handleCChange('name', e.target.value)}
                    />
                    <input
                      className={`c-field${cErrors.email ? ' has-error' : ''}`}
                      type="email"
                      name="email"
                      autoComplete="email"
                      aria-label="Business email"
                      placeholder="Business Email *"
                      value={cValues.email}
                      onChange={(e) => handleCChange('email', e.target.value)}
                    />
                  </div>

                  <div className="c-row2">
                    <input
                      className="c-field"
                      type="tel"
                      name="phone"
                      autoComplete="tel"
                      aria-label="Phone number"
                      placeholder="Phone Number"
                      value={cValues.phone}
                      onChange={(e) => handleCChange('phone', e.target.value)}
                    />
                    <select
                      className="c-field"
                      name="service"
                      aria-label="Select service"
                      value={cValues.service}
                      onChange={(e) => handleCChange('service', e.target.value)}
                    >
                      <option value="">Select Service</option>
                      {CONTACT_SERVICES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  <textarea
                    className={`c-field${cErrors.message ? ' has-error' : ''}`}
                    name="message"
                    aria-label="Tell us about your project"
                    placeholder="Tell us about your project *"
                    value={cValues.message}
                    onChange={(e) => handleCChange('message', e.target.value)}
                  ></textarea>

                  <button type="submit" className="c-submit">
                    Send Message
                  </button>
                  <p className="c-note">
                    By submitting, you agree to our privacy policy. We never share your data.
                  </p>
                </form>
              )}
            </div>
          </div>

          {/* ——— RIGHT: Trusted by + Our partners ——— */}
          <aside className="contact-trust reveal" ref={addRevealRef}>
            <div className="trust-block">
              <h3 className="trust-title-sm">Trusted by</h3>
              <div className="trust-logos-grid">
                {TRUST_LOGOS.map((logo, i) => (
                  <div className="trust-logo-mini" key={i}>
                    <img
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
                ))}
              </div>
            </div>

            <div className="trust-block">
              <h3 className="trust-title-sm">Our partners</h3>
              <div className="partners-row">
                <span className="partner-badge" style={{ color: '#FF9900' }}>
                  aws
                </span>
                <span className="partner-badge" style={{ color: '#5E5E5E' }}>
                  Microsoft
                </span>
                <span className="partner-badge" style={{ color: '#4285F4' }}>
                  Google Cloud
                </span>
                <span className="partner-badge" style={{ color: '#1F70C1' }}>
                  IBM
                </span>
              </div>
              <p className="trust-note">
                Certified partner across cloud, security &amp; enterprise platforms — ISO 27001:2022 certified
                delivery.
              </p>
            </div>
          </aside>
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
        <div
          className="cert-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.name}
          onClick={() => setLightbox(null)}
        >
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