import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../contexts/LanguageContext";
import Header from "../../components/Header/Header";
import {
  FaRocket,
  FaLightbulb,
  FaUsers,
  FaCode,
  FaMobileAlt,
  FaBullhorn,
  FaPalette,
  FaVideo,
  FaBolt,
} from "react-icons/fa";
// import logoBig from '../assets/logo-big.svg';
import logoBig from "../../assets/logo-big.svg";
import "./AboutPage.css";
import Footer from "../../components/Footer/Footer";

const AboutPage = () => {
  const canvasRef = useRef(null);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { language } = useLanguage();

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
          <div
            className={`hero-content ${language === "ar" ? "hero-rtl" : ""}`}
          >
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
                  icon: <FaBullhorn />,
                  title: t("services.marketing.title"),
                  description: t("services.marketing.description"),
                },
                {
                  icon: <FaPalette />,
                  title: t("services.creative.title"),
                  description: t("services.creative.description"),
                },
                {
                  icon: <FaVideo />,
                  title: t("services.production.title"),
                  description: t("services.production.description"),
                },
                {
                  icon: <FaBolt />,
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
                // CEO & Founder
                {
                  name: "Mouhammad Al-Rifai",
                  role: t("about.team.members.mouhammad.role"),
                  skills: t("about.team.members.mouhammad.skills"),
                  motto: t("about.team.members.mouhammad.motto"),
                  image: "Rifaii.png",
                },
                // Director Level
                {
                  name: "Abdullelah Bamarouf",
                  role: t("about.team.members.abdullelah.role"),
                  skills: t("about.team.members.abdullelah.skills"),
                  motto: t("about.team.members.abdullelah.motto"),
                  image: "Abdalelah.png",
                },
                // Manager Level
                // {
                //   name: "ALJ Sharif",
                //   role: t("about.team.members.alj.role"),
                //   // skills: t("about.team.members.alj.skills"),
                //   // motto: t("about.team.members.alj.motto"),
                //   image: "ALJ.png",
                // },
                // Team Lead Level
                {
                  name: "Ahmad Afif",
                  role: t("about.team.members.ahmad.role"),
                  skills: t("about.team.members.ahmad.skills"),
                  motto: t("about.team.members.ahmad.motto"),
                  image: "Ahmad.png",
                },
                {
                  name: "Tarik Bamarouf",
                  role: t("about.team.members.tarik.role"),
                  skills: t("about.team.members.tarik.skills"),
                  motto: t("about.team.members.tarik.motto"),
                  image: "Tarik.png",
                },
                // Senior Level
                {
                  name: "Haytham Nashawati",
                  role: t("about.team.members.haytham.role"),
                  skills: t("about.team.members.haytham.skills"),
                  motto: t("about.team.members.haytham.motto"),
                  image: "Haytham.png",
                },
                // Developer Level
                {
                  name: "Michael Zakka",
                  role: t("about.team.members.michael.role"),
                  skills: t("about.team.members.michael.skills"),
                  motto: t("about.team.members.michael.motto"),
                  image: "Michael.png",
                },
                {
                  name: "Kareem Rijjal",
                  role: t("about.team.members.kareem.role"),
                  skills: t("about.team.members.kareem.skills"),
                  motto: t("about.team.members.kareem.motto"),
                  image: "Kareem.png",
                },
                // Content & Design Level
                {
                  name: "Wessam Dalil",
                  role: t("about.team.members.wessam.role"),
                  skills: t("about.team.members.wessam.skills"),
                  motto: t("about.team.members.wessam.motto"),
                  image: "Wissam.png",
                },
                {
                  name: "Abdullah Jeneyat",
                  role: t("about.team.members.abdullah.role"),
                  skills: t("about.team.members.abdullah.skills"),
                  motto: t("about.team.members.abdullah.motto"),
                  image: "Jenyat.png",
                },
                {
                  name: "Ebaa Abo-Elaenine",
                  role: t("about.team.members.ebaa.role"),
                  skills: t("about.team.members.ebaa.skills"),
                  motto: t("about.team.members.ebaa.motto"),
                  image: "Ebaa.png",
                },
              ].map((member, index) => (
                <motion.div
                  key={index}
                  className="team-card-container"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="team-card">
                    <div className="team-card-inner">
                      {/* Front of card */}
                      <div className="team-card-front">
                        <motion.div
                          className="member-image"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                        >
                          <img
                            src={`./assets/team/${member.image}`}
                            alt={member.name}
                            className="team-photo"
                          />
                          <div className="image-overlay" />
                        </motion.div>
                        <div className="member-info">
                          <h3>{member.name}</h3>
                          <span className="member-role">{member.role}</span>
                        </div>
                      </div>

                      {/* Back of card */}
                      {member.motto && (
                        <div className="team-card-back">
                          <div className="motto-content">
                            <p className="member-motto">{member.motto}</p>
                            {/* {member.skills && (
                              <p className="member-skills">{member.skills}</p>
                            )} */}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
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
