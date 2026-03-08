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
      className="block bg-navy-900 border border-navy-800 rounded-lg px-5 py-5 hover:border-navy-600 transition-colors group"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-base font-semibold text-gray-100 group-hover:text-chess-green transition-colors">
            {opening.name}
          </h3>
          <p className="text-sm text-navy-400 mt-1">
            {opening.eco} &middot; Play as {opening.color} &middot; {variations} lines
          </p>
        </div>
        <span className="text-navy-500 group-hover:text-chess-green transition-colors mt-1">&rarr;</span>
      </div>
    </Link>
  )
}
