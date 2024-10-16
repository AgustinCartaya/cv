import { readMeta } from '../utils/read-meta'
import Card from '@/app/projects/components/Card'
import { v4 as uuidv4 } from 'uuid'

const Home = () => {
  const projects = readMeta('/public/projects')
  return (
    <div className="flex justify-center h-full">
      <main className="flex gap-6 rounded-lg bg-green-400">
        <div className="flex-1">
          <div className="grid grid-cols-2 gap-4 p-6">
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
