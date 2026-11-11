# CT-047 — Histórico e indicadores restritos ao gestor

| Campo | Valor |
|---|---|
| ID | CT-047 |
| Requisito / História | UH08 · RNF02 |
| Objetivo | Verificar que só o gestor acessa o histórico e os indicadores. |
| Pré-condições | Usuários de cada perfil. |
| Dados de teste | `tecnico@`, `solicitante@` e `admin@operix.local` |
| Prioridade | Alta |

## Passos

1. Consultar o histórico e os indicadores com cada perfil.
2. Consultar sem login.

## Resultado esperado

Técnico, solicitante e administrador recebem 403; sem login, 401.

## Resultado obtido

Teste automatizado `CT-047` em `backend/tests/uh08.e2e-spec.ts`: aprovado na execução de José Arraes em 11/11/2026 (`npm run test:e2e`, 50/50).

> Execução: 11/11/2026 · branch local `qa/regressao-final` = `main` + PR #13 + PR #14 + testes da branch `test/e2e-uh04-uh07` · API em `PERSISTENCIA=memoria`.

## Status

Aprovado

## Evidência

Saída dos testes automatizados no relatório [RT-003](../relatorios/RT-003-regressao-final.md).
