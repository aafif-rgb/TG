import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  FaCode,
  FaMobileAlt,
  FaCloud,
  FaDatabase,
  FaRobot,
  FaShieldAlt,
  FaChartLine,
  FaPaintBrush,
  FaCogs,
  FaLaptopCode,
} from "react-icons/fa";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./TechServicesPage.css";

const TechServicesPage = () => {
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

  const techServices = [
    {
      icon: <FaCode />,
      title: t("techServicesPage.services.webDev.title"),
      description: t("techServicesPage.services.webDev.description"),
      features: t("techServicesPage.services.webDev.features", {
        returnObjects: true,
      }),
    },
    {
      icon: <FaMobileAlt />,
      title: t("techServicesPage.services.mobileDev.title"),
      description: t("techServicesPage.services.mobileDev.description"),
      features: t("techServicesPage.services.mobileDev.features", {
        returnObjects: true,
      }),
    },
    {
      icon: <FaCloud />,
      title: t("techServicesPage.services.cloudSolutions.title"),
      description: t("techServicesPage.services.cloudSolutions.description"),
      features: t("techServicesPage.services.cloudSolutions.features", {
        returnObjects: true,
      }),
    },
    {
      icon: <FaDatabase />,
      title: t("techServicesPage.services.database.title"),
      description: t("techServicesPage.services.database.description"),
      features: t("techServicesPage.services.database.features", {
        returnObjects: true,
      }),
    },
    {
      icon: <FaRobot />,
      title: t("techServicesPage.services.aiMl.title"),
      description: t("techServicesPage.services.aiMl.description"),
      features: t("techServicesPage.services.aiMl.features", {
        returnObjects: true,
      }),
    },
    {
      icon: <FaShieldAlt />,
      title: t("techServicesPage.services.cybersecurity.title"),
      description: t("techServicesPage.services.cybersecurity.description"),
      features: t("techServicesPage.services.cybersecurity.features", {
        returnObjects: true,
      }),
    },
  ];

  return (
    <div className="tech-services-page">
      <Header />
      <canvas ref={canvasRef} className="particle-canvas" />

      <main className="tech-services-content">
        {/* Hero Section */}
        <section className="tech-services-hero">
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
                {t("techServicesPage.hero.tag")}
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {t("techServicesPage.hero.title")}
                <span className="highlight">
                  {" "}
                  {t("techServicesPage.hero.titleHighlight")}
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                {t("techServicesPage.hero.description")}
              </motion.p>
            </motion.div>
          </div>
        </section>
        <section className="main-services">
          <div className="section-container">
            <h2>{t("techServicesPage.services.title")}</h2>
            <p className="section-description">
              {t("techServicesPage.services.subtitle")}
            </p>
            <div className="services-grid">
              {techServices.map((service, index) => (
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
        {/* Technologies Section */}
        <section className="technologies-section">
          <div className="section-container">
            <h2>{t("techServicesPage.technologies.title")}</h2>
            <p className="section-description">
              {t("techServicesPage.technologies.subtitle")}
            </p>
            <div className="tech-grid">
              {[
                {
                  icon: <FaCode />,
                  name: t("techServicesPage.technologies.frontend.name"),
                  items: t("techServicesPage.technologies.frontend.items", {
                    returnObjects: true,
                  }),
                },
                {
                  icon: <FaMobileAlt />,
                  name: t("techServicesPage.technologies.mobile.name"),
                  items: t("techServicesPage.technologies.mobile.items", {
                    returnObjects: true,
                  }),
                },
                {
                  icon: <FaCogs />,
                  name: t("techServicesPage.technologies.backend.name"),
                  items: t("techServicesPage.technologies.backend.items", {
                    returnObjects: true,
                  }),
                },
                {
                  icon: <FaDatabase />,
                  name: t("techServicesPage.technologies.database.name"),
                  items: t("techServicesPage.technologies.database.items", {
                    returnObjects: true,
                  }),
                },
                {
                  icon: <FaCloud />,
                  name: t("techServicesPage.technologies.cloudDevops.name"),
                  items: t("techServicesPage.technologies.cloudDevops.items", {
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
            <h2>{t("techServicesPage.process.title")}</h2>
            <p className="section-description">
              {t("techServicesPage.process.subtitle")}
            </p>
            <div className="timeline-container">
              <div className="timeline-line">
                <div className="timeline-progress"></div>
              </div>
              <div className="process-steps">
                {[
                  {
                    icon: <FaChartLine />,
                    title: t("techServicesPage.process.steps.discovery.title"),
                    description: t(
                      "techServicesPage.process.steps.discovery.description"
                    ),
                    step: "01",
                  },
                  {
                    icon: <FaPaintBrush />,
                    title: t("techServicesPage.process.steps.design.title"),
                    description: t(
                      "techServicesPage.process.steps.design.description"
                    ),
                    step: "02",
                  },
                  {
                    icon: <FaLaptopCode />,
                    title: t(
                      "techServicesPage.process.steps.development.title"
                    ),
                    description: t(
                      "techServicesPage.process.steps.development.description"
                    ),
                    step: "03",
                  },
                  {
                    icon: <FaShieldAlt />,
                    title: t("techServicesPage.process.steps.deployment.title"),
                    description: t(
                      "techServicesPage.process.steps.deployment.description"
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
              <h2>{t("techServicesPage.cta.title")}</h2>
              <p>{t("techServicesPage.cta.subtitle")}</p>
              <motion.button
                className="cta-button"
                onClick={() => navigate("/contact")}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.95 }}
              >
                {t("techServicesPage.cta.button")}
              </motion.button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TechServicesPage;
