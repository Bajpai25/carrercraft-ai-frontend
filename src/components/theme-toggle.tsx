"use client"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "./theme-provider"
import { Button } from "../components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  console.log("🔘 ThemeToggle: Component rendered with theme:", theme)

  const toggleTheme = () => {
    console.log("🖱️ ThemeToggle: Toggle button clicked, current theme:", theme)

    let newTheme: "light" | "dark"

    if (theme === "light") {
      newTheme = "dark"
      console.log("☀️ → 🌙 ThemeToggle: Switching from light to dark")
    } else if (theme === "dark") {
      newTheme = "light"
      console.log("🌙 → ☀️ ThemeToggle: Switching from dark to light")
    } else {
      // If system, toggle to the opposite of current system preference
      const isDarkSystem = window.matchMedia("(prefers-color-scheme: dark)").matches
      newTheme = isDarkSystem ? "light" : "dark"
      console.log(
        "🖥️ ThemeToggle: System theme detected as:",
        isDarkSystem ? "dark" : "light",
        "switching to:",
        newTheme,
      )
    }

    console.log("🔄 ThemeToggle: Calling setTheme with:", newTheme)
    setTheme(newTheme)
  }

  const getCurrentTheme = () => {
    let currentTheme: string

    if (theme === "system") {
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      currentTheme = systemPrefersDark ? "dark" : "light"
      console.log("🖥️ ThemeToggle: Resolved system theme to:", currentTheme)
    } else {
      currentTheme = theme
      console.log("👤 ThemeToggle: Using explicit theme:", currentTheme)
    }

    return currentTheme
  }

  const currentTheme = getCurrentTheme()
  const isDark = currentTheme === "dark"

  console.log("🎨 ThemeToggle: Current effective theme:", currentTheme, "isDark:", isDark)

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="w-9 h-9 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
    >
      {isDark ? <Sun className="h-4 w-4 transition-all" /> : <Moon className="h-4 w-4 transition-all" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
