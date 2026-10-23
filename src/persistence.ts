import type { GameState } from './game/types';
const KEY = 'eggzecutive-v1';
export type Save = { game?: GameState; best: number; achievements: string[]; sound: boolean };
export function load(): Save {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) || '{}');
    const raw=v?.game;
    // Saves from before the optional office/pitch mechanics are valid: supply
    // their new per-run/per-day defaults rather than discarding the run.
    const g=raw ? {
      ...raw,
      officeUsed: Array.isArray(raw.officeUsed) ? raw.officeUsed : [],
      pitchPlayed: typeof raw.pitchPlayed === 'boolean' ? raw.pitchPlayed : false,
      interaction: raw.interaction === undefined ? null : raw.interaction,
    } : raw;
    const statsValid=g?.stats && ['cash','happiness','confidence','eggs','chaos','reputation'].every(k=>Number.isFinite(g.stats[k])&&g.stats[k]>=0);
    const bounded=g?.stats&&['happiness','confidence','chaos','reputation'].every(k=>g.stats[k]<=100);
    const eventValid=g?.currentEvent===null ? ['home','ended'].includes(g?.phase) : g?.currentEvent?.choices?.length===3&&g.currentEvent.choices.every((c: {label?:string;description?:string;deltas?:unknown;outcome?:{text?:string}})=>typeof c.label==='string'&&typeof c.description==='string'&&c.deltas&&typeof c.outcome?.text==='string');
    const interactionValid=g?.interaction===null||(g?.interaction&&typeof g.interaction.title==='string'&&typeof g.interaction.text==='string'&&g.interaction.deltas&&typeof g.interaction.deltas==='object');
    const valid=g && ['home','playing','outcome','report','ended'].includes(g.phase)&&statsValid&&bounded&&eventValid&&Array.isArray(g.history)&&g.history.every((h:{day?:number;title?:string;text?:string})=>Number.isInteger(h.day)&&typeof h.title==='string'&&typeof h.text==='string')&&Array.isArray(g.achievements)&&Array.isArray(g.seen)&&Array.isArray(g.delayed)&&Number.isInteger(g.seed)&&Number.isInteger(g.day)&&g.day>=1&&g.day<=5&&[0,1,2].includes(g.turn)&&Number.isFinite(g.lastDailyProfit)&&Array.isArray(g.officeUsed)&&g.officeUsed.every((x:unknown)=>x==='banana'||x==='phone'||x==='printer')&&typeof g.pitchPlayed==='boolean'&&interactionValid&&(['outcome','report'].includes(g.phase)?g.outcome&&typeof g.outcome.text==='string'&&g.outcome.deltas:true);
    return { game:valid?g:undefined,best:Number.isFinite(v?.best)&&v.best>=0?v.best:0,achievements:Array.isArray(v?.achievements)?v.achievements.filter((x:unknown)=>typeof x==='string'):[],sound:v?.sound===true };
  } catch { return { best: 0, achievements: [], sound: false }; }
}
export function save(value: Save) { try { localStorage.setItem(KEY, JSON.stringify(value)); } catch { /* Private mode: session still playable. */ } }
