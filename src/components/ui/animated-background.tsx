"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { GlyphMatrix } from "@/components/ui/glyph-matrix";

export function AnimatedBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme !== "light";

  // Dark Mode: White glyphs + Red cursor spotlight
  // Light Mode: Red glyphs on white background + Deep Crimson cursor spotlight
  const glyphColor = isDark ? "#ffffff" : "#dc2626";
  const spotlightColor = isDark ? "#ef4444" : "#7f1d1d";

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const container = containerRef.current;
    if (!container) return;

    let rafId: number | null = null;
    let targetMouseX = window.innerWidth / 2;
    let targetMouseY = window.innerHeight / 2;
    let currentMouseX = targetMouseX;
    let currentMouseY = targetMouseY;

    const animate = () => {
      const dx = targetMouseX - currentMouseX;
      const dy = targetMouseY - currentMouseY;
      currentMouseX += dx * 0.16;
      currentMouseY += dy * 0.16;

      if (container) {
        container.style.setProperty("--mouse-x", `${currentMouseX}px`);
        container.style.setProperty("--mouse-y", `${currentMouseY}px`);
      }

      if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) {
        rafId = requestAnimationFrame(animate);
      } else {
        rafId = null;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
      if (rafId === null) {
        rafId = requestAnimationFrame(animate);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [isMobile]);

  return (
    <div ref={containerRef} className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-background">
      {/* 1. Primary GlyphMatrix — White in Dark Mode, Red in Light Mode */}
      <div className={isDark ? "absolute inset-0 opacity-[0.35]" : "absolute inset-0 opacity-[0.38]"}>
        <GlyphMatrix
          glyphs="01·•+*/\<>={}[]#@&%$!?~^_|;:ΣΩπλδ"
          cellSize={20}
          mutationRate={0.04}
          interval={120}
          fadeBottom={0}
          color={glyphColor}
        />
      </div>

      {/* 2. Mouse Spotlight — Red highlights following cursor */}
      {!isMobile && (
        <div
          className="absolute inset-0 opacity-100"
          style={{
            maskImage: `radial-gradient(150px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), black 60%, transparent 100%)`,
            WebkitMaskImage: `radial-gradient(150px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), black 60%, transparent 100%)`,
          }}
        >
          <GlyphMatrix
            glyphs="01·•+*/\<>={}[]#@&%ΣΩπλδ"
            cellSize={20}
            mutationRate={0.06}
            interval={90}
            fadeBottom={0}
            color={spotlightColor}
          />
        </div>
      )}

      {/* 3. Subtle Vignette in Dark Mode */}
      <div className="hidden dark:block absolute inset-0 z-10 bg-background/25 [mask-image:radial-gradient(ellipse_at_center,transparent_60%,black)]" />
    </div>
  );
}
