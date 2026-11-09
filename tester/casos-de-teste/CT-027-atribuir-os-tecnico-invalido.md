# CT-027 — Atribuição de OS a técnico inativo ou a outro perfil

| Campo | Valor |
|---|---|
| ID | CT-027 |
| Requisito / História | RF05 / UH05 / CA03 |
| Objetivo | Verificar que a OS só pode ser atribuída a um técnico ativo. |
| Pré-condições | Um técnico inativado e um usuário com perfil Solicitante. |
| Dados de teste | Técnico inativado no teste · `solicitante@operix.local` |
| Prioridade | Média |

## Passos

1. Tentar atribuir a OS ao técnico inativo.
2. Tentar atribuir a OS ao solicitante (pela API).

## Resultado esperado

As duas atribuições são recusadas.

## Resultado obtido

—

## Status

Não executado (API e interface)

## Evidência

A anexar em `tester/evidencias/CT-027-evidencia.png` na execução.
