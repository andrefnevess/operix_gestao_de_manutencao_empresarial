import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { configurarApp } from '../src/configurar-app';

/**
 * Testes de API da UH08 (histórico e indicadores de manutenção).
 * Cada teste referencia o caso de teste (tester/casos-de-teste/CT-0NN) que ele automatiza.
 * Testes com `it.failing` documentam defeitos conhecidos (DEF-NN do relatório RT-003):
 * passam enquanto o defeito existir; depois da correção, troque `it.failing` por `it`.
 */

const SENHA = 'senha-de-teste';
const DIA_MS = 24 * 60 * 60 * 1000;

describe('API Operix (UH08)', () => {
  let app: INestApplication;
  const tokens: Record<string, string> = {};
  let tecnicoId: string;

  const api = () => request(app.getHttpServer());
  const auth = (perfil: string) => ({ Authorization: `Bearer ${tokens[perfil]}` });

  async function criarEquipamento(codigo: string): Promise<string> {
    const res = await api()
      .post('/api/equipamentos')
      .set(auth('gestor'))
      .send({ codigo, nome: `Equipamento ${codigo}`, tipo: 'Teste', localizacao: 'Laboratório de QA' })
      .expect(201);
    return res.body.id;
  }

  async function atribuir(ordemId: string, dataPrevista = new Date(Date.now() + DIA_MS)) {
    await api()
      .patch(`/api/ordens-servico/${ordemId}/atribuir`)
      .set(auth('gestor'))
      .send({ tecnicoId, dataPrevista: dataPrevista.toISOString() })
      .expect(200);
  }

  async function executar(ordemId: string, servico: string, tempo = 30) {
    await api().patch(`/api/ordens-servico/${ordemId}/iniciar`).set(auth('tecnico')).expect(200);
    await api()
      .patch(`/api/ordens-servico/${ordemId}/concluir`)
      .set(auth('tecnico'))
      .send({ descricaoServico: servico, tempoGastoMin: tempo })
      .expect(200);
  }

  /** Abre chamado, gera a OS e devolve o id da ordem (status ABERTA). */
  async function ordemCorretiva(equipamentoId: string): Promise<string> {
    const chamado = (
      await api()
        .post('/api/chamados')
        .set(auth('solicitante'))
        .send({ equipamentoId, descricao: 'Falha para o teste de histórico', urgencia: 'MEDIA' })
        .expect(201)
    ).body;
    return (await api().post('/api/ordens-servico').set(auth('gestor')).send({ chamadoId: chamado.id }).expect(201)).body.id;
  }

  async function corretivaConcluida(equipamentoId: string, servico: string, tempo = 30) {
    const ordemId = await ordemCorretiva(equipamentoId);
    await atribuir(ordemId);
    await executar(ordemId, servico, tempo);
    return ordemId;
  }

  async function preventivaConcluida(equipamentoId: string, servico: string) {
    const plano = (
      await api()
        .post('/api/planos')
        .set(auth('gestor'))
        .send({ equipamentoId, descricao: 'Preventiva do teste', periodicidadeDias: 30, inicio: new Date().toISOString() })
        .expect(201)
    ).body;
    const ordemId = (await api().post(`/api/planos/${plano.id}/gerar-ordem`).set(auth('gestor')).expect(201)).body.id;
    await atribuir(ordemId);
    await executar(ordemId, servico);
    return ordemId;
  }

  const historico = (equipamentoId: string, query = '') =>
    api().get(`/api/equipamentos/${equipamentoId}/historico${query}`).set(auth('gestor'));
  const indicadores = async () => (await api().get('/api/indicadores').set(auth('gestor')).expect(200)).body;

  beforeAll(async () => {
    const modulo = await Test.createTestingModule({ imports: [AppModule] }).compile();
    app = configurarApp(modulo.createNestApplication());
    await app.init();
    for (const perfil of ['admin', 'gestor', 'tecnico', 'solicitante']) {
      tokens[perfil] = (await api().post('/api/auth/login').send({ email: `${perfil}@operix.local`, senha: SENHA }).expect(200)).body.token;
    }
    const usuarios = (await api().get('/api/usuarios').set(auth('admin')).expect(200)).body;
    tecnicoId = usuarios.find((u: { email: string }) => u.email === 'tecnico@operix.local').id;
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Histórico do equipamento', () => {
    it('CT-040: lista todas as manutenções do equipamento em ordem cronológica (CA01)', async () => {
      const equipamentoId = await criarEquipamento('QA-040');
      const outroId = await criarEquipamento('QA-040B');
      const primeira = await corretivaConcluida(equipamentoId, 'Primeiro reparo');
      const segunda = await preventivaConcluida(equipamentoId, 'Primeira preventiva');
      await corretivaConcluida(outroId, 'Reparo de outro equipamento');

      const lista = (await historico(equipamentoId).expect(200)).body;
      expect(lista.map((m: { ordemId: string }) => m.ordemId)).toEqual([primeira, segunda]);
      const datas = lista.map((m: { data: string }) => new Date(m.data).getTime());
      expect(datas[0]).toBeLessThanOrEqual(datas[1]);
    });

    it('CT-041: cada registro mostra data, tipo, técnico e serviço realizado (CA02)', async () => {
      const equipamentoId = await criarEquipamento('QA-041');
      const ordemId = await corretivaConcluida(equipamentoId, 'Troca do rolamento do motor', 90);
      const [registro] = (await historico(equipamentoId).expect(200)).body;
      expect(registro).toMatchObject({
        ordemId,
        tipo: 'CORRETIVA',
        tecnico: 'Técnico de Campo',
        servico: 'Troca do rolamento do motor',
        tempoGastoMin: 90,
      });
      expect(new Date(registro.data).getTime()).not.toBeNaN();
    });

    it('CT-042: filtra o histórico por tipo de manutenção (CA03)', async () => {
      const equipamentoId = await criarEquipamento('QA-042');
      await corretivaConcluida(equipamentoId, 'Reparo');
      await preventivaConcluida(equipamentoId, 'Preventiva');
      const corretivas = (await historico(equipamentoId, '?tipo=CORRETIVA').expect(200)).body;
      const preventivas = (await historico(equipamentoId, '?tipo=PREVENTIVA').expect(200)).body;
      expect(corretivas.map((m: { tipo: string }) => m.tipo)).toEqual(['CORRETIVA']);
      expect(preventivas.map((m: { tipo: string }) => m.tipo)).toEqual(['PREVENTIVA']);
    });

    it('CT-043: filtra o histórico por período com data e hora (CA03)', async () => {
      const equipamentoId = await criarEquipamento('QA-043');
      await corretivaConcluida(equipamentoId, 'Reparo');
      const ontem = new Date(Date.now() - DIA_MS).toISOString();
      const amanha = new Date(Date.now() + DIA_MS).toISOString();
      expect((await historico(equipamentoId, `?de=${ontem}&ate=${amanha}`).expect(200)).body).toHaveLength(1);
      expect((await historico(equipamentoId, `?de=${amanha}`).expect(200)).body).toHaveLength(0);
      expect((await historico(equipamentoId, `?ate=${ontem}`).expect(200)).body).toHaveLength(0);
    });

    it('CT-043 / DEF-12: filtro "ate" só com a data (AAAA-MM-DD) deve incluir o próprio dia', async () => {
      const equipamentoId = await criarEquipamento('QA-043B');
      await corretivaConcluida(equipamentoId, 'Reparo');
      const hoje = new Date().toISOString().slice(0, 10);
      expect((await historico(equipamentoId, `?de=${hoje}&ate=${hoje}`).expect(200)).body).toHaveLength(1);
    });

    it('histórico de equipamento inexistente retorna 404', async () => {
      await historico('00000000-0000-4000-8000-000000000000').expect(404);
    });
  });

  describe('Painel de indicadores', () => {
    it('CT-044: mostra a quantidade de ordens por status (CA04)', async () => {
      const antes = (await indicadores()).ordensPorStatus;
      expect(Object.keys(antes)).toEqual(expect.arrayContaining(['ABERTA', 'ATRIBUIDA', 'EM_EXECUCAO', 'CONCLUIDA']));

      const equipamentoId = await criarEquipamento('QA-044');
      await ordemCorretiva(equipamentoId);
      const atribuida = await ordemCorretiva(equipamentoId);
      await atribuir(atribuida);
      await corretivaConcluida(equipamentoId, 'Reparo');

      const depois = (await indicadores()).ordensPorStatus;
      expect(depois.ABERTA - antes.ABERTA).toBe(1);
      expect(depois.ATRIBUIDA - antes.ATRIBUIDA).toBe(1);
      expect(depois.CONCLUIDA - antes.CONCLUIDA).toBe(1);
    });

    it('CT-045: mostra a quantidade de ordens e preventivas atrasadas (CA05)', async () => {
      const antes = await indicadores();
      const equipamentoId = await criarEquipamento('QA-045');
      const ordemId = await ordemCorretiva(equipamentoId);
      await atribuir(ordemId, new Date(Date.now() - DIA_MS));
      await api()
        .post('/api/planos')
        .set(auth('gestor'))
        .send({ equipamentoId, descricao: 'Plano vencido', periodicidadeDias: 30, inicio: new Date(Date.now() - 40 * DIA_MS).toISOString() })
        .expect(201);

      const depois = await indicadores();
      expect(depois.ordensAtrasadas - antes.ordensAtrasadas).toBe(1);
      expect(depois.preventivasAtrasadas - antes.preventivasAtrasadas).toBe(1);
    });

    it('CT-046: lista os equipamentos com mais manutenções corretivas, do maior para o menor (CA06)', async () => {
      const equipamentoId = await criarEquipamento('QA-046');
      for (let i = 0; i < 4; i++) await corretivaConcluida(equipamentoId, `Reparo ${i + 1}`);
      await preventivaConcluida(equipamentoId, 'Preventiva não conta');

      const ranking = (await indicadores()).equipamentosMaisCorretivas;
      expect(ranking[0]).toMatchObject({ equipamentoId, codigo: 'QA-046', corretivas: 4 });
      const totais = ranking.map((e: { corretivas: number }) => e.corretivas);
      expect([...totais].sort((a, b) => b - a)).toEqual(totais);
      expect(ranking.length).toBeLessThanOrEqual(5);
    });

    it('CT-047: histórico e indicadores são restritos ao gestor (403 para os demais)', async () => {
      const equipamentoId = await criarEquipamento('QA-047');
      for (const perfil of ['tecnico', 'solicitante', 'admin']) {
        await api().get('/api/indicadores').set(auth(perfil)).expect(403);
        await api().get(`/api/equipamentos/${equipamentoId}/historico`).set(auth(perfil)).expect(403);
      }
      await api().get('/api/indicadores').expect(401);
    });
  });
});
