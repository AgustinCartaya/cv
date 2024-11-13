import { v4 as uuidv4 } from 'uuid'
import { Calender, Location } from '@/components/Icons'
import React from 'react'
import { readMeta } from '@/app/utils/read-meta'
import Card from './components/Card'
import { formatDateWithOrdinal } from '@/app/utils/date-formatter'
import { useTranslations } from 'next-intl'

const Page = ({ params }: { params: { locale: string } }) => {
  const posters = readMeta('/public/conferences/posters', params.locale).sort((a, b) => {
    const dateA = new Date(a.date || '1970-01-01')
    const dateB = new Date(b.date || '1970-01-01')
    return dateB.getTime() - dateA.getTime()
  })

  const conferences = require(`@/../public/conferences/conferences/${params.locale}.json`)
  const t = useTranslations('Conferences')

  return (
    <div className="p-6 h-full">
      <p className="text-2xl">{t('conferences')}</p>
      <hr className="mt-2 mb-4 border-black dark:border-white" />
      <div className="grid my-6">
        {conferences.map((data: Conferences) => {
          return <ConferencesCard key={uuidv4()} {...data} locale={params.locale} />
        })}
      </div>

      <p className="text-2xl">{t('posters')}</p>
      <hr className="mt-2 mb-4 border-black dark:border-white" />
      <div className="flex justify-center h-full">
        <main className="flex gap-6 rounded-lg">
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
  location: string
  role: string
  locale: string
}
const ConferencesCard = ({ title, startDate, location, role, locale }: Conferences) => {
  return (
    <div className="grid gap-2 p-2 text-winter dark:text-white">
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <p className="text-lg font-bold">{title}</p>
        <div className="grid sm:flex sm:flex-nowrap gap-2">
          <div className="flex gap-2">
            <Calender /> <p className="capitalize">{formatDateWithOrdinal(startDate, locale)}</p>
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <Location /> <p>{location}</p>
      </div>
      <p>Role: {role}</p>
      <hr className="mt-4 border-gray-400" />
    </div>
  )
}
