import { locales } from '@/i18n/routing'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'

const languages = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
}
const LocaleSwitcher: React.FC = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const changeLocale = (locale: string) => {
    const segments = pathname.split('/').filter(Boolean)
    segments[0] = locale
    const newPathname = `/${segments.join('/')}`
    router.replace(`${newPathname}?${searchParams.toString()}`)
  }

  return (
    <div className="flex items-center gap-4">
      {locales.map(locale => {
        const language = languages[locale as keyof typeof languages]
        const isMiddleLocale = locale !== locales.at(0) && locale !== locales.at(-1)
        return (
          <button
            key={uuidv4()}
            className={`relative font-semibold text-lg pr-4 ${
              isMiddleLocale && "after:content-['']"
            } after:absolute after:right-0 after:top-1/2 after:transform after:-translate-y-1/2 after:h-6 after:border-r after:border-gray-400 last:after:hidden`}
            onClick={() => changeLocale(locale)}
          >
            {language}
          </button>
        )
      })}
    </div>
  )
}

export default LocaleSwitcher
