# CT-034 — Alteração de OS concluída

| Campo | Valor |
|---|---|
| ID | CT-034 |
| Requisito / História | RF06 / UH06 / CA06 · RN05 |
| Objetivo | Verificar que ordens concluídas ou canceladas não podem ser alteradas. |
| Pré-condições | Uma OS concluída (CT-033) e uma OS cancelada. |
| Dados de teste | OS do CT-033 |
| Prioridade | Alta |

## Passos

1. Tentar editar, iniciar, atribuir ou cancelar a OS concluída (tela e API).
2. Repetir com a OS cancelada.

## Resultado esperado

Todas as alterações são recusadas.

## Resultado obtido

Regra coberta por teste unitário de domínio no PR #5 (`backend/src/domain/dominio.spec.ts`, teste "OS concluída não muda mais (RN05)"), executado em 23/10/2026 com `npm test` (23/23 aprovados, ver RT-001). A execução pela API e pela interface fica para quando UH04 a UH07 forem implementadas.

## Status

Não executado (API e interface) · regra de domínio aprovada em teste unitário

## Evidência

A anexar em `tester/evidencias/CT-034-evidencia.png` na execução.
