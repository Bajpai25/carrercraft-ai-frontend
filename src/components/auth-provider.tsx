"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { GraphQLClient, gql } from "graphql-request"

const client = new GraphQLClient("http://localhost:8000/graphql") // your GraphQL endpoint

type User = {
  id: string
  firstName: string
  lastName: string
  email: string
  avatar?: string
  plan: "free" | "pro" | "enterprise"
}

type AuthContextType = {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (firstName: string, lastName:string, email: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const LOGIN_USER = gql`
  mutation LoginUser($input: LoginUserInput!) {
    loginUser(input: $input) {
      id
      email
      password
      firstName
      lastName
    }
  }
`

const login = async (email: string, password: string) => {
  setIsLoading(true)

  try {
    const data = await client.request(LOGIN_USER, {
      input: { email, password },
    }) as { loginUser: { id: string; firstName: string; lastName: string; email: string} }

    const backendUser = data.loginUser
    console.log("Backend user data:", backendUser)

    const mockUser: User = {
      id: backendUser.id,
      firstName: `${backendUser.firstName}`,
      lastName: `${backendUser.lastName}`,
      email: backendUser.email,
      avatar: "/placeholder.svg?height=40&width=40",
      plan: "pro", // assume default or fetch from backend if stored
    }

    setUser(mockUser)
    localStorage.setItem("user", JSON.stringify(mockUser))
    localStorage.setItem("userId", mockUser.id) // Store user ID for future reference
  } catch (err) {
    console.error("Login failed:", err)
    alert("Invalid credentials")
  } finally {
    setIsLoading(false)
  }
}

const REGISTER_USER = gql`
  mutation Register($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      firstName
      lastName
      email
    }
  }
`

const register = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string
) =>
  
  {setIsLoading(true)

  try {
    const data = await client.request(REGISTER_USER, {
      input: { firstName, lastName, email, password },
    })as { createUser: { id: string; firstName: string; lastName: string; email: string } }

    const backendUser = data.createUser

    const mockUser: User = {
      id: backendUser.id,
      firstName: `${backendUser.firstName}`,
      lastName: `${backendUser.lastName}`,
      email: `${backendUser.email}`,
      avatar: "/placeholder.svg?height=40&width=40",
      plan: "free", // Or assign based on your logic
    }

    setUser(mockUser)
    localStorage.setItem("user", JSON.stringify(mockUser))
    localStorage.setItem("userId", mockUser.id) // Store user ID for future reference
  } catch (err) {
    console.error("Registration failed:", err)
    alert("Could not register user")
  } finally {
    setIsLoading(false)
  }
}
  

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    localStorage.removeItem("userId")
    localStorage.removeItem("jobId")
    localStorage.removeItem("resumeId")
  }

  return <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>{children}</AuthContext.Provider>
}

export  function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
