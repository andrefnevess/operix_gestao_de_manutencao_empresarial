# Histórias de Usuário

Responsável: André Neves (Product Owner).

Formato: *Como* **[perfil]**, *quero* **[ação]**, *para* **[benefício]**.

## Resumo

| Código | História | Perfil | Prioridade | Sprint |
|---|---|---|---|---|
| [UH01](#uh01--autenticação-no-sistema) | Autenticação no sistema | Usuário | Alta | Sprint 1 |
| [UH02](#uh02--gestão-de-usuários-e-perfis) | Gestão de usuários e perfis | Administrador | Alta | Sprint 1 |
| [UH03](#uh03--cadastro-de-equipamentos) | Cadastro de equipamentos | Gestor | Alta | Sprint 1 |
| [UH04](#uh04--abertura-de-chamado) | Abertura de chamado | Solicitante | Alta | Sprint 2 |
| [UH05](#uh05--geração-e-atribuição-de-ordem-de-serviço) | Geração e atribuição de ordem de serviço | Gestor | Alta | Sprint 2 |
| [UH06](#uh06--execução-e-encerramento-da-ordem-de-serviço) | Execução e encerramento da ordem de serviço | Técnico | Alta | Sprint 3 |
| [UH07](#uh07--planejamento-de-manutenção-preventiva) | Planejamento de manutenção preventiva | Gestor | Média | Sprint 3 |
| [UH08](#uh08--histórico-e-indicadores-de-manutenção) | Histórico e indicadores de manutenção | Gestor | Média | Sprint 4 |

## UH01 — Autenticação no sistema

> Como **usuário**, quero **acessar o sistema com e-mail e senha**, para **utilizar as funcionalidades permitidas ao meu perfil**.

| Prioridade | Sprint prevista |
|---|---|
| Alta | Sprint 1 |

**Critérios de aceite**

- [ ] **CA01** — O login é realizado com e-mail e senha cadastrados;
- [ ] **CA02** — Com credenciais válidas, o usuário é direcionado à tela inicial do seu perfil;
- [ ] **CA03** — Com credenciais inválidas, o sistema exibe mensagem genérica, sem indicar qual campo está incorreto;
- [ ] **CA04** — Usuários inativos não conseguem acessar o sistema;
- [ ] **CA05** — Após 5 tentativas consecutivas sem sucesso, o acesso é bloqueado temporariamente;
- [ ] **CA06** — O usuário consegue encerrar a sessão (logout) a qualquer momento.

## UH02 — Gestão de usuários e perfis

> Como **administrador**, quero **cadastrar, editar e inativar usuários, definindo seus perfis**, para **controlar quem acessa o sistema e o que cada pessoa pode fazer**.

| Prioridade | Sprint prevista |
|---|---|
| Alta | Sprint 1 |

**Critérios de aceite**

- [ ] **CA01** — O cadastro exige nome, e-mail e perfil (Administrador, Gestor, Técnico ou Solicitante);
- [ ] **CA02** — Não é permitido cadastrar dois usuários com o mesmo e-mail;
- [ ] **CA03** — A senha é armazenada de forma protegida e nunca é exibida no sistema;
- [ ] **CA04** — O administrador pode editar nome e perfil de um usuário existente;
- [ ] **CA05** — Usuários são inativados em vez de excluídos, preservando o histórico;
- [ ] **CA06** — Apenas usuários com perfil Administrador acessam esta funcionalidade.

## UH03 — Cadastro de equipamentos

> Como **gestor**, quero **cadastrar e manter os equipamentos da empresa**, para **ter o inventário de tudo o que precisa de manutenção**.

| Prioridade | Sprint prevista |
|---|---|
| Alta | Sprint 1 |

**Critérios de aceite**

- [ ] **CA01** — Os campos obrigatórios são: código, nome, tipo e localização;
- [ ] **CA02** — O código do equipamento é único no sistema;
- [ ] **CA03** — É possível informar dados opcionais: fabricante, modelo e data de aquisição;
- [ ] **CA04** — O gestor pode editar os dados de um equipamento cadastrado;
- [ ] **CA05** — O equipamento possui status: Ativo, Em manutenção ou Inativo;
- [ ] **CA06** — A listagem permite pesquisar equipamentos por código, nome, tipo ou localização.

## UH04 — Abertura de chamado

> Como **solicitante**, quero **abrir um chamado informando o problema de um equipamento**, para **que a equipe de manutenção seja avisada e resolva o problema**.

| Prioridade | Sprint prevista |
|---|---|
| Alta | Sprint 2 |

**Critérios de aceite**

- [ ] **CA01** — O chamado deve estar vinculado a um equipamento cadastrado;
- [ ] **CA02** — A descrição do problema é obrigatória;
- [ ] **CA03** — O solicitante informa a urgência: Baixa, Média, Alta ou Crítica;
- [ ] **CA04** — Não é possível abrir chamado para equipamento inativo;
- [ ] **CA05** — Ao salvar, o chamado recebe número único e status Aberto, exibidos ao solicitante;
- [ ] **CA06** — O solicitante consegue acompanhar o status dos chamados que abriu.

## UH05 — Geração e atribuição de ordem de serviço

> Como **gestor**, quero **gerar uma ordem de serviço a partir de um chamado e atribuí-la a um técnico**, para **organizar e distribuir o trabalho da equipe de manutenção**.

| Prioridade | Sprint prevista |
|---|---|
| Alta | Sprint 2 |

**Critérios de aceite**

- [ ] **CA01** — A ordem de serviço é gerada a partir de um chamado com status Aberto;
- [ ] **CA02** — A ordem herda o equipamento, a descrição e a urgência do chamado;
- [ ] **CA03** — O gestor atribui a ordem a um técnico ativo;
- [ ] **CA04** — O gestor define a data prevista para execução;
- [ ] **CA05** — Ao ser atribuída, a ordem passa para o status Atribuída e o chamado para Em atendimento;
- [ ] **CA06** — O técnico visualiza a ordem na sua lista de ordens atribuídas.

## UH06 — Execução e encerramento da ordem de serviço

> Como **técnico**, quero **registrar a execução da manutenção e encerrar a ordem de serviço**, para **documentar o serviço realizado e manter o histórico do equipamento**.

| Prioridade | Sprint prevista |
|---|---|
| Alta | Sprint 3 |

**Critérios de aceite**

- [ ] **CA01** — O técnico só pode iniciar ordens atribuídas a ele;
- [ ] **CA02** — Ao iniciar, a ordem passa para Em execução e o equipamento para Em manutenção;
- [ ] **CA03** — Para concluir, é obrigatório descrever o serviço realizado;
- [ ] **CA04** — O técnico registra o tempo gasto e o tipo de manutenção (Corretiva ou Preventiva);
- [ ] **CA05** — Ao concluir, a ordem passa para Concluída, o chamado é encerrado e o equipamento volta para Ativo;
- [ ] **CA06** — Ordens concluídas não podem ser alteradas.

## UH07 — Planejamento de manutenção preventiva

> Como **gestor**, quero **criar planos de manutenção preventiva com periodicidade e receber alertas**, para **evitar falhas e paradas inesperadas dos equipamentos**.

| Prioridade | Sprint prevista |
|---|---|
| Média | Sprint 3 |

**Critérios de aceite**

- [ ] **CA01** — O plano deve estar vinculado a um equipamento ativo;
- [ ] **CA02** — O plano possui descrição das atividades e periodicidade em dias;
- [ ] **CA03** — O sistema calcula a data da próxima manutenção com base na periodicidade;
- [ ] **CA04** — O sistema alerta o gestor sobre preventivas que vencem nos próximos 7 dias;
- [ ] **CA05** — Preventivas não realizadas até a data prevista são destacadas como atrasadas;
- [ ] **CA06** — O gestor pode gerar a ordem de serviço da preventiva a partir do alerta.

## UH08 — Histórico e indicadores de manutenção

> Como **gestor**, quero **consultar o histórico de manutenções de cada equipamento e indicadores gerais**, para **tomar decisões sobre reparo, substituição e prioridades**.

| Prioridade | Sprint prevista |
|---|---|
| Média | Sprint 4 |

**Critérios de aceite**

- [ ] **CA01** — O histórico lista todas as manutenções do equipamento em ordem cronológica;
- [ ] **CA02** — Cada registro mostra data, tipo de manutenção, técnico responsável e serviço realizado;
- [ ] **CA03** — O histórico pode ser filtrado por período e por tipo de manutenção;
- [ ] **CA04** — O painel exibe a quantidade de ordens por status (Aberta, Atribuída, Em execução, Concluída);
- [ ] **CA05** — O painel exibe a quantidade de ordens e preventivas atrasadas;
- [ ] **CA06** — O painel exibe os equipamentos com maior número de manutenções corretivas no período.

## Observações

- As histórias seguem as classes identificadas na ATA-001: `Usuario`, `Equipamento`, `Chamado`, `OrdemServico` e `Manutencao`;
- Critérios de aceite são validados pelo Tester (José Arraes) e aceitos pelo Product Owner.
