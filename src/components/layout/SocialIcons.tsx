import Link from 'next/link'
import { GithubIcon, LinkedinIcon, MailIcon } from 'lucide-react'
import { email } from '@/config/infoConfig'

export function SocialIcons() {
  return (
    <div className="hidden lg:flex fixed top-6 right-6 z-50 items-center gap-1">
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
