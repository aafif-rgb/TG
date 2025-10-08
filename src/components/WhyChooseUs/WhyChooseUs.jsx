import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  FaLightbulb,
  FaUsers,
  FaRocket,
  FaCogs,
  FaChartLine,
  FaShieldAlt,
} from "react-icons/fa";
import "./WhyChooseUs.css";

const WhyChooseUs = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: <FaLightbulb />,
      title: t("whyChooseUs.features.creativeExcellence.title"),
      description: t("whyChooseUs.features.creativeExcellence.description"),
    },
    {
      icon: <FaUsers />,
      title: t("whyChooseUs.features.dedicatedTeam.title"),
      description: t("whyChooseUs.features.dedicatedTeam.description"),
    },
    {
      icon: <FaRocket />,
      title: t("whyChooseUs.features.industryFocus.title"),
      description: t("whyChooseUs.features.industryFocus.description"),
    },
    {
      icon: <FaCogs />,
      title: t("whyChooseUs.features.customSolutions.title"),
      description: t("whyChooseUs.features.customSolutions.description"),
    },
    {
      icon: <FaChartLine />,
      title: t("whyChooseUs.features.dataDriven.title"),
      description: t("whyChooseUs.features.dataDriven.description"),
    },
    {
      icon: <FaShieldAlt />,
      title: t("whyChooseUs.features.qualityAssured.title"),
      description: t("whyChooseUs.features.qualityAssured.description"),
    },
  ];

  const processSteps = [
    {
      number: "01",
      title: t("whyChooseUs.process.discovery.title"),
      description: t("whyChooseUs.process.discovery.description"),
    },
    {
      number: "02",
      title: t("whyChooseUs.process.creative.title"),
      description: t("whyChooseUs.process.creative.description"),
    },
    {
      number: "03",
      title: t("whyChooseUs.process.development.title"),
      description: t("whyChooseUs.process.development.description"),
    },
    {
      number: "04",
      title: t("whyChooseUs.process.testing.title"),
      description: t("whyChooseUs.process.testing.description"),
    },
  ];

  return (
    <section className="why-choose-us">
      <div className="why-choose-us-content">
        <motion.div
          className="why-choose-us-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {t("whyChooseUs.title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            {t("whyChooseUs.subtitle")}
          </motion.p>
        </motion.div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="feature-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.2 + index * 0.1,
                type: "spring",
                stiffness: 100,
              }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 },
              }}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="process-timeline">
          {processSteps.map((step, index) => (
            <motion.div
              key={index}
              className="process-step"
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.3 + index * 0.2,
                type: "spring",
                stiffness: 100,
              }}
              viewport={{ once: true }}
            >
              <div className="process-content">
                <h3 className="process-title">{step.title}</h3>
                <p className="process-description">{step.description}</p>
              </div>
              <div className="process-number">{step.number}</div>
              <div style={{ flex: 1 }}></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
