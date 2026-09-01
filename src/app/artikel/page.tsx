import { type Metadata } from 'next'
import { SimpleLayout } from '@/components/layout/SimpleLayout'
import ArticleList from './ArticleList'

export const metadata: Metadata = {
  title: 'Artikel',
  description: 'Kumpulan artikel dan referensi bacaan yang menarik.'
}

export default function ArtikelPage() {
  return (
    <SimpleLayout
      title="Artikel"
      intro="Kumpulan artikel, tulisan, dan referensi bacaan yang menarik. Masukkan link web dan sistem akan memuat tampilannya secara otomatis."
    >
      <div className="mt-10 pb-16">
        <ArticleList />
      </div>
    </SimpleLayout>
  )
}
