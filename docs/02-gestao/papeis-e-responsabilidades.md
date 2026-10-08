# Papéis e Responsabilidades

## Papéis do Scrum

No Scrum, o Product Owner não é o chefe da equipe. Cada papel tem responsabilidades próprias, e esta separação evita conflitos de autoridade:

- **Product Owner:** responsável por maximizar o valor do produto e por gerenciar e priorizar o Product Backlog;
- **Scrum Master:** responsável pela aplicação do Scrum, pela facilitação dos eventos e pela remoção de impedimentos;
- **Desenvolvedores:** responsáveis por construir o incremento e decidir como o trabalho técnico será feito.

## Acúmulo de papéis

Alguns integrantes acumulam um papel do Scrumban e uma função técnica:

| Integrante | Papel no Scrumban | Função técnica |
|---|---|---|
| André Neves | Product Owner | Tech Lead |
| Luíza Quintanilha | Scrum Master | Front-end |

Para evitar conflito de responsabilidades:

- Como **Product Owner**, André Neves decide **o que** será construído e em qual prioridade;
- Como **Tech Lead**, orienta **como** construir, mas as estimativas e a forma de execução são definidas em conjunto pelos desenvolvedores;
- Decisões técnicas relevantes são registradas em ADR e discutidas com a equipe, não impostas pelo PO;
- Como **Scrum Master**, Luíza Quintanilha facilita o processo para toda a equipe, inclusive nas situações que envolvem o PO.

## Matriz de papéis

| Papel | Integrante | Responsabilidades |
|---|---|---|
| Product Owner | André Neves | Visão do produto, gestão e priorização do backlog, escrita de histórias, aceite das entregas, interface com cliente e professor |
| Scrum Master | Luíza Quintanilha | Facilitação dos eventos Scrum, remoção de impedimentos, acompanhamento do quadro, registro das atas |
| Tech Lead | André Neves | Direcionamento técnico, arquitetura, padrões de código, revisão de Pull Requests, ADRs |
| Back-end | Gerardo Mota, Matheus Oliveira | API, modelo de domínio orientado a objetos, regras de negócio e persistência |
| Front-end | Luíza Quintanilha | Interface, experiência do usuário e integração com a API |
| DevOps | David Rafael | Ambientes, containers, pipeline de CI/CD e infraestrutura |
| Tester / QA | José Arraes | Estratégia de testes, casos de teste, execução, evidências e relatórios |

## Matriz RACI

R = Responsável, A = Aprovador, C = Consultado, I = Informado

| Atividade | PO | SM | Tech Lead | Back-end | Front-end | DevOps | QA |
|---|---|---|---|---|---|---|---|
| Priorizar backlog | A/R | C | C | I | I | I | I |
| Escrever histórias de usuário | A/R | I | C | C | C | I | C |
| Facilitar eventos Scrum | I | A/R | I | I | I | I | I |
| Definir arquitetura | C | I | A/R | C | C | C | I |
| Implementar back-end | I | I | A | R | I | I | C |
| Implementar front-end | I | I | A | I | R | I | C |
| Pipeline de CI/CD | I | I | A | C | C | R | C |
| Planejar e executar testes | C | I | C | C | C | I | A/R |
| Aceitar entregas | A/R | I | C | I | I | I | C |
| Registrar atas | I | A/R | I | I | I | I | I |
