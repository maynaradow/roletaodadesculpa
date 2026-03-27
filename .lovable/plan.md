

# Bug: Roleta não para visualmente no segmento correto

## Diagnóstico

O problema está na linha 35 do `SpinWheel.tsx`:

```js
setRotation(prev => prev + finalAngle);
```

O `finalAngle` é calculado assumindo que a rotação começa de 0°, mas na verdade ele é **somado** à rotação anterior (`prev`). Após o primeiro giro, `prev` já não é zero, então o ângulo final acumulado não corresponde mais ao segmento 3. A cada giro subsequente, o erro se acumula e a roleta para em posições visuais diferentes.

## Correção

No `spinWheel()`, calcular o ângulo necessário **relativo à rotação atual** para que a roleta sempre pare visualmente no segmento "Livro de programação" (index 3):

1. Calcular o ângulo-alvo absoluto: `targetAngle = 210°` (centro do segmento 3 considerando que os segmentos começam no topo)
2. Calcular quanto falta para alinhar: `currentMod = prev % 360`, `correction = (targetAngle - currentMod + 360) % 360`
3. Somar as voltas visuais: `finalAngle = spins * 360 + correction`

Isso garante que `(prev + finalAngle) % 360 === 210` sempre, independente de quantas vezes o usuário girou.

## Arquivo afetado

`src/components/SpinWheel.tsx` — apenas a função `spinWheel` (linhas 25-41).

