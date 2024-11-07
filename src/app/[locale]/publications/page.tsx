import { v4 as uuidv4 } from 'uuid'
import React from 'react'
import { readMeta } from '@/app/utils/read-meta'
import Card from './components/Card'

const Page = ({ params }: { params: { locale: string } }) => {
  const publications = readMeta('/public/publications', params.locale)
  return (
    <div className="p-6 h-full">
      <div className="grid gap-4">
        {publications.map(data => {
          return <Card key={uuidv4()} {...data} />
        })}
      </div>
    </div>
  )
}

export default Page
