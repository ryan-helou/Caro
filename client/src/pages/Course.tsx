import { useEffect, useState, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import LessonCard from '../components/LessonCard'
import LessonPath from '../components/LessonPath'
import { extractLessons } from '../utils/treeUtils'
import { openings } from '../data/openings'
import type { Opening } from '../types'

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

export default function Course() {
  const { id } = useParams<{ id: string }>()
  const [opening, setOpening] = useState<Opening | null>(null)
  const [notFound, setNotFound] = useState(false)
  const [view, setView] = useState<'checklist' | 'path'>('checklist')
  const [progress, setProgress] = useState<LessonProgress>({ completed: [] })

  const openingId = Number(id)

  useEffect(() => {
    setNotFound(false)
    fetch(`/api/openings/${openingId}`)
      .then((res) => {
        if (!res.ok) throw new Error('not found')
        return res.json()
      })
      .then((data: Opening) => {
        if (data && data.tree) {
          setOpening(data)
        } else {
          throw new Error('invalid')
        }
      })
      .catch(() => {
        const local = openings.find((o) => o.id === openingId)
        if (local) {
          setOpening(local)
        } else {
          setNotFound(true)
        }
      })

    setProgress(getLessonProgress(openingId))
  }, [openingId])

  // Re-read progress when window regains focus (user comes back from practice)
  useEffect(() => {
    const handleFocus = () => setProgress(getLessonProgress(openingId))
    window.addEventListener('focus', handleFocus)
    return () => window.removeEventListener('focus', handleFocus)
  }, [openingId])

  const lessons = useMemo(() => (opening ? extractLessons(opening.tree) : []), [opening])
  const completedSet = useMemo(() => new Set(progress.completed), [progress])
  const completedCount = progress.completed.length
  const totalCount = lessons.length
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0

  if (notFound) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-2">Opening not found</h1>
        <p className="text-gray-400 mb-4">That opening doesn't exist.</p>
        <Link to="/openings" className="text-chess-gold hover:underline">
          Browse openings
        </Link>
      </div>
    )
  }

  if (!opening) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        <p className="text-gray-400">Loading...</p>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/openings" className="text-sm text-gray-400 hover:text-gray-200 transition-colors">
          &larr; Back to openings
        </Link>
        <h1 className="text-2xl font-bold mt-2">{opening.name}</h1>
        <p className="text-gray-400 text-sm">
          {opening.eco} &middot; Play as {opening.color}
        </p>
      </div>

      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-gray-400">
            {completedCount}/{totalCount} lessons complete
          </span>
          <span className="text-gray-500">{progressPercent}%</span>
        </div>
        <div className="h-2 bg-navy-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-chess-green rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="mb-6">
        <Link
          to={`/quiz/${opening.id}`}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-chess-gold/10 text-chess-gold font-medium text-sm hover:bg-chess-gold/20 transition-colors"
        >
          Test Yourself
        </Link>
      </div>

      {/* View toggle */}
      <div className="flex gap-1 mb-6 bg-navy-900 rounded-lg p-1 w-fit">
        <button
          onClick={() => setView('checklist')}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
            view === 'checklist'
              ? 'bg-navy-700 text-gray-100'
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          Checklist
        </button>
        <button
          onClick={() => setView('path')}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
            view === 'path'
              ? 'bg-navy-700 text-gray-100'
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          Path
        </button>
      </div>

      {view === 'checklist' ? (
        <div className="space-y-2">
          {lessons.map((lesson) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              openingId={opening.id}
              completed={completedSet.has(lesson.id)}
            />
          ))}
        </div>
      ) : (
        <LessonPath
          lessons={lessons}
          openingId={opening.id}
          completedSet={completedSet}
        />
      )}
    </div>
  )
}
