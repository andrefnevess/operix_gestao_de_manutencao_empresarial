# CT-023 — Permissão para abrir chamado

| Campo | Valor |
|---|---|
| ID | CT-023 |
| Requisito / História | UH04 · RNF02 |
| Objetivo | Verificar quais perfis podem abrir chamado. |
| Pré-condições | Usuários de teste de cada perfil. |
| Dados de teste | `solicitante@`, `gestor@` e `tecnico@operix.local` |
| Prioridade | Média |

## Passos

1. Tentar abrir um chamado com cada perfil (tela e API).

## Resultado esperado

Solicitante (e gestor, se a regra permitir) abre chamado; o técnico não abre chamado.

## Resultado obtido

Reteste em 11/11/2026 após o PR #13: técnico e administrador recebem **403** ao abrir chamado; gestor abre (201). Teste automatizado `CT-023` aprovado na execução de José Arraes (`npm run test:e2e`, 50/50).

Primeira execução (RT-002): a recusa voltava como 422 (DEF-09), corrigido no PR #13.

> Execução: 11/11/2026 · branch `api-chamados` (PR #11, commit `88fe83e`) · API em `PERSISTENCIA=memoria`.

## Status

Aprovado

## Evidência

Saída dos testes automatizados nos relatórios [RT-002](../relatorios/RT-002-execucao-uh04-uh07.md) e [RT-003](../relatorios/RT-003-regressao-final.md).
