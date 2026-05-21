import { type Metadata } from 'next'
import { createClient } from '@/utils/supabase/server'
import { SimpleLayout } from '@/components/layout/SimpleLayout'
import { ExternalLink } from 'lucide-react'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Sertifikat & Pencapaian',
  description: 'Daftar sertifikat dan pencapaian yang telah saya raih.'
}

async function getCertificates() {
  try {
    const supabase = createClient()
    const { data } = await supabase.from('certificates').select('*').order('sort_order', { ascending: true })
    return data || []
  } catch (e) {
    return []
  }
}

export default async function CertificatesPage() {
  const certificates = await getCertificates()

  return (
    <SimpleLayout
      title="Sertifikat & Pencapaian"
      intro="Kumpulan sertifikat penghargaan, kelulusan kursus, dan pencapaian lainnya."
    >
      <div className="mt-10 flex flex-col space-y-16 pb-16">
        {certificates.length === 0 ? (
          <div className="bg-muted/30 border border-muted-foreground/10 rounded-2xl p-12 text-center flex flex-col items-center justify-center">
            <div className="text-4xl mb-4">🏆</div>
            <h3 className="text-xl font-bold text-foreground mb-2">Segera Hadir</h3>
            <p className="text-muted-foreground max-w-sm">
              Halaman sertifikat sedang dalam tahap pengembangan. Sertifikat akan segera ditampilkan di sini!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((cert: any) => (
              <div key={cert.id} className="group bg-background border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:border-foreground/20 transition-all duration-300">
                {cert.image_url && (
                  <div className="w-full h-48 overflow-hidden bg-muted">
                    <img
                      src={cert.image_url}
                      alt={cert.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="p-5">
                  <h3 className="font-bold text-foreground text-lg leading-tight">{cert.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {cert.issuer}{cert.date ? ` • ${cert.date}` : ''}
                  </p>
                  {cert.description && (
                    <p className="text-sm text-muted-foreground mt-3 line-clamp-3">{cert.description}</p>
                  )}
                  {cert.credential_url && (
                    <a
                      href={cert.credential_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline mt-4"
                    >
                      Lihat Kredensial <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </SimpleLayout>
  )
}
