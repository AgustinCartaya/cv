import { v4 as uuidv4 } from 'uuid'
import { Calender, Location } from '@/components/Icons'
import React from 'react'
import conferences from '../../../public/conferences/conferences/meta.json'
import { readMeta } from '../utils/read-meta'
import Card from './components/Card'

const Page = () => {
  const posters = readMeta('/public/conferences/posters')

  return (
    <div className="p-6 h-full">
      <p className="text-2xl">Conferences</p>
      <hr className="mt-2 mb-4" />
      <div className="grid my-6">
        {conferences.map((data: Conferences) => {
          return <ConferencesCard key={uuidv4()} {...data} />
        })}
      </div>

      <p className="text-2xl">Posters</p>
      <hr className="mt-2 mb-4" />
      <div className="flex justify-center h-full">
        <main className="flex gap-6 rounded-lg bg-green-400">
          <div className="flex-1">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:p-4">
              {posters.map(cardData => {
                return <Card key={uuidv4()} {...cardData} />
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Page

interface Conferences {
  title: string
  startDate: string
  endDate: string
  location: string
  role: string
}
const ConferencesCard = ({ title, startDate, endDate, location, role }: Conferences) => {
  return (
    <div className="grid gap-2 p-2">
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <p className="text-lg font-bold">{title}</p>
        <div className="grid sm:flex sm:flex-nowrap gap-2">
          {startDate === endDate ? (
            <div className="flex gap-2 text-winter">
              <Calender /> <p>{startDate}</p>
            </div>
          ) : (
            <>
              <div className="flex gap-2 text-winter">
                <Calender /> <p>Start: {startDate}</p>
              </div>
              <span className="hidden sm:block"> - </span>
              <div className="flex gap-2 text-winter">
                <Calender /> <p>End: {endDate}</p>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="flex gap-2">
        <Location /> <p className="text-winter">{location}</p>
      </div>
      <p>Role: {role}</p>
      <hr className="mt-4" />
    </div>
  )
}
