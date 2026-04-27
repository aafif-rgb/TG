import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import "./FeaturedProjects.css";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext";
import { workProjects } from "../../data/workData";

const featuredProjectIds = [
  "fane",
  "unframed",
  "pebble",
  "hm",
  "eventek",
  "evolve",
];

const FeaturedProjects = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const navigate = useNavigate();

  const formatCardText = (text) => {
    if (typeof text !== "string") return text;
    return language === "ar" ? text.replace(/\s*\/\s*/g, " / ") : text;
  };

  const subcategoryLabels = {
    all: t("workPage.subcategories.all"),
    websites: t("workPage.subcategories.websites"),
    "shopify-ecommerce": t("workPage.subcategories.shopifyEcommerce"),
    "mobile-applications": t("workPage.subcategories.mobileApplications"),
    "web-applications-platforms": t(
      "workPage.subcategories.webApplicationsPlatforms"
    ),
    "ui-ux-design": t("workPage.subcategories.uiUxDesign"),
    "branding-brand-identity": t(
      "workPage.subcategories.brandingBrandIdentity"
    ),
    "creative-design": t("workPage.subcategories.creativeDesign"),
    "videography-production": t("workPage.subcategories.videographyProduction"),
    photography: t("workPage.subcategories.photography"),
    "product-shoots": t("workPage.subcategories.productShoots"),
    "lifestyle-shoots": t("workPage.subcategories.lifestyleShoots"),
    "talking-head-interviews": t(
      "workPage.subcategories.talkingHeadInterviews"
    ),
    "event-coverage": t("workPage.subcategories.eventCoverage"),
    "signage-printing": t("workPage.subcategories.signagePrinting"),
    "social-media-management": t("workPage.subcategories.socialMediaManagement"),
    "content-strategy": t("workPage.subcategories.contentStrategy"),
    "campaign-management": t("workPage.subcategories.campaignManagement"),
    "digital-marketing": t("workPage.subcategories.digitalMarketing"),
    "performance-marketing": t("workPage.subcategories.performanceMarketing"),
  };

  const featuredProjects = featuredProjectIds
    .map((id) => workProjects.find((project) => project.id === id))
    .filter(Boolean);

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
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {featuredProjects.map((project, index) => {
            const technologies = t(project.technologiesKey, {
              returnObjects: true,
            });
            const safeTechnologies = Array.isArray(technologies)
              ? technologies
              : [];

            return (
              <motion.div
                key={project.id}
                className="project-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                viewport={{ once: true }}
                onClick={() => navigate("/work")}
                style={{ cursor: "pointer" }}
              >
                <div className="project-image">
                  <img src={project.image} alt={project.title} loading="lazy" decoding="async" />
                  <div className="project-overlay"></div>
                </div>
                <div className="project-content">
                  <div className="project-client-row">
                    <span className="client-name">
                      {formatCardText(project.client)}
                    </span>
                    <span className="subcategory-pill">
                      {formatCardText(
                        subcategoryLabels[project.subcategory] ||
                          project.subcategory
                      )}
                    </span>
                  </div>
                  <div className="project-tech">
                    {safeTechnologies.map((tech, idx) => (
                      <span key={idx} className="tech-tag">
                        {formatCardText(tech)}
                      </span>
                    ))}
                  </div>
                  <h3>{formatCardText(project.title)}</h3>
                  <p>{formatCardText(t(project.descriptionKey))}</p>
                </div>
              </motion.div>
            );
          })}
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

