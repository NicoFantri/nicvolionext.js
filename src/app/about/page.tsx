import { createClient } from '@/utils/supabase/server'
import { type Metadata } from 'next'
import Image from 'next/image'
import { Container } from '@/components/layout/Container'
import portraitImage from '@/images/portrait.jpg'
import SocialLinks from '@/components/about/SocialLinks'
import { aboutMeHeadline, aboutParagraphs } from '@/config/infoConfig'

export const revalidate = 60 // revalidate every 60 seconds

async function getAboutData() {
  try {
    const supabase = createClient()
    const { data } = await supabase.from('about').select('*').limit(1).single()
    if (data) {
      return {
        aboutHeadline: data.about_headline || aboutMeHeadline,
        paragraphs: data.about_paragraphs?.length ? data.about_paragraphs : aboutParagraphs,
      }
    }
  } catch (e) {
    // fallback to static config
  }
  return { aboutHeadline: aboutMeHeadline, paragraphs: aboutParagraphs }
}

export const metadata: Metadata = {
  title: 'About',
  description: aboutMeHeadline,
}

export default async function About() {
  const { aboutHeadline, paragraphs } = await getAboutData()

  return (
    <Container className="mt-16 sm:mt-32">
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
        <div className="lg:pl-20">
          <div className="max-w-xs px-2.5 lg:max-w-none">
            <Image
              src={portraitImage}
              alt=""
              sizes="(min-width: 1024px) 32rem, 20rem"
              className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
            />
          </div>
        </div>
        <div className="lg:order-first lg:row-span-2">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            {aboutHeadline}
          </h1>
          <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
            {paragraphs.map((paragraph: string, index: number) => (
              <p key={index}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
        <div className="lg:pl-20">
          <SocialLinks />
        </div>
      </div>
    </Container>
  )
}
