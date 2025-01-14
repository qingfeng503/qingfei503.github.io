import { cn } from '@/lib/utils'

interface ContainerProps {
  children: React.ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

const containerSize = {
  sm: 'max-w-3xl',
  md: 'max-w-4xl',
  lg: 'max-w-5xl',
  xl: 'max-w-6xl',
  full: 'max-w-[1920px]'
}

export function Container({
  children,
  className,
  size = 'xl'
}: ContainerProps) {
  return (
    <div className={cn(
      'mx-auto w-full px-4 sm:px-6 lg:px-8',
      containerSize[size],
      className
    )}>
      {children}
    </div>
  )
}
