# CT-011 — Gestão de usuários restrita ao Administrador

| Campo | Valor |
|---|---|
| ID | CT-011 |
| Requisito / História | RF02 / UH02 / CA06 · RNF02 |
| Objetivo | Verificar que apenas o perfil Administrador acessa a gestão de usuários. |
| Pré-condições | Um usuário de cada perfil: Administrador, Gestor, Técnico e Solicitante. |
| Dados de teste | Usuários de teste `*.teste@operix.local` de cada perfil |
| Prioridade | Alta |

## Passos

1. Entrar com cada perfil e procurar a opção **Usuários** no menu.
2. Com o perfil Técnico, tentar abrir a página de usuários pelo endereço direto.
3. Pelo Swagger, chamar a API de usuários com o token do Técnico.

## Resultado esperado

Só o Administrador vê e acessa a gestão de usuários; os demais recebem acesso negado, inclusive pela API (HTTP 403).

## Resultado obtido

`GET /api/usuarios` retornou 403 para Técnico, Solicitante e Gestor, e 401 sem login. A verificação do menu na interface fica para a próxima rodada.

> Execução: 23/10/2026 · branch `feature/sprint-1-backend-telas-nextjs` (PR #5, commit 64fc4bb) · API em `PERSISTENCIA=memoria` · execução pela API conduzida com apoio de IA (Claude) e acompanhada por José Arraes.

## Status

Aprovado (API)

## Evidência

Saída da execução em `tester/evidencias/execucao-api-2026-10-23.md`.
