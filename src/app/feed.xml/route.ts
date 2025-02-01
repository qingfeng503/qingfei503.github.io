import { WEBSITE_HOST_URL } from '@/lib/constants'
import { allPosts } from 'contentlayer/generated'
import RSS from 'rss'

export async function GET() {
  const feed = new RSS({
    title: 'Ymq Notes',
    description: 'Ymq\'s personal blog. I write about product, development and life.',
    site_url: WEBSITE_HOST_URL,
    feed_url: `${WEBSITE_HOST_URL}/feed.xml`,
    language: 'zh-CN',
    pubDate: new Date(),
    copyright: `All rights reserved ${new Date().getFullYear()}, Ymq`,
  })

  allPosts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .forEach((post) => {
      feed.item({
        title: post.title,
        description: post.description,
        url: `${WEBSITE_HOST_URL}${post.url}`,
        date: new Date(post.date),
        categories: [post.category],
        author: 'Ymq',
      })
    })

  return new Response(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}