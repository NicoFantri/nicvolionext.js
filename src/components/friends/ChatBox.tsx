'use client'

import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { UserIcon, SendIcon } from 'lucide-react'

type Message = {
  id: string
  name: string
  message: string
  created_at: string
}

export function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [username, setUsername] = useState('')
  const [isJoined, setIsJoined] = useState(false)
  
  const supabase = createClient()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    // Fetch initial messages
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .order('created_at', { ascending: true })
        .limit(50)
      
      if (data && !error) {
        setMessages(data)
      }
    }

    if (isJoined) {
      fetchMessages()

      // Subscribe to real-time changes
      const channel = supabase
        .channel('public:chat_messages')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'chat_messages' }, (payload) => {
          setMessages((current) => [...current, payload.new as Message])
        })
        .subscribe()

      return () => {
        supabase.removeChannel(channel)
      }
    }
  }, [isJoined, supabase])

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault()
    if (username.trim()) {
      setIsJoined(true)
    }
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || !username) return

    const msg = newMessage
    setNewMessage('') // clear input early for better UX

    await supabase.from('chat_messages').insert([
      { name: username, message: msg }
    ])
  }

  if (!isJoined) {
    return (
      <div className="bg-background border border-border rounded-xl p-8 max-w-md mx-auto mt-10 shadow-sm text-center">
        <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
          <UserIcon className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold mb-2">Bergabung ke Obrolan</h2>
        <p className="text-muted-foreground text-sm mb-6">Silakan masukkan nama Anda untuk mulai mengobrol dengan pengunjung lain.</p>
        <form onSubmit={handleJoin} className="flex flex-col gap-3">
          <Input 
            placeholder="Ketik nama Anda di sini..." 
            value={username} 
            onChange={(e) => setUsername(e.target.value)}
            required
            className="text-center"
          />
          <Button type="submit" className="w-full">Masuk ke Chat</Button>
        </form>
      </div>
    )
  }

  return (
    <div className="bg-background border border-border rounded-xl flex flex-col h-[500px] shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-border bg-muted/30 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="font-semibold text-sm">Live Chat ({username})</span>
        </div>
      </div>
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
        {messages.length === 0 ? (
          <div className="m-auto text-muted-foreground text-sm text-center">Belum ada pesan. Jadilah yang pertama!</div>
        ) : (
          messages.map((msg) => {
            const isMe = msg.name === username
            return (
              <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} max-w-[80%]`}>
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

      {/* Input */}
      <div className="p-3 border-t border-border bg-background">
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
      </div>
    </div>
  )
}
