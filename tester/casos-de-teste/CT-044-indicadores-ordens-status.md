# CT-044 — Indicador de ordens por status

| Campo | Valor |
|---|---|
| ID | CT-044 |
| Requisito / História | UH08 / CA04 |
| Objetivo | Verificar a quantidade de ordens por status no painel. |
| Pré-condições | Gestor autenticado. |
| Dados de teste | Uma OS aberta, uma atribuída e uma concluída criadas durante o teste |
| Prioridade | Alta |

## Passos

1. Consultar `GET /api/indicadores`.
2. Criar as três OS.
3. Consultar de novo e comparar.

## Resultado esperado

O painel mostra Aberta, Atribuída, Em execução e Concluída, e cada contagem aumenta de acordo com as OS criadas.

## Resultado obtido

Teste automatizado `CT-044` em `backend/tests/uh08.e2e-spec.ts`: aprovado na execução de José Arraes em 11/11/2026 (`npm run test:e2e`, 50/50).

> Execução: 11/11/2026 · branch local `qa/regressao-final` = `main` + PR #13 + PR #14 + testes da branch `test/e2e-uh04-uh07` · API em `PERSISTENCIA=memoria`.

## Status

Aprovado

## Evidência

Saída dos testes automatizados no relatório [RT-003](../relatorios/RT-003-regressao-final.md).
