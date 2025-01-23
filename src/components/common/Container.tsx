import { cn } from '@/lib/utils'

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'default'
}

const sizeMap = {
  sm: 'max-w-2xl',    // 672px - 适合简单的文本内容
  md: 'max-w-3xl',    // 768px - 适合博客文章主体
  lg: 'max-w-4xl',    // 896px - 适合展示型页面
  default: 'max-w-6xl' // 1152px - 适合列表页面
}

export function Container({
  size = 'default',
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full px-4 sm:px-6 lg:px-8',
        sizeMap[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
