# Arquitetura de Solução

> Status: em elaboração. Campos marcados com `[A definir]` devem ser preenchidos pela equipe.

## Contexto

| Ator / Sistema | Interação com o Operix |
|---|---|
| Solicitante | Abre ordens de serviço |
| Técnico | Executa e registra ordens |
| Gestor | Gerencia ativos, planos preventivos e acompanha relatórios |
| Administrador | Gerencia usuários e perfis |

## Componentes

| Componente | Tecnologia (proposta) | Responsabilidade |
|---|---|---|
| Front-end | [A definir] | Interface web |
| API | Java 21 + Spring Boot | Regras de negócio e endpoints REST |
| Banco de dados | PostgreSQL | Persistência |
| Containers | Docker / Docker Compose | Padronização de ambientes |
| CI/CD | GitHub Actions | Build, testes e entrega |

## Modelo de domínio inicial

| Entidade | Principais atributos |
|---|---|
| Usuario | id, nome, email, senha (hash), perfil, ativo |
| Ativo | id, codigo, nome, tipo, localizacao, fabricante, status |
| Tecnico | id, usuario, especialidades |
| OrdemDeServico | id, ativo, solicitante, tecnico, descricao, prioridade, status, datas |
| PlanoPreventivo | id, ativo, descricao, periodicidade, proximaExecucao |
| RegistroManutencao | id, ordem, descricao, dataExecucao, tempoGasto |

## Ciclo de vida da Ordem de Serviço

```
ABERTA -> ATRIBUIDA -> EM_EXECUCAO -> CONCLUIDA
   |           |             |
   +-----------+-------------+--> CANCELADA
```

## Fluxo de entrega

Código -> Commit -> Pull Request -> Testes -> Build -> Deploy

## Diagramas

Os diagramas (contexto, componentes, classes, banco de dados e sequência) ficam em [diagramas](diagramas).
