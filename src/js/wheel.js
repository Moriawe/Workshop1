// Sannolikhetshjulet på slide "Varje token är ett lotteri". deck.js anropar wheel.spin() och wheel.build().
(function(){
  // --- Probability wheel ---
  // Token-alternativ. Inledande mellanslag = ny ordstart (visas som ␣). Utan mellanslag = fortsättning på ordet.
  const sets=[
    ['Vi ses på',[[' måndag',.30],[' fredag',.22],[' kontoret',.15],[' lunch',.12],[' tisdag',.09],[' mötet',.07],[' Mars',.05]]],
    ['Jag har aldrig förstått mig på',[[' katter',.26],[' folk',.20],[' politik',.16],[' matematik',.14],[' regler',.10],[' dig',.08],[' Java',.06]]],
    ['Hon öppnade dörren och',[[' gick',.34],[' såg',.26],[' sa',.14],[' skrek',.10],[' steg',.09],[' log',.07]]],
    ['Det bästa med fredagar är',[[' fika',.30],[' helgen',.28],[' afterwork',.18],[' tacos',.12],[' release',.08],[' deploy',.04]]],
    ['val ids = users.',[['map',.32],['filter',.24],['first',.12],['for',.10],['sorted',.09],['size',.08],['get',.05]],true]
  ];
  const tok=t=>t.trim();
  const tokHtml=t=>t.trim();
  // hjulets färger är CSS-tokens, så paletten bara finns på ett ställe
  const cols=['--accent','--accent-mid','--teal','--teal-mid','--warm','--warm-mid','--grey-2'].map(n=>`var(${n})`);
  const NS='http://www.w3.org/2000/svg';
  const svg=document.getElementById('wheel'), list=document.getElementById('sentences');
  let cur=0, opts=[], mids=[], rot=0, spinId=0;
  sets.forEach(([txt,,code],k)=>{
    const d=document.createElement('div');d.className='sent';
    d.innerHTML=code?'<span class="mono bg-none p-0">'+txt+'<span class="blank">…</span></span>':'”'+txt+'<span class="blank sp">…</span>”';
    d.addEventListener('click',()=>build(k));list.appendChild(d);
  });
  function build(k){
    cur=k;opts=sets[k][1];mids=[];spinId++;
    [...list.children].forEach((d,j)=>d.classList.toggle('on',j===k)); // rör inte redan ifyllda ord
    svg.style.transition='none';rot=0;svg.style.transform='rotate(0deg)';svg.getBoundingClientRect();svg.style.transition='';
    svg.innerHTML='';
    let a0=-Math.PI/2;
    opts.forEach(([name,p],j)=>{
      const a1=a0+p*2*Math.PI, r=100, large=p>.5?1:0;
      const x0=r*Math.cos(a0),y0=r*Math.sin(a0),x1=r*Math.cos(a1),y1=r*Math.sin(a1);
      const path=document.createElementNS(NS,'path');
      path.setAttribute('d',`M0 0L${x0} ${y0}A${r} ${r} 0 ${large} 1 ${x1} ${y1}Z`);
      path.style.fill=cols[j%cols.length];path.style.stroke='var(--bg)';path.setAttribute('stroke-width','1.5');
      svg.appendChild(path);
      const m=(a0+a1)/2; mids.push(m);
      if(p>=.03){
        const t=document.createElementNS(NS,'text');
        // radiell text: läses från mitten och ut mot kanten
        t.setAttribute('x',93);t.setAttribute('y',0);
        t.setAttribute('transform',`rotate(${m*180/Math.PI})`);
        t.setAttribute('text-anchor','end');t.setAttribute('dominant-baseline','central');
        t.style.fill='var(--on-strong)';t.setAttribute('font-size',p>.1?'10':p>=.05?'8':'7');t.setAttribute('font-weight','600');
        t.textContent=tok(name);svg.appendChild(t);
      }
      a0=a1;
    });
  }
  function spin(){
    let r=Math.random(),k=0;for(;k<opts.length-1;k++){r-=opts[k][1];if(r<0)break}
    const target=-90-(mids[k]*180/Math.PI);
    const jitter=(Math.random()-.5)*opts[k][1]*300;
    const now=((rot%360)+360)%360;
    let delta=((target+jitter)-now)%360; if(delta<0)delta+=360;
    rot+=1080+delta;
    svg.style.transform=`rotate(${rot}deg)`;
    const blank=list.children[cur].querySelector('.blank'), id=++spinId;
    blank.textContent='…';blank.classList.remove('filled');
    setTimeout(()=>{if(id!==spinId)return;blank.innerHTML=tokHtml(opts[k][0]);blank.classList.add('filled');blank.classList.toggle('sp',opts[k][0].startsWith(' '));},2600);
  }
  build(0);
  window.wheel={spin,build};
})();
