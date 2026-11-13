# ATA 004 — Reunião quinzenal: review do MVP e preparação da F3

> Registro retroativo, consolidado em 13/11/2026 a partir do histórico do repositório (commits, Pull Requests e issues) e do quadro do Trello.

## Data
10/11/2026

## Horário
19:00 – 21:00

## Local
Google Meet

## Participantes

- André Neves — Product Owner / Tech Lead
- Luíza Quintanilha — Scrum Master / Front-end
- David Rafael — DevOps
- Gerardo Mota — Back-end
- Matheus Oliveira — Back-end
- José Arraes — Tester / QA

## Pauta

1. Review da Sprint 2 (MVP de 04/11)
2. Relatório de revisão geral do repositório
3. Plano de integração para a F3 (11/11)
4. UH08 e encerramento

## Discussões

### Review da Sprint 2
O MVP foi apresentado em 04/11 com a API das UH01–UH07 e o front rodando localmente. Os PRs #5, #6, #8, #9, #10 e #11 ainda estavam abertos; o build standalone do front (PR #10) foi entregue em 09/11 e o plano de testes v1.2 também em 09/11.

### Relatório de revisão geral
O Tech Lead apresentou o relatório de revisão de 10/11: ordem de merge dos PRs, conflitos previstos e defeitos encontrados pelo QA (DEF-06 a DEF-14).

### Retrospectiva
- **Funcionou:** API completa e testada; pipeline com 4 jobs.
- **Não funcionou:** integração concentrada no fim; PRs dependentes uns dos outros geraram conflitos.
- **Ação:** janela de integração em 11/11 com ordem fixa de merges.

### Plano de integração
Ordem acordada para 11/11: #9, #11, #12, #5, #4, #10, #8, #6; o PR #2 (duplicado) será fechado. Depois: correção do DEF-07 (#13), UH08 (#14), regressão do QA e integração front ↔ API.

## Decisões

- Janela de integração em 11/11 com a ordem de merges acima (DEC-014).
- Sprint 3 estendida até 13/11 para concluir a UH08 e a integração front ↔ API (DEC-015).

## Pendências

- [x] Merges da janela de integração (11/11)
- [x] Correção do DEF-07 (PR #13)
- [x] UH08 com correção do DEF-12 e DEF-13 (PR #14)
- [x] Regressão RT-003 e plano de testes v1.3 (PRs #18 e #19)
- [x] Integração front ↔ API, persistência com Prisma, DEF-08 e DEF-09 (PR #20)
- [ ] DEF-06 e DEF-14 (levados ao backlog — DEC-016)

## Responsáveis

| Atividade | Responsável | Prazo |
|---|---|---|
| Merges e revisão final | André Neves | 11/11 |
| UH08 (histórico e indicadores) | Gerardo Mota e Matheus Oliveira | 12/11 |
| Integração das telas com a API | Luíza Quintanilha | 12/11 |
| Ambiente de demonstração e CI na `main` | David Rafael | 12/11 |
| Regressão e relatório de testes | José Arraes | 12/11 |
| Termo de Encerramento (TEP) | André Neves | 13/11 |

## Próxima reunião

- Data: 24/11/2026
- Horário: 19:00
- Pauta: revisão do paper final e preparação para a Prova S1
