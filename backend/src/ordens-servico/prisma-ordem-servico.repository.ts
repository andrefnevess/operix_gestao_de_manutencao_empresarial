import { Injectable } from '@nestjs/common';
import {
  Chamado, Equipamento, Manutencao, OrdemServico, PlanoPreventivo,
  Perfil, Prioridade, StatusChamado, StatusEquipamento, StatusOS,
  TipoManutencao, Usuario,
} from '../domain';
import { Tecnico } from '../domain';
import { novoId } from '../common/relogio';
import { PrismaService } from '../infra/prisma.service';
import { OrdemServicoRepository } from './ordem-servico.repository';

const INCLUDE_COMPLETO = {
  equipamento: true,
  tecnico: true,
  chamado: { include: { solicitante: true, equipamento: true } },
  plano: { include: { equipamento: true } },
  manutencao: { include: { equipamento: true, tecnico: true, plano: { include: { equipamento: true } } } },
};

@Injectable()
export class PrismaOrdemServicoRepository extends OrdemServicoRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async salvar(ordem: OrdemServico): Promise<OrdemServico> {
    const dados = {
      prioridade: ordem.getPrioridade(),
      status: ordem.getStatus(),
      dataPrevista: ordem.getDataPrevista(),
      motivoCancelamento: ordem.getMotivoCancelamento(),
      equipamentoId: ordem.getEquipamento().getId(),
      tecnicoId: ordem.getTecnico()?.getId() ?? null,
      chamadoId: ordem.getChamado()?.getId() ?? null,
      planoId: ordem.getPlano()?.getId() ?? null,
    };

    await this.prisma.$transaction(async (tx) => {
      // Salva a OS
      await tx.ordemServico.upsert({
        where: { id: ordem.getId() },
        create: { id: ordem.getId(), criadaEm: ordem.getCriadaEm(), ...dados },
        update: dados,
      });

      // Salva a manutenção se existir
      const m = ordem.getManutencao();
      if (m) {
        const dadosM = {
          tipo: m.getTipo(),
          descricaoServico: m.getDescricaoServico(),
          tempoGastoMin: m.getTempoGastoMin(),
          realizadaEm: m.getRealizadaEm(),
          ordemServicoId: ordem.getId(),
          equipamentoId: m.getEquipamento().getId(),
          tecnicoId: m.getTecnico().getId(),
          planoId: ordem.getPlano()?.getId() ?? null,
        };
        await tx.manutencao.upsert({
          where: { ordemServicoId: ordem.getId() },
          create: { id: novoId(), ...dadosM },
          update: dadosM,
        });
      }

      // Salva o chamado (efeito colateral: status muda junto)
      const chamado = ordem.getChamado();
      if (chamado) {
        await tx.chamado.update({
          where: { id: chamado.getId() },
          data: { status: chamado.getStatus() },
        });
      }

      // Salva o equipamento (efeito colateral: status EM_MANUTENCAO / ATIVO)
      await tx.equipamento.update({
        where: { id: ordem.getEquipamento().getId() },
        data: { status: ordem.getEquipamento().getStatus() },
      });

      // Salva o plano (efeito colateral: ultimaExecucao atualizada)
      const plano = ordem.getPlano();
      if (plano) {
        await tx.planoPreventivo.update({
          where: { id: plano.getId() },
          data: { ultimaExecucao: plano.getUltimaExecucao() },
        });
      }
    });

    return ordem;
  }

  async buscarPorId(id: string): Promise<OrdemServico | null> {
    const linha = await this.prisma.ordemServico.findUnique({
      where: { id },
      include: INCLUDE_COMPLETO,
    });
    return linha ? this.paraDominio(linha) : null;
  }

  async listar(): Promise<OrdemServico[]> {
    const linhas = await this.prisma.ordemServico.findMany({
      include: INCLUDE_COMPLETO,
      orderBy: { criadaEm: 'asc' },
    });
    return linhas.map((l) => this.paraDominio(l));
  }

  private paraDominio(l: any): OrdemServico {
    const equipamento = this.reconstituirEquipamento(l.equipamento);

    const tecnico = l.tecnico
      ? (Usuario.criar(l.tecnico.perfil as Perfil, {
          id: l.tecnico.id, nome: l.tecnico.nome, email: l.tecnico.email,
          senhaHash: l.tecnico.senhaHash, ativo: l.tecnico.ativo,
          especialidades: l.tecnico.especialidades,
          tentativasFalhas: l.tecnico.tentativasFalhas, bloqueadoAte: l.tecnico.bloqueadoAte,
        }) as Tecnico)
      : null;

    let chamado: Chamado | null = null;
    if (l.chamado) {
      const solicitante = Usuario.criar(l.chamado.solicitante.perfil as Perfil, {
        id: l.chamado.solicitante.id, nome: l.chamado.solicitante.nome,
        email: l.chamado.solicitante.email, senhaHash: l.chamado.solicitante.senhaHash,
        ativo: l.chamado.solicitante.ativo, especialidades: l.chamado.solicitante.especialidades,
        tentativasFalhas: l.chamado.solicitante.tentativasFalhas, bloqueadoAte: l.chamado.solicitante.bloqueadoAte,
      });
      const eqChamado = this.reconstituirEquipamento(l.chamado.equipamento);
      chamado = Chamado.reconstituir({
        id: l.chamado.id, solicitante, equipamento: eqChamado,
        descricao: l.chamado.descricao, urgencia: l.chamado.urgencia as Prioridade,
        status: l.chamado.status as StatusChamado, abertoEm: l.chamado.abertoEm,
      });
    }

    let plano: PlanoPreventivo | null = null;
    if (l.plano) {
      const eqPlano = this.reconstituirEquipamento(l.plano.equipamento);
      plano = PlanoPreventivo.reconstituir({
        id: l.plano.id, equipamento: eqPlano, descricao: l.plano.descricao,
        periodicidadeDias: l.plano.periodicidadeDias,
        ultimaExecucao: l.plano.ultimaExecucao, ativo: l.plano.ativo,
      });
    }

    let manutencao: Manutencao | null = null;
    if (l.manutencao) {
      const eqM = this.reconstituirEquipamento(l.manutencao.equipamento);
      const tecM = Usuario.criar(l.manutencao.tecnico.perfil as Perfil, {
        id: l.manutencao.tecnico.id, nome: l.manutencao.tecnico.nome,
        email: l.manutencao.tecnico.email, senhaHash: l.manutencao.tecnico.senhaHash,
        ativo: l.manutencao.tecnico.ativo, especialidades: l.manutencao.tecnico.especialidades,
        tentativasFalhas: l.manutencao.tecnico.tentativasFalhas, bloqueadoAte: l.manutencao.tecnico.bloqueadoAte,
      }) as Tecnico;
      let planoM: PlanoPreventivo | null = null;
      if (l.manutencao.plano) {
        const eqPM = this.reconstituirEquipamento(l.manutencao.plano.equipamento);
        planoM = PlanoPreventivo.reconstituir({
          id: l.manutencao.plano.id, equipamento: eqPM, descricao: l.manutencao.plano.descricao,
          periodicidadeDias: l.manutencao.plano.periodicidadeDias,
          ultimaExecucao: l.manutencao.plano.ultimaExecucao, ativo: l.manutencao.plano.ativo,
        });
      }
      manutencao = Manutencao.reconstituir({
        tipo: l.manutencao.tipo as TipoManutencao, equipamento: eqM, tecnico: tecM,
        descricaoServico: l.manutencao.descricaoServico, tempoGastoMin: l.manutencao.tempoGastoMin,
        realizadaEm: l.manutencao.realizadaEm, plano: planoM,
      });
    }

    return OrdemServico.reconstituir({
      id: l.id, equipamento, prioridade: l.prioridade as Prioridade,
      chamado, plano, status: l.status as StatusOS, tecnico, dataPrevista: l.dataPrevista,
      manutencao, motivoCancelamento: l.motivoCancelamento, criadaEm: l.criadaEm,
    });
  }

  private reconstituirEquipamento(e: any): Equipamento {
    return Equipamento.reconstituir({
      id: e.id, codigo: e.codigo, nome: e.nome, tipo: e.tipo,
      localizacao: e.localizacao, fabricante: e.fabricante,
      modelo: e.modelo, dataAquisicao: e.dataAquisicao,
      status: e.status as StatusEquipamento,
    });
  }
}
