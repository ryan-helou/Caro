import { create } from 'zustand'
import { Chess } from 'chess.js'
import type { Opening, MoveNode, MoveValidation, Lesson } from '../types'

interface GameState {
  fen: string
  chess: Chess
  opening: Opening | null
  currentPath: MoveNode[]
  chosenVariationName: string | null
  feedback: MoveValidation | null
  isComplete: boolean
  correctMoves: number
  totalAttempts: number
  pendingOpponentMove: boolean
  lesson: Lesson | null

  setOpening: (opening: Opening) => void
  startLesson: (opening: Opening, lesson: Lesson) => void
  tryMove: (from: string, to: string) => MoveValidation
  playOpponentMove: () => void
  reset: () => void
}

export const useGameStore = create<GameState>((set, get) => ({
  fen: new Chess().fen(),
  chess: new Chess(),
  opening: null,
  currentPath: [],
  chosenVariationName: null,
  feedback: null,
  isComplete: false,
  correctMoves: 0,
  totalAttempts: 0,
  pendingOpponentMove: false,
  lesson: null,

  setOpening: (opening) => {
    const chess = new Chess()
    const currentPath: MoveNode[] = []
    let chosenVariationName: string | null = null

    // If player is black, auto-play White's first move (the root node)
    if (opening.color === 'black' && opening.tree) {
      const root = opening.tree
      chess.move(root.san)
      currentPath.push(root)
      if (root.variationName) {
        chosenVariationName = root.variationName
      }
    }

    set({
      chess,
      fen: chess.fen(),
      opening,
      currentPath,
      chosenVariationName,
      feedback: null,
      isComplete: false,
      correctMoves: 0,
      totalAttempts: 0,
      pendingOpponentMove: false,
      lesson: null,
    })
  },

  startLesson: (opening, lesson) => {
    const chess = new Chess()
    const currentPath: MoveNode[] = []
    let chosenVariationName: string | null = null

    // If player is black, auto-play White's first move (the root of the lesson path)
    if (opening.color === 'black' && lesson.path.length > 0) {
      const root = lesson.path[0]
      chess.move(root.san)
      currentPath.push(root)
      if (root.variationName) {
        chosenVariationName = root.variationName
      }
    }

    set({
      chess,
      fen: chess.fen(),
      opening,
      currentPath,
      chosenVariationName,
      feedback: null,
      isComplete: false,
      correctMoves: 0,
      totalAttempts: 0,
      pendingOpponentMove: false,
      lesson,
    })
  },

  tryMove: (from, to) => {
    const { chess, opening, currentPath, correctMoves, totalAttempts, lesson } = get()
    if (!opening) {
      return { correct: false, expectedMove: '', explanation: 'No opening loaded.' }
    }

    // Determine the expected node
    let expectedNode: MoveNode | undefined

    if (lesson) {
      // In lesson mode, follow the fixed lesson path
      const nextIndex = currentPath.length
      if (nextIndex >= lesson.path.length) {
        return { correct: false, expectedMove: '', explanation: 'Line is complete.' }
      }
      expectedNode = lesson.path[nextIndex]
    } else {
      // Random mode: last node in path, or root
      const lastNode = currentPath.length === 0 ? opening.tree : currentPath[currentPath.length - 1]
      if (lastNode.children.length === 0) {
        return { correct: false, expectedMove: '', explanation: 'Line is complete.' }
      }
      expectedNode = lastNode.children[0]
    }
    const expectedSan = expectedNode.san

    const chessCopy = new Chess(chess.fen())
    const moveResult = chessCopy.move({ from, to, promotion: 'q' })
    if (!moveResult) {
      return { correct: false, expectedMove: expectedSan, explanation: 'Illegal move.' }
    }

    const isCorrect = moveResult.san === expectedSan
    const explanation = expectedNode.explanation || ''

    if (isCorrect) {
      chess.move({ from, to, promotion: 'q' })
      const newPath = [...currentPath, expectedNode]
      const hasMore = expectedNode.children.length > 0

      // Track variation name
      let varName = get().chosenVariationName
      if (expectedNode.variationName) {
        varName = varName ? `${varName} — ${expectedNode.variationName}` : expectedNode.variationName
      }

      const result: MoveValidation = { correct: true, expectedMove: expectedSan, explanation }
      set({
        fen: chess.fen(),
        currentPath: newPath,
        chosenVariationName: varName,
        feedback: result,
        isComplete: !hasMore,
        correctMoves: correctMoves + 1,
        totalAttempts: totalAttempts + 1,
        pendingOpponentMove: hasMore,
      })
      return result
    } else {
      // Check for specific wrong-move coaching
      const wrongCoaching = expectedNode.wrongMoveResponses?.[moveResult.san]
      const result: MoveValidation = {
        correct: false,
        expectedMove: expectedSan,
        explanation: wrongCoaching || explanation || `Expected ${expectedSan}.`,
      }
      set({
        feedback: result,
        totalAttempts: totalAttempts + 1,
      })
      return result
    }
  },

  playOpponentMove: () => {
    const { chess, opening, currentPath, lesson } = get()
    if (!opening) return

    // If path is empty, we need to play the root node first (e.g. 1.e4)
    if (currentPath.length === 0) {
      const root = opening.tree
      chess.move(root.san)

      let varName = get().chosenVariationName
      if (root.variationName) {
        varName = varName ? `${varName} — ${root.variationName}` : root.variationName
      }

      set({
        fen: chess.fen(),
        currentPath: [root],
        chosenVariationName: varName,
        isComplete: root.children.length === 0,
        pendingOpponentMove: false,
      })
      return
    }

    const lastNode = currentPath[currentPath.length - 1]
    if (lastNode.children.length === 0) return

    let chosen: MoveNode

    if (lesson) {
      // In lesson mode, follow the fixed lesson path
      const nextIndex = currentPath.length
      if (nextIndex >= lesson.path.length) return
      chosen = lesson.path[nextIndex]
    } else {
      // Opponent nodes can have multiple children — pick one randomly
      chosen = lastNode.children[Math.floor(Math.random() * lastNode.children.length)]
    }
    chess.move(chosen.san)
    const newPath = [...currentPath, chosen]
    const complete = chosen.children.length === 0

    // Track variation name
    let varName = get().chosenVariationName
    if (chosen.variationName) {
      varName = varName ? `${varName} — ${chosen.variationName}` : chosen.variationName
    }

    set({
      fen: chess.fen(),
      currentPath: newPath,
      chosenVariationName: varName,
      isComplete: complete,
      pendingOpponentMove: false,
    })
  },

  reset: () => {
    const { opening, lesson } = get()
    if (opening) {
      if (lesson) {
        get().startLesson(opening, lesson)
      } else {
        get().setOpening(opening)
      }
    }
  },
}))
