# CT-011 — Código de equipamento duplicado

| Campo | Valor |
|---|---|
| ID | CT-011 |
| Requisito / História | UH03 (CA02) · RN01 |
| Objetivo | Garantir que o código do equipamento é único. |
| Pré-condições | Equipamento CMP-001 cadastrado. |
| Dados de teste | Código cmp-001 |
| Prioridade | Alta |
| Tipo de execução | Automatizado |

## Passos

1. Cadastrar novo equipamento com o código cmp-001.

## Resultado esperado

O sistema recusa: "Já existe um equipamento com o código CMP-001."

## Resultado obtido

Conforme esperado.

## Status

**Aprovado** — Sprint 1

## Evidência

[sprint-1-testes-api.txt](../evidencias/sprint-1-testes-api.txt) e [CT-011-codigo-duplicado.png](../evidencias/CT-011-codigo-duplicado.png)
