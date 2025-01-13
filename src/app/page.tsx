import { allPosts } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'
import { PostCard } from '@/components/PostCard'
import { FeaturedPost } from '@/components/FeaturedPost'
import { Hero } from '@/components/Hero'
import { GradientBackground } from '@/components/GradientBackground'
import { getCategoryName, CATEGORY_MAP } from '@/lib/images'
import Link from 'next/link'

export default function Home() {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date)),
  )

  // 获取所有分类及其文章数量
  const categories = posts.reduce((acc, post) => {
    acc[post.category] = (acc[post.category] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  // 获取最新的特色文章
  const featuredPost = posts[0]

  return (
    <>
      <GradientBackground />
      
      {/* Hero Section */}
      <Hero />

      {/* 主要内容区域 */}
      <div className="relative space-y-24 py-16 md:space-y-32 md:py-24">
        {/* 分类统计 */}
        <section className="mx-auto max-w-6xl px-4">
          <h2 className="mb-8 text-2xl font-bold text-gray-900 dark:text-gray-100">
            文章分类
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {Object.entries(categories).map(([category, count]) => (
              <Link 
                key={category} 
                href={`/categories/${category}`}
                className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-white/50 to-white/30 p-6 shadow-lg transition-all hover:shadow-xl dark:from-gray-800/50 dark:to-gray-800/30 hover:scale-[1.02]"
              >
                <div className="absolute -right-4 -top-4 h-16 w-16 rotate-12 bg-gradient-to-br from-blue-500/10 to-emerald-500/10 blur-xl transition-all group-hover:rotate-45" />
                <span className="relative block font-medium text-gray-900 dark:text-gray-100">
                  {getCategoryName(category as keyof typeof CATEGORY_MAP)}
                </span>
                <span className="relative mt-2 inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-sm font-medium text-blue-800 dark:bg-blue-900/70 dark:text-blue-200">
                  {count} 篇
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* 特色文章 */}
        {featuredPost && (
          <section className="mx-auto max-w-6xl px-4">
            <h2 className="mb-8 text-2xl font-bold text-gray-900 dark:text-gray-100">
              最新文章
            </h2>
            <FeaturedPost post={featuredPost} />
          </section>
        )}

        {/* 文章列表 */}
        <section className="mx-auto max-w-6xl px-4">
          <h2 className="mb-8 text-2xl font-bold text-gray-900 dark:text-gray-100">
            所有文章
          </h2>
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 md:gap-8">
            {posts.slice(1).map((post, index) => (
              <div key={post._id}>
                <PostCard {...post} priority={index < 1} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
