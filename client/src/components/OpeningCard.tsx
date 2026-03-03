import { Link } from 'react-router-dom'
import type { Opening, MoveNode } from '../types'

function countVariations(node: MoveNode): number {
  if (!node?.children?.length) return 1
  return node.children.reduce((sum, child) => sum + countVariations(child), 0)
}

interface Props {
  opening: Opening
}

export default function OpeningCard({ opening }: Props) {
  const variations = countVariations(opening.tree)

  return (
    <Link
      to={`/course/${opening.id}`}
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
        <span>{variations} variation{variations !== 1 ? 's' : ''}</span>
      </div>
    </Link>
  )
}
