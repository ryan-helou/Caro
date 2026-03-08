import OpeningCard from '../components/OpeningCard'
import { openings } from '../data/openings'

export default function Openings() {

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-1 tracking-tight">Openings</h1>
      <p className="text-navy-400 text-sm mb-8">Pick one to study.</p>
      <div className="space-y-3">
        {openings.map((opening) => (
          <OpeningCard key={opening.id} opening={opening} />
        ))}
      </div>
    </div>
  )
}
