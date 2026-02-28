import type { Opening } from '../types'

export const openings: Opening[] = [
  {
    id: 1,
    name: 'Caro-Kann Defense',
    eco: 'B12',
    color: 'black',
    moves: [
      'e4', 'c6',
      'd4', 'd5',
      'e5', 'Bf5',
      'Nf3', 'e6',
      'Be2', 'Nd7',
    ],
    explanations: {
      'c6': 'The Caro-Kann: Black prepares to play d5 next move, challenging the center while keeping a solid pawn structure.',
      'd5': 'Black strikes the center directly. The pawn on c6 supports d5, giving Black a strong central presence.',
      'Bf5': 'The Advance Variation. Black develops the light-squared bishop outside the pawn chain before playing e6 — a key idea in the Caro-Kann.',
      'e6': 'Black solidifies the d5 pawn and prepares to develop the dark-squared bishop. The pawn structure is rock-solid.',
      'Nd7': 'The knight heads to d7, keeping options to go to f6 or b6 later. This is the main line of the Advance Caro-Kann.',
    },
  },
]
