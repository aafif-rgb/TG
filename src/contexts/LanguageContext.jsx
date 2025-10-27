import { createContext, useContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState("en");
  const [direction, setDirection] = useState("ltr");

  useEffect(() => {
    // Update document attributes when language changes
    document.documentElement.lang = language;
    document.documentElement.dir = direction;

    // Update body class for additional styling hooks
    document.body.classList.remove("ltr", "rtl");
    document.body.classList.add(direction);
  }, [language, direction]);

  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "ar" : "en";
    const newDirection = newLanguage === "ar" ? "rtl" : "ltr";

    setLanguage(newLanguage);
    setDirection(newDirection);
    i18n.changeLanguage(newLanguage);
  };

  const changeLanguage = (lang) => {
    const newDirection = lang === "ar" ? "rtl" : "ltr";
    setLanguage(lang);
    setDirection(newDirection);
    i18n.changeLanguage(lang);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        direction,
        isRTL: direction === "rtl",
        toggleLanguage,
        changeLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
