export interface MoveNode {
  san: string
  explanation?: string
  coaching?: string
  variationName?: string
  wrongMoveResponses?: Record<string, string>
  stats?: { white: number; draws: number; black: number; games: number; averageRating: number }
  openingName?: string
  children: MoveNode[]
}

export interface Opening {
  id: number
  name: string
  eco: string
  color: 'white' | 'black'
  tree: MoveNode
}

export interface LessonMeta {
  lessonId: number
  intro: string
  themes: string[]
  whenToPlay: string
}

export interface UserProgress {
  id: number
  openingId: number
  openingName: string
  practiceAccuracy: number
  movesCompleted: number
  lastPracticed: string | null
}

export interface Lesson {
  id: number
  name: string
  path: MoveNode[]
}

export interface MoveValidation {
  correct: boolean
  expectedMove: string
  explanation: string
}
