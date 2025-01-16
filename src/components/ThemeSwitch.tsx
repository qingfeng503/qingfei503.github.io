'use client'

import { useTheme } from "next-themes"
import { FaSun, FaMoon } from "react-icons/fa"
import { cn } from "@/lib/utils"

interface ThemeSwitchProps {
  className?: string
}

export function ThemeSwitch({ className }: ThemeSwitchProps) {
  const { theme, setTheme } = useTheme()

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={cn(
        "p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors",
        className
      )}
    >
      <FaSun className="hidden dark:block w-4 h-4" />
      <FaMoon className="block dark:hidden w-4 h-4" />
    </button>
  )
}

export default ThemeSwitch
