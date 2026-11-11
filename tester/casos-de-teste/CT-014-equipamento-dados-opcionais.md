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

**Execução manual na interface (José Arraes):** como Gestor, foi cadastrado o equipamento `QA-001` (Gerador, Energia, Bloco C) com fabricante "Fabricante Teste", modelo "X-100" e data de aquisição, e o equipamento `QA-002` (Bomba, Hidráulico, Bloco C) sem os campos opcionais. Os dois foram salvos e aparecem na lista com status Ativo.

**Execução pela API (com apoio de IA):** os dados opcionais foram retornados como salvos; data inválida (`abc`) é recusada.

Observação: data de aquisição no futuro é aceita (DEF-04).

> Execução: 23/10/2026 · branch `feature/sprint-1-backend-telas-nextjs` (PR #5, commit 64fc4bb) · execução manual na interface por José Arraes; verificação complementar pela API com apoio de IA.

## Status

Aprovado

## Evidência

- `tester/evidencias/CT-014-01-lista-antes.png`: lista antes do cadastro
- `tester/evidencias/CT-014-02-cadastro-com-opcionais.png`: formulário com fabricante, modelo e data
- `tester/evidencias/CT-014-03-lista-depois.png`: lista com `QA-001` e `QA-002`
- `tester/evidencias/execucao-api-2026-10-23.md`: verificação pela API
