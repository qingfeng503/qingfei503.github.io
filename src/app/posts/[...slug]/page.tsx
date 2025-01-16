import { notFound } from 'next/navigation'
import { allPosts } from 'contentlayer/generated'
import { getMDXComponent } from 'next-contentlayer/hooks'
import { format, parseISO } from 'date-fns'
import { TableOfContents } from '@/components/TableOfContents'
import { ReadingProgress } from '@/components/ReadingProgress'
import { Container } from '@/components/Container'
import { calculateReadingTime } from '@/lib/readingTime'
import { getCategoryName, CATEGORY_MAP } from '@/lib/images'
import Link from 'next/link'
import '@/styles/article.css'

interface PostProps {
  params: {
    slug: string[]
  }
}

// 获取上一篇和下一篇文章（同分类）
const getAdjacentPosts = (currentPost: any) => {
  const categoryPosts = allPosts
    .filter(post => post.category === currentPost.category)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const currentIndex = categoryPosts.findIndex(post => post._id === currentPost._id)
  const prevPost = currentIndex < categoryPosts.length - 1 ? categoryPosts[currentIndex + 1] : null
  const nextPost = currentIndex > 0 ? categoryPosts[currentIndex - 1] : null

  return { prevPost, nextPost, categoryPosts }
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

  return (
    <div className="relative w-full py-6 md:py-8">
      <ReadingProgress />
      <Container size="xl">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,_1fr)_300px] xl:gap-12">
          <div className="mx-auto w-full">
            <article className="article-container">
              <div className="article-header">
                <h1 className="article-title">{post.title}</h1>
                <div className="article-meta">
                  <time dateTime={post.date}>
                    {format(parseISO(post.date), 'yyyy年MM月dd日')}
                  </time>
                  <span>·</span>
                  <span>{readingTime} 分钟阅读</span>
                  {post.category && (
                    <>
                      <span>·</span>
                      <Link 
                        href={`/categories/${post.category}`}
                        className="hover:text-blue-500 transition-colors"
                      >
                        {getCategoryName(post.category as keyof typeof CATEGORY_MAP)}
                      </Link>
                    </>
                  )}
                </div>
              </div>

              <div className="article-content">
                <Content />
              </div>

              <footer className="article-footer">
                <div className="article-tags">
                  {post.tags?.split(',').map((tag) => (
                    <span key={tag.trim()} className="tag">
                      {tag.trim()}
                    </span>
                  ))}
                </div>

                <nav className="article-navigation">
                  {prevPost && (
                    <Link 
                      href={prevPost.url as `/posts/${string}/${string}`}
                      className="nav-item prev"
                    >
                      <span className="nav-label">上一篇</span>
                      <span className="nav-title">{prevPost.title}</span>
                    </Link>
                  )}
                  {nextPost && (
                    <Link 
                      href={nextPost.url as `/posts/${string}/${string}`}
                      className="nav-item next"
                    >
                      <span className="nav-label">下一篇</span>
                      <span className="nav-title">{nextPost.title}</span>
                    </Link>
                  )}
                </nav>

                <div className="mt-16 space-y-8">
                  <h2 className="text-xl font-bold">更多文章</h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {categoryPosts.slice(0, 4).map(post => (
                      <Link
                        key={post._id}
                        href={post.url as `/posts/${string}/${string}`}
                        className="group block overflow-hidden rounded-lg border p-4 transition-colors hover:border-blue-500 dark:border-gray-800 dark:hover:border-blue-500"
                      >
                        <span className="block line-clamp-2 font-medium text-gray-900 group-hover:text-blue-500 dark:text-gray-100">
                          {post.title}
                        </span>
                        <time className="mt-2 block text-sm text-gray-500 dark:text-gray-400">
                          {format(parseISO(post.date), 'yyyy年MM月dd日')}
                        </time>
                      </Link>
                    ))}
                  </div>
                  <div className="text-center">
                    <Link
                      href={`/categories/${post.category}`}
                      className="inline-flex items-center text-sm text-blue-500 hover:text-blue-600"
                    >
                      查看更多 {getCategoryName(post.category as keyof typeof CATEGORY_MAP)} 的文章
                      <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </footer>
            </article>
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
