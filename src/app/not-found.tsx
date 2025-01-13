import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center">
      <h2 className="mb-4 text-2xl font-bold">页面未找到</h2>
      <p className="mb-8 text-gray-600 dark:text-gray-400">
        抱歉，您访问的页面不存在。
      </p>
      <Link
        href="/"
        className="rounded-lg bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
      >
        返回首页
      </Link>
    </div>
  )
} 