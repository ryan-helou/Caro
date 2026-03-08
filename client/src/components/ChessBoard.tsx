import { useEffect, useRef, useCallback } from 'react'
import { Chessground } from 'chessground'
import type { Api } from 'chessground/api'
import type { Config } from 'chessground/config'
import type { Key } from 'chessground/types'
import { Chess } from 'chess.js'
import { useGameStore } from '../stores/gameStore'
import { playMove, playWrong } from '../utils/sounds'

const ANIM_DURATION = 300

function toColor(chess: Chess): 'white' | 'black' {
  return chess.turn() === 'w' ? 'white' : 'black'
}

function toDests(chess: Chess): Map<Key, Key[]> {
  const dests = new Map<Key, Key[]>()
  for (const move of chess.moves({ verbose: true })) {
    const from = move.from as Key
    if (!dests.has(from)) dests.set(from, [])
    dests.get(from)!.push(move.to as Key)
  }
  return dests
}

export default function ChessBoard() {
  const boardRef = useRef<HTMLDivElement>(null)
  const apiRef = useRef<Api | null>(null)
  const { chess, opening, fen, tryMove, pendingOpponentMove, playOpponentMove } = useGameStore()

  const playerColor = opening?.color || 'white'

  const updateBoard = useCallback(() => {
    if (!apiRef.current) return
    apiRef.current.set({
      fen,
      turnColor: toColor(chess),
      movable: {
        color: playerColor,
        free: false,
        dests: toDests(chess),
      },
      check: chess.isCheck(),
    })
  }, [fen, chess, playerColor])

  useEffect(() => {
    if (!boardRef.current) return

    const config: Config = {
      fen,
      orientation: playerColor,
      turnColor: toColor(chess),
      movable: {
        color: playerColor,
        free: false,
        dests: toDests(chess),
        events: {
          after: (orig, dest) => {
            const result = tryMove(orig as string, dest as string)
            if (result.correct) {
              playMove()
            } else {
              playWrong()
              setTimeout(() => {
                const state = useGameStore.getState()
                apiRef.current?.set({
                  fen: state.fen,
                  turnColor: toColor(state.chess),
                  movable: {
                    color: playerColor,
                    free: false,
                    dests: toDests(state.chess),
                  },
                  lastMove: undefined,
                })
              }, 700)
            }
          },
        },
      },
      animation: { enabled: true, duration: ANIM_DURATION },
      premovable: { enabled: false },
      draggable: { showGhost: true },
    }

    if (apiRef.current) {
      apiRef.current.set(config)
    } else {
      apiRef.current = Chessground(boardRef.current, config)
    }
  }, [opening])

  // Update board whenever fen changes
  useEffect(() => {
    updateBoard()
  }, [fen, updateBoard])

  // After user's correct move animates, play the opponent's response
  useEffect(() => {
    if (!pendingOpponentMove) return
    const timer = setTimeout(() => {
      playOpponentMove()
      playMove()
    }, ANIM_DURATION + 150)
    return () => clearTimeout(timer)
  }, [pendingOpponentMove, playOpponentMove])

  return (
    <div className="flex justify-center">
      <div
        ref={boardRef}
        className="w-[min(480px,90vw)] h-[min(480px,90vw)]"
      />
    </div>
  )
}
