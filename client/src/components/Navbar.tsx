import { Link, useLocation } from 'react-router-dom'
import { useAuthStore } from '../stores/authStore'

export default function Navbar() {
  const location = useLocation()
  const loginKey = useAuthStore((s) => s.loginKey)

  const isActive = (to: string) =>
    location.pathname === to ||
    (to === '/openings' &&
      ['/practice', '/course', '/learn', '/quiz', '/explorer'].some((p) =>
        location.pathname.startsWith(p)
      ))

  return (
    <nav className="border-b border-navy-700 sticky top-0 z-50 bg-navy-950/95 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="text-lg font-bold text-chess-green tracking-tight">
          Caro
        </Link>
        <div className="flex items-center gap-1">
          {loginKey ? (
            <>
              <Link
                to="/openings"
                className={`px-3 py-1.5 rounded-md text-sm transition-colors ${isActive('/openings') ? 'text-gray-100 bg-navy-800' : 'text-navy-300 hover:text-gray-100 hover:bg-navy-800/50'}`}
              >
                Openings
              </Link>
              <Link
                to="/profile"
                className={`px-3 py-1.5 rounded-md text-sm transition-colors ${isActive('/profile') ? 'text-gray-100 bg-navy-800' : 'text-navy-300 hover:text-gray-100 hover:bg-navy-800/50'}`}
              >
                Profile
              </Link>
            </>
          ) : (
            <Link
              to="/login"
              className={`px-3 py-1.5 rounded-md text-sm transition-colors ${isActive('/login') ? 'text-gray-100 bg-navy-800' : 'text-navy-300 hover:text-gray-100 hover:bg-navy-800/50'}`}
            >
              Log in
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
