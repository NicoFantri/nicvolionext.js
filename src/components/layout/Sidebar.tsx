'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { HomeIcon, FolderIcon, PencilIcon, UserIcon, MailIcon, GithubIcon, LinkedinIcon, TwitterIcon, BadgeCheck } from "lucide-react"
import { SealCheck } from '@phosphor-icons/react'

import avatarImage from '@/images/avatar.jpg'
import { name, headline } from '@/config/infoConfig'
import { navItems, footerItems } from '@/config/siteConfig'
import { ThemeToggle } from '@/components/shared/ThemeToggle'

const iconMap: Record<string, any> = {
  "Home": HomeIcon,
  "About": UserIcon,
  "Projects": FolderIcon,
  "Blogs": PencilIcon,
  "Friends": UserIcon,
  "Changelog": PencilIcon,
}

export function Sidebar() {
  let pathname = usePathname()

  const navLinks = footerItems;

  return (
    <aside className="hidden lg:flex w-64 flex-col h-full border-r border-muted/50 bg-background/80 backdrop-blur-xl px-6 py-8 overflow-y-auto z-50 flex-shrink-0">
      <div className="flex flex-col items-start gap-5">
        <div className="relative group cursor-pointer">
          <Image
            src={avatarImage}
            alt={name}
            width={80}
            height={80}
            className="relative rounded-full aspect-square w-20 h-20 bg-zinc-100 object-cover dark:bg-zinc-800 ring-2 ring-background shadow-lg transition duration-500 group-hover:scale-105"
            priority
          />
        </div>
        
        <div className="flex flex-col">
          <h2 className="text-xl font-bold tracking-tight text-red-700">
            {name}
          </h2>
          <p className="text-sm text-muted-foreground font-medium flex items-center gap-1">
            @nicofantri
            <SealCheck weight="fill" className="w-[18px] h-[18px] text-blue-500" />
          </p>
        </div>
        
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 tracking-wide">Open for collabs</span>
        </div>
      </div>

      <nav className="mt-10 flex flex-col gap-1.5 flex-1">
        {navLinks.map((item) => {
          const Icon = iconMap[item.name] || HomeIcon
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
          
          return (
            <Link
              key={item.name}
              href={item.href}
              prefetch={true}
              className={clsx(
                "group flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-300 text-sm font-medium",
                isActive 
                  ? "bg-foreground/5 text-foreground shadow-sm ring-1 ring-foreground/10" 
                  : "text-muted-foreground hover:text-foreground hover:bg-foreground/5 hover:translate-x-1"
              )}
            >
              <Icon className={clsx("size-4 transition-transform duration-300", isActive ? "scale-110" : "group-hover:scale-110")} />
              {item.name}
            </Link>
          )
        })}
      </nav>

      <div className="mt-auto pt-8 flex items-center justify-between border-t border-muted/50">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Theme</span>
        <ThemeToggle />
      </div>
    </aside>
  )
}
