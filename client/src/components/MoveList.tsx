import { useGameStore } from '../stores/gameStore'

export default function MoveList() {
  const { opening, currentMoveIndex } = useGameStore()

  if (!opening) return null

  const moves = opening.moves
  const pairs: [string, string?][] = []
  for (let i = 0; i < moves.length; i += 2) {
    pairs.push([moves[i], moves[i + 1]])
  }

  return (
    <div className="bg-navy-900 rounded-lg p-4">
      <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
        Moves
      </h3>
      <div className="space-y-1">
        {pairs.map(([white, black], i) => {
          const whiteIdx = i * 2
          const blackIdx = i * 2 + 1
          return (
            <div key={i} className="flex items-center text-sm font-mono">
              <span className="w-8 text-gray-500">{i + 1}.</span>
              <span
                className={`w-16 px-1 rounded ${
                  whiteIdx < currentMoveIndex
                    ? 'text-chess-green'
                    : whiteIdx === currentMoveIndex
                    ? 'text-chess-gold font-bold'
                    : 'text-gray-500'
                }`}
              >
                {white}
              </span>
              {black && (
                <span
                  className={`w-16 px-1 rounded ${
                    blackIdx < currentMoveIndex
                      ? 'text-chess-green'
                      : blackIdx === currentMoveIndex
                      ? 'text-chess-gold font-bold'
                      : 'text-gray-500'
                  }`}
                >
                  {black}
                </span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
