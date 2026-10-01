# Ambientes

| Ambiente | Finalidade | Hospedagem / ferramenta |
|---|---|---|
| Local | Desenvolvimento | Docker Compose (API, front-end e PostgreSQL) |
| Demonstração | Apresentações e validação | [A DEFINIR] |

## Variáveis de ambiente previstas

| Variável | Uso |
|---|---|
| `DATABASE_URL` | Conexão do Prisma com o PostgreSQL |
| `JWT_SECRET` ou equivalente | Assinatura das sessões de autenticação |
| `PORT` | Porta da API |
| `VITE_API_URL` ou equivalente | Endereço da API usado pelo front-end |

Senhas, chaves e endereços de conexão ficam em variáveis de ambiente e nunca são versionados. Ver [política de segurança](../../docs/07-compliance/seguranca-da-informacao.md).
