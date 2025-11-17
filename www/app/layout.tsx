import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ThemeProvider } from '@/components/theme-provider'

export const metadata: Metadata = {
  title: 'DevMagic - Your Development Environment, Anywhere',
  description: 'DevMagic - Your Development Environment, Anywhere',
  metadataBase: new URL('https://devmagic.run'),
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    type: 'website',
    title: 'DevMagic - Your Development Environment, Anywhere',
    description: 'DevMagic - Your Development Environment, Anywhere',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DevMagic - Your Development Environment, Anywhere',
    description: 'DevMagic - Your Development Environment, Anywhere',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
