'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { SimpleLayout } from '@/components/layout/SimpleLayout'
import { ArrowLeft, Save, Plus, Trash2, Pencil, X } from 'lucide-react'
import Link from 'next/link'

type Project = {
  id?: string
  name: string
  description: string
  link_href: string
  link_label: string
  logo: string
  category: string[]
  tags: string[]
  is_github: boolean
  sort_order: number
}

const emptyProject: Project = {
  name: '', description: '', link_href: '#', link_label: '',
  logo: '', category: [], tags: [], is_github: false, sort_order: 0,
}

export default function AdminProjectsPage() {
  const supabase = createClient()
  const router = useRouter()

  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Project | null>(null)
  const [isNew, setIsNew] = useState(false)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState('')
  const [tagsInput, setTagsInput] = useState('')
  const [categoryInput, setCategoryInput] = useState('')

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/admin/login'); return }
      fetchProjects()
    }
    init()
  }, [])

  const fetchProjects = async () => {
    const { data } = await supabase.from('projects').select('*').order('sort_order', { ascending: true })
    setProjects(data || [])
    setLoading(false)
  }

  const startNew = () => {
    setEditing({ ...emptyProject })
    setTagsInput('')
    setCategoryInput('')
    setIsNew(true)
  }

  const startEdit = (p: Project) => {
    setEditing({ ...p })
    setTagsInput((p.tags || []).join(', '))
    setCategoryInput((p.category || []).join(', '))
    setIsNew(false)
  }

  const cancelEdit = () => { setEditing(null); setIsNew(false) }

  const handleSave = async () => {
    if (!editing) return
    setSaving(true)

    const payload = {
      name: editing.name,
      description: editing.description,
      link_href: editing.link_href,
      link_label: editing.link_label || editing.name,
      logo: editing.logo,
      category: categoryInput.split(',').map(s => s.trim()).filter(Boolean),
      tags: tagsInput.split(',').map(s => s.trim()).filter(Boolean),
      is_github: editing.is_github,
      sort_order: editing.sort_order,
    }

    if (isNew) {
      await supabase.from('projects').insert([payload])
      setSuccess('Project berhasil ditambahkan!')
    } else {
      await supabase.from('projects').update(payload).eq('id', editing.id)
      setSuccess('Project berhasil diperbarui!')
    }

    setSaving(false)
    setEditing(null)
    setIsNew(false)
    fetchProjects()
    setTimeout(() => setSuccess(''), 3000)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus project ini?')) return
    await supabase.from('projects').delete().eq('id', id)
    setSuccess('Project dihapus.')
    fetchProjects()
    setTimeout(() => setSuccess(''), 3000)
  }

  if (loading) {
    return (
      <SimpleLayout title="Kelola Project" intro="Memuat...">
        <div className="mt-10 flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </SimpleLayout>
    )
  }

  return (
    <SimpleLayout title="Kelola Project" intro="Tambah, edit, atau hapus project portfolio Anda.">
      <div className="mt-6 mb-4 flex items-center justify-between">
        <Link href="/admin" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" /> Kembali
        </Link>
        <Button onClick={startNew} size="sm"><Plus className="w-4 h-4 mr-1" /> Tambah Project</Button>
      </div>

      {success && (
        <div className="mb-6 p-3 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-lg text-sm font-medium">
          ✅ {success}
        </div>
      )}

      {/* FORM */}
      {editing && (
        <div className="mb-8 bg-background border border-border rounded-xl p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">{isNew ? 'Tambah Project Baru' : 'Edit Project'}</h3>
            <Button variant="ghost" size="icon" onClick={cancelEdit}><X className="w-4 h-4" /></Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Nama Project</label>
              <Input value={editing.name} onChange={e => setEditing({ ...editing, name: e.target.value })} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Link URL</label>
              <Input value={editing.link_href} onChange={e => setEditing({ ...editing, link_href: e.target.value })} />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Deskripsi</label>
            <Textarea value={editing.description} onChange={e => setEditing({ ...editing, description: e.target.value })} rows={3} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Kategori (pisah koma)</label>
              <Input value={categoryInput} onChange={e => setCategoryInput(e.target.value)} placeholder="Web Development, Mobile" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Tags (pisah koma)</label>
              <Input value={tagsInput} onChange={e => setTagsInput(e.target.value)} placeholder="React, Next.js, Flutter" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Logo (nama file)</label>
              <Input value={editing.logo} onChange={e => setEditing({ ...editing, logo: e.target.value })} placeholder="project-1.png" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Urutan</label>
              <Input type="number" value={editing.sort_order} onChange={e => setEditing({ ...editing, sort_order: parseInt(e.target.value) || 0 })} />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="is_github" checked={editing.is_github} onChange={e => setEditing({ ...editing, is_github: e.target.checked })} className="rounded" />
            <label htmlFor="is_github" className="text-sm">Tampilkan di bagian Open Source / GitHub</label>
          </div>
          <Button onClick={handleSave} disabled={saving || !editing.name}>
            <Save className="w-4 h-4 mr-2" /> {saving ? 'Menyimpan...' : 'Simpan'}
          </Button>
        </div>
      )}

      {/* LIST */}
      {projects.length === 0 ? (
        <div className="bg-muted/30 border border-muted-foreground/10 rounded-2xl p-12 text-center">
          <p className="text-muted-foreground">Belum ada project. Klik &quot;Tambah Project&quot; untuk memulai.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {projects.map(p => (
            <div key={p.id} className="bg-background border border-border rounded-lg p-4 flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold truncate">{p.name}</h4>
                <p className="text-sm text-muted-foreground truncate">{p.description}</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {(p.tags || []).map(t => (
                    <span key={t} className="bg-muted text-muted-foreground px-2 py-0.5 text-[10px] rounded-full">{t}</span>
                  ))}
                  {p.is_github && <span className="bg-purple-500/10 text-purple-500 px-2 py-0.5 text-[10px] rounded-full">GitHub</span>}
                </div>
              </div>
              <div className="flex gap-1 shrink-0">
                <Button variant="ghost" size="icon" onClick={() => startEdit(p)}><Pencil className="w-4 h-4" /></Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(p.id!)} className="text-red-500 hover:text-red-600"><Trash2 className="w-4 h-4" /></Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </SimpleLayout>
  )
}
