import { Post } from 'contentlayer/generated'
import { Container } from '../Container'
import { PostCard } from '../PostCard'

interface PostListProps {
  posts: Post[]
}

export function PostList({ posts }: PostListProps) {
  if (!posts.length) return null

  return (
    <section className="py-8">
      <Container>
        <div className="flex flex-col space-y-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            最新文章
          </h2>
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
            {posts.map((post, index) => (
              <PostCard key={post._id} {...post} priority={index < 1} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
} 