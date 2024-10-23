import Link from 'next/link'
import React from 'react'
import { readMeta } from '../utils/read-meta'
import { v4 as uuidv4 } from 'uuid'
import Image from 'next/image'

const Page = () => {
  const programs = readMeta('/public/programs')
  return (
    <div className="p-6">
      {programs.map(({ title, description, images, url }) => {
        return (
          <div key={uuidv4()} className="flex flex-col p-6 lg:flex-row gap-4 bg-white rounded-md">
            <div className="flex justify-center">
              <Image
                width={300}
                height={60}
                className="object-cover rounded-md lg:rounded-l-lg"
                src={images[0]}
                alt={images[0]}
              />
            </div>
            <div className="flex-1 flex flex-col gap-4 justify-between p-4">
              <p className="text-2xl font-bold">{title}</p>
              <p className="text-gray-600" dangerouslySetInnerHTML={{ __html: description }} />
              <div className="flex justify-center h-full">
                <Link
                  href={`/programs/${url}`}
                  className="text-sm bg-teal hover:bg-dark_teal text-white uppercase px-4 py-2 rounded shadow-md hover:bg-darkBlue transition duration-300"
                >
                  Launch
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
