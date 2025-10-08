import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Header from "../../components/Header/Header";
import { useNavigate } from "react-router-dom";

import {
  FaCode,
  FaMobileAlt,
  FaPaintBrush,
  FaDatabase,
  FaCloud,
  FaRobot,
  FaShieldAlt,
  FaChartLine,
  FaCogs,
  FaSearchDollar,
  FaBullhorn,
  FaChartBar,
  FaHashtag,
  FaVideo,
  FaPencilAlt,
} from "react-icons/fa";
import "./ServicesPage.css";
import Footer from "../../components/Footer/Footer";

const ServicesPage = () => {
  const [expandedCard, setExpandedCard] = useState(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

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

  const services = [
    {
      icon: <FaSearchDollar />,
      title: t("servicesPage.services.digitalMarketing.title"),
      description: t("servicesPage.services.digitalMarketing.description"),
      features: t("servicesPage.services.digitalMarketing.features", {
        returnObjects: true,
      }),
    },
    {
      icon: <FaBullhorn />,
      title: t("servicesPage.services.socialMedia.title"),
      description: t("servicesPage.services.socialMedia.description"),
      features: t("servicesPage.services.socialMedia.features", {
        returnObjects: true,
      }),
    },
    {
      icon: <FaChartBar />,
      title: t("servicesPage.services.brandDevelopment.title"),
      description: t("servicesPage.services.brandDevelopment.description"),
      features: t("servicesPage.services.brandDevelopment.features", {
        returnObjects: true,
      }),
    },
    {
      icon: <FaHashtag />,
      title: t("servicesPage.services.influencer.title"),
      description: t("servicesPage.services.influencer.description"),
      features: t("servicesPage.services.influencer.features", {
        returnObjects: true,
      }),
    },
    {
      icon: <FaVideo />,
      title: t("servicesPage.services.contentCreation.title"),
      description: t("servicesPage.services.contentCreation.description"),
      features: t("servicesPage.services.contentCreation.features", {
        returnObjects: true,
      }),
    },
    {
      icon: <FaPencilAlt />,
      title: t("servicesPage.services.copywriting.title"),
      description: t("servicesPage.services.copywriting.description"),
      features: t("servicesPage.services.copywriting.features", {
        returnObjects: true,
      }),
    },
    {
      icon: <FaCode />,
      title: t("servicesPage.services.webDev.title"),
      description: t("servicesPage.services.webDev.description"),
      features: t("servicesPage.services.webDev.features", {
        returnObjects: true,
      }),
    },
    {
      icon: <FaMobileAlt />,
      title: t("servicesPage.services.mobileDev.title"),
      description: t("servicesPage.services.mobileDev.description"),
      features: t("servicesPage.services.mobileDev.features", {
        returnObjects: true,
      }),
    },
    {
      icon: <FaPaintBrush />,
      title: t("servicesPage.services.uiux.title"),
      description: t("servicesPage.services.uiux.description"),
      features: t("servicesPage.services.uiux.features", {
        returnObjects: true,
      }),
    },
    {
      icon: <FaDatabase />,
      title: t("servicesPage.services.database.title"),
      description: t("servicesPage.services.database.description"),
      features: t("servicesPage.services.database.features", {
        returnObjects: true,
      }),
    },
    {
      icon: <FaCloud />,
      title: t("servicesPage.services.cloud.title"),
      description: t("servicesPage.services.cloud.description"),
      features: t("servicesPage.services.cloud.features", {
        returnObjects: true,
      }),
    },
    {
      icon: <FaRobot />,
      title: t("servicesPage.services.ai.title"),
      description: t("servicesPage.services.ai.description"),
      features: t("servicesPage.services.ai.features", { returnObjects: true }),
    },
  ];

  const technologies = [
    {
      icon: <FaCode />,
      name: t("servicesPage.technologies.development"),
      items: ["React js", "Flutter", "Node js", "Laravel"],
    },
    {
      icon: <FaSearchDollar />,
      name: t("servicesPage.technologies.marketing"),
      items: ["Google Ads", "Facebook Ads", "SEMrush", "HubSpot"],
    },
    {
      icon: <FaChartBar />,
      name: t("servicesPage.technologies.analytics"),
      items: ["Google Analytics", "Mixpanel", "Hotjar", "Tableau"],
    },
    {
      icon: <FaBullhorn />,
      name: t("servicesPage.technologies.socialMedia"),
      items: ["Buffer", "Hootsuite", "Sprout Social", "Canva"],
    },
  ];

  return (
    <div className="services-page">
      <Header />
      <canvas ref={canvasRef} className="particle-canvas" />

      <main className="services-content">
        {/* Hero Section */}
        <section className="services-hero">
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
                {t("servicesPage.hero.tag")}
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {t("servicesPage.hero.title")}
                <span className="highlight">
                  {" "}
                  {t("servicesPage.hero.titleHighlight")}
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                {t("servicesPage.hero.description")}
              </motion.p>
              <motion.div
                className="hero-stats"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                {[
                  {
                    number: "8+",
                    label: t("servicesPage.hero.stats.projects"),
                  },
                  { number: "15+", label: t("servicesPage.hero.stats.team") },
                  {
                    number: "98%",
                    label: t("servicesPage.hero.stats.satisfaction"),
                  },
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
            </motion.div>
          </div>
        </section>

        {/* Main Services Section */}
        <section className="main-services">
          <div className="section-container">
            <div className="services-grid">
              {services.map((service, index) => (
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

        {/* Service Categories Navigation */}
        <section className="service-categories">
          <div className="section-container">
            <h2>{t("servicesPage.categories.title")}</h2>
            <p className="section-description">
              {t("servicesPage.categories.subtitle")}
            </p>
            <div className="categories-grid">
              <motion.div
                className="category-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <div className="category-icon">
                  <FaBullhorn />
                </div>
                <div className="category-content">
                  <h3>{t("servicesPage.categories.marketing.title")}</h3>
                  <p>{t("servicesPage.categories.marketing.description")}</p>
                  <ul className="category-highlights">
                    {t("servicesPage.categories.marketing.highlights", {
                      returnObjects: true,
                    }).map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                  <motion.button
                    className="category-button"
                    onClick={() => navigate("/services/marketing")}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {t("servicesPage.categories.marketing.button")}
                  </motion.button>
                </div>
              </motion.div>

              <motion.div
                className="category-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <div className="category-icon">
                  <FaCode />
                </div>
                <div className="category-content">
                  <h3>{t("servicesPage.categories.tech.title")}</h3>
                  <p>{t("servicesPage.categories.tech.description")}</p>
                  <ul className="category-highlights">
                    {t("servicesPage.categories.tech.highlights", {
                      returnObjects: true,
                    }).map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                  <motion.button
                    className="category-button"
                    onClick={() => navigate("/services/tech")}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {t("servicesPage.categories.tech.button")}
                  </motion.button>
                </div>
              </motion.div>

              <motion.div
                className="category-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <div className="category-icon">
                  <FaVideo />
                </div>
                <div className="category-content">
                  <h3>{t("servicesPage.categories.media.title")}</h3>
                  <p>{t("servicesPage.categories.media.description")}</p>
                  <ul className="category-highlights">
                    {t("servicesPage.categories.media.highlights", {
                      returnObjects: true,
                    }).map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                  <motion.button
                    className="category-button"
                    onClick={() => navigate("/services/media-production")}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {t("servicesPage.categories.media.button")}
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Technologies Section */}
        <section className="technologies-section">
          <div className="section-container">
            <h2>{t("servicesPage.technologies.title")}</h2>
            <p className="section-description">
              {t("servicesPage.technologies.subtitle")}
            </p>
            <div className="tech-grid">
              {technologies.map((tech, index) => (
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
            <h2>{t("servicesPage.process.title")}</h2>
            <p className="section-description">
              {t("servicesPage.process.subtitle")}
            </p>
            <div className="timeline-container">
              <div className="timeline-line">
                <div className="timeline-progress"></div>
              </div>
              <div className="process-steps">
                {[
                  {
                    icon: <FaChartLine />,
                    title: t("servicesPage.process.steps.discovery.title"),
                    description: t(
                      "servicesPage.process.steps.discovery.description"
                    ),
                    step: "01",
                  },
                  {
                    icon: <FaPaintBrush />,
                    title: t("servicesPage.process.steps.design.title"),
                    description: t(
                      "servicesPage.process.steps.design.description"
                    ),
                    step: "02",
                  },
                  {
                    icon: <FaCode />,
                    title: t("servicesPage.process.steps.development.title"),
                    description: t(
                      "servicesPage.process.steps.development.description"
                    ),
                    step: "03",
                  },
                  {
                    icon: <FaShieldAlt />,
                    title: t("servicesPage.process.steps.testing.title"),
                    description: t(
                      "servicesPage.process.steps.testing.description"
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

        <section className="cta-section">
          <div className="section-container">
            <motion.div
              className="cta-content"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2>{t("servicesPage.cta.title")}</h2>
              <p>{t("servicesPage.cta.subtitle")}</p>
              <motion.button
                className="cta-button"
                onClick={() => navigate("/contact")}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.95 }}
              >
                {t("servicesPage.cta.button")}
              </motion.button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ServicesPage;
