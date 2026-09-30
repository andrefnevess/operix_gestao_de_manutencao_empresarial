# Metodologia Scrum

O projeto é conduzido com Scrum, framework ágil baseado em ciclos curtos (sprints), inspeção e adaptação contínuas.

## Sprint

- Duração: [A definir] semanas;
- Cada sprint gera um incremento potencialmente utilizável;
- O planejamento das sprints está em [plano-de-sprints.md](plano-de-sprints.md).

## Artefatos

| Artefato | Descrição | Onde fica |
|---|---|---|
| Product Backlog | Lista priorizada de tudo o que o produto precisa | [product-backlog.md](product-backlog.md) e GitHub Projects |
| Sprint Backlog | Itens selecionados para a sprint e plano de execução | GitHub Projects (filtro por sprint) |
| Incremento | Soma dos itens concluídos que atendem à Definition of Done | Branch `main` |

## Eventos

| Evento | Objetivo | Duração sugerida | Participantes |
|---|---|---|---|
| Sprint Planning | Definir objetivo e itens da sprint | Até 2h | Equipe Scrum |
| Daily Scrum | Sincronizar o trabalho e identificar impedimentos | 15 min | Desenvolvedores |
| Sprint Review | Apresentar o incremento e coletar feedback | Até 1h | Equipe e stakeholders |
| Sprint Retrospective | Melhorar o processo da equipe | Até 1h | Equipe Scrum |

Os registros dos eventos ficam em [05-reunioes/atas](../05-reunioes/atas).

## Quadro Kanban (GitHub Projects)

Backlog → To Do → In Progress → Review → Testing → Done

| Coluna | Significado |
|---|---|
| Backlog | Itens identificados, ainda não planejados |
| To Do | Itens selecionados para a sprint atual |
| In Progress | Em desenvolvimento |
| Review | Pull Request aberto aguardando revisão |
| Testing | Em validação pelo QA |
| Done | Atende à Definition of Done |

## Definition of Ready (DoR)

Um item pode entrar na sprint quando:

- Está escrito no formato de história de usuário;
- Possui critérios de aceitação;
- Foi estimado pela equipe;
- Não possui dependências bloqueantes.

## Definition of Done (DoD)

Um item está pronto quando:

- O código foi revisado e aprovado em Pull Request;
- O build e os testes automatizados passam no pipeline;
- Os critérios de aceitação foram validados pelo QA;
- A documentação relacionada foi atualizada;
- O código foi integrado à branch `main`.
