import { notFound } from 'next/navigation'
import { allPosts } from 'contentlayer/generated'
import { Mdx } from '@/components/Mdx'
import { format, parseISO } from 'date-fns'
import { calculateReadingTime } from '@/lib/utils'
import { TableOfContents } from '@/components/TableOfContents'
import { ReadingProgress } from '@/components/ReadingProgress'

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
    <article className="prose mx-auto w-full max-w-none dark:prose-invert">
      <h1 className="mb-2">{post.title}</h1>
      <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
        <time dateTime={post.date}>
          {format(parseISO(post.date), 'yyyy年MM月dd日')}
        </time>
        <span>·</span>
        <span>{readingTime} 分钟阅读</span>
        {post.category && (
          <>
            <span>·</span>
            <span>{post.category}</span>
          </>
        )}
      </div>
      <Mdx code={post.body.code} />
    </article>
  )
}

export default async function PostPage({ params }: PostProps) {
  const post = await getPost(params)

  if (!post) {
    notFound()
  }

  return (
    <div className="relative mx-auto max-w-[64rem]">
      <ReadingProgress />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_250px]">
        <PostContent post={post} />
        <aside className="hidden lg:block">
          <TableOfContents />
        </aside>
      </div>
    </div>
  )
}
