# CT-008 — Senha armazenada de forma protegida

| Campo | Valor |
|---|---|
| ID | CT-008 |
| Requisito / História | RF02 / UH02 / CA03 · RNF01 |
| Objetivo | Verificar que a senha nunca é exibida e é guardada como hash no banco. |
| Pré-condições | Usuário de teste cadastrado; acesso ao banco de teste (Prisma Studio). |
| Dados de teste | Senha do usuário de teste: `Teste@123` |
| Prioridade | Alta |

## Passos

1. Abrir a tela de edição do usuário e verificar se a senha aparece.
2. Consultar a resposta da API de usuários (Swagger).
3. Abrir a tabela de usuários no Prisma Studio.

## Resultado esperado

A senha não aparece na tela nem na API; no banco existe apenas um hash, nunca o texto `Teste@123`.

## Resultado obtido

—

## Status

Não executado

## Evidência

A anexar em `tester/evidencias/CT-008-evidencia.png` na execução.
