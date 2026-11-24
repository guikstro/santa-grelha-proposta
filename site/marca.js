// Santa Grelha: dados da marca e das duas casas de Fortaleza (conferidos em 24/11/2026).
const W='https://static.wixstatic.com/media/404bb8_';
window.MARCA={
  id:'santagrelha', nome:'Santa Grelha', prefixo:'SG',
  logo:W+'81e786be002e46a6983a11a3dbeebdc5~mv2.png/v1/fill/w_600,h_440,al_c,q_85/sg.png',
  foto:W+'2d4c35fd62d441589e974405a979c270~mv2.jpg/v1/fill/w_900,h_600,al_c,q_80,enc_auto/sg.jpg',
  eventos:'../#eventos',
  // Tripadvisor (busca): o link exato de cada perfil entra quando a casa confirmar
  trip:'https://www.tripadvisor.com.br/Search?q=Santa%20Grelha%20Fortaleza',
  unidades:[
    {id:'meireles',nome:'Meireles',sigla:'M',end:'R. Tibúrcio Cavalcante, 790, Meireles',
     // Tripadvisor: domingo a quarta 11h30–22h; quinta a sábado 11h30–23h
     hor:{0:[[690,1320]],1:[[690,1320]],2:[[690,1320]],3:[[690,1320]],4:[[690,1380]],5:[[690,1380]],6:[[690,1380]]},
     foto:W+'12f9ebec04d744c3be7153db3744b25d~mv2.jpg/v1/fill/w_1600,h_1100,al_c,q_82,enc_auto/sg-meireles.jpg',
     mapa:'https://www.google.com/maps/search/?api=1&query=Santa+Grelha+Rua+Tib%C3%BArcio+Cavalcante+790+Fortaleza',
     // WhatsApp: pendente. Os números antigos não batem com nenhum telefone público; confirmar com a casa antes de usar.
     zap:'', tel:'(85) 3224-0249', trip:['4,7','2.503','nº 21 em Fortaleza','4.7','2,503','#21 in Fortaleza']},
    {id:'iguatemi',nome:'Iguatemi',sigla:'I',end:'Av. Washington Soares, 85, loja 779, Shopping Iguatemi',
     // Tripadvisor: todos os dias 11h30–22h
     hor:{0:[[690,1320]],1:[[690,1320]],2:[[690,1320]],3:[[690,1320]],4:[[690,1320]],5:[[690,1320]],6:[[690,1320]]},
     foto:W+'2d4c35fd62d441589e974405a979c270~mv2.jpg/v1/fill/w_1600,h_1100,al_c,q_82,enc_auto/sg-iguatemi.jpg',
     mapa:'https://www.google.com/maps/search/?api=1&query=Santa+Grelha+Iguatemi+Fortaleza',
     zap:'', tel:'(85) 3241-5541', trip:['4,8','2.598','nº 1 de 3.346 em Fortaleza','4.8','2,598','#1 of 3,346 in Fortaleza']}
  ],
  exemplos:[
    {k:1,h:20,m:0,casa:'meireles',pessoas:2,ocasiao:'Jantar a dois',pedidos:[],obs:'',nome:'Exemplo: Marina',zap:'(85) 9 0000-0001',status:'confirmada',motivos:[]},
    {k:1,h:13,m:0,casa:'iguatemi',pessoas:8,ocasiao:'Negócios',pedidos:['Mesa mais tranquila'],obs:'',nome:'Exemplo: Paulo',zap:'(85) 9 0000-0002',status:'aguardando',motivos:['grupo de 8','mesa mais tranquila']},
    {k:2,h:20,m:30,casa:'meireles',pessoas:6,ocasiao:'Aniversário',pedidos:['Cadeira para criança'],obs:'Bolo trazido pela família',nome:'Exemplo: Renata',zap:'(85) 9 0000-0003',status:'aguardando',motivos:['grupo de 6','cadeira para criança','observação']}
  ]
};
