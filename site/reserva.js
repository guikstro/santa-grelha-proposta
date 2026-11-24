// Reserva do Santa Grelha, a mesma no site e na bio. Três passos: casa e quando, quantos, quem.
// Grava em Reservas (comum.js), que alimenta o painel da equipe, com a casa escolhida. Grupo a partir de 6 entra "para confirmar".
// Uso: const r=Reserva.monta(elemento,{casa:'meireles',origem:'site'}); r.casa('iguatemi'); r.reinicia();
(function(){
const esc=t=>String(t??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const fmtDia=x=>`${(lang==='en'?DAYS:DIAS)[x.wd]}, ${x.dt.getDate()}/${x.dt.getMonth()+1}`;
window.Reserva={monta(raiz,opc){
  opc=opc||{};
  const R={passo:1,casa:opc.casa||MARCA.unidades[0].id,dia:0,hora:null,pes:2,nome:'',zap:''};
  const U=()=>unidade(R.casa);
  const horas=x=>{const {m}=agoraFortaleza(),o=[];U().hor[x.wd].forEach(([a,b])=>{for(let t=a;t<=b-60;t+=30){if(x.k===0&&t<m+30)continue;o.push(t);}});return o;};
  const dias=()=>{const {d}=agoraFortaleza(),h=new Date(new Date().toLocaleString('en-US',{timeZone:'America/Fortaleza'}));return [...Array(14)].map((_,k)=>{const dt=new Date(h);dt.setDate(h.getDate()+k);return {k,wd:(d+k)%7,dt};}).filter(x=>horas(x).length);};
  const curto=x=>x.k===0?L('Hoje','Today'):x.k===1?L('Amanhã','Tomorrow'):(lang==='en'?DAYS:DIAS)[x.wd].slice(0,3);
  const zapOk=()=>R.zap.replace(/\D/g,'').length>=10;
  const num=String(Math.floor(1000+Math.random()*8999));
  raiz.innerHTML=`<div class="papel"><div class="cab-p"><span class="mono" aria-hidden="true"></span><span><span class="rv-cm"></span><b class="rv-num"></b></span></div>
     ${['casa','dia','hora','mesa','nome'].map(k=>`<div class="linha"><small class="rv-k-${k}"></small><span class="mao" data-l="${k}"></span></div>`).join('')}
     <div class="carimbo" aria-hidden="true"><span><b class="rv-cb"></b><small class="rv-cc"></small></span></div></div>
   <div class="canhoto" hidden><span class="rv-ch"></span><b class="rv-chc"></b></div>
   <div class="rv-etapas" style="margin-top:18px"></div>
   <div class="rv-p" data-p="1"><p class="rot rv-r rv-l1"></p><div class="fichas" data-g="casa"></div><p class="rot rv-r rv-l2"></p><div class="fichas rola" data-g="dia"></div><p class="rot rv-r rv-l3"></p><div class="fichas" data-g="hora"></div></div>
   <div class="rv-p" data-p="2"><p class="rot rv-r rv-l4"></p><div class="fichas" data-g="pes"></div><p class="rv-nota rv-pn"></p></div>
   <div class="rv-p" data-p="3"><label class="campo"><span class="rv-l5"></span><input data-c="nome" autocomplete="name"></label><label class="campo"><span>WhatsApp</span><input data-c="zap" type="tel" inputmode="tel" autocomplete="tel" placeholder="(85) 9 0000-0000"></label><p class="erro"></p><div class="rv-resumo"></div><p class="rv-nota rv-l6"></p></div>
   <div class="rv-p rv-feito" data-p="4"></div>
   <div class="rv-pe"><button type="button" class="btn quad rv-volta"><svg class="ic" viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></svg></button><button type="button" class="btn rv-ok"></button></div>`;
  const $=s=>raiz.querySelector(s);
  // a caneta: cada linha da comanda se escreve quando o valor muda
  const escreve=(k,t)=>{const el=raiz.querySelector(`[data-l=${k}]`);if(el.dataset.v===t)return;el.dataset.v=t;el.classList.remove('escrito');el.textContent=t;if(t){void el.offsetWidth;el.classList.add('escrito');}};
  function pinta(){
    const D=dias();if(R.dia>=D.length)R.dia=0;const x=D[R.dia],H=horas(x);if(!H.includes(R.hora))R.hora=null;const u=U();
    $('.rv-etapas').innerHTML=[L('Casa e dia','House and day'),L('Mesa','Table'),L('Quem','Who')].map((t,i)=>`<span class="${i<R.passo?'ok':''}">${t}</span>`).join('');
    $('.rv-cm').textContent=L('Comanda','Order slip');$('.rv-num').textContent='nº '+num;
    [['casa','Casa','House'],['dia','Dia','Day'],['hora','Hora','Time'],['mesa','Mesa','Table'],['nome','Nome','Name']].forEach(([k,p,e])=>$('.rv-k-'+k).textContent=L(p,e));
    escreve('casa',u.nome);escreve('dia',fmtDia(x));escreve('hora',R.hora!=null?hm(R.hora):'');escreve('mesa',R.passo>1?`${R.pes} ${R.pes==1?L('pessoa','guest'):L('pessoas','guests')}`:'');escreve('nome',R.nome.trim().length>1?R.nome.trim():'');
    $('.rv-l1').textContent=L('Casa','House');$('.rv-l2').textContent=L('Dia','Day');$('.rv-l3').textContent=L('Horário','Time');$('.rv-l4').textContent=L('Pessoas','Guests');$('.rv-l5').textContent=L('Nome','Name');
    $('.rv-l6').textContent=L('Protótipo: a reserva fica só neste navegador e aparece no painel da equipe. No ar, entra na agenda da casa.','Prototype: the booking stays in this browser and shows up on the team’s panel.');
    $('.rv-volta').setAttribute('aria-label',L('Voltar','Back'));
    raiz.querySelectorAll('.rv-p').forEach(p=>p.hidden=+p.dataset.p!==R.passo);
    $('.rv-etapas').hidden=R.passo===4;$('.rv-pe').hidden=R.passo===4;$('.rv-volta').hidden=R.passo===1;
    $('[data-g=casa]').innerHTML=MARCA.unidades.map(y=>`<button type="button" class="btn" data-v="${y.id}" aria-pressed="${y.id===R.casa}">${y.nome}</button>`).join('');
    $('[data-g=dia]').innerHTML=D.map((y,i)=>`<button type="button" class="btn" data-v="${i}" aria-pressed="${i===R.dia}">${curto(y)}<small>${y.dt.getDate()}/${y.dt.getMonth()+1}</small></button>`).join('');
    $('[data-g=hora]').innerHTML=H.map(t=>`<button type="button" class="btn" data-v="${t}" aria-pressed="${t===R.hora}">${hm(t)}</button>`).join('');
    $('[data-g=pes]').innerHTML=[1,2,3,4,5,6,7,8,'9+'].map(n=>`<button type="button" class="btn" data-v="${n}" aria-pressed="${String(n)===String(R.pes)}">${n}</button>`).join('');
    $('.rv-pn').textContent=R.pes==='9+'?L('Para 9 ou mais, a equipe de eventos monta a mesa e responde pelo WhatsApp da casa.','For 9 or more, the events team sets the table and replies on WhatsApp.'):R.pes>=6?L('A partir de 6 pessoas, a equipe junta as mesas e confirma pelo WhatsApp.','From 6 guests, the team joins tables and confirms on WhatsApp.'):L('Até 5 pessoas, a mesa fica confirmada na hora.','Up to 5 guests, the table is confirmed instantly.');
    $('.rv-resumo').innerHTML=`<span class="rot">Santa Grelha ${esc(u.nome)}</span><b>${fmtDia(x)}${R.hora!=null?', '+hm(R.hora):''}</b><span class="leg">${R.pes} ${R.pes==1?L('pessoa','guest'):L('pessoas','guests')}</span>`;
    const ok=$('.rv-ok');
    if(R.passo===1){ok.disabled=R.hora==null;ok.textContent=R.hora==null?L('Escolha o horário','Pick a time'):L('Continuar','Continue');}
    if(R.passo===2){ok.disabled=false;ok.textContent=L('Continuar','Continue');}
    if(R.passo===3){ok.disabled=!(R.nome.trim().length>1&&zapOk());ok.textContent=L('Reservar mesa','Book the table');}}
  raiz.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;const g=b.parentNode.dataset.g;
    if(g==='casa'){R.casa=b.dataset.v;R.hora=null;}else if(g==='dia'){R.dia=+b.dataset.v;R.hora=null;}else if(g==='hora')R.hora=+b.dataset.v;else if(g==='pes')R.pes=b.dataset.v==='9+'?'9+':+b.dataset.v;
    else if(b.classList.contains('rv-volta'))R.passo=Math.max(1,R.passo-1);else if(b.classList.contains('rv-ok')&&!b.disabled){if(R.passo<3)R.passo++;else{envia();return;}}
    pinta();});
  raiz.addEventListener('input',e=>{const c=e.target.dataset.c;if(c)R[c]=e.target.value;$('.erro').textContent=R.zap&&!zapOk()?L('Coloque o DDD e o número completo.','Add the area code and full number.'):'';pinta();});
  function envia(){
    const x=dias()[R.dia],u=U(),pes=R.pes==='9+'?9:R.pes,grupo=pes>=6;
    const codigo=MARCA.prefixo+'-'+u.sigla+String(x.dt.getDate()).padStart(2,'0')+String(R.hora/30|0).padStart(2,'0')+'-'+Math.random().toString(36).slice(2,5).toUpperCase();
    const ini=new Date(x.dt);ini.setHours(R.hora/60|0,R.hora%60,0,0);
    Reservas.nova({codigo,casa:u.id,criada:new Date().toISOString(),inicio:ini.toISOString(),dia:fmtDia(x),hora:hm(R.hora),pessoas:pes,ocasiao:'',pedidos:R.pes==='9+'?['9 pessoas ou mais']:[],obs:'',nome:R.nome.trim(),zap:R.zap,status:grupo?'aguardando':'confirmada',motivos:grupo?[`grupo de ${R.pes}`]:[],origem:opc.origem||'site'});
    const fimH=new Date(ini.getTime()+2*3600e3),fz=d=>`${d.getFullYear()}${String(d.getMonth()+1).padStart(2,'0')}${String(d.getDate()).padStart(2,'0')}T${String(d.getHours()).padStart(2,'0')}${String(d.getMinutes()).padStart(2,'0')}00`;
    const ics=`BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//Santa Grelha//PT\r\nBEGIN:VEVENT\r\nUID:${codigo}@santagrelha\r\nDTSTART;TZID=America/Fortaleza:${fz(ini)}\r\nDTEND;TZID=America/Fortaleza:${fz(fimH)}\r\nSUMMARY:Santa Grelha ${u.nome}, mesa para ${pes}\r\nLOCATION:${u.end}, Fortaleza\r\nEND:VEVENT\r\nEND:VCALENDAR`;
    $('.rv-cb').textContent=grupo?L('A confirmar','To confirm'):L('Reservado','Booked');$('.rv-cc').textContent=codigo;
    setTimeout(()=>$('.carimbo').classList.add('on'),250);
    const c=$('.canhoto');$('.rv-ch').textContent=L('Canhoto do cliente','Your stub');$('.rv-chc').textContent=codigo;c.hidden=false;setTimeout(()=>c.classList.add('solta'),900);
    $('.rv-feito').innerHTML=`<p class="serif d-m" style="margin-top:30px">${grupo?L('A comanda foi para a equipe.','Your slip is with the team.'):L('Mesa reservada.','Table booked.')}</p>
     <p class="corpo" style="margin-top:14px">${grupo?L(`Para ${pes} pessoas, a equipe junta as mesas e responde no WhatsApp ${esc(R.zap)}.`,`For ${pes} guests, the team joins tables and replies on WhatsApp ${esc(R.zap)}.`):L(`A confirmação chega no WhatsApp ${esc(R.zap)}, com um lembrete no dia.`,`Confirmation goes to WhatsApp ${esc(R.zap)}, with a reminder on the day.`)}</p>
     <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:18px"><a class="btn" download="santa-grelha.ics" href="data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}">${L('Pôr na agenda','Add to calendar')}</a><a class="btn" href="${u.mapa}" target="_blank" rel="noopener">${L('Como chegar','Directions')}</a></div>
     <p class="rv-nota">${L('No protótipo, nenhuma mensagem é enviada. A reserva aparece no painel da equipe, neste navegador.','In the prototype, no message is sent. The booking shows up on the team’s panel, in this browser.')}</p>`;
    R.passo=4;pinta();}
  pinta();
  return {casa(c){R.casa=c;R.hora=null;pinta();},reinicia(){if(R.passo===4){R.passo=1;R.hora=null;$('.carimbo').classList.remove('on');const c=$('.canhoto');c.hidden=true;c.classList.remove('solta');}pinta();},pinta};
}};
})();
