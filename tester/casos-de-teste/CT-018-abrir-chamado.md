# CT-018 — Abertura de chamado válido

| Campo | Valor |
|---|---|
| ID | CT-018 |
| Requisito / História | RF04 / UH04 / CA01, CA02, CA03, CA05 |
| Objetivo | Verificar que o solicitante abre um chamado vinculado a um equipamento, com descrição e urgência, e recebe número e status Aberto. |
| Pré-condições | Solicitante autenticado; equipamento `CMP-001` ativo. |
| Dados de teste | Usuário: `solicitante@operix.local` · Equipamento: `CMP-001` · Descrição: "Compressor fazendo ruído alto" · Urgência: Alta |
| Prioridade | Alta |

## Passos

1. Acessar **Chamados > Novo chamado**.
2. Selecionar o equipamento `CMP-001`.
3. Informar a descrição e a urgência Alta.
4. Salvar.

## Resultado esperado

O chamado é salvo com número único e status **Aberto**, exibidos ao solicitante.

## Resultado obtido

Execução **manual** por José Arraes pelo Swagger (`/api/docs`) em 11/11/2026: login como solicitante (200), chamado aberto para `CMP-001` com urgência ALTA retornou 201, com id único e status `ABERTO`.

Teste automatizado `CT-018` em `backend/tests/uh04-uh07.e2e-spec.ts`: aprovado na execução de José Arraes em 11/11/2026 (`npm run test:e2e`, 40/40).

> Execução: 11/11/2026 · branch `api-chamados` (PR #11, commit `88fe83e`) · API em `PERSISTENCIA=memoria`.

## Status

Aprovado

## Evidência

Prints da execução manual: [`CT-018-00-login-solicitante.png`](../evidencias/CT-018-00-login-solicitante.png), [`CT-018-01-abrir-chamado.png`](../evidencias/CT-018-01-abrir-chamado.png). Saída dos testes automatizados no relatório [RT-002](../relatorios/RT-002-execucao-uh04-uh07.md).
