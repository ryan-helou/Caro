import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../stores/authStore'

export default function Login() {
  const [key, setKey] = useState('')
  const [customKey, setCustomKey] = useState('')
  const [error, setError] = useState('')
  const [registerError, setRegisterError] = useState('')
  const { register, login, loading } = useAuthStore()
  const navigate = useNavigate()

  const handleLogin = async () => {
    setError('')
    const success = await login(key.trim())
    if (success) {
      navigate('/')
    } else {
      setError('Invalid login key')
    }
  }

  const handleRegister = async (withCustomKey: boolean) => {
    setRegisterError('')
    const err = await register(withCustomKey ? customKey.trim() : undefined)
    if (err) {
      setRegisterError(err)
    } else {
      navigate('/')
    }
  }

  return (
    <div className="max-w-sm mx-auto px-4 py-24">
      <h1 className="text-lg font-semibold mb-1 tracking-tight">Log in</h1>
      <p className="text-navy-400 text-sm mb-8">
        No email or password. Just a key.
      </p>

      <div className="space-y-6">
        <div>
          <input
            type="text"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && key.trim() && handleLogin()}
            placeholder="Your login key"
            className="w-full bg-transparent text-gray-200 rounded-md px-3 py-2.5 border border-navy-700 focus:outline-none focus:border-navy-500 font-mono text-sm tracking-wider placeholder:text-navy-600"
          />
          {error && <p className="text-red-400 text-xs mt-1.5">{error}</p>}
          <button
            onClick={handleLogin}
            disabled={loading || !key.trim()}
            className="w-full mt-3 py-2.5 rounded-md bg-chess-green text-white font-medium text-sm hover:bg-chess-green/90 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            Log in
          </button>
        </div>

        <div className="h-px bg-navy-800" />

        <div>
          <p className="text-xs text-navy-400 mb-3">
            New here? Pick a key or get a random one.
          </p>
          <input
            type="text"
            value={customKey}
            onChange={(e) => setCustomKey(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && customKey.trim() && handleRegister(true)}
            placeholder="Choose your key (min 4 chars)"
            className="w-full bg-transparent text-gray-200 rounded-md px-3 py-2.5 border border-navy-700 focus:outline-none focus:border-navy-500 font-mono text-sm tracking-wider placeholder:text-navy-600 mb-3"
          />
          {registerError && <p className="text-red-400 text-xs mb-2">{registerError}</p>}
          <div className="flex gap-2">
            <button
              onClick={() => handleRegister(true)}
              disabled={loading || !customKey.trim()}
              className="flex-1 py-2.5 rounded-md bg-navy-800 text-navy-300 text-sm hover:bg-navy-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              Use this key
            </button>
            <button
              onClick={() => handleRegister(false)}
              disabled={loading}
              className="flex-1 py-2.5 rounded-md bg-navy-800 text-navy-300 text-sm hover:bg-navy-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              Random
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
