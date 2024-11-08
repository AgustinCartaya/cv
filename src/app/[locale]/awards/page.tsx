import { v4 as uuidv4 } from 'uuid'
import React from 'react'
import { formatYear } from '@/app/utils/date-formatter'

const Page = ({ params }: { params: { locale: string } }) => {
  const awards = require(`@/../public/awards/${params.locale}.json`)

  return (
    <ul className="list-disc p-6 ml-4 grid gap-2">
      {awards.map((award: { date: string; title: string }) => {
        return (
          <li key={uuidv4()} className="text-lg">
            {formatYear(award.date)} - {award.title}
          </li>
        )
      })}
    </ul>
  )
}

export default Page
