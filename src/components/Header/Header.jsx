import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../contexts/LanguageContext";
const logo = "/assets/Logo (1).png";
import "./Header.css";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [headerWidth, setHeaderWidth] = useState("200px");
  const [logoAnimationComplete, setLogoAnimationComplete] = useState(false);
  const { scrollY } = useScroll();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const { language, toggleLanguage } = useLanguage();

  // Set responsive header width
  useEffect(() => {
    const updateWidth = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth <= 900) {
        setHeaderWidth("calc(100% - 4rem)");
      } else if (screenWidth > 900 && screenWidth <= 1000) {
        setHeaderWidth("calc(100% - 11.5rem)");
      } else {
        setHeaderWidth("800px");
      }
    };
    
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Transform header background based on scroll
  const headerBackground = useTransform(
    scrollY,
    [0, 100],
    ["rgba(0, 0, 0, 0.1)", "rgba(0, 0, 0, 0.95)"]
  );

  const headerBlur = useTransform(
    scrollY,
    [0, 100],
    ["blur(0px)", "blur(20px)"]
  );

  // Effect to handle scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: t("nav.home"), path: "/" },
    { name: t("nav.about"), path: "/about" },
    { name: t("nav.services"), path: "/services" },
    { name: t("nav.work"), path: "/work" },
    { name: t("nav.contact"), path: "/contact" },
  ];

  const handleNavClick = (item) => {
    if (item.path) {
      // For page navigation
      navigate(item.path);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.header
      className={`header ${isScrolled ? "scrolled" : ""}`}
      style={{
        background: headerBackground,
        backdropFilter: headerBlur,
      }}
      initial={{ 
        y: -100,
        width: "200px"
      }}
      animate={{ 
        y: 0,
        width: headerWidth
      }}
      transition={{ 
        y: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
        width: { duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.6 }
      }}
    >
      <motion.div 
        className="header-container"
        initial={{ 
          justifyContent: "center"
        }}
        animate={{ 
          justifyContent: "space-between"
        }}
        transition={{ 
          duration: 1.2, 
          ease: [0.16, 1, 0.3, 1], 
          delay: 0.6 
        }}
      >
        <motion.div
          className="header-logo"
          initial={{ 
            position: "absolute",
            left: "50%",
            x: "-50%"
          }}
          animate={{ 
            position: logoAnimationComplete ? "relative" : "absolute",
            left: logoAnimationComplete ? "auto" : "1.5rem",
            x: "0"
          }}
          transition={{ 
            duration: 1.2, 
            ease: [0.16, 1, 0.3, 1], 
            delay: 0.6,
            onComplete: () => {
              // Switch to relative positioning after animation completes
              setTimeout(() => {
                setLogoAnimationComplete(true);
              }, 100);
            }
          }}
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
          <motion.div
            className="logo-symbol"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 1,
              filter: [
                "drop-shadow(0 0 20px rgba(229, 9, 20, 0.3))",
                "drop-shadow(0 0 30px rgba(229, 9, 20, 0.6))",
                "drop-shadow(0 0 20px rgba(229, 9, 20, 0.3))",
              ],
            }}
            transition={{
              scale: { type: "spring", stiffness: 350, damping: 30, mass: 0.9, delay: 0.1 },
              opacity: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 },
              filter: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }
            }}
          >
            <img src={logo} alt="TG MENA" className="header-logo" />
          </motion.div>
        </motion.div>

        {/* Navigation */}
        <motion.nav 
          className="header-nav"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <ul className="nav-list" style={{ direction: "ltr" }}>
            {navItems.map((item, index) => (
              <motion.li
                key={item.name}
                className="nav-item"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.4 + index * 0.12, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.a
                  className={`nav-link ${
                    location.pathname === item.path ? "active" : ""
                  }`}
                  onClick={() => handleNavClick(item)}
                  whileHover={{
                    color: "#E50914",
                    textShadow: "0 0 10px rgba(229, 9, 20, 0.5)",
                  }}
                  transition={{ duration: 0.3 }}
                  style={{ cursor: "pointer" }}
                >
                  {item.name}
                  <motion.span
                    className="nav-underline"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              </motion.li>
            ))}
          </ul>

          {/* Language Toggle Button */}
          <motion.button
            className="language-toggle"
            onClick={toggleLanguage}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="language-text">
              {language === "en" ? "AR" : "EN"}
            </span>
          </motion.button>
        </motion.nav>

        {/* Mobile Menu Toggle */}
        <motion.button
          className="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.span
            className="hamburger-line"
            animate={{
              rotate: isMobileMenuOpen ? 45 : 0,
              y: isMobileMenuOpen ? 6 : 0,
            }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className="hamburger-line"
            animate={{
              opacity: isMobileMenuOpen ? 0 : 1,
            }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className="hamburger-line"
            animate={{
              rotate: isMobileMenuOpen ? -45 : 0,
              y: isMobileMenuOpen ? -6 : 0,
            }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>
      </motion.div>

      {/* Mobile Menu */}
      <motion.div
        className={`mobile-menu ${isMobileMenuOpen ? "open" : ""}`}
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: isMobileMenuOpen ? 1 : 0,
          height: isMobileMenuOpen ? "auto" : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <motion.ul className="mobile-nav-list">
          {navItems.map((item, index) => (
            <motion.li
              key={item.name}
              className="mobile-nav-item"
              initial={{ opacity: 0, y: -10 }}
              animate={{
                opacity: isMobileMenuOpen ? 1 : 0,
                y: isMobileMenuOpen ? 0 : -10,
              }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <motion.a
                className={`mobile-nav-link ${
                  location.pathname === item.path ? "active" : ""
                }`}
                onClick={() => handleNavClick(item)}
                whileHover={{
                  color: "#E50914",
                }}
                transition={{ duration: 0.3 }}
                style={{ cursor: "pointer" }}
              >
                {item.name}
              </motion.a>
            </motion.li>
          ))}
          {/* Language Toggle in Mobile Menu */}
          <motion.li
            className="mobile-nav-item mobile-language-item"
            initial={{ opacity: 0, y: -10 }}
            animate={{
              opacity: isMobileMenuOpen ? 1 : 0,
              y: isMobileMenuOpen ? 0 : -10,
            }}
            transition={{ duration: 0.3, delay: navItems.length * 0.1 }}
          >
            <motion.button
              className="mobile-language-toggle"
              onClick={toggleLanguage}
              whileHover={{ color: "#E50914" }}
              whileTap={{ scale: 0.95 }}
            >
              {language === "en" ? "العربية" : "English"}
            </motion.button>
          </motion.li>
        </motion.ul>
      </motion.div>
    </motion.header>
  );
};

export default Header;
