import test from 'node:test'
import assert from 'node:assert/strict'
import { EVENTS } from './events'
import { STARTING_STATS, formatCash, getEnding, getScore, initialState, reducer } from './engine'
import type { GameState } from './types'

const run = (seed: number, indexes = [0, 1, 2]) => {
  let s = reducer(initialState(seed), { type:'START', seed })
  while (s.phase !== 'ended') {
    if (s.phase === 'playing') s = reducer(s, { type:'CHOOSE', index:indexes[(s.day + s.turn) % indexes.length] })
    else if (s.phase === 'outcome' || s.phase === 'report') s = reducer(s, { type:'CONTINUE' })
    else break
  }
  return s
}

test('event library has 40+ original events and exactly three meaningful choices', () => {
  assert.ok(EVENTS.length >= 40)
  assert.equal(new Set(EVENTS.map(e => e.id)).size, EVENTS.length)
  for (const event of EVENTS) {
    assert.equal(event.choices.length, 3)
    assert.equal(new Set(event.choices.map(c => c.label)).size, 3)
    assert.equal(new Set(event.choices.map(c => c.outcome.text)).size, 3)
    assert.ok(event.choices.every(c => Object.values(c.deltas).some(v => v !== 0)))
  }
})

test('start is banana crisis and invalid/duplicate choices are guarded', () => {
  const home = initialState(7)
  const started = reducer(home, { type:'START', seed:7 })
  assert.equal(started.phase, 'playing')
  assert.equal(started.currentEvent?.id, 'banana-crisis')
  assert.equal(started.stats.cash, STARTING_STATS.cash)
  const picked = reducer(started, { type:'CHOOSE', index:0 })
  assert.equal(picked.phase, 'outcome')
  assert.strictEqual(reducer(picked, { type:'CHOOSE', index:1 }), picked)
  assert.strictEqual(reducer(started, { type:'CHOOSE', index:9 }), started)
})

test('seeded runs select the same event sequence', () => {
  const a = run(4242), b = run(4242)
  assert.deepEqual(a.history.map(x => x.title), b.history.map(x => x.title))
  assert.deepEqual(a.stats, b.stats)
})

test('five-day progression applies report productivity/strike effects and ends', () => {
  const s = run(99)
  assert.equal(s.day, 5)
  assert.equal(s.phase, 'ended')
  assert.equal(s.history.length, 15)
  assert.ok(Number.isFinite(s.lastDailyProfit))
  assert.ok(s.achievements.includes('FIRST EGG'))
})

test('stat clamps, terminal failure, formatting, and scores are safe', () => {
  let s = reducer(initialState(1), { type:'START' })
  s = { ...s, stats: { ...s.stats, cash:100, happiness:1, confidence:1 } }
  const failed = reducer(s, { type:'CHOOSE', index:2 })
  assert.equal(failed.phase, 'ended')
  assert.ok(failed.stats.cash >= 0 && failed.stats.happiness >= 0 && failed.stats.confidence >= 0)
  assert.match(formatCash(5_000_000), /5,?000,?000|5,000,000/)
  assert.ok(getScore(failed) >= 0)
})

test('at least six distinct actual endings are reachable by state conditions', () => {
  const base = initialState()
  const specs = [
    { cash:0, happiness:80, confidence:70 }, { cash:5e6, happiness:0, confidence:70 }, { cash:5e6, happiness:80, confidence:0 },
    { cash:9e6, happiness:80, confidence:80, reputation:80 }, { cash:5e6, happiness:95, confidence:80, chaos:20, reputation:60 },
    { cash:5e6, happiness:80, confidence:80, chaos:95, reputation:60 }, { cash:5e6, happiness:80, confidence:90, chaos:20, reputation:80 },
  ]
  assert.ok(new Set(specs.map(x => getEnding({ ...base, stats:{ ...base.stats, ...x }, phase:'ended' } as GameState).id)).size >= 6)
})

test('all 126 decisions apply their own effects and outcomes exactly once', () => {
  for (const event of EVENTS) for (let index=0;index<3;index++) {
    const s = { ...reducer(initialState(42), {type:'START'}), currentEvent:event };
    const c = event.choices[index]; const result = reducer(s,{type:'CHOOSE',index});
    for (const key of Object.keys(s.stats) as (keyof typeof s.stats)[]) {
      const raw=s.stats[key]+(c.deltas[key]??0);
      const expected = key==='cash'||key==='eggs'?Math.max(0,Math.round(raw)):Math.max(0,Math.min(100,Math.round(raw)));
      assert.equal(result.stats[key],expected,`${event.id} choice ${index} ${key}`);
    }
    assert.equal(result.outcome?.text,c.outcome.text);
    assert.equal(result.history.length,1);
    assert.strictEqual(reducer(result,{type:'CHOOSE',index}),result);
  }
});

test('each failure condition ends play and a restart resets the company',()=>{
  for (const key of ['cash','happiness','confidence'] as const) {
    const event=EVENTS.find(e=>e.choices.some(c=>(c.deltas[key]??0)<0))!;
    const index=event.choices.findIndex(c=>(c.deltas[key]??0)<0);
    const s={...reducer(initialState(),{type:'START'}),currentEvent:event,stats:{...STARTING_STATS,[key]:1}};
    const failed=reducer(s,{type:'CHOOSE',index});assert.equal(failed.phase,'ended');
    assert.strictEqual(reducer(failed,{type:'CONTINUE'}),failed);
    const restart=reducer(failed,{type:'START',seed:12});assert.equal(restart.phase,'playing');assert.deepEqual(restart.stats,STARTING_STATS);assert.equal(restart.history.length,0);
  }
});

test('survival endings and full runs restart cleanly across many seeds',()=>{
  for(let seed=1;seed<=100;seed++) {const s=run(seed);assert.equal(s.phase,'ended');assert.ok(s.day<=5);assert.ok(s.history.length<=15);assert.ok(new Set(s.history.map(h=>h.title)).size===s.history.length); const r=reducer(s,{type:'START',seed});assert.deepEqual(r.stats,STARTING_STATS);assert.equal(r.day,1);}
});

test('office actions are unique, capped at two, and do not consume decisions',()=>{
  let s=reducer(initialState(3),{type:'START',seed:3});
  const banana=reducer(s,{type:'OFFICE',id:'banana'});
  assert.equal(banana.history.length,0); assert.equal(banana.officeUsed.length,1);
  assert.strictEqual(reducer(banana,{type:'OFFICE',id:'banana'}),banana);
  assert.strictEqual(reducer(banana,{type:'CHOOSE',index:0}),banana);
  s=reducer(banana,{type:'DISMISS_INTERACTION'});
  s=reducer(s,{type:'OFFICE',id:'phone'});
  assert.equal(s.officeUsed.length,2);
  const ready=reducer(s,{type:'DISMISS_INTERACTION'});
  const capped=reducer(ready,{type:'OFFICE',id:'printer'});
  assert.strictEqual(capped,ready);
});

test('office costs are gated and interaction deltas report clamps',()=>{
  let s=reducer(initialState(4),{type:'START',seed:4});
  s={...s,stats:{...s.stats,cash:50_000}};
  assert.strictEqual(reducer(s,{type:'OFFICE',id:'banana'}),s);
  s={...s,stats:{...s.stats,cash:100_000,happiness:97}};
  const result=reducer(s,{type:'OFFICE',id:'banana'});
  assert.equal(result.stats.happiness,100);
  assert.equal(result.interaction?.deltas.happiness,3);
  assert.equal(result.interaction?.deltas.cash,-60_000);
});

test('pitch is once per day, phase guarded, and resets with a new day',()=>{
  let s=reducer(initialState(5),{type:'START',seed:5});
  const pitched=reducer(s,{type:'PITCH',grade:'perfect'});
  assert.equal(pitched.pitchPlayed,true); assert.equal(pitched.history.length,0);
  assert.strictEqual(reducer(pitched,{type:'PITCH',grade:'steady'}),pitched);
  s=reducer(pitched,{type:'DISMISS_INTERACTION'});
  for(let i=0;i<3;i++){s=reducer(s,{type:'CHOOSE',index:0});s=reducer(s,{type:'CONTINUE'});}
  s=reducer(s,{type:'CONTINUE'});
  assert.equal(s.phase,'playing'); assert.equal(s.day,2);
  assert.deepEqual(s.officeUsed,[]); assert.equal(s.pitchPlayed,false); assert.equal(s.interaction,null);
});

 test('daily bonus mechanics preserve all fifteen regular decisions across five days', () => {
  let s = reducer(initialState(99), {type:'START',seed:99}); let bonusDays=0;
  while(s.phase !== 'ended') {
    if(s.phase === 'playing') {
      if(!s.pitchPlayed){
        for(const id of ['banana','phone'] as const){s=reducer(s,{type:'OFFICE',id});s=reducer(s,{type:'DISMISS_INTERACTION'});}
        s=reducer(s,{type:'PITCH',grade:'perfect'});s=reducer(s,{type:'DISMISS_INTERACTION'});bonusDays++;
      }
      s=reducer(s,{type:'CHOOSE',index:0});
    } else s=reducer(s,{type:'CONTINUE'});
  }
  assert.equal(s.day,5);assert.equal(s.history.length,15);assert.equal(bonusDays,5);
 });

 test('all pitch grades report actual clamped deltas and cannot be repeated',()=>{
  for(const grade of ['perfect','steady','miss'] as const){
    const s={...reducer(initialState(),{type:'START'}),stats:{...STARTING_STATS,confidence:99,chaos:1}};
    const r=reducer(s,{type:'PITCH',grade});
    for(const key of Object.keys(s.stats) as (keyof typeof s.stats)[]) assert.equal(r.interaction?.deltas[key]??0,r.stats[key]-s.stats[key]);
    const dismissed=reducer(r,{type:'DISMISS_INTERACTION'}); assert.strictEqual(reducer(dismissed,{type:'PITCH',grade}),dismissed);
  }
 });

 test('saved office limits survive reload and legacy/settings-only saves migrate',async()=>{
  const {load,save}=await import('../persistence');
  const previous=Object.getOwnPropertyDescriptor(globalThis,'localStorage');let data='';
  Object.defineProperty(globalThis,'localStorage',{configurable:true,value:{getItem:()=>data,setItem:(_key:string,v:string)=>{data=v}}});
  try {
    const s=reducer(reducer(initialState(),{type:'START'}),{type:'OFFICE',id:'banana'});
    save({game:s,best:900,achievements:['FIRST EGG'],sound:true});assert.deepEqual(load().game,s);
    const legacy:any={...s};delete legacy.officeUsed;delete legacy.pitchPlayed;delete legacy.interaction;
    data=JSON.stringify({game:legacy,best:900,achievements:[],sound:true});const migrated=load();assert.equal(migrated.game?.day,1);assert.deepEqual(migrated.game?.officeUsed,[]);assert.equal(migrated.game?.pitchPlayed,false);assert.equal(migrated.game?.interaction,null);
    data=JSON.stringify({best:999,achievements:['FIRST EGG'],sound:true});assert.equal(load().best,999);assert.equal(load().sound,true);
    let pitched=reducer(s,{type:'DISMISS_INTERACTION'});pitched=reducer(pitched,{type:'PITCH',grade:'steady'});save({game:pitched,best:0,achievements:[],sound:false});assert.deepEqual(load().game,pitched);
  }finally{if(previous)Object.defineProperty(globalThis,'localStorage',previous);else delete (globalThis as any).localStorage;}
 });
