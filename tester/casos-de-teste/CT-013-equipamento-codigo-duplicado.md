# CT-013 — Cadastro de equipamento com código duplicado

| Campo | Valor |
|---|---|
| ID | CT-013 |
| Requisito / História | RF03 / UH03 / CA02 · RN01 |
| Objetivo | Verificar que o código do equipamento é único no sistema. |
| Pré-condições | Existe o equipamento de código `AR-123`. |
| Dados de teste | Código repetido: `AR-123` · mesmo nome e localização |
| Prioridade | Alta |

## Passos

1. Cadastrar um novo equipamento com o código `AR-123`.
2. Cadastrar outro com o mesmo nome e local, mas código `AR-1234`.

## Resultado esperado

O passo 1 é recusado; o passo 2 é aceito (só o código precisa ser único).

## Resultado obtido

Pela API: código repetido recusado com 409 ("Já existe um equipamento com o código ARC-003."), inclusive escrito em minúsculas (`arc-003`). Execução anterior, em 11/10/2026, no nível do banco (PR #2), também aprovada.

> Execução: 23/10/2026 · branch `feature/sprint-1-backend-telas-nextjs` (PR #5, commit 64fc4bb) · API em `PERSISTENCIA=memoria` · execução pela API conduzida com apoio de IA (Claude) e acompanhada por José Arraes.

## Status

Aprovado

## Evidência

Saída da execução em `tester/evidencias/execucao-api-2026-10-23.md`.
