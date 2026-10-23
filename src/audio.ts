let context: AudioContext | undefined;
export function playSound(kind: 'click'|'good'|'bad'|'win', enabled: boolean) {
  if (!enabled) return;
  try {
    context ??= new AudioContext(); void context.resume();
    const notes = kind==='good' ? [440,554,659] : kind==='bad' ? [240,180,120] : kind==='win' ? [440,554,659,880] : [420];
    notes.forEach((frequency,i)=>{ const o=context!.createOscillator(),g=context!.createGain(),t=context!.currentTime+i*.085; o.type='sine';o.frequency.value=frequency;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.055,t+.01);g.gain.exponentialRampToValueAtTime(.001,t+.15);o.connect(g);g.connect(context!.destination);o.start(t);o.stop(t+.17); });
  } catch { /* Sound is optional. */ }
}
