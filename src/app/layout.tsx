import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Navbar from '@/components/Navbar'
import { ThemeProvider } from '@/components/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Agustin Cartaya',
  description: 'Agustin Cartaya CV',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="smd:p-12 dark:text-black ">
            <Header />
            <main className="mx-6 py-4 bg-secondary dark:bg-neutral_dark dark:text-white rounded-b-lg">
              <Navbar />
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
