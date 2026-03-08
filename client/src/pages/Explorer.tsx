import { useEffect, useState, useMemo, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Chess } from 'chess.js'
import StudyBoard from '../components/StudyBoard'
import { openings } from '../data/openings'
import type { Opening, MoveNode } from '../types'

interface BreadcrumbEntry {
  node: MoveNode
  moveIndex: number
}

function moveLabel(moveIndex: number, san: string): string {
  const moveNum = Math.floor(moveIndex / 2) + 1
  const isBlack = moveIndex % 2 === 1
  return `${moveNum}${isBlack ? '...' : '.'} ${san}`
}

export default function Explorer() {
  const { id } = useParams<{ id: string }>()
  const [opening, setOpening] = useState<Opening | null>(null)
  const [notFound, setNotFound] = useState(false)
  const [path, setPath] = useState<BreadcrumbEntry[]>([])

  const openingId = Number(id)

  useEffect(() => {
    const found = openings.find((o) => o.id === openingId)
    if (found) {
      setOpening(found)
      setPath([])
    } else {
      setNotFound(true)
    }
  }, [openingId])

  const currentNode = useMemo(() => {
    if (!opening) return null
    if (path.length === 0) return opening.tree
    return path[path.length - 1].node
  }, [opening, path])

  const { fen, lastMove } = useMemo(() => {
    if (!opening) return { fen: 'start', lastMove: undefined }
    const chess = new Chess()
    let lm: [string, string] | undefined
    for (const entry of path) {
      const move = chess.move(entry.node.san)
      if (move) lm = [move.from, move.to]
    }
    return { fen: chess.fen(), lastMove: lm }
  }, [opening, path])

  const playerColor = opening?.color || 'black'

  const selectChild = useCallback(
    (child: MoveNode) => {
      const nextIndex = path.length
      setPath((prev) => [...prev, { node: child, moveIndex: nextIndex }])
    },
    [path.length]
  )

  const goToDepth = useCallback((depth: number) => {
    setPath((prev) => prev.slice(0, depth))
  }, [])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setPath((prev) => prev.slice(0, Math.max(0, prev.length - 1)))
      } else if (e.key === 'ArrowRight' && currentNode && currentNode.children.length > 0) {
        selectChild(currentNode.children[0])
      }
    },
    [currentNode, selectChild]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  if (notFound) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-2">Opening not found</h1>
        <Link to="/openings" className="text-chess-green hover:underline">Browse openings</Link>
      </div>
    )
  }

  if (!opening || !currentNode) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        <p className="text-gray-400">Loading...</p>
      </div>
    )
  }

  const isPlayerMove = playerColor === 'black' ? path.length % 2 === 1 : path.length % 2 === 0
  const coachingText = currentNode.coaching || currentNode.explanation || null

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          to={`/course/${opening.id}`}
          className="text-sm text-gray-400 hover:text-gray-200 transition-colors"
        >
          &larr; Back to course
        </Link>
        <h1 className="text-2xl font-bold mt-2">{opening.name} Explorer</h1>
        <p className="text-gray-400 text-sm">
          Click branches to explore. Arrow keys to navigate.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-6">
        <div>
          <StudyBoard fen={fen} orientation={playerColor} lastMove={lastMove} />
        </div>

        <div className="flex flex-col gap-4">
          {/* Breadcrumb */}
          <div className="flex flex-wrap items-center gap-1 text-sm">
            <button
              onClick={() => goToDepth(0)}
              className={`px-2 py-1 rounded font-mono ${
                path.length === 0
                  ? 'bg-chess-green/20 text-chess-green'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              Start
            </button>
            {path.map((entry, i) => (
              <button
                key={i}
                onClick={() => goToDepth(i + 1)}
                className={`px-2 py-1 rounded font-mono ${
                  i === path.length - 1
                    ? 'bg-chess-green/20 text-chess-green'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                {moveLabel(entry.moveIndex, entry.node.san)}
              </button>
            ))}
          </div>

          {/* Current position info */}
          <div
            className={`rounded-lg p-5 border flex-1 ${
              path.length === 0
                ? 'bg-navy-900 border-navy-700'
                : isPlayerMove
                  ? 'bg-chess-green/10 border-chess-green/30'
                  : 'bg-navy-900 border-navy-700'
            }`}
          >
            {path.length > 0 && (
              <p className="font-mono text-chess-green font-semibold text-lg mb-2">
                {moveLabel(path[path.length - 1].moveIndex, currentNode.san)}
              </p>
            )}

            {currentNode.variationName && (
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-2">
                {currentNode.variationName}
              </p>
            )}

            {currentNode.openingName && (
              <p className="text-xs text-gray-500 mb-2">{currentNode.openingName}</p>
            )}

            {coachingText ? (
              <p className="text-gray-200 text-sm leading-relaxed mb-3">{coachingText}</p>
            ) : path.length === 0 ? (
              <p className="text-gray-400 text-sm mb-3">
                Starting position. Choose a move below to begin exploring.
              </p>
            ) : (
              <p className="text-gray-500 text-sm mb-3">
                {isPlayerMove ? 'Your move.' : "Opponent's move."}
              </p>
            )}

            {currentNode.stats && currentNode.stats.games > 0 && (
              <div className="pt-3 border-t border-white/10">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs text-gray-500">
                    {currentNode.stats.games.toLocaleString()} games
                  </span>
                  <span className="text-xs text-gray-600">&middot;</span>
                  <span className="text-xs text-gray-500">
                    Avg {currentNode.stats.averageRating}
                  </span>
                </div>
                <div className="flex h-2 rounded-full overflow-hidden">
                  <div className="bg-white" style={{ width: `${(currentNode.stats.white / currentNode.stats.games) * 100}%` }} />
                  <div className="bg-gray-500" style={{ width: `${(currentNode.stats.draws / currentNode.stats.games) * 100}%` }} />
                  <div className="bg-gray-900" style={{ width: `${(currentNode.stats.black / currentNode.stats.games) * 100}%` }} />
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-[10px] text-gray-500">White {Math.round((currentNode.stats.white / currentNode.stats.games) * 100)}%</span>
                  <span className="text-[10px] text-gray-500">Draw {Math.round((currentNode.stats.draws / currentNode.stats.games) * 100)}%</span>
                  <span className="text-[10px] text-gray-500">Black {Math.round((currentNode.stats.black / currentNode.stats.games) * 100)}%</span>
                </div>
              </div>
            )}
          </div>

          {/* Children / branches */}
          {currentNode.children.length > 0 && (
            <div>
              <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                {currentNode.children.length === 1 ? 'Next Move' : `${currentNode.children.length} Branches`}
              </h3>
              <div className="space-y-1.5">
                {currentNode.children.map((child, i) => {
                  const childMoveIndex = path.length
                  const pct = child.stats && currentNode.stats
                    ? Math.round((child.stats.games / currentNode.children.reduce((s, c) => s + (c.stats?.games ?? 0), 0)) * 100)
                    : null
                  return (
                    <button
                      key={i}
                      onClick={() => selectChild(child)}
                      className="w-full flex items-center gap-3 bg-navy-800 border border-navy-700 rounded-lg px-4 py-3 hover:border-chess-green/50 transition-colors text-left group"
                    >
                      <span className="font-mono font-semibold text-chess-green text-sm">
                        {moveLabel(childMoveIndex, child.san)}
                      </span>
                      {child.variationName && (
                        <span className="text-xs text-gray-500 truncate">{child.variationName}</span>
                      )}
                      {child.openingName && !child.variationName && (
                        <span className="text-xs text-gray-600 truncate">{child.openingName}</span>
                      )}
                      <span className="ml-auto flex items-center gap-2 flex-shrink-0">
                        {pct !== null && (
                          <span className="text-[10px] text-gray-600">{pct}%</span>
                        )}
                        {child.stats && (
                          <span className="text-[10px] text-gray-600">
                            {child.stats.games.toLocaleString()}
                          </span>
                        )}
                        <span className="text-gray-600 group-hover:text-chess-green transition-colors">&rarr;</span>
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {currentNode.children.length === 0 && path.length > 0 && (
            <div className="text-center py-4">
              <p className="text-gray-500 text-sm">End of line</p>
              <button
                onClick={() => goToDepth(0)}
                className="text-chess-green text-sm hover:underline mt-1"
              >
                Back to start
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
