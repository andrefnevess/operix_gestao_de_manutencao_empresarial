import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { configurarApp } from '../src/configurar-app';

// Os títulos seguem a numeração dos casos de teste em tester/casos-de-teste (CT-001 a CT-017).
const SENHA = 'senha-de-teste';

describe('API Operix (UH01, UH02, UH03)', () => {
  let app: INestApplication;
  let http: ReturnType<typeof request>;

  async function tokenDe(email: string): Promise<string> {
    const res = await request(app.getHttpServer()).post('/api/auth/login').send({ email, senha: SENHA }).expect(200);
    return res.body.token;
  }

  beforeAll(async () => {
    const modulo = await Test.createTestingModule({ imports: [AppModule] }).compile();
    app = configurarApp(modulo.createNestApplication());
    await app.init();
    http = request(app.getHttpServer());
  });

  afterAll(async () => {
    await app.close();
  });

  describe('UH01 — Autenticação', () => {
    it('CT-001: login com credenciais válidas retorna token e perfil', async () => {
      const res = await request(app.getHttpServer()).post('/api/auth/login').send({ email: 'gestor@operix.local', senha: SENHA }).expect(200);
      expect(res.body.token).toEqual(expect.any(String));
      expect(res.body.usuario).toMatchObject({ email: 'gestor@operix.local', perfil: 'GESTOR' });
      expect(res.body.usuario.senhaHash).toBeUndefined();
    });

    it('CT-002: credenciais inválidas retornam mensagem genérica', async () => {
      const senhaErrada = await request(app.getHttpServer()).post('/api/auth/login').send({ email: 'gestor@operix.local', senha: 'errada' }).expect(401);
      const emailInexistente = await request(app.getHttpServer()).post('/api/auth/login').send({ email: 'ninguem@operix.local', senha: SENHA }).expect(401);
      expect(senhaErrada.body.message).toBe('E-mail ou senha inválidos.');
      expect(emailInexistente.body.message).toBe('E-mail ou senha inválidos.');
    });

    it('CT-004: bloqueia após 5 tentativas sem sucesso', async () => {
      const admin = await tokenDe('admin@operix.local');
      await request(app.getHttpServer())
        .post('/api/usuarios')
        .set('Authorization', `Bearer ${admin}`)
        .send({ nome: 'Usuário Bloqueio', email: 'bloqueio@operix.local', senha: 'SenhaForte123', perfil: 'SOLICITANTE' })
        .expect(201);
      for (let i = 0; i < 5; i++) {
        await request(app.getHttpServer()).post('/api/auth/login').send({ email: 'bloqueio@operix.local', senha: 'errada' }).expect(401);
      }
      const res = await request(app.getHttpServer()).post('/api/auth/login').send({ email: 'bloqueio@operix.local', senha: 'SenhaForte123' }).expect(401);
      expect(res.body.message).toContain('bloqueado');
    });

    it('rotas protegidas exigem login', async () => {
      await request(app.getHttpServer()).get('/api/equipamentos').expect(401);
    });
  });

  describe('UH02 — Usuários e perfis', () => {
    it('CT-006: administrador cadastra técnico com especialidades', async () => {
      const admin = await tokenDe('admin@operix.local');
      const res = await request(app.getHttpServer())
        .post('/api/usuarios')
        .set('Authorization', `Bearer ${admin}`)
        .send({ nome: 'Técnica Nova', email: 'tecnica.nova@operix.local', senha: 'SenhaForte123', perfil: 'TECNICO', especialidades: ['Hidráulica'] })
        .expect(201);
      expect(res.body).toMatchObject({ perfil: 'TECNICO', ativo: true, especialidades: ['Hidráulica'] });
      expect(res.body.senha).toBeUndefined();
    });

    it('CT-007: não permite e-mail duplicado', async () => {
      const admin = await tokenDe('admin@operix.local');
      await request(app.getHttpServer())
        .post('/api/usuarios')
        .set('Authorization', `Bearer ${admin}`)
        .send({ nome: 'Duplicado', email: 'gestor@operix.local', senha: 'SenhaForte123', perfil: 'GESTOR' })
        .expect(409);
    });

    it('CT-003 / CT-010: usuário inativado não consegue entrar (UH01-CA04, UH02-CA05)', async () => {
      const admin = await tokenDe('admin@operix.local');
      const criado = await request(app.getHttpServer())
        .post('/api/usuarios')
        .set('Authorization', `Bearer ${admin}`)
        .send({ nome: 'Temporário', email: 'temporario@operix.local', senha: 'SenhaForte123', perfil: 'SOLICITANTE' })
        .expect(201);
      await request(app.getHttpServer()).patch(`/api/usuarios/${criado.body.id}/inativar`).set('Authorization', `Bearer ${admin}`).expect(200);
      await request(app.getHttpServer()).post('/api/auth/login').send({ email: 'temporario@operix.local', senha: 'SenhaForte123' }).expect(401);
    });

    it('CT-011: somente administradores acessam a gestão de usuários (UH02-CA06)', async () => {
      const gestor = await tokenDe('gestor@operix.local');
      await request(app.getHttpServer()).get('/api/usuarios').set('Authorization', `Bearer ${gestor}`).expect(403);
    });
  });

  describe('UH03 — Equipamentos', () => {
    it('CT-014 / CT-016: gestor cadastra equipamento, que nasce ativo', async () => {
      const gestor = await tokenDe('gestor@operix.local');
      const res = await request(app.getHttpServer())
        .post('/api/equipamentos')
        .set('Authorization', `Bearer ${gestor}`)
        .send({ codigo: 'bmb-010', nome: 'Bomba d\'água', tipo: 'Bomba', localizacao: 'Casa de máquinas' })
        .expect(201);
      expect(res.body).toMatchObject({ codigo: 'BMB-010', status: 'ATIVO', fabricante: null });
    });

    it('CT-012: campos obrigatórios são validados (UH03-CA01)', async () => {
      const gestor = await tokenDe('gestor@operix.local');
      const res = await request(app.getHttpServer())
        .post('/api/equipamentos')
        .set('Authorization', `Bearer ${gestor}`)
        .send({ codigo: 'X-1', nome: 'Sem tipo', localizacao: 'Galpão B' })
        .expect(400);
      expect(JSON.stringify(res.body.message)).toContain('tipo');
    });

    it('CT-013: código duplicado é recusado (RN01 / UH03-CA02)', async () => {
      const gestor = await tokenDe('gestor@operix.local');
      await request(app.getHttpServer())
        .post('/api/equipamentos')
        .set('Authorization', `Bearer ${gestor}`)
        .send({ codigo: 'cmp-001', nome: 'Outro compressor', tipo: 'Compressor', localizacao: 'Galpão C' })
        .expect(409);
    });

    it('CT-015 / CT-016 / CT-017: edição, inativação e busca (UH03-CA04 a CA06)', async () => {
      const gestor = await tokenDe('gestor@operix.local');
      const lista = await request(app.getHttpServer()).get('/api/equipamentos?busca=expedi').set('Authorization', `Bearer ${gestor}`).expect(200);
      expect(lista.body).toHaveLength(1);
      const id = lista.body[0].id;
      const editado = await request(app.getHttpServer())
        .put(`/api/equipamentos/${id}`)
        .set('Authorization', `Bearer ${gestor}`)
        .send({ codigo: 'EMP-002', nome: 'Empilhadeira elétrica 2t', tipo: 'Empilhadeira', localizacao: 'Expedição' })
        .expect(200);
      expect(editado.body.nome).toBe('Empilhadeira elétrica 2t');
      const inativo = await request(app.getHttpServer()).patch(`/api/equipamentos/${id}/inativar`).set('Authorization', `Bearer ${gestor}`).expect(200);
      expect(inativo.body.status).toBe('INATIVO');
    });

    it('CT-013 (permissão): solicitante consulta, mas não cadastra equipamentos', async () => {
      const solicitante = await tokenDe('solicitante@operix.local');
      await request(app.getHttpServer()).get('/api/equipamentos').set('Authorization', `Bearer ${solicitante}`).expect(200);
      await request(app.getHttpServer())
        .post('/api/equipamentos')
        .set('Authorization', `Bearer ${solicitante}`)
        .send({ codigo: 'Z-9', nome: 'Z', tipo: 'Z', localizacao: 'Z' })
        .expect(403);
    });
  });

  it('documentação Swagger disponível', async () => {
    await http.get('/api/docs-json').expect(200);
  });
});
