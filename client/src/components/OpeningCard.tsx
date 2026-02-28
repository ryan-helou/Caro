import { Link } from 'react-router-dom'
import type { Opening } from '../types'

interface Props {
  opening: Opening
}

export default function OpeningCard({ opening }: Props) {
  return (
    <Link
      to={`/practice/${opening.id}`}
      className="block bg-navy-900 border border-navy-700 rounded-xl p-6 hover:border-chess-gold/50 transition-colors group"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-100 group-hover:text-chess-gold transition-colors">
          {opening.name}
        </h3>
        <span className="text-xs font-mono bg-navy-800 text-gray-400 px-2 py-1 rounded">
          {opening.eco}
        </span>
      </div>
      <div className="flex items-center gap-3 text-sm text-gray-400">
        <span>Play as {opening.color}</span>
        <span>&middot;</span>
        <span>{opening.moves.length} half-moves</span>
      </div>
    </Link>
  )
}
