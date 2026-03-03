import type { MoveNode, Lesson } from '../types'

export function extractLessons(tree: MoveNode): Lesson[] {
  const lessons: Lesson[] = []

  function dfs(node: MoveNode, path: MoveNode[], names: string[]) {
    const currentPath = [...path, node]
    const currentNames = node.variationName ? [...names, node.variationName] : names

    if (node.children.length === 0) {
      let name = currentNames.join(' — ') || 'Main Line'

      // If multiple lessons share the same variation name, append key
      // moves from the path to differentiate them
      const lastFewMoves = currentPath.slice(-4).map((n) => n.san).join(' ')
      const suffix = lastFewMoves ? ` (${lastFewMoves})` : ''

      lessons.push({
        id: lessons.length,
        name: name + suffix,
        path: currentPath,
      })
      return
    }

    for (const child of node.children) {
      dfs(child, currentPath, currentNames)
    }
  }

  dfs(tree, [], [])
  return lessons
}
