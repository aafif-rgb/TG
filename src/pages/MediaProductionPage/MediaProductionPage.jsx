import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  FaVideo,
  FaCamera,
  FaCube,
  FaEdit,
  FaPalette,
  FaFilm,
  FaChartLine,
  FaPaintBrush,
  FaShieldAlt,
  FaPlay,
} from "react-icons/fa";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./MediaProductionPage.css";

const MediaProductionPage = () => {
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

  const mediaServices = [
    {
      icon: <FaVideo />,
      title: t("mediaProductionPage.services.videoProduction.title"),
      description: t(
        "mediaProductionPage.services.videoProduction.description"
      ),
      features: t("mediaProductionPage.services.videoProduction.features", {
        returnObjects: true,
      }),
    },
    {
      icon: <FaCamera />,
      title: t("mediaProductionPage.services.photography.title"),
      description: t("mediaProductionPage.services.photography.description"),
      features: t("mediaProductionPage.services.photography.features", {
        returnObjects: true,
      }),
    },
    {
      icon: <FaCube />,
      title: t("mediaProductionPage.services.cgiAnd3d.title"),
      description: t("mediaProductionPage.services.cgiAnd3d.description"),
      features: t("mediaProductionPage.services.cgiAnd3d.features", {
        returnObjects: true,
      }),
    },
    {
      icon: <FaEdit />,
      title: t("mediaProductionPage.services.postProduction.title"),
      description: t("mediaProductionPage.services.postProduction.description"),
      features: t("mediaProductionPage.services.postProduction.features", {
        returnObjects: true,
      }),
    },
    {
      icon: <FaPalette />,
      title: t("mediaProductionPage.services.motionGraphics.title"),
      description: t("mediaProductionPage.services.motionGraphics.description"),
      features: t("mediaProductionPage.services.motionGraphics.features", {
        returnObjects: true,
      }),
    },
    {
      icon: <FaFilm />,
      title: t("mediaProductionPage.services.documentary.title"),
      description: t("mediaProductionPage.services.documentary.description"),
      features: t("mediaProductionPage.services.documentary.features", {
        returnObjects: true,
      }),
    },
  ];

  return (
    <div className="media-production-page">
      <Header />
      <canvas ref={canvasRef} className="particle-canvas" />

      <main className="media-production-content">
        {/* Hero Section */}
        <section className="media-production-hero">
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
                {t("mediaProductionPage.hero.tag")}
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {t("mediaProductionPage.hero.title")}
                <span className="highlight">
                  {" "}
                  {t("mediaProductionPage.hero.titleHighlight")}
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                {t("mediaProductionPage.hero.description")}
              </motion.p>
              {/* <motion.div
                className="hero-stats"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                {[
                  { number: "200+", label: "Projects Completed" },
                  { number: "50+", label: "Brands Served" },
                  { number: "4K+", label: "Hours of Content" },
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

        {/* Main Media Services Section */}
        <section className="main-services">
          <div className="section-container">
            <h2>{t("mediaProductionPage.services.title")}</h2>
            <p className="section-description">
              {t("mediaProductionPage.services.subtitle")}
            </p>
            <div className="services-grid">
              {mediaServices.map((service, index) => (
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

        {/* Equipment & Technologies Section */}
        <section className="technologies-section">
          <div className="section-container">
            <h2>{t("mediaProductionPage.equipment.title")}</h2>
            <p className="section-description">
              {t("mediaProductionPage.equipment.subtitle")}
            </p>
            <div className="tech-grid">
              {[
                {
                  icon: <FaVideo />,
                  name: t("mediaProductionPage.equipment.video.name"),
                  items: t("mediaProductionPage.equipment.video.items", {
                    returnObjects: true,
                  }),
                },
                {
                  icon: <FaCamera />,
                  name: t("mediaProductionPage.equipment.photography.name"),
                  items: t("mediaProductionPage.equipment.photography.items", {
                    returnObjects: true,
                  }),
                },
                {
                  icon: <FaEdit />,
                  name: t("mediaProductionPage.equipment.postProduction.name"),
                  items: t(
                    "mediaProductionPage.equipment.postProduction.items",
                    {
                      returnObjects: true,
                    }
                  ),
                },
                {
                  icon: <FaCube />,
                  name: t("mediaProductionPage.equipment.cgi3d.name"),
                  items: t("mediaProductionPage.equipment.cgi3d.items", {
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
            <h2>{t("mediaProductionPage.process.title")}</h2>
            <p className="section-description">
              {t("mediaProductionPage.process.subtitle")}
            </p>
            <div className="timeline-container">
              <div className="timeline-line">
                <div className="timeline-progress"></div>
              </div>
              <div className="process-steps">
                {[
                  {
                    icon: <FaChartLine />,
                    title: t("mediaProductionPage.process.steps.concept.title"),
                    description: t(
                      "mediaProductionPage.process.steps.concept.description"
                    ),
                    step: "01",
                  },
                  {
                    icon: <FaPaintBrush />,
                    title: t(
                      "mediaProductionPage.process.steps.preProduction.title"
                    ),
                    description: t(
                      "mediaProductionPage.process.steps.preProduction.description"
                    ),
                    step: "02",
                  },
                  {
                    icon: <FaPlay />,
                    title: t(
                      "mediaProductionPage.process.steps.production.title"
                    ),
                    description: t(
                      "mediaProductionPage.process.steps.production.description"
                    ),
                    step: "03",
                  },
                  {
                    icon: <FaShieldAlt />,
                    title: t(
                      "mediaProductionPage.process.steps.postProduction.title"
                    ),
                    description: t(
                      "mediaProductionPage.process.steps.postProduction.description"
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
              <h2>{t("mediaProductionPage.cta.title")}</h2>
              <p>{t("mediaProductionPage.cta.subtitle")}</p>
              <motion.button
                className="cta-button"
                onClick={() => navigate("/contact")}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.95 }}
              >
                {t("mediaProductionPage.cta.button")}
              </motion.button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default MediaProductionPage;
