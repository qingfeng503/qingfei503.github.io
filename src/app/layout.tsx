import { ThemeProvider } from '@/app/providers'
import { Container } from '@/components/Container'
import { Navigation } from '@/components/Navigation'
import ThemeSwitch from '@/components/ThemeSwitch'
import { WEBSITE_HOST_URL } from '@/lib/constants'
import type { Metadata } from 'next'
import { Analytics } from "@vercel/analytics/react"
import './global.css'

const meta = {
  title: 'Gino Notes',
  description: 'Gino Zhang\'s personal blog. I write about product, development and life.',
  image: `${WEBSITE_HOST_URL}/logo.jpg`,
  author: 'Gino Zhang',
}

// Schema.org 结构化数据
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: meta.title,
  description: meta.description,
  url: WEBSITE_HOST_URL,
  author: {
    '@type': 'Person',
    name: meta.author,
    url: WEBSITE_HOST_URL,
  },
  publisher: {
    '@type': 'Person',
    name: meta.author,
    url: WEBSITE_HOST_URL,
  },
  image: meta.image,
  inLanguage: 'zh-CN',
}

export const metadata: Metadata = {
  metadataBase: new URL(WEBSITE_HOST_URL),
  title: {
    default: meta.title,
    template: '%s | Gino Notes',
  },
  description: meta.description,
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: WEBSITE_HOST_URL,
    siteName: meta.title,
    locale: 'zh-CN',
    type: 'website',
    images: [
      {
        url: meta.image,
        width: 1200,
        height: 630,
        alt: meta.title,
      },
    ],
  },
  twitter: {
    title: meta.title,
    description: meta.description,
    images: [
      {
        url: meta.image,
        width: 1200,
        height: 630,
        alt: meta.title,
      }
    ],
    card: 'summary_large_image',
    creator: '@hongming731',
  },
  alternates: {
    canonical: WEBSITE_HOST_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/android-icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        <meta name="theme-color" content="#ffffff" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <header className="py-4">
            <Container>
              <div className="container max-w-[64rem] flex items-center justify-between">
                <Navigation />
                <ThemeSwitch />
              </div>
            </Container>
          </header>
          <main className='border-t border-gray-200 pt-4 dark:border-gray-700'>
            <Container>{children}</Container>
          </main>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
