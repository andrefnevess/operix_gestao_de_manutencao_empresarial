# CT-006 — E-mail duplicado

| Campo | Valor |
|---|---|
| ID | CT-006 |
| Requisito / História | UH02 (CA02) |
| Objetivo | Garantir que não existem dois usuários com o mesmo e-mail. |
| Pré-condições | Usuário gestor@operix.local já cadastrado. |
| Dados de teste | E-mail: gestor@operix.local |
| Prioridade | Alta |
| Tipo de execução | Automatizado |

## Passos

1. Cadastrar novo usuário com um e-mail já existente.

## Resultado esperado

O sistema recusa com a mensagem "Já existe um usuário com este e-mail." (HTTP 409).

## Resultado obtido

Conforme esperado.

## Status

**Aprovado** — Sprint 1

## Evidência

[sprint-1-testes-api.txt](../evidencias/sprint-1-testes-api.txt)
