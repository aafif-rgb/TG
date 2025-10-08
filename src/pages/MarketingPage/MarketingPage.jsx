import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  FaBullhorn,
  FaPaintBrush,
  FaChartLine,
  FaUsers,
  FaRocket,
  FaLightbulb,
  FaCheckCircle,
  FaStar,
  FaQuoteLeft,
} from "react-icons/fa";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./MarketingPage.css";

const MarketingPage = () => {
  const [expandedCard, setExpandedCard] = useState(null);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const canvasRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  const handleCardClick = (index) => {
    if (window.innerWidth <= 768) {
      setExpandedCard(expandedCard === index ? null : index);
    }
  };

  // Particle animation
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let particles = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (
          this.x < 0 ||
          this.x > canvas.width ||
          this.y < 0 ||
          this.y > canvas.height
        ) {
          this.reset();
        }
      }

      draw() {
        ctx.fillStyle = `rgba(229, 9, 20, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < 100; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    initParticles();
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const marketingSubServices = [
    {
      icon: <FaBullhorn />,
      title: t("marketingPage.services.socialMedia.title"),
      description: t("marketingPage.services.socialMedia.description"),
      features: t("marketingPage.services.socialMedia.features", {
        returnObjects: true,
      }),
    },
    {
      icon: <FaPaintBrush />,
      title: t("marketingPage.services.brandStrategy.title"),
      description: t("marketingPage.services.brandStrategy.description"),
      features: t("marketingPage.services.brandStrategy.features", {
        returnObjects: true,
      }),
    },
    {
      icon: <FaChartLine />,
      title: t("marketingPage.services.digitalAds.title"),
      description: t("marketingPage.services.digitalAds.description"),
      features: t("marketingPage.services.digitalAds.features", {
        returnObjects: true,
      }),
    },
    {
      icon: <FaUsers />,
      title: t("marketingPage.services.contentMarketing.title"),
      description: t("marketingPage.services.contentMarketing.description"),
      features: t("marketingPage.services.contentMarketing.features", {
        returnObjects: true,
      }),
    },
  ];

  return (
    <div className="marketing-page">
      <Header />
      <canvas ref={canvasRef} className="particle-canvas" />

      <main className="marketing-content">
        {/* Hero Section */}
        <section className="marketing-hero">
          <div className="hero-content">
            <motion.div
              className="hero-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.span
                className="hero-tag"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {t("marketingPage.hero.tag")}
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {t("marketingPage.hero.title")}
                <span className="highlight">
                  {" "}
                  {t("marketingPage.hero.titleHighlight")}
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                {t("marketingPage.hero.description")}
              </motion.p>
              {/* <motion.div
                className="hero-stats"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                {[
                  { number: "50+", label: "Campaigns Launched" },
                  { number: "25+", label: "Brands Transformed" },
                  { number: "300%", label: "Average ROI Increase" },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="stat-item"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <span className="stat-number">{stat.number}</span>
                    <span className="stat-label">{stat.label}</span>
                  </motion.div>
                ))}
              </motion.div>
              */}
            </motion.div>
          </div>
        </section>

        {/* Main Marketing Services Section */}
        <section className="main-services">
          <div className="section-container">
            <h2>{t("marketingPage.services.title")}</h2>
            <p className="section-description">
              {t("marketingPage.services.subtitle")}
            </p>
            <div className="services-grid">
              {marketingSubServices.map((service, index) => (
                <motion.div
                  key={service.title}
                  className={`service-card ${
                    expandedCard === index ? "expanded" : ""
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  onClick={() => handleCardClick(index)}
                >
                  <div className="service-icon">{service.icon}</div>
                  <div className="service-content">
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                    <ul className="service-features">
                      {service.features.map((feature, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: idx * 0.1 }}
                          viewport={{ once: true }}
                        >
                          {feature}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Marketing Tools & Technologies Section */}
        <section className="technologies-section">
          <div className="section-container">
            <h2>{t("marketingPage.tools.title")}</h2>
            <p className="section-description">
              {t("marketingPage.tools.subtitle")}
            </p>
            <div className="tech-grid">
              {[
                {
                  icon: <FaBullhorn />,
                  name: t("marketingPage.tools.socialMedia.name"),
                  items: t("marketingPage.tools.socialMedia.items", {
                    returnObjects: true,
                  }),
                },
                {
                  icon: <FaChartLine />,
                  name: t("marketingPage.tools.analytics.name"),
                  items: t("marketingPage.tools.analytics.items", {
                    returnObjects: true,
                  }),
                },
                {
                  icon: <FaPaintBrush />,
                  name: t("marketingPage.tools.design.name"),
                  items: t("marketingPage.tools.design.items", {
                    returnObjects: true,
                  }),
                },
                {
                  icon: <FaUsers />,
                  name: t("marketingPage.tools.automation.name"),
                  items: t("marketingPage.tools.automation.items", {
                    returnObjects: true,
                  }),
                },
              ].map((tech, index) => (
                <motion.div
                  key={tech.name}
                  className="tech-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="tech-icon">{tech.icon}</div>
                  <h3>{tech.name}</h3>
                  <ul className="tech-list">
                    {tech.items.map((item, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: idx * 0.1 }}
                        viewport={{ once: true }}
                      >
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="process-section">
          <div className="section-container">
            <h2>{t("marketingPage.process.title")}</h2>
            <p className="section-description">
              {t("marketingPage.process.subtitle")}
            </p>
            <div className="timeline-container">
              <div className="timeline-line">
                <div className="timeline-progress"></div>
              </div>
              <div className="process-steps">
                {[
                  {
                    icon: <FaChartLine />,
                    title: t("marketingPage.process.steps.discovery.title"),
                    description: t(
                      "marketingPage.process.steps.discovery.description"
                    ),
                    step: "01",
                  },
                  {
                    icon: <FaPaintBrush />,
                    title: t("marketingPage.process.steps.creative.title"),
                    description: t(
                      "marketingPage.process.steps.creative.description"
                    ),
                    step: "02",
                  },
                  {
                    icon: <FaRocket />,
                    title: t("marketingPage.process.steps.launch.title"),
                    description: t(
                      "marketingPage.process.steps.launch.description"
                    ),
                    step: "03",
                  },
                  {
                    icon: <FaLightbulb />,
                    title: t("marketingPage.process.steps.optimize.title"),
                    description: t(
                      "marketingPage.process.steps.optimize.description"
                    ),
                    step: "04",
                  },
                ].map((step, index) => (
                  <motion.div
                    key={step.title}
                    className="timeline-step"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="step-content">
                      <div className="step-number">{step.step}</div>
                      <div className="step-icon">{step.icon}</div>
                      <div className="step-text">
                        <h3>{step.title}</h3>
                        <p>{step.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <div className="section-container">
            <motion.div
              className="cta-content"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2>{t("marketingPage.cta.title")}</h2>
              <p>{t("marketingPage.cta.subtitle")}</p>
              <motion.button
                className="cta-button"
                onClick={() => navigate("/contact")}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.95 }}
              >
                {t("marketingPage.cta.button")}
              </motion.button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default MarketingPage;
