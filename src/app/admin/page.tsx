import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { SimpleLayout } from '@/components/layout/SimpleLayout'
import { Button } from '@/components/ui/button'
import { UserIcon, FolderIcon, BriefcaseIcon, BadgeCheck } from 'lucide-react'
import { LogoutButton } from '@/components/admin/LogoutButton'

export default async function AdminDashboard() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/admin/login')
  }

  const cards = [
    {
      title: 'Edit Profile / About',
      desc: 'Ubah deskripsi tentang Anda, foto profil, dan info dasar lainnya.',
      href: '/admin/about',
      label: 'Edit About',
      icon: UserIcon,
      color: 'text-blue-500 bg-blue-500/10',
    },
    {
      title: 'Kelola Project',
      desc: 'Upload project baru, edit yang sudah ada, atau hapus project lama.',
      href: '/admin/projects',
      label: 'Kelola Project',
      icon: FolderIcon,
      color: 'text-emerald-500 bg-emerald-500/10',
    },
    {
      title: 'Kelola Experience',
      desc: 'Tambahkan riwayat studi atau pengalaman kerja terbaru.',
      href: '/admin/experience',
      label: 'Edit Experience',
      icon: BriefcaseIcon,
      color: 'text-orange-500 bg-orange-500/10',
    },
    {
      title: 'Kelola Sertifikat',
      desc: 'Upload foto/pdf sertifikat dan penghargaan yang baru diraih.',
      href: '/admin/certificates',
      label: 'Kelola Sertifikat',
      icon: BadgeCheck,
      color: 'text-purple-500 bg-purple-500/10',
    },
  ]

  return (
    <SimpleLayout title="Dashboard Admin" intro="Selamat datang! Di sini Anda bisa mengatur konten portfolio Anda.">
      {/* User info & logout */}
      <div className="mt-6 mb-8 flex items-center justify-between bg-muted/30 border border-border rounded-xl p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center">
            <UserIcon className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-semibold">Admin</p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
        </div>
        <LogoutButton />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map((card) => (
          <div key={card.href} className="bg-background border border-border p-6 rounded-xl flex flex-col gap-4 shadow-sm hover:shadow-md hover:border-foreground/15 transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-lg ${card.color}`}>
                <card.icon className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold">{card.title}</h2>
            </div>
            <p className="text-muted-foreground text-sm flex-1">{card.desc}</p>
            <Link href={card.href} className="w-full">
              <Button variant="outline" className="w-full">{card.label}</Button>
            </Link>
          </div>
        ))}
      </div>
    </SimpleLayout>
  )
}
