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

—

## Status

Não executado

## Evidência

A anexar em `tester/evidencias/CT-011-evidencia.png` na execução.
