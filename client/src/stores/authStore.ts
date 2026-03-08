import { create } from 'zustand'

interface AuthState {
  loginKey: string | null
  loading: boolean

  register: (customKey?: string) => Promise<string | null>
  login: (key: string) => Promise<boolean>
  updateKey: (newKey: string) => Promise<string | null>
  logout: () => void
}

export const useAuthStore = create<AuthState>((set, get) => ({
  loginKey: localStorage.getItem('caro-login-key'),
  loading: false,

  register: async (customKey?: string) => {
    set({ loading: true })
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ loginKey: customKey || null }),
      })
      if (!res.ok) {
        const text = await res.text()
        return text.replace(/^"|"$/g, '')
      }
      const data = await res.json()
      localStorage.setItem('caro-login-key', data.loginKey)
      set({ loginKey: data.loginKey })
      return null
    } finally {
      set({ loading: false })
    }
  },

  login: async (key: string) => {
    set({ loading: true })
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ loginKey: key }),
      })
      if (!res.ok) return false
      const data = await res.json()
      localStorage.setItem('caro-login-key', data.loginKey)
      set({ loginKey: data.loginKey })
      return true
    } finally {
      set({ loading: false })
    }
  },

  updateKey: async (newKey: string) => {
    set({ loading: true })
    try {
      const res = await fetch('/api/auth/key', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...authHeaders() },
        body: JSON.stringify({ newKey }),
      })
      if (!res.ok) {
        const text = await res.text()
        return text.replace(/^"|"$/g, '')
      }
      const data = await res.json()
      localStorage.setItem('caro-login-key', data.loginKey)
      set({ loginKey: data.loginKey })
      return null
    } finally {
      set({ loading: false })
    }
  },

  logout: () => {
    localStorage.removeItem('caro-login-key')
    set({ loginKey: null })
  },
}))

/** Get headers with auth key for API calls */
export function authHeaders(): Record<string, string> {
  const key = localStorage.getItem('caro-login-key')
  if (!key) return {}
  return { 'X-Login-Key': key }
}
