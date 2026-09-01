import { Container } from '@/components/layout/Container'

export function SimpleLayout({
  title,
  intro,
  children,
}: {
  title: string
  intro: string
  children?: React.ReactNode
}) {
  return (
    <Container className="mt-0 lg:mt-4">
      <header className="max-w-2xl flex flex-col items-center sm:items-start text-center sm:text-left mx-auto sm:mx-0">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
          {title}
        </h1>
        <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
          {intro}
        </p>
      </header>
      {children && <div className="mt-12 sm:mt-20">{children}</div>}
    </Container>
  )
}
