import { useEffect, useRef, useState, type Dispatch } from 'react';
import { motion } from 'framer-motion';
import { Banana, Check, Crosshair, Phone, Printer, Sparkles, Target } from 'lucide-react';
import type { Action, GameState } from '../game/types';
import { formatCash } from '../game/engine';
import { playSound } from '../audio';
import { Office } from './Office';

const toys = [
  { id: 'banana' as const, icon: Banana, name: 'Banana break', detail: '₦60,000 · +8 happiness · −3 chaos', quote: 'Wellness. With a peel.' },
  { id: 'phone' as const, icon: Phone, name: 'Call the investor', detail: '+7 confidence · +3 reputation · +6 chaos', quote: 'Promise something. Anything.' },
  { id: 'printer' as const, icon: Printer, name: 'Overclock the printer', detail: '₦40,000 · +60 eggs/day · +5 chaos', quote: 'It prints eggs now. Don’t ask.' },
];

export function ExecutivePlay({ game, dispatch, sound, onBusyChange }: { game: GameState; dispatch: Dispatch<Action>; sound: boolean; onBusyChange: (busy: boolean) => void }) {
  const [aiming, setAiming] = useState(false);
  const marker = useRef<HTMLSpanElement>(null);
  const position = useRef(0);
  const used = game.officeUsed ?? [];
  const feedback = game.interaction;
  const playing = game.phase === 'playing';
  const available = playing && !feedback && !aiming;
  useEffect(() => { onBusyChange(aiming); return () => onBusyChange(false); }, [aiming, onBusyChange]);
  useEffect(() => { if (!playing) setAiming(false); }, [playing]);
  useEffect(() => {
    if (!aiming) return;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = ((now - start) % 2400) / 1200;
      position.current = (t <= 1 ? t : 2 - t) * 100;
      if (marker.current) marker.current.style.left = `${position.current}%`;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [aiming]);
  const pitch = (safe = false) => {
    const distance = Math.abs(position.current - 50);
    const grade = safe ? 'steady' : distance <= 6 ? 'perfect' : distance <= 20 ? 'steady' : 'miss';
    setAiming(false);
    playSound(grade === 'miss' ? 'bad' : 'good', sound);
    dispatch({ type: 'PITCH', grade });
  };
  return <div className="executive-play">
    <Office chaos={game.stats.chaos} happiness={game.stats.happiness} day={game.day} turn={game.turn} reaction={feedback ? feedback.title : game.phase === 'outcome' ? (game.outcome?.deltas.cash ?? 0) < 0 ? 'That was an investment. In character.' : 'I meant to do that. Obviously.' : ''}>
      <div className="office-interactions" aria-label="Interactive office objects">
        {toys.map(({ id, icon: Icon, name }) => {
          const done = used.includes(id);
          const cost = id === 'banana' ? 60000 : id === 'printer' ? 40000 : 0;
          return <motion.button key={id} className={`office-object object-${id} ${done ? 'object-used' : ''}`} whileHover={{ y: -3 }} whileTap={{ scale: .96 }} disabled={!available || done || used.length >= 2 || game.stats.cash < cost} onClick={() => { playSound('click', sound); dispatch({ type: 'OFFICE', id }); }} aria-label={name} title={name}>
            {done ? <Check size={17} /> : <Icon size={19} />}<span>{name}</span><small>{done ? 'DONE TODAY' : 'INTERACT'}</small>
          </motion.button>;
        })}
      </div>
    </Office>
    <section className="office-playbook" aria-label="Daily office actions">
      <div className="playbook-heading"><span><Sparkles size={14} /> YOUR OFFICE. YOUR PLAYGROUND.</span><strong>{Math.max(0, 2 - used.length)} / 2 actions left today</strong></div>
      <p className="playbook-intro">Tap an object above to meddle. Pick any two each day; your three business decisions still await.</p>
      <div className="office-tradeoffs">{toys.map(t => <div key={t.id} className={used.includes(t.id) ? 'tradeoff-used' : ''}><strong>{t.name}</strong><span>{t.detail}</span><small>{t.quote}</small></div>)}</div>
      {feedback && <motion.div key={`${game.day}-${feedback.title}`} className="interaction-result" role="status" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <div><span className="tiny-label">EXECUTIVE MEDDLING: COMPLETE</span><h3>{feedback.title}</h3><p>{feedback.text}</p><div className="interaction-deltas">{Object.entries(feedback.deltas).filter(([, value]) => value !== 0).map(([key, value]) => <span key={key} className={(key === 'chaos' ? value! < 0 : value! > 0) ? 'positive' : 'negative'}>{value! > 0 ? '+' : '−'}{key === 'cash' ? formatCash(Math.abs(value!)) : Math.abs(value!)} {key === 'cash' ? 'cash' : key === 'eggs' ? 'eggs/day' : key}</span>)}</div></div>
        <button className="secondary" onClick={() => dispatch({ type: 'DISMISS_INTERACTION' })}>BACK TO BUSINESS <Check size={14} /></button>
      </motion.div>}
      <div className={`pitch-challenge ${aiming ? 'pitch-active' : ''}`}>
        <div className="pitch-copy"><span className="tiny-label"><Target size={13} /> OPTIONAL DAILY CHALLENGE</span><h3>The 10-second elevator pitch.</h3><p>{game.pitchPlayed ? 'The goat has heard enough. Come back tomorrow.' : 'Land the needle in gold: earn ₦150,000 +5 confidence. Green: ₦50,000 +2 confidence. Miss: −₦30,000 −2 confidence +3 chaos. Gold also calms chaos by 3.'}</p></div>
        {!aiming ? <button className="pitch-start secondary" disabled={!available || game.pitchPlayed} onClick={() => { position.current = 0; setAiming(true); playSound('click', sound); }}>{game.pitchPlayed ? <><Check size={16} /> PITCH DELIVERED</> : <><Crosshair size={16} /> MAKE YOUR PITCH</>}</button> : <div className="pitch-controls">
          <div className="pitch-meter" role="img" aria-label="Timing meter. Green is 30 to 70 percent; gold sweet spot is 44 to 56 percent."><span className="pitch-steady" /><span className="pitch-perfect" /><span className="pitch-needle" ref={marker} /></div>
          <div className="pitch-meter-labels"><span>WAFFLE</span><strong>SWEET SPOT</strong><span>OVERSHARE</span></div>
          <button className="primary pitch-lock" onClick={() => pitch()}>LOCK IT IN <Crosshair size={16} /></button>
          <button className="safe-pitch" onClick={() => pitch(true)}>Prefer no timing? Take a safe pitch: +₦50,000, +2 confidence.</button>
          <small className="pitch-no-rush">No countdown. The needle loops until you’re ready. Tab + Enter works too.</small>
        </div>}
      </div>
    </section>
  </div>;
}
