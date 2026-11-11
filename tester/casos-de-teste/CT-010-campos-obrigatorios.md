# CT-010 — Validação de campos obrigatórios

| Campo | Valor |
|---|---|
| ID | CT-010 |
| Requisito / História | UH03 (CA01) |
| Objetivo | Garantir que código, nome, tipo e localização são obrigatórios. |
| Pré-condições | Gestor logado. |
| Dados de teste | Equipamento sem o campo tipo |
| Prioridade | Alta |
| Tipo de execução | Automatizado |

## Passos

1. Tentar salvar um equipamento sem o tipo.

## Resultado esperado

O sistema recusa e indica o campo obrigatório.

## Resultado obtido

Conforme esperado.

## Status

**Aprovado** — Sprint 1

## Evidência

[sprint-1-testes-api.txt](../evidencias/sprint-1-testes-api.txt)
