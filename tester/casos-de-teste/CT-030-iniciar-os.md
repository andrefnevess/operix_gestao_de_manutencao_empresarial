# CT-030 — Início da OS pelo técnico atribuído

| Campo | Valor |
|---|---|
| ID | CT-030 |
| Requisito / História | RF06 / UH06 / CA01, CA02 |
| Objetivo | Verificar que o técnico atribuído inicia a OS e que os status mudam. |
| Pré-condições | OS atribuída a `tecnico@operix.local` (CT-026). |
| Dados de teste | Usuário: `tecnico@operix.local` |
| Prioridade | Alta |

## Passos

1. Como técnico, abrir a OS e clicar em **Iniciar**.
2. Conferir os status da OS e do equipamento.

## Resultado esperado

A OS passa para **Em execução** e o equipamento para **Em manutenção**.

## Resultado obtido

Execução **manual** por José Arraes pelo Swagger (`/api/docs`) em 11/11/2026: como técnico atribuído, a OS foi iniciada e retornou 200, status `EM_EXECUCAO`.

Teste automatizado `CT-030` em `backend/tests/uh04-uh07.e2e-spec.ts`: aprovado na execução de José Arraes em 11/11/2026 (`npm run test:e2e`, 40/40). O equipamento passou para `EM_MANUTENCAO`.

> Execução: 11/11/2026 · branch `api-chamados` (PR #11, commit `88fe83e`) · API em `PERSISTENCIA=memoria`.

## Status

Aprovado

## Evidência

Prints da execução manual: [`CT-030-01-iniciar-os.png`](../evidencias/CT-030-01-iniciar-os.png). Saída dos testes automatizados no relatório [RT-002](../relatorios/RT-002-execucao-uh04-uh07.md).
