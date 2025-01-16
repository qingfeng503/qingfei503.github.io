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
      <div className="relative space-y-12 py-8 sm:space-y-16 sm:py-12">
        {/* 特色文章 */}
        {featuredPost && <FeaturedSection post={featuredPost} />}

        {/* 最新文章列表 */}
        <PostList posts={recentPosts} />
      </div>
    </>
  )
}
