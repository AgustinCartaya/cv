'use client'
import { usePathname, useParams } from 'next/navigation'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

const menuItems = [
  { href: '/', label: 'home' },
  { href: '/projects', label: 'projects' },
  { href: '/publications', label: 'publications' },
  { href: '/awards', label: 'awards' },
  { href: '/conferences', label: 'conferences' },
  { href: '/programs', label: 'programs' },
]

const Menu = () => {
  const t = useTranslations('Navigation')
  const pathname = usePathname()
  const { locale = 'en' } = useParams()

  return (
    <nav className="bg-principal dark:bg-black rounded-md mx-6 shadow-lg">
      <ul className="flex flex-col lg:grid lg:grid-cols-6 m-0 p-0">
        {menuItems.map(item => {
          return (
            <li key={item.href}>
              <Link
                href={`/${locale}${item.href}`}
                className={`flex justify-center px-6 py-2 capitalize w-full text-white rounded-md ${
                  `${pathname}/` === `/${locale}${item.href}` ||
                  (item.href !== '/' && pathname.startsWith(`/${locale}${item.href}`))
                    ? 'bg-principal_hover dark:bg-white dark:text-black'
                    : 'hover:bg-principal_hover hover:dark:text-black hover:dark:bg-white'
                }`}
              >
                {t(item.label)}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default Menu
