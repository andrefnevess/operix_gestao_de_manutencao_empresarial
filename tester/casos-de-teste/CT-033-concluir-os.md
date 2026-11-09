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

Regra coberta por teste unitário de domínio no PR #5 (`backend/src/domain/dominio.spec.ts`, teste "percorre o ciclo completo e registra manutenção corretiva"), executado em 23/10/2026 com `npm test` (23/23 aprovados, ver RT-001). A execução pela API e pela interface fica para quando UH04 a UH07 forem implementadas.

## Status

Não executado (API e interface) · regra de domínio aprovada em teste unitário

## Evidência

A anexar em `tester/evidencias/CT-033-evidencia.png` na execução.
