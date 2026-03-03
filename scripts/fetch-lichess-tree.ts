/**
 * Fetches the Caro-Kann opening tree from the Lichess Explorer API
 * and writes it to client/src/data/openings.ts
 *
 * Usage: npx tsx scripts/fetch-lichess-tree.ts
 */

import * as fs from 'fs'
import * as path from 'path'

const API_BASE = 'https://explorer.lichess.org/lichess'
const DELAY_MS = 2000
const MIN_GAMES = 1000
const MAX_DEPTH = 12

// Starting FEN: after 1.e4 (Black to move)
const START_FEN = 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1'

interface LichessMove {
  san: string
  uci: string
  white: number
  draws: number
  black: number
  averageRating: number
}

interface LichessResponse {
  moves: LichessMove[]
  opening?: { eco: string; name: string }
}

interface TreeNode {
  san: string
  stats: { white: number; draws: number; black: number; games: number; averageRating: number }
  openingName?: string
  variationName?: string
  children: TreeNode[]
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function fetchPosition(fen: string, retries = 5): Promise<LichessResponse> {
  const params = new URLSearchParams({
    variant: 'standard',
    speeds: 'rapid,classical',
    ratings: '2000,2200,2500',
    fen,
  })

  const url = `${API_BASE}?${params}`
  const shortFen = fen.split(' ')[0].slice(0, 30)
  console.log(`  Fetching: ${shortFen}...`)

  for (let attempt = 0; attempt <= retries; attempt++) {
    if (attempt > 0) {
      const wait = 10000 * attempt
      console.log(`  Retry ${attempt}/${retries}, waiting ${wait / 1000}s...`)
      await sleep(wait)
    }
    const res = await fetch(url)
    if (res.ok) {
      return res.json() as Promise<LichessResponse>
    }
    if (res.status === 429 && attempt < retries) {
      continue
    }
    throw new Error(`Lichess API error: ${res.status} ${res.statusText}`)
  }
  throw new Error('Unreachable')
}

function totalGames(m: LichessMove): number {
  return m.white + m.draws + m.black
}

/**
 * Recursively builds the tree.
 * - depth is in plies from our starting position (after 1.e4)
 * - Even depth = Black to move (player), Odd depth = White to move (opponent)
 *   (since we start from Black's perspective after 1.e4)
 */
async function buildTree(
  fen: string,
  depth: number,
  chessModule: typeof import('chess.js')
): Promise<TreeNode[]> {
  if (depth >= MAX_DEPTH) return []

  const data = await fetchPosition(fen)
  if (data.moves.length === 0) return []

  // Sort by total games descending
  const sorted = data.moves
    .map((m) => ({ ...m, total: totalGames(m) }))
    .sort((a, b) => b.total - a.total)
    .filter((m) => m.total >= MIN_GAMES)

  if (sorted.length === 0) return []

  const isPlayerMove = depth % 2 === 0 // depth 0 = Black's first move (c6)

  // Player moves: pick the single most popular
  // Opponent moves: pick top 3 (if they have enough games)
  const picked = isPlayerMove ? sorted.slice(0, 1) : sorted.slice(0, 3)

  const nodes: TreeNode[] = []

  for (const move of picked) {
    await sleep(DELAY_MS)

    // Make the move to get the new FEN
    const chess = new chessModule.Chess(fen)
    const result = chess.move(move.san)
    if (!result) {
      console.warn(`  Skipping invalid move: ${move.san}`)
      continue
    }

    const newFen = chess.fen()

    // Fetch the new position to get the opening name
    const posData = await fetchPosition(newFen)
    const openingName = posData.opening?.name

    const node: TreeNode = {
      san: move.san,
      stats: {
        white: move.white,
        draws: move.draws,
        black: move.black,
        games: move.total,
        averageRating: move.averageRating,
      },
      openingName,
      children: [],
    }

    // Recurse — use posData.moves to check if we should continue
    // (we already have the data, so build children from the next level)
    node.children = await buildChildrenFromData(
      posData,
      newFen,
      depth + 1,
      chessModule
    )

    nodes.push(node)
  }

  return nodes
}

/**
 * Build children from already-fetched position data (avoids double-fetching)
 */
async function buildChildrenFromData(
  data: LichessResponse,
  fen: string,
  depth: number,
  chessModule: typeof import('chess.js')
): Promise<TreeNode[]> {
  if (depth >= MAX_DEPTH) return []
  if (data.moves.length === 0) return []

  const sorted = data.moves
    .map((m) => ({ ...m, total: totalGames(m) }))
    .sort((a, b) => b.total - a.total)
    .filter((m) => m.total >= MIN_GAMES)

  if (sorted.length === 0) return []

  const isPlayerMove = depth % 2 === 0

  const picked = isPlayerMove ? sorted.slice(0, 1) : sorted.slice(0, 3)

  const nodes: TreeNode[] = []

  for (const move of picked) {
    await sleep(DELAY_MS)

    const chess = new chessModule.Chess(fen)
    const result = chess.move(move.san)
    if (!result) {
      console.warn(`  Skipping invalid move: ${move.san}`)
      continue
    }

    const newFen = chess.fen()
    const posData = await fetchPosition(newFen)
    const openingName = posData.opening?.name

    const node: TreeNode = {
      san: move.san,
      stats: {
        white: move.white,
        draws: move.draws,
        black: move.black,
        games: move.total,
        averageRating: move.averageRating,
      },
      openingName,
      children: [],
    }

    node.children = await buildChildrenFromData(
      posData,
      newFen,
      depth + 1,
      chessModule
    )

    nodes.push(node)
  }

  return nodes
}

function serializeNode(node: TreeNode, indent: number): string {
  const pad = '  '.repeat(indent)
  const lines: string[] = []

  lines.push(`${pad}{`)
  lines.push(`${pad}  san: '${node.san}',`)
  lines.push(
    `${pad}  stats: { white: ${node.stats.white}, draws: ${node.stats.draws}, black: ${node.stats.black}, games: ${node.stats.games}, averageRating: ${node.stats.averageRating} },`
  )
  if (node.openingName) {
    lines.push(`${pad}  openingName: '${node.openingName.replace(/'/g, "\\'")}',`)
  }
  if (node.variationName) {
    lines.push(`${pad}  variationName: '${node.variationName.replace(/'/g, "\\'")}',`)
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
  console.log('Fetching Caro-Kann tree from Lichess Explorer...')
  console.log(`Min games: ${MIN_GAMES}, Max depth: ${MAX_DEPTH} plies`)
  console.log()

  // Dynamically import chess.js
  const chessModule = await import('chess.js')

  // The root node is 1.e4 (White's move, already played)
  // We need to fetch what Black plays after 1.e4
  const rootData = await fetchPosition(START_FEN)
  const rootOpening = rootData.opening?.name

  // Build the children from the starting position
  const children = await buildChildrenFromData(
    rootData,
    START_FEN,
    0, // depth 0 = Black to move (player)
    chessModule
  )

  const rootNode: TreeNode = {
    san: 'e4',
    stats: { white: 0, draws: 0, black: 0, games: 0, averageRating: 0 },
    openingName: rootOpening,
    children,
  }

  // Count nodes
  let nodeCount = 0
  function countNodes(n: TreeNode) {
    nodeCount++
    for (const c of n.children) countNodes(c)
  }
  countNodes(rootNode)

  console.log()
  console.log(`Tree built: ${nodeCount} nodes`)
  console.log('Writing to client/src/data/openings.ts...')

  const output = `import type { Opening, LessonMeta } from '../types'

export const openings: Opening[] = [
  {
    id: 1,
    name: 'Caro-Kann Defense',
    eco: 'B12',
    color: 'black',
    tree: ${serializeNode(rootNode, 2)},
  },
]

export const lessonMetas: LessonMeta[] = []
`

  const outPath = path.resolve(
    import.meta.dirname ?? path.dirname(new URL(import.meta.url).pathname),
    '../client/src/data/openings.ts'
  )
  fs.writeFileSync(outPath, output, 'utf-8')

  console.log(`Done! Written to ${outPath}`)
  console.log(`Total nodes: ${nodeCount}`)
}

main().catch((err) => {
  console.error('Error:', err)
  process.exit(1)
})
