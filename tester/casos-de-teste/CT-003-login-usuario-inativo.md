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

—

## Status

Não executado

## Evidência

A anexar em `tester/evidencias/CT-003-evidencia.png` na execução.
