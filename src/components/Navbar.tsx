'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const menuItems = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/publications', label: 'Publications' },
  { href: '/awards', label: 'Awards' },
  { href: '/conferences', label: 'Conferences' },
]

const Menu = () => {
  const pathname = usePathname()

  return (
    <nav className="bg-teal rounded-md mx-6 shadow-lg">
      <ul className="flex flex-col lg:grid lg:grid-cols-5 m-0 p-0">
        {menuItems.map(item => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`flex justify-center px-6 py-2 capitalize w-full text-white rounded-md ${
                pathname === item.href ? 'bg-dark_teal' : 'rounded-none hover:bg-dark_teal'
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
