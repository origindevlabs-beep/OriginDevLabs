"use client";

import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { motion, useTransform, useSpring, useMotionValue } from "framer-motion";

// --- Circuitry Background Component ---
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
            canvas.height = window.innerHeight;
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

            // Create connections
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

            // Draw connections
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

            // Draw nodes
            nodes.forEach((node) => {
                const distToMouse = Math.hypot(node.x - mx, node.y - my);
                const glow = Math.max(0, 1 - distToMouse / 300);
                const baseRadius = 1.5;
                const radius = baseRadius + glow * 2;

                // Node glow
                if (glow > 0.1) {
                    const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, radius * 4);
                    gradient.addColorStop(0, `rgba(0, 0, 0, ${glow * 0.15})`);
                    gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
                    ctx.fillStyle = gradient;
                    ctx.beginPath();
                    ctx.arc(node.x, node.y, radius * 4, 0, Math.PI * 2);
                    ctx.fill();
                }

                // Node dot
                ctx.fillStyle = `rgba(0, 0, 0, ${0.1 + glow * 0.3})`;
                ctx.beginPath();
                ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
                ctx.fill();

                // Pulse effect
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

            // Draw traveling pulses along connections
            nodes.forEach((node, i) => {
                if (Math.random() > 0.995 && node.connections.length > 0) {
                    const targetIdx = node.connections[Math.floor(Math.random() * node.connections.length)];
                    const target = nodes[targetIdx];
                    if (target) {
                        const progress = (time * 0.5) % 1;
                        const px = node.x + (target.x - node.x) * progress;
                        const py = node.y + (target.y - node.y) * progress;
                        ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
                        ctx.beginPath();
                        ctx.arc(px, py, 2, 0, Math.PI * 2);
                        ctx.fill();
                    }
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
            style={{ opacity: 0.6 }}
        />
    );
}

// --- Types ---
export type AnimationPhase = "scatter" | "line" | "circle" | "bottom-strip";

interface FlipCardProps {
    src: string;
    index: number;
    total: number;
    phase: AnimationPhase;
    target: { x: number; y: number; rotation: number; scale: number; opacity: number };
    label: string;
}

// --- FlipCard Component ---
const IMG_WIDTH = 60;
const IMG_HEIGHT = 85;

function FlipCard({ src, index, total, phase, target, label }: FlipCardProps) {
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
            <motion.div
                className="relative h-full w-full"
                style={{ transformStyle: "preserve-3d" }}
                transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                whileHover={{ rotateY: 180 }}
            >
                {/* Front Face - Abstract Tech Visual */}
                <div
                    className="absolute inset-0 h-full w-full overflow-hidden rounded-xl shadow-lg"
                    style={{ backfaceVisibility: "hidden", background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)" }}
                >
                    <img src={src} alt={label} className="h-full w-full object-cover opacity-80" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute bottom-1 left-1 right-1">
                        <p className="text-[6px] font-medium text-white/70 truncate">{label}</p>
                    </div>
                </div>

                {/* Back Face */}
                <div
                    className="absolute inset-0 h-full w-full overflow-hidden rounded-xl shadow-lg bg-black flex flex-col items-center justify-center p-2 border border-white/10"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                    <div className="text-center">
                        <p className="text-[7px] font-bold text-white/60 uppercase tracking-widest mb-0.5">ODL</p>
                        <p className="text-[8px] font-medium text-white/90">{label}</p>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

// --- Main Hero Component ---
const TOTAL_IMAGES = 20;
const MAX_SCROLL = 3000;

// Abstract tech/automation themed images - Replace with generated images
// PROMPT FOR IMAGE GENERATION: "Abstract dark minimalist automation workflow diagram, glowing nodes and connections, 
// clean vector style, dark background with subtle blue accents, no text, suitable for tech company website"
const IMAGES = [
    { src: "/images/hero/workflow-nodes.jpg", label: "Workflow Automation" },
    { src: "/images/hero/neural-network.jpg", label: "Neural Processing" },
    { src: "/images/hero/data-flow.jpg", label: "Data Pipeline" },
    { src: "/images/hero/system-integration.jpg", label: "System Integration" },
    { src: "/images/hero/predictive-analytics.jpg", label: "Predictive Analytics" },
    { src: "/images/hero/agent-logic.jpg", label: "Agent Logic" },
    { src: "/images/hero/process-mining.jpg", label: "Process Mining" },
    { src: "/images/hero/api-mesh.jpg", label: "API Mesh" },
    { src: "/images/hero/decision-tree.jpg", label: "Decision Trees" },
    { src: "/images/hero/real-time-sync.jpg", label: "Real-Time Sync" },
    { src: "/images/hero/automation-grid.jpg", label: "Automation Grid" },
    { src: "/images/hero/智能助手.jpg", label: "Smart Assistants" },
    { src: "/images/hero/cloud-infra.jpg", label: "Cloud Infrastructure" },
    { src: "/images/hero/security-layer.jpg", label: "Security Layer" },
    { src: "/images/hero/scaling-matrix.jpg", label: "Scaling Matrix" },
    { src: "/images/hero/client-portal.jpg", label: "Client Portals" },
    { src: "/images/hero/dashboard-ui.jpg", label: "Dashboard UI" },
    { src: "/images/hero/report-engine.jpg", label: "Report Engine" },
    { src: "/images/hero/notification-system.jpg", label: "Notifications" },
    { src: "/images/hero/deployment-pipe.jpg", label: "Deployment Pipeline" },
];

const lerp = (start: number, end: number, t: number) => start * (1 - t) + end * t;

export default function HeroSection() {
    const [introPhase, setIntroPhase] = useState<AnimationPhase>("scatter");
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
    const containerRef = useRef<HTMLDivElement>(null);
    const [showCTA, setShowCTA] = useState(false);

    // --- Container Size ---
    useEffect(() => {
        if (!containerRef.current) return;
        const handleResize = (entries: ResizeObserverEntry[]) => {
            for (const entry of entries) {
                setContainerSize({ width: entry.contentRect.width, height: entry.contentRect.height });
            }
        };
        const observer = new ResizeObserver(handleResize);
        observer.observe(containerRef.current);
        setContainerSize({ width: containerRef.current.offsetWidth, height: containerRef.current.offsetHeight });
        return () => observer.disconnect();
    }, []);

    // --- Virtual Scroll Logic ---
    const virtualScroll = useMotionValue(0);
    const scrollRef = useRef(0);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleWheel = (e: WheelEvent) => {
            e.preventDefault();
            const newScroll = Math.min(Math.max(scrollRef.current + e.deltaY, 0), MAX_SCROLL);
            scrollRef.current = newScroll;
            virtualScroll.set(newScroll);
        };

        let touchStartY = 0;
        const handleTouchStart = (e: TouchEvent) => { touchStartY = e.touches[0].clientY; };
        const handleTouchMove = (e: TouchEvent) => {
            const touchY = e.touches[0].clientY;
            const deltaY = touchStartY - touchY;
            touchStartY = touchY;
            const newScroll = Math.min(Math.max(scrollRef.current + deltaY, 0), MAX_SCROLL);
            scrollRef.current = newScroll;
            virtualScroll.set(newScroll);
        };

        container.addEventListener("wheel", handleWheel, { passive: false });
        container.addEventListener("touchstart", handleTouchStart, { passive: false });
        container.addEventListener("touchmove", handleTouchMove, { passive: false });

        return () => {
            container.removeEventListener("wheel", handleWheel);
            container.removeEventListener("touchstart", handleTouchStart);
            container.removeEventListener("touchmove", handleTouchMove);
        };
    }, [virtualScroll]);

    // 1. Morph Progress: 0 (Circle) -> 1 (Bottom Arc)
    const morphProgress = useTransform(virtualScroll, [0, 600], [0, 1]);
    const smoothMorph = useSpring(morphProgress, { stiffness: 40, damping: 20 });

    // 2. Scroll Rotation
    const scrollRotate = useTransform(virtualScroll, [600, 3000], [0, 360]);
    const smoothScrollRotate = useSpring(scrollRotate, { stiffness: 40, damping: 20 });

    // --- Mouse Parallax ---
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const smoothMouseX = useSpring(mouseX, { stiffness: 30, damping: 20 });
    const smoothMouseY = useSpring(mouseY, { stiffness: 30, damping: 20 });
    const [normalizedMouse, setNormalizedMouse] = useState({ x: 0.5, y: 0.5 });

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            const relativeX = (e.clientX - rect.left) / rect.width;
            const relativeY = (e.clientY - rect.top) / rect.height;
            setNormalizedMouse({ x: relativeX, y: relativeY });
            mouseX.set((relativeX - 0.5) * 100);
            mouseY.set((relativeY - 0.5) * 50);
        };
        container.addEventListener("mousemove", handleMouseMove);
        return () => container.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    // --- Intro Sequence ---
    useEffect(() => {
        const timer1 = setTimeout(() => setIntroPhase("line"), 500);
        const timer2 = setTimeout(() => setIntroPhase("circle"), 2500);
        return () => { clearTimeout(timer1); clearTimeout(timer2); };
    }, []);

    // --- Show CTA after morph completes ---
    useEffect(() => {
        const unsubscribe = smoothMorph.on("change", (v) => {
            setShowCTA(v > 0.9);
        });
        return unsubscribe;
    }, [smoothMorph]);

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

    // --- Render Loop ---
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

    // --- Content Opacity ---
    const contentOpacity = useTransform(smoothMorph, [0.8, 1], [0, 1]);
    const contentY = useTransform(smoothMorph, [0.8, 1], [30, 0]);

    // --- CTA Animation ---
    const ctaOpacity = useTransform(smoothMorph, [0.9, 1], [0, 1]);
    const ctaScale = useTransform(smoothMorph, [0.9, 1], [0.8, 1]);

    return (
        <div ref={containerRef} className="relative w-full h-full bg-white overflow-hidden">
            {/* Circuitry Background */}
            <CircuitryBackground mousePosition={normalizedMouse} />

            {/* Container */}
            <div className="flex h-full w-full flex-col items-center justify-center perspective-1000">

                {/* Intro Text */}
                <div className="absolute z-0 flex flex-col items-center justify-center text-center pointer-events-none top-1/2 -translate-y-1/2">
                    <motion.h1
                        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                        animate={introPhase === "circle" && morphValue < 0.5
                            ? { opacity: 1 - morphValue * 2, y: 0, filter: "blur(0px)" }
                            : { opacity: 0, filter: "blur(10px)" }}
                        transition={{ duration: 1 }}
                        className="text-2xl font-semibold tracking-tight text-gray-900 md:text-4xl"
                    >
                        Systems That Work While You Sleep
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={introPhase === "circle" && morphValue < 0.5
                            ? { opacity: 0.6 - morphValue }
                            : { opacity: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="mt-4 text-xs font-bold tracking-[0.2em] text-gray-500"
                    >
                        SCROLL TO EXPLORE
                    </motion.p>
                </div>

                {/* Arc Active Content */}
                <motion.div
                    style={{ opacity: contentOpacity, y: contentY }}
                    className="absolute top-[8%] z-10 flex flex-col items-center justify-center text-center pointer-events-none px-4"
                >
                    <h2 className="text-3xl md:text-5xl font-semibold text-gray-900 tracking-tight mb-3">
                        We Build Automation
                    </h2>
                    <p className="text-sm md:text-base text-gray-600 max-w-xl leading-relaxed mb-6">
                        From workflow automation to intelligent agents, we architect systems
                        that handle the work your team shouldn't have to.
                    </p>

                    {/* CTA Button */}
                    <motion.div
                        style={{ opacity: ctaOpacity, scale: ctaScale }}
                        className="pointer-events-auto"
                    >
                        <a
                            href="/get-started"
                            className="inline-flex items-center gap-2 px-8 py-3.5 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-black/20"
                        >
                            Get Started
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </a>
                    </motion.div>
                </motion.div>

                {/* Main Container */}
                <div className="relative flex items-center justify-center w-full h-full">
                    {IMAGES.slice(0, TOTAL_IMAGES).map((item, i) => {
                        let target = { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 };

                        if (introPhase === "scatter") {
                            target = scatterPositions[i];
                        } else if (introPhase === "line") {
                            const lineSpacing = 70;
                            const lineTotalWidth = TOTAL_IMAGES * lineSpacing;
                            const lineX = i * lineSpacing - lineTotalWidth / 2;
                            target = { x: lineX, y: 0, rotation: 0, scale: 1, opacity: 1 };
                        } else {
                            const isMobile = containerSize.width < 768;
                            const minDimension = Math.min(containerSize.width, containerSize.height);

                            // Circle Position
                            const circleRadius = Math.min(minDimension * 0.35, 350);
                            const circleAngle = (i / TOTAL_IMAGES) * 360;
                            const circleRad = (circleAngle * Math.PI) / 180;
                            const circlePos = {
                                x: Math.cos(circleRad) * circleRadius,
                                y: Math.sin(circleRad) * circleRadius,
                                rotation: circleAngle + 90,
                            };

                            // Bottom Arc Position
                            const baseRadius = Math.min(containerSize.width, containerSize.height * 1.5);
                            const arcRadius = baseRadius * (isMobile ? 1.4 : 1.1);
                            const arcApexY = containerSize.height * (isMobile ? 0.35 : 0.25);
                            const arcCenterY = arcApexY + arcRadius;
                            const spreadAngle = isMobile ? 100 : 130;
                            const startAngle = -90 - (spreadAngle / 2);
                            const step = spreadAngle / (TOTAL_IMAGES - 1);

                            const scrollProgress = Math.min(Math.max(rotateValue / 360, 0), 1);
                            const maxRotation = spreadAngle * 0.8;
                            const boundedRotation = -scrollProgress * maxRotation;
                            const currentArcAngle = startAngle + (i * step) + boundedRotation;
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
                                total={TOTAL_IMAGES}
                                phase={introPhase}
                                target={target}
                                label={item.label}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
