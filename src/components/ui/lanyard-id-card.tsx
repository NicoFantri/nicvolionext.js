"use client"

import React, { useRef, useState } from "react"
import { motion, useMotionValue, useTransform, useMotionValueEvent } from "framer-motion"
import { SealCheck } from "@phosphor-icons/react"

export function LanyardIDCard() {
  const containerRef = useRef<HTMLDivElement>(null)
  const leftStrapRef = useRef<SVGPathElement>(null)
  const rightStrapRef = useRef<SVGPathElement>(null)
  const leftHighlightRef = useRef<SVGPathElement>(null)
  const rightHighlightRef = useRef<SVGPathElement>(null)
  const didDragRef = useRef(false)

  const [isFlipped, setIsFlipped] = useState(false)
  const [isPressed, setIsPressed] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotate = useTransform(x, [-160, 0, 160], [16, 0, -16])

  // Collar anchors and rest clip coordinates inside SVG viewBox (400 x 500)
  const LEFT_ANCHOR_X = 152
  const RIGHT_ANCHOR_X = 248
  const ANCHOR_Y = 224
  const REST_CLIP_X = 200
  const REST_CLIP_Y = 290

  const updateStraps = () => {
    const el = containerRef.current
    if (!el) return
    const width = el.offsetWidth || 384
    const height = el.offsetHeight || 480
    const scaleX = 400 / width
    const scaleY = 500 / height

    const cx = REST_CLIP_X + x.get() * scaleX
    const cy = REST_CLIP_Y + y.get() * scaleY

    const leftCtrlX = (LEFT_ANCHOR_X + cx) / 2 - 4
    const leftCtrlY = (ANCHOR_Y + cy) / 2 + 8
    const rightCtrlX = (RIGHT_ANCHOR_X + cx) / 2 + 4
    const rightCtrlY = (ANCHOR_Y + cy) / 2 + 8

    const leftPath = `M ${LEFT_ANCHOR_X} ${ANCHOR_Y} Q ${leftCtrlX} ${leftCtrlY} ${cx} ${cy}`
    const rightPath = `M ${RIGHT_ANCHOR_X} ${ANCHOR_Y} Q ${rightCtrlX} ${rightCtrlY} ${cx} ${cy}`

    leftStrapRef.current?.setAttribute("d", leftPath)
    rightStrapRef.current?.setAttribute("d", rightPath)
    leftHighlightRef.current?.setAttribute("d", leftPath)
    rightHighlightRef.current?.setAttribute("d", rightPath)
  }

  useMotionValueEvent(x, "change", updateStraps)
  useMotionValueEvent(y, "change", updateStraps)

  const handleCardClick = () => {
    if (!didDragRef.current) {
      setIsFlipped((prev) => !prev)
    }
  }

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-20 overflow-visible select-none"
    >
      {/* Dynamic Lanyard Straps draped from suit collar to ID card clip */}
      <svg
        viewBox="0 0 400 500"
        className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
        aria-hidden="true"
      >
        {/* Left & Right Woven Crimson Straps */}
        <path
          ref={leftStrapRef}
          d={`M ${LEFT_ANCHOR_X} ${ANCHOR_Y} Q ${(LEFT_ANCHOR_X + REST_CLIP_X) / 2 - 4} ${(ANCHOR_Y + REST_CLIP_Y) / 2 + 8} ${REST_CLIP_X} ${REST_CLIP_Y}`}
          fill="none"
          stroke="#991b1b"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <path
          ref={leftHighlightRef}
          d={`M ${LEFT_ANCHOR_X} ${ANCHOR_Y} Q ${(LEFT_ANCHOR_X + REST_CLIP_X) / 2 - 4} ${(ANCHOR_Y + REST_CLIP_Y) / 2 + 8} ${REST_CLIP_X} ${REST_CLIP_Y}`}
          fill="none"
          stroke="#ef4444"
          strokeWidth="1.5"
          strokeDasharray="3 5"
          strokeLinecap="round"
          opacity="0.7"
        />

        <path
          ref={rightStrapRef}
          d={`M ${RIGHT_ANCHOR_X} ${ANCHOR_Y} Q ${(RIGHT_ANCHOR_X + REST_CLIP_X) / 2 + 4} ${(ANCHOR_Y + REST_CLIP_Y) / 2 + 8} ${REST_CLIP_X} ${REST_CLIP_Y}`}
          fill="none"
          stroke="#991b1b"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <path
          ref={rightHighlightRef}
          d={`M ${RIGHT_ANCHOR_X} ${ANCHOR_Y} Q ${(RIGHT_ANCHOR_X + REST_CLIP_X) / 2 + 4} ${(ANCHOR_Y + REST_CLIP_Y) / 2 + 8} ${REST_CLIP_X} ${REST_CLIP_Y}`}
          fill="none"
          stroke="#ef4444"
          strokeWidth="1.5"
          strokeDasharray="3 5"
          strokeLinecap="round"
          opacity="0.7"
        />
      </svg>

      {/* Interactive Draggable & Pressable ID Card anchored at chest */}
      <div className="absolute left-1/2 top-[57%] -translate-x-1/2 pointer-events-none">
        <motion.div
          style={{ x, y, rotate }}
          drag
          dragSnapToOrigin
          dragElastic={0.45}
          dragTransition={{ bounceStiffness: 260, bounceDamping: 14 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
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
          {/* Metallic Clasp & Ring connecting Lanyard to ID Card */}
          <div className="flex flex-col items-center -mb-1.5 z-10">
            <div className="w-4 h-2.5 rounded-sm bg-zinc-400 dark:bg-zinc-500 border border-zinc-600 shadow-sm" />
            <div className="w-2.5 h-3 bg-zinc-300 dark:bg-zinc-400 border border-zinc-600 rounded-b-sm" />
          </div>

          {/* 3D Flip Container */}
          <div className="[perspective:900px]">
            <motion.div
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              style={{ transformStyle: "preserve-3d" }}
              className={`relative w-[132px] sm:w-[144px] h-[180px] sm:h-[194px] rounded-xl shadow-xl transition-shadow ${
                isPressed ? "shadow-2xl ring-2 ring-red-600/60" : ""
              }`}
            >
              {/* FRONT SIDE */}
              <div
                style={{ backfaceVisibility: "hidden" }}
                className="absolute inset-0 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 overflow-hidden flex flex-col justify-between"
              >
                {/* Top Punch Slot & Crimson Header */}
                <div className="bg-red-800 px-2.5 pt-2 pb-2 text-white flex flex-col items-center gap-1">
                  <div className="w-6 h-1 rounded-full bg-black/40" />
                  <div className="w-full flex items-center justify-between text-[9px] font-bold tracking-wider">
                    <span>NICODE.SITE</span>
                    <span className="px-1 py-0.2 bg-black/30 rounded text-[8px] font-mono">
                      DEV
                    </span>
                  </div>
                </div>

                {/* Front Body */}
                <div className="px-2.5 py-2 flex flex-col gap-1.5 flex-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <img
                        src="/images/profil.jpeg"
                        alt="Nico"
                        className="w-7 h-7 rounded-full object-cover border border-zinc-300 dark:border-zinc-700"
                      />
                      <SealCheck weight="fill" className="w-3.5 h-3.5 text-blue-500 -ml-2 mt-4 bg-white dark:bg-zinc-900 rounded-full" />
                    </div>
                    <div className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800/60">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[8px] font-semibold text-emerald-700 dark:text-emerald-300">
                        ACTIVE
                      </span>
                    </div>
                  </div>

                  <div className="mt-0.5">
                    <p className="text-xs font-extrabold text-zinc-900 dark:text-white leading-tight">
                      Nico Fantri
                    </p>
                    <p className="text-[10px] font-semibold text-red-700 dark:text-red-400 leading-tight mt-0.5">
                      Software Engineer
                    </p>
                    <p className="text-[9px] text-zinc-500 dark:text-zinc-400 font-mono mt-0.5">
                      @nicofantri
                    </p>
                  </div>

                  {/* Mini Stack Badges */}
                  <div className="flex flex-wrap gap-1 mt-auto pt-1">
                    <span className="px-1.5 py-0.5 text-[8px] font-medium rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
                      Flutter
                    </span>
                    <span className="px-1.5 py-0.5 text-[8px] font-medium rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
                      Golang
                    </span>
                    <span className="px-1.5 py-0.5 text-[8px] font-medium rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
                      React
                    </span>
                  </div>
                </div>

                {/* Bottom Barcode Strip */}
                <div className="px-2.5 py-1.5 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 flex items-center justify-between">
                  <div className="flex items-center gap-[1.5px] h-2.5" aria-hidden="true">
                    <span className="w-[1.5px] h-full bg-zinc-800 dark:bg-zinc-300" />
                    <span className="w-[1px] h-full bg-zinc-500" />
                    <span className="w-[2px] h-full bg-zinc-800 dark:bg-zinc-300" />
                    <span className="w-[1px] h-full bg-zinc-800 dark:bg-zinc-300" />
                    <span className="w-[1.5px] h-full bg-zinc-500" />
                    <span className="w-[2px] h-full bg-zinc-800 dark:bg-zinc-300" />
                    <span className="w-[1px] h-full bg-zinc-800 dark:bg-zinc-300" />
                    <span className="w-[1.5px] h-full bg-zinc-500" />
                  </div>
                  <span className="text-[8px] font-mono text-zinc-500 dark:text-zinc-400">
                    ID-2026
                  </span>
                </div>
              </div>

              {/* BACK SIDE */}
              <div
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
                className="absolute inset-0 rounded-xl bg-zinc-900 dark:bg-zinc-950 text-white border border-zinc-700 overflow-hidden flex flex-col justify-between"
              >
                <div className="bg-red-800 px-2.5 pt-2 pb-1.5 flex flex-col items-center gap-1">
                  <div className="w-6 h-1 rounded-full bg-black/40" />
                  <span className="text-[9px] font-bold tracking-wider">
                    VERIFIED PASS
                  </span>
                </div>

                <div className="px-2.5 py-2 flex flex-col gap-1.5 text-[9px]">
                  <div className="flex justify-between border-b border-zinc-800 pb-1">
                    <span className="text-zinc-400">Web</span>
                    <span className="font-mono text-zinc-200">nicode.site</span>
                  </div>
                  <div className="flex justify-between border-b border-zinc-800 pb-1">
                    <span className="text-zinc-400">Studio</span>
                    <span className="font-mono text-zinc-200">maycolab.site</span>
                  </div>
                  <div className="flex justify-between border-b border-zinc-800 pb-1">
                    <span className="text-zinc-400">Focus</span>
                    <span className="text-zinc-200 font-medium">Mobile & Web</span>
                  </div>

                  {/* Mini QR-style emblem */}
                  <div className="mx-auto mt-1 p-1.5 bg-white rounded-md">
                    <svg viewBox="0 0 24 24" className="w-8 h-8 text-zinc-900" fill="currentColor">
                      <path d="M3 3h8v8H3V3zm2 2v4h4V5H5zm8-2h8v8h-8V3zm2 2v4h4V5h-4zM3 13h8v8H3v-8zm2 2v4h4v-4H5zm10-2h2v2h-2v-2zm4 0h2v2h-2v-2zm-2 2h2v2h-2v-2zm-2 2h2v2h-2v-2zm4 0h2v2h-2v-2zm-2 2h2v2h-2v-2zm2 0h2v2h-2v-2z" />
                    </svg>
                  </div>
                </div>

                <div className="px-2 py-1.5 bg-zinc-950 border-t border-zinc-800 text-center">
                  <span className="text-[8px] text-zinc-400 font-mono">
                    Drag · Tap to flip
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
