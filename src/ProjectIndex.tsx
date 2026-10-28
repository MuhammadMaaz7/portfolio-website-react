import { useState } from 'react';
import projects from './projects.json';
export function ProjectIndex(){
 const [filter,setFilter]=useState('All');
 const categories=['All','Professional','AI systems','Full-stack','Experiments'];
 const visible=projects.filter(p=>(filter==='All'||p.category===filter)&&!['scai','clarimo','jadeed'].includes(p.slug));
 return <details className="project-index-section"><summary><span>More projects</span><span className="collection-count">Voice, retrieval, full-stack, and experiments</span><span className="disclosure-mark" aria-hidden="true">+</span></summary><div className="collection-body"><div className="filters" aria-label="Filter projects">{categories.map(c=><button key={c} type="button" onClick={()=>setFilter(c)} aria-pressed={filter===c}>{c}</button>)}</div><p className="sr-only" role="status">{visible.length} projects shown</p><div className="index-list" key={filter}>{visible.map(p=><a href={`/work/${p.slug}/`} key={p.slug} className="index-row"><span className="index-category">{p.category}</span><h3>{p.name}</h3><span aria-hidden="true">↗</span></a>)}</div></div></details>
}
