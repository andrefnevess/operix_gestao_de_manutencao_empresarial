import { OrdemServico } from '../domain';

export abstract class OrdemServicoRepository {
abstract salvar(ordem: OrdemServico): Promise<OrdemServico>;
abstract buscarPorId(id: string): Promise<OrdemServico | null>;
abstract listar(): Promise<OrdemServico[]>;
}