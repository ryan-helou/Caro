import { Link } from 'react-router-dom'
import { useAuthStore } from '../stores/authStore'

export default function Landing() {
  const loginKey = useAuthStore((s) => s.loginKey)

  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex flex-col items-center justify-between px-4 py-16 relative overflow-hidden">
      {/* Decorative board grid background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              'repeating-conic-gradient(#fff 0% 25%, transparent 0% 50%)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Spacer */}
      <div />

      {/* Hero */}
      <div className="relative z-10 text-center max-w-xl">
        <div className="inline-block px-3 py-1 rounded-full bg-chess-green/10 text-chess-green text-xs font-medium tracking-wide uppercase mb-5">
          Opening Repertoire Trainer
        </div>

        <h1 className="text-4xl md:text-5xl font-bold leading-[1.15] mb-4 tracking-tight">
          Stop forgetting
          <br />
          <span className="text-chess-green">your openings.</span>
        </h1>

        <p className="text-base text-navy-300 max-w-md mx-auto mb-8 leading-relaxed">
          Drill every variation until it's muscle memory. Learn, practice, and
          quiz yourself — backed by real game data.
        </p>

        <div className="flex gap-3 justify-center">
          <Link
            to={loginKey ? '/openings' : '/login'}
            className="px-7 py-3 bg-chess-green text-white font-semibold rounded-lg hover:bg-chess-green/85 transition-colors shadow-lg shadow-chess-green/20"
          >
            {loginKey ? 'Continue Training' : 'Get Started'}
          </Link>
          {loginKey && (
            <Link
              to="/profile"
              className="px-5 py-3 bg-navy-800 text-navy-200 rounded-lg hover:bg-navy-700 transition-colors"
            >
              Profile
            </Link>
          )}
        </div>
      </div>

      {/* Features + Footer */}
      <div className="relative z-10 w-full max-w-2xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
          {[
            { title: 'Learn', desc: 'Step through each line with coaching from real opening theory.' },
            { title: 'Practice', desc: 'Play moves on a board. Wrong answers get corrected immediately.' },
            { title: 'Quiz', desc: 'Random positions from all lines. Spaced repetition targets weak spots.' },
          ].map((feature) => (
            <div
              key={feature.title}
              className="bg-navy-800/40 border border-navy-700/40 rounded-lg px-4 py-4"
            >
              <p className="text-gray-100 font-semibold text-sm mb-1">{feature.title}</p>
              <p className="text-navy-400 text-xs leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
        <p className="text-navy-500 text-xs text-center">Created by Ryan Helou</p>
      </div>
    </div>
  )
}
