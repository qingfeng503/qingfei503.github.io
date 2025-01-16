export const calculateReadingTime = (content: string): number => {
  const wordsPerMinute = 275; // 中文阅读速度
  const wordCount = content.trim().split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  return Math.max(1, readingTime); // 最少显示 1 分钟
}; 