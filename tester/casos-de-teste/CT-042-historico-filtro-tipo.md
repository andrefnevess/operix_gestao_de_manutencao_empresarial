# CT-042 — Filtro do histórico por tipo de manutenção

| Campo | Valor |
|---|---|
| ID | CT-042 |
| Requisito / História | UH08 / CA03 |
| Objetivo | Verificar o filtro por tipo (corretiva ou preventiva). |
| Pré-condições | Equipamento com uma corretiva e uma preventiva concluídas. |
| Dados de teste | `?tipo=CORRETIVA`, `?tipo=PREVENTIVA` e `?tipo=XYZ` |
| Prioridade | Média |

## Passos

1. Consultar o histórico com cada filtro de tipo.

## Resultado esperado

Cada filtro mostra só as manutenções do tipo escolhido; um tipo inválido é recusado com mensagem clara.

## Resultado obtido

Teste automatizado `CT-042` em `backend/tests/uh08.e2e-spec.ts`: aprovado na execução de José Arraes em 11/11/2026 (`npm run test:e2e`, 50/50).

Observação: `?tipo=XYZ` retorna 200 com lista vazia, em vez de recusar o valor (DEF-13).

> Execução: 11/11/2026 · branch local `qa/regressao-final` = `main` + PR #13 + PR #14 + testes da branch `test/e2e-uh04-uh07` · API em `PERSISTENCIA=memoria`.

## Status

Aprovado com observação

## Evidência

Saída dos testes automatizados no relatório [RT-003](../relatorios/RT-003-regressao-final.md).
