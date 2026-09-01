"use client"


import { Student } from '@phosphor-icons/react'
import { EducationItemType, educationList } from '@/config/infoConfig'
import { CustomIcon } from '@/components/shared/CustomIcon'




function EducationItem({ educationItem }: { educationItem: EducationItemType }) {
  return (
    <li className="flex gap-4 group">
      <div className="relative mt-1 flex h-12 w-12 flex-none items-center justify-center rounded-sm shadow-md border border-white/10 bg-white/5 backdrop-blur-sm group-hover:border-red-600/50 group-hover:bg-red-900/10 transition-all duration-300">
        <CustomIcon name={educationItem.logo} />
      </div>
      <div className="flex flex-col flex-auto border-b border-white/5 pb-4 last:border-0 last:pb-0">
        <h3 className="text-base font-semibold text-foreground group-hover:text-red-500 transition-colors">
          {educationItem.school}
        </h3>
        <p className="text-sm text-foreground/90 mt-0.5">
          {educationItem.major}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          {educationItem.start} - {educationItem.end}
        </p>
      </div>
    </li>
  )
}

export default function Education() {
  return (
    <div className="rounded-2xl border border-red-900/30 bg-background/40 backdrop-blur-md shadow-[0_0_20px_rgba(153,27,27,0.05)] p-6 transition-all hover:shadow-[0_0_25px_rgba(153,27,27,0.1)] hover:border-red-900/50">
      <h2 className="flex text-sm font-semibold items-center text-foreground/90">
        <Student size={24} weight="duotone" className="text-red-600" />
        <span className="ml-3">Education</span>
      </h2>
      <ol className="mt-6 space-y-4">
        {educationList.map((educationItem, educationItemIndex) => (
          <EducationItem key={educationItemIndex} educationItem={educationItem} />
        ))}
      </ol>
    </div>
  )
}