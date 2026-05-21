'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { SimpleLayout } from '@/components/layout/SimpleLayout'
import { ArrowLeft, Save, Plus, Trash2, Pencil, X, Upload } from 'lucide-react'
import Link from 'next/link'

type Certificate = {
  id?: string
  title: string
  issuer: string
  date: string
  description: string
  image_url: string
  credential_url: string
  sort_order: number
}

const emptyCert: Certificate = {
  title: '', issuer: '', date: '', description: '',
  image_url: '', credential_url: '', sort_order: 0,
}

export default function AdminCertificatesPage() {
  const supabase = createClient()
  const router = useRouter()

  const [items, setItems] = useState<Certificate[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Certificate | null>(null)
  const [isNew, setIsNew] = useState(false)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [success, setSuccess] = useState('')

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/admin/login'); return }
      fetchItems()
    }
    init()
  }, [])

  const fetchItems = async () => {
    const { data } = await supabase.from('certificates').select('*').order('sort_order', { ascending: true })
    setItems(data || [])
    setLoading(false)
  }

  const startNew = () => { setEditing({ ...emptyCert }); setIsNew(true) }
  const startEdit = (item: Certificate) => { setEditing({ ...item }); setIsNew(false) }
  const cancelEdit = () => { setEditing(null); setIsNew(false) }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !editing) return

    setUploading(true)
    const fileExt = file.name.split('.').pop()
    const fileName = `certificates/${Date.now()}.${fileExt}`

    const { error: uploadError } = await supabase.storage
      .from('portfolio')
      .upload(fileName, file)

    if (!uploadError) {
      const { data: { publicUrl } } = supabase.storage
        .from('portfolio')
        .getPublicUrl(fileName)

      setEditing({ ...editing, image_url: publicUrl })
    }
    setUploading(false)
  }

  const handleSave = async () => {
    if (!editing) return
    setSaving(true)

    const payload = {
      title: editing.title,
      issuer: editing.issuer,
      date: editing.date,
      description: editing.description,
      image_url: editing.image_url,
      credential_url: editing.credential_url,
      sort_order: editing.sort_order,
    }

    if (isNew) {
      await supabase.from('certificates').insert([payload])
      setSuccess('Sertifikat berhasil ditambahkan!')
    } else {
      await supabase.from('certificates').update(payload).eq('id', editing.id)
      setSuccess('Sertifikat berhasil diperbarui!')
    }

    setSaving(false)
    setEditing(null)
    setIsNew(false)
    fetchItems()
    setTimeout(() => setSuccess(''), 3000)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus sertifikat ini?')) return
    await supabase.from('certificates').delete().eq('id', id)
    setSuccess('Sertifikat dihapus.')
    fetchItems()
    setTimeout(() => setSuccess(''), 3000)
  }

  if (loading) {
    return (
      <SimpleLayout title="Kelola Sertifikat" intro="Memuat...">
        <div className="mt-10 flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </SimpleLayout>
    )
  }

  return (
    <SimpleLayout title="Kelola Sertifikat" intro="Upload dan kelola sertifikat serta pencapaian Anda.">
      <div className="mt-6 mb-4 flex items-center justify-between">
        <Link href="/admin" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" /> Kembali
        </Link>
        <Button onClick={startNew} size="sm"><Plus className="w-4 h-4 mr-1" /> Tambah Sertifikat</Button>
      </div>

      {success && (
        <div className="mb-6 p-3 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-lg text-sm font-medium">
          ✅ {success}
        </div>
      )}

      {editing && (
        <div className="mb-8 bg-background border border-border rounded-xl p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">{isNew ? 'Tambah Sertifikat Baru' : 'Edit Sertifikat'}</h3>
            <Button variant="ghost" size="icon" onClick={cancelEdit}><X className="w-4 h-4" /></Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Judul Sertifikat</label>
              <Input value={editing.title} onChange={e => setEditing({ ...editing, title: e.target.value })} placeholder="Sertifikasi Web Developer" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Penerbit</label>
              <Input value={editing.issuer} onChange={e => setEditing({ ...editing, issuer: e.target.value })} placeholder="Dicoding, BNSP, Google" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Tanggal</label>
              <Input value={editing.date} onChange={e => setEditing({ ...editing, date: e.target.value })} placeholder="2024-01" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">URL Kredensial (opsional)</label>
              <Input value={editing.credential_url} onChange={e => setEditing({ ...editing, credential_url: e.target.value })} placeholder="https://..." />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Deskripsi (opsional)</label>
            <Textarea value={editing.description} onChange={e => setEditing({ ...editing, description: e.target.value })} rows={2} />
          </div>

          {/* Image Upload */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Gambar Sertifikat</label>
            {editing.image_url && (
              <div className="relative w-full max-w-sm">
                <img src={editing.image_url} alt="Preview" className="rounded-lg border border-border w-full h-auto" />
              </div>
            )}
            <div className="flex items-center gap-2">
              <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-muted rounded-lg text-sm font-medium hover:bg-muted/80 transition-colors">
                <Upload className="w-4 h-4" />
                {uploading ? 'Mengupload...' : 'Upload Gambar'}
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={uploading} />
              </label>
              <span className="text-xs text-muted-foreground">atau</span>
              <Input value={editing.image_url} onChange={e => setEditing({ ...editing, image_url: e.target.value })} placeholder="Paste URL gambar" className="flex-1" />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Urutan</label>
            <Input type="number" value={editing.sort_order} onChange={e => setEditing({ ...editing, sort_order: parseInt(e.target.value) || 0 })} className="w-24" />
          </div>

          <Button onClick={handleSave} disabled={saving || !editing.title}>
            <Save className="w-4 h-4 mr-2" /> {saving ? 'Menyimpan...' : 'Simpan'}
          </Button>
        </div>
      )}

      {items.length === 0 ? (
        <div className="bg-muted/30 border border-muted-foreground/10 rounded-2xl p-12 text-center">
          <p className="text-muted-foreground">Belum ada sertifikat. Klik &quot;Tambah Sertifikat&quot; untuk memulai.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map(item => (
            <div key={item.id} className="bg-background border border-border rounded-xl overflow-hidden shadow-sm">
              {item.image_url && (
                <img src={item.image_url} alt={item.title} className="w-full h-40 object-cover" />
              )}
              <div className="p-4">
                <h4 className="font-semibold">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.issuer}{item.date ? ` • ${item.date}` : ''}</p>
                {item.description && <p className="text-sm text-muted-foreground mt-1">{item.description}</p>}
                <div className="flex gap-1 mt-3">
                  <Button variant="ghost" size="sm" onClick={() => startEdit(item)}><Pencil className="w-3 h-3 mr-1" /> Edit</Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(item.id!)} className="text-red-500 hover:text-red-600"><Trash2 className="w-3 h-3 mr-1" /> Hapus</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </SimpleLayout>
  )
}
