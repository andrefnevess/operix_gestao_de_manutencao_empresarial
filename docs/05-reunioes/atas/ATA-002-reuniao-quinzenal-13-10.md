# ATA 002 — Reunião quinzenal: review da Sprint 0 e acompanhamento da Sprint 1

> Registro retroativo, consolidado em 13/11/2026 a partir do histórico do repositório (commits, Pull Requests e issues) e do quadro do Trello.

## Data
13/10/2026

## Horário
19:00 – 20:15

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

1. Review e retrospectiva da Sprint 0
2. Pendências da ATA-001
3. Andamento da Sprint 1 (modelo de domínio e base técnica)
4. Rotina de reuniões

## Discussões

### Review da Sprint 0
A Sprint 0 foi concluída: ideia escolhida, equipe e papéis definidos (DEC-005), Scrumban adotado (DEC-006), stack definida (DEC-007, ADR-001 a ADR-006), estrutura do repositório e documentação de projeto (TAP, visão, escopo, requisitos). A Apresentação + Imersão foi realizada em 30/09. A base do front-end (PR #1, Matheus) foi integrada em 08/10 e o link do Trello publicado em 05/10.

### Pendências da ATA-001
O nome provisório "Manutenciana" foi substituído por **Operix**, já usado no repositório e no logo. O Scrum Master foi definido em 30/09 (Luíza Quintanilha).

### Andamento da Sprint 1
- Modelo de domínio: primeira entrega em 07/10; ajustes para a entrega de 14/10 (estados da OS e regras de prioridade).
- Back-end: Gerardo inicia as classes de domínio; Matheus apoia a API de autenticação e usuários.
- DevOps: David prepara o Docker Compose (API + PostgreSQL + front) e o primeiro workflow do GitHub Actions.
- QA: José inicia o plano de testes a partir dos critérios de aceite das UH01–UH03.
- Front-end: Luíza começa as telas de login, painel e equipamentos.

### Rotina de reuniões
Além das dailies assíncronas, a equipe passa a ter uma reunião quinzenal às terças, 19h, com review, retrospectiva e planejamento da quinzena seguinte.

## Decisões

- O nome do produto é **Operix** (DEC-011).
- Reunião quinzenal às terças, 19h, como cerimônia de review, retrospectiva e planejamento (DEC-012).

## Pendências

- [x] Entregar o modelo de domínio revisado (14/10)
- [x] Abrir PR com as classes de domínio (aberto em 16/10, PR #3)
- [x] Plano de testes v1 (entregue em 18/10)
- [x] Docker Compose e pipeline inicial (entraram no PR #5)

## Responsáveis

| Atividade | Responsável | Prazo |
|---|---|---|
| Modelo de domínio revisado | André Neves | 14/10 |
| Classes de domínio | Gerardo Mota | 17/10 |
| API de autenticação, usuários e equipamentos | Matheus Oliveira e Gerardo Mota | 20/10 |
| Docker Compose e pipeline | David Rafael | 20/10 |
| Telas de login, painel e equipamentos | Luíza Quintanilha | 20/10 |
| Plano de testes v1 | José Arraes | 18/10 |

## Próxima reunião

- Data: 27/10/2026
- Horário: 19:00
- Pauta: review da Sprint 1, Board + Incubators, planejamento do MVP
