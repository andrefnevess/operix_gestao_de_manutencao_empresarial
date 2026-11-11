# CT-039 — Geração de OS a partir do alerta de preventiva

| Campo | Valor |
|---|---|
| ID | CT-039 |
| Requisito / História | RF07 / UH07 / CA06 |
| Objetivo | Verificar que o gestor gera a OS da preventiva a partir do alerta e que o plano é atualizado após a conclusão. |
| Pré-condições | Plano com alerta (CT-037). |
| Dados de teste | Plano do CT-035 |
| Prioridade | Alta |

## Passos

1. No alerta, clicar em **Gerar ordem de serviço**.
2. Atribuir, iniciar e concluir a OS (como em CT-026, CT-030 e CT-033).
3. Conferir o plano e o histórico do equipamento.

## Resultado esperado

A OS é gerada como preventiva; após a conclusão, a manutenção preventiva aparece no histórico, a última execução do plano é atualizada e a próxima data é recalculada.

## Resultado obtido

Teste automatizado `CT-039` em `backend/tests/uh04-uh07.e2e-spec.ts`: aprovado na execução de José Arraes em 11/11/2026 (`npm run test:e2e`, 40/40). A OS preventiva foi gerada a partir do plano (201, sem chamado); após a conclusão, a última execução foi atualizada e a próxima data recalculada.

Observação: o mesmo plano permite gerar várias OS em sequência (DEF-10).

> Execução: 11/11/2026 · branch `api-chamados` (PR #11, commit `88fe83e`) · API em `PERSISTENCIA=memoria`.

## Status

Aprovado com observação

## Evidência

Saída dos testes automatizados no relatório [RT-002](../relatorios/RT-002-execucao-uh04-uh07.md).
