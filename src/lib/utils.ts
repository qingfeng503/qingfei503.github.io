import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200 // 英文阅读速度：每分钟200词
  const charsPerMinute = 400 // 中文阅读速度：每分钟400字

  // 计算英文单词数
  const wordCount = text.match(/[a-zA-Z]+/g)?.length || 0

  // 计算中文字符数
  const chineseCount = (text.match(/[\u4e00-\u9fa5]/g) || []).length

  // 分别计算中英文阅读时间
  const englishTime = Math.ceil(wordCount / wordsPerMinute)
  const chineseTime = Math.ceil(chineseCount / charsPerMinute)

  // 取较大值，并确保至少返回1分钟
  return Math.max(englishTime + chineseTime, 1)
}
