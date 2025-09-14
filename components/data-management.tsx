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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Edit, Trash2, Users, BookOpen, MapPin, Clock } from "lucide-react"

interface Faculty {
  id: string
  name: string
  email: string
  department: string
  subjects: string[]
  maxHours: number
  preferences: string[]
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
}

export function DataManagement() {
  const [activeTab, setActiveTab] = useState("faculty")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  // Sample data
  const [faculty, setFaculty] = useState<Faculty[]>([
    {
      id: "1",
      name: "Dr. Rajesh Kumar",
      email: "rajesh@college.edu",
      department: "Computer Science",
      subjects: ["Data Structures", "Algorithms"],
      maxHours: 20,
      preferences: ["Morning slots", "No Friday evening"],
    },
    {
      id: "2",
      name: "Prof. Priya Sharma",
      email: "priya@college.edu",
      department: "Mathematics",
      subjects: ["Calculus", "Linear Algebra"],
      maxHours: 18,
      preferences: ["Afternoon preferred"],
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

  const timeSlots: TimeSlot[] = [
    { id: "1", day: "Monday", startTime: "09:00", endTime: "10:00", duration: 60 },
    { id: "2", day: "Monday", startTime: "10:00", endTime: "11:00", duration: 60 },
    { id: "3", day: "Monday", startTime: "11:00", endTime: "12:00", duration: 60 },
    { id: "4", day: "Monday", startTime: "14:00", endTime: "16:00", duration: 120 },
    { id: "5", day: "Tuesday", startTime: "09:00", endTime: "10:00", duration: 60 },
    { id: "6", day: "Tuesday", startTime: "10:00", endTime: "11:00", duration: 60 },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Data Management</h2>
          <p className="text-muted-foreground">Manage curriculum, faculty, students, and resources</p>
        </div>
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
            <AddItemForm type={activeTab} onClose={() => setIsAddDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="faculty" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Faculty
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
        </TabsList>

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
              <CardTitle>Time Slot Configuration</CardTitle>
              <CardDescription>Configure available time slots for scheduling</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {timeSlots.map((slot) => (
                  <Card key={slot.id} className="border-2">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline">{slot.day}</Badge>
                        <span className="text-sm text-muted-foreground">{slot.duration} min</span>
                      </div>
                      <p className="font-medium">
                        {slot.startTime} - {slot.endTime}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function AddItemForm({ type, onClose }: { type: string; onClose: () => void }) {
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
                <SelectItem value="cs">Computer Science</SelectItem>
                <SelectItem value="math">Mathematics</SelectItem>
                <SelectItem value="physics">Physics</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="subjects">Subjects (comma separated)</Label>
            <Input id="subjects" placeholder="Data Structures, Algorithms" />
          </div>
          <div>
            <Label htmlFor="maxHours">Maximum Hours per Week</Label>
            <Input id="maxHours" type="number" placeholder="20" />
          </div>
          <div>
            <Label htmlFor="preferences">Preferences</Label>
            <Textarea id="preferences" placeholder="Morning slots preferred, No Friday evening classes" />
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
