# CT-032 — Conclusão de OS sem descrição do serviço

| Campo | Valor |
|---|---|
| ID | CT-032 |
| Requisito / História | RF06 / UH06 / CA03 · RN06 |
| Objetivo | Verificar que concluir a OS exige a descrição do serviço realizado. |
| Pré-condições | OS em execução (CT-030). |
| Dados de teste | Descrição vazia |
| Prioridade | Alta |

## Passos

1. Clicar em **Concluir** sem preencher a descrição do serviço.

## Resultado esperado

A conclusão é recusada, indicando que a descrição é obrigatória; a OS continua Em execução.

## Resultado obtido

Execução **manual** por José Arraes pelo Swagger (`/api/docs`) em 11/11/2026: concluir com `descricaoServico` vazia retornou 400 ("descricaoServico should not be empty").

Teste automatizado `CT-032` em `backend/tests/uh04-uh07.e2e-spec.ts`: aprovado na execução de José Arraes em 11/11/2026 (`npm run test:e2e`, 40/40). Descrição só com espaços: 422; tempo gasto 0: 400; a OS continuou `EM_EXECUCAO`.

> Execução: 11/11/2026 · branch `api-chamados` (PR #11, commit `88fe83e`) · API em `PERSISTENCIA=memoria`.

## Status

Aprovado

## Evidência

Prints da execução manual: [`CT-032-01-concluir-sem-descricao.png`](../evidencias/CT-032-01-concluir-sem-descricao.png). Saída dos testes automatizados no relatório [RT-002](../relatorios/RT-002-execucao-uh04-uh07.md).
