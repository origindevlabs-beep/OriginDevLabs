"use client";

import React, { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Workflow,
  Bot,
  Headphones,
  BarChart3,
  Code2,
  ArrowRight,
} from "lucide-react";

// --- Circuitry Background (Shared with Hero) ---
function CircuitryBackground({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const nodesRef = useRef<Array<{ x: number; y: number; connections: number[]; pulse: number }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight;
      generateNodes();
    };

    const generateNodes = () => {
      const nodes: Array<{ x: number; y: number; connections: number[]; pulse: number }> = [];
      const spacing = 80;
      const cols = Math.ceil(canvas.width / spacing) + 1;
      const rows = Math.ceil(canvas.height / spacing) + 1;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * spacing + (row % 2 === 0 ? 0 : spacing / 2);
          const y = row * spacing;
          nodes.push({ x, y, connections: [], pulse: Math.random() * Math.PI * 2 });
        }
      }

      nodes.forEach((node, i) => {
        nodes.forEach((other, j) => {
          if (i !== j) {
            const dist = Math.hypot(node.x - other.x, node.y - other.y);
            if (dist < spacing * 1.5 && Math.random() > 0.6) {
              node.connections.push(j);
            }
          }
        });
      });

      nodesRef.current = nodes;
    };

    resize();
    window.addEventListener("resize", resize);

    let time = 0;
    const animate = () => {
      time += 0.016;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const nodes = nodesRef.current;
      const mx = mousePosition.x * canvas.width;
      const my = mousePosition.y * canvas.height;

      ctx.strokeStyle = "rgba(0, 0, 0, 0.03)";
      ctx.lineWidth = 1;
      nodes.forEach((node, i) => {
        node.connections.forEach((j) => {
          const other = nodes[j];
          const distToMouse = Math.hypot(node.x - mx, node.y - my);
          const opacity = Math.max(0.02, 0.08 - distToMouse / 2000);
          ctx.strokeStyle = `rgba(0, 0, 0, ${opacity})`;
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(other.x, other.y);
          ctx.stroke();
        });
      });

      nodes.forEach((node) => {
        const distToMouse = Math.hypot(node.x - mx, node.y - my);
        const glow = Math.max(0, 1 - distToMouse / 300);
        const baseRadius = 1.5;
        const radius = baseRadius + glow * 2;

        if (glow > 0.1) {
          const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, radius * 4);
          gradient.addColorStop(0, `rgba(0, 0, 0, ${glow * 0.15})`);
          gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(node.x, node.y, radius * 4, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.fillStyle = `rgba(0, 0, 0, ${0.1 + glow * 0.3})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        ctx.fill();

        node.pulse += 0.02;
        const pulseRadius = radius + Math.sin(node.pulse) * 2 * glow;
        if (glow > 0.2) {
          ctx.strokeStyle = `rgba(0, 0, 0, ${glow * 0.1})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.arc(node.x, node.y, pulseRadius + 4, 0, Math.PI * 2);
          ctx.stroke();
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [mousePosition]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.4 }}
    />
  );
}

// --- Types ---
interface ServiceCardProps {
  title: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  image: string;
  index: number;
}

interface MousePos {
  readonly x: number;
  readonly y: number;
}

// --- Service Card Component ---
const ServiceCard = React.forwardRef<HTMLDivElement, ServiceCardProps>(
  ({ title, description, features, icon, image, index }, ref) => {
    const [mousePos, setMousePos] = useState<MousePos>({ x: 0, y: 0 });
    const [hovered, setHovered] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(cardRef, { once: true, margin: "-100px" });

    const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePos({
        x: (x / rect.width - 0.5) * 15,
        y: (y / rect.height - 0.5) * -15,
      });
    }, []);

    const handleEnter = useCallback(() => setHovered(true), []);
    const handleLeave = useCallback(() => {
      setHovered(false);
      setMousePos({ x: 0, y: 0 });
    }, []);

    return (
      <motion.div
        ref={(node) => {
          (cardRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        className={cn(
          "group relative w-full overflow-hidden rounded-2xl transform-gpu transition-all duration-500 ease-out",
          "h-[420px] md:h-[480px]",
          "bg-white border border-gray-100",
          "shadow-sm hover:shadow-xl hover:shadow-gray-200/50",
          "cursor-pointer"
        )}
        onMouseMove={handleMove}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        initial={{ opacity: 0, y: 60, rotateX: -10 }}
        animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
        transition={{
          duration: 0.7,
          delay: index * 0.1,
          ease: [0.23, 1, 0.32, 1],
        }}
        style={{
          transformStyle: "preserve-3d",
          perspective: "1200px",
        }}
      >
        {/* 3D Tilt Effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          animate={{
            rotateX: mousePos.y,
            rotateY: mousePos.x,
            z: hovered ? 20 : 0,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 35 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Image Section */}
          <div className="relative h-[55%] overflow-hidden">
            <motion.div
              className="absolute inset-0"
              animate={{ scale: hovered ? 1.05 : 1 }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            >
              <img
                src={image}
                alt={title}
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white" />
            </motion.div>

            {/* Icon Badge */}
            <motion.div
              className="absolute top-4 left-4 p-3 bg-white rounded-xl shadow-lg"
              animate={{
                scale: hovered ? 1.1 : 1,
                rotate: hovered ? 5 : 0,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              style={{ transform: "translateZ(20px)" }}
            >
              <div className="text-gray-900">{icon}</div>
            </motion.div>

            {/* Number Badge */}
            <div
              className="absolute top-4 right-4 px-3 py-1 bg-black text-white text-xs font-medium rounded-full"
              style={{ transform: "translateZ(15px)" }}
            >
              0{index + 1}
            </div>
          </div>

          {/* Content Section */}
          <div className="relative p-6 flex flex-col h-[45%]" style={{ transform: "translateZ(10px)" }}>
            <motion.h3
              className="text-xl font-semibold text-gray-900 mb-2 tracking-tight"
              animate={{ x: hovered ? 4 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {title}
            </motion.h3>

            <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-2">
              {description}
            </p>

            {/* Features */}
            <div className="flex flex-wrap gap-2 mb-4">
              {features.slice(0, 3).map((feature, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 bg-gray-50 text-gray-600 text-xs rounded-full border border-gray-100"
                >
                  {feature}
                </span>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              className="mt-auto flex items-center gap-2 text-sm font-medium text-gray-900"
              animate={{ x: hovered ? 8 : 0, opacity: hovered ? 1 : 0.7 }}
              transition={{ duration: 0.3 }}
            >
              <span>Learn More</span>
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </div>

          {/* Frosted Glass Overlay on Hover */}
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden"
            style={{ transform: "translateZ(25px)" }}
            animate={{
              backdropFilter: hovered ? "blur(8px) saturate(120%)" : "blur(0px) saturate(100%)",
              WebkitBackdropFilter: hovered ? "blur(8px) saturate(120%)" : "blur(0px) saturate(100%)",
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <motion.div
              className="absolute inset-0"
              animate={{
                backgroundColor: hovered ? "rgba(255, 255, 255, 0.7)" : "rgba(255, 255, 255, 0)",
              }}
              transition={{ duration: 0.4 }}
            />
          </motion.div>

          {/* Hover Shine Effect */}
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden"
            style={{ transform: "translateZ(26px)" }}
          >
            <motion.div
              className="absolute -inset-full"
              animate={{
                background: hovered
                  ? `linear-gradient(${mousePos.x + 135}deg, rgba(255,255,255,0) 40%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0) 60%)`
                  : "rgba(255,255,255,0)",
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    );
  }
);

ServiceCard.displayName = "ServiceCard";

// --- Services Data ---
const SERVICES = [
  {
    id: "workflow-automation",
    title: "Workflow Automation",
    description: "Multi-step workflows that handle repetitive tasks end-to-end. From invoice processing to employee onboarding, you set the rules once and the system runs them every time.",
    features: ["Conditional Logic", "Cross-Platform", "Real-Time Monitoring"],
    icon: <Workflow className="w-6 h-6" />,
    image: "/images/services/workflow-automation.jpg",
  },
  {
    id: "intelligent-agents",
    title: "Intelligent Agents",
    description: "Specialized agents for customer support, sales qualification, and operations that work 24/7. They understand context, make decisions, and integrate into your tools.",
    features: ["Natural Language", "Multi-Step Reasoning", "Tool Integration"],
    icon: <Bot className="w-6 h-6" />,
    image: "/images/services/intelligent-agents.jpg",
  },
  {
    id: "smart-assistants",
    title: "Smart Assistants",
    description: "Personalized assistants that manage calendars, process documents, handle email triage, and keep your team organized without adding headcount.",
    features: ["Context-Aware", "Calendar Management", "Document Processing"],
    icon: <Headphones className="w-6 h-6" />,
    image: "/images/services/smart-assistants.jpg",
  },
  {
    id: "business-intelligence",
    title: "Business Intelligence",
    description: "Dashboards and reporting systems that update themselves, track the KPIs that matter, and surface insights before you have to ask for them.",
    features: ["Custom Dashboards", "Automated Reports", "KPI Tracking"],
    icon: <BarChart3 className="w-6 h-6" />,
    image: "/images/services/business-intelligence.jpg",
  },
  {
    id: "custom-solutions",
    title: "Custom Solutions",
    description: "When your business doesn't fit into someone else's software, we design and build from scratch. Internal tools, customer portals, AI-powered platforms.",
    features: ["Full-Stack Dev", "API Design", "Deployment & Support"],
    icon: <Code2 className="w-6 h-6" />,
    image: "/images/services/custom-solutions.jpg",
  },
];

// --- Main Services Section ---
export default function ServicesSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const sectionRef = useRef<HTMLElement>(null);
  const titleInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white overflow-hidden py-24 md:py-32"
      onMouseMove={handleMouseMove}
    >
      {/* Circuitry Background */}
      <CircuitryBackground mousePosition={mousePosition} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        >
          <motion.span
            className="inline-block px-4 py-1.5 bg-gray-50 text-gray-600 text-xs font-medium tracking-wider uppercase rounded-full mb-6 border border-gray-100"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={titleInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            What We Build
          </motion.span>

          <h2 className="text-3xl md:text-5xl font-semibold text-gray-900 tracking-tight mb-4">
            Systems That Scale
            <br />
            <span className="text-gray-400">Without Adding Headcount</span>
          </h2>

          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Every automation we build is designed to answer one question:
            how much time and money can this save you?
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {SERVICES.map((service, index) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              description={service.description}
              features={service.features}
              icon={service.icon}
              image={service.image}
              index={index}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <a
            href="/services"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-gray-900 text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            View All Services
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
