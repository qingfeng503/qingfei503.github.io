import { Post } from 'contentlayer/generated'
import { Container } from '../Container'
import { FeaturedPost } from '../FeaturedPost'

interface FeaturedSectionProps {
  post: Post
}

export function FeaturedSection({ post }: FeaturedSectionProps) {
  if (!post) return null

  return (
    <section>
      <Container>
        <h2 className="mb-8 text-2xl font-bold text-gray-900 dark:text-gray-100">
          最新文章
        </h2>
        <FeaturedPost post={post} />
      </Container>
    </section>
  )
} 