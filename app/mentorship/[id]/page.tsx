"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Star, MapPin, MessageCircle, Video, Users, Clock, Award, BookOpen, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

// Mock mentor data (in real app, this would come from API)
const mentorData = {
  "1": {
    id: "1",
    name: "Dr. Priya Sharma",
    title: "Senior Software Engineer",
    company: "Google India",
    field: "Computer Science",
    experience: 8,
    rating: 4.9,
    reviews: 127,
    location: "Bangalore, Karnataka",
    languages: ["English", "Hindi", "Kannada"],
    expertise: [
      "Software Development",
      "Data Structures",
      "System Design",
      "Career Guidance",
      "Interview Preparation",
      "Tech Leadership",
    ],
    education: "IIT Delhi - B.Tech CSE, Stanford - MS CS",
    bio: "Passionate about helping students navigate their tech careers. Started from a government college and now working at Google. I believe that with the right guidance and determination, anyone can achieve their dreams regardless of their background.",
    availability: "available",
    sessionTypes: ["chat", "video", "group"],
    price: 500,
    image: "/indian-woman-software-engineer.jpg",
    achievements: [
      "Led 5+ major projects at Google",
      "Mentored 50+ students successfully",
      "Published 10+ research papers",
      "Speaker at tech conferences",
    ],
    reviews: [
      {
        id: 1,
        name: "Rahul Kumar",
        rating: 5,
        comment: "Dr. Priya helped me crack Google interview. Her guidance was invaluable!",
        date: "2 weeks ago",
      },
      {
        id: 2,
        name: "Sneha Patel",
        rating: 5,
        comment: "Amazing mentor! She helped me choose the right career path in tech.",
        date: "1 month ago",
      },
      {
        id: 3,
        name: "Arjun Singh",
        rating: 4,
        comment: "Very knowledgeable and patient. Highly recommend for CS students.",
        date: "2 months ago",
      },
    ],
    schedule: [
      { day: "Monday", slots: ["10:00 AM", "2:00 PM", "6:00 PM"] },
      { day: "Wednesday", slots: ["11:00 AM", "3:00 PM", "7:00 PM"] },
      { day: "Friday", slots: ["9:00 AM", "1:00 PM", "5:00 PM"] },
      { day: "Saturday", slots: ["10:00 AM", "2:00 PM"] },
    ],
  },
}

export default function MentorProfilePage() {
  const params = useParams()
  const mentorId = params.id as string
  const mentor = mentorData[mentorId as keyof typeof mentorData]

  const [selectedSessionType, setSelectedSessionType] = useState<string>("")
  const [selectedDay, setSelectedDay] = useState<string>("")
  const [selectedSlot, setSelectedSlot] = useState<string>("")
  const [message, setMessage] = useState<string>("")
  const [isBooking, setIsBooking] = useState(false)

  if (!mentor) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Mentor not found</h2>
          <p className="text-muted-foreground mb-4">The mentor you're looking for doesn't exist.</p>
          <Button asChild>
            <Link href="/mentorship">Back to Mentors</Link>
          </Button>
        </div>
      </div>
    )
  }

  const handleBookSession = async () => {
    if (!selectedSessionType || !selectedDay || !selectedSlot) {
      alert("Please select all required fields")
      return
    }

    setIsBooking(true)
    // Simulate booking process
    await new Promise((resolve) => setTimeout(resolve, 2000))
    alert("Session booked successfully! You will receive a confirmation email shortly.")
    setIsBooking(false)
  }

  const sessionPrices = {
    chat: mentor.price * 0.7,
    video: mentor.price,
    group: mentor.price * 0.5,
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/mentorship">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Mentors
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Header */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={mentor.image || "/placeholder.svg"} alt={mentor.name} />
                    <AvatarFallback className="text-2xl">
                      {mentor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h1 className="text-3xl font-bold mb-2">{mentor.name}</h1>
                        <p className="text-xl text-muted-foreground mb-1">{mentor.title}</p>
                        <p className="text-lg font-medium text-primary mb-3">{mentor.company}</p>
                      </div>
                      <Badge variant="default" className="bg-green-100 text-green-800">
                        {mentor.availability}
                      </Badge>
                    </div>

                    <div className="flex items-center space-x-6 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium text-foreground">{mentor.rating}</span>
                        <span>({mentor.reviews.length} reviews)</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{mentor.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{mentor.experience} years experience</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 mb-4">
                      <span className="text-sm text-muted-foreground">Session Types:</span>
                      {mentor.sessionTypes.includes("chat") && <MessageCircle className="w-5 h-5 text-primary" />}
                      {mentor.sessionTypes.includes("video") && <Video className="w-5 h-5 text-primary" />}
                      {mentor.sessionTypes.includes("group") && <Users className="w-5 h-5 text-primary" />}
                    </div>

                    <div>
                      <span className="text-sm text-muted-foreground">Languages: </span>
                      <span className="text-sm">{mentor.languages.join(", ")}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs Content */}
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="expertise">Expertise</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="schedule">Schedule</TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BookOpen className="w-5 h-5 mr-2 text-primary" />
                      About Me
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{mentor.bio}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Award className="w-5 h-5 mr-2 text-primary" />
                      Education & Background
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-medium mb-4">{mentor.education}</p>
                    <div className="space-y-2">
                      {mentor.achievements.map((achievement, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-sm">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="expertise">
                <Card>
                  <CardHeader>
                    <CardTitle>Areas of Expertise</CardTitle>
                    <CardDescription>Skills and topics I can help you with</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-3">
                      {mentor.expertise.map((skill, index) => (
                        <div key={index} className="flex items-center space-x-2 p-3 bg-primary/5 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-primary" />
                          <span className="font-medium">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews">
                <div className="space-y-4">
                  {mentor.reviews.map((review) => (
                    <Card key={review.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-medium">{review.name}</p>
                            <div className="flex items-center space-x-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                                />
                              ))}
                            </div>
                          </div>
                          <span className="text-sm text-muted-foreground">{review.date}</span>
                        </div>
                        <p className="text-muted-foreground">{review.comment}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="schedule">
                <Card>
                  <CardHeader>
                    <CardTitle>Available Time Slots</CardTitle>
                    <CardDescription>Choose a convenient time for your session</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mentor.schedule.map((daySchedule) => (
                        <div key={daySchedule.day} className="border rounded-lg p-4">
                          <h4 className="font-medium mb-3">{daySchedule.day}</h4>
                          <div className="grid grid-cols-3 gap-2">
                            {daySchedule.slots.map((slot) => (
                              <Button key={slot} variant="outline" size="sm" className="text-sm bg-transparent">
                                {slot}
                              </Button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Book a Session</CardTitle>
                <CardDescription>Choose your preferred session type and time</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Session Type</label>
                  <Select value={selectedSessionType} onValueChange={setSelectedSessionType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select session type" />
                    </SelectTrigger>
                    <SelectContent>
                      {mentor.sessionTypes.includes("chat") && (
                        <SelectItem value="chat">
                          <div className="flex items-center justify-between w-full">
                            <span>Chat Session</span>
                            <span className="ml-2">₹{sessionPrices.chat}</span>
                          </div>
                        </SelectItem>
                      )}
                      {mentor.sessionTypes.includes("video") && (
                        <SelectItem value="video">
                          <div className="flex items-center justify-between w-full">
                            <span>Video Call</span>
                            <span className="ml-2">₹{sessionPrices.video}</span>
                          </div>
                        </SelectItem>
                      )}
                      {mentor.sessionTypes.includes("group") && (
                        <SelectItem value="group">
                          <div className="flex items-center justify-between w-full">
                            <span>Group Session</span>
                            <span className="ml-2">₹{sessionPrices.group}</span>
                          </div>
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Preferred Day</label>
                  <Select value={selectedDay} onValueChange={setSelectedDay}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select day" />
                    </SelectTrigger>
                    <SelectContent>
                      {mentor.schedule.map((daySchedule) => (
                        <SelectItem key={daySchedule.day} value={daySchedule.day}>
                          {daySchedule.day}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedDay && (
                  <div>
                    <label className="text-sm font-medium mb-2 block">Time Slot</label>
                    <Select value={selectedSlot} onValueChange={setSelectedSlot}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        {mentor.schedule
                          .find((d) => d.day === selectedDay)
                          ?.slots.map((slot) => (
                            <SelectItem key={slot} value={slot}>
                              {slot}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div>
                  <label className="text-sm font-medium mb-2 block">Message (Optional)</label>
                  <Textarea
                    placeholder="Tell the mentor about your goals and what you'd like to discuss..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={3}
                  />
                </div>

                {selectedSessionType && (
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-medium">Session Fee:</span>
                      <span className="text-2xl font-bold text-primary">
                        ₹{sessionPrices[selectedSessionType as keyof typeof sessionPrices]}
                      </span>
                    </div>
                    <Button
                      className="w-full"
                      onClick={handleBookSession}
                      disabled={isBooking || !selectedSessionType || !selectedDay || !selectedSlot}
                    >
                      {isBooking ? "Booking..." : "Book Session"}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
