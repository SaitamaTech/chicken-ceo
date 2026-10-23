import { motion } from 'framer-motion';
import { useState, type ReactNode } from 'react';
import { Clock3, Phone, Sparkles } from 'lucide-react';
export function Potato({ index=0 }: {index?:number}) { return <div className={`potato p${index}`} aria-hidden="true"><i/><i/><span/><b/></div>; }
export function Office({chaos=20,happiness=80,day=1,turn=0,home=false,reaction='',children}:{chaos?:number;happiness?:number;day?:number;turn?:number;home?:boolean;reaction?:string;children?:ReactNode}) {
  const [broken,setBroken]=useState(false);
  return <div className={`office ${home?'home-office':''} ${chaos>75?'chaotic':''}`}>
    {!broken ? <motion.img className="office-art" src="/office.jpg" alt="A smug chicken CEO in a black suit and gold tie, at his walnut desk above a glowing night skyline." onError={()=>setBroken(true)} initial={{scale:1.04}} animate={{scale:1}} transition={{duration:1.3}}/> : <div className="office-fallback"><div className="fallback-chicken"><div className="comb"/><div className="eyes">• •</div><div className="beak"/><div className="tie"/></div></div>}
    <div className="office-shade"/>
    <div className="dust dust-1"/><div className="dust dust-2"/><div className="dust dust-3"/>
    {!home&&<><div className="office-top"><span className="live-dot"/> LIVE FROM THE EXECUTIVE SUITE <span className="office-clock"><Clock3 size={12}/>{9+turn}:00 PM</span></div><div className="diploma">HARVARD SCHOOL OF<br/><strong>POULTRY ECONOMICS</strong><small>Honorary. Very honorary.</small></div><motion.div className="ceo-quote" key={reaction||day} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}}><Sparkles size={13}/><span>“{reaction || (happiness<25?'Nobody panic. Especially me.':chaos>75?'This is fine. The fire is strategic.':'I didn’t get this far by knowing things.')}”</span></motion.div><div className="nameplate"><span>CLUCKINGTON III</span><small>Chief Eggsecutive Officer</small></div><div className={`desk-phone ${chaos>65?'ringing':''}`} title="Legal has left 47 voicemails"><Phone size={18}/></div><div className="walking-spud"><Potato index={2}/></div></>}
    {children}
  </div>;
}
