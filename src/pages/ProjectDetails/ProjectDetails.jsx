import React, { useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./ProjectDetails.css";

// Example projects data (should be imported from a shared file in a real app)
const projects = [
  {
    id: "bentley-showroom",
    title: "Bentley Digital Showroom",
    category: "Web Development & 3D",
    description:
      "Immersive digital showroom experience with real-time 3D car configurator",
    fullDescription:
      "A cutting-edge digital showroom that revolutionizes the luxury car buying experience. This project seamlessly combines web development excellence with state-of-the-art 3D visualization technology, allowing customers to explore and customize Bentley vehicles in unprecedented detail.",
    image: "/projects/bentley-showroom.jpg",
    technologies: ["React", "Three.js", "WebGL", "Node.js"],
    features: [
      "Real-time 3D car configuration",
      "Photorealistic rendering",
      "Interactive customization options",
      "Virtual showroom tours",
    ],
  },
  {
    id: "mclaren-hub",
    title: "McLaren Racing Hub",
    category: "Mobile App & IoT",
    description: "Real-time racing telemetry and fan engagement platform",
    fullDescription:
      "An innovative mobile application that brings Formula 1 fans closer to the action than ever before. This comprehensive platform combines real-time racing telemetry with interactive fan engagement features, creating an immersive experience for McLaren Racing enthusiasts.",
    image: "/projects/mclaren-hub.jpg",
    technologies: ["React Native", "Socket.io", "AWS", "GraphQL"],
    features: [
      "Live race tracking",
      "Real-time car telemetry",
      "Interactive team radio",
      "Personalized notifications",
    ],
  },
  {
    id: "rr-bespoke",
    title: "Rolls-Royce Bespoke",
    category: "AR & Visualization",
    description:
      "Augmented reality customization experience for luxury vehicles",
    fullDescription:
      "A groundbreaking augmented reality application that transforms the Rolls-Royce customization experience. This innovative solution allows customers to visualize their bespoke vehicle configurations in real-time, bringing their unique vision to life before production.",
    image: "/projects/rr-bespoke.jpg",
    technologies: ["Unity", "ARKit", "ARCore", "Cloud Rendering"],
    features: [
      "Real-time AR visualization",
      "Custom material rendering",
      "Interactive color selection",
      "Environment lighting simulation",
    ],
  },
  {
    id: "fleet-management",
    title: "Modern Fleet Management",
    category: "Enterprise Software",
    description: "Comprehensive fleet management and analytics platform",
    fullDescription:
      "A sophisticated enterprise solution that streamlines fleet operations through advanced analytics and real-time monitoring. This platform provides fleet managers with powerful tools for optimization, maintenance scheduling, and performance analysis.",
    image: "/projects/fleet-management.jpg",
    technologies: ["React", "Node.js", "PostgreSQL", "TensorFlow"],
    features: [
      "Real-time fleet tracking",
      "Predictive maintenance",
      "Route optimization",
      "Performance analytics",
    ],
  },
];

const ProjectDetails = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const project = projects.find((p) => p.id === projectId);
  const canvasRef = useRef(null);

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

  if (!project) {
    return (
      <div className="project-details">
        <canvas ref={canvasRef} className="particle-canvas" />
        {/* <Header /> */}
        <div className="project-details-content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <button className="back-button" onClick={() => navigate(-1)}>
              ← Back
            </button>
            <h2>Project Not Found</h2>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="project-details">
      <canvas ref={canvasRef} className="particle-canvas" />
      {/* <Header /> */}
      <div className="project-details-content">
        <motion.button
          className="back-button"
          onClick={() => navigate(-1)}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          ← Back
        </motion.button>

        <motion.div
          className="project-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="project-category">{project.category}</span>
          <h1 className="project-title">{project.title}</h1>
        </motion.div>

        <motion.div
          className="project-image-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <img
            src={project.image}
            alt={project.title}
            className="project-image"
          />
        </motion.div>

        <motion.p
          className="project-description"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {project.fullDescription}
        </motion.p>

        <motion.div
          className="project-details-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h3>Technologies Used</h3>
          <p>{project.technologies.join(", ")}</p>
        </motion.div>

        <motion.div
          className="project-details-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3>Key Features</h3>
          <ul>
            {project.features.map((feature, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
              >
                {feature}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default ProjectDetails;
