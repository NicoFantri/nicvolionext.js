"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { HomeIcon, FolderIcon, PencilIcon, UserIcon, MailIcon, GithubIcon, LinkedinIcon, TwitterIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Dock, DockIcon } from "@/components/ui/dock"
import { navItems } from '@/config/siteConfig'

export type IconProps = React.HTMLAttributes<SVGElement>

// Icon mapping untuk navItems - sesuaikan dengan nama di siteConfig
const iconMap: Record<string, any> = {
  "Home": HomeIcon,
  "About": UserIcon,
  "Projects": FolderIcon,
  "Blogs": PencilIcon,
  "Friends": UserIcon,
  "Changelog": PencilIcon,
}

// Social icons
const Icons = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  twitter: TwitterIcon,
  email: MailIcon,
}

// GANTI URL SOCIAL MEDIA ANDA DI SINI
const SOCIAL_DATA = {
  GitHub: {
    name: "GitHub",
    url: "https://github.com/nicofantri",
    icon: Icons.github,
  },
  LinkedIn: {
    name: "LinkedIn", 
    url: "https://www.linkedin.com/in/nicofantrim06",
    icon: Icons.linkedin,
  },

  Email: {
    name: "Send Email",
    url: "mailto:your.email@example.com",
    icon: Icons.email,
  },
}

interface FloatingDockProps {
  topOffset?: number // dalam pixel, default 8
  iconSize?: number // default 28
  iconMagnification?: number // default 44
}

export function FloatingDock({ 
  topOffset = 8,
  iconSize = 28, 
  iconMagnification = 44 
}: FloatingDockProps) {
  const pathname = usePathname()

  return (
    <>
      {/* Desktop Version - Top, Non-sticky */}
      <div 
        className="hidden md:block absolute left-1/2 -translate-x-1/2 z-[100]"
        style={{ top: `${topOffset}px` }}
      >
        <TooltipProvider>
          <Dock 
            direction="middle"
            iconSize={iconSize}
            iconMagnification={iconMagnification}
          >
            {navItems.map((item) => {
              const Icon = iconMap[item.name] || HomeIcon
              const isActive = pathname === item.href
              
              return (
                <DockIcon key={item.name}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href={item.href}
                        aria-label={item.name}
                        className={cn(
                          buttonVariants({ variant: "ghost", size: "icon" }),
                          "size-11 rounded-full transition-all hover:scale-110",
                          isActive && "bg-primary/10 text-primary hover:bg-primary/20"
                        )}
                      >
                        <Icon className="size-4" />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{item.name}</p>
                    </TooltipContent>
                  </Tooltip>
                </DockIcon>
              )
            })}
            <Separator orientation="vertical" className="h-7 mx-1" />
            {Object.entries(SOCIAL_DATA).map(([name, social]) => (
              <DockIcon key={name}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      className={cn(
                        buttonVariants({ variant: "ghost", size: "icon" }),
                        "size-11 rounded-full transition-all hover:scale-110"
                      )}
                    >
                      <social.icon className="size-4" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{name}</p>
                  </TooltipContent>
                </Tooltip>
              </DockIcon>
            ))}
          </Dock>
        </TooltipProvider>
      </div>

      {/* Mobile Version - Bottom Fixed Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-[100] bg-background/80 backdrop-blur-lg border-t border-border pb-safe">
        <div className="flex justify-around items-center px-2 py-3">
          {navItems.map((item) => {
            const Icon = iconMap[item.name] || HomeIcon
            const isActive = pathname === item.href
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all",
                  isActive 
                    ? "text-primary bg-primary/10" 
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                <Icon className="size-5" />
                <span className="text-[10px] font-medium">{item.name}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </>
  )
}