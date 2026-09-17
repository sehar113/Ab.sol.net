import React, { useState } from 'react';
import './css/navbar.css';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleDropdown = (index) => setOpenDropdown(openDropdown === index ? null : index);
  const handleMouseLeave = () => {
    if (window.innerWidth > 850) setOpenDropdown(null);
  };

  return (
    <header className="site-header">
      <div className="topbar">
        {/* LOGO */}
        <a href="/home" className="logo-link" aria-label="Absolute Solution home">
          <svg className="logo-svg" viewBox="0 0 210 58" fill="none" xmlns="http://www.w3.org/2000/svg">
            <text x="0" y="36" fontFamily="DM Sans, Arial, sans-serif" fontWeight="700" fontSize="25" fill="#17191d" letterSpacing="-0.03em">ABSOLUTE</text>
            <text x="0" y="51" fontFamily="DM Sans, Arial, sans-serif" fontWeight="600" fontSize="10" fill="#911616" letterSpacing="0.18em">SOLUTION</text>
            <circle cx="175" cy="25" r="6" fill="#911616" opacity="0.08" />
            <path d="M173 21 L178 25 L173 29" stroke="#911616" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.75" />
          </svg>
        </a>

        {/* MOBILE MENU TOGGLE */}
        <button className={`menu-toggle ${isMobileMenuOpen ? 'active' : ''}`} type="button" onClick={toggleMobileMenu}>
          <span></span><span></span><span></span>
        </button>

        {/* NAVIGATION */}
        <nav className={`main-nav ${isMobileMenuOpen ? 'active' : ''}`}>
          <a href="/home" className="nav-link simple-link">Home</a>

          {/* ABOUT US */}
          <div className={`nav-item has-menu ${openDropdown === 0 ? 'open' : ''}`} onMouseLeave={handleMouseLeave}>
            <button className="nav-link dropdown-trigger" type="button" onClick={() => toggleDropdown(0)}>
              About Us <span className="arrow">⌄</span>
            </button>
            <div className="mega-menu about-menu">
              <div className="dropdown-column">
                <p className="menu-title">ABOUT US</p>
                <a href="#">Compliance & Global Certificate</a>
              </div>
            </div>
          </div>

          {/* PRODUCTS */}
          <div className={`nav-item has-menu ${openDropdown === 1 ? 'open' : ''}`} onMouseLeave={handleMouseLeave}>
            <button className="nav-link dropdown-trigger" type="button" onClick={() => toggleDropdown(1)}>
              Products <span className="arrow">⌄</span>
            </button>
            <div className="mega-menu products-mega">
              <div className="dropdown-column">
                <p className="menu-title">BUSINESS APPLICATION DEVELOPMENT</p>
                <a href="https://ab-sol.net/document-management-system">Document Management System</a>
                <a href="https://ab-sol.net/best-inventory">Best Inventory Management System</a>
                <a href="https://ab-sol.net/Time-Attendance">Time & Attendance Management System</a>
                <a href="https://ab-sol.net/procurement-automation">Procurement Automation System</a>
                <a href="https://ab-sol.net/ai-development-outsourcing">AI Development & Outsourcing</a>
                <a href="https://ab-sol.net/maximo-outsourcing">Maximo Outsourcing</a>
                <a href="https://ab-sol.net/healthcare-services-outsourcing">Health Care Services Outsourcing</a>
                <a href="https://ab-sol.net/quality-assurance-testing-services">Quality Assurance Testing Services</a>
                <a href="https://ab-sol.net/ibm-solutions">IBM Sphere & Message Brokers</a>
              </div>
              <div className="dropdown-column">
                <p className="menu-title">BANKING AND FINANCIAL SOLUTIONS</p>
                <a href="https://ab-sol.net/anti-money">Anti-Money Laundering Application</a>
                <a href="https://ab-sol.net/auction-bidding">Auction & Bidding</a>
                <a href="https://ab-sol.net/billing">Billing and VAT</a>
                <a href="https://ab-sol.net/cash-in-transit">Cash-In-Transit Tracker Application</a>
                <a href="https://ab-sol.net/federal-reporting">Federal Reporting Application</a>
                <a href="https://ab-sol.net/IPO">Initial Public Offering (IPO) Management System</a>
                <a href="https://ab-sol.net/mci-link">MCI Link Application</a>
                <a href="https://ab-sol.net/customer-account-master-data">Customer Account Master Data</a>
              </div>
              <div className="dropdown-column">
                <p className="menu-title">HEALTH CARE SOLUTIONS</p>
                <a href="https://ab-sol.net/Smartonco">SmartOnco Pharmaceutical Sales</a>
                <a href="https://ab-sol.net/medical-registry">Medical Registry Application</a>
                <a href="https://ab-sol.net/medical-healthcare-industries-solutions">Medical & Healthcare Industries Solutions</a>
              </div>
              <div className="dropdown-column">
                <p className="menu-title">HARDWARE PRODUCTS</p>
                <a href="https://ab-sol.net/servers">Servers</a>
                <a href="https://ab-sol.net/storages">Storages</a>
              </div>
              <div className="dropdown-column">
                <p className="menu-title">NETWORK & INFRASTRUCTURE</p>
                <a href="https://ab-sol.net/network">Network & Infrastructure</a>
              </div>
              <div className="dropdown-column other-solutions">
                <p className="menu-title">OTHER SOLUTIONS</p>
                <a href="https://ab-sol.net/case-management-system">Case Management System (CMS)</a>
                <a href="https://ab-sol.net/legal-case-management-system">Legal Case Management System</a>
                <a href="https://raptoreye.net/">Raptor Eye</a>
                <a href="http://visage-erp.com/">Visage (ERP)</a>
              </div>
            </div>
          </div>

          {/* CYBER SECURITY */}
          <div className={`nav-item has-menu ${openDropdown === 2 ? 'open' : ''}`} onMouseLeave={handleMouseLeave}>
            <button className="nav-link dropdown-trigger" type="button" onClick={() => toggleDropdown(2)}>
              Cyber Security Services <span className="arrow">⌄</span>
            </button>
            <div className="mega-menu cyber-menu">
              <div className="dropdown-column">
                <p className="menu-title">CYBER SECURITY SERVICES</p>
                <a href="https://ab-sol.net/cyber-security">General Cyber Security Service</a>
                <a href="https://ab-sol.net/VAPTServices">VAPT Services</a>
                <a href="https://ab-sol.net/ccc">CCC Compliance</a>
                <a href="https://ab-sol.net/ccc-plus">CCC+ Compliance</a>
                <a href="https://ab-sol.net/nca-ecc">NCA ECC Journey</a>
                <a href="https://ab-sol.net/ciso-services">CISO Services</a>
                <a href="https://raptoreye.net/">Raptor Eye</a>
              </div>
            </div>
          </div>

          {/* GENERAL IT */}
          <div className={`nav-item has-menu ${openDropdown === 3 ? 'open' : ''}`} onMouseLeave={handleMouseLeave}>
            <button className="nav-link dropdown-trigger" type="button" onClick={() => toggleDropdown(3)}>
              General IT Services <span className="arrow">⌄</span>
            </button>
            <div className="mega-menu it-menu">
              <div className="dropdown-column">
                <p className="menu-title">GENERAL IT SERVICES</p>
                <a href="https://ab-sol.net/Services">Business Process Re-Engineering</a>
                <a href="https://ab-sol.net/Software-Development">Software Development</a>
                <a href="https://ab-sol.net/Web-Development">Web Development</a>
                <a href="https://ab-sol.net/mobile-app">Mobile Application Development</a>
                <a href="https://ab-sol.net/Testing-Services">Quality Assurance and Testing Service</a>
              </div>
            </div>
          </div>

          <a href="https://ab-sol.net/careers" className="nav-link simple-link">Career</a>
          <a href="https://ab-sol.net/our-team" className="nav-link simple-link">Our Team</a>
          <a href="https://ab-sol.net/contact" className="nav-link simple-link">Contact Us</a>
          <a href="https://ab-sol.net/contact" className="nav-quote-btn">Get Quote</a>
        </nav>

        {/* CTA */}
        <a href="https://ab-sol.net/contact" className="header-cta">Get Quote</a>
      </div>
    </header>
  );
}
  