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
  const utmLink = `https://${project.link.href}?utm_source=${utm_source}`;

  return (
    <li className='group relative flex flex-col items-start h-full'>
      <div className="relative flex flex-col justify-between h-full w-full p-4 rounded-2xl border border-muted-foreground/20 shadow-sm transition-all group-hover:scale-[1.03] group-hover:shadow-md group-hover:bg-muted/5">
        <div className="relative w-full h-48 rounded-xl overflow-hidden">
          <Image
            src={`/images/${project.logo}`}
            alt={`${project.name} image`}
            layout="fill"
            objectFit="cover"
            className="rounded-xl"
          />
        </div>

        <div className="relative z-10 mt-4">
          <TitleComponent className="text-base font-semibold">
            {project.name}
          </TitleComponent>
          <p className="mt-2 text-sm text-muted-foreground">
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