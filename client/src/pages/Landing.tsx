import { Link } from 'react-router-dom'

export default function Landing() {
  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-5xl md:text-6xl font-bold mb-4">
        Master your <span className="text-chess-gold">openings</span>
      </h1>
      <p className="text-lg text-gray-400 max-w-lg mb-8">
        Learn chess openings move by move with interactive practice, instant feedback, and progress tracking.
      </p>
      <div className="flex gap-4">
        <Link
          to="/openings"
          className="px-6 py-3 bg-chess-gold text-navy-950 font-semibold rounded-lg hover:bg-chess-gold/90 transition-colors"
        >
          Start Practicing
        </Link>
        <Link
          to="/profile"
          className="px-6 py-3 border border-navy-700 text-gray-300 rounded-lg hover:bg-navy-900 transition-colors"
        >
          View Progress
        </Link>
      </div>

      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl">
        {[
          { title: 'Move by Move', desc: 'Learn each opening one move at a time with explanations for every key decision.' },
          { title: 'Instant Feedback', desc: 'Get immediate correction when you deviate from the line, with guidance on the right move.' },
          { title: 'Track Progress', desc: 'See your accuracy improve over time as you drill openings until they become second nature.' },
        ].map((f) => (
          <div key={f.title} className="text-left">
            <h3 className="text-chess-green font-semibold mb-2">{f.title}</h3>
            <p className="text-gray-400 text-sm">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
