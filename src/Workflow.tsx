import { useEffect, useRef, useState } from 'react';
const steps=[{title:'Collect',label:'Reports arrive',detail:'WhatsApp, company email, and scanned letters.',code:'01 / INPUT'},{title:'Connect',label:'Context takes shape',detail:'Document processing, structured records, and retrieval.',code:'02 / PROCESS'},{title:'Answer',label:'Make it usable',detail:'Agents and an interface for exploring field information.',code:'03 / PRODUCT'}];
export function Workflow(){
 const [step,setStep]=useState(0);const [playing,setPlaying]=useState(false);const ref=useRef<HTMLDivElement>(null);const timers=useRef<ReturnType<typeof setTimeout>[]>([]);
 function stop(){timers.current.forEach(clearTimeout);timers.current=[];setPlaying(false);}
 function play(){stop();setStep(0);if(document.documentElement.dataset.motion==='off')return;setPlaying(true);timers.current=[setTimeout(()=>setStep(1),1100),setTimeout(()=>setStep(2),2300),setTimeout(()=>setPlaying(false),3500)];}
 useEffect(()=>{
  const observer=new IntersectionObserver(([e])=>{if(e.isIntersecting){if(!matchMedia('(prefers-reduced-motion: reduce)').matches&&document.documentElement.dataset.motion!=='off')play();observer.disconnect();}},{threshold:.4});
  const motionChange=()=>{if(document.documentElement.dataset.motion==='off')stop();};window.addEventListener('portfolio-motion-change',motionChange);
  if(ref.current)observer.observe(ref.current);return ()=>{observer.disconnect();timers.current.forEach(clearTimeout);window.removeEventListener('portfolio-motion-change',motionChange);};
 },[]);
 return <div className="workflow-study" ref={ref}><div className="study-caption"><span>SCAI / A SYSTEM I’M BUILDING</span><span>01</span></div><div className="workflow-track" data-step={step}><div className="track-line"><i/></div>{steps.map((s,i)=><button key={s.title} className={step===i?'workflow-node active':'workflow-node'} aria-pressed={step===i} onClick={()=>{stop();setStep(i);}}><span className="node-number">0{i+1}</span><strong>{s.title}</strong></button>)}</div><div className="workflow-detail" key={step}><span className="eyebrow">{steps[step].code}</span><h2>{steps[step].label}</h2><p>{steps[step].detail}</p></div><div className="study-footer"><a href="/work/scai/">Explore SCAI ↗</a><button onClick={play} disabled={playing}>{playing?'Playing sequence':'Replay sequence'}</button></div></div>;
}
