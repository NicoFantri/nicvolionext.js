import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { Sidebar } from '@/components/layout/Sidebar'
import { AnimatedBackground } from '@/components/ui/animated-background'
import { SocialIcons } from '@/components/layout/SocialIcons'
import { FloatingDock } from '@/components/ui/FloatingDock'

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full justify-center bg-background lg:pl-16 xl:pl-24 relative min-h-screen">
      <AnimatedBackground />
      <div className="flex w-full max-w-[1600px] mx-auto relative min-h-screen">
        <Sidebar />
        
        <div className="flex w-full flex-col flex-1 min-w-0">
          <Header />
          {/* Social Icons - Top Right */}
          <SocialIcons />
          <main className="flex-1 px-4 sm:px-8 lg:px-12 pt-4 pb-24 lg:pt-8 lg:pb-8 w-full">
            {children}
          </main>
          <Footer />
        </div>
      </div>

      {/* Mobile Bottom Navigation - Rendered independently */}
      <FloatingDock
        topOffset={-20}
        iconSize={32}
        iconMagnification={48}
      />
    </div>
  )
}
