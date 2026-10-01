# ADR-003 — Banco de dados e ORM

| Item | Valor |
|---|---|
| Status | Aceita |
| Data | 30/09/2026 |
| Responsável | André Neves (Tech Lead) com Gerardo Mota e Matheus Oliveira (Back-end) |

## Contexto

O domínio (equipamentos, chamados, ordens de serviço e manutenções) possui relacionamentos e regras de integridade bem definidos.

## Alternativas consideradas

[A DEFINIR] — registrar as demais opções avaliadas pela equipe, se houver.

## Decisão

Utilizar **PostgreSQL** como banco de dados e **Prisma** como ORM.

## Justificativa

- PostgreSQL é relacional, robusto e adequado para regras de negócio com integridade referencial;
- Prisma facilita a modelagem (`schema.prisma`), as migrations e o acesso tipado ao banco.

## Consequências

- O modelo de dados fica versionado no `schema.prisma` e nas migrations;
- Os tipos gerados pelo Prisma não são classes; as regras de negócio devem ficar em classes de domínio (ver [arquitetura](../arquitetura.md)).
