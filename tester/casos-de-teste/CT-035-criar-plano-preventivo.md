# CT-035 — Criação de plano de manutenção preventiva

| Campo | Valor |
|---|---|
| ID | CT-035 |
| Requisito / História | RF07 / UH07 / CA01, CA02, CA03 |
| Objetivo | Verificar que o gestor cria um plano para um equipamento ativo e que a próxima data é calculada pela periodicidade. |
| Pré-condições | Gestor autenticado; equipamento `ARC-003` ativo. |
| Dados de teste | Equipamento: `ARC-003` · Atividades: "Limpeza dos filtros" · Periodicidade: 30 dias |
| Prioridade | Alta |

## Passos

1. Acessar **Preventivas > Novo plano**.
2. Selecionar o equipamento, informar atividades e periodicidade e salvar.

## Resultado esperado

O plano é salvo e a próxima manutenção é calculada para 30 dias depois da data base.

## Resultado obtido

Teste automatizado `CT-035` em `backend/tests/uh04-uh07.e2e-spec.ts`: aprovado na execução de José Arraes em 11/11/2026 (`npm run test:e2e`, 40/40). Plano criado (201) com próxima data = início + 30 dias.

> Execução: 11/11/2026 · branch `api-chamados` (PR #11, commit `88fe83e`) · API em `PERSISTENCIA=memoria`.

## Status

Aprovado

## Evidência

Saída dos testes automatizados no relatório [RT-002](../relatorios/RT-002-execucao-uh04-uh07.md).
