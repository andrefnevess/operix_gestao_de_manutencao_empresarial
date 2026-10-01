# Operix — Gestão de Manutenção Empresarial

Sistema para planejamento, execução e acompanhamento de manutenções em ambientes empresariais, desenvolvido como projeto da disciplina de Programação Orientada a Objetos (POO) do Centro Universitário Dom Bosco — UNDB, sob orientação do professor Rondineli Seba.

> Status do projeto: **Sprint 0 — Iniciação e planejamento**

## Sobre o Projeto

O Operix centraliza o controle de ativos (equipamentos, máquinas e instalações), ordens de serviço e planos de manutenção preventiva e corretiva, oferecendo rastreabilidade e histórico das intervenções realizadas.

## Problema

Muitas empresas controlam a manutenção por planilhas, papel ou comunicação informal. Isso gera perda de histórico, atrasos em manutenções preventivas, falhas inesperadas de equipamentos, retrabalho e baixa visibilidade para a gestão.

## Objetivo

Desenvolver uma aplicação web que permita registrar ativos, abrir e acompanhar ordens de serviço, programar manutenções preventivas e consultar indicadores, aplicando os fundamentos de POO e boas práticas de engenharia de software.

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

| Módulo | Descrição |
|---|---|
| Autenticação | Login e controle de acesso por perfil |
| Ativos | Cadastro de equipamentos, localização e dados técnicos |
| Ordens de Serviço | Abertura, atribuição, execução e encerramento |
| Manutenção Preventiva | Planos com periodicidade e geração de ordens |
| Técnicos | Cadastro de técnicos e especialidades |
| Histórico | Registro das intervenções por ativo |
| Relatórios | Indicadores básicos (ordens abertas, atrasadas, concluídas) |

## Tecnologias

| Área | Tecnologia | Motivo |
|---|---|---|
| Back-end | TypeScript + NestJS | Estrutura modular, orientação a objetos e APIs bem organizadas |
| Front-end | React + Tailwind CSS | Interface rápida e componentizada |
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

## Equipe

| Integrante | Função técnica | Papel no Scrumban |
|---|---|---|
| André Neves | Tech Lead | Product Owner |
| Luíza Quintanilha | Front-end | Scrum Master |
| David Rafael | DevOps | Desenvolvedor |
| Gerardo Mota | Back-end | Desenvolvedor |
| Matheus Oliveira | Back-end | Desenvolvedor |
| José Arrais | Tester / QA | Desenvolvedor |

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
├── frontend/                Aplicação web React + Tailwind CSS
├── backend/                 API NestJS (TypeScript), Prisma e PostgreSQL
├── devops/                  Docker, GitHub Actions e infraestrutura
├── tester/                  Planos, casos, evidências e relatórios de teste
└── tech-lead/              Gerenciamento do projeto
    └── product-owner/       Backlog e documentos de produto
```

## Como Executar

> Em elaboração. As instruções serão adicionadas quando o primeiro incremento estiver disponível.

Pré-requisitos: Node.js (versão LTS), Docker e Docker Compose, Git.

```bash
# previsto — os arquivos serão criados na Sprint 1
git clone https://github.com/andrefnevess/operix_gestao_de_manutencao_empresarial.git
cd operix_gestao_de_manutencao_empresarial
docker compose -f devops/docker/docker-compose.yml up
```

Após a subida, a documentação da API ficará disponível no Swagger (endereço a ser informado).

## Status do Projeto

| Entrega | Situação |
|---|---|
| Estrutura do repositório | Concluída |
| Definição da equipe | Concluída |
| Termo de Abertura (TAP) | Em elaboração |
| Visão do produto e escopo | Em elaboração |
| Definição das tecnologias | Concluída |
| Arquitetura de solução | Em elaboração |
| Desenvolvimento | Não iniciado |
| Termo de Encerramento (TEP) | Não iniciado |

## Roadmap

Ver [docs/02-gestao/roadmap.md](docs/02-gestao/roadmap.md).

## Documentação

Índice completo em [docs/README.md](docs/README.md).

## Licença

Distribuído sob a licença MIT. Ver [LICENSE](LICENSE).

Questões de segurança da informação, proteção de dados (LGPD), licenças de terceiros e direitos autorais estão em [docs/07-compliance](docs/07-compliance).
