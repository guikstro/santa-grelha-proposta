# Antes de publicar a versão final do cliente

Lista de verificação para quando o Santa Grelha aprovar. Enquanto for protótipo, nada disto muda.

## Sai da versão final

- [ ] Faixa de protótipo no topo do site, do link da bio, da reserva e do painel.
- [ ] `noindex,nofollow` em todas as páginas e o `robots.txt` que bloqueia buscadores.
- [ ] Botão "Ver o que corrigimos" do site (mostra o "antes" dos erros da casa).
- [ ] A data fixa "24/11/2026" nos rodapés e nas notas de preço e horário.
- [ ] O link "Painel da equipe" no rodapé do site público.
- [ ] As reservas de exemplo do painel (`exemplos` em `site/marca.js`).

## Entra na versão final

- [ ] Login no painel, com cada unidade vendo só as suas reservas.
- [ ] Reserva e pedido de evento enviados de verdade (hoje ficam só no `localStorage` do navegador).
- [ ] WhatsApp de cada casa em `site/marca.js` (campo `zap`). Hoje está vazio: os números antigos não batiam com nenhum telefone público.
- [ ] Alergênicos de cada prato no campo `alerg` de `site/cardapio.js`, confirmados pela cozinha. Hoje todos os pratos mostram "Alergênicos: confirmar com a casa".
- [ ] Filtro "sem glúten / sem lactose / sem crustáceos" no cardápio: só depois que os alergênicos forem confirmados. Hoje está desligado de propósito.
- [ ] Legenda das siglas LE, CO e CR, se a casa continuar usando siglas.
- [ ] Cardápio do Meireles (hoje o site mostra o do Iguatemi, com aviso).
- [ ] Menu Executivo: pratos, horário e preço confirmados (hoje "a confirmar com a casa").
- [ ] Link exato do Tripadvisor de cada casa (hoje é uma busca).
- [ ] Fotos em `assets/`, aprovadas pela casa (hoje vêm do Wix do Grupo Social Clube por link direto).
- [ ] Traduções para inglês revisadas pela casa.
- [ ] JSON-LD do site (`site/index.html`) com a URL final, o link do cardápio e o WhatsApp confirmado.
- [ ] Horário, endereço e cardápio alinhados com o perfil do Google da casa (o dono do perfil dá o acesso).

## Conferir no dia

- [ ] Abrir cada rota em 390 px e 1280 px: nenhum botão morto, nenhum texto cortado, preço com "R$".
- [ ] Horários contra o Tripadvisor, o Linktree e o Instagram da casa.
