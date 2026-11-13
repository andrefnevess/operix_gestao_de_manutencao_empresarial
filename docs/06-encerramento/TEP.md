# Termo de Encerramento do Projeto (TEP)

## 1. Identificação

| Item | Descrição |
|---|---|
| Projeto | Operix — Gestão de Manutenção Empresarial |
| Disciplina | Programação Orientada a Objetos |
| Professor | Rondineli Seba |
| Instituição | Centro Universitário Dom Bosco — UNDB |
| Product Owner / Tech Lead | André Neves |
| Scrum Master | Luíza Quintanilha |
| Data de início | 29/09/2026 |
| Previsão de término (TAP) | 25/11/2026 |
| Data de encerramento | 13/11/2026 |

## 2. Resumo do projeto

O Operix é uma aplicação web para gestão de manutenção: cadastro de equipamentos, abertura de chamados, ordens de serviço (geração, atribuição, execução e encerramento), planos de manutenção preventiva, histórico por equipamento e indicadores. O back-end foi construído em TypeScript com NestJS e modelo de domínio orientado a objetos, com PostgreSQL via Prisma; o front-end em Next.js com Tailwind CSS; testes com Jest e Supertest; ambiente com Docker e CI no GitHub Actions.

O projeto foi conduzido em Scrumban, com quatro sprints e reuniões quinzenais ([ATA-001](../05-reunioes/atas/ATA-001-reuniao-inicial.md) a [ATA-004](../05-reunioes/atas/ATA-004-reuniao-quinzenal-10-11.md)). Todas as histórias do escopo (UH01 a UH08) foram integradas na `main` até 13/11/2026, com o pipeline aprovado.

## 3. Objetivos alcançados

| Objetivo (TAP) | Atingido | Observações |
|---|---|---|
| Aplicação web funcional (React + Tailwind CSS) | Sim | Next.js integrado à API (PR #8 e PR #20) |
| Back-end em NestJS aplicando os pilares de POO | Sim | Classes de domínio com encapsulamento, herança, polimorfismo e abstração (PR #3, #5, #11, #14) |
| Persistência em PostgreSQL com Prisma | Sim | Modo em memória mantido para desenvolvimento e testes (DEC-009) |
| Testes automatizados com Jest e Supertest | Sim | 50 testes de API e 23 de domínio aprovados; regressão RT-003 com 50/50 |
| Controle de versão com Git e GitHub | Sim | Todo o código entrou por Pull Request com revisão |
| CI/CD com GitHub Actions e Docker | Sim | Pipeline com 4 jobs: Back-end, Front-end, Ambiente completo e Publicar imagens |
| Documentação de requisitos, arquitetura, decisões e API | Sim | ADRs, modelo de domínio, Swagger/OpenAPI |
| Condução com Scrumban | Sim | Sprints, reuniões quinzenais, atas e registro de decisões |

## 4. Entregas realizadas

| Entrega | Data | Referência |
|---|---|---|
| Apresentação + Imersão | 30/09/2026 | Sprint 0 |
| Modelo de domínio | 07 e 14/10/2026 | DEC-008 |
| Board + Incubators | 21/10/2026 | Sprint 1 |
| MVP integrado | 04/11/2026 | Sprint 2 |
| F3 — Projeto e Resultados | 11/11/2026 | Sprint 3 |
| UH01–UH03: login, usuários e equipamentos | 11/11/2026 | PR #5 |
| UH04–UH07: chamados, OS, execução e preventiva | 11/11/2026 | PR #11 |
| UH08: histórico e indicadores | 13/11/2026 | PR #14 |
| Integração front ↔ API e persistência Prisma | 13/11/2026 | PR #20 |
| Pipeline de CI completo e ambiente Docker | 11/11/2026 | PRs #6, #9, #10 |
| Plano e relatórios de teste (v1 a v1.3, RT-003) | 18/10 a 13/11/2026 | PRs #18, #19 |

## 5. Entregas não realizadas e justificativas

| Item | Justificativa | Encaminhamento |
|---|---|---|
| DEF-06 — solicitante vê todos os chamados | Identificado na regressão final; a correção exige filtro por perfil em várias rotas e não coube no prazo | Backlog para continuidade (DEC-016) |
| DEF-14 — indicadores sem filtro de período | Melhoria de UH08 identificada pelo QA após a F3 | Backlog para continuidade (DEC-016) |
| Fontes locais no front (PR #21) | Aberto em 13/11 para evitar falhas de build ao baixar fontes externas; aguarda merge | Merge previsto antes da apresentação |
| Paper final e Prova S1 | Entregas acadêmicas posteriores ao encerramento técnico | 18 a 25/11/2026 |

## 6. Indicadores finais

| Indicador | Valor |
|---|---|
| Histórias planejadas / entregues | 8 / 8 |
| Pull Requests integrados | 15 (o PR #2 foi fechado e o #21 está aberto) |
| Commits na `main` | 98 |
| Testes automatizados | 73 (50 de API + 23 de domínio), todos aprovados |
| Defeitos (QA) | DEF-07, DEF-08, DEF-09, DEF-12 e DEF-13 corrigidos; DEF-06 e DEF-14 no backlog |
| Issues de defeito registradas no GitHub | #7, #15, #16, #17 |
| Pipeline na `main` | Aprovado |
| Reuniões registradas | 4 atas (1 inicial + 3 quinzenais) |

## 7. Lições aprendidas

- **Integrar cedo:** as Sprints 1 e 2 terminaram com o código pronto, mas os merges ficaram concentrados em 11–13/11. Integrar cada história ao final da própria sprint evita conflitos e retrabalho.
- **PRs pequenos revisam mais rápido:** os PRs com várias histórias ficaram dias aguardando revisão. A regra de 48h (DEC-013) só funciona com PRs menores.
- **QA desde o início:** o plano de testes a partir dos critérios de aceite encontrou defeitos reais (DEF-07, DEF-12, DEF-13) antes da entrega.
- **Persistência em memória ajudou:** permitiu ao front e aos testes avançarem sem depender do banco (DEC-009).
- **Dependências externas no build quebram o CI:** o download de fontes do Google no build do front causou falha intermitente, resolvida com fontes locais (PR #21).
- **Registrar as reuniões no momento:** as atas quinzenais tiveram de ser reconstruídas no encerramento; o ideal é registrá-las no dia.

## 8. Recomendações para continuidade

- Corrigir o DEF-06 (filtrar chamados por solicitante) e o DEF-14 (filtro de período nos indicadores);
- Integrar o PR #21 e manter o build sem dependências externas;
- Publicar o ambiente de demonstração a partir das imagens geradas pelo pipeline;
- Ampliar os testes de ponta a ponta das telas do front-end;
- Manter as atas e o plano de sprints atualizados a cada reunião quinzenal.

## 9. Aceite

| Nome | Papel | Data | Assinatura |
|---|---|---|---|
| André Neves | Product Owner / Tech Lead | 13/11/2026 | |
| Luíza Quintanilha | Scrum Master / Front-end | 13/11/2026 | |
| David Rafael | DevOps | 13/11/2026 | |
| Gerardo Mota | Back-end | 13/11/2026 | |
| Matheus Oliveira | Back-end | 13/11/2026 | |
| José Arraes | Tester / QA | 13/11/2026 | |
| Rondineli Seba | Professor / Cliente | | |
