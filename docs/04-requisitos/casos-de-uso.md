# Casos de Uso

> Status: versão 1.0 — alinhada ao [modelo de domínio](../03-arquitetura/modelo-de-dominio.md) e às histórias UH01–UH08.

## Atores

| Ator | Descrição |
|---|---|
| Administrador | Gerencia usuários e perfis |
| Gestor | Gerencia equipamentos, gera e atribui ordens de serviço, planeja preventivas e acompanha indicadores |
| Técnico | Executa ordens de serviço e registra as manutenções |
| Solicitante | Abre chamados de manutenção |

## Lista de casos de uso

| ID | Caso de uso | Ator principal | Requisitos | História |
|---|---|---|---|---|
| UC01 | Autenticar usuário | Todos | RF01 | UH01 |
| UC02 | Gerenciar usuários e perfis | Administrador | RF02 | UH02 |
| UC03 | Gerenciar equipamentos | Gestor | RF03 | UH03 |
| UC04 | Abrir chamado | Solicitante | RF04 | UH04 |
| UC05 | Gerar e atribuir ordem de serviço | Gestor | RF05 | UH05 |
| UC06 | Executar e encerrar ordem de serviço | Técnico | RF06 | UH06 |
| UC07 | Gerenciar plano preventivo | Gestor | RF07, RF08 | UH07 |
| UC08 | Consultar histórico e indicadores | Gestor | RF09, RF10 | UH08 |

## UC01 — Autenticar usuário

| Item | Descrição |
|---|---|
| Ator | Qualquer usuário cadastrado |
| Pré-condição | Usuário cadastrado e ativo |
| Pós-condição | Sessão iniciada com as permissões do perfil |

**Fluxo principal**

1. O usuário informa e-mail e senha;
2. O sistema valida as credenciais;
3. O sistema inicia a sessão e exibe a tela inicial do perfil.

**Fluxos alternativos**

- 2a. Credenciais inválidas: o sistema exibe mensagem genérica, sem indicar qual campo está incorreto (UH01 CA03);
- 2b. Usuário inativo: o sistema recusa o acesso (RN02);
- 2c. Cinco tentativas sem sucesso: o acesso é bloqueado temporariamente (UH01 CA05).

## UC03 — Gerenciar equipamentos

| Item | Descrição |
|---|---|
| Ator | Gestor |
| Pré-condição | Gestor autenticado |
| Pós-condição | Equipamento cadastrado ou atualizado |

**Fluxo principal**

1. O gestor acessa "Equipamentos" e escolhe "Novo equipamento";
2. Informa código, nome, tipo e localização (e, opcionalmente, fabricante e modelo);
3. O sistema valida os dados e a unicidade do código (RN01);
4. O sistema salva o equipamento com status ATIVO.

**Fluxos alternativos**

- 3a. Código já existente: o sistema informa que o código está em uso;
- 3b. Campo obrigatório vazio: o sistema indica o campo a preencher.

## UC04 — Abrir chamado

| Item | Descrição |
|---|---|
| Ator | Solicitante |
| Pré-condição | Usuário autenticado |
| Pós-condição | Chamado registrado com status ABERTO |

**Fluxo principal**

1. O solicitante acessa "Novo chamado";
2. Seleciona o equipamento, descreve o problema e informa a urgência;
3. O sistema valida os dados e registra o chamado com status ABERTO;
4. O sistema exibe o número do chamado.

**Fluxos alternativos**

- 3a. Equipamento inativo: o sistema informa que não é possível abrir chamado para equipamento inativo (RN03).

## UC05 — Gerar e atribuir ordem de serviço

| Item | Descrição |
|---|---|
| Ator | Gestor |
| Pré-condição | Chamado com status ABERTO |
| Pós-condição | Ordem de serviço ATRIBUIDA a um técnico; chamado EM_ATENDIMENTO |

**Fluxo principal**

1. O gestor seleciona um chamado aberto e escolhe "Gerar ordem de serviço";
2. O sistema cria a OS com o equipamento, a descrição e a urgência do chamado;
3. O gestor escolhe um técnico ativo e a data prevista;
4. O sistema atribui a OS ao técnico.

## UC06 — Executar e encerrar ordem de serviço

| Item | Descrição |
|---|---|
| Ator | Técnico |
| Pré-condição | OS ATRIBUIDA ao próprio técnico |
| Pós-condição | OS CONCLUIDA; manutenção registrada no histórico; equipamento ATIVO; chamado ENCERRADO |

**Fluxo principal**

1. O técnico abre a OS e escolhe "Iniciar";
2. O sistema muda a OS para EM_EXECUCAO e o equipamento para EM_MANUTENCAO;
3. Ao terminar, o técnico descreve o serviço, informa o tempo gasto e escolhe "Concluir";
4. O sistema registra a manutenção, conclui a OS, libera o equipamento e encerra o chamado.

**Fluxos alternativos**

- 1a. OS atribuída a outro técnico: o sistema recusa (UH06 CA01);
- 3a. Descrição vazia: o sistema exige a descrição do serviço (RN06).

Os casos UC02, UC07 e UC08 seguem o mesmo modelo e serão detalhados antes das sprints correspondentes.
