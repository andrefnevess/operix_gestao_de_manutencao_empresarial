// Os testes de API rodam sem banco de dados, com os dados de exemplo em memória.
process.env.PERSISTENCIA = 'memoria';
process.env.SENHA_EXEMPLO = 'senha-de-teste';
process.env.JWT_SECRET = 'segredo-de-teste';
