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
    tree: {
      san: 'e4',
      openingName: "King's Pawn Game",
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
                    // 3.e5 — Advance Variation
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
                            // 4.Nf3 — Short Classical
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
                                      san: 'Be2',
                                      stats: { white: 2890, draws: 1710, black: 2944, games: 7544, averageRating: 2179 },
                                      openingName: 'Caro-Kann Defense: Advance Variation, Short Variation with 5.Be2',
                                      children: [
                                        {
                                          san: 'Nd7',
                                          stats: { white: 1205, draws: 738, black: 1289, games: 3232, averageRating: 2185 },
                                          openingName: 'Caro-Kann Defense: Advance Variation, Short Variation',
                                          explanation:
                                            'The knight heads to d7, keeping options open for f6 or b6 later. This is the main line of the Advance.',
                                          coaching:
                                            'Your knight goes to d7 — a flexible square. From here it can jump to f6 (to pressure e4), go to b6 (eyeing c4), or even reroute via f8 to g6. This is the main line of the Advance Caro-Kann, and you\'re in a solid, well-known position. Well played!',
                                          children: [],
                                        },
                                      ],
                                    },
                                    {
                                      san: 'Bd3',
                                      stats: { white: 1402, draws: 812, black: 1351, games: 3565, averageRating: 2168 },
                                      openingName: 'Caro-Kann Defense: Advance Variation, Short Variation with 5.Bd3',
                                      children: [
                                        {
                                          san: 'Bxd3',
                                          stats: { white: 890, draws: 501, black: 842, games: 2233, averageRating: 2170 },
                                          openingName: 'Caro-Kann Defense: Advance Variation, Short Variation',
                                          explanation:
                                            'You trade off bishops on d3, doubling White\'s pawns and simplifying the position.',
                                          coaching:
                                            'White puts their bishop on d3 to trade off your strong bishop. You take — after Qxd3 or cxd3, White\'s pawn structure is slightly damaged. The position is solid and you\'re ready to develop your knight to d7 and castle.',
                                          children: [
                                            {
                                              san: 'Qxd3',
                                              stats: { white: 512, draws: 298, black: 488, games: 1298, averageRating: 2165 },
                                              openingName: 'Caro-Kann Defense: Advance Variation',
                                              children: [
                                                {
                                                  san: 'Nd7',
                                                  stats: { white: 310, draws: 185, black: 302, games: 797, averageRating: 2168 },
                                                  openingName: 'Caro-Kann Defense: Advance Variation',
                                                  explanation:
                                                    'The knight develops to d7, preparing to challenge the e5 pawn.',
                                                  coaching:
                                                    'Standard development — the knight goes to d7, ready to go to e7-f5 or f8-g6. You\'ve traded off the bishops and have a comfortable position.',
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
                                      stats: { white: 1105, draws: 618, black: 1072, games: 2795, averageRating: 2174 },
                                      openingName: 'Caro-Kann Defense: Advance Variation, Short Variation with 5.c3',
                                      children: [
                                        {
                                          san: 'Nd7',
                                          stats: { white: 602, draws: 345, black: 598, games: 1545, averageRating: 2178 },
                                          openingName: 'Caro-Kann Defense: Advance Variation',
                                          explanation:
                                            'The knight develops to d7, keeping flexible options.',
                                          coaching:
                                            'After c3, White reinforces d4. You develop the knight to d7 as usual — flexible and solid. The position is a standard Advance Caro-Kann where you\'ll aim to undermine e5 with f6.',
                                          children: [],
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                            // 4.Nc3 — with g4 Bayonet
                            {
                              san: 'Nc3',
                              stats: { white: 3890, draws: 2015, black: 3601, games: 9506, averageRating: 2160 },
                              openingName: 'Caro-Kann Defense: Advance Variation, Nc3',
                              variationName: 'Bayonet Attack',
                              children: [
                                {
                                  san: 'e6',
                                  stats: { white: 2680, draws: 1412, black: 2508, games: 6600, averageRating: 2164 },
                                  openingName: 'Caro-Kann Defense: Advance Variation',
                                  explanation:
                                    'You solidify d5 and keep things solid before White launches the kingside pawn storm.',
                                  coaching:
                                    'Same idea as the Short Classical — bishop is out, now lock in with e6. White is planning to push g4 to kick your bishop, which is why this line is called the Bayonet Attack. Don\'t panic when you see g4 coming — you have a safe retreat square.',
                                  children: [
                                    {
                                      san: 'g4',
                                      stats: { white: 1120, draws: 555, black: 1045, games: 2720, averageRating: 2155 },
                                      openingName: 'Caro-Kann Defense: Advance Variation, Bayonet Attack',
                                      children: [
                                        {
                                          san: 'Bg6',
                                          stats: { white: 1005, draws: 498, black: 942, games: 2445, averageRating: 2158 },
                                          openingName: 'Caro-Kann Defense: Advance Variation, Bayonet Attack',
                                          explanation:
                                            'The bishop retreats to g6, the only safe square. From here it still watches over key light squares.',
                                          coaching:
                                            'When White plays g4, don\'t worry — just retreat to g6. Your bishop is still doing great work from this square, controlling e4 and h5. White spent a tempo pushing a pawn, while your bishop remains active. The Bayonet Attack looks scary, but you\'re perfectly fine here.',
                                          wrongMoveResponses: {
                                            'Bg4': 'Your bishop can\'t go to g4 — there\'s a white pawn there! Bg6 is the right retreat.',
                                            'Be4': 'That square is too exposed. White\'s Nc3 can kick it away. Bg6 is the safe, active retreat square.',
                                          },
                                          children: [],
                                        },
                                      ],
                                    },
                                    {
                                      san: 'Nge2',
                                      stats: { white: 890, draws: 478, black: 812, games: 2180, averageRating: 2162 },
                                      openingName: 'Caro-Kann Defense: Advance Variation',
                                      children: [
                                        {
                                          san: 'Nd7',
                                          stats: { white: 512, draws: 280, black: 478, games: 1270, averageRating: 2165 },
                                          openingName: 'Caro-Kann Defense: Advance Variation',
                                          explanation:
                                            'The knight develops to d7, preparing to challenge e5.',
                                          coaching:
                                            'White\'s knight goes to e2 instead of f3, staying out of the way of the f-pawn. You continue with Nd7, the standard developing move. Your plan is the same: undermine e5 with c5 or f6.',
                                          children: [],
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                            // 4.h4 — Tal Variation
                            {
                              san: 'h4',
                              stats: { white: 2108, draws: 1012, black: 1890, games: 5010, averageRating: 2155 },
                              openingName: 'Caro-Kann Defense: Advance Variation, Tal Variation',
                              variationName: 'Tal Variation',
                              children: [
                                {
                                  san: 'h5',
                                  stats: { white: 1580, draws: 778, black: 1445, games: 3803, averageRating: 2160 },
                                  openingName: 'Caro-Kann Defense: Advance Variation, Tal Variation with 4...h5',
                                  explanation:
                                    'You stop h5, preventing White from harassing your bishop further.',
                                  coaching:
                                    'White plays h4 trying to play h5 and trap or exchange your bishop. You respond with h5, stopping that idea in its tracks. Your bishop stays safe on f5 and White has weakened their kingside. This is the main line — simple and effective.',
                                  children: [
                                    {
                                      san: 'Bd3',
                                      stats: { white: 510, draws: 258, black: 472, games: 1240, averageRating: 2158 },
                                      openingName: 'Caro-Kann Defense: Advance Variation, Tal Variation',
                                      children: [
                                        {
                                          san: 'Bxd3',
                                          stats: { white: 320, draws: 168, black: 302, games: 790, averageRating: 2155 },
                                          openingName: 'Caro-Kann Defense: Advance Variation, Tal Variation',
                                          explanation: 'You trade bishops, simplifying the position.',
                                          coaching: 'White offers the bishop trade on d3. You take it — after Qxd3, your position is solid and you can develop smoothly with e6, Nd7, and Ne7.',
                                          children: [],
                                        },
                                      ],
                                    },
                                    {
                                      san: 'c3',
                                      stats: { white: 405, draws: 198, black: 367, games: 970, averageRating: 2152 },
                                      openingName: 'Caro-Kann Defense: Advance Variation, Tal Variation',
                                      children: [
                                        {
                                          san: 'e6',
                                          stats: { white: 248, draws: 128, black: 234, games: 610, averageRating: 2155 },
                                          openingName: 'Caro-Kann Defense: Advance Variation, Tal Variation',
                                          explanation: 'You solidify d5 with e6.',
                                          coaching: 'After c3 reinforcing d4, you play e6 to complete your pawn structure. Your bishop is safely on f5 and you\'re ready to develop with Nd7 and Ne7.',
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
                    // 3.Nc3 — Classical Variation
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
                                // 4...Bf5 main line
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
                                                  stats: { white: 3890, draws: 2198, black: 3401, games: 9489, averageRating: 2208 },
                                                  openingName: 'Caro-Kann Defense: Classical Variation, Main Line',
                                                  explanation:
                                                    'You stop h5, preventing White from trading off your bishop. A critical defensive move.',
                                                  coaching:
                                                    'This is a must-know move! White plays h4 threatening h5, which would trade off your beautiful bishop. By playing h6, you put a stop to that idea permanently. It looks like a small move, but it\'s one of the most important in the entire Classical Caro-Kann. Without it, you lose your best piece.',
                                                  wrongMoveResponses: {
                                                    'h5': 'That actually helps White! After h5, White can play the bishop to h7 and it gets trapped. You want h6 to stop White\'s h5 push.',
                                                    'Nf6': 'Development is good, but White will play h5 next move and trap or trade your bishop. h6 first — save the bishop!',
                                                  },
                                                  children: [
                                                    {
                                                      san: 'Nf3',
                                                      stats: { white: 2102, draws: 1205, black: 1845, games: 5152, averageRating: 2210 },
                                                      openingName: 'Caro-Kann Defense: Classical Variation, Main Line',
                                                      children: [
                                                        {
                                                          san: 'Nd7',
                                                          stats: { white: 1480, draws: 862, black: 1312, games: 3654, averageRating: 2212 },
                                                          openingName: 'Caro-Kann Defense: Classical Variation, Main Line',
                                                          explanation:
                                                            'The knight develops to d7, heading for f6 or supporting e5. Flexible and solid.',
                                                          coaching:
                                                            'Your knight goes to d7, the standard developing move. From d7 it can go to f6 (the most natural) or even to b6. You\'re following the Classical main line perfectly — your position is sound, your pieces are coordinated, and you\'re ready to castle. Great work!',
                                                          children: [],
                                                        },
                                                      ],
                                                    },
                                                    {
                                                      san: 'h5',
                                                      stats: { white: 1012, draws: 578, black: 890, games: 2480, averageRating: 2198 },
                                                      openingName: 'Caro-Kann Defense: Classical Variation',
                                                      children: [
                                                        {
                                                          san: 'Bh7',
                                                          stats: { white: 890, draws: 512, black: 788, games: 2190, averageRating: 2200 },
                                                          openingName: 'Caro-Kann Defense: Classical Variation',
                                                          explanation:
                                                            'The bishop retreats to h7, out of danger. It\'s passive but safe.',
                                                          coaching:
                                                            'After h5, your bishop has to retreat further to h7. It\'s not ideal — the bishop is passive here — but the position is still solid. This is why most players prefer to play h6 earlier, to prevent this. But even from h7, you have a playable game.',
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
                                              stats: { white: 3105, draws: 1789, black: 2701, games: 7595, averageRating: 2199 },
                                              openingName: 'Caro-Kann Defense: Classical Variation, Main Line',
                                              children: [
                                                {
                                                  san: 'Nd7',
                                                  stats: { white: 1802, draws: 1045, black: 1589, games: 4436, averageRating: 2202 },
                                                  openingName: 'Caro-Kann Defense: Classical Variation, Main Line',
                                                  explanation:
                                                    'The knight develops to d7, a flexible square.',
                                                  coaching:
                                                    'Nd7 is the standard developing move. From d7, the knight can go to f6 to develop naturally, or support a c5 break later.',
                                                  children: [
                                                    {
                                                      san: 'h4',
                                                      stats: { white: 802, draws: 478, black: 712, games: 1992, averageRating: 2205 },
                                                      openingName: 'Caro-Kann Defense: Classical Variation',
                                                      children: [
                                                        {
                                                          san: 'h6',
                                                          stats: { white: 605, draws: 368, black: 542, games: 1515, averageRating: 2208 },
                                                          openingName: 'Caro-Kann Defense: Classical Variation',
                                                          explanation: 'Stopping h5 once again — a key prophylactic move.',
                                                          coaching: 'Same idea — whenever White plays h4, answer with h6 to keep your bishop safe on g6. This is a pattern you should internalize for all Classical Caro-Kann positions.',
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
                                      san: 'Nf3',
                                      stats: { white: 2205, draws: 1212, black: 1908, games: 5325, averageRating: 2190 },
                                      openingName: 'Caro-Kann Defense: Classical Variation, 5.Nf3',
                                      children: [
                                        {
                                          san: 'Bg6',
                                          stats: { white: 1512, draws: 845, black: 1302, games: 3659, averageRating: 2192 },
                                          openingName: 'Caro-Kann Defense: Classical Variation',
                                          explanation: 'The bishop retreats to g6, the natural square.',
                                          coaching: 'After Nf3, the knight doesn\'t threaten the bishop directly, but Bg6 is still the right retreat — it\'s the most flexible square for the bishop in the Classical.',
                                          children: [],
                                        },
                                      ],
                                    },
                                  ],
                                },
                                // 4...Nd7 alternative
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
                                      stats: { white: 2512, draws: 1368, black: 2189, games: 6069, averageRating: 2208 },
                                      openingName: 'Caro-Kann Defense: Classical Variation, 4...Nd7',
                                      children: [
                                        {
                                          san: 'Ngf6',
                                          stats: { white: 2105, draws: 1156, black: 1845, games: 5106, averageRating: 2210 },
                                          openingName: 'Caro-Kann Defense: Classical Variation, 4...Nd7',
                                          explanation:
                                            'The second knight develops to f6, challenging the e4 knight directly.',
                                          coaching:
                                            'Now you bring out the second knight to f6, directly attacking White\'s powerful e4 knight. White has to react — usually the knight retreats to g3. You\'re developing with tempo and fighting for the center. This is efficient, active play.',
                                          wrongMoveResponses: {
                                            'e6': 'The pawn move is too slow here. Ngf6 challenges the e4 knight directly, developing with tempo.',
                                          },
                                          children: [
                                            {
                                              san: 'Nxf6+',
                                              stats: { white: 1402, draws: 778, black: 1245, games: 3425, averageRating: 2212 },
                                              openingName: 'Caro-Kann Defense: Classical Variation',
                                              children: [
                                                {
                                                  san: 'Nxf6',
                                                  stats: { white: 1380, draws: 768, black: 1230, games: 3378, averageRating: 2212 },
                                                  openingName: 'Caro-Kann Defense: Classical Variation',
                                                  explanation:
                                                    'You recapture with the knight, keeping active piece placement.',
                                                  coaching:
                                                    'You take back with the knight, maintaining active piece placement. Your knight is well-posted on f6, controlling key central squares. You\'re ready to develop with Bf5 or Bg4 and castle.',
                                                  children: [],
                                                },
                                              ],
                                            },
                                            {
                                              san: 'Ng3',
                                              stats: { white: 502, draws: 278, black: 445, games: 1225, averageRating: 2205 },
                                              openingName: 'Caro-Kann Defense: Classical Variation',
                                              children: [
                                                {
                                                  san: 'e6',
                                                  stats: { white: 305, draws: 172, black: 278, games: 755, averageRating: 2208 },
                                                  openingName: 'Caro-Kann Defense: Classical Variation',
                                                  explanation:
                                                    'You complete the solid pawn structure, ready to develop the bishop and castle.',
                                                  coaching:
                                                    'Now e6 makes sense — your knights are developed, and you\'re completing your pawn structure. You can develop your dark-squared bishop (to d6 or e7) and castle next. Your light-squared bishop can still come to f5 or d7 depending on the position. Well played through the Modern Classical!',
                                                  children: [],
                                                },
                                              ],
                                            },
                                          ],
                                        },
                                      ],
                                    },
                                    {
                                      san: 'Bc4',
                                      stats: { white: 1205, draws: 645, black: 1012, games: 2862, averageRating: 2195 },
                                      openingName: 'Caro-Kann Defense: Classical Variation, 4...Nd7 5.Bc4',
                                      children: [
                                        {
                                          san: 'Ngf6',
                                          stats: { white: 845, draws: 462, black: 718, games: 2025, averageRating: 2198 },
                                          openingName: 'Caro-Kann Defense: Classical Variation',
                                          explanation: 'Developing the knight to f6 and challenging the e4 knight.',
                                          coaching: 'Same idea — Ngf6 to challenge White\'s strong e4 knight. After the knights trade, you\'ll have a comfortable position.',
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
                    // 3.exd5 — Exchange Variation
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
                            // 4.Bd3
                            {
                              san: 'Bd3',
                              stats: { white: 6802, draws: 4212, black: 6401, games: 17415, averageRating: 2175 },
                              openingName: 'Caro-Kann Defense: Exchange Variation, 4.Bd3',
                              variationName: 'Quiet Exchange',
                              children: [
                                {
                                  san: 'Nc6',
                                  stats: { white: 2802, draws: 1789, black: 2689, games: 7280, averageRating: 2178 },
                                  openingName: 'Caro-Kann Defense: Exchange Variation',
                                  explanation:
                                    'The knight develops to c6, putting pressure on d4 right away.',
                                  coaching:
                                    'Nc6 is the natural, active developing move. Your knight pressures White\'s d4 pawn immediately, and you\'re following a basic opening principle: develop knights before bishops, and aim them toward the center.',
                                  wrongMoveResponses: {
                                    'Bf5': 'Bf5 is playable but slightly premature — White can play Qf3 to create uncomfortable pressure. Nc6 develops with a purpose, targeting d4.',
                                    'e6': 'Too passive! You don\'t need to protect d5 with e6 in the Exchange — it\'s not under attack. Develop your pieces instead.',
                                  },
                                  children: [
                                    {
                                      san: 'c3',
                                      stats: { white: 1305, draws: 845, black: 1245, games: 3395, averageRating: 2180 },
                                      openingName: 'Caro-Kann Defense: Exchange Variation',
                                      children: [
                                        {
                                          san: 'Nf6',
                                          stats: { white: 905, draws: 598, black: 868, games: 2371, averageRating: 2182 },
                                          openingName: 'Caro-Kann Defense: Exchange Variation',
                                          explanation:
                                            'The kingside knight develops to f6, controlling e4 and preparing to castle.',
                                          coaching:
                                            'Perfect — your second knight comes to f6, the most natural square. You\'re controlling e4, developing toward the center, and you\'re almost ready to castle. The Quiet Exchange gives you a comfortable, easy-to-play position. Well done!',
                                          children: [],
                                        },
                                      ],
                                    },
                                    {
                                      san: 'Nf3',
                                      stats: { white: 1012, draws: 658, black: 978, games: 2648, averageRating: 2176 },
                                      openingName: 'Caro-Kann Defense: Exchange Variation',
                                      children: [
                                        {
                                          san: 'Nf6',
                                          stats: { white: 712, draws: 468, black: 690, games: 1870, averageRating: 2178 },
                                          openingName: 'Caro-Kann Defense: Exchange Variation',
                                          explanation: 'Natural development to f6.',
                                          coaching: 'Nf6 develops with purpose — controlling e4 and getting ready to castle. The Exchange Variation is all about smooth, natural development.',
                                          children: [],
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                            // 4.c4 — Panov-Botvinnik
                            {
                              san: 'c4',
                              stats: { white: 5108, draws: 2912, black: 4602, games: 12622, averageRating: 2185 },
                              openingName: 'Caro-Kann Defense: Panov-Botvinnik Attack',
                              variationName: 'Panov-Botvinnik Attack',
                              children: [
                                {
                                  san: 'Nf6',
                                  stats: { white: 4012, draws: 2301, black: 3612, games: 9925, averageRating: 2188 },
                                  openingName: 'Caro-Kann Defense: Panov-Botvinnik Attack',
                                  explanation:
                                    'The knight develops to f6, putting pressure on the center and preparing rapid development.',
                                  coaching:
                                    'White plays c4, attacking your d5 pawn — this is the Panov-Botvinnik Attack, the most ambitious line in the Exchange. You respond with Nf6, developing a piece and defending d5. This leads to rich middlegame positions, often with an isolated d-pawn for White, which you can target later.',
                                  wrongMoveResponses: {
                                    'dxc4': 'Taking on c4 gives White exactly what they want — a lead in development and open lines. Keep your d5 pawn and develop with Nf6.',
                                    'e6': 'e6 is too passive. Nf6 develops a piece AND defends d5 at the same time. Always prefer active moves!',
                                  },
                                  children: [
                                    {
                                      san: 'Nc3',
                                      stats: { white: 2501, draws: 1445, black: 2245, games: 6191, averageRating: 2190 },
                                      openingName: 'Caro-Kann Defense: Panov-Botvinnik Attack',
                                      children: [
                                        {
                                          san: 'e6',
                                          stats: { white: 1502, draws: 878, black: 1345, games: 3725, averageRating: 2192 },
                                          openingName: 'Caro-Kann Defense: Panov-Botvinnik Attack',
                                          explanation:
                                            'You solidify d5 and prepare to develop the bishop. This leads to rich IQP middlegame positions.',
                                          coaching:
                                            'Now e6 is correct — you\'re reinforcing d5 against White\'s pressure. After White captures (cxd5 exd5 or Nxd5), you\'ll get positions with an isolated queen\'s pawn (IQP). These are rich, dynamic middlegames where both sides have chances. You\'ve navigated the Panov-Botvinnik well!',
                                          children: [],
                                        },
                                      ],
                                    },
                                    {
                                      san: 'Nf3',
                                      stats: { white: 1102, draws: 612, black: 978, games: 2692, averageRating: 2185 },
                                      openingName: 'Caro-Kann Defense: Panov-Botvinnik Attack',
                                      children: [
                                        {
                                          san: 'e6',
                                          stats: { white: 658, draws: 378, black: 602, games: 1638, averageRating: 2188 },
                                          openingName: 'Caro-Kann Defense: Panov-Botvinnik Attack',
                                          explanation: 'Solidifying d5 against White\'s pressure.',
                                          coaching: 'Same idea — e6 shores up d5 and prepares to develop the dark-squared bishop. The Panov-Botvinnik often transposes into IQP structures.',
                                          children: [],
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                            // 4.Nf3
                            {
                              san: 'Nf3',
                              stats: { white: 4205, draws: 2612, black: 3912, games: 10729, averageRating: 2178 },
                              openingName: 'Caro-Kann Defense: Exchange Variation, 4.Nf3',
                              children: [
                                {
                                  san: 'Nc6',
                                  stats: { white: 1502, draws: 945, black: 1412, games: 3859, averageRating: 2180 },
                                  openingName: 'Caro-Kann Defense: Exchange Variation',
                                  explanation: 'The knight develops to c6, pressuring d4.',
                                  coaching: 'Nc6 targets d4 — the most active developing move in the Exchange. You\'re building up pressure on White\'s center.',
                                  children: [],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                    // 3.Nd2 — Two Knights Variation
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
                                  explanation: 'Developing the knight to f6 and challenging the e4 knight.',
                                  coaching: 'Nf6 challenges the e4 knight directly. White usually has to retreat with Nxf6+ or Ng3, and you get a comfortable position with natural development.',
                                  children: [
                                    {
                                      san: 'Nxf6+',
                                      stats: { white: 2102, draws: 1212, black: 1845, games: 5159, averageRating: 2195 },
                                      openingName: 'Caro-Kann Defense: Two Knights Attack',
                                      children: [
                                        {
                                          san: 'exf6',
                                          stats: { white: 1105, draws: 645, black: 978, games: 2728, averageRating: 2198 },
                                          openingName: 'Caro-Kann Defense: Two Knights Attack',
                                          explanation: 'You recapture toward the center, keeping the pawn structure flexible.',
                                          coaching: 'Taking with the e-pawn opens your bishop\'s diagonal and gives you a semi-open e-file. The doubled f-pawns look unusual but give you control of key central squares.',
                                          children: [],
                                        },
                                      ],
                                    },
                                    {
                                      san: 'Ng3',
                                      stats: { white: 1805, draws: 1032, black: 1578, games: 4415, averageRating: 2190 },
                                      openingName: 'Caro-Kann Defense: Two Knights Attack',
                                      children: [
                                        {
                                          san: 'e6',
                                          stats: { white: 802, draws: 468, black: 712, games: 1982, averageRating: 2192 },
                                          openingName: 'Caro-Kann Defense: Two Knights Attack',
                                          explanation: 'You play e6 to solidify d5.',
                                          coaching: 'After Ng3, you can play e6 to shore up d5. Your light-squared bishop can still come out via d7 or even f5 later. Standard Caro-Kann play.',
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
                    // 3.f3 — Fantasy Variation
                    {
                      san: 'f3',
                      stats: { white: 5012, draws: 2501, black: 5108, games: 12621, averageRating: 2152 },
                      openingName: 'Caro-Kann Defense: Fantasy Variation',
                      variationName: 'Fantasy Variation',
                      children: [
                        {
                          san: 'dxe4',
                          stats: { white: 2890, draws: 1402, black: 3012, games: 7304, averageRating: 2148 },
                          openingName: 'Caro-Kann Defense: Fantasy Variation',
                          explanation:
                            'You take the pawn. After f3, White wants a massive center — challenge it immediately!',
                          coaching:
                            'White plays f3?! This is the Fantasy Variation — White wants to build a huge center with fxe4 and d4, but it weakens their king. You should take immediately with dxe4. Don\'t let White achieve their dream center for free!',
                          wrongMoveResponses: {
                            'e6': 'Too timid! White played a weakening move (f3), and you should punish it by taking the pawn. dxe4 forces White to recapture with the f-pawn, opening up their king.',
                            'Qb6': 'Qb6 targets b2, but it\'s too early for queen moves. Take the pawn first with dxe4 — the center is where the fight is.',
                          },
                          children: [
                            {
                              san: 'fxe4',
                              stats: { white: 2512, draws: 1212, black: 2612, games: 6336, averageRating: 2145 },
                              openingName: 'Caro-Kann Defense: Fantasy Variation',
                              children: [
                                {
                                  san: 'e5',
                                  stats: { white: 1302, draws: 612, black: 1389, games: 3303, averageRating: 2142 },
                                  openingName: 'Caro-Kann Defense: Fantasy Variation',
                                  explanation:
                                    'You strike at White\'s overextended center. This counterattack is the key idea against the Fantasy.',
                                  coaching:
                                    'Now for the knockout punch — e5! White\'s center looks big, but it\'s overextended. By striking with e5, you\'re exploiting the fact that White weakened their position with f3. After dxe5, you\'ll develop with tempo. This is the best response to the Fantasy and puts you in a great position.',
                                  wrongMoveResponses: {
                                    'Nf6': 'Nf6 is natural but too slow. You need to strike while the iron is hot! e5 challenges White\'s overextended center immediately.',
                                    'c5': 'c5 attacks d4 but e5 is stronger — it opens the center when White\'s king is vulnerable after playing f3.',
                                  },
                                  children: [
                                    {
                                      san: 'Nf3',
                                      stats: { white: 505, draws: 232, black: 545, games: 1282, averageRating: 2138 },
                                      openingName: 'Caro-Kann Defense: Fantasy Variation',
                                      children: [
                                        {
                                          san: 'Bg4',
                                          stats: { white: 302, draws: 138, black: 332, games: 772, averageRating: 2135 },
                                          openingName: 'Caro-Kann Defense: Fantasy Variation',
                                          explanation:
                                            'You pin the knight to the queen, cranking up the pressure on d4 and White\'s center.',
                                          coaching:
                                            'Bg4 pins White\'s knight to the queen — beautiful! You\'re piling up pressure on d4, and White is already in an uncomfortable position. The Fantasy Variation is fun for White to play, but if you know the right response, you come out on top. Excellent work through this line!',
                                          wrongMoveResponses: {
                                            'exd4': 'Taking on d4 trades off your active central pawn. Bg4 is better — pin the knight and keep the pressure building!',
                                          },
                                          children: [],
                                        },
                                      ],
                                    },
                                    {
                                      san: 'dxe5',
                                      stats: { white: 412, draws: 190, black: 445, games: 1047, averageRating: 2140 },
                                      openingName: 'Caro-Kann Defense: Fantasy Variation',
                                      children: [
                                        {
                                          san: 'Qxd1+',
                                          stats: { white: 245, draws: 125, black: 268, games: 638, averageRating: 2138 },
                                          openingName: 'Caro-Kann Defense: Fantasy Variation',
                                          explanation: 'You trade queens, heading for a favorable endgame.',
                                          coaching: 'After dxe5 Qxd1+, you trade queens and reach an endgame where your extra pawn structure advantage and White\'s weakened king give you a comfortable edge.',
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
