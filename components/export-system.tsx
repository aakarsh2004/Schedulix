"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Download,
  FileText,
  Table,
  Calendar,
  Users,
  BarChart3,
  Mail,
  MessageSquare,
  CheckCircle,
  Settings,
} from "lucide-react"

interface ExportOptions {
  format: "pdf" | "excel" | "csv"
  content: string[]
  dateRange: string
  departments: string[]
  includeAnalytics: boolean
}

export function ExportSystem() {
  const [exportOptions, setExportOptions] = useState<ExportOptions>({
    format: "pdf",
    content: ["timetable"],
    dateRange: "current-semester",
    departments: ["all"],
    includeAnalytics: false,
  })

  const [isExporting, setIsExporting] = useState(false)
  const [exportProgress, setExportProgress] = useState(0)
  const [exportComplete, setExportComplete] = useState(false)
  const [shareMethod, setShareMethod] = useState<"email" | "whatsapp" | "download">("download")

  const contentOptions = [
    { id: "timetable", label: "Master Timetable", icon: Calendar },
    { id: "faculty-schedule", label: "Faculty Schedules", icon: Users },
    { id: "student-schedule", label: "Student Schedules", icon: Users },
    { id: "room-allocation", label: "Room Allocation", icon: BarChart3 },
    { id: "analytics", label: "Analytics Report", icon: BarChart3 },
    { id: "workload", label: "Faculty Workload", icon: Users },
  ]

  const formatOptions = [
    { value: "pdf", label: "PDF Document", icon: FileText, description: "Professional formatted document" },
    { value: "excel", label: "Excel Spreadsheet", icon: Table, description: "Editable spreadsheet format" },
    { value: "csv", label: "CSV File", icon: Table, description: "Comma-separated values" },
  ]

  const handleExport = async () => {
    setIsExporting(true)
    setExportProgress(0)
    setExportComplete(false)

    // Simulate export process
    const steps = [
      "Preparing data...",
      "Generating timetable...",
      "Formatting document...",
      "Adding analytics...",
      "Finalizing export...",
    ]

    for (let i = 0; i < steps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setExportProgress(((i + 1) / steps.length) * 100)
    }

    setIsExporting(false)
    setExportComplete(true)

    // Reset after 3 seconds
    setTimeout(() => {
      setExportComplete(false)
    }, 3000)
  }

  const handleShare = (method: "email" | "whatsapp" | "download") => {
    setShareMethod(method)
    // In a real app, this would trigger the appropriate sharing mechanism
    console.log(`Sharing via ${method}`)
  }

  const recentExports = [
    {
      id: "1",
      name: "Computer Science Timetable - Semester 3",
      format: "PDF",
      date: "2 hours ago",
      size: "2.4 MB",
      status: "completed",
    },
    {
      id: "2",
      name: "Faculty Workload Report - All Departments",
      format: "Excel",
      date: "1 day ago",
      size: "1.8 MB",
      status: "completed",
    },
    {
      id: "3",
      name: "Room Utilization Analytics",
      format: "PDF",
      date: "2 days ago",
      size: "3.1 MB",
      status: "completed",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Download className="h-6 w-6 text-primary" />
            Export & Share
          </h2>
          <p className="text-muted-foreground">Export timetables and reports in multiple formats</p>
        </div>
        <Button variant="outline" size="sm">
          <Settings className="h-4 w-4 mr-2" />
          Export Settings
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Export Configuration */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Export Configuration</CardTitle>
            <CardDescription>Configure your export settings and preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Format Selection */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Export Format</Label>
              <div className="grid grid-cols-1 gap-3">
                {formatOptions.map((format) => (
                  <div
                    key={format.value}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      exportOptions.format === format.value
                        ? "border-primary bg-primary/5"
                        : "border-border hover:bg-muted/50"
                    }`}
                    onClick={() => setExportOptions((prev) => ({ ...prev, format: format.value as any }))}
                  >
                    <div className="flex items-center gap-3">
                      <format.icon className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">{format.label}</p>
                        <p className="text-sm text-muted-foreground">{format.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Content Selection */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Content to Export</Label>
              <div className="space-y-2">
                {contentOptions.map((content) => (
                  <div key={content.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={content.id}
                      checked={exportOptions.content.includes(content.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setExportOptions((prev) => ({
                            ...prev,
                            content: [...prev.content, content.id],
                          }))
                        } else {
                          setExportOptions((prev) => ({
                            ...prev,
                            content: prev.content.filter((c) => c !== content.id),
                          }))
                        }
                      }}
                    />
                    <Label htmlFor={content.id} className="flex items-center gap-2 cursor-pointer">
                      <content.icon className="h-4 w-4" />
                      {content.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Date Range */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Date Range</Label>
              <Select
                value={exportOptions.dateRange}
                onValueChange={(value) => setExportOptions((prev) => ({ ...prev, dateRange: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current-semester">Current Semester</SelectItem>
                  <SelectItem value="next-semester">Next Semester</SelectItem>
                  <SelectItem value="academic-year">Full Academic Year</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Department Filter */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Departments</Label>
              <Select
                value={exportOptions.departments[0]}
                onValueChange={(value) => setExportOptions((prev) => ({ ...prev, departments: [value] }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="cs">Computer Science</SelectItem>
                  <SelectItem value="math">Mathematics</SelectItem>
                  <SelectItem value="physics">Physics</SelectItem>
                  <SelectItem value="chemistry">Chemistry</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Export Button */}
            <div className="pt-4">
              {isExporting ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Exporting...</span>
                    <span className="text-sm">{Math.round(exportProgress)}%</span>
                  </div>
                  <Progress value={exportProgress} className="h-2" />
                </div>
              ) : exportComplete ? (
                <Alert className="border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    Export completed successfully! Your file is ready for download.
                  </AlertDescription>
                </Alert>
              ) : (
                <Button onClick={handleExport} className="w-full" size="lg">
                  <Download className="h-4 w-4 mr-2" />
                  Export {exportOptions.format.toUpperCase()}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Sharing Options */}
        <div className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Multi-Channel Delivery</CardTitle>
              <CardDescription>Share timetables instantly via multiple channels</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-3">
                <Button
                  variant={shareMethod === "email" ? "default" : "outline"}
                  className="justify-start h-auto p-4"
                  onClick={() => handleShare("email")}
                >
                  <Mail className="h-5 w-5 mr-3" />
                  <div className="text-left">
                    <p className="font-medium">Email Distribution</p>
                    <p className="text-sm text-muted-foreground">Send to faculty and students</p>
                  </div>
                </Button>

                <Button
                  variant={shareMethod === "whatsapp" ? "default" : "outline"}
                  className="justify-start h-auto p-4"
                  onClick={() => handleShare("whatsapp")}
                >
                  <MessageSquare className="h-5 w-5 mr-3" />
                  <div className="text-left">
                    <p className="font-medium">WhatsApp Sharing</p>
                    <p className="text-sm text-muted-foreground">Instant messaging delivery</p>
                  </div>
                </Button>

                <Button
                  variant={shareMethod === "download" ? "default" : "outline"}
                  className="justify-start h-auto p-4"
                  onClick={() => handleShare("download")}
                >
                  <Download className="h-5 w-5 mr-3" />
                  <div className="text-left">
                    <p className="font-medium">Web Dashboard</p>
                    <p className="text-sm text-muted-foreground">Access via online portal</p>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Exports */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Recent Exports</CardTitle>
              <CardDescription>Your recently generated exports</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentExports.map((export_) => (
                <div key={export_.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <FileText className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{export_.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {export_.format} • {export_.size} • {export_.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {export_.status}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
