import { notFound } from 'next/navigation'
import { allPosts } from 'contentlayer/generated'
import { getMDXComponent } from 'next-contentlayer/hooks'
import { format, parseISO } from 'date-fns'
import { TableOfContents } from '@/components/post/TableOfContents'
import { ReadingProgress } from '@/components/post/ReadingProgress'
import { Container } from '@/components/common/Container'
import { calculateReadingTime } from '@/lib/readingTime'
import { getCategoryName, CATEGORY_MAP } from '@/lib/images'
import Link from 'next/link'
import { PostHeader } from '@/components/post/PostHeader'
import { PostContent } from '@/components/post/PostContent'
import { PostFooter } from '@/components/post/PostFooter'

interface PostProps {
    params: {
        slug: string[]
    }
}

// 获取上一篇和下一篇文章（同分类）
const getAdjacentPosts = (currentPost: any) => {
    const categoryPosts = allPosts
        .filter(post => post.category === currentPost.category && post._id !== currentPost._id)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    const currentIndex = categoryPosts.findIndex(post => post._id === currentPost._id)
    const prevPost = currentIndex < categoryPosts.length - 1 ? categoryPosts[currentIndex + 1] : null
    const nextPost = currentIndex > 0 ? categoryPosts[currentIndex - 1] : null

    return { prevPost, nextPost, categoryPosts }
}

// 获取推荐文章
const getRecommendedPosts = (currentPost: any, categoryPosts: any[]) => {
    // 如果同类文章不足4篇，则补充最新文章
    if (categoryPosts.length < 4) {
        const latestPosts = allPosts
            .filter(post => post._id !== currentPost._id)
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .slice(0, 4 - categoryPosts.length)

        return [...categoryPosts, ...latestPosts].slice(0, 4)
    }

    return categoryPosts.slice(0, 4)
}

export const generateStaticParams = async () =>
    allPosts.map((post) => ({
        slug: post.url.replace('/posts/', '').split('/')
    }))

export const generateMetadata = ({ params }: PostProps) => {
    const post = allPosts.find((post) => {
        const urlPath = post.url.replace('/posts/', '')
        return urlPath === params.slug.join('/')
    })

    if (!post) return {}
    return {
        title: post.title,
        description: post.description
    }
}

const PostLayout = ({ params }: PostProps) => {
    const post = allPosts.find((post) => {
        const urlPath = post.url.replace('/posts/', '')
        return urlPath === params.slug.join('/')
    })

    if (!post) notFound()

    const Content = getMDXComponent(post.body.code)
    const readingTime = calculateReadingTime(post.body.raw)
    const { prevPost, nextPost, categoryPosts } = getAdjacentPosts(post)
    const recommendedPosts = getRecommendedPosts(post, categoryPosts)

    return (
        <div className="relative w-full py-6 md:py-8">
            <ReadingProgress />
            <Container size="xl">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,_1fr)_300px] xl:gap-12">
                    <div className="mx-auto w-full">
                        <article className="prose prose-lg dark:prose-invert max-w-none">
                            <PostHeader
                                title={post.title}
                                date={post.date}
                                readingTime={readingTime}
                                category={post.category}
                            />
                            <PostContent>
                                <Content />
                            </PostContent>
                        </article>

                        <PostFooter
                            tags={post.tags}
                            prevPost={prevPost}
                            nextPost={nextPost}
                            recommendedPosts={recommendedPosts}
                            category={post.category}
                            categoryPostsCount={categoryPosts.length}
                        />
                    </div>

                    <aside className="hidden lg:block">
                        <div className="sticky top-8">
                            <TableOfContents />
                        </div>
                    </aside>
                </div>
            </Container>
        </div>
    )
}

export default PostLayout
