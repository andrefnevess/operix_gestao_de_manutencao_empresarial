# Front-end

Interface web do Operix.

> Status: não iniciado. Framework a definir em ADR.

## Framework

[A definir]

## Estrutura prevista

```
frontend/
├── public/        Arquivos estáticos
├── src/
│   ├── components/  Componentes reutilizáveis
│   ├── pages/       Telas (login, ativos, ordens, preventivas, relatórios)
│   ├── services/    Integração com a API
│   └── styles/      Estilos globais
└── tests/         Testes do front-end
```

## Páginas previstas

Login, Painel, Ativos, Técnicos, Ordens de Serviço, Planos Preventivos, Histórico, Relatórios.

## Integração com a API

Consumo da API REST do back-end; URL base configurada por variável de ambiente.

## Como executar

Em elaboração.
