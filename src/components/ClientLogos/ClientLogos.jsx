import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import "./ClientLogos.css";
import TahkeemLogo from "../../../public/assets/partners/Tahkeem_Logo_White.svg";
import UnframedLogo from "../../../public/assets/partners/Unframed.svg";
import ArenaLogo from "../../../public/assets/partners/Arena_Logo_White.svg";

const ClientLogos = () => {
  const { t } = useTranslation();
  const companies = [
    {
      name: "TAHKEEM",
      logo: TahkeemLogo,
    },
    { name: "UNFRAMED", logo: UnframedLogo },
    {
      name: "ARENA",
      logo: ArenaLogo,
    },
  ];

  return (
    <section className="client-logos">
      <div className="client-logos-content">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="clients-title">{t("clients.title")}</div>
          <p>{t("clients.subtitle")}</p>
        </motion.div>

        <div className="logos-container">
          <div className="logos-scroll">
            {companies.map((company, index) => (
              <div key={index} className="logo-item">
                <div className="logo-placeholder">
                  <img src={company.logo} alt={company.name} />
                </div>
              </div>
            ))}
            {companies.map((company, index) => (
              <div key={`duplicate-${index}`} className="logo-item">
                <div className="logo-placeholder">
                  <img src={company.logo} alt={company.name} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
