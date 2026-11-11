# CT-033 — Conclusão da OS com registro da manutenção

| Campo | Valor |
|---|---|
| ID | CT-033 |
| Requisito / História | RF06 / UH06 / CA04, CA05 |
| Objetivo | Verificar a conclusão completa da OS e os efeitos no chamado, no equipamento e no histórico. |
| Pré-condições | OS em execução (CT-030). |
| Dados de teste | Descrição: "Troca do rolamento do motor" · Tempo gasto: 90 min · Tipo: Corretiva |
| Prioridade | Alta |

## Passos

1. Preencher descrição, tempo gasto e tipo de manutenção.
2. Clicar em **Concluir**.
3. Conferir OS, chamado, equipamento e histórico do equipamento.

## Resultado esperado

A OS passa para **Concluída**, o chamado para **Encerrado**, o equipamento volta para **Ativo** e a manutenção corretiva aparece no histórico do equipamento.

## Resultado obtido

Execução **manual** por José Arraes pelo Swagger (`/api/docs`) em 11/11/2026: concluir com descrição "Troca do rolamento do motor" e 90 minutos retornou 200, status `CONCLUIDA`.

Teste automatizado `CT-033` em `backend/tests/uh04-uh07.e2e-spec.ts`: aprovado na execução de José Arraes em 11/11/2026 (`npm run test:e2e`, 40/40). O chamado passou para `ENCERRADO` e o equipamento voltou para `ATIVO`.

Não verificado: a API não expõe a manutenção registrada (tipo, tempo gasto, descrição) nem o histórico do equipamento; fica para a UH08.

> Execução: 11/11/2026 · branch `api-chamados` (PR #11, commit `88fe83e`) · API em `PERSISTENCIA=memoria`.

## Status

Aprovado (parcial)

## Evidência

Prints da execução manual: [`CT-033-01-concluir-os.png`](../evidencias/CT-033-01-concluir-os.png). Saída dos testes automatizados no relatório [RT-002](../relatorios/RT-002-execucao-uh04-uh07.md).
