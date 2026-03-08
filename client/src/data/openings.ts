// Generated from Lichess Opening Explorer data (lichess.org/api#tag/Opening-Explorer)
// Re-run `npx tsx scripts/fetch-lichess-tree.ts` to refresh from live API
// Stats: rapid+classical games, ratings 2000-2500
// Coaching text added manually after generation
import type { Opening, LessonMeta } from '../types'

export const openings: Opening[] = [
  {
    id: 1,
    name: 'Caro-Kann Defense',
    eco: 'B12',
    color: 'black',
    tree:     {
      san: 'e4',
      openingName: 'King\'s Pawn Game',
      children: [
        {
          san: 'c6',
          stats: { white: 125482, draws: 64219, black: 110338, games: 300039, averageRating: 2184 },
          openingName: 'Caro-Kann Defense',
          explanation:
            'You start with the Caro-Kann — preparing to play d5 next move, challenging the center while keeping a rock-solid pawn structure.',
          coaching:
            'Welcome to the Caro-Kann! By playing c6, you\'re telling White: "I\'m going to fight for the center on my own terms." Unlike 1...e5 which puts a pawn in the center right away, c6 prepares d5 with backup. This is the heart of the Caro-Kann philosophy — solid, reliable, and deceptively dangerous.',
          wrongMoveResponses: {
            'e5': 'That\'s 1...e5, which enters completely different openings (like the Italian or Ruy Lopez). In the Caro-Kann, you want c6 first to support d5 with a pawn.',
            'e6': 'That\'s the French Defense! Similar idea of playing d5, but in the French your light-squared bishop often gets stuck behind the e6 pawn. The Caro-Kann avoids that problem.',
            'd5': 'Bold, but without c6 supporting it, White just takes exd5 and you\'ve lost your center pawn. Play c6 first, then d5 — that\'s the Caro-Kann way.',
          },
          children: [
            {
              san: 'd4',
              stats: { white: 112031, draws: 58602, black: 98712, games: 269345, averageRating: 2191 },
              openingName: 'Caro-Kann Defense',
              children: [
                {
                  san: 'd5',
                  stats: { white: 105890, draws: 55218, black: 93401, games: 254509, averageRating: 2195 },
                  openingName: 'Caro-Kann Defense',
                  explanation:
                    'You strike the center directly. Your c6 pawn has d5\'s back, giving you a strong central foothold.',
                  coaching:
                    'Now you play d5, directly challenging White\'s e4 pawn. This is the move c6 was preparing — your d-pawn is fully supported. White has to make a decision about the center tension, and each choice leads to a completely different type of game. This is where the Caro-Kann branches out.',
                  wrongMoveResponses: {
                    'Nf6': 'Developing the knight is natural, but you\'re missing the chance to challenge the center right now. Play d5 — that\'s what c6 was preparing!',
                    'g6': 'That\'s a Modern Defense setup. In the Caro-Kann, you want to push d5 immediately while White\'s e4 pawn is under pressure.',
                  },
                  children: [
                    {
                      san: 'e5',
                      stats: { white: 25310, draws: 13841, black: 24017, games: 63168, averageRating: 2172 },
                      openingName: 'Caro-Kann Defense: Advance Variation',
                      variationName: 'Advance Variation',
                      children: [
                        {
                          san: 'Bf5',
                          stats: { white: 18240, draws: 10102, black: 17589, games: 45931, averageRating: 2178 },
                          openingName: 'Caro-Kann Defense: Advance Variation, 3...Bf5',
                          explanation:
                            'You develop the light-squared bishop outside the pawn chain before playing e6 — this is the key advantage of the Caro-Kann over the French.',
                          coaching:
                            'This is one of the biggest perks of the Caro-Kann! Because you played c6 instead of e6, your light-squared bishop is free to come out to f5. In the French Defense, this bishop gets trapped behind the e6 pawn for the whole game. Here, you develop it actively before locking in the structure with e6. Remember: bishop out first, then e6.',
                          wrongMoveResponses: {
                            'e6': 'You can play e6, but you\'re missing the whole point! Get your bishop out to f5 first. Once you play e6, the bishop is stuck behind your pawns — just like in the French Defense.',
                            'Nc6': 'The knight looks natural on c6, but it blocks your c-pawn and doesn\'t address the light-squared bishop problem. Play Bf5 first to activate the bishop while you can.',
                            'c5': 'Trying to attack d4 is logical, but Bf5 is more important right now. You need to develop the bishop before closing the position with e6.',
                          },
                          children: [
                            {
                              san: 'Nf3',
                              stats: { white: 8412, draws: 4756, black: 8201, games: 21369, averageRating: 2175 },
                              openingName: 'Caro-Kann Defense: Advance Variation, Short Variation',
                              variationName: 'Short Classical',
                              children: [
                                {
                                  san: 'e6',
                                  stats: { white: 6118, draws: 3522, black: 6032, games: 15672, averageRating: 2181 },
                                  openingName: 'Caro-Kann Defense: Advance Variation, Short Variation with 4...e6',
                                  explanation:
                                    'You lock in a solid pawn structure and prepare to develop the dark-squared bishop. Everything is secure.',
                                  coaching:
                                    'Now that your light-squared bishop is safely out on f5, you can play e6 without regret. This creates a rock-solid pawn chain (d5-e6-c6) and opens the diagonal for your dark-squared bishop. Your position is compact and tough to break down — classic Caro-Kann.',
                                  wrongMoveResponses: {
                                    'Nd7': 'The knight will go to d7 soon, but e6 first! You need to solidify your center before developing pieces.',
                                  },
                                  children: [
                                    {
                                      san: 'Bd3',
                                      stats: { white: 18707, draws: 2998, black: 22505, games: 44210, averageRating: 2079 },
                                      children: [
                                        {
                                          san: 'Bxd3',
                                          stats: { white: 12335, draws: 2126, black: 14920, games: 29381, averageRating: 2108 },
                                          children: [
                                            {
                                              san: 'Qxd3',
                                              stats: { white: 11939, draws: 2074, black: 14421, games: 28434, averageRating: 2080 },
                                              children: [
                                                {
                                                  san: 'c5',
                                                  stats: { white: 11334, draws: 1941, black: 13672, games: 26947, averageRating: 2108 },
                                                  children: [],
                                                },
                                              ],
                                            },
                                          ],
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                            {
                              san: 'Bd3',
                              stats: { white: 66625, draws: 10892, black: 72170, games: 149687, averageRating: 2100 },
                              children: [
                                {
                                  san: 'Bxd3',
                                  stats: { white: 56802, draws: 9816, black: 63120, games: 129738, averageRating: 2119 },
                                  children: [
                                    {
                                      san: 'Qxd3',
                                      stats: { white: 55284, draws: 9560, black: 61435, games: 126279, averageRating: 2102 },
                                      children: [
                                        {
                                          san: 'e6',
                                          stats: { white: 51039, draws: 8746, black: 56462, games: 116247, averageRating: 2118 },
                                          children: [
                                            {
                                              san: 'Nf3',
                                              stats: { white: 18820, draws: 3424, black: 22336, games: 44580, averageRating: 2086 },
                                              children: [
                                                {
                                                  san: 'c5',
                                                  stats: { white: 11334, draws: 1941, black: 13672, games: 26947, averageRating: 2108 },
                                                  children: [
                                                    {
                                                      san: 'c3',
                                                      stats: { white: 7657, draws: 1269, black: 8991, games: 17917, averageRating: 2088 },
                                                      children: [
                                                        {
                                                          san: 'Nc6',
                                                          stats: { white: 8008, draws: 1350, black: 9465, games: 18823, averageRating: 2114 },
                                                          children: [
                                                            {
                                                              san: 'O-O',
                                                              stats: { white: 5278, draws: 893, black: 6126, games: 12297, averageRating: 2097 },
                                                              children: [],
                                                            },
                                                            {
                                                              san: 'a3',
                                                              stats: { white: 1205, draws: 185, black: 1154, games: 2544, averageRating: 2108 },
                                                              children: [],
                                                            },
                                                          ],
                                                        },
                                                      ],
                                                    },
                                                    {
                                                      san: 'dxc5',
                                                      stats: { white: 1050, draws: 160, black: 1347, games: 2557, averageRating: 2083 },
                                                      children: [
                                                        {
                                                          san: 'Bxc5',
                                                          stats: { white: 643, draws: 106, black: 868, games: 1617, averageRating: 2105 },
                                                          children: [],
                                                        },
                                                      ],
                                                    },
                                                  ],
                                                },
                                              ],
                                            },
                                            {
                                              san: 'f4',
                                              stats: { white: 11602, draws: 1922, black: 12779, games: 26303, averageRating: 2110 },
                                              children: [
                                                {
                                                  san: 'c5',
                                                  stats: { white: 4251, draws: 691, black: 4896, games: 9838, averageRating: 2112 },
                                                  children: [
                                                    {
                                                      san: 'c3',
                                                      stats: { white: 3270, draws: 502, black: 3629, games: 7401, averageRating: 2107 },
                                                      children: [
                                                        {
                                                          san: 'Nc6',
                                                          stats: { white: 2810, draws: 441, black: 3195, games: 6446, averageRating: 2118 },
                                                          children: [
                                                            {
                                                              san: 'Nf3',
                                                              stats: { white: 2598, draws: 390, black: 2852, games: 5840, averageRating: 2109 },
                                                              children: [],
                                                            },
                                                          ],
                                                        },
                                                      ],
                                                    },
                                                    {
                                                      san: 'Nf3',
                                                      stats: { white: 600, draws: 108, black: 740, games: 1448, averageRating: 2095 },
                                                      children: [
                                                        {
                                                          san: 'Nc6',
                                                          stats: { white: 809, draws: 152, black: 1089, games: 2050, averageRating: 2103 },
                                                          children: [
                                                            {
                                                              san: 'c3',
                                                              stats: { white: 461, draws: 83, black: 576, games: 1120, averageRating: 2081 },
                                                              children: [],
                                                            },
                                                          ],
                                                        },
                                                      ],
                                                    },
                                                  ],
                                                },
                                              ],
                                            },
                                            {
                                              san: 'Ne2',
                                              stats: { white: 10240, draws: 1528, black: 9684, games: 21452, averageRating: 2124 },
                                              children: [
                                                {
                                                  san: 'c5',
                                                  stats: { white: 3965, draws: 626, black: 3888, games: 8479, averageRating: 2132 },
                                                  children: [
                                                    {
                                                      san: 'c3',
                                                      stats: { white: 3565, draws: 556, black: 3387, games: 7508, averageRating: 2130 },
                                                      children: [
                                                        {
                                                          san: 'Nc6',
                                                          stats: { white: 3420, draws: 555, black: 3325, games: 7300, averageRating: 2138 },
                                                          children: [
                                                            {
                                                              san: 'O-O',
                                                              stats: { white: 2143, draws: 330, black: 2051, games: 4524, averageRating: 2133 },
                                                              children: [],
                                                            },
                                                            {
                                                              san: 'a3',
                                                              stats: { white: 720, draws: 122, black: 610, games: 1452, averageRating: 2155 },
                                                              children: [],
                                                            },
                                                          ],
                                                        },
                                                      ],
                                                    },
                                                  ],
                                                },
                                              ],
                                            },
                                          ],
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                            {
                              san: 'h4',
                              stats: { white: 69787, draws: 8662, black: 53944, games: 132393, averageRating: 2164 },
                              openingName: 'Caro-Kann Defense: Advance Variation, Tal Variation',
                              children: [
                                {
                                  san: 'h5',
                                  stats: { white: 41193, draws: 5902, black: 33931, games: 81026, averageRating: 2169 },
                                  children: [
                                    {
                                      san: 'Bd3',
                                      stats: { white: 20581, draws: 3398, black: 17874, games: 41853, averageRating: 2181 },
                                      children: [
                                        {
                                          san: 'Bxd3',
                                          stats: { white: 19507, draws: 3273, black: 17121, games: 39901, averageRating: 2178 },
                                          children: [
                                            {
                                              san: 'Qxd3',
                                              stats: { white: 19316, draws: 3238, black: 16925, games: 39479, averageRating: 2183 },
                                              children: [
                                                {
                                                  san: 'e6',
                                                  stats: { white: 16400, draws: 2701, black: 14170, games: 33271, averageRating: 2169 },
                                                  children: [
                                                    {
                                                      san: 'Bg5',
                                                      stats: { white: 7340, draws: 1111, black: 4978, games: 13429, averageRating: 2211 },
                                                      children: [
                                                        {
                                                          san: 'Be7',
                                                          stats: { white: 3094, draws: 454, black: 2052, games: 5600, averageRating: 2173 },
                                                          children: [
                                                            {
                                                              san: 'Nf3',
                                                              stats: { white: 2900, draws: 413, black: 1857, games: 5170, averageRating: 2207 },
                                                              children: [],
                                                            },
                                                          ],
                                                        },
                                                      ],
                                                    },
                                                  ],
                                                },
                                              ],
                                            },
                                          ],
                                        },
                                      ],
                                    },
                                    {
                                      san: 'Bg5',
                                      stats: { white: 10213, draws: 1025, black: 6382, games: 17620, averageRating: 2187 },
                                      children: [
                                        {
                                          san: 'Qb6',
                                          stats: { white: 7769, draws: 771, black: 4795, games: 13335, averageRating: 2187 },
                                          children: [
                                            {
                                              san: 'Bd3',
                                              stats: { white: 7494, draws: 742, black: 4449, games: 12685, averageRating: 2198 },
                                              children: [],
                                            },
                                          ],
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                    {
                      san: 'Nc3',
                      stats: { white: 32450, draws: 17512, black: 28108, games: 78070, averageRating: 2198 },
                      openingName: 'Caro-Kann Defense: Classical Variation',
                      variationName: 'Classical Variation',
                      children: [
                        {
                          san: 'dxe4',
                          stats: { white: 28320, draws: 15408, black: 24590, games: 68318, averageRating: 2201 },
                          openingName: 'Caro-Kann Defense: Classical Variation',
                          explanation:
                            'You capture the e4 pawn. In the Classical, you give up the center temporarily to develop pieces actively.',
                          coaching:
                            'In the Classical Variation, you capture on e4. "Wait, I\'m giving up my center pawn?" Yes — but it\'s a smart trade. After White recaptures with Nxe4, you\'ll develop your pieces to active squares quickly. The center is open now, which suits your bishops and knights.',
                          wrongMoveResponses: {
                            'Bf5': 'Bf5 is actually a playable alternative here (the Modern Variation), but the main Classical move is dxe4 first. Taking on e4 opens up the position for active piece play.',
                            'Nf6': 'You\'re developing, but dxe4 is the key move here. You need to resolve the center tension first, then develop your pieces to active squares.',
                            'e6': 'This is too passive — you\'re locking in your light-squared bishop behind the e6 pawn. Capture on e4 instead to keep things open.',
                          },
                          children: [
                            {
                              san: 'Nxe4',
                              stats: { white: 27580, draws: 15012, black: 23901, games: 66493, averageRating: 2202 },
                              openingName: 'Caro-Kann Defense: Classical Variation',
                              children: [
                                {
                                  san: 'Bf5',
                                  stats: { white: 15210, draws: 8502, black: 13108, games: 36820, averageRating: 2198 },
                                  openingName: 'Caro-Kann Defense: Classical Variation, 4...Bf5',
                                  explanation:
                                    'The main Classical move — your bishop develops actively before you play e6.',
                                  coaching:
                                    'Here\'s that Caro-Kann bishop again! Just like in the Advance, you develop the light-squared bishop before playing e6. This is the most popular move at all levels. Your bishop is active, your structure is flexible, and you\'re ready to develop smoothly.',
                                  wrongMoveResponses: {
                                    'Nd7': 'Nd7 is a solid alternative (we cover that line too), but Bf5 is the classical main line. The bishop is your star piece in the Caro-Kann — get it out!',
                                    'e6': 'Again, don\'t lock the bishop in! Bf5 first, then e6. This is the golden rule of the Caro-Kann.',
                                  },
                                  children: [
                                    {
                                      san: 'Ng3',
                                      stats: { white: 11405, draws: 6389, black: 9802, games: 27596, averageRating: 2201 },
                                      openingName: 'Caro-Kann Defense: Classical Variation, Main Line',
                                      children: [
                                        {
                                          san: 'Bg6',
                                          stats: { white: 10890, draws: 6101, black: 9345, games: 26336, averageRating: 2203 },
                                          openingName: 'Caro-Kann Defense: Classical Variation, Main Line',
                                          explanation:
                                            'The bishop retreats to g6, staying active and monitoring the kingside.',
                                          coaching:
                                            'White\'s knight attacks your bishop, so you retreat to g6. This is the standard square — your bishop still controls important light squares (e4, h5, f7) and is safe from further harassment... for now.',
                                          children: [
                                            {
                                              san: 'h4',
                                              stats: { white: 4502, draws: 2518, black: 3845, games: 10865, averageRating: 2205 },
                                              openingName: 'Caro-Kann Defense: Classical Variation, Main Line',
                                              children: [
                                                {
                                                  san: 'h6',
                                                  stats: { white: 50183, draws: 8729, black: 42044, games: 100956, averageRating: 2142 },
                                                  children: [],
                                                },
                                              ],
                                            },
                                            {
                                              san: 'Nf3',
                                              stats: { white: 70979, draws: 12620, black: 66338, games: 149937, averageRating: 2124 },
                                              children: [],
                                            },
                                            {
                                              san: 'N1e2',
                                              stats: { white: 6558, draws: 911, black: 4579, games: 12048, averageRating: 2175 },
                                              children: [],
                                            },
                                          ],
                                        },
                                      ],
                                    },
                                  ],
                                },
                                {
                                  san: 'Nd7',
                                  stats: { white: 5890, draws: 3201, black: 5102, games: 14193, averageRating: 2205 },
                                  openingName: 'Caro-Kann Defense: Classical Variation, 4...Nd7',
                                  explanation:
                                    'A modern alternative — the knight goes to d7 first, keeping flexible development.',
                                  coaching:
                                    'This is the Modern Classical approach. Instead of Bf5 right away, you develop the knight to d7 first. The idea is to play Ngf6 next, challenge the e4 knight, and keep your bishop options open a bit longer. This has become very popular at the top level.',
                                  children: [
                                    {
                                      san: 'Nf3',
                                      stats: { white: 27779, draws: 6234, black: 26326, games: 60339, averageRating: 2137 },
                                      children: [
                                        {
                                          san: 'Ngf6',
                                          stats: { white: 28227, draws: 6135, black: 26682, games: 61044, averageRating: 2140 },
                                          children: [
                                            {
                                              san: 'Ng3',
                                              stats: { white: 9392, draws: 1644, black: 8661, games: 19697, averageRating: 2140 },
                                              openingName: 'Caro-Kann Defense: Karpov Variation, Modern Variation, Kasparov Attack',
                                              children: [
                                                {
                                                  san: 'e6',
                                                  stats: { white: 6347, draws: 1162, black: 6183, games: 13692, averageRating: 2143 },
                                                  children: [],
                                                },
                                              ],
                                            },
                                            {
                                              san: 'Nxf6+',
                                              stats: { white: 8397, draws: 2143, black: 7201, games: 17741, averageRating: 2152 },
                                              children: [
                                                {
                                                  san: 'Nxf6',
                                                  stats: { white: 8327, draws: 2127, black: 7120, games: 17574, averageRating: 2152 },
                                                  children: [],
                                                },
                                              ],
                                            },
                                            {
                                              san: 'Bd3',
                                              stats: { white: 7225, draws: 1855, black: 7788, games: 16868, averageRating: 2115 },
                                              children: [
                                                {
                                                  san: 'Nxe4',
                                                  stats: { white: 7760, draws: 2027, black: 8612, games: 18399, averageRating: 2130 },
                                                  children: [],
                                                },
                                              ],
                                            },
                                          ],
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                    {
                      san: 'exd5',
                      stats: { white: 20415, draws: 12108, black: 18890, games: 51413, averageRating: 2178 },
                      openingName: 'Caro-Kann Defense: Exchange Variation',
                      variationName: 'Exchange Variation',
                      children: [
                        {
                          san: 'cxd5',
                          stats: { white: 19802, draws: 11845, black: 18312, games: 49959, averageRating: 2180 },
                          openingName: 'Caro-Kann Defense: Exchange Variation',
                          explanation:
                            'You recapture with the c-pawn, keeping a solid center. The position is symmetrical but you have good prospects.',
                          coaching:
                            'You recapture with the c-pawn, and now the center is symmetrical — both sides have a d-pawn. Many players think the Exchange Variation is boring, but there\'s actually a lot of subtle play here. You\'ll develop naturally, and your slightly better bishop activity (no pawn on e6 blocking it!) can give you an edge in the long run.',
                          wrongMoveResponses: {
                            'Nf6': 'You need to recapture the pawn first! After cxd5 you restore material equality and keep a solid center.',
                          },
                          children: [
                            {
                              san: 'Bd3',
                              stats: { white: 6802, draws: 4212, black: 6401, games: 17415, averageRating: 2175 },
                              openingName: 'Caro-Kann Defense: Exchange Variation, 4.Bd3',
                              variationName: 'Quiet Exchange',
                              children: [
                                {
                                  san: 'Nc6',
                                  stats: { white: 93783, draws: 17878, black: 88115, games: 199776, averageRating: 2152 },
                                  children: [
                                    {
                                      san: 'c3',
                                      stats: { white: 79293, draws: 15329, black: 72566, games: 167188, averageRating: 2154 },
                                      children: [
                                        {
                                          san: 'Nf6',
                                          stats: { white: 60667, draws: 11721, black: 53928, games: 126316, averageRating: 2149 },
                                          children: [
                                            {
                                              san: 'Bf4',
                                              stats: { white: 31659, draws: 6273, black: 25605, games: 63537, averageRating: 2170 },
                                              openingName: 'Caro-Kann Defense: Exchange Variation, Rubinstein Variation',
                                              children: [
                                                {
                                                  san: 'Bg4',
                                                  stats: { white: 23159, draws: 4654, black: 19888, games: 47701, averageRating: 2161 },
                                                  children: [],
                                                },
                                              ],
                                            },
                                            {
                                              san: 'h3',
                                              stats: { white: 23927, draws: 4490, black: 21017, games: 49434, averageRating: 2144 },
                                              children: [
                                                {
                                                  san: 'g6',
                                                  stats: { white: 10958, draws: 2476, black: 11138, games: 24572, averageRating: 2168 },
                                                  children: [],
                                                },
                                              ],
                                            },
                                            {
                                              san: 'Nf3',
                                              stats: { white: 8299, draws: 1650, black: 7986, games: 17935, averageRating: 2128 },
                                              children: [
                                                {
                                                  san: 'Bg4',
                                                  stats: { white: 17376, draws: 3483, black: 18537, games: 39396, averageRating: 2142 },
                                                  children: [],
                                                },
                                              ],
                                            },
                                          ],
                                        },
                                      ],
                                    },
                                    {
                                      san: 'Nf3',
                                      stats: { white: 10527, draws: 1883, black: 10908, games: 23318, averageRating: 2124 },
                                      children: [
                                        {
                                          san: 'Bg4',
                                          stats: { white: 24703, draws: 4287, black: 27282, games: 56272, averageRating: 2131 },
                                          children: [
                                            {
                                              san: 'c3',
                                              stats: { white: 21188, draws: 3804, black: 22428, games: 47420, averageRating: 2116 },
                                              children: [
                                                {
                                                  san: 'e6',
                                                  stats: { white: 13380, draws: 2424, black: 14535, games: 30339, averageRating: 2129 },
                                                  children: [],
                                                },
                                              ],
                                            },
                                          ],
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                            {
                              san: 'c4',
                              stats: { white: 5108, draws: 2912, black: 4602, games: 12622, averageRating: 2185 },
                              openingName: 'Caro-Kann Defense: Panov-Botvinnik Attack',
                              variationName: 'Panov-Botvinnik Attack',
                              children: [
                                {
                                  san: 'Nf6',
                                  stats: { white: 88545, draws: 16511, black: 83864, games: 188920, averageRating: 2145 },
                                  children: [
                                    {
                                      san: 'Nc3',
                                      stats: { white: 77923, draws: 14488, black: 71038, games: 163449, averageRating: 2149 },
                                      openingName: 'Caro-Kann Defense: Panov Attack',
                                      children: [
                                        {
                                          san: 'Nc6',
                                          stats: { white: 31919, draws: 6512, black: 31259, games: 69690, averageRating: 2168 },
                                          openingName: 'Caro-Kann Defense: Panov Attack, Modern Defense',
                                          children: [
                                            {
                                              san: 'Nf3',
                                              stats: { white: 21536, draws: 4511, black: 20376, games: 46423, averageRating: 2157 },
                                              children: [
                                                {
                                                  san: 'Bg4',
                                                  stats: { white: 21339, draws: 4437, black: 20792, games: 46568, averageRating: 2158 },
                                                  openingName: 'Caro-Kann Defense: Panov Attack, Modern Defense, Mieses Line',
                                                  children: [],
                                                },
                                              ],
                                            },
                                            {
                                              san: 'Bg5',
                                              stats: { white: 6868, draws: 1278, black: 6000, games: 14146, averageRating: 2186 },
                                              children: [],
                                            },
                                          ],
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                    {
                      san: 'Nd2',
                      stats: { white: 12108, draws: 6845, black: 10512, games: 29465, averageRating: 2185 },
                      openingName: 'Caro-Kann Defense: Two Knights Attack',
                      variationName: 'Two Knights Variation',
                      children: [
                        {
                          san: 'dxe4',
                          stats: { white: 10205, draws: 5812, black: 8945, games: 24962, averageRating: 2188 },
                          openingName: 'Caro-Kann Defense: Two Knights Attack',
                          explanation:
                            'You capture on e4. White will recapture with the knight and then play Ng3, similar to the Classical.',
                          coaching:
                            'Against Nd2, you take on e4 just like in the Classical. White recaptures with the knight from d2, and the position often transposes to Classical-type structures. The key difference is that White has committed the knight to d2 early.',
                          children: [
                            {
                              san: 'Nxe4',
                              stats: { white: 9890, draws: 5645, black: 8702, games: 24237, averageRating: 2189 },
                              openingName: 'Caro-Kann Defense: Two Knights Attack',
                              children: [
                                {
                                  san: 'Nf6',
                                  stats: { white: 4512, draws: 2589, black: 3978, games: 11079, averageRating: 2192 },
                                  openingName: 'Caro-Kann Defense: Two Knights Attack',
                                  explanation:
                                    'Developing the knight to f6 and challenging the e4 knight.',
                                  coaching:
                                    'Nf6 challenges the e4 knight directly. White usually has to retreat with Nxf6+ or Ng3, and you get a comfortable position with natural development.',
                                  children: [
                                    {
                                      san: 'Nxf6+',
                                      stats: { white: 110352, draws: 21001, black: 104176, games: 235529, averageRating: 2154 },
                                      children: [
                                        {
                                          san: 'exf6',
                                          stats: { white: 100542, draws: 19177, black: 94351, games: 214070, averageRating: 2152 },
                                          openingName: 'Caro-Kann Defense: Tartakower Variation',
                                          children: [
                                            {
                                              san: 'Nf3',
                                              stats: { white: 39932, draws: 7907, black: 41610, games: 89449, averageRating: 2129 },
                                              children: [
                                                {
                                                  san: 'Bd6',
                                                  stats: { white: 35727, draws: 7366, black: 39312, games: 82405, averageRating: 2146 },
                                                  children: [],
                                                },
                                              ],
                                            },
                                            {
                                              san: 'c3',
                                              stats: { white: 32732, draws: 5828, black: 25469, games: 64029, averageRating: 2197 },
                                              children: [
                                                {
                                                  san: 'Bd6',
                                                  stats: { white: 28600, draws: 5060, black: 22628, games: 56288, averageRating: 2186 },
                                                  children: [],
                                                },
                                              ],
                                            },
                                            {
                                              san: 'Bc4',
                                              stats: { white: 12522, draws: 2564, black: 11782, games: 26868, averageRating: 2143 },
                                              openingName: 'Caro-Kann Defense: Forgacs Variation',
                                              children: [
                                                {
                                                  san: 'Bd6',
                                                  stats: { white: 9522, draws: 1981, black: 9150, games: 20653, averageRating: 2147 },
                                                  children: [],
                                                },
                                              ],
                                            },
                                          ],
                                        },
                                      ],
                                    },
                                    {
                                      san: 'Ng3',
                                      stats: { white: 31282, draws: 5088, black: 31604, games: 67974, averageRating: 2129 },
                                      children: [
                                        {
                                          san: 'Bg4',
                                          stats: { white: 9982, draws: 1668, black: 9349, games: 20999, averageRating: 2114 },
                                          children: [
                                            {
                                              san: 'Be2',
                                              stats: { white: 4397, draws: 869, black: 4119, games: 9385, averageRating: 2122 },
                                              children: [],
                                            },
                                          ],
                                        },
                                      ],
                                    },
                                    {
                                      san: 'Ng5',
                                      stats: { white: 11855, draws: 1488, black: 10377, games: 23720, averageRating: 2145 },
                                      children: [
                                        {
                                          san: 'h6',
                                          stats: { white: 6821, draws: 814, black: 5784, games: 13419, averageRating: 2144 },
                                          children: [
                                            {
                                              san: 'Nxf7',
                                              stats: { white: 3606, draws: 319, black: 2784, games: 6709, averageRating: 2132 },
                                              openingName: 'Caro-Kann Defense: Alien Gambit',
                                              children: [],
                                            },
                                          ],
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                    {
                      san: 'f3',
                      stats: { white: 5012, draws: 2501, black: 5108, games: 12621, averageRating: 2152 },
                      openingName: 'Caro-Kann Defense: Fantasy Variation',
                      variationName: 'Fantasy Variation',
                      children: [
                        {
                          san: 'dxe4',
                          stats: { white: 38798, draws: 3925, black: 27767, games: 70490, averageRating: 2126 },
                          children: [
                            {
                              san: 'fxe4',
                              stats: { white: 37993, draws: 3821, black: 27043, games: 68857, averageRating: 2138 },
                              children: [
                                {
                                  san: 'e5',
                                  stats: { white: 24456, draws: 2745, black: 19415, games: 46616, averageRating: 2145 },
                                  children: [
                                    {
                                      san: 'Nf3',
                                      stats: { white: 23346, draws: 2556, black: 17556, games: 43458, averageRating: 2152 },
                                      children: [
                                        {
                                          san: 'Bg4',
                                          stats: { white: 12148, draws: 1367, black: 9679, games: 23194, averageRating: 2152 },
                                          children: [
                                            {
                                              san: 'Bc4',
                                              stats: { white: 9629, draws: 975, black: 7349, games: 17953, averageRating: 2160 },
                                              children: [
                                                {
                                                  san: 'Nd7',
                                                  stats: { white: 4288, draws: 596, black: 4958, games: 9842, averageRating: 2184 },
                                                  children: [
                                                    {
                                                      san: 'O-O',
                                                      stats: { white: 3051, draws: 427, black: 3731, games: 7209, averageRating: 2175 },
                                                      children: [
                                                        {
                                                          san: 'Ngf6',
                                                          stats: { white: 2493, draws: 381, black: 3425, games: 6299, averageRating: 2188 },
                                                          children: [
                                                            {
                                                              san: 'c3',
                                                              stats: { white: 1179, draws: 183, black: 1170, games: 2532, averageRating: 2221 },
                                                              children: [
                                                                {
                                                                  san: 'Bd6',
                                                                  stats: { white: 861, draws: 129, black: 900, games: 1890, averageRating: 2230 },
                                                                  children: [],
                                                                },
                                                              ],
                                                            },
                                                          ],
                                                        },
                                                      ],
                                                    },
                                                    {
                                                      san: 'c3',
                                                      stats: { white: 960, draws: 119, black: 752, games: 1831, averageRating: 2212 },
                                                      children: [
                                                        {
                                                          san: 'Ngf6',
                                                          stats: { white: 555, draws: 68, black: 384, games: 1007, averageRating: 2183 },
                                                          children: [],
                                                        },
                                                      ],
                                                    },
                                                  ],
                                                },
                                              ],
                                            },
                                          ],
                                        },
                                        {
                                          san: 'exd4',
                                          stats: { white: 9277, draws: 914, black: 6063, games: 16254, averageRating: 2129 },
                                          children: [
                                            {
                                              san: 'Bc4',
                                              stats: { white: 8133, draws: 629, black: 4493, games: 13255, averageRating: 2152 },
                                              openingName: 'Caro-Kann Defense: Maróczy Variation, Maróczy Gambit',
                                              children: [
                                                {
                                                  san: 'Be6',
                                                  stats: { white: 1851, draws: 167, black: 1003, games: 3021, averageRating: 2132 },
                                                  children: [
                                                    {
                                                      san: 'Bxe6',
                                                      stats: { white: 1818, draws: 161, black: 974, games: 2953, averageRating: 2153 },
                                                      children: [
                                                        {
                                                          san: 'fxe6',
                                                          stats: { white: 1815, draws: 161, black: 974, games: 2950, averageRating: 2133 },
                                                          children: [
                                                            {
                                                              san: 'O-O',
                                                              stats: { white: 1266, draws: 84, black: 531, games: 1881, averageRating: 2158 },
                                                              children: [],
                                                            },
                                                          ],
                                                        },
                                                      ],
                                                    },
                                                  ],
                                                },
                                              ],
                                            },
                                            {
                                              san: 'Qxd4',
                                              stats: { white: 901, draws: 237, black: 1209, games: 2347, averageRating: 2095 },
                                              children: [
                                                {
                                                  san: 'Qxd4',
                                                  stats: { white: 797, draws: 227, black: 1114, games: 2138, averageRating: 2111 },
                                                  children: [
                                                    {
                                                      san: 'Nxd4',
                                                      stats: { white: 797, draws: 227, black: 1113, games: 2137, averageRating: 2096 },
                                                      children: [
                                                        {
                                                          san: 'Bc5',
                                                          stats: { white: 392, draws: 110, black: 527, games: 1029, averageRating: 2110 },
                                                          children: [],
                                                        },
                                                      ],
                                                    },
                                                  ],
                                                },
                                              ],
                                            },
                                          ],
                                        },
                                        {
                                          san: 'Be6',
                                          stats: { white: 988, draws: 185, black: 1180, games: 2353, averageRating: 2229 },
                                          children: [],
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              san: 'Nf3',
              stats: { white: 394160, draws: 63617, black: 433322, games: 891099, averageRating: 2093 },
              children: [
                {
                  san: 'd5',
                  stats: { white: 374079, draws: 61311, black: 414414, games: 849804, averageRating: 2113 },
                  children: [
                    {
                      san: 'exd5',
                      stats: { white: 204862, draws: 36180, black: 244046, games: 485088, averageRating: 2079 },
                      children: [
                        {
                          san: 'cxd5',
                          stats: { white: 203277, draws: 35949, black: 242906, games: 482132, averageRating: 2106 },
                          children: [
                            {
                              san: 'd4',
                              stats: { white: 169628, draws: 30203, black: 201475, games: 401306, averageRating: 2079 },
                              children: [
                                {
                                  san: 'Nc6',
                                  stats: { white: 113284, draws: 21026, black: 138583, games: 272893, averageRating: 2123 },
                                  openingName: 'Caro-Kann Defense: Exchange Variation',
                                  children: [
                                    {
                                      san: 'Bd3',
                                      stats: { white: 25414, draws: 4404, black: 28569, games: 58387, averageRating: 2111 },
                                      children: [
                                        {
                                          san: 'Bg4',
                                          stats: { white: 24703, draws: 4287, black: 27282, games: 56272, averageRating: 2131 },
                                          children: [
                                            {
                                              san: 'c3',
                                              stats: { white: 21188, draws: 3804, black: 22428, games: 47420, averageRating: 2116 },
                                              children: [],
                                            },
                                          ],
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                    {
                      san: 'Nc3',
                      stats: { white: 93698, draws: 14314, black: 84890, games: 192902, averageRating: 2130 },
                      openingName: 'Caro-Kann Defense: Two Knights Attack',
                      children: [
                        {
                          san: 'dxe4',
                          stats: { white: 92167, draws: 14900, black: 75876, games: 182943, averageRating: 2130 },
                          children: [
                            {
                              san: 'Nxe4',
                              stats: { white: 91475, draws: 14819, black: 75213, games: 181507, averageRating: 2140 },
                              children: [
                                {
                                  san: 'Nf6',
                                  stats: { white: 49912, draws: 9079, black: 45994, games: 104985, averageRating: 2148 },
                                  children: [
                                    {
                                      san: 'Qe2',
                                      stats: { white: 21922, draws: 3799, black: 17382, games: 43103, averageRating: 2174 },
                                      children: [
                                        {
                                          san: 'Nxe4',
                                          stats: { white: 16075, draws: 3124, black: 13424, games: 32623, averageRating: 2172 },
                                          children: [
                                            {
                                              san: 'Qxe4',
                                              stats: { white: 16072, draws: 3123, black: 13413, games: 32608, averageRating: 2179 },
                                              children: [],
                                            },
                                          ],
                                        },
                                      ],
                                    },
                                    {
                                      san: 'Nxf6+',
                                      stats: { white: 16020, draws: 3270, black: 16693, games: 35983, averageRating: 2141 },
                                      children: [
                                        {
                                          san: 'exf6',
                                          stats: { white: 14608, draws: 3040, black: 15321, games: 32969, averageRating: 2140 },
                                          children: [
                                            {
                                              san: 'd4',
                                              stats: { white: 7590, draws: 1545, black: 7794, games: 16929, averageRating: 2150 },
                                              children: [],
                                            },
                                          ],
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              san: 'Nc3',
              stats: { white: 157977, draws: 25043, black: 148419, games: 331439, averageRating: 2135 },
              openingName: 'Caro-Kann Defense',
              children: [
                {
                  san: 'd5',
                  stats: { white: 147770, draws: 23974, black: 140424, games: 312168, averageRating: 2136 },
                  openingName: 'Caro-Kann Defense',
                  children: [
                    {
                      san: 'Nf3',
                      stats: { white: 81289, draws: 13401, black: 69042, games: 163732, averageRating: 2159 },
                      openingName: 'Caro-Kann Defense: Two Knights Attack',
                      children: [
                        {
                          san: 'dxe4',
                          stats: { white: 92167, draws: 14900, black: 75876, games: 182943, averageRating: 2130 },
                          children: [
                            {
                              san: 'Nxe4',
                              stats: { white: 91475, draws: 14819, black: 75213, games: 181507, averageRating: 2140 },
                              children: [
                                {
                                  san: 'Nf6',
                                  stats: { white: 49912, draws: 9079, black: 45994, games: 104985, averageRating: 2148 },
                                  children: [
                                    {
                                      san: 'Qe2',
                                      stats: { white: 21922, draws: 3799, black: 17382, games: 43103, averageRating: 2174 },
                                      children: [
                                        {
                                          san: 'Nxe4',
                                          stats: { white: 16075, draws: 3124, black: 13424, games: 32623, averageRating: 2172 },
                                          children: [
                                            {
                                              san: 'Qxe4',
                                              stats: { white: 16072, draws: 3123, black: 13413, games: 32608, averageRating: 2179 },
                                              children: [],
                                            },
                                          ],
                                        },
                                      ],
                                    },
                                    {
                                      san: 'Nxf6+',
                                      stats: { white: 16020, draws: 3270, black: 16693, games: 35983, averageRating: 2141 },
                                      children: [
                                        {
                                          san: 'exf6',
                                          stats: { white: 14608, draws: 3040, black: 15321, games: 32969, averageRating: 2140 },
                                          children: [
                                            {
                                              san: 'd4',
                                              stats: { white: 7590, draws: 1545, black: 7794, games: 16929, averageRating: 2150 },
                                              children: [],
                                            },
                                          ],
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                    {
                      san: 'd4',
                      stats: { white: 17655, draws: 2793, black: 16436, games: 36884, averageRating: 2133 },
                      openingName: 'Caro-Kann Defense',
                      children: [
                        {
                          san: 'dxe4',
                          stats: { white: 345169, draws: 58650, black: 316994, games: 720813, averageRating: 2133 },
                          openingName: 'Caro-Kann Defense',
                          children: [
                            {
                              san: 'Nxe4',
                              stats: { white: 321564, draws: 56040, black: 297133, games: 674737, averageRating: 2135 },
                              openingName: 'Caro-Kann Defense: Main Line',
                              children: [
                                {
                                  san: 'Nf6',
                                  stats: { white: 166009, draws: 29591, black: 159471, games: 355071, averageRating: 2146 },
                                  children: [
                                    {
                                      san: 'Nxf6+',
                                      stats: { white: 110352, draws: 21001, black: 104176, games: 235529, averageRating: 2154 },
                                      children: [
                                        {
                                          san: 'exf6',
                                          stats: { white: 100542, draws: 19177, black: 94351, games: 214070, averageRating: 2152 },
                                          openingName: 'Caro-Kann Defense: Tartakower Variation',
                                          children: [
                                            {
                                              san: 'Nf3',
                                              stats: { white: 39932, draws: 7907, black: 41610, games: 89449, averageRating: 2129 },
                                              children: [],
                                            },
                                            {
                                              san: 'c3',
                                              stats: { white: 32732, draws: 5828, black: 25469, games: 64029, averageRating: 2197 },
                                              children: [],
                                            },
                                            {
                                              san: 'Bc4',
                                              stats: { white: 12522, draws: 2564, black: 11782, games: 26868, averageRating: 2143 },
                                              openingName: 'Caro-Kann Defense: Forgacs Variation',
                                              children: [],
                                            },
                                          ],
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  },
]

export const lessonMetas: LessonMeta[] = [
  {
    lessonId: 0,
    intro:
      'The Advance Variation (3.e5) with the Short Classical setup (4.Nf3). White grabs space but you develop your bishop actively to f5 first, then build a solid position with e6 and Nd7.',
    themes: ['Bishop development', 'Pawn chains', 'Solid structure'],
    whenToPlay:
      'This is your go-to line when White plays 3.e5 followed by 4.Nf3. One of the most common setups in the Advance.',
  },
  {
    lessonId: 1,
    intro:
      'The Advance Variation with 5.Bd3, trading bishops. After Bxd3 Qxd3, you have a simplified but solid position.',
    themes: ['Bishop trade', 'Simplification', 'Solid play'],
    whenToPlay:
      'You\'ll see this when White offers the bishop trade with Bd3 in the Advance Short Classical.',
  },
  {
    lessonId: 2,
    intro:
      'The Advance with 5.c3, reinforcing d4. You develop naturally with Nd7 and aim to undermine e5.',
    themes: ['Pawn structure', 'Strategic undermining', 'Natural development'],
    whenToPlay:
      'A common quiet setup in the Advance Variation.',
  },
  {
    lessonId: 3,
    intro:
      'The Bayonet Attack (4.Nc3 followed by g4) — White storms the kingside to kick your bishop. Looks scary, but your bishop retreats safely to g6.',
    themes: ['Kingside defense', 'Bishop retreat', 'Handling aggression'],
    whenToPlay:
      'When White plays Nc3 and g4 in the Advance. The key is not to panic — Bg6 is always safe.',
  },
  {
    lessonId: 4,
    intro:
      'The Bayonet Attack with Nge2 instead of g4. White takes a quieter approach and you respond with standard Nd7 development.',
    themes: ['Flexible development', 'Quiet lines', 'Knight placement'],
    whenToPlay:
      'When White plays Nc3 and Nge2 in the Advance, delaying g4.',
  },
  {
    lessonId: 5,
    intro:
      'The Tal Variation (4.h4) — White immediately pushes the h-pawn. You stop it with h5 and maintain your bishop.',
    themes: ['Prophylactic play', 'Pawn structure', 'Bishop safety'],
    whenToPlay:
      'When White plays 4.h4 in the Advance. Named after Mikhail Tal, but you have a solid response.',
  },
  {
    lessonId: 6,
    intro:
      'The Tal Variation with 5.c3. After stopping h5, White reinforces d4 and you play e6 for a solid setup.',
    themes: ['Prophylactic play', 'Center control', 'Solid structure'],
    whenToPlay:
      'After 4.h4 h5 5.c3 in the Advance Variation.',
  },
  {
    lessonId: 7,
    intro:
      'The Classical Variation main line: 4...Bf5 5.Ng3 Bg6 6.h4 h6 7.Nf3 Nd7. The most trusted line in the Caro-Kann, played by world champions for over a century.',
    themes: ['Active bishops', 'Prophylactic h6', 'Solid development'],
    whenToPlay:
      'The gold standard of the Caro-Kann. Play this when White goes 3.Nc3 and you want the most reliable setup.',
  },
  {
    lessonId: 8,
    intro:
      'The Classical Variation where White plays h5 after h4, pushing your bishop further. You retreat to h7 — passive but playable.',
    themes: ['Deep retreat', 'Positional resilience', 'Bishop safety'],
    whenToPlay:
      'When White pushes h5 in the Classical. Your bishop ends up passive on h7, but the position is still solid.',
  },
  {
    lessonId: 9,
    intro:
      'The Classical Variation with Nf3 before h4. You develop Nd7 and if h4 comes, you know to answer h6.',
    themes: ['Flexible development', 'Move order', 'Prophylaxis'],
    whenToPlay:
      'A common move order in the Classical — Nf3 before h4.',
  },
  {
    lessonId: 10,
    intro:
      'Classical Variation with 5.Nf3 instead of 5.Ng3. You retreat the bishop to g6 as usual.',
    themes: ['Bishop retreat', 'Classical setup', 'Solid play'],
    whenToPlay:
      'When White plays Nf3 before attacking your bishop in the Classical.',
  },
  {
    lessonId: 11,
    intro:
      'The Modern Classical (4...Nd7): you develop the knight first, then Ngf6 challenges the e4 knight. After Nxf6+ you recapture and have a balanced position.',
    themes: ['Flexibility', 'Knight development', 'Modern approach'],
    whenToPlay:
      'Choose this over 4...Bf5 when you want flexibility. Popular at the top level.',
  },
  {
    lessonId: 12,
    intro:
      'The Modern Classical with 5...Ngf6 and White retreats Ng3. You play e6 for a solid structure.',
    themes: ['Flexibility', 'Natural development', 'Modern play'],
    whenToPlay:
      'When White plays Ng3 instead of Nxf6+ in the Modern Classical.',
  },
  {
    lessonId: 13,
    intro:
      'The Modern Classical against 5.Bc4, where White develops the bishop aggressively. You challenge with Ngf6.',
    themes: ['Active defense', 'Knight development', 'Challenging the center'],
    whenToPlay:
      'When White plays Bc4 in the 4...Nd7 Classical.',
  },
  {
    lessonId: 14,
    intro:
      'The Exchange Variation with 4.Bd3 — the quiet approach. You develop Nc6 targeting d4, then Nf6 for quick castling.',
    themes: ['Natural development', 'Targeting d4', 'Equal chances'],
    whenToPlay:
      'One of the easiest lines to play — just develop naturally.',
  },
  {
    lessonId: 15,
    intro:
      'The Exchange Variation with 4.Bd3 and Nf3. You develop Nc6 and Nf6 for a comfortable position.',
    themes: ['Natural development', 'Simple play', 'Comfortable equality'],
    whenToPlay:
      'Another quiet Exchange setup where you develop smoothly.',
  },
  {
    lessonId: 16,
    intro:
      'The Panov-Botvinnik Attack (4.c4) — the sharpest Exchange line. White attacks d5, you defend with Nf6 and e6, leading to rich IQP positions.',
    themes: ['IQP positions', 'Dynamic play', 'Center tension'],
    whenToPlay:
      'The most ambitious Exchange line. Well-prepared Black players do very well here.',
  },
  {
    lessonId: 17,
    intro:
      'The Panov-Botvinnik with 5.Nf3 instead of 5.Nc3. Same ideas — defend d5 with e6 and aim for IQP play.',
    themes: ['IQP positions', 'Flexible development', 'Center play'],
    whenToPlay:
      'A common move order in the Panov-Botvinnik.',
  },
  {
    lessonId: 18,
    intro:
      'The Exchange Variation with 4.Nf3 — another quiet approach. You develop Nc6 naturally.',
    themes: ['Natural development', 'Simple equality', 'Knight placement'],
    whenToPlay:
      'A quiet Exchange setup. Develop naturally and you\'ll be fine.',
  },
  {
    lessonId: 19,
    intro:
      'The Two Knights Variation (3.Nd2) with Nxf6+ exf6 — you recapture toward the center, keeping flexible pawn structure.',
    themes: ['Pawn structure', 'Open e-file', 'Recapture decisions'],
    whenToPlay:
      'When White trades on f6 in the Two Knights. The doubled f-pawns look odd but are fine.',
  },
  {
    lessonId: 20,
    intro:
      'The Two Knights Variation (3.Nd2) with Ng3 — White retreats the knight. You play e6 for a solid Classical-type position.',
    themes: ['Solid structure', 'Classical transposition', 'Natural development'],
    whenToPlay:
      'When White plays Ng3 in the Two Knights, similar to the Classical.',
  },
  {
    lessonId: 21,
    intro:
      'The Fantasy Variation (3.f3) — White\'s most ambitious try. You punish it with dxe4, then e5 to blast open the center. Pin the knight with Bg4!',
    themes: ['Punishing overextension', 'Central counterplay', 'Tactical alertness'],
    whenToPlay:
      'Against aggressive players who want to crush you in the center. Once you know dxe4 then e5, you\'ll welcome it.',
  },
  {
    lessonId: 22,
    intro:
      'The Fantasy Variation with dxe5 Qxd1+ — White takes on e5 and you trade queens for a favorable endgame.',
    themes: ['Endgame transition', 'Queen trade', 'Structural advantage'],
    whenToPlay:
      'When White captures dxe5 in the Fantasy. The queen trade leads to a comfortable endgame for Black.',
  },
]




























