import { Post } from 'contentlayer/generated'
import { Container } from '../Container'
import { PostCard } from '../PostCard'

interface PostListProps {
  posts: Post[]
}

export function PostList({ posts }: PostListProps) {
  if (!posts.length) return null

  return (
    <section>
      <Container>
        <h2 className="mb-8 text-2xl font-bold text-gray-900 dark:text-gray-100">
          最近文章
        </h2>
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2">
          {posts.map((post, index) => (
            <div key={post._id}>
              <PostCard {...post} priority={index < 1} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
} 