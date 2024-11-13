import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import Header from '@/components/Header'
import Navbar from '@/components/Navbar'
import { ThemeProvider } from '@/components/theme-provider'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Agustin Cartaya',
  description: 'Agustin Cartaya CV',
}
export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound()
  }

  // side is the easiest way to get started
  const messages = await getMessages()
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <NextIntlClientProvider messages={messages}>
            <div className="smd:p-12 dark:text-black ">
              <Header />
              <main className="mx-6 py-4 bg-secondary dark:bg-neutral_dark dark:text-white rounded-b-lg">
                <Navbar />
                {children}
              </main>
            </div>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
