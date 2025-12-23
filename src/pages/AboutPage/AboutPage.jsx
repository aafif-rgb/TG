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

// Team images mapping - WebP with PNG fallback for better performance
const getTeamImageSrc = (imageName) => {
  const baseName = imageName.replace(/\.(png|jpg|jpeg)$/i, "");
  return {
    webp: `/assets/team/${baseName}.webp`,
    png: `/assets/team/${imageName}`,
  };
};

const teamImages = {
  "Abdalelah.png": getTeamImageSrc("Abdalelah.png"),
  "Rifaii.png": getTeamImageSrc("Rifaii.png"),
  "Tarik.png": getTeamImageSrc("Tarik.png"),
  "Khan.png": getTeamImageSrc("Khan.png"),
  "Ahmad.png": getTeamImageSrc("Ahmad.png"),
  "Ayham.png": getTeamImageSrc("Ayham.png"),
  "Jawad.png": getTeamImageSrc("Jawad.png"),
  "Kareem.png": getTeamImageSrc("Kareem.png"),
  "Michael.png": getTeamImageSrc("Michael.png"),
  "Yasser.png": getTeamImageSrc("Yasser.png"),
  "Yazan.png": getTeamImageSrc("Yazan.png"),
  "ALJ.png": getTeamImageSrc("ALJ.png"),
  "Fauzi.png": getTeamImageSrc("Fauzi.png"),
  "Wissam.png": getTeamImageSrc("Wissam.png"),
  "Jenyat.png": getTeamImageSrc("Jenyat.png"),
  "Ebaa.png": getTeamImageSrc("Ebaa.png"),
  "Haytham.png": getTeamImageSrc("Haytham.png"),
  "AhmadIsmaeel.png": getTeamImageSrc("AhmadIsmaeel.png"),
  "Fares.png": getTeamImageSrc("Fares.png"),
  "Lara.png": getTeamImageSrc("Lara.png"),
};

// Helper component for optimized image loading with WebP fallback
const OptimizedImage = ({ imageName, alt, className, loading, onError }) => {
  const imageSrc = teamImages[imageName];
  const pngSrc = imageSrc?.png || `/assets/team/${imageName}`;
  
  // For now, use PNG directly. WebP support will be added when WebP files are created
  // The picture element will be used once WebP files are available
  return (
    <img
      src={pngSrc}
      alt={alt}
      className={className}
      loading={loading}
      onError={onError}
    />
  );
};

const AboutPage = () => {
  const canvasRef = useRef(null);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { language } = useLanguage();

  // Handle image loading errors
  const handleImageError = (e) => {
    e.target.style.display = "none";
    const placeholder = e.target.nextElementSibling;
    if (placeholder && placeholder.classList.contains("image-placeholder")) {
      placeholder.style.display = "flex";
    }
  };

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

            {/* Management Team */}
            <div className="team-category">
              <motion.h3
                className={`category-title ${language === "ar" ? "rtl" : ""}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                {t("about.team.categories.management")}
              </motion.h3>
              <div className="team-grid">
                {[
                  {
                    name: "Abdullelah Bamarouf",
                    role: t("about.team.members.abdullelah.role"),
                    skills: t("about.team.members.abdullelah.skills"),
                    motto: t("about.team.members.abdullelah.motto"),
                    image: "Abdalelah.png",
                  },
                  {
                    name: "Mouhammad Al-Rifai",
                    role: t("about.team.members.mouhammad.role"),
                    skills: t("about.team.members.mouhammad.skills"),
                    motto: t("about.team.members.mouhammad.motto"),
                    image: "Rifaii.png",
                  },
                  {
                    name: "Tarik Bamarouf",
                    role: t("about.team.members.tarik.role"),
                    skills: t("about.team.members.tarik.skills"),
                    motto: t("about.team.members.tarik.motto"),
                    image: "Tarik.png",
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
                      <motion.div
                        className="member-image-wrapper"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      >
                        <OptimizedImage
                          imageName={member.image}
                          alt={member.name}
                          className="team-photo"
                          loading="lazy"
                          onError={handleImageError}
                        />
                        <div
                          className="image-placeholder"
                          style={{ display: "none" }}
                        >
                          <div className="placeholder-initials">
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .slice(0, 2)}
                          </div>
                        </div>
                        <div className="image-overlay" />
                        <div className="member-info-overlay">
                          <h3>{member.name}</h3>
                          <span className="member-role">{member.role}</span>
                        </div>
                        {member.motto && (
                          <div className="member-details-overlay">
                            <div className="details-content">
                              <p className="member-motto">{member.motto}</p>
                              {member.skills && (
                                <p className="member-skills">{member.skills}</p>
                              )}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Tech Team */}
            <div className="team-category">
              <motion.h3
                className={`category-title ${language === "ar" ? "rtl" : ""}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                {t("about.team.categories.tech")}
              </motion.h3>
              <div className="team-grid">
                {[
                  {
                    name: "Abdulhamid Khan",
                    role: t("about.team.members.abdulhamid.role"),
                    skills: t("about.team.members.abdulhamid.skills"),
                    motto: t("about.team.members.abdulhamid.motto"),
                    image: "Khan.png",
                  },
                  {
                    name: "Ahmad Afif",
                    role: t("about.team.members.ahmad.role"),
                    skills: t("about.team.members.ahmad.skills"),
                    motto: t("about.team.members.ahmad.motto"),
                    image: "Ahmad.png",
                  },
                  {
                    name: "Ayham Arafeh",
                    role: t("about.team.members.ayham.role"),
                    skills: t("about.team.members.ayham.skills"),
                    motto: t("about.team.members.ayham.motto"),
                    image: "Ayham.png",
                  },
                  {
                    name: "Jawad Mortada",
                    role: t("about.team.members.jawad.role"),
                    skills: t("about.team.members.jawad.skills"),
                    motto: t("about.team.members.jawad.motto"),
                    image: "Jawad.png",
                  },
                  {
                    name: "Kareem Rijjal",
                    role: t("about.team.members.kareem.role"),
                    skills: t("about.team.members.kareem.skills"),
                    motto: t("about.team.members.kareem.motto"),
                    image: "Kareem.png",
                  },
                  {
                    name: "Michael Zakka",
                    role: t("about.team.members.michael.role"),
                    skills: t("about.team.members.michael.skills"),
                    motto: t("about.team.members.michael.motto"),
                    image: "Michael.png",
                  },
                  {
                    name: "Yasser Awad",
                    role: t("about.team.members.yasser.role"),
                    skills: t("about.team.members.yasser.skills"),
                    motto: t("about.team.members.yasser.motto"),
                    image: "Yasser.png",
                  },
                  {
                    name: "Yazan Rashwani",
                    role: t("about.team.members.yazan.role"),
                    skills: t("about.team.members.yazan.skills"),
                    motto: t("about.team.members.yazan.motto"),
                    image: "Yazan.png",
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
                      <motion.div
                        className="member-image-wrapper"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      >
                        <OptimizedImage
                          imageName={member.image}
                          alt={member.name}
                          className="team-photo"
                          loading="lazy"
                          onError={handleImageError}
                        />
                        <div
                          className="image-placeholder"
                          style={{ display: "none" }}
                        >
                          <div className="placeholder-initials">
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .slice(0, 2)}
                          </div>
                        </div>
                        <div className="image-overlay" />
                        <div className="member-info-overlay">
                          <h3>{member.name}</h3>
                          <span className="member-role">{member.role}</span>
                        </div>
                        {member.motto && (
                          <div className="member-details-overlay">
                            <div className="details-content">
                              <p className="member-motto">{member.motto}</p>
                              {member.skills && (
                                <p className="member-skills">{member.skills}</p>
                              )}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Marketing Team */}
            <div className="team-category">
              <motion.h3
                className={`category-title ${language === "ar" ? "rtl" : ""}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                {t("about.team.categories.marketing")}
              </motion.h3>
              <div className="team-grid">
                {[
                  {
                    name: "ALJ Sharif",
                    role: t("about.team.members.alj.role"),
                    skills: t("about.team.members.alj.skills"),
                    motto: t("about.team.members.alj.motto"),
                    image: "ALJ.png",
                  },
                  {
                    name: "Fauzi",
                    role: t("about.team.members.fauzi.role"),
                    skills: t("about.team.members.fauzi.skills"),
                    motto: t("about.team.members.fauzi.motto"),
                    image: "Fauzi.png",
                  },
                  {
                    name: "Wessam Dalil",
                    role: t("about.team.members.wessam.role"),
                    skills: t("about.team.members.wessam.skills"),
                    motto: t("about.team.members.wessam.motto"),
                    image: "Wissam.png",
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
                      <motion.div
                        className="member-image-wrapper"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      >
                        <OptimizedImage
                          imageName={member.image}
                          alt={member.name}
                          className="team-photo"
                          loading="lazy"
                          onError={handleImageError}
                        />
                        <div
                          className="image-placeholder"
                          style={{ display: "none" }}
                        >
                          <div className="placeholder-initials">
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .slice(0, 2)}
                          </div>
                        </div>
                        <div className="image-overlay" />
                        <div className="member-info-overlay">
                          <h3>{member.name}</h3>
                          <span className="member-role">{member.role}</span>
                        </div>
                        {member.motto && (
                          <div className="member-details-overlay">
                            <div className="details-content">
                              <p className="member-motto">{member.motto}</p>
                              {member.skills && (
                                <p className="member-skills">{member.skills}</p>
                              )}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Design Team */}
            <div className="team-category">
              <motion.h3
                className={`category-title ${language === "ar" ? "rtl" : ""}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                {t("about.team.categories.design")}
              </motion.h3>
              <div className="team-grid">
                {[
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
                  {
                    name: "Haytham Nashawati",
                    role: t("about.team.members.haytham.role"),
                    skills: t("about.team.members.haytham.skills"),
                    motto: t("about.team.members.haytham.motto"),
                    image: "Haytham.png",
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
                      <motion.div
                        className="member-image-wrapper"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      >
                        <OptimizedImage
                          imageName={member.image}
                          alt={member.name}
                          className="team-photo"
                          loading="lazy"
                          onError={handleImageError}
                        />
                        <div
                          className="image-placeholder"
                          style={{ display: "none" }}
                        >
                          <div className="placeholder-initials">
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .slice(0, 2)}
                          </div>
                        </div>
                        <div className="image-overlay" />
                        <div className="member-info-overlay">
                          <h3>{member.name}</h3>
                          <span className="member-role">{member.role}</span>
                        </div>
                        {member.motto && (
                          <div className="member-details-overlay">
                            <div className="details-content">
                              <p className="member-motto">{member.motto}</p>
                              {member.skills && (
                                <p className="member-skills">{member.skills}</p>
                              )}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Accountant Team */}
            <div className="team-category">
              <motion.h3
                className={`category-title ${language === "ar" ? "rtl" : ""}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                {t("about.team.categories.accountant")}
              </motion.h3>
              <div className="team-grid">
                {[
                  {
                    name: "Ahmad Ismaeel",
                    role: t("about.team.members.ahmadismaeel.role"),
                    skills: t("about.team.members.ahmadismaeel.skills"),
                    motto: t("about.team.members.ahmadismaeel.motto"),
                    image: "AhmadIsmaeel.png",
                  },
                  {
                    name: "Faris",
                    role: t("about.team.members.faris.role"),
                    skills: t("about.team.members.faris.skills"),
                    motto: t("about.team.members.faris.motto"),
                    image: "Fares.png",
                  },
                  {
                    name: "Lara",
                    role: t("about.team.members.lara.role"),
                    skills: t("about.team.members.lara.skills"),
                    motto: t("about.team.members.lara.motto"),
                    image: "Lara.png",
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
                      <motion.div
                        className="member-image-wrapper"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      >
                        <OptimizedImage
                          imageName={member.image}
                          alt={member.name}
                          className="team-photo"
                          loading="lazy"
                          onError={handleImageError}
                        />
                        <div
                          className="image-placeholder"
                          style={{ display: "none" }}
                        >
                          <div className="placeholder-initials">
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .slice(0, 2)}
                          </div>
                        </div>
                        <div className="image-overlay" />
                        <div className="member-info-overlay">
                          <h3>{member.name}</h3>
                          <span className="member-role">{member.role}</span>
                        </div>
                        {member.motto && (
                          <div className="member-details-overlay">
                            <div className="details-content">
                              <p className="member-motto">{member.motto}</p>
                              {member.skills && (
                                <p className="member-skills">{member.skills}</p>
                              )}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
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
