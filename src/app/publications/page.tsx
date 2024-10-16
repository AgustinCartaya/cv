import { v4 as uuidv4 } from 'uuid'
import React from 'react'
import { readMeta } from '../utils/read-meta'
import Card from './components/Card'

const Page = () => {
  const publications = readMeta('/public/publications')
  return (
    <div className="p-6 h-full">
      <div className="grid gap-4 my-6">
        {publications.map(data => {
          return <Card key={uuidv4()} {...data} />
        })}
      </div>
    </div>
  )
}

export default Page
