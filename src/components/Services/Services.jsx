import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import "./Services.css";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const servicesGridRef = useRef(null);
  const progressRef = useRef(null);

  const services = [
    {
      icon: "📣",
      title: t("services.marketing.title"),
      description: t("services.marketing.description"),
      items: [
        t("services.marketing.items.brandStrategy"),
        t("services.marketing.items.socialMedia"),
        t("services.marketing.items.contentCreation"),
        t("services.marketing.items.accountsManagement"),
        t("services.marketing.items.communicationPlanning"),
        t("services.marketing.items.businessConcept"),
      ],
    },
    {
      icon: "🎨",
      title: t("services.creative.title"),
      description: t("services.creative.description"),
      items: [
        t("services.creative.items.branding"),
        t("services.creative.items.logo"),
        t("services.creative.items.guideline"),
        t("services.creative.items.presentation"),
        t("services.creative.items.socialMedia"),
      ],
    },
    {
      icon: "🎥",
      title: t("services.production.title"),
      description: t("services.production.description"),
      items: [
        t("services.production.items.videography"),
        t("services.production.items.photography"),
        t("services.production.items.motionGraphics"),
        t("services.production.items.cgi"),
        t("services.production.items.props"),
      ],
    },
    {
      icon: "⚡",
      title: t("services.tech.title"),
      description: t("services.tech.description"),
      items: [
        t("services.tech.items.websites"),
        t("services.tech.items.shopify"),
        t("services.tech.items.uiux"),
        t("services.tech.items.customApps"),
      ],
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
    if (!isMobile || !servicesGridRef.current) return;

    const grid = servicesGridRef.current;
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
    if (!servicesGridRef.current) return;

    const grid = servicesGridRef.current;
    const cardWidth = grid.offsetWidth * 0.85;
    grid.scrollTo({
      left: cardWidth * index,
      behavior: "smooth",
    });
    setCurrentSlide(index);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: {
      y: 30,
      opacity: 0,
      scale: 0.95,
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        mass: 0.8,
      },
    },
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -45 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const featureVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <section id="services" className="services">
      <div className="services-content">
        <motion.div
          className="services-header"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            type: "spring",
            stiffness: 100,
            damping: 20,
          }}
          viewport={{ once: true }}
        >
          <div
            className="services-title"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            viewport={{ once: true }}
          >
            {t("services.title")}
          </div>
          <motion.p
            className="services-subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            viewport={{ once: true }}
          >
            {t("services.subtitle")}
          </motion.p>
        </motion.div>

        <motion.div
          className="services-grid"
          ref={servicesGridRef}
          // variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="service-card"
              // variants={cardVariants}
              whileHover={
                !isMobile
                  ? {
                      y: -8,
                      transition: {
                        duration: 0.3,
                        ease: "easeOut",
                      },
                    }
                  : {}
              }
            >
              <div className="service-card-content">
                <motion.span
                  className="service-icon"
                  whileHover={
                    !isMobile
                      ? {
                          scale: 1.2,
                          rotate: 5,
                          transition: { duration: 0.3 },
                        }
                      : {}
                  }
                >
                  {service.icon}
                </motion.span>
                <motion.h3
                  className="service-title"
                  // variants={titleVariants}
                >
                  {service.title}
                </motion.h3>
                <motion.p
                  className="service-description"
                  // variants={titleVariants}
                >
                  {service.description}
                </motion.p>
                <div className="service-features">
                  {service.items.map((item, itemIndex) => (
                    <motion.div
                      key={itemIndex}
                      className="feature-item"
                      // variants={featureVariants}
                      custom={itemIndex}
                      whileHover={
                        !isMobile
                          ? {
                              x: 5,
                              transition: { duration: 0.2 },
                            }
                          : {}
                      }
                    >
                      {/* <span className="feature-icon"></span> */}
                      {item}
                    </motion.div>
                  ))}
                </div>
                {/* <motion.button
                  className={`service-cta ${
                    index === 1 ? "service-cta-white" : ""
                  }`}
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    if (service.title === "Production") {
                      navigate("/services/media-production");
                    } else if (service.title === "Tech") {
                      navigate("/services/tech");
                    } else if (service.title === "Marketing & Communication") {
                      navigate("/services/marketing");
                    }
                  }}
                >
                  Learn More
                </motion.button> */}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
