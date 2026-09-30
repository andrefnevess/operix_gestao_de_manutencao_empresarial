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

Aplicação web composta por:

- **Back-end** em Java, responsável pelas regras de negócio, persistência e API REST;
- **Front-end** web para operação pelos usuários;
- **Banco de dados relacional** para armazenamento das informações;
- **Pipeline de CI/CD** para build e testes automatizados.

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

| Camada | Tecnologia | Status |
|---|---|---|
| Back-end | Java + Spring Boot | Proposta |
| Front-end | [A definir] | A definir |
| Banco de dados | PostgreSQL | Proposta |
| Testes | JUnit | Proposta |
| Containers | Docker | Proposta |
| CI/CD | GitHub Actions | Proposta |
| Gestão | GitHub Projects, Issues e Discussions | Em uso |

As decisões técnicas são registradas em [docs/03-arquitetura/decisoes-tecnicas](docs/03-arquitetura/decisoes-tecnicas).

## Arquitetura

Arquitetura em camadas (cliente web, API REST, serviços de domínio, persistência). Ver [docs/03-arquitetura/arquitetura-de-solucao.md](docs/03-arquitetura/arquitetura-de-solucao.md).

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
│   └── 06-encerramento/     Termo de Encerramento do Projeto (TEP)
├── frontend/                Aplicação web
├── backend/                 API e regras de negócio (Java)
├── devops/                  Docker, CI/CD e infraestrutura
├── tester/                  Planos, casos, evidências e relatórios de teste
└── tech-lead/              Gerenciamento do projeto
    └── product-owner/       Backlog e documentos de produto
```

## Como Executar

> Em elaboração. As instruções serão adicionadas quando o primeiro incremento estiver disponível.

Pré-requisitos previstos: Java 21, Maven, Node.js (se aplicável ao front-end), Docker.

```bash
# previsto
docker compose -f devops/docker/docker-compose.yml up
```

## Status do Projeto

| Entrega | Situação |
|---|---|
| Estrutura do repositório | Concluída |
| Definição da equipe | Concluída |
| Termo de Abertura (TAP) | Em elaboração |
| Visão do produto e escopo | Em elaboração |
| Arquitetura de solução | Em elaboração |
| Desenvolvimento | Não iniciado |
| Termo de Encerramento (TEP) | Não iniciado |

## Roadmap

Ver [docs/02-gestao/roadmap.md](docs/02-gestao/roadmap.md).

## Documentação

Índice completo em [docs/README.md](docs/README.md).

## Licença

Distribuído sob a licença MIT. Ver [LICENSE](LICENSE).
