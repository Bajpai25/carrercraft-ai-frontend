import type React from "react"
import { useState } from "react"
import { cn } from "../lib/utils"
import {
  Zap,
  FileText,
  Mail,
  Home,
  User,
  LogOut,
  Settings,
  LayoutDashboard,
  Crown,
  ChartNoAxesCombined
} from "lucide-react"
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
import { AnimatePresence, motion } from "framer-motion"

interface LayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function Layout({ children, className, ...props }: LayoutProps) {
  const location = useLocation()
  const { user, logout } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/cover-letters", label: "Cover Letters", icon: FileText },
    { path: "/email-templates", label: "Email Templates", icon: Mail },
    { path: "/ats", label: "ATS", icon: Settings },
    { path: "/skill-analysis", label: "Skill Analysis", icon: ChartNoAxesCombined },
  ]

  const getUserInitials = (name?: string) => {
    if (!name) return "U"
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
      {/* <div 
  className="
    absolute inset-0 
    [background-image:repeating-linear-gradient(#00000005_0_1px,transparent_1px_100%),repeating-linear-gradient(90deg,#00000005_0_1px,transparent_1px_100%)]
    bg-[size:30px_30px]
    dark:[background-image:repeating-linear-gradient(#ffffff0a_0_1px,transparent_1px_100%),repeating-linear-gradient(90deg,#ffffff0a_0_1px,transparent_1px_100%)]
  "
></div> */}
<motion.div
  initial={{ opacity: 0.8, scale: 1, y: 0, x: "-50%" }}
  animate={{
    y: [-10, 10, -10],
    scale: [1, 1.05, 1],
  }}
  transition={{
    duration: 12,
    repeat: Infinity,
    ease: "easeInOut",
  }}
  className="
    absolute top-[-15%] left-1/2 
    w-64 h-64 sm:w-72 sm:h-72 md:w-96 md:h-96 
    bg-gradient-to-r from-blue-700/40 to-purple-700/40
    dark:from-blue-800/50 dark:to-purple-800/50
    rounded-full blur-3xl
  "
/>

{/* Bottom Right Dark Orb */}
<motion.div
  initial={{ opacity: 0.8, scale: 1, y: 0, x: "50%" }}
  animate={{
    y: [10, -10, 10],
    scale: [1, 1.05, 1],
  }}
  transition={{
    duration: 16,
    repeat: Infinity,
    ease: "easeInOut",
    delay: 4, // natural stagger
  }}
  className="
    absolute bottom-[-15%] right-1/2 
    w-64 h-64 sm:w-72 sm:h-72 md:w-96 md:h-96 
    bg-gradient-to-r from-purple-700/40 to-pink-700/40
    dark:from-purple-800/50 dark:to-pink-800/50
    rounded-full blur-3xl
  "
/>

      {/* Gradient Orbs */}
      {/* <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 dark:from-blue-500/10 dark:to-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 dark:from-purple-500/10 dark:to-pink-500/10 rounded-full blur-3xl"></div> */}

      <div className="relative z-10">
        <header className="sticky top-0 z-50 w-full border-b border-white/20 dark:border-gray-800/20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl">
          <div className="container mx-auto flex h-16 items-center justify-between px-4">
            <div className="flex items-center space-x-8">
              {/* Logo */}
              <Link to="/" className="transition-transform duration-200 hover:scale-105">
                <CareerCraftLogo size="md" animated />
              </Link>

              {/* Desktop Navigation */}
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

              {/* Mobile Burger */}
              <div className="md:hidden flex items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                >
                  <svg
                    className="w-6 h-6 text-gray-700 dark:text-gray-300"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    {mobileMenuOpen ? (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
                    )}
                  </svg>
                </Button>
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center space-x-4">
              <div className="hidden lg:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-green-700 dark:text-green-400">CareerCraft Online</span>
              </div>

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
                        <div>
                          <p className="font-medium">Dashboard</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Manage your documents</p>
                        </div>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center px-4 py-2 cursor-pointer">
                      <User className="w-4 h-4 mr-3 text-green-500" />
                      <div>
                        <p className="font-medium">Profile Settings</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Update your information</p>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={logout}
                      className="flex items-center px-4 py-2 cursor-pointer text-red-600 dark:text-red-400"
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
                      className="text-sm font-medium hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition"
                    >
                      <User className="w-4 h-4 mr-2" />
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/auth">
                    <Button className="bg-gradient-to-r text-white from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-sm font-medium shadow-lg hover:shadow-xl transition">
                      <Zap className="w-4 h-4 mr-2" />
                      Get Started
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Slide-Down Nav */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                key="mobileMenu"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden border-t border-white/20 dark:border-gray-800/20 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl"
              >
                <nav className="flex flex-col p-4 space-y-2">
                  {navItems.map((item) => {
                    const Icon = item.icon
                    const isActive = location.pathname === item.path
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          "flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition",
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
              </motion.div>
            )}
          </AnimatePresence>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className={cn("mx-auto max-w-7xl", className)} {...props}>
            {children}
          </div>
        </main>

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
