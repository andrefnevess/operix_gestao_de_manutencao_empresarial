# CT-012 — Edição, inativação e busca de equipamentos

| Campo | Valor |
|---|---|
| ID | CT-012 |
| Requisito / História | UH03 (CA04, CA05, CA06) |
| Objetivo | Garantir que o gestor edita, inativa e encontra equipamentos. |
| Pré-condições | Gestor logado; equipamento EMP-002 cadastrado. |
| Dados de teste | Busca: expedi |
| Prioridade | Média |
| Tipo de execução | Automatizado |

## Passos

1. Buscar por "expedi".
2. Editar o nome do equipamento encontrado.
3. Inativar o equipamento.

## Resultado esperado

A busca retorna só o EMP-002; a edição é salva; o status passa para Inativo.

## Resultado obtido

Conforme esperado.

## Status

**Aprovado** — Sprint 1

## Evidência

[sprint-1-testes-api.txt](../evidencias/sprint-1-testes-api.txt) e [tela da busca](../../frontend/docs/telas/04-equipamentos-busca.png)
