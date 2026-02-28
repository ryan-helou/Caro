export interface Opening {
  id: number
  name: string
  eco: string
  color: 'white' | 'black'
  moves: string[]
  explanations: Record<string, string>
}

export interface UserProgress {
  id: number
  openingId: number
  openingName: string
  practiceAccuracy: number
  movesCompleted: number
  lastPracticed: string | null
}

export interface MoveValidation {
  correct: boolean
  expectedMove: string
  explanation: string
}
