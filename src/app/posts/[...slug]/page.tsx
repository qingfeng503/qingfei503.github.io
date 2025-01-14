import { notFound } from 'next/navigation'
import { allPosts } from 'contentlayer/generated'
import { Mdx } from '@/components/Mdx'
import { format, parseISO } from 'date-fns'
import { calculateReadingTime } from '@/lib/utils'
import { TableOfContents } from '@/components/TableOfContents'
import { ReadingProgress } from '@/components/ReadingProgress'
import { Container } from '@/components/Container'
import { getCategoryName, CATEGORY_MAP } from '@/lib/images'
import Link from 'next/link'

interface PostProps {
  params: {
    slug: string[]
  }
}

async function getPost(params: PostProps['params']) {
  const slug = params?.slug?.join('/')
  const post = allPosts.find((post) => {
    const postPath = `${post.category}/${post.slug}`
    return postPath === slug
  })

  if (!post) {
    return null
  }

  return post
}

export async function generateMetadata({ params }: PostProps) {
  const post = await getPost(params)

  if (!post) {
    return {}
  }

  return {
    title: post.title,
    description: post.description,
  }
}

export async function generateStaticParams(): Promise<PostProps['params'][]> {
  return allPosts.map((post) => ({
    slug: [post.category, post.slug],
  }))
}

function PostContent({ post }: { post: any }) {
  const readingTime = calculateReadingTime(post.body.raw)

  return (
    <article className="prose w-full dark:prose-invert sm:prose-lg lg:prose-xl">
      <h1 className="mb-2 !mt-0">{post.title}</h1>
      <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
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
      <Mdx code={post.body.code} />
    </article>
  )
}

function PostNavigation({ currentPost }: { currentPost: any }) {
  // 获取同一分类的所有文章
  const categoryPosts = allPosts
    .filter(post => post.category === currentPost.category)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  // 找到当前文章的索引
  const currentIndex = categoryPosts.findIndex(post => post._id === currentPost._id)
  const prevPost = currentIndex < categoryPosts.length - 1 ? categoryPosts[currentIndex + 1] : null
  const nextPost = currentIndex > 0 ? categoryPosts[currentIndex - 1] : null

  return (
    <div className="mt-16 space-y-8 border-t pt-8 dark:border-gray-800">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {prevPost && (
          <Link 
            href={prevPost.url as `/posts/${string}/${string}`}
            className="group relative overflow-hidden rounded-lg border p-4 transition-colors hover:border-blue-500 dark:border-gray-800 dark:hover:border-blue-500"
          >
            <span className="block text-sm text-gray-500 dark:text-gray-400">上一篇</span>
            <span className="mt-2 block line-clamp-2 font-medium text-gray-900 group-hover:text-blue-500 dark:text-gray-100">
              {prevPost.title}
            </span>
          </Link>
        )}
        {nextPost && (
          <Link 
            href={nextPost.url as `/posts/${string}/${string}`}
            className="group relative overflow-hidden rounded-lg border p-4 text-right transition-colors hover:border-blue-500 dark:border-gray-800 dark:hover:border-blue-500"
          >
            <span className="block text-sm text-gray-500 dark:text-gray-400">下一篇</span>
            <span className="mt-2 block line-clamp-2 font-medium text-gray-900 group-hover:text-blue-500 dark:text-gray-100">
              {nextPost.title}
            </span>
          </Link>
        )}
      </div>

      <div className="space-y-4">
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
            href={`/categories/${currentPost.category}`}
            className="inline-flex items-center text-sm text-blue-500 hover:text-blue-600"
          >
            查看更多 {getCategoryName(currentPost.category as keyof typeof CATEGORY_MAP)} 的文章
            <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default async function PostPage({ params }: PostProps) {
  const post = await getPost(params)

  if (!post) {
    notFound()
  }

  return (
    <div className="relative w-full py-6 md:py-8">
      <ReadingProgress />
      <Container size="xl">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,_1fr)_300px] xl:gap-12">
          <div className="mx-auto w-full">
            <PostContent post={post} />
            <PostNavigation currentPost={post} />
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
