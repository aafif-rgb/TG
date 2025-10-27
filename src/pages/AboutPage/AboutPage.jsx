import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "../../components/Header/Header";
import {
  FaRocket,
  FaLightbulb,
  FaUsers,
  FaCode,
  FaMobileAlt,
} from "react-icons/fa";
// import logoBig from '../assets/logo-big.svg';
import logoBig from "../../assets/logo-big.svg";
import "./AboutPage.css";
import Footer from "../../components/Footer/Footer";

const AboutPage = () => {
  const canvasRef = useRef(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Particle animation code...
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

  return (
    <div className="about-page">
      <Header />
      <canvas ref={canvasRef} className="particle-canvas" />

      <main className="about-content">
        <section className="about-hero">
          <div className="hero-content">
            <motion.div
              className="logo-container"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <img src={logoBig} alt="TG Logo" className="logo-big" />
            </motion.div>

            <motion.div
              className="text-container"
              initial={{ opacity: 0, x: 50 }}
              animate={{
                opacity: 1,
                x: 0,
                y: [0, -10, 0],
              }}
              transition={{
                opacity: { duration: 0.8, ease: "easeOut" },
                x: { duration: 0.8, ease: "easeOut" },
                y: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
            >
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {t("about.hero.title")}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                {t("about.hero.paragraph1")}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                {t("about.hero.paragraph2")}
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Vision & Mission Section */}
        <section className="vision-mission-section">
          <motion.div
            className="section-container"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="vision-mission-title">
              {t("about.visionMission.title")}
            </div>
            <p className="section-description">
              {t("about.visionMission.subtitle")}
            </p>
            <div className="vision-mission-grid">
              <motion.div
                className="vision-box"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="box-icon">
                  <FaRocket />
                </div>
                <h3>{t("about.visionMission.vision.title")}</h3>
                <p>{t("about.visionMission.vision.description")}</p>
              </motion.div>

              <motion.div
                className="mission-box"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="box-icon">
                  <FaLightbulb />
                </div>
                <h3>{t("about.visionMission.mission.title")}</h3>
                <p>{t("about.visionMission.mission.description")}</p>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Timeline Section */}
        {/* <section className="timeline-section">
          <motion.div
            className="section-container"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>Our Journey</h2>
            <p className="section-description">
              A decade of innovation and digital excellence
            </p>
            <div className="timeline">
              {[
                {
                  year: "2013",
                  title: "Foundation",
                  description:
                    "Started our journey with a vision to transform digital landscapes.",
                  icon: <FaRocket />,
                },
                {
                  year: "2015",
                  title: "Regional Expansion",
                  description:
                    "Extended our presence across the MENA region, serving diverse markets.",
                  icon: <FaUsers />,
                },
                {
                  year: "2018",
                  title: "Innovation Hub",
                  description:
                    "Launched our state-of-the-art innovation center in Dubai.",
                  icon: <FaLightbulb />,
                },
                {
                  year: "2020",
                  title: "Digital Leadership",
                  description:
                    "Recognized as a leading digital transformation partner in MENA.",
                  icon: <FaCode />,
                },
                {
                  year: "2023",
                  title: "Global Recognition",
                  description:
                    "Achieved international acclaim for digital excellence and innovation.",
                  icon: <FaMobileAlt />,
                },
              ].map((milestone, index) => (
                <motion.div
                  key={index}
                  className="timeline-item"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="timeline-content">
                    <div className="timeline-icon">{milestone.icon}</div>
                    <div className="timeline-date">
                      <span className="year">{milestone.year}</span>
                    </div>
                    <div className="timeline-info">
                      <h3>{milestone.title}</h3>
                      <p>{milestone.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section> */}

        {/* Services Section */}
        <section className="services-section">
          <motion.div
            className="section-container"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="about-services-title">
              {t("about.services.title")}
            </div>
            <p className="section-description">
              {t("about.services.subtitle")}
            </p>
            <div className="services-grid">
              {[
                {
                  icon: "📣",
                  title: t("services.marketing.title"),
                  description: t("services.marketing.description"),
                },
                {
                  icon: "🎨",
                  title: t("services.creative.title"),
                  description: t("services.creative.description"),
                },
                {
                  icon: "🎥",
                  title: t("services.production.title"),
                  description: t("services.production.description"),
                },
                {
                  icon: "⚡",
                  title: t("services.tech.title"),
                  description: t("services.tech.description"),
                },
              ].map((service, index) => (
                <motion.div
                  key={index}
                  className="service-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="service-icon">{service.icon}</div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Team Section */}
        <section className="team-section">
          <motion.div
            className="section-container"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="about-team-title">{t("about.team.title")}</div>
            <p className="section-description">{t("about.team.subtitle")}</p>
            <div className="team-grid">
              {[
                {
                  name: "Mouhammad Al-Rifai",
                  // role: "CEO & Founder",
                  // description: "15+ years of digital transformation expertise",
                },
                {
                  name: "Abdelelah Bamarouf",
                  // role: "Technical Director",
                  // description: "Expert in emerging technologies",
                },
                {
                  name: "Tarik Bamarouf",
                  // role: "Creative Director",
                  // description: "Award-winning design professional",
                },
              ].map((member, index) => (
                <motion.div
                  key={index}
                  className="team-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="member-image">
                    <div className="image-placeholder" />
                  </div>
                  <h3>{member.name}</h3>
                  <span className="member-role">{member.role}</span>
                  <p>{member.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Contact Section */}
        <section className="contact-section">
          <motion.div
            className="section-container"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="about-contact-title">
              {t("about.contactSection.title")}
            </div>
            <p className="section-description">
              {t("about.contactSection.subtitle")}
            </p>
            <motion.button
              className="cta-button"
              onClick={() => navigate("/contact")}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.95 }}
            >
              {t("about.contactSection.button")}
            </motion.button>
          </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
