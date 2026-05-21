'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/shared/Card'
import { SimpleLayout } from '@/components/layout/SimpleLayout'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/admin')
      router.refresh()
    }
  }

  return (
    <SimpleLayout title="Login Admin" intro="Silakan masukkan kredensial Anda untuk masuk ke pengaturan portfolio.">
      <div className="flex justify-center mt-10">
        <div className="w-full max-w-md bg-background p-8 rounded-2xl border border-border shadow-sm">
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            {error && (
              <div className="p-3 bg-red-500/10 text-red-500 rounded-md text-sm">
                {error}
              </div>
            )}
            
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                required
                className="w-full"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Password</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full"
              />
            </div>

            <Button type="submit" disabled={loading} className="w-full mt-4">
              {loading ? 'Masuk...' : 'Login'}
            </Button>
          </form>
        </div>
      </div>
    </SimpleLayout>
  )
}
