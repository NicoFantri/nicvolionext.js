'use client'

import { Fragment, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

import { Container } from '@/components/layout/Container'
import avatarImage from '@/images/avatar.jpg'
import { ThemeToggle } from '@/components/shared/ThemeToggle'
import { GithubRepo } from '@/components/shared/GithubRepo'
import { name } from '@/config/infoConfig'
import { FloatingDock } from '@/components/ui/FloatingDock'

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
          className='pointer-events-auto'
        >
          <div className="text-md font-semibold capitalize">{name}</div>
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
      className={clsx(className, 'pointer-events-auto')}
      {...props}
    >
      <Image
        src={avatarImage}
        alt=""
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
  let isHomePage = usePathname() === '/'

  let headerRef = useRef<React.ElementRef<'div'>>(null)
  let avatarRef = useRef<React.ElementRef<'div'>>(null)
  let isInitial = useRef(true)

  useEffect(() => {
    let downDelay = avatarRef.current?.offsetTop ?? 0
    let upDelay = 64

    function setProperty(property: string, value: string) {
      document.documentElement.style.setProperty(property, value)
    }

    function removeProperty(property: string) {
      document.documentElement.style.removeProperty(property)
    }

    function updateHeaderStyles() {
      if (!headerRef.current) {
        return
      }

      let { top, height } = headerRef.current.getBoundingClientRect()
      let scrollY = clamp(
        window.scrollY,
        0,
        document.body.scrollHeight - window.innerHeight,
      )

      if (isInitial.current) {
        setProperty('--header-position', 'sticky')
      }

      setProperty('--content-offset', `${downDelay}px`)

      if (isInitial.current || scrollY < downDelay) {
        setProperty('--header-height', `${downDelay + height}px`)
        setProperty('--header-mb', `${-downDelay}px`)
      } else if (top + height < -upDelay) {
        let offset = Math.max(height, scrollY - upDelay)
        setProperty('--header-height', `${offset}px`)
        setProperty('--header-mb', `${height - offset}px`)
      } else if (top === 0) {
        setProperty('--header-height', `${scrollY + height}px`)
        setProperty('--header-mb', `${-scrollY}px`)
      }
    }

    function updateAvatarStyles() {
      if (!isHomePage) {
        return
      }

      let fromScale = 1
      let toScale = 36 / 64
      let fromX = 0
      let toX = 2 / 16

      let scrollY = downDelay - window.scrollY

      let scale = (scrollY * (fromScale - toScale)) / downDelay + toScale
      scale = clamp(scale, fromScale, toScale)

      let x = (scrollY * (fromX - toX)) / downDelay + toX
      x = clamp(x, fromX, toX)

      setProperty(
        '--avatar-image-transform',
        `translate3d(${x}rem, 0, 0) scale(${scale})`,
      )
      setProperty('--avatar-hi-opacity', scale === toScale ? '0' : '1')
    }

    function updateHiStyles() {
      if (!isHomePage) {
        return
      }

      let opacity = window.scrollY < 50 ? 1 : 0

      setProperty('--avatar-hi-opacity', opacity.toString())
    }

    function updateStyles() {
      updateHeaderStyles()
      updateAvatarStyles()
      updateHiStyles()
      isInitial.current = false
    }

    updateStyles()
    window.addEventListener('scroll', updateStyles, { passive: true })
    window.addEventListener('resize', updateStyles)

    return () => {
      window.removeEventListener('scroll', updateStyles)
      window.removeEventListener('resize', updateStyles)
    }
  }, [isHomePage])

  return (
    <>
      {/* Floating Dock - Bisa diatur posisi dan ukurannya */}
      <FloatingDock 
        topOffset={-20}           // Posisi dari atas dalam pixel (default: 8)
        iconSize={32}           // Ukuran icon default (default: 28)
        iconMagnification={48}  // Ukuran icon saat hover (default: 44)
      />

      <header
        className="pointer-events-none relative z-50 flex flex-none flex-col"
        style={{
          height: 'var(--header-height)',
          marginBottom: 'var(--header-mb)',
        }}
      >
        {isHomePage && (
          <>
            <div
              ref={avatarRef}
              className="order-last mt-[calc(theme(spacing.16)-theme(spacing.3))]"
            />
            <Container
              className="top-0 order-last -mb-3 pt-3"
              style={{
                position:
                  'var(--header-position)' as React.CSSProperties['position'],
              }}
            >
              <div
                className="top-[var(--avatar-top,theme(spacing.3))] w-full"
                style={{
                  position:
                    'var(--header-inner-position)' as React.CSSProperties['position'],
                }}
              >
                <div className="relative">
                  <AvatarContainer
                    className="absolute left-0 top-3 origin-left transition-opacity"
                    style={{
                      opacity: 'var(--avatar-border-opacity, 0)',
                      transform: 'var(--avatar-border-transform)',
                    }}
                  />
                  <div className="flex flex-row items-center gap-4">
                    <Avatar
                      large
                      className="block h-16 w-16 origin-left"
                      style={{ transform: 'var(--avatar-image-transform)' }}
                    />
                    <div
                      className="text-3xl md:text-6xl font-bold tracking-tight flex flex-row"
                      style={{
                        opacity: 'var(--avatar-hi-opacity, 0)',
                        transform: 'var(--avatar-hi-transform)'
                      }}
                    >
                      Hi,{' '}
                      <TypingAnimation
                        className="text-3xl md:text-6xl font-bold tracking-tight"
                        text={`I'm ${name} `}
                        duration={150}
                      />
                      👋
                    </div>
                  </div>
                </div>
              </div>
            </Container>
          </>
        )}
        <div
          ref={headerRef}
          className="top-0 z-10 h-16 pt-6"
          style={{
            position:
              'var(--header-position)' as React.CSSProperties['position'],
          }}
        >
          <Container
            className="top-[var(--header-top,theme(spacing.6))] w-full"
            style={{
              position:
                'var(--header-inner-position)' as React.CSSProperties['position'],
            }}
          >
            <div className="relative flex gap-4">
              <div className="flex flex-1">
                {!isHomePage && (
                  <AvatarContainer showName={true}>
                    <Avatar />
                  </AvatarContainer>
                )}
              </div>
              <div className="flex flex-1 justify-end">
                <div className="pointer-events-auto flex flex-row items-center gap-2">
                  <ThemeToggle />
                  <GithubRepo />
                </div>
              </div>
            </div>
          </Container>
        </div>
      </header>
      {isHomePage && (
        <div
          className="flex-none"
          style={{ height: 'var(--content-offset)' }}
        />
      )}
    </>
  )
}