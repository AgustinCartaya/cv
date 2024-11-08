import Link from 'next/link'
import React from 'react'
import { readMeta } from '@/app/utils/read-meta'
import { v4 as uuidv4 } from 'uuid'
import { useTranslations } from 'next-intl'
import { verifyURL } from '@/app/utils/url-validation'

const Page = ({ params }: { params: { locale: string } }) => {
  const programs = readMeta('/public/programs', params.locale)
  const programsCards = programs.map(data => ({ ...data.card, images: data.images, url: data.url }))
  const t = useTranslations('Programs')

  return (
    <div className="grid gap-4 p-6 text-black">
      {programsCards.map(({ title, description, images, url }) => {
        return (
          <div key={uuidv4()} className="flex flex-col p-6 lg:flex-row gap-4 shadow-md bg-white rounded-md">
            <div className="flex justify-center">
              <img className="w-60 h-55 object-cover rounded-md lg:rounded-l-lg" src={images[0]} alt={images[0]} />
            </div>
            <div className="flex-1 flex flex-col gap-4 justify-between p-4">
              <p className="text-2xl font-bold">{title}</p>
              <p className="text-gray-600" dangerouslySetInnerHTML={{ __html: description }} />
              <div className="flex justify-center">
                <Link
                  href={verifyURL(`/${params.locale}/programs/${url}`)}
                  className="text-sm bg-principal hover:bg-principal_hover text-white uppercase px-4 py-2 rounded shadow-md transition duration-300"
                >
                  {t('btLaunch')}
                </Link>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Page
