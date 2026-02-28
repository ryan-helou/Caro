import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import ChessBoard from '../components/ChessBoard'
import MoveList from '../components/MoveList'
import FeedbackPanel from '../components/FeedbackPanel'
import { useGameStore } from '../stores/gameStore'
import { useProgressStore } from '../stores/progressStore'
import { openings } from '../data/openings'
import type { Opening } from '../types'

export default function Practice() {
  const { id } = useParams<{ id: string }>()
  const { setOpening, opening, isComplete, correctMoves, totalAttempts } = useGameStore()
  const { updateProgress } = useProgressStore()
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    const openingId = Number(id)
    setNotFound(false)

    fetch(`/api/openings/${openingId}`)
      .then((res) => {
        if (!res.ok) throw new Error('not found')
        return res.json()
      })
      .then((data: Opening) => {
        if (data && data.moves) {
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
  }, [id, setOpening])

  // When opening is first set and player is black, auto-play white's first move
  useEffect(() => {
    if (opening?.color === 'black') {
      const { chess, currentMoveIndex } = useGameStore.getState()
      if (currentMoveIndex === 0 && opening.moves.length > 0) {
        chess.move(opening.moves[0])
        useGameStore.setState({ currentMoveIndex: 1, fen: chess.fen() })
      }
    }
  }, [opening])

  // Save progress when complete
  useEffect(() => {
    if (isComplete && opening) {
      const accuracy = totalAttempts > 0 ? Math.round((correctMoves / totalAttempts) * 100) : 0
      // Player moves count: for black, it's the odd-indexed moves; for white, even-indexed
      const playerMoveCount = opening.moves.filter((_, i) =>
        opening.color === 'black' ? i % 2 === 1 : i % 2 === 0
      ).length
      updateProgress(opening.id, accuracy, playerMoveCount)
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
        <Link to="/openings" className="text-sm text-gray-400 hover:text-gray-200 transition-colors">
          &larr; Back to openings
        </Link>
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
        <div className="space-y-4">
          <ChessBoard />
          {/* Feedback below board only on large screens */}
          <div className="hidden lg:block">
            <FeedbackPanel />
          </div>
        </div>
        <div className="space-y-4">
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
