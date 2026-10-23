# CT-015 — Edição de equipamento

| Campo | Valor |
|---|---|
| ID | CT-015 |
| Requisito / História | RF03 / UH03 / CA04 |
| Objetivo | Verificar que o gestor consegue editar os dados de um equipamento. |
| Pré-condições | Gestor autenticado; existe o equipamento `EQ-001`. |
| Dados de teste | Nova localização: `Bloco B` |
| Prioridade | Média |

## Passos

1. Abrir o equipamento `EQ-001` e clicar em **Editar**.
2. Alterar a localização e salvar.
3. Tentar alterar o código para um já existente (`AR-123`).

## Resultado esperado

A localização é atualizada; a troca para um código já existente é recusada (RN01).

## Resultado obtido

Alterar o código de `ARC-003` para `CMP-001`, já existente, foi recusado com 409, inclusive em minúsculas. A edição da localização não foi executada nesta rodada.

> Execução: 23/10/2026 · branch `feature/sprint-1-backend-telas-nextjs` (PR #5, commit 64fc4bb) · API em `PERSISTENCIA=memoria` · execução pela API conduzida com apoio de IA (Claude) e acompanhada por José Arraes.

## Status

Aprovado (parcial)

## Evidência

Saída da execução em `tester/evidencias/execucao-api-2026-10-23.md`.
