# CT-017 — Pesquisa na listagem de equipamentos

| Campo | Valor |
|---|---|
| ID | CT-017 |
| Requisito / História | RF03 / UH03 / CA06 |
| Objetivo | Verificar a pesquisa por código, nome, tipo ou localização. |
| Pré-condições | Pelo menos três equipamentos de teste cadastrados com dados diferentes. |
| Dados de teste | Buscas: `EQ-001` · `Ar-condicionado` · `Climatização` · `Bloco A` · `inexistente` |
| Prioridade | Média |

## Passos

1. Na listagem de equipamentos, pesquisar cada termo.
2. Anotar os resultados de cada busca.

## Resultado esperado

Cada busca retorna só os equipamentos correspondentes; a busca `inexistente` mostra lista vazia com aviso.

## Resultado obtido

Busca por `CMP-001`, `compressor` e `Galpão` retornou o equipamento correto; `inexistente` retornou lista vazia.

Observação: `galpao` (sem acento) não encontra "Galpão".

> Execução: 23/10/2026 · branch `feature/sprint-1-backend-telas-nextjs` (PR #5, commit 64fc4bb) · API em `PERSISTENCIA=memoria` · execução pela API conduzida com apoio de IA (Claude) e acompanhada por José Arraes.

## Status

Aprovado com observação

## Evidência

Saída da execução em `tester/evidencias/execucao-api-2026-10-23.md`.
