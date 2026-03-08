import { useEffect, useState, useMemo, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import LessonCard from '../components/LessonCard'
import LessonPath from '../components/LessonPath'
import { extractLessons, groupLessonsByVariation } from '../utils/treeUtils'
import { openings } from '../data/openings'
import { authHeaders } from '../stores/authStore'
import type { Opening } from '../types'

interface LessonProgress {
  completed: number[]
}

export default function Course() {
  const { id } = useParams<{ id: string }>()
  const [opening, setOpening] = useState<Opening | null>(null)
  const [notFound, setNotFound] = useState(false)
  const [view, setView] = useState<'checklist' | 'path'>('checklist')
  const [progress, setProgress] = useState<LessonProgress>({ completed: [] })

  const openingId = Number(id)

  const fetchLessonProgress = useCallback(() => {
    fetch(`/api/progress/lessons/${openingId}`, { headers: authHeaders() })
      .then((res) => (res.ok ? res.json() : []))
      .then((ids: number[]) => setProgress({ completed: ids }))
      .catch(() => {})
  }, [openingId])

  useEffect(() => {
    setNotFound(false)
    const local = openings.find((o) => o.id === openingId)
    if (local) {
      setOpening(local)
    } else {
      setNotFound(true)
    }

    fetchLessonProgress()
  }, [openingId, fetchLessonProgress])

  // Re-fetch progress when window regains focus (user comes back from practice)
  useEffect(() => {
    const handleFocus = () => fetchLessonProgress()
    window.addEventListener('focus', handleFocus)
    return () => window.removeEventListener('focus', handleFocus)
  }, [fetchLessonProgress])

  const lessons = useMemo(() => (opening ? extractLessons(opening.tree) : []), [opening])
  const groups = useMemo(() => groupLessonsByVariation(lessons), [lessons])
  const completedSet = useMemo(() => new Set(progress.completed), [progress])
  const completedCount = progress.completed.length
  const totalCount = lessons.length
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0

  if (notFound) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-2">Opening not found</h1>
        <p className="text-gray-400 mb-4">That opening doesn't exist.</p>
        <Link to="/openings" className="text-chess-green hover:underline">
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
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/openings" className="text-sm text-navy-400 hover:text-navy-200 transition-colors">
          &larr; Back to openings
        </Link>
        <h1 className="text-2xl font-bold mt-2 tracking-tight">{opening.name}</h1>
        <p className="text-navy-400 text-sm mt-1">
          {opening.eco} &middot; Play as {opening.color}
        </p>
      </div>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-navy-300">
            {completedCount}/{totalCount} lessons complete
          </span>
          <span className="text-navy-500 tabular-nums">{progressPercent}%</span>
        </div>
        <div className="h-1.5 bg-navy-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-chess-green rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="mb-6 flex flex-wrap gap-2">
        <Link
          to={`/explorer/${opening.id}`}
          className="px-4 py-2 rounded-lg bg-navy-800 text-navy-200 text-sm hover:bg-navy-700 transition-colors"
        >
          Explorer
        </Link>
        <Link
          to={`/quiz/${opening.id}`}
          className="px-4 py-2 rounded-lg bg-chess-green/15 text-chess-green text-sm font-medium hover:bg-chess-green/25 transition-colors"
        >
          Quiz All
        </Link>
        {groups.map((group) => (
          <Link
            key={group.variation}
            to={`/quiz/${opening.id}?variation=${encodeURIComponent(group.variation)}`}
            className="px-3 py-2 rounded-lg bg-navy-800/60 text-navy-300 text-sm hover:bg-navy-700 transition-colors"
          >
            {group.variation}
          </Link>
        ))}
      </div>

      {/* View toggle */}
      <div className="flex gap-1 mb-6 bg-navy-900 rounded-lg p-1 w-fit">
        <button
          onClick={() => setView('checklist')}
          className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
            view === 'checklist'
              ? 'bg-navy-700 text-gray-100'
              : 'text-navy-400 hover:text-navy-200'
          }`}
        >
          Lessons
        </button>
        <button
          onClick={() => setView('path')}
          className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
            view === 'path'
              ? 'bg-navy-700 text-gray-100'
              : 'text-navy-400 hover:text-navy-200'
          }`}
        >
          Path
        </button>
      </div>

      {view === 'checklist' ? (
        <div className="space-y-6">
          {groups.map((group) => (
            <div key={group.variation}>
              <h2 className="text-sm font-semibold text-navy-300 mb-1 pl-4">{group.variation}</h2>
              <div>
                {group.lessons.map((lesson) => (
                  <LessonCard
                    key={lesson.id}
                    lesson={lesson}
                    openingId={opening.id}
                    completed={completedSet.has(lesson.id)}
                  />
                ))}
              </div>
            </div>
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
