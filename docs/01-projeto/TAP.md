# Termo de Abertura do Projeto (TAP)

> Status: projeto encerrado em 13/11/2026 — ver o [Termo de Encerramento (TEP)](../06-encerramento/TEP.md).

## 1. Identificação

| Item | Descrição |
|---|---|
| Nome do projeto | Operix — Gestão de Manutenção Empresarial |
| Disciplina | Programação Orientada a Objetos |
| Professor | Rondineli Seba |
| Instituição | Centro Universitário Dom Bosco — UNDB |
| Product Owner / Tech Lead | André Neves |
| Scrum Master | Luíza Quintanilha |
| Equipe | Ver seção 9 |
| Data de início | 29/09/2026 |
| Previsão de término | 25/11/2026 |

## 2. Justificativa

A gestão de manutenção em muitas empresas ainda depende de planilhas e comunicação informal, o que causa perda de histórico, falhas não planejadas e custos evitáveis. O projeto propõe uma solução de software que organize esse processo e, ao mesmo tempo, permita à equipe aplicar na prática os conceitos de Programação Orientada a Objetos e de engenharia de software.

## 3. Problema

Ausência de um controle centralizado de equipamentos, chamados, ordens de serviço e manutenções preventivas, resultando em baixa rastreabilidade, atrasos e dificuldade de tomada de decisão.

## 4. Objetivo geral

Desenvolver uma aplicação web para gestão de manutenção empresarial, com cadastro de equipamentos, chamados, controle de ordens de serviço e planejamento de manutenções preventivas.

## 5. Objetivos específicos

- Desenvolver uma aplicação web funcional (React + Tailwind CSS);
- Implementar o back-end em TypeScript com NestJS, aplicando os pilares de POO (encapsulamento, herança, polimorfismo e abstração);
- Persistir os dados em PostgreSQL, com acesso pelo ORM Prisma;
- Implementar testes automatizados com Jest e Supertest;
- Utilizar controle de versão com Git e GitHub;
- Implementar pipeline de CI/CD com GitHub Actions e ambientes com Docker;
- Documentar requisitos, arquitetura, decisões técnicas e a API (Swagger/OpenAPI);
- Conduzir o projeto com Scrumban.

## 6. Escopo inicial

- Autenticação e perfis de acesso;
- Cadastro de equipamentos;
- Abertura e acompanhamento de chamados;
- Abertura, atribuição, execução e encerramento de ordens de serviço;
- Planos de manutenção preventiva;
- Histórico de manutenções por equipamento;
- Relatórios básicos.

## 7. Fora do escopo

- Aplicativo mobile nativo;
- Controle de estoque e compras de peças;
- Integração com ERPs ou sensores IoT;
- Módulo financeiro e faturamento;
- Implantação em ambiente produtivo de cliente real.

## 8. Stakeholders

| Stakeholder | Interesse |
|---|---|
| Cliente | Solução que resolva o problema de gestão de manutenção |
| Professor | Avaliação técnica e metodológica do projeto |
| Product Owner | Valor do produto e priorização do backlog |
| Scrum Master | Aplicação do Scrum e remoção de impedimentos |
| Desenvolvedores | Construção do produto |
| Tester / QA | Qualidade das entregas |
| DevOps | Ambiente, automação e entrega contínua |

Detalhamento em [stakeholders.md](stakeholders.md).

## 9. Equipe

| Integrante | Função técnica | Papel no Scrumban |
|---|---|---|
| André Neves | Tech Lead | Product Owner |
| Luíza Quintanilha | Front-end | Scrum Master |
| David Rafael | DevOps | Desenvolvedor |
| Gerardo Mota | Back-end | Desenvolvedor |
| Matheus Oliveira | Back-end | Desenvolvedor |
| José Arraes | Tester / QA | Desenvolvedor |

## 10. Premissas

- Todos os integrantes terão disponibilidade semanal para as atividades e cerimônias;
- O GitHub será a fonte oficial de código, documentação e gestão;
- O professor Rondineli Seba atuará como cliente/stakeholder nas validações.

## 11. Restrições

- Prazo definido pelo calendário acadêmico;
- Back-end obrigatoriamente orientado a objetos (TypeScript com NestJS);
- Uso de ferramentas gratuitas ou com licença acadêmica.

## 12. Riscos iniciais

| Risco | Probabilidade | Impacto | Resposta |
|---|---|---|---|
| Indisponibilidade de integrantes | Média | Alto | Redistribuição de tarefas nas plannings |
| Escopo crescer além do prazo | Alta | Alto | Controle rigoroso do backlog e do "fora do escopo" |
| Curva de aprendizado das tecnologias | Média | Médio | Estudos direcionados e pareamento |
| Conflitos de integração de código | Média | Médio | Pull Requests com revisão e CI |

## 13. Critérios de sucesso

- Funcionalidades do escopo inicial entregues e validadas;
- Aplicação correta dos conceitos de POO no código;
- Testes automatizados executando no pipeline;
- Documentação atualizada e rastreável no repositório;
- Cerimônias do Scrum registradas.

## 14. Aprovação

| Nome | Papel | Data | Assinatura |
|---|---|---|---|
| André Neves | Product Owner / Tech Lead | | |
| Luíza Quintanilha | Scrum Master | | |
| Rondineli Seba | Professor / Cliente | | |
