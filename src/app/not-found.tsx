import Link from 'next/link'
import Image from 'next/image'

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4">
      {/* 404 图片 */}
      <div className="relative mb-8 h-64 w-64 animate-float sm:h-72 sm:w-72 md:h-80 md:w-80 lg:h-96 lg:w-96">
        <Image
          src="/images/404.jpeg"
          alt="404 页面未找到"
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* 文字内容 */}
      <div className="text-center">
        <h1 className="mb-2 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl md:text-6xl">
          404
        </h1>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100 sm:text-3xl">
          页面未找到
        </h2>
        <p className="mb-8 text-base text-gray-600 dark:text-gray-400 sm:text-lg">
          抱歉，您访问的页面可能已经被删除或移动到其他位置。
        </p>
      </div>

      {/* 返回按钮 */}
      <Link
        href="/"
        className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 p-0.5 font-medium text-gray-900 hover:text-white dark:text-white"
      >
        <span className="relative rounded-md bg-white px-6 py-3 text-base transition-all duration-300 ease-in group-hover:bg-opacity-0 dark:bg-gray-900 sm:px-8 sm:text-lg">
          返回首页
        </span>
      </Link>
    </div>
  )
} 