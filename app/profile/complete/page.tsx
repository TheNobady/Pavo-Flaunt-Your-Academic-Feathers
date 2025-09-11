"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Upload, Award, Star, Mail, AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"

export default function CompleteProfilePage() {
  const [profileData, setProfileData] = useState({
    bio: "",
    interests: [] as string[],
    goals: "",
    languages: [] as string[],
    achievements: "",
    profilePicture: null as File | null,
    studentEmail: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [emailError, setEmailError] = useState("")
  const router = useRouter()

  const interestOptions = [
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "Computer Science",
    "Economics",
    "Business Studies",
    "History",
    "Geography",
    "Literature",
    "Art",
    "Music",
    "Sports",
    "Technology",
    "Medicine",
    "Engineering",
  ]

  const languageOptions = ["English", "Hindi", "Urdu", "Kashmiri", "Dogri", "Punjabi"]

  useEffect(() => {
    // Calculate completion progress
    let completed = 0
    if (profileData.bio) completed += 15
    if (profileData.interests.length > 0) completed += 15
    if (profileData.goals) completed += 15
    if (profileData.languages.length > 0) completed += 15
    if (profileData.achievements) completed += 10
    if (profileData.profilePicture) completed += 10
    if (profileData.studentEmail && isValidStudentEmail(profileData.studentEmail)) completed += 20

    setProgress(completed)
  }, [profileData])

  const isValidStudentEmail = (email: string) => {
    const eduPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.edu\.in$/
    return eduPattern.test(email)
  }

  const handleInterestToggle = (interest: string) => {
    setProfileData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }))
  }

  const handleLanguageToggle = (language: string) => {
    setProfileData((prev) => ({
      ...prev,
      languages: prev.languages.includes(language)
        ? prev.languages.filter((l) => l !== language)
        : [...prev.languages, language],
    }))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setProfileData((prev) => ({ ...prev, profilePicture: file }))
    }
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value
    setProfileData((prev) => ({ ...prev, studentEmail: email }))

    if (email && !isValidStudentEmail(email)) {
      setEmailError("Please enter a valid .edu.in email address")
    } else {
      setEmailError("")
    }
  }

  const generateBadgeId = () => {
    const timestamp = Date.now()
    const random = Math.random().toString(36).substring(2, 8).toUpperCase()
    return `JK-${timestamp}-${random}`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Get existing user data
      const existingUser = JSON.parse(localStorage.getItem("user") || "{}")

      const uniqueBadgeId = generateBadgeId()

      const badges = [
        {
          id: "profile-complete",
          name: "Profile Complete",
          description: "Completed your profile setup",
          icon: "CheckCircle",
          earnedAt: new Date().toISOString(),
          category: "profile",
          badgeId: `PC-${uniqueBadgeId}`,
          downloadable: true,
        },
      ]

      if (isValidStudentEmail(profileData.studentEmail)) {
        badges.push({
          id: "jk-student-partner",
          name: "J&K Student Partner",
          description: "Official Student Partner of J&K Government",
          icon: "Award",
          earnedAt: new Date().toISOString(),
          category: "official",
          special: true,
          badgeId: `JSP-${uniqueBadgeId}`,
          downloadable: true,
          studentEmail: profileData.studentEmail,
        })
      }

      const updatedUser = {
        ...existingUser,
        ...profileData,
        profileCompleted: true,
        badges,
        uniqueBadgeId,
        rewards: (existingUser.rewards || 100) + (isValidStudentEmail(profileData.studentEmail) ? 75 : 50),
      }

      localStorage.setItem("user", JSON.stringify(updatedUser))

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      router.push("/profile")
    } catch (error) {
      console.error("Profile completion failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Profile</h1>
          <p className="text-gray-600">Help us personalize your experience</p>

          <div className="mt-4">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>Profile Completion</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              Profile Setup
            </CardTitle>
            <CardDescription>Complete your profile to unlock all features and earn your first badges!</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="studentEmail" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Student Email (.edu.in)
                </Label>
                <Input
                  id="studentEmail"
                  type="email"
                  placeholder="your.name@college.edu.in"
                  value={profileData.studentEmail}
                  onChange={handleEmailChange}
                  className={emailError ? "border-red-500" : ""}
                />
                {emailError && (
                  <div className="flex items-center gap-2 text-sm text-red-600">
                    <AlertCircle className="h-4 w-4" />
                    {emailError}
                  </div>
                )}
                <p className="text-sm text-gray-600">
                  Provide your official .edu.in email to qualify for J&K Student Partner badge
                </p>
              </div>

              <div className="space-y-2">
                <Label>Profile Picture</Label>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                    {profileData.profilePicture ? (
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    ) : (
                      <Upload className="h-8 w-8 text-gray-400" />
                    )}
                  </div>
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="profile-picture"
                    />
                    <Label htmlFor="profile-picture" className="cursor-pointer">
                      <Button type="button" variant="outline" asChild>
                        <span>Upload Photo</span>
                      </Button>
                    </Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us about yourself..."
                  value={profileData.bio}
                  onChange={(e) => setProfileData((prev) => ({ ...prev, bio: e.target.value }))}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>Interests & Subjects</Label>
                <div className="flex flex-wrap gap-2">
                  {interestOptions.map((interest) => (
                    <Badge
                      key={interest}
                      variant={profileData.interests.includes(interest) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => handleInterestToggle(interest)}
                    >
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="goals">Academic Goals</Label>
                <Textarea
                  id="goals"
                  placeholder="What are your academic and career goals?"
                  value={profileData.goals}
                  onChange={(e) => setProfileData((prev) => ({ ...prev, goals: e.target.value }))}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>Languages</Label>
                <div className="flex flex-wrap gap-2">
                  {languageOptions.map((language) => (
                    <Badge
                      key={language}
                      variant={profileData.languages.includes(language) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => handleLanguageToggle(language)}
                    >
                      {language}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="achievements">Previous Achievements (Optional)</Label>
                <Textarea
                  id="achievements"
                  placeholder="Any academic achievements, competitions, or awards..."
                  value={profileData.achievements}
                  onChange={(e) => setProfileData((prev) => ({ ...prev, achievements: e.target.value }))}
                  rows={2}
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading || progress < 80}>
                {isLoading ? "Completing Profile..." : "Complete Profile & Earn Badges"}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <Award className="h-5 w-5 text-yellow-600" />
                Completion Rewards
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span>Profile Complete Badge (PDF Download)</span>
                  <Badge variant="secondary">+25 Points</Badge>
                </div>
                {isValidStudentEmail(profileData.studentEmail) && (
                  <div className="flex items-center justify-between">
                    <span>J&K Student Partner Badge (PDF Download)</span>
                    <Badge variant="secondary">+50 Points</Badge>
                  </div>
                )}
                <div className="flex items-center justify-between font-semibold">
                  <span>Total Bonus</span>
                  <Badge>{isValidStudentEmail(profileData.studentEmail) ? "+75 Points" : "+25 Points"}</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
