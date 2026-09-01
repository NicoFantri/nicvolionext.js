import { type Metadata } from 'next'
import { Container } from '@/components/layout/Container'
import { Compare } from "@/components/ui/compare"
import { XRayReveal } from '@/components/ui/xray-reveal'
import { FadeIn } from "@/components/ui/fade-in"

export const metadata: Metadata = {
  title: 'About',
  description: "About Nico Fantri",
}

export default function About() {
  return (
    <Container className="mt-16 sm:mt-24 lg:mt-32 mb-32 flex flex-col gap-y-32 sm:gap-y-48">
      
      {/* ROW 1: Text Left, Image Right */}
      <FadeIn>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Text Left */}
          <div className="flex flex-col items-start text-left order-1 lg:order-1">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
              About Me.
            </h1>
            
            <div className="w-12 h-1.5 bg-[#F27474] mt-6 mb-8" />
            
            <div className="space-y-6 text-base sm:text-lg text-zinc-400 leading-relaxed mb-10 max-w-lg">
              <p>
                Hi, I'm Nico Fantri. I am a passionate <strong className="text-zinc-200 font-semibold">Software Engineer</strong> and <strong className="text-zinc-200 font-semibold">Fullstack Developer</strong>, constantly pushing the boundaries of what's possible in digital experiences.
              </p>
              <p>
                As an Informatics Engineering student at Universitas Muhammadiyah Malang, I've evolved into a dedicated developer. My absolute favorite frameworks to build with are <strong className="text-zinc-200 font-semibold">Flutter</strong> and <strong className="text-zinc-200 font-semibold">Laravel</strong>.
              </p>
            </div>
            
            <a 
              href="https://linkedin.com/in/nicofantri" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-800 text-white px-8 py-3.5 text-sm font-semibold hover:bg-red-900 transition-colors"
            >
              Connect with me
            </a>
          </div>

          {/* Image Right */}
          <div className="w-full max-w-sm mx-auto lg:ml-auto lg:mr-8 relative order-2 lg:order-2 mt-8 lg:mt-0">
            {/* Image Container (Sharp Corners) */}
            <div className="relative bg-neutral-950 shadow-2xl border border-white/5">
              <XRayReveal 
                baseImage="/images/fotoA.png" 
                revealImage="/images/fotoB.png" 
                radius={120}
                className="w-full rounded-none aspect-[4/5]"
              />
            </div>
          </div>
          
        </div>
      </FadeIn>

      {/* ROW 2: Image Left, Text Right */}
      <FadeIn className="mt-32 sm:mt-48">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Text Right (Shows first on mobile) */}
          <div className="flex flex-col items-start text-left order-1 lg:order-2">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
              Top skills & hobbies
            </h2>
            
            <div className="w-12 h-1.5 bg-[#F27474] mt-6 mb-8" />
            
            <div className="space-y-6 text-base sm:text-lg text-zinc-400 leading-relaxed mb-10 max-w-lg">
              
              <div className="flex items-start gap-4">
                <div className="mt-2 w-2.5 h-2.5 rounded-full border-[2px] border-[#F27474] shrink-0" />
                <p>Passionate Fullstack Developer building scalable Web and Mobile applications.</p>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="mt-2 w-2.5 h-2.5 rounded-full border-[2px] border-[#F27474] shrink-0" />
                <p>Specialized in modern tech stacks, with deep expertise and love for <strong className="text-zinc-200 font-medium">Flutter</strong> and <strong className="text-zinc-200 font-medium">Laravel</strong>.</p>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="mt-2 w-2.5 h-2.5 rounded-full border-[2px] border-[#F27474] shrink-0" />
                <p>Avid mountain climber and hiker, always seeking inspiration at the top of nature's highest peaks.</p>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="mt-2 w-2.5 h-2.5 rounded-full border-[2px] border-[#F27474] shrink-0" />
                <p>Enjoy capturing outdoor adventures and finding creative solutions to tough programming challenges.</p>
              </div>
              
            </div>
            
            <a 
              href="/projects" 
              className="bg-red-800 text-white px-8 py-3.5 text-sm font-semibold hover:bg-red-900 transition-colors"
            >
              View projects
            </a>
          </div>

          {/* Image Left (Shows second on mobile) */}
          <div className="w-full max-w-sm mx-auto lg:mr-auto lg:ml-8 relative order-2 lg:order-1 mt-8 lg:mt-0">
            {/* Image Container (Sharp Corners) */}
            <div className="relative bg-neutral-950 shadow-2xl h-[450px] border border-white/5">
              <Compare
                firstImage="/images/place1.jpeg"
                secondImage="/images/place2.jpeg"
                firstImageClassName="object-cover object-center w-full rounded-none"
                secondImageClassname="object-cover object-center w-full rounded-none"
                className="w-full h-full rounded-none"
                slideMode="drag"
                autoplay={false}
                initialSliderPercentage={50}
              />
            </div>
          </div>
          
        </div>
      </FadeIn>

    </Container>
  )
}
