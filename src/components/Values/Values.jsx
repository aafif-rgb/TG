import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import "./Values.css";

const Values = () => {
  const { t } = useTranslation();

  const values = [
    {
      icon: "⭐",
      title: t("values.excellence.title"),
      subtitle: t("values.excellence.subtitle"),
    },
    {
      icon: "🚀",
      title: t("values.innovation.title"),
      subtitle: t("values.innovation.subtitle"),
    },
    {
      icon: "💥",
      title: t("values.impact.title"),
      subtitle: t("values.impact.subtitle"),
    },
    {
      icon: "🤝",
      title: t("values.integrity.title"),
      subtitle: t("values.integrity.subtitle"),
    },
  ];

  // Animation variants
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

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="values" className="values-section">
      <div className="values-content">
        <motion.div
          className="values-header"
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
          <motion.h2
            className="values-title"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            viewport={{ once: true }}
          >
            {t("values.title")}
          </motion.h2>
          <motion.p
            className="values-subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            viewport={{ once: true }}
          >
            {t("values.subtitle")}
          </motion.p>
        </motion.div>

        <motion.div
          className="values-grid"
          // variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {values.map((value, index) => (
            <motion.div
              key={index}
              className="value-card"
              // variants={cardVariants}
              whileHover={{
                y: -8,
                transition: {
                  duration: 0.3,
                  ease: "easeOut",
                },
              }}
            >
              <div className="value-card-content">
                <motion.span
                  className="value-icon"
                  whileHover={{
                    scale: 1.2,
                    rotate: 5,
                    transition: { duration: 0.3 },
                  }}
                >
                  {value.icon}
                </motion.span>
                <motion.h3
                  className="value-title"
                  //  variants={titleVariants}
                >
                  {value.title}
                </motion.h3>
                <motion.p
                  className="value-subtitle"
                  // variants={titleVariants}
                >
                  {value.subtitle}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Values;
