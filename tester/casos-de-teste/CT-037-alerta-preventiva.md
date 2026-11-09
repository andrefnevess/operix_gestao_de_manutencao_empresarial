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

Regra coberta por teste unitário de domínio no PR #5 (`backend/src/domain/dominio.spec.ts`, teste "calcula a próxima data e os alertas"), executado em 23/10/2026 com `npm test` (23/23 aprovados, ver RT-001). A execução pela API e pela interface fica para quando UH04 a UH07 forem implementadas.

## Status

Não executado (API e interface) · regra de domínio aprovada em teste unitário

## Evidência

A anexar em `tester/evidencias/CT-037-evidencia.png` na execução.
