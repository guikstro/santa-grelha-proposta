# Santa Grelha · entrega da Timeless

Protótipo do Santa Grelha, do Grupo Social Clube, publicado com o ok do Guilherme em 24/11/2026 só para a casa ver. Não é o site oficial. Todas as páginas têm `noindex` e o `robots.txt` bloqueia buscadores.

| Pasta | O que é | No ar |
|---|---|---|
| `index.html` | A proposta em forma de cardápio | fica com a Timeless |
| `Timeless - Proposta Santa Grelha.pdf` | A mesma proposta em PDF A4 | |
| `site/` | Site da casa. Primeira tela com duas portas (Meireles e Iguatemi), cada uma dizendo se está aberta agora. Cardápio com as siglas de alergênico como a casa publica. | santagrelha.com.br |
| `site/reservar/` | Reserva em passos: casa, dia, horário, pessoas, ocasião, pedidos. Comum confirma na hora; grupo a partir de 6 ou pedido especial vai para a equipe | santagrelha.com.br/reservar |
| `site/links/` | Link da bio, com as duas casas | santagrelha.com.br/links |
| `painel/` | Área da equipe, por unidade, com o código de cada reserva | painel.santagrelha.com.br, com login |
| `site/marca.js` | Unidades, horários, fotos e exemplos | |
| `site/comum.js` | Motor comum: idioma, fuso, estado de cada casa, reservas | |
| `site/cardapio.js` | Cardápio copiado do GetIn em 24/11/2026, com correções marcadas | |

## Ver no computador

```bash
python3 -m http.server 4630
```

Depois abra `http://localhost:4630`.

## Antes de enviar

- Conferir de novo os achados no dia do envio.
- Fotos e logo vêm do site do Grupo Social Clube por link direto. Para publicar, só fotos que a casa aprovar.
- As traduções para inglês são nossas e precisam da revisão da casa.
- Preços (24/11/2026): Biolink R$ 590 + R$ 99/mês; Site da casa R$ 1.490 + R$ 189/mês; Canal direto R$ 2.890 + R$ 329/mês, para a marca com as duas casas de Fortaleza.
