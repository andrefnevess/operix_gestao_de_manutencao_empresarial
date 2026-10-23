# CT-008 — Senha armazenada de forma protegida

| Campo | Valor |
|---|---|
| ID | CT-008 |
| Requisito / História | RF02 / UH02 / CA03 · RNF01 |
| Objetivo | Verificar que a senha nunca é exibida e é guardada como hash no banco. |
| Pré-condições | Usuário de teste cadastrado; acesso ao banco de teste (Prisma Studio). |
| Dados de teste | Senha do usuário de teste: `Teste@123` |
| Prioridade | Alta |

## Passos

1. Abrir a tela de edição do usuário e verificar se a senha aparece.
2. Consultar a resposta da API de usuários (Swagger).
3. Abrir a tabela de usuários no Prisma Studio.

## Resultado esperado

A senha não aparece na tela nem na API; no banco existe apenas um hash, nunca o texto `Teste@123`.

## Resultado obtido

A API de usuários não retorna senha nem hash (campos: id, nome, email, perfil, ativo, especialidades). A verificação do hash no banco não foi feita, porque a execução usou o modo sem banco (`PERSISTENCIA=memoria`).

> Execução: 23/10/2026 · branch `feature/sprint-1-backend-telas-nextjs` (PR #5, commit 64fc4bb) · API em `PERSISTENCIA=memoria` · execução pela API conduzida com apoio de IA (Claude) e acompanhada por José Arraes.

## Status

Aprovado (parcial)

## Evidência

Saída da execução em `tester/evidencias/execucao-api-2026-10-23.md`.
