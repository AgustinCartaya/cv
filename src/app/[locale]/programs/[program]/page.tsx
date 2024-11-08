import React from 'react'
import Link from 'next/link'
import { readMeta } from '@/app/utils/read-meta'
import ProgramHandler from './components/program-handler'

const Page = ({ params }: { params: { locale: string; program: string } }) => {
  const programs = readMeta('/public/programs', params.locale)
  const programsDetails: any = programs
    .map(data => ({
      ...data.page,
      images: data.images,
      url: data.url,
    }))
    .find(data => data.url === params.program)
  const exampleHtml = programsDetails?.example?.replace(/{(.*?)}/g, '$1')
  return (
    <div className="container mx-auto p-6">
      <div className="p-6 md:p-14 md:pt-2">
        <h1 className="text-2xl font-bold mb-4 text-center">{programsDetails?.title || ''}</h1>

        <p className="mb-4" dangerouslySetInnerHTML={{ __html: programsDetails?.description || '' }} />

        <h2 className="text-xl font-semibold mt-4">How to Use the Application</h2>
        <ul className="list-decimal list-inside mb-4">
          {programsDetails?.howToUse?.map((item: string, index: number) => (
            <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
          ))}
        </ul>

        <p dangerouslySetInnerHTML={{ __html: programsDetails?.howToUseTestImage || '' }} />

        <h2 className="text-xl font-semibold mt-4">Image Requirements</h2>
        <ul className="list-disc list-inside mb-4">
          {programsDetails?.requirements?.map((item: string, index: number) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        <h2 className="text-xl font-semibold mt-4">Output</h2>
        <ul className="list-disc list-inside mb-4">
          {programsDetails?.output?.map((item: string, index: number) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        {programsDetails?.example && (
          <div className="my-4">
            <h1 className="text-xl text-center">Example</h1>
            <div className="flex justify-center">
              <div
                dangerouslySetInnerHTML={{
                  __html: exampleHtml,
                }}
              />
            </div>
          </div>
        )}

        <h2 className="text-lg font-semibold">Important Notice</h2>
        <p>
          <mark>{programsDetails?.notice || ''}</mark>
        </p>
        <div className="flex items-center m-6">
          <hr className="flex-1 border-gray-400" />
          <span className="mx-4 text-2xl">Try the program</span>
          <hr className="flex-1 border-gray-400" />
        </div>
        <ProgramHandler name={params.program} />
      </div>
    </div>
  )
}

export default Page
