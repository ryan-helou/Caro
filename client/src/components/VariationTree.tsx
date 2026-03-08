import { Link } from 'react-router-dom'
import type { MoveNode } from '../types'

interface Props {
  tree: MoveNode
  openingId: number
  completedLessons: Set<number>
  lessonIdMap: Map<MoveNode, number>
}

export default function VariationTree({ tree, openingId, completedLessons, lessonIdMap }: Props) {
  return (
    <div className="bg-navy-900 border border-navy-700 rounded-lg p-6 overflow-x-auto">
      <TreeNode node={tree} openingId={openingId} completedLessons={completedLessons} lessonIdMap={lessonIdMap} depth={0} />
    </div>
  )
}

function TreeNode({
  node,
  openingId,
  completedLessons,
  lessonIdMap,
  depth,
}: {
  node: MoveNode
  openingId: number
  completedLessons: Set<number>
  lessonIdMap: Map<MoveNode, number>
  depth: number
}) {
  const isLeaf = node.children.length === 0
  const lessonId = lessonIdMap.get(node)
  const isCompleted = lessonId !== undefined && completedLessons.has(lessonId)

  return (
    <div className={depth > 0 ? 'ml-6 mt-2' : ''}>
      <div className="flex items-center gap-2">
        {depth > 0 && (
          <div className="w-4 border-t border-navy-600" />
        )}
        {isLeaf ? (
          <Link
            to={`/practice/${openingId}?lesson=${lessonId}`}
            className="flex items-center gap-2 group"
          >
            <span className="font-mono text-sm text-gray-300 group-hover:text-chess-green transition-colors">
              {node.san}
            </span>
            {isCompleted ? (
              <span className="w-4 h-4 rounded-full bg-chess-green/20 border border-chess-green flex items-center justify-center">
                <svg className="w-2.5 h-2.5 text-chess-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </span>
            ) : (
              <span className="w-4 h-4 rounded-full border border-navy-500" />
            )}
          </Link>
        ) : (
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm text-gray-300">{node.san}</span>
            {node.variationName && (
              <span className="text-xs text-chess-green/80 font-medium">{node.variationName}</span>
            )}
          </div>
        )}
      </div>

      {node.children.length > 0 && (
        <div className={node.children.length > 1 ? 'border-l border-navy-600 ml-1' : ''}>
          {node.children.map((child, i) => (
            <TreeNode
              key={i}
              node={child}
              openingId={openingId}
              completedLessons={completedLessons}
              lessonIdMap={lessonIdMap}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  )
}
