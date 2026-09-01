"use client"

import { useState, useEffect } from "react"
import { ExternalLinkIcon } from "lucide-react"

// Tambahkan link artikel yang ingin ditampilkan di sini
// Sistem akan otomatis mengambil judul, deskripsi, dan gambar (thumbnail) dari link tersebut.
const articleLinks = [
  "https://mahasiswaindonesia.id/mahasiswa-umm-gencarkan-edukasi-bahaya-penipuan-online-kepada-warga-untuk-tingkatkan-kesadaran-digital/",
  "https://mahasiswaindonesia.id/etika-dan-profesionalisme-di-era-teknologi-generatif/",
  "https://journal.ibrahimy.ac.id/index.php/JIMI/article/view/9592"
]

function ArticleCard({ url }: { url: string }) {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`https://api.microlink.io?url=${encodeURIComponent(url)}&screenshot=true`)
      .then(res => res.json())
      .then(res => {
        if(res.status === 'success') {
          setData(res.data)
        }
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [url])

  if (loading) {
    return (
      <div className="flex flex-col sm:flex-row gap-5 p-5 rounded-3xl border border-white/5 bg-white/5 animate-pulse h-40">
        <div className="w-full sm:w-56 h-full bg-white/10 rounded-2xl"></div>
        <div className="flex-1 space-y-4 py-2">
          <div className="h-6 bg-white/10 rounded w-3/4"></div>
          <div className="h-4 bg-white/10 rounded w-full"></div>
          <div className="h-4 bg-white/10 rounded w-5/6"></div>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-red-500 hover:underline p-4 border border-red-500/20 rounded-2xl">
        <ExternalLinkIcon className="w-4 h-4" /> Buka Tautan: {url}
      </a>
    )
  }

  const imageUrl = data.image?.url || data.screenshot?.url;

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="group flex flex-col sm:flex-row gap-5 p-5 rounded-3xl border border-red-900/20 bg-neutral-900/30 backdrop-blur-xl shadow-[0_0_20px_rgba(153,27,27,0.05)] hover:shadow-[0_10px_30px_-10px_rgba(153,27,27,0.2)] hover:border-red-800/40 hover:bg-neutral-900/50 transition-all duration-300 hover:-translate-y-1">
      {imageUrl ? (
        <div className="w-full sm:w-56 h-40 sm:h-36 flex-shrink-0 overflow-hidden rounded-2xl border border-white/10 relative bg-white/5">
          <img 
            src={imageUrl} 
            alt={data.title} 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
        </div>
      ) : (
        <div className="w-full sm:w-56 h-40 sm:h-36 flex-shrink-0 rounded-2xl border border-white/10 bg-white/5 flex flex-col items-center justify-center gap-2 text-muted-foreground group-hover:text-red-400 group-hover:bg-white/10 transition-colors">
          <ExternalLinkIcon className="w-8 h-8" />
          <span className="text-xs font-medium uppercase tracking-widest">No Image</span>
        </div>
      )}
      <div className="flex flex-col justify-center flex-1">
        <h3 className="text-xl font-bold text-foreground group-hover:text-red-500 transition-colors line-clamp-2 leading-snug">{data.title || new URL(url).hostname}</h3>
        <p className="text-sm text-foreground/80 mt-2 line-clamp-2 leading-relaxed">{data.description}</p>
        <div className="flex items-center gap-2 mt-4">
          {data.logo?.url && <img src={data.logo.url} alt="Logo" referrerPolicy="no-referrer" className="w-5 h-5 rounded-full ring-1 ring-white/10 bg-white object-cover" />}
          <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{data.publisher || new URL(url).hostname}</span>
        </div>
      </div>
    </a>
  )
}

export default function ArticleList() {
  return (
    <div className="flex flex-col gap-6">
      {articleLinks.map((url, idx) => (
        <ArticleCard key={idx} url={url} />
      ))}
      {articleLinks.length === 0 && (
        <p className="text-muted-foreground text-center py-10">Belum ada artikel yang ditambahkan.</p>
      )}
    </div>
  )
}
