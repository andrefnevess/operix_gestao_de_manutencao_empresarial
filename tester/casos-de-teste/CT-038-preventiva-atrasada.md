# CT-038 — Preventiva atrasada

| Campo | Valor |
|---|---|
| ID | CT-038 |
| Requisito / História | RF08 / UH07 / CA05 |
| Objetivo | Verificar que preventivas não realizadas até a data prevista são destacadas como atrasadas. |
| Pré-condições | Plano com próxima data já vencida. |
| Dados de teste | Plano de teste com data vencida |
| Prioridade | Média |

## Passos

1. Como gestor, abrir a lista de preventivas.

## Resultado esperado

A preventiva vencida aparece destacada como **Atrasada**, com indicação em texto (não só por cor).

## Resultado obtido

Teste automatizado `CT-038` em `backend/tests/uh04-uh07.e2e-spec.ts`: aprovado na execução de José Arraes em 11/11/2026 (`npm run test:e2e`, 40/40). O plano vencido aparece em `/api/planos/alertas/atrasados`. O destaque na interface será verificado quando as telas existirem.

> Execução: 11/11/2026 · branch `api-chamados` (PR #11, commit `88fe83e`) · API em `PERSISTENCIA=memoria`.

## Status

Aprovado (API)

## Evidência

Saída dos testes automatizados no relatório [RT-002](../relatorios/RT-002-execucao-uh04-uh07.md).
