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

—

## Status

Não executado

## Evidência

A anexar em `tester/evidencias/CT-007-evidencia.png` na execução.
