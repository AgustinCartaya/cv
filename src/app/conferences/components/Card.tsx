'use client'

import React from 'react'
import Link from 'next/link'
import { v4 as uuidv4 } from 'uuid'
import Image from 'next/image'
import { Calender, Location } from '@/components/Icons'
import { MetaData } from '@/app/utils/read-meta'
import { formatDateWithOrdinal } from '@/app/utils/dateFormatter'

const Card = ({ title, description, images, date, location, files }: MetaData) => {
  return (
    <div className="flex flex-col gap-2 justify-between text-black bg-white shadow-lg rounded-lg overflow-hidden p-4 sm:p-8 w-42">
      <Image width={60} height={50} className="w-full h-60 object-cover" src={images[0]} alt={images[0]} />
      <div className="grid gap-4">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <div className="flex flex-col gap-2 justify-between">
          <p className="flex flex-wrap gap-2 lg:flex-nowrap">
            <Location /> {location}
          </p>
          <p className="flex flex-wrap gap-2 lg:flex-nowrap">
            <Calender /> {formatDateWithOrdinal(date)}
          </p>
        </div>
        <hr className='border-gray-400' />
        <p
          className="text-gray-600 text-sm max-h-32 overflow-y-auto"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {files.length > 0 &&
          files.map(({ title, source }: { title: string; source: string }) => {
            return (
              <Link
                href={source}
                target="_blank"
                rel="noopener noreferrer"
                key={uuidv4()}
                className="text-sm bg-principal hover:bg-principal_hover text-white uppercase px-4 py-2 rounded shadow-md transition duration-300"
              >
                {title}
              </Link>
            )
          })}
      </div>
    </div>
  )
}

export default Card
