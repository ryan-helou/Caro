# Caro

*A trainer for one chess opening — the Caro-Kann Defense (ECO B12) — that walks you through the lines, then makes you play them from memory.*

The whole app is built around a single hand-curated move tree for the Caro-Kann, played from Black's side. Every position in the tree carries the real Lichess numbers behind it — the tree was scraped from the Lichess Opening Explorer (rapid and classical games, 2000–2500 rating) by the scripts in `scripts/`, then the coaching text was written in by hand on top. So when the app tells you a move was "played in 300,039 games," that figure came from actual master-level play, not an estimate.

There is no chess engine here. Feedback is exact-match: your move's SAN is compared against the expected next node in the tree. Play the book move and you get a green light plus a sentence explaining the idea; play something else and you get coaching aimed at *that specific mistake* — try 1...e6 in the Caro and it tells you you've wandered into a French Defense. The wrong-move responses and the longer coaching passages are all authored, not generated.

Three modes work through the same tree. Learn steps through a line one move at a time, with coaching, opening names, and a win/draw/loss bar for each position. Practice makes you play the line move by move against a scripted opponent, correcting you when you stray. Quiz drills isolated positions with a lightweight spaced-repetition scheme — positions you've missed, or haven't seen in a while, are weighted to come up more often, and your history lives in `localStorage`.

Lessons aren't a fixed list; they're derived from the tree by walking it to its leaves, so the roughly two dozen lessons span the Advance, Classical, Exchange, Panov-Botvinnik, Two Knights, and Fantasy variations. Twenty-three of them carry hand-written intros, themes, and "when to play" notes.

The frontend is React 19 + TypeScript on Vite, with Tailwind v4, Zustand for state, chessground for the board, and chess.js for move legality. There's also an ASP.NET Core + EF Core/SQLite backend (`server/`) that seeds the opening, tracks per-user progress and lesson completions, and does passwordless auth with a random login key sent as an `X-Login-Key` header. The client mostly runs off its bundled copy of the tree and only reaches for the server for accounts and progress, so several backend pieces are still thin.

Early days — five commits in, one opening covered, and a few server endpoints still stubbed out.
