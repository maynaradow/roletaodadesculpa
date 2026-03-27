# Plano: Transformar "Roletão das Desculpas" em "Roletão do Presente"

## Resumo

Alterar o conceito da roleta de "desculpas" para "presentes", com 6 novos segmentos e a roleta **viciada** para sempre cair em "Livro de Pesca". Textos de resultado adaptados para cada opção.

## Arquivos afetados

### 1. `src/components/SpinWheel.tsx`

**Trocar os segmentos** para:


| #   | Label                | Emoji | Cor (manter vibrantes) |
| --- | -------------------- | ----- | ---------------------- |
| 0   | R$ 1.000             | 💰    | rosa                   |
| 1   | Redução de testa     | 💇    | amarelo                |
| 2   | R$ 10                | 🪙    | ciano                  |
| 3   | Livro de programação | 📖    | verde                  |
| 4   | Tatuagem             | 🎨    | laranja                |
| 5   | Um abraço            | 🤗    | lilás                  |


**Viciar a roleta:** Na função `spinWheel`, substituir `randomSegment = Math.floor(Math.random() * 6)` por `randomSegment = 3` (index fixo do "Livro de programação"). A roleta ainda gira com rotações visuais aleatórias, mas sempre para no segmento 3. O cálculo de `finalAngle` continua usando spins aleatórios para parecer natural.

### 2. `src/pages/Index.tsx`

**Título:** Trocar "ROLETÃO DAS DESCULPAS" por "ROLETÃO DO PRESENTE".

**Trocar `EXCUSES**` (renomear para `OPTIONS` ou manter) para os nomes das 6 opções.

**Trocar `PRIZES**` com textos temáticos para cada presente. Exemplos:

1. 💰 R$ 1.000 — "Uau! Mil reais! Mas... espera... a roleta decidiu que você merece algo ainda melhor. Gira de novo!"
2. 💇 Redução de testa — "Visual novo, vida nova! Mas o destino tem outros planos pra você..."
3. 🪙 R$ 10 — "Dez reais! Dá pra um café... ou quase. Mas o universo quer te dar outra coisa."
4. 📖 Livro de programação — "PARABÉNS! Você ganhou o presente mais exclusivo, raro e insubstituível: um Livro sobre programação! Conhecimento que nenhum dinheiro compra.
5. 🎨 Tatuagem — "Uma tattoo! Marcante... literalmente. Mas será que é isso que o destino reservou?"
6. 🤗 Um Abraço — "Um abraço quentinho! Mas a roleta sabe que você precisa de algo mais especial..."

> Nota: Como sempre cai no index 3, na prática só o texto do Livro de Pesca será exibido, mas todos os textos existem para manter a consistência caso a lógica mude.

**Texto de instrução:** Trocar "AGUARDE SEU DESTINO" e "CLIQUE EM 'GIRA!'" para algo como "AGUARDE SEU PRESENTE!" e "CLIQUE EM 'GIRA!' PARA GANHAR SEU PRESENTE".

### 3. `index.html`

Atualizar `<title>` e meta description para "Roletão do Presente".

## O que NÃO muda

- Visual, cores, animações, confetti, PrizeCard, bolinhas piscantes — tudo permanece igual.
- Duração do giro (5s), easing, layout responsivo.