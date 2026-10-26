# Operix — Gestão de Manutenção Empresarial

Sistema para planejamento, execução e acompanhamento de manutenções em ambientes empresariais, desenvolvido como projeto da disciplina de Programação Orientada a Objetos (POO) do Centro Universitário Dom Bosco — UNDB, sob orientação do professor Rondineli Seba.

> Status do projeto: **Sprint 0 — Iniciação e planejamento**

## Sobre o Projeto

O Operix centraliza o controle de equipamentos (máquinas, instalações e dispositivos), chamados, ordens de serviço e planos de manutenção preventiva e corretiva, oferecendo rastreabilidade e histórico das intervenções realizadas.

## Problema

Muitas empresas controlam a manutenção por planilhas, papel ou comunicação informal. Isso gera perda de histórico, atrasos em manutenções preventivas, falhas inesperadas de equipamentos, retrabalho e baixa visibilidade para a gestão.

## Objetivo

Desenvolver uma aplicação web que permita registrar equipamentos, abrir chamados, acompanhar ordens de serviço, programar manutenções preventivas e consultar indicadores, aplicando os fundamentos de POO e boas práticas de engenharia de software.

## Solução Proposta

Sistema composto por:

- **Back-end** em TypeScript com NestJS, responsável pelas regras de negócio e pela API, documentada com Swagger/OpenAPI;
- **Front-end** web em React com Tailwind CSS;
- **Banco de dados** PostgreSQL, acessado pelo ORM Prisma;
- **Testes** com Jest e Supertest;
- **Ambientes e CI/CD** com Docker e GitHub Actions.

Detalhes em [docs/01-projeto/visao-do-produto.md](docs/01-projeto/visao-do-produto.md).

## Público-Alvo / Cliente

- Gestores de manutenção e facilities;
- Técnicos de manutenção;
- Solicitantes (colaboradores que reportam problemas).

## Funcionalidades Principais

| Módulo | Descrição | História |
|---|---|---|
| Autenticação | Login e controle de acesso por perfil | UH01 |
| Usuários e perfis | Administrador, Gestor, Técnico e Solicitante | UH02 |
| Equipamentos | Cadastro com código, tipo, localização e status | UH03 |
| Chamados | Solicitante reporta o problema e acompanha o status | UH04 |
| Ordens de serviço | Geração, atribuição, execução e encerramento | UH05, UH06 |
| Manutenção preventiva | Planos por periodicidade com alertas | UH07 |
| Histórico e indicadores | Histórico por equipamento e painel gerencial | UH08 |

Modelo de domínio: [docs/03-arquitetura/modelo-de-dominio.md](docs/03-arquitetura/modelo-de-dominio.md).

## Tecnologias

| Área | Tecnologia | Motivo |
|---|---|---|
| Back-end | TypeScript + NestJS | Estrutura modular, orientação a objetos e APIs bem organizadas |
| Front-end | Next.js (React) + Tailwind CSS | Interface rápida e componentizada |
| Banco de dados | PostgreSQL | Relacional, robusto e adequado para regras de negócio |
| ORM | Prisma | Facilita a modelagem e o acesso ao PostgreSQL |
| Testes | Jest + Supertest | Testes unitários e testes de API |
| DevOps | Docker + GitHub Actions | CI/CD e ambientes reproduzíveis |
| Documentação da API | Swagger / OpenAPI | Facilita testar e apresentar a API |
| Versionamento | Git + GitHub | Código, Issues, Pull Requests e documentação |

As decisões técnicas são registradas em [docs/03-arquitetura/decisoes-tecnicas](docs/03-arquitetura/decisoes-tecnicas).

## Arquitetura

Aplicação web em três camadas: front-end React consumindo uma API REST em NestJS, que persiste os dados no PostgreSQL por meio do Prisma. Ver [docs/03-arquitetura/arquitetura-de-solucao.md](docs/03-arquitetura/arquitetura-de-solucao.md).

## Metodologia

O projeto adota **Scrumban** (Scrum combinado com Kanban), com sprints curtas, quadro Kanban com fluxo contínuo, backlog priorizado pelo Product Owner e cerimônias documentadas. Ver [docs/02-gestao/scrum.md](docs/02-gestao/scrum.md).

### Planejamento (Kanban no Trello)

O cronograma de entregas da disciplina e as tarefas de cada área estão no quadro Kanban do Trello, organizado por entrega, com prazos, responsáveis e etiquetas por área:

**[Operix — Cronograma de Entregas (POO)](https://trello.com/invite/b/6ac3fc61d92f5af90dc6a42b/ATTI36b7432fdf85cc9b1265efb84ec1d44a7DE01C50/operix-cronograma-de-entregas-poo)**

| Entrega | Data |
|---|---|
| Apresentação + Imersão | 30/09 (concluída) |
| Modelo de domínio | 07/10 e 14/10 |
| Board + Incubators | 21/10 |
| MVP integrado | 04/11 |
| F3 — Projeto e Resultados | 11/11 |
| Paper final + Prova S1 | 18 a 25/11 |

## Equipe

| Integrante | Função técnica | Papel no Scrumban |
|---|---|---|
| André Neves | Tech Lead | Product Owner |
| Luíza Quintanilha | Front-end | Scrum Master |
| David Rafael | DevOps | Desenvolvedor |
| Gerardo Mota | Back-end | Desenvolvedor |
| Matheus Oliveira | Back-end | Desenvolvedor |
| José Arraes | Tester / QA | Desenvolvedor |

Responsabilidades detalhadas em [docs/02-gestao/papeis-e-responsabilidades.md](docs/02-gestao/papeis-e-responsabilidades.md).

## Estrutura do Repositório

```
.
├── README.md
├── LICENSE
├── .gitignore
├── .github/                 Modelos de issues e pull requests
├── docs/
│   ├── 01-projeto/          TAP, visão, objetivos, escopo, requisitos, stakeholders
│   ├── 02-gestao/           Scrum, papéis, backlog, roadmap, sprints, comunicação
│   ├── 03-arquitetura/      Arquitetura, diagramas e decisões técnicas (ADRs)
│   ├── 04-requisitos/       Requisitos funcionais e não funcionais, casos de uso, regras
│   ├── 05-reunioes/         Atas e registro de decisões
│   ├── 06-encerramento/     Termo de Encerramento do Projeto (TEP)
│   └── 07-compliance/       Segurança da informação, LGPD, licenças e direitos autorais
├── frontend/                Aplicação web Next.js (React) + Tailwind CSS
├── backend/                 API NestJS (TypeScript), Prisma e PostgreSQL
├── devops/                  Docker, GitHub Actions e infraestrutura
├── tester/                  Planos, casos, evidências e relatórios de teste
└── tech-lead/              Gerenciamento do projeto
    └── product-owner/       Backlog e documentos de produto
```

## Como Executar

**Opção 1 — tudo com Docker** (na raiz do repositório):

```bash
docker compose -f devops/docker/docker-compose.yml up --build
```

Front-end em http://localhost:8080 · API em http://localhost:3000/api · Swagger em http://localhost:3000/api/docs

**Opção 2 — sem Docker e sem banco** (Node.js 20+):

```bash
cd backend && npm install && cp .env.example .env && npm run start:dev
# em outro terminal
cd frontend && npm install && npm run dev
```

O front-end oficial é o do PR #8 (Luíza). A API já usa a porta 3000, então rode o front-end em outra porta: `npm run dev -- -p 3001`. Para testar a API direto, use o Swagger com os usuários de exemplo `admin@`, `gestor@`, `tecnico@` e `solicitante@operix.local` e a senha definida em `SENHA_EXEMPLO` (veja [backend/README.md](backend/README.md)).

## Status do Projeto

| Entrega | Situação |
|---|---|
| Estrutura do repositório e documentação de projeto | Concluída |
| Definição da equipe e das tecnologias | Concluída |
| Modelo de domínio (diagramas, regras e classes) | Concluído — [modelo de domínio](docs/03-arquitetura/modelo-de-dominio.md) |
| UH01 a UH03 (login, usuários, equipamentos): API e testes | Concluídas, em revisão (telas no PR #8) |
| Ambiente Docker e pipeline de CI | Concluídos |
| UH04 a UH07 (MVP integrado — 04/11) | Em andamento |
| UH08 e F3 (11/11) | Planejada |
| Termo de Encerramento (TEP) | Não iniciado |

## Roadmap

Ver [docs/02-gestao/roadmap.md](docs/02-gestao/roadmap.md).

## Documentação

Índice completo em [docs/README.md](docs/README.md).

## Licença

Distribuído sob a licença MIT. Ver [LICENSE](LICENSE).

Questões de segurança da informação, proteção de dados (LGPD), licenças de terceiros e direitos autorais estão em [docs/07-compliance](docs/07-compliance).
