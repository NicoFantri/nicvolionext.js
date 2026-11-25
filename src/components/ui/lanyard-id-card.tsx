"use client"

import React, { useRef, useState } from "react"
import { motion, useMotionValue, useTransform, useMotionValueEvent } from "framer-motion"

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
  const rotate = useTransform(x, [-80, 0, 80], [14, 0, -14])

  // Aligned to the white shirt collar edges (400 x 500 SVG coordinate space)
  const LEFT_ANCHOR_X = 168
  const RIGHT_ANCHOR_X = 232
  const ANCHOR_Y = 248
  const REST_CLIP_X = 200
  const REST_CLIP_Y = 342

  const updateStraps = () => {
    const el = containerRef.current
    if (!el) return
    const width = el.offsetWidth || 384
    const height = el.offsetHeight || 480
    const scaleX = 400 / width
    const scaleY = 500 / height

    const cx = REST_CLIP_X + x.get() * scaleX
    const cy = REST_CLIP_Y + y.get() * scaleY

    const leftCtrlX = (LEFT_ANCHOR_X + cx) / 2 - 2
    const leftCtrlY = (ANCHOR_Y + cy) / 2 + 4
    const rightCtrlX = (RIGHT_ANCHOR_X + cx) / 2 + 2
    const rightCtrlY = (ANCHOR_Y + cy) / 2 + 4

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
      {/* Compact Lanyard Straps draped neatly along white collar down to lower chest near tie */}
      <svg
        viewBox="0 0 400 500"
        className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
        aria-hidden="true"
      >
        <path
          ref={leftStrapRef}
          d={`M ${LEFT_ANCHOR_X} ${ANCHOR_Y} Q ${(LEFT_ANCHOR_X + REST_CLIP_X) / 2 - 2} ${(ANCHOR_Y + REST_CLIP_Y) / 2 + 4} ${REST_CLIP_X} ${REST_CLIP_Y}`}
          fill="none"
          stroke="#991b1b"
          strokeWidth="4.5"
          strokeLinecap="round"
        />
        <path
          ref={leftHighlightRef}
          d={`M ${LEFT_ANCHOR_X} ${ANCHOR_Y} Q ${(LEFT_ANCHOR_X + REST_CLIP_X) / 2 - 2} ${(ANCHOR_Y + REST_CLIP_Y) / 2 + 4} ${REST_CLIP_X} ${REST_CLIP_Y}`}
          fill="none"
          stroke="#ef4444"
          strokeWidth="1"
          strokeDasharray="2 4"
          strokeLinecap="round"
          opacity="0.7"
        />

        <path
          ref={rightStrapRef}
          d={`M ${RIGHT_ANCHOR_X} ${ANCHOR_Y} Q ${(RIGHT_ANCHOR_X + REST_CLIP_X) / 2 + 2} ${(ANCHOR_Y + REST_CLIP_Y) / 2 + 4} ${REST_CLIP_X} ${REST_CLIP_Y}`}
          fill="none"
          stroke="#991b1b"
          strokeWidth="4.5"
          strokeLinecap="round"
        />
        <path
          ref={rightHighlightRef}
          d={`M ${RIGHT_ANCHOR_X} ${ANCHOR_Y} Q ${(RIGHT_ANCHOR_X + REST_CLIP_X) / 2 + 2} ${(ANCHOR_Y + REST_CLIP_Y) / 2 + 4} ${REST_CLIP_X} ${REST_CLIP_Y}`}
          fill="none"
          stroke="#ef4444"
          strokeWidth="1"
          strokeDasharray="2 4"
          strokeLinecap="round"
          opacity="0.7"
        />
      </svg>

      {/* Miniature Draggable & Pressable ID Card at lower chest near tie */}
      <div className="absolute left-1/2 top-[68%] -translate-x-1/2 pointer-events-none">
        <motion.div
          style={{ x, y, rotate }}
          drag
          dragConstraints={{ left: -34, right: 34, top: -8, bottom: 16 }}
          dragElastic={0.18}
          dragSnapToOrigin
          dragTransition={{ bounceStiffness: 280, bounceDamping: 16 }}
          whileHover={{ scale: 1.05 }}
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
          {/* Compact Metal Clip */}
          <div className="flex flex-col items-center -mb-1 z-10">
            <div className="w-3 h-2 rounded-sm bg-zinc-400 dark:bg-zinc-500 border border-zinc-600" />
            <div className="w-2 h-2 bg-zinc-300 dark:bg-zinc-400 border border-zinc-600 rounded-b-sm" />
          </div>

          {/* 3D Flip Miniature Card */}
          <div className="[perspective:800px]">
            <motion.div
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
              style={{ transformStyle: "preserve-3d" }}
              className={`relative w-[78px] sm:w-[86px] h-[94px] sm:h-[102px] rounded-lg shadow-md transition-shadow ${
                isPressed ? "shadow-lg ring-1 ring-red-600/70" : ""
              }`}
            >
              {/* FRONT SIDE */}
              <div
                style={{ backfaceVisibility: "hidden" }}
                className="absolute inset-0 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 overflow-hidden flex flex-col justify-between"
              >
                {/* Top Slot Header */}
                <div className="bg-red-800 h-3.5 flex items-center justify-center shrink-0">
                  <div className="w-4 h-1 rounded-full bg-black/40" />
                </div>

                {/* Minimal Crisp Text */}
                <div className="px-1.5 py-1.5 flex flex-col items-center justify-center text-center gap-0.5 flex-1">
                  <p className="text-[9.5px] sm:text-[10.5px] font-extrabold text-zinc-900 dark:text-white leading-tight">
                    Nico Fantri
                  </p>
                  <p className="text-[7.5px] sm:text-[8px] font-semibold text-red-700 dark:text-red-400 leading-tight">
                    Software Engineer
                  </p>

                  {/* Status Active Pill */}
                  <div className="mt-1.5 inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[7px] font-bold text-emerald-700 dark:text-emerald-300 leading-none">
                      Active
                    </span>
                  </div>
                </div>
              </div>

              {/* BACK SIDE */}
              <div
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
                className="absolute inset-0 rounded-lg bg-zinc-900 dark:bg-zinc-950 text-white border border-zinc-700 overflow-hidden flex flex-col justify-between"
              >
                <div className="bg-red-800 h-3.5 flex items-center justify-center shrink-0">
                  <div className="w-4 h-1 rounded-full bg-black/40" />
                </div>

                <div className="px-1.5 py-1 flex flex-col items-center justify-center gap-1 flex-1">
                  <span className="text-[7px] font-mono font-bold tracking-wider text-zinc-300">
                    NICODE.SITE
                  </span>
                  <div className="p-1 bg-white rounded">
                    <svg viewBox="0 0 24 24" className="w-6 h-6 text-zinc-900" fill="currentColor">
                      <path d="M3 3h8v8H3V3zm2 2v4h4V5H5zm8-2h8v8h-8V3zm2 2v4h4V5h-4zM3 13h8v8H3v-8zm2 2v4h4v-4H5zm10-2h2v2h-2v-2zm4 0h2v2h-2v-2zm-2 2h2v2h-2v-2zm-2 2h2v2h-2v-2zm4 0h2v2h-2v-2zm-2 2h2v2h-2v-2zm2 0h2v2h-2v-2z" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
