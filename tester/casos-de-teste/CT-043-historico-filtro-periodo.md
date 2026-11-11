# CT-043 — Filtro do histórico por período

| Campo | Valor |
|---|---|
| ID | CT-043 |
| Requisito / História | UH08 / CA03 |
| Objetivo | Verificar o filtro por período (de / até). |
| Pré-condições | Equipamento com uma manutenção concluída hoje. |
| Dados de teste | Data e hora completas (ontem a amanhã) e só a data (`AAAA-MM-DD`) de hoje |
| Prioridade | Média |

## Passos

1. Consultar com `de` = ontem e `ate` = amanhã.
2. Consultar com `de` = amanhã e com `ate` = ontem.
3. Consultar com `de` = hoje e `ate` = hoje, só com a data.

## Resultado esperado

Os filtros incluem as manutenções dentro do período, inclusive as do último dia informado.

## Resultado obtido

Teste automatizado `CT-043` em `backend/tests/uh08.e2e-spec.ts`: aprovado na execução de José Arraes em 11/11/2026 (`npm run test:e2e`, 50/50). Com data e hora completas, o filtro funciona.

Falha: com só a data (`ate=2026-11-11`), as manutenções do próprio dia 11 ficam de fora, porque a data vira 00:00 (teste `CT-043 / DEF-12`, marcado como defeito conhecido). Datas inválidas (`de=abc`) retornam lista vazia em vez de erro (DEF-13).

> Execução: 11/11/2026 · branch local `qa/regressao-final` = `main` + PR #13 + PR #14 + testes da branch `test/e2e-uh04-uh07` · API em `PERSISTENCIA=memoria`.

## Status

Reprovado (DEF-12)

## Evidência

Saída dos testes automatizados no relatório [RT-003](../relatorios/RT-003-regressao-final.md).
