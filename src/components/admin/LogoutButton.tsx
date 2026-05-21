'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'

export function LogoutButton() {
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <Button variant="ghost" size="sm" onClick={handleLogout} className="text-muted-foreground hover:text-red-500">
      <LogOut className="w-4 h-4 mr-2" />
      Logout
    </Button>
  )
}
