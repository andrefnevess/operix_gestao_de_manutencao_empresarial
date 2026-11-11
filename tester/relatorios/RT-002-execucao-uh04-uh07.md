# RT-002 — Relatório de execução dos testes · UH04 a UH07

| Item | Valor |
|---|---|
| Data da execução | 11/11/2026 |
| Executado por | José Arraes — Tester / QA: testes automatizados no próprio computador e CT-018, CT-024, CT-026, CT-030, CT-032 e CT-033 manualmente pelo Swagger |
| Versão testada | Branch `api-chamados` (PR #11), commit `88fe83e`, sobre `feature/sprint-1-backend-telas-nextjs` (PR #5) |
| Ambiente | Windows, Node.js, API NestJS local em `PERSISTENCIA=memoria`; Swagger em `localhost:3000/api/docs` |
| Escopo | UH04 Chamados · UH05 Geração e atribuição de OS · UH06 Execução da OS · UH07 Manutenção preventiva |
| Plano | [`tester/planos-de-teste/plano-de-teste.md`](../planos-de-teste/plano-de-teste.md) (v1.2) |
| Testes automatizados | `backend/tests/uh04-uh07.e2e-spec.ts` (branch `test/e2e-uh04-uh07`), escritos com apoio de IA (Claude) e revisados por José Arraes |

## 1. Resumo

| Tipo de teste | Executados | Aprovados | Reprovados |
|---|---|---|---|
| Testes de API (`npm run test:e2e`): UH01 a UH03 já existentes + UH04 a UH07 novos | 40 | 40 | 0 |
| Casos de teste CT-018 a CT-039 | 22 | 21 (6 parciais ou com observações) | 1 (CT-022) |
| Execução manual pelo Swagger | 6 casos | 6 | 0 |
| **Defeitos encontrados** | | | **6 (1 alto, 2 médios, 1 baixo, 2 melhorias)** |

Os 40 testes de API passam. Dois deles (`CT-022 / DEF-06` e `DEF-07`) usam `it.failing`: descrevem o comportamento esperado e passam **enquanto o defeito existir**. Quando o defeito for corrigido, o Jest avisa e basta trocar `it.failing` por `it`.

O fluxo principal (abrir chamado → gerar OS → atribuir → iniciar → concluir) funciona de ponta a ponta. O defeito de severidade alta (DEF-07) é de controle de acesso e deve ser corrigido antes da demonstração.

## 2. Como foi executado

1. Checkout da branch do PR #11 (`git switch api-chamados`).
2. Testes de API rodados por José Arraes: `npm run test:e2e` na pasta `backend` → **Test Suites: 2 passed · Tests: 40 passed, 40 total**.
3. API iniciada com `npm run start:dev` (variáveis definidas no terminal, contorno do DEF-01) e fluxo principal executado manualmente por José Arraes no Swagger, com os usuários de exemplo `*@operix.local`.
4. Revisão do código do PR #11 (controllers, services, módulos e DTOs) para os pontos que os testes não cobrem (DEF-08, DEF-10 e DEF-11), conduzida com apoio de IA e conferida por José Arraes.

Os dados criados durante a execução existem só na memória da API e somem ao reiniciá-la.

## 3. Resultado por caso de teste

| Caso | História | Como | Resultado |
|---|---|---|---|
| CT-018 Abertura de chamado válido | UH04 CA01–03, CA05 | Manual + automatizado | Aprovado |
| CT-019 Chamado sem descrição | UH04 CA02 | Automatizado | Aprovado com observação (DEF-09) |
| CT-020 Urgência do chamado | UH04 CA03 | Automatizado | Aprovado |
| CT-021 Chamado para equipamento inativo | UH04 CA04 · RN03 | Automatizado | Aprovado |
| CT-022 Acompanhamento dos próprios chamados | UH04 CA06 | Automatizado | **Reprovado (DEF-06)** |
| CT-023 Permissão para abrir chamado | UH04 · RNF02 | Automatizado | Aprovado com observação (DEF-09) |
| CT-024 Geração de OS a partir de chamado | UH05 CA01–02 | Manual + automatizado | Aprovado |
| CT-025 OS para chamado que não está aberto | UH05 CA01 | Automatizado | Aprovado |
| CT-026 Atribuição de OS a técnico | UH05 CA03–05 | Manual + automatizado | Aprovado com observação (DEF-11) |
| CT-027 Atribuição a técnico inválido | UH05 CA03 | Automatizado | Aprovado |
| CT-028 OS na lista do técnico | UH05 CA06 | Automatizado | Aprovado |
| CT-029 Somente o gestor atribui ou cancela | UH05 · RNF02 | Automatizado | Aprovado |
| CT-030 Início da OS | UH06 CA01–02 | Manual + automatizado | Aprovado |
| CT-031 Início inválido | UH06 CA01 · RN04 · RN10 | Automatizado | Aprovado |
| CT-032 Conclusão sem descrição | UH06 CA03 · RN06 | Manual + automatizado | Aprovado |
| CT-033 Conclusão da OS | UH06 CA04–05 | Manual + automatizado | Aprovado (parcial: histórico de manutenção não exposto pela API) |
| CT-034 Alteração de OS concluída | UH06 CA06 · RN05 | Automatizado | Aprovado |
| CT-035 Criação de plano preventivo | UH07 CA01–03 | Automatizado | Aprovado |
| CT-036 Plano preventivo inválido | UH07 CA01–02 | Automatizado | Aprovado |
| CT-037 Alerta de preventiva (7 dias) | UH07 CA04 | Automatizado | Aprovado |
| CT-038 Preventiva atrasada | UH07 CA05 | Automatizado | Aprovado (API; destaque na interface pendente) |
| CT-039 OS a partir do plano | UH07 CA06 | Automatizado | Aprovado com observação (DEF-10) |

## 4. Defeitos e melhorias

| ID | Descrição | Severidade | Como foi encontrado |
|---|---|---|---|
| DEF-06 | `GET /api/chamados` retorna os chamados de **todos** os usuários. Um solicitante vê os chamados de outros solicitantes (UH04-CA06; dados de terceiros, LGPD). A resposta também não informa quem abriu o chamado. Sugestão: filtrar por solicitante para o perfil Solicitante e incluir `solicitanteId` na resposta. | Média | Teste automatizado `CT-022 / DEF-06` |
| DEF-07 | `PATCH /api/chamados/{id}/cancelar` não tem controle de permissão: **qualquer usuário logado**, inclusive um técnico ou outro solicitante, cancela o chamado de outra pessoa (RNF02). Sugestão: permitir só ao solicitante que abriu e ao gestor. | Alta | Teste automatizado `DEF-07` |
| DEF-08 | Os módulos de chamados, ordens de serviço e planos usam sempre o repositório em memória (`useClass: Memoria...Repository`), sem olhar `PERSISTENCIA`. Com o PostgreSQL ligado, esses dados **somem ao reiniciar a API**, ao contrário de usuários e equipamentos. | Média | Revisão do código do PR #11 |
| DEF-09 | Códigos HTTP inconsistentes (mesmo padrão do DEF-03): perfil sem permissão para abrir chamado recebe 422, e não 403; descrição vazia retorna 400 e descrição só com espaços retorna 422. | Baixa | Testes automatizados CT-019, CT-023 e CT-032 |
| DEF-10 | O mesmo plano preventivo gera várias OS seguidas (`POST /api/planos/{id}/gerar-ordem`) sem bloqueio, o que pode duplicar a preventiva. Sugerido avaliar com o PO. | Melhoria | Revisão do código do PR #11 |
| DEF-11 | A atribuição aceita data prevista no passado (ex.: `2020-01-01`), e a OS já nasce atrasada. Sugerido avaliar com o PO. | Melhoria | Revisão do código do PR #11 |

Observações sem defeito aberto:

- O chamado passa para `EM_ATENDIMENTO` já na **geração** da OS; o backlog (UH05-CA05) cita a **atribuição**. Confirmar com o PO qual regra vale.
- A API não expõe a manutenção registrada na conclusão (tipo corretiva/preventiva, tempo gasto, descrição) nem o histórico do equipamento. Por isso o UH06-CA04 e parte do CT-033 não puderam ser verificados pela API (previsto para a UH08).
- Qualquer perfil, inclusive o solicitante, consegue listar e consultar todas as OS em `GET /api/ordens-servico`. Não há regra no backlog; sugerido avaliar junto com o DEF-06.

## 5. Pendências para a próxima rodada

- Verificar UH04 a UH07 na interface quando as telas existirem (PR #8);
- Repetir os testes após a correção do DEF-06, DEF-07 e DEF-08 (trocar `it.failing` por `it`);
- Verificar o histórico de manutenção do equipamento (CT-033) com a UH08;
- Repetir a execução com o PostgreSQL após o DEF-08 e o DEF-01 (PR #9).

## 6. Evidências

- Testes automatizados: saída do terminal do `npm run test:e2e` em 11/11/2026 — **Test Suites: 2 passed, 2 total · Tests: 40 passed, 40 total**.
- Execução manual pelo Swagger (prints de José Arraes):
  - [CT-018: login como solicitante](../evidencias/CT-018-00-login-solicitante.png) · [chamado aberto](../evidencias/CT-018-01-abrir-chamado.png)
  - [CT-024: OS gerada](../evidencias/CT-024-01-gerar-os.png)
  - [CT-026: OS atribuída](../evidencias/CT-026-01-atribuir-os.png)
  - [CT-030: OS iniciada](../evidencias/CT-030-01-iniciar-os.png)
  - [CT-032: conclusão sem descrição recusada](../evidencias/CT-032-01-concluir-sem-descricao.png)
  - [CT-033: OS concluída](../evidencias/CT-033-01-concluir-os.png)

> Testes automatizados e revisão de código feitos com apoio de IA (Claude); execução dos testes e execução manual feitas por José Arraes, conforme `docs/07-compliance/integridade-academica-e-conduta.md`.
