import { useEffect, useRef } from 'react'
import { Chessground } from 'chessground'
import type { Api } from 'chessground/api'
import { playMove } from '../utils/sounds'

interface Props {
  fen: string
  orientation: 'white' | 'black'
  lastMove?: [string, string]
}

export default function StudyBoard({ fen, orientation, lastMove }: Props) {
  const boardRef = useRef<HTMLDivElement>(null)
  const apiRef = useRef<Api | null>(null)
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (!boardRef.current) return

    if (apiRef.current) {
      apiRef.current.set({
        fen,
        lastMove: lastMove as [string, string] | undefined,
        animation: { enabled: true, duration: 300 },
      })
      if (lastMove && !isFirstRender.current) {
        playMove()
      }
    } else {
      apiRef.current = Chessground(boardRef.current, {
        fen,
        orientation,
        lastMove: lastMove as [string, string] | undefined,
        viewOnly: true,
        animation: { enabled: true, duration: 300 },
        coordinates: true,
      })
    }
    isFirstRender.current = false
  }, [fen, orientation, lastMove])

  return (
    <div className="flex justify-center">
      <div
        ref={boardRef}
        className="w-[min(480px,90vw)] h-[min(480px,90vw)]"
      />
    </div>
  )
}
