"use client"

import { ArrowRightIcon, HashIcon } from 'lucide-react'
import { ArrowRight, GitFork, Star, GithubLogo, BookOpen } from '@phosphor-icons/react'
import { ProjectItemType } from '@/config/infoConfig'
import { utm_source } from '@/config/siteConfig'
import Link from 'next/link'
import { GlowingEffect } from '@/components/ui/glowing-effect'


export function GithubProjectCard({ project, titleAs }: { project: ProjectItemType, titleAs?: keyof JSX.IntrinsicElements }) {
  const href = project.link.href;
  const isExternal = href.startsWith('http://') || href.startsWith('https://');
  
  let targetHref = href;
  if (project.id) {
    targetHref = `/projects/${project.id}`;
  } else {
    targetHref = isExternal 
      ? `${href}?utm_source=${utm_source}` 
      : `https://${href}?utm_source=${utm_source}`;
  }
  let Component = titleAs ?? 'h2'
  return (
    <li className='group relative flex flex-col items-start h-full list-none'>
      <div className="relative h-full w-full rounded-3xl p-[2px]">
        <GlowingEffect
          blur={0}
          borderWidth={3}
          spread={80}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="relative flex flex-col h-full w-full p-6 rounded-[calc(1.5rem-2px)] border border-muted/50 bg-background/80 backdrop-blur-sm shadow-sm transition-transform duration-300 group-hover:-translate-y-1.5 group-hover:shadow-xl group-hover:bg-muted/20">
        <div className='flex-1'>
          <div className='flex flex-col sm:flex-row justify-center sm:justify-start items-start sm:items-center gap-3'>
            <BookOpen size={24} weight="duotone" className="text-red-700" />
            <Component className="text-lg font-bold tracking-tight text-foreground group-hover:text-red-700 transition-colors">
              {project.name}
            </Component>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground line-clamp-3">
            {project.description}
          </p>
        </div>

        <div className="relative z-10 mt-auto pt-4">
          <div className='flex flex-row items-center gap-2 text-xs font-semibold opacity-80'>
            { project.gitStars && (
              <>
                <Star size={16} weight="duotone" /> 
                {project.gitStars}
              </>
            )}
            { project.gitForks && (
              <>
                <GitFork size={16} weight="duotone" /> 
                {project.gitForks}
              </>
            )}
          </div>
        </div>
        <Link
          href={targetHref}
          target={!project.id && isExternal ? '_blank' : undefined}
          rel={!project.id && isExternal ? 'noopener noreferrer' : undefined}
          className='absolute inset-0 z-20'>
          <ArrowRight size={32} weight="duotone" className="absolute bottom-6 right-4 h-4 w-4 group-hover:text-primary group-hover:cursor-pointer" />
        </Link>
        </div>
      </div>
    </li>
  )
}