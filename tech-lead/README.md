# Tech Lead — Gerenciamento

Área que concentra o gerenciamento do projeto: direcionamento técnico, acompanhamento da equipe e documentos de produto.

> A organização em pastas não representa hierarquia entre papéis. Conforme o Scrum, o Product Owner responde pelo valor do produto e pelo backlog, e o Tech Lead pelo direcionamento técnico. Ver [papéis e responsabilidades](../docs/02-gestao/papeis-e-responsabilidades.md).

## Situação em 13/11/2026

Projeto encerrado formalmente pelo [TEP](../docs/06-encerramento/TEP.md).

| Sprint | Histórias | Status | Integrado na `main` |
|---|---|---|---|
| Sprint 0 | — | Concluída | 06/10 |
| Sprint 1 | UH01–UH03 | Concluída | 11/11 (PR #5) |
| Sprint 2 | UH04–UH07 | Concluída | 11/11 (PR #11) |
| Sprint 3 | UH08 | Concluída | 13/11 (PR #14) |
| Encerramento | Integração, regressão e TEP | TEP emitido | 13/11 (PRs #13, #18, #19, #20) |

- **Testes:** 50 de API e 23 de domínio, todos aprovados; pipeline verde na `main`.
- **Em aberto:** PR #21 (fontes locais do front); DEF-06 e DEF-14 no backlog para continuidade.
- **Reuniões:** quinzenais às terças, 19h — [ATA-002](../docs/05-reunioes/atas/ATA-002-reuniao-quinzenal-13-10.md) (13/10), [ATA-003](../docs/05-reunioes/atas/ATA-003-reuniao-quinzenal-27-10.md) (27/10), [ATA-004](../docs/05-reunioes/atas/ATA-004-reuniao-quinzenal-10-11.md) (10/11).

## Responsabilidades do Tech Lead

- Definir e manter a arquitetura e os padrões de código;
- Registrar decisões técnicas (ADRs);
- Revisar e aprovar Pull Requests;
- Distribuir e acompanhar as atribuições técnicas (Back-end, Front-end, Tester, DevOps);
- Apoiar a equipe na resolução de problemas técnicos.

## Conteúdo

| Pasta / Documento | Conteúdo |
|---|---|
| [product-owner](product-owner) | Backlog, histórias de usuário, personas e feedback do cliente |
| [atribuicoes-da-equipe.md](atribuicoes-da-equipe.md) | Mapeamento das atribuições de cada integrante |
| [padroes-de-codigo.md](padroes-de-codigo.md) | Convenções de código, branches e commits |

## Documentos de gestão relacionados

- [Scrum](../docs/02-gestao/scrum.md)
- [Product Backlog](../docs/02-gestao/product-backlog.md)
- [Plano de sprints](../docs/02-gestao/plano-de-sprints.md)
- [Roadmap](../docs/02-gestao/roadmap.md)
- [Atas de reunião](../docs/05-reunioes/atas)
- [Registro de decisões](../docs/05-reunioes/decisoes)
- [Decisões técnicas (ADRs)](../docs/03-arquitetura/decisoes-tecnicas)
- [Termo de Encerramento (TEP)](../docs/06-encerramento/TEP.md)
