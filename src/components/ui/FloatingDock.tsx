"use client"

import React, { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  HomeIcon, FolderIcon, UserIcon, BriefcaseIcon, 
  UsersIcon, BadgeCheck, SettingsIcon, MoreHorizontalIcon, XIcon,
  GithubIcon, MailIcon, LinkedinIcon, GraduationCap, ActivityIcon
} from "lucide-react"
import { cn } from "@/lib/utils"
import { footerItems } from '@/config/siteConfig'

// Icon mapping - matches sidebar icons
const iconMap: Record<string, any> = {
  "Home": HomeIcon,
  "About": UserIcon,
  "Projects": FolderIcon,
  "Experience": GraduationCap,
  "Friends": UsersIcon,
  "Activity": ActivityIcon,
  "Pengaturan": SettingsIcon,
  "Jasa & Layanan": BriefcaseIcon,
}

// Primary nav items shown directly in bottom bar (max 3-4 for perfect mobile fit)
const PRIMARY_NAV_NAMES = ["Home", "About", "Projects"]

interface FloatingDockProps {
  topOffset?: number
  iconSize?: number
  iconMagnification?: number
}

export function FloatingDock({ 
  topOffset = 8,
  iconSize = 28, 
  iconMagnification = 44 
}: FloatingDockProps) {
  const pathname = usePathname()
  const [isMoreOpen, setIsMoreOpen] = useState(false)

  const primaryItems = footerItems.filter(item => PRIMARY_NAV_NAMES.includes(item.name))
  const moreItems = footerItems.filter(item => !PRIMARY_NAV_NAMES.includes(item.name))

  // Check if any "more" item is currently active
  const isMoreActive = moreItems.some(
    item => pathname ? (pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))) : false
  )

  // Close more menu on route change
  useEffect(() => {
    setIsMoreOpen(false)
  }, [pathname])

  // Lock body scroll when more menu is open
  useEffect(() => {
    if (isMoreOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMoreOpen])

  // Close more menu on click outside
  const handleBackdropClick = useCallback(() => {
    setIsMoreOpen(false)
  }, [])

  return (
    <>
      {/* Backdrop overlay when more menu is open */}
      {isMoreOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-[99] bg-black/40 backdrop-blur-sm transition-opacity duration-300"
          onClick={handleBackdropClick}
        />
      )}

      {/* More menu popup */}
      <div 
        className={cn(
          "lg:hidden fixed bottom-[72px] left-3 right-3 z-[101] transition-all duration-300 ease-out",
          isMoreOpen 
            ? "opacity-100 translate-y-0 pointer-events-auto" 
            : "opacity-0 translate-y-4 pointer-events-none"
        )}
      >
        <div className="bg-background/95 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl shadow-black/20 overflow-hidden">
          {/* Menu header */}
          <div className="flex items-center justify-between px-5 pt-4 pb-2">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">More</span>
            <button 
              onClick={() => setIsMoreOpen(false)}
              className="p-1 rounded-full hover:bg-muted transition-colors"
            >
              <XIcon className="size-4 text-muted-foreground" />
            </button>
          </div>

          {/* Nav items */}
          <div className="px-3 pb-3 space-y-0.5">
            {moreItems.map((item) => {
              const Icon = iconMap[item.name] || HomeIcon
              const isActive = pathname ? (pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))) : false

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  prefetch={true}
                  onClick={() => setIsMoreOpen(false)}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-200 text-sm font-medium",
                    isActive 
                      ? "bg-primary/10 text-primary" 
                      : "text-foreground/80 hover:bg-muted active:scale-[0.98]"
                  )}
                >
                  <div className={cn(
                    "flex items-center justify-center size-8 rounded-lg transition-colors",
                    isActive ? "bg-primary/15" : "bg-muted"
                  )}>
                    <Icon className="size-[16px]" />
                  </div>
                  <span>{item.name}</span>
                  {isActive && (
                    <div className="ml-auto size-1.5 rounded-full bg-primary" />
                  )}
                </Link>
              )
            })}
          </div>

          {/* Social links section */}
          <div className="border-t border-border/50 px-4 py-2">
            <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Social</span>
            <div className="flex items-center gap-2 mt-2">
              <Link
                href="https://github.com/nicofantri"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex items-center justify-center size-8 rounded-lg bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
              >
                <GithubIcon className="size-4" />
              </Link>
              <Link
                href="mailto:nicofantrimayharis@gmail.com"
                aria-label="Email"
                className="flex items-center justify-center size-8 rounded-lg bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
              >
                <MailIcon className="size-4" />
              </Link>
              <Link
                href="https://www.tiktok.com/@nicmobiledev?is_from_webapp=1&sender_device=pc"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="flex items-center justify-center size-8 rounded-lg bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-4"
                >
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
              </Link>
              <Link
                href="https://linkedin.com/in/nicofantrim06"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex items-center justify-center size-8 rounded-lg bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
              >
                <LinkedinIcon className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[100] pb-safe w-full max-w-full overflow-hidden">
        {/* Gradient fade effect above the bar */}
        <div className="absolute -top-6 left-0 right-0 h-6 bg-gradient-to-t from-background/80 to-transparent pointer-events-none" />
        
        <div className="w-full bg-background/90 backdrop-blur-xl border-t border-border/50 overflow-hidden">
          <div className="flex justify-around items-center px-2 py-1.5 w-full">
            {primaryItems.map((item) => {
              const Icon = iconMap[item.name] || HomeIcon
              const isActive = pathname ? (pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))) : false

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  prefetch={true}
                  className={cn(
                    "relative flex flex-col flex-1 items-center gap-0.5 min-w-0 px-1 py-2 rounded-xl transition-all duration-200 active:scale-95",
                    isActive 
                      ? "text-primary" 
                      : "text-muted-foreground"
                  )}
                >
                  {/* Active indicator dot */}
                  {isActive && (
                    <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-5 h-0.5 rounded-full bg-primary" />
                  )}
                  <Icon className={cn(
                    "size-[22px] transition-transform duration-200",
                    isActive && "scale-110"
                  )} />
                  <span className={cn(
                    "text-[10px] leading-tight font-medium transition-colors",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}>
                    {item.name}
                  </span>
                </Link>
              )
            })}

            {/* More button */}
            {moreItems.length > 0 && (
              <button
                onClick={() => setIsMoreOpen(!isMoreOpen)}
                className={cn(
                  "relative flex flex-col flex-1 items-center gap-0.5 min-w-0 px-1 py-2 rounded-xl transition-all duration-200 active:scale-95",
                  (isMoreOpen || isMoreActive)
                    ? "text-primary" 
                    : "text-muted-foreground"
                )}
              >
                {isMoreActive && !isMoreOpen && (
                  <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-5 h-0.5 rounded-full bg-primary" />
                )}
                <div className={cn(
                  "transition-transform duration-300",
                  isMoreOpen && "rotate-90"
                )}>
                  {isMoreOpen 
                    ? <XIcon className="size-[22px]" />
                    : <MoreHorizontalIcon className="size-[22px]" />
                  }
                </div>
                <span className={cn(
                  "text-[10px] leading-tight font-medium transition-colors",
                  (isMoreOpen || isMoreActive) ? "text-primary" : "text-muted-foreground"
                )}>
                  More
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}