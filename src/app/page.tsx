import { allPosts } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'
import { PostCard } from '@/components/PostCard'
import { FeaturedPost } from '@/components/FeaturedPost'
import { Hero } from '@/components/Hero'
import { GradientBackground } from '@/components/GradientBackground'
import { getCategoryName, CATEGORY_MAP } from '@/lib/images'
import { Container } from '@/components/Container'
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
      <div className="relative space-y-16 py-12 sm:space-y-20 sm:py-16 md:space-y-28 md:py-24">
        {/* 特色文章 */}
        {featuredPost && (
          <section>
            <Container>
              <h2 className="mb-8 text-2xl font-bold text-gray-900 dark:text-gray-100">
                最新文章
              </h2>
              <FeaturedPost post={featuredPost} />
            </Container>
          </section>
        )}

        {/* 文章列表 */}
        <section>
          <Container>
            <h2 className="mb-8 text-2xl font-bold text-gray-900 dark:text-gray-100">
              所有文章
            </h2>
            <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2">
              {posts.slice(1).map((post, index) => (
                <div key={post._id}>
                  <PostCard {...post} priority={index < 1} />
                </div>
              ))}
            </div>
          </Container>
        </section>
      </div>
    </>
  )
}
