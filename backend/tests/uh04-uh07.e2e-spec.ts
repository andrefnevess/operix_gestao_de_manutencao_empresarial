import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { configurarApp } from '../src/configurar-app';

/**
 * Testes de API das histórias UH04 a UH07 (chamados, ordens de serviço, execução e preventiva).
 * Cada teste referencia o caso de teste (tester/casos-de-teste/CT-0NN) que ele automatiza.
 *
 * Testes marcados com `it.failing` documentam defeitos conhecidos (DEF-NN do relatório RT-002):
 * eles descrevem o comportamento ESPERADO e passam enquanto o defeito existir.
 * Quando o defeito for corrigido, o Jest avisa e basta trocar `it.failing` por `it`.
 */

const SENHA = 'senha-de-teste';
const DIA_MS = 24 * 60 * 60 * 1000;

describe('API Operix (UH04, UH05, UH06, UH07)', () => {
  let app: INestApplication;
  const tokens: Record<string, string> = {};
  let tecnicoId: string;
  let solicitanteId: string;

  const api = () => request(app.getHttpServer());
  const auth = (perfil: string) => ({ Authorization: `Bearer ${tokens[perfil]}` });

  async function login(email: string, senha = SENHA): Promise<string> {
    const res = await api().post('/api/auth/login').send({ email, senha }).expect(200);
    return res.body.token;
  }

  async function criarUsuario(nome: string, email: string, perfil: string): Promise<string> {
    const res = await api()
      .post('/api/usuarios')
      .set(auth('admin'))
      .send({ nome, email, senha: 'SenhaForte123', perfil })
      .expect(201);
    return res.body.id;
  }

  async function criarEquipamento(codigo: string): Promise<string> {
    const res = await api()
      .post('/api/equipamentos')
      .set(auth('gestor'))
      .send({ codigo, nome: `Equipamento ${codigo}`, tipo: 'Teste', localizacao: 'Laboratório de QA' })
      .expect(201);
    return res.body.id;
  }

  function abrirChamado(equipamentoId: string, perfil = 'solicitante', urgencia = 'ALTA') {
    return api()
      .post('/api/chamados')
      .set(auth(perfil))
      .send({ equipamentoId, descricao: 'Equipamento fazendo ruído alto', urgencia });
  }

  function gerarOrdem(chamadoId: string) {
    return api().post('/api/ordens-servico').set(auth('gestor')).send({ chamadoId });
  }

  function atribuir(ordemId: string, idTecnico = tecnicoId) {
    const dataPrevista = new Date(Date.now() + DIA_MS).toISOString();
    return api().patch(`/api/ordens-servico/${ordemId}/atribuir`).set(auth('gestor')).send({ tecnicoId: idTecnico, dataPrevista });
  }

  /** Cria equipamento, chamado e ordem atribuída ao técnico de exemplo. */
  async function ordemAtribuida(codigo: string) {
    const equipamentoId = await criarEquipamento(codigo);
    const chamado = (await abrirChamado(equipamentoId)).body;
    const ordem = (await gerarOrdem(chamado.id)).body;
    await atribuir(ordem.id).expect(200);
    return { equipamentoId, chamadoId: chamado.id as string, ordemId: ordem.id as string };
  }

  beforeAll(async () => {
    const modulo = await Test.createTestingModule({ imports: [AppModule] }).compile();
    app = configurarApp(modulo.createNestApplication());
    await app.init();

    for (const perfil of ['admin', 'gestor', 'tecnico', 'solicitante']) {
      tokens[perfil] = await login(`${perfil}@operix.local`);
    }
    const usuarios = (await api().get('/api/usuarios').set(auth('admin')).expect(200)).body;
    tecnicoId = usuarios.find((u: { email: string }) => u.email === 'tecnico@operix.local').id;
    solicitanteId = usuarios.find((u: { email: string }) => u.email === 'solicitante@operix.local').id;

    await criarUsuario('Técnico QA 2', 'tecnico2.qa@operix.local', 'TECNICO');
    tokens['tecnico2'] = await login('tecnico2.qa@operix.local', 'SenhaForte123');
    await criarUsuario('Solicitante QA 2', 'solicitante2.qa@operix.local', 'SOLICITANTE');
    tokens['solicitante2'] = await login('solicitante2.qa@operix.local', 'SenhaForte123');
  });

  afterAll(async () => {
    await app.close();
  });

  describe('UH04 — Abertura de chamado', () => {
    it('CT-018: solicitante abre chamado com equipamento, descrição e urgência; recebe id e status ABERTO', async () => {
      const equipamentoId = await criarEquipamento('QA-018');
      const res = await abrirChamado(equipamentoId).expect(201);
      expect(res.body).toMatchObject({ equipamentoId, urgencia: 'ALTA', status: 'ABERTO', descricao: 'Equipamento fazendo ruído alto' });
      expect(res.body.id).toMatch(/^[0-9a-f-]{36}$/);
      await api().get(`/api/chamados/${res.body.id}`).set(auth('solicitante')).expect(200);
    });

    it('CT-019: descrição obrigatória (vazia e só com espaços)', async () => {
      const equipamentoId = await criarEquipamento('QA-019');
      await api().post('/api/chamados').set(auth('solicitante')).send({ equipamentoId, descricao: '', urgencia: 'BAIXA' }).expect(400);
      const espacos = await api().post('/api/chamados').set(auth('solicitante')).send({ equipamentoId, descricao: '   ', urgencia: 'BAIXA' });
      expect([400, 422]).toContain(espacos.status);
    });

    it('CT-020: aceita as urgências BAIXA, MEDIA, ALTA e CRITICA e recusa valor inválido', async () => {
      const equipamentoId = await criarEquipamento('QA-020');
      for (const urgencia of ['BAIXA', 'MEDIA', 'ALTA', 'CRITICA']) {
        const res = await abrirChamado(equipamentoId, 'solicitante', urgencia).expect(201);
        expect(res.body.urgencia).toBe(urgencia);
      }
      await abrirChamado(equipamentoId, 'solicitante', 'URGENTE').expect(400);
    });

    it('CT-021: não abre chamado para equipamento inativo (RN03)', async () => {
      const equipamentoId = await criarEquipamento('QA-021');
      await api().patch(`/api/equipamentos/${equipamentoId}/inativar`).set(auth('gestor')).expect(200);
      const res = await abrirChamado(equipamentoId).expect(422);
      expect(res.body.regra).toBe('RN03');
    });

    it('CT-022: solicitante acompanha o status do chamado que abriu', async () => {
      const equipamentoId = await criarEquipamento('QA-022');
      const chamado = (await abrirChamado(equipamentoId).expect(201)).body;
      await gerarOrdem(chamado.id).expect(201);
      const lista = (await api().get('/api/chamados').set(auth('solicitante')).expect(200)).body;
      expect(lista.find((c: { id: string }) => c.id === chamado.id)).toMatchObject({ status: 'EM_ATENDIMENTO' });
    });

    it.failing('CT-022 / DEF-06: solicitante não deve ver chamados de outros solicitantes', async () => {
      const equipamentoId = await criarEquipamento('QA-022B');
      const chamado = (await abrirChamado(equipamentoId).expect(201)).body;
      const lista = (await api().get('/api/chamados').set(auth('solicitante2')).expect(200)).body;
      expect(lista.map((c: { id: string }) => c.id)).not.toContain(chamado.id);
    });

    it('CT-023: técnico e administrador não abrem chamado; gestor abre', async () => {
      const equipamentoId = await criarEquipamento('QA-023');
      const tecnico = await abrirChamado(equipamentoId, 'tecnico');
      const admin = await abrirChamado(equipamentoId, 'admin');
      expect(tecnico.status).toBeGreaterThanOrEqual(400);
      expect(admin.status).toBeGreaterThanOrEqual(400);
      await abrirChamado(equipamentoId, 'gestor').expect(201);
    });

    it.failing('DEF-07: técnico ou outro solicitante não devem cancelar o chamado de alguém', async () => {
      const equipamentoId = await criarEquipamento('QA-023B');
      const chamado = (await abrirChamado(equipamentoId).expect(201)).body;
      await api().patch(`/api/chamados/${chamado.id}/cancelar`).set(auth('tecnico')).expect(403);
      await api().patch(`/api/chamados/${chamado.id}/cancelar`).set(auth('solicitante2')).expect(403);
    });

    it('rotas de chamados exigem login', async () => {
      await api().get('/api/chamados').expect(401);
    });
  });

  describe('UH05 — Geração e atribuição de OS', () => {
    it('CT-024: gestor gera OS a partir de chamado aberto; OS herda equipamento e urgência', async () => {
      const equipamentoId = await criarEquipamento('QA-024');
      const chamado = (await abrirChamado(equipamentoId, 'solicitante', 'CRITICA').expect(201)).body;
      const ordem = (await gerarOrdem(chamado.id).expect(201)).body;
      expect(ordem).toMatchObject({ status: 'ABERTA', equipamentoId, prioridade: 'CRITICA', chamadoId: chamado.id, tecnicoId: null });
      const depois = (await api().get(`/api/chamados/${chamado.id}`).set(auth('gestor')).expect(200)).body;
      expect(depois.status).toBe('EM_ATENDIMENTO');
    });

    it('CT-025: não gera segunda OS para chamado que não está aberto', async () => {
      const equipamentoId = await criarEquipamento('QA-025');
      const chamado = (await abrirChamado(equipamentoId).expect(201)).body;
      await gerarOrdem(chamado.id).expect(201);
      await gerarOrdem(chamado.id).expect(422);
    });

    it('CT-026: gestor atribui a OS a técnico ativo com data prevista; OS fica ATRIBUIDA', async () => {
      const equipamentoId = await criarEquipamento('QA-026');
      const chamado = (await abrirChamado(equipamentoId).expect(201)).body;
      const ordem = (await gerarOrdem(chamado.id).expect(201)).body;
      const res = await atribuir(ordem.id).expect(200);
      expect(res.body).toMatchObject({ status: 'ATRIBUIDA', tecnicoId });
      expect(res.body.dataPrevista).toEqual(expect.any(String));
    });

    it('CT-027: não atribui a solicitante nem a técnico inativo (UH05-CA03)', async () => {
      const inativoId = await criarUsuario('Técnico Inativo', 'tecnico.inativo@operix.local', 'TECNICO');
      await api().patch(`/api/usuarios/${inativoId}/inativar`).set(auth('admin')).expect(200);
      const equipamentoId = await criarEquipamento('QA-027');
      const chamado = (await abrirChamado(equipamentoId).expect(201)).body;
      const ordem = (await gerarOrdem(chamado.id).expect(201)).body;
      await atribuir(ordem.id, solicitanteId).expect(422);
      await atribuir(ordem.id, inativoId).expect(422);
    });

    it('CT-028: técnico vê na lista apenas as ordens atribuídas a ele', async () => {
      const { ordemId } = await ordemAtribuida('QA-028');
      const doTecnico = (await api().get('/api/ordens-servico').set(auth('tecnico')).expect(200)).body;
      const doOutro = (await api().get('/api/ordens-servico').set(auth('tecnico2')).expect(200)).body;
      expect(doTecnico.map((o: { id: string }) => o.id)).toContain(ordemId);
      expect(doOutro.map((o: { id: string }) => o.id)).not.toContain(ordemId);
    });

    it('CT-029: somente o gestor gera, atribui e cancela OS (403 para técnico e solicitante)', async () => {
      const equipamentoId = await criarEquipamento('QA-029');
      const chamado = (await abrirChamado(equipamentoId).expect(201)).body;
      for (const perfil of ['tecnico', 'solicitante']) {
        await api().post('/api/ordens-servico').set(auth(perfil)).send({ chamadoId: chamado.id }).expect(403);
      }
      const ordem = (await gerarOrdem(chamado.id).expect(201)).body;
      for (const perfil of ['tecnico', 'solicitante']) {
        await api()
          .patch(`/api/ordens-servico/${ordem.id}/atribuir`)
          .set(auth(perfil))
          .send({ tecnicoId, dataPrevista: new Date().toISOString() })
          .expect(403);
        await api().patch(`/api/ordens-servico/${ordem.id}/cancelar`).set(auth(perfil)).send({ motivo: 'teste' }).expect(403);
      }
      const cancelada = await api().patch(`/api/ordens-servico/${ordem.id}/cancelar`).set(auth('gestor')).send({ motivo: 'Teste de QA' }).expect(200);
      expect(cancelada.body.status).toBe('CANCELADA');
    });
  });

  describe('UH06 — Execução e encerramento da OS', () => {
    it('CT-030: técnico atribuído inicia; OS EM_EXECUCAO e equipamento EM_MANUTENCAO', async () => {
      const { ordemId, equipamentoId } = await ordemAtribuida('QA-030');
      const res = await api().patch(`/api/ordens-servico/${ordemId}/iniciar`).set(auth('tecnico')).expect(200);
      expect(res.body.status).toBe('EM_EXECUCAO');
      const equipamento = (await api().get(`/api/equipamentos/${equipamentoId}`).set(auth('gestor')).expect(200)).body;
      expect(equipamento.status).toBe('EM_MANUTENCAO');
    });

    it('CT-031: não inicia OS não atribuída (RN04) nem por outro técnico (RN10)', async () => {
      const equipamentoId = await criarEquipamento('QA-031');
      const chamado = (await abrirChamado(equipamentoId).expect(201)).body;
      const aberta = (await gerarOrdem(chamado.id).expect(201)).body;
      await api().patch(`/api/ordens-servico/${aberta.id}/iniciar`).set(auth('tecnico')).expect(422);

      const { ordemId } = await ordemAtribuida('QA-031B');
      const res = await api().patch(`/api/ordens-servico/${ordemId}/iniciar`).set(auth('tecnico2')).expect(422);
      expect(res.body.regra).toBe('RN10');
      await api().patch(`/api/ordens-servico/${ordemId}/iniciar`).set(auth('solicitante')).expect(403);
    });

    it('CT-032: não conclui sem descrição do serviço (RN06); OS continua EM_EXECUCAO', async () => {
      const { ordemId } = await ordemAtribuida('QA-032');
      await api().patch(`/api/ordens-servico/${ordemId}/iniciar`).set(auth('tecnico')).expect(200);
      await api().patch(`/api/ordens-servico/${ordemId}/concluir`).set(auth('tecnico')).send({ descricaoServico: '', tempoGastoMin: 30 }).expect(400);
      const espacos = await api().patch(`/api/ordens-servico/${ordemId}/concluir`).set(auth('tecnico')).send({ descricaoServico: '   ', tempoGastoMin: 30 });
      expect([400, 422]).toContain(espacos.status);
      await api().patch(`/api/ordens-servico/${ordemId}/concluir`).set(auth('tecnico')).send({ descricaoServico: 'Troca do rolamento', tempoGastoMin: 0 }).expect(400);
      const ordem = (await api().get(`/api/ordens-servico/${ordemId}`).set(auth('tecnico')).expect(200)).body;
      expect(ordem.status).toBe('EM_EXECUCAO');
    });

    it('CT-033: conclusão encerra o chamado e libera o equipamento', async () => {
      const { ordemId, chamadoId, equipamentoId } = await ordemAtribuida('QA-033');
      await api().patch(`/api/ordens-servico/${ordemId}/iniciar`).set(auth('tecnico')).expect(200);
      const res = await api()
        .patch(`/api/ordens-servico/${ordemId}/concluir`)
        .set(auth('tecnico'))
        .send({ descricaoServico: 'Troca do rolamento do motor', tempoGastoMin: 90 })
        .expect(200);
      expect(res.body.status).toBe('CONCLUIDA');
      const chamado = (await api().get(`/api/chamados/${chamadoId}`).set(auth('solicitante')).expect(200)).body;
      expect(chamado.status).toBe('ENCERRADO');
      const equipamento = (await api().get(`/api/equipamentos/${equipamentoId}`).set(auth('gestor')).expect(200)).body;
      expect(equipamento.status).toBe('ATIVO');
    });

    it('CT-034: OS concluída ou cancelada não pode ser alterada (RN05)', async () => {
      const { ordemId } = await ordemAtribuida('QA-034');
      await api().patch(`/api/ordens-servico/${ordemId}/iniciar`).set(auth('tecnico')).expect(200);
      await api().patch(`/api/ordens-servico/${ordemId}/concluir`).set(auth('tecnico')).send({ descricaoServico: 'Serviço feito', tempoGastoMin: 20 }).expect(200);
      await api().patch(`/api/ordens-servico/${ordemId}/iniciar`).set(auth('tecnico')).expect(422);
      await api().patch(`/api/ordens-servico/${ordemId}/concluir`).set(auth('tecnico')).send({ descricaoServico: 'De novo', tempoGastoMin: 20 }).expect(422);
      await atribuir(ordemId).expect(422);
      await api().patch(`/api/ordens-servico/${ordemId}/cancelar`).set(auth('gestor')).send({ motivo: 'Tentativa' }).expect(422);

      const equipamentoId = await criarEquipamento('QA-034B');
      const chamado = (await abrirChamado(equipamentoId).expect(201)).body;
      const ordem = (await gerarOrdem(chamado.id).expect(201)).body;
      await api().patch(`/api/ordens-servico/${ordem.id}/cancelar`).set(auth('gestor')).send({ motivo: 'Duplicada' }).expect(200);
      await atribuir(ordem.id).expect(422);
    });
  });

  describe('UH07 — Manutenção preventiva', () => {
    function criarPlano(equipamentoId: string, periodicidadeDias: number, inicio: Date) {
      return api()
        .post('/api/planos')
        .set(auth('gestor'))
        .send({ equipamentoId, descricao: 'Limpeza dos filtros', periodicidadeDias, inicio: inicio.toISOString() });
    }

    it('CT-035: gestor cria plano para equipamento ativo; próxima data = início + periodicidade', async () => {
      const equipamentoId = await criarEquipamento('QA-035');
      const inicio = new Date('2026-11-10T00:00:00.000Z');
      const res = await criarPlano(equipamentoId, 30, inicio).expect(201);
      expect(res.body).toMatchObject({ equipamentoId, periodicidadeDias: 30, ativo: true });
      expect(new Date(res.body.proximaData).getTime()).toBe(inicio.getTime() + 30 * DIA_MS);
    });

    it('CT-036: recusa plano para equipamento inativo, periodicidade inválida e descrição vazia', async () => {
      const inativoId = await criarEquipamento('QA-036');
      await api().patch(`/api/equipamentos/${inativoId}/inativar`).set(auth('gestor')).expect(200);
      await criarPlano(inativoId, 30, new Date()).expect(422);

      const equipamentoId = await criarEquipamento('QA-036B');
      await criarPlano(equipamentoId, 0, new Date()).expect(400);
      await criarPlano(equipamentoId, -5, new Date()).expect(400);
      await api()
        .post('/api/planos')
        .set(auth('gestor'))
        .send({ equipamentoId, descricao: '', periodicidadeDias: 30, inicio: new Date().toISOString() })
        .expect(400);
    });

    it('CT-037: alerta lista planos que vencem em até 7 dias', async () => {
      const equipamentoId = await criarEquipamento('QA-037');
      const vence5 = (await criarPlano(equipamentoId, 30, new Date(Date.now() - 25 * DIA_MS)).expect(201)).body;
      const vence30 = (await criarPlano(equipamentoId, 30, new Date()).expect(201)).body;
      const alertas = (await api().get('/api/planos/alertas/vencendo').set(auth('gestor')).expect(200)).body;
      const ids = alertas.map((p: { id: string }) => p.id);
      expect(ids).toContain(vence5.id);
      expect(ids).not.toContain(vence30.id);
    });

    it('CT-038: preventiva vencida aparece como atrasada', async () => {
      const equipamentoId = await criarEquipamento('QA-038');
      const atrasado = (await criarPlano(equipamentoId, 30, new Date(Date.now() - 40 * DIA_MS)).expect(201)).body;
      const atrasados = (await api().get('/api/planos/alertas/atrasados').set(auth('gestor')).expect(200)).body;
      const vencendo = (await api().get('/api/planos/alertas/vencendo').set(auth('gestor')).expect(200)).body;
      expect(atrasados.map((p: { id: string }) => p.id)).toContain(atrasado.id);
      expect(vencendo.map((p: { id: string }) => p.id)).not.toContain(atrasado.id);
    });

    it('CT-039: gera OS preventiva a partir do plano e atualiza a última execução ao concluir', async () => {
      const equipamentoId = await criarEquipamento('QA-039');
      const plano = (await criarPlano(equipamentoId, 30, new Date(Date.now() - 25 * DIA_MS)).expect(201)).body;
      const ordem = (await api().post(`/api/planos/${plano.id}/gerar-ordem`).set(auth('gestor')).expect(201)).body;
      expect(ordem).toMatchObject({ status: 'ABERTA', equipamentoId, chamadoId: null });

      await atribuir(ordem.id).expect(200);
      await api().patch(`/api/ordens-servico/${ordem.id}/iniciar`).set(auth('tecnico')).expect(200);
      await api().patch(`/api/ordens-servico/${ordem.id}/concluir`).set(auth('tecnico')).send({ descricaoServico: 'Filtros limpos', tempoGastoMin: 40 }).expect(200);

      const depois = (await api().get(`/api/planos/${plano.id}`).set(auth('gestor')).expect(200)).body;
      expect(new Date(depois.ultimaExecucao).getTime()).toBeGreaterThan(new Date(plano.ultimaExecucao).getTime());
      expect(new Date(depois.proximaData).getTime()).toBeGreaterThan(Date.now() + 29 * DIA_MS);
      const vencendo = (await api().get('/api/planos/alertas/vencendo').set(auth('gestor')).expect(200)).body;
      expect(vencendo.map((p: { id: string }) => p.id)).not.toContain(plano.id);
    });

    it('somente o gestor acessa os planos preventivos (403 para técnico e solicitante)', async () => {
      await api().get('/api/planos').set(auth('tecnico')).expect(403);
      await api().get('/api/planos/alertas/vencendo').set(auth('solicitante')).expect(403);
    });
  });
});
