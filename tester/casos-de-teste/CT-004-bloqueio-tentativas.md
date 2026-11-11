# CT-004 — Bloqueio após 5 tentativas sem sucesso

| Campo | Valor |
|---|---|
| ID | CT-004 |
| Requisito / História | UH01 (CA05) |
| Objetivo | Garantir que o acesso é bloqueado temporariamente após 5 erros seguidos. |
| Pré-condições | Usuário ativo cadastrado. |
| Dados de teste | Senha errada 5 vezes; depois a senha correta |
| Prioridade | Alta |
| Tipo de execução | Automatizado |

## Passos

1. Errar a senha 5 vezes seguidas.
2. Informar a senha correta.

## Resultado esperado

Na sexta tentativa, mesmo com a senha correta, o sistema informa que o acesso está bloqueado temporariamente (15 minutos).

## Resultado obtido

Conforme esperado.

## Status

**Aprovado** — Sprint 1

## Evidência

[sprint-1-testes-api.txt](../evidencias/sprint-1-testes-api.txt)
