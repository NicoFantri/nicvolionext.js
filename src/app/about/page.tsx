import { type Metadata } from 'next'
import Link from 'next/link'
import { Container } from '@/components/layout/Container'
import { XRayReveal } from '@/components/ui/xray-reveal'
import { FadeIn } from "@/components/ui/fade-in"
import { Smartphone, Server, Database, Layout, ArrowRight, ExternalLink } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About - Nico Fantri',
  description: "About Nico Fantri - Software Engineer & Fullstack Developer",
}

const skillCategories = [
  {
    title: 'Mobile App Development',
    icon: Smartphone,
    description: 'Pengembangan aplikasi mobile Android & iOS berkinerja tinggi, responsif, dan scalable dengan implementasi clean architecture.',
    skills: ['Flutter', 'Dart', 'Android SDK', 'State Management (Bloc)', 'REST API Integration', 'Trello / Kanban']
  },
  {
    title: 'Backend Engineering',
    icon: Server,
    description: 'Perancangan layanan backend tangguh, arsitektur microservices, RESTful API terstruktur, dan pemrosesan data efisien.',
    skills: ['Golang', 'Laravel', 'PHP', 'Node.js', 'REST API Architecture', 'Docker']
  },
  {
    title: 'Database & Cloud Systems',
    icon: Database,
    description: 'Perancangan skema database relasional, optimasi kueri kompleks, integrasi cloud BaaS, dan caching performa.',
    skills: ['PostgreSQL', 'MySQL', 'Supabase', 'Firebase Firestore', 'Redis']
  },
  {
    title: 'Frontend & Modern Web',
    icon: Layout,
    description: 'Pembangunan antarmuka web modern, interaktif, aksesibel, dan cepat menggunakan framework JavaScript & TypeScript terkini.',
    skills: ['React', 'Next.js', 'Vue.js', 'TypeScript', 'JavaScript', 'Tailwind CSS']
  }
]

export default function About() {
  return (
    <Container className="mt-16 sm:mt-24 lg:mt-32 mb-32 flex flex-col gap-y-24 sm:gap-y-36">
      
      {/* ROW 1: Text Left, Image Right */}
      <FadeIn>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Text Left */}
          <div className="flex flex-col items-start text-left order-1 lg:order-1">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
              About Me.
            </h1>
            
            <div className="w-12 h-1.5 bg-red-700 mt-6 mb-8" />
            
            <div className="space-y-6 text-base sm:text-lg text-zinc-400 leading-relaxed mb-10 max-w-lg">
              <p>
                Hi, I'm Nico Fantri. I am a passionate <strong className="text-zinc-200 font-semibold">Software Engineer</strong> and <strong className="text-zinc-200 font-semibold">Fullstack Developer</strong>, dedicated to building reliable, high-performance digital products and scalable systems.
              </p>
              <p>
                As an Informatics Engineering graduate from Universitas Muhammadiyah Malang, I have developed deep technical expertise in mobile and web ecosystems, with a primary focus on <strong className="text-zinc-200 font-semibold">Flutter</strong>, <strong className="text-zinc-200 font-semibold">Golang</strong>, and <strong className="text-zinc-200 font-semibold">Laravel</strong>.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <a 
                href="https://linkedin.com/in/nicofantri" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-red-800 text-white px-7 py-3.5 text-sm font-semibold hover:bg-red-700 rounded-xl transition-colors shadow-lg shadow-black/40"
              >
                <span>Connect with me</span>
                <ExternalLink size={16} />
              </a>

              <a 
                href="/CV_Nico_Fantri_Mayharis.pdf" 
                download="CV_Nico_Fantri_Mayharis.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-zinc-800 text-zinc-200 hover:text-white px-6 py-3.5 text-sm font-medium border border-zinc-700 hover:bg-zinc-700 rounded-xl transition-colors"
              >
                <span>Download CV</span>
              </a>
            </div>
          </div>

          {/* Image Right */}
          <div className="w-full max-w-sm mx-auto lg:ml-auto lg:mr-8 relative order-2 lg:order-2 mt-8 lg:mt-0">
            {/* Image Container */}
            <div className="relative bg-zinc-950 shadow-2xl border border-zinc-800 rounded-2xl overflow-hidden">
              <XRayReveal 
                baseImage="/images/fotoA.png" 
                revealImage="/images/fotoB.png" 
                radius={120}
                className="w-full rounded-2xl aspect-[4/5]"
              />
            </div>
          </div>
          
        </div>
      </FadeIn>

      {/* ROW 2: Professional Top Skills Showcase (Follows Tech Stack, Flat & Clean, No Gradients) */}
      <FadeIn>
        <div className="flex flex-col gap-10">
          
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-4 border-b border-zinc-800">
            <div className="max-w-2xl">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                Top Skills
              </h2>
              <div className="w-12 h-1.5 bg-red-700 mt-4 mb-4" />
              <p className="text-base text-zinc-400 leading-relaxed">
                Keahlian teknis dan ekosistem teknologi utama yang saya gunakan dalam merancang, mengembangkan, dan menerapkan solusi perangkat lunak skala produksi.
              </p>
            </div>

            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm font-semibold text-red-500 hover:text-red-400 transition-colors shrink-0"
            >
              <span>Explore Projects</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skillCategories.map((category, idx) => (
              <div 
                key={idx}
                className="p-6 sm:p-7 rounded-xl border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-900/90 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3.5 mb-4">
                    <div className="w-11 h-11 bg-red-950 border border-red-800/40 text-red-400 rounded-lg flex items-center justify-center shrink-0">
                      <category.icon size={22} />
                    </div>
                    <h3 className="text-lg font-bold text-foreground">
                      {category.title}
                    </h3>
                  </div>

                  <p className="text-sm leading-relaxed text-zinc-400 mb-6">
                    {category.description}
                  </p>
                </div>

                {/* Skill Pills */}
                <div className="flex flex-wrap gap-2 pt-2 border-t border-zinc-800/80">
                  {category.skills.map((skill, sIdx) => (
                    <span 
                      key={sIdx}
                      className="px-2.5 py-1 text-xs font-medium rounded-md bg-zinc-800 text-zinc-200 border border-zinc-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </FadeIn>

    </Container>
  )
}
