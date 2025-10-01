"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Plus,
  Edit,
  Trash2,
  Users,
  BookOpen,
  MapPin,
  Clock,
  Download,
  ChevronRight,
  Brain,
  Settings,
} from "lucide-react"

interface Faculty {
  id: string
  name: string
  email: string
  department: string
  subjects: string[]
  maxHours: number
  preferences: string[]
  facultyPreference: "Morning" | "Evening"
}

interface Student {
  id: string
  name: string
  rollNumber: string
  department: string
  semester: number
  totalStrength: number
}

interface Course {
  id: string
  name: string
  code: string
  credits: number
  department: string
  year: number
  semester: number
  type: "lecture" | "lab" | "tutorial"
  duration: number
}

interface Room {
  id: string
  name: string
  type: "classroom" | "lab" | "auditorium"
  capacity: number
  equipment: string[]
}

interface TimeSlot {
  id: string
  day: string
  startTime: string
  endTime: string
  duration: number
  isLunch?: boolean
}

interface Elective {
  id: string
  branch: string
  parentDepartment: string
  subject: string
  semester: number
  strength: number
}

export function DataManagement() {
  const [activeTab, setActiveTab] = useState("faculty")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isERPDialogOpen, setIsERPDialogOpen] = useState(false)

  const [faculty, setFaculty] = useState<Faculty[]>([
    // CSE Department first
    {
      id: "1",
      name: "Dr. Rajesh Kumar",
      email: "rajesh@college.edu",
      department: "CSE",
      subjects: ["Data Structures", "Algorithms"],
      maxHours: 20,
      preferences: ["Morning slots", "No Friday evening"],
      facultyPreference: "Morning",
    },
    {
      id: "2",
      name: "Prof. Amit Singh",
      email: "amit@college.edu",
      department: "CSE",
      subjects: ["Database Systems", "Software Engineering"],
      maxHours: 18,
      preferences: ["Afternoon preferred"],
      facultyPreference: "Evening",
    },
    // MDS Department second
    {
      id: "3",
      name: "Dr. Priya Sharma",
      email: "priya@college.edu",
      department: "MDS",
      subjects: ["Machine Learning", "Data Analytics"],
      maxHours: 22,
      preferences: ["Morning preferred"],
      facultyPreference: "Morning",
    },
    // ECE Department third
    {
      id: "4",
      name: "Prof. Vikram Patel",
      email: "vikram@college.edu",
      department: "ECE",
      subjects: ["Digital Circuits", "Communication Systems"],
      maxHours: 20,
      preferences: ["Evening slots"],
      facultyPreference: "Evening",
    },
  ])

  const [students, setStudents] = useState<Student[]>([
    {
      id: "1",
      name: "Aarav Kumar",
      rollNumber: "CS21001",
      department: "CSE",
      semester: 3,
      totalStrength: 60,
    },
    {
      id: "2",
      name: "Diya Patel",
      rollNumber: "MDS21002",
      department: "MDS",
      semester: 5,
      totalStrength: 45,
    },
    {
      id: "3",
      name: "Arjun Singh",
      rollNumber: "ECE21003",
      department: "ECE",
      semester: 7,
      totalStrength: 55,
    },
  ])

  const [courses, setCourses] = useState<Course[]>([
    {
      id: "1",
      name: "Data Structures and Algorithms",
      code: "CS201",
      credits: 4,
      department: "Computer Science",
      year: 2,
      semester: 1,
      type: "lecture",
      duration: 60,
    },
    {
      id: "2",
      name: "Database Systems Lab",
      code: "CS202L",
      credits: 2,
      department: "Computer Science",
      year: 2,
      semester: 1,
      type: "lab",
      duration: 120,
    },
  ])

  const [rooms, setRooms] = useState<Room[]>([
    {
      id: "1",
      name: "CS-101",
      type: "classroom",
      capacity: 60,
      equipment: ["Projector", "Whiteboard", "AC"],
    },
    {
      id: "2",
      name: "CS-Lab-1",
      type: "lab",
      capacity: 30,
      equipment: ["Computers", "Projector", "AC", "Network"],
    },
  ])

  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([
    { id: "1", day: "Monday", startTime: "09:00", endTime: "10:00", duration: 60 },
    { id: "2", day: "Monday", startTime: "10:00", endTime: "11:00", duration: 60 },
    { id: "3", day: "Monday", startTime: "11:00", endTime: "12:00", duration: 60 },
    { id: "4", day: "Monday", startTime: "12:00", endTime: "13:00", duration: 60 },
    { id: "5", day: "Monday", startTime: "13:00", endTime: "14:30", duration: 90, isLunch: true }, // Lunch Break
    { id: "6", day: "Monday", startTime: "14:30", endTime: "15:30", duration: 60 },
    { id: "7", day: "Monday", startTime: "15:30", endTime: "16:30", duration: 60 },
    { id: "8", day: "Monday", startTime: "16:30", endTime: "17:00", duration: 30 },
  ])

  const [electives, setElectives] = useState<Elective[]>([
    {
      id: "1",
      branch: "Computer Science",
      parentDepartment: "CSE",
      subject: "Artificial Intelligence",
      semester: 6,
      strength: 25,
    },
    {
      id: "2",
      branch: "Data Science",
      parentDepartment: "MDS",
      subject: "Deep Learning",
      semester: 8,
      strength: 30,
    },
  ])

  const courseCatalog = [
    "Data Structures",
    "Algorithms",
    "Database Systems",
    "Software Engineering",
    "Machine Learning",
    "Data Analytics",
    "Digital Circuits",
    "Communication Systems",
    "Operating Systems",
    "Computer Networks",
    "Artificial Intelligence",
    "Deep Learning",
  ]

  const navigateToNext = () => {
    const tabOrder = ["faculty", "students", "courses", "rooms", "schedule", "electives"]
    const currentIndex = tabOrder.indexOf(activeTab)
    if (currentIndex < tabOrder.length - 1) {
      setActiveTab(tabOrder[currentIndex + 1])
    }
  }

  const [classStart, setClassStart] = useState("09:00")
  const [classEnd, setClassEnd] = useState("17:00")
  const [classDuration, setClassDuration] = useState<45 | 60>(60)
  const [lunchStart, setLunchStart] = useState("13:00")
  const [lunchEnd, setLunchEnd] = useState("14:00")

  function toMinutes(t: string) {
    const [h, m] = t.split(":").map(Number)
    return h * 60 + m
  }
  function toHHMM(mins: number) {
    const h = Math.floor(mins / 60)
    const m = mins % 60
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`
  }
  function rebuildTimeSlots() {
    const start = toMinutes(classStart)
    const end = toMinutes(classEnd)
    const lunchS = toMinutes(lunchStart)
    const lunchE = toMinutes(lunchEnd)

    const slots: TimeSlot[] = []
    let cursor = start
    let id = 1

    // before lunch
    while (cursor + classDuration <= Math.min(lunchS, end)) {
      const next = cursor + classDuration
      slots.push({
        id: String(id++),
        day: "Monday",
        startTime: toHHMM(cursor),
        endTime: toHHMM(next),
        duration: classDuration,
      })
      cursor = next
    }

    // add lunch if within window
    if (lunchS < end && lunchE > start) {
      slots.push({
        id: String(id++),
        day: "Monday",
        startTime: toHHMM(lunchS),
        endTime: toHHMM(lunchE),
        duration: Math.max(0, lunchE - lunchS),
        isLunch: true,
      })
      cursor = Math.max(cursor, lunchE)
    }

    // after lunch
    while (cursor + classDuration <= end) {
      const next = cursor + classDuration
      slots.push({
        id: String(id++),
        day: "Monday",
        startTime: toHHMM(cursor),
        endTime: toHHMM(next),
        duration: classDuration,
      })
      cursor = next
    }

    setTimeSlots(slots)
  }

  const goToAIEngine = () => {
    window.dispatchEvent(new CustomEvent("navigate-to-ai-engine"))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Data Management</h2>
          <p className="text-muted-foreground">Manage curriculum, faculty, students, and resources</p>
        </div>
        <div className="flex gap-2">
          <AlertDialog open={isERPDialogOpen} onOpenChange={setIsERPDialogOpen}>
            <AlertDialogTrigger asChild>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Import from ERP
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="max-w-lg">
              <AlertDialogHeader>
                <AlertDialogTitle>ERP Integration</AlertDialogTitle>
                <AlertDialogDescription>
                  Connect and integrate your institution's ERP system to automatically import faculty, student, and
                  course data.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <Label htmlFor="erp-system">ERP System</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your ERP system" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sap">SAP Education</SelectItem>
                      <SelectItem value="oracle">Oracle Campus Solutions</SelectItem>
                      <SelectItem value="banner">Ellucian Banner</SelectItem>
                      <SelectItem value="peoplesoft">PeopleSoft Campus</SelectItem>
                      <SelectItem value="custom">Custom ERP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="api-endpoint">API Endpoint</Label>
                  <Input id="api-endpoint" placeholder="https://your-erp.edu/api/v1" />
                </div>
                <div>
                  <Label htmlFor="api-key">API Key</Label>
                  <Input id="api-key" type="password" placeholder="Enter your API key" />
                </div>
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Connect & Import</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add New
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</DialogTitle>
                <DialogDescription>Add a new {activeTab} to the system</DialogDescription>
              </DialogHeader>
              <AddItemForm type={activeTab} courseCatalog={courseCatalog} onClose={() => setIsAddDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex items-center justify-between">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="faculty" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Faculty
            </TabsTrigger>
            <TabsTrigger value="students" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Students
            </TabsTrigger>
            <TabsTrigger value="courses" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Courses
            </TabsTrigger>
            <TabsTrigger value="rooms" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Rooms
            </TabsTrigger>
            <TabsTrigger value="schedule" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Time Slots
            </TabsTrigger>
            <TabsTrigger value="electives" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Electives
            </TabsTrigger>
          </TabsList>
          <Button onClick={navigateToNext} variant="outline" size="sm">
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>

        <TabsContent value="faculty" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Faculty Management</CardTitle>
              <CardDescription>Manage faculty information and preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Subjects</TableHead>
                    <TableHead>Max Hours</TableHead>
                    <TableHead>Faculty Preference</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {faculty.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell className="font-medium">{member.name}</TableCell>
                      <TableCell>{member.department}</TableCell>
                      <TableCell>
                        <div className="flex gap-1 flex-wrap">
                          {member.subjects.map((subject, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {subject}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>{member.maxHours}h/week</TableCell>
                      <TableCell>
                        <Badge variant={member.facultyPreference === "Morning" ? "default" : "secondary"}>
                          {member.facultyPreference}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="students" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Student Management</CardTitle>
              <CardDescription>Manage student information and enrollment data</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Roll Number</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Semester</TableHead>
                    <TableHead>Total Strength</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell>{student.rollNumber}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{student.department}</Badge>
                      </TableCell>
                      <TableCell>{student.semester}</TableCell>
                      <TableCell>{student.totalStrength}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="courses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Course Management</CardTitle>
              <CardDescription>Manage curriculum and course structure</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course Code</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Credits</TableHead>
                    <TableHead>Year/Sem</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {courses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell className="font-medium">{course.code}</TableCell>
                      <TableCell>{course.name}</TableCell>
                      <TableCell>{course.credits}</TableCell>
                      <TableCell>
                        Year {course.year}, Sem {course.semester}
                      </TableCell>
                      <TableCell>
                        <Badge variant={course.type === "lab" ? "default" : "outline"}>{course.type}</Badge>
                      </TableCell>
                      <TableCell>{course.duration} min</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rooms" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Room Management</CardTitle>
              <CardDescription>Manage classrooms, labs, and facilities</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Room Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Capacity</TableHead>
                    <TableHead>Equipment</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rooms.map((room) => (
                    <TableRow key={room.id}>
                      <TableCell className="font-medium">{room.name}</TableCell>
                      <TableCell>
                        <Badge variant={room.type === "lab" ? "default" : "outline"}>{room.type}</Badge>
                      </TableCell>
                      <TableCell>{room.capacity} students</TableCell>
                      <TableCell>
                        <div className="flex gap-1 flex-wrap">
                          {room.equipment.map((item, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {item}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Time Slot Configuration</CardTitle>
                  <CardDescription>Configure regular class time, class duration, and lunch timings</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="space-y-2">
                  <Label>Regular class time</Label>
                  <div className="flex items-center gap-2">
                    <Input type="time" value={classStart} onChange={(e) => setClassStart(e.target.value)} />
                    <span className="text-sm text-muted-foreground">to</span>
                    <Input type="time" value={classEnd} onChange={(e) => setClassEnd(e.target.value)} />
                  </div>
                  <p className="text-xs text-muted-foreground">e.g., 09:00 to 17:00</p>
                </div>

                <div className="space-y-2">
                  <Label>Class duration</Label>
                  <Select value={String(classDuration)} onValueChange={(v) => setClassDuration(Number(v) as 45 | 60)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="60">60 minutes</SelectItem>
                      <SelectItem value="45">45 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Lunch timings</Label>
                  <div className="flex items-center gap-2">
                    <Input type="time" value={lunchStart} onChange={(e) => setLunchStart(e.target.value)} />
                    <span className="text-sm text-muted-foreground">to</span>
                    <Input type="time" value={lunchEnd} onChange={(e) => setLunchEnd(e.target.value)} />
                  </div>
                  <p className="text-xs text-muted-foreground">e.g., 13:00 to 14:00</p>
                </div>
              </div>

              <div className="mb-6">
                <Button variant="outline" onClick={rebuildTimeSlots}>
                  Apply time settings
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {timeSlots.map((slot) => (
                  <Card key={slot.id} className={`border-2 ${slot.isLunch ? "border-yellow-300 bg-yellow-50" : ""}`}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline">{slot.day}</Badge>
                        <span className="text-sm text-muted-foreground">{slot.duration} min</span>
                      </div>
                      <p className="font-medium">
                        {slot.startTime} - {slot.endTime}
                      </p>
                      {slot.isLunch && <p className="text-xs text-yellow-700 mt-1">Lunch Break</p>}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="electives" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Electives Management</CardTitle>
                  <CardDescription>Manage elective courses and enrollment</CardDescription>
                </div>
                <Button className="bg-primary hover:bg-primary/90" onClick={goToAIEngine}>
                  <Brain className="h-4 w-4 mr-2" />
                  Generate Timetable
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Branch</TableHead>
                    <TableHead>Parent Department</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Semester</TableHead>
                    <TableHead>Strength</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {electives.map((elective) => (
                    <TableRow key={elective.id}>
                      <TableCell className="font-medium">{elective.branch}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{elective.parentDepartment}</Badge>
                      </TableCell>
                      <TableCell>{elective.subject}</TableCell>
                      <TableCell>{elective.semester}</TableCell>
                      <TableCell>{elective.strength} students</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function AddItemForm({ type, courseCatalog, onClose }: { type: string; courseCatalog: string[]; onClose: () => void }) {
  return (
    <div className="space-y-4">
      {type === "faculty" && (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Dr. John Doe" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="john@college.edu" />
            </div>
          </div>
          <div>
            <Label htmlFor="department">Department</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CSE">Computer Science Engineering</SelectItem>
                <SelectItem value="MDS">Master of Data Science</SelectItem>
                <SelectItem value="ECE">Electronics & Communication</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="subjects">Subject</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select subject" />
              </SelectTrigger>
              <SelectContent>
                {courseCatalog.map((subject) => (
                  <SelectItem key={subject} value={subject}>
                    {subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="maxHours">Maximum Hours per Week</Label>
            <Input id="maxHours" type="number" placeholder="20" />
          </div>
          <div>
            <Label htmlFor="facultyPreference">Faculty Preference</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select preference" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Morning">Morning</SelectItem>
                <SelectItem value="Evening">Evening</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="preferences">Additional Preferences</Label>
            <Textarea id="preferences" placeholder="Morning slots preferred, No Friday evening classes" />
          </div>
        </>
      )}

      {type === "students" && (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="studentName">Name</Label>
              <Input id="studentName" placeholder="John Smith" />
            </div>
            <div>
              <Label htmlFor="rollNumber">Roll Number</Label>
              <Input id="rollNumber" placeholder="CS21001" />
            </div>
          </div>
          <div>
            <Label htmlFor="studentDepartment">Department</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CSE">CSE</SelectItem>
                <SelectItem value="MDS">MDS</SelectItem>
                <SelectItem value="ECE">ECE</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="semester">Semester</Label>
              <Input id="semester" type="number" placeholder="3" />
            </div>
            <div>
              <Label htmlFor="totalStrength">Total Strength</Label>
              <Input id="totalStrength" type="number" placeholder="60" />
            </div>
          </div>
        </>
      )}

      {type === "electives" && (
        <>
          <div>
            <Label htmlFor="branch">Branch</Label>
            <Input id="branch" placeholder="Computer Science" />
          </div>
          <div>
            <Label htmlFor="parentDepartment">Parent Department</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select parent department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CSE">CSE</SelectItem>
                <SelectItem value="MDS">MDS</SelectItem>
                <SelectItem value="ECE">ECE</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="electiveSubject">Subject</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select subject" />
              </SelectTrigger>
              <SelectContent>
                {courseCatalog.map((subject) => (
                  <SelectItem key={subject} value={subject}>
                    {subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="electiveSemester">Semester</Label>
              <Input id="electiveSemester" type="number" placeholder="6" />
            </div>
            <div>
              <Label htmlFor="strength">Strength</Label>
              <Input id="strength" type="number" placeholder="25" />
            </div>
          </div>
        </>
      )}

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={onClose}>Add {type.charAt(0).toUpperCase() + type.slice(1)}</Button>
      </div>
    </div>
  )
}
