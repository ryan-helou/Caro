import { create } from 'zustand'
import { Chess } from 'chess.js'
import type { Opening, MoveValidation } from '../types'

interface GameState {
  fen: string
  chess: Chess
  opening: Opening | null
  currentMoveIndex: number
  feedback: MoveValidation | null
  isComplete: boolean
  correctMoves: number
  totalAttempts: number

  setOpening: (opening: Opening) => void
  tryMove: (from: string, to: string) => MoveValidation
  reset: () => void
}

export const useGameStore = create<GameState>((set, get) => ({
  fen: new Chess().fen(),
  chess: new Chess(),
  opening: null,
  currentMoveIndex: 0,
  feedback: null,
  isComplete: false,
  correctMoves: 0,
  totalAttempts: 0,

  setOpening: (opening) => {
    const chess = new Chess()
    set({
      chess,
      fen: chess.fen(),
      opening,
      currentMoveIndex: 0,
      feedback: null,
      isComplete: false,
      correctMoves: 0,
      totalAttempts: 0,
    })
  },

  tryMove: (from, to) => {
    const { chess, opening, currentMoveIndex, correctMoves, totalAttempts } = get()
    if (!opening) {
      return { correct: false, expectedMove: '', explanation: 'No opening loaded.' }
    }

    const expectedSan = opening.moves[currentMoveIndex]
    const chessCopy = new Chess(chess.fen())

    // Try the user's move
    const moveResult = chessCopy.move({ from, to, promotion: 'q' })
    if (!moveResult) {
      return { correct: false, expectedMove: expectedSan, explanation: 'Illegal move.' }
    }

    const isCorrect = moveResult.san === expectedSan
    const explanation = opening.explanations[expectedSan] || ''

    if (isCorrect) {
      // Apply the user's move
      chess.move({ from, to, promotion: 'q' })
      let newIndex = currentMoveIndex + 1

      // Auto-play opponent's response if there is one
      if (newIndex < opening.moves.length) {
        const opponentSan = opening.moves[newIndex]
        chess.move(opponentSan)
        newIndex++
      }

      const complete = newIndex >= opening.moves.length

      const result: MoveValidation = { correct: true, expectedMove: expectedSan, explanation }
      set({
        fen: chess.fen(),
        currentMoveIndex: newIndex,
        feedback: result,
        isComplete: complete,
        correctMoves: correctMoves + 1,
        totalAttempts: totalAttempts + 1,
      })
      return result
    } else {
      const result: MoveValidation = {
        correct: false,
        expectedMove: expectedSan,
        explanation: explanation || `Expected ${expectedSan}.`,
      }
      set({
        feedback: result,
        totalAttempts: totalAttempts + 1,
      })
      return result
    }
  },

  reset: () => {
    const { opening } = get()
    if (opening) {
      get().setOpening(opening)
    }
  },
}))
