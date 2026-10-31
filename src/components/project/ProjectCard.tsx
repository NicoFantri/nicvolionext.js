"use client"

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { ProjectItemType } from '@/config/infoConfig';
import { utm_source } from '@/config/siteConfig';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import { Maximize2, X, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type ProjectCardProps = {
  project: ProjectItemType;
  titleAs?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
}

export function ProjectCard({ 
  project,
  titleAs: TitleComponent = 'p'
}: ProjectCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll and handle ESC key when modal is open
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const href = project.link.href;
  const isExternal = href.startsWith('http://') || href.startsWith('https://');
  const isPlaceholder = href === '#' || !href;
  
  let targetHref = href;
  if (project.id) {
    targetHref = `/projects/${project.id}`;
  } else if (!isPlaceholder) {
    targetHref = isExternal 
      ? `${href}?utm_source=${utm_source}` 
      : `https://${href}?utm_source=${utm_source}`;
  }

  const isVideo = project.logo?.toLowerCase().endsWith('.mp4');
  const imageSrc = project.logo && (project.logo.startsWith('http://') || project.logo.startsWith('https://') || project.logo.startsWith('/')) 
    ? project.logo 
    : `/images/${project.logo}`;

  return (
    <>
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
          <div 
            onClick={() => setIsOpen(true)}
            className="relative flex flex-col h-full w-full p-5 rounded-[calc(1.5rem-2px)] border border-muted/50 bg-background/80 backdrop-blur-sm shadow-sm transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-xl group-hover:bg-muted/20 z-10 cursor-pointer"
          >
            {/* Media Container */}
            <div className={`relative w-full ${isVideo ? 'aspect-[9/16]' : 'aspect-[4/3]'} rounded-2xl overflow-hidden ring-1 ring-black/5 dark:ring-white/10 shadow-inner group-hover:shadow-red-700/10 transition-shadow bg-black`}>
              {isVideo ? (
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
                  src={imageSrc}
                  alt={`${project.name} image`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-2xl transition-transform duration-500 group-hover:scale-105"
                />
              )}

              {/* Hover overlay hint */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 text-white font-medium text-xs sm:text-sm backdrop-blur-[2px]">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 border border-white/30 backdrop-blur-md shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <Maximize2 size={14} className="text-white" />
                  <span>Klik untuk Memperbesar</span>
                </div>
              </div>
            </div>

            {/* Info Container */}
            <div className="relative z-10 mt-6 flex-1 flex flex-col">
              {/* Tags / Categories if any */}
              {((project.tags && project.tags.length > 0) || (project.category && project.category.length > 0)) && (
                <div className="flex flex-wrap gap-1.5 mb-2.5">
                  {(project.tags || project.category || []).slice(0, 3).map((tag, idx) => (
                    <span key={idx} className="text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-full bg-red-950/60 text-red-400 border border-red-800/40">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <TitleComponent className="text-lg font-bold tracking-tight text-foreground group-hover:text-red-700 transition-colors flex items-center justify-between gap-2">
                <span>{project.name}</span>
                <Maximize2 size={16} className="opacity-0 group-hover:opacity-60 transition-opacity shrink-0" />
              </TitleComponent>

              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                {project.description}
              </p>
            </div>
          </div>
        </div>
      </li>

      {/* Enlarged Modal / Lightbox Portal */}
      {mounted && createPortal(
        <AnimatePresence>
          {isOpen && (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 md:p-8">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 bg-black/85 backdrop-blur-md"
              />

              {/* Modal Box */}
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 15 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative z-10 max-w-4xl w-full max-h-[92vh] bg-zinc-950 border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header with Title and Close Button */}
                <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-white/10 bg-zinc-900/60 backdrop-blur-sm shrink-0">
                  <div className="flex items-center gap-2.5 pr-8">
                    <span className="h-2 w-2 rounded-full bg-red-600 animate-pulse" />
                    <h3 className="text-base sm:text-lg font-bold text-white truncate">
                      {project.name}
                    </h3>
                  </div>

                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 sm:p-2 rounded-full bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white transition-colors"
                    aria-label="Tutup"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Media Body */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col items-center">
                  <div className="relative w-full flex items-center justify-center bg-black/60 rounded-2xl overflow-hidden border border-white/5 shadow-inner">
                    {isVideo ? (
                      <video
                        src={project.logo}
                        controls
                        autoPlay
                        playsInline
                        className="max-h-[60vh] sm:max-h-[65vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl"
                      />
                    ) : (
                      <div className="relative w-full h-[50vh] sm:h-[60vh] max-h-[65vh]">
                        <Image
                          src={imageSrc}
                          alt={project.name}
                          layout="fill"
                          objectFit="contain"
                          className="rounded-2xl"
                        />
                      </div>
                    )}
                  </div>

                  {/* Details / Description Section below media */}
                  <div className="w-full mt-4 sm:mt-5 space-y-3">
                    {((project.tags && project.tags.length > 0) || (project.category && project.category.length > 0)) && (
                      <div className="flex flex-wrap gap-2">
                        {Array.from(new Set([...(project.category || []), ...(project.tags || [])])).map((tag, idx) => (
                          <span key={idx} className="text-xs font-semibold px-2.5 py-1 rounded-full bg-red-950/70 text-red-300 border border-red-800/40">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <p className="text-sm sm:text-base leading-relaxed text-zinc-300">
                      {project.description}
                    </p>

                    {!isPlaceholder && (
                      <div className="pt-2">
                        <a
                          href={targetHref}
                          target={isExternal ? "_blank" : undefined}
                          rel={isExternal ? "noopener noreferrer" : undefined}
                          className="inline-flex items-center gap-2 bg-red-800 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-lg shadow-red-950/40"
                        >
                          <span>Kunjungi {project.link.label || 'Project'}</span>
                          <ExternalLink size={15} />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
