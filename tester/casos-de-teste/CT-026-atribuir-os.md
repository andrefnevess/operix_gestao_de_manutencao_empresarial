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

—

## Status

Não executado (API e interface)

## Evidência

A anexar em `tester/evidencias/CT-026-evidencia.png` na execução.
