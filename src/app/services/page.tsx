import { type Metadata } from 'next'
import { SimpleLayout } from '@/components/layout/SimpleLayout'
import { CodeIcon, SmartphoneIcon, PenToolIcon, GraduationCapIcon } from 'lucide-react'
import { GlowingEffect } from '@/components/ui/glowing-effect'
import { projects as staticProjects, githubProjects as staticGithubProjects } from '@/config/infoConfig'

export const metadata: Metadata = {
  title: 'Jasa & Layanan',
  description: 'Layanan pembuatan website, aplikasi mobile, dan desain UI/UX.',
}

const servicesList = [
  {
    title: 'Web Development',
    description: 'Pembuatan website profesional, company profile, landing page, hingga sistem informasi custom sesuai kebutuhan bisnis Anda.',
    icon: CodeIcon,
    price: 'Mulai dari Rp 500k'
  },
  {
    title: 'Mobile App Development',
    description: 'Pengembangan aplikasi mobile berbasis Android/iOS yang responsif dan berkinerja tinggi untuk mempermudah akses pelanggan Anda.',
    icon: SmartphoneIcon,
    price: 'Mulai dari Rp 1.5M'
  },
  {
    title: 'UI/UX Design',
    description: 'Desain antarmuka aplikasi atau website yang modern, interaktif, dan mudah digunakan (user-friendly) dengan Figma.',
    icon: PenToolIcon,
    price: 'Mulai dari Rp 300k'
  },
  {
    title: 'Konsultasi & Tugas Kuliah IT',
    description: 'Bantuan pengerjaan tugas akhir, mini project, atau konsultasi seputar pemrograman, database, dan arsitektur perangkat lunak.',
    icon: GraduationCapIcon,
    price: 'Hubungi Saya'
  }
]

import { GlobalReach } from '@/components/services/global-reach'

export default function ServicesPage() {
  const projectCount = staticProjects.length
  const githubCount = staticGithubProjects.length

  return (
    <SimpleLayout
      title="Jasa & Layanan"
      intro="Saya menawarkan berbagai layanan profesional untuk membantu mengubah ide Anda menjadi produk digital yang nyata."
    >
      <div className="mt-10 flex flex-col gap-16 pb-16">
        
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

        {/* Services List */}
        <section className="flex flex-col gap-8">
          <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <span className="w-2 h-8 bg-emerald-500 rounded-full"></span>
            Layanan Tersedia
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {servicesList.map((service, idx) => (
              <div key={idx} className="relative h-full w-full rounded-3xl p-[2px] group">
                <GlowingEffect
                  blur={0}
                  borderWidth={3}
                  spread={80}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                />
                <div className="relative bg-background/80 backdrop-blur-sm border border-muted/50 rounded-[calc(1.5rem-2px)] p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full z-10">
                  <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="w-6 h-6 text-foreground" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{service.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
                    {service.description}
                  </p>
                  <div className="pt-4 border-t border-border flex items-center justify-between mt-auto">
                    <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                      {service.price}
                    </span>
                    <a 
                      href={`https://wa.me/6283891636143?text=Halo Nico, saya tertarik dengan layanan ${service.title} Anda.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium hover:underline"
                    >
                      Pesan Sekarang &rarr;
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Global Reach World Map Section */}
        <section className="mt-8 border-t border-muted pt-12">
          <GlobalReach />
        </section>

      </div>
    </SimpleLayout>
  )
}
