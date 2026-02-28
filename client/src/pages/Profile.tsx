import { useEffect } from 'react'
import ProgressCard from '../components/ProgressCard'
import { useProgressStore } from '../stores/progressStore'

export default function Profile() {
  const { progress, loading, fetchProgress } = useProgressStore()

  useEffect(() => {
    fetchProgress()
  }, [fetchProgress])

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">Your Progress</h1>
      <p className="text-gray-400 mb-8">Track your opening practice across sessions.</p>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : progress.length === 0 ? (
        <div className="bg-navy-900 rounded-xl p-8 text-center">
          <p className="text-gray-400 mb-2">No practice sessions yet.</p>
          <p className="text-gray-500 text-sm">
            Complete a practice run on any opening to see your progress here.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {progress.map((p) => (
            <ProgressCard key={p.id} progress={p} />
          ))}
        </div>
      )}
    </div>
  )
}
