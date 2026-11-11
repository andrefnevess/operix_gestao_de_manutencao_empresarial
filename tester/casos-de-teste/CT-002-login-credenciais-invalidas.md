# CT-002 — Login com credenciais inválidas

| Campo | Valor |
|---|---|
| ID | CT-002 |
| Requisito / História | RF01 / UH01 / CA03 |
| Objetivo | Verificar que credenciais inválidas são recusadas com mensagem genérica, sem indicar qual campo está errado. |
| Pré-condições | Usuário ativo cadastrado. |
| Dados de teste | Cenário A: e-mail correto + senha errada · Cenário B: e-mail inexistente `naoexiste@operix.local` |
| Prioridade | Alta |

## Passos

1. Acessar a tela de login.
2. Executar o cenário A e clicar em **Entrar**.
3. Anotar a mensagem exibida.
4. Executar o cenário B e clicar em **Entrar**.
5. Comparar as duas mensagens.

## Resultado esperado

O acesso é negado nos dois cenários, com a **mesma** mensagem genérica (ex.: "E-mail ou senha inválidos").

## Resultado obtido

Cenário A (senha errada) e cenário B (e-mail inexistente) retornaram 401 com a **mesma** mensagem: "E-mail ou senha inválidos."

> Execução: 23/10/2026 · branch `feature/sprint-1-backend-telas-nextjs` (PR #5, commit 64fc4bb) · API em `PERSISTENCIA=memoria` · execução pela API conduzida com apoio de IA (Claude) e acompanhada por José Arraes.

## Status

Aprovado

## Evidência

Saída da execução em `tester/evidencias/execucao-api-2026-10-23.md`.
