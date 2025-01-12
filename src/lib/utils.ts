import { clsx, type ClassValue } from 'clsx'
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

export function calculateReadingTime(content: string) {
  const wordsPerMinute = 200; // 假设平均阅读速度为每分钟200字
  const wordCount = content.trim().split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  
  // 对于中文内容，我们按照字数来计算
  const chineseCount = (content.match(/[\u4e00-\u9fa5]/g) || []).length;
  const chineseReadingTime = Math.ceil(chineseCount / 400); // 假设中文阅读速度为每分钟400字
  
  return Math.max(readingTime, chineseReadingTime, 1); // 至少返回1分钟
}
