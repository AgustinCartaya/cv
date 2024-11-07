import { useRouter, useSearchParams, usePathname } from 'next/navigation'

const LocaleSwitcher: React.FC = () => {
  const router = useRouter() // Access the router
  const pathname = usePathname() // Get the current pathname
  const searchParams = useSearchParams() // Get the current search params

  const changeLocale = (locale: string) => {
    // Ensure that the pathname starts with a slash and split it into segments
    const segments = pathname.split('/').filter(Boolean)

    // Update the first segment to the selected locale (i.e., /es or /en)
    segments[0] = locale

    // Construct the new pathname with the correct locale
    const newPathname = `/${segments.join('/')}`

    // Create a new URLSearchParams object with the current search parameters
    const newSearchParams = new URLSearchParams(searchParams.toString())

    // Update the URL using router.push(), appending the search params
    router.push(`${newPathname}?${newSearchParams.toString()}`)
  }

  return (
    <div className="flex gap-2">
      <button onClick={() => changeLocale('en')}>English</button>
      <button onClick={() => changeLocale('es')}>Español</button>
      <button onClick={() => changeLocale('fr')}>Français</button>
    </div>
  )
}

export default LocaleSwitcher
