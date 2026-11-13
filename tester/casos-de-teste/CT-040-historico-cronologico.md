# CT-040 — Histórico do equipamento em ordem cronológica

| Campo | Valor |
|---|---|
| ID | CT-040 |
| Requisito / História | UH08 / CA01 |
| Objetivo | Verificar que o histórico lista todas as manutenções do equipamento, e só dele, em ordem cronológica. |
| Pré-condições | Gestor autenticado; equipamento com uma manutenção corretiva e uma preventiva concluídas; outro equipamento com uma corretiva. |
| Dados de teste | `GET /api/equipamentos/{id}/historico` |
| Prioridade | Alta |

## Passos

1. Concluir uma OS corretiva e depois uma OS preventiva no mesmo equipamento.
2. Concluir uma OS corretiva em outro equipamento.
3. Como gestor, consultar o histórico do primeiro equipamento.

## Resultado esperado

Aparecem as duas manutenções do equipamento, da mais antiga para a mais recente; a do outro equipamento não aparece.

## Resultado obtido

Teste automatizado `CT-040` em `backend/tests/uh08.e2e-spec.ts`: aprovado na execução de José Arraes em 11/11/2026 (`npm run test:e2e`, 50/50).

> Execução: 11/11/2026 · branch local `qa/regressao-final` = `main` + PR #13 + PR #14 + testes da branch `test/e2e-uh04-uh07` · API em `PERSISTENCIA=memoria`.

## Status

Aprovado

## Evidência

Saída dos testes automatizados no relatório [RT-003](../relatorios/RT-003-regressao-final.md).
