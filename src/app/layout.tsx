import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Navbar from '@/components/Navbar'

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
    <html lang="en">
      <body className={inter.className}>
        <div className="smd:p-12">
          <Header />
          <main className="mx-6 py-4 bg-[#EEEEEE] rounded-b-lg">
            <Navbar />
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
