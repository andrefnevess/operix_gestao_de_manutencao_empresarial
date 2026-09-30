# Arquitetura de Solução

> Status: pendente. Os componentes e tecnologias serão definidos pela equipe e registrados em [decisões técnicas](decisoes-tecnicas).

## Contexto

| Ator | Interação com o Operix |
|---|---|
| Solicitante | Abre chamados de manutenção |
| Técnico | Executa e registra ordens de serviço |
| Gestor | Gerencia equipamentos, planos preventivos e acompanha relatórios |
| Administrador | Gerencia usuários e perfis |

## Componentes

| Componente | Tecnologia | Responsabilidade |
|---|---|---|
| Front-end | [A DEFINIR] | Interface com o usuário |
| Back-end | [A DEFINIR] | Regras de negócio |
| Banco de dados | [A DEFINIR] | Persistência |
| Ambientes | [A DEFINIR] | Padronização dos ambientes de desenvolvimento e demonstração |
| CI/CD | [A DEFINIR] | Build, testes e entrega |

## Modelo de domínio inicial

Baseado nas classes identificadas na [ATA-001](../05-reunioes/atas/ATA-001-reuniao-inicial.md). Atributos a detalhar.

| Classe | Responsabilidade |
|---|---|
| Usuario | Pessoa que acessa o sistema, com um perfil de acesso |
| Equipamento | Bem que recebe manutenção (máquina, instalação, dispositivo) |
| Chamado | Solicitação de manutenção aberta por um usuário |
| OrdemServico | Execução planejada do atendimento de um chamado ou de uma preventiva |
| Manutencao | Registro da intervenção realizada (preventiva ou corretiva) |

## Ciclo de vida da Ordem de Serviço (proposta)

```
ABERTA -> ATRIBUIDA -> EM_EXECUCAO -> CONCLUIDA
   |           |             |
   +-----------+-------------+--> CANCELADA
```

## Fluxo de entrega

Código -> Commit -> Pull Request -> Revisão -> Testes -> Integração na `main`
