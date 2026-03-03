import { useEffect, useState } from 'react'
import { useParams, useSearchParams, Link } from 'react-router-dom'
import ChessBoard from '../components/ChessBoard'
import MoveList from '../components/MoveList'
import FeedbackPanel from '../components/FeedbackPanel'
import { useGameStore } from '../stores/gameStore'
import { useProgressStore } from '../stores/progressStore'
import { extractLessons } from '../utils/treeUtils'
import { openings } from '../data/openings'
import type { Opening } from '../types'

function saveLessonComplete(openingId: number, lessonId: number) {
  const key = `caro-lessons-${openingId}`
  try {
    const raw = localStorage.getItem(key)
    const data = raw ? JSON.parse(raw) : { completed: [] }
    if (!data.completed.includes(lessonId)) {
      data.completed.push(lessonId)
      localStorage.setItem(key, JSON.stringify(data))
    }
  } catch {
    localStorage.setItem(key, JSON.stringify({ completed: [lessonId] }))
  }
}

export default function Practice() {
  const { id } = useParams<{ id: string }>()
  const [searchParams] = useSearchParams()
  const lessonParam = searchParams.get('lesson')
  const { setOpening, startLesson, opening, isComplete, correctMoves, totalAttempts, currentPath, lesson } =
    useGameStore()
  const { updateProgress } = useProgressStore()
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    const openingId = Number(id)
    setNotFound(false)

    const initOpening = (data: Opening) => {
      if (lessonParam !== null) {
        const lessons = extractLessons(data.tree)
        const targetLesson = lessons.find((l) => l.id === Number(lessonParam))
        if (targetLesson) {
          startLesson(data, targetLesson)
          return
        }
      }
      setOpening(data)
    }

    fetch(`/api/openings/${openingId}`)
      .then((res) => {
        if (!res.ok) throw new Error('not found')
        return res.json()
      })
      .then((data: Opening) => {
        if (data && data.tree) {
          initOpening(data)
        } else {
          throw new Error('invalid')
        }
      })
      .catch(() => {
        const local = openings.find((o) => o.id === openingId)
        if (local) {
          initOpening(local)
        } else {
          setNotFound(true)
        }
      })
  }, [id, lessonParam, setOpening, startLesson])

  // Save progress when complete
  useEffect(() => {
    if (isComplete && opening) {
      const accuracy = totalAttempts > 0 ? Math.round((correctMoves / totalAttempts) * 100) : 0
      // Count player moves: nodes in path that are the player's color
      const playerIsBlack = opening.color === 'black'
      const playerMoveCount = currentPath.filter(
        (_, i) => (playerIsBlack ? i % 2 === 1 : i % 2 === 0)
      ).length
      updateProgress(opening.id, accuracy, playerMoveCount)

      // Save lesson completion
      if (lesson) {
        saveLessonComplete(opening.id, lesson.id)
      }
    }
  }, [isComplete])

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
        <p className="text-gray-400">Loading opening...</p>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-6">
        <div className="flex items-center gap-4">
          <Link
            to={lesson ? `/course/${opening.id}` : '/openings'}
            className="text-sm text-gray-400 hover:text-gray-200 transition-colors"
          >
            &larr; {lesson ? 'Back to course' : 'Back to openings'}
          </Link>
          {lesson && (
            <Link
              to={`/learn/${opening.id}?lesson=${lesson.id}`}
              className="text-sm text-chess-gold/70 hover:text-chess-gold transition-colors"
            >
              Review lesson
            </Link>
          )}
        </div>
        <h1 className="text-2xl font-bold mt-2">{opening.name}</h1>
        <p className="text-gray-400 text-sm">
          {opening.eco} &middot; Play as {opening.color}
        </p>
      </div>

      {/* Feedback visible above board on small screens, hidden on lg (shown in sidebar instead) */}
      <div className="lg:hidden mb-4">
        <FeedbackPanel />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
        <div>
          <ChessBoard />
        </div>
        <div className="space-y-4">
          {/* Feedback in sidebar on lg, above board on small screens */}
          <div className="hidden lg:block">
            <FeedbackPanel />
          </div>
          <MoveList />
          <div className="bg-navy-900 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Stats
            </h3>
            <div className="text-sm space-y-1">
              <div className="flex justify-between">
                <span className="text-gray-400">Correct</span>
                <span className="text-chess-green">{correctMoves}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Attempts</span>
                <span className="text-gray-200">{totalAttempts}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
