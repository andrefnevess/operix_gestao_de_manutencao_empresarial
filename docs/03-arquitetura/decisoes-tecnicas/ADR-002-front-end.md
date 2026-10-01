# ADR-002 — Tecnologia do front-end

| Item | Valor |
|---|---|
| Status | Aceita |
| Data | 30/09/2026 |
| Responsável | André Neves (Tech Lead) e Luíza Quintanilha (Front-end) |

## Contexto

É necessária uma interface web para gestores, técnicos e solicitantes, integrada à API do back-end.

## Alternativas consideradas

[A DEFINIR] — registrar as demais opções avaliadas pela equipe, se houver.

## Decisão

Utilizar **React** com **Tailwind CSS**.

## Justificativa

- Interface componentizada, com reaproveitamento de componentes entre as telas;
- Tailwind CSS agiliza a construção de interfaces consistentes e responsivas;
- Ampla documentação e comunidade.

## Consequências

- Componentes devem ser organizados por página e por elementos reutilizáveis;
- A comunicação com a API segue o contrato documentado no Swagger/OpenAPI.
