"use client"

import React, { useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface XRayRevealProps {
  baseImage: string
  revealImage: string
  className?: string
  radius?: number
  enable3D?: boolean
}

export function XRayReveal({
  baseImage,
  revealImage,
  className,
  radius = 150,
  enable3D = false,
}: XRayRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }
  }

  // Calculate 3D Tilt values
  const width = containerRef.current?.offsetWidth || 1
  const height = containerRef.current?.offsetHeight || 1
  const rotateY = isHovering && enable3D ? ((mousePosition.x / width) - 0.5) * 18 : 0
  const rotateX = isHovering && enable3D ? ((mousePosition.y / height) - 0.5) * -18 : 0

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full max-w-sm mx-auto aspect-[4/5] cursor-crosshair transition-transform duration-200 ease-out",
        className
      )}
      style={{
        transform: enable3D
          ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${isHovering ? 1.03 : 1})`
          : 'none',
        transformStyle: enable3D ? 'preserve-3d' : 'flat',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Base Layer — crisp without drop-shadow blur halo or fade gradient */}
      <img
        src={baseImage}
        alt="Nico Fantri"
        className="w-full h-full object-cover object-top block pointer-events-none select-none"
      />

      {/* Reveal Layer (X-Ray) with Mouse Clip Mask */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-200"
        style={{
          opacity: isHovering ? 1 : 0,
          maskImage: `radial-gradient(${radius}px circle at ${mousePosition.x}px ${mousePosition.y}px, black 55%, transparent 100%)`,
          WebkitMaskImage: `radial-gradient(${radius}px circle at ${mousePosition.x}px ${mousePosition.y}px, black 55%, transparent 100%)`,
        }}
      >
        <img
          src={revealImage}
          alt="Nico Fantri X-Ray"
          className="w-full h-full object-cover object-top block pointer-events-none select-none absolute inset-0"
        />
      </div>
    </div>
  )
}
