import { v4 as uuidv4 } from 'uuid'
import React from 'react'
import awards from '../../../public/awards/meta.json'

const Page = () => {
  return (
    <ul className="p-6 grid gap-2">
      {awards.map(award => {
        return (
          <li key={uuidv4()} className="text-lg">
            {award.date} - {award.title}
          </li>
        )
      })}
    </ul>
  )
}

export default Page
