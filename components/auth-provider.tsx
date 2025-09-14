"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type UserRole = "admin" | "faculty" | "student"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  department?: string
  year?: number // For students
  subjects?: string[] // For faculty
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string, role: UserRole) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem("timetable_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    setIsLoading(true)

    // Mock authentication - in real app, this would call an API
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Demo users for testing
    const demoUsers: Record<string, User> = {
      "admin@college.edu": {
        id: "1",
        name: "Dr. Admin Kumar",
        email: "admin@college.edu",
        role: "admin",
        department: "Administration",
      },
      "faculty@college.edu": {
        id: "2",
        name: "Prof. Rajesh Sharma",
        email: "faculty@college.edu",
        role: "faculty",
        department: "Computer Science",
        subjects: ["Data Structures", "Algorithms", "Database Systems"],
      },
      "student@college.edu": {
        id: "3",
        name: "Priya Patel",
        email: "student@college.edu",
        role: "student",
        department: "Computer Science",
        year: 2,
      },
    }

    const foundUser = demoUsers[email]
    if (foundUser && foundUser.role === role && password === "demo123") {
      setUser(foundUser)
      localStorage.setItem("timetable_user", JSON.stringify(foundUser))
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("timetable_user")
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
