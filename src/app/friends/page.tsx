import { type Metadata } from 'next'
import { SimpleLayout } from '@/components/layout/SimpleLayout'
import { FriendsClient } from '@/components/friends/FriendsClient'

export const metadata: Metadata = {
  title: 'Friends & Chat',
  description: 'Tempat bertukar sapa dan mengobrol secara langsung.',
}

export default function Friends() {
  return (
    <SimpleLayout
      title="Friends & Chat"
      intro="Halo! Silakan masukkan nama Anda dan mulai mengobrol bersama pengunjung lainnya."
    >
      <FriendsClient />
    </SimpleLayout>
  )
}
