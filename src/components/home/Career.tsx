"use client"

import { Calendar, MapPin } from 'lucide-react'
import { CareerItemType, careerList } from '@/config/infoConfig'
import { CustomIcon } from '@/components/shared/CustomIcon'

export function CareerTimeline({ items = careerList }: { items?: CareerItemType[] }) {
  if (!items || items.length === 0) {
    return <p className="text-sm text-muted-foreground italic">Coming soon...</p>
  }

  return (
    <div className="relative border-l-2 border-zinc-800 pl-6 sm:pl-8 ml-3 space-y-6">
      {items.map((career, idx) => {
        const tags =
          career.skillTags && career.skillTags.length > 0
            ? career.skillTags
            : career.skills
            ? career.skills.split(',').map((s) => s.trim())
            : []

        return (
          <div key={idx} className="relative group">
            {/* Timeline Marker */}
            <span
              className={`absolute -left-[31px] sm:-left-[39px] top-7 flex h-3.5 w-3.5 items-center justify-center rounded-full ring-4 ring-background transition-colors ${
                idx === 0
                  ? 'bg-red-600'
                  : 'bg-zinc-900 border-2 border-red-700/70 group-hover:bg-red-600 group-hover:border-red-600'
              }`}
            />

            {/* Flat Minimalist Dark Card (No Gradients) */}
            <div className="flex flex-col gap-3 p-5 sm:p-6 rounded-xl border border-zinc-800 bg-zinc-900/70 hover:bg-zinc-900 hover:border-zinc-700 transition-colors">
              {/* Top Row: Icon + Title/Company + Date Badge */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="flex items-start gap-3.5">
                  <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg border border-zinc-800 bg-zinc-950 text-red-500">
                    <CustomIcon name={career.logo} size={22} />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg sm:text-xl font-bold text-foreground group-hover:text-red-400 transition-colors">
                        {career.title}
                      </h3>
                      {career.type && (
                        <span className="px-2 py-0.5 text-[11px] font-semibold rounded-md bg-red-950 text-red-300 border border-red-900/50">
                          {career.type}
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-medium text-zinc-300 mt-0.5">
                      {career.company}
                    </p>
                  </div>
                </div>

                {/* Date & Duration Pill */}
                <div className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-300 bg-zinc-950 border border-zinc-800 px-3 py-1.5 rounded-lg w-fit shrink-0">
                  <Calendar className="w-3.5 h-3.5 text-red-500" />
                  <span>
                    {career.start} – {career.end}
                    {career.duration ? ` · ${career.duration}` : ''}
                  </span>
                </div>
              </div>

              {/* Location */}
              {career.location && (
                <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                  <MapPin className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                  <span>{career.location}</span>
                </div>
              )}

              {/* Role Description */}
              {career.description && (
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {career.description}
                </p>
              )}

              {/* Individual Skill Badges */}
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2 border-t border-zinc-800/80">
                  {tags.map((tag, tagIdx) => (
                    <span
                      key={tagIdx}
                      className="px-2.5 py-1 text-xs font-medium rounded-md bg-zinc-800 text-zinc-200 border border-zinc-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default function Career() {
  return <CareerTimeline items={careerList} />
}
