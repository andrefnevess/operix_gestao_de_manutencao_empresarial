# Casos de Uso

> Status: em elaboração. Campos marcados com `[A definir]` devem ser preenchidos pela equipe.

## Atores

Administrador, Gestor, Técnico, Solicitante.

## Lista de casos de uso

| ID | Caso de uso | Ator principal | Requisitos |
|---|---|---|---|
| UC01 | Autenticar usuário | Todos | RF01 |
| UC02 | Gerenciar usuários | Administrador | RF02 |
| UC03 | Gerenciar ativos | Gestor | RF03 |
| UC04 | Gerenciar técnicos | Gestor | RF04 |
| UC05 | Abrir ordem de serviço | Solicitante | RF05 |
| UC06 | Atribuir ordem de serviço | Gestor | RF06 |
| UC07 | Executar ordem de serviço | Técnico | RF07 |
| UC08 | Gerenciar plano preventivo | Gestor | RF08, RF09 |
| UC09 | Consultar histórico do ativo | Gestor | RF10 |
| UC10 | Emitir relatórios | Gestor | RF11 |

## Especificação — UC05 Abrir ordem de serviço

| Item | Descrição |
|---|---|
| Ator | Solicitante |
| Pré-condição | Usuário autenticado |
| Pós-condição | Ordem registrada com status ABERTA |

**Fluxo principal**

1. O solicitante acessa a opção "Nova ordem de serviço";
2. O sistema exibe o formulário;
3. O solicitante seleciona o ativo e descreve o problema;
4. O sistema valida os dados e registra a ordem com status ABERTA;
5. O sistema exibe o número da ordem.

**Fluxos alternativos**

- 4a. Ativo inativo: o sistema informa que não é possível abrir ordem para ativo inativo (RN03).

Os demais casos de uso seguem o mesmo modelo.
