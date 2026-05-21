import { Container } from '@/components/layout/Container'
import { headline, introduction, projectHeadLine, projectIntro, projects, githubProjects, techIcons, name } from '@/config/infoConfig'
import { ProjectCard } from '@/components/project/ProjectCard'
import { GithubProjectCard } from '@/components/project/GithubProjectCard'
import GitHubSnake from '@/components/home/GitHubSnake'
import { CustomIcon } from '@/components/shared/CustomIcon'
import IconCloud from "@/components/ui/icon-cloud"
import Link from 'next/link'
import { ArrowRight } from '@phosphor-icons/react/dist/ssr'
import TypingAnimation from "@/components/ui/typing-animation"

export default async function Home() {

  return (
    <>
      <div className="flex flex-col gap-6">
        {/* Header Section like in the image */}
        <section className="flex flex-col gap-4">
          <div className="hidden lg:flex text-4xl sm:text-5xl font-bold tracking-tight text-foreground items-center gap-3">
            Hi,{' '}
            <TypingAnimation
              className="text-4xl sm:text-5xl font-bold tracking-tight text-red-700 !leading-tight text-left"
              text={`I'm ${name} `}
              duration={150}
            />
            <span className="animate-wave origin-bottom-right inline-block">👋</span>
          </div>
          
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground font-medium">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground"></span>
              Based in Malang, Indonesia 🇮🇩
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground"></span>
              Student at UMM
            </span>
          </div>

          <p className="mt-2 text-base text-muted-foreground leading-relaxed max-w-3xl">
            {introduction} {headline}
          </p>
        </section>



        <section className="mt-6 flex flex-col gap-2 border-t border-muted pt-6">
          <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <CustomIcon name='bolt' size={28}/> 
            Tech Stack
          </h2>
          <div className="relative flex h-full w-full max-w-[400px] items-center justify-center overflow-hidden mx-auto">
            <IconCloud iconSlugs={techIcons} />
          </div>
        </section>

        {/* GitHub Contributions */}
        <section className="mt-12 border-t border-muted pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-foreground mb-6">Contributions</h2>
          <div className="bg-muted/30 rounded-2xl p-4 md:p-8 overflow-hidden">
            <GitHubSnake />
          </div>
        </section>

        {/* Projects Section */}
        <section className="mt-12 border-t border-muted pt-12">
          <div className="flex items-center justify-between mb-8">
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                {projectHeadLine}
              </h2>
              <p className="text-base text-muted-foreground max-w-2xl">
                {projectIntro}
              </p>
            </div>
            <Link href="/projects" className="hidden sm:flex text-sm font-medium text-muted-foreground hover:text-foreground items-center gap-1 transition-colors">
              View All Projects <ArrowRight size={16} />
            </Link>
          </div>

          <ul className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2">
            {projects.slice(0, 6).map((project) => (
              <ProjectCard key={project.name} project={project} titleAs='h3'/>
            ))}
          </ul>
          
          <Link href="/projects" className="mt-8 sm:hidden text-sm font-medium text-muted-foreground hover:text-foreground flex items-center justify-center gap-1 transition-colors">
            View All Projects <ArrowRight size={16} />
          </Link>
        </section>

        {/* Open Source Section */}
        <section className="mt-12 border-t border-muted pt-12 pb-12">
          <h2 className="flex items-center gap-3 text-2xl font-bold tracking-tight text-foreground mb-8">
            <CustomIcon name='github' size={28}/>
            Open Source
          </h2>
          <ul className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2">
            {githubProjects.slice(0, 6).map((project) => (
              <GithubProjectCard key={project.name} project={project} titleAs='h3'/>
            ))}
          </ul>
        </section>

      </div>
    </>
  )
}