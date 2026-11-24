// Reserva do Santa Grelha, a mesma no site e na bio. Uma triagem: uma pergunta por vez,
// casa → dia → almoço ou jantar → horário → pessoas → contato. A comanda no topo é a ficha:
// cada resposta é escrita à mão numa linha; no fim, carimbo e canhoto.
// Grava em Reservas (comum.js), com a casa. Grupo a partir de 6 entra "para confirmar".
// Uso: const r=Reserva.monta(elemento,{casa:'meireles',origem:'site'}); r.casa('iguatemi'); r.reinicia();
(function(){
const esc=t=>String(t??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const fmtDia=x=>`${(lang==='en'?DAYS:DIAS)[x.wd]}, ${x.dt.getDate()}/${x.dt.getMonth()+1}`;
window.Reserva={monta(raiz,opc){
  opc=opc||{};
  const R={passo:1,casa:opc.casa||MARCA.unidades[0].id,dia:null,turno:null,hora:null,pes:null,nome:'',zap:''};
  const U=()=>unidade(R.casa);
  const horas=x=>{const {m}=agoraFortaleza(),o=[];U().hor[x.wd].forEach(([a,b])=>{for(let t=a;t<=b-60;t+=30){if(x.k===0&&t<m+30)continue;o.push(t);}});return o;};
  const turnos=x=>{const hs=horas(x);return {almoco:hs.filter(t=>t<960),jantar:hs.filter(t=>t>=960)};};
  const dias=()=>{const {d}=agoraFortaleza(),h=new Date(new Date().toLocaleString('en-US',{timeZone:'America/Fortaleza'}));return [...Array(14)].map((_,k)=>{const dt=new Date(h);dt.setDate(h.getDate()+k);return {k,wd:(d+k)%7,dt};}).filter(x=>horas(x).length);};
  const curto=x=>x.k===0?L('Hoje','Today'):x.k===1?L('Amanhã','Tomorrow'):(lang==='en'?DAYS:DIAS)[x.wd].slice(0,3);
  const zapOk=()=>R.zap.replace(/\D/g,'').length>=10;
  const num=String(Math.floor(1000+Math.random()*8999));
  raiz.innerHTML=`<div class="papel"><div class="cab-p"><span class="mono" aria-hidden="true"></span><span><span class="rv-cm"></span><b class="rv-num"></b></span></div>
     ${['casa','dia','hora','mesa','nome'].map(k=>`<button type="button" class="linha" data-linha="${k}"><small class="rv-k-${k}"></small><span class="mao" data-l="${k}"></span></button>`).join('')}
     <div class="carimbo" aria-hidden="true"><span><b class="rv-cb"></b><small class="rv-cc"></small></span></div></div>
   <div class="canhoto" hidden><span class="rv-ch"></span><b class="rv-chc"></b></div>
   <div class="rv-etapa"></div>`;
  const $=s=>raiz.querySelector(s);
  // a caneta: cada linha da comanda se escreve quando o valor muda
  const escreve=(k,t)=>{const el=raiz.querySelector(`[data-l=${k}]`);if(el.dataset.v===t)return;el.dataset.v=t;el.classList.remove('escrito');el.textContent=t;if(t){void el.offsetWidth;el.classList.add('escrito');}};
  const LIN={casa:1,dia:2,hora:3,mesa:5,nome:6};
  const cab=(t,d)=>`<p class="rot rv-n">${L(`Passo ${R.passo} de 6`,`Step ${R.passo} of 6`)}</p><p class="serif rv-q">${t}</p>${d?`<p class="leg rv-d">${d}</p>`:''}`;
  const volta=()=>R.passo>1?`<button type="button" class="btn" data-ir="${R.passo-1}">${L('Voltar','Back')}</button>`:'';
  function pinta(){
    const D=dias(),x=R.dia!==null?D[R.dia]:null,u=U();
    $('.rv-cm').textContent=L('Comanda','Order slip');$('.rv-num').textContent='nº '+num;
    [['casa','Casa','House'],['dia','Dia','Day'],['hora','Hora','Time'],['mesa','Mesa','Table'],['nome','Nome','Name']].forEach(([k,p,e])=>$('.rv-k-'+k).textContent=L(p,e));
    escreve('casa',R.passo>1?u.nome:'');escreve('dia',x&&R.passo>2?fmtDia(x):'');
    escreve('hora',R.hora!=null&&R.passo>4?`${R.turno==='almoco'?L('almoço','lunch'):L('jantar','dinner')}, ${hm(R.hora)}`:R.turno&&R.passo>3?(R.turno==='almoco'?L('almoço','lunch'):L('jantar','dinner')):'');
    escreve('mesa',R.pes&&R.passo>5?`${R.pes} ${R.pes==1?L('pessoa','guest'):L('pessoas','guests')}`:'');escreve('nome',R.nome.trim().length>1?R.nome.trim():'');
    raiz.querySelectorAll('[data-linha]').forEach(b=>{const alvo=LIN[b.dataset.linha];b.disabled=!(R.passo<7&&alvo<R.passo);});
    let h='';
    if(R.passo===1)h=cab(L('Em qual casa?','Which house?'),'')+`<div class="rv-opcoes">${MARCA.unidades.map(y=>{const s=estadoUnidade(y);return `<button type="button" class="rv-opcao" data-casa="${y.id}" aria-pressed="${y.id===R.casa}"><b>${y.nome}</b><small>${s.k==='aberta'?L(`Aberta até ${hm(s.ate)}`,`Open until ${hm(s.ate)}`):s.k==='fechada'?L(`Abre amanhã, ${hm(s.abre)}`,`Opens tomorrow, ${hm(s.abre)}`):L(`Abre às ${hm(s.abre)}`,`Opens at ${hm(s.abre)}`)}</small><span>${y.end}</span></button>`;}).join('')}</div>`;
    if(R.passo===2)h=cab(L('Para que dia?','Which day?'),`Santa Grelha ${esc(u.nome)}.`)+`<div class="fichas">${D.map((y,i)=>`<button type="button" class="btn" data-dia="${i}" aria-pressed="${i===R.dia}">${curto(y)}<small>${y.dt.getDate()}/${y.dt.getMonth()+1}</small></button>`).join('')}</div>`;
    if(R.passo===3){const t=turnos(x);h=cab(L('Almoço ou jantar?','Lunch or dinner?'),fmtDia(x)+'.')+`<div class="rv-opcoes">${[['almoco','Almoço','Lunch'],['jantar','Jantar','Dinner']].map(([k,p,e])=>{const l=t[k];return `<button type="button" class="rv-opcao" data-turno="${k}" aria-pressed="${R.turno===k}" ${l.length?'':'disabled'}><b>${L(p,e)}</b><small>${l.length?`${hm(l[0])} ${L('a','to')} ${hm(l[l.length-1])}`:L('Sem horário neste dia','No times this day')}</small></button>`;}).join('')}</div>`;}
    if(R.passo===4){const l=turnos(x)[R.turno]||[];h=cab(L('Que horas?','What time?'),`${fmtDia(x)}, ${R.turno==='almoco'?L('almoço','lunch'):L('jantar','dinner')}.`)+`<div class="fichas">${l.map(t=>`<button type="button" class="btn" data-hora="${t}" aria-pressed="${t===R.hora}">${hm(t)}</button>`).join('')}</div>`;}
    if(R.passo===5)h=cab(L('Quantas pessoas?','How many guests?'),L('Até 5, a mesa fica confirmada na hora. A partir de 6, a equipe junta as mesas e confirma pelo WhatsApp.','Up to 5, the table is confirmed instantly. From 6, the team joins tables and confirms on WhatsApp.'))+`<div class="fichas">${[1,2,3,4,5,6,7,8].map(n=>`<button type="button" class="btn rv-num" data-pes="${n}" aria-pressed="${R.pes===n}">${n}</button>`).join('')}</div><p class="leg" style="margin-top:12px">${L('9 ou mais vão para a equipe de eventos, pelo WhatsApp da casa.','9 or more go to the events team, on the house’s WhatsApp.')}</p>`;
    if(R.passo===6)h=cab(L('Em nome de quem?','Under what name?'),L('A confirmação e o lembrete chegam neste WhatsApp.','Confirmation and reminder go to this WhatsApp.'))+`<label class="campo"><span>${L('Nome','Name')}</span><input data-c="nome" autocomplete="name" value="${esc(R.nome)}"></label><label class="campo"><span>WhatsApp</span><input data-c="zap" type="tel" inputmode="tel" autocomplete="tel" placeholder="(85) 9 0000-0000" value="${esc(R.zap)}"></label><p class="erro"></p><p class="rv-nota">${L('Protótipo: a reserva fica só neste navegador e aparece no painel da equipe.','Prototype: the booking stays in this browser and shows up on the team’s panel.')}</p>`;
    if(R.passo===7)h=R.feito;
    $('.rv-etapa').innerHTML=h+(R.passo<=6?`<div class="rv-pe">${volta()}${R.passo===6?`<button type="button" class="btn rv-ok" ${R.nome.trim().length>1&&zapOk()?'':'disabled'}>${L('Fechar a comanda','Book the table')}</button>`:''}</div>`:'');
    const e=$('.rv-etapa');e.style.animation='none';void e.offsetWidth;e.style.animation='';}
  const vai=n=>{R.passo=n;pinta();const r=$('.rv-etapa').getBoundingClientRect();if(r.top<60||r.top>innerHeight*.75){const c=raiz.closest('.corpo-m');if(c)c.scrollTop=Math.max(0,c.scrollTop+r.top-c.getBoundingClientRect().top-12);else scrollTo({top:scrollY+r.top-120,behavior:'smooth'});}};
  const segue=n=>setTimeout(()=>vai(n),170);
  raiz.addEventListener('click',e=>{const b=e.target.closest('button');if(!b||b.disabled)return;const d=b.dataset;
    if(d.ir){vai(+d.ir);return;}
    if(d.linha){vai(LIN[d.linha]===5?5:LIN[d.linha]);return;}
    if(d.casa){if(R.casa!==d.casa){R.casa=d.casa;R.dia=null;R.turno=null;R.hora=null;}opc.aoTrocarCasa&&opc.aoTrocarCasa(R.casa);pinta();segue(2);return;}
    if(d.dia!==undefined){if(R.dia!==+d.dia){R.dia=+d.dia;R.turno=null;R.hora=null;}pinta();segue(3);return;}
    if(d.turno){if(R.turno!==d.turno){R.turno=d.turno;R.hora=null;}pinta();segue(4);return;}
    if(d.hora){R.hora=+d.hora;pinta();segue(5);return;}
    if(d.pes){R.pes=+d.pes;pinta();segue(6);return;}
    if(b.classList.contains('rv-ok'))envia();
    if(b.classList.contains('rv-outra'))api.reinicia(true);});
  raiz.addEventListener('input',e=>{const c=e.target.dataset.c;if(!c)return;R[c]=e.target.value;$('.erro').textContent=R.zap&&!zapOk()?L('Coloque o DDD e o número completo.','Add the area code and full number.'):'';escreve('nome',R.nome.trim().length>1?R.nome.trim():'');const ok=$('.rv-ok');if(ok)ok.disabled=!(R.nome.trim().length>1&&zapOk());});
  function envia(){
    const x=dias()[R.dia],u=U(),pes=R.pes,grupo=pes>=6;
    const codigo=MARCA.prefixo+'-'+u.sigla+String(x.dt.getDate()).padStart(2,'0')+String(R.hora/30|0).padStart(2,'0')+'-'+Math.random().toString(36).slice(2,5).toUpperCase();
    const ini=new Date(x.dt);ini.setHours(R.hora/60|0,R.hora%60,0,0);
    Reservas.nova({codigo,casa:u.id,criada:new Date().toISOString(),inicio:ini.toISOString(),dia:fmtDia(x),hora:hm(R.hora),pessoas:pes,ocasiao:'',pedidos:[],obs:'',nome:R.nome.trim(),zap:R.zap,status:grupo?'aguardando':'confirmada',motivos:grupo?[`grupo de ${pes}`]:[],origem:opc.origem||'site'});
    const fimH=new Date(ini.getTime()+2*3600e3),fz=d=>`${d.getFullYear()}${String(d.getMonth()+1).padStart(2,'0')}${String(d.getDate()).padStart(2,'0')}T${String(d.getHours()).padStart(2,'0')}${String(d.getMinutes()).padStart(2,'0')}00`;
    const ics=`BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//Santa Grelha//PT\r\nBEGIN:VEVENT\r\nUID:${codigo}@santagrelha\r\nDTSTART;TZID=America/Fortaleza:${fz(ini)}\r\nDTEND;TZID=America/Fortaleza:${fz(fimH)}\r\nSUMMARY:Santa Grelha ${u.nome}, mesa para ${pes}\r\nLOCATION:${u.end}, Fortaleza\r\nEND:VEVENT\r\nEND:VCALENDAR`;
    $('.rv-cb').textContent=grupo?L('A confirmar','To confirm'):L('Reservado','Booked');$('.rv-cc').textContent=codigo;
    setTimeout(()=>$('.carimbo').classList.add('on'),250);
    const c=$('.canhoto');$('.rv-ch').textContent=L('Canhoto do cliente','Your stub');$('.rv-chc').textContent=codigo;c.hidden=false;setTimeout(()=>c.classList.add('solta'),900);
    R.feito=`<p class="serif d-m" style="margin-top:30px">${grupo?L('A comanda foi para a equipe.','Your slip is with the team.'):L('Mesa reservada.','Table booked.')}</p>
     <p class="corpo" style="margin-top:14px">${grupo?L(`Para ${pes} pessoas, a equipe junta as mesas e responde no WhatsApp ${esc(R.zap)}.`,`For ${pes} guests, the team joins tables and replies on WhatsApp ${esc(R.zap)}.`):L(`A confirmação chega no WhatsApp ${esc(R.zap)}, com um lembrete no dia.`,`Confirmation goes to WhatsApp ${esc(R.zap)}, with a reminder on the day.`)}</p>
     <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:18px"><a class="btn" download="santa-grelha.ics" href="data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}">${L('Pôr na agenda','Add to calendar')}</a><a class="btn" href="${u.mapa}" target="_blank" rel="noopener">${L('Como chegar','Directions')}</a><button type="button" class="btn rv-outra">${L('Nova comanda','New slip')}</button></div>
     <p class="rv-nota">${L('No protótipo, nenhuma mensagem é enviada. A reserva aparece no painel da equipe, neste navegador.','In the prototype, no message is sent. The booking shows up on the team’s panel, in this browser.')}</p>`;
    R.passo=7;pinta();}
  const api={casa(c){if(R.casa!==c){R.casa=c;R.dia=null;R.turno=null;R.hora=null;}pinta();},
    reinicia(forca){if(R.passo===7||forca){Object.assign(R,{passo:1,dia:null,turno:null,hora:null,pes:null});$('.carimbo').classList.remove('on');const c=$('.canhoto');c.hidden=true;c.classList.remove('solta');}pinta();},pinta};
  pinta();
  return api;
}};
})();
