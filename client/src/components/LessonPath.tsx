import { Link } from 'react-router-dom'
import type { Lesson } from '../types'

interface Props {
  lessons: Lesson[]
  openingId: number
  completedSet: Set<number>
}

interface LessonGroup {
  label: string
  lessons: Lesson[]
}

function groupLessons(lessons: Lesson[]): LessonGroup[] {
  const groups: LessonGroup[] = []
  let currentLabel = ''

  for (const lesson of lessons) {
    // Strip parenthetical suffix to get variation group name
    const label = lesson.name.replace(/\s*\(.*\)$/, '')

    if (label !== currentLabel) {
      currentLabel = label
      groups.push({ label, lessons: [lesson] })
    } else {
      groups[groups.length - 1].lessons.push(lesson)
    }
  }

  return groups
}

// Zigzag pattern: center → right → center → left → center → right ...
const OFFSETS = [0, 50, 0, -50]

function getOffset(index: number): number {
  return OFFSETS[index % OFFSETS.length]
}

function CheckIcon() {
  return (
    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  )
}

function TrophyIcon() {
  return (
    <svg className="w-8 h-8 text-chess-green" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="none" />
      <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z" />
    </svg>
  )
}

type NodeState = 'completed' | 'current' | 'upcoming'

function getNodeState(lessonId: number, completedSet: Set<number>, firstIncompleteId: number | null): NodeState {
  if (completedSet.has(lessonId)) return 'completed'
  if (lessonId === firstIncompleteId) return 'current'
  return 'upcoming'
}

export default function LessonPath({ lessons, openingId, completedSet }: Props) {
  const groups = groupLessons(lessons)

  // Find the first incomplete lesson
  const firstIncompleteId = lessons.find((l) => !completedSet.has(l.id))?.id ?? null
  const allComplete = firstIncompleteId === null

  let globalIndex = 0

  return (
    <div className="flex flex-col items-center py-4">
      {groups.map((group, gi) => (
        <div key={gi} className="w-full flex flex-col items-center">
          {/* Variation group header */}
          <div className="flex items-center gap-3 mb-6 mt-2">
            <div className="h-px w-8 bg-navy-700" />
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              {group.label}
            </span>
            <div className="h-px w-8 bg-navy-700" />
          </div>

          {/* Lesson nodes */}
          {group.lessons.map((lesson, li) => {
            const nodeIndex = globalIndex++
            const offset = getOffset(nodeIndex)
            const state = getNodeState(lesson.id, completedSet, firstIncompleteId)
            const isLast = gi === groups.length - 1 && li === group.lessons.length - 1

            return (
              <div key={lesson.id} className="flex flex-col items-center">
                {/* Connecting line (skip before first node) */}
                {nodeIndex > 0 && (
                  <div
                    className="h-8 border-l-2 border-dashed border-navy-700"
                    style={{ transform: `translateX(${offset / 2}px)` }}
                  />
                )}

                {/* Node */}
                <Link
                  to={`/learn/${openingId}?lesson=${lesson.id}`}
                  className="group relative flex flex-col items-center"
                  style={{ transform: `translateX(${offset}px)` }}
                >
                  <div
                    className={`
                      relative rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105
                      ${state === 'completed'
                        ? 'w-12 h-12 bg-chess-green text-white shadow-lg shadow-chess-green/20 hover:shadow-chess-green/40'
                        : state === 'current'
                          ? 'w-14 h-14 bg-navy-900 border-3 border-chess-green shadow-lg shadow-chess-green/30 hover:shadow-chess-green/50'
                          : 'w-11 h-11 bg-navy-900 border-2 border-navy-600 hover:border-navy-400'
                      }
                    `}
                  >
                    {state === 'completed' && <CheckIcon />}
                    {state === 'current' && (
                      <span className="text-chess-green font-bold text-sm">{lesson.id + 1}</span>
                    )}
                    {state === 'upcoming' && (
                      <span className="text-gray-400 font-medium text-sm">{lesson.id + 1}</span>
                    )}

                    {/* Pulse ring for current */}
                    {state === 'current' && (
                      <span className="absolute inset-0 rounded-full border-2 border-chess-green animate-ping opacity-20" />
                    )}
                  </div>

                  {/* Tooltip on hover */}
                  <div className="absolute top-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                    <div className="bg-navy-800 border border-navy-700 rounded-lg px-3 py-1.5 text-xs text-gray-200 whitespace-nowrap shadow-xl">
                      {lesson.name.replace(/\s*\(.*\)$/, '')}
                      <span className="text-gray-500 ml-1">
                        ({lesson.path.length} moves)
                      </span>
                    </div>
                  </div>
                </Link>

                {/* Connecting line after last node to trophy */}
                {isLast && (
                  <div className="h-8 border-l-2 border-dashed border-navy-700" />
                )}
              </div>
            )
          })}
        </div>
      ))}

      {/* Trophy */}
      <div
        className={`
          w-16 h-16 rounded-full flex items-center justify-center
          ${allComplete
            ? 'bg-chess-green/20 border-2 border-chess-green shadow-lg shadow-chess-green/30'
            : 'bg-navy-900 border-2 border-navy-700 opacity-40'
          }
        `}
      >
        <TrophyIcon />
      </div>
      <span className={`text-xs mt-2 font-medium ${allComplete ? 'text-chess-green' : 'text-gray-500'}`}>
        {allComplete ? 'Complete!' : 'Finish all lessons'}
      </span>
    </div>
  )
}
