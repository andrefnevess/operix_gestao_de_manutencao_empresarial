# Product Backlog

Mantido pelo Product Owner. A versão operacional fica no GitHub Projects; este arquivo é o registro consolidado.

> Atualizado em 13/11/2026, no encerramento do projeto.

## Formato das histórias

> Como **[tipo de usuário]**, quero **[ação]**, para **[benefício]**.

## Backlog

| ID | História | Prioridade | Status | Sprint | Entregue em |
|---|---|---|---|---|---|
| UH01 | Como usuário, quero acessar o sistema com e-mail e senha, para utilizar as funcionalidades permitidas ao meu perfil | Alta | Done | Sprint 1 | PR #5 (11/11) |
| UH02 | Como administrador, quero cadastrar, editar e inativar usuários, definindo seus perfis, para controlar quem acessa o sistema e o que cada pessoa pode fazer | Alta | Done | Sprint 1 | PR #5 (11/11) |
| UH03 | Como gestor, quero cadastrar e manter os equipamentos da empresa, para ter o inventário de tudo o que precisa de manutenção | Alta | Done | Sprint 1 | PR #5 (11/11) |
| UH04 | Como solicitante, quero abrir um chamado informando o problema de um equipamento, para que a equipe de manutenção seja avisada e resolva o problema | Alta | Done | Sprint 2 | PR #11 (11/11) |
| UH05 | Como gestor, quero gerar uma ordem de serviço a partir de um chamado e atribuí-la a um técnico, para organizar e distribuir o trabalho da equipe de manutenção | Alta | Done | Sprint 2 | PR #11 (11/11) |
| UH06 | Como técnico, quero registrar a execução da manutenção e encerrar a ordem de serviço, para documentar o serviço realizado e manter o histórico do equipamento | Alta | Done | Sprint 2 | PR #11 (11/11) |
| UH07 | Como gestor, quero criar planos de manutenção preventiva com periodicidade e receber alertas, para evitar falhas e paradas inesperadas dos equipamentos | Média | Done | Sprint 2 | PR #11 (11/11) |
| UH08 | Como gestor, quero consultar o histórico de manutenções de cada equipamento e indicadores gerais, para tomar decisões sobre reparo, substituição e prioridades | Média | Done | Sprint 3 | PR #14 (13/11) |

A integração das telas com a API e a persistência em PostgreSQL (Prisma) entraram no PR #20 (13/11).

## Itens para continuidade

Itens identificados pelo QA e mantidos no backlog após o encerramento (DEC-016):

| ID | Descrição | Prioridade | Status |
|---|---|---|---|
| DEF-06 | O solicitante vê todos os chamados; deveria ver apenas os que abriu | Alta | Backlog |
| DEF-14 | Indicadores não permitem filtrar por período | Média | Backlog |

## Critérios de aceitação

Cada história possui 6 critérios de aceite, detalhados em [product-owner/backlog](../../tech-lead/product-owner/backlog) e na Issue correspondente.
