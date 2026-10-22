# CT-005 — Cadastro de técnico com especialidades

| Campo | Valor |
|---|---|
| ID | CT-005 |
| Requisito / História | UH02 (CA01, CA03) · RF02 |
| Objetivo | Garantir que o administrador cadastra usuários com perfil e que a senha nunca é exibida. |
| Pré-condições | Administrador logado. |
| Dados de teste | Nome, e-mail, senha (8+ caracteres), perfil Técnico, especialidade Hidráulica |
| Prioridade | Alta |
| Tipo de execução | Automatizado |

## Passos

1. Acessar Usuários > Novo usuário.
2. Preencher os dados e escolher o perfil Técnico.
3. Informar as especialidades e salvar.

## Resultado esperado

Usuário criado ativo, com perfil Técnico e especialidades; a resposta não contém a senha.

## Resultado obtido

Conforme esperado.

## Status

**Aprovado** — Sprint 1

## Evidência

[sprint-1-testes-api.txt](../evidencias/sprint-1-testes-api.txt) e [tela](../../frontend/docs/telas/06-novo-usuario.png)
