# Arquitetura

> Status: pendente. A arquitetura será definida após a escolha das tecnologias de back-end, front-end e banco de dados, e registrada em [decisões técnicas](decisoes-tecnicas).

## Visão geral

[A DEFINIR]

## Princípios que a equipe pretende seguir

- Separação de responsabilidades (interface, regras de negócio e persistência);
- Regras de negócio concentradas no domínio, e não na camada de interface;
- Princípios SOLID;
- Baixo acoplamento entre componentes;
- Configurações sensíveis fora do código-fonte.

## Aplicação de POO no domínio

Classes identificadas na [ATA-001](../05-reunioes/atas/ATA-001-reuniao-inicial.md): `Equipamento`, `Chamado`, `OrdemServico`, `Manutencao` e `Usuario`.

| Conceito | Aplicação prevista |
|---|---|
| Encapsulamento | Atributos privados e mudanças de estado por métodos de negócio (ex.: `ordemServico.iniciar()`, `ordemServico.concluir()`) |
| Herança | Ex.: `Manutencao` como base para `ManutencaoPreventiva` e `ManutencaoCorretiva` |
| Polimorfismo | Ex.: comportamento específico de cada tipo de manutenção (prazos, alertas) |
| Abstração | Classes abstratas e interfaces para os serviços do domínio |

A modelagem detalhada será feita no diagrama de classes ([diagramas](diagramas)).
