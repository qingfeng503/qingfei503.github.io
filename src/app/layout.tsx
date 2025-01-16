"use client"

import { ThemeProvider } from '@/app/providers'
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { ErrorBoundary } from '@/components/common/ErrorBoundary'
import { Navigation } from '@/components/navigation/Navigation'
import { jsonLd } from '@/lib/metadata'
import './global.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffffff" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="alternate" type="application/rss+xml" title="RSS 2.0" href="/feed.xml" />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="relative min-h-screen">
            <Navigation />
            <div className="transition-all lg:ml-64">
              <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <ErrorBoundary>
                  {children}
                </ErrorBoundary>
              </main>
            </div>
          </div>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
