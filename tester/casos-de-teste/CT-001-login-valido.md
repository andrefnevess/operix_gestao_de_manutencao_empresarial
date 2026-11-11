# CT-001 — Login com credenciais válidas

| Campo | Valor |
|---|---|
| ID | CT-001 |
| Requisito / História | UH01 (CA01, CA02) · RF01 |
| Objetivo | Garantir que um usuário ativo entra com e-mail e senha e recebe o acesso do seu perfil. |
| Pré-condições | Usuário gestor@operix.local cadastrado e ativo. |
| Dados de teste | E-mail: gestor@operix.local · Senha: a de SENHA_EXEMPLO |
| Prioridade | Alta |
| Tipo de execução | Automatizado |

## Passos

1. Acessar a tela de login.
2. Informar e-mail e senha válidos.
3. Clicar em Entrar.

## Resultado esperado

O sistema autentica, retorna o token e exibe a tela de equipamentos com o nome e o perfil (Gestor) no topo. A senha não aparece na resposta.

## Resultado obtido

Conforme esperado.

## Status

**Aprovado** — Sprint 1

## Evidência

[sprint-1-testes-api.txt](../evidencias/sprint-1-testes-api.txt) e [tela](../../frontend/docs/telas/02-equipamentos.png)
