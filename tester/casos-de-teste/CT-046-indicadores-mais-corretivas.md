# CT-046 — Equipamentos com mais manutenções corretivas

| Campo | Valor |
|---|---|
| ID | CT-046 |
| Requisito / História | UH08 / CA06 |
| Objetivo | Verificar o ranking de equipamentos com mais manutenções corretivas no período. |
| Pré-condições | Equipamento com 4 corretivas e 1 preventiva concluídas. |
| Dados de teste | Equipamento `QA-046` |
| Prioridade | Média |

## Passos

1. Concluir as manutenções.
2. Consultar os indicadores.

## Resultado esperado

O equipamento aparece no topo com 4 corretivas (a preventiva não conta), em ordem decrescente, e é possível escolher o período.

## Resultado obtido

Teste automatizado `CT-046` em `backend/tests/uh08.e2e-spec.ts`: aprovado na execução de José Arraes em 11/11/2026 (`npm run test:e2e`, 50/50). Ranking em ordem decrescente, no máximo 5 equipamentos.

Observação: o painel não aceita período; o ranking considera todas as manutenções já feitas (DEF-14).

> Execução: 11/11/2026 · branch local `qa/regressao-final` = `main` + PR #13 + PR #14 + testes da branch `test/e2e-uh04-uh07` · API em `PERSISTENCIA=memoria`.

## Status

Aprovado com observação

## Evidência

Saída dos testes automatizados no relatório [RT-003](../relatorios/RT-003-regressao-final.md).
