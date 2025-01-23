import { allPosts } from 'contentlayer/generated'
import { GradientBackground } from '@/components/common/GradientBackground'
import { Hero } from '@/components/home/Hero'
import { FeaturedSection } from '@/components/home/FeaturedSection'
import { PostList } from '@/components/home/PostList'
import { getFeaturedPost, getRecentPosts } from '@/lib/posts'
import { Container } from '@/components/common/Container'

export default function Home() {
    const featuredPost = getFeaturedPost(allPosts)
    const recentPosts = getRecentPosts(allPosts)

    return (
        <main className="min-h-screen">
            <GradientBackground />

            {/* Hero Section */}
            <Hero />

            {/* 主要内容区域 */}
            <Container>
                <div className="space-y-16 py-12 sm:py-16 lg:py-20">
                    {/* 特色文章 */}
                    {featuredPost && <FeaturedSection post={featuredPost} />}

                    {/* 最新文章列表 */}
                    <PostList posts={recentPosts} />
                </div>
            </Container>
        </main>
    )
}
