'use client'
import React from 'react'
import { useTheme } from 'next-themes'
import { Moon, Sun } from './Icons'
import { useTranslations } from 'next-intl'
import LocaleSwitcher from './LocaleSwitcher'

const Header = () => {
  const { setTheme } = useTheme()
  const t = useTranslations('Header')

  return (
    <header className="flex flex-col items-center lg:flex-row gap-12 lg:gap-32 text-white bg-winter dark:bg-white dark:text-black rounded-t-lg p-8 mx-6 shadow-lg">
      <div>
        <img
          className="profile__image w-60 h-60 rounded-full lg:ml-6 shadow-lg"
          src="https://avatars.githubusercontent.com/u/49463952"
          alt="profile-picture"
        />
      </div>

      <div className="header__content flex flex-col justify-center gap-y-2">
        <h1 className="content__title text-3xl md:text-5xl">Agustin Cartaya</h1>
        <span className="content__profession text-lg">{t('title')}</span>
        <div className="flex gap-2">
          <a
            href="https://linkedin.com/in/agustincartaya"
            target="_blank"
            className="flex text-black gap-6 rounded-md bg-white dark:bg-black dark:text-white border-2 px-6 py-2"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/AgustinCartaya"
            target="_blank"
            className="flex text-black gap-6 rounded-md bg-white dark:bg-black dark:text-white border-2 px-6 py-2"
          >
            Github
          </a>
          <a
            href="/Agustin_Cartaya_CV.pdf"
            target="_blank"
            className="flex text-black gap-6 rounded-md bg-white dark:bg-black dark:text-white border-2 px-6 py-2"
          >
            CV
          </a>
        </div>
      </div>

      <div className="flex flex-col items-center gap-6 sm:ml-6">
        <button className="dark:hidden" onClick={() => setTheme('dark')}>
          <Sun />
        </button>
        <button className="hidden dark:block" onClick={() => setTheme('light')}>
          <Moon />
        </button>
        <LocaleSwitcher />
      </div>
    </header>
  )
}

export default Header
