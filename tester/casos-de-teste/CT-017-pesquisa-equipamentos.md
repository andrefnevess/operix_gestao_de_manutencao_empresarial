# CT-017 — Pesquisa na listagem de equipamentos

| Campo | Valor |
|---|---|
| ID | CT-017 |
| Requisito / História | RF03 / UH03 / CA06 |
| Objetivo | Verificar a pesquisa por código, nome, tipo ou localização. |
| Pré-condições | Pelo menos três equipamentos de teste cadastrados com dados diferentes. |
| Dados de teste | Buscas: `EQ-001` · `Ar-condicionado` · `Climatização` · `Bloco A` · `inexistente` |
| Prioridade | Média |

## Passos

1. Na listagem de equipamentos, pesquisar cada termo.
2. Anotar os resultados de cada busca.

## Resultado esperado

Cada busca retorna só os equipamentos correspondentes; a busca `inexistente` mostra lista vazia com aviso.

## Resultado obtido

—

## Status

Não executado

## Evidência

A anexar em `tester/evidencias/CT-017-evidencia.png` na execução.
