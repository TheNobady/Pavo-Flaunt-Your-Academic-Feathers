"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ArrowLeft, Send, Users, Smile, Paperclip, Phone, Video, Info, Search } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

interface ChatMessage {
  id: string
  content: string
  author: {
    id: string
    name: string
    avatar?: string
    role: "Student" | "Mentor" | "Alumni"
    stream?: string
    isOnline: boolean
  }
  timestamp: Date
  type: "text" | "image" | "file"
  reactions?: { emoji: string; count: number; users: string[] }[]
}

interface ChatRoom {
  id: string
  name: string
  description: string
  type: "stream" | "study-group" | "general"
  stream?: string
  participants: number
  isPrivate: boolean
}

const mockUsers = [
  {
    id: "1",
    name: "Rahul Kumar",
    avatar: "/placeholder.svg",
    role: "Student" as const,
    stream: "Science (PCM)",
    isOnline: true,
  },
  {
    id: "2",
    name: "Priya Sharma",
    avatar: "/placeholder.svg",
    role: "Student" as const,
    stream: "Commerce",
    isOnline: true,
  },
  {
    id: "3",
    name: "Dr. Rajesh Kumar",
    avatar: "/placeholder.svg",
    role: "Mentor" as const,
    stream: "All Streams",
    isOnline: false,
  },
  {
    id: "4",
    name: "Amit Verma",
    avatar: "/placeholder.svg",
    role: "Alumni" as const,
    stream: "Engineering",
    isOnline: true,
  },
]

const chatRooms: Record<string, ChatRoom> = {
  "pcm-physics": {
    id: "pcm-physics",
    name: "Physics Doubt Clearing",
    description: "Get help with Physics concepts and problems",
    type: "stream",
    stream: "Science (PCM)",
    participants: 45,
    isPrivate: false,
  },
  "commerce-ca": {
    id: "commerce-ca",
    name: "CA Foundation Study Group",
    description: "Prepare for CA Foundation together",
    type: "study-group",
    stream: "Commerce",
    participants: 32,
    isPrivate: false,
  },
  "arts-upsc": {
    id: "arts-upsc",
    name: "UPSC Preparation",
    description: "Civil services exam preparation and discussion",
    type: "study-group",
    stream: "Arts/Humanities",
    participants: 67,
    isPrivate: false,
  },
}

export default function ChatRoomPage() {
  const params = useParams()
  const roomId = params.roomId as string
  const room = chatRooms[roomId]

  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [onlineUsers, setOnlineUsers] = useState(mockUsers.filter((u) => u.isOnline))
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const currentUser = mockUsers[0] // Simulate current user

  useEffect(() => {
    const mockMessages: ChatMessage[] = [
      {
        id: "1",
        content: "Hey everyone! I'm having trouble with the concept of electric field. Can someone help?",
        author: mockUsers[0],
        timestamp: new Date(Date.now() - 3600000),
        type: "text",
      },
      {
        id: "2",
        content:
          "Electric field is the force per unit charge. Think of it as the 'influence' that a charge exerts on the space around it.",
        author: mockUsers[2],
        timestamp: new Date(Date.now() - 3500000),
        type: "text",
        reactions: [{ emoji: "👍", count: 3, users: ["1", "3", "4"] }],
      },
      {
        id: "3",
        content: "That's a great explanation! I'd also recommend visualizing it with field lines.",
        author: mockUsers[3],
        timestamp: new Date(Date.now() - 3400000),
        type: "text",
      },
      {
        id: "4",
        content: "Thanks! That really helps. Do you have any good resources for practice problems?",
        author: mockUsers[0],
        timestamp: new Date(Date.now() - 3300000),
        type: "text",
      },
    ]
    setMessages(mockMessages)
  }, [roomId])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const message: ChatMessage = {
      id: Date.now().toString(),
      content: newMessage,
      author: currentUser,
      timestamp: new Date(),
      type: "text",
    }

    setMessages((prev) => [...prev, message])
    setNewMessage("")

    if (Math.random() > 0.7) {
      setTimeout(
        () => {
          const responder = mockUsers[Math.floor(Math.random() * (mockUsers.length - 1)) + 1]
          const responses = [
            "Great question! Let me help you with that.",
            "I had the same doubt when I was studying. Here's what helped me...",
            "That's a common confusion. The key is to understand...",
            "I can share some resources that might help!",
            "Feel free to ask if you need more clarification.",
          ]

          const response: ChatMessage = {
            id: (Date.now() + 1).toString(),
            content: responses[Math.floor(Math.random() * responses.length)],
            author: responder,
            timestamp: new Date(),
            type: "text",
          }

          setMessages((prev) => [...prev, response])
        },
        1000 + Math.random() * 2000,
      )
    }
  }

  const handleTyping = (value: string) => {
    setNewMessage(value)
    setIsTyping(true)
    setTimeout(() => setIsTyping(false), 1000)
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Mentor":
        return "bg-purple-100 text-purple-800"
      case "Alumni":
        return "bg-blue-100 text-blue-800"
      case "Student":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (!room) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Chat Room Not Found</h2>
          <Button asChild>
            <Link href="/community">Back to Community</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Chat Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/community">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Link>
              </Button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary font-semibold text-sm">
                    {room.stream?.split(" ")[0].substring(0, 3).toUpperCase() || "GEN"}
                  </span>
                </div>
                <div>
                  <h1 className="text-lg font-semibold">{room.name}</h1>
                  <p className="text-sm text-muted-foreground">
                    {room.participants} participants • {onlineUsers.length} online
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Search className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Phone className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Video className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Info className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex">
        {/* Chat Messages */}
        <div className="flex-1 flex flex-col">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4 max-w-4xl mx-auto">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start space-x-3 ${
                    message.author.id === currentUser.id ? "flex-row-reverse space-x-reverse" : ""
                  }`}
                >
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={message.author.avatar || "/placeholder.svg"} alt={message.author.name} />
                    <AvatarFallback className="text-xs">
                      {message.author.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div
                    className={`flex-1 max-w-xs md:max-w-md ${
                      message.author.id === currentUser.id ? "text-right" : ""
                    }`}
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-sm font-medium">{message.author.name}</span>
                      <Badge className={`${getRoleColor(message.author.role)} text-xs`}>{message.author.role}</Badge>
                      <span className="text-xs text-muted-foreground">
                        {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>

                    <div
                      className={`p-3 rounded-lg ${
                        message.author.id === currentUser.id ? "bg-primary text-primary-foreground ml-auto" : "bg-muted"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                    </div>

                    {message.reactions && message.reactions.length > 0 && (
                      <div className="flex items-center space-x-1 mt-1">
                        {message.reactions.map((reaction, index) => (
                          <Button key={index} variant="ghost" size="sm" className="h-6 px-2 text-xs">
                            {reaction.emoji} {reaction.count}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-current rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-current rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                  <span className="text-sm">Someone is typing...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Message Input */}
          <div className="border-t p-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Paperclip className="w-4 h-4" />
                </Button>
                <div className="flex-1 relative">
                  <Input
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => handleTyping(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="pr-10"
                  />
                  <Button variant="ghost" size="sm" className="absolute right-1 top-1/2 -translate-y-1/2">
                    <Smile className="w-4 h-4" />
                  </Button>
                </div>
                <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Online Users Sidebar */}
        <div className="w-64 border-l bg-card/50 hidden lg:block">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Online ({onlineUsers.length})</h3>
              <Users className="w-4 h-4 text-muted-foreground" />
            </div>

            <div className="space-y-3">
              {onlineUsers.map((user) => (
                <div key={user.id} className="flex items-center space-x-3">
                  <div className="relative">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback className="text-xs">
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{user.name}</p>
                    <Badge className={`${getRoleColor(user.role)} text-xs`}>{user.role}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
