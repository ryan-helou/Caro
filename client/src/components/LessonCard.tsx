import { Link } from 'react-router-dom'
import type { Lesson } from '../types'

interface Props {
  lesson: Lesson
  openingId: number
  completed: boolean
}

export default function LessonCard({ lesson, openingId, completed }: Props) {
  const moveCount = lesson.path.length

  return (
    <Link
      to={`/learn/${openingId}?lesson=${lesson.id}`}
      className="flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-navy-800/60 transition-colors group"
    >
      <div className="flex-shrink-0">
        {completed ? (
          <div className="w-5 h-5 rounded-full bg-chess-green/20 border-2 border-chess-green flex items-center justify-center">
            <svg className="w-3 h-3 text-chess-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        ) : (
          <div className="w-5 h-5 rounded-full border-2 border-navy-600" />
        )}
      </div>
      <span className="flex-1 min-w-0 text-sm text-navy-200 group-hover:text-gray-100 transition-colors truncate">
        {lesson.name}
      </span>
      <span className="text-xs text-navy-500 flex-shrink-0 tabular-nums">
        {moveCount} moves
      </span>
    </Link>
  )
}
