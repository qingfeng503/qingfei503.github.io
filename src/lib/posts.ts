import { Post } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'

/**
 * 获取按日期排序的文章列表
 */
export function getSortedPosts(posts: Post[]) {
  return posts.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
}

/**
 * 获取文章分类统计
 */
export function getCategoryStats(posts: Post[]) {
  return posts.reduce((acc, post) => {
    acc[post.category] = (acc[post.category] || 0) + 1
    return acc
  }, {} as Record<string, number>)
}

/**
 * 获取最新的特色文章
 */
export function getFeaturedPost(posts: Post[]) {
  return getSortedPosts(posts)[0]
}

/**
 * 获取最近的 N 篇文章（不包含特色文章）
 */
export function getRecentPosts(posts: Post[], count: number = 10) {
  const sortedPosts = getSortedPosts(posts)
  // 排除第一篇特色文章
  return sortedPosts.slice(1, count + 1)
} 