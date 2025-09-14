"use client"

import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calendar, Clock, BookOpen, MessageSquare, LogOut, Edit, Star, TrendingUp } from "lucide-react"

export function FacultyDashboard() {
  const { user, logout } = useAuth()

  const weeklySchedule = [
    { day: "Monday", classes: 3, hours: "9:00 AM - 4:00 PM" },
    { day: "Tuesday", classes: 2, hours: "10:00 AM - 2:00 PM" },
    { day: "Wednesday", classes: 4, hours: "9:00 AM - 5:00 PM" },
    { day: "Thursday", classes: 2, hours: "11:00 AM - 3:00 PM" },
    { day: "Friday", classes: 3, hours: "9:00 AM - 4:00 PM" },
  ]

  const workloadData = {
    totalHours: 18,
    maxHours: 24,
    subjects: user?.subjects?.length || 0,
    rating: 4.2,
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Faculty Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, {user?.name}</p>
              <p className="text-sm text-muted-foreground">{user?.department} Department</p>
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
                  <p className="text-sm font-medium text-muted-foreground">Weekly Hours</p>
                  <p className="text-3xl font-bold text-foreground">{workloadData.totalHours}</p>
                </div>
                <div className="p-3 bg-blue-500/10 rounded-xl">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-4">
                <Progress value={(workloadData.totalHours / workloadData.maxHours) * 100} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">
                  {workloadData.totalHours}/{workloadData.maxHours} hours
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Subjects</p>
                  <p className="text-3xl font-bold text-foreground">{workloadData.subjects}</p>
                </div>
                <div className="p-3 bg-green-500/10 rounded-xl">
                  <BookOpen className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Rating</p>
                  <div className="flex items-center gap-1">
                    <p className="text-3xl font-bold text-foreground">{workloadData.rating}</p>
                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  </div>
                </div>
                <div className="p-3 bg-yellow-500/10 rounded-xl">
                  <TrendingUp className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">This Week</p>
                  <p className="text-3xl font-bold text-foreground">14</p>
                  <p className="text-xs text-muted-foreground">Total Classes</p>
                </div>
                <div className="p-3 bg-purple-500/10 rounded-xl">
                  <Calendar className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Weekly Schedule */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Weekly Schedule
              </CardTitle>
              <CardDescription>Your personalized timetable for this week</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {weeklySchedule.map((day, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div>
                    <p className="font-medium">{day.day}</p>
                    <p className="text-sm text-muted-foreground">{day.hours}</p>
                  </div>
                  <Badge variant="outline">{day.classes} classes</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Subjects */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                My Subjects
              </CardTitle>
              <CardDescription>Courses you're currently teaching</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {user?.subjects?.map((subject, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-primary/5 rounded-lg">
                  <div>
                    <p className="font-medium">{subject}</p>
                    <p className="text-sm text-muted-foreground">
                      {Math.floor(Math.random() * 50) + 20} students enrolled
                    </p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              ))}
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
                  <p className="text-muted-foreground text-sm">Submit requests for schedule modifications</p>
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
                  <p className="text-muted-foreground text-sm">Share your thoughts on workload and scheduling</p>
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
