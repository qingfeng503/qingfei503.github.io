"use client"

import { allPosts } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'
import { PostCard } from '@/components/PostCard'

export default function Home() {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date)),
  )

  return (
    <div className="container mx-auto max-w-[64rem] space-y-8">
      {posts.map((post) => (
        <PostCard key={post._id} {...post} />
      ))}
    </div>
  )
}
