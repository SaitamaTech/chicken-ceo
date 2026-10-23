import { Banknote, Smile, TrendingUp, Egg, Flame } from 'lucide-react';
import { motion, animate, useMotionValue, useTransform } from 'framer-motion';
import { useEffect } from 'react';
import type { Stats as GameStats } from '../game/types';
export function NumberValue({value,cash=false}:{value:number;cash?:boolean}) {const n=useMotionValue(value);const text=useTransform(n,v=>cash?'₦'+Math.round(v).toLocaleString('en-NG'):Math.round(v).toLocaleString());useEffect(()=>{const a=animate(n,value,{duration:.45});return a.stop;},[value,n]);return <motion.span>{text}</motion.span>;}
export function Stats({stats}:{stats:GameStats}) {
 const rows=[{key:'cash',label:'Company cash',icon:Banknote,value:stats.cash,color:'gold'},{key:'happiness',label:'Employee happiness',icon:Smile,value:stats.happiness,color:'green'},{key:'confidence',label:'Investor confidence',icon:TrendingUp,value:stats.confidence,color:'blue'},{key:'eggs',label:'Egg production',icon:Egg,value:stats.eggs,color:'cream'},{key:'chaos',label:'Corporate chaos',icon:Flame,value:stats.chaos,color:'red'}];
 return <section className="stats-strip" aria-label="Live company statistics">{rows.map(r=><div className={`stat ${r.color}`} key={r.key}><div className="stat-label"><r.icon size={15}/>{r.label}</div><div className="stat-value"><NumberValue value={r.value} cash={r.key==='cash'}/>{r.key!=='cash'&&<small>{r.key==='eggs'?'/ day':'/ 100'}</small>}</div><div className="stat-track"><motion.div animate={{width:`${r.key==='cash'?Math.max(0,Math.min(100,r.value/100000)):r.key==='eggs'?Math.min(100,r.value/10):r.value}%`}}/></div></div>)}</section>;
}
