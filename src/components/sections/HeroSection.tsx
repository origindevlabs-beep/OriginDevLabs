"use client";

import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import {
  motion,
  useTransform,
  useSpring,
  useMotionValue,
} from "motion/react";
import { useLenisRef } from "@/lib/lenis-context";
import CircuitryBackground from "@/components/CircuitryBackground";

// --- Types ---
export type AnimationPhase = "scatter" | "line" | "circle" | "bottom-strip";

interface FlipCardProps {
  src: string;
  index: number;
  total: number;
  phase: AnimationPhase;
  target: {
    x: number;
    y: number;
    rotation: number;
    scale: number;
    opacity: number;
  };
}

// --- FlipCard Component (memoized — only re-renders when target changes) ---
const IMG_WIDTH = 60;
const IMG_HEIGHT = 85;

const FlipCard = React.memo(function FlipCard({ src, index, target }: FlipCardProps) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      animate={{
        x: target.x,
        y: target.y,
        rotate: target.rotation,
        scale: target.scale,
        opacity: target.opacity,
      }}
      transition={{
        type: "spring",
        stiffness: 40,
        damping: 15,
      }}
      style={{
        position: "absolute",
        width: IMG_WIDTH,
        height: IMG_HEIGHT,
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      className="cursor-pointer group"
    >
      {/* Behind-card shadow layer: ODL text (even) or logo (odd) */}
      <div
        className="absolute z-0 flex items-center justify-center"
        style={{
          inset: 0,
          transform: "translate(4px, 4px) scale(1.2)",
          opacity: 0.18,
        }}
      >
        {isEven ? (
          <span
            className="text-sm font-bold text-gray-900 tracking-widest select-none whitespace-nowrap"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            ODL
          </span>
        ) : (
          <img
            src="/odl-logo.png"
            alt=""
            className="w-8 h-8 object-contain"
            loading="eager"
          />
        )}
      </div>

      {/* Card faces */}
      <motion.div
        className="relative h-full w-full z-10"
        style={{ transformStyle: "preserve-3d" }}
        transition={{
          duration: 0.6,
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
        whileHover={{ rotateY: 180 }}
      >
        {/* Front Face — abstract image, no text */}
        <div
          className="absolute inset-0 h-full w-full overflow-hidden rounded-xl shadow-lg"
          style={{
            backfaceVisibility: "hidden",
            background:
              "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)",
          }}
        >
          <img
            src={src}
            alt=""
            className="h-full w-full object-cover opacity-80"
            decoding="async"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>

        {/* Back Face — plain dark, no text */}
        <div
          className="absolute inset-0 h-full w-full overflow-hidden rounded-xl shadow-lg bg-black border border-white/10"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        />
      </motion.div>
    </motion.div>
  );
});

// --- Main Hero Component ---
const TOTAL_IMAGES_DESKTOP = 20;
const TOTAL_IMAGES_MOBILE = 10;
const MAX_SCROLL = 1200;
const RELEASE_SCROLL = 1050;

const IMAGES = [
  { src: "/images/hero/workflow-nodes.jpg" },
  { src: "/images/hero/neural-network.jpg" },
  { src: "/images/hero/data-flow.jpg" },
  { src: "/images/hero/system-integration.jpg" },
  { src: "/images/hero/predictive-analytics.jpg" },
  { src: "/images/hero/agent-logic.jpg" },
  { src: "/images/hero/process-mining.jpg" },
  { src: "/images/hero/api-mesh.jpg" },
  { src: "/images/hero/decision-tree.jpg" },
  { src: "/images/hero/real-time-sync.jpg" },
  { src: "/images/hero/automation-grid.jpg" },
  { src: "/images/hero/smart-assistants.jpg" },
  { src: "/images/hero/cloud-infra.jpg" },
  { src: "/images/hero/security-layer.jpg" },
  { src: "/images/hero/scaling-matrix.jpg" },
  { src: "/images/hero/client-portal.jpg" },
  { src: "/images/hero/dashboard-ui.jpg" },
  { src: "/images/hero/report-engine.jpg" },
  { src: "/images/hero/notification-system.jpg" },
  { src: "/images/hero/deployment-pipe.jpg" },
];

const lerp = (start: number, end: number, t: number) =>
  start * (1 - t) + end * t;

export default function HeroSection() {
  const [introPhase, setIntroPhase] = useState<AnimationPhase>("scatter");
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Use ref for isMobile to avoid re-renders on resize
  const isMobileRef = useRef(false);

  // --- Container Size (throttled via rAF) ---
  useEffect(() => {
    if (!containerRef.current) return;
    let rafId = 0;
    const handleResize = (entries: ResizeObserverEntry[]) => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        for (const entry of entries) {
          const w = entry.contentRect.width;
          setContainerSize({ width: w, height: entry.contentRect.height });
          isMobileRef.current = w < 768;
        }
      });
    };
    const observer = new ResizeObserver(handleResize);
    observer.observe(containerRef.current);
    setContainerSize({
      width: containerRef.current.offsetWidth,
      height: containerRef.current.offsetHeight,
    });
    isMobileRef.current = (containerRef.current.offsetWidth) < 768;
    return () => {
      observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // --- Lenis integration ---
  const lenisRef = useLenisRef();
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.setAttribute("data-lenis-prevent", "");
    return () => container.removeAttribute("data-lenis-prevent");
  }, []);

  // --- Virtual Scroll Logic with Tidal Lock ---
  const virtualScroll = useMotionValue(0);
  const scrollRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      if (scrollRef.current >= RELEASE_SCROLL && e.deltaY > 0) {
        container.removeAttribute("data-lenis-prevent");
        return;
      }
      e.preventDefault();
      const newScroll = Math.min(
        Math.max(scrollRef.current + e.deltaY, 0),
        MAX_SCROLL
      );
      scrollRef.current = newScroll;
      virtualScroll.set(newScroll);
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;
      touchStartY = touchY;
      if (scrollRef.current >= RELEASE_SCROLL && deltaY > 0) {
        container.removeAttribute("data-lenis-prevent");
        return;
      }
      e.preventDefault();
      const newScroll = Math.min(
        Math.max(scrollRef.current + deltaY, 0),
        MAX_SCROLL
      );
      scrollRef.current = newScroll;
      virtualScroll.set(newScroll);
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("touchstart", handleTouchStart, { passive: true });
    container.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
    };
  }, [virtualScroll]);

  // 1. Morph Progress: 0 (Circle) -> 1 (Bottom Arc)
  const morphProgress = useTransform(virtualScroll, [0, 400], [0, 1]);
  const smoothMorph = useSpring(morphProgress, { stiffness: 40, damping: 20 });

  // 2. Scroll Rotation
  const scrollRotate = useTransform(virtualScroll, [400, 900], [0, 360]);
  const smoothScrollRotate = useSpring(scrollRotate, {
    stiffness: 40,
    damping: 20,
  });

  // --- Mouse Parallax (rAF-throttled, no per-pixel re-renders) ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 30, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 30, damping: 20 });
  const [normalizedMouse, setNormalizedMouse] = useState({ x: 0.5, y: 0.5 });
  const mouseRafRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Throttle to once per animation frame
      if (mouseRafRef.current) return;
      mouseRafRef.current = requestAnimationFrame(() => {
        mouseRafRef.current = 0;
        const rect = container.getBoundingClientRect();
        const relativeX = (e.clientX - rect.left) / rect.width;
        const relativeY = (e.clientY - rect.top) / rect.height;
        setNormalizedMouse({ x: relativeX, y: relativeY });
        mouseX.set((relativeX - 0.5) * 100);
        mouseY.set((relativeY - 0.5) * 50);
      });
    };
    container.addEventListener("mousemove", handleMouseMove);
    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      if (mouseRafRef.current) cancelAnimationFrame(mouseRafRef.current);
    };
  }, [mouseX, mouseY]);

  // --- Intro Sequence ---
  useEffect(() => {
    const timer1 = setTimeout(() => setIntroPhase("line"), 500);
    const timer2 = setTimeout(() => setIntroPhase("circle"), 2500);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  // --- Random Scatter Positions ---
  const scatterPositions = useMemo(() => {
    return IMAGES.map(() => ({
      x: (Math.random() - 0.5) * 1500,
      y: (Math.random() - 0.5) * 1000,
      rotation: (Math.random() - 0.5) * 180,
      scale: 0.6,
      opacity: 0,
    }));
  }, []);

  // --- Render Loop (subscribe to motion values for card position updates) ---
  const [morphValue, setMorphValue] = useState(0);
  const [rotateValue, setRotateValue] = useState(0);
  const [parallaxValue, setParallaxValue] = useState(0);

  useEffect(() => {
    const unsubscribeMorph = smoothMorph.on("change", setMorphValue);
    const unsubscribeRotate = smoothScrollRotate.on("change", setRotateValue);
    const unsubscribeParallax = smoothMouseX.on("change", setParallaxValue);
    return () => {
      unsubscribeMorph();
      unsubscribeRotate();
      unsubscribeParallax();
    };
  }, [smoothMorph, smoothScrollRotate, smoothMouseX]);

  // --- Phase 2 Content Opacity ---
  const contentOpacity = useTransform(virtualScroll, [500, 750], [0, 1]);
  const contentY = useTransform(virtualScroll, [500, 750], [30, 0]);

  // --- CTA Animation ---
  const ctaOpacity = useTransform(virtualScroll, [650, 900], [0, 1]);
  const ctaScale = useTransform(virtualScroll, [650, 900], [0.85, 1]);

  // Use fewer cards on mobile
  const totalImages = isMobileRef.current ? TOTAL_IMAGES_MOBILE : TOTAL_IMAGES_DESKTOP;

  // Shared frosted backing class
  const frostedBacking =
    "bg-white/80 backdrop-blur-sm rounded-2xl px-8 py-6 border border-gray-100 shadow-lg";

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full bg-white overflow-hidden"
    >
      {/* Circuitry Background */}
      <CircuitryBackground mousePosition={normalizedMouse} />

      {/* Cards Container — z-10 */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        {IMAGES.slice(0, totalImages).map((item, i) => {
          let target = {
            x: 0,
            y: 0,
            rotation: 0,
            scale: 1,
            opacity: 1,
          };

          if (introPhase === "scatter") {
            target = scatterPositions[i];
          } else if (introPhase === "line") {
            const lineSpacing = 70;
            const lineTotalWidth = totalImages * lineSpacing;
            const lineX = i * lineSpacing - lineTotalWidth / 2;
            target = { x: lineX, y: 0, rotation: 0, scale: 1, opacity: 1 };
          } else {
            const isMobile = containerSize.width < 768;
            const minDimension = Math.min(
              containerSize.width,
              containerSize.height
            );

            // Circle Position
            const circleRadius = Math.min(minDimension * 0.35, 350);
            const circleAngle = (i / totalImages) * 360;
            const circleRad = (circleAngle * Math.PI) / 180;
            const circlePos = {
              x: Math.cos(circleRad) * circleRadius,
              y: Math.sin(circleRad) * circleRadius,
              rotation: circleAngle + 90,
            };

            // Bottom Arc Position
            const baseRadius = Math.min(
              containerSize.width,
              containerSize.height * 1.5
            );
            const arcRadius = baseRadius * (isMobile ? 1.4 : 1.1);
            const arcApexY =
              containerSize.height * (isMobile ? 0.35 : 0.25);
            const arcCenterY = arcApexY + arcRadius;
            const spreadAngle = isMobile ? 100 : 130;
            const startAngle = -90 - spreadAngle / 2;
            const step = spreadAngle / (totalImages - 1);

            const scrollProgress = Math.min(
              Math.max(rotateValue / 200, 0),
              1
            );
            const maxRotation = spreadAngle * 0.8;
            const boundedRotation = -scrollProgress * maxRotation;
            const currentArcAngle = startAngle + i * step + boundedRotation;
            const arcRad = (currentArcAngle * Math.PI) / 180;

            const arcPos = {
              x: Math.cos(arcRad) * arcRadius + parallaxValue,
              y: Math.sin(arcRad) * arcRadius + arcCenterY,
              rotation: currentArcAngle + 90,
              scale: isMobile ? 1.4 : 1.8,
            };

            target = {
              x: lerp(circlePos.x, arcPos.x, morphValue),
              y: lerp(circlePos.y, arcPos.y, morphValue),
              rotation: lerp(circlePos.rotation, arcPos.rotation, morphValue),
              scale: lerp(1, arcPos.scale, morphValue),
              opacity: 1,
            };
          }

          return (
            <FlipCard
              key={i}
              src={item.src}
              index={i}
              total={totalImages}
              phase={introPhase}
              target={target}
            />
          );
        })}
      </div>

      {/* Phase 1 Text — z-30 */}
      <div className="absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-none px-4">
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
            filter: "blur(10px)",
          }}
          suppressHydrationWarning
          animate={
            introPhase === "circle" && morphValue < 0.5
              ? {
                  opacity: 1 - morphValue * 2,
                  y: 0,
                  filter: "blur(0px)",
                }
              : { opacity: 0, filter: "blur(10px)" }
          }
          transition={{ duration: 1 }}
          className={`${frostedBacking} text-center max-w-lg`}
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 md:text-4xl">
            Systems That Work While You Sleep
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            suppressHydrationWarning
            animate={
              introPhase === "circle" && morphValue < 0.5
                ? { opacity: 0.6 - morphValue * 1.2 }
                : { opacity: 0 }
            }
            transition={{ duration: 1, delay: 0.2 }}
            className="mt-4 text-xs font-bold tracking-[0.2em] text-gray-500 uppercase"
          >
            Explore
          </motion.p>
        </motion.div>
      </div>

      {/* Phase 2 Text — z-30, fades in after 80% morph */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-none px-4"
      >
        <div
          className={`${frostedBacking} text-center max-w-lg`}
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight mb-3">
            We Build Automation
          </h2>
          <p className="text-sm md:text-base text-gray-600 max-w-md mx-auto leading-relaxed mb-6">
            From workflow automation to intelligent agents, we architect systems
            that handle the work your team shouldn&apos;t have to.
          </p>

          {/* CTA Button */}
          <motion.div
            style={{ opacity: ctaOpacity, scale: ctaScale }}
            className="pointer-events-auto"
          >
            <a
              href="/get-started"
              className="animate-cta-pulse inline-flex items-center gap-2 px-8 py-3.5 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-black/20"
            >
              Get Started
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}