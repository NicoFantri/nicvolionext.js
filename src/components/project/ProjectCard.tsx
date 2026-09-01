"use client"

import Image from 'next/image';
import { ProjectItemType } from '@/config/infoConfig';
import { utm_source } from '@/config/siteConfig';
import Link from 'next/link';
import { GlowingEffect } from '@/components/ui/glowing-effect';

type ProjectCardProps = {
  project: ProjectItemType;
  titleAs?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
}

export function ProjectCard({ 
  project,
  titleAs: TitleComponent = 'p'
}: ProjectCardProps) {
  const href = project.link.href;
  const isExternal = href.startsWith('http://') || href.startsWith('https://');
  const isPlaceholder = href === '#';
  
  let targetHref = href;
  if (project.id) {
    targetHref = `/projects/${project.id}`;
  } else {
    targetHref = isPlaceholder 
      ? '#' 
      : isExternal 
        ? `${href}?utm_source=${utm_source}` 
        : `https://${href}?utm_source=${utm_source}`;
  }

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
        <div className="relative flex flex-col h-full w-full p-5 rounded-[calc(1.5rem-2px)] border border-muted/50 bg-background/80 backdrop-blur-sm shadow-sm transition-transform duration-300 group-hover:-translate-y-1.5 group-hover:shadow-xl group-hover:bg-muted/20 z-10">
        <div className={`relative w-full ${project.logo?.toLowerCase().endsWith('.mp4') ? 'aspect-[9/16]' : 'aspect-[4/3]'} rounded-2xl overflow-hidden ring-1 ring-black/5 dark:ring-white/10 shadow-inner group-hover:shadow-red-700/10 transition-shadow bg-black`}>
          {project.logo?.toLowerCase().endsWith('.mp4') ? (
            <video
              src={project.logo}
              className="absolute inset-0 w-full h-full object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105 pointer-events-none"
              autoPlay
              loop
              muted
              playsInline
            />
          ) : (
            <Image
              src={project.logo && (project.logo.startsWith('http://') || project.logo.startsWith('https://') || project.logo.startsWith('/')) ? project.logo : `/images/${project.logo}`}
              alt={`${project.name} image`}
              layout="fill"
              objectFit="cover"
              className="rounded-2xl transition-transform duration-500 group-hover:scale-105"
            />
          )}
        </div>

        <div className="relative z-10 mt-6 flex-1 flex flex-col">
          <TitleComponent className="text-lg font-bold tracking-tight text-foreground group-hover:text-red-700 transition-colors">
            {project.name}
          </TitleComponent>
          <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground line-clamp-3">
            {project.description}
          </p>
        </div>

        <Link
          href={targetHref}
          target={!project.id && isExternal ? '_blank' : undefined}
          rel={!project.id && isExternal ? 'noopener noreferrer' : undefined}
          className='absolute inset-0 z-20'>
        </Link>
        </div>
      </div>
    </li>
  );
}