# Front-end

Aplicação web do Operix.

## Responsável

Luíza Quintanilha.

## Tecnologias

| Item | Tecnologia | Decisão |
|---|---|---|
| Plataforma | Web | [ADR-002](../docs/03-arquitetura/decisoes-tecnicas/ADR-002-front-end.md) |
| Biblioteca de interface | React | [ADR-002](../docs/03-arquitetura/decisoes-tecnicas/ADR-002-front-end.md) |
| Estilização | Tailwind CSS | [ADR-002](../docs/03-arquitetura/decisoes-tecnicas/ADR-002-front-end.md) |
| Linguagem | [A DEFINIR] — TypeScript recomendado, para manter o mesmo padrão do back-end | — |
| Testes | Jest | [ADR-004](../docs/03-arquitetura/decisoes-tecnicas/ADR-004-testes.md) |

## Estrutura prevista

```
frontend/
├── public/          Arquivos estáticos
├── src/
│   ├── components/  Componentes reutilizáveis
│   ├── pages/       Telas
│   ├── services/    Comunicação com a API
│   └── styles/      Configuração do Tailwind e estilos globais
└── tests/           Testes do front-end
```

## Páginas previstas

| Página | História |
|---|---|
| Login | UH01 |
| Usuários | UH02 |
| Equipamentos | UH03 |
| Chamados | UH04 |
| Ordens de serviço | UH05, UH06 |
| Manutenção preventiva | UH07 |
| Histórico e painel de indicadores | UH08 |

## Integração com a API

Comunicação HTTP/JSON com a API REST do back-end. Os endpoints e formatos de dados seguem a documentação Swagger/OpenAPI. O endereço da API é configurado por variável de ambiente.

## Como executar

Instruções serão adicionadas na Sprint 1.
