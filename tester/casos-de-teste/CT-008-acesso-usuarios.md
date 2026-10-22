# CT-008 — Somente administradores gerenciam usuários

| Campo | Valor |
|---|---|
| ID | CT-008 |
| Requisito / História | UH02 (CA06) |
| Objetivo | Garantir o controle de acesso da gestão de usuários. |
| Pré-condições | Gestor logado. |
| Dados de teste | — |
| Prioridade | Alta |
| Tipo de execução | Automatizado |

## Passos

1. Com o perfil Gestor, tentar acessar a lista de usuários.

## Resultado esperado

Acesso negado (HTTP 403); o menu Usuários não aparece para o gestor.

## Resultado obtido

Conforme esperado.

## Status

**Aprovado** — Sprint 1

## Evidência

[sprint-1-testes-api.txt](../evidencias/sprint-1-testes-api.txt)
