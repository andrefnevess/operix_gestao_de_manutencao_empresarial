# CT-009 — Edição de nome e perfil do usuário

| Campo | Valor |
|---|---|
| ID | CT-009 |
| Requisito / História | RF02 / UH02 / CA04 |
| Objetivo | Verificar que o administrador consegue editar nome e perfil de um usuário existente. |
| Pré-condições | Administrador autenticado; existe o usuário `novo.tecnico@operix.local`. |
| Dados de teste | Novo nome: `Técnico Editado` · Novo perfil: Gestor |
| Prioridade | Média |

## Passos

1. Abrir o usuário na lista e clicar em **Editar**.
2. Alterar nome e perfil e salvar.
3. Entrar com esse usuário e verificar o menu disponível.

## Resultado esperado

Os dados são atualizados e o usuário passa a ver as funcionalidades do novo perfil.

## Resultado obtido

Usuário de teste criado como Técnico foi editado para nome "Tecnico QA Editado" e perfil Gestor (200). Ao entrar com ele, `/auth/me` mostrou o novo nome e perfil, e ele passou a conseguir cadastrar equipamentos (201), permissão de Gestor.

> Execução: 23/10/2026 · branch `feature/sprint-1-backend-telas-nextjs` (PR #5, commit 64fc4bb) · API em `PERSISTENCIA=memoria` · execução pela API conduzida com apoio de IA (Claude) e acompanhada por José Arraes.

## Status

Aprovado

## Evidência

Saída da execução em `tester/evidencias/execucao-api-2026-10-23.md`.
