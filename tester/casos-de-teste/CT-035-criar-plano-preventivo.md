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

Regra coberta por teste unitário de domínio no PR #5 (`backend/src/domain/dominio.spec.ts`, teste "calcula a próxima data e os alertas"), executado em 23/10/2026 com `npm test` (23/23 aprovados, ver RT-001). A execução pela API e pela interface fica para quando UH04 a UH07 forem implementadas.

## Status

Não executado (API e interface) · regra de domínio aprovada em teste unitário

## Evidência

A anexar em `tester/evidencias/CT-035-evidencia.png` na execução.
