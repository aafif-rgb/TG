import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "../../components/Header/Header";
import {
  FaGlobe,
  FaMobileAlt,
  FaShoppingCart,
  FaChartLine,
  FaRobot,
  FaPaintBrush,
} from "react-icons/fa";
import "./WorkPage.css";
import Footer from "../../components/Footer/Footer";

const WorkPage = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const canvasRef = useRef(null);
  const navigate = useNavigate();
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

  const projects = [
    {
      title: "Fane",
      category: "social media",
      image: "/assets/brands/fane.png",
      icon: <FaShoppingCart />,
      description: t("workPage.projects.fane.description"),
      technologies: t("workPage.projects.fane.tech", { returnObjects: true }),
      link: "#",
    },
    {
      title: "Huqqabaz",
      category: "social media",
      image: "/assets/brands/huqqabaz.png",
      icon: <FaMobileAlt />,
      description: t("workPage.projects.huqqabaz.description"),
      technologies: t("workPage.projects.huqqabaz.tech", {
        returnObjects: true,
      }),
      link: "#",
    },
    {
      title: "Diamond Padel club",
      category: "social media",
      image: "/assets/brands/dpc.jpg",
      icon: <FaRobot />,
      description: t("workPage.projects.dpc.description"),
      technologies: t("workPage.projects.dpc.tech", { returnObjects: true }),
      link: "#",
    },
    {
      title: "Tarta de Amor",
      category: "design",
      image: "/assets/brands/tarta.png",
      icon: <FaGlobe />,
      description: t("workPage.projects.tarta.description"),
      technologies: t("workPage.projects.tarta.tech", { returnObjects: true }),
      link: "#",
    },
    {
      title: "Unframed breaks the mold",
      category: "design",
      image: "/assets/brands/unframed.png",
      icon: <FaChartLine />,
      description: t("workPage.projects.unframed.description"),
      technologies: t("workPage.projects.unframed.tech", {
        returnObjects: true,
      }),
      link: "#",
    },
    {
      title: "H & M",
      category: "media production",
      image: "/assets/brands/H&M.png",
      icon: <FaPaintBrush />,
      description: t("workPage.projects.hm.description"),
      technologies: t("workPage.projects.hm.tech", { returnObjects: true }),
      link: "#",
    },
    {
      title: "Shift inc.",
      category: "media production",
      image: "/assets/brands/shift.png",
      icon: <FaPaintBrush />,
      description: t("workPage.projects.shift.description"),
      technologies: t("workPage.projects.shift.tech", { returnObjects: true }),
      link: "#",
    },
    {
      title: "Saccess Perfume",
      category: "shopify",
      image: "/assets/brands/saccess.png",
      icon: <FaPaintBrush />,
      description: t("workPage.projects.saccess.description"),
      technologies: t("workPage.projects.saccess.tech", {
        returnObjects: true,
      }),
      link: "#",
    },
    {
      title: "Pebble",
      category: "web",
      image: "/assets/brands/Pebble.png",
      icon: <FaPaintBrush />,
      description: t("workPage.projects.pebble.description"),
      technologies: t("workPage.projects.pebble.tech", { returnObjects: true }),
      link: "#",
    },
    {
      title: "منصة تحكيم",
      category: "web",
      image: "/assets/brands/Tahkeem.png",
      icon: <FaPaintBrush />,
      description: t("workPage.projects.tahkeem.description"),
      technologies: t("workPage.projects.tahkeem.tech", {
        returnObjects: true,
      }),
      link: "#",
    },
    {
      title: "EvenTek",
      category: "mobile",
      image: "/assets/brands/Eventek.jpeg",
      icon: <FaPaintBrush />,
      description: t("workPage.projects.eventek.description"),
      technologies: t("workPage.projects.eventek.tech", {
        returnObjects: true,
      }),
      link: "#",
    },
    {
      title: "Evolve",
      category: "mobile",
      image: "/assets/brands/evolve.png",
      icon: <FaPaintBrush />,
      description: t("workPage.projects.evolve.description"),
      technologies: t("workPage.projects.evolve.tech", {
        returnObjects: true,
      }),
      link: "#",
    },
  ];

  const categories = [
    { id: "all", name: t("workPage.categories.all") },
    { id: "web", name: t("workPage.categories.web") },
    { id: "mobile", name: t("workPage.categories.mobile") },
    { id: "shopify", name: t("workPage.categories.shopify") },
    { id: "social media", name: t("workPage.categories.socialMedia") },
    { id: "design", name: t("workPage.categories.design") },
    { id: "media production", name: t("workPage.categories.mediaProduction") },
  ];

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  return (
    <div className="work-page">
      <Header />
      <canvas ref={canvasRef} className="particle-canvas" />

      <main className="work-content">
        {/* Hero Section */}
        <section className="work-hero">
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
                {t("workPage.hero.tag")}
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {t("workPage.hero.title")}
                <span className="highlight">
                  {" "}
                  {t("workPage.hero.titleHighlight")}
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                {t("workPage.hero.description")}
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="projects-section">
          <div className="section-container">
            {/* Filter Categories */}
            <div className="filter-categories">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  className={`filter-button ${
                    activeFilter === category.id ? "active" : ""
                  }`}
                  onClick={() => setActiveFilter(category.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category.name}
                </motion.button>
              ))}
            </div>

            {/* Projects Grid */}
            <div className="projects-grid">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.title}
                  className="project-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="project-image">
                    <img src={project.image} alt={project.title} />
                    <div className="project-overlay">
                      {/* <a href={project.link} className="view-project">
                        View Project
                      </a> */}
                    </div>
                  </div>
                  <div className="project-content">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="project-tech">
                      {project.technologies.map((tech, idx) => (
                        <span key={idx} className="tech-tag">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
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
              <h2>{t("workPage.cta.title")}</h2>
              <p>{t("workPage.cta.subtitle")}</p>
              <motion.button
                onClick={() => navigate("/contact")}
                className="cta-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t("workPage.cta.button")}
              </motion.button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default WorkPage;
