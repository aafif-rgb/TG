import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import "./FeaturedProjects.css";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext";

// Import brand images
import faneImage from "../../assets/brands/fane.png";
import unframedImage from "../../assets/brands/unframed.png";
import pebbleImage from "../../assets/brands/pebble.png";
import hmImage from "../../assets/brands/h&m.png";
import evolveImage from "../../assets/brands/evolve.png";

const FeaturedProjects = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const projectsGridRef = useRef(null);
  const progressRef = useRef(null);
  const navigate = useNavigate();

  const projects = [
    {
      id: "fane",
      title: t("featuredProjects.projects.fane.title"),
      category: t("featuredProjects.projects.fane.category"),
      description: t("featuredProjects.projects.fane.description"),
      image: faneImage,
    },
    {
      id: "unframed",
      title: t("featuredProjects.projects.unframed.title"),
      category: t("featuredProjects.projects.unframed.category"),
      description: t("featuredProjects.projects.unframed.description"),
      image: unframedImage,
    },
    {
      id: "pebble",
      title: t("featuredProjects.projects.pebble.title"),
      category: t("featuredProjects.projects.pebble.category"),
      description: t("featuredProjects.projects.pebble.description"),
      image: pebbleImage,
    },
    {
      id: "h&m",
      title: t("featuredProjects.projects.hm.title"),
      category: t("featuredProjects.projects.hm.category"),
      description: t("featuredProjects.projects.hm.description"),
      image: hmImage,
    },
    {
      id: "Evolve",
      title: t("featuredProjects.projects.evolve.title"),
      category: t("featuredProjects.projects.evolve.category"),
      description: t("featuredProjects.projects.evolve.description"),
      image: evolveImage,
    },
  ];

  // Check if mobile on mount and window resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Handle scroll events for mobile carousel
  useEffect(() => {
    if (!isMobile || !projectsGridRef.current) return;

    const grid = projectsGridRef.current;
    let timeout;

    const handleScroll = () => {
      if (timeout) clearTimeout(timeout);

      timeout = setTimeout(() => {
        const scrollLeft = grid.scrollLeft;
        const cardWidth = grid.offsetWidth * 0.85; // 85% of viewport
        const newSlide = Math.round(scrollLeft / cardWidth);
        setCurrentSlide(newSlide);

        // Update progress bar
        if (progressRef.current) {
          const progress =
            (scrollLeft / (grid.scrollWidth - grid.offsetWidth)) * 100;
          progressRef.current.style.width = `${progress}%`;
        }
      }, 50);
    };

    grid.addEventListener("scroll", handleScroll);
    return () => grid.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  // Scroll to slide on dot click
  const scrollToSlide = (index) => {
    if (!projectsGridRef.current) return;

    const grid = projectsGridRef.current;
    const cardWidth = grid.offsetWidth * 0.85;
    grid.scrollTo({
      left: cardWidth * index,
      behavior: "smooth",
    });
    setCurrentSlide(index);
  };

  return (
    <section className="featured-projects">
      <div className="featured-projects-content">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="featured-projects-title">
            {t("featuredProjects.title")}
          </div>
          <p>{t("featuredProjects.subtitle")}</p>
        </motion.div>

        <motion.div
          className="projects-grid"
          ref={projectsGridRef}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="project-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              viewport={{ once: true }}
              whileHover={
                !isMobile
                  ? {
                      y: -10,
                      transition: { duration: 0.2 },
                    }
                  : {}
              }
              onClick={() => navigate("/work")}
              style={{
                cursor: "pointer",
              }}
            >
              <div className="project-image">
                <div className="image-placeholder">
                  <img src={project.image} />
                </div>
              </div>
              <div className="project-info">
                <span className="project-category">{project.category}</span>
                <h3
                  className="project-title"
                  style={{ textAlign: language === "ar" ? "start" : undefined }}
                >
                  {project.title}
                </h3>
                <p className="project-description">{project.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="cta-container"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3>{t("featuredProjects.cta.title")}</h3>
          <p>{t("featuredProjects.cta.subtitle")}</p>
          <motion.button
            className="cta-button"
            onClick={() => navigate("/contact")}
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.95 }}
          >
            {t("featuredProjects.cta.button")}
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
