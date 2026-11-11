# CT-045 — Indicador de ordens e preventivas atrasadas

| Campo | Valor |
|---|---|
| ID | CT-045 |
| Requisito / História | UH08 / CA05 |
| Objetivo | Verificar a quantidade de ordens e de preventivas atrasadas. |
| Pré-condições | Gestor autenticado. |
| Dados de teste | OS atribuída com data prevista de ontem · plano com início há 40 dias e periodicidade de 30 |
| Prioridade | Alta |

## Passos

1. Consultar os indicadores.
2. Criar a OS atrasada e o plano vencido.
3. Consultar de novo.

## Resultado esperado

`ordensAtrasadas` e `preventivasAtrasadas` aumentam em 1 cada.

## Resultado obtido

Teste automatizado `CT-045` em `backend/tests/uh08.e2e-spec.ts`: aprovado na execução de José Arraes em 11/11/2026 (`npm run test:e2e`, 50/50).

> Execução: 11/11/2026 · branch local `qa/regressao-final` = `main` + PR #13 + PR #14 + testes da branch `test/e2e-uh04-uh07` · API em `PERSISTENCIA=memoria`.

## Status

Aprovado

## Evidência

Saída dos testes automatizados no relatório [RT-003](../relatorios/RT-003-regressao-final.md).
