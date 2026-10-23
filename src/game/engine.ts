import { EVENTS, FIRST_EVENT } from './events'
import type { Action, Deltas, Ending, GameEvent, GameState, Outcome, Stats } from './types'

export const STARTING_STATS: Stats = { cash: 5_000_000, happiness: 80, confidence: 70, eggs: 500, chaos: 20, reputation: 60 }
const clamp = (n: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, Number.isFinite(n) ? n : lo))
const applyDeltas = (stats: Stats, deltas: Deltas): Stats => ({
  cash: Math.max(0, Math.round(stats.cash + (deltas.cash ?? 0))),
  eggs: Math.max(0, Math.round(stats.eggs + (deltas.eggs ?? 0))),
  happiness: clamp(Math.round(stats.happiness + (deltas.happiness ?? 0)), 0, 100),
  confidence: clamp(Math.round(stats.confidence + (deltas.confidence ?? 0)), 0, 100),
  chaos: clamp(Math.round(stats.chaos + (deltas.chaos ?? 0)), 0, 100),
  reputation: clamp(Math.round(stats.reputation + (deltas.reputation ?? 0)), 0, 100),
})
const rng = (seed: number) => { let x = (seed >>> 0) || 0x9e3779b9; return () => { x = (Math.imul(1664525, x) + 1013904223) >>> 0; return x / 4294967296 } }
const nextSeed = (seed: number) => Math.imul(seed ^ (seed >>> 16), 2246822519) >>> 0

export const formatCash = (cash: number) => new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(Math.max(0, Math.round(cash)))
export const initialState = (seed = 123456789): GameState => ({ stats: { ...STARTING_STATS }, day: 1, turn: 0, phase: 'home', currentEvent: null, outcome: null, history: [], achievements: [], seed: seed >>> 0, seen: [], delayed: [], failedRisk: false, lastDailyProfit: 0, officeUsed: [], pitchPlayed: false, interaction: null })

const actualDeltas = (before: Stats, after: Stats): Deltas => {
  const deltas: Deltas = {}
  for (const key of Object.keys(before) as (keyof Stats)[]) {
    const delta = after[key] - before[key]
    if (delta !== 0) deltas[key] = delta
  }
  return deltas
}
const officeDeltas: Record<'banana' | 'phone' | 'printer', Deltas> = {
  banana: { cash: -60_000, happiness: 8, chaos: -3 },
  phone: { confidence: 7, reputation: 3, chaos: 6 },
  printer: { eggs: 60, cash: -40_000, chaos: 5 },
}
const officeFeedback: Record<'banana' | 'phone' | 'printer', { title: string; text: string }> = {
  banana: { title: 'The Banana Budget Survives', text: 'A ceremonial banana has been deployed. Morale rises, and the finance team quietly eats the receipt.' },
  phone: { title: 'The Phone Rings Back', text: 'You called confidence directly. It answered, then introduced you to three surprisingly reputable chickens.' },
  printer: { title: 'The Printer Prints Eggs', text: 'The office printer makes a brave mechanical cluck and produces a fresh batch of eggs.' },
}
const pitchDeltas: Record<'perfect' | 'steady' | 'miss', Deltas> = {
  perfect: { cash: 150_000, confidence: 5, chaos: -3 },
  steady: { cash: 50_000, confidence: 2 },
  miss: { cash: -30_000, confidence: -2, chaos: 3 },
}
const pitchFeedback: Record<'perfect' | 'steady' | 'miss', { title: string; text: string }> = {
  perfect: { title: 'A Pitch So Good It Laid an Egg', text: 'The investors applaud in synchrony. Someone calls it visionary; someone else calls it poultry science.' },
  steady: { title: 'The Pitch Lands Safely', text: 'The room nods along and nobody asks whether the spreadsheet is upside down.' },
  miss: { title: 'The Pitch Takes Flight Without You', text: 'Your slides wander into the wilderness, but at least the projector has learned a valuable lesson.' },
}

const danger = (s: GameState) => s.stats.cash <= 0 || s.stats.happiness <= 0 || s.stats.confidence <= 0
const chooseEvent = (state: GameState): GameEvent => {
  const available = EVENTS.filter(e => !state.seen.includes(e.id))
  if (!available.length) return EVENTS[(state.day * 3 + state.turn) % EVENTS.length]
  const weights = available.map(e => {
    let w = 1
    if (e.tag === 'finance' && state.stats.cash < 1_500_000) w += 4
    if (e.tag === 'people' && state.stats.happiness < 45) w += 4
    if (e.tag === 'investor' && state.stats.confidence > 70) w += 2
    if (e.tag === 'chaos' && state.stats.chaos > 60) w += 4
    if (e.tag === 'reputation' && state.stats.reputation < 40) w += 3
    if (e.tag === 'rare') w += state.stats.chaos > 70 ? 2 : 0
    return w
  })
  const random = rng(state.seed + state.day * 7919 + state.turn * 104729)
  let pick = random() * weights.reduce((a, b) => a + b, 0)
  for (let i = 0; i < available.length; i++) { pick -= weights[i]; if (pick <= 0) return available[i] }
  return available[available.length - 1]
}
const addAchievement = (state: GameState, name: string, yes: boolean): string[] => yes && !state.achievements.includes(name) ? [...state.achievements, name] : state.achievements
const updateAchievements = (s: GameState): GameState => {
  let achievements = s.achievements
  achievements = addAchievement({ ...s, achievements }, 'FIRST EGG', s.history.length > 0)
  achievements = addAchievement({ ...s, achievements }, 'BANANA ECONOMIST', s.history.some(h => h.title === FIRST_EVENT.title) && !(s.phase === 'ended' && danger(s)))
  achievements = addAchievement({ ...s, achievements }, 'CHAOS INCARNATE', s.stats.chaos >= 100 && s.phase === 'ended' && !danger(s))
  achievements = addAchievement({ ...s, achievements }, 'ABSOLUTE MENACE', s.phase === 'ended' && s.stats.happiness <= 20 && !danger(s))
  achievements = addAchievement({ ...s, achievements }, 'FINANCIAL CHICKEN', s.phase === 'ended' && !danger(s) && s.stats.cash > STARTING_STATS.cash)
  achievements = addAchievement({ ...s, achievements }, 'POTATO WHISPERER', s.phase === 'ended' && !danger(s) && s.stats.happiness >= 90)
  achievements = addAchievement({ ...s, achievements }, 'CORPORATE SURVIVOR', s.phase === 'ended' && s.day === 5 && !danger(s))
  achievements = addAchievement({ ...s, achievements }, 'ACCIDENTAL GENIUS', s.phase === 'ended' && !danger(s) && s.failedRisk && s.stats.cash > STARTING_STATS.cash * .8 && s.stats.reputation >= 50)
  return { ...s, achievements }
}

export const getEnding = (state: GameState): Ending => {
  const { stats: s } = state
  if (s.cash <= 0) return { id:'bankrupt', title:'Bankrupt but Inspirational', text:'The company has no cash, but your motivational bananas remain fully funded.', score: Math.round(s.reputation * 10 + s.happiness * 4) }
  if (s.happiness <= 0) return { id:'fired', title:'Fired Before Lunch', text:'The workforce has achieved perfect unity by agreeing that you should leave.', score: Math.round(s.cash / 1000 + s.confidence * 5) }
  if (s.confidence <= 0) return { id:'disaster', title:'The Great Eggonomics Disaster', text:'Investor confidence fell through the floor, which is now suing gravity.', score: Math.round(s.eggs + s.reputation * 8) }
  if (s.cash >= 8_000_000 && s.reputation >= 75) return { id:'overlord', title:'The Billionaire Egg Overlord', text:'You turned premium air and poor judgment into an empire.', score: Math.round(s.cash / 1000 + s.reputation * 20) }
  if (s.happiness >= 90 && s.chaos <= 45) return { id:'potato', title:"The Potato Union's Favorite Executive", text:'The potatoes throw you a parade. It is mostly mashed.', score: Math.round(s.happiness * 20 + s.eggs) }
  if (s.chaos >= 90) return { id:'chaos', title:'The Most Chaotic CEO in History', text:'No rule survived your tenure, but somehow the company did.', score: Math.round(s.chaos * 20 + s.cash / 2000) }
  if (s.confidence >= 85 && s.reputation >= 70) return { id:'legend', title:'The Legendary Chicken CEO', text:'Against every feathered expectation, you became a legend.', score: Math.round(s.confidence * 18 + s.reputation * 18 + s.cash / 5000) }
  return { id:'genius', title:'The Accidental Genius', text:'Your mistakes formed a strategy so strange that analysts now call it intentional.', score: Math.round(s.cash / 3000 + s.eggs + s.reputation * 12) }
}
export const getScore = (state: GameState) => getEnding(state).score + state.history.length * 250 + state.achievements.length * 500

const endIfNeeded = (state: GameState): GameState => danger(state) ? updateAchievements({ ...state, phase:'ended', currentEvent:null }) : state
const dayEnd = (state: GameState): GameState => {
  let stats = state.stats
  let delayed = state.delayed
  const cashBeforeDay = state.stats.cash
  const due = delayed.filter(x => x.dueDay <= state.day)
  for (const item of due) stats = applyDeltas(stats, item.deltas)
  delayed = delayed.filter(x => x.dueDay > state.day)
  const eggRevenue = stats.eggs * 250
  const payroll = stats.happiness <= 25 ? 240000 : 120000
  stats = applyDeltas(stats, { cash: eggRevenue - payroll })
  if (stats.happiness >= 75) stats = applyDeltas(stats, { cash: 35000, eggs: 35, confidence: 2, chaos: -2 })
  else if (stats.happiness <= 25) stats = applyDeltas(stats, { cash: -90000, eggs: -100, confidence: -5, chaos: 8 })
  const profit = stats.cash - cashBeforeDay
  const text = due.length ? due.map(x => x.text).join(' ') + ` Egg sales brought in ${formatCash(eggRevenue)}; payroll consumed ${formatCash(payroll)}.` : stats.happiness <= 25 ? `Egg sales could not cover the potato strike. Payroll consumed ${formatCash(payroll)}.` : stats.happiness >= 75 ? `Egg sales brought in ${formatCash(eggRevenue)}; happy employees earned a productivity bonus.` : `Egg sales brought in ${formatCash(eggRevenue)}; payroll consumed ${formatCash(payroll)}.`
  const next = { ...state, stats, delayed, lastDailyProfit: profit, phase: 'report' as const, outcome: { title:'END-OF-DAY REPORT', text, deltas:{ cash:profit, eggs: stats.eggs - state.stats.eggs } } }
  return endIfNeeded(updateAchievements(next))
}

export const reducer = (state: GameState, action: Action): GameState => {
  if (action.type === 'HOME') return initialState(state.seed)
  if (action.type === 'START') { const fresh = initialState(action.seed ?? state.seed); return { ...fresh, phase:'playing', currentEvent:FIRST_EVENT, seen:[FIRST_EVENT.id] } }
  if (action.type === 'DISMISS_INTERACTION') {
    if (!state.interaction || state.phase !== 'playing') return state
    return { ...state, interaction: null }
  }
  if (action.type === 'OFFICE') {
    if (state.phase !== 'playing' || state.interaction || state.officeUsed.length >= 2 || state.officeUsed.includes(action.id)) return state
    const deltas = officeDeltas[action.id]
    const cost = -(deltas.cash ?? 0)
    if (cost > 0 && state.stats.cash < cost) return state
    const stats = applyDeltas(state.stats, deltas)
    const interaction: Outcome = { ...officeFeedback[action.id], deltas: actualDeltas(state.stats, stats) }
    const next = { ...state, stats, officeUsed: [...state.officeUsed, action.id], interaction }
    return endIfNeeded(next)
  }
  if (action.type === 'PITCH') {
    if (state.phase !== 'playing' || state.interaction || state.pitchPlayed) return state
    const stats = applyDeltas(state.stats, pitchDeltas[action.grade])
    const interaction: Outcome = { ...pitchFeedback[action.grade], deltas: actualDeltas(state.stats, stats) }
    return endIfNeeded({ ...state, stats, pitchPlayed: true, interaction })
  }
  if (action.type === 'CHOOSE') {
    if (state.phase !== 'playing' || !state.currentEvent || state.outcome || state.interaction || !Number.isInteger(action.index) || action.index < 0 || action.index > 2) return state
    const choice = state.currentEvent.choices[action.index]
    let stats = applyDeltas(state.stats, choice.deltas)
    const history = [...state.history, { day:state.day, title:state.currentEvent.title, text:choice.outcome.text }]
    let delayed = state.delayed
    if (choice.delayed) delayed = [...delayed, { dueDay:state.day + choice.delayed.dayOffset, deltas:choice.delayed.deltas, text:choice.delayed.text }]
    const failedRisk = state.failedRisk || (choice.deltas.cash ?? 0) < -200000 || (choice.deltas.happiness ?? 0) < -15 || (choice.deltas.confidence ?? 0) < -15
    const randomLines = ['A suspicious spreadsheet applauds.', 'The goat investor has been notified by carrier pigeon.', 'Somewhere, a potato updates its résumé.', 'Analysts have requested a second, less alarming explanation.']
    const random = rng(state.seed + state.history.length * 31337)()
    const next: GameState = { ...state, stats, history, delayed, failedRisk, outcome:{ ...choice.outcome, deltas:choice.deltas, ...(random < .35 ? { random: randomLines[Math.floor(random * randomLines.length)] } : {}) }, phase:'outcome' }
    return endIfNeeded(updateAchievements(next))
  }
  if (action.type === 'CONTINUE') {
    if (state.phase === 'outcome') {
      if (state.turn === 2) return dayEnd(state)
      const turn = (state.turn + 1) as 0 | 1 | 2
      const candidate = chooseEvent({ ...state, turn, outcome:null })
      return { ...state, turn, currentEvent:candidate, seen:[...state.seen, candidate.id], outcome:null, phase:'playing' }
    }
    if (state.phase === 'report') {
      if (state.day >= 5) return updateAchievements({ ...state, phase:'ended', currentEvent:null, outcome:null })
      const day = state.day + 1
      const candidate = chooseEvent({ ...state, day, turn:0, outcome:null })
      return { ...state, day, turn:0, currentEvent:candidate, seen:[...state.seen, candidate.id], outcome:null, phase:'playing', officeUsed:[], pitchPlayed:false, interaction:null }
    }
  }
  return state
}

export const isTerminal = (state: GameState) => state.phase === 'ended'
