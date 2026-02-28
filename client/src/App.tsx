import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Landing from './pages/Landing'
import Openings from './pages/Openings'
import Practice from './pages/Practice'
import Profile from './pages/Profile'

export default function App() {
  return (
    <div className="min-h-screen bg-navy-950 text-gray-100 font-sans">
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/openings" element={<Openings />} />
        <Route path="/practice/:id" element={<Practice />} />
        <Route path="/profile" element={<Profile />} />
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
