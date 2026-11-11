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

**Execução manual na interface (José Arraes):** como Administrador, o usuário "Técnico de Campo" (`tecnico@operix.local`, perfil Técnico) foi editado para o nome "Técnico Editado" e o perfil Gestor. A lista de usuários passou a mostrar o nome e o perfil novos, com situação Ativo.

**Execução pela API (com apoio de IA):** um usuário de teste editado de Técnico para Gestor passou a ter, após novo login, o nome e o perfil novos em `/auth/me` e a permissão de cadastrar equipamentos (201).

> Execução: 23/10/2026 · branch `feature/sprint-1-backend-telas-nextjs` (PR #5, commit 64fc4bb) · execução manual na interface por José Arraes; verificação complementar pela API com apoio de IA.

## Status

Aprovado

## Evidência

- `tester/evidencias/CT-009-01-edicao.png`: tela de edição antes da alteração
- `tester/evidencias/CT-009-02-lista-editada.png`: lista com "Técnico Editado" e perfil Gestor
- `tester/evidencias/execucao-api-2026-10-23.md`: verificação pela API
