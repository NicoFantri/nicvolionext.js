"use client"

import { useEffect, useState } from "react"

export function VisitorCounter() {
  const [total, setTotal] = useState<number | null>(null)
  const [today, setToday] = useState<number | null>(null)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/visit-stats')
        const data = await res.json()
        setTotal(data.totalUV || 0)
        setToday(data.dailyUV || 0)
      } catch (e) {
        setTotal(0)
        setToday(0)
      }
    }

    fetchStats()
  }, [])

  if (total === null || today === null) return null; // hide until loaded

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold tracking-wide backdrop-blur-sm transition-all hover:bg-emerald-500/20 cursor-default shadow-[0_0_10px_rgba(16,185,129,0.1)]" title="Today's Visitors">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
      </span>
      <span>+{today} Hari ini</span>
    </div>
  )
}
