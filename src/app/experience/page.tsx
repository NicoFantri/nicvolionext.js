import { type Metadata } from 'next'
import { SimpleLayout } from '@/components/layout/SimpleLayout'
import { experienceHeadLine, experienceIntro, educationList, careerList } from '@/config/infoConfig'
import { GraduationCapIcon, BriefcaseIcon, Calendar } from 'lucide-react'
import { CareerTimeline } from '@/components/home/Career'

export const metadata: Metadata = {
  title: 'Riwayat Studi & Pengalaman',
  description: experienceIntro
}

function EducationSection({ educationData }: { educationData: any[] }) {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800/40 rounded-lg text-red-600 dark:text-red-400">
          <GraduationCapIcon className="w-5 h-5" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Riwayat Studi
        </h2>
      </div>

      <div className="relative border-l-2 border-zinc-200 dark:border-zinc-800 pl-6 sm:pl-8 ml-3 space-y-6">
        {educationData.map((edu: any, idx: number) => (
          <div key={idx} className="relative group">
            <span
              className={`absolute -left-[31px] sm:-left-[39px] top-7 flex h-3.5 w-3.5 items-center justify-center rounded-full ring-4 ring-background transition-colors ${
                idx === 0
                  ? 'bg-red-600'
                  : 'bg-white dark:bg-zinc-900 border-2 border-red-600/70 dark:border-red-700/70 group-hover:bg-red-600 group-hover:border-red-600'
              }`}
            />
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 sm:p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/70 hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 shadow-sm dark:shadow-none transition-colors">
              <div className="flex items-start gap-3.5">
                <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg border border-red-200 dark:border-zinc-800 bg-red-50 dark:bg-zinc-950 text-red-600 dark:text-red-500">
                  <GraduationCapIcon className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-foreground group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                    {edu.school}
                  </h3>
                  <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mt-0.5 capitalize">
                    {edu.major}
                  </p>
                </div>
              </div>

              <div className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 px-3 py-1.5 rounded-lg w-fit shrink-0">
                <Calendar className="w-3.5 h-3.5 text-red-600 dark:text-red-500" />
                <span>{edu.start} – {edu.end}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function CareerSection({ careerData }: { careerData: any[] }) {
  if (!careerData || careerData.length === 0) return null

  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800/40 rounded-lg text-red-600 dark:text-red-400">
          <BriefcaseIcon className="w-5 h-5" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Pengalaman Kerja
        </h2>
      </div>

      <CareerTimeline items={careerData} />
    </section>
  )
}

export default function ExperiencePage() {
  return (
    <SimpleLayout title={experienceHeadLine} intro={experienceIntro}>
      <div className="mt-8 flex flex-col space-y-16 pb-16">
        <CareerSection careerData={careerList} />
        <EducationSection educationData={educationList} />
      </div>
    </SimpleLayout>
  )
}
