import { type Metadata } from 'next'
import { SimpleLayout } from '@/components/layout/SimpleLayout'
import { experienceHeadLine, experienceIntro, educationList, careerList } from '@/config/infoConfig'
import { GraduationCapIcon, BriefcaseIcon } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Riwayat Studi & Pengalaman',
  description: experienceIntro
}

function EducationSection({ educationData }: { educationData: any[] }) {
  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-3">
        <div className="p-2 bg-red-500/10 rounded-lg text-red-500">
          <GraduationCapIcon className="w-6 h-6" />
        </div>
        Riwayat Studi
      </h2>
      <div className="flex flex-col space-y-8 border-l-2 border-red-900/20 pl-8 ml-4 relative mt-2">
        {educationData.map((edu: any, idx: number) => (
          <div key={idx} className="relative group">
            <span className="absolute -left-[41px] top-8 flex h-4 w-4 items-center justify-center rounded-full bg-background border-2 border-red-600/60 transition-all duration-300 group-hover:bg-red-500 group-hover:scale-125 group-hover:shadow-[0_0_15px_rgba(220,38,38,0.5)]"></span>
            <div className="flex flex-col gap-1.5 p-6 sm:p-8 rounded-3xl border border-red-900/20 bg-neutral-900/30 backdrop-blur-xl shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(153,27,27,0.2)] hover:border-red-800/40 hover:bg-neutral-900/50">
              <time className="text-sm font-semibold text-red-500/80 mb-1">{edu.start} — {edu.end}</time>
              <h3 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight group-hover:text-red-500 transition-colors">{edu.school}</h3>
              <p className="text-base text-foreground/80 font-medium capitalize">{edu.major}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function CareerSection({ careerData }: { careerData: any[] }) {
  if (!careerData || careerData.length === 0) return null;

  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-3">
        <div className="p-2 bg-red-500/10 rounded-lg text-red-500">
          <BriefcaseIcon className="w-6 h-6" />
        </div>
        Pengalaman Kerja
      </h2>
      <div className="flex flex-col space-y-8 border-l-2 border-red-900/20 pl-8 ml-4 relative mt-2">
        {careerData.map((career: any, idx: number) => (
          <div key={idx} className="relative group">
            <span className="absolute -left-[41px] top-8 flex h-4 w-4 items-center justify-center rounded-full bg-background border-2 border-red-600/60 transition-all duration-300 group-hover:bg-red-500 group-hover:scale-125 group-hover:shadow-[0_0_15px_rgba(220,38,38,0.5)]"></span>
            <div className="flex flex-col gap-1.5 p-6 sm:p-8 rounded-3xl border border-red-900/20 bg-neutral-900/30 backdrop-blur-xl shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(153,27,27,0.2)] hover:border-red-800/40 hover:bg-neutral-900/50">
              <h3 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight group-hover:text-red-500 transition-colors">{career.title}</h3>
              <p className="text-base text-foreground/80 font-medium">
                {career.company} {career.type && <span className="font-normal text-muted-foreground">· {career.type}</span>}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {career.start} - {career.end} {career.duration && <span>· {career.duration}</span>}
              </p>
              {career.location && (
                <p className="text-sm text-muted-foreground">
                  {career.location}
                </p>
              )}
              {career.skills && (
                <div className="flex items-center gap-2 mt-4 text-sm font-semibold text-foreground/90 bg-white/5 w-fit px-3 py-1.5 rounded-full border border-white/10 shadow-inner">
                  <span className="text-base drop-shadow-sm">💎</span> {career.skills}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default function ExperiencePage() {
  return (
    <SimpleLayout title={experienceHeadLine} intro={experienceIntro}>
      <div className="mt-8 flex flex-col space-y-20 pb-16">
        <CareerSection careerData={careerList} />
        <EducationSection educationData={educationList} />
      </div>
    </SimpleLayout>
  )
}
