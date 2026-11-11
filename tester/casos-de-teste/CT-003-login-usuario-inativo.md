# CT-003 — Login de usuário inativo

| Campo | Valor |
|---|---|
| ID | CT-003 |
| Requisito / História | RF01 / UH01 / CA04 · RN02 |
| Objetivo | Verificar que usuários inativos não conseguem acessar o sistema. |
| Pré-condições | Usuário cadastrado e **inativado** pelo administrador. |
| Dados de teste | E-mail: `inativo.teste@operix.local` · Senha: `Teste@123` |
| Prioridade | Alta |

## Passos

1. Acessar a tela de login.
2. Informar e-mail e senha corretos do usuário inativo.
3. Clicar em **Entrar**.

## Resultado esperado

O acesso é negado, mesmo com a senha correta.

## Resultado obtido

Usuário de teste inativado pelo administrador: o login com a senha correta retornou 401. O token emitido antes da inativação também deixou de valer (401 em `/auth/me`).

> Execução: 23/10/2026 · branch `feature/sprint-1-backend-telas-nextjs` (PR #5, commit 64fc4bb) · API em `PERSISTENCIA=memoria` · execução pela API conduzida com apoio de IA (Claude) e acompanhada por José Arraes.

## Status

Aprovado

## Evidência

Saída da execução em `tester/evidencias/execucao-api-2026-10-23.md`.
