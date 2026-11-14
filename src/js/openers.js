(function(){
  // --- Öppningsslide per del: sammanfattningen byggs av agendans rad och rubrikerna i delen ---
  // Inget skrivs för hand här, så den stämmer även när slides flyttas, läggs till eller döps om.
  document.querySelectorAll('.opener').forEach(op=>{
    const norm=t=>t.trim().replace(/\.$/,'');
    let lede=document.querySelector(`.toc [data-part="${op.dataset.part}"] p`);
    // står samma mening redan under rubriken i panelen behöver den inte upprepas
    const sub=op.querySelector('.big');
    if(lede&&sub&&norm(lede.textContent)===norm(sub.textContent))lede=null;
    const rows=[];
    for(let s=op.nextElementSibling;s&&s.matches('.slide:not(.section)');s=s.nextElementSibling){
      const k=s.querySelector('.kicker'),h=s.querySelector('h2');
      // data-summary på en slide ersätter dess rubrik i den här listan
      if(k&&h)rows.push([k.textContent.split(' · ')[0],s.dataset.summary||h.innerHTML]);
    }
    // samma kicker på alla slides (t.ex. "Lärdomar") säger inget – visa då bara rubrikerna
    const flat=new Set(rows.map(r=>r[0])).size<2;
    const seen=new Set(), items=rows.filter(r=>flat||!seen.has(r[0])&&seen.add(r[0]));
    op.querySelector('.summary').innerHTML=(lede?`<p class="lede">${lede.textContent}</p>`:'')
      +`<ul class="topics${flat?' flat':''}">`+items.map(r=>flat?`<li>${r[1]}</li>`:`<li><b>${r[0]}</b><span>${r[1]}</span></li>`).join('')+'</ul>';
  });
})();
