# CT-024 — Geração de OS a partir de chamado aberto

| Campo | Valor |
|---|---|
| ID | CT-024 |
| Requisito / História | RF05 / UH05 / CA01, CA02 |
| Objetivo | Verificar que a OS é gerada a partir de um chamado Aberto e herda equipamento, descrição e urgência. |
| Pré-condições | Gestor autenticado; chamado com status Aberto (CT-018). |
| Dados de teste | Usuário: `gestor@operix.local` · Chamado do CT-018 |
| Prioridade | Alta |

## Passos

1. Abrir o chamado do CT-018.
2. Clicar em **Gerar ordem de serviço**.
3. Conferir os dados da OS gerada.

## Resultado esperado

A OS é criada com o mesmo equipamento, descrição e urgência do chamado, com status **Aberta**.

## Resultado obtido

Execução **manual** por José Arraes pelo Swagger (`/api/docs`) em 11/11/2026: como gestor, a OS gerada a partir do chamado do CT-018 retornou 201 com status `ABERTA`, prioridade `ALTA` e o mesmo `equipamentoId` do chamado.

Teste automatizado `CT-024` em `backend/tests/uh04-uh07.e2e-spec.ts`: aprovado na execução de José Arraes em 11/11/2026 (`npm run test:e2e`, 40/40).

Observação: o chamado passa para `EM_ATENDIMENTO` já na geração da OS (o backlog, UH05-CA05, cita a atribuição).

> Execução: 11/11/2026 · branch `api-chamados` (PR #11, commit `88fe83e`) · API em `PERSISTENCIA=memoria`.

## Status

Aprovado

## Evidência

Prints da execução manual: [`CT-024-01-gerar-os.png`](../evidencias/CT-024-01-gerar-os.png). Saída dos testes automatizados no relatório [RT-002](../relatorios/RT-002-execucao-uh04-uh07.md).
