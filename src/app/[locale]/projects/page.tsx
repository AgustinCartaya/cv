import { readMeta } from '@/app/utils/read-meta'
import Card from '@/app/[locale]/projects/components/Card'
import { v4 as uuidv4 } from 'uuid'

const Home = () => {
  const projects = readMeta('/public/projects').sort((a, b) => {
    const dateA = new Date(a.date || '1970-01-01')
    const dateB = new Date(b.date || '1970-01-01')
    return dateB.getTime() - dateA.getTime()
  })
  return (
    <div className="flex justify-center h-full">
      <main className="flex gap-6 rounded-lg">
        <div className="flex-1">
          <div className="grid lg:grid-cols-2 gap-4 p-6">
            {projects.map(cardData => {
              return <Card key={uuidv4()} {...cardData} />
            })}
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home
