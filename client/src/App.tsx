import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Landing from './pages/Landing'
import Openings from './pages/Openings'
import Course from './pages/Course'
import Practice from './pages/Practice'
import Quiz from './pages/Quiz'
import Learn from './pages/Learn'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Explorer from './pages/Explorer'
import { useAuthStore } from './stores/authStore'

function RequireAuth({ children }: { children: React.ReactNode }) {
  const loginKey = useAuthStore((s) => s.loginKey)
  if (!loginKey) return <Navigate to="/login" replace />
  return <>{children}</>
}

export default function App() {
  return (
    <div className="min-h-screen bg-navy-900 text-gray-100 font-sans">
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/openings" element={<RequireAuth><Openings /></RequireAuth>} />
        <Route path="/course/:id" element={<RequireAuth><Course /></RequireAuth>} />
        <Route path="/learn/:id" element={<RequireAuth><Learn /></RequireAuth>} />
        <Route path="/practice/:id" element={<RequireAuth><Practice /></RequireAuth>} />
        <Route path="/quiz/:id" element={<RequireAuth><Quiz /></RequireAuth>} />
        <Route path="/explorer/:id" element={<RequireAuth><Explorer /></RequireAuth>} />
        <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
        <Route path="*" element={
          <div className="max-w-3xl mx-auto px-4 py-12 text-center">
            <h1 className="text-2xl font-bold mb-2">Page not found</h1>
            <p className="text-gray-400">That page doesn't exist.</p>
          </div>
        } />
      </Routes>
    </div>
  )
}
