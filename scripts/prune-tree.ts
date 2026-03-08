/**
 * Prunes the Caro-Kann opening tree by removing nodes with fewer than MIN_GAMES.
 * Preserves all manually-added fields (coaching, explanation, wrongMoveResponses, variationName).
 *
 * Usage: npx tsx scripts/prune-tree.ts
 */

import * as fs from 'fs'
import * as path from 'path'

const MIN_GAMES = 5000
const MAX_PLY = 12

const MIN_LINES = 5
const MAX_LINES = 8

interface MoveNode {
  san: string
  stats?: { white: number; draws: number; black: number; games: number; averageRating: number }
  openingName?: string
  variationName?: string
  explanation?: string
  coaching?: string
  wrongMoveResponses?: Record<string, string>
  children: MoveNode[]
}

/**
 * Recursively prune nodes whose stats.games < MIN_GAMES.
 * Returns the pruned node, or null if this node itself should be removed.
 */
function pruneNode(node: MoveNode, depth: number = 0): MoveNode {
  if (depth >= MAX_PLY - 1) {
    return { ...node, children: [] }
  }

  const prunedChildren: MoveNode[] = []

  for (const child of node.children) {
    // Keep the child only if it has enough games (or has no stats, e.g. the root)
    if (!child.stats || child.stats.games >= MIN_GAMES) {
      prunedChildren.push(pruneNode(child, depth + 1))
    }
  }

  return { ...node, children: prunedChildren }
}

/**
 * Collect all leaf paths grouped by variation (first variationName in path).
 */
interface LeafPath {
  variation: string
  path: MoveNode[]
  minGames: number
}

function collectLeafPaths(node: MoveNode, pathSoFar: MoveNode[], firstVariation: string): LeafPath[] {
  const currentPath = [...pathSoFar, node]
  // Use the FIRST variationName encountered — matches how the UI groups lessons
  const variation = firstVariation || node.variationName || ''

  if (node.children.length === 0) {
    const minGames = currentPath.reduce((min, n) => {
      if (n.stats?.games !== undefined && n.stats.games < min) return n.stats.games
      return min
    }, Infinity)
    return [{ variation, path: currentPath, minGames }]
  }

  const leaves: LeafPath[] = []
  for (const child of node.children) {
    leaves.push(...collectLeafPaths(child, currentPath, variation))
  }
  return leaves
}

/**
 * Given a set of allowed leaf paths, rebuild the tree keeping only branches
 * that lead to those leaves.
 */
function rebuildTree(node: MoveNode, allowedPaths: Set<string>, pathSoFar: string[]): MoveNode | null {
  const currentKey = [...pathSoFar, node.san].join(' ')

  if (node.children.length === 0) {
    return allowedPaths.has(currentKey) ? { ...node } : null
  }

  const keptChildren: MoveNode[] = []
  for (const child of node.children) {
    const rebuilt = rebuildTree(child, allowedPaths, [...pathSoFar, node.san])
    if (rebuilt) keptChildren.push(rebuilt)
  }

  if (keptChildren.length === 0) return null
  return { ...node, children: keptChildren }
}

/**
 * Limit the number of lines per variation based on the variation's popularity.
 * More popular variations get more lines (up to MAX_LINES), less popular get fewer (MIN_LINES).
 */
function limitLinesPerVariation(tree: MoveNode): MoveNode {
  const leaves = collectLeafPaths(tree, [], '')

  // Group by variation
  const byVariation = new Map<string, LeafPath[]>()
  for (const leaf of leaves) {
    if (!byVariation.has(leaf.variation)) byVariation.set(leaf.variation, [])
    byVariation.get(leaf.variation)!.push(leaf)
  }

  // Find total games per variation (sum of all leaf minGames as a popularity proxy)
  const variationPopularity = new Map<string, number>()
  for (const [variation, paths] of byVariation) {
    const totalGames = paths.reduce((sum, p) => sum + p.minGames, 0)
    variationPopularity.set(variation, totalGames)
  }

  const popularities = [...variationPopularity.values()]
  const maxPop = Math.max(...popularities)
  const minPop = Math.min(...popularities)

  // Keep only the top N lines per variation, sorted by minGames (most popular first)
  const allowedPaths = new Set<string>()

  for (const [variation, paths] of byVariation) {
    const pop = variationPopularity.get(variation)!
    // Scale linearly between MIN_LINES and MAX_LINES based on popularity
    const ratio = maxPop === minPop ? 1 : (pop - minPop) / (maxPop - minPop)
    const maxLines = Math.round(MIN_LINES + ratio * (MAX_LINES - MIN_LINES))

    const sorted = paths.sort((a, b) => b.minGames - a.minGames)
    const kept = sorted.slice(0, maxLines)

    console.log(`  ${variation}: ${paths.length} lines -> keeping ${kept.length} (limit ${maxLines})`)

    for (const leaf of kept) {
      const key = leaf.path.map((n) => n.san).join(' ')
      allowedPaths.add(key)
    }
  }

  const result = rebuildTree(tree, allowedPaths, [])
  return result ?? tree
}

/**
 * Count total nodes in the tree.
 */
function countNodes(node: MoveNode): number {
  let count = 1
  for (const child of node.children) {
    count += countNodes(child)
  }
  return count
}

/**
 * Serialize a MoveNode, preserving all fields including manually-added ones.
 */
function serializeNode(node: MoveNode, indent: number): string {
  const pad = '  '.repeat(indent)
  const lines: string[] = []

  lines.push(`${pad}{`)
  lines.push(`${pad}  san: '${node.san}',`)

  if (node.stats) {
    lines.push(
      `${pad}  stats: { white: ${node.stats.white}, draws: ${node.stats.draws}, black: ${node.stats.black}, games: ${node.stats.games}, averageRating: ${node.stats.averageRating} },`
    )
  }

  if (node.openingName) {
    lines.push(`${pad}  openingName: '${node.openingName.replace(/'/g, "\\'")}',`)
  }

  if (node.variationName) {
    lines.push(`${pad}  variationName: '${node.variationName.replace(/'/g, "\\'")}',`)
  }

  if (node.explanation) {
    lines.push(`${pad}  explanation:`)
    lines.push(`${pad}    '${node.explanation.replace(/'/g, "\\'")}',`)
  }

  if (node.coaching) {
    lines.push(`${pad}  coaching:`)
    lines.push(`${pad}    '${node.coaching.replace(/'/g, "\\'")}',`)
  }

  if (node.wrongMoveResponses && Object.keys(node.wrongMoveResponses).length > 0) {
    lines.push(`${pad}  wrongMoveResponses: {`)
    for (const [move, response] of Object.entries(node.wrongMoveResponses)) {
      lines.push(
        `${pad}    '${move.replace(/'/g, "\\'")}': '${response.replace(/'/g, "\\'")}',`
      )
    }
    lines.push(`${pad}  },`)
  }

  if (node.children.length === 0) {
    lines.push(`${pad}  children: [],`)
  } else {
    lines.push(`${pad}  children: [`)
    for (const child of node.children) {
      lines.push(serializeNode(child, indent + 2) + ',')
    }
    lines.push(`${pad}  ],`)
  }

  lines.push(`${pad}}`)
  return lines.join('\n')
}

async function main() {
  const openingsPath = path.resolve(
    import.meta.dirname ?? path.dirname(new URL(import.meta.url).pathname),
    '../client/src/data/openings.ts'
  )

  const fileContent = fs.readFileSync(openingsPath, 'utf-8')

  // Extract lessonMetas section
  const lessonMetasMatch = fileContent.match(
    /^(export const lessonMetas: LessonMeta\[\] = \[[\s\S]*)$/m
  )
  const lessonMetasSection = lessonMetasMatch
    ? lessonMetasMatch[1]
    : 'export const lessonMetas: LessonMeta[] = []'

  // Import the existing tree
  const { openings } = await import(openingsPath)
  const tree: MoveNode = openings[0].tree

  const beforeCount = countNodes(tree)
  console.log(`Before pruning: ${beforeCount} nodes`)

  let prunedTree = pruneNode(tree)

  const afterPruneCount = countNodes(prunedTree)
  console.log(`After pruning (MIN_GAMES=${MIN_GAMES}, MAX_PLY=${MAX_PLY}): ${afterPruneCount} nodes`)

  console.log(`\nLimiting lines per variation (${MIN_LINES}-${MAX_LINES}):`)
  prunedTree = limitLinesPerVariation(prunedTree)

  const afterCount = countNodes(prunedTree)
  console.log(`\nFinal: ${afterCount} nodes (removed ${beforeCount - afterCount} total)`)

  // Write back
  const output = `// Generated from Lichess Opening Explorer data (lichess.org/api#tag/Opening-Explorer)
// Re-run \`npx tsx scripts/fetch-lichess-tree.ts\` to refresh from live API
// Stats: rapid+classical games, ratings 2000-2500
// Coaching text added manually after generation
import type { Opening, LessonMeta } from '../types'

export const openings: Opening[] = [
  {
    id: 1,
    name: 'Caro-Kann Defense',
    eco: 'B12',
    color: 'black',
    tree: ${serializeNode(prunedTree, 2)},
  },
]

${lessonMetasSection}
`
  fs.writeFileSync(openingsPath, output, 'utf-8')
  console.log(`Saved to ${openingsPath}`)
  console.log('Done!')
}

main().catch((err) => {
  console.error('Error:', err)
  process.exit(1)
})
