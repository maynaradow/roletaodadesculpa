
Diagnóstico: o cálculo atual usa o ângulo errado para o segmento “Livro de programação”.

O código hoje faz:
```ts
const targetAngle = 210;
```

Mas esse `210°` foi calculado como se a fatia 0 começasse em `0°`. No seu SVG, as fatias são desenhadas com este offset:
```ts
(index * segmentAngle - 90)
```

Ou seja: a roleta começa no topo (`-90°`), não em `0°`.

Com a geometria real da roda:
- cada fatia tem `60°`
- o centro da fatia 3 fica em `120°`
- o ponteiro está no topo, em `270°` / `-90°`
- então a rotação correta para alinhar a fatia 3 no ponteiro é `150°`, não `210°`

Por isso acontece este bug:
- o resultado lógico sempre é índice `3`
- mas a animação está parando em um ângulo visual incompatível com a posição real da fatia
- então o card mostra “Livro de programação”, enquanto o ponteiro aponta para outra opção

Plano de correção:
1. Remover o valor fixo incorreto `210`
2. Calcular o ângulo do centro da fatia a partir da mesma lógica usada para desenhar a roda
3. Calcular o alvo do ponteiro com base no topo da roda
4. Ajustar a correção acumulada usando esse alvo real

Abordagem recomendada:
```ts
const segmentAngle = 360 / SEGMENTS.length;
const winningIndex = 3;
const pointerAngle = 270; // topo
const segmentCenterAngle = (winningIndex * segmentAngle) + (segmentAngle / 2) - 90;
const targetRotation = (pointerAngle - segmentCenterAngle + 360) % 360;
```

Depois, no `setRotation`:
```ts
const currentMod = ((prev % 360) + 360) % 360;
const correction = (targetRotation - currentMod + 360) % 360;
return prev + spins * 360 + correction;
```

Resultado esperado:
- a lógica continua viciada no índice 3
- o ponteiro passa a apontar visualmente para “Livro de programação” em todos os giros
- a correção deixa de depender de chute manual e passa a seguir a geometria real da roleta

Arquivo afetado:
- `src/components/SpinWheel.tsx`

Observação técnica:
o problema não é mais “acúmulo de rotação” apenas; essa parte já foi parcialmente tratada. O bug restante é principalmente de mapeamento geométrico: o alvo visual foi calculado com referência angular errada.
