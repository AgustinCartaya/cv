import Link from 'next/link'
import React from 'react'

const Layout = ({ children, params }: { children: React.ReactNode; params: { locale: string } }) => {
  return (
    <>
      <div className="container mx-auto p-6 pb-0">
        <Link href={`/${params.locale}/programs`} className="flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-8"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
          </svg>
        </Link>
      </div>
      {children}
    </>
  )
}

export default Layout
