import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  FaInstagram,
  FaLinkedinIn,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import "./Footer.css";
import { dir } from "i18next";
import { useLanguage } from "../../contexts/LanguageContext";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { language } = useLanguage();

  const handleNavigation = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-grid">
          {/* Company Info */}
          <div className="footer-section">
            <h3>TG MENA</h3>
            <p className="company-description">
              {t("footer.companyDescription")}
            </p>
            <div
              className="social-links"
              style={{ display: "flex", gap: "1rem", justifyContent: "start" }}
            >
              <a
                href="https://www.instagram.com/tg.mena?igsh=dXEyYXZmdHg3Yjk4"
                className="social-icon"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.linkedin.com/company/towardsgreatness/"
                className="social-icon"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4>{t("footer.quickLinks")}</h4>
            <ul className="footer-links">
              <li>
                <button
                  onClick={() => handleNavigation("/services")}
                  className="footer-nav-button"
                >
                  {t("nav.services")}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("/work")}
                  className="footer-nav-button"
                >
                  {t("footer.projects")}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("/about")}
                  className="footer-nav-button"
                >
                  {t("footer.aboutUs")}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("/contact")}
                  className="footer-nav-button"
                >
                  {t("nav.contact")}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("/")}
                  className="footer-nav-button"
                >
                  {t("footer.home")}
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="footer-section">
            <h4>{t("footer.services")}</h4>
            <ul className="footer-links">
              <li>
                <button
                  onClick={() => handleNavigation("/services/media-production")}
                  className="footer-nav-button"
                >
                  {t("footer.mediaProduction")}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("/services/marketing")}
                  className="footer-nav-button"
                >
                  {t("footer.marketing")}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("/services/tech")}
                  className="footer-nav-button"
                >
                  {t("footer.tech")}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("/services")}
                  className="footer-nav-button"
                >
                  {t("footer.allServices")}
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h4>{t("footer.contactUs")}</h4>
            <ul className="footer-links" style={{ direction: "ltr" }}>
              <li>
                <a href="tel:‎+966 50 397 4458">
                  <FaPhoneAlt className="footer-link-icon" />
                  ‎+966 50 397 4458
                </a>
              </li>
              <li>
                <a href="mailto:Info@tgmena.com">
                  <FaEnvelope className="footer-link-icon" />
                  Info@tgmena.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="newsletter-section">
          <h4>{t("footer.newsletter.title")}</h4>
          <p>{t("footer.newsletter.subtitle")}</p>
          <form className="newsletter-form">
            <input
              type="email"
              placeholder={t("footer.newsletter.placeholder")}
              className="newsletter-input"
            />
            <motion.button
              type="submit"
              className="newsletter-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t("footer.newsletter.button")}
            </motion.button>
          </form>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div className="copyright">
            © {currentYear} {t("footer.copyright")}
          </div>
          <div className="footer-bottom-links">
            <a href="#privacy">{t("footer.privacyPolicy")}</a>
            <a href="#terms">{t("footer.termsOfService")}</a>
            <a href="#cookies">{t("footer.cookiePolicy")}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
