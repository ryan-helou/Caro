/**
 * Extends the existing Caro-Kann opening tree deeper using the Lichess Explorer API.
 * Only extends leaf nodes (children: []) — all existing data including coaching text is preserved.
 *
 * Usage: npx tsx scripts/extend-tree.ts
 */

import * as fs from 'fs'
import * as path from 'path'

const API_BASE = 'https://explorer.lichess.org/lichess'
const DELAY_MS = 4000
const MIN_GAMES = 1000
const LICHESS_TOKEN = process.env.LICHESS_TOKEN ?? ''

// Starting FEN: standard position (White to move)
const INITIAL_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'

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
      const wait = 30000 * attempt // 30s, 60s, 90s, 120s, 150s
      console.log(`  Retry ${attempt}/${retries}, waiting ${wait / 1000}s...`)
      await sleep(wait)
    }
    const headers: Record<string, string> = {
      'Accept': 'application/json',
    }
    if (LICHESS_TOKEN) {
      headers['Authorization'] = `Bearer ${LICHESS_TOKEN}`
    }
    const res = await fetch(url, { headers })
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
 * Replay a path of SAN moves from the initial position to get the resulting FEN.
 */
function replayToFen(
  movePath: string[],
  chessModule: typeof import('chess.js')
): string {
  const chess = new chessModule.Chess()
  for (const san of movePath) {
    const result = chess.move(san)
    if (!result) {
      throw new Error(`Invalid move ${san} in path: ${movePath.join(' ')}`)
    }
  }
  return chess.fen()
}

/**
 * Collect all leaf nodes along with the move path from root to that leaf.
 */
function collectLeaves(
  node: MoveNode,
  pathSoFar: string[]
): { node: MoveNode; movePath: string[] }[] {
  const currentPath = [...pathSoFar, node.san]
  if (node.children.length === 0) {
    return [{ node, movePath: currentPath }]
  }
  const leaves: { node: MoveNode; movePath: string[] }[] = []
  for (const child of node.children) {
    leaves.push(...collectLeaves(child, currentPath))
  }
  return leaves
}

/**
 * Recursively extend a leaf node deeper using Lichess data.
 * depth is the ply count from the start of the game (1-indexed: e4=1, c6=2, d4=3, ...)
 * Player is Black, so even depth = White to move (opponent), odd depth = Black to move (player).
 * Actually, depth here is the number of moves already played. After the leaf's move:
 * - If the leaf is at an even ply count from after 1.e4 perspective, it's Black's turn next.
 * We use the simpler approach: check who's to move from the FEN.
 */
async function extendFromFen(
  fen: string,
  chessModule: typeof import('chess.js')
): Promise<MoveNode[]> {
  await sleep(DELAY_MS)
  const data = await fetchPosition(fen)
  if (data.moves.length === 0) return []

  const sorted = data.moves
    .map((m) => ({ ...m, total: totalGames(m) }))
    .sort((a, b) => b.total - a.total)
    .filter((m) => m.total >= MIN_GAMES)

  if (sorted.length === 0) return []

  // Determine whose turn it is from the FEN
  const fenParts = fen.split(' ')
  const sideToMove = fenParts[1] // 'w' or 'b'
  // Player is Black: Black's move = player move (pick 1), White's move = opponent (pick top 3)
  const isPlayerMove = sideToMove === 'b'
  const picked = isPlayerMove ? sorted.slice(0, 1) : sorted.slice(0, 3)

  const nodes: MoveNode[] = []

  for (const move of picked) {
    const chess = new chessModule.Chess(fen)
    const result = chess.move(move.san)
    if (!result) {
      console.warn(`  Skipping invalid move: ${move.san}`)
      continue
    }

    const newFen = chess.fen()

    // Fetch the new position to get opening name and continue recursion
    await sleep(DELAY_MS)
    const posData = await fetchPosition(newFen)
    const openingName = posData.opening?.name

    const node: MoveNode = {
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

    // Recurse using already-fetched data
    node.children = await extendFromData(posData, newFen, chessModule)

    nodes.push(node)
  }

  return nodes
}

/**
 * Build children from already-fetched position data (avoids double-fetching).
 */
async function extendFromData(
  data: LichessResponse,
  fen: string,
  chessModule: typeof import('chess.js')
): Promise<MoveNode[]> {
  if (data.moves.length === 0) return []

  const sorted = data.moves
    .map((m) => ({ ...m, total: totalGames(m) }))
    .sort((a, b) => b.total - a.total)
    .filter((m) => m.total >= MIN_GAMES)

  if (sorted.length === 0) return []

  const fenParts = fen.split(' ')
  const sideToMove = fenParts[1]
  const isPlayerMove = sideToMove === 'b'
  const picked = isPlayerMove ? sorted.slice(0, 1) : sorted.slice(0, 3)

  const nodes: MoveNode[] = []

  for (const move of picked) {
    const chess = new chessModule.Chess(fen)
    const result = chess.move(move.san)
    if (!result) {
      console.warn(`  Skipping invalid move: ${move.san}`)
      continue
    }

    const newFen = chess.fen()
    await sleep(DELAY_MS)
    const posData = await fetchPosition(newFen)
    const openingName = posData.opening?.name

    const node: MoveNode = {
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

    node.children = await extendFromData(posData, newFen, chessModule)

    nodes.push(node)
  }

  return nodes
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
  console.log('Extending Caro-Kann tree from leaf nodes...')
  console.log(`Min games: ${MIN_GAMES} (no max depth — goes until data runs out)`)
  if (LICHESS_TOKEN) {
    console.log('Using Lichess API token for authentication')
  } else {
    console.log('WARNING: No LICHESS_TOKEN env var set. The Explorer API may require auth.')
    console.log('Get a token at https://lichess.org/account/oauth/token and run:')
    console.log('  LICHESS_TOKEN=lip_xxx npx tsx scripts/extend-tree.ts')
  }
  console.log()

  // Read and parse the existing openings file
  const openingsPath = path.resolve(
    import.meta.dirname ?? path.dirname(new URL(import.meta.url).pathname),
    '../client/src/data/openings.ts'
  )

  // Read the full file to extract lessonMetas separately
  const fileContent = fs.readFileSync(openingsPath, 'utf-8')

  // Extract lessonMetas section (everything from "export const lessonMetas" to end)
  const lessonMetasMatch = fileContent.match(
    /^(export const lessonMetas: LessonMeta\[\] = \[[\s\S]*)$/m
  )
  const lessonMetasSection = lessonMetasMatch ? lessonMetasMatch[1] : 'export const lessonMetas: LessonMeta[] = []'

  // Dynamically import the existing tree
  const { openings } = await import(openingsPath)
  const tree: MoveNode = openings[0].tree

  const chessModule = await import('chess.js')

  // Collect all leaf nodes
  // The root is 'e4', so the path starts with ['e4']
  const leaves = collectLeaves(tree, [])
  console.log(`Found ${leaves.length} leaf nodes to extend`)
  console.log()

  let extended = 0
  let newNodes = 0

  for (let i = 0; i < leaves.length; i++) {
    const leaf = leaves[i]
    console.log(
      `[${i + 1}/${leaves.length}] Extending: ${leaf.movePath.join(' ')}`
    )

    // Replay the full move path to get the FEN at this leaf
    const fen = replayToFen(leaf.movePath, chessModule)

    // Fetch and extend from this position
    const children = await extendFromFen(fen, chessModule)

    if (children.length > 0) {
      leaf.node.children = children
      extended++

      // Count new nodes
      function count(nodes: MoveNode[]): number {
        let c = 0
        for (const n of nodes) {
          c += 1 + count(n.children)
        }
        return c
      }
      const added = count(children)
      newNodes += added
      console.log(`  -> Added ${added} new nodes`)
    } else {
      console.log(`  -> No extension (data exhausted)`)
    }

    console.log()
  }

  // Count total nodes
  let totalNodes = 0
  function countAll(n: MoveNode) {
    totalNodes++
    for (const c of n.children) countAll(c)
  }
  countAll(tree)

  console.log(`Extended ${extended}/${leaves.length} leaves`)
  console.log(`Added ${newNodes} new nodes`)
  console.log(`Total tree size: ${totalNodes} nodes`)
  console.log()

  // Serialize the full tree back, preserving all fields
  const header = `// Generated from Lichess Opening Explorer data (lichess.org/api#tag/Opening-Explorer)
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
    tree: ${serializeNode(tree, 2)},
  },
]

${lessonMetasSection}
`

  fs.writeFileSync(openingsPath, header, 'utf-8')
  console.log(`Written to ${openingsPath}`)
  console.log('Done!')
}

main().catch((err) => {
  console.error('Error:', err)
  process.exit(1)
})
