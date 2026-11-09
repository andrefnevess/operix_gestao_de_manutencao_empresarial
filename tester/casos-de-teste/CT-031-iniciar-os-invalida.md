# CT-031 — Início de OS não atribuída ou por outro técnico

| Campo | Valor |
|---|---|
| ID | CT-031 |
| Requisito / História | RF06 / UH06 / CA01 · RN04 · RN10 |
| Objetivo | Verificar que a OS só é executada depois de atribuída e somente pelo técnico atribuído. |
| Pré-condições | Uma OS Aberta (não atribuída) e uma OS atribuída a outro técnico. |
| Dados de teste | Um segundo técnico de teste criado pelo administrador |
| Prioridade | Alta |

## Passos

1. Tentar iniciar a OS que ainda está Aberta.
2. Com outro técnico, tentar iniciar a OS atribuída a `tecnico@operix.local`.

## Resultado esperado

As duas ações são recusadas.

## Resultado obtido

Regra coberta por teste unitário de domínio no PR #5 (`backend/src/domain/dominio.spec.ts`, testes "não executa sem estar atribuída (RN04)" e "só o técnico atribuído inicia (RN10)"), executado em 23/10/2026 com `npm test` (23/23 aprovados, ver RT-001). A execução pela API e pela interface fica para quando UH04 a UH07 forem implementadas.

## Status

Não executado (API e interface) · regra de domínio aprovada em teste unitário

## Evidência

A anexar em `tester/evidencias/CT-031-evidencia.png` na execução.
