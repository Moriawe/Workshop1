// Navigering: byta slide, stega inom en slide, anteckningar, helskärm. Laddas sist.
(function(){
  const stage=document.getElementById('stage');
  const slides=[...document.querySelectorAll('.slide')];
  const bar=document.getElementById('bar'), count=document.getElementById('count'), notes=document.getElementById('notesPanel');
  let i=0;
  function fit(){const s=Math.min(innerWidth/1280,innerHeight/720)*0.98;stage.style.transform=`translate(-50%,-50%) scale(${s})`;}
  function show(n){
    i=Math.max(0,Math.min(slides.length-1,n));
    slides.forEach((s,k)=>s.classList.toggle('active',k===i));
    bar.style.width=((i+1)/slides.length*100)+'%';
    count.textContent=(i+1)+' / '+slides.length;
    const nt=slides[i].querySelector('.notes');
    notes.innerHTML='<b>Anteckningar</b>'+(nt?nt.innerHTML:'<span class="o-_5">–</span>');
    history.replaceState(null,'','#'+(i+1));
    slides[i].querySelectorAll('.lp').forEach(st=>setStep(st,0));
  }
  addEventListener('resize',fit);
  addEventListener('keydown',e=>{
    if(['ArrowRight','PageDown',' ','Enter'].includes(e.key)){e.preventDefault();next()}
    else if(['ArrowLeft','PageUp','Backspace'].includes(e.key)){e.preventDefault();prev()}
    else if(e.key==='Home')show(0);
    else if(e.key==='End')show(slides.length-1);
    else if(e.key==='n'||e.key==='N')notes.classList.toggle('on');
    else if(e.key==='f'||e.key==='F'){document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen()}
    else if((e.key==='s'||e.key==='S')&&slides[i].querySelector('#wheel'))wheel.spin();
    else if(/^[1-5]$/.test(e.key)&&slides[i].querySelector('#wheel'))wheel.build(+e.key-1);
  });
  // --- stegvisa slides (.lp): pil höger/vänster stegar inom sliden innan den byter ---
  function setStep(st,n){st.dataset.step=n;
    st.querySelectorAll('[data-s]').forEach(e=>e.classList.toggle('vis',+e.dataset.s<=n));
    st.querySelectorAll('[data-o]').forEach(e=>e.classList.toggle('vis',+e.dataset.o===n));
    st.querySelectorAll('[data-h]').forEach(e=>e.classList.toggle('hl',e.dataset.h.split(' ').includes(String(n))));}
  function stepper(d){const st=slides[i].querySelector('.lp');if(!st)return false;
    const n=+st.dataset.step+d;if(n<0||n>+st.dataset.steps)return false;setStep(st,n);return true;}
  function next(){if(!stepper(1))show(i+1)}
  function prev(){if(stepper(-1))return;show(i-1);const st=slides[i].querySelector('.lp');if(st)setStep(st,+st.dataset.steps)}
  stage.addEventListener('click',e=>{if(e.target.closest('button,.sent'))return;(e.clientX>innerWidth/2)?next():prev()});
  fit();
  show((parseInt(location.hash.slice(1))||1)-1);
})();
