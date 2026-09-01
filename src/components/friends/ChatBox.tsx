'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { UserIcon, SendIcon } from 'lucide-react'
import { GlowingEffect } from '@/components/ui/glowing-effect'

type Message = {
  id: string
  name: string
  message: string
  created_at: string
}

export function ChatBox({ onJoin }: { onJoin?: (name: string) => void }) {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [username, setUsername] = useState('')
  const [isJoined, setIsJoined] = useState(false)
  
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault()
    if (username.trim()) {
      setIsJoined(true)
      if (onJoin) onJoin(username.trim())
    }
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || !username) return

    const msg: Message = {
      id: Date.now().toString(),
      name: username,
      message: newMessage,
      created_at: new Date().toISOString(),
    }

    setMessages((current) => [...current, msg])
    setNewMessage('')
  }

  return (
    <div className="relative h-full w-full rounded-xl p-[2px] group">
      <GlowingEffect
        blur={0}
        borderWidth={3}
        spread={80}
        glow={true}
        disabled={false}
        proximity={64}
        inactiveZone={0.01}
      />
      <div className="relative bg-background/80 backdrop-blur-sm border border-border/50 rounded-[calc(0.75rem-2px)] flex flex-col h-full min-h-[500px] shadow-sm overflow-hidden z-10">
      {/* Header */}
      <div className="px-4 py-3 border-b border-border bg-muted/30 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="font-semibold text-sm">Live Chat {isJoined ? `(${username})` : ''}</span>
        </div>
        <span className="text-xs text-muted-foreground">Mode Lokal</span>
      </div>
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
        {messages.length === 0 ? (
          <div className="m-auto text-muted-foreground text-sm text-center">Belum ada pesan. Jadilah yang pertama!</div>
        ) : (
          messages.map((msg) => {
            const isMe = isJoined && msg.name === username
            return (
              <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} max-w-[80%] ${isMe ? 'self-end' : 'self-start'}`}>
                <span className="text-[10px] text-muted-foreground mb-1 ml-1">{msg.name}</span>
                <div className={`px-3 py-2 rounded-2xl text-sm ${isMe ? 'bg-primary text-primary-foreground rounded-tr-sm' : 'bg-muted rounded-tl-sm'}`}>
                  {msg.message}
                </div>
              </div>
            )
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input / Join Form */}
      <div className="p-3 border-t border-border bg-background">
        {!isJoined ? (
          <form onSubmit={handleJoin} className="flex gap-2">
            <Input 
              placeholder="Masukkan nama untuk mulai chat & main catur..." 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="flex-1 rounded-full px-4"
            />
            <Button type="submit" className="rounded-full shrink-0">
              Gabung
            </Button>
          </form>
        ) : (
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Input 
              placeholder="Ketik pesan..." 
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 rounded-full px-4"
            />
            <Button type="submit" size="icon" className="rounded-full shrink-0" disabled={!newMessage.trim()}>
              <SendIcon className="w-4 h-4" />
            </Button>
          </form>
        )}
      </div>
    </div>
    </div>
  )
}
