import { allPosts } from 'contentlayer/generated'
import { Hero } from '@/components/Hero'
import { GradientBackground } from '@/components/GradientBackground'
import { FeaturedSection } from '@/components/home/FeaturedSection'
import { PostList } from '@/components/home/PostList'
import { getFeaturedPost, getRecentPosts } from '@/lib/posts'

export default function Home() {
  const featuredPost = getFeaturedPost(allPosts)
  const recentPosts = getRecentPosts(allPosts)

  return (
    <>
      <GradientBackground />
      
      {/* Hero Section */}
      <Hero />

      {/* 主要内容区域 */}
      <div className="relative space-y-16 py-12 sm:space-y-20 sm:py-16 md:space-y-28 md:py-24">
        {/* 特色文章 */}
        {featuredPost && <FeaturedSection post={featuredPost} />}

        {/* 最近文章列表 */}
        <PostList posts={recentPosts} />
      </div>
    </>
  )
}
