import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import "./HomePage.css";
import Header from "../../components/Header/Header";
import Values from "../../components/Values/Values";
import Services from "../../components/Services/Services";
import WhyChooseUs from "../../components/WhyChooseUs/WhyChooseUs";
import ClientLogos from "../../components/ClientLogos/ClientLogos";
import FeaturedProjects from "../../components/FeaturedProjects/FeaturedProjects";
import Footer from "../../components/Footer/Footer";

const HomePage = () => {
  const canvasRef = useRef(null);
  const { t } = useTranslation();

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

  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(50);
  const [isFullTextTyped, setIsFullTextTyped] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);

  const baseText = t("hero.title") + " ";
  const words = [t("hero.word1"), t("hero.word2")];

  // Reset animation when language changes
  useEffect(() => {
    setText("");
    setIsDeleting(false);
    setIsFullTextTyped(false);
    setIsComplete(false);
    setCursorVisible(true);
    setTypingSpeed(50);
  }, [baseText, words[0], words[1]]);

  // Cursor blinking effect
  useEffect(() => {
    if (isComplete) {
      const cursorInterval = setInterval(() => {
        setCursorVisible((prev) => !prev);
      }, 530);
      return () => clearInterval(cursorInterval);
    }
  }, [isComplete]);

  useEffect(() => {
    if (isComplete) return; // Stop typing animation if complete

    let timer;
    const handleType = () => {
      // First type the full text
      if (!isFullTextTyped) {
        const fullText = baseText + words[0];
        if (text.length < fullText.length) {
          setText(fullText.substring(0, text.length + 1));
          setTypingSpeed(80);
        } else {
          setIsFullTextTyped(true);
          setTypingSpeed(80);
          // Trigger deletion after delay
          setTimeout(() => {
            setIsDeleting(true);
          }, 2000);
        }
        return;
      }

      // Handle deletion and typing of second word
      if (isDeleting) {
        const currentText = text.substring(baseText.length);
        if (currentText.length > 0) {
          setText(baseText + currentText.substring(0, currentText.length - 1));
          setTypingSpeed(30);
        } else {
          setIsDeleting(false);
        }
      } else {
        const currentText = text.substring(baseText.length);
        if (currentText.length < words[1].length) {
          setText(baseText + words[1].substring(0, currentText.length + 1));
          setTypingSpeed(50);
        } else {
          setIsComplete(true);
        }
      }
    };

    timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, isFullTextTyped, typingSpeed, isComplete]);

  return (
    <div className="homepage">
      <canvas ref={canvasRef} className="particle-canvas" />
      <Header />

      <main className="main-content">
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-normal">
            <div className="hero-container">
              <motion.div
                className="hero-left"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                <motion.div
                  className="hero-tag"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <span className="tag-text">{t("hero.tag")}</span>
                </motion.div>
                <motion.h1
                  className="hero-title"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                >
                  {text}
                  <span
                    className="cursor"
                    style={{ opacity: cursorVisible ? 1 : 0 }}
                  >
                    |
                  </span>
                </motion.h1>
                <motion.p
                  className="hero-subtitle"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                >
                  {t("hero.subtitle")}
                </motion.p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <Values />

        {/* Services Section */}
        <Services />

        {/* Why Choose Us Section */}
        <WhyChooseUs />

        {/* Client Logos Section */}
        <ClientLogos />

        {/* Featured Projects Section */}
        <FeaturedProjects />

        {/* Approach Section */}
        <section className="approach">
          <div className="approach-content">
            <motion.div
              className="approach-left"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <motion.div
                className="approach-title"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                {t("approach.title")}
              </motion.div>
              <div className="stats">
                {[
                  { number: "2+", label: t("approach.stats.years") },
                  { number: "8+", label: t("approach.stats.projects") },
                  { number: "15+", label: t("approach.stats.team") },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="stat-item"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.3 + index * 0.1,
                      type: "spring",
                      stiffness: 100,
                    }}
                    viewport={{ once: true }}
                    whileHover={{
                      scale: 1.05,
                      transition: { duration: 0.2 },
                    }}
                  >
                    <motion.span
                      className="stat-number"
                      initial={{ scale: 0.5 }}
                      whileInView={{ scale: 1 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.4 + index * 0.1,
                        type: "spring",
                        stiffness: 200,
                      }}
                      viewport={{ once: true }}
                    >
                      {stat.number}
                    </motion.span>
                    <span className="stat-label">{stat.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div
              className="approach-cards"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {[
                {
                  title: t("approach.discovery.title"),
                  description: t("approach.discovery.description"),
                },
                {
                  title: t("approach.design.title"),
                  description: t("approach.design.description"),
                },
                {
                  title: t("approach.testing.title"),
                  description: t("approach.testing.description"),
                },
                {
                  title: t("approach.launch.title"),
                  description: t("approach.launch.description"),
                },
              ].map((card, index) => (
                <motion.div
                  key={index}
                  className="approach-card"
                  initial={{ opacity: 0, x: 30, y: 30 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.2 + index * 0.1,
                    type: "spring",
                    stiffness: 100,
                  }}
                  viewport={{ once: true }}
                  whileHover={{
                    scale: 1.02,
                    translateX: 10,
                    transition: { duration: 0.2 },
                  }}
                >
                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: 0.3 + index * 0.1,
                    }}
                    viewport={{ once: true }}
                  >
                    {card.title}
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{
                      duration: 0.3,
                      delay: 0.4 + index * 0.1,
                    }}
                    viewport={{ once: true }}
                  >
                    {card.description}
                  </motion.p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
