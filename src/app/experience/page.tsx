import { type Metadata } from 'next'
import { createClient } from '@/utils/supabase/server'
import { SimpleLayout } from '@/components/layout/SimpleLayout'
import { experienceHeadLine, experienceIntro, educationList, projects } from '@/config/infoConfig'
import { Card } from '@/components/shared/Card'
import { BriefcaseIcon, GraduationCapIcon } from 'lucide-react'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Riwayat Studi & Pengalaman',
  description: experienceIntro
}

async function getEducation() {
  try {
    const supabase = createClient()
    const { data } = await supabase.from('education').select('*').order('sort_order', { ascending: true })
    if (data && data.length > 0) {
      return data.map((e: any) => ({
        school: e.school,
        major: e.major,
        logo: e.logo,
        start: e.start_year,
        end: e.end_year,
      }))
    }
  } catch (e) {}
  return educationList
}

async function getProjects() {
  try {
    const supabase = createClient()
    const { data } = await supabase.from('projects').select('*').eq('is_github', false).order('sort_order', { ascending: true })
    if (data && data.length > 0) {
      return data.map((p: any) => ({
        name: p.name,
        description: p.description,
        link: { href: p.link_href, label: p.link_label || p.name },
        logo: p.logo,
        category: p.category,
        tags: p.tags,
      }))
    }
  } catch (e) {}
  return projects
}

function EducationSection({ educationData }: { educationData: any[] }) {
  return (
    <section className="flex flex-col gap-8">
      <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-3">
        <div className="p-2 bg-red-500/10 rounded-lg text-red-500">
          <GraduationCapIcon className="w-6 h-6" />
        </div>
        Riwayat Studi
      </h2>
      <div className="flex flex-col space-y-10 border-l-2 border-muted/50 pl-8 ml-3 relative">
        {educationData.map((edu: any, idx: number) => (
          <div key={idx} className="relative group">
            <span className="absolute -left-[41px] top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-background border-2 border-red-500 transition-colors group-hover:bg-red-500"></span>
            <div className="flex flex-col gap-1">
              <time className="text-sm font-semibold text-red-500/80 mb-1">{edu.start} — {edu.end}</time>
              <h3 className="text-xl font-bold text-foreground tracking-tight">{edu.school}</h3>
              <p className="text-base text-muted-foreground capitalize">{edu.major}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function ProjectExperienceSection({ projectData }: { projectData: any[] }) {
  return (
    <section className="flex flex-col gap-8">
      <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-3">
        <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
          <BriefcaseIcon className="w-6 h-6" />
        </div>
        Pengalaman Project
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projectData.map((project: any, idx: number) => (
          <Card key={idx} className="h-full flex flex-col hover:border-foreground/20 transition-colors">
            <div className="flex-1">
              <Card.Title as="h3" href={project.link?.href}>
                {project.name}
              </Card.Title>
              <Card.Description>
                {project.description}
              </Card.Description>
            </div>
            {project.tags && project.tags.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {project.tags.map((tag: string) => (
                  <span key={tag} className="bg-muted/50 border border-muted-foreground/20 text-muted-foreground px-2.5 py-0.5 text-[11px] font-medium rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </Card>
        ))}
      </div>
    </section>
  )
}

export default async function ExperiencePage() {
  const educationData = await getEducation()
  const projectData = await getProjects()

  return (
    <SimpleLayout title={experienceHeadLine} intro={experienceIntro}>
      <div className="mt-8 flex flex-col space-y-20 pb-16">
        <EducationSection educationData={educationData} />
        <ProjectExperienceSection projectData={projectData} />
      </div>
    </SimpleLayout>
  )
}
