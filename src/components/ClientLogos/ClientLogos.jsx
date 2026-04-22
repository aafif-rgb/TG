import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import "./ClientLogos.css";

const ClientLogos = () => {
  const { t } = useTranslation();
  const companies = [
    { name: "Aani", logo: "/assets/partners/aani.png" },
    { name: "Afia", logo: "/assets/partners/Afia.png" },
    { name: "Al Fanar", logo: "/assets/partners/al-fanar.png" },
    { name: "Alarabi", logo: "/assets/partners/alarabi.png" },
    { name: "Aldrees", logo: "/assets/partners/aldrees.png" },
    { name: "Alosr", logo: "/assets/partners/alosr.png" },
    { name: "Amada", logo: "/assets/partners/amada.png" },
    { name: "Apsco", logo: "/assets/partners/apsco.png" },
    { name: "Bah", logo: "/assets/partners/bah.png" },
    { name: "Barnda", logo: "/assets/partners/Bar.png" },
    { name: "Cash Cup", logo: "/assets/partners/cash.png" },
    { name: "Diamond Padel", logo: "/assets/partners/d-pad.png" },
    { name: "Deep", logo: "/assets/partners/deep.png" },
    { name: "Deera", logo: "/assets/partners/deera.png" },
    { name: "Foom", logo: "/assets/partners/foom.png" },
    { name: "GKZ", logo: "/assets/partners/gkz.png" },
    { name: "Gro", logo: "/assets/partners/gro.png" },
    { name: "Health", logo: "/assets/partners/Health.png" },
    { name: "H&M", logo: "/assets/partners/hm.png" },
    { name: "Honor", logo: "/assets/partners/Honor.png" },
    { name: "Jarir", logo: "/assets/partners/jarir.png" },
    { name: "Kimo", logo: "/assets/partners/kimo.png" },
    { name: "Lens", logo: "/assets/partners/Lens.png" },
    { name: "ML", logo: "/assets/partners/ml.png" },
    { name: "NBK", logo: "/assets/partners/nbk.png" },
    { name: "Newlogo", logo: "/assets/partners/newlogo.png" },
    { name: "Pfizer", logo: "/assets/partners/pfizer.png" },
    { name: "Reeses", logo: "/assets/partners/reeses.png" },
    { name: "RF", logo: "/assets/partners/rf.png" },
    { name: "Sam", logo: "/assets/partners/sam.png" },
    { name: "Seara", logo: "/assets/partners/seara.png" },
    { name: "Shal", logo: "/assets/partners/shal.png" },
    { name: "Shein", logo: "/assets/partners/shein.png" },
    { name: "Shift", logo: "/assets/partners/shift.png" },
    { name: "SMACC", logo: "/assets/partners/smacc.png" },
    { name: "STC", logo: "/assets/partners/Stc.png" },
    { name: "Tabuk", logo: "/assets/partners/tabuk.png" },
    { name: "Tahkeem", logo: "/assets/partners/tahke.png" },
    { name: "Tefal", logo: "/assets/partners/Tefal.png" },
    { name: "Tiny Tots", logo: "/assets/partners/tiny.png" },
    { name: "Unframed", logo: "/assets/partners/Unframed.svg" },
    { name: "Welloo", logo: "/assets/partners/welloo.png" },
    { name: "Arena", logo: "/assets/partners/Arena_Logo.svg" },
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
