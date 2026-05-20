import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { Sidebar } from '@/components/layout/Sidebar'
import { AnimatedBackground } from '@/components/ui/animated-background'
import { SocialIcons } from '@/components/layout/SocialIcons'

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full bg-background lg:pl-16 xl:pl-24 overflow-hidden relative">
      <AnimatedBackground />
      <div className="flex w-full max-w-[1400px] relative h-full">
        <Sidebar />
        
        <div data-scroll-container className="flex w-full flex-col flex-1 min-w-0 h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <Header />
          {/* Social Icons - Top Right */}
          <SocialIcons />
          <main className="flex-1 px-4 sm:px-8 lg:px-12 py-8 w-full">
            {children}
          </main>
          <Footer />
        </div>
      </div>
    </div>
  )
}
