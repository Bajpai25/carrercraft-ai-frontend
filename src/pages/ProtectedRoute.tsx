// src/components/ProtectedRoute.tsx
import type { JSX } from "react"
import { Navigate } from "react-router-dom"

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const userId = localStorage.getItem("userId")

  if (!userId) {
    return <Navigate to="/auth" replace />
  }

  return children
}
