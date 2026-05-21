'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { SimpleLayout } from '@/components/layout/SimpleLayout'
import { ArrowLeft, Save, Plus, Trash2 } from 'lucide-react'
import Link from 'next/link'

export default function AdminAboutPage() {
  const supabase = createClient()
  const router = useRouter()

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [aboutId, setAboutId] = useState<string | null>(null)

  const [name, setName] = useState('')
  const [headline, setHeadline] = useState('')
  const [introduction, setIntroduction] = useState('')
  const [aboutHeadline, setAboutHeadline] = useState('')
  const [aboutParagraphs, setAboutParagraphs] = useState<string[]>([''])
  const [email, setEmail] = useState('')
  const [githubUsername, setGithubUsername] = useState('')

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/admin/login')
        return
      }
      fetchAbout()
    }
    checkAuth()
  }, [])

  const fetchAbout = async () => {
    const { data, error } = await supabase
      .from('about')
      .select('*')
      .limit(1)
      .single()

    if (data) {
      setAboutId(data.id)
      setName(data.name || '')
      setHeadline(data.headline || '')
      setIntroduction(data.introduction || '')
      setAboutHeadline(data.about_headline || '')
      setAboutParagraphs(data.about_paragraphs?.length ? data.about_paragraphs : [''])
      setEmail(data.email || '')
      setGithubUsername(data.github_username || '')
    }
    setLoading(false)
  }

  const handleSave = async () => {
    setSaving(true)
    setSuccess(false)

    const payload = {
      name,
      headline,
      introduction,
      about_headline: aboutHeadline,
      about_paragraphs: aboutParagraphs.filter(p => p.trim()),
      email,
      github_username: githubUsername,
      updated_at: new Date().toISOString(),
    }

    if (aboutId) {
      await supabase.from('about').update(payload).eq('id', aboutId)
    } else {
      await supabase.from('about').insert([payload])
    }

    setSaving(false)
    setSuccess(true)
    setTimeout(() => setSuccess(false), 3000)
  }

  const addParagraph = () => setAboutParagraphs([...aboutParagraphs, ''])
  const removeParagraph = (idx: number) => setAboutParagraphs(aboutParagraphs.filter((_, i) => i !== idx))
  const updateParagraph = (idx: number, val: string) => {
    const copy = [...aboutParagraphs]
    copy[idx] = val
    setAboutParagraphs(copy)
  }

  if (loading) {
    return (
      <SimpleLayout title="Edit About" intro="Memuat data...">
        <div className="mt-10 flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </SimpleLayout>
    )
  }

  return (
    <SimpleLayout title="Edit About" intro="Ubah informasi profil Anda yang tampil di halaman utama dan halaman About.">
      <div className="mt-6 mb-4">
        <Link href="/admin" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" /> Kembali ke Dashboard
        </Link>
      </div>

      {success && (
        <div className="mb-6 p-3 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-lg text-sm font-medium">
          ✅ Berhasil disimpan!
        </div>
      )}

      <div className="bg-background border border-border rounded-xl p-6 space-y-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Nama</label>
            <Input value={name} onChange={e => setName(e.target.value)} placeholder="Nico" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Email</label>
            <Input value={email} onChange={e => setEmail(e.target.value)} placeholder="email@gmail.com" />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">GitHub Username</label>
          <Input value={githubUsername} onChange={e => setGithubUsername(e.target.value)} placeholder="nicofantri" />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Headline (Halaman Utama)</label>
          <Input value={headline} onChange={e => setHeadline(e.target.value)} placeholder="Informatics Engineering Student..." />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Introduction (Halaman Utama)</label>
          <Textarea value={introduction} onChange={e => setIntroduction(e.target.value)} rows={3} placeholder="Perkenalan singkat..." />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">About Headline (Halaman About)</label>
          <Input value={aboutHeadline} onChange={e => setAboutHeadline(e.target.value)} placeholder="I'm Nico Fantri..." />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Paragraf About</label>
          {aboutParagraphs.map((p, idx) => (
            <div key={idx} className="flex gap-2">
              <Textarea value={p} onChange={e => updateParagraph(idx, e.target.value)} rows={3} placeholder={`Paragraf ${idx + 1}`} className="flex-1" />
              {aboutParagraphs.length > 1 && (
                <Button variant="ghost" size="icon" onClick={() => removeParagraph(idx)} className="shrink-0 text-red-500 hover:text-red-600">
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={addParagraph} className="w-fit">
            <Plus className="w-4 h-4 mr-1" /> Tambah Paragraf
          </Button>
        </div>

        <Button onClick={handleSave} disabled={saving} className="w-full md:w-auto">
          <Save className="w-4 h-4 mr-2" />
          {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
        </Button>
      </div>
    </SimpleLayout>
  )
}
