# CT-005 — Encerrar a sessão (logout)

| Campo | Valor |
|---|---|
| ID | CT-005 |
| Requisito / História | RF01 / UH01 / CA06 |
| Objetivo | Verificar que o usuário consegue encerrar a sessão a qualquer momento. |
| Pré-condições | Usuário autenticado. |
| Dados de teste | Qualquer usuário de teste ativo. |
| Prioridade | Média |

## Passos

1. Com a sessão aberta, clicar em **Sair**.
2. Usar o botão **Voltar** do navegador.
3. Tentar abrir diretamente uma página interna do sistema.

## Resultado esperado

A sessão é encerrada e as páginas internas exigem novo login.

## Resultado obtido

Execução **manual** na interface: após clicar em **Sair**, o sistema voltou para a tela de login; o acesso direto a `/equipamentos` não abriu a tela interna; o botão Voltar do navegador não exibiu nenhuma tela interna.

> Execução: 23/10/2026 · branch `feature/sprint-1-backend-telas-nextjs` (PR #5, commit 64fc4bb) · execução manual na interface por José Arraes.

## Status

Aprovado

## Evidência

Prints em `tester/evidencias/CT-005-01-logado.png` e `CT-005-02-apos-sair.png`.
