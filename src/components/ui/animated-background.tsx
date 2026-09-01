"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { GlyphMatrix } from "@/components/ui/glyph-matrix";

export function AnimatedBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const { resolvedTheme } = useTheme();
  const [glyphColor, setGlyphColor] = useState("#6B7280");

  useEffect(() => {
    if (!resolvedTheme) return;
    setGlyphColor(resolvedTheme === "dark" ? "#ffffff" : "#000000");
  }, [resolvedTheme]);

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

    let rafId: number;
    let targetScrollY = 0;
    let currentScrollY = 0;
    
    let targetMouseX = window.innerWidth / 2;
    let targetMouseY = window.innerHeight / 2;
    let currentMouseX = targetMouseX;
    let currentMouseY = targetMouseY;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    const handleScroll = () => {
      targetScrollY = window.scrollY;
    };

    const animate = () => {
      // Smooth interpolation for silky performance
      currentScrollY += (targetScrollY - currentScrollY) * 0.1;
      currentMouseX += (targetMouseX - currentMouseX) * 0.1;
      currentMouseY += (targetMouseY - currentMouseY) * 0.1;

      if (container) {
        container.style.setProperty("--scroll-y", `${currentScrollY}px`);
        container.style.setProperty("--mouse-x", `${currentMouseX}px`);
        container.style.setProperty("--mouse-y", `${currentMouseY}px`);
      }
      
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [isMobile]);

  return (
    <div ref={containerRef} className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-background">
      
      {/* 1. GlyphMatrix — Primary Background Texture */}
      <div className="absolute inset-0 opacity-[0.35]">
        <GlyphMatrix
          glyphs="01·•+*/\<>={}[]#@&%$!?~^_|;:ΣΩπλδ"
          cellSize={18}
          mutationRate={0.05}
          interval={90}
          fadeBottom={0}
          color={glyphColor}
        />
      </div>

      {/* 2. Mouse Spotlight — Only the GlyphMatrix characters turn red, no background blur */}
      <div 
        className="absolute inset-0 opacity-100"
        style={{
          maskImage: `radial-gradient(150px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), black 60%, transparent 100%)`,
          WebkitMaskImage: `radial-gradient(150px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), black 60%, transparent 100%)`,
        }}
      >
        <GlyphMatrix
          glyphs="01·•+*/\<>={}[]#@&%ΣΩπλδ"
          cellSize={18}
          mutationRate={0.08}
          interval={50}
          fadeBottom={0}
          color="#ef4444"
        />
      </div>
      {/* 7. Vignette for depth */}
      <div className="absolute inset-0 z-10 bg-background/25 [mask-image:radial-gradient(ellipse_at_center,transparent_60%,black)]" />
      
      {/* 8. Noise Texture */}
      <div className="absolute inset-0 z-20 opacity-[0.02] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%222%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
    </div>
  );
}


