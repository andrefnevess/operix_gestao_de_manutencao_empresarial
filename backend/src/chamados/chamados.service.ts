import { Injectable } from '@nestjs/common';
import { NaoEncontradoError } from '../common/erros';
import { Relogio, novoId } from '../common/relogio';
import { Chamado, Usuario } from '../domain';
import { EquipamentosService } from '../equipamentos/equipamentos.service';
import { ChamadoRepository } from './chamado.repository';
import { AbrirChamadoDto } from './dto/chamado.dto';

/** Casos de uso de chamados (UH04). */
@Injectable()
export class ChamadosService {
  constructor(
    private readonly repositorio: ChamadoRepository,
    private readonly equipamentos: EquipamentosService,
    private readonly relogio: Relogio,
  ) {}

  async abrir(solicitante: Usuario, dto: AbrirChamadoDto): Promise<Chamado> {
    const equipamento = await this.equipamentos.buscar(dto.equipamentoId);
    const chamado = Chamado.abrir(
      novoId(),
      solicitante,
      equipamento,
      dto.descricao,
      dto.urgencia,
      this.relogio.agora(),
    );
    await this.repositorio.salvar(chamado);
    return chamado;
  }

  listar(): Promise<Chamado[]> {
    return this.repositorio.listar();
  }

  async buscar(id: string): Promise<Chamado> {
    const chamado = await this.repositorio.buscarPorId(id);
    if (!chamado) throw new NaoEncontradoError('Chamado não encontrado.');
    return chamado;
  }

  async cancelar(id: string): Promise<Chamado> {
    const chamado = await this.buscar(id);
    chamado.cancelar();
    await this.repositorio.salvar(chamado);
    return chamado;
  }
}