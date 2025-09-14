"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Brain, Play, CheckCircle, AlertCircle, Zap, Settings, Download } from "lucide-react"

interface TimetableSlot {
  id: string
  day: string
  time: string
  course: string
  faculty: string
  room: string
  type: "lecture" | "lab" | "tutorial"
  year: number
  semester: number
}

interface GenerationResult {
  success: boolean
  conflicts: number
  efficiency: number
  facultyUtilization: number
  roomUtilization: number
  warnings: string[]
  timetable: TimetableSlot[]
}

interface UniversityTimetableSlot {
  courseCode: string
  faculty: string
  type: "T" | "Lab" | "Project Lab"
  semester: "III" | "V" | "VII"
  isExtended?: boolean // For multi-period sessions
  extendedPeriods?: number // Number of periods this session spans
}

interface UniversityMasterTimetable {
  [day: string]: {
    [period: string]: {
      [semester: string]: UniversityTimetableSlot | null
    }
  }
}

const sampleTimetable = [
  {
    day: "Monday",
    slots: [
      { id: "1", day: "Monday", time: "9:00–10:00", course: "MDS-24215", faculty: "DD", room: "A101", type: "lecture" },
      {
        id: "2",
        day: "Monday",
        time: "10:00–11:00",
        course: "MDS-24287",
        faculty: "KSY",
        room: "A102",
        type: "lecture",
      },
      { id: "3", day: "Monday", time: "11:00–12:00", course: "MDS-313", faculty: "JK", room: "A103", type: "lecture" },
      { id: "4", day: "Monday", time: "12:00–1:00", course: "MDS-314", faculty: "MD", room: "A104", type: "lecture" },
      { id: "5", day: "Monday", time: "2:30–3:30", course: "MDS-315", faculty: "PU", room: "A105", type: "lab" },
      { id: "6", day: "Monday", time: "3:30–4:30", course: "MDS-316", faculty: "RB", room: "A106", type: "lab" },
      { id: "7", day: "Monday", time: "4:30–5:30", course: "MDS-359", faculty: "SMY", room: "A107", type: "tutorial" },
    ],
  },
  {
    day: "Tuesday",
    slots: [
      {
        id: "8",
        day: "Tuesday",
        time: "9:00–10:00",
        course: "MDS-24287",
        faculty: "CKV",
        room: "A108",
        type: "lecture",
      },
      { id: "9", day: "Tuesday", time: "10:00–11:00", course: "MDS-315", faculty: "DD", room: "A109", type: "lecture" },
      {
        id: "10",
        day: "Tuesday",
        time: "11:00–12:00",
        course: "MDS-316",
        faculty: "JK",
        room: "A110",
        type: "lecture",
      },
      { id: "11", day: "Tuesday", time: "12:00–1:00", course: "MDS-359", faculty: "SD", room: "A111", type: "lecture" },
      { id: "12", day: "Tuesday", time: "2:30–3:30", course: "MDS-24215", faculty: "KSY", room: "A112", type: "lab" },
      { id: "13", day: "Tuesday", time: "3:30–4:30", course: "MDS-24287", faculty: "MD", room: "A113", type: "lab" },
      {
        id: "14",
        day: "Tuesday",
        time: "4:30–5:30",
        course: "MDS-313",
        faculty: "RRR",
        room: "A114",
        type: "tutorial",
      },
    ],
  },
  // Additional days can be added here
]

export function AIEngine() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState<GenerationResult | null>(null)
  const [currentStep, setCurrentStep] = useState("")
  const [selectedBranch, setSelectedBranch] = useState<string>("")
  const [showBranchSelection, setShowBranchSelection] = useState(false)
  const [universityTimetable, setUniversityTimetable] = useState<UniversityMasterTimetable | null>(null)

  const branches = [
    "Computer Science Engineering",
    "Information Technology",
    "Electronics & Communication",
    "Mechanical Engineering",
    "Civil Engineering",
    "Electrical Engineering",
  ]

  const generateUniversityTimetable = (): UniversityMasterTimetable => {
    const periods = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"]
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
    const semesters = ["III", "V", "VII"]

    const timetableData: UniversityMasterTimetable = {}

    // Initialize empty timetable
    days.forEach((day) => {
      timetableData[day] = {}
      periods.forEach((period) => {
        timetableData[day][period] = {}
        semesters.forEach((semester) => {
          timetableData[day][period][semester] = null
        })
      })
    })

    // Course codes and faculty as specified
    const courses = [
      "MDS-24215",
      "MDS-24287",
      "MDS-313",
      "MDS-314",
      "MDS-315",
      "MDS-316",
      "MDS-359",
      "HUM-451",
      "ME-351",
    ]
    const faculty = ["DD", "JK", "SD", "KSY", "MD", "RRR", "PU", "RB", "SMY", "CKV"]

    // Fill Monday
    timetableData["Monday"]["I"]["III"] = { courseCode: "MDS-24215", faculty: "DD", type: "T", semester: "III" }
    timetableData["Monday"]["I"]["V"] = { courseCode: "MDS-313", faculty: "JK", type: "T", semester: "V" }
    timetableData["Monday"]["I"]["VII"] = { courseCode: "HUM-451", faculty: "SD", type: "T", semester: "VII" }

    timetableData["Monday"]["II"]["III"] = { courseCode: "MDS-24287", faculty: "KSY", type: "T", semester: "III" }
    timetableData["Monday"]["II"]["V"] = { courseCode: "MDS-314", faculty: "MD", type: "T", semester: "V" }
    timetableData["Monday"]["II"]["VII"] = { courseCode: "ME-351", faculty: "RRR", type: "T", semester: "VII" }

    timetableData["Monday"]["III"]["III"] = { courseCode: "MDS-315", faculty: "PU", type: "T", semester: "III" }
    timetableData["Monday"]["III"]["V"] = { courseCode: "MDS-316", faculty: "RB", type: "T", semester: "V" }
    timetableData["Monday"]["III"]["VII"] = { courseCode: "MDS-359", faculty: "SMY", type: "T", semester: "VII" }

    timetableData["Monday"]["IV"]["III"] = { courseCode: "HUM-451", faculty: "CKV", type: "T", semester: "III" }
    timetableData["Monday"]["IV"]["V"] = { courseCode: "MDS-24215", faculty: "DD", type: "T", semester: "V" }
    timetableData["Monday"]["IV"]["VII"] = { courseCode: "MDS-24287", faculty: "JK", type: "T", semester: "VII" }

    // Period V is lunch break - leave empty

    timetableData["Monday"]["VI"]["III"] = {
      courseCode: "MDS-313",
      faculty: "SD",
      type: "Lab",
      semester: "III",
      isExtended: true,
      extendedPeriods: 2,
    }
    timetableData["Monday"]["VII"]["III"] = {
      courseCode: "MDS-313",
      faculty: "SD",
      type: "Lab",
      semester: "III",
      isExtended: false,
    }
    timetableData["Monday"]["VI"]["V"] = {
      courseCode: "MDS-314",
      faculty: "KSY",
      type: "Project Lab",
      semester: "V",
      isExtended: true,
      extendedPeriods: 2,
    }
    timetableData["Monday"]["VII"]["V"] = {
      courseCode: "MDS-314",
      faculty: "KSY",
      type: "Project Lab",
      semester: "V",
      isExtended: false,
    }
    timetableData["Monday"]["VI"]["VII"] = { courseCode: "ME-351", faculty: "MD", type: "T", semester: "VII" }
    timetableData["Monday"]["VII"]["VII"] = { courseCode: "MDS-315", faculty: "RRR", type: "T", semester: "VII" }

    timetableData["Monday"]["VIII"]["III"] = { courseCode: "MDS-316", faculty: "PU", type: "T", semester: "III" }
    timetableData["Monday"]["VIII"]["V"] = { courseCode: "MDS-359", faculty: "RB", type: "T", semester: "V" }
    timetableData["Monday"]["VIII"]["VII"] = { courseCode: "HUM-451", faculty: "SMY", type: "T", semester: "VII" }

    // Fill Tuesday
    timetableData["Tuesday"]["I"]["III"] = { courseCode: "MDS-24287", faculty: "CKV", type: "T", semester: "III" }
    timetableData["Tuesday"]["I"]["V"] = { courseCode: "MDS-315", faculty: "DD", type: "T", semester: "V" }
    timetableData["Tuesday"]["I"]["VII"] = { courseCode: "MDS-316", faculty: "JK", type: "T", semester: "VII" }

    timetableData["Tuesday"]["II"]["III"] = { courseCode: "MDS-359", faculty: "SD", type: "T", semester: "III" }
    timetableData["Tuesday"]["II"]["V"] = { courseCode: "HUM-451", faculty: "KSY", type: "T", semester: "V" }
    timetableData["Tuesday"]["II"]["VII"] = { courseCode: "ME-351", faculty: "MD", type: "T", semester: "VII" }

    timetableData["Tuesday"]["III"]["III"] = { courseCode: "MDS-24215", faculty: "RRR", type: "T", semester: "III" }
    timetableData["Tuesday"]["III"]["V"] = { courseCode: "MDS-24287", faculty: "PU", type: "T", semester: "V" }
    timetableData["Tuesday"]["III"]["VII"] = { courseCode: "MDS-313", faculty: "RB", type: "T", semester: "VII" }

    timetableData["Tuesday"]["IV"]["III"] = { courseCode: "MDS-314", faculty: "SMY", type: "T", semester: "III" }
    timetableData["Tuesday"]["IV"]["V"] = { courseCode: "MDS-315", faculty: "CKV", type: "T", semester: "V" }
    timetableData["Tuesday"]["IV"]["VII"] = { courseCode: "MDS-316", faculty: "DD", type: "T", semester: "VII" }

    timetableData["Tuesday"]["VI"]["III"] = { courseCode: "MDS-359", faculty: "JK", type: "T", semester: "III" }
    timetableData["Tuesday"]["VI"]["V"] = {
      courseCode: "HUM-451",
      faculty: "SD",
      type: "Lab",
      semester: "V",
      isExtended: true,
      extendedPeriods: 2,
    }
    timetableData["Tuesday"]["VII"]["V"] = {
      courseCode: "HUM-451",
      faculty: "SD",
      type: "Lab",
      semester: "V",
      isExtended: false,
    }
    timetableData["Tuesday"]["VI"]["VII"] = {
      courseCode: "ME-351",
      faculty: "KSY",
      type: "Project Lab",
      semester: "VII",
      isExtended: true,
      extendedPeriods: 2,
    }
    timetableData["Tuesday"]["VII"]["VII"] = {
      courseCode: "ME-351",
      faculty: "KSY",
      type: "Project Lab",
      semester: "VII",
      isExtended: false,
    }

    timetableData["Tuesday"]["VII"]["III"] = { courseCode: "MDS-24215", faculty: "MD", type: "T", semester: "III" }
    timetableData["Tuesday"]["VIII"]["III"] = { courseCode: "MDS-24287", faculty: "RRR", type: "T", semester: "III" }
    timetableData["Tuesday"]["VIII"]["V"] = { courseCode: "MDS-313", faculty: "PU", type: "T", semester: "V" }
    timetableData["Tuesday"]["VIII"]["VII"] = { courseCode: "MDS-314", faculty: "RB", type: "T", semester: "VII" }

    // Fill Wednesday
    timetableData["Wednesday"]["I"]["III"] = { courseCode: "MDS-315", faculty: "SMY", type: "T", semester: "III" }
    timetableData["Wednesday"]["I"]["V"] = { courseCode: "MDS-316", faculty: "CKV", type: "T", semester: "V" }
    timetableData["Wednesday"]["I"]["VII"] = { courseCode: "MDS-359", faculty: "DD", type: "T", semester: "VII" }

    timetableData["Wednesday"]["II"]["III"] = { courseCode: "HUM-451", faculty: "JK", type: "T", semester: "III" }
    timetableData["Wednesday"]["II"]["V"] = { courseCode: "ME-351", faculty: "SD", type: "T", semester: "V" }
    timetableData["Wednesday"]["II"]["VII"] = { courseCode: "MDS-24215", faculty: "KSY", type: "T", semester: "VII" }

    timetableData["Wednesday"]["III"]["III"] = { courseCode: "MDS-24287", faculty: "MD", type: "T", semester: "III" }
    timetableData["Wednesday"]["III"]["V"] = { courseCode: "MDS-313", faculty: "RRR", type: "T", semester: "V" }
    timetableData["Wednesday"]["III"]["VII"] = { courseCode: "MDS-314", faculty: "PU", type: "T", semester: "VII" }

    timetableData["Wednesday"]["IV"]["III"] = { courseCode: "MDS-315", faculty: "RB", type: "T", semester: "III" }
    timetableData["Wednesday"]["IV"]["V"] = { courseCode: "MDS-316", faculty: "SMY", type: "T", semester: "V" }
    timetableData["Wednesday"]["IV"]["VII"] = { courseCode: "MDS-359", faculty: "CKV", type: "T", semester: "VII" }

    timetableData["Wednesday"]["VI"]["III"] = {
      courseCode: "HUM-451",
      faculty: "DD",
      type: "Lab",
      semester: "III",
      isExtended: true,
      extendedPeriods: 2,
    }
    timetableData["Wednesday"]["VII"]["III"] = {
      courseCode: "HUM-451",
      faculty: "DD",
      type: "Lab",
      semester: "III",
      isExtended: false,
    }
    timetableData["Wednesday"]["VI"]["V"] = { courseCode: "ME-351", faculty: "JK", type: "T", semester: "V" }
    timetableData["Wednesday"]["VI"]["VII"] = { courseCode: "MDS-24215", faculty: "SD", type: "T", semester: "VII" }

    timetableData["Wednesday"]["VII"]["V"] = { courseCode: "MDS-24287", faculty: "KSY", type: "T", semester: "V" }
    timetableData["Wednesday"]["VII"]["VII"] = { courseCode: "MDS-313", faculty: "MD", type: "T", semester: "VII" }

    timetableData["Wednesday"]["VIII"]["III"] = { courseCode: "MDS-314", faculty: "RRR", type: "T", semester: "III" }
    timetableData["Wednesday"]["VIII"]["V"] = { courseCode: "MDS-315", faculty: "PU", type: "T", semester: "V" }
    timetableData["Wednesday"]["VIII"]["VII"] = { courseCode: "MDS-316", faculty: "RB", type: "T", semester: "VII" }

    // Fill Thursday
    timetableData["Thursday"]["I"]["III"] = { courseCode: "MDS-359", faculty: "SMY", type: "T", semester: "III" }
    timetableData["Thursday"]["I"]["V"] = { courseCode: "HUM-451", faculty: "CKV", type: "T", semester: "V" }
    timetableData["Thursday"]["I"]["VII"] = { courseCode: "ME-351", faculty: "DD", type: "T", semester: "VII" }

    timetableData["Thursday"]["II"]["III"] = { courseCode: "MDS-24215", faculty: "JK", type: "T", semester: "III" }
    timetableData["Thursday"]["II"]["V"] = { courseCode: "MDS-24287", faculty: "SD", type: "T", semester: "V" }
    timetableData["Thursday"]["II"]["VII"] = { courseCode: "MDS-313", faculty: "KSY", type: "T", semester: "VII" }

    timetableData["Thursday"]["III"]["III"] = { courseCode: "MDS-314", faculty: "MD", type: "T", semester: "III" }
    timetableData["Thursday"]["III"]["V"] = { courseCode: "MDS-315", faculty: "RRR", type: "T", semester: "V" }
    timetableData["Thursday"]["III"]["VII"] = { courseCode: "MDS-316", faculty: "PU", type: "T", semester: "VII" }

    timetableData["Thursday"]["IV"]["III"] = { courseCode: "MDS-359", faculty: "RB", type: "T", semester: "III" }
    timetableData["Thursday"]["IV"]["V"] = { courseCode: "HUM-451", faculty: "SMY", type: "T", semester: "V" }
    timetableData["Thursday"]["IV"]["VII"] = { courseCode: "ME-351", faculty: "CKV", type: "T", semester: "VII" }

    timetableData["Thursday"]["VI"]["III"] = { courseCode: "MDS-24215", faculty: "DD", type: "T", semester: "III" }
    timetableData["Thursday"]["VI"]["V"] = {
      courseCode: "MDS-24287",
      faculty: "JK",
      type: "Project Lab",
      semester: "V",
      isExtended: true,
      extendedPeriods: 2,
    }
    timetableData["Thursday"]["VII"]["V"] = {
      courseCode: "MDS-24287",
      faculty: "JK",
      type: "Project Lab",
      semester: "V",
      isExtended: false,
    }
    timetableData["Thursday"]["VI"]["VII"] = {
      courseCode: "MDS-313",
      faculty: "SD",
      type: "Lab",
      semester: "VII",
      isExtended: true,
      extendedPeriods: 2,
    }
    timetableData["Thursday"]["VII"]["VII"] = {
      courseCode: "MDS-313",
      faculty: "SD",
      type: "Lab",
      semester: "VII",
      isExtended: false,
    }

    timetableData["Thursday"]["VII"]["III"] = { courseCode: "MDS-314", faculty: "KSY", type: "T", semester: "III" }
    timetableData["Thursday"]["VIII"]["III"] = { courseCode: "MDS-315", faculty: "MD", type: "T", semester: "III" }
    timetableData["Thursday"]["VIII"]["V"] = { courseCode: "MDS-316", faculty: "RRR", type: "T", semester: "V" }
    timetableData["Thursday"]["VIII"]["VII"] = { courseCode: "MDS-359", faculty: "PU", type: "T", semester: "VII" }

    // Fill Friday
    timetableData["Friday"]["I"]["III"] = { courseCode: "HUM-451", faculty: "RB", type: "T", semester: "III" }
    timetableData["Friday"]["I"]["V"] = { courseCode: "ME-351", faculty: "SMY", type: "T", semester: "V" }
    timetableData["Friday"]["I"]["VII"] = { courseCode: "MDS-24215", faculty: "CKV", type: "T", semester: "VII" }

    timetableData["Friday"]["II"]["III"] = { courseCode: "MDS-24287", faculty: "DD", type: "T", semester: "III" }
    timetableData["Friday"]["II"]["V"] = { courseCode: "MDS-313", faculty: "JK", type: "T", semester: "V" }
    timetableData["Friday"]["II"]["VII"] = { courseCode: "MDS-314", faculty: "SD", type: "T", semester: "VII" }

    timetableData["Friday"]["III"]["III"] = { courseCode: "MDS-315", faculty: "KSY", type: "T", semester: "III" }
    timetableData["Friday"]["III"]["V"] = { courseCode: "MDS-316", faculty: "MD", type: "T", semester: "V" }
    timetableData["Friday"]["III"]["VII"] = { courseCode: "MDS-359", faculty: "RRR", type: "T", semester: "VII" }

    timetableData["Friday"]["IV"]["III"] = { courseCode: "HUM-451", faculty: "PU", type: "T", semester: "III" }
    timetableData["Friday"]["IV"]["V"] = { courseCode: "ME-351", faculty: "RB", type: "T", semester: "V" }
    timetableData["Friday"]["IV"]["VII"] = { courseCode: "MDS-24215", faculty: "SMY", type: "T", semester: "VII" }

    timetableData["Friday"]["VI"]["III"] = {
      courseCode: "MDS-24287",
      faculty: "CKV",
      type: "Lab",
      semester: "III",
      isExtended: true,
      extendedPeriods: 2,
    }
    timetableData["Friday"]["VII"]["III"] = {
      courseCode: "MDS-24287",
      faculty: "CKV",
      type: "Lab",
      semester: "III",
      isExtended: false,
    }
    timetableData["Friday"]["VI"]["V"] = { courseCode: "MDS-313", faculty: "DD", type: "T", semester: "V" }
    timetableData["Friday"]["VI"]["VII"] = { courseCode: "MDS-314", faculty: "JK", type: "T", semester: "VII" }

    timetableData["Friday"]["VII"]["V"] = { courseCode: "MDS-315", faculty: "SD", type: "T", semester: "V" }
    timetableData["Friday"]["VII"]["VII"] = { courseCode: "MDS-316", faculty: "KSY", type: "T", semester: "VII" }

    timetableData["Friday"]["VIII"]["III"] = { courseCode: "MDS-359", faculty: "MD", type: "T", semester: "III" }
    timetableData["Friday"]["VIII"]["V"] = { courseCode: "HUM-451", faculty: "RRR", type: "T", semester: "V" }
    timetableData["Friday"]["VIII"]["VII"] = { courseCode: "ME-351", faculty: "PU", type: "T", semester: "VII" }

    return timetableData
  }

  const generateTimetable = async () => {
    if (!selectedBranch) {
      setShowBranchSelection(true)
      return
    }

    setIsGenerating(true)
    setProgress(0)
    setResult(null)
    setShowBranchSelection(false)

    const steps = [
      "Analyzing curriculum data...",
      "Processing faculty constraints...",
      "Optimizing room allocation...",
      "Resolving scheduling conflicts...",
      "Applying AI optimization...",
      "Generating master timetable...",
      "Validating results...",
    ]

    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(steps[i])
      setProgress(((i + 1) / steps.length) * 100)
      await new Promise((resolve) => setTimeout(resolve, 1500))
    }

    const generatedTimetable = generateUniversityTimetable()
    setUniversityTimetable(generatedTimetable)

    // Mock result
    const mockResult: GenerationResult = {
      success: true,
      conflicts: 0,
      efficiency: 98,
      facultyUtilization: 92,
      roomUtilization: 89,
      warnings: [],
      timetable: [],
    }

    setResult(mockResult)
    setIsGenerating(false)
    setCurrentStep("Generation complete!")
  }

  const getSemesterColor = (semester: "III" | "V" | "VII") => {
    switch (semester) {
      case "III":
        return "bg-violet-100 text-violet-800 border-violet-200"
      case "V":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "VII":
        return "bg-emerald-100 text-emerald-800 border-emerald-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getTypeIcon = (type: "T" | "Lab" | "Project Lab") => {
    switch (type) {
      case "T":
        return "📚"
      case "Lab":
        return "🔬"
      case "Project Lab":
        return "🛠️"
      default:
        return "📚"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Brain className="h-6 w-6 text-primary" />
            AI Timetable Generation Engine
          </h2>
          <p className="text-muted-foreground">Generate conflict-free timetables using advanced AI algorithms</p>
        </div>
        <Button onClick={generateTimetable} disabled={isGenerating} className="bg-primary hover:bg-primary/90">
          {isGenerating ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Generating...
            </>
          ) : (
            <>
              <Play className="h-4 w-4 mr-2" />
              Generate Timetable
            </>
          )}
        </Button>
      </div>

      {showBranchSelection && (
        <Card className="border-0 shadow-lg bg-gradient-to-r from-primary/5 to-accent/5">
          <CardHeader>
            <CardTitle>Select Branch</CardTitle>
            <CardDescription>Choose the branch for timetable generation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select value={selectedBranch} onValueChange={setSelectedBranch}>
              <SelectTrigger>
                <SelectValue placeholder="Select a branch" />
              </SelectTrigger>
              <SelectContent>
                {branches.map((branch) => (
                  <SelectItem key={branch} value={branch}>
                    {branch}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex gap-2">
              <Button onClick={generateTimetable} disabled={!selectedBranch} className="flex-1">
                Continue Generation
              </Button>
              <Button variant="outline" onClick={() => setShowBranchSelection(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* AI Engine Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium">Engine Status</p>
                <p className="text-sm text-muted-foreground">Ready & Optimized</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Zap className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium">Algorithm</p>
                <p className="text-sm text-muted-foreground">Genetic Algorithm + ML</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <Settings className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="font-medium">Optimization</p>
                <p className="text-sm text-muted-foreground">Multi-objective</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Generation Progress */}
      {isGenerating && (
        <Card className="border-0 shadow-lg bg-gradient-to-r from-primary/5 to-accent/5">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Generating Timetable</h3>
                <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-primary"></div>
                {currentStep}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Generation Results */}
      {result && (
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Generation Results
            </CardTitle>
            <CardDescription>Timetable generated successfully with optimization metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <p className="text-2xl font-bold text-green-600">{result.conflicts}</p>
                <p className="text-sm text-muted-foreground">Conflicts</p>
              </div>
              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">{result.efficiency}%</p>
                <p className="text-sm text-muted-foreground">Efficiency</p>
              </div>
              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <p className="text-2xl font-bold text-purple-600">{result.facultyUtilization}%</p>
                <p className="text-sm text-muted-foreground">Faculty Util.</p>
              </div>
              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <p className="text-2xl font-bold text-orange-600">{result.roomUtilization}%</p>
                <p className="text-sm text-muted-foreground">Room Util.</p>
              </div>
            </div>

            {/* Warnings */}
            {result.warnings.length > 0 && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <div className="space-y-1">
                    <p className="font-medium">Optimization Warnings:</p>
                    {result.warnings.map((warning, index) => (
                      <p key={index} className="text-sm">
                        • {warning}
                      </p>
                    ))}
                  </div>
                </AlertDescription>
              </Alert>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button className="flex-1">
                <CheckCircle className="h-4 w-4 mr-2" />
                Approve & Finalize
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
              <Button variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Adjust Parameters
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Sample Timetable Preview */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Generated Timetable Preview</CardTitle>
          <CardDescription>Sample view of the generated master timetable</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="grid" className="w-full">
            <TabsList>
              <TabsTrigger value="grid">Grid View</TabsTrigger>
              <TabsTrigger value="list">List View</TabsTrigger>
            </TabsList>

            <TabsContent value="grid" className="space-y-4">
              <div className="grid gap-4">
                {sampleTimetable.map((day, dayIndex) => (
                  <Card key={dayIndex} className="border">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">{day.day}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {day.slots.map((slot, slotIndex) => (
                        <div key={slotIndex} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                          <div className="flex items-center gap-3">
                            <Badge variant="outline" className="min-w-[60px]">
                              {slot.time}
                            </Badge>
                            <div>
                              <p className="font-medium">{slot.course}</p>
                              <p className="text-sm text-muted-foreground">
                                {slot.faculty} • {slot.room}
                              </p>
                            </div>
                          </div>
                          <Badge variant={slot.type === "lab" ? "default" : "secondary"}>{slot.type}</Badge>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="list" className="space-y-2">
              {result?.timetable.map((slot, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <Badge variant="outline">{slot.day}</Badge>
                    <Badge variant="outline">{slot.time}</Badge>
                    <div>
                      <p className="font-medium">{slot.course}</p>
                      <p className="text-sm text-muted-foreground">
                        {slot.faculty} • {slot.room}
                      </p>
                    </div>
                  </div>
                  <Badge variant={slot.type === "lab" ? "default" : "secondary"}>{slot.type}</Badge>
                </div>
              )) || <p className="text-center text-muted-foreground py-8">Generate a timetable to see results here</p>}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {universityTimetable && (
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-center font-bold">TIME TABLE (Sem III, V, VII)</CardTitle>
            <CardDescription className="text-center text-lg">
              Session: July 2025 – November 2025 | Branch: {selectedBranch}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <div className="min-w-[1400px] bg-white rounded-lg border-2 border-gray-300">
                {/* Header Row */}
                <div className="grid grid-cols-9 border-b-2 border-gray-300">
                  <div className="p-4 font-bold bg-gray-100 border-r-2 border-gray-300 text-center">PERIODS</div>
                  <div className="p-4 font-bold bg-blue-50 border-r-2 border-gray-300 text-center">
                    I<br />
                    (9:00–10:00)
                  </div>
                  <div className="p-4 font-bold bg-blue-50 border-r-2 border-gray-300 text-center">
                    II
                    <br />
                    (10:00–11:00)
                  </div>
                  <div className="p-4 font-bold bg-blue-50 border-r-2 border-gray-300 text-center">
                    III
                    <br />
                    (11:00–12:00)
                  </div>
                  <div className="p-4 font-bold bg-blue-50 border-r-2 border-gray-300 text-center">
                    IV
                    <br />
                    (12:00–1:00)
                  </div>
                  <div className="p-4 font-bold bg-yellow-100 border-r-2 border-gray-300 text-center">
                    V<br />
                    (1:00–2:30)
                    <br />
                    LUNCH
                  </div>
                  <div className="p-4 font-bold bg-blue-50 border-r-2 border-gray-300 text-center">
                    VI
                    <br />
                    (2:30–3:30)
                  </div>
                  <div className="p-4 font-bold bg-blue-50 border-r-2 border-gray-300 text-center">
                    VII
                    <br />
                    (3:30–4:30)
                  </div>
                  <div className="p-4 font-bold bg-blue-50 text-center">
                    VIII
                    <br />
                    (4:30–5:30)
                  </div>
                </div>

                {/* Days and Timetable Data */}
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => (
                  <div key={day}>
                    {/* Day Header */}
                    <div className="grid grid-cols-9 border-b border-gray-300">
                      <div className="p-3 font-bold bg-gray-200 border-r-2 border-gray-300 text-center row-span-3 flex items-center justify-center">
                        {day.toUpperCase()}
                      </div>
                      {["I", "II", "III", "IV", "V", "VI", "VII", "VIII"].map((period) => (
                        <div key={`${day}-${period}`} className="border-r border-gray-300 min-h-[120px]">
                          {period === "V" ? (
                            // Lunch break - merged cell
                            <div className="h-full bg-yellow-50 flex items-center justify-center text-sm font-medium text-yellow-800">
                              LUNCH
                              <br />
                              BREAK
                            </div>
                          ) : (
                            // Regular periods with semester rows
                            <div className="h-full">
                              {["III", "V", "VII"].map((semester, semIndex) => {
                                const slot = universityTimetable[day]?.[period]?.[semester]
                                return (
                                  <div
                                    key={`${day}-${period}-${semester}`}
                                    className={`h-10 border-b border-gray-200 p-1 text-xs ${getSemesterColor(semester as "III" | "V" | "VII")} ${
                                      semIndex === 2 ? "border-b-0" : ""
                                    }`}
                                  >
                                    {slot && !slot.isExtended && (
                                      <div className="flex flex-col h-full justify-center">
                                        <div className="flex items-center gap-1">
                                          <span>{getTypeIcon(slot.type)}</span>
                                          <span className="font-semibold">{slot.courseCode}</span>
                                        </div>
                                        <div className="font-medium">{slot.faculty}</div>
                                        <div className="text-xs opacity-75">{slot.type}</div>
                                      </div>
                                    )}
                                    {slot && slot.isExtended && (
                                      <div className="flex flex-col h-full justify-center bg-gradient-to-r from-current to-transparent">
                                        <div className="flex items-center gap-1">
                                          <span>{getTypeIcon(slot.type)}</span>
                                          <span className="font-semibold">{slot.courseCode}</span>
                                          <span className="text-xs">→</span>
                                        </div>
                                        <div className="font-medium">{slot.faculty}</div>
                                        <div className="text-xs opacity-75">{slot.type}</div>
                                      </div>
                                    )}
                                  </div>
                                )
                              })}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <div className="space-y-2">
                <h4 className="font-semibold">Session Types:</h4>
                <div className="flex items-center gap-2">
                  <span>📚</span>
                  <span>Theory (T)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>🔬</span>
                  <span>Laboratory</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>🛠️</span>
                  <span>Project Lab</span>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Semesters:</h4>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-violet-100 border border-violet-200 rounded"></div>
                  <span>Semester III</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-orange-100 border border-orange-200 rounded"></div>
                  <span>Semester V</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-emerald-100 border border-emerald-200 rounded"></div>
                  <span>Semester VII</span>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Features:</h4>
                <div className="text-xs space-y-1">
                  <div>• No faculty conflicts</div>
                  <div>• Extended lab sessions (→)</div>
                  <div>• Lunch break (1:00-2:30)</div>
                  <div>• Color-coded semesters</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
