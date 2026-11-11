# CT-016 — Status do equipamento

| Campo | Valor |
|---|---|
| ID | CT-016 |
| Requisito / História | RF03 / UH03 / CA05 |
| Objetivo | Verificar os status possíveis do equipamento e o status inicial. |
| Pré-condições | Gestor autenticado. |
| Dados de teste | Equipamento `EQ-002` recém-cadastrado |
| Prioridade | Média |

## Passos

1. Cadastrar o equipamento sem escolher status.
2. Alterar o status para Em manutenção e depois para Inativo.
3. Tentar informar um status fora da lista pela API.

## Resultado esperado

O equipamento nasce Ativo; só aceita Ativo, Em manutenção e Inativo.

> Divergência de nomenclatura: o schema usa `DISPONIVEL` no lugar de "Ativo".

## Resultado obtido

Equipamento nasce ATIVO; após inativar, fica INATIVO (200). O status EM_MANUTENCAO é definido pela execução da ordem de serviço (UH06), fora do escopo desta rodada.

> Execução: 23/10/2026 · branch `feature/sprint-1-backend-telas-nextjs` (PR #5, commit 64fc4bb) · API em `PERSISTENCIA=memoria` · execução pela API conduzida com apoio de IA (Claude) e acompanhada por José Arraes.

## Status

Aprovado

## Evidência

Saída da execução em `tester/evidencias/execucao-api-2026-10-23.md`.
