import { v4 as uuidv4 } from 'uuid'
import RadialProgress, { Calender, Location } from '@/components/Icons'
import academic_background from '../../public/academic_background/meta.json'
import skill_categories from '../../public/skills/meta.json'
import { formatDate, formatDateRange } from './utils/dateFormatter'
import clsx from 'clsx'

const languages = [
  { color: 'gold', language: 'Spanish', level: 'Native', writingPercentage: 100, speakingPercentage: 100 },
  { color: 'teal', language: 'English', level: 'Fluent', writingPercentage: 93, speakingPercentage: 93 },
  { color: 'teal', language: 'French', level: 'Fluent', writingPercentage: 93, speakingPercentage: 93 },
  { color: 'teal', language: 'Italian', level: 'Basic', writingPercentage: 60, speakingPercentage: 80 },
]

const Home = () => {
  return (
    <div className="p-6 h-full">
      <p className="text-2xl">About Me</p>
      <hr className="mt-2 mb-4" />

      <p>
        I specialize in medical image analysis, developing a wide range of algorithms, including machine learning and
        deep learning methods, to extract features, segment, classify, and analyze medical data. I have a particular
        interest in brain data analysis and in contributing to a deeper understanding of complex human brain functions,
        such as memory and behavior.
      </p>
      <p className="text-2xl mt-4">Academic Background</p>
      <hr className="mt-2 mb-4" />
      <div className="grid my-6">
        {academic_background.map((data: AcademicBackground) => {
          return <Card key={uuidv4()} {...data} />
        })}
      </div>

      <p className="text-2xl">Languages</p>
      <hr className="mt-2 mb-4" />
      <div className="flex flex-col sm:grid sm:grid-cols-4 gap-4 p-4 my-6">
        {languages.map(({ color, language, level, writingPercentage, speakingPercentage }) => {
          const totalPercentage = (writingPercentage + speakingPercentage) / 2
          return (
            <div key={uuidv4()} className="flex flex-col gap-2">
              <p className="font-bold uppercase text-center">{language}</p>
              <div className="flex justify-center my-2">
                <RadialProgress title={level} percentage={totalPercentage} color={color} />
              </div>
              <div className="text-white rounded-md bg-dark_white">
                <span
                  className={clsx(`text-sm h-full block p-2 rounded-md bg-${color}`)}
                  style={{ width: `${writingPercentage}%` }}
                >
                  Writing
                </span>
              </div>
              <div className="text-white rounded-md bg-dark_white">
                <span
                  className={clsx(`text-sm h-full block p-2 rounded-md bg-${color}`)}
                  style={{ width: `${speakingPercentage}%` }}
                >
                  Speaking
                </span>
              </div>
            </div>
          )
        })}
      </div>

      <p className="text-2xl">Skills</p>
      <hr className="mt-2 mb-4" />
      <SkillsSection />
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
        <p className="text-teal font-bold">{association}</p>
        <div className="grid sm:flex sm:flex-nowrap gap-2">
          {startDate === endDate ? (
            <div className="flex gap-2 text-winter">
              <Calender /> <p>{formatDate(startDate)}</p>
            </div>
          ) : (
            <div className="flex gap-2 text-winter">
              <Calender /> <p>{formatDateRange(startDate, endDate)}</p>
            </div>
          )}
        </div>
      </div>
      <div className="flex gap-2">
        <Location /> <p className="text-winter">{location}</p>
      </div>
      <p>{description}</p>
      <hr className="mt-4" />
    </div>
  )
}

const SkillsSection = () => (
  <div className="grid p-4">
    {skill_categories.map(category => (
      <div key={category.title} className="mb-8">
        <p className="uppercase mb-4">{category.title}</p>
        <div className="flex flex-wrap gap-4">
          {category.skills.map(skill => (
            <p key={skill} className="outline outline-offset-2 outline-1 rounded-lg px-6 py-2 bg-white shadow-lg">
              {skill}
            </p>
          ))}
        </div>
      </div>
    ))}
  </div>
)
