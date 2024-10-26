'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const menuItems = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/publications', label: 'Publications' },
  { href: '/awards', label: 'Awards' },
  { href: '/conferences', label: 'Conferences' },
  { href: '/programs', label: 'Programs' },
]

const Menu = () => {
  const pathname = usePathname()

  return (
    <nav className="bg-principal dark:bg-black rounded-md mx-6 shadow-lg">
      <ul className="flex flex-col lg:grid lg:grid-cols-6 m-0 p-0">
        {menuItems.map(item => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`flex justify-center px-6 py-2 capitalize w-full text-white rounded-md ${
                (item.href !== '/' && pathname.startsWith(item.href)) || pathname === item.href
                  ? 'bg-principal_hover dark:bg-white dark:text-black hover:dark:bg-white'
                  : 'rounded-none hover:bg-principal_hover hover:dark:text-black hover:dark:bg-white '
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Menu
