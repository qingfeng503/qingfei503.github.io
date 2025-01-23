import { Post } from 'contentlayer/generated'
import { Container } from '@/components/common/Container'
import { FeaturedPost } from '@/components/home/FeaturedPost'

interface FeaturedSectionProps {
    post: Post
}

export function FeaturedSection({ post }: FeaturedSectionProps) {
    if (!post) return null

    return (
        <section className="py-8 sm:py-12">
            <Container>
                <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">
                    最新文章
                </h2>
                <FeaturedPost post={post} />
            </Container>
        </section>
    )
} 