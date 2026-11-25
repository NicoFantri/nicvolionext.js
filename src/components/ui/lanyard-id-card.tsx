"use client"

import React, { useRef, useState } from "react"
import { motion, useMotionValue, useTransform, useMotionValueEvent } from "framer-motion"

export function LanyardIDCard() {
  const containerRef = useRef<HTMLDivElement>(null)
  const leftShadowRef = useRef<SVGPathElement>(null)
  const rightShadowRef = useRef<SVGPathElement>(null)
  const leftStrapRef = useRef<SVGPathElement>(null)
  const rightStrapRef = useRef<SVGPathElement>(null)
  const didDragRef = useRef(false)

  const [isFlipped, setIsFlipped] = useState(false)
  const [isPressed, setIsPressed] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotate = useTransform(x, [-70, 0, 70], [14, 0, -14])

  // Natural collar wrap anchors (400 x 500 SVG space)
  const LEFT_ANCHOR_X = 149
  const RIGHT_ANCHOR_X = 251
  const ANCHOR_Y = 228
  const REST_CLIP_X = 200
  const REST_CLIP_Y = 334

  const buildPaths = (cx: number, cy: number) => {
    const dx = cx - REST_CLIP_X
    const leftPath = `M ${LEFT_ANCHOR_X} ${ANCHOR_Y} C 143 262, ${168 + dx * 0.4} ${300 + (cy - REST_CLIP_Y) * 0.4}, ${cx} ${cy}`
    const rightPath = `M ${RIGHT_ANCHOR_X} ${ANCHOR_Y} C 257 262, ${232 + dx * 0.4} ${300 + (cy - REST_CLIP_Y) * 0.4}, ${cx} ${cy}`
    return { leftPath, rightPath }
  }

  const updateStraps = () => {
    const el = containerRef.current
    if (!el) return
    const width = el.offsetWidth || 384
    const height = el.offsetHeight || 480
    const scaleX = 400 / width
    const scaleY = 500 / height

    const cx = REST_CLIP_X + x.get() * scaleX
    const cy = REST_CLIP_Y + y.get() * scaleY

    const { leftPath, rightPath } = buildPaths(cx, cy)

    leftShadowRef.current?.setAttribute("d", leftPath)
    rightShadowRef.current?.setAttribute("d", rightPath)
    leftStrapRef.current?.setAttribute("d", leftPath)
    rightStrapRef.current?.setAttribute("d", rightPath)
  }

  useMotionValueEvent(x, "change", updateStraps)
  useMotionValueEvent(y, "change", updateStraps)

  const handleCardClick = () => {
    if (!didDragRef.current) {
      setIsFlipped((prev) => !prev)
    }
  }

  const initialPaths = buildPaths(REST_CLIP_X, REST_CLIP_Y)

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-20 overflow-visible select-none"
    >
      {/* Natural Curved Lanyard Straps wrapping around suit collar down to lower chest */}
      <svg
        viewBox="0 0 400 500"
        className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
        style={{
          maskImage: "linear-gradient(to bottom, transparent 45%, black 49%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 45%, black 49%)",
        }}
        aria-hidden="true"
      >
        {/* Subtle outer strap shadow / trim */}
        <path
          ref={leftShadowRef}
          d={initialPaths.leftPath}
          fill="none"
          stroke="#450a0a"
          strokeWidth="5.2"
          strokeLinecap="butt"
        />
        <path
          ref={rightShadowRef}
          d={initialPaths.rightPath}
          fill="none"
          stroke="#450a0a"
          strokeWidth="5.2"
          strokeLinecap="butt"
        />

        {/* Matte crimson woven lanyard ribbon */}
        <path
          ref={leftStrapRef}
          d={initialPaths.leftPath}
          fill="none"
          stroke="#991b1b"
          strokeWidth="3.6"
          strokeLinecap="butt"
        />
        <path
          ref={rightStrapRef}
          d={initialPaths.rightPath}
          fill="none"
          stroke="#991b1b"
          strokeWidth="3.6"
          strokeLinecap="butt"
        />
      </svg>

      {/* Miniature Interactive ID Card positioned at lower chest near tie */}
      <div className="absolute left-1/2 top-[66.5%] -translate-x-1/2 pointer-events-none">
        <motion.div
          style={{ x, y, rotate }}
          drag
          dragConstraints={{ left: -30, right: 30, top: -8, bottom: 14 }}
          dragElastic={0.16}
          dragSnapToOrigin
          dragTransition={{ bounceStiffness: 290, bounceDamping: 16 }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          onPointerDown={(e) => {
            e.stopPropagation()
            didDragRef.current = false
            setIsPressed(true)
          }}
          onPointerUp={() => setIsPressed(false)}
          onPointerCancel={() => setIsPressed(false)}
          onDragStart={() => {
            didDragRef.current = true
          }}
          onDragEnd={() => {
            setIsPressed(false)
            setTimeout(() => {
              didDragRef.current = false
            }, 60)
          }}
          onClick={(e) => {
            e.stopPropagation()
            handleCardClick()
          }}
          className="relative pointer-events-auto touch-none cursor-grab active:cursor-grabbing flex flex-col items-center"
          title="Tarik atau tekan ID Card"
        >
          {/* Slim Metallic Clasp */}
          <div className="flex flex-col items-center -mb-1 z-10">
            <div className="w-2.5 h-1.5 rounded-sm bg-zinc-400 dark:bg-zinc-500 border border-zinc-600" />
            <div className="w-1.5 h-2 bg-zinc-300 dark:bg-zinc-400 border border-zinc-600 rounded-b-sm" />
          </div>

          {/* 3D Flip Miniature Card */}
          <div className="[perspective:800px]">
            <motion.div
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
              style={{ transformStyle: "preserve-3d" }}
              className={`relative w-[68px] sm:w-[74px] h-[88px] sm:h-[96px] rounded-md shadow-lg transition-shadow ${
                isPressed ? "shadow-xl ring-1 ring-red-600/70" : ""
              }`}
            >
              {/* FRONT SIDE */}
              <div
                style={{ backfaceVisibility: "hidden" }}
                className="absolute inset-0 rounded-md bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 overflow-hidden flex flex-col justify-between"
              >
                {/* Top Slot Accent Header */}
                <div className="bg-red-800 px-1.5 py-1 flex items-center justify-between shrink-0">
                  <span className="text-[4.5px] sm:text-[5px] font-bold tracking-widest text-red-100">
                    NICODE
                  </span>
                  <div className="w-2.5 h-0.5 rounded-full bg-black/40" />
                  <span className="text-[4.5px] sm:text-[5px] font-mono text-red-200">
                    DEV
                  </span>
                </div>

                {/* Portrait & Identity */}
                <div className="px-1 py-1 flex flex-col items-center justify-center text-center flex-1">
                  <img
                    src="/images/profil.jpeg"
                    alt="Nico Fantri"
                    className="w-6 h-6 sm:w-7 sm:h-7 rounded-full object-cover border border-red-700/70 shadow-sm mb-1"
                  />
                  <p className="text-[8px] sm:text-[8.5px] font-extrabold text-zinc-900 dark:text-white leading-none tracking-tight">
                    Nico Fantri
                  </p>
                  <p className="text-[5.5px] sm:text-[6px] font-semibold text-red-700 dark:text-red-400 leading-tight mt-0.5">
                    Software Engineer
                  </p>
                </div>

                {/* Bottom Status Bar */}
                <div className="px-1.5 py-0.5 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 flex items-center justify-between shrink-0">
                  <div className="inline-flex items-center gap-0.5">
                    <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[5.5px] sm:text-[6px] font-bold text-emerald-700 dark:text-emerald-400 leading-none">
                      Active
                    </span>
                  </div>
                  <div className="flex items-center gap-[1px] h-1.5" aria-hidden="true">
                    <span className="w-[1px] h-full bg-zinc-700 dark:bg-zinc-400" />
                    <span className="w-[0.5px] h-full bg-zinc-400" />
                    <span className="w-[1.5px] h-full bg-zinc-700 dark:bg-zinc-400" />
                    <span className="w-[1px] h-full bg-zinc-700 dark:bg-zinc-400" />
                  </div>
                </div>
              </div>

              {/* BACK SIDE */}
              <div
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
                className="absolute inset-0 rounded-md bg-zinc-900 dark:bg-zinc-950 text-white border border-zinc-700 overflow-hidden flex flex-col justify-between"
              >
                <div className="bg-red-800 py-1 flex items-center justify-center shrink-0">
                  <span className="text-[5px] font-bold tracking-widest text-red-100">
                    NICODE.SITE
                  </span>
                </div>

                <div className="p-1 flex flex-col items-center justify-center flex-1">
                  <div className="p-1 bg-white rounded-sm">
                    <svg viewBox="0 0 24 24" className="w-6 h-6 text-zinc-900" fill="currentColor">
                      <path d="M3 3h8v8H3V3zm2 2v4h4V5H5zm8-2h8v8h-8V3zm2 2v4h4V5h-4zM3 13h8v8H3v-8zm2 2v4h4v-4H5zm10-2h2v2h-2v-2zm4 0h2v2h-2v-2zm-2 2h2v2h-2v-2zm-2 2h2v2h-2v-2zm4 0h2v2h-2v-2zm-2 2h2v2h-2v-2zm2 0h2v2h-2v-2z" />
                    </svg>
                  </div>
                </div>

                <div className="px-1.5 py-0.5 bg-zinc-950 border-t border-zinc-800 text-center">
                  <span className="text-[5px] text-zinc-400 font-mono">
                    ID-2026
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
