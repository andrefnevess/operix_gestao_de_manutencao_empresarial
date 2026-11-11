# CT-007 — Usuário inativado não acessa o sistema

| Campo | Valor |
|---|---|
| ID | CT-007 |
| Requisito / História | UH02 (CA05) · UH01 (CA04) · RN02 |
| Objetivo | Garantir que usuários são inativados (não excluídos) e perdem o acesso. |
| Pré-condições | Administrador logado; usuário de teste ativo. |
| Dados de teste | Usuário temporario@operix.local |
| Prioridade | Alta |
| Tipo de execução | Automatizado |

## Passos

1. Inativar o usuário na tela de Usuários.
2. Tentar entrar com esse usuário.

## Resultado esperado

O usuário continua na lista como Inativo e não consegue entrar.

## Resultado obtido

Conforme esperado.

## Status

**Aprovado** — Sprint 1

## Evidência

[sprint-1-testes-api.txt](../evidencias/sprint-1-testes-api.txt)
