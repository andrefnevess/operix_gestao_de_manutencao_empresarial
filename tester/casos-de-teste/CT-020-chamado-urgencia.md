# CT-020 — Urgência do chamado

| Campo | Valor |
|---|---|
| ID | CT-020 |
| Requisito / História | RF04 / UH04 / CA03 |
| Objetivo | Verificar que a urgência aceita apenas Baixa, Média, Alta ou Crítica. |
| Pré-condições | Solicitante autenticado; equipamento ativo. |
| Dados de teste | Urgências: Baixa, Média, Alta, Crítica e um valor inválido (`URGENTE`) pela API |
| Prioridade | Média |

## Passos

1. Abrir um chamado com cada uma das quatro urgências válidas.
2. Pela API, tentar abrir um chamado com urgência `URGENTE`.

## Resultado esperado

As quatro urgências válidas são aceitas; o valor inválido é recusado.

## Resultado obtido

—

## Status

Não executado (API e interface)

## Evidência

A anexar em `tester/evidencias/CT-020-evidencia.png` na execução.
