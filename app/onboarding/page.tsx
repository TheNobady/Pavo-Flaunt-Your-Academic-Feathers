"use client"

import type React from "react"

import { useState, useCallback, useMemo, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowRight, ArrowLeft, GraduationCap, Users, Search } from "lucide-react"
import { useRouter } from "next/navigation"

type UserRole = "student" | "parent" | ""
type OnboardingStep = "role" | "basic-info" | "preferences" | "complete"

const PeacockIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 2C8 2 5 5 5 9c0 2 1 4 3 5l-3 8h10l-3-8c2-1 3-3 3-5 0-4-3-7-7-7z" />
    <circle cx="12" cy="8" r="2" />
    <path d="M8 12c-1 0-2 1-2 2s1 2 2 2 2-1 2-2-1-2-2-2z" />
    <path d="M16 12c1 0 2 1 2 2s-1 2-2 2-2-1-2-2 1-2 2-2z" />
  </svg>
)

const indianDistricts = {
  "Andhra Pradesh": [
    "Anantapur",
    "Chittoor",
    "East Godavari",
    "Guntur",
    "Krishna",
    "Kurnool",
    "Nellore",
    "Prakasam",
    "Srikakulam",
    "Visakhapatnam",
    "Vizianagaram",
    "West Godavari",
    "YSR Kadapa",
  ],
  "Arunachal Pradesh": [
    "Anjaw",
    "Changlang",
    "Dibang Valley",
    "East Kameng",
    "East Siang",
    "Kamle",
    "Kra Daadi",
    "Kurung Kumey",
    "Lepa Rada",
    "Lohit",
    "Longding",
    "Lower Dibang Valley",
    "Lower Siang",
    "Lower Subansiri",
    "Namsai",
    "Pakke Kessang",
    "Papum Pare",
    "Shi Yomi",
    "Siang",
    "Tawang",
    "Tirap",
    "Upper Siang",
    "Upper Subansiri",
    "West Kameng",
    "West Siang",
  ],
  Assam: [
    "Baksa",
    "Barpeta",
    "Biswanath",
    "Bongaigaon",
    "Cachar",
    "Charaideo",
    "Chirang",
    "Darrang",
    "Dhemaji",
    "Dhubri",
    "Dibrugarh",
    "Goalpara",
    "Golaghat",
    "Hailakandi",
    "Hojai",
    "Jorhat",
    "Kamrup",
    "Kamrup Metropolitan",
    "Karbi Anglong",
    "Karimganj",
    "Kokrajhar",
    "Lakhimpur",
    "Majuli",
    "Morigaon",
    "Nagaon",
    "Nalbari",
    "Dima Hasao",
    "Sivasagar",
    "Sonitpur",
    "South Salmara-Mankachar",
    "Tinsukia",
    "Udalguri",
    "West Karbi Anglong",
  ],
  Bihar: [
    "Araria",
    "Arwal",
    "Aurangabad",
    "Banka",
    "Begusarai",
    "Bhagalpur",
    "Bhojpur",
    "Buxar",
    "Darbhanga",
    "East Champaran",
    "Gaya",
    "Gopalganj",
    "Jamui",
    "Jehanabad",
    "Kaimur",
    "Katihar",
    "Khagaria",
    "Kishanganj",
    "Lakhisarai",
    "Madhepura",
    "Madhubani",
    "Munger",
    "Muzaffarpur",
    "Nalanda",
    "Nawada",
    "Patna",
    "Purnia",
    "Rohtas",
    "Saharsa",
    "Samastipur",
    "Saran",
    "Sheikhpura",
    "Sheohar",
    "Sitamarhi",
    "Siwan",
    "Supaul",
    "Vaishali",
    "West Champaran",
  ],
  Chhattisgarh: [
    "Balod",
    "Baloda Bazar",
    "Balrampur",
    "Bastar",
    "Bemetara",
    "Bijapur",
    "Bilaspur",
    "Dantewada",
    "Dhamtari",
    "Durg",
    "Gariaband",
    "Gaurela Pendra Marwahi",
    "Janjgir Champa",
    "Jashpur",
    "Kabirdham",
    "Kanker",
    "Kondagaon",
    "Korba",
    "Koriya",
    "Mahasamund",
    "Mungeli",
    "Narayanpur",
    "Raigarh",
    "Raipur",
    "Rajnandgaon",
    "Sukma",
    "Surajpur",
    "Surguja",
  ],
  Goa: ["North Goa", "South Goa"],
  Gujarat: [
    "Ahmedabad",
    "Amreli",
    "Anand",
    "Aravalli",
    "Banaskantha",
    "Bharuch",
    "Bhavnagar",
    "Botad",
    "Chhota Udaipur",
    "Dahod",
    "Dang",
    "Devbhoomi Dwarka",
    "Gandhinagar",
    "Gir Somnath",
    "Jamnagar",
    "Junagadh",
    "Kheda",
    "Kutch",
    "Mahisagar",
    "Mehsana",
    "Morbi",
    "Narmada",
    "Navsari",
    "Panchmahal",
    "Patan",
    "Porbandar",
    "Rajkot",
    "Sabarkantha",
    "Surat",
    "Surendranagar",
    "Tapi",
    "Vadodara",
    "Valsad",
  ],
  Haryana: [
    "Ambala",
    "Bhiwani",
    "Charkhi Dadri",
    "Faridabad",
    "Fatehabad",
    "Bhagalpur",
    "Bhojpur",
    "Buxar",
    "Darbhanga",
    "East Champaran",
    "Gaya",
    "Gopalganj",
    "Jamui",
    "Jehanabad",
    "Kaimur",
    "Katihar",
    "Khagaria",
    "Kishanganj",
    "Lakhisarai",
    "Madhepura",
    "Madhubani",
    "Munger",
    "Muzaffarpur",
    "Nalanda",
    "Nawada",
    "Patna",
    "Purnia",
    "Rohtas",
    "Saharsa",
    "Samastipur",
    "Saran",
    "Sheikhpura",
    "Sheohar",
    "Sitamarhi",
    "Siwan",
    "Supaul",
    "Vaishali",
    "West Champaran",
  ],
  "Himachal Pradesh": [
    "Bilaspur",
    "Chamba",
    "Hamirpur",
    "Kangra",
    "Kinnaur",
    "Kullu",
    "Lahaul and Spiti",
    "Mandi",
    "Shimla",
    "Sirmaur",
    "Solan",
    "Una",
  ],
  Jharkhand: [
    "Bokaro",
    "Chatra",
    "Deoghar",
    "Dhanbad",
    "Dumka",
    "East Singhbhum",
    "Garhwa",
    "Giridih",
    "Godda",
    "Gumla",
    "Hazaribagh",
    "Jamtara",
    "Khunti",
    "Koderma",
    "Latehar",
    "Lohardaga",
    "Pakur",
    "Palamu",
    "Ramgarh",
    "Ranchi",
    "Sahibganj",
    "Seraikela Kharsawan",
    "Simdega",
    "West Singhbhum",
  ],
  Karnataka: [
    "Bagalkot",
    "Ballari",
    "Belagavi",
    "Bemetara",
    "Bijapur",
    "Bilaspur",
    "Chamba",
    "Hamirpur",
    "Kangra",
    "Kinnaur",
    "Kullu",
    "Lahaul and Spiti",
    "Mandi",
    "Shimla",
    "Sirmaur",
    "Solan",
    "Una",
  ],
  Kerala: [
    "Alappuzha",
    "Ernakulam",
    "Idukki",
    "Kannur",
    "Kasaragod",
    "Kollam",
    "Kottayam",
    "Kozhikode",
    "Malappuram",
    "Palakkad",
    "Pathanamthitta",
    "Thiruvananthapuram",
    "Thrissur",
    "Wayanad",
  ],
  "Madhya Pradesh": [
    "Agar Malwa",
    "Alirajpur",
    "Anuppur",
    "Ashoknagar",
    "Balaghat",
    "Barwani",
    "Betul",
    "Bhind",
    "Bhopal",
    "Burhanpur",
    "Chhatarpur",
    "Chhindwara",
    "Damoh",
    "Datia",
    "Dewas",
    "Dhar",
    "Dindori",
    "Guna",
    "Gwalior",
    "Harda",
    "Hoshangabad",
    "Indore",
    "Jabalpur",
    "Jhabua",
    "Katni",
    "Khandwa",
    "Khargone",
    "Mandla",
    "Mandsaur",
    "Morena",
    "Narsinghpur",
    "Neemuch",
    "Niwari",
    "Panna",
    "Raisen",
    "Rajgarh",
    "Ratlam",
    "Sonipat",
    "Yamunanagar",
  ],
  Maharashtra: [
    "Ahmednagar",
    "Akola",
    "Amravati",
    "Aurangabad",
    "Beed",
    "Bhandara",
    "Buldhana",
    "Chandrapur",
    "Dhule",
    "Gadchiroli",
    "Gondia",
    "Hingoli",
    "Jalgaon",
    "Jalna",
    "Kolhapur",
    "Latur",
    "Mumbai City",
    "Mumbai Suburban",
    "Nagpur",
    "Nanded",
    "Nandurbar",
    "Nashik",
    "Osmanabad",
    "Palghar",
    "Parbhani",
    "Pune",
    "Raigad",
    "Ratnagiri",
    "Sangli",
    "Satara",
    "Sindhudurg",
    "Solapur",
    "Thane",
    "Wardha",
    "Washim",
    "Yavatmal",
  ],
  Manipur: [
    "Bishnupur",
    "Chandel",
    "Churachandpur",
    "Imphal East",
    "Imphal West",
    "Jiribam",
    "Kakching",
    "Kamjong",
    "Kangpokpi",
    "Noney",
    "Pherzawl",
    "Senapati",
    "Tamenglong",
    "Tengnoupal",
    "Thoubal",
    "Ukhrul",
  ],
  Meghalaya: [
    "East Garo Hills",
    "East Jaintia Hills",
    "East Khasi Hills",
    "North Garo Hills",
    "Ri Bhoi",
    "South Garo Hills",
    "South West Garo Hills",
    "South West Khasi Hills",
    "West Garo Hills",
    "West Jaintia Hills",
    "West Khasi Hills",
  ],
  Mizoram: [
    "Aizawl",
    "Champhai",
    "Hnahthial",
    "Kolasib",
    "Khawzawl",
    "Lawngtlai",
    "Lunglei",
    "Mamit",
    "Saiha",
    "Saitual",
    "Serchhip",
  ],
  Nagaland: [
    "Dimapur",
    "Kiphire",
    "Kohima",
    "Longleng",
    "Mokokchung",
    "Mon",
    "Noklak",
    "Peren",
    "Phek",
    "Tuensang",
    "Wokha",
    "Zunheboto",
  ],
  Odisha: [
    "Angul",
    "Balangir",
    "Balasore",
    "Bargarh",
    "Bhadrak",
    "Boudh",
    "Cuttack",
    "Deogarh",
    "Dhenkanal",
    "Gajapati",
    "Ganjam",
    "Jagatsinghpur",
    "Jajpur",
    "Jharsuguda",
    "Kalahandi",
    "Kandhamal",
    "Kendrapara",
    "Kendujhar",
    "Khordha",
    "Koraput",
    "Malkangiri",
    "Mayurbhanj",
    "Nabarangpur",
    "Nayagarh",
    "Nuapada",
    "Puri",
    "Rayagada",
    "Sambalpur",
    "Subarnapur",
    "Sundargarh",
  ],
  Punjab: [
    "Amritsar",
    "Barnala",
    "Bathinda",
    "Faridkot",
    "Fatehgarh Sahib",
    "Fazilka",
    "Ferozepur",
    "Gurdaspur",
    "Hoshiarpur",
    "Jalandhar",
    "Kapurthala",
    "Ludhiana",
    "Mansa",
    "Moga",
    "Muktsar",
    "Nawanshahr",
    "Pathankot",
    "Patiala",
    "Rupnagar",
    "Sangrur",
    "Tarn Taran",
  ],
  Rajasthan: [
    "Ajmer",
    "Alwar",
    "Banswara",
    "Baran",
    "Barmer",
    "Bharatpur",
    "Bhilwara",
    "Bikaner",
    "Bundi",
    "Chittorgarh",
    "Churu",
    "Dausa",
    "Dholpur",
    "Dungarpur",
    "Hanumangarh",
    "Jaipur",
    "Jaisalmer",
    "Jalore",
    "Jhalawar",
    "Jhunjhunu",
    "Jodhpur",
    "Karauli",
    "Kota",
    "Nagaur",
    "Pali",
    "Pratapgarh",
    "Rajsamand",
    "Sawai Madhopur",
    "Sikar",
    "Sirohi",
    "Sri Ganganagar",
    "Tonk",
    "Udaipur",
  ],
  Sikkim: ["East Sikkim", "North Sikkim", "South Sikkim", "West Sikkim"],
  "Tamil Nadu": [
    "Ariyalur",
    "Chengalpattu",
    "Chennai",
    "Coimbatore",
    "Cuddalore",
    "Dharmapuri",
    "Dindigul",
    "Erode",
    "Kallakurichi",
    "Kanchipuram",
    "Kanyakumari",
    "Karur",
    "Krishnagiri",
    "Madurai",
    "Mayiladuthurai",
    "Nagapattinam",
    "Namakkal",
    "Nilgiris",
    "Perambalur",
    "Pudukkottai",
    "Ramanathapuram",
    "Ranipet",
    "Salem",
    "Sivaganga",
    "Tenkasi",
    "Thanjavur",
    "Theni",
    "Thoothukudi",
    "Tiruchirappalli",
    "Tirunelveli",
    "Tirupathur",
    "Tiruppur",
    "Tiruvallur",
    "Tiruvannamalai",
    "Tiruvarur",
    "Vellore",
    "Viluppuram",
    "Virudhunagar",
  ],
  Telangana: [
    "Adilabad",
    "Bhadradri Kothagudem",
    "Hyderabad",
    "Jagtial",
    "Jangaon",
    "Jayashankar Bhupalpally",
    "Jogulamba Gadwal",
    "Kamareddy",
    "Karimnagar",
    "Khammam",
    "Komaram Bheem Asifabad",
    "Mahabubabad",
    "Mahabubnagar",
    "Mancherial",
    "Medak",
    "Medchal Malkajgiri",
    "Mulugu",
    "Nagarkurnool",
    "Nalgonda",
    "Narayanpet",
    "Nirmal",
    "Nizamabad",
    "Peddapalli",
    "Rajanna Sircilla",
    "Rangareddy",
    "Sangareddy",
    "Siddipet",
    "Suryapet",
    "Vikarabad",
    "Wanaparthy",
    "Warangal Rural",
    "Warangal Urban",
    "Yadadri Bhuvanagiri",
  ],
  Tripura: ["Dhalai", "Gomati", "Khowai", "North Tripura", "Sepahijala", "South Tripura", "Unakoti", "West Tripura"],
  "Uttar Pradesh": [
    "Agra",
    "Aligarh",
    "Ambedkar Nagar",
    "Amethi",
    "Amroha",
    "Auraiya",
    "Ayodhya",
    "Azamgarh",
    "Baghpat",
    "Bahraich",
    "Ballia",
    "Balrampur",
    "Banda",
    "Barabanki",
    "Bareilly",
    "Basti",
    "Bhadohi",
    "Bijnor",
    "Budaun",
    "Bulandshahr",
    "Chandauli",
    "Chitrakoot",
    "Deoria",
    "Etah",
    "Etawah",
    "Farrukhabad",
    "Fatehpur",
    "Firozabad",
    "Gautam Buddha Nagar",
    "Ghaziabad",
    "Ghazipur",
    "Gonda",
    "Gorakhpur",
    "Hamirpur",
    "Hapur",
    "Hardoi",
    "Hathras",
    "Jalaun",
    "Jaunpur",
    "Jhansi",
    "Kannauj",
    "Kanpur Dehat",
    "Kanpur Nagar",
    "Kasganj",
    "Kaushambi",
    "Kheri",
    "Kushinagar",
    "Lalitpur",
    "Lucknow",
    "Maharajganj",
    "Mahoba",
    "Mainpuri",
    "Mathura",
    "Mau",
    "Meerut",
    "Mirzapur",
    "Moradabad",
    "Muzaffarnagar",
    "Pilibhit",
    "Pratapgarh",
    "Prayagraj",
    "Raebareli",
    "Rampur",
    "Saharanpur",
    "Sambhal",
    "Sant Kabir Nagar",
    "Shahjahanpur",
    "Shamli",
    "Shravasti",
    "Siddharthnagar",
    "Sitapur",
    "Sonbhadra",
    "Sultanpur",
    "Unnao",
    "Varanasi",
  ],
  Uttarakhand: [
    "Almora",
    "Bageshwar",
    "Chamoli",
    "Champawat",
    "Dehradun",
    "Haridwar",
    "Nainital",
    "Pauri Garhwal",
    "Pithoragarh",
    "Rudraprayag",
    "Tehri Garhwal",
    "Udham Singh Nagar",
    "Uttarkashi",
  ],
  "West Bengal": [
    "Alipurduar",
    "Bankura",
    "Birbhum",
    "Cooch Behar",
    "Dakshin Dinajpur",
    "Darjeeling",
    "Hooghly",
    "Howrah",
    "Jalpaiguri",
    "Jhargram",
    "Kalimpong",
    "Kolkata",
    "Malda",
    "Murshidabad",
    "Nadia",
    "North 24 Parganas",
    "Paschim Bardhaman",
    "Paschim Medinipur",
    "Purba Bardhaman",
    "Purba Medinipur",
    "Purulia",
    "South 24 Parganas",
    "Uttar Dinajpur",
  ],
  Delhi: [
    "Central Delhi",
    "East Delhi",
    "New Delhi",
    "North Delhi",
    "North East Delhi",
    "North West Delhi",
    "Shahdara",
    "South Delhi",
    "South East Delhi",
    "South West Delhi",
    "West Delhi",
  ],
  "Jammu and Kashmir": [
    "Anantnag",
    "Bandipora",
    "Baramulla",
    "Budgam",
    "Doda",
    "Ganderbal",
    "Jammu",
    "Kathua",
    "Kishtwar",
    "Kulgam",
    "Kupwara",
    "Poonch",
    "Pulwama",
    "Rajouri",
    "Ramban",
    "Reasi",
    "Samba",
    "Shopian",
    "Srinagar",
    "Udhampur",
  ],
  Ladakh: ["Kargil", "Leh"],
  Puducherry: ["Karaikal", "Mahe", "Puducherry", "Yanam"],
}

export default function OnboardingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<OnboardingStep>("role")
  const [userRole, setUserRole] = useState<UserRole>("")
  const locationSearchRef = useRef<HTMLInputElement>(null)
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    class: "",
    stream: "", // Added stream field for 11th/12th students
    location: "",
    interests: [] as string[],
    goals: [] as string[],
    languages: [] as string[],
  })
  const [locationSearch, setLocationSearch] = useState("")
  const allDistricts = useMemo(
    () =>
      Object.entries(indianDistricts)
        .flatMap(([state, districts]) => districts.map((district) => `${district}, ${state}`))
        .sort(),
    [],
  )

  const filteredDistricts = useMemo(
    () => allDistricts.filter((district) => district.toLowerCase().includes(locationSearch.toLowerCase())),
    [allDistricts, locationSearch],
  )

  const handleLocationSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setLocationSearch(e.target.value)
  }, [])

  const handleLocationSearchFocus = useCallback(() => {
    setTimeout(() => {
      if (locationSearchRef.current) {
        try {
          locationSearchRef.current.focus()
        } catch (error) {
          // Silently handle focus errors
          console.log("[v0] Focus error handled safely")
        }
      }
    }, 100)
  }, [])

  const handleNext = () => {
    const steps: OnboardingStep[] = ["role", "basic-info", "preferences", "complete"]
    const currentIndex = steps.indexOf(currentStep)
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1])
    }
  }

  const handleBack = () => {
    const steps: OnboardingStep[] = ["role", "basic-info", "preferences", "complete"]
    const currentIndex = steps.indexOf(currentStep)
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1])
    }
  }

  const handleComplete = () => {
    const completeUserData = {
      role: userRole,
      ...formData,
      onboardingComplete: true,
      completedAt: new Date().toISOString(),
    }

    // Validate required fields before saving
    if (!userRole || !formData.name || !formData.age || !formData.class || !formData.location) {
      console.log("[v0] Missing required fields, cannot complete onboarding")
      return
    }

    try {
      localStorage.setItem("pavoUserData", JSON.stringify(completeUserData))
      sessionStorage.setItem("pavoUserData", JSON.stringify(completeUserData))
      console.log("[v0] Onboarding completed successfully", completeUserData)

      setTimeout(() => {
        router.push("/dashboard")
      }, 100)
    } catch (error) {
      console.log("[v0] Error saving user data:", error)
    }
  }

  const interests = [
    "Science & Technology",
    "Arts & Literature",
    "Mathematics",
    "Sports & Fitness",
    "Music & Dance",
    "Business & Economics",
    "Social Sciences",
    "Engineering",
    "Medicine & Healthcare",
    "Environment & Nature",
  ]

  const goals = [
    "Get into top government college",
    "Find scholarship opportunities",
    "Explore career options",
    "Understand course requirements",
    "Connect with mentors",
    "Prepare for entrance exams",
  ]

  const languages = ["English", "Hindi", "Urdu", "Bengali", "Tamil", "Telugu", "Marathi", "Gujarati"]

  const requiresStream = formData.class === "class-11" || formData.class === "class-12"

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                <PeacockIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent">
                  Pavo
                </h1>
                <p className="text-xs text-gray-600 font-medium">Flaunt Your Academic Feathers</p>
              </div>
            </div>
            <Badge className="bg-orange-100 text-orange-800 border-orange-200">Getting Started</Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600 font-medium">
              Step {["role", "basic-info", "preferences", "complete"].indexOf(currentStep) + 1} of 4
            </span>
            <span className="text-sm text-gray-600 font-medium">
              {Math.round(((["role", "basic-info", "preferences", "complete"].indexOf(currentStep) + 1) / 4) * 100)}%
              Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
            <div
              className="bg-gradient-to-r from-orange-500 to-green-600 h-3 rounded-full transition-all duration-500 shadow-sm"
              style={{
                width: `${((["role", "basic-info", "preferences", "complete"].indexOf(currentStep) + 1) / 4) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Role Selection Step */}
        {currentStep === "role" && (
          <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader className="text-center pb-6">
              <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                <PeacockIcon className="w-12 h-12 text-white" />
              </div>
              <CardTitle className="text-4xl font-bold bg-gradient-to-r from-orange-500 via-blue-600 to-green-600 bg-clip-text text-transparent">
                Welcome to Pavo!
              </CardTitle>
              <CardDescription className="text-lg text-gray-600 font-medium">
                Let's start by understanding who you are so we can personalize your experience
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <RadioGroup value={userRole} onValueChange={(value) => setUserRole(value as UserRole)}>
                <div className="grid md:grid-cols-2 gap-6">
                  <Label htmlFor="student" className="cursor-pointer">
                    <Card
                      className={`border-2 transition-all duration-300 hover:shadow-lg ${
                        userRole === "student"
                          ? "border-orange-500 bg-gradient-to-br from-orange-50 to-orange-100 shadow-md"
                          : "border-gray-200 hover:border-orange-300 bg-white"
                      }`}
                    >
                      <CardContent className="p-6 text-center">
                        <RadioGroupItem value="student" id="student" className="sr-only" />
                        <GraduationCap className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                        <h3 className="text-xl font-bold mb-2 text-gray-800">I'm a Student</h3>
                        <p className="text-gray-600 font-medium">
                          Class 10/12 graduate looking for academic guidance and career direction
                        </p>
                      </CardContent>
                    </Card>
                  </Label>

                  <Label htmlFor="parent" className="cursor-pointer">
                    <Card
                      className={`border-2 transition-all duration-300 hover:shadow-lg ${
                        userRole === "parent"
                          ? "border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100 shadow-md"
                          : "border-gray-200 hover:border-blue-300 bg-white"
                      }`}
                    >
                      <CardContent className="p-6 text-center">
                        <RadioGroupItem value="parent" id="parent" className="sr-only" />
                        <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                        <h3 className="text-xl font-bold mb-2 text-gray-800">I'm a Parent</h3>
                        <p className="text-gray-600 font-medium">
                          Supporting my child's academic journey and career decisions
                        </p>
                      </CardContent>
                    </Card>
                  </Label>
                </div>
              </RadioGroup>

              <div className="flex justify-end pt-4">
                <Button
                  onClick={handleNext}
                  disabled={!userRole}
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Continue <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Basic Info Step */}
        {currentStep === "basic-info" && (
          <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader className="pb-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                  <PeacockIcon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent">
                  Tell us about yourself
                </CardTitle>
              </div>
              <CardDescription className="text-lg text-gray-600 font-medium">
                {userRole === "student"
                  ? "Help us understand your current academic situation"
                  : "Tell us about your child's academic journey"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-700 font-semibold">
                    {userRole === "student" ? "Your Name" : "Your Child's Name"}
                  </Label>
                  <Input
                    id="name"
                    placeholder="Enter full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 rounded-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="age" className="text-gray-700 font-semibold">
                    Age
                  </Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="Enter age"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="class" className="text-gray-700 font-semibold">
                    Current Class
                  </Label>
                  <Select
                    value={formData.class}
                    onValueChange={(value) => {
                      setFormData({ ...formData, class: value, stream: "" }) // Reset stream when class changes
                    }}
                  >
                    <SelectTrigger className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 rounded-lg">
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="class-8">Class 8</SelectItem>
                      <SelectItem value="class-9">Class 9</SelectItem>
                      <SelectItem value="class-10">Class 10</SelectItem>
                      <SelectItem value="class-11">Class 11</SelectItem>
                      <SelectItem value="class-12">Class 12</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {requiresStream && (
                  <div className="space-y-2">
                    <Label htmlFor="stream" className="text-gray-700 font-semibold">
                      Stream
                    </Label>
                    <Select
                      value={formData.stream}
                      onValueChange={(value) => setFormData({ ...formData, stream: value })}
                    >
                      <SelectTrigger className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 rounded-lg">
                        <SelectValue placeholder="Select stream" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="medical">Medical</SelectItem>
                        <SelectItem value="non-medical">Non-medical/Science</SelectItem>
                        <SelectItem value="commerce">Commerce</SelectItem>
                        <SelectItem value="arts">Arts/Humanities</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="location" className="text-gray-700 font-semibold">
                    Location (District)
                  </Label>
                  <Select
                    value={formData.location}
                    onValueChange={(value) => setFormData({ ...formData, location: value })}
                    onOpenChange={(open) => {
                      if (open) {
                        setLocationSearch("")
                        handleLocationSearchFocus()
                      }
                    }}
                  >
                    <SelectTrigger className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 rounded-lg">
                      <SelectValue placeholder="Select your district" />
                    </SelectTrigger>
                    <SelectContent className="h-80">
                      <div className="sticky top-0 bg-white p-2 border-b z-10">
                        <div className="relative">
                          <Input
                            ref={locationSearchRef}
                            key="location-search"
                            placeholder="Search for your district..."
                            value={locationSearch}
                            onChange={handleLocationSearch}
                            className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 rounded-lg pr-8"
                            onClick={(e) => e.stopPropagation()}
                            onFocus={(e) => e.stopPropagation()}
                          />
                          <Search className="absolute right-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                      </div>
                      <div className="h-64 overflow-y-auto">
                        {filteredDistricts.length > 0 ? (
                          filteredDistricts.map((district) => (
                            <SelectItem key={district} value={district}>
                              {district}
                            </SelectItem>
                          ))
                        ) : (
                          <div className="p-4 text-sm text-gray-500 text-center">
                            No districts found for "{locationSearch}"
                          </div>
                        )}
                      </div>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold px-6 py-2 rounded-lg bg-transparent"
                >
                  <ArrowLeft className="mr-2 w-4 h-4" /> Back
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={
                    !formData.name ||
                    !formData.age ||
                    !formData.class ||
                    !formData.location ||
                    (requiresStream && !formData.stream)
                  }
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold px-8 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Continue <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Preferences Step */}
        {currentStep === "preferences" && (
          <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader className="pb-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                  <PeacockIcon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-green-600 bg-clip-text text-transparent">
                  Your Interests & Goals
                </CardTitle>
              </div>
              <CardDescription className="text-lg text-gray-600 font-medium">
                Help us personalize recommendations by sharing interests and goals
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-4">
                <Label className="text-lg font-bold text-gray-800">Areas of Interest (Select all that apply)</Label>
                <div className="grid md:grid-cols-2 gap-3">
                  {interests.map((interest) => (
                    <div
                      key={interest}
                      className="flex items-center space-x-3 p-2 rounded-lg hover:bg-orange-50 transition-colors"
                    >
                      <Checkbox
                        id={interest}
                        checked={formData.interests.includes(interest)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setFormData({ ...formData, interests: [...formData.interests, interest] })
                          } else {
                            setFormData({ ...formData, interests: formData.interests.filter((i) => i !== interest) })
                          }
                        }}
                        className="border-orange-300 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                      />
                      <Label htmlFor={interest} className="text-sm cursor-pointer font-medium text-gray-700">
                        {interest}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-lg font-bold text-gray-800">Primary Goals (Select up to 3)</Label>
                <div className="grid md:grid-cols-1 gap-3">
                  {goals.map((goal) => (
                    <div
                      key={goal}
                      className="flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                      <Checkbox
                        id={goal}
                        checked={formData.goals.includes(goal)}
                        onCheckedChange={(checked) => {
                          if (checked && formData.goals.length < 3) {
                            setFormData({ ...formData, goals: [...formData.goals, goal] })
                          } else if (!checked) {
                            setFormData({ ...formData, goals: formData.goals.filter((g) => g !== goal) })
                          }
                        }}
                        disabled={!formData.goals.includes(goal) && formData.goals.length >= 3}
                        className="border-blue-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                      />
                      <Label htmlFor={goal} className="text-sm cursor-pointer font-medium text-gray-700">
                        {goal}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-lg font-bold text-gray-800">Preferred Languages</Label>
                <div className="grid md:grid-cols-3 gap-3">
                  {languages.map((language) => (
                    <div
                      key={language}
                      className="flex items-center space-x-3 p-2 rounded-lg hover:bg-green-50 transition-colors"
                    >
                      <Checkbox
                        id={language}
                        checked={formData.languages.includes(language)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setFormData({ ...formData, languages: [...formData.languages, language] })
                          } else {
                            setFormData({ ...formData, languages: formData.languages.filter((l) => l !== language) })
                          }
                        }}
                        className="border-green-300 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                      />
                      <Label htmlFor={language} className="text-sm cursor-pointer font-medium text-gray-700">
                        {language}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold px-6 py-2 rounded-lg bg-transparent"
                >
                  <ArrowLeft className="mr-2 w-4 h-4" /> Back
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={formData.interests.length === 0 || formData.goals.length === 0}
                  className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold px-8 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Continue <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Complete Step */}
        {currentStep === "complete" && (
          <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader className="text-center pb-6">
              <div className="w-24 h-24 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                <PeacockIcon className="w-16 h-16 text-white" />
              </div>
              <CardTitle className="text-4xl font-bold bg-gradient-to-r from-orange-500 via-blue-600 to-green-600 bg-clip-text text-transparent">
                You're All Set!
              </CardTitle>
              <CardDescription className="text-lg text-gray-600 font-medium">
                Welcome to Pavo! We've personalized your experience based on your preferences.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-gradient-to-r from-orange-50 via-blue-50 to-green-50 rounded-xl p-6 space-y-4 border border-orange-200">
                <h3 className="font-bold text-xl text-gray-800">What's Next?</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full" />
                    <span className="font-medium">Take our comprehensive career discovery quiz</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full" />
                    <span className="font-medium">Explore personalized career pathways</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-green-600 rounded-full" />
                    <span className="font-medium">Discover nearby government colleges</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-green-600 rounded-full" />
                    <span className="font-medium">Find relevant scholarship opportunities</span>
                  </li>
                </ul>
              </div>

              <div className="flex justify-between pt-4">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold px-6 py-3 rounded-lg bg-transparent"
                >
                  <ArrowLeft className="mr-2 w-4 h-4" /> Back
                </Button>
                <Button
                  onClick={handleComplete}
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 via-blue-600 to-green-600 hover:from-orange-600 hover:via-blue-700 hover:to-green-700 text-white font-bold px-12 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Enter Dashboard <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
