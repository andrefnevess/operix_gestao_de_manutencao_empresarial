# Operix — Gestão de Manutenção Empresarial

Sistema para planejamento, execução e acompanhamento de manutenções em ambientes empresariais, desenvolvido como projeto da disciplina de Programação Orientada a Objetos (POO) do Centro Universitário Dom Bosco — UNDB, sob orientação do professor Rondineli Seba.

> Status do projeto: **Sprint 0 — Iniciação e planejamento**

## Sobre o Projeto

O Operix centraliza o controle de ativos (equipamentos, máquinas e instalações), ordens de serviço e planos de manutenção preventiva e corretiva, oferecendo rastreabilidade e histórico das intervenções realizadas.

## Problema

Muitas empresas controlam a manutenção por planilhas, papel ou comunicação informal. Isso gera perda de histórico, atrasos em manutenções preventivas, falhas inesperadas de equipamentos, retrabalho e baixa visibilidade para a gestão.

## Objetivo

Desenvolver uma aplicação que permita registrar ativos, abrir e acompanhar ordens de serviço, programar manutenções preventivas e consultar indicadores, aplicando os fundamentos de POO e boas práticas de engenharia de software.

## Solução Proposta

Sistema composto por:

- **Back-end**, responsável pelas regras de negócio e pela persistência dos dados — tecnologia [A DEFINIR];
- **Front-end**, interface de operação pelos usuários — tecnologia [A DEFINIR];
- **Banco de dados** para armazenamento das informações — tecnologia [A DEFINIR];
- **Automação de build, testes e entrega (CI/CD)** — ferramenta [A DEFINIR].

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
| Back-end | [A DEFINIR] | Em discussão |
| Front-end | [A DEFINIR] | Em discussão |
| Banco de dados | [A DEFINIR] | Em discussão |
| Testes | [A DEFINIR] | Em discussão |
| Infraestrutura / ambientes | [A DEFINIR] | Em discussão |
| CI/CD | [A DEFINIR] | Em discussão |
| Versionamento e gestão | Git, GitHub (Issues, Pull Requests, Projects e Discussions) | Definido |

As decisões técnicas são registradas em [docs/03-arquitetura/decisoes-tecnicas](docs/03-arquitetura/decisoes-tecnicas).

## Arquitetura

A arquitetura será definida após a escolha das tecnologias [A DEFINIR]. Ver [docs/03-arquitetura/arquitetura-de-solucao.md](docs/03-arquitetura/arquitetura-de-solucao.md).

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
├── frontend/                Interface com o usuário
├── backend/                 Regras de negócio e persistência
├── devops/                  Ambientes, CI/CD e infraestrutura
├── tester/                  Planos, casos, evidências e relatórios de teste
└── tech-lead/              Gerenciamento do projeto
    └── product-owner/       Backlog e documentos de produto
```

## Como Executar

> Em elaboração. As instruções serão adicionadas quando o primeiro incremento estiver disponível.

Pré-requisitos: [A DEFINIR], de acordo com as tecnologias escolhidas.

## Status do Projeto

| Entrega | Situação |
|---|---|
| Estrutura do repositório | Concluída |
| Definição da equipe | Concluída |
| Termo de Abertura (TAP) | Em elaboração |
| Visão do produto e escopo | Em elaboração |
| Definição das tecnologias | Pendente |
| Arquitetura de solução | Pendente |
| Desenvolvimento | Não iniciado |
| Termo de Encerramento (TEP) | Não iniciado |

## Roadmap

Ver [docs/02-gestao/roadmap.md](docs/02-gestao/roadmap.md).

## Documentação

Índice completo em [docs/README.md](docs/README.md).

## Licença

Distribuído sob a licença MIT. Ver [LICENSE](LICENSE).

Questões de segurança da informação, proteção de dados (LGPD), licenças de terceiros e direitos autorais estão em [docs/07-compliance](docs/07-compliance).
