"use client"
import { useTheme } from "./theme-provider"
import { useEffect, useState } from "react"

export function DebugPanel() {
  const { theme } = useTheme()
  const [systemTheme, setSystemTheme] = useState<string>("")
  const [htmlClasses, setHtmlClasses] = useState<string[]>([])
  const [localStorageTheme, setLocalStorageTheme] = useState<string>("")

  useEffect(() => {
    // Get system theme
    const updateSystemTheme = () => {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      setSystemTheme(isDark ? "dark" : "light")
    }

    updateSystemTheme()
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    mediaQuery.addEventListener("change", updateSystemTheme)

    // Get HTML classes
    const updateHtmlClasses = () => {
      const classes = Array.from(document.documentElement.classList)
      setHtmlClasses(classes.filter((cls) => cls === "light" || cls === "dark"))
    }

    updateHtmlClasses()
    const observer = new MutationObserver(updateHtmlClasses)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })

    // Get localStorage theme
    const updateLocalStorageTheme = () => {
      const stored = localStorage.getItem("ui-theme") || "none"
      setLocalStorageTheme(stored)
    }

    updateLocalStorageTheme()
    window.addEventListener("storage", updateLocalStorageTheme)

    return () => {
      mediaQuery.removeEventListener("change", updateSystemTheme)
      observer.disconnect()
      window.removeEventListener("storage", updateLocalStorageTheme)
    }
  }, [])

  const effectiveTheme = theme === "system" ? systemTheme : theme

  return (
    <div className="p-4 bg-muted rounded-lg border-2 border-dashed border-border">
      <h3 className="text-lg font-semibold mb-3 text-foreground">🐛 Debug Panel</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <div>
          <strong className="text-primary">Theme State:</strong>
          <div className="font-mono bg-background p-2 rounded mt-1">{theme}</div>
        </div>
        <div>
          <strong className="text-primary">System Theme:</strong>
          <div className="font-mono bg-background p-2 rounded mt-1">{systemTheme}</div>
        </div>
        <div>
          <strong className="text-primary">Effective Theme:</strong>
          <div className="font-mono bg-background p-2 rounded mt-1">{effectiveTheme}</div>
        </div>
        <div>
          <strong className="text-primary">HTML Classes:</strong>
          <div className="font-mono bg-background p-2 rounded mt-1">
            {htmlClasses.length > 0 ? htmlClasses.join(", ") : "none"}
          </div>
        </div>
        <div className="md:col-span-2">
          <strong className="text-primary">LocalStorage:</strong>
          <div className="font-mono bg-background p-2 rounded mt-1">{localStorageTheme}</div>
        </div>
        <div className="md:col-span-2">
          <strong className="text-primary">CSS Variables:</strong>
          <div className="font-mono bg-background p-2 rounded mt-1 text-xs">
            bg: hsl(var(--background)) | fg: hsl(var(--foreground))
          </div>
        </div>
      </div>
      <div className="mt-3 text-xs text-muted-foreground">
        💡 Open browser console (F12) to see detailed theme change logs
      </div>
    </div>
  )
}
