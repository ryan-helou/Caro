import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { openings } from '../data/openings'
import { extractLessons } from '../utils/treeUtils'

interface LessonProgress {
  completed: number[]
}

function getLessonProgress(openingId: number): LessonProgress {
  try {
    const raw = localStorage.getItem(`caro-lessons-${openingId}`)
    if (raw) return JSON.parse(raw)
  } catch {}
  return { completed: [] }
}

export default function Profile() {
  const openingStats = useMemo(() => {
    return openings.map((opening) => {
      const lessons = extractLessons(opening.tree)
      const progress = getLessonProgress(opening.id)
      const completedSet = new Set(progress.completed)
      const completedLessons = lessons.filter((l) => completedSet.has(l.id))
      const remainingLessons = lessons.filter((l) => !completedSet.has(l.id))
      const percent = lessons.length > 0 ? Math.round((completedLessons.length / lessons.length) * 100) : 0
      return { opening, lessons, completedLessons, remainingLessons, percent }
    })
  }, [])

  const totalLessons = openingStats.reduce((sum, s) => sum + s.lessons.length, 0)
  const totalCompleted = openingStats.reduce((sum, s) => sum + s.completedLessons.length, 0)
  const overallPercent = totalLessons > 0 ? Math.round((totalCompleted / totalLessons) * 100) : 0

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">Your Progress</h1>
      <p className="text-gray-400 mb-8">Track what you've completed across all openings.</p>

      {/* Overall stats */}
      <div className="bg-navy-900 border border-navy-700 rounded-xl p-6 mb-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-gray-300 font-medium">Overall Completion</span>
          <span className="text-chess-gold font-semibold text-lg">{overallPercent}%</span>
        </div>
        <div className="h-3 bg-navy-800 rounded-full overflow-hidden mb-3">
          <div
            className="h-full bg-chess-green rounded-full transition-all duration-300"
            style={{ width: `${overallPercent}%` }}
          />
        </div>
        <p className="text-sm text-gray-500">
          {totalCompleted} of {totalLessons} lessons completed
        </p>
      </div>

      {/* Per-opening breakdown */}
      {openingStats.map(({ opening, lessons, completedLessons, remainingLessons, percent }) => (
        <div key={opening.id} className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-xl font-semibold text-gray-100">{opening.name}</h2>
              <p className="text-sm text-gray-500">
                {opening.eco} &middot; {completedLessons.length}/{lessons.length} lessons
              </p>
            </div>
            <Link
              to={`/course/${opening.id}`}
              className="text-sm text-chess-gold hover:underline"
            >
              Continue
            </Link>
          </div>

          {/* Progress bar */}
          <div className="mb-4">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
              <span>{percent}% complete</span>
            </div>
            <div className="h-2 bg-navy-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-chess-green rounded-full transition-all duration-300"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>

          {completedLessons.length === 0 && remainingLessons.length > 0 && (
            <div className="bg-navy-900 border border-navy-700 rounded-lg px-5 py-4 text-center">
              <p className="text-gray-500 text-sm">No lessons completed yet.</p>
              <Link
                to={`/course/${opening.id}`}
                className="text-sm text-chess-gold hover:underline mt-1 inline-block"
              >
                Start learning
              </Link>
            </div>
          )}

          {/* Completed lessons */}
          {completedLessons.length > 0 && (
            <div className="space-y-1.5 mb-3">
              {completedLessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className="flex items-center gap-3 bg-navy-900 border border-navy-700 rounded-lg px-4 py-3"
                >
                  <div className="w-5 h-5 rounded-full bg-chess-green/20 border-2 border-chess-green flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-chess-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-300 truncate">{lesson.name}</span>
                  <span className="text-xs text-gray-600 flex-shrink-0 ml-auto">{lesson.path.length} moves</span>
                </div>
              ))}
            </div>
          )}

          {/* Remaining lessons (collapsed) */}
          {remainingLessons.length > 0 && completedLessons.length > 0 && (
            <p className="text-xs text-gray-600 pl-1">
              {remainingLessons.length} lesson{remainingLessons.length !== 1 ? 's' : ''} remaining
            </p>
          )}
        </div>
      ))}

      <p className="text-center text-gray-600 text-xs mt-12">Built by Ryan Helou</p>
    </div>
  )
}
