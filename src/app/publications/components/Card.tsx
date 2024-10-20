'use client'
import React, { useState } from 'react'
import { Calender, ChevronDoubleDown, ChevronDoubleUp } from '@/components/Icons'
import { formatMonthYear } from '@/app/utils/dateFormatter'

interface Publications {
  [key: string]: any
}

const Card = ({ title, date, description, link }: Publications) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDetails = () => {
    setIsOpen(!isOpen)
  }

  return (
    <details className="grid gap-2 p-4 bg-white border border-gray-300 rounded-lg">
      <summary className="flex flex-col justify-between cursor-pointer text-lg" onClick={toggleDetails}>
        <div className="flex justify-between items-center">
          <span className="font-bold">{title}</span>
          <span className="transform transition-transform duration-300">
            {isOpen ? <ChevronDoubleDown /> : <ChevronDoubleUp />}
          </span>
        </div>
        <div className="flex items-center gap-2 my-2">
          <Calender /> <p className="text-winter">{formatMonthYear(date)}</p>
        </div>
      </summary>
      <p>
        <a href={link} target="_blank" rel="noopener noreferrer" className="text-teal font-bold">
          Link to download
        </a>
      </p>
      <div className="grid gap-2 mt-2">
        <p className='underline'>Abstract</p>
        <p className="text-winter">{description}</p>
      </div>
    </details>
  )
}

export default Card
