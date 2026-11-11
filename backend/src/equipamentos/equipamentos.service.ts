import { Injectable } from '@nestjs/common';
import { ConflitoError, NaoEncontradoError } from '../common/erros';
import { novoId } from '../common/relogio';
import { CamposEditaveisEquipamento, Equipamento } from '../domain';
import { SalvarEquipamentoDto } from './dto/equipamento.dto';
import { EquipamentoRepository } from './equipamento.repository';

/** Casos de uso de equipamentos (UH03). */
@Injectable()
export class EquipamentosService {
  constructor(private readonly repositorio: EquipamentoRepository) {}

  async criar(dto: SalvarEquipamentoDto): Promise<Equipamento> {
    const campos = this.campos(dto);
    await this.garantirCodigoLivre(campos.codigo);
    const equipamento = Equipamento.novo(novoId(), campos);
    await this.repositorio.salvar(equipamento);
    return equipamento;
  }

  listar(busca?: string): Promise<Equipamento[]> {
    return this.repositorio.listar(busca);
  }

  async buscar(id: string): Promise<Equipamento> {
    const equipamento = await this.repositorio.buscarPorId(id);
    if (!equipamento) throw new NaoEncontradoError('Equipamento não encontrado.');
    return equipamento;
  }

  async atualizar(id: string, dto: SalvarEquipamentoDto): Promise<Equipamento> {
    const equipamento = await this.buscar(id);
    const campos = this.campos(dto);
    await this.garantirCodigoLivre(campos.codigo, id);
    equipamento.atualizar(campos);
    await this.repositorio.salvar(equipamento);
    return equipamento;
  }

  async inativar(id: string): Promise<Equipamento> {
    const equipamento = await this.buscar(id);
    equipamento.inativar();
    await this.repositorio.salvar(equipamento);
    return equipamento;
  }

  async reativar(id: string): Promise<Equipamento> {
    const equipamento = await this.buscar(id);
    equipamento.reativar();
    await this.repositorio.salvar(equipamento);
    return equipamento;
  }

  /** O código do equipamento é único (RN01 / UH03-CA02). */
  private async garantirCodigoLivre(codigo: string, idAtual?: string): Promise<void> {
    const existente = await this.repositorio.buscarPorCodigo(codigo);
    if (existente && existente.getId() !== idAtual) {
      throw new ConflitoError(`Já existe um equipamento com o código ${existente.getCodigo()}.`);
    }
  }

  private campos(dto: SalvarEquipamentoDto): CamposEditaveisEquipamento {
    return {
      codigo: (dto.codigo ?? '').trim().toUpperCase(),
      nome: dto.nome,
      tipo: dto.tipo,
      localizacao: dto.localizacao,
      fabricante: dto.fabricante ?? null,
      modelo: dto.modelo ?? null,
      dataAquisicao: dto.dataAquisicao ? new Date(dto.dataAquisicao) : null,
    };
  }
}
