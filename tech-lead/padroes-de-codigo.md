# Padrões de Código

> Status: versão 1.0, vigente desde a Sprint 1 e aplicada nas revisões de Pull Request (DEC-013: revisão em até 48h).

## TypeScript (back-end e, se adotado, front-end)

- Classes, interfaces e tipos em `PascalCase`; variáveis, funções e métodos em `camelCase`; constantes em `UPPER_SNAKE_CASE`;
- Nomes de arquivos em `kebab-case` (ex.: `ordens-servico.service.ts`);
- Tipagem explícita; evitar `any`;
- Atributos `private` ou `protected` e alteração de estado por métodos de negócio (encapsulamento).

## NestJS (back-end)

- Um módulo por área de negócio;
- Controllers apenas recebem requisições e delegam; regras de negócio ficam em services e classes de domínio;
- Validação de entrada nos DTOs;
- Endpoints documentados com os decorators do Swagger;
- Acesso ao banco somente por meio do Prisma.

## Next.js / React (front-end)

- Componentes em `PascalCase`, um componente por arquivo;
- Estilização com classes do Tailwind CSS;
- Chamadas à API concentradas em `src/services`.

## Testes

- Testes unitários junto ao código (`*.spec.ts`), com Jest;
- Testes de API em `backend/tests`, com Supertest.

## Branches e commits

Ver [plano de comunicação](../docs/02-gestao/comunicacao.md).

## Revisão de código

- Todo Pull Request precisa de ao menos uma aprovação e do pipeline do GitHub Actions aprovado;
- O revisor verifica legibilidade, aplicação de POO, testes e aderência aos padrões.
