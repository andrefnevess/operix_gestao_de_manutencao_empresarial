# CT-013 — Solicitante consulta, mas não cadastra equipamentos

| Campo | Valor |
|---|---|
| ID | CT-013 |
| Requisito / História | UH03 · controle de acesso |
| Objetivo | Garantir que só o gestor altera equipamentos. |
| Pré-condições | Solicitante logado. |
| Dados de teste | — |
| Prioridade | Média |
| Tipo de execução | Automatizado |

## Passos

1. Com o perfil Solicitante, listar equipamentos.
2. Tentar cadastrar um equipamento.

## Resultado esperado

A listagem funciona; o cadastro é negado (HTTP 403).

## Resultado obtido

Conforme esperado.

## Status

**Aprovado** — Sprint 1

## Evidência

[sprint-1-testes-api.txt](../evidencias/sprint-1-testes-api.txt)
