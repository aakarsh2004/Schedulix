"use client"

import { useAuth } from "@/components/auth-provider"
import { LoginForm } from "@/components/login-form"
import { AdminDashboard } from "@/components/admin-dashboard"
import { FacultyDashboard } from "@/components/faculty-dashboard"
import { StudentDashboard } from "@/components/student-dashboard"
import { Card, CardContent } from "@/components/ui/card"
import { GraduationCap, Brain, Calendar } from "lucide-react"

export default function HomePage() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }
  return <AdminDashboard/>
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-card to-secondary/20">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-primary/10 rounded-xl">
                <Brain className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-4xl font-bold text-foreground">AI Timetable Generator</h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
              Intelligent academic timetable management system for 4-year programs under NEP 2020
            </p>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="p-3 bg-primary/10 rounded-xl w-fit mx-auto mb-4">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Role-Based Access</h3>
                <p className="text-sm text-muted-foreground">
                  Separate dashboards for Admin, Faculty, and Students with tailored features
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="p-3 bg-accent/10 rounded-xl w-fit mx-auto mb-4">
                  <Brain className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-semibold mb-2">AI-Powered Scheduling</h3>
                <p className="text-sm text-muted-foreground">
                  Conflict-free timetable generation with intelligent resource allocation
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="p-3 bg-secondary/20 rounded-xl w-fit mx-auto mb-4">
                  <Calendar className="h-6 w-6 text-secondary-foreground" />
                </div>
                <h3 className="font-semibold mb-2">NEP 2020 Aligned</h3>
                <p className="text-sm text-muted-foreground">
                  Supports 4-year programs including FYUP, B.Ed., M.Ed., and ITEP
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Login Form */}
          <div className="max-w-md mx-auto">
            <LoginForm />
          </div>
        </div>
      </div>
    )
  }
  

  // Render appropriate dashboard based on user role
  switch (user?.role) {
    case "admin":
      return <AdminDashboard />
    case "faculty":
      return <FacultyDashboard />
    case "student":
      return <StudentDashboard />
    default:
      return <div>Invalid user role</div>
  }
}
