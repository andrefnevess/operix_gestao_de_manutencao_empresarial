# CT-031 — Início de OS não atribuída ou por outro técnico

| Campo | Valor |
|---|---|
| ID | CT-031 |
| Requisito / História | RF06 / UH06 / CA01 · RN04 · RN10 |
| Objetivo | Verificar que a OS só é executada depois de atribuída e somente pelo técnico atribuído. |
| Pré-condições | Uma OS Aberta (não atribuída) e uma OS atribuída a outro técnico. |
| Dados de teste | Um segundo técnico de teste criado pelo administrador |
| Prioridade | Alta |

## Passos

1. Tentar iniciar a OS que ainda está Aberta.
2. Com outro técnico, tentar iniciar a OS atribuída a `tecnico@operix.local`.

## Resultado esperado

As duas ações são recusadas.

## Resultado obtido

Teste automatizado `CT-031` em `backend/tests/uh04-uh07.e2e-spec.ts`: aprovado na execução de José Arraes em 11/11/2026 (`npm run test:e2e`, 40/40). Iniciar OS não atribuída: 422; outro técnico: 422 (regra `RN10`); solicitante: 403.

> Execução: 11/11/2026 · branch `api-chamados` (PR #11, commit `88fe83e`) · API em `PERSISTENCIA=memoria`.

## Status

Aprovado

## Evidência

Saída dos testes automatizados no relatório [RT-002](../relatorios/RT-002-execucao-uh04-uh07.md).
