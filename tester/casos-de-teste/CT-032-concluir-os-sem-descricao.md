# CT-032 — Conclusão de OS sem descrição do serviço

| Campo | Valor |
|---|---|
| ID | CT-032 |
| Requisito / História | RF06 / UH06 / CA03 · RN06 |
| Objetivo | Verificar que concluir a OS exige a descrição do serviço realizado. |
| Pré-condições | OS em execução (CT-030). |
| Dados de teste | Descrição vazia |
| Prioridade | Alta |

## Passos

1. Clicar em **Concluir** sem preencher a descrição do serviço.

## Resultado esperado

A conclusão é recusada, indicando que a descrição é obrigatória; a OS continua Em execução.

## Resultado obtido

Regra coberta por teste unitário de domínio no PR #5 (`backend/src/domain/dominio.spec.ts`, teste "exige a descrição do serviço para concluir (RN06)"), executado em 23/10/2026 com `npm test` (23/23 aprovados, ver RT-001). A execução pela API e pela interface fica para quando UH04 a UH07 forem implementadas.

## Status

Não executado (API e interface) · regra de domínio aprovada em teste unitário

## Evidência

A anexar em `tester/evidencias/CT-032-evidencia.png` na execução.
