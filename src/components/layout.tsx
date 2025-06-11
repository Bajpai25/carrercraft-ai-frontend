"use client"

import type React from "react"
import { cn } from "../lib/utils"
import { Zap, FileText, Mail, Home, User, LogOut, Settings, LayoutDashboard, Crown } from "lucide-react"
// import { ThemeToggle } from "./theme-toggle"
import { Link, useLocation } from "react-router-dom"
import { useAuth } from "./auth-provider"
import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "./ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { CareerCraftLogo } from "./ui/careercraft-logo"

interface LayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function Layout({ children, className, ...props }: LayoutProps) {
  const location = useLocation()
  const { user, logout } = useAuth()

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/cover-letters", label: "Cover Letters", icon: FileText },
    { path: "/email-templates", label: "Email Templates", icon: Mail },
  ]

  const getUserInitials = (name?: string) => {
  if (!name) return "U" // fallback initial like "U" for Unknown
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}


  const getPlanBadgeColor = (plan: string) => {
    switch (plan) {
      case "pro":
        return "from-purple-500 to-pink-500"
      case "enterprise":
        return "from-yellow-500 to-orange-500"
      default:
        return "from-gray-500 to-gray-600"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950/30 ">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] dark:bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)]"></div>

      {/* Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 dark:from-blue-500/10 dark:to-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 dark:from-purple-500/10 dark:to-pink-500/10 rounded-full blur-3xl"></div>

      <div className="relative z-10">
        {/* Modern Header */}
        <header className="sticky top-0 z-50 w-full border-b border-white/20 dark:border-gray-800/20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
          <div className="container mx-auto flex h-16 items-center justify-between px-4">
            <div className="flex items-center space-x-8">
              {/* Logo */}
              <Link to="/" className="transition-transform duration-200 hover:scale-105">
                <CareerCraftLogo size="md" animated />
              </Link>

              {/* Navigation */}
              <nav className="hidden md:flex items-center space-x-1">
                {navItems.map((item) => {
                  const Icon = item.icon
                  const isActive = location.pathname === item.path
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={cn(
                        "flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                        isActive
                          ? "bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20"
                          : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/50 dark:hover:bg-gray-800/50",
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </Link>
                  )
                })}
              </nav>
            </div>

            {/* Header Actions */}
            <div className="flex items-center space-x-4">
              {/* AI Status */}
              <div className="hidden lg:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-green-700 dark:text-green-400">CareerCraft Online</span>
              </div>

              {/* Theme Toggle */}
              {/* <ThemeToggle /> */}

              {/* User Menu or Auth Button */}
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative flex items-center space-x-3 px-3 py-2 rounded-xl hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all duration-200 hover:scale-105"
                    >
                      <div className="relative">
                        <Avatar className="w-9 h-9 ring-2 ring-white/20 dark:ring-gray-800/20">
                          <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.firstName} />
                          <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold text-sm">
                            {getUserInitials(user?.firstName)}
                          </AvatarFallback>
                        </Avatar>
                        {/* Plan Badge */}
                        {user?.plan !== "free" && (
                          <div
                            className={`absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gradient-to-r ${getPlanBadgeColor(user?.plan)} flex items-center justify-center shadow-lg`}
                          >
                            <Crown className="w-2.5 h-2.5 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="hidden sm:block text-left">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.firstName} {user?.lastName}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{user?.plan} Plan</p>
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-64 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-white/20 dark:border-gray-800/20 shadow-2xl"
                  >
                    <DropdownMenuLabel className="px-4 py-3">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.firstName} />
                          <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold">
                            {getUserInitials(user?.firstName)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 dark:text-white">{user?.firstName} {user?.lastName}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</p>
                          <div className="flex items-center space-x-1 mt-1">
                            <div
                              className={`px-2 py-0.5 rounded-full bg-gradient-to-r ${getPlanBadgeColor(user?.plan)} text-white text-xs font-medium flex items-center space-x-1`}
                            >
                              {user?.plan !== "free" && <Crown className="w-3 h-3" />}
                              <span className="capitalize">{user?.plan}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard" className="flex items-center px-4 py-2 cursor-pointer text-gray-600 dark:text-gray-300">
                        <LayoutDashboard className="w-4 h-4 mr-3 text-blue-500" />
                        <div className="text-gray-600 dark:text-gray-300">
                          <p className="font-medium">Dashboard</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Manage your documents</p>
                        </div>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center px-4 py-2 cursor-pointer">
                      <User className="w-4 h-4 mr-3 text-green-500" />
                      <div className="text-gray-600 dark:text-gray-300"> 
                        <p className="font-medium">Profile Settings</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Update your information</p>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center px-4 py-2 cursor-pointer">
                      <Settings className="w-4 h-4 mr-3 text-purple-500" />
                      <div className="text-gray-600 dark:text-gray-300">
                        <p className="font-medium">Preferences</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Customize your experience</p>
                      </div>
                    </DropdownMenuItem>
                    {user?.plan === "free" && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="flex items-center px-4 py-2 cursor-pointer">
                          <div className="w-4 h-4 mr-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                            <Crown className="w-2.5 h-2.5 text-white" />
                          </div>
                          <div>
                            <p className="font-medium text-purple-600 dark:text-purple-400">Upgrade to Pro</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Unlock premium features</p>
                          </div>
                        </DropdownMenuItem>
                      </>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={logout}
                      className="flex items-center px-4 py-2 cursor-pointer text-red-600 dark:text-red-400 focus:text-red-600 dark:focus:text-red-400"
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      <div>
                        <p className="font-medium">Sign Out</p>
                        <p className="text-xs opacity-75">See you next time!</p>
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link to="/auth">
                    <Button
                      variant="ghost"
                      className="text-sm font-medium hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all duration-200"
                    >
                      <User className="w-4 h-4 mr-2" />
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/auth">
                    <Button className="bg-gradient-to-r text-white from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
                      <Zap className="w-4 h-4 mr-2" />
                      Get Started
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden border-t border-white/20 dark:border-gray-800/20">
            <nav className="flex items-center justify-around py-2">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.path
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "flex flex-col items-center space-y-1 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200",
                      isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-300",
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
              {user && (
                <Link
                  to="/dashboard"
                  className={cn(
                    "flex flex-col items-center space-y-1 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200",
                    location.pathname === "/dashboard"
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-600 dark:text-gray-300",
                  )}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Dashboard</span>
                </Link>
              )}
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <div className={cn("mx-auto max-w-7xl", className)} {...props}>
            {children}
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-white/20 dark:border-gray-800/20 bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl mt-20">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center text-sm text-gray-500 dark:text-gray-400">
              <p>© 2025 CareerCraft AI. Empowering careers with artificial intelligence.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
