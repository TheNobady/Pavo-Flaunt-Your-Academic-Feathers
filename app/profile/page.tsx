"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge as UIBadge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Award,
  BookOpen,
  Users,
  Star,
  Trophy,
  CheckCircle,
  Calendar,
  MapPin,
  Mail,
  Edit,
  Crown,
  Shield,
  Target,
  Zap,
  AlertCircle,
  Download,
} from "lucide-react"
import Link from "next/link"

interface Badge {
  id: string
  name: string
  description: string
  icon: string
  earnedAt: string
  category: string
  special?: boolean
  badgeId?: string
  downloadable?: boolean
  studentEmail?: string
}

interface Certificate {
  id: string
  name: string
  issuer: string
  earnedAt: string
  type: string
}

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null)
  const [badges, setBadges] = useState<Badge[]>([])
  const [certificates, setCertificates] = useState<Certificate[]>([])

  useEffect(() => {
    // Load user data
    const userData = JSON.parse(localStorage.getItem("user") || "{}")
    console.log("[v0] User data loaded:", userData) // Debug log
    console.log("[v0] User badges:", userData.badges) // Debug log
    setUser(userData)
    setBadges(userData.badges || [])
    setCertificates(userData.certificates || [])
  }, [])

  const downloadBadgePDF = (badge: Badge) => {
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")

    if (!ctx) return

    // Set canvas size for badge certificate
    canvas.width = 800
    canvas.height = 600

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, 800, 600)
    if (badge.category === "official") {
      gradient.addColorStop(0, "#fbbf24")
      gradient.addColorStop(1, "#f59e0b")
    } else {
      gradient.addColorStop(0, "#3b82f6")
      gradient.addColorStop(1, "#1d4ed8")
    }
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 800, 600)

    // Border
    ctx.strokeStyle = "#ffffff"
    ctx.lineWidth = 8
    ctx.strokeRect(20, 20, 760, 560)

    // Inner border
    ctx.lineWidth = 2
    ctx.strokeRect(40, 40, 720, 520)

    // Header
    ctx.fillStyle = "#ffffff"
    ctx.font = "bold 32px Arial"
    ctx.textAlign = "center"
    ctx.fillText("CERTIFICATE OF ACHIEVEMENT", 400, 100)

    // Badge name
    ctx.font = "bold 28px Arial"
    ctx.fillText(badge.name.toUpperCase(), 400, 180)

    // Recipient
    ctx.font = "20px Arial"
    ctx.fillText("This is to certify that", 400, 240)

    ctx.font = "bold 24px Arial"
    ctx.fillText(user.name || "Student Name", 400, 280)

    // Achievement text
    ctx.font = "18px Arial"
    ctx.fillText("has successfully earned the", 400, 320)
    ctx.fillText(badge.description, 400, 350)

    // Badge ID
    ctx.font = "16px Arial"
    ctx.fillText(`Badge ID: ${badge.badgeId || "N/A"}`, 400, 400)

    // Date
    ctx.fillText(`Earned on: ${new Date(badge.earnedAt).toLocaleDateString()}`, 400, 430)

    // Footer
    ctx.font = "bold 16px Arial"
    ctx.fillText("PAVO EDUCATION PLATFORM", 400, 500)

    if (badge.category === "official") {
      ctx.fillText("In Partnership with Government of Jammu & Kashmir", 400, 530)
    }

    // Convert to blob and download
    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `${badge.name.replace(/\s+/g, "-")}-Certificate-${badge.badgeId || "Badge"}.pdf`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      }
    })
  }

  const downloadStudentPartnerID = () => {
    // Create a canvas to generate the ID card
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")

    if (!ctx) return

    // Set canvas size
    canvas.width = 600
    canvas.height = 380

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, 600, 380)
    gradient.addColorStop(0, "#1e40af")
    gradient.addColorStop(1, "#3b82f6")
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 600, 380)

    // Header
    ctx.fillStyle = "#ffffff"
    ctx.font = "bold 24px Arial"
    ctx.textAlign = "center"
    ctx.fillText("GOVERNMENT OF JAMMU & KASHMIR", 300, 40)

    ctx.font = "bold 20px Arial"
    ctx.fillText("OFFICIAL STUDENT PARTNER", 300, 70)

    // ID Card border
    ctx.strokeStyle = "#ffffff"
    ctx.lineWidth = 3
    ctx.strokeRect(20, 20, 560, 340)

    // User info section
    ctx.fillStyle = "#ffffff"
    ctx.font = "bold 18px Arial"
    ctx.textAlign = "left"
    ctx.fillText("Name: " + (user.name || "Student Name"), 50, 120)

    ctx.font = "16px Arial"
    ctx.fillText("Email: " + (user.email || "student@email.com"), 50, 150)
    ctx.fillText("Location: " + (user.location || "Jammu & Kashmir"), 50, 180)
    ctx.fillText("Student ID: JK-SP-" + Math.random().toString(36).substr(2, 8).toUpperCase(), 50, 210)
    ctx.fillText("Issue Date: " + new Date().toLocaleDateString(), 50, 240)
    ctx.fillText("Valid Until: " + new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString(), 50, 270)

    // Footer
    ctx.font = "bold 14px Arial"
    ctx.textAlign = "center"
    ctx.fillText("This certifies that the above named person is an", 300, 320)
    ctx.fillText("Official Student Partner of Pavo Education Platform", 300, 340)

    // Convert to blob and download
    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `JK-Student-Partner-ID-${user.name?.replace(/\s+/g, "-") || "Student"}.png`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      }
    })
  }

  const getIconComponent = (iconName: string) => {
    const icons: { [key: string]: any } = {
      CheckCircle,
      Award,
      BookOpen,
      Users,
      Star,
      Trophy,
      Crown,
      Shield,
      Target,
      Zap,
      AlertCircle,
    }
    return icons[iconName] || Award
  }

  const getBadgesByCategory = (category: string) => {
    return badges.filter((badge) => badge.category === category)
  }

  if (!user) {
    return <div>Loading...</div>
  }

  const hasOfficialBadge = getBadgesByCategory("official").length > 0
  console.log("[v0] Has official badge:", hasOfficialBadge) // Debug log
  console.log("[v0] Official badges:", getBadgesByCategory("official")) // Debug log

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="flex flex-col items-center">
                <Avatar className="w-24 h-24 mb-4">
                  <AvatarImage src="/placeholder-avatar.jpg" />
                  <AvatarFallback className="text-2xl">{user.name?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/profile/edit">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Link>
                </Button>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl font-bold">{user.name}</h1>
                  {hasOfficialBadge && (
                    <UIBadge variant="secondary" className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                      <Crown className="h-3 w-3 mr-1" />
                      J&K Partner
                    </UIBadge>
                  )}
                  {user.uniqueBadgeId && (
                    <UIBadge variant="outline" className="text-xs">
                      ID: {user.uniqueBadgeId}
                    </UIBadge>
                  )}
                </div>

                {!user.profileCompleted && (
                  <div className="mb-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
                        <AlertCircle className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-blue-800">Complete Your Profile</h3>
                        <p className="text-sm text-blue-700">
                          Complete your profile to earn the official J&K Government Student Partner badge and unlock ID
                          download
                        </p>
                      </div>
                      <Button asChild className="bg-blue-600 hover:bg-blue-700">
                        <Link href="/profile/complete">Complete Now</Link>
                      </Button>
                    </div>
                  </div>
                )}

                {hasOfficialBadge && (
                  <div className="mb-4 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border-2 border-yellow-300 shadow-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-3 rounded-full shadow-md">
                          <Shield className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-bold text-yellow-800 text-lg">🎉 Congratulations!</h3>
                          <h4 className="font-semibold text-yellow-800">Official J&K Government Student Partner</h4>
                          <p className="text-sm text-yellow-700">
                            Download your official government-issued student partner ID card
                          </p>
                          <p className="text-xs text-yellow-600 mt-1">
                            Badge ID: {getBadgesByCategory("official")[0]?.badgeId}
                          </p>
                        </div>
                      </div>
                      <Button
                        onClick={downloadStudentPartnerID}
                        size="lg"
                        className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white shadow-lg"
                      >
                        <Award className="h-5 w-5 mr-2" />
                        Download Official ID
                      </Button>
                    </div>
                  </div>
                )}

                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    {user.email}
                  </div>
                  {user.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {user.location}
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Joined {new Date(user.signupTime || user.loginTime).toLocaleDateString()}
                  </div>
                </div>

                {user.bio && <p className="text-gray-700 mb-4">{user.bio}</p>}

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{badges.length}</div>
                    <div className="text-sm text-gray-600">Badges</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{certificates.length}</div>
                    <div className="text-sm text-gray-600">Certificates</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">{user.rewards || 0}</div>
                    <div className="text-sm text-gray-600">Reward Points</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="badges" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="badges">Badges</TabsTrigger>
            <TabsTrigger value="certificates">Certificates</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="rewards">Rewards</TabsTrigger>
          </TabsList>

          {/* Badges Tab */}
          <TabsContent value="badges">
            <div className="space-y-6">
              {/* Special Badges */}
              {getBadgesByCategory("official").length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Crown className="h-5 w-5 text-yellow-600" />
                      Official Badges
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {getBadgesByCategory("official").map((badge) => {
                        const IconComponent = getIconComponent(badge.icon)
                        return (
                          <div
                            key={badge.id}
                            className="flex items-center gap-3 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200"
                          >
                            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-2 rounded-full">
                              <IconComponent className="h-6 w-6" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold">{badge.name}</h3>
                              <p className="text-sm text-gray-600">{badge.description}</p>
                              <p className="text-xs text-gray-500">
                                Earned {new Date(badge.earnedAt).toLocaleDateString()}
                              </p>
                              <p className="text-xs text-yellow-600 font-mono">Badge ID: {badge.badgeId}</p>
                            </div>
                            {badge.downloadable && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => downloadBadgePDF(badge)}
                                className="border-yellow-300 text-yellow-700 hover:bg-yellow-50"
                              >
                                <Download className="h-4 w-4 mr-1" />
                                PDF
                              </Button>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Profile Badges */}
              {getBadgesByCategory("profile").length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      Profile Badges
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {getBadgesByCategory("profile").map((badge) => {
                        const IconComponent = getIconComponent(badge.icon)
                        return (
                          <div
                            key={badge.id}
                            className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200"
                          >
                            <div className="bg-gradient-to-r from-green-400 to-emerald-500 text-white p-2 rounded-full">
                              <IconComponent className="h-6 w-6" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold">{badge.name}</h3>
                              <p className="text-sm text-gray-600">{badge.description}</p>
                              <p className="text-xs text-gray-500">
                                Earned {new Date(badge.earnedAt).toLocaleDateString()}
                              </p>
                              <p className="text-xs text-green-600 font-mono">Badge ID: {badge.badgeId}</p>
                            </div>
                            {badge.downloadable && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => downloadBadgePDF(badge)}
                                className="border-green-300 text-green-700 hover:bg-green-50"
                              >
                                <Download className="h-4 w-4 mr-1" />
                                PDF
                              </Button>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Achievement Badges */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-blue-600" />
                    Achievement Badges
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {getBadgesByCategory("achievement").map((badge) => {
                      const IconComponent = getIconComponent(badge.icon)
                      return (
                        <div key={badge.id} className="flex items-center gap-3 p-3 bg-white rounded-lg border">
                          <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
                            <IconComponent className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium">{badge.name}</h3>
                            <p className="text-sm text-gray-600">{badge.description}</p>
                            {badge.badgeId && <p className="text-xs text-blue-600 font-mono">ID: {badge.badgeId}</p>}
                          </div>
                          {badge.downloadable && (
                            <Button size="sm" variant="outline" onClick={() => downloadBadgePDF(badge)}>
                              <Download className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      )
                    })}

                    {/* Placeholder badges */}
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-dashed">
                      <div className="bg-gray-200 p-2 rounded-full">
                        <BookOpen className="h-5 w-5 text-gray-400" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-500">Module Master</h3>
                        <p className="text-sm text-gray-400">Complete 10 modules</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-dashed">
                      <div className="bg-gray-200 p-2 rounded-full">
                        <Users className="h-5 w-5 text-gray-400" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-500">Community Helper</h3>
                        <p className="text-sm text-gray-400">Help 5 students</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Certificates Tab */}
          <TabsContent value="certificates">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-green-600" />
                  Certificates
                </CardTitle>
                <CardDescription>Certificates earned from mentorship sessions and course completions</CardDescription>
              </CardHeader>
              <CardContent>
                {certificates.length > 0 ? (
                  <div className="space-y-4">
                    {certificates.map((cert) => (
                      <div
                        key={cert.id}
                        className="flex items-center gap-4 p-4 bg-green-50 rounded-lg border border-green-200"
                      >
                        <div className="bg-green-100 text-green-600 p-3 rounded-full">
                          <Award className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{cert.name}</h3>
                          <p className="text-sm text-gray-600">Issued by {cert.issuer}</p>
                          <p className="text-xs text-gray-500">Earned {new Date(cert.earnedAt).toLocaleDateString()}</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="font-medium text-gray-900 mb-2">No certificates yet</h3>
                    <p className="text-gray-600 mb-4">Attend mentorship sessions to earn your first certificate</p>
                    <Button asChild>
                      <Link href="/mentorship">Browse Mentors</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Progress Tab */}
          <TabsContent value="progress">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Learning Progress</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>E-books Read</span>
                      <span>3/10</span>
                    </div>
                    <Progress value={30} />
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Modules Completed</span>
                      <span>8/50</span>
                    </div>
                    <Progress value={16} />
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Mentorship Sessions</span>
                      <span>2/5</span>
                    </div>
                    <Progress value={40} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Rewards Tab */}
          <TabsContent value="rewards">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-600" />
                  Reward Points: {user.rewards || 0}
                </CardTitle>
                <CardDescription>Use your points for mentorship sessions and premium content</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-semibold mb-2">Mentorship Session</h3>
                      <p className="text-sm text-gray-600 mb-3">1-hour session with expert mentor</p>
                      <div className="flex items-center justify-between">
                        <UIBadge variant="outline">50 Points</UIBadge>
                        <Button size="sm">Redeem</Button>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h3 className="font-semibold mb-2">Premium E-book</h3>
                      <p className="text-sm text-gray-600 mb-3">Access to advanced level books</p>
                      <div className="flex items-center justify-between">
                        <UIBadge variant="outline">25 Points</UIBadge>
                        <Button size="sm">Redeem</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
