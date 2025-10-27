import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import {
  FaPhone,
  FaEnvelope,
  FaLinkedin,
  FaInstagram,
  FaTwitter,
  FaFacebook,
  FaClock,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaUser,
  FaBuilding,
} from "react-icons/fa";
import "./ContactPage.css";

const ContactPage = () => {
  const canvasRef = useRef(null);
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");

  // Particle animation effect - matching HomePage
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

  // Form handling
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("");

    // Simple spam protection - honeypot field
    const honeypot = e.target.querySelector('input[name="website"]');
    if (honeypot && honeypot.value) {
      setSubmitStatus("error");
      setIsSubmitting(false);
      return;
    }

    try {
      // Simulate form submission - replace with your actual endpoint
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        company: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <FaPhone />,
      title: t("contact.info.phone"),
      value: "‎+966 50 397 4458",
      link: "tel:‎+966 50 397 4458",
    },
    {
      icon: <FaEnvelope />,
      title: t("contact.info.email"),
      value: "Info@tgmena.com",
      link: "mailto:Info@tgmena.com",
    },
  ];

  const socialLinks = [
    {
      icon: <FaLinkedin />,
      name: "LinkedIn",
      url: "https://www.linkedin.com/company/towardsgreatness/",
      color: "#0077B5",
    },
    {
      icon: <FaInstagram />,
      name: "Instagram",
      url: "https://www.instagram.com/tg.mena?igsh=dXEyYXZmdHg3Yjk4",
      color: "#E4405F",
    },
  ];

  const businessHours = [
    {
      day: t("contact.schedule.weekdays"),
      hours: t("contact.schedule.weekdaysHours"),
    },
    {
      day: t("contact.schedule.weekend"),
      hours: t("contact.schedule.weekendHours"),
    },
  ];

  return (
    <div className="contact-page">
      <canvas ref={canvasRef} className="particle-canvas" />
      <Header />

      <main className="main-content">
        {/* Hero Section */}
        <section className="contact-hero">
          <div className="contact-hero-content">
            <motion.h1
              className="contact-hero-title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {t("contact.hero.title")}
            </motion.h1>
            <motion.p
              className="contact-hero-subtitle"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {t("contact.hero.subtitle")}
            </motion.p>
            <motion.div
              style={{
                margin: "0 auto",
                display: "flex",
                width: "fit-content",
              }}
              className="response-time"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <FaClock />
              <span>{t("contact.hero.responseTime")}</span>
            </motion.div>
          </div>
        </section>

        {/* Contact Content */}
        <section className="contact-content">
          <div className="contact-container">
            {/* Contact Information */}
            <motion.div
              className="contact-info-section"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="contact-info-title">
                {t("contact.info.title")}
              </div>

              {/* Contact Details */}
              <div className="contact-details">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={index}
                    style={{
                      direction: "ltr",
                    }}
                    href={info.link}
                    className="contact-item"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 5 }}
                  >
                    <div className="contact-icon">{info.icon}</div>
                    <div className="contact-text">
                      <h4>{info.title}</h4>
                      <p>{info.value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Business Hours */}
              <motion.div
                className="business-hours"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <h3 style={{ textAlign: "start" }}>
                  {t("contact.info.businessHours")}
                </h3>
                <div className="hours-list">
                  {businessHours.map((schedule, index) => (
                    <div key={index} className="hours-item">
                      <span className="day">{schedule.day}</span>
                      <span className="hours">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Social Media */}
              <motion.div
                className="social-media"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <h3 style={{ textAlign: "start" }}>
                  {t("contact.info.followUs")}
                </h3>
                <div className="social-links">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link"
                      style={{ "--social-color": social.color }}
                      whileHover={{ scale: 1.1, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {social.icon}
                      <span>{social.name}</span>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              className="contact-form-section"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="contact-form-title">
                {t("contact.form.title")}
              </div>
              <form className="contact-form" onSubmit={handleSubmit}>
                {/* Honeypot field for spam protection */}
                <input
                  type="text"
                  name="website"
                  style={{ display: "none" }}
                  tabIndex="-1"
                  autoComplete="off"
                />

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">
                      <FaUser />
                      {t("contact.form.fullName")} *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder={t("contact.form.placeholders.fullName")}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">
                      <FaEnvelope />
                      {t("contact.form.email")} *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder={t("contact.form.placeholders.email")}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="company">
                      <FaBuilding />
                      {t("contact.form.company")}
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder={t("contact.form.placeholders.company")}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="subject">
                      <FaPaperPlane />
                      {t("contact.form.subject")} *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      placeholder={t("contact.form.placeholders.subject")}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="message">
                    <FaPaperPlane />
                    {t("contact.form.message")} *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="6"
                    placeholder={t("contact.form.placeholders.message")}
                  ></textarea>
                </div>

                <motion.button
                  type="submit"
                  className="submit-btn"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="spinner"></div>
                      {t("contact.form.sending")}
                    </>
                  ) : (
                    <>
                      <FaPaperPlane />
                      {t("contact.form.send")}
                    </>
                  )}
                </motion.button>

                {submitStatus === "success" && (
                  <motion.div
                    className="form-message success"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {t("contact.form.success")}
                  </motion.div>
                )}

                {submitStatus === "error" && (
                  <motion.div
                    className="form-message error"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {t("contact.form.error")}
                  </motion.div>
                )}
              </form>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;
