import React from 'react';
import Image from 'next/image';
import { cn } from "@/lib/utils";
import Marquee from "@/components/ui/marquee";
import { activityHeadLine, activityIntro, activityImages, type ActivityImage } from '@/config/activity';

const ActivityCard = ({ src, alt, caption, date }: ActivityImage) => (
  <div className={cn(
    "relative mx-4 group overflow-hidden rounded-xl",
    "hover:bg-gray-950/[.05]",
    "dark:hover:bg-gray-50/[.15]"
  )}>
    <div className="relative h-48 w-64">
      <Image
        src={src}
        alt={alt}
        width={400}
        height={300}
        className="object-cover transition-transform duration-300 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-white font-medium mb-1">{caption}</p>
          <p className="text-white/80 text-sm">{date}</p>
        </div>
      </div>
    </div>
  </div>
);

export default function Activity() {
  const firstRow = activityImages.slice(0, Math.ceil(activityImages.length / 2));
  const secondRow = activityImages.slice(Math.ceil(activityImages.length / 2));

  return (
    <div className="w-full py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl opacity-80">
            {activityHeadLine}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            {activityIntro}
          </p>
        </div>
        <div className="relative flex flex-col gap-8 h-[500px] items-center justify-center overflow-hidden">
          {/* First Row */}
          <Marquee pauseOnHover className="[--duration:30s]">
            {firstRow.map((image, index) => (
              <ActivityCard key={`first-${index}`} {...image} />
            ))}
          </Marquee>
          {/* Second Row */}
          <Marquee reverse pauseOnHover className="[--duration:35s]">
            {secondRow.map((image, index) => (
              <ActivityCard key={`second-${index}`} {...image} />
            ))}
          </Marquee>
          {/* Gradient Overlays */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-background" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-background" />
        </div>
      </div>
    </div>
  );
}