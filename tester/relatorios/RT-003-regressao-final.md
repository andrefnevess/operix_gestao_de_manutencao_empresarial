# RT-003 — Regressão final do MVP e relatório de bugs · UH01 a UH08

| Item | Valor |
|---|---|
| Data da execução | 11/11/2026 |
| Executado por | José Arraes — Tester / QA (testes automatizados de API e de domínio no próprio computador) |
| Versão testada | Branch local `qa/regressao-final`: `main` (commit `f5e2b5d`, com os PRs #4, #5, #6, #8, #9, #10 e #11) + PR #13 (`chore/limpeza-casos-e-permissoes`) + PR #14 (`feature/uh08-historico`) + testes da branch `test/e2e-uh04-uh07`. A branch existe só para o teste e não é enviada ao GitHub. |
| Ambiente | Windows, Node.js, testes em `PERSISTENCIA=memoria` |
| Escopo | Regressão de UH01 a UH07 e primeira execução da UH08 (histórico e indicadores) |
| Plano | [`tester/planos-de-teste/plano-de-teste.md`](../planos-de-teste/plano-de-teste.md) (v1.3) |
| Testes automatizados | `backend/tests/api.e2e-spec.ts` (UH01 a UH03), `uh04-uh07.e2e-spec.ts` e `uh08.e2e-spec.ts`, escritos com apoio de IA (Claude) e revisados por José Arraes |

## 1. Resumo

| Tipo de teste | Executados | Aprovados | Reprovados |
|---|---|---|---|
| Testes unitários do domínio (`npm test`) | 23 | 23 | 0 |
| Testes de API (`npm run test:e2e`) | 50 | 50 | 0 |
| Casos de teste da UH08 (CT-040 a CT-047) | 8 | 7 (2 com observação) | 1 (CT-043) |
| **Defeitos novos** | | | **3 (1 médio, 1 baixo, 1 melhoria)** |

Saída do terminal: **Test Suites: 3 passed, 3 total · Tests: 50 passed, 50 total** (API) e **Tests: 23 passed, 23 total** (domínio).

Os testes `CT-022 / DEF-06` e `CT-043 / DEF-12` usam `it.failing`: descrevem o comportamento esperado e passam **enquanto o defeito existir**.

**Conclusão:** todas as histórias UH01 a UH08 têm o fluxo principal funcionando pela API, e o único defeito de severidade alta (DEF-07) foi corrigido no PR #13. Os defeitos abertos são de severidade média ou menor. Recomendação de QA: **aprovar o MVP para a demonstração**, com os defeitos médios (DEF-06, DEF-08 e DEF-12) registrados como Issues e priorizados pelo PO.

## 2. Como foi executado

1. `git fetch` e atualização da `main` local.
2. Criação da branch local `qa/regressao-final` a partir da `main`, com merge do PR #13, do PR #14 e da branch de testes `test/e2e-uh04-uh07`, sem conflitos.
3. `npm run test:e2e` e `npm test` na pasta `backend`, executados por José Arraes.
4. Revisão do código do PR #13 e do PR #14, conduzida com apoio de IA e conferida por José Arraes.

## 3. Regressão de UH01 a UH07

| Item | Resultado |
|---|---|
| UH01 a UH03 (14 testes de API) | Aprovados, sem regressão. Os títulos dos testes passaram a usar a numeração oficial (CT-001 a CT-017). |
| UH04 a UH07 (26 testes de API) | Aprovados, sem regressão. |
| DEF-07 (cancelar chamado de outra pessoa) | **Corrigido no PR #13** e reverificado: técnico e outro solicitante recebem 403; quem abriu e o gestor cancelam (200). |
| DEF-09 (permissão negada como 422) | **Parcialmente corrigido no PR #13**: técnico e administrador recebem 403 ao abrir chamado (CT-023 aprovado). Continua: descrição vazia retorna 400 e só com espaços retorna 422. |
| DEF-06 (solicitante vê os chamados de todos) | Continua (teste `CT-022 / DEF-06`). |

## 4. Resultado da UH08 (PR #14)

| Caso | Critério | Resultado |
|---|---|---|
| CT-040 Histórico em ordem cronológica | CA01 | Aprovado |
| CT-041 Dados de cada registro | CA02 | Aprovado |
| CT-042 Filtro por tipo | CA03 | Aprovado com observação (DEF-13) |
| CT-043 Filtro por período | CA03 | **Reprovado (DEF-12)** |
| CT-044 Ordens por status | CA04 | Aprovado |
| CT-045 Ordens e preventivas atrasadas | CA05 | Aprovado |
| CT-046 Equipamentos com mais corretivas | CA06 | Aprovado com observação (DEF-14) |
| CT-047 Acesso restrito ao gestor | RNF02 | Aprovado |

## 5. Situação de todos os defeitos

| ID | Descrição | Severidade | Situação |
|---|---|---|---|
| DEF-01 | A API não carregava o `.env` | Alta | Corrigido no PR #9 (`src/load-env.ts`); código conferido |
| DEF-02 | Mensagens de validação em inglês e português | Baixa | Aberto |
| DEF-03 | Validação com 400 e 422 para o mesmo tipo de erro | Baixa | Aberto (ver DEF-09) |
| DEF-04 | Data de aquisição no futuro aceita | Melhoria | Para o PO |
| DEF-05 | Busca não ignora acentos | Melhoria | Para o PO |
| DEF-06 | Solicitante vê os chamados de todos | Média | Aberto |
| DEF-07 | Qualquer usuário cancelava chamado de outra pessoa | Alta | **Corrigido no PR #13** |
| DEF-08 | Chamados, ordens e planos sempre em memória | Média | Aberto (citado como pendência no PR #13) |
| DEF-09 | Permissão negada como 422; vazio 400 e espaços 422 | Baixa | Parcialmente corrigido no PR #13 |
| DEF-10 | Mesmo plano gera várias OS seguidas | Melhoria | Para o PO |
| DEF-11 | Data prevista no passado aceita | Melhoria | Para o PO |
| **DEF-12** | Filtro `ate` do histórico só com a data (`2026-11-11`) exclui as manutenções do próprio dia, porque a data vira 00:00. Sugestão: tratar `ate` sem hora como fim do dia (23:59:59.999). | Média | **Novo** |
| **DEF-13** | Filtros inválidos do histórico (`tipo=XYZ`, `de=abc`) retornam 200 com lista vazia, em vez de 400 com mensagem. | Baixa | **Novo** |
| **DEF-14** | O painel de indicadores não aceita período; o ranking de corretivas considera todas as manutenções, e a UH08-CA06 pede "no período". | Melhoria | **Novo** (para o PO) |

## 6. Pendências

- Verificar UH04 a UH08 na interface quando as telas estiverem integradas à API;
- Repetir os testes após a correção do DEF-06, DEF-08 e DEF-12 (trocar `it.failing` por `it`);
- Repetir a execução com o PostgreSQL depois do DEF-08.

## 7. Evidências

- [Saída do `npm run test:e2e`](../evidencias/RT-003-01-testes-e2e.png) em 11/11/2026: 3 suites, 50 testes aprovados.
- [Saída do `npm test`](../evidencias/RT-003-02-testes-dominio.png) em 11/11/2026: 1 suite, 23 testes aprovados.

> Testes automatizados e revisão de código feitos com apoio de IA (Claude); execução dos testes feita por José Arraes, conforme `docs/07-compliance/integridade-academica-e-conduta.md`.
