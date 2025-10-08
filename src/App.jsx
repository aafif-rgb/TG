import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import AboutPage from "./pages/AboutPage/AboutPage";
import ServicesPage from "./pages/ServicesPage/ServicesPage";
import WorkPage from "./pages/WorkPage/WorkPage";
import ContactPage from "./pages/ContactPage/ContactPage";
import ProjectDetails from "./pages/ProjectDetails/ProjectDetails";
import MediaProductionPage from "./pages/MediaProductionPage/MediaProductionPage";
import TechServicesPage from "./pages/TechServicesPage/TechServicesPage";
import MarketingPage from "./pages/MarketingPage/MarketingPage";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/projects/:projectId" element={<ProjectDetails />} />
        <Route
          path="/services/media-production"
          element={<MediaProductionPage />}
        />
        <Route path="/services/tech" element={<TechServicesPage />} />
        <Route path="/services/marketing" element={<MarketingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
