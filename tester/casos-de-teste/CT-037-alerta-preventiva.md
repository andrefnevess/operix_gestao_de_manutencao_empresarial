# CT-037 — Alerta de preventiva próxima do vencimento

| Campo | Valor |
|---|---|
| ID | CT-037 |
| Requisito / História | RF08 / UH07 / CA04 |
| Objetivo | Verificar o alerta de preventivas que vencem nos próximos 7 dias. |
| Pré-condições | Planos com próxima data em 3 dias, em 7 dias e em 8 dias. |
| Dados de teste | Três planos de teste com periodicidades ajustadas |
| Prioridade | Média |

## Passos

1. Como gestor, abrir o painel ou a lista de alertas.

## Resultado esperado

Aparecem os planos que vencem em 3 e 7 dias; o de 8 dias não aparece.

## Resultado obtido

Teste automatizado `CT-037` em `backend/tests/uh04-uh07.e2e-spec.ts`: aprovado na execução de José Arraes em 11/11/2026 (`npm run test:e2e`, 40/40). O plano que vence em 5 dias aparece em `/api/planos/alertas/vencendo`; o que vence em 30 dias não aparece.

> Execução: 11/11/2026 · branch `api-chamados` (PR #11, commit `88fe83e`) · API em `PERSISTENCIA=memoria`.

## Status

Aprovado

## Evidência

Saída dos testes automatizados no relatório [RT-002](../relatorios/RT-002-execucao-uh04-uh07.md).
