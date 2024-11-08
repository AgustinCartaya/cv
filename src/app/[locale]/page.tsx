import { v4 as uuidv4 } from 'uuid'
import { Calender, CircularProgress, Location } from '@/components/Icons'
import { formatDate, formatDateRange } from '../utils/date-formatter'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'

interface Language {
  language: string
  level: string
  writingPercentage: number
  speakingPercentage: number
}

const Home = ({ params }: { params: { locale: string } }) => {
  const t = useTranslations('Home')
  const academic_background = require(`@/../public/academic_background/${params.locale}.json`)
  const skill_categories = require(`@/../public/skills/${params.locale}.json`)
  const languages = require(`@/../public/languages/${params.locale}.json`)

  return (
    <div className="p-6 h-full">
      <p className="text-2xl">{t('aboutMe')}</p>
      <hr className="mt-2 mb-4 p-2 border-black dark:border-white" />

      <p>{t('aboutMeDescription')}</p>
      <p className="text-2xl mt-4">{t('academicBackground')}</p>
      <hr className="mt-2 mb-4 border-black dark:border-white" />
      <div className="grid my-6">
        {academic_background.map((data: AcademicBackground) => {
          return <Card key={uuidv4()} {...data} />
        })}
      </div>

      <p className="text-2xl">{t('languages')}</p>
      <hr className="mt-2 mb-4 border-black dark:border-white" />
      <div className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4 my-6">
        {languages.map(({ language, level, writingPercentage, speakingPercentage }: Language, i: number) => {
          const totalPercentage = (writingPercentage + speakingPercentage) / 2
          const color = i === 0 ? 'accent' : 'principal'
          return (
            <div key={uuidv4()} className="flex flex-col gap-2">
              <p className="font-bold uppercase text-center">{language}</p>
              <div className="flex justify-center my-2">
                <CircularProgress percentage={totalPercentage} color={color} title={level} />
              </div>
              <div className="text-white rounded-md bg-gray-300">
                <span
                  className={clsx(`text-sm h-full block p-2 rounded-md ${i === 0 ? 'bg-accent' : 'bg-principal'}`)}
                  style={{ width: `${writingPercentage}%` }}
                >
                  {t('languagesWriting')}
                </span>
              </div>
              <div className="text-white rounded-md bg-gray-300">
                <span
                  className={clsx(`text-sm h-full block p-2 rounded-md ${i === 0 ? 'bg-accent' : 'bg-principal'}`)}
                  style={{ width: `${speakingPercentage}%` }}
                >
                  {t('languagesSpeaking')}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      <p className="text-2xl">{t('skills')}</p>
      <hr className="mt-2 mb-4 border-black dark:border-white" />
      <SkillsSection skill_categories={skill_categories} />
    </div>
  )
}

export default Home

interface AcademicBackground {
  title: string
  association: string
  startDate: string
  endDate: string
  location: string
  description: string
}
const Card = ({ title, association, startDate, endDate, location, description }: AcademicBackground) => {
  return (
    <div className="grid gap-2 p-4">
      <p className="text-lg font-bold">{title}</p>
      <div className="flex flex-col gap-2 sm:flex-row justify-between">
        <p className="font-bold text-principal">{association}</p>
        <div className="grid sm:flex sm:flex-nowrap gap-2">
          {startDate === endDate ? (
            <div className="flex gap-2">
              <Calender /> <p>{formatDate(startDate)}</p>
            </div>
          ) : (
            <div className="flex gap-2">
              <Calender /> <p>{formatDateRange(startDate, endDate)}</p>
            </div>
          )}
        </div>
      </div>
      <div className="flex gap-2">
        <Location /> <p>{location}</p>
      </div>
      <p>{description}</p>
      <hr className="mt-4 border-gray-400" />
    </div>
  )
}

interface SkillCategory {
  title: string
  skills: string[]
}

interface SkillsSectionProps {
  skill_categories: SkillCategory[]
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ skill_categories }) => (
  <div className="grid p-4">
    {skill_categories.map(category => (
      <div key={category.title} className="mb-8">
        <p className="uppercase mb-4">{category.title}</p>
        <div className="flex flex-wrap gap-4">
          {category.skills.map(skill => (
            <p key={skill} className="outline outline-offset-2 outline-1 rounded-lg px-6 py-2 shadow-lg">
              {skill}
            </p>
          ))}
        </div>
      </div>
    ))}
  </div>
)
