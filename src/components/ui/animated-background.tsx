"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function AnimatedBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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

    const scrollContainer = document.querySelector("[data-scroll-container]");
    const handleScroll = (e: Event) => {
      targetScrollY = (e.target as HTMLElement).scrollTop;
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
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll, { passive: true });
    }
    
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
      }
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div ref={containerRef} className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-background">
      {/* 1. Ambient Glow Orbs (Optimized with radial-gradient instead of heavy blur filters) */}
      <div 
        className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] rounded-full animate-blob will-change-transform"
        style={{ 
          background: 'radial-gradient(circle, rgba(185,28,28,0.15) 0%, transparent 60%)',
          transform: 'translateY(calc(var(--scroll-y, 0px) * -0.1))',
          animationDuration: '8s'
        }} 
      />
      <div 
        className="absolute top-[-10%] right-[-20%] w-[1000px] h-[1000px] rounded-full animate-blob animation-delay-2000 will-change-transform"
        style={{ 
          background: 'radial-gradient(circle, rgba(153,27,27,0.12) 0%, transparent 60%)',
          transform: 'translateY(calc(var(--scroll-y, 0px) * -0.2))',
          animationDuration: '12s'
        }} 
      />
      <div 
        className="absolute bottom-[-30%] left-[20%] w-[900px] h-[900px] rounded-full animate-blob animation-delay-4000 will-change-transform"
        style={{ 
          background: 'radial-gradient(circle, rgba(127,29,29,0.15) 0%, transparent 60%)',
          transform: 'translateY(calc(var(--scroll-y, 0px) * -0.3))',
          animationDuration: '10s'
        }} 
      />

      {/* 2. Interactive Spotlight Grid (Using high-performance CSS Variables) */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm20 20h20v20H20V20zM0 20h20v20H0V20zM20 0h20v20H20V0z' fill='%23ef4444' fill-opacity='0.03' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            backgroundPosition: `0px calc(var(--scroll-y, 0px) * -0.5)`
          }}
        />
        {/* Spotlight that follows mouse */}
        <div 
          className="absolute inset-0 bg-red-500/10"
          style={{
            maskImage: `radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), black, transparent)`,
            WebkitMaskImage: `radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), black, transparent)`,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm20 20h20v20H20V20zM0 20h20v20H0V20zM20 0h20v20H20V0z' fill='%23ef4444' fill-opacity='0.15' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            backgroundPosition: `0px calc(var(--scroll-y, 0px) * -0.5)`
          }}
        />
      </div>

      {/* 3. Shooting Meteors */}
      <div className="absolute inset-0 will-change-transform" style={{ transform: 'translateY(calc(var(--scroll-y, 0px) * -0.15))' }}>
        <Meteors number={6} />
      </div>

      {/* 4. Vignette for depth */}
      <div className="absolute inset-0 bg-background/50 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      
      {/* 5. Noise Texture */}
      <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%222%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
    </div>
  );
}

// Meteor component
const Meteors = ({ number = 20 }: { number?: number }) => {
  const [meteors, setMeteors] = useState<any[]>([]);

  useEffect(() => {
    // Defer meteor generation so it doesn't block navigation
    const timer = setTimeout(() => {
      const generated = new Array(number).fill(true).map(() => ({
        id: Math.random().toString(36).substring(7),
        left: Math.floor(Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000)) + "px",
        top: Math.floor(Math.random() * ((typeof window !== 'undefined' ? window.innerHeight : 600) / 2)) + "px",
        animationDelay: Math.random() * 10 + 2 + "s",
        animationDuration: Math.floor(Math.random() * 8 + 2) + "s",
      }));
      setMeteors(generated);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [number]);

  return (
    <>
      {meteors.map((meteor) => (
        <span
          key={meteor.id}
          className="absolute h-0.5 w-0.5 rounded-[9999px] bg-red-500 shadow-[0_0_0_1px_#ffffff10] rotate-[215deg] animate-meteor"
          style={{
            top: meteor.top,
            left: meteor.left,
            animationDelay: meteor.animationDelay,
            animationDuration: meteor.animationDuration,
          }}
        >
          {/* Meteor Tail */}
          <div className="pointer-events-none absolute top-1/2 -z-10 h-[1px] w-[50px] -translate-y-1/2 bg-gradient-to-r from-red-500 to-transparent" />
        </span>
      ))}
    </>
  );
};
