# CT-025 — Geração de OS a partir de chamado que não está aberto

| Campo | Valor |
|---|---|
| ID | CT-025 |
| Requisito / História | RF05 / UH05 / CA01 |
| Objetivo | Verificar que não é possível gerar uma segunda OS para um chamado já em atendimento. |
| Pré-condições | Chamado que já gerou OS (CT-024). |
| Dados de teste | Chamado do CT-024 (status Em atendimento) |
| Prioridade | Média |

## Passos

1. Tentar gerar novamente uma OS para o mesmo chamado.

## Resultado esperado

A geração é recusada, pois o chamado não está Aberto.

## Resultado obtido

—

## Status

Não executado (API e interface)

## Evidência

A anexar em `tester/evidencias/CT-025-evidencia.png` na execução.
