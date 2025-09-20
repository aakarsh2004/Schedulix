"use client"

import { useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  BookOpen,
  MapPin,
  Calendar,
  Brain,
  BarChart3,
  MessageSquare,
  LogOut,
  Settings,
  Upload,
  Play,
} from "lucide-react"
import { DataManagement } from "@/components/data-management"
import { AIEngine } from "@/components/ai-engine"
import { AnalyticsDashboard } from "@/components/analytics-dashboard"
import { NotificationSystem } from "@/components/notification-system"
import { ExportSystem } from "@/components/export-system"

export function AdminDashboard() {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")

  const stats = [
    { label: "Total Faculty", value: "45", icon: Users, color: "bg-blue-500" },
    { label: "Total Students", value: "1,250", icon: Users, color: "bg-green-500" },
    { label: "Active Courses", value: "180", icon: BookOpen, color: "bg-purple-500" },
    { label: "Rooms Available", value: "32", icon: MapPin, color: "bg-orange-500" },
  ]

  const quickActions = [
    { label: "Upload Curriculum", icon: Upload, description: "Add new course structure", tab: "data" },
    { label: "Manage Faculty", icon: Users, description: "Update faculty information", tab: "data" },
    { label: "Generate Timetable", icon: Brain, description: "Run AI scheduling engine", tab: "ai-engine" },
    { label: "View Analytics", icon: BarChart3, description: "Workload & performance metrics", tab: "analytics" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, {user?.name}</p>
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

      {/* Main layout: sidebar + content */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 border-r bg-card/50 min-h-screen p-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} orientation="vertical">
            <TabsList className="flex flex-col w-full gap-2">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="data">Data Management</TabsTrigger>
              <TabsTrigger value="ai-engine">AI Engine</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="export">Export</TabsTrigger>
              <TabsTrigger value="feedback">Feedback</TabsTrigger>
            </TabsList>
          </Tabs>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsContent value="overview">{/* your overview content */}</TabsContent>
            <TabsContent value="data"><DataManagement /></TabsContent>
            <TabsContent value="ai-engine"><AIEngine /></TabsContent>
            <TabsContent value="analytics"><AnalyticsDashboard /></TabsContent>
            <TabsContent value="notifications"><NotificationSystem /></TabsContent>
            <TabsContent value="export"><ExportSystem /></TabsContent>
            <TabsContent value="feedback">{/* feedback card */}</TabsContent>
          </Tabs>
        </main>
      </div>
    </div>

  )
}
