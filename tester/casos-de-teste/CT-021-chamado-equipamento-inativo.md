# CT-021 — Abertura de chamado para equipamento inativo

| Campo | Valor |
|---|---|
| ID | CT-021 |
| Requisito / História | RF04 / UH04 / CA04 · RN03 |
| Objetivo | Verificar que não é possível abrir chamado para equipamento inativo. |
| Pré-condições | Equipamento de teste inativado pelo gestor. |
| Dados de teste | Equipamento inativo: `EMP-002` (inativar antes do teste) |
| Prioridade | Alta |

## Passos

1. Como gestor, inativar o equipamento `EMP-002`.
2. Como solicitante, tentar abrir um chamado para `EMP-002`.

## Resultado esperado

O chamado é recusado com mensagem informando que o equipamento está inativo.

## Resultado obtido

Regra coberta por teste unitário de domínio no PR #5 (`backend/src/domain/dominio.spec.ts`, teste "não abre chamado para equipamento inativo (RN03)"), executado em 23/10/2026 com `npm test` (23/23 aprovados, ver RT-001). A execução pela API e pela interface fica para quando UH04 a UH07 forem implementadas.

## Status

Não executado (API e interface) · regra de domínio aprovada em teste unitário

## Evidência

A anexar em `tester/evidencias/CT-021-evidencia.png` na execução.
