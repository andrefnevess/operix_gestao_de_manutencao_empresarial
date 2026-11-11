# CT-025 — Geração de OS a partir de chamado que não está aberto

| Campo | Valor |
|---|---|
| ID | CT-025 |
| Requisito / História | RF05 / UH05 / CA01 |
| Objetivo | Verificar que não é possível gerar uma segunda OS para um chamado já em atendimento. |
| Pré-condições | Chamado que já gerou OS (CT-024). |
| Dados de teste | Chamado do CT-024 (status Em atendimento) |
| Prioridade | Média |

## Passos

1. Tentar gerar novamente uma OS para o mesmo chamado.

## Resultado esperado

A geração é recusada, pois o chamado não está Aberto.

## Resultado obtido

Teste automatizado `CT-025` em `backend/tests/uh04-uh07.e2e-spec.ts`: aprovado na execução de José Arraes em 11/11/2026 (`npm run test:e2e`, 40/40). A segunda geração para o mesmo chamado foi recusada com 422.

> Execução: 11/11/2026 · branch `api-chamados` (PR #11, commit `88fe83e`) · API em `PERSISTENCIA=memoria`.

## Status

Aprovado

## Evidência

Saída dos testes automatizados no relatório [RT-002](../relatorios/RT-002-execucao-uh04-uh07.md).
