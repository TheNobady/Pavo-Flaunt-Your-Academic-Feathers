"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Calculator, TrendingUp, AlertCircle, CheckCircle, Target, BarChart3 } from "lucide-react"
import Link from "next/link"

interface CollegePrediction {
  id: string
  name: string
  location: string
  type: "Government" | "Private"
  course: string
  lastYearCutoff: number
  predictedCutoff: number
  userScore: number
  admissionChance: "High" | "Medium" | "Low"
  chancePercentage: number
  fees: number
  ranking: number
}

interface PredictionInputs {
  stream: string
  class12Percentage: string
  entranceExam: string
  entranceScore: string
  category: string
  state: string
  preferredCourse: string
}

const mockCollegeData: CollegePrediction[] = [
  {
    id: "1",
    name: "Delhi Technological University",
    location: "New Delhi",
    type: "Government",
    course: "Computer Science Engineering",
    lastYearCutoff: 95.2,
    predictedCutoff: 95.5,
    userScore: 0,
    admissionChance: "High",
    chancePercentage: 85,
    fees: 150000,
    ranking: 15,
  },
  {
    id: "2",
    name: "Netaji Subhas University of Technology",
    location: "New Delhi",
    type: "Government",
    course: "Computer Science Engineering",
    lastYearCutoff: 93.8,
    predictedCutoff: 94.2,
    userScore: 0,
    admissionChance: "High",
    chancePercentage: 90,
    fees: 140000,
    ranking: 18,
  },
  {
    id: "3",
    name: "Indira Gandhi Delhi Technical University",
    location: "New Delhi",
    type: "Government",
    course: "Information Technology",
    lastYearCutoff: 92.5,
    predictedCutoff: 92.8,
    userScore: 0,
    admissionChance: "High",
    chancePercentage: 95,
    fees: 135000,
    ranking: 22,
  },
  {
    id: "4",
    name: "Guru Gobind Singh Indraprastha University",
    location: "New Delhi",
    type: "Government",
    course: "Electronics Engineering",
    lastYearCutoff: 90.2,
    predictedCutoff: 90.5,
    userScore: 0,
    admissionChance: "High",
    chancePercentage: 98,
    fees: 130000,
    ranking: 25,
  },
  {
    id: "5",
    name: "Jamia Millia Islamia",
    location: "New Delhi",
    type: "Government",
    course: "Computer Science Engineering",
    lastYearCutoff: 88.7,
    predictedCutoff: 89.0,
    userScore: 0,
    admissionChance: "High",
    chancePercentage: 99,
    fees: 125000,
    ranking: 28,
  },
]

export default function AdmissionPredictorPage() {
  const [inputs, setInputs] = useState<PredictionInputs>({
    stream: "",
    class12Percentage: "",
    entranceExam: "",
    entranceScore: "",
    category: "",
    state: "",
    preferredCourse: "",
  })
  const [predictions, setPredictions] = useState<CollegePrediction[]>([])
  const [isCalculating, setIsCalculating] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const handleInputChange = (field: keyof PredictionInputs, value: string) => {
    setInputs((prev) => ({ ...prev, [field]: value }))
  }

  const calculatePredictions = async () => {
    if (!inputs.class12Percentage || !inputs.entranceScore) {
      alert("Please fill in all required fields")
      return
    }

    setIsCalculating(true)

    // Simulate calculation delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const userScore = Number.parseFloat(inputs.class12Percentage)
    const entranceScore = Number.parseFloat(inputs.entranceScore)

    // Calculate weighted score (70% board marks + 30% entrance exam)
    const weightedScore = userScore * 0.7 + (entranceScore / 300) * 100 * 0.3

    const updatedPredictions = mockCollegeData.map((college) => {
      const scoreDifference = weightedScore - college.predictedCutoff
      let chancePercentage: number
      let admissionChance: "High" | "Medium" | "Low"

      if (scoreDifference >= 2) {
        chancePercentage = Math.min(95, 85 + scoreDifference * 2)
        admissionChance = "High"
      } else if (scoreDifference >= -1) {
        chancePercentage = Math.max(40, 70 + scoreDifference * 10)
        admissionChance = "Medium"
      } else {
        chancePercentage = Math.max(5, 30 + scoreDifference * 5)
        admissionChance = "Low"
      }

      return {
        ...college,
        userScore: weightedScore,
        chancePercentage: Math.round(chancePercentage),
        admissionChance,
      }
    })

    // Sort by admission chance percentage
    updatedPredictions.sort((a, b) => b.chancePercentage - a.chancePercentage)

    setPredictions(updatedPredictions)
    setShowResults(true)
    setIsCalculating(false)
  }

  const getChanceColor = (chance: string) => {
    switch (chance) {
      case "High":
        return "bg-green-100 text-green-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Low":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getChanceIcon = (chance: string) => {
    switch (chance) {
      case "High":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "Medium":
        return <AlertCircle className="w-4 h-4 text-yellow-600" />
      case "Low":
        return <AlertCircle className="w-4 h-4 text-red-600" />
      default:
        return <AlertCircle className="w-4 h-4 text-gray-600" />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Link>
              </Button>
              <div className="flex items-center space-x-2">
                <Calculator className="w-6 h-6 text-primary" />
                <h1 className="text-xl font-bold">Admission Predictor</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Predict Your <span className="text-primary">Admission Chances</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get accurate predictions for government college admissions based on previous years' cut-offs and your
            academic performance
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Input Form */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="w-5 h-5 mr-2 text-primary" />
                  Your Details
                </CardTitle>
                <CardDescription>Enter your academic information for accurate predictions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="stream">Stream</Label>
                  <Select value={inputs.stream} onValueChange={(value) => handleInputChange("stream", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your stream" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="science">Science</SelectItem>
                      <SelectItem value="commerce">Commerce</SelectItem>
                      <SelectItem value="arts">Arts</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="class12">Class 12 Percentage *</Label>
                  <Input
                    id="class12"
                    type="number"
                    placeholder="Enter your 12th percentage"
                    value={inputs.class12Percentage}
                    onChange={(e) => handleInputChange("class12Percentage", e.target.value)}
                    min="0"
                    max="100"
                    step="0.1"
                  />
                </div>

                <div>
                  <Label htmlFor="entrance">Entrance Exam</Label>
                  <Select
                    value={inputs.entranceExam}
                    onValueChange={(value) => handleInputChange("entranceExam", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select entrance exam" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="jee-main">JEE Main</SelectItem>
                      <SelectItem value="jee-advanced">JEE Advanced</SelectItem>
                      <SelectItem value="bitsat">BITSAT</SelectItem>
                      <SelectItem value="comedk">COMEDK</SelectItem>
                      <SelectItem value="state-cet">State CET</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="entranceScore">Entrance Exam Score *</Label>
                  <Input
                    id="entranceScore"
                    type="number"
                    placeholder="Enter your entrance exam score"
                    value={inputs.entranceScore}
                    onChange={(e) => handleInputChange("entranceScore", e.target.value)}
                    min="0"
                    max="300"
                  />
                </div>

                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={inputs.category} onValueChange={(value) => handleInputChange("category", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General</SelectItem>
                      <SelectItem value="obc">OBC</SelectItem>
                      <SelectItem value="sc">SC</SelectItem>
                      <SelectItem value="st">ST</SelectItem>
                      <SelectItem value="ews">EWS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="state">Home State</Label>
                  <Select value={inputs.state} onValueChange={(value) => handleInputChange("state", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your state" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="delhi">Delhi</SelectItem>
                      <SelectItem value="maharashtra">Maharashtra</SelectItem>
                      <SelectItem value="karnataka">Karnataka</SelectItem>
                      <SelectItem value="tamil-nadu">Tamil Nadu</SelectItem>
                      <SelectItem value="uttar-pradesh">Uttar Pradesh</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="course">Preferred Course</Label>
                  <Select
                    value={inputs.preferredCourse}
                    onValueChange={(value) => handleInputChange("preferredCourse", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select preferred course" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="computer-science">Computer Science Engineering</SelectItem>
                      <SelectItem value="information-technology">Information Technology</SelectItem>
                      <SelectItem value="electronics">Electronics Engineering</SelectItem>
                      <SelectItem value="mechanical">Mechanical Engineering</SelectItem>
                      <SelectItem value="civil">Civil Engineering</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  className="w-full"
                  onClick={calculatePredictions}
                  disabled={isCalculating || !inputs.class12Percentage || !inputs.entranceScore}
                >
                  {isCalculating ? "Calculating..." : "Predict Admission Chances"}
                </Button>

                <p className="text-xs text-muted-foreground">
                  * Required fields. Predictions are based on historical data and trends.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="lg:col-span-2">
            {!showResults ? (
              <Card className="h-96 flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Ready to Predict?</h3>
                  <p className="text-muted-foreground">
                    Fill in your details on the left to get personalized admission predictions for government colleges
                  </p>
                </div>
              </Card>
            ) : (
              <div className="space-y-6">
                {/* Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2 text-primary" />
                      Prediction Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <p className="text-2xl font-bold text-green-600">
                          {predictions.filter((p) => p.admissionChance === "High").length}
                        </p>
                        <p className="text-sm text-green-600">High Chance Colleges</p>
                      </div>
                      <div className="text-center p-4 bg-yellow-50 rounded-lg">
                        <p className="text-2xl font-bold text-yellow-600">
                          {predictions.filter((p) => p.admissionChance === "Medium").length}
                        </p>
                        <p className="text-sm text-yellow-600">Medium Chance Colleges</p>
                      </div>
                      <div className="text-center p-4 bg-red-50 rounded-lg">
                        <p className="text-2xl font-bold text-red-600">
                          {predictions.filter((p) => p.admissionChance === "Low").length}
                        </p>
                        <p className="text-sm text-red-600">Low Chance Colleges</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Detailed Results */}
                <Tabs defaultValue="all" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="all">All Colleges</TabsTrigger>
                    <TabsTrigger value="high">High Chance</TabsTrigger>
                    <TabsTrigger value="medium">Medium Chance</TabsTrigger>
                    <TabsTrigger value="low">Low Chance</TabsTrigger>
                  </TabsList>

                  <TabsContent value="all" className="space-y-4">
                    {predictions.map((prediction) => (
                      <Card key={prediction.id} className="border-2 hover:border-primary/50 transition-colors">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-lg font-semibold mb-1">{prediction.name}</h3>
                              <p className="text-sm text-muted-foreground mb-2">{prediction.location}</p>
                              <div className="flex items-center space-x-2">
                                <Badge variant="secondary">{prediction.type}</Badge>
                                <Badge variant="outline">Rank #{prediction.ranking}</Badge>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center space-x-2 mb-2">
                                {getChanceIcon(prediction.admissionChance)}
                                <Badge className={getChanceColor(prediction.admissionChance)}>
                                  {prediction.admissionChance} Chance
                                </Badge>
                              </div>
                              <p className="text-2xl font-bold text-primary">{prediction.chancePercentage}%</p>
                            </div>
                          </div>

                          <div className="grid md:grid-cols-2 gap-4 mb-4">
                            <div>
                              <p className="text-sm font-medium mb-2">Course: {prediction.course}</p>
                              <p className="text-sm text-muted-foreground">
                                Last Year Cut-off: {prediction.lastYearCutoff}%
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Predicted Cut-off: {prediction.predictedCutoff}%
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium mb-2">
                                Annual Fees: ₹{prediction.fees.toLocaleString()}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Your Score: {prediction.userScore.toFixed(1)}%
                              </p>
                            </div>
                          </div>

                          <div className="mb-4">
                            <div className="flex justify-between text-sm mb-1">
                              <span>Admission Probability</span>
                              <span>{prediction.chancePercentage}%</span>
                            </div>
                            <Progress value={prediction.chancePercentage} className="h-2" />
                          </div>

                          <div className="flex justify-between items-center">
                            <div className="text-sm text-muted-foreground">
                              {prediction.userScore >= prediction.predictedCutoff
                                ? "✅ Above predicted cut-off"
                                : "⚠️ Below predicted cut-off"}
                            </div>
                            <Button size="sm" variant="outline" asChild>
                              <Link href={`/colleges/${prediction.id}`}>View Details</Link>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>

                  <TabsContent value="high" className="space-y-4">
                    {predictions
                      .filter((p) => p.admissionChance === "High")
                      .map((prediction) => (
                        <Card key={prediction.id} className="border-2 border-green-200 bg-green-50/50">
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <h3 className="text-lg font-semibold mb-1">{prediction.name}</h3>
                                <p className="text-sm text-muted-foreground mb-2">{prediction.location}</p>
                                <Badge variant="secondary">{prediction.type}</Badge>
                              </div>
                              <div className="text-right">
                                <div className="flex items-center space-x-2 mb-2">
                                  <CheckCircle className="w-4 h-4 text-green-600" />
                                  <Badge className="bg-green-100 text-green-800">High Chance</Badge>
                                </div>
                                <p className="text-2xl font-bold text-green-600">{prediction.chancePercentage}%</p>
                              </div>
                            </div>
                            <p className="text-sm text-green-700 font-medium">
                              🎉 Excellent chances! Consider this as a safe option.
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                  </TabsContent>

                  <TabsContent value="medium" className="space-y-4">
                    {predictions
                      .filter((p) => p.admissionChance === "Medium")
                      .map((prediction) => (
                        <Card key={prediction.id} className="border-2 border-yellow-200 bg-yellow-50/50">
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <h3 className="text-lg font-semibold mb-1">{prediction.name}</h3>
                                <p className="text-sm text-muted-foreground mb-2">{prediction.location}</p>
                                <Badge variant="secondary">{prediction.type}</Badge>
                              </div>
                              <div className="text-right">
                                <div className="flex items-center space-x-2 mb-2">
                                  <AlertCircle className="w-4 h-4 text-yellow-600" />
                                  <Badge className="bg-yellow-100 text-yellow-800">Medium Chance</Badge>
                                </div>
                                <p className="text-2xl font-bold text-yellow-600">{prediction.chancePercentage}%</p>
                              </div>
                            </div>
                            <p className="text-sm text-yellow-700 font-medium">
                              ⚡ Moderate chances. Consider as a target option with backup plans.
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                  </TabsContent>

                  <TabsContent value="low" className="space-y-4">
                    {predictions
                      .filter((p) => p.admissionChance === "Low")
                      .map((prediction) => (
                        <Card key={prediction.id} className="border-2 border-red-200 bg-red-50/50">
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <h3 className="text-lg font-semibold mb-1">{prediction.name}</h3>
                                <p className="text-sm text-muted-foreground mb-2">{prediction.location}</p>
                                <Badge variant="secondary">{prediction.type}</Badge>
                              </div>
                              <div className="text-right">
                                <div className="flex items-center space-x-2 mb-2">
                                  <AlertCircle className="w-4 h-4 text-red-600" />
                                  <Badge className="bg-red-100 text-red-800">Low Chance</Badge>
                                </div>
                                <p className="text-2xl font-bold text-red-600">{prediction.chancePercentage}%</p>
                              </div>
                            </div>
                            <p className="text-sm text-red-700 font-medium">
                              🎯 Challenging target. Consider as reach option or explore alternatives.
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                  </TabsContent>
                </Tabs>

                {/* Recommendations */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recommendations</CardTitle>
                    <CardDescription>Based on your prediction results</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-green-800">Apply to High Chance Colleges</p>
                          <p className="text-sm text-green-600">
                            These are your safe options. Make sure to apply to at least 2-3 of these.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                        <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-yellow-800">Consider Medium Chance Options</p>
                          <p className="text-sm text-yellow-600">
                            These are good target colleges. Apply to 1-2 as stretch goals.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                        <Target className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-blue-800">Explore More Options</p>
                          <p className="text-sm text-blue-600">
                            Consider other states, private colleges, or different courses for more opportunities.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>

        {/* Disclaimer */}
        <Card className="mt-8 border-orange-200 bg-orange-50">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5" />
              <div>
                <p className="font-medium text-orange-800 mb-1">Important Disclaimer</p>
                <p className="text-sm text-orange-700">
                  These predictions are based on historical data and statistical analysis. Actual admission results may
                  vary due to factors like seat availability, reservation policies, and changes in cut-off trends.
                  Always verify with official college websites and counseling authorities.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
