import Link from 'next/link'
import { GithubIcon, LinkedinIcon, MailIcon } from 'lucide-react'
import { email } from '@/config/infoConfig'
import { MusicPlayer } from '@/components/shared/MusicPlayer'

export function SocialIcons() {
  return (
    <div className="hidden lg:flex fixed top-6 right-6 z-50 items-center gap-1">
      <MusicPlayer />
      <Link
        href="https://github.com/nicofantri"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
        className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-all duration-200"
      >
        <GithubIcon className="size-5" />
      </Link>
      <Link
        href={`mailto:${email}`}
        aria-label="Email"
        className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-all duration-200"
      >
        <MailIcon className="size-5" />
      </Link>
      <Link
        href="https://www.tiktok.com/@nicmobiledev?is_from_webapp=1&sender_device=pc"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="TikTok"
        className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-all duration-200"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-5"
        >
          <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
        </svg>
      </Link>
      <Link
        href="https://linkedin.com/in/nicofantri"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-all duration-200"
      >
        <LinkedinIcon className="size-5" />
      </Link>
    </div>
  )
}
