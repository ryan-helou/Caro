import { useGameStore } from '../stores/gameStore'

export default function MoveList() {
  const { currentPath, chosenVariationName } = useGameStore()

  if (currentPath.length === 0) return null

  const pairs: [string, string?][] = []
  for (let i = 0; i < currentPath.length; i += 2) {
    pairs.push([currentPath[i].san, currentPath[i + 1]?.san])
  }

  return (
    <div className="bg-navy-900 rounded-lg p-4">
      <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
        Moves
      </h3>
      {chosenVariationName && (
        <p className="text-chess-gold text-xs font-medium mb-2">{chosenVariationName}</p>
      )}
      <div className="space-y-1">
        {pairs.map(([white, black], i) => (
          <div key={i} className="flex items-center text-sm font-mono">
            <span className="w-8 text-gray-500">{i + 1}.</span>
            <span className="w-16 px-1 rounded text-chess-green">{white}</span>
            {black && (
              <span className="w-16 px-1 rounded text-chess-green">{black}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
