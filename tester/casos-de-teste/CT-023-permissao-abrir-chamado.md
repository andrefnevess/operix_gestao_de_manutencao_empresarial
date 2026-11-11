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

Teste automatizado `CT-023` em `backend/tests/uh04-uh07.e2e-spec.ts`: aprovado na execução de José Arraes em 11/11/2026 (`npm run test:e2e`, 40/40). Técnico e administrador não conseguem abrir chamado; gestor consegue (201).

Observação: a recusa por perfil volta como 422 ("Este perfil não pode abrir chamados.") e não como 403 (DEF-09).

> Execução: 11/11/2026 · branch `api-chamados` (PR #11, commit `88fe83e`) · API em `PERSISTENCIA=memoria`.

## Status

Aprovado com observação

## Evidência

Saída dos testes automatizados no relatório [RT-002](../relatorios/RT-002-execucao-uh04-uh07.md).
