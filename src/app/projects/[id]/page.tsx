import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, Github } from 'lucide-react'
import { projects as staticProjects, githubProjects as staticGithubProjects } from '@/config/infoConfig'

export default function ProjectDetail({ params }: { params: { id: string } }) {
  // Since we no longer use Supabase, project detail by ID is not available
  // Redirect to projects page
  notFound()
}
