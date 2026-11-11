# CT-001 — Login com credenciais válidas

| Campo | Valor |
|---|---|
| ID | CT-001 |
| Requisito / História | RF01 / UH01 / CA01, CA02 |
| Objetivo | Verificar que um usuário ativo acessa o sistema com e-mail e senha e é levado à tela inicial do seu perfil. |
| Pré-condições | Usuário ativo cadastrado com perfil Gestor. |
| Dados de teste | E-mail: `gestor.teste@operix.local` · Senha: `Teste@123` |
| Prioridade | Alta |

## Passos

1. Acessar a tela de login.
2. Informar o e-mail e a senha do usuário de teste.
3. Clicar em **Entrar**.

## Resultado esperado

O sistema autentica o usuário e exibe a tela inicial do perfil Gestor.

## Resultado obtido

Login com `gestor@operix.local` retornou 200, token e perfil GESTOR (API). Na interface, o usuário entrou e viu a tela de Equipamentos (evidência CT-005-01).

> Execução: 23/10/2026 · branch `feature/sprint-1-backend-telas-nextjs` (PR #5, commit 64fc4bb) · API em `PERSISTENCIA=memoria` · execução pela API conduzida com apoio de IA (Claude) e acompanhada por José Arraes.

## Status

Aprovado

## Evidência

Prints em `tester/evidencias/CT-005-01-logado.png` e `CT-005-02-apos-sair.png`.
