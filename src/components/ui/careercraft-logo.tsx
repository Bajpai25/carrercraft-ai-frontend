"use client"
import { cn } from "../../lib/utils"

interface CareerCraftLogoProps {
  className?: string
  size?: "sm" | "md" | "lg" | "xl"
  variant?: "full" | "icon" | "text"
  animated?: boolean
}

export function CareerCraftLogo({
  className,
  size = "md",
  variant = "full",
  animated = false,
}: CareerCraftLogoProps) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-16 h-16",
    xl: "w-24 h-24",
  }

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-2xl",
    xl: "text-4xl",
  }

  const LogoIcon = () => (
    <div
      className={cn(
        "relative flex items-center justify-center rounded-[20%] bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 shadow-lg overflow-hidden",
        sizeClasses[size],
        animated && "transition-all duration-300 hover:scale-110 hover:shadow-xl hover:rotate-1",
      )}
    >
      <svg
        viewBox="0 0 64 64"
        fill="none"
        className="w-full h-full p-2"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Document */}
        <rect x="10" y="10" width="28" height="36" rx="2" fill="white" />
        <path d="M38 10V22H50L38 10Z" fill="white" fillOpacity="0.8" />

        {/* Resume lines */}
        <rect x="14" y="16" width="18" height="2" rx="1" fill="#333" />
        <rect x="14" y="20" width="22" height="2" rx="1" fill="#666" />
        <rect x="14" y="24" width="20" height="2" rx="1" fill="#666" />
        <rect x="14" y="28" width="22" height="2" rx="1" fill="#666" />

        {/* AI Network */}
        <circle cx="44" cy="44" r="3" fill="#FFD700" />
        <circle cx="50" cy="38" r="2" fill="#FFD700" />
        <circle cx="48" cy="50" r="2" fill="#FFD700" />
        <path
          d="M44 44 L50 38 M44 44 L48 50 M50 38 L48 50"
          stroke="#FFD700"
          strokeWidth="1"
        />

        {/* Growth Arrow */}
        <path
          d="M52 24V18 M52 18L49 21 M52 18L55 21"
          stroke="#00FF88"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Enhancement Sparkles */}
        {animated && (
          <>
            <circle cx="18" cy="12" r="0.8" fill="#FFD700" className="animate-pulse" />
            <circle cx="40" cy="32" r="0.6" fill="#00FF88" className="animate-pulse" />
          </>
        )}
      </svg>
    </div>
  )

  const LogoText = () => (
    <div className="flex flex-col">
      <h1
        className={cn(
          "font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent leading-tight",
          textSizeClasses[size],
        )}
      >
        CareerCraft
      </h1>
      <p
        className={cn(
          "text-gray-500 dark:text-gray-400 font-medium",
          size === "sm" ? "text-xs" : size === "md" ? "text-sm" : size === "lg" ? "text-base" : "text-lg",
        )}
      >
        AI Assistant
      </p>
    </div>
  )

  if (variant === "icon") return <LogoIcon />
  if (variant === "text") return <LogoText />

  return (
    <div className={cn("flex items-center space-x-3", className)}>
      <LogoIcon />
      <LogoText />
    </div>
  )
}
