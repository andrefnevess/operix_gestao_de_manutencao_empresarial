# CI/CD

Pipeline previsto (GitHub Actions):

| Etapa | Gatilho | Ação |
|---|---|---|
| Build | Pull Request e push na `main` | Compilar back-end e front-end |
| Testes | Pull Request e push na `main` | Executar testes automatizados |
| Análise | Pull Request | Verificação de padrões de código [opcional] |
| Deploy | Push na `main` | Publicação em ambiente de demonstração [a definir] |

Arquivo de referência: `pipeline.yml` (a criar).
