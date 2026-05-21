'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SimpleLayout } from '@/components/layout/SimpleLayout'
import { ArrowLeft, Save, Plus, Trash2, Pencil, X } from 'lucide-react'
import Link from 'next/link'

type Education = {
  id?: string
  school: string
  major: string
  logo: string
  start_year: string
  end_year: string
  sort_order: number
}

const emptyEdu: Education = {
  school: '', major: '', logo: '', start_year: '', end_year: 'present', sort_order: 0,
}

export default function AdminExperiencePage() {
  const supabase = createClient()
  const router = useRouter()

  const [items, setItems] = useState<Education[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Education | null>(null)
  const [isNew, setIsNew] = useState(false)
  const [saving, setSaving] = useState(false)
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
    const { data } = await supabase.from('education').select('*').order('sort_order', { ascending: true })
    setItems(data || [])
    setLoading(false)
  }

  const startNew = () => { setEditing({ ...emptyEdu }); setIsNew(true) }
  const startEdit = (item: Education) => { setEditing({ ...item }); setIsNew(false) }
  const cancelEdit = () => { setEditing(null); setIsNew(false) }

  const handleSave = async () => {
    if (!editing) return
    setSaving(true)

    const payload = {
      school: editing.school,
      major: editing.major,
      logo: editing.logo,
      start_year: editing.start_year,
      end_year: editing.end_year,
      sort_order: editing.sort_order,
    }

    if (isNew) {
      await supabase.from('education').insert([payload])
      setSuccess('Riwayat studi berhasil ditambahkan!')
    } else {
      await supabase.from('education').update(payload).eq('id', editing.id)
      setSuccess('Riwayat studi berhasil diperbarui!')
    }

    setSaving(false)
    setEditing(null)
    setIsNew(false)
    fetchItems()
    setTimeout(() => setSuccess(''), 3000)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus?')) return
    await supabase.from('education').delete().eq('id', id)
    setSuccess('Data dihapus.')
    fetchItems()
    setTimeout(() => setSuccess(''), 3000)
  }

  if (loading) {
    return (
      <SimpleLayout title="Kelola Experience" intro="Memuat...">
        <div className="mt-10 flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </SimpleLayout>
    )
  }

  return (
    <SimpleLayout title="Kelola Experience" intro="Tambah atau edit riwayat studi dan pengalaman Anda.">
      <div className="mt-6 mb-4 flex items-center justify-between">
        <Link href="/admin" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" /> Kembali
        </Link>
        <Button onClick={startNew} size="sm"><Plus className="w-4 h-4 mr-1" /> Tambah Riwayat</Button>
      </div>

      {success && (
        <div className="mb-6 p-3 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-lg text-sm font-medium">
          ✅ {success}
        </div>
      )}

      {editing && (
        <div className="mb-8 bg-background border border-border rounded-xl p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">{isNew ? 'Tambah Riwayat Baru' : 'Edit Riwayat'}</h3>
            <Button variant="ghost" size="icon" onClick={cancelEdit}><X className="w-4 h-4" /></Button>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Nama Sekolah / Universitas</label>
            <Input value={editing.school} onChange={e => setEditing({ ...editing, school: e.target.value })} placeholder="Universitas Muhammadiyah Malang" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Jurusan / Posisi</label>
            <Input value={editing.major} onChange={e => setEditing({ ...editing, major: e.target.value })} placeholder="Teknik Informatika" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Tahun Mulai</label>
              <Input value={editing.start_year} onChange={e => setEditing({ ...editing, start_year: e.target.value })} placeholder="2022" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Tahun Selesai</label>
              <Input value={editing.end_year} onChange={e => setEditing({ ...editing, end_year: e.target.value })} placeholder="present" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Urutan</label>
              <Input type="number" value={editing.sort_order} onChange={e => setEditing({ ...editing, sort_order: parseInt(e.target.value) || 0 })} />
            </div>
          </div>
          <Button onClick={handleSave} disabled={saving || !editing.school}>
            <Save className="w-4 h-4 mr-2" /> {saving ? 'Menyimpan...' : 'Simpan'}
          </Button>
        </div>
      )}

      {items.length === 0 ? (
        <div className="bg-muted/30 border border-muted-foreground/10 rounded-2xl p-12 text-center">
          <p className="text-muted-foreground">Belum ada data. Klik &quot;Tambah Riwayat&quot; untuk memulai.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map(item => (
            <div key={item.id} className="bg-background border border-border rounded-lg p-4 flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold truncate">{item.school}</h4>
                <p className="text-sm text-muted-foreground capitalize">{item.major}</p>
                <p className="text-xs text-muted-foreground">{item.start_year} — {item.end_year}</p>
              </div>
              <div className="flex gap-1 shrink-0">
                <Button variant="ghost" size="icon" onClick={() => startEdit(item)}><Pencil className="w-4 h-4" /></Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id!)} className="text-red-500 hover:text-red-600"><Trash2 className="w-4 h-4" /></Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </SimpleLayout>
  )
}
