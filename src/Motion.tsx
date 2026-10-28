import { useEffect, useState } from 'react';
export function Motion(){
 const [enabled,setEnabled]=useState(true);
 useEffect(()=>{
  const preference=window.matchMedia('(prefers-reduced-motion: reduce)');
  let saved:string|null=null;try{saved=localStorage.getItem('portfolio-motion');}catch{/* Browser storage is optional. */}
  const initial=saved?saved==='on':!preference.matches;setEnabled(initial);
  const onChange=()=>setEnabled(!preference.matches);preference.addEventListener('change',onChange);
  return ()=>preference.removeEventListener('change',onChange);
 },[]);
 useEffect(()=>{
  document.documentElement.dataset.motion=enabled?'on':'off';
  window.dispatchEvent(new Event('portfolio-motion-change'));
  if(!enabled){document.getAnimations().forEach(a=>a.cancel());return;}
  const targets=document.querySelectorAll('.section-heading,.project-visual,.project-copy,.about-grid>div,.experience-row,.contact-grid,.case-body section,.index-heading');
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
   if(!entry.isIntersecting)return;
   const el=entry.target;
   el.animate([{opacity:0,transform:'translateY(24px)'},{opacity:1,transform:'translateY(0)'}],{duration:650,easing:'cubic-bezier(.22,1,.36,1)',fill:'backwards'});
   if(el.classList.contains('project-visual')){
    el.querySelectorAll('.scai-diagram>*,.research-diagram>*,.product-diagram>*').forEach((part,index)=>part.animate([{opacity:0,transform:'translateY(10px)'},{opacity:1,transform:'translateY(0)'}],{duration:550,delay:100+index*110,easing:'cubic-bezier(.22,1,.36,1)',fill:'backwards'}));
   }
   observer.unobserve(el);
  }),{threshold:0.1,rootMargin:'0px 0px -30px 0px'});
  targets.forEach(t=>observer.observe(t));
  return ()=>{observer.disconnect();document.getAnimations().forEach(a=>a.cancel());};
 },[enabled]);
 useEffect(()=>{
  let frame=0;
  const update=()=>{frame=0;const max=document.documentElement.scrollHeight-innerHeight;document.querySelector<HTMLElement>('.reading-progress')?.style.setProperty('--progress',String(max>0?scrollY/max:0));};
  const scroll=()=>{if(!frame)frame=requestAnimationFrame(update);};
  window.addEventListener('scroll',scroll,{passive:true});window.addEventListener('resize',scroll);update();
  return ()=>{window.removeEventListener('scroll',scroll);window.removeEventListener('resize',scroll);cancelAnimationFrame(frame);};
 },[]);
 return <><div className="reading-progress" aria-hidden="true"/><button className="motion-control" aria-pressed={enabled} onClick={()=>{try{localStorage.setItem('portfolio-motion',enabled?'off':'on');}catch{/* Preference still works for this visit. */}setEnabled(!enabled);}}>Motion {enabled?'on':'off'}</button></>;
}
