import { type Metadata } from 'next'
import { SimpleLayout } from '@/components/layout/SimpleLayout'
import { ExternalLink, Sparkles, Globe, Smartphone, Code2, Palette, ArrowUpRight, MessageCircle } from 'lucide-react'
import { GlowingEffect } from '@/components/ui/glowing-effect'
import { projects as staticProjects, githubProjects as staticGithubProjects } from '@/config/infoConfig'
import { GlobalReach } from '@/components/services/global-reach'

export const metadata: Metadata = {
  title: 'Jasa & Layanan - Maycolab',
  description: 'Layanan pengembangan software, pembuatan website, aplikasi mobile, dan solusi digital kini resmi berpusat di Maycolab (maycolab.site).',
}

const maycolabServices = [
  {
    title: 'Web Application Development',
    description: 'Pembuatan website profesional, dashboard manajemen, landing page konversi tinggi, hingga sistem informasi kustom.',
    icon: Code2,
  },
  {
    title: 'Mobile App Development',
    description: 'Pengembangan aplikasi mobile Android & iOS berkinerja tinggi menggunakan Flutter dan teknologi modern terkini.',
    icon: Smartphone,
  },
  {
    title: 'UI/UX & Product Design',
    description: 'Desain antarmuka modern yang user-friendly, interaktif, sistematis dengan design tokens, dan prototipe Figma.',
    icon: Palette,
  },
  {
    title: 'Fullstack & Cloud Architecture',
    description: 'Perancangan backend REST API / GraphQL, integrasi database, otomasi, dan deployment cloud yang scalable.',
    icon: Globe,
  },
]

export default function ServicesPage() {
  const projectCount = staticProjects.length
  const githubCount = staticGithubProjects.length

  return (
    <SimpleLayout
      title="Jasa & Layanan"
      intro="Seluruh layanan profesional pengembangan produk digital, pembuatan website, dan aplikasi mobile kini resmi dikelola dan berpusat di Maycolab."
    >
      <div className="mt-8 flex flex-col gap-12 pb-16">
        
        {/* Main Maycolab Redirection Hero Card */}
        <div className="relative h-full w-full rounded-3xl p-[2px] group">
          <GlowingEffect
            blur={0}
            borderWidth={3}
            spread={90}
            glow={true}
            disabled={false}
            proximity={80}
            inactiveZone={0.01}
          />
          <div className="relative bg-gradient-to-b from-zinc-900/90 via-zinc-950/90 to-background/90 backdrop-blur-xl border border-red-500/20 rounded-[calc(1.5rem-2px)] p-6 sm:p-10 shadow-2xl z-10 overflow-hidden">
            {/* Background Accent Gradients */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-red-800/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col items-start gap-6 max-w-3xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/70 border border-red-800/40 text-red-300 text-xs font-semibold tracking-wide">
                <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                <span>OFFICIAL DIGITAL STUDIO & SERVICES</span>
              </div>

              {/* Title & Description */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                    Maycolab
                  </h2>
                  <span className="text-xs px-2.5 py-1 rounded-md bg-white/10 text-zinc-300 font-mono font-medium">
                    maycolab.site
                  </span>
                </div>
                <p className="text-base sm:text-lg leading-relaxed text-zinc-300">
                  Untuk konsultasi, pemesanan pembuatan aplikasi, maupun kolaborasi proyek baru, seluruh layanan dan portofolio studio kami dapat Anda akses langsung di platform resmi <strong className="text-white font-semibold">Maycolab</strong>.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="https://maycolab.site"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 bg-red-800 hover:bg-red-700 text-white px-7 py-3.5 rounded-2xl text-sm font-semibold transition-all duration-300 shadow-xl shadow-red-950/50 hover:shadow-red-800/40 hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span>Kunjungi maycolab.site</span>
                  <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>

                <a
                  href="https://wa.me/6283891636143?text=Halo%20Nico,%20saya%20ingin%20konsultasi%20layanan%20project%20melalui%20Maycolab."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 bg-white/5 hover:bg-white/10 text-zinc-200 hover:text-white px-6 py-3.5 rounded-2xl text-sm font-medium border border-white/10 transition-colors"
                >
                  <MessageCircle size={18} className="text-emerald-400" />
                  <span>Hubungi via WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Highlight of Available Capabilities on Maycolab */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2.5">
              <span className="w-2 h-7 bg-red-700 rounded-full" />
              Layanan yang Disediakan di Maycolab
            </h3>
            <a 
              href="https://maycolab.site"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs sm:text-sm font-medium text-red-700 hover:text-red-600 flex items-center gap-1 transition-colors"
            >
              <span>Lihat Detail di maycolab.site</span>
              <ExternalLink size={14} />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {maycolabServices.map((service, idx) => (
              <div 
                key={idx}
                className="p-6 rounded-2xl border border-muted/60 bg-muted/20 backdrop-blur-sm hover:bg-muted/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-11 h-11 bg-red-950/40 border border-red-800/30 text-red-400 rounded-xl flex items-center justify-center mb-4">
                    <service.icon size={22} />
                  </div>
                  <h4 className="text-lg font-bold text-foreground mb-2">
                    {service.title}
                  </h4>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex flex-col p-6 bg-muted/30 border border-border/50 rounded-2xl items-center text-center justify-center transition-colors hover:bg-muted/50 shadow-sm">
            <span className="text-4xl font-bold text-foreground mb-2">{projectCount + githubCount}</span>
            <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Total Projects</span>
          </div>
          <div className="flex flex-col p-6 bg-muted/30 border border-border/50 rounded-2xl items-center text-center justify-center transition-colors hover:bg-muted/50 shadow-sm">
            <span className="text-4xl font-bold text-foreground mb-2">{githubCount}</span>
            <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Open Source</span>
          </div>
          <div className="flex flex-col p-6 bg-muted/30 border border-border/50 rounded-2xl items-center text-center justify-center transition-colors hover:bg-muted/50 shadow-sm">
            <span className="text-4xl font-bold text-foreground mb-2">1+</span>
            <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Years Experience</span>
          </div>
          <div className="flex flex-col p-6 bg-muted/30 border border-border/50 rounded-2xl items-center text-center justify-center transition-colors hover:bg-muted/50 shadow-sm">
            <span className="text-4xl font-bold text-foreground mb-2">5+</span>
            <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Total Clients</span>
          </div>
        </section>

        {/* Global Reach World Map Section */}
        <section className="mt-4 border-t border-muted pt-12">
          <GlobalReach />
        </section>

      </div>
    </SimpleLayout>
  )
}
