"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function AdminDashboard() {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    const handler = () => setActiveTab("ai-engine")
    window.addEventListener("navigate-to-ai-engine", handler)
    return () => window.removeEventListener("navigate-to-ai-engine", handler)
  }, [])

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
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        {/* Header */}
        <header className="border-b bg-card/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <TabsList className="hidden md:flex bg-transparent border rounded-lg p-1">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="data">Data Management</TabsTrigger>
                <TabsTrigger value="ai-engine">AI Engine</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="export">Export</TabsTrigger>
                <TabsTrigger value="feedback">Feedback</TabsTrigger>
              </TabsList>

              <div className="flex items-center">
                <DropdownMenu>
                  <DropdownMenuTrigger className="outline-none" aria-label="Open admin menu">
                    <Avatar className="h-8 w-8 ring-1 ring-border">
                      {/* You can plug an image here if available */}
                      <AvatarImage alt="Admin avatar" src="admin-avatar.png" />
                      <AvatarFallback className="text-xs">AD</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" sideOffset={8} className="w-56">
                    <DropdownMenuLabel className="text-xs text-muted-foreground">
                      Admin ID: {user?.id || "admin.demo"}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="cursor-pointer">
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          {/* Previously: <Tabs value={activeTab} onValueChange={setActiveTab}> */}
          {/* Previously: <TabsList className="grid w-full grid-cols-7"> ... </TabsList> */}

          <TabsContent value="overview" className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                        <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                      </div>
                      <div className={`p-3 rounded-xl ${stat.color}/10`}>
                        <stat.icon
                          className={`h-6 w-6 text-white`}
                          style={{ color: stat.color.replace("bg-", "").replace("-500", "") }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Quick Actions
                  </CardTitle>
                  <CardDescription>Manage your timetable system efficiently</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="w-full justify-start h-auto p-4 hover:bg-primary/5"
                      onClick={() => setActiveTab(action.tab)}
                    >
                      <action.icon className="h-5 w-5 mr-3 text-primary" />
                      <div className="text-left">
                        <p className="font-medium">{action.label}</p>
                        <p className="text-sm text-muted-foreground">{action.description}</p>
                      </div>
                    </Button>
                  ))}
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Recent Activity
                  </CardTitle>
                  <CardDescription>Latest system updates and changes</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-green-500/10 rounded-lg">
                      <Brain className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Timetable Generated</p>
                      <p className="text-xs text-muted-foreground">Computer Science - Semester 3</p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-500/10 rounded-lg">
                      <Users className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Faculty Added</p>
                      <p className="text-xs text-muted-foreground">Dr. Amit Singh - Mathematics</p>
                      <p className="text-xs text-muted-foreground">5 hours ago</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-orange-500/10 rounded-lg">
                      <MessageSquare className="h-4 w-4 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Feedback Received</p>
                      <p className="text-xs text-muted-foreground">3 new faculty feedback submissions</p>
                      <p className="text-xs text-muted-foreground">1 day ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* AI Engine Status */}
            <Card className="border-0 shadow-lg bg-gradient-to-r from-primary/5 to-accent/5">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-xl">
                      <Brain className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">AI Scheduling Engine</h3>
                      <p className="text-muted-foreground">Ready to generate conflict-free timetables</p>
                    </div>
                  </div>
                  <Button className="bg-primary hover:bg-primary/90" onClick={() => setActiveTab("ai-engine")}>
                    <Play className="h-4 w-4 mr-2" />
                    Run AI Engine
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="data">
            <DataManagement />
          </TabsContent>

          <TabsContent value="ai-engine">
            <AIEngine />
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsDashboard />
          </TabsContent>

          <TabsContent value="notifications">
            <NotificationSystem />
          </TabsContent>

          <TabsContent value="export">
            <ExportSystem />
          </TabsContent>

          <TabsContent value="feedback" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Feedback Management
                </CardTitle>
                <CardDescription>Collect and manage feedback from faculty and students</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground py-12">
                  Feedback system will be implemented in the next phase
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
