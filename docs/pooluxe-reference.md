# Referência visual — Pooluxe (reactheme.com)

> Fonte: `https://reactheme.com/products/wordpress/pooluxe/` (Homepage 1), acessada via fetch
> automatizado em 2026-10-23. O fetch retornou o conteúdo em Markdown (texto estruturado da
> página), não uma captura visual pixel-a-pixel. Proporções, cores exatas, tipografia e o
> comportamento preciso de animações **não puderam ser confirmados visualmente** — estão
> marcados como "inferido" abaixo. Caso seja necessário validar com mais precisão, seria preciso
> fornecer capturas de tela da demo real.

## 1. Ordem das seções identificada (Homepage 1)

| # | Seção (Pooluxe) | Tipo de layout | Observações |
|---|---|---|---|
| 0 | Top bar promocional | Faixa fina, 1 linha + CTA | Específico do tema comercial — **não replicar** (é propaganda do próprio tema). |
| 1 | Header/Nav | Logo + menu com dropdowns + botão CTA "Start Your Project" | Fixo/sticky (inferido). |
| 2 | Hero | Título H1 + subtítulo + 2 botões + 3 bullets de confiança + imagem de fundo/lateral | Full-width, imagem cinematográfica. |
| 3 | Faixa de confiança/estatísticas | "Inspeção gratuita" + 4 blocos numéricos em linha horizontal | Números fixos (anos de experiência, piscinas atendidas, satisfação, técnicos certificados). |
| 4 | Antes e Depois | 2 imagens lado a lado (rótulo "antes"/"depois") | Texto não confirma se é slider arrastável — pode ser apenas duas imagens estáticas comparativas. |
| 5 | Serviços | 6 categorias (abas ou filtros) + texto/imagem alternando em 2 colunas | Cada serviço tem H4 + parágrafo + 4 bullets + imagem. |
| 6 | Planos/Pacotes | 3 cards de preço (mensal) com lista de benefícios + CTA | Estrutura tipo "pricing table" clássica. |
| 7 | Por que nos escolher | 6 itens numerados (1–6), grade 2×3 ou 3×2 | Título curto + texto curto cada. |
| 8 | Projetos recentes | 6 cards (imagem + título + localização/duração + texto + CTA "Ver projeto") | Grade de projetos, estilo portfólio. |
| 9 | Nosso processo | 4 etapas em linha (Consulta → Projeto → Execução → Entrega/Cuidado) | Estrutura "how it works". |
| 10 | Depoimentos | 8 avaliações (avatar, nome, data, selo Google, nota 5.0, texto) | Grade ou carrossel (não confirmado). |
| 11 | Modal de vídeo | Popup oculto "veja como construímos sua piscina" | Gatilho não identificado no texto. |
| 12 | FAQ | 5 perguntas com respostas sempre visíveis | Não confirmado se é accordion. |
| 13 | Footer | Logo + tagline + 5 ícones sociais + 2 colunas de links + horário + endereço + copyright | — |

**Inconsistências notadas no conteúdo original do tema** (não devem ser replicadas): tagline do
footer fala de "serviços de jardim" (não combina com piscinas — erro do template demo), link
para IP interno `192.168.0.174:10058`, erro de digitação "Satisfication"/"Pool Water
Treeatment". Esses são defeitos do conteúdo de demonstração do tema, irrelevantes para a
identidade da Martins Piscinas.

## 2. Estilo geral (inferido, sem confirmação visual)

- Fotografia de piscina como elemento dominante em praticamente toda seção de destaque (hero,
  antes/depois, serviços, projetos).
- Alternância constante entre blocos de texto curto + imagem grande — pouco texto corrido.
- Uso de números/estatísticas e selos de confiança (avaliações, certificações) logo no topo da
  página, antes de qualquer explicação institucional longa.
- CTA de orçamento repetido em múltiplos pontos (header, hero, serviços, planos, processo).
- Seções com fundo alternado claro/escuro para criar ritmo visual (inferido a partir da
  variação entre seções "claras" de conteúdo e blocos de imagem cheia como antes/depois e
  processo).

## 3. Adaptações necessárias para a Martins Piscinas

A Martins Piscinas **não possui hoje** dados reais para preencher fielmente todas as seções do
Pooluxe. Seguindo a regra do projeto de **não inventar informações da empresa**, a adaptação
abaixo separa o que pode ser reproduzido com conteúdo real do que exige dados que ainda não
foram fornecidos:

| Seção Pooluxe | Decisão | Motivo |
|---|---|---|
| Header/Nav | Reproduzir | Conteúdo real disponível (navegação, botão de orçamento). |
| Hero | Reproduzir | Título/subtítulo/CTAs já definidos no briefing. |
| Estatísticas (anos, piscinas atendidas, etc.) | **Pendente de dados reais** | Exigiria números factuais da empresa que não foram informados. Não inventar. |
| Antes e Depois | **Pendente de fotos reais** | O briefing veda inventar "resultados reais de obras"; a seção só deve ir ao ar com fotos reais antes/depois, marcadas como tal. |
| Serviços | Reproduzir (2 serviços apenas) | Construção e manutenção — não adicionar serviços extras. |
| Planos/Preços | **Fora do escopo** | Briefing não define planos de assinatura/preço; não inventar. |
| Por que nos escolher | Pode ser reproduzido com texto institucional genérico (sem números fabricados) | Compõe o ritmo visual do Pooluxe sem violar a regra de não inventar dados factuais. |
| Projetos/Galeria | Reproduzir | Já implementado com imagens ilustrativas devidamente identificadas. |
| Nosso processo | Pode ser reproduzido com etapas de atendimento genéricas (contato → visita/avaliação → execução → entrega e manutenção) | Não depende de números ou fatos exclusivos da empresa. |
| Depoimentos | Reproduzir (somente os 2 fornecidos) | Jaqueline Lima e Vitor Gomez — não inventar avaliações nem nota média. |
| Modal de vídeo | Fora do escopo por ora | Não há vídeo institucional fornecido. |
| FAQ | Pode ser reproduzido com perguntas genéricas sobre processo/atendimento | Desde que as respostas não fabriquem prazos, preços ou garantias específicas não confirmadas. |
| Footer | Reproduzir | Dados de contato, navegação e redes sociais reais. |

## 4. Estrutura implementada no site (após decisões do cliente)

```
Header
→ Hero
→ Estatísticas            (componente pronto em src/components/sections/Stats.tsx;
                            só renderiza quando `stats` em src/data/company.ts for
                            preenchido com números reais — hoje está vazio e a seção
                            não aparece na página)
→ Sobre
→ Serviços
→ Diferenciais            ("Por que a Martins Piscinas" — texto institucional genérico,
                            sem estatísticas fabricadas)
→ Faixa cinematográfica    (frase de marca, pausa visual entre blocos de conteúdo)
→ Projetos                 (galeria, imagens ilustrativas identificadas)
→ Como funciona            (4 etapas de atendimento, sem prazos/preços inventados)
→ Depoimentos              (somente Jaqueline Lima e Vitor Gomez)
→ FAQ                      (perguntas genéricas sobre atendimento/processo)
→ Formulário de orçamento
→ Contato/Localização
Footer
Botão flutuante WhatsApp
```

Essa sequência segue o ritmo do Pooluxe (hero → confiança/estatísticas → serviços →
diferenciais → prova social/projetos → processo → depoimentos → FAQ → footer), adaptando a
posição de "Sobre" para logo após o hero, como pedido explicitamente no briefing da Martins
Piscinas (o fetch da referência, por ser baseado em markdown e não em captura visual, não
confirmou uma seção equivalente isolada na Pooluxe).

### Pendências que dependem de informações do cliente

- **Estatísticas**: aguardando números reais (anos de mercado, piscinas atendidas, etc.) para
  preencher `stats` em `src/data/company.ts`. Até lá, a seção fica oculta — não foi inventado
  nenhum número.
- **Antes e depois**: componente `src/components/ui/BeforeAfterSlider.tsx` já implementado
  (slider interativo, arrastável e navegável por teclado), mas **não está publicado na
  página**. Falta o cliente fornecer fotos reais de antes/depois de projetos executados para
  popular `beforeAfterPairs` em `src/data/company.ts` e adicionar a seção ao `page.tsx`.
- **Planos/preços**: fora do escopo deste redesign — o briefing da Martins Piscinas não define
  pacotes com preço, e a referência não deve ser seguida neste ponto específico.
- **Modal de vídeo institucional**: fora do escopo — não há vídeo fornecido pelo cliente.
