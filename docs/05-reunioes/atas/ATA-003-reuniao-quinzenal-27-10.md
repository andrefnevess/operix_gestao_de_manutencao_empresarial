# ATA 003 — Reunião quinzenal: review da Sprint 1 e planejamento do MVP

> Registro retroativo, consolidado em 13/11/2026 a partir do histórico do repositório (commits, Pull Requests e issues) e do quadro do Trello.

## Data
27/10/2026

## Horário
19:00 – 20:30

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

1. Review da Sprint 1
2. Retrospectiva da Sprint 1
3. Andamento da Sprint 2 e plano para o MVP integrado (04/11)

## Discussões

### Review da Sprint 1
- Modelo de domínio v1.0 aceito como base do back-end (DEC-008).
- Classes de domínio integradas em 23/10 (PR #3, Gerardo).
- API das UH01–UH03 com Docker e CI aberta no PR #5 (22/10), com persistência em memória para desenvolvimento e testes (DEC-009). Em revisão.
- Front-end das telas iniciais aberto no PR #8 (24/10, Luíza). O Tech Lead pediu alterações em 26/10 (nomes do domínio e campos obrigatórios da API).
- Plano de testes v1 (18/10) e v1.1 (26/10).
- Board + Incubators apresentado em 21/10.

### Retrospectiva da Sprint 1
- **Funcionou:** modelo de domínio bem discutido; CI rodando nos PRs.
- **Não funcionou:** PRs grandes, revisões demoradas e nenhuma história integrada na `main` até o fim da sprint.
- **Impedimento:** o `.env` de exemplo quebrava o ambiente Docker (issue #7, aberta pelo José em 23/10).

### Sprint 2 e MVP
Sprint 2 com UH04 a UH07 (chamados, OS, execução e preventiva). A meta é apresentar o MVP em 04/11 com o fluxo chamado → OS → execução → encerramento funcionando.

## Decisões

- Pull Requests revisados em até 48h; PRs menores, uma história por PR sempre que possível (DEC-013).
- Sprints de duas semanas mantidas, alinhadas ao cronograma (reforço da DEC-010).

## Pendências

- [x] Corrigir o `.env` de exemplo (issue #7, PR #9)
- [x] Ajustar o PR #8 conforme a revisão
- [x] Implementar UH04–UH07 na API (PR #11)
- [x] Pipeline completo com jobs de back, front e ambiente (PR #6)

## Responsáveis

| Atividade | Responsável | Prazo |
|---|---|---|
| Correção do `.env` (issue #7) | David Rafael | 30/10 |
| Ajustes do front (PR #8) | Luíza Quintanilha | 31/10 |
| UH04 e UH05 (chamados e OS) | Gerardo Mota | 03/11 |
| UH06 e UH07 (execução e preventiva) | Matheus Oliveira | 03/11 |
| Pipeline completo | David Rafael | 03/11 |
| Casos de teste das UH04–UH07 | José Arraes | 03/11 |
| Revisão dos PRs abertos | André Neves | 48h após abertura |

## Próxima reunião

- Data: 10/11/2026
- Horário: 19:00
- Pauta: review do MVP, preparação da F3 (11/11), UH08
