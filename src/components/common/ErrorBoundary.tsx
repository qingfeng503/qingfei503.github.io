'use client'

import { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children?: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex min-h-[400px] w-full flex-col items-center justify-center rounded-lg bg-red-50 p-8 dark:bg-red-900/10">
            <h2 className="mb-4 text-2xl font-bold text-red-600 dark:text-red-400">
              出错了！
            </h2>
            <p className="text-red-600 dark:text-red-400">
              {this.state.error?.message || '发生了一个错误，请稍后再试。'}
            </p>
          </div>
        )
      )
    }

    return this.props.children
  }
} 