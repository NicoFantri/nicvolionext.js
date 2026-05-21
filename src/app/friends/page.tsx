import { type Metadata } from 'next'
import { SimpleLayout } from '@/components/layout/SimpleLayout'

import { friendsHeadLine, friendsIntro, projects, githubProjects, friends } from '@/config/infoConfig'

import { FriendCard } from '@/components/friends/FriendCard'
import { GithubProjectCard } from '@/components/project/GithubProjectCard'
import { CustomIcon } from '@/components/shared/CustomIcon'

import { ChatBox } from '@/components/friends/ChatBox'

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
      <div className="mt-8 pb-10">
        <ChatBox />
      </div>
      
      <div className="mt-16 border-t border-border pt-10">
        <h3 className="text-xl font-bold mb-6">Daftar Teman</h3>
        <ul
          role="list"
          className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 pb-10"
        >
          {friends.map((friend) => (
            <FriendCard key={friend.name} friend={friend} />
          ))}
        </ul>
      </div>
    </SimpleLayout>
  )
}
