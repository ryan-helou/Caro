import type { UserProgress } from '../types'

interface Props {
  progress: UserProgress
}

export default function ProgressCard({ progress }: Props) {
  return (
    <div className="bg-navy-900 border border-navy-700 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-gray-100 mb-4">{progress.openingName}</h3>
      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-400">Accuracy</span>
            <span className="text-chess-gold font-medium">{progress.practiceAccuracy}%</span>
          </div>
          <div className="w-full bg-navy-800 rounded-full h-2">
            <div
              className="bg-chess-gold rounded-full h-2 transition-all"
              style={{ width: `${progress.practiceAccuracy}%` }}
            />
          </div>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Moves practiced</span>
          <span className="text-gray-200">{progress.movesCompleted}</span>
        </div>
        {progress.lastPracticed && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Last practiced</span>
            <span className="text-gray-200">
              {new Date(progress.lastPracticed).toLocaleDateString()}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
