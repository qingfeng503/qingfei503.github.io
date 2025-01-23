import { format, parseISO } from 'date-fns'
import Link from 'next/link'
import { getCategoryName, CATEGORY_MAP } from '@/lib/images'

interface PostHeaderProps {
    title: string
    date: string
    readingTime: number
    category?: string
}

export const PostHeader = ({ title, date, readingTime, category }: PostHeaderProps) => {
    return (
        <div className="mb-8 md:mb-12 space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                {title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                <time dateTime={date} className="flex items-center">
                    <svg className="mr-1.5 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {format(parseISO(date), 'yyyy年MM月dd日')}
                </time>
                <span className="inline-block w-1 h-1 rounded-full bg-gray-400" />
                <span className="flex items-center">
                    <svg className="mr-1.5 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    {readingTime} 分钟阅读
                </span>
                {category && (
                    <>
                        <span className="inline-block w-1 h-1 rounded-full bg-gray-400" />
                        <Link
                            href={`/categories/${category}`}
                            className="flex items-center hover:text-blue-500 transition-colors"
                        >
                            <svg className="mr-1.5 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                            </svg>
                            {getCategoryName(category as keyof typeof CATEGORY_MAP)}
                        </Link>
                    </>
                )}
            </div>
        </div>
    )
} 