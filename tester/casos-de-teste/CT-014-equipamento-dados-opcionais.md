# CT-014 — Cadastro com dados opcionais

| Campo | Valor |
|---|---|
| ID | CT-014 |
| Requisito / História | RF03 / UH03 / CA03 |
| Objetivo | Verificar que fabricante, modelo e data de aquisição podem ser informados, mas não são obrigatórios. |
| Pré-condições | Gestor autenticado. |
| Dados de teste | Fabricante: `Fabricante Teste` · Modelo: `X-100` · Data de aquisição: `01/03/2024` |
| Prioridade | Média |

## Passos

1. Cadastrar um equipamento preenchendo os campos opcionais.
2. Cadastrar outro deixando os opcionais em branco.
3. Abrir os dois cadastros.

## Resultado esperado

Os dois são salvos; o primeiro mostra os dados opcionais informados.

> Divergência: o schema atual não tem esses campos.

## Resultado obtido

Equipamento com fabricante, modelo e data de aquisição salvo com os dados (201); equipamento sem os opcionais também salvo (201).

Observação: data de aquisição no futuro (`2099-01-01`) é aceita; data inválida (`abc`) é recusada.

> Execução: 23/10/2026 · branch `feature/sprint-1-backend-telas-nextjs` (PR #5, commit 64fc4bb) · API em `PERSISTENCIA=memoria` · execução pela API conduzida com apoio de IA (Claude) e acompanhada por José Arraes.

## Status

Aprovado

## Evidência

Saída da execução em `tester/evidencias/execucao-api-2026-10-23.md`.
