'use client'

import React from 'react'
import Link from 'next/link'
import Slider from 'react-slick'
import { v4 as uuidv4 } from 'uuid'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Image from 'next/image'
import { MetaData } from '@/app/utils/read-meta'
import { Calender, Location } from '../../../components/Icons'

const Card = ({ title, description, images, date, location, code, files }: MetaData) => {
  const settings = {
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: Boolean(images.length > 1),
    nextArrow: <Arrow direction="next" />,
    prevArrow: <Arrow direction="prev" />,
  }

  return (
    <div className="flex flex-col gap-4 justify-between bg-white shadow-lg rounded-lg overflow-hidden p-8 w-42">
      <ImageSlider images={images} settings={settings} />
      <div className="grid gap-4">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <div className="flex justify-between">
          <p>
            <Location />
            {location}
          </p>
          <p>
            <Calender />
            {date}
          </p>
        </div>
        <hr />
        <p
          className="text-gray-600 text-sm max-h-32 overflow-y-auto"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>

      <div className="flex space-x-4 mt-2">
        {files.length > 0 &&
          files.map(({ title, source }: { title: string; source: string }) => {
            return (
              <Link
                href={String(source)}
                target="_blank"
                rel="noopener noreferrer"
                key={uuidv4()}
                className="text-sm bg-teal hover:bg-dark_teal text-white uppercase px-4 py-2 rounded shadow-md hover:bg-darkBlue transition duration-300"
              >
                {title}
              </Link>
            )
          })}
        {code && (
          <Link
            href={code}
            target="_blank"
            rel="noopener noreferrer"
            key={uuidv4()}
            className="text-sm bg-teal hover:bg-dark_teal text-white uppercase px-4 py-2 rounded shadow-md hover:bg-darkBlue transition duration-300"
          >
            Code
          </Link>
        )}
      </div>
    </div>
  )
}

const ImageSlider = ({ images, settings }: { images: string[]; settings: any }) => (
  <div className="slider-container">
    <Slider {...settings} className="relative">
      {images.map(image => (
        <Image key={uuidv4()} width={60} height={50} className="w-full h-60 object-cover" src={image} alt={image} />
      ))}
    </Slider>
  </div>
)

type ArrowProps = {
  onClick?: () => void
  direction: 'prev' | 'next'
}

const arrowStyles: React.CSSProperties = {
  cursor: 'pointer',
  display: 'grid',
  zIndex: '1',
  position: 'absolute',
  top: '45%',
  borderRadius: '50%',
}

const Arrow = ({ onClick, direction }: ArrowProps) => (
  <button onClick={onClick} style={{ ...arrowStyles, [direction === 'prev' ? 'left' : 'right']: 0 }}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="#fff"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-8 h-8"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d={
          direction === 'prev'
            ? 'm11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
            : 'm12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
        }
      />
    </svg>
  </button>
)

export default Card
