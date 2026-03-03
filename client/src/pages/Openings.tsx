import { useEffect, useState } from 'react'
import OpeningCard from '../components/OpeningCard'
import type { Opening } from '../types'
import { openings as localOpenings } from '../data/openings'

export default function Openings() {
  const [openings, setOpenings] = useState<Opening[]>(localOpenings)

  useEffect(() => {
    fetch('/api/openings')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0 && data[0].tree) {
          setOpenings(data)
        }
      })
      .catch(() => {
        // use local fallback
      })
  }, [])

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">Openings</h1>
      <p className="text-gray-400 mb-8">Choose an opening to practice.</p>
      <div className="grid gap-4">
        {openings.map((opening) => (
          <OpeningCard key={opening.id} opening={opening} />
        ))}
      </div>
    </div>
  )
}
