# Plano de Sprints

Sprints de duas semanas, alinhadas às entregas da disciplina. As tarefas de cada sprint, com responsáveis e prazos, estão no [quadro do Trello](https://trello.com/invite/b/6ac3fc61d92f5af90dc6a42b/ATTI36b7432fdf85cc9b1265efb84ec1d44a7DE01C50/operix-cronograma-de-entregas-poo). O acompanhamento é feito nas reuniões quinzenais (ver [atas](../05-reunioes/atas)).

> Atualizado em 13/11/2026, no encerramento do projeto.

| Sprint | Período planejado | Objetivo | Histórias | Status | Integrado na `main` |
|---|---|---|---|---|---|
| Sprint 0 | 30/09 a 06/10 | Iniciar o projeto e estruturar a documentação | — | Concluída | 30/09 a 06/10 |
| Sprint 1 | 07/10 a 20/10 | Modelo de domínio, base técnica, autenticação, usuários e equipamentos | UH01, UH02, UH03 | Concluída (com atraso na integração) | 11/11 (PR #5) |
| Sprint 2 | 21/10 a 03/11 | Chamados, ordens de serviço, execução e preventiva (MVP integrado em 04/11) | UH04, UH05, UH06, UH07 | Concluída (com atraso na integração) | 11/11 (PR #11) |
| Sprint 3 | 04/11 a 10/11 | Histórico, indicadores e preparação da F3 (11/11) | UH08 | Concluída (estendida até 13/11) | 13/11 (PR #14) |
| Encerramento | 11/11 a 25/11 | Integração final, testes de regressão, Paper final, Prova S1 e TEP | — | Em andamento (TEP emitido em 13/11) | 13/11 (PRs #13, #18, #19, #20) |

## Registro por sprint

### Sprint 0 — Iniciação (30/09 a 06/10)

- **Sprint Goal:** ter a ideia, a equipe, o repositório e a documentação de projeto prontos para começar o desenvolvimento.
- **Comprometido:** escolha da ideia, definição da equipe e dos papéis, estrutura do repositório, TAP, visão, escopo, stack (ADR-001 a ADR-006), apresentação + imersão (30/09).
- **Concluído:** todos os itens. Base do front-end aberta pelo Matheus em 01/10 (PR #1, integrado em 08/10). Link do Trello publicado em 05/10.
- **Review:** apresentação + imersão realizada em 30/09.
- **Retrospectiva:** documentação ficou bem organizada; faltou definir rotina de reuniões. Ação: reunião quinzenal às terças, 19h ([ATA-002](../05-reunioes/atas/ATA-002-reuniao-quinzenal-13-10.md)).

### Sprint 1 — Domínio e fundação (07/10 a 20/10)

- **Sprint Goal:** modelo de domínio validado e API com login, usuários e equipamentos rodando em Docker com CI.
- **Comprometido:** UH01, UH02, UH03; modelo de domínio (07 e 14/10); classes de domínio; ambiente Docker e pipeline; plano de testes.
- **Concluído no período:** modelo de domínio v1.0 (DEC-008), classes de domínio (Gerardo, PR #3, aberto em 16/10), plano de testes v1 (José, 18/10).
- **Concluído depois:** API das UH01–UH03 com Docker e CI (PR #5, aberto em 22/10, integrado em 11/11); telas do front (Luíza, PR #8, integrado em 11/11).
- **Review:** Board + Incubators em 21/10. Modelo de domínio aceito pelo PO.
- **Retrospectiva:** PRs grandes e revisões demoradas. Ação: revisão em até 48h e PRs menores ([ATA-003](../05-reunioes/atas/ATA-003-reuniao-quinzenal-27-10.md)).

### Sprint 2 — Ciclo de manutenção (21/10 a 03/11)

- **Sprint Goal:** fluxo completo chamado → OS → execução → encerramento, mais planos preventivos, para o MVP integrado de 04/11.
- **Comprometido:** UH04, UH05, UH06, UH07; pipeline completo (front, back e ambiente); correção do `.env` (issue #7).
- **Concluído:** UH04–UH07 na API (PR #11); CI completo com 4 jobs (David, PR #6); correção do `.env` (PR #9); build standalone do front (PR #10). Integrados em 11/11.
- **Review:** MVP apresentado em 04/11 com a API e o front rodando localmente.
- **Retrospectiva:** a integração ficou concentrada no fim. Ação: janela de integração com ordem definida de merges ([ATA-004](../05-reunioes/atas/ATA-004-reuniao-quinzenal-10-11.md)).

### Sprint 3 — Resultados (04/11 a 10/11, estendida até 13/11)

- **Sprint Goal:** histórico e indicadores (UH08), front integrado à API e relatório de testes para a F3.
- **Comprometido:** UH08; integração front ↔ API; persistência com Prisma; relatório de testes.
- **Concluído:** UH08 (PR #14, com correção dos defeitos DEF-12 e DEF-13); correção do DEF-07 (PR #13); integração front ↔ API e DEF-08/DEF-09 (PR #20); plano de testes v1.2 (09/11) e regressão RT-003 com 50/50 testes de API aprovados (PRs #18 e #19).
- **Review:** F3 — Projeto e Resultados em 11/11.
- **Retrospectiva:** ver [TEP](../06-encerramento/TEP.md), seção de lições aprendidas.

### Encerramento (11/11 a 25/11)

- **Concluído até 13/11:** todos os PRs de funcionalidade integrados, CI verde na `main`, TEP emitido.
- **Em aberto:** PR #21 (fontes locais no front, aguardando merge), Paper final e Prova S1 (18 a 25/11).
- **Fora do prazo do projeto:** DEF-06 e DEF-14, registrados no backlog para continuidade (DEC-016).
