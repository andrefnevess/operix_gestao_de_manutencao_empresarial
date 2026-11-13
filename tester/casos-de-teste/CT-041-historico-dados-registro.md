# CT-041 — Dados de cada registro do histórico

| Campo | Valor |
|---|---|
| ID | CT-041 |
| Requisito / História | UH08 / CA02 |
| Objetivo | Verificar que cada registro mostra data, tipo, técnico responsável e serviço realizado. |
| Pré-condições | Equipamento com uma manutenção corretiva concluída por `tecnico@operix.local`. |
| Dados de teste | Serviço: "Troca do rolamento do motor" · Tempo: 90 min |
| Prioridade | Alta |

## Passos

1. Consultar o histórico do equipamento.

## Resultado esperado

O registro mostra data, tipo CORRETIVA, técnico "Técnico de Campo", serviço realizado e tempo gasto.

## Resultado obtido

Teste automatizado `CT-041` em `backend/tests/uh08.e2e-spec.ts`: aprovado na execução de José Arraes em 11/11/2026 (`npm run test:e2e`, 50/50). Campos retornados: `ordemId`, `data`, `tipo`, `tecnico`, `servico`, `tempoGastoMin`.

> Execução: 11/11/2026 · branch local `qa/regressao-final` = `main` + PR #13 + PR #14 + testes da branch `test/e2e-uh04-uh07` · API em `PERSISTENCIA=memoria`.

## Status

Aprovado

## Evidência

Saída dos testes automatizados no relatório [RT-003](../relatorios/RT-003-regressao-final.md).
