import { useEffect, useState, useRef, useCallback, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Chessground } from 'chessground'
import type { Api } from 'chessground/api'
import type { Config } from 'chessground/config'
import type { Key } from 'chessground/types'
import { Chess } from 'chess.js'
import { extractLessons } from '../utils/treeUtils'
import { openings } from '../data/openings'
import type { Opening, Lesson, MoveNode } from '../types'

function toDests(chess: Chess): Map<Key, Key[]> {
  const dests = new Map<Key, Key[]>()
  for (const move of chess.moves({ verbose: true })) {
    const from = move.from as Key
    if (!dests.has(from)) dests.set(from, [])
    dests.get(from)!.push(move.to as Key)
  }
  return dests
}

function toColor(chess: Chess): 'white' | 'black' {
  return chess.turn() === 'w' ? 'white' : 'black'
}

interface QuizPosition {
  fen: string
  expectedSan: string
  expectedFrom: string
  expectedTo: string
  lessonName: string
  moveIndex: number
}

function generatePosition(opening: Opening, lessons: Lesson[]): QuizPosition | null {
  if (lessons.length === 0) return null

  const playerIsWhite = opening.color === 'white'

  // lesson.path = [move0, move1, move2, ...]
  // path[0] is the first move (e.g. e4 for white openings, e4 for black openings too)
  // For white openings: path[0]=white, path[1]=black, path[2]=white ...
  // For black openings: path[0]=white, path[1]=black, path[2]=white ...
  // Player move indices: white player plays even indices (0,2,4...), black player plays odd indices (1,3,5...)

  const candidates: { lesson: Lesson; answerIndex: number }[] = []
  for (const lesson of lessons) {
    for (let i = 0; i < lesson.path.length; i++) {
      const isPlayerMove = playerIsWhite ? i % 2 === 0 : i % 2 === 1
      if (isPlayerMove) {
        candidates.push({ lesson, answerIndex: i })
      }
    }
  }

  if (candidates.length === 0) return null

  const pick = candidates[Math.floor(Math.random() * candidates.length)]
  const { lesson, answerIndex } = pick

  // Replay all moves before answerIndex to get the board position
  const chess = new Chess()
  for (let i = 0; i < answerIndex; i++) {
    chess.move(lesson.path[i].san)
  }

  const expectedNode = lesson.path[answerIndex]

  // Find from/to for the expected move
  const legalMoves = chess.moves({ verbose: true })
  const match = legalMoves.find((m) => m.san === expectedNode.san)
  if (!match) return null

  return {
    fen: chess.fen(),
    expectedSan: expectedNode.san,
    expectedFrom: match.from,
    expectedTo: match.to,
    lessonName: lesson.name,
    moveIndex: answerIndex,
  }
}

type AnswerState = 'waiting' | 'correct' | 'wrong'

export default function Quiz() {
  const { id } = useParams<{ id: string }>()
  const [opening, setOpening] = useState<Opening | null>(null)
  const [notFound, setNotFound] = useState(false)

  const [position, setPosition] = useState<QuizPosition | null>(null)
  const [answerState, setAnswerState] = useState<AnswerState>('waiting')
  const [score, setScore] = useState({ correct: 0, total: 0 })

  const boardRef = useRef<HTMLDivElement>(null)
  const apiRef = useRef<Api | null>(null)
  const positionRef = useRef<QuizPosition | null>(null)

  const openingId = Number(id)

  // Load opening
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
  }, [openingId])

  const lessons = useMemo(() => (opening ? extractLessons(opening.tree) : []), [opening])

  const loadNewPosition = useCallback(() => {
    if (!opening || lessons.length === 0) return
    const pos = generatePosition(opening, lessons)
    if (!pos) return
    setPosition(pos)
    positionRef.current = pos
    setAnswerState('waiting')
  }, [opening, lessons])

  // Generate first position when opening loads
  useEffect(() => {
    if (opening && lessons.length > 0) {
      loadNewPosition()
    }
  }, [opening, lessons, loadNewPosition])

  const handleMove = useCallback(
    (orig: string, dest: string) => {
      const pos = positionRef.current
      if (!pos) return

      const isCorrect = orig === pos.expectedFrom && dest === pos.expectedTo

      if (isCorrect) {
        setAnswerState('correct')
        setScore((s) => ({ correct: s.correct + 1, total: s.total + 1 }))
      } else {
        setAnswerState('wrong')
        setScore((s) => ({ ...s, total: s.total + 1 }))

        // Snap back the wrong move after a short delay
        setTimeout(() => {
          if (apiRef.current && positionRef.current) {
            const chess = new Chess(positionRef.current.fen)
            apiRef.current.set({
              fen: positionRef.current.fen,
              turnColor: toColor(chess),
              movable: {
                color: opening?.color || 'white',
                free: false,
                dests: toDests(chess),
              },
              lastMove: undefined,
            })
          }
        }, 500)
      }
    },
    [opening]
  )

  // Initialize / update chessground
  useEffect(() => {
    if (!boardRef.current || !position || !opening) return

    const chess = new Chess(position.fen)
    const playerColor = opening.color

    const config: Config = {
      fen: position.fen,
      orientation: playerColor,
      turnColor: toColor(chess),
      movable: {
        color: playerColor,
        free: false,
        dests: toDests(chess),
        events: {
          after: handleMove,
        },
      },
      animation: { enabled: true, duration: 300 },
      premovable: { enabled: false },
      draggable: { showGhost: true },
    }

    if (apiRef.current) {
      apiRef.current.set(config)
    } else {
      apiRef.current = Chessground(boardRef.current, config)
    }
  }, [position, opening, handleMove])

  // Disable interaction after answering
  useEffect(() => {
    if (answerState !== 'waiting' && apiRef.current) {
      apiRef.current.set({
        movable: { color: undefined, dests: new Map() },
      })

      // Show the correct move with an arrow if wrong
      if (answerState === 'correct' && position) {
        apiRef.current.set({
          lastMove: [position.expectedFrom as Key, position.expectedTo as Key],
        })
      }
    }
  }, [answerState, position])

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
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          to={`/course/${opening.id}`}
          className="text-sm text-gray-400 hover:text-gray-200 transition-colors"
        >
          &larr; Back to course
        </Link>
        <h1 className="text-2xl font-bold mt-2">{opening.name}</h1>
        <p className="text-gray-400 text-sm">
          {opening.eco} &middot; Quiz Mode
        </p>
      </div>

      {/* Quiz panel visible above board on small screens */}
      <div className="lg:hidden mb-4">
        <QuizPanel
          answerState={answerState}
          position={position}
          score={score}
          onNext={loadNewPosition}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
        <div className="flex justify-center">
          <div
            ref={boardRef}
            className="w-[min(480px,90vw)] h-[min(480px,90vw)]"
          />
        </div>
        <div className="space-y-4">
          {/* Quiz panel in sidebar on lg */}
          <div className="hidden lg:block">
            <QuizPanel
              answerState={answerState}
              position={position}
              score={score}
              onNext={loadNewPosition}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function QuizPanel({
  answerState,
  position,
  score,
  onNext,
}: {
  answerState: AnswerState
  position: QuizPosition | null
  score: { correct: number; total: number }
  onNext: () => void
}) {
  return (
    <div className="bg-navy-900 rounded-lg p-4 space-y-4">
      {/* Score */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-400 font-medium uppercase tracking-wider">Score</span>
        <span className="text-gray-200 font-mono">
          <span className="text-chess-green">{score.correct}</span>
          <span className="text-gray-500"> / </span>
          <span>{score.total}</span>
        </span>
      </div>

      {/* Feedback */}
      {answerState === 'waiting' && (
        <div className="text-center py-2">
          <p className="text-gray-300 font-medium">What's the best move here?</p>
          <p className="text-gray-500 text-sm mt-1">Make your move on the board</p>
        </div>
      )}

      {answerState === 'correct' && position && (
        <div className="space-y-3">
          <div className="bg-chess-green/10 border border-chess-green/30 rounded-lg p-3 text-center">
            <p className="text-chess-green font-semibold">Correct!</p>
            <p className="text-gray-300 text-sm mt-1">{position.expectedSan}</p>
          </div>
          <div className="text-xs text-gray-500">
            <span className="text-gray-400">From:</span> {position.lessonName}
          </div>
          <button
            onClick={onNext}
            className="w-full py-2 rounded-lg bg-chess-green/20 text-chess-green font-medium hover:bg-chess-green/30 transition-colors"
          >
            Next
          </button>
        </div>
      )}

      {answerState === 'wrong' && position && (
        <div className="space-y-3">
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-center">
            <p className="text-red-400 font-semibold">Incorrect</p>
            <p className="text-gray-300 text-sm mt-1">
              Expected: <span className="font-mono font-semibold">{position.expectedSan}</span>
            </p>
          </div>
          <div className="text-xs text-gray-500">
            <span className="text-gray-400">From:</span> {position.lessonName}
          </div>
          <button
            onClick={onNext}
            className="w-full py-2 rounded-lg bg-navy-700 text-gray-200 font-medium hover:bg-navy-600 transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}
