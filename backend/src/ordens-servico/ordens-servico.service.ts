import { Injectable } from '@nestjs/common';
import { NaoEncontradoError } from '../common/erros';
import { Relogio, novoId } from '../common/relogio';
import { Gestor, OrdemServico, Tecnico, Usuario } from '../domain';
import { ChamadosService } from '../chamados/chamados.service';
import { UsuariosService } from '../usuarios/usuarios.service';
import { OrdemServicoRepository } from './ordem-servico.repository';
import { AtribuirOrdemDto, ConcluirOrdemDto } from './dto/ordem-servico.dto'; 

@Injectable()
export class OrdensServicoService {
  constructor(
    private readonly repositorio: OrdemServicoRepository,
    private readonly chamados: ChamadosService,
    private readonly usuarios: UsuariosService,
    private readonly relogio: Relogio,
  ) {}

  async gerar(chamadoId: string): Promise<OrdemServico> {
    const chamado = await this.chamados.buscar(chamadoId);
    const ordem = OrdemServico.aPartirDeChamado(novoId(), chamado);
    await this.repositorio.salvar(ordem);
    return ordem;
  }

  async listar(usuario: Usuario): Promise<OrdemServico[]> {
    const todas = await this.repositorio.listar();
    if (usuario instanceof Tecnico) {
      return todas.filter((o) => o.getTecnico()?.getId() === usuario.getId());
    }
    return todas;
  }

  async buscar(id: string): Promise<OrdemServico> {
    const ordem = await this.repositorio.buscarPorId(id);
    if (!ordem) throw new NaoEncontradoError('Ordem de serviço não encontrada.');
    return ordem;
  }

  async atribuir(gestor: Usuario, id: string, dto: AtribuirOrdemDto): Promise<OrdemServico> {
    const ordem = await this.buscar(id);
    const tecnico = await this.usuarios.buscar(dto.tecnicoId);
    ordem.atribuir(gestor as Gestor, tecnico as Tecnico, new Date(dto.dataPrevista));
    await this.repositorio.salvar(ordem);
    return ordem;
  }

  async iniciar(tecnico: Usuario, id: string): Promise<OrdemServico> {
    const ordem = await this.buscar(id);
    ordem.iniciar(tecnico as Tecnico);
    await this.repositorio.salvar(ordem);
    return ordem;
  }

  async concluir(tecnico: Usuario, id: string, dto: ConcluirOrdemDto): Promise<OrdemServico> {
    const ordem = await this.buscar(id);
    ordem.concluir(tecnico as Tecnico, dto.descricaoServico, dto.tempoGastoMin, this.relogio.agora());
    await this.repositorio.salvar(ordem);
    return ordem;
  }

  async cancelar(gestor: Usuario, id: string, motivo: string): Promise<OrdemServico> {
    const ordem = await this.buscar(id);
    ordem.cancelar(gestor as Gestor, motivo);
    await this.repositorio.salvar(ordem);
    return ordem;
  }
}