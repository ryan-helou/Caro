import { Link, useLocation } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home' },
  { to: '/openings', label: 'Openings' },
  { to: '/profile', label: 'Profile' },
]

export default function Navbar() {
  const location = useLocation()

  return (
    <nav className="border-b border-navy-800 bg-navy-950/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-chess-gold tracking-tight">
          Caro
        </Link>
        <div className="flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === link.to || (link.to === '/openings' && (location.pathname.startsWith('/practice') || location.pathname.startsWith('/course') || location.pathname.startsWith('/learn')))
                  ? 'text-chess-gold bg-navy-800'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-navy-900'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
