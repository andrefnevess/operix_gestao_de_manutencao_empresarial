# Back-end

API REST e regras de negócio do Operix.

> Status: não iniciado. Tecnologia proposta em [ADR-001](../docs/03-arquitetura/decisoes-tecnicas/ADR-001-linguagem-back-end.md).

## Tecnologias propostas

Java 21, Spring Boot, Spring Data JPA, PostgreSQL, JUnit, Maven.

## Estrutura de pacotes

```
backend/
├── pom.xml
├── src/main/java/br/com/operix/
│   ├── controller/   Endpoints REST
│   ├── service/      Regras de negócio
│   ├── repository/   Acesso a dados
│   ├── model/        Entidades de domínio
│   ├── dto/          Objetos de entrada e saída
│   ├── config/       Configurações
│   └── exception/    Tratamento de erros
└── tests/            Testes automatizados
```

## Aplicação de POO

Ver [docs/03-arquitetura/arquitetura.md](../docs/03-arquitetura/arquitetura.md).

## Como executar

Em elaboração.
