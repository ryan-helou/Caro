import { create } from 'zustand'
import type { UserProgress } from '../types'
import { authHeaders } from './authStore'

interface ProgressState {
  progress: UserProgress[]
  loading: boolean

  fetchProgress: () => Promise<void>
  updateProgress: (openingId: number, accuracy: number, movesCompleted: number) => Promise<void>
}

export const useProgressStore = create<ProgressState>((set, get) => ({
  progress: [],
  loading: false,

  fetchProgress: async () => {
    set({ loading: true })
    try {
      const res = await fetch('/api/progress', { headers: authHeaders() })
      if (res.ok) {
        const data = await res.json()
        set({ progress: data })
      }
    } catch {
      // silently fail, progress will be empty
    } finally {
      set({ loading: false })
    }
  },

  updateProgress: async (openingId, accuracy, movesCompleted) => {
    try {
      await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeaders() },
        body: JSON.stringify({
          openingId,
          practiceAccuracy: accuracy,
          movesCompleted,
        }),
      })
      // Refresh progress after update
      await get().fetchProgress()
    } catch {
      // silently fail
    }
  },
}))
