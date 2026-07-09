"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "motion/react";

const METRICS = [
  { value: 50, suffix: "+", label: "Automations Deployed" },
  { value: 99.8, suffix: "%", label: "Uptime", decimals: 1 },
  { value: 24, suffix: "/7", label: "Monitoring" },
  { value: 4.8, suffix: "★", label: "Client Rating", decimals: 1 },
];

function AnimatedCounter({
  value,
  suffix,
  decimals = 0,
  inView,
}: {
  value: number;
  suffix: string;
  decimals?: number;
  inView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 3500;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out quart: 1 - (1 - t)^4
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(eased * value);
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [inView, value]);

  return (
    <span className="font-mono">
      {decimals > 0 ? count.toFixed(decimals) : Math.round(count)}
      {suffix}
    </span>
  );
}

export default function TrustBar() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

  // Trigger counter at 40% of the section being visible
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white py-20 md:py-28 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        {/* Liquid Glass Panel */}
        <motion.div
          className="relative rounded-3xl border border-white/80 overflow-hidden backdrop-blur-xl"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.6)",
          }}
          initial={{ opacity: 0, y: 40 }}
          suppressHydrationWarning
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
            {METRICS.map((metric, i) => (
              <motion.div
                key={metric.label}
                className="relative p-8 md:p-10 text-center group cursor-default"
                initial={{ opacity: 0, y: 30 }}
                suppressHydrationWarning
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: i * 0.12,
                  ease: [0.32, 0.72, 0, 1],
                }}
                whileHover={{
                  scale: 1.03,
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  },
                }}
              >
                {/* Divider (not on first item) */}
                {i > 0 && (
                  <div className="absolute left-0 top-1/4 bottom-1/4 w-px bg-gray-200/60" />
                )}

                <div
                  className="text-3xl md:text-4xl font-bold text-gray-900 mb-2"
                  style={{ fontFamily: "var(--font-mono), monospace" }}
                >
                  <AnimatedCounter
                    value={metric.value}
                    suffix={metric.suffix}
                    decimals={metric.decimals}
                    inView={isInView}
                  />
                </div>
                <p className="text-sm text-gray-500 font-medium">
                  {metric.label}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Glass shine on hover */}
          <div className="absolute inset-0 pointer-events-none rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute inset-0 bg-white/10" />
          </div>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="text-center mt-8 text-gray-500 text-sm md:text-base max-w-xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          suppressHydrationWarning
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          Every number here represents a business that stopped doing things
          manually and started running smarter.
        </motion.p>
      </div>
    </section>
  );
}