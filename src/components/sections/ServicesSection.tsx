"use client";

import React, { useState, useCallback, useRef } from "react";
import { motion, useInView } from "motion/react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import CircuitryBackground from "@/components/CircuitryBackground";
import {
  Workflow,
  Bot,
  Headphones,
  BarChart3,
  Code2,
  ArrowRight,
} from "lucide-react";

// --- Types ---
interface ServiceCardProps {
  title: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  image: string;
  link: string;
  index: number;
  className?: string;
}

// --- Service Card Component ---
const ServiceCard = React.forwardRef<HTMLDivElement, ServiceCardProps>(
  ({ title, description, features, icon, image, link, index, className }, ref) => {
    const [hovered, setHovered] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(cardRef, { once: true, margin: "-80px" });

    const handleEnter = useCallback(() => setHovered(true), []);
    const handleLeave = useCallback(() => setHovered(false), []);

    return (
      <motion.div
        ref={(node) => {
          (cardRef as React.MutableRefObject<HTMLDivElement | null>).current =
            node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        className={cn(
          "group relative w-full overflow-hidden rounded-2xl transition-shadow duration-500 ease-out",
          className,
          "h-[420px] md:h-[480px]",
          "bg-white border border-gray-100",
          "shadow-md",
          "cursor-pointer"
        )}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        // 3D flip entrance animation
        initial={{ opacity: 0, rotateY: -15, scale: 0.9 }}
        suppressHydrationWarning
        animate={
          isInView
            ? { opacity: 1, rotateY: 0, scale: 1 }
            : { opacity: 0, rotateY: -15, scale: 0.9 }
        }
        transition={{
          duration: 0.7,
          delay: index * 0.12,
          ease: [0.23, 1, 0.32, 1],
        }}
        // Pop/expand hover effect
        whileHover={{
          scale: 1.05,
          boxShadow:
            "0 25px 50px -12px rgba(209, 213, 219, 0.4)",
          y: -4,
          transition: {
            type: "spring",
            stiffness: 300,
            damping: 25,
          },
        }}
        style={{
          perspective: "1200px",
        }}
      >
        {/* Image Section */}
        <div className="relative h-[55%] overflow-hidden">
          <motion.div
            className="absolute inset-0"
            animate={{ scale: hovered ? 1.08 : 1 }}
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
          >
            <div className="text-gray-900">{icon}</div>
          </motion.div>

          {/* Number Badge */}
          <div className="absolute top-4 right-4 px-3 py-1 bg-black text-white text-xs font-medium rounded-full">
            0{index + 1}
          </div>
        </div>

        {/* Content Section */}
        <div className="relative p-6 flex flex-col h-[45%]">
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
            <Link href={link} className="flex items-center gap-2">Learn More <ArrowRight className="w-4 h-4" /></Link>
          </motion.div>
        </div>
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
    link: "/services#automation",
    description:
      "Multi-step workflows that handle repetitive tasks end-to-end. From invoice processing to employee onboarding, you set the rules once and the system runs them every time.",
    features: ["Conditional Logic", "Cross-Platform", "Real-Time Monitoring"],
    icon: <Workflow className="w-6 h-6" />,
    image: "/images/services/workflow-automation.jpg",
  },
  {
    id: "intelligent-agents",
    title: "Intelligent Agents",
    link: "/services#agents",
    description:
      "Specialized agents for customer support, sales qualification, and operations that work 24/7. They understand context, make decisions, and integrate into your tools.",
    features: ["Natural Language", "Multi-Step Reasoning", "Tool Integration"],
    icon: <Bot className="w-6 h-6" />,
    image: "/images/services/intelligent-agents.jpg",
  },
  {
    id: "smart-assistants",
    title: "Smart Assistants",
    link: "/services#assistants",
    description:
      "Personalized assistants that manage calendars, process documents, handle email triage, and keep your team organized without adding headcount.",
    features: [
      "Context-Aware",
      "Calendar Management",
      "Document Processing",
    ],
    icon: <Headphones className="w-6 h-6" />,
    image: "/images/services/smart-assistants.jpg",
  },
  {
    id: "business-intelligence",
    title: "Business Intelligence",
    link: "/services#intelligence",
    description:
      "Dashboards and reporting systems that update themselves, track the KPIs that matter, and surface insights before you have to ask for them.",
    features: ["Custom Dashboards", "Automated Reports", "KPI Tracking"],
    icon: <BarChart3 className="w-6 h-6" />,
    image: "/images/services/business-intelligence.jpg",
  },
  {
    id: "custom-solutions",
    title: "Custom Solutions",
    link: "/services#custom",
    description:
      "When your business doesn't fit into someone else's software, we design and build from scratch. Internal tools, customer portals, AI-powered platforms.",
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
      <CircuitryBackground mousePosition={mousePosition} opacity={0.4} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 40 }}
          suppressHydrationWarning
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        >
          <motion.span
            className="inline-block px-4 py-1.5 bg-gray-50 text-gray-600 text-xs font-medium tracking-wider uppercase rounded-full mb-6 border border-gray-100"
            initial={{ opacity: 0, scale: 0.9 }}
            suppressHydrationWarning
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
            Every automation we build is designed to answer one question: how
            much time and money can this save you?
          </p>
        </motion.div>

        {/* Services Grid — centered */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          {SERVICES.map((service, index) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              description={service.description}
              features={service.features}
              icon={service.icon}
              image={service.image}
              link={service.link}
              index={index}
              className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.375rem)]"
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          suppressHydrationWarning
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