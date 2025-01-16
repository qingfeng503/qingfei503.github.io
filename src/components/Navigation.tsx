"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { format, parseISO } from 'date-fns'
import { cn } from '@/lib/utils'
import { ThemeSwitch } from './ThemeSwitch'
import Image from 'next/image'
import { allPosts } from 'contentlayer/generated'
import { getCategoryName, CATEGORY_MAP } from '@/lib/images'
import { useState, useEffect } from 'react'
import { AppRoute, CategoryRoute, ExternalRoute, PostRoute, createCategoryRoute, isExternalRoute } from '@/lib/routes'
import { Route } from 'next'
import { 
  FaGithub, 
  FaTwitter, 
  FaHome,
  FaUser,
  FaCode,
  FaBrain,
  FaRobot,
  FaLaptopCode,
  FaRocket,
  FaBook,
  FaLightbulb,
  FaSearch,
  FaEnvelope,
  FaBars,
  FaTimes
} from 'react-icons/fa'

// 获取每个分类的文章数量
const getCategoryCount = (category: string) => {
  return allPosts.filter(post => post.category === category).length
}

const navigation = {
  main: [
    { href: '/' as Route<'/'>, label: '首页', icon: FaHome },
    { href: '/about' as Route<'/about'>, label: '关于我', icon: FaUser },
  ],
  posts: [
    { href: createCategoryRoute('dev'), label: '编程开发', icon: FaLaptopCode, count: getCategoryCount('dev') },
    { href: createCategoryRoute('ai'), label: '人工智能', icon: FaBrain, count: getCategoryCount('ai') },
    { href: createCategoryRoute('build'), label: '构建之路', icon: FaRocket, count: getCategoryCount('build') },
    { href: createCategoryRoute('reading'), label: '阅读记录', icon: FaBook, count: getCategoryCount('reading') },
    { href: createCategoryRoute('thoughts'), label: '思考随笔', icon: FaLightbulb, count: getCategoryCount('thoughts') },
  ],
  projects: [
    { href: 'https://bestblogs.dev' as ExternalRoute, label: 'BestBlogs.dev', icon: FaCode },
    { href: 'https://bitflowing.net' as ExternalRoute, label: 'BitFlowing',  icon: FaBrain },
    { href: 'https://hiagent.io' as ExternalRoute, label: 'HiAgent', icon: FaRobot },
    { href: 'https://tiky.ai' as ExternalRoute, label: 'Tiky AI', icon: FaRobot },
  ],
  online: [
    { href: 'https://github.com/ginobefun' as ExternalRoute, label: 'GitHub', icon: FaGithub },
    { href: 'https://twitter.com/hongming731' as ExternalRoute, label: 'Twitter', icon: FaTwitter },
  ]
}

export function Navigation() {
  const pathname = usePathname()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // 监听移动端返回按钮
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  // 监听路由变化，关闭移动端菜单
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  // 搜索框组件
  const SearchDialog = () => {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState<typeof allPosts>([])
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
      setMounted(true)
      return () => setMounted(false)
    }, [])

    useEffect(() => {
      if (query && query.trim().length > 1) {
        const results = allPosts
          .filter((post) => {
            const searchContent = post.title + post.description + post.category
            return searchContent.toLowerCase().includes(query.toLowerCase())
          })
          .slice(0, 5)
        setResults(results)
      } else {
        setResults([])
      }
    }, [query])

    if (!isSearchOpen) return null

    return (
      <div className="relative mt-2">
        <ul className="max-h-[300px] space-y-2 overflow-auto rounded-xl bg-white/90 p-2 shadow-lg backdrop-blur dark:bg-zinc-800/90">
          {results.map((post) => (
            <li key={post.url} className="group">
              <Link
                href={post.url as PostRoute}
                onClick={() => setIsSearchOpen(false)}
                className="block space-y-1 rounded-lg p-3 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-700/50"
              >
                <div className="space-y-1">
                  <h3 className="text-base font-medium text-zinc-900 dark:text-zinc-100">
                    {post.title}
                  </h3>
                  <p className="line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">
                    {post.description}
                  </p>
                </div>
                <div className="flex items-center gap-4 text-xs text-zinc-500">
                  <span>{post.category}</span>
                  <span>{post.date}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  const NavItem = ({ item }: { item: { href: AppRoute; label: string; icon: any; count?: number } }) => {
    const { href, label, icon: Icon, count } = item
    const isActive = pathname === href
    const isExternal = isExternalRoute(href)

    const className = cn(
      'flex flex-1 items-center space-x-3 rounded-md px-2 py-1.5 text-sm font-medium',
      isActive
        ? 'bg-black text-white hover:bg-black hover:text-white dark:bg-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white'
        : 'text-gray-700 dark:text-gray-200 sm:hover:bg-gray-200 sm:hover:text-gray-900 sm:dark:hover:bg-gray-700 sm:dark:hover:text-gray-200'
    )

    const content = (
      <>
        <span className="flex items-center justify-center w-4">
          <Icon className="w-4 h-4" />
        </span>
        <span className="flex-1">{label}</span>
        {count !== undefined && (
          <span className="text-xs text-gray-500 dark:text-gray-400 tabular-nums">
            {count}
          </span>
        )}
        {isExternal && (
          <span className="flex items-center justify-center w-4 text-black text-opacity-40 dark:text-white">
            <svg width="10" height="9" viewBox="0 0 10 9" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.00195 6.32617V0.824219C9.00195 0.490234 8.79102 0.267578 8.45117 0.267578L2.94922 0.279297C2.62109 0.279297 2.41016 0.519531 2.41016 0.794922C2.41016 1.07031 2.65039 1.30469 2.92578 1.30469H4.66602L7.45508 1.19922L6.39453 2.13672L1.16211 7.38086C1.05664 7.48633 0.998047 7.61523 0.998047 7.73828C0.998047 8.01367 1.24414 8.27734 1.53125 8.27734C1.66602 8.27734 1.78906 8.22461 1.89453 8.11914L7.13281 2.875L8.07617 1.81445L7.96484 4.48047V6.34961C7.96484 6.61914 8.19922 6.86523 8.48633 6.86523C8.76172 6.86523 9.00195 6.63672 9.00195 6.32617Z" fill="currentColor"/>
            </svg>
          </span>
        )}
      </>
    )

    if (isExternal) {
      return (
        <a
          href={href}
          className={className}
          target="_blank"
          rel="noopener noreferrer"
        >
          {content}
        </a>
      )
    }

    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    )
  }

  const NavSection = ({ title, items }: { title: string; items: any[] }) => (
    <div>
      <h4 className="px-2 pt-5 pb-2 text-xs font-semibold text-gray-1000 text-opacity-40 dark:text-white">
        {title}
      </h4>
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item.href} className="flex items-stretch space-x-1">
            <NavItem item={item} />
          </li>
        ))}
      </ul>
    </div>
  )

  // 移动端顶部栏组件
  const MobileHeader = () => (
    <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 z-30">
      <div className="flex items-center justify-between px-4 h-full">
        <button
          className="p-2 -ml-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <FaBars className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-3">
          <Image
            src="/avatar.jpg"
            alt="Gino"
            width={32}
            height={32}
            className="rounded-full"
          />
          <span className="font-medium text-gray-900 dark:text-gray-100">
            Gino
          </span>
        </div>
        <button
          className="p-2 -mr-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
          onClick={() => setIsSearchOpen(true)}
        >
          <FaSearch className="w-5 h-5" />
        </button>
      </div>
    </header>
  )

  return (
    <>
      <SearchDialog />
      <MobileHeader />
      
      {/* 移动端菜单遮罩 */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* 导航菜单 */}
      <nav className={cn(
        "fixed top-0 left-0 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 py-8 px-4 overflow-y-auto transition-all duration-300 z-50",
        "lg:w-64 lg:translate-x-0",
        isMobileMenuOpen ? "w-[280px] translate-x-0" : "w-[280px] -translate-x-full",
      )}>
        <div className="flex flex-col h-full">
          {/* 移动端关闭按钮 */}
          <button
            className="lg:hidden absolute top-4 right-4 p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <FaTimes className="w-5 h-5" />
          </button>

          {/* 头像和个人信息 */}
          <div className="px-3 mb-8 mt-4 lg:mt-0">
            <div className="relative group">
              <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden ring-2 ring-gray-200 dark:ring-gray-700">
                <Image
                  src="/avatar.jpg"
                  alt="Gino"
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                  sizes="(max-width: 96px) 96px"
                  priority
                />
              </div>
              <div className="text-center">
                <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
                  Gino
                </h1>
                <div className="mt-2 flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400">
                  <FaEnvelope className="w-3.5 h-3.5" />
                  <a 
                    href="mailto:hi@gino.bot"
                    className="text-sm hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
                  >
                    hi@gino.bot
                  </a>
                </div>
                <p className="mt-3 text-sm text-gray-500 dark:text-gray-400 font-medium italic">
                  Just be funny.
                </p>
              </div>
            </div>
          </div>

          {/* 导航分组 */}
          <div className="flex-1 px-3 py-3 space-y-1">
            <ul className="space-y-1">
              {navigation.main.map((item) => (
                <li key={item.href} className="flex items-stretch space-x-1">
                  <NavItem item={item} />
                </li>
              ))}
            </ul>

            <NavSection title="Posts" items={navigation.posts} />
            <NavSection title="Projects" items={navigation.projects} />
            <NavSection title="Online" items={navigation.online} />
          </div>

          {/* 底部工具栏 */}
          <div className="mt-auto pt-8 px-3 border-t border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between">
              <ThemeSwitch />
              <button
                className="hidden lg:flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                onClick={() => setIsSearchOpen(true)}
              >
                <FaSearch className="w-4 h-4" />
                <span className="text-xs">⌘K</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 移动端内容区域 padding */}
      <div className="lg:hidden h-16" />
    </>
  )
}
