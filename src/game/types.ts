export type Phase = 'home' | 'playing' | 'outcome' | 'report' | 'ended'

export type Stats = {
  cash: number
  happiness: number
  confidence: number
  eggs: number
  chaos: number
  reputation: number
}

export type Deltas = Partial<Stats>

export type Choice = {
  label: string
  description: string
  deltas: Deltas
  outcome: { title: string; text: string }
  delayed?: { dayOffset: number; deltas: Deltas; text: string }
}

export type GameEvent = {
  id: string
  title: string
  body: string
  tag: 'finance' | 'people' | 'market' | 'legal' | 'chaos' | 'investor' | 'productivity' | 'reputation' | 'rare'
  choices: [Choice, Choice, Choice]
}

export type Outcome = { title: string; text: string; deltas: Deltas; random?: string }
export type HistoryEntry = { day: number; title: string; text: string }
export type DelayedConsequence = { dueDay: number; deltas: Deltas; text: string }

export type GameState = {
  stats: Stats
  day: number
  turn: 0 | 1 | 2
  phase: Phase
  currentEvent: GameEvent | null
  outcome: Outcome | null
  history: HistoryEntry[]
  achievements: string[]
  seed: number
  seen: string[]
  delayed: DelayedConsequence[]
  failedRisk: boolean
  lastDailyProfit: number
  officeUsed: ('banana' | 'phone' | 'printer')[]
  pitchPlayed: boolean
  interaction: Outcome | null
}

export type Action =
  | { type: 'START'; seed?: number }
  | { type: 'CHOOSE'; index: number }
  | { type: 'CONTINUE' }
  | { type: 'HOME' }
  | { type: 'OFFICE'; id: 'banana' | 'phone' | 'printer' }
  | { type: 'PITCH'; grade: 'perfect' | 'steady' | 'miss' }
  | { type: 'DISMISS_INTERACTION' }

export type Ending = { id: string; title: string; text: string; score: number }
