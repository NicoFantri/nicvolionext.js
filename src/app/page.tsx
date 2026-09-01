import { Container } from '@/components/layout/Container'
import { headline as defaultHeadline, introduction as defaultIntroduction, projectHeadLine, projectIntro, projects as staticProjects, githubProjects as staticGithubProjects, techIcons, name as defaultName } from '@/config/infoConfig'
import { ProjectCard } from '@/components/project/ProjectCard'
import { GithubProjectCard } from '@/components/project/GithubProjectCard'
import GitHubSnake from '@/components/home/GitHubSnake'
import { CustomIcon } from '@/components/shared/CustomIcon'
import IconCloud from "@/components/ui/icon-cloud"
import Link from 'next/link'
import { ArrowRight } from '@phosphor-icons/react/dist/ssr'
import TypingAnimation from "@/components/ui/typing-animation"
import { FadeIn } from "@/components/ui/fade-in"
import Carousel from "@/components/ui/carousel"
import { XRayReveal } from "@/components/ui/xray-reveal"

export default function Home() {
  const name = defaultName
  const headline = defaultHeadline
  const introduction = defaultIntroduction
  const projects = staticProjects
  const githubProjects = staticGithubProjects

  return (
    <>
      <div className="flex flex-col gap-6">
        
        {/* Hero / About Me Section */}
        <FadeIn delay={0.1}>
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-4 sm:mb-8 pt-8">
            
            {/* Text Left */}
            <div className="flex flex-col items-start text-left order-1 lg:order-1">
              <div className="flex flex-wrap text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground items-center gap-x-2 gap-y-1 mb-6">
                Hi,{' '}
                <TypingAnimation
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-red-800 !leading-tight text-left"
                  text={`I'm ${name} `}
                  duration={150}
                />
                <span className="animate-wave origin-bottom-right inline-block">👋</span>
              </div>
              
              <div className="w-12 h-1.5 bg-red-800 mb-8" />
              
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground font-medium mb-6">
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-800"></span>
                  Based in Malang, Indonesia 🇮🇩
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-800"></span>
                  Student at UMM
                </span>
              </div>

              <div className="space-y-6 text-base sm:text-lg text-zinc-400 leading-relaxed mb-10 max-w-lg">
                <p>
                  I am a passionate <strong className="text-zinc-200 font-semibold">Software Engineer</strong> and <strong className="text-zinc-200 font-semibold">Fullstack Developer</strong>, constantly exploring modern technologies and building impactful digital solutions.
                </p>
                <p>
                  {headline}
                </p>
              </div>
              
              <a 
                href="/cv.pdf" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-red-800 text-white px-8 py-3.5 text-sm font-semibold hover:bg-red-900 transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                Download CV
              </a>
            </div>

            {/* Image Right (X-Ray) */}
            <div className="w-full max-w-sm mx-auto lg:ml-auto lg:mr-8 relative order-2 lg:order-2 mt-8 lg:mt-0">
              <div className="relative">
                <XRayReveal 
                  baseImage="/images/fotoA.png" 
                  revealImage="/images/fotoB.png" 
                  radius={120}
                  enable3D={true}
                  className="w-full rounded-none aspect-[4/5]"
                />
              </div>
            </div>
            
          </section>
        </FadeIn>

        {/* Tech Stack Section */}
        <FadeIn delay={0.2}>
          <section className="mt-4 sm:mt-8 flex flex-col gap-2 pt-4">
            <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <CustomIcon name='bolt' size={28}/> 
              Tech Stack
            </h2>
            <div className="relative flex aspect-square w-full max-w-[500px] items-center justify-center mx-auto pb-8 pt-0 px-4 sm:px-8 -mt-4 sm:-mt-8 overflow-hidden">
              {/* High-tech 3D orbital rings */}
              <div 
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                style={{ 
                  transform: 'perspective(1000px) rotateX(65deg) rotateY(-10deg) scale(1.1)', 
                  transformStyle: 'preserve-3d' 
                }}
              >
                {/* Inner fast reverse-spinning dashed ring */}
                <div 
                  className="absolute w-[55%] aspect-square rounded-full border border-dashed border-red-500/50 animate-spin"
                  style={{ animationDuration: '15s', animationDirection: 'reverse' }}
                ></div>
                
                {/* Middle pulsing dotted ring */}
                <div 
                  className="absolute w-[75%] aspect-square rounded-full border-2 border-dotted border-red-500/40 animate-spin"
                  style={{ animationDuration: '25s' }}
                >
                  <div className="w-full h-full rounded-full animate-pulse bg-transparent"></div>
                </div>
                
                {/* Outer slow fading dashed ring */}
                <div 
                  className="absolute w-[95%] aspect-square rounded-full border border-dashed border-foreground/10 animate-spin"
                  style={{ animationDuration: '35s' }}
                >
                  {/* Ping effect that fades in and out slowly */}
                  <div className="w-full h-full rounded-full animate-ping opacity-10 bg-red-500/5"></div>
                </div>
              </div>
              
              <IconCloud iconSlugs={techIcons} />
            </div>
          </section>
        </FadeIn>

        {/* Projects Section */}
        <FadeIn delay={0.2}>
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

            <div 
              className="relative overflow-hidden w-full h-full pt-10 pb-24"
              style={{ 
                maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)', 
                WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)' 
              }}
            >
              <Carousel slides={projects.filter((p: any) => p.logo?.toLowerCase().endsWith('.mp4')).slice(0, 10).map((project: any) => {
                let imageSrc = project.images && project.images.length > 0 ? project.images[0] : project.logo;
                if (imageSrc && !imageSrc.startsWith('http') && !imageSrc.startsWith('/')) {
                  imageSrc = `/images/${imageSrc}`;
                }
                return {
                  title: project.name,
                  button: "View Details",
                  src: imageSrc || "https://images.unsplash.com/photo-1518710843675-2540dd79065c?q=80&w=3387&auto=format&fit=crop",
                  href: project.id ? `/projects/${project.id}` : "/projects"
                };
              })} />
            </div>
            
            <Link href="/projects" className="mt-8 sm:hidden text-sm font-medium text-muted-foreground hover:text-foreground flex items-center justify-center gap-1 transition-colors">
              View All Projects <ArrowRight size={16} />
            </Link>
          </section>
        </FadeIn>

        {/* Open Source Section */}
        <FadeIn delay={0.2}>
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
        </FadeIn>

        {/* GitHub Contributions (Moved to bottom) */}
        <FadeIn delay={0.2}>
          <section className="mt-12 border-t border-muted pt-12 pb-12">
            <h2 className="text-2xl font-bold tracking-tight text-foreground mb-6">Contributions</h2>
            <div className="bg-muted/30 rounded-2xl p-4 md:p-8 overflow-hidden">
              <GitHubSnake />
            </div>
          </section>
        </FadeIn>

      </div>
    </>
  )
}