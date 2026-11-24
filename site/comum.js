// Motor comum da Timeless para casas com mais de uma unidade: idioma, fuso, horários e reservas.
// Cada marca define window.MARCA em marca.js antes deste arquivo.
window.DIAS=['domingo','segunda','terça','quarta','quinta','sexta','sábado'];
window.DAYS=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
window.lang=(()=>{try{return new URLSearchParams(location.search).get('lang')||localStorage.getItem(MARCA.id+'-lang')||'pt'}catch(e){return 'pt'}})();
window.L=(pt,en)=>lang==='en'?en:pt;
window.setLang=l=>{lang=l;document.documentElement.lang=l==='en'?'en':'pt-BR';try{localStorage.setItem(MARCA.id+'-lang',l)}catch(e){}};
window.hm=m=>{const h=Math.floor(m/60),n=m%60;return lang==='en'?`${h}:${String(n).padStart(2,'0')}`:`${h}h${n?String(n).padStart(2,'0'):''}`;};
window.agoraFortaleza=()=>{
  const p=new Intl.DateTimeFormat('en-US',{timeZone:'America/Fortaleza',weekday:'short',hour:'numeric',minute:'numeric',hour12:false}).formatToParts(new Date());
  const g=t=>p.find(x=>x.type===t).value;
  return {d:['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].indexOf(g('weekday')),m:(parseInt(g('hour'))%24)*60+parseInt(g('minute'))};
};
window.unidade=id=>MARCA.unidades.find(u=>u.id===id);
// Estado de uma unidade agora: acesa (aberta), descansa (entre turnos), antes (abre mais tarde) ou fechada
window.estadoUnidade=(u,at)=>{
  const {d,m}=at||agoraFortaleza(), t=u.hor[d];
  const ab=t.find(([a,b])=>m>=a&&m<b), px=t.find(([a])=>m<a);
  if(ab) return {k:'aberta',ate:ab[1]};
  if(px) return {k:px[0]===t[0][0]?'antes':'pausa',abre:px[0]};
  return {k:'fechada',abre:u.hor[(d+1)%7][0][0]};
};
window.Reservas={
  get chave(){return MARCA.id+'-reservas'},
  todas(){try{return JSON.parse(localStorage.getItem(this.chave)||'[]')}catch(e){return []}},
  salvar(l){try{localStorage.setItem(this.chave,JSON.stringify(l))}catch(e){}},
  nova(r){const l=this.todas();l.unshift(r);this.salvar(l);},
  muda(c,campos){const l=this.todas();const r=l.find(x=>x.codigo===c);if(r){Object.assign(r,campos);this.salvar(l);}}
};
