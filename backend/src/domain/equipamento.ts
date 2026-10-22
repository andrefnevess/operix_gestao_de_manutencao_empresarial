import { StatusEquipamento } from './enums';
import { exigir, texto } from './regra-de-negocio.error';

export interface DadosEquipamento {
  id: string;
  codigo: string;
  nome: string;
  tipo: string;
  localizacao: string;
  fabricante?: string | null;
  modelo?: string | null;
  dataAquisicao?: Date | null;
  status: StatusEquipamento;
}

export type CamposEditaveisEquipamento = Omit<DadosEquipamento, 'id' | 'status'>;

/**
 * Bem que recebe manutenção (UH03). O status só muda pelos métodos da própria classe,
 * em resposta ao ciclo da ordem de serviço ou a uma decisão do gestor.
 */
export class Equipamento {
  private readonly id: string;
  private codigo: string;
  private nome: string;
  private tipo: string;
  private localizacao: string;
  private fabricante: string | null;
  private modelo: string | null;
  private dataAquisicao: Date | null;
  private status: StatusEquipamento;

  private constructor(dados: DadosEquipamento) {
    this.id = dados.id;
    this.status = dados.status;
    this.aplicar(dados);
  }

  /** Novo equipamento começa sempre ATIVO (UH03-CA05). */
  static novo(id: string, campos: CamposEditaveisEquipamento): Equipamento {
    return new Equipamento({ ...campos, id, status: StatusEquipamento.ATIVO });
  }

  static reconstituir(dados: DadosEquipamento): Equipamento {
    return new Equipamento(dados);
  }

  atualizar(campos: CamposEditaveisEquipamento): void {
    this.aplicar(campos);
  }

  estaAtivo(): boolean {
    return this.status === StatusEquipamento.ATIVO;
  }

  colocarEmManutencao(): void {
    exigir(this.status === StatusEquipamento.ATIVO, 'Só um equipamento ativo pode entrar em manutenção.');
    this.status = StatusEquipamento.EM_MANUTENCAO;
  }

  liberar(): void {
    exigir(this.status === StatusEquipamento.EM_MANUTENCAO, 'O equipamento não está em manutenção.');
    this.status = StatusEquipamento.ATIVO;
  }

  inativar(): void {
    exigir(
      this.status !== StatusEquipamento.EM_MANUTENCAO,
      'Não é possível inativar um equipamento que está em manutenção.',
    );
    this.status = StatusEquipamento.INATIVO;
  }

  reativar(): void {
    exigir(this.status === StatusEquipamento.INATIVO, 'O equipamento já está ativo.');
    this.status = StatusEquipamento.ATIVO;
  }

  /** Usado na busca da listagem (UH03-CA06). */
  corresponde(busca: string): boolean {
    const termo = texto(busca).toLowerCase();
    if (!termo) return true;
    return [this.codigo, this.nome, this.tipo, this.localizacao].some((v) => v.toLowerCase().includes(termo));
  }

  getId(): string {
    return this.id;
  }
  getCodigo(): string {
    return this.codigo;
  }
  getNome(): string {
    return this.nome;
  }
  getTipo(): string {
    return this.tipo;
  }
  getLocalizacao(): string {
    return this.localizacao;
  }
  getFabricante(): string | null {
    return this.fabricante;
  }
  getModelo(): string | null {
    return this.modelo;
  }
  getDataAquisicao(): Date | null {
    return this.dataAquisicao;
  }
  getStatus(): StatusEquipamento {
    return this.status;
  }

  /** Campos obrigatórios: código, nome, tipo e localização (UH03-CA01). */
  private aplicar(campos: CamposEditaveisEquipamento): void {
    const codigo = texto(campos.codigo).toUpperCase();
    const nome = texto(campos.nome);
    const tipo = texto(campos.tipo);
    const localizacao = texto(campos.localizacao);
    exigir(codigo.length > 0, 'O código é obrigatório.', 'UH03-CA01');
    exigir(nome.length > 0, 'O nome é obrigatório.', 'UH03-CA01');
    exigir(tipo.length > 0, 'O tipo é obrigatório.', 'UH03-CA01');
    exigir(localizacao.length > 0, 'A localização é obrigatória.', 'UH03-CA01');
    this.codigo = codigo;
    this.nome = nome;
    this.tipo = tipo;
    this.localizacao = localizacao;
    this.fabricante = texto(campos.fabricante) || null;
    this.modelo = texto(campos.modelo) || null;
    this.dataAquisicao = campos.dataAquisicao ?? null;
  }
}
