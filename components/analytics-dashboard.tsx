"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart,
} from "recharts"
import { BarChart3, TrendingUp, Users, Clock, MapPin, Download, RefreshCw } from "lucide-react"

interface WorkloadData {
  faculty: string
  department: string
  totalHours: number
  maxHours: number
  utilization: number
  subjects: number
}

interface RoomUtilization {
  room: string
  type: string
  capacity: number
  hoursUsed: number
  maxHours: number
  utilization: number
}

interface TimeSlotAnalysis {
  timeSlot: string
  utilization: number
  conflicts: number
  efficiency: number
}

export function AnalyticsDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("current-semester")
  const [selectedDepartment, setSelectedDepartment] = useState("all")

  // Sample data for faculty workload
  const facultyWorkload: WorkloadData[] = [
    {
      faculty: "Dr. Rajesh Kumar",
      department: "Computer Science",
      totalHours: 18,
      maxHours: 20,
      utilization: 90,
      subjects: 3,
    },
    {
      faculty: "Prof. Priya Sharma",
      department: "Mathematics",
      totalHours: 16,
      maxHours: 18,
      utilization: 89,
      subjects: 2,
    },
    {
      faculty: "Dr. Amit Singh",
      department: "Physics",
      totalHours: 14,
      maxHours: 20,
      utilization: 70,
      subjects: 2,
    },
    {
      faculty: "Prof. Neha Patel",
      department: "Computer Science",
      totalHours: 20,
      maxHours: 20,
      utilization: 100,
      subjects: 4,
    },
    {
      faculty: "Dr. Suresh Gupta",
      department: "Mathematics",
      totalHours: 12,
      maxHours: 18,
      utilization: 67,
      subjects: 2,
    },
  ]

  // Sample data for room utilization
  const roomUtilization: RoomUtilization[] = [
    { room: "CS-101", type: "Classroom", capacity: 60, hoursUsed: 35, maxHours: 40, utilization: 87.5 },
    { room: "CS-Lab-1", type: "Lab", capacity: 30, hoursUsed: 38, maxHours: 40, utilization: 95 },
    { room: "MATH-101", type: "Classroom", capacity: 50, hoursUsed: 32, maxHours: 40, utilization: 80 },
    { room: "PHY-Lab", type: "Lab", capacity: 25, hoursUsed: 28, maxHours: 40, utilization: 70 },
    { room: "Auditorium", type: "Auditorium", capacity: 200, hoursUsed: 15, maxHours: 40, utilization: 37.5 },
  ]

  // Sample data for time slot analysis
  const timeSlotData: TimeSlotAnalysis[] = [
    { timeSlot: "09:00-10:00", utilization: 95, conflicts: 0, efficiency: 95 },
    { timeSlot: "10:00-11:00", utilization: 92, conflicts: 1, efficiency: 88 },
    { timeSlot: "11:00-12:00", utilization: 88, conflicts: 0, efficiency: 88 },
    { timeSlot: "14:00-15:00", utilization: 85, conflicts: 2, efficiency: 78 },
    { timeSlot: "15:00-16:00", utilization: 82, conflicts: 1, efficiency: 80 },
    { timeSlot: "16:00-17:00", utilization: 65, conflicts: 0, efficiency: 65 },
  ]

  // Department distribution data
  const departmentData = [
    { name: "Computer Science", value: 35, color: "#3b82f6" },
    { name: "Mathematics", value: 25, color: "#10b981" },
    { name: "Physics", value: 20, color: "#f59e0b" },
    { name: "Chemistry", value: 15, color: "#ef4444" },
    { name: "Others", value: 5, color: "#8b5cf6" },
  ]

  // Weekly trend data
  const weeklyTrend = [
    { week: "Week 1", efficiency: 85, conflicts: 12, satisfaction: 78 },
    { week: "Week 2", efficiency: 88, conflicts: 8, satisfaction: 82 },
    { week: "Week 3", efficiency: 92, conflicts: 5, satisfaction: 85 },
    { week: "Week 4", efficiency: 94, conflicts: 3, satisfaction: 88 },
    { week: "Week 5", efficiency: 91, conflicts: 6, satisfaction: 86 },
  ]

  const overallMetrics = {
    totalFaculty: 45,
    totalStudents: 1250,
    totalRooms: 32,
    averageUtilization: 84,
    conflictRate: 2.1,
    satisfactionScore: 4.2,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-primary" />
            Analytics & Reports
          </h2>
          <p className="text-muted-foreground">Comprehensive analytics and performance metrics</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="cs">Computer Science</SelectItem>
              <SelectItem value="math">Mathematics</SelectItem>
              <SelectItem value="physics">Physics</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current-semester">Current Semester</SelectItem>
              <SelectItem value="last-semester">Last Semester</SelectItem>
              <SelectItem value="academic-year">Academic Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Faculty</p>
                <p className="text-xl font-bold">{overallMetrics.totalFaculty}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Students</p>
                <p className="text-xl font-bold">{overallMetrics.totalStudents.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-purple-600" />
              <div>
                <p className="text-sm text-muted-foreground">Rooms</p>
                <p className="text-xl font-bold">{overallMetrics.totalRooms}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-orange-600" />
              <div>
                <p className="text-sm text-muted-foreground">Utilization</p>
                <p className="text-xl font-bold">{overallMetrics.averageUtilization}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-red-600" />
              <div>
                <p className="text-sm text-muted-foreground">Conflicts</p>
                <p className="text-xl font-bold">{overallMetrics.conflictRate}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-yellow-600" />
              <div>
                <p className="text-sm text-muted-foreground">Satisfaction</p>
                <p className="text-xl font-bold">{overallMetrics.satisfactionScore}/5</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="workload" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="workload">Faculty Workload</TabsTrigger>
          <TabsTrigger value="rooms">Room Utilization</TabsTrigger>
          <TabsTrigger value="timeslots">Time Analysis</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="heatmap">Heatmap</TabsTrigger>
        </TabsList>

        {/* Faculty Workload Analysis */}
        <TabsContent value="workload" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Faculty Workload Distribution</CardTitle>
                <CardDescription>Hours allocated vs maximum capacity</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={facultyWorkload}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="faculty" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="totalHours" fill="#3b82f6" name="Assigned Hours" />
                    <Bar dataKey="maxHours" fill="#e5e7eb" name="Max Hours" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Workload Details</CardTitle>
                <CardDescription>Individual faculty utilization rates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {facultyWorkload.map((faculty, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{faculty.faculty}</p>
                        <p className="text-sm text-muted-foreground">{faculty.department}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          {faculty.totalHours}h / {faculty.maxHours}h
                        </p>
                        <Badge
                          variant={
                            faculty.utilization > 90
                              ? "destructive"
                              : faculty.utilization > 75
                                ? "default"
                                : "secondary"
                          }
                        >
                          {faculty.utilization}%
                        </Badge>
                      </div>
                    </div>
                    <Progress value={faculty.utilization} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Room Utilization */}
        <TabsContent value="rooms" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Room Utilization Chart</CardTitle>
                <CardDescription>Usage hours vs available capacity</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={roomUtilization}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="room" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="hoursUsed" fill="#10b981" name="Hours Used" />
                    <Bar dataKey="maxHours" fill="#e5e7eb" name="Max Hours" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Room Efficiency</CardTitle>
                <CardDescription>Utilization rates by room type</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {roomUtilization.map((room, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{room.room}</p>
                        <p className="text-sm text-muted-foreground">
                          {room.type} • {room.capacity} capacity
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          {room.hoursUsed}h / {room.maxHours}h
                        </p>
                        <Badge
                          variant={
                            room.utilization > 90 ? "destructive" : room.utilization > 75 ? "default" : "secondary"
                          }
                        >
                          {room.utilization}%
                        </Badge>
                      </div>
                    </div>
                    <Progress value={room.utilization} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Time Slot Analysis */}
        <TabsContent value="timeslots" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Time Slot Efficiency</CardTitle>
                <CardDescription>Utilization and conflicts by time period</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={timeSlotData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="timeSlot" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="utilization" stackId="1" stroke="#3b82f6" fill="#3b82f6" />
                    <Area type="monotone" dataKey="efficiency" stackId="2" stroke="#10b981" fill="#10b981" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Department Distribution</CardTitle>
                <CardDescription>Course allocation by department</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={departmentData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {departmentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Trends */}
        <TabsContent value="trends" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Performance Trends</CardTitle>
              <CardDescription>Weekly efficiency, conflicts, and satisfaction trends</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={weeklyTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="efficiency" stroke="#3b82f6" strokeWidth={2} name="Efficiency %" />
                  <Line type="monotone" dataKey="satisfaction" stroke="#10b981" strokeWidth={2} name="Satisfaction %" />
                  <Line type="monotone" dataKey="conflicts" stroke="#ef4444" strokeWidth={2} name="Conflicts" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Heatmap */}
        <TabsContent value="heatmap" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Weekly Schedule Heatmap</CardTitle>
              <CardDescription>Visual representation of room and time slot utilization</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-8 gap-2 text-sm">
                  <div className="font-medium">Room/Time</div>
                  <div className="text-center font-medium">9-10</div>
                  <div className="text-center font-medium">10-11</div>
                  <div className="text-center font-medium">11-12</div>
                  <div className="text-center font-medium">2-3</div>
                  <div className="text-center font-medium">3-4</div>
                  <div className="text-center font-medium">4-5</div>
                  <div className="text-center font-medium">5-6</div>
                </div>

                {["CS-101", "CS-102", "CS-Lab-1", "MATH-101", "PHY-101"].map((room, roomIndex) => (
                  <div key={roomIndex} className="grid grid-cols-8 gap-2">
                    <div className="font-medium text-sm">{room}</div>
                    {[95, 88, 75, 92, 85, 60, 45].map((utilization, timeIndex) => (
                      <div
                        key={timeIndex}
                        className={`h-8 rounded flex items-center justify-center text-xs font-medium ${
                          utilization > 90
                            ? "bg-red-500 text-white"
                            : utilization > 75
                              ? "bg-orange-400 text-white"
                              : utilization > 50
                                ? "bg-yellow-400 text-black"
                                : "bg-green-400 text-black"
                        }`}
                      >
                        {utilization}%
                      </div>
                    ))}
                  </div>
                ))}

                <div className="flex items-center gap-4 mt-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-400 rounded"></div>
                    <span>Low (&#x3C;&#x3D;50%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-yellow-400 rounded"></div>
                    <span>Medium (51-75%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-orange-400 rounded"></div>
                    <span>High (76-90%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-500 rounded"></div>
                    <span>Critical (&#x3E;90%)</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
