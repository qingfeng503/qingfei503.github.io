"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Search } from './Search'
import { ThemeSwitch } from './ThemeSwitch'

const links = [
  { href: '/' as const, label: '首页' },
  { href: '/about' as const, label: '关于' },
] as const

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="w-full flex items-center">
      <div className="flex items-center gap-6">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              'text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-100',
              pathname === href
                ? 'text-gray-900 dark:text-gray-100'
                : 'text-gray-600 dark:text-gray-400'
            )}
          >
            {label}
          </Link>
        ))}
      </div>
      <div className="ml-auto flex items-center gap-4">
        <Search />
        <ThemeSwitch />
      </div>
    </nav>
  )
}
