# CT-036 — Plano preventivo inválido

| Campo | Valor |
|---|---|
| ID | CT-036 |
| Requisito / História | RF07 / UH07 / CA01, CA02 |
| Objetivo | Verificar as validações do plano preventivo. |
| Pré-condições | Gestor autenticado; um equipamento inativo. |
| Dados de teste | Equipamento inativo · Periodicidade 0, negativa e vazia · Atividades vazias |
| Prioridade | Média |

## Passos

1. Tentar criar um plano para o equipamento inativo.
2. Tentar criar planos com periodicidade 0, negativa e vazia.
3. Tentar criar um plano sem descrição das atividades.

## Resultado esperado

Todos os cadastros são recusados com mensagem clara.

## Resultado obtido

—

## Status

Não executado (API e interface)

## Evidência

A anexar em `tester/evidencias/CT-036-evidencia.png` na execução.
