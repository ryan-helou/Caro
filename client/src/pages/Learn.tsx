import { useEffect, useState, useMemo } from 'react'
import { useParams, useSearchParams, Link } from 'react-router-dom'
import { Chess } from 'chess.js'
import StudyBoard from '../components/StudyBoard'
import { openings, lessonMetas } from '../data/openings'
import { extractLessons } from '../utils/treeUtils'
import type { Opening, Lesson, LessonMeta, MoveNode } from '../types'

interface StepState {
  fen: string
  lastMove?: [string, string]
  node: MoveNode | null
  moveIndex: number
}

function buildSteps(lesson: Lesson): StepState[] {
  const chess = new Chess()
  const steps: StepState[] = [
    { fen: chess.fen(), lastMove: undefined, node: null, moveIndex: -1 },
  ]

  for (let i = 0; i < lesson.path.length; i++) {
    const node = lesson.path[i]
    const move = chess.move(node.san)
    steps.push({
      fen: chess.fen(),
      lastMove: move ? [move.from, move.to] : undefined,
      node,
      moveIndex: i,
    })
  }

  return steps
}

export default function Learn() {
  const { id } = useParams<{ id: string }>()
  const [searchParams] = useSearchParams()
  const lessonParam = searchParams.get('lesson')

  const [opening, setOpening] = useState<Opening | null>(null)
  const [lesson, setLesson] = useState<Lesson | null>(null)
  const [meta, setMeta] = useState<LessonMeta | null>(null)
  const [stepIndex, setStepIndex] = useState(0)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    const openingId = Number(id)
    const found = openings.find((o) => o.id === openingId)
    if (!found) {
      setNotFound(true)
      return
    }

    setOpening(found)
    const lessons = extractLessons(found.tree)
    const lessonId = lessonParam !== null ? Number(lessonParam) : 0
    const targetLesson = lessons.find((l) => l.id === lessonId)

    if (targetLesson) {
      setLesson(targetLesson)
      const foundMeta = lessonMetas.find((m) => m.lessonId === lessonId)
      setMeta(foundMeta || null)
    } else {
      setNotFound(true)
    }

    setStepIndex(0)
  }, [id, lessonParam])

  const steps = useMemo(() => {
    if (!lesson) return []
    return buildSteps(lesson)
  }, [lesson])

  const currentStep = steps[stepIndex] || steps[0]

  if (notFound) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-2">Lesson not found</h1>
        <p className="text-gray-400 mb-4">That lesson doesn't exist.</p>
        <Link to="/openings" className="text-chess-gold hover:underline">
          Browse openings
        </Link>
      </div>
    )
  }

  if (!opening || !lesson || steps.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        <p className="text-gray-400">Loading lesson...</p>
      </div>
    )
  }

  const isStart = stepIndex === 0
  const isEnd = stepIndex === steps.length - 1
  const playerColor = opening.color
  // Determine if current step is a player move (for coaching display)
  const isPlayerMove =
    currentStep.node &&
    currentStep.moveIndex >= 0 &&
    (playerColor === 'black' ? currentStep.moveIndex % 2 === 1 : currentStep.moveIndex % 2 === 0)

  const coachingText =
    currentStep.node?.coaching || currentStep.node?.explanation || null

  // Build a human-readable move label
  const moveLabel = currentStep.node
    ? `${Math.floor(currentStep.moveIndex / 2) + 1}${currentStep.moveIndex % 2 === 1 ? '...' : '.'} ${currentStep.node.san}`
    : null

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          to={`/course/${opening.id}`}
          className="text-sm text-gray-400 hover:text-gray-200 transition-colors"
        >
          &larr; Back to course
        </Link>
        <h1 className="text-2xl font-bold mt-2">{lesson.name}</h1>
        <p className="text-gray-400 text-sm">
          {opening.name} &middot; {opening.eco}
        </p>
      </div>

      {/* Intro section */}
      {meta && (
        <div className="bg-navy-900 border border-navy-700 rounded-lg p-5 mb-6">
          <p className="text-gray-200 text-sm leading-relaxed mb-4">{meta.intro}</p>
          <div className="flex flex-wrap gap-2 mb-3">
            {meta.themes.map((theme) => (
              <span
                key={theme}
                className="px-2.5 py-1 bg-chess-gold/15 text-chess-gold text-xs font-medium rounded-full"
              >
                {theme}
              </span>
            ))}
          </div>
          <p className="text-gray-400 text-xs">
            <span className="text-gray-500 font-medium">When to play:</span>{' '}
            {meta.whenToPlay}
          </p>
        </div>
      )}

      {/* Step-through section */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6">
        <div>
          <StudyBoard
            fen={currentStep.fen}
            orientation={playerColor}
            lastMove={currentStep.lastMove}
          />
          {/* Navigation controls */}
          <div className="flex items-center justify-center gap-4 mt-4">
            <button
              onClick={() => setStepIndex(0)}
              disabled={isStart}
              className="px-3 py-2 text-sm rounded-lg bg-navy-800 text-gray-300 hover:bg-navy-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              Start
            </button>
            <button
              onClick={() => setStepIndex((i) => Math.max(0, i - 1))}
              disabled={isStart}
              className="px-4 py-2 text-sm font-medium rounded-lg bg-navy-800 text-gray-200 hover:bg-navy-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              &larr; Back
            </button>
            <span className="text-gray-500 text-sm tabular-nums min-w-[4rem] text-center">
              {stepIndex} / {steps.length - 1}
            </span>
            <button
              onClick={() => setStepIndex((i) => Math.min(steps.length - 1, i + 1))}
              disabled={isEnd}
              className="px-4 py-2 text-sm font-medium rounded-lg bg-navy-800 text-gray-200 hover:bg-navy-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              Next &rarr;
            </button>
            <button
              onClick={() => setStepIndex(steps.length - 1)}
              disabled={isEnd}
              className="px-3 py-2 text-sm rounded-lg bg-navy-800 text-gray-300 hover:bg-navy-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              End
            </button>
          </div>
        </div>

        {/* Coaching sidebar */}
        <div className="space-y-4">
          {isStart ? (
            <div className="bg-navy-900 rounded-lg p-5">
              <p className="text-gray-400 text-sm">
                Step through the moves to see coaching for each position. Use the
                arrow buttons or click Next to begin.
              </p>
            </div>
          ) : (
            <div
              className={`rounded-lg p-5 border ${
                isPlayerMove
                  ? 'bg-chess-gold/10 border-chess-gold/30'
                  : 'bg-navy-900 border-navy-700'
              }`}
            >
              {moveLabel && (
                <p className="font-mono text-chess-gold font-semibold text-lg mb-2">
                  {moveLabel}
                </p>
              )}
              {currentStep.node?.variationName && (
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-2">
                  {currentStep.node.variationName}
                </p>
              )}
              {currentStep.node?.openingName && (
                <p className="text-xs text-gray-500 mb-2">
                  {currentStep.node.openingName}
                </p>
              )}
              {isPlayerMove && coachingText ? (
                <p className="text-gray-200 text-sm leading-relaxed">{coachingText}</p>
              ) : !isPlayerMove && coachingText ? (
                <p className="text-gray-400 text-sm leading-relaxed">{coachingText}</p>
              ) : (
                <p className="text-gray-500 text-sm">
                  {isPlayerMove ? 'Your move.' : "Opponent's move."}
                </p>
              )}
              {currentStep.node?.stats && currentStep.node.stats.games > 0 && (
                <div className="mt-3 pt-3 border-t border-white/10">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs text-gray-500">
                      {currentStep.node.stats.games.toLocaleString()} games
                    </span>
                    <span className="text-xs text-gray-600">·</span>
                    <span className="text-xs text-gray-500">
                      Avg {currentStep.node.stats.averageRating}
                    </span>
                  </div>
                  <div className="flex h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-white"
                      style={{
                        width: `${(currentStep.node.stats.white / currentStep.node.stats.games) * 100}%`,
                      }}
                    />
                    <div
                      className="bg-gray-500"
                      style={{
                        width: `${(currentStep.node.stats.draws / currentStep.node.stats.games) * 100}%`,
                      }}
                    />
                    <div
                      className="bg-gray-900"
                      style={{
                        width: `${(currentStep.node.stats.black / currentStep.node.stats.games) * 100}%`,
                      }}
                    />
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-[10px] text-gray-500">
                      White {Math.round((currentStep.node.stats.white / currentStep.node.stats.games) * 100)}%
                    </span>
                    <span className="text-[10px] text-gray-500">
                      Draw {Math.round((currentStep.node.stats.draws / currentStep.node.stats.games) * 100)}%
                    </span>
                    <span className="text-[10px] text-gray-500">
                      Black {Math.round((currentStep.node.stats.black / currentStep.node.stats.games) * 100)}%
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Start Practice CTA */}
          {isEnd && (
            <Link
              to={`/practice/${opening.id}?lesson=${lesson.id}`}
              className="block w-full text-center px-5 py-3 bg-chess-green text-white rounded-lg hover:bg-chess-green/80 transition-colors text-sm font-semibold"
            >
              Start Practice
            </Link>
          )}

          {!isEnd && (
            <Link
              to={`/practice/${opening.id}?lesson=${lesson.id}`}
              className="block w-full text-center px-5 py-2.5 bg-navy-800 text-gray-400 rounded-lg hover:bg-navy-700 hover:text-gray-200 transition-colors text-sm"
            >
              Skip to Practice
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
