# Arquitetura de Solução

> Status: em elaboração. Tecnologias definidas em 30/09/2026 e registradas em [decisões técnicas](decisoes-tecnicas).

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
| Front-end | React + Tailwind CSS | Interface web com o usuário |
| Back-end | TypeScript + NestJS | API REST e regras de negócio |
| ORM | Prisma | Modelagem e acesso ao banco de dados, migrations |
| Banco de dados | PostgreSQL | Persistência |
| Documentação da API | Swagger / OpenAPI | Documentação interativa dos endpoints |
| Testes | Jest + Supertest | Testes unitários e testes de API |
| Ambientes | Docker | Padronização dos ambientes de desenvolvimento e demonstração |
| CI/CD | GitHub Actions | Build, testes e entrega a cada Pull Request |
| Versionamento | Git + GitHub | Código, Issues, Pull Requests e documentação |

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

Código -> Commit -> Pull Request -> GitHub Actions (build + testes Jest/Supertest) -> Revisão -> Integração na `main` -> Imagens Docker
