import type { MoveNode, Lesson, Difficulty } from '../types'

export function extractLessons(tree: MoveNode): Lesson[] {
  const lessons: Lesson[] = []
  const seenSetups = new Set<string>()

  function dfs(node: MoveNode, path: MoveNode[], names: string[]) {
    const currentPath = [...path, node]
    const currentNames = node.variationName ? [...names, node.variationName] : names

    // When we encounter a variation node for the first time, create a setup lesson
    if (node.variationName && !seenSetups.has(node.variationName) && node.children.length > 0) {
      seenSetups.add(node.variationName)
      lessons.push({
        id: lessons.length,
        name: `${node.variationName}: Setup`,
        path: [...currentPath],
      })
    }

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

export function getDifficulty(lesson: Lesson): Difficulty {
  const moves = lesson.path.length
  if (moves <= 6) return 'beginner'
  if (moves <= 9) return 'intermediate'
  if (moves <= 11) return 'advanced'
  return 'insane'
}

export interface LessonGroup {
  variation: string
  lessons: Lesson[]
}

export function groupLessonsByVariation(lessons: Lesson[]): LessonGroup[] {
  const groups = new Map<string, Lesson[]>()
  const order: string[] = []

  for (const lesson of lessons) {
    // Find the first variationName in the path
    const variation = lesson.path.find((n) => n.variationName)?.variationName ?? 'Main Line'
    if (!groups.has(variation)) {
      groups.set(variation, [])
      order.push(variation)
    }
    groups.get(variation)!.push(lesson)
  }

  // Sort lessons within each group by path length (short first).
  // Setup lessons are already short so they naturally come first.
  return order.map((variation) => ({
    variation,
    lessons: groups.get(variation)!.sort((a, b) => a.path.length - b.path.length),
  }))
}
