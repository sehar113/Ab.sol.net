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
  { value: 20, suffix: '+', label: 'Years of Experience', desc: 'Two decades of IT & cybersecurity excellence since 2002' },
  { value: 54, suffix: '', label: 'Experts Team', desc: 'Skilled engineers, consultants & security specialists' },
  { value: 375, suffix: '', label: 'Projects Completed', desc: 'Successfully delivered across multiple industries' },
  { value: 340, suffix: '+', label: 'Happy Clients', desc: 'Enterprises trusting us across KSA, USA & Australia' },
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


const CASE_STUDIES = [
  {
    tag: 'Banking & Finance',
    title: 'Automated payment reconciliation platform for a leading UK bank',
    desc: 'We rebuilt a legacy reconciliation workflow into a real-time, rules-driven platform processing millions of transactions daily with full audit trails.',
    metric: '65%',
    metricLabel: 'faster reconciliation cycles',
    stats: [
      { value: '65%', label: 'Faster reconciliation' },
      { value: '30%', label: 'Lower ops cost' },
      { value: '24/7', label: 'Real-time monitoring' },
    ],
    theme: 'indigo',
    featured: true,
  },
  {
    tag: 'Healthcare',
    title: 'AI-powered patient registry for a US healthcare network',
    desc: 'A secure registry platform uniting oncology data from 12 hospitals with role-based access and clinical analytics.',
    metric: '1.2M',
    metricLabel: 'patient records unified',
    stats: [
      { value: '1.2M', label: 'Records unified' },
      { value: '99.9%', label: 'Platform uptime' },
    ],
    theme: 'crimson',
  },
  {
    tag: 'Logistics',
    title: 'Real-time fleet analytics for a KSA logistics leader',
    desc: 'Live telemetry dashboards and route intelligence across 2,000+ vehicles operating in the region.',
    metric: '3x',
    metricLabel: 'faster delivery insights',
    stats: [
      { value: '3x', label: 'Faster insights' },
      { value: '45%', label: 'Route optimization' },
    ],
    theme: 'teal',
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
    title: 'Deep-dive into your codebase & delivery pipeline',
    desc: 'Our engineers work directly inside your codebase with your team. Every AI workflow is documented, every gap is sized, and every opportunity is costed. If nothing in the report justifies the next step — you simply stop here. No strings attached.',
    points: ['Full codebase & workflow audit', 'Gap analysis with cost estimates', 'Executive-ready assessment report'],
  },
  {
    num: '02',
    name: 'Pilot',
    duration: '4–6 Weeks',
    title: 'Implement the highest-value AI workflow first',
    desc: 'A small senior team ships one measurable AI-powered workflow end-to-end — integrated with your actual cloud, data, and security infrastructure. Success metrics are agreed before the first line of code, so results are never a matter of opinion.',
    points: ['One production-ready AI workflow', 'Baseline metrics agreed upfront', 'Weekly demos, zero surprises'],
  },
  {
    num: '03',
    name: 'Expand',
    duration: '3–6 Months',
    title: 'Roll out proven workflows across your teams',
    desc: 'With the pilot validated, we scale across engineering, QA, and business units — with delivery governance, documented playbooks, and training so your own people can own and operate the system independently.',
    points: ['Multi-team rollout plan', 'Playbooks & internal training', 'Delivery governance that scales'],
  },
  {
    num: '04',
    name: 'eXceed',
    duration: 'Ongoing',
    title: 'Continuous optimization, measurable quarter by quarter',
    desc: 'Quarterly reviews measure AI impact against your actual delivery metrics — throughput, quality, time-to-market. We keep optimizing what works and cut what does not. You stay in control of every renewal.',
    points: ['Quarterly impact reviews', 'Metric-driven optimization', 'Exit anytime — no lock-in'],
  },
];

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
              <p className="trust-eyebrow">IT Company Riyadh</p>
              <h1 className="trust-title">
                20 Years of Experience in IT
                <em>AI Agent Development &amp; Cybersecurity - Cloud Computing Security Services</em>
                <span className="trust-title-tag">
                  Trusted Software Development Company in Saudi Arabia
                </span>
              </h1>
            </div>

            <div className="trust-head-right">
              <span className="trust-head-num">/ Since 2002</span>
              <p className="trust-sub">
                From Customer Relationship Management to advanced cybersecurity,
                Absolute Solution has spent two decades helping enterprises across
                KSA, USA &amp; Australia modernize, secure, and scale with confidence.
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
                Our Global Certifications<em>&amp; Accreditations</em>
              </h2>
              <span className="certs-line"></span>
              <p className="certs-sub">
                Absolute Solutions is certified with internationally recognized standards
                that demonstrate our commitment to quality, security, and continuous
                improvement — giving our clients complete confidence in every project
                we deliver.
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
            Working at the highest level
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

            {/* =============================================
          SECTION: GOOGLE REVIEWS (real reviews)
      ============================================== */}
      <section className="gr-section" id="google-reviews">
        <div className="gr-head reveal" ref={addRevealRef}>
          <p className="sec-eyebrow">Google Reviews</p>
          <h2 className="sec-h2">
            What our clients say,<em>straight from Google.</em>
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

        {/* BG IMAGE + GLOW ORBS */}
        <div className="ai-bg-image" aria-hidden="true"></div>
        <span className="ai-glow ai-glow-1" aria-hidden="true"></span>
        <span className="ai-glow ai-glow-2" aria-hidden="true"></span>
        <span className="ai-glow ai-glow-3" aria-hidden="true"></span>

        <div className="ai-inner">
          <div className="ai-copy reveal" ref={addRevealRef}>
            <p className="ai-eyebrow">Engineering Intelligence</p>
            <h2 className="ai-title">
              AI tool adoption is up across enterprise engineering.
              <em>Delivery metrics are not.</em>
            </h2>
            <p className="ai-desc">
              Buying tools is easy — proving impact is not. We help enterprises turn
              AI investment into measurable engineering outcomes: faster throughput,
              higher quality, and shorter time-to-market, with clear baselines and
              delivery governance that scales across teams.
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

            {/* FLOATING TERMINAL */}
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

            {/* FLOATING LIVE BADGE */}
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

        {/* POSITION STATEMENT */}
        <p className="ai-position reveal" ref={addRevealRef}>
          <em>Pragmatic AI Software Engineering</em> is Absolute Solution's position on both —
          measured on your <span className="ai-position-mark">actual codebase</span>, connected to
          your <span className="ai-position-mark">actual infrastructure</span>, before it scales.
        </p>
      </section>
       

             {/* =============================================
          SECTION 4-B: ENGAGEMENT PHASES (interactive)
      ============================================== */}
      <section
        className="phases-section"
        id="phases"
        onMouseEnter={() => setPhasePaused(true)}
        onMouseLeave={() => setPhasePaused(false)}
      >
        <div className="phases-head reveal" ref={addRevealRef}>
          <p className="sec-eyebrow">How We Engage</p>
          <h2 className="phases-title">
            Four phases. One exit at each.
            <em>No long-term commitment at any of them.</em>
          </h2>
        </div>

        {/* ——— INTERACTIVE STEPPER ——— */}
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

        {/* ——— ACTIVE PHASE PANEL ——— */}
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


      {/* ============ SECTION 5: SERVICES DIRECTORY ============ */}
      <section className="services-directory">
        <div className="section-heading reveal" ref={addRevealRef}>
          <div>
            <p className="eyebrow" style={{ color: 'var(--muted)' }}>
              IT &amp; Cybersecurity Solutions
            </p>
            <h2>
              Trusted IT &amp; Cybersecurity Solutions,<em>for Business Growth</em>
            </h2>
          </div>
          <a href="/products">View all services →</a>
        </div>

        <div className="services-dir-grid reveal" ref={addRevealRef}>
          {/* COLUMN 1: Banking */}
          <div className="svc-column">
            <div className="svc-column-head">
              <span className="svc-tag">Banking &amp; Finance Services</span>
              <h3>
                Banking &amp; Financial
                <br />
                Technology Solutions
              </h3>
              <p>
                Absolute Solutions provides innovative banking and financial technology solutions designed to help
                financial institutions improve efficiency, security, and customer experience. Our solutions support
                modern banking operations with reliable technology, secure systems, and scalable digital services.
                <br />
                We help banks and financial organizations streamline operations, strengthen cybersecurity, modernize
                banking systems, and deliver secure digital banking experiences. Our technology-driven approach
                enables businesses to adapt to changing financial needs while building reliable and future-ready
                banking infrastructure.
              </p>
            </div>
            <ul className="svc-list">
              <li>
                <a href="https://ab-sol.net/account-statement">
                  <span className="svc-list-icon">→</span>
                  <div>
                    <b>Account Statement</b>
                    <small>Automated statement generation &amp; delivery</small>
                  </div>
                </a>
              </li>
              <li>
                <a href="https://ab-sol.net/billing-vat-ems">
                  <span className="svc-list-icon">→</span>
                  <div>
                    <b>Billing &amp; VAT (EMS)</b>
                    <small>Electronic billing &amp; VAT compliance system</small>
                  </div>
                </a>
              </li>
              <li>
                <a href="https://ab-sol.net/customer-account-master-data">
                  <span className="svc-list-icon">→</span>
                  <div>
                    <b>Customer Account Master Data</b>
                    <small>Centralized customer data management</small>
                  </div>
                </a>
              </li>
              <li>
                <a href="https://ab-sol.net/federal-reporting">
                  <span className="svc-list-icon">→</span>
                  <div>
                    <b>Federal Reporting</b>
                    <small>Regulatory compliance &amp; federal reporting tools</small>
                  </div>
                </a>
              </li>
              <li>
                <a href="https://ab-sol.net/mci-link-application">
                  <span className="svc-list-icon">→</span>
                  <div>
                    <b>MCI Link Application</b>
                    <small>Seamless MCI integration platform</small>
                  </div>
                </a>
              </li>
              <li>
                <a href="https://ab-sol.net/ipo-management-module">
                  <span className="svc-list-icon">→</span>
                  <div>
                    <b>IPO Management Module</b>
                    <small>Complete IPO lifecycle management</small>
                  </div>
                </a>
              </li>
              <li>
                <a href="https://ab-sol.net/auction-bidding-system">
                  <span className="svc-list-icon">→</span>
                  <div>
                    <b>Auction &amp; Bidding System</b>
                    <small>Digital auction &amp; bid management platform</small>
                  </div>
                </a>
              </li>
            </ul>
            <a href="https://ab-sol.net/products" className="svc-view-all">
              View All Banking Solutions →
            </a>
          </div>

          {/* COLUMN 2: SaaS */}
          <div className="svc-column">
            <div className="svc-column-head">
              <span className="svc-tag">SaaS</span>
              <h3>
                SaaS Solutions for Industrial &amp;
                <br />
                Business Applications
              </h3>
              <p>
                Absolute Solutions provides scalable Software as a Service (SaaS) solutions designed to help
                businesses streamline operations, reduce software infrastructure costs, and improve productivity.
                Our cloud-based software solutions provide flexible access to essential business applications
                without the need for costly on-premise installation and maintenance.
                <br />
                Our SaaS development solutions help businesses adopt secure, scalable, and cost-effective technology
                while supporting long-term growth. From industrial applications to specialized business software, we
                deliver solutions that can adapt to changing business needs.
              </p>
            </div>
            <ul className="svc-list">
              <li>
                <a href="https://ab-sol.net/inventory-control-management">
                  <span className="svc-list-icon">→</span>
                  <div>
                    <b>Inventory Control &amp; Management</b>
                    <small>Real-time inventory tracking &amp; optimization</small>
                  </div>
                </a>
              </li>
              <li>
                <a href="https://ab-sol.net/raptor-eye-solution">
                  <span className="svc-list-icon">→</span>
                  <div>
                    <b>Raptor Eye Solution</b>
                    <small>Advanced surveillance &amp; monitoring system</small>
                  </div>
                </a>
              </li>
              <li>
                <a href="https://ab-sol.net/document-management-system">
                  <span className="svc-list-icon">→</span>
                  <div>
                    <b>Document Management System</b>
                    <small>Secure digital document workflow &amp; storage</small>
                  </div>
                </a>
              </li>
            </ul>
            <a href="https://ab-sol.net/products" className="svc-view-all">
              View All SaaS Solutions →
            </a>
          </div>

          {/* COLUMN 3: Health */}
          <div className="svc-column">
            <div className="svc-column-head">
              <span className="svc-tag">Healthcare Software Solutions</span>
              <h3>
                Healthcare Software Development Solutions
                <br /> |Health Industry
              </h3>
              <p>
                Absolute Solutions provides secure and scalable healthcare software solutions designed to help
                healthcare organizations streamline operations, improve efficiency, and deliver better digital
                experiences. Our technology solutions support modern healthcare workflows while focusing on security,
                reliability, and performance.
                <br />
                We develop custom healthcare software tailored to the needs of hospitals, clinics, medical
                organizations, and healthcare businesses, helping them modernize their operations with innovative
                digital solutions.
              </p>
            </div>
            <ul className="svc-list">
              <li>
                <a href="https://ab-sol.net/smartonco">
                  <span className="svc-list-icon">→</span>
                  <div>
                    <b>SmartOnco</b>
                    <small>Oncology management &amp; treatment planning</small>
                  </div>
                </a>
              </li>
              <li>
                <a href="https://ab-sol.net/medical-care-registries">
                  <span className="svc-list-icon">→</span>
                  <div>
                    <b>Medical Care Registries</b>
                    <small>Patient registry &amp; medical records system</small>
                  </div>
                </a>
              </li>
              <li>
                <a href="https://ab-sol.net/medical-healthcare-industries-solutions">
                  <span className="svc-list-icon">→</span>
                  <div>
                    <b>Healthcare Industries Portfolio</b>
                    <small>Complete healthcare technology suite</small>
                  </div>
                </a>
              </li>
            </ul>
            <a href="https://ab-sol.net/medical-healthcare-industries-solutions" className="svc-view-all">
              View All Healthcare Solutions →
            </a>
          </div>
        </div>
      </section>

      {/* ============ SECTION 6: CATEGORIES ============ */}
      <section className="cat-section">
        <div className="cat-header reveal" ref={addRevealRef}>
          <p className="eyebrow" style={{ color: 'var(--muted)' }}>
            WHAT WE DO
          </p>
          <h2>
            Our Business Ethics &amp; Values, <em>Simplified.</em>
          </h2>
          <p>
            From enterprise applications and IT services to advanced cybersecurity, we help organizations build
            secure and intelligent digital ecosystems.
          </p>
        </div>

        <div className="cat-grid">
          <a href="/products" className="cat-card reveal" data-color="indigo" ref={addRevealRef}>
            <div className="cat-card-img">
              <img src="/images/Business application development services in usa.png" alt="Business Applications" />
              <span className="cat-card-num">01</span>
            </div>
            <div className="cat-card-body">
              <h3>
                Business
                <br />
                Applications
              </h3>
              <p>Powerful enterprise solutions designed around your business.</p>
              <span className="cat-card-link">
                Explore
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </div>
            <div className="cat-card-bar"></div>
          </a>

          <a href="/cyber-security" className="cat-card reveal delay" data-color="crimson" ref={addRevealRef}>
            <div className="cat-card-img">
              <img src="/images/cyber security solutions company ,saudi arabia.jpg" alt="Cyber Security" />
              <span className="cat-card-num">02</span>
            </div>
            <div className="cat-card-body">
              <h3>
                Cyber
                <br />
                Security
              </h3>
              <p>Protect your organization with advanced cybersecurity solutions.</p>
              <span className="cat-card-link">
                Explore
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </div>
            <div className="cat-card-bar"></div>
          </a>

          <a href="/software-development" className="cat-card reveal delay2" data-color="teal" ref={addRevealRef}>
            <div className="cat-card-img">
              <img
                src="/images/software development company website in USA, UK, Saudia ,Pakistan.png"
                alt="Software Development"
              />
              <span className="cat-card-num">03</span>
            </div>
            <div className="cat-card-body">
              <h3>
                Software
                <br />
                Development
              </h3>
              <p>Build scalable and intelligent digital products.</p>
              <span className="cat-card-link">
                Explore
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </div>
            <div className="cat-card-bar"></div>
          </a>

          <a
            href="/web-development"
            className="cat-card reveal"
            style={{ transitionDelay: '.32s' }}
            data-color="slate"
            ref={addRevealRef}
          >
            <div className="cat-card-img">
              <img
                src="/images/it infrastructure Deployment comapny services Reliable & Cost-Effective.png"
                alt="IT Infrastructure"
              />
              <span className="cat-card-num">04</span>
            </div>
            <div className="cat-card-body">
              <h3>
                IT &amp;
                <br />
                Infrastructure
              </h3>
              <p>Reliable infrastructure and technology services for modern businesses.</p>
              <span className="cat-card-link">
                Explore
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </div>
            <div className="cat-card-bar"></div>
          </a>
        </div>
      </section>

      {/* ============ SECTION 7: CASE STUDIES ============ */}
      <section className="cases-section" id="case-studies">
        <div className="cases-head reveal" ref={addRevealRef}>
          <div>
            <p className="sec-eyebrow">Success Stories</p>
            <h2 className="sec-h2">
              Results our clients measure,<em>not just promises.</em>
            </h2>
          </div>
          <a href="/case-studies" className="sec-link">View all case studies →</a>
        </div>

        <div className="cases-grid reveal" ref={addRevealRef}>
          {CASE_STUDIES.map((cs, i) => (
            <article className={`case-card${cs.featured ? ' featured' : ''}`} key={i}>
              <div className={`case-media theme-${cs.theme}`}>
                <span className="case-tag">{cs.tag}</span>
                <div>
                  <div className="case-metric">{cs.metric}</div>
                  <div className="case-metric-label">{cs.metricLabel}</div>
                </div>
              </div>
              <div className="case-body">
                <h3>{cs.title}</h3>
                <p>{cs.desc}</p>
                <div className="case-stats">
                  {cs.stats.map((s) => (
                    <div className="case-stat" key={s.label}>
                      <b>{s.value}</b>
                      <span>{s.label}</span>
                    </div>
                  ))}
                </div>
                <a href="/case-studies" className="case-link">
                  Read full story <span>→</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ============ SECTION 8: INDUSTRIES ============ */}
      <section className="industries-section" id="industries">
        <div className="ind-head reveal" ref={addRevealRef}>
          <p className="sec-eyebrow">Industries We Serve</p>
          <h2 className="sec-h2">
            Deep domain expertise,<em>wherever you operate.</em>
          </h2>
        </div>

        <div className="industries-list reveal" ref={addRevealRef}>
          {INDUSTRIES.map((ind, i) => (
            <a className="industry-row" href="/industries" key={i}>
              <div className="industry-top">
                <span className="industry-num">0{i + 1}</span>
                <h3 className="industry-name">{ind.name}</h3>
                <span className="industry-arrow">→</span>
              </div>
              <div className="industry-info">
                <p>{ind.desc}</p>
                <div className="industry-tags">
                  {ind.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ============ SECTION 9: TESTIMONIALS ============ */}
      <section
        className="testimonials-section"
        id="testimonials"
        onMouseEnter={() => setTPaused(true)}
        onMouseLeave={() => setTPaused(false)}
      >
        <div className="testi-inner reveal" ref={addRevealRef}>
          <p className="sec-eyebrow">What Clients Say</p>
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
              className="testi-btn"
              aria-label="Previous testimonial"
              onClick={() => setTIndex((p) => (p - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
            >
              ←
            </button>
            <span className="testi-count">
              0{tIndex + 1} / 0{TESTIMONIALS.length}
            </span>
            <button
              className="testi-btn"
              aria-label="Next testimonial"
              onClick={() => setTIndex((p) => (p + 1) % TESTIMONIALS.length)}
            >
              →
            </button>
          </div>
        </div>
      </section>

      {/* ============ SECTION 10: AWARDS ============ */}
      <section className="awards-section" id="awards">
        <div className="awards-head reveal" ref={addRevealRef}>
          <p className="sec-eyebrow">Awards &amp; Recognition</p>
          <h2 className="sec-h2">
            Recognized by analysts,<em>rated by clients.</em>
          </h2>
        </div>

        <div className="awards-grid reveal" ref={addRevealRef}>
          {AWARDS.map((a, i) => (
            <div className="award-card" key={i}>
              <span className="award-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="9" r="5" />
                  <path d="M8.6 13.2 7 21l5-2.8L17 21l-1.6-7.8" />
                </svg>
              </span>
              <div>
                <p className="award-name">{a.name}</p>
                <p className="award-org">{a.org} · {a.year}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ SECTION 11: INSIGHTS ============ */}
      <section className="insights-section" id="insights">
        <div className="cases-head reveal" ref={addRevealRef}>
          <div>
            <p className="sec-eyebrow">Insights &amp; Blog</p>
            <h2 className="sec-h2">
              Ideas from our engineers,<em>for your next decision.</em>
            </h2>
          </div>
          <a href="/blog" className="sec-link">Visit the blog →</a>
        </div>

        <div className="insights-grid reveal" ref={addRevealRef}>
          {INSIGHTS.map((post, i) => (
            <a className="insight-card" href="/blog" key={i}>
              <div className={`insight-media theme-${post.theme}`}>
                <span className="insight-cat">{post.cat}</span>
                <span className="insight-num">0{i + 1}</span>
              </div>
              <div className="insight-body">
                <h3>{post.title}</h3>
                <p className="insight-meta">{post.date} · {post.read}</p>
                <span className="insight-link">
                  Read article <span>→</span>
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

            {/* =============================================
          SECTION: RESOURCES & PDF DOWNLOADS
      ============================================== */}
      <section className="res-section" id="resources">
        <div className="res-head reveal" ref={addRevealRef}>
          <p className="sec-eyebrow">Resources &amp; Downloads</p>
          <h2 className="sec-h2">
            Free reports,<em>real insights.</em>
          </h2>
          <p className="res-sub">
            Download our research profiles and product brochures — see exactly how
            our AI and security solutions work before you talk to anyone.
          </p>
        </div>

        {/* ——— FEATURED BANNER ——— */}
        <a
          className="res-banner reveal"
          ref={addRevealRef}
          href={RESOURCES.featured.pdf}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="res-banner-copy">
            <span className="res-banner-tag">{RESOURCES.featured.tag}</span>
            <h3 className="res-banner-title">{RESOURCES.featured.title}</h3>
            <p className="res-banner-desc">{RESOURCES.featured.desc}</p>
            <span className="res-banner-meta">{RESOURCES.featured.meta}</span>
          </div>

          <div className="res-banner-visual">
            <div className="res-doc">
              <span className="res-doc-fold"></span>
              <span className="res-doc-line w70"></span>
              <span className="res-doc-line w90"></span>
              <span className="res-doc-line w50"></span>
              <span className="res-doc-line w80"></span>
              <span className="res-doc-line w60"></span>
            </div>
            <span className="res-doc-badge">PDF</span>
            <span className="res-banner-btn">
              Download the report <span>↓</span>
            </span>
          </div>
        </a>

        {/* ——— BROCHURE CARDS ——— */}
        <div className="res-grid reveal" ref={addRevealRef}>
          {RESOURCES.brochures.map((b, i) => (
            <a
              className="res-card"
              key={i}
              href={b.pdf}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="res-card-doc">
                <div className="res-mini-doc">
                  <span className="res-doc-fold"></span>
                  <span className="res-doc-line w80"></span>
                  <span className="res-doc-line w60"></span>
                  <span className="res-doc-line w70"></span>
                </div>
                <span className="res-doc-badge sm">PDF</span>
              </div>
              <div className="res-card-body">
                <span className="res-card-tag">{b.tag}</span>
                <h3>{b.title}</h3>
                <p>{b.desc}</p>
                <span className="res-card-link">
                  Download Brochure <span>→</span>
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ============ SECTION 12: CONTACT ============ */}
      <section className="contact-section" id="contact">
        <div className="contact-inner">
          <div className="contact-left reveal" ref={addRevealRef}>
            <p className="ai-eyebrow">Contact Us</p>
            <h2 className="contact-title">
              Let's build what's next,<em>together.</em>
            </h2>
            <p className="contact-desc">
              Tell us about your project and get a free consultation with our senior
              engineers within one business day — no obligations, just clear answers.
            </p>

            <div className="contact-rows">
              <a className="contact-row" href="mailto:salesksa@ab-sol.net">
                <span className="contact-row-icon">
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </span>
                <div>
                  <small>Email us</small>
                  <b>salesksa@ab-sol.net</b>
                </div>
              </a>
              <a className="contact-row" href="https://wa.me/966508250090" target="_blank" rel="noopener noreferrer">
                <span className="contact-row-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </span>
                <div>
                  <small>WhatsApp / Call</small>
                  <b>+966 50 825 0090</b>
                </div>
              </a>
            </div>

            <div className="contact-offices">
              <span className="office-chip"><i></i>Riyadh — HQ</span>
              <span className="office-chip"><i></i>USA</span>
              <span className="office-chip"><i></i>Australia</span>
            </div>
          </div>

          <div className="contact-form-card reveal" ref={addRevealRef}>
            {cSent ? (
              <div className="c-success">
                <span className="c-success-check">✓</span>
                <h3>Thank you, {cValues.name.split(' ')[0]}!</h3>
                <p>
                  Your request has been received. Our senior consultants will
                  contact you within one business day.
                </p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} noValidate>
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
                    placeholder="Work Email *"
                    value={cValues.email}
                    onChange={(e) => handleCChange('email', e.target.value)}
                  />
                </div>
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
                  <option value="">What do you need? (optional)</option>
                  {CONTACT_SERVICES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                <textarea
                  className={`c-field${cErrors.message ? ' has-error' : ''}`}
                  placeholder="Tell us about your project *"
                  value={cValues.message}
                  onChange={(e) => handleCChange('message', e.target.value)}
                ></textarea>
                <button className="c-submit" type="submit">
                  Request Free Consultation
                </button>
                <p className="c-note">
                  By submitting, you agree to our privacy policy. We never share your data.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ============ CERTIFICATE LIGHTBOX ============ */}
      {lightbox && (
        <div className="cert-lightbox" onClick={() => setLightbox(null)}>
          <div className="cert-lightbox-inner" onClick={(e) => e.stopPropagation()}>
            <button className="cert-lightbox-close" onClick={() => setLightbox(null)} aria-label="Close">
              ×
            </button>
            <img src={lightbox.img} alt={lightbox.name} />
            <p className="cert-lightbox-name">
              {lightbox.name} — {lightbox.subtitle}
            </p>
          </div>
        </div>
      )}
    </>
  );
}