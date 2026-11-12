import { Injectable } from '@nestjs/common';
import { Relogio } from '../common/relogio';
import { StatusOS, TipoManutencao } from '../domain';
import { EquipamentosService } from '../equipamentos/equipamentos.service';
import { OrdemServicoRepository } from '../ordens-servico/ordem-servico.repository';
import { PlanoRepository } from '../planos/plano.repository';
import { IndicadoresResposta, ManutencaoResposta } from './dto/historico.dto';

@Injectable()
export class HistoricoService {
  constructor(
    private readonly ordens: OrdemServicoRepository,
    private readonly planos: PlanoRepository,
    private readonly equipamentos: EquipamentosService,
    private readonly relogio: Relogio,
  ) {}

  /** Histórico do equipamento em ordem cronológica, com filtros (UH08-CA01 a CA03). */
  async historico(equipamentoId: string, tipo?: TipoManutencao, de?: string, ate?: string): Promise<ManutencaoResposta[]> {
    await this.equipamentos.buscar(equipamentoId);
    // "ate=2026-11-11" sem hora significa o dia inteiro: sem isso o filtro vira 00:00
    // e descarta as manutenções do próprio dia 11 (DEF-12).
    const soData = (valor: string): boolean => /^\d{4}-\d{2}-\d{2}$/.test(valor);
    const inicio = de ? new Date(de).getTime() : null;
    const fim = ate ? new Date(soData(ate) ? `${ate}T23:59:59.999Z` : ate).getTime() : null;

    return (await this.ordens.listar())
      .filter((o) => o.getEquipamento().getId() === equipamentoId && o.getManutencao() !== null)
      .map((o) => ManutencaoResposta.de(o.getId(), o.getManutencao()!))
      .filter((m) => !tipo || m.tipo === tipo)
      .filter((m) => inicio === null || m.data.getTime() >= inicio)
      .filter((m) => fim === null || m.data.getTime() <= fim)
      .sort((a, b) => a.data.getTime() - b.data.getTime());
  }

  /** Painel de indicadores (UH08-CA04 a CA06). */
  async indicadores(): Promise<IndicadoresResposta> {
    const hoje = this.relogio.agora();
    const ordens = await this.ordens.listar();

    const ordensPorStatus: Record<string, number> = {};
    for (const status of Object.values(StatusOS)) ordensPorStatus[status] = 0;
    for (const o of ordens) ordensPorStatus[o.getStatus()] += 1;

    const ordensAtrasadas = ordens.filter((o) => o.estaAtrasada(hoje)).length;
    const preventivasAtrasadas = (await this.planos.listar()).filter((p) => p.estaAtrasado(hoje)).length;

    const contagem = new Map<string, { codigo: string; corretivas: number }>();
    for (const o of ordens) {
      const m = o.getManutencao();
      if (m && m.getTipo() === TipoManutencao.CORRETIVA) {
        const eq = o.getEquipamento();
        const atual = contagem.get(eq.getId()) ?? { codigo: eq.getCodigo(), corretivas: 0 };
        atual.corretivas += 1;
        contagem.set(eq.getId(), atual);
      }
    }
    const equipamentosMaisCorretivas = [...contagem.entries()]
      .map(([equipamentoId, v]) => ({ equipamentoId, ...v }))
      .sort((a, b) => b.corretivas - a.corretivas)
      .slice(0, 5);

    return { ordensPorStatus, ordensAtrasadas, preventivasAtrasadas, equipamentosMaisCorretivas };
  }
}