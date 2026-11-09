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

Regra coberta por teste unitário de domínio no PR #5 (`backend/src/domain/dominio.spec.ts`, teste "OS de plano gera manutenção preventiva e atualiza a última execução"), executado em 23/10/2026 com `npm test` (23/23 aprovados, ver RT-001). A execução pela API e pela interface fica para quando UH04 a UH07 forem implementadas.

## Status

Não executado (API e interface) · regra de domínio aprovada em teste unitário

## Evidência

A anexar em `tester/evidencias/CT-039-evidencia.png` na execução.
