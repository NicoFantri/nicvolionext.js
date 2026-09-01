'use client'

import { Fragment, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { GithubIcon, MailIcon, LinkedinIcon } from 'lucide-react'
import { SealCheck } from '@phosphor-icons/react'

import { Container } from '@/components/layout/Container'
import avatarImage from '@/images/avatar.jpg'
import { ThemeToggle } from '@/components/shared/ThemeToggle'
import { GithubRepo } from '@/components/shared/GithubRepo'
import { MusicPlayer } from '@/components/shared/MusicPlayer'
import { name } from '@/config/infoConfig'


import TypingAnimation from "@/components/ui/typing-animation";

function clamp(number: number, a: number, b: number) {
  let min = Math.min(a, b)
  let max = Math.max(a, b)
  return Math.min(Math.max(number, min), max)
}

function AvatarContainer({
  showName = false,
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'> & {
  showName?: boolean
}) {
  return (
    <div className='flex flex-row items-center gap-2'>
      <div
        className={clsx(
          className,
          'h-10 w-10 rounded-full bg-white/90 p-0.5 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:ring-white/10',
        )}
        {...props}
      />
      {showName && (
        <Link
          href="/"
          aria-label="Home"
          prefetch={true}
          className='pointer-events-auto'
        >
          <div className="text-md font-semibold capitalize flex items-center gap-1">
            {name}
            <SealCheck weight="fill" className="w-[16px] h-[16px] text-blue-500" />
          </div>
        </Link>
      )}
    </div>
  )
}

function Avatar({
  large = false,
  className,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof Link>, 'href'> & {
  large?: boolean
}) {
  return (
    <Link
      href="/"
      aria-label="Home"
      prefetch={true}
      className={clsx(className, 'pointer-events-auto')}
      {...props}
    >
      <Image
        src="/images/profil.jpeg"
        alt=""
        width={64}
        height={64}
        sizes={large ? '4rem' : '2.25rem'}
        className={clsx(
          'rounded-full bg-zinc-100 object-cover dark:bg-zinc-800',
          large ? 'h-16 w-16' : 'h-9 w-9',
        )}
        priority
      />
    </Link>
  )
}

export function Header() {
  let headerRef = useRef<React.ElementRef<'div'>>(null)

  return (
    <>
      <header
        className="pointer-events-none relative z-50 flex flex-none flex-col lg:hidden"
      >
        <div
          ref={headerRef}
          className="top-0 z-10 h-16 pt-6"
        >
          <Container
            className="top-[var(--header-top,theme(spacing.6))] w-full"
          >
            <div className="relative flex gap-4">
              <div className="flex flex-1">
                <AvatarContainer showName={true}>
                  <Avatar />
                </AvatarContainer>
              </div>
              <div className="flex flex-1 justify-end">
                <div className="pointer-events-auto flex flex-row items-center gap-1">
                  <MusicPlayer />
                  <Link
                    href="https://github.com/nicofantri"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="p-2 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <GithubIcon className="size-5" />
                  </Link>
                  <Link
                    href="mailto:nicofantrimayharis@gmail.com"
                    aria-label="Email"
                    className="p-2 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <MailIcon className="size-5" />
                  </Link>
                  <Link
                    href="https://www.tiktok.com/@nicmobiledev?is_from_webapp=1&sender_device=pc"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="TikTok"
                    className="p-2 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="size-5"
                    >
                      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                    </svg>
                  </Link>
                  <Link
                    href="https://linkedin.com/in/nicofantrim06"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="p-2 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <LinkedinIcon className="size-5" />
                  </Link>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </header>
    </>
  )
}