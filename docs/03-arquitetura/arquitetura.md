# Arquitetura

> Status: em elaboração. Tecnologias definidas em 30/09/2026 e registradas em [decisões técnicas](decisoes-tecnicas).

## Visão geral

Aplicação web em três camadas:

```
[ Navegador ]                [ Servidor ]                         [ Dados ]
React + Tailwind  --HTTP/JSON-->  API REST NestJS (TypeScript)  --Prisma-->  PostgreSQL
                                    |
                                    +-- Swagger/OpenAPI (documentação da API)
```

## Organização do back-end (NestJS)

O NestJS organiza a aplicação em **módulos**, um por área de negócio (ex.: `usuarios`, `equipamentos`, `chamados`, `ordens-servico`, `manutencoes`, `auth`). Cada módulo contém:

| Elemento | Responsabilidade |
|---|---|
| `module` | Agrupa e registra os componentes da área de negócio |
| `controller` | Recebe as requisições HTTP e devolve as respostas |
| `service` | Contém as regras de negócio |
| `dto` | Define e valida os dados de entrada e saída |
| `entities` / domínio | Classes do domínio com seu comportamento |
| `repository` | Acesso a dados por meio do Prisma |

O NestJS usa **injeção de dependência**: os serviços e repositórios são classes injetadas nos construtores, o que reduz o acoplamento e facilita os testes.

> Observação: o Prisma gera tipos a partir do `schema.prisma`, mas esses tipos não são classes. Para demonstrar POO, as regras de negócio devem ficar em **classes de domínio** em TypeScript (ex.: `OrdemServico` com os métodos `iniciar()` e `concluir()`), e o repositório converte os dados do Prisma para essas classes.

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
