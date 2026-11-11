import { Injectable } from '@nestjs/common';
import { NaoEncontradoError } from '../common/erros';
import { Relogio, novoId } from '../common/relogio';
import { OrdemServico, PlanoPreventivo } from '../domain';
import { EquipamentosService } from '../equipamentos/equipamentos.service';
import { OrdemServicoRepository } from '../ordens-servico/ordem-servico.repository';
import { CriarPlanoDto } from './dto/plano.dto';
import { PlanoRepository } from './plano.repository';

@Injectable()
export class PlanosService {
constructor(
private readonly repositorio: PlanoRepository,
private readonly equipamentos: EquipamentosService,
private readonly ordens: OrdemServicoRepository,
private readonly relogio: Relogio,
) {}

async criar(dto: CriarPlanoDto): Promise<PlanoPreventivo> {
const equipamento = await this.equipamentos.buscar(dto.equipamentoId);
const plano = PlanoPreventivo.criar(
novoId(),
equipamento,
dto.descricao,
dto.periodicidadeDias,
new Date(dto.inicio),
);
await this.repositorio.salvar(plano);
return plano;
}

listar(): Promise<PlanoPreventivo[]> {
return this.repositorio.listar();
}

async buscar(id: string): Promise<PlanoPreventivo> {
const plano = await this.repositorio.buscarPorId(id);
if (!plano) throw new NaoEncontradoError('Plano preventivo não encontrado.');
return plano;
}

/** Planos que vencem nos próximos 7 dias (UH07-CA04). */
async vencendo(dias = 7): Promise<PlanoPreventivo[]> {
const hoje = this.relogio.agora();
return (await this.repositorio.listar()).filter((p) => p.venceEmAte(dias, hoje));
}

/** Planos que passaram da data prevista (UH07-CA05). */
async atrasados(): Promise<PlanoPreventivo[]> {
const hoje = this.relogio.agora();
return (await this.repositorio.listar()).filter((p) => p.estaAtrasado(hoje));
}

/** Gera a ordem de serviço da preventiva a partir do plano (UH07-CA06). */
async gerarOrdem(id: string): Promise<OrdemServico> {
const plano = await this.buscar(id);
const ordem = OrdemServico.aPartirDePlano(novoId(), plano);
await this.ordens.salvar(ordem);
return ordem;
}
}