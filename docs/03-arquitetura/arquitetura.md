# Arquitetura

> Status: em elaboração. Campos marcados com `[A definir]` devem ser preenchidos pela equipe.

## Visão geral

O Operix segue uma arquitetura cliente-servidor em camadas, com separação clara entre interface, regras de negócio e persistência.

```
[ Navegador ] --HTTP/JSON--> [ API REST (Java) ] --JPA--> [ Banco relacional ]
```

## Princípios

- Separação de responsabilidades por camadas;
- Modelo de domínio orientado a objetos, com regras de negócio nas classes de domínio e serviços, nunca nos controllers;
- Princípios SOLID;
- Baixo acoplamento via interfaces;
- Configuração externa por variáveis de ambiente.

## Camadas do back-end

| Camada | Pacote | Responsabilidade |
|---|---|---|
| Apresentação | `controller` | Receber requisições e devolver respostas |
| Transferência | `dto` | Objetos de entrada e saída da API |
| Aplicação | `service` | Orquestração e regras de negócio |
| Domínio | `model` | Entidades e comportamento do domínio |
| Persistência | `repository` | Acesso a dados |
| Infraestrutura | `config`, `exception` | Configurações e tratamento de erros |

## Aplicação de POO no domínio

| Conceito | Aplicação prevista |
|---|---|
| Encapsulamento | Atributos privados e alterações de estado por métodos de negócio (ex.: `ordem.iniciar()`, `ordem.concluir()`) |
| Herança | `Usuario` como base para `Gestor`, `Tecnico` e `Solicitante`; `Manutencao` como base para `ManutencaoPreventiva` e `ManutencaoCorretiva` |
| Polimorfismo | Cálculo de prazo e prioridade específico para cada tipo de manutenção |
| Abstração | Classes abstratas e interfaces para serviços e repositórios |

Documentos relacionados: [arquitetura-de-solucao.md](arquitetura-de-solucao.md), [diagramas](diagramas), [decisões técnicas](decisoes-tecnicas).
