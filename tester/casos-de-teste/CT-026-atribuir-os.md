# CT-026 — Atribuição de OS a técnico com data prevista

| Campo | Valor |
|---|---|
| ID | CT-026 |
| Requisito / História | RF05 / UH05 / CA03, CA04, CA05 |
| Objetivo | Verificar que o gestor atribui a OS a um técnico ativo, com data prevista, e que os status mudam. |
| Pré-condições | OS com status Aberta (CT-024); técnico ativo. |
| Dados de teste | Técnico: `tecnico@operix.local` · Data prevista: dia seguinte ao teste |
| Prioridade | Alta |

## Passos

1. Abrir a OS e escolher **Atribuir**.
2. Selecionar o técnico e a data prevista e salvar.
3. Conferir os status da OS e do chamado.

## Resultado esperado

A OS passa para **Atribuída**, com técnico e data prevista; o chamado passa para **Em atendimento**.

## Resultado obtido

Execução **manual** por José Arraes pelo Swagger (`/api/docs`) em 11/11/2026: a OS foi atribuída a `tecnico@operix.local` com data prevista 12/11/2026 e retornou 200, status `ATRIBUIDA`.

Teste automatizado `CT-026` em `backend/tests/uh04-uh07.e2e-spec.ts`: aprovado na execução de José Arraes em 11/11/2026 (`npm run test:e2e`, 40/40).

Observação: a API aceita data prevista no passado (DEF-11).

> Execução: 11/11/2026 · branch `api-chamados` (PR #11, commit `88fe83e`) · API em `PERSISTENCIA=memoria`.

## Status

Aprovado com observação

## Evidência

Prints da execução manual: [`CT-026-01-atribuir-os.png`](../evidencias/CT-026-01-atribuir-os.png). Saída dos testes automatizados no relatório [RT-002](../relatorios/RT-002-execucao-uh04-uh07.md).
