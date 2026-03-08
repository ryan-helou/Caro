let ctx: AudioContext | null = null

function getCtx(): AudioContext {
  if (!ctx) ctx = new AudioContext()
  return ctx
}

function play(frequency: number, duration: number, type: OscillatorType = 'sine', volume = 0.15) {
  const audio = getCtx()
  const osc = audio.createOscillator()
  const gain = audio.createGain()
  osc.type = type
  osc.frequency.value = frequency
  gain.gain.value = volume
  gain.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + duration)
  osc.connect(gain)
  gain.connect(audio.destination)
  osc.start()
  osc.stop(audio.currentTime + duration)
}

export function playMove() {
  play(600, 0.08, 'sine', 0.12)
}

export function playCapture() {
  play(300, 0.12, 'triangle', 0.18)
  setTimeout(() => play(200, 0.06, 'square', 0.06), 30)
}

export function playCorrect() {
  play(523, 0.1, 'sine', 0.1)
  setTimeout(() => play(659, 0.15, 'sine', 0.1), 100)
}

export function playWrong() {
  play(200, 0.2, 'square', 0.08)
}
