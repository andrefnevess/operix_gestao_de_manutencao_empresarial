# Diagramas

Os diagramas são escritos em Mermaid (arquivos `.mmd`, editáveis) e exportados como imagem (`.png`). O GitHub também desenha os mesmos diagramas diretamente no [modelo de domínio](../modelo-de-dominio.md).

| Diagrama | Imagem | Fonte | Status |
|---|---|---|---|
| Visão geral do domínio | [visao-geral-dominio.png](visao-geral-dominio.png) | [visao-geral-dominio.mmd](visao-geral-dominio.mmd) | Concluído |
| Diagrama de classes | [classes.png](classes.png) | [classes.mmd](classes.mmd) | Concluído |
| Estados da ordem de serviço | [estados-ordem-servico.png](estados-ordem-servico.png) | [estados-ordem-servico.mmd](estados-ordem-servico.mmd) | Concluído |
| Sequência do fluxo principal | [sequencia-fluxo-principal.png](sequencia-fluxo-principal.png) | [sequencia-fluxo-principal.mmd](sequencia-fluxo-principal.mmd) | Concluído |
| Arquitetura e componentes | — | — | Pendente |
| Modelo de dados (banco) | Ver `backend/prisma/schema.prisma` | — | Em elaboração |

Para gerar as imagens novamente: `npx @mermaid-js/mermaid-cli -i classes.mmd -o classes.png -b white -s 2`.
