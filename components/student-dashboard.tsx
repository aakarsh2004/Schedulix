"use client"

import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calendar, BookOpen, Clock, MessageSquare, LogOut, Edit, GraduationCap, TrendingUp } from "lucide-react"

export function StudentDashboard() {
  const { user, logout } = useAuth()

  const todaySchedule = [
    { time: "9:00 AM", subject: "Data Structures", room: "CS-101", type: "Lecture" },
    { time: "11:00 AM", subject: "Database Systems", room: "CS-102", type: "Lab" },
    { time: "2:00 PM", subject: "Algorithms", room: "CS-103", type: "Tutorial" },
    { time: "4:00 PM", subject: "Software Engineering", room: "CS-104", type: "Lecture" },
  ]

  const weeklyStats = {
    totalClasses: 24,
    attendedClasses: 22,
    upcomingAssignments: 3,
    gpa: 8.5,
  }

  const attendancePercentage = (weeklyStats.attendedClasses / weeklyStats.totalClasses) * 100

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Student Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, {user?.name}</p>
              <p className="text-sm text-muted-foreground">
                {user?.department} - Year {user?.year}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="px-3 py-1">
                {user?.role.toUpperCase()}
              </Badge>
              <Button variant="outline" size="sm" onClick={logout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Attendance</p>
                  <p className="text-3xl font-bold text-foreground">{attendancePercentage.toFixed(0)}%</p>
                </div>
                <div className="p-3 bg-green-500/10 rounded-xl">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div className="mt-4">
                <Progress value={attendancePercentage} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">
                  {weeklyStats.attendedClasses}/{weeklyStats.totalClasses} classes
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Current GPA</p>
                  <p className="text-3xl font-bold text-foreground">{weeklyStats.gpa}</p>
                </div>
                <div className="p-3 bg-blue-500/10 rounded-xl">
                  <GraduationCap className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Today's Classes</p>
                  <p className="text-3xl font-bold text-foreground">{todaySchedule.length}</p>
                </div>
                <div className="p-3 bg-purple-500/10 rounded-xl">
                  <Calendar className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Assignments</p>
                  <p className="text-3xl font-bold text-foreground">{weeklyStats.upcomingAssignments}</p>
                  <p className="text-xs text-muted-foreground">Due this week</p>
                </div>
                <div className="p-3 bg-orange-500/10 rounded-xl">
                  <BookOpen className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Today's Schedule */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Today's Schedule
              </CardTitle>
              <CardDescription>Your classes for today</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {todaySchedule.map((class_, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="text-center">
                      <p className="text-sm font-medium">{class_.time}</p>
                    </div>
                    <div>
                      <p className="font-medium">{class_.subject}</p>
                      <p className="text-sm text-muted-foreground">{class_.room}</p>
                    </div>
                  </div>
                  <Badge variant={class_.type === "Lab" ? "default" : "outline"}>{class_.type}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Upcoming Assignments */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Upcoming Assignments
              </CardTitle>
              <CardDescription>Assignments due this week</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
                <div>
                  <p className="font-medium">Database Design Project</p>
                  <p className="text-sm text-muted-foreground">Database Systems</p>
                </div>
                <Badge variant="destructive">Due Tomorrow</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div>
                  <p className="font-medium">Algorithm Analysis Report</p>
                  <p className="text-sm text-muted-foreground">Algorithms</p>
                </div>
                <Badge variant="outline">Due Friday</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div>
                  <p className="font-medium">Software Requirements Document</p>
                  <p className="text-sm text-muted-foreground">Software Engineering</p>
                </div>
                <Badge variant="outline">Due Next Week</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-0 shadow-lg bg-gradient-to-r from-primary/5 to-accent/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Request Changes</h3>
                  <p className="text-muted-foreground text-sm">Submit requests for timetable modifications</p>
                </div>
                <Button>
                  <Edit className="h-4 w-4 mr-2" />
                  Request
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-r from-secondary/10 to-muted/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Give Feedback</h3>
                  <p className="text-muted-foreground text-sm">Share feedback on your timetable experience</p>
                </div>
                <Button variant="outline">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Feedback
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
