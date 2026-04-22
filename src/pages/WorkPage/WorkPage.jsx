import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import TextType from "../../components/TextType/TextType";
import { clientConnections, workPillars, workProjects } from "../../data/workData";
import "./WorkPage.css";

// Fast rollback switch: set to false to restore classic cards UI.
const ENABLE_NEURAL_MAP = true;
const FLOAT_AMPLITUDE_X = 0.48;
const FLOAT_AMPLITUDE_Y = 0.72;

const clientIndustryMap = {
  tahkeem: "Government & Corporate",
  newlogo: "Government & Corporate",
  "tiny-tots": "Government & Corporate",
  cashcup: "Sports & Fitness",
  samsign: "Government & Corporate",
  groundkings: "Sports & Fitness",
  saccess: "Retail & E-commerce",
  salmina: "Retail & E-commerce",
  hadiha: "Retail & E-commerce",
  toyslab: "Retail & E-commerce",
  unframed: "Retail & E-commerce",
  eventek: "Technology Products",
  pebble: "Technology Products",
  shift: "Technology Products",
  tarta: "Hospitality & F&B",
  barnda: "Hospitality & F&B",
  huqqabaz: "Hospitality & F&B",
  "the-feast": "Hospitality & F&B",
  dpc: "Sports & Fitness",
  wrestling: "Sports & Fitness",
  evolve: "Sports & Fitness",
  hm: "Lifestyle & Fashion",
  fane: "Lifestyle & Fashion",
};

const WorkPage = () => {
  const [activePillar, setActivePillar] = useState(workPillars[0]);
  const [activeSubcategory, setActiveSubcategory] = useState("all");
  const canvasRef = useRef(null);
  const neuralMapRef = useRef(null);
  const pillarNodeRefs = useRef({});
  const pillarTextRefs = useRef({});
  const projectNodeRefs = useRef({});
  const projectLineRefs = useRef({});
  const projectAnimationStateRef = useRef({});
  const pillarAnimationStateRef = useRef({});
  const neuralAnimationFrameRef = useRef(null);
  const lastAnimationFrameTimeRef = useRef(0);
  const introCompleteTimeoutRef = useRef(null);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [mapDimensions, setMapDimensions] = useState({ width: 100, height: 100 });

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

  const pillarLabels = useMemo(
    () => ({
      tech: t("workPage.pillars.tech"),
      production: t("workPage.pillars.production"),
      marketing: t("workPage.pillars.marketing"),
    }),
    [t]
  );

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
    "social-media-management": t(
      "workPage.subcategories.socialMediaManagement"
    ),
    "content-strategy": t("workPage.subcategories.contentStrategy"),
    "campaign-management": t("workPage.subcategories.campaignManagement"),
    "digital-marketing": t("workPage.subcategories.digitalMarketing"),
    "performance-marketing": t("workPage.subcategories.performanceMarketing"),
  };

  const formatPillarDisplayLabel = useCallback((pillar) => {
    const label = pillarLabels[pillar] || "";
    return label;
  }, [
    pillarLabels.tech,
    pillarLabels.production,
    pillarLabels.marketing,
  ]);

  const formatCardText = (value) => {
    if (typeof value !== "string") return value;
    return value.replace(/-/g, " ").replace(/\s{2,}/g, " ").trim();
  };

  const projectsForActivePillar = useMemo(
    () => workProjects.filter((project) => project.pillar === activePillar),
    [activePillar]
  );

  const subcategoriesForActivePillar = useMemo(() => {
    const uniqueSubcategories = [
      ...new Set(projectsForActivePillar.map((project) => project.subcategory)),
    ];
    return ["all", ...uniqueSubcategories];
  }, [projectsForActivePillar]);

  const filteredProjects = useMemo(() => {
    if (activeSubcategory === "all") {
      return projectsForActivePillar;
    }
    return projectsForActivePillar.filter(
      (project) => project.subcategory === activeSubcategory
    );
  }, [activeSubcategory, projectsForActivePillar]);

  useEffect(() => {
    setActiveSubcategory("all");
  }, [activePillar]);

  useEffect(() => {
    const onResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (!neuralMapRef.current) return;

    const observeTarget = neuralMapRef.current;
    const updateMapSize = () => {
      const rect = observeTarget.getBoundingClientRect();
      setMapDimensions({
        width: rect.width || 100,
        height: rect.height || 100,
      });
    };

    updateMapSize();

    const resizeObserver = new ResizeObserver(updateMapSize);
    resizeObserver.observe(observeTarget);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const [hoveredProjectId, setHoveredProjectId] = useState(null);
  const [hoveredPillar, setHoveredPillar] = useState(null);
  const [focusedPillar, setFocusedPillar] = useState(null);
  const [hasNeuralMapEnteredView, setHasNeuralMapEnteredView] = useState(false);
  const [typedPillarDone, setTypedPillarDone] = useState({});
  const [introStage, setIntroStage] = useState("idle");

  const neuralProjects = useMemo(() => {
    return workProjects.map((project) => {
      const connections = clientConnections[project.clientId] || [project.pillar];
      const industry = clientIndustryMap[project.id] || "Government & Corporate";
      return {
        ...project,
        connections,
        industry,
      };
    });
  }, []);

  const focusedProjectIds = useMemo(() => {
    if (!focusedPillar) {
      return new Set(neuralProjects.map((project) => project.id));
    }
    return new Set(
      neuralProjects
        .filter((project) => project.connections.includes(focusedPillar))
        .map((project) => project.id)
    );
  }, [focusedPillar, neuralProjects]);

  useEffect(() => {
    if (hoveredProjectId && !focusedProjectIds.has(hoveredProjectId)) {
      setHoveredProjectId(null);
    }
  }, [hoveredProjectId, focusedProjectIds]);

  const industryClusterCenters = {
    "Technology Products": { x: 50, y: 32 },
    "Government & Corporate": { x: 32, y: 47 },
    "Retail & E-commerce": { x: 67, y: 47 },
    "Hospitality & F&B": { x: 30, y: 64 },
    "Sports & Fitness": { x: 70, y: 64 },
    "Lifestyle & Fashion": { x: 50, y: 56 },
  };

  const pillarNodePositions = {
    tech: { x: 20, y: 25 },
    production: { x: 80, y: 25 },
    marketing: { x: 50, y: 76 },
  };

  const getPillarHalfSize = useCallback(
    (pillar) => {
      const textElement = pillarTextRefs.current[pillar];
      if (textElement && mapDimensions.width > 0 && mapDimensions.height > 0) {
        const textRect = textElement.getBoundingClientRect();
        return {
          halfWidth: ((textRect.width / 2) / mapDimensions.width) * 100 + 0.1,
          halfHeight: ((textRect.height / 2) / mapDimensions.height) * 100 + 0.1,
        };
      }

      const fallbackHalfWidth =
        viewportWidth <= 480 ? 7.5 : viewportWidth <= 768 ? 9 : 11.5;
      const fallbackHalfHeight = viewportWidth <= 480 ? 1.5 : viewportWidth <= 768 ? 1.8 : 2.2;
      return {
        halfWidth: fallbackHalfWidth,
        halfHeight: fallbackHalfHeight,
      };
    },
    [mapDimensions.height, mapDimensions.width, viewportWidth]
  );

  const getPillarConnectionPoint = useCallback(
    (pillar, targetX, targetY) => {
      const pillarPosition =
        pillarAnimationStateRef.current[pillar] || pillarNodePositions[pillar];
      if (!pillarPosition) {
        return { x: targetX, y: targetY };
      }

      const dx = targetX - pillarPosition.x;
      const dy = targetY - pillarPosition.y;
      if (!dx && !dy) {
        return { x: pillarPosition.x, y: pillarPosition.y };
      }

      const { halfWidth, halfHeight } = getPillarHalfSize(pillar);
      const scale =
        1 / Math.max(Math.abs(dx) / Math.max(halfWidth, 0.001), Math.abs(dy) / Math.max(halfHeight, 0.001));

      return {
        x: pillarPosition.x + dx * scale,
        y: pillarPosition.y + dy * scale,
      };
    },
    [getPillarHalfSize, pillarNodePositions]
  );

  const pushOutsideMainBubbles = useCallback(
    (pointX, pointY, clearance = 2.2) => {
      let x = pointX;
      let y = pointY;

      Object.entries(pillarNodePositions).forEach(([pillarKey, pillar]) => {
        const { halfWidth, halfHeight } = getPillarHalfSize(pillarKey);
        const dx = x - pillar.x;
        const dy = y - pillar.y;
        const limitX = halfWidth + clearance;
        const limitY = halfHeight + clearance;

        const insideX = Math.abs(dx) < limitX;
        const insideY = Math.abs(dy) < limitY;
        if (insideX && insideY) {
          const pushByX = limitX - Math.abs(dx);
          const pushByY = limitY - Math.abs(dy);

          if (pushByX < pushByY) {
            x = pillar.x + (dx >= 0 ? limitX : -limitX);
          } else {
            y = pillar.y + (dy >= 0 ? limitY : -limitY);
          }
        }
      });

      return {
        x: Math.max(8, Math.min(92, x)),
        y: Math.max(16, Math.min(90, y)),
      };
    },
    [getPillarHalfSize, pillarNodePositions]
  );

  const projectNodePositions = useMemo(() => {
    const projectsByIndustry = neuralProjects.reduce((acc, project) => {
      const bucket = acc[project.industry] || [];
      bucket.push(project);
      acc[project.industry] = bucket;
      return acc;
    }, {});

    const layout = [];
    const industries = Object.keys(projectsByIndustry);

    industries.forEach((industry, industryIdx) => {
      const center = industryClusterCenters[industry] || { x: 50, y: 62 };
      const group = projectsByIndustry[industry];
      const size = group.length;

      group.forEach((project, groupIdx) => {
        const angle = (groupIdx / Math.max(size, 1)) * Math.PI * 2 + industryIdx * 0.5;
        const radius = size <= 2 ? 4 : 6 + (groupIdx % 2) * 1.8;
        const rawX = center.x + Math.cos(angle) * radius;
        const rawY = center.y + Math.sin(angle) * (radius * 0.72);
        const safePosition = pushOutsideMainBubbles(rawX, rawY, 2.2);

        layout.push({
          id: project.id,
          x: safePosition.x,
          y: safePosition.y,
          delay: ((groupIdx + industryIdx) % 8) * 0.28,
          duration: 5 + ((groupIdx + industryIdx) % 4),
          industry,
        });
      });
    });

    return layout;
  }, [neuralProjects, pushOutsideMainBubbles]);

  const projectNodePositionMap = useMemo(
    () =>
      Object.fromEntries(
        projectNodePositions.map((position) => [position.id, position])
      ),
    [projectNodePositions]
  );

  const focusedNodePositions = useMemo(() => {
    if (!focusedPillar) {
      return {};
    }

    const relatedProjects = neuralProjects.filter((project) =>
      project.connections.includes(focusedPillar)
    );
    const count = relatedProjects.length;
    if (!count) {
      return {};
    }

    const focusAnchors = {
      tech: { x: 37, y: 42 },
      production: { x: 63, y: 42 },
      marketing: { x: 50, y: 61 },
    };

    const anchor = focusAnchors[focusedPillar] || { x: 50, y: 48 };
    const positions = {};

    relatedProjects.forEach((project, index) => {
      const ring = Math.floor(index / 8);
      const ringIndex = index % 8;
      const ringSize = Math.min(8, count - ring * 8);
      const angle = (ringIndex / Math.max(ringSize, 1)) * Math.PI * 2 - Math.PI / 2;
      const radius = 9 + ring * 5;
      const offsetX = Math.cos(angle) * radius;
      const offsetY = Math.sin(angle) * radius * 0.72;
      const focusedSafePosition = pushOutsideMainBubbles(
        anchor.x + offsetX,
        anchor.y + offsetY,
        3.4
      );
      positions[project.id] = {
        x: focusedSafePosition.x,
        y: focusedSafePosition.y,
      };
    });

    return positions;
  }, [focusedPillar, neuralProjects, pushOutsideMainBubbles]);

  useEffect(() => {
    const animateNeuralMap = (timestamp) => {
      const minFrameDuration = 1000 / 45; // cap updates near 45fps for smoother, lighter rendering
      if (timestamp - lastAnimationFrameTimeRef.current < minFrameDuration) {
        neuralAnimationFrameRef.current = requestAnimationFrame(animateNeuralMap);
        return;
      }
      lastAnimationFrameTimeRef.current = timestamp;

      const timeInSeconds = timestamp / 1000;

      workPillars.forEach((pillar, index) => {
        const basePillarPosition = pillarNodePositions[pillar];
        if (!basePillarPosition) return;

        const pillarPhase = timeInSeconds * 0.44 + index * 1.35;
        const targetPillarX = basePillarPosition.x + Math.cos(pillarPhase) * 0.38;
        const targetPillarY =
          basePillarPosition.y + Math.sin(pillarPhase * 0.9) * 0.56;

        const previousPillarState = pillarAnimationStateRef.current[pillar] || {
          x: basePillarPosition.x,
          y: basePillarPosition.y,
        };
        const pillarInterpolationFactor = 0.12;
        const animatedPillarX =
          previousPillarState.x +
          (targetPillarX - previousPillarState.x) * pillarInterpolationFactor;
        const animatedPillarY =
          previousPillarState.y +
          (targetPillarY - previousPillarState.y) * pillarInterpolationFactor;

        pillarAnimationStateRef.current[pillar] = {
          x: animatedPillarX,
          y: animatedPillarY,
        };

        const pillarElement = pillarNodeRefs.current[pillar];
        if (pillarElement) {
          const pillarOffsetXPx =
            ((animatedPillarX - basePillarPosition.x) / 100) * mapDimensions.width;
          const pillarOffsetYPx =
            ((animatedPillarY - basePillarPosition.y) / 100) * mapDimensions.height;
          pillarElement.style.transform = `translate(-50%, -50%) translate3d(${pillarOffsetXPx}px, ${pillarOffsetYPx}px, 0)`;
        }
      });

      neuralProjects.forEach((project) => {
        const baseNodePosition = projectNodePositionMap[project.id];
        if (!baseNodePosition) return;

        const isRelated = focusedProjectIds.has(project.id);
        const targetNodePosition =
          focusedPillar && focusedNodePositions[project.id]
            ? { ...baseNodePosition, ...focusedNodePositions[project.id] }
            : baseNodePosition;

        const duration = targetNodePosition.duration || 6;
        const phase =
          (timeInSeconds + (targetNodePosition.delay || 0)) *
          ((Math.PI * 2) / duration);
        const amplitudeMultiplier = focusedPillar && !isRelated ? 0.15 : 1;
        const floatOffsetX =
          Math.cos(phase) * FLOAT_AMPLITUDE_X * amplitudeMultiplier;
        const floatOffsetY =
          Math.sin(phase) * FLOAT_AMPLITUDE_Y * amplitudeMultiplier;

        const targetAnimatedPosition = pushOutsideMainBubbles(
          targetNodePosition.x + floatOffsetX,
          targetNodePosition.y + floatOffsetY,
          2.8
        );
        const targetX = targetAnimatedPosition.x;
        const targetY = targetAnimatedPosition.y;

        const previousState = projectAnimationStateRef.current[project.id] || {
          x: baseNodePosition.x,
          y: baseNodePosition.y,
        };
        const interpolationFactor = 0.18;
        const animatedX =
          previousState.x + (targetX - previousState.x) * interpolationFactor;
        const animatedY =
          previousState.y + (targetY - previousState.y) * interpolationFactor;
        projectAnimationStateRef.current[project.id] = {
          x: animatedX,
          y: animatedY,
        };

        const nodeElement = projectNodeRefs.current[project.id];
        if (nodeElement) {
          const offsetXPx =
            ((animatedX - baseNodePosition.x) / 100) * mapDimensions.width;
          const offsetYPx =
            ((animatedY - baseNodePosition.y) / 100) * mapDimensions.height;
          nodeElement.style.transform = `translate(-50%, -50%) translate3d(${offsetXPx}px, ${offsetYPx}px, 0)`;
        }

        if (focusedPillar && !isRelated) return;

        project.connections.forEach((pillar) => {
          const lineKey = `${project.id}-${pillar}`;
          const lineElement = projectLineRefs.current[lineKey];
          if (!lineElement) return;
          const connectionStart = getPillarConnectionPoint(
            pillar,
            animatedX,
            animatedY
          );
          const drawFromDot = introStage !== "done";

          lineElement.setAttribute(
            "x1",
            String(drawFromDot ? animatedX : connectionStart.x)
          );
          lineElement.setAttribute(
            "y1",
            String(drawFromDot ? animatedY : connectionStart.y)
          );
          lineElement.setAttribute(
            "x2",
            String(drawFromDot ? connectionStart.x : animatedX)
          );
          lineElement.setAttribute(
            "y2",
            String(drawFromDot ? connectionStart.y : animatedY)
          );
        });
      });

      neuralAnimationFrameRef.current = requestAnimationFrame(animateNeuralMap);
    };

    neuralAnimationFrameRef.current = requestAnimationFrame(animateNeuralMap);
    return () => {
      if (neuralAnimationFrameRef.current) {
        cancelAnimationFrame(neuralAnimationFrameRef.current);
      }
      lastAnimationFrameTimeRef.current = 0;
    };
  }, [
    focusedNodePositions,
    focusedPillar,
    focusedProjectIds,
    mapDimensions.height,
    mapDimensions.width,
    neuralProjects,
    getPillarConnectionPoint,
    introStage,
    pushOutsideMainBubbles,
    projectNodePositionMap,
  ]);

  const focusTransform = useMemo(() => {
    if (!focusedPillar) {
      return { scale: 1, x: 0, y: 0 };
    }

    const focusPos = pillarNodePositions[focusedPillar];
    if (!focusPos) {
      return { scale: 1, x: 0, y: 0 };
    }

    const focusX = (focusPos.x / 100) * mapDimensions.width;
    const focusY = (focusPos.y / 100) * mapDimensions.height;
    const targetX = mapDimensions.width * 0.5;
    const targetY = mapDimensions.height * 0.44;
    const scale = viewportWidth <= 768 ? 1.18 : 1.38;

    return {
      scale,
      x: targetX - focusX * scale,
      y: targetY - focusY * scale,
    };
  }, [focusedPillar, mapDimensions.height, mapDimensions.width, viewportWidth]);

  const pillarDisplayLabels = useMemo(
    () =>
      Object.fromEntries(
        workPillars.map((pillar) => [pillar, formatPillarDisplayLabel(pillar)])
      ),
    [formatPillarDisplayLabel]
  );

  const typingSpeedByPillar = useMemo(
    () =>
      Object.fromEntries(
        workPillars.map((pillar) => {
          const label = pillarDisplayLabels[pillar] || "";
          const chars = Math.max(1, label.length);
          return [pillar, Math.max(16, Math.round(500 / chars))];
        })
      ),
    [pillarDisplayLabels]
  );

  const lineAnimationMeta = useMemo(() => {
    let totalLines = 0;
    neuralProjects.forEach((project) => {
      totalLines += project.connections.length;
    });
    return { totalLines };
  }, [neuralProjects]);

  useEffect(() => {
    if (hasNeuralMapEnteredView || !neuralMapRef.current) return;
    const triggerIntroWhenScrolled = () => {
      if (!neuralMapRef.current) return;

      const rect = neuralMapRef.current.getBoundingClientRect();
      const triggerLine = window.innerHeight * 0.42;
      const minScrollY = 120;
      const hasCrossedTriggerLine = rect.top <= triggerLine;

      if (window.scrollY >= minScrollY && hasCrossedTriggerLine) {
        setHasNeuralMapEnteredView(true);
      }
    };

    window.addEventListener("scroll", triggerIntroWhenScrolled, { passive: true });
    window.addEventListener("resize", triggerIntroWhenScrolled);
    triggerIntroWhenScrolled();

    return () => {
      window.removeEventListener("scroll", triggerIntroWhenScrolled);
      window.removeEventListener("resize", triggerIntroWhenScrolled);
    };
  }, [hasNeuralMapEnteredView]);

  useEffect(() => {
    if (!hasNeuralMapEnteredView) return;

    if (introCompleteTimeoutRef.current) {
      clearTimeout(introCompleteTimeoutRef.current);
    }

    setIntroStage("typing");
    setTypedPillarDone(Object.fromEntries(workPillars.map((pillar) => [pillar, false])));

    return () => {
      if (introCompleteTimeoutRef.current) {
        clearTimeout(introCompleteTimeoutRef.current);
      }
    };
  }, [hasNeuralMapEnteredView, i18n.resolvedLanguage, pillarDisplayLabels]);

  useEffect(() => {
    if (introStage !== "typing") return;
    const allDone = workPillars.every((pillar) => typedPillarDone[pillar]);
    if (!allDone) return;

    setIntroStage("drawing");
    const drawDurationMs = 1000;
    introCompleteTimeoutRef.current = setTimeout(() => {
      setIntroStage("done");
    }, drawDurationMs);

    return () => {
      if (introCompleteTimeoutRef.current) {
        clearTimeout(introCompleteTimeoutRef.current);
      }
    };
  }, [introStage, typedPillarDone]);

  const hoveredProjectConnections = useMemo(() => {
    if (!hoveredProjectId) return new Set();
    const hoveredProject = neuralProjects.find(
      (project) => project.id === hoveredProjectId
    );
    return new Set(hoveredProject?.connections || []);
  }, [hoveredProjectId, neuralProjects]);

  const tabProjects = useMemo(
    () =>
      neuralProjects.filter((project) =>
        (project.connections || [project.pillar]).includes(activePillar)
      ),
    [activePillar, neuralProjects]
  );

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
            {ENABLE_NEURAL_MAP ? (
              <>
                <div className="neural-map" ref={neuralMapRef}>
                <div className="neural-map-legend">
                  {t("workPage.neuralMap.legend")}
                </div>
                {focusedPillar && (
                  <button
                    type="button"
                    className="neural-reset-button"
                    onClick={() => setFocusedPillar(null)}
                  >
                    {t("workPage.neuralMap.resetView")}
                  </button>
                )}
                <motion.div
                  className="neural-map-viewport"
                  animate={focusTransform}
                  transition={{
                    type: "spring",
                    stiffness: 54,
                    damping: 24,
                    mass: 1.05,
                  }}
                >
                  <svg
                    className="neural-lines"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                  >
                    {neuralProjects.map((project) => {
                      const baseNodePosition = projectNodePositionMap[project.id];
                      if (!baseNodePosition) return null;
                      const isRelated = focusedProjectIds.has(project.id);
                      if (focusedPillar && !isRelated) return null;

                      const nodePosition = baseNodePosition;
                      const lineTargetX = nodePosition.x;
                      const lineTargetY = nodePosition.y;

                      return project.connections.map((pillar) => {
                        const connectionStart = getPillarConnectionPoint(
                          pillar,
                          lineTargetX,
                          lineTargetY
                        );

                        const isHighlighted =
                          hoveredProjectId === project.id || hoveredPillar === pillar;
                        const lineKey = `${project.id}-${pillar}`;
                        const lineLength = Math.hypot(
                          lineTargetX - connectionStart.x,
                          lineTargetY - connectionStart.y
                        );
                        const introClassName =
                          introStage === "drawing"
                            ? "neural-line-intro-draw"
                            : introStage === "done"
                              ? ""
                              : "neural-line-intro-hidden";
                        return (
                          <line
                            key={lineKey}
                            ref={(el) => {
                              if (el) {
                                projectLineRefs.current[lineKey] = el;
                              } else {
                                delete projectLineRefs.current[lineKey];
                              }
                            }}
                            x1={introStage === "done" ? connectionStart.x : lineTargetX}
                            y1={introStage === "done" ? connectionStart.y : lineTargetY}
                            x2={introStage === "done" ? lineTargetX : connectionStart.x}
                            y2={introStage === "done" ? lineTargetY : connectionStart.y}
                            className={`neural-line ${introClassName} ${
                              isHighlighted ? "neural-line-highlighted" : ""
                            }`}
                            style={{
                              "--line-length": `${lineLength}`,
                            }}
                          />
                        );
                      });
                    })}
                  </svg>

                  {workPillars.map((pillar) => {
                    const pos = pillarNodePositions[pillar];
                    return (
                      <button
                        key={pillar}
                        type="button"
                        className={`pillar-node pillar-button ${
                          focusedPillar === pillar ? "focused" : ""
                        } ${focusedPillar && focusedPillar !== pillar ? "dimmed" : ""} ${
                          hoveredProjectConnections.has(pillar)
                            ? "project-related-glow"
                            : ""
                        }`}
                        title={pillarLabels[pillar]}
                        aria-label={pillarLabels[pillar]}
                        onMouseEnter={() => setHoveredPillar(pillar)}
                        onMouseLeave={() => setHoveredPillar(null)}
                        onFocus={() => setHoveredPillar(pillar)}
                        onBlur={() => setHoveredPillar(null)}
                        onClick={() =>
                          {
                            setActivePillar(pillar);
                            setFocusedPillar((current) =>
                              current === pillar ? null : pillar
                            );
                          }
                        }
                        ref={(el) => {
                          if (el) {
                            pillarNodeRefs.current[pillar] = el;
                          } else {
                            delete pillarNodeRefs.current[pillar];
                          }
                        }}
                        style={{
                          left: `${pos.x}%`,
                          top: `${pos.y}%`,
                        }}
                      >
                        <div className="pillar-brand-content">
                          <span
                            className="pillar-department-name"
                            ref={(el) => {
                              if (el) {
                                pillarTextRefs.current[pillar] = el;
                              } else {
                                delete pillarTextRefs.current[pillar];
                              }
                            }}
                          >
                            <TextType
                              key={`${pillar}-${pillarDisplayLabels[pillar]}`}
                              text={pillarDisplayLabels[pillar]}
                              speed={typingSpeedByPillar[pillar] || 42}
                              initialDelay={0}
                              start={hasNeuralMapEnteredView && introStage === "typing"}
                              showCursor={introStage === "typing"}
                              onComplete={() =>
                                setTypedPillarDone((previous) => ({
                                  ...previous,
                                  [pillar]: true,
                                }))
                              }
                            />
                          </span>
                        </div>
                      </button>
                    );
                  })}

                  {neuralProjects.map((project) => {
                    const baseNodePosition = projectNodePositionMap[project.id];
                    if (!baseNodePosition) return null;
                    const isRelated = focusedProjectIds.has(project.id);
                    const nodePosition = baseNodePosition;

                    const technologies = t(project.technologiesKey, {
                      returnObjects: true,
                    });
                    const safeTechnologies = Array.isArray(technologies)
                      ? technologies.slice(0, 3)
                      : [];

                    return (
                      <div
                        key={project.id}
                      className={`project-node-wrapper ${
                        focusedPillar && !isRelated ? "dimmed" : ""
                      }`}
                      ref={(el) => {
                        if (el) {
                          projectNodeRefs.current[project.id] = el;
                        } else {
                          delete projectNodeRefs.current[project.id];
                        }
                      }}
                        style={{
                        left: `${nodePosition.x}%`,
                        top: `${nodePosition.y}%`,
                          zIndex: hoveredProjectId === project.id ? 120 : 4,
                        }}
                      >
                        <button
                          className={`project-node ${
                            hoveredProjectId === project.id ? "active" : ""
                          }`}
                        onMouseEnter={() => {
                          if (!focusedPillar || isRelated) setHoveredProjectId(project.id);
                        }}
                        onMouseLeave={() => setHoveredProjectId(null)}
                          aria-label={project.title}
                          type="button"
                        />

                        <div
                          className={`project-node-card ${
                            hoveredProjectId === project.id &&
                            (!focusedPillar || isRelated)
                              ? "visible"
                              : ""
                          }`}
                        >
                          <img src={project.image} alt={project.title} />
                          <div className="node-card-content">
                            <h4>{formatCardText(project.title)}</h4>
                            <p>{formatCardText(project.client)}</p>
                            <div className="project-tech">
                              {safeTechnologies.map((tech) => (
                                <span key={tech} className="tech-tag">
                                  {formatCardText(tech)}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </motion.div>
              </div>
              <section className="neural-tabs-section">
                <div className="filter-categories">
                  {workPillars.map((pillar) => (
                    <motion.button
                      key={`neural-tab-${pillar}`}
                      className={`filter-button ${
                        activePillar === pillar ? "active" : ""
                      }`}
                      onClick={() => setActivePillar(pillar)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {pillarLabels[pillar]}
                    </motion.button>
                  ))}
                </div>

                <div className="projects-grid">
                  {tabProjects.map((project, index) => {
                    const technologies = t(project.technologiesKey, {
                      returnObjects: true,
                    });
                    const safeTechnologies = Array.isArray(technologies)
                      ? technologies
                      : [];

                    return (
                      <motion.div
                        key={`neural-card-${project.id}`}
                        className="project-card"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, delay: index * 0.05 }}
                        viewport={{ once: true }}
                      >
                        <div className="project-image">
                          <img src={project.image} alt={project.title} />
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
                </div>
              </section>
              </>
            ) : (
              <>
                {/* Pillar Tabs */}
                <div className="filter-categories">
                  {workPillars.map((pillar) => (
                    <motion.button
                      key={pillar}
                      className={`filter-button ${
                        activePillar === pillar ? "active" : ""
                      }`}
                      onClick={() => setActivePillar(pillar)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {pillarLabels[pillar]}
                    </motion.button>
                  ))}
                </div>

                {/* Subcategory Tabs */}
                <div className="filter-categories subcategory-filters">
                  {subcategoriesForActivePillar.map((subcategory) => (
                    <motion.button
                      key={subcategory}
                      className={`filter-button subcategory-button ${
                        activeSubcategory === subcategory ? "active" : ""
                      }`}
                      onClick={() => setActiveSubcategory(subcategory)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {subcategoryLabels[subcategory] || subcategory}
                    </motion.button>
                  ))}
                </div>

                {/* Projects Grid */}
                <div className="projects-grid">
                  {filteredProjects.map((project, index) => {
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
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <div className="project-image">
                          <img src={project.image} alt={project.title} />
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
                </div>
              </>
            )}
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
