# CT-020 — Urgência do chamado

| Campo | Valor |
|---|---|
| ID | CT-020 |
| Requisito / História | RF04 / UH04 / CA03 |
| Objetivo | Verificar que a urgência aceita apenas Baixa, Média, Alta ou Crítica. |
| Pré-condições | Solicitante autenticado; equipamento ativo. |
| Dados de teste | Urgências: Baixa, Média, Alta, Crítica e um valor inválido (`URGENTE`) pela API |
| Prioridade | Média |

## Passos

1. Abrir um chamado com cada uma das quatro urgências válidas.
2. Pela API, tentar abrir um chamado com urgência `URGENTE`.

## Resultado esperado

As quatro urgências válidas são aceitas; o valor inválido é recusado.

## Resultado obtido

Teste automatizado `CT-020` em `backend/tests/uh04-uh07.e2e-spec.ts`: aprovado na execução de José Arraes em 11/11/2026 (`npm run test:e2e`, 40/40). As quatro urgências foram aceitas e `URGENTE` foi recusada com 400.

> Execução: 11/11/2026 · branch `api-chamados` (PR #11, commit `88fe83e`) · API em `PERSISTENCIA=memoria`.

## Status

Aprovado

## Evidência

Saída dos testes automatizados no relatório [RT-002](../relatorios/RT-002-execucao-uh04-uh07.md).
