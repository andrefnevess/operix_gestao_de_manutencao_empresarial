# CT-007 — Cadastro de usuário com e-mail duplicado

| Campo | Valor |
|---|---|
| ID | CT-007 |
| Requisito / História | RF02 / UH02 / CA02 |
| Objetivo | Verificar que não é possível cadastrar dois usuários com o mesmo e-mail. |
| Pré-condições | Administrador autenticado; existe o usuário `gestor.teste@operix.local`. |
| Dados de teste | E-mail repetido: `gestor.teste@operix.local` (testar também com letras maiúsculas) |
| Prioridade | Alta |

## Passos

1. Acessar **Usuários > Novo**.
2. Preencher os dados com o e-mail já existente e salvar.
3. Repetir com o e-mail em maiúsculas: `GESTOR.TESTE@operix.local`.

## Resultado esperado

Os dois cadastros são recusados com mensagem de e-mail já cadastrado.

## Resultado obtido

E-mail repetido (`gestor@operix.local`) e em maiúsculas (`GESTOR@operix.local`) foram recusados com 409: "Já existe um usuário com este e-mail."

> Execução: 23/10/2026 · branch `feature/sprint-1-backend-telas-nextjs` (PR #5, commit 64fc4bb) · API em `PERSISTENCIA=memoria` · execução pela API conduzida com apoio de IA (Claude) e acompanhada por José Arraes.

## Status

Aprovado

## Evidência

Saída da execução em `tester/evidencias/execucao-api-2026-10-23.md`.
