# CT-022 — Acompanhamento dos próprios chamados

| Campo | Valor |
|---|---|
| ID | CT-022 |
| Requisito / História | RF04 / UH04 / CA06 |
| Objetivo | Verificar que o solicitante acompanha o status dos chamados que abriu. |
| Pré-condições | Solicitante com pelo menos um chamado aberto (CT-018). |
| Dados de teste | Usuário: `solicitante@operix.local` |
| Prioridade | Média |

## Passos

1. Como solicitante, acessar **Meus chamados**.
2. Como gestor, gerar a OS do chamado (CT-024).
3. Como solicitante, atualizar a lista.

## Resultado esperado

O solicitante vê seus chamados com o status atual (Aberto → Em atendimento) e não vê chamados de outros solicitantes.

## Resultado obtido

Teste automatizado `CT-022` em `backend/tests/uh04-uh07.e2e-spec.ts`: aprovado na execução de José Arraes em 11/11/2026 (`npm run test:e2e`, 40/40). O solicitante vê o status atualizado do próprio chamado (`EM_ATENDIMENTO`).

Falha: outro solicitante também vê esse chamado em `GET /api/chamados`, que lista os chamados de todos os usuários (teste `CT-022 / DEF-06`, marcado como defeito conhecido).

> Execução: 11/11/2026 · branch `api-chamados` (PR #11, commit `88fe83e`) · API em `PERSISTENCIA=memoria`.

## Status

Reprovado (DEF-06)

## Evidência

Saída dos testes automatizados no relatório [RT-002](../relatorios/RT-002-execucao-uh04-uh07.md).
