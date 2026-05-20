"use client"

import Image from 'next/image';
import { ProjectItemType } from '@/config/infoConfig';
import { utm_source } from '@/config/siteConfig';
import Link from 'next/link';

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
  const utmLink = isPlaceholder 
    ? '#' 
    : isExternal 
      ? `${href}?utm_source=${utm_source}` 
      : `https://${href}?utm_source=${utm_source}`;

  return (
    <li className='group relative flex flex-col items-start h-full'>
      <div className="relative flex flex-col h-full w-full p-5 rounded-3xl border border-muted bg-background/50 backdrop-blur-sm shadow-sm transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-xl group-hover:bg-muted/10 group-hover:border-red-700/30">
        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden ring-1 ring-black/5 dark:ring-white/10 shadow-inner group-hover:shadow-red-700/10 transition-shadow">
          <Image
            src={`/images/${project.logo}`}
            alt={`${project.name} image`}
            layout="fill"
            objectFit="cover"
            className="rounded-2xl transition-transform duration-500 group-hover:scale-105"
          />
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
          href={utmLink}
          target='_blank'
          rel='noopener noreferrer'
          className='absolute inset-0 z-20'>
        </Link>
      </div>
    </li>
  );
}