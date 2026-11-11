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

Teste automatizado `CT-027` em `backend/tests/uh04-uh07.e2e-spec.ts`: aprovado na execução de José Arraes em 11/11/2026 (`npm run test:e2e`, 40/40). Atribuição a solicitante e a técnico inativo recusadas com 422.

> Execução: 11/11/2026 · branch `api-chamados` (PR #11, commit `88fe83e`) · API em `PERSISTENCIA=memoria`.

## Status

Aprovado

## Evidência

Saída dos testes automatizados no relatório [RT-002](../relatorios/RT-002-execucao-uh04-uh07.md).
