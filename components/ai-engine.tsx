"use client"

import { useEffect } from "react"
import { useState } from "react"
import { CheckCircle, AlertCircle, Download, FileDown, Share2, GridIcon, ListIcon, Wand2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"

export function AIEngine() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState<GenerationResult | null>(null)
  const [currentStep, setCurrentStep] = useState("")
  const [selectedBranch, setSelectedBranch] = useState<string>("")
  const [showBranchSelection, setShowBranchSelection] = useState(false)
  const [universityTimetable, setUniversityTimetable] = useState<UniversityMasterTimetable | null>(null)
  const [showPreValidation, setShowPreValidation] = useState(false)
  const [validationErrors, setValidationErrors] = useState<string[]>([])
  const [hasValidationErrors, setHasValidationErrors] = useState(false)
  const [openSetup, setOpenSetup] = useState(false)
  const [selectedSemester, setSelectedSemester] = useState<string>("Sem 3")
  const [prevalidationActive, setPrevalidationActive] = useState(false)
  const [steps, setSteps] = useState<Array<{ name: string; status: "pending" | "running" | "done" | "issues" }>>([
    { name: "Conflict Graph Generation", status: "pending" },
    { name: "Faculty Load Matrix", status: "pending" },
    { name: "Room-to-Student Ratio Check", status: "pending" },
    { name: "Build Slot Grid", status: "pending" },
  ])
  const [overallProgress, setOverallProgress] = useState(0)
  const [conflicts, setConflicts] = useState<ConflictItem[]>([])
  const [selectedForBatch, setSelectedForBatch] = useState<Record<number, boolean>>({})
  const [applyingFix, setApplyingFix] = useState(false)
  const [generatedReady, setGeneratedReady] = useState(false)
  const [changesApplied, setChangesApplied] = useState(0)

  const branches = ["Branch A", "Branch B", "Branch C"] // Mock branches data
  const semesterOptions = ["Sem 1", "Sem 2", "Sem 3", "Sem 4"]
  const sampleConflicts: ConflictItem[] = [
    {
      id: 1,
      issue: "Teacher Double-Booked",
      severity: "High",
      entities: "Dr. Priya Sharma • Machine Learning & Data Analytics • Slot T2 (Mon 10:00–11:00)",
      proposed: "Reassign Machine Learning to Slot T9 (Thu 14:00–15:00)",
      detail:
        "Dr. Priya Sharma is assigned to Machine Learning and Data Analytics at Slot T2 (Mon 10:00–11:00) in two rooms.",
    },
    {
      id: 2,
      issue: "Room Overbooked",
      severity: "High",
      entities: "Room R101 • CSE-A & ECE-B • Slot T4 (Tue 13:00–14:00)",
      proposed: "Move CSE-A to R201 (capacity 80) at same slot",
      detail: "R101 has CSE-A and ECE-B at T4; capacity 40, combined students 72.",
    },
    {
      id: 3,
      issue: "Insufficient Capacity",
      severity: "Medium",
      entities: "Room R304 • EE-III (48 students)",
      proposed: "Split group or move to R210 (cap 60)",
      detail: "R304 capacity 30 assigned to EE-III (48 students).",
    },
    {
      id: 4,
      issue: "Faculty Max Hours Exceeded",
      severity: "Medium",
      entities: "Prof. Amit Singh • 26h/week > 18h/week",
      proposed: "Shift low-priority slots to adjacent faculty; reduce to ≤18h",
      detail: "Assigned 26h/week; max is 18h/week.",
    },
    {
      id: 5,
      issue: "Student Elective Clash",
      severity: "Low",
      entities: "Group G2 • Elective X & Elective Y • Slot T7",
      proposed: "Reschedule Elective Y to T11",
      detail: "Electives overlap at T7 for Group G2.",
    },
    {
      id: 6,
      issue: "Back-to-Back Impossible Transition",
      severity: "Low",
      entities: "Dr. Rajesh Kumar • consecutive slots • buildings 800m apart",
      proposed: "Move one slot to next adjacent timeslot",
      detail: "Two consecutive slots far apart with no transition time.",
    },
  ]

  const performPreValidation = () => {
    const errors: string[] = []

    // Mock validation checks
    const mockErrors = [
      "Faculty 'Dr. Smith' has overlapping time preferences",
      "Room 'Lab-101' capacity insufficient for Course 'Database Lab' (50 students)",
      "Missing faculty assignment for Course 'Advanced Algorithms'",
    ]

    // Simulate random validation results
    const hasErrors = Math.random() > 0.7 // 30% chance of errors

    if (hasErrors) {
      setValidationErrors(mockErrors.slice(0, Math.floor(Math.random() * 3) + 1))
      setHasValidationErrors(true)
    } else {
      setValidationErrors([])
      setHasValidationErrors(false)
    }

    setShowPreValidation(true)
  }

  const generateTimetable = async () => {
    // First perform pre-validation
    performPreValidation()

    // Wait for pre-validation to complete
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (hasValidationErrors) {
      return // Stop if there are validation errors
    }

    if (!selectedBranch) {
      setShowBranchSelection(true)
      return
    }

    setIsGenerating(true)
    setProgress(0)
    setResult(null)
    setShowBranchSelection(false)
    setShowPreValidation(false)

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

  const handleTriggerAI = () => {
    // prompt for branch if not selected, then proceed
    if (!selectedBranch) {
      setShowBranchSelection(true)
    } else {
      generateTimetable()
    }
  }

  const runPrevalidation = async () => {
    setPrevalidationActive(true)
    setOverallProgress(0)
    setGeneratedReady(false)
    setConflicts([])
    setSteps((prev) => prev.map((s) => ({ ...s, status: "pending" })))

    for (let i = 0; i < steps.length; i++) {
      setSteps((prev) => prev.map((s, idx) => (idx === i ? { ...s, status: "running" } : s)))
      // 900–1400ms per step
      const delay = 900 + Math.floor(Math.random() * 500)
      await new Promise((r) => setTimeout(r, delay))

      // For demo: mark first two as done, third as issues, last as done
      let status: "done" | "issues" = "done"
      if (i === 2) status = "issues"
      setSteps((prev) => prev.map((s, idx) => (idx === i ? { ...s, status } : s)))
      setOverallProgress(Math.round(((i + 1) / steps.length) * 100))
    }

    // If any step had issues, show conflicts
    const hadIssues = steps.some((s, idx) => (idx === 2 ? true : false))
    if (hadIssues) {
      // show example conflicts
      setConflicts(sampleConflicts)
    }
  }

  const autocorrectSelected = async () => {
    const ids = Object.entries(selectedForBatch)
      .filter(([, v]) => v)
      .map(([k]) => Number(k))
    if (ids.length === 0) return
    setApplyingFix(true)
    await new Promise((r) => setTimeout(r, 700)) // 600–900ms
    setConflicts((prev) => prev.filter((c) => !ids.includes(c.id)))
    setChangesApplied((n) => n + ids.length)
    setSelectedForBatch({})
    setApplyingFix(false)
  }

  const autocorrectOne = async (id: number) => {
    setApplyingFix(true)
    await new Promise((r) => setTimeout(r, 700))
    setConflicts((prev) => prev.filter((c) => c.id !== id))
    setChangesApplied((n) => n + 1)
    setApplyingFix(false)
  }

  const finalizeAfterFixes = async () => {
    // re-run prevalidation (faster 600–900ms)
    setPrevalidationActive(true)
    setOverallProgress(0)
    setSteps((prev) => prev.map((s) => ({ ...s, status: "pending" })))

    for (let i = 0; i < steps.length; i++) {
      setSteps((prev) => prev.map((s, idx) => (idx === i ? { ...s, status: "running" } : s)))
      const delay = 600 + Math.floor(Math.random() * 300)
      await new Promise((r) => setTimeout(r, delay))
      setSteps((prev) => prev.map((s, idx) => (idx === i ? { ...s, status: "done" } : s)))
      setOverallProgress(Math.round(((i + 1) / steps.length) * 100))
    }

    setPrevalidationActive(false)
    setGeneratedReady(true)
  }

  const onCTAClick = () => {
    setOpenSetup(true)
  }

  const startPrevalidation = async () => {
    setOpenSetup(false)
    await runPrevalidation()
  }

  useEffect(() => {
    const handler = () => {
      handleTriggerAI()
    }
    window.addEventListener("trigger-ai-generation", handler as EventListener)
    return () => window.removeEventListener("trigger-ai-generation", handler as EventListener)
  }, [selectedBranch])

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <Card
          className="w-full max-w-xl border-0 shadow-lg transition-transform duration-150 hover:scale-[1.02] hover:shadow-xl outline outline-1 outline-transparent hover:outline-primary/20"
          role="button"
          tabIndex={0}
          onClick={onCTAClick}
          onKeyDown={(e) => e.key === "Enter" && onCTAClick()}
          aria-label="Generate AI Timetable"
        >
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <Wand2 className="h-5 w-5 text-primary" />
              Generate AI Timetable
            </CardTitle>
            <CardDescription>AI-assisted timetable generation</CardDescription>
          </CardHeader>
        </Card>
      </div>

      <Dialog open={openSetup} onOpenChange={setOpenSetup}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Select Branch</DialogTitle>
            <DialogDescription>Choose inputs to start prevalidation</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Select Branch</label>
                <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select Branch" />
                  </SelectTrigger>
                  <SelectContent>
                    {branches.map((b) => (
                      <SelectItem key={b} value={b}>
                        {b}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Select Semester</label>
                <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select Semester" />
                  </SelectTrigger>
                  <SelectContent>
                    {semesterOptions.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setOpenSetup(false)}>
              Cancel
            </Button>
            <Button onClick={startPrevalidation}>Start Prevalidation</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {prevalidationActive && (
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">Prevalidation</CardTitle>
            <CardDescription>Running checks on input constraints</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Progress value={overallProgress} className="h-2" />
            <div className="space-y-2">
              {steps.map((step, i) => (
                <div key={step.name} className="flex items-center justify-between rounded-md border p-3">
                  <div className="flex items-center gap-2">
                    {step.status === "running" && (
                      <div
                        className="h-4 w-4 border-2 border-primary border-b-transparent rounded-full animate-spin"
                        aria-label="In progress"
                      />
                    )}
                    {step.status === "done" && <CheckCircle className="h-4 w-4 text-green-600" aria-hidden />}
                    {step.status === "issues" && <AlertCircle className="h-4 w-4 text-red-600" aria-hidden />}
                    <span className="text-sm font-medium">{step.name}</span>
                  </div>
                  <Badge variant={step.status === "issues" ? "destructive" : "secondary"}>
                    {step.status === "pending"
                      ? "Pending"
                      : step.status === "running"
                        ? "In progress"
                        : step.status === "issues"
                          ? "Issues found"
                          : "Done"}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {conflicts.length > 0 && (
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Conflict Report</CardTitle>
            <CardDescription>Review issues and autocorrect them</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Badge variant="destructive">Issues detected</Badge>
                <span className="text-sm text-muted-foreground">
                  Select rows and use Autocorrect All, or fix individually.
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  disabled={applyingFix}
                  onClick={() => setSelectedForBatch(Object.fromEntries(conflicts.map((c) => [c.id, true])))}
                >
                  Select All
                </Button>
                <Button onClick={autocorrectSelected} disabled={applyingFix}>
                  {applyingFix ? "Applying fix..." : "Autocorrect All"}
                </Button>
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-10"></TableHead>
                    <TableHead>Issue</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Affected Entities</TableHead>
                    <TableHead>Proposed Fix</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {conflicts.map((c) => (
                    <TableRow key={c.id}>
                      <TableCell className="w-10">
                        <Checkbox
                          checked={!!selectedForBatch[c.id]}
                          onCheckedChange={(v) => setSelectedForBatch((prev) => ({ ...prev, [c.id]: !!v }))}
                          aria-label={`Select conflict ${c.id}`}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{c.issue}</div>
                        <div className="text-xs text-muted-foreground">{c.detail}</div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            c.severity === "High" ? "destructive" : c.severity === "Medium" ? "secondary" : "outline"
                          }
                        >
                          {c.severity}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">{c.entities}</TableCell>
                      <TableCell className="text-sm">{c.proposed}</TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="ghost" onClick={() => autocorrectOne(c.id)}>
                          Autocorrect
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setConflicts([])}>
                Reject
              </Button>
              <Button
                onClick={async () => {
                  // If any remaining selected, fix them first; then finalize
                  if (Object.values(selectedForBatch).some(Boolean)) {
                    await autocorrectSelected()
                  }
                  // ensure all resolved
                  setConflicts([])
                  await finalizeAfterFixes()
                }}
              >
                Accept Fix
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {generatedReady && (
        <Card className="border-0 shadow-lg animate-in fade-in slide-in-from-top-2 duration-200">
          <CardHeader>
            <CardTitle>Generated Timetable</CardTitle>
            <CardDescription>
              Checks passed: 4/4 • Conflicts corrected: {changesApplied} • Changes applied: {changesApplied}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Tabs defaultValue="grid">
                <TabsList>
                  <TabsTrigger value="grid" className="flex items-center gap-2">
                    <GridIcon className="h-4 w-4" /> Grid view
                  </TabsTrigger>
                  <TabsTrigger value="list" className="flex items-center gap-2">
                    <ListIcon className="h-4 w-4" /> Compact list
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="grid" className="pt-4">
                  <TimetableReferenceGrid />
                </TabsContent>
                <TabsContent value="list" className="pt-4">
                  <div className="space-y-2">
                    <div className="rounded-md border p-3 text-sm">Mon 09:00 • R101 • ML</div>
                    <div className="rounded-md border p-3 text-sm">Tue 10:00 • R201 • DB</div>
                    <div className="rounded-md border p-3 text-sm">Wed 11:00 • Lab-101 • Lab</div>
                  </div>
                </TabsContent>
              </Tabs>
              <div className="flex items-center gap-2">
                <Button variant="outline">
                  <FileDown className="h-4 w-4 mr-2" />
                  Download CSV
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
                <Button variant="outline">
                  <Share2 className="h-4 w-4 mr-2" />
                  Export to ERP
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2">
              <Button variant="outline">Request Manual Edit</Button>
              <Button
                variant="outline"
                onClick={() => {
                  // re-run entire flow with same inputs
                  setGeneratedReady(false)
                  setChangesApplied(0)
                  runPrevalidation()
                }}
              >
                Regenerate
              </Button>
              <Button>Accept Timetable</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

type GenerationResult = {
  success: boolean
  conflicts: number
  efficiency: number
  facultyUtilization: number
  roomUtilization: number
  warnings: string[]
  timetable: any[]
}

type UniversityMasterTimetable = {
  // Mock timetable structure
}

type ConflictItem = {
  id: number
  issue: string
  severity: "High" | "Medium" | "Low"
  entities: string
  proposed: string
  detail: string
}

// Mock function to generate university timetable
function generateUniversityTimetable(): UniversityMasterTimetable {
  return {
    // Mock timetable data
  }
}

// Dedicated component that renders the reference-style timetable grid
function TimetableReferenceGrid() {
  return (
    <div className="space-y-3">
      {/* Header strip above the table to mirror the reference */}
      <div className="flex items-start justify-between text-[11px] md:text-xs text-foreground">
        <div className="font-medium">Session: July 2025 to November 2025</div>
        <div className="font-semibold text-center flex-1">TIME TABLE (MDS-II, V, VII Semesters)</div>
        <div className="font-medium">w.e.f. Date: 16th July 2025</div>
      </div>

      <div className="overflow-x-auto rounded-md border border-border bg-card">
        <table className="w-full min-w-[1200px] table-fixed border-collapse text-[11px] md:text-xs">
          <colgroup>
            <col className="w-[90px]" /> {/* Day/Time */}
            <col className="w-[56px]" /> {/* Sem */}
            <col /> {/* I */}
            <col /> {/* II */}
            <col /> {/* III */}
            <col /> {/* IV */}
            <col className="w-[70px]" /> {/* LUNCH */}
            <col /> {/* VI */}
            <col /> {/* VII */}
            <col /> {/* VIII */}
          </colgroup>

          <thead>
            <tr className="bg-muted/60">
              <th className="border border-border p-2 text-left">Day/ Time</th>
              <th className="border border-border p-2 text-center">Sem</th>
              <th className="border border-border p-2 text-center">I</th>
              <th className="border border-border p-2 text-center">II</th>
              <th className="border border-border p-2 text-center">III</th>
              <th className="border border-border p-2 text-center">IV</th>
              <th className="border border-border p-0 text-center align-middle">
                <div className="h-full w-full flex items-center justify-center">
                  <span className="-rotate-90 block tracking-wider text-[10px]">LUNCH</span>
                </div>
              </th>
              <th className="border border-border p-2 text-center">VI</th>
              <th className="border border-border p-2 text-center">VII</th>
              <th className="border border-border p-2 text-center">VIII</th>
            </tr>
            <tr className="bg-muted/40">
              <th className="border border-border p-2 text-left"> </th>
              <th className="border border-border p-2 text-center"> </th>
              <th className="border border-border p-2 text-center">9:00 AM</th>
              <th className="border border-border p-2 text-center">10:00 AM</th>
              <th className="border border-border p-2 text-center">11:00 AM</th>
              <th className="border border-border p-2 text-center">12:00 Noon</th>
              <th className="border border-border p-2 text-center">1:00–2:00 PM</th>
              <th className="border border-border p-2 text-center">2:30 PM</th>
              <th className="border border-border p-2 text-center">3:30 PM</th>
              <th className="border border-border p-2 text-center">4:30 PM</th>
            </tr>
          </thead>

          <tbody>
            {/* MONDAY */}
            <tr>
              <td rowSpan={3} className="border border-border p-2 align-top font-medium">
                MON
              </td>
              <td className="border border-border p-2 text-center">II</td>
              <td className="border border-border p-2 bg-secondary/10">HUM-24251PY</td>
              <td className="border border-border p-2 bg-secondary/10">MDS-24287 SHP/RRR</td>
              <td className="border border-border p-2 bg-secondary/10">MDS-24212 MJ</td>
              <td className="border border-border p-2 bg-secondary/10">MDS-24213 JK</td>
              <td className="border border-border p-2 bg-muted/40 text-center" rowSpan={3}></td>
              <td className="border border-border p-2 bg-secondary/10" colSpan={2}>
                MDS-24215 SD
              </td>
              <td className="border border-border p-2 bg-secondary/10">MDS-24215 PU+NRS Lab</td>
            </tr>
            <tr>
              <td className="border border-border p-2 text-center">V</td>
              <td className="border border-border p-2 bg-accent/10">MDS-315 DD+RB Lab</td>
              <td className="border border-border p-2 bg-accent/10">MDS-413 DM</td>
              <td className="border border-border p-2 bg-accent/10">MDS-411 KSY</td>
              <td className="border border-border p-2 bg-accent/10">HUM-451 MD</td>
              <td className="border border-border p-2 bg-accent/10">—</td>
              <td className="border border-border p-2 bg-accent/10" colSpan={2}>
                Project Based Lab–2
              </td>
            </tr>
            <tr>
              <td className="border border-border p-2 text-center">VII</td>
              <td className="border border-border p-2 bg-primary/10">HUM-24251 PY</td>
              <td className="border border-border p-2 bg-primary/10">MDS-24287 SHP/RRR</td>
              <td className="border border-border p-2 bg-primary/10">MDS-24212 MJ</td>
              <td className="border border-border p-2 bg-primary/10">MDS-24213 JK</td>
              <td className="border border-border p-2 bg-primary/10">—</td>
              <td className="border border-border p-2 bg-primary/10">MDS-24215 SD</td>
              <td className="border border-border p-2 bg-primary/10">—</td>
            </tr>

            {/* TUESDAY */}
            <tr>
              <td rowSpan={3} className="border border-border p-2 align-top font-medium">
                TUE
              </td>
              <td className="border border-border p-2 text-center">II</td>
              <td className="border border-border p-2 bg-secondary/10">MDS-313 DD</td>
              <td className="border border-border p-2 bg-secondary/10">MDS-314 JK</td>
              <td className="border border-border p-2 bg-secondary/10">MDS-2411 MS</td>
              <td className="border border-border p-2 bg-secondary/10">ME-351</td>
              <td className="border border-border p-2 bg-secondary/10">MDS-24214 JKJ</td>
              <td className="border border-border p-2 bg-secondary/10">MDS-24215 SD</td>
              <td className="border border-border p-2 bg-secondary/10">MDS-359 AAA</td>
            </tr>
            <tr>
              <td className="border border-border p-2 text-center">V</td>
              <td className="border border-border p-2 bg-accent/10">MDS-457 PK</td>
              <td className="border border-border p-2 bg-accent/10">MDS-413 DM</td>
              <td className="border border-border p-2 bg-accent/10">MDS-411 KSY</td>
              <td className="border border-border p-2 bg-accent/10">HUM-451 MD</td>
              <td className="border border-border p-2 bg-accent/10">—</td>
              <td className="border border-border p-2 bg-accent/10" colSpan={2}>
                Project Based Lab–2
              </td>
            </tr>
            <tr>
              <td className="border border-border p-2 text-center">VII</td>
              <td className="border border-border p-2 bg-primary/10">MDS-24251 PY</td>
              <td className="border border-border p-2 bg-primary/10">MDS-24287 SHP/RRR</td>
              <td className="border border-border p-2 bg-primary/10">MDS-24212 MJ</td>
              <td className="border border-border p-2 bg-primary/10">MDS-24213 JK</td>
              <td className="border border-border p-2 bg-primary/10" colSpan={2}>
                MDS-311 CKV
              </td>
              <td className="border border-border p-2 bg-primary/10">—</td>
            </tr>

            {/* WEDNESDAY */}
            <tr>
              <td rowSpan={3} className="border border-border p-2 align-top font-medium">
                WED
              </td>
              <td className="border border-border p-2 text-center">II</td>
              <td className="border border-border p-2 bg-secondary/10">MDS-24213 JK</td>
              <td className="border border-border p-2 bg-secondary/10">MDS-24211 MS</td>
              <td className="border border-border p-2 bg-secondary/10">ME-351</td>
              <td className="border border-border p-2 bg-secondary/10">MDS-412 SDA</td>
              <td className="border border-border p-2 bg-secondary/10" colSpan={3}>
                —
              </td>
            </tr>
            <tr>
              <td className="border border-border p-2 text-center">V</td>
              <td className="border border-border p-2 bg-accent/10">MDS-316 AAA + SK Lab</td>
              <td className="border border-border p-2 bg-accent/10">MDS-413 DM</td>
              <td className="border border-border p-2 bg-accent/10">—</td>
              <td className="border border-border p-2 bg-accent/10">ME-351</td>
              <td className="border border-border p-2 bg-accent/10">HUM-24251 PY</td>
              <td className="border border-border p-2 bg-accent/10">MDS-24215 SD</td>
              <td className="border border-border p-2 bg-accent/10">—</td>
            </tr>
            <tr>
              <td className="border border-border p-2 text-center">VII</td>
              <td className="border border-border p-2 bg-primary/10">MDS-24213 JK</td>
              <td className="border border-border p-2 bg-primary/10">MDS-24211 MS</td>
              <td className="border border-border p-2 bg-primary/10">—</td>
              <td className="border border-border p-2 bg-primary/10">ME-351</td>
              <td className="border border-border p-2 bg-primary/10">MDS-314 JK</td>
              <td className="border border-border p-2 bg-primary/10">MDS-457 PK</td>
              <td className="border border-border p-2 bg-primary/10">—</td>
            </tr>

            {/* THURSDAY */}
            <tr>
              <td rowSpan={3} className="border border-border p-2 align-top font-medium">
                THU
              </td>
              <td className="border border-border p-2 text-center">II</td>
              <td className="border border-border p-2 bg-secondary/10">Open Elective-1C</td>
              <td className="border border-border p-2 bg-secondary/10">MDS-24216 SP+SMY Lab</td>
              <td className="border border-border p-2 bg-secondary/10">—</td>
              <td className="border border-border p-2 bg-secondary/10">MDS-412 SDA</td>
              <td className="border border-border p-2 bg-secondary/10" colSpan={3}>
                —
              </td>
            </tr>
            <tr>
              <td className="border border-border p-2 text-center">V</td>
              <td className="border border-border p-2 bg-accent/10">Open Elective-1C</td>
              <td className="border border-border p-2 bg-accent/10">MDS-412 SDA</td>
              <td className="border border-border p-2 bg-accent/10">HUM-451 MD</td>
              <td className="border border-border p-2 bg-accent/10">—</td>
              <td className="border border-border p-2 bg-accent/10" colSpan={2}>
                Project Based Lab–2
              </td>
              <td className="border border-border p-2 bg-accent/10">—</td>
            </tr>
            <tr>
              <td className="border border-border p-2 text-center">VII</td>
              <td className="border border-border p-2 bg-primary/10">MDS-24213 JKJ</td>
              <td className="border border-border p-2 bg-primary/10">MDS-24211 MS</td>
              <td className="border border-border p-2 bg-primary/10">—</td>
              <td className="border border-border p-2 bg-primary/10">MDS-312 CKV</td>
              <td className="border border-border p-2 bg-primary/10">MDS-24213 JKJ</td>
              <td className="border border-border p-2 bg-primary/10">—</td>
              <td className="border border-border p-2 bg-primary/10">—</td>
            </tr>

            {/* FRIDAY */}
            <tr>
              <td rowSpan={3} className="border border-border p-2 align-top font-medium">
                FRI
              </td>
              <td className="border border-border p-2 text-center">II</td>
              <td className="border border-border p-2 bg-secondary/10">Open Elective-1C</td>
              <td className="border border-border p-2 bg-secondary/10">MDS-24216 SP+NG Lab</td>
              <td className="border border-border p-2 bg-secondary/10">—</td>
              <td className="border border-border p-2 bg-secondary/10">—</td>
              <td className="border border-border p-2 bg-secondary/10" colSpan={2}>
                MDS-311 CKV (T)
              </td>
              <td className="border border-border p-2 bg-secondary/10">MDS-315 DD+RRS Lab</td>
            </tr>
            <tr>
              <td className="border border-border p-2 text-center">V</td>
              <td className="border border-border p-2 bg-accent/10">MDS-314 JK</td>
              <td className="border border-border p-2 bg-accent/10">MDS-359 AAA</td>
              <td className="border border-border p-2 bg-accent/10">—</td>
              <td className="border border-border p-2 bg-accent/10">—</td>
              <td className="border border-border p-2 bg-accent/10" colSpan={3}>
                —
              </td>
            </tr>
            <tr>
              <td className="border border-border p-2 text-center">VII</td>
              <td className="border border-border p-2 bg-primary/10" colSpan={2}>
                MDS-414 DD+ SMY
              </td>
              <td className="border border-border p-2 bg-primary/10">—</td>
              <td className="border border-border p-2 bg-primary/10">—</td>
              <td className="border border-border p-2 bg-primary/10" colSpan={3}>
                —
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 text-[11px] md:text-xs text-muted-foreground">
        <div className="inline-flex items-center gap-2">
          <span className="inline-block h-3 w-4 rounded-sm bg-secondary/30 ring-1 ring-border" /> Sem II
        </div>
        <div className="inline-flex items-center gap-2">
          <span className="inline-block h-3 w-4 rounded-sm bg-accent/30 ring-1 ring-border" /> Sem V
        </div>
        <div className="inline-flex items-center gap-2">
          <span className="inline-block h-3 w-4 rounded-sm bg-primary/20 ring-1 ring-border" /> Sem VII
        </div>
        <div className="ml-auto text-[10px]">Reference layout reproduced to match provided image.</div>
      </div>
    </div>
  )
}
