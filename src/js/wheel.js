// Sannolikhetshjulen på slidesen "Token för token" och "Kontexten flyttar oddsen".
// Varje hjul är ett element med data-wheel="tokens" eller data-wheel="kontext".
// deck.js skickar tangenttryck hit via wheel.key(element, tangent).
(function(){
  const NS='http://www.w3.org/2000/svg';
  const pal=['--accent','--accent-mid','--teal','--teal-mid','--warm','--warm-mid','--grey-2'].map(n=>`var(${n})`);
  const esc=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;');

  // --- Ett hjul: ritar tårtbitar och snurrar till ett viktat slumpval ---
  function makeWheel(svg){
    let rot=0, mids=[], items=[], pct=false, spinId=0;
    function reset(){svg.style.transition='none';rot=0;svg.style.transform='rotate(0deg)';svg.getBoundingClientRect();svg.style.transition='';}
    function draw(list,showPct){
      items=list;pct=!!showPct;mids=[];svg.innerHTML='';
      let a0=-Math.PI/2;
      list.forEach(it=>{
        const p=it.p, a1=a0+p*2*Math.PI, r=100;
        mids.push((a0+a1)/2);
        if(p>0.0005){
          let el;
          if(p>0.9995){el=document.createElementNS(NS,'circle');el.setAttribute('r',r);}
          else{
            const x0=r*Math.cos(a0),y0=r*Math.sin(a0),x1=r*Math.cos(a1),y1=r*Math.sin(a1);
            el=document.createElementNS(NS,'path');
            el.setAttribute('d',`M0 0L${x0} ${y0}A${r} ${r} 0 ${a1-a0>Math.PI?1:0} 1 ${x1} ${y1}Z`);
          }
          el.style.fill=it.color;el.style.stroke='var(--bg)';el.setAttribute('stroke-width','1.5');
          svg.appendChild(el);
          if(p>=.03){
            const m=(a0+a1)/2, t=document.createElementNS(NS,'text');
            // radiell text: läses från mitten och ut mot kanten
            t.setAttribute('x',93);t.setAttribute('y',0);
            t.setAttribute('transform',`rotate(${m*180/Math.PI})`);
            t.setAttribute('text-anchor','end');t.setAttribute('dominant-baseline','central');
            t.style.fill='var(--on-strong)';t.setAttribute('font-size',p>.1?'10':p>=.05?'8':'7');t.setAttribute('font-weight','600');
            t.textContent=it.label+(pct?' '+Math.round(p*100)+'%':'');
            svg.appendChild(t);
          }
        }
        a0=a1;
      });
    }
    function spin(done){
      let r=Math.random(),k=0;for(;k<items.length-1;k++){r-=items[k].p;if(r<0)break}
      while(items[k].p<=0&&k>0)k--;
      const target=-90-(mids[k]*180/Math.PI);
      const jitter=(Math.random()-.5)*items[k].p*300;
      const now=((rot%360)+360)%360;
      let delta=((target+jitter)-now)%360; if(delta<0)delta+=360;
      rot+=1080+delta;
      svg.style.transform=`rotate(${rot}deg)`;
      const id=++spinId;
      setTimeout(()=>{if(id===spinId)done(k)},2600);
    }
    function cancel(){spinId++}
    return {draw,spin,reset,cancel,get items(){return items}};
  }

  // --- Slide 1: "Token för token" – meningen byggs en token i taget ---
  // Nyckeln är senaste token. Saknas den: ordet är klart och meningen kan avslutas.
  const END1=[['.',.55],[' heller',.25],[' egentligen',.20]];
  const END2=[['.',.85],['!',.15]];
  const tree={
    '':[[' k',.30],[' pol',.22],[' mat',.18],[' folk',.14],[' Java',.10],[' dig',.06]],
    ' k':[['atter',.55],['ärlek',.25],['aos',.12],['affe',.08]],
    ' pol':[['itik',.70],['iser',.18],['ska',.12]],
    ' mat':[['ematik',.60],['lagning',.25],['te',.15]],
    ' Java':[['Script',.55],['.',.45]],
    ' heller':END2,' egentligen':END2
  };
  function tokenSlide(el){
    const w=makeWheel(el.querySelector('.wheel')), out=el.querySelector('.toks'), info=el.querySelector('.tokinfo');
    let chosen=[], busy=false;
    const nextOpts=()=>{const last=chosen.length?chosen[chosen.length-1]:'';
      if(last==='.'||last==='!')return null; return tree[last]||END1;};
    const chip=(t,j)=>`<span class="tok t${j%2}">${t.startsWith(' ')?'<i>·</i>'+esc(t.slice(1)):esc(t)}</span>`;
    function render(pending){
      out.innerHTML=chosen.map(chip).join('')+(pending?'<span class="tok tokwait">…</span>':'');
      const n=chosen.length;
      info.textContent=nextOpts()?`Token ${n+1} – S snurrar`:`Klar efter ${n} tokens · R börjar om`;
    }
    function drawNext(){const o=nextOpts();w.reset();
      if(o)w.draw(o.map(([t,p],j)=>({label:t==='.'?'punkt':t.trim(),p,color:pal[j%pal.length]})));render(!!o);}
    function spin(){if(busy||!nextOpts())return;busy=true;
      w.spin(k=>{chosen.push(nextOpts()[k][0]);render(false);setTimeout(()=>{busy=false;drawNext();},700);});}
    function reset(){w.cancel();busy=false;chosen=[];drawNext();}
    reset();
    return {key(k){k=k.toLowerCase();if(k==='s')spin();else if(k==='r')reset();}};
  }

  // --- Slide 2: "Kontexten flyttar oddsen" – samma fråga, olika kontext ---
  const labels=[['Julgran','var(--teal)'],['Ljusslingor','var(--teal-mid)'],['Ballonger','var(--accent)'],['Flaggor','var(--accent-mid)'],['Pumpor','var(--warm)'],['Påskris','var(--warm-mid)']];
  const contexts=[
    ['Ingen kontext','',[.18,.22,.24,.14,.12,.10]],
    ['December','Det är första advent.',[.62,.26,.04,.03,.02,.03]],
    ['Oktober','Det är slutet av oktober.',[.04,.18,.08,.03,.64,.03]],
    ['Kalas','Min son fyller 5 på lördag.',[.03,.07,.66,.20,.02,.02]]
  ];
  function contextSlide(el){
    const w=makeWheel(el.querySelector('.wheel')), chips=el.querySelector('.ctxchips'),
      note=el.querySelector('.ctxnote'), ans=el.querySelector('.ans');
    let cur=-1, probs=contexts[0][2].slice(), anim=0;
    const items=ps=>labels.map(([l,c],j)=>({label:l,p:ps[j],color:c}));
    contexts.forEach(([name],k)=>{const b=document.createElement('div');b.className='ctxchip';b.textContent=`${k+1} · ${name}`;
      b.addEventListener('click',()=>select(k));chips.appendChild(b);});
    function select(k){
      cur=k;w.cancel();w.reset();
      [...chips.children].forEach((c,j)=>c.classList.toggle('on',j===k));
      note.textContent=contexts[k][1]?'Kontext: '+contexts[k][1]:'Kontext: –';
      note.classList.toggle('empty',!contexts[k][1]);
      ans.textContent='…';ans.classList.remove('filled');
      const from=probs.slice(), to=contexts[k][2], t0=performance.now(), id=++anim;
      (function step(now){if(id!==anim)return;
        const t=Math.min(1,(now-t0)/700), e=t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2;
        probs=from.map((f,j)=>f+(to[j]-f)*e);w.draw(items(probs),true);
        if(t<1)requestAnimationFrame(step);})(t0);
    }
    function spin(){ans.textContent='…';ans.classList.remove('filled');
      w.spin(k=>{ans.textContent=labels[k][0];ans.classList.add('filled');});}
    select(0);
    return {key(k){k=k.toLowerCase();if(k==='s')spin();else if(/^[1-4]$/.test(k))select(+k-1);}};
  }

  const ctrl=new Map();
  document.querySelectorAll('[data-wheel]').forEach(el=>{
    ctrl.set(el,el.dataset.wheel==='kontext'?contextSlide(el):tokenSlide(el));
  });
  window.wheel={key(el,k){const c=ctrl.get(el);if(c)c.key(k);}};
})();
