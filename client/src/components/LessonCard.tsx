import { Link } from 'react-router-dom'
import type { Lesson } from '../types'

interface Props {
  lesson: Lesson
  openingId: number
  completed: boolean
}

export default function LessonCard({ lesson, openingId, completed }: Props) {
  // Count player-visible moves (total moves in the path, minus the root which is auto-played)
  const moveCount = lesson.path.length

  return (
    <Link
      to={`/learn/${openingId}?lesson=${lesson.id}`}
      className="flex items-center gap-4 bg-navy-900 border border-navy-700 rounded-lg px-5 py-4 hover:border-chess-gold/50 transition-colors group"
    >
      <div className="flex-shrink-0">
        {completed ? (
          <div className="w-6 h-6 rounded-full bg-chess-green/20 border-2 border-chess-green flex items-center justify-center">
            <svg className="w-3.5 h-3.5 text-chess-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        ) : (
          <div className="w-6 h-6 rounded-full border-2 border-navy-600" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <span className="text-sm font-medium text-gray-100 group-hover:text-chess-gold transition-colors">
          {lesson.name}
        </span>
      </div>
      <span className="text-xs text-gray-500 flex-shrink-0">
        {moveCount} moves
      </span>
    </Link>
  )
}
