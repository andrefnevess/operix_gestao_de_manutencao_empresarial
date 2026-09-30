# ADR-001 — Linguagem e framework do back-end

| Item | Valor |
|---|---|
| Status | Proposta |
| Data | 30/09/2026 |
| Responsável | Tech Lead |

## Contexto

O projeto pertence à disciplina de Programação Orientada a Objetos e precisa demonstrar claramente os conceitos de POO. É necessário expor uma API REST com persistência em banco relacional.

## Alternativas consideradas

| Alternativa | Prós | Contras |
|---|---|---|
| Java + Spring Boot | Fortemente orientada a objetos, ecossistema maduro, alinhada à disciplina | Configuração inicial mais extensa |
| C# + ASP.NET Core | Orientada a objetos, boa produtividade | Menor familiaridade da equipe [a confirmar] |
| Python + Django | Produtividade alta | Tipagem dinâmica dificulta demonstrar alguns conceitos de POO |

## Decisão

Utilizar Java 21 com Spring Boot.

## Justificativa

Alinhamento com a disciplina, tipagem estática, suporte nativo a camadas (controller, service, repository) e ampla documentação.

## Consequências

- A equipe precisa dominar Maven e o ecossistema Spring;
- Facilita a demonstração de encapsulamento, herança, polimorfismo e abstração no domínio.
