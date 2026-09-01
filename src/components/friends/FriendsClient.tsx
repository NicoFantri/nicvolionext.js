'use client'

import { useState, useEffect } from 'react'
import { ChatBox } from './ChatBox'
import { ChessBoardComponent } from './ChessBoard'
import { UserIcon } from 'lucide-react'
import { GlowingEffect } from '@/components/ui/glowing-effect'

type OnlineUser = {
  username: string
  joined_at: string
}

export function FriendsClient() {
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([])
  const [myUsername, setMyUsername] = useState<string>('')

  // When user joins, add them to the local online users list
  const handleJoin = (name: string) => {
    setMyUsername(name)
    setOnlineUsers([{
      username: name,
      joined_at: new Date().toISOString()
    }])
  }

  return (
    <>
      <div className="mt-8 pb-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex flex-col h-[600px]">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
            Live Chat
          </h3>
          <ChatBox onJoin={handleJoin} />
        </div>
        
        <div className="flex flex-col h-[600px]">
          <h3 className="text-xl font-bold mb-4">Papan Catur (Multiplayer)</h3>
          <ChessBoardComponent myUsername={myUsername || `Tamu_${Math.floor(Math.random() * 1000)}`} />
        </div>
      </div>
      
      <div className="mt-16 border-t border-border pt-10">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          Daftar Teman Online 
          <span className="text-sm font-normal bg-primary/20 text-primary px-3 py-1 rounded-full">
            {onlineUsers.length} Online
          </span>
        </h3>
        
        {onlineUsers.length === 0 ? (
          <div className="text-muted-foreground text-center py-10 bg-muted/10 rounded-xl border border-dashed border-border">
            Belum ada teman yang online. Jadilah yang pertama bergabung!
          </div>
        ) : (
          <ul
            role="list"
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 pb-10"
          >
            {onlineUsers.map((user, idx) => (
              <li key={idx} className="relative w-full rounded-xl p-[2px] list-none group">
                <GlowingEffect
                  blur={0}
                  borderWidth={3}
                  spread={80}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                />
                <div className="relative flex items-center gap-4 bg-background/80 backdrop-blur-sm border border-border/50 p-4 rounded-[calc(0.75rem-2px)] shadow-sm transition-shadow z-10">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0">
                    <UserIcon className="w-6 h-6" />
                  </div>
                  <div className="flex flex-col truncate">
                    <span className="font-bold text-foreground truncate">{user.username}</span>
                    <span className="text-xs text-emerald-500 font-medium">Sedang Online</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}
