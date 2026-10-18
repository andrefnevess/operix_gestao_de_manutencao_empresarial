# CT-013 — Cadastro de equipamento com código duplicado

| Campo | Valor |
|---|---|
| ID | CT-013 |
| Requisito / História | RF03 / UH03 / CA02 · RN01 |
| Objetivo | Verificar que o código do equipamento é único no sistema. |
| Pré-condições | Existe o equipamento de código `AR-123`. |
| Dados de teste | Código repetido: `AR-123` · mesmo nome e localização |
| Prioridade | Alta |

## Passos

1. Cadastrar um novo equipamento com o código `AR-123`.
2. Cadastrar outro com o mesmo nome e local, mas código `AR-1234`.

## Resultado esperado

O passo 1 é recusado; o passo 2 é aceito (só o código precisa ser único).

## Resultado obtido

**Executado no nível do banco de dados** em 11/10/2026, pelo Prisma Studio, sobre a migração `init`: o código repetido foi recusado e o código diferente com o mesmo nome foi aceito. Falta repetir pela API e pela tela quando estiverem prontas.

## Status

Aprovado (banco de dados) · Não executado (API e interface)

## Evidência

Prints do Prisma Studio a anexar em `tester/evidencias/CT-013-evidencia.png`.
