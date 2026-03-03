import { useGameStore } from '../stores/gameStore'

export default function FeedbackPanel() {
  const { feedback, isComplete, correctMoves, totalAttempts, chosenVariationName, currentPath, reset } =
    useGameStore()

  const lastNode = currentPath.length > 0 ? currentPath[currentPath.length - 1] : null
  const stats = lastNode?.stats

  if (isComplete) {
    const accuracy = totalAttempts > 0 ? Math.round((correctMoves / totalAttempts) * 100) : 0
    return (
      <div className="bg-chess-green/20 border border-chess-green/40 rounded-lg p-4">
        <h3 className="text-chess-green font-semibold text-lg mb-2">Opening Complete!</h3>
        {chosenVariationName && (
          <p className="text-chess-gold text-sm font-medium mb-2">{chosenVariationName}</p>
        )}
        <p className="text-gray-300 text-sm mb-1">
          Accuracy: {accuracy}% ({correctMoves}/{totalAttempts} correct)
        </p>
        <button
          onClick={reset}
          className="mt-3 px-4 py-2 bg-chess-green text-white rounded-lg hover:bg-chess-green/80 transition-colors text-sm font-medium"
        >
          Practice Again
        </button>
      </div>
    )
  }

  if (!feedback) {
    return (
      <div className="bg-navy-900 rounded-lg p-4">
        <p className="text-gray-400 text-sm">
          Make your move on the board. Follow the opening line to learn it.
        </p>
      </div>
    )
  }

  return (
    <div
      className={`rounded-lg p-4 border ${
        feedback.correct
          ? 'bg-chess-green/10 border-chess-green/30'
          : 'bg-red-500/10 border-red-500/30'
      }`}
    >
      <div className="mb-2">
        <span className={`font-semibold ${feedback.correct ? 'text-chess-green' : 'text-red-400'}`}>
          {feedback.correct ? 'Correct!' : 'Not quite — try again'}
        </span>
      </div>
      {feedback.explanation && (
        <p className="text-gray-300 text-sm">{feedback.explanation}</p>
      )}
      {!feedback.correct && !feedback.explanation && (
        <p className="text-gray-400 text-sm">
          The right move here is <span className="font-mono text-chess-gold">{feedback.expectedMove}</span>.
        </p>
      )}
      {feedback.correct && stats && stats.games > 0 && (
        <p className="text-gray-500 text-xs mt-2">
          Played in {stats.games.toLocaleString()} games ({Math.round((stats.black / stats.games) * 100)}% win rate for Black)
        </p>
      )}
    </div>
  )
}
