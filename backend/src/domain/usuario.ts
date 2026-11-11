import { Perfil } from './enums';
import { exigir, texto } from './regra-de-negocio.error';

/** Abstração da verificação de senha. A implementação (bcrypt) fica na infraestrutura. */
export interface VerificadorDeSenha {
  comparar(senha: string, hash: string): boolean;
}

export interface DadosUsuario {
  id: string;
  nome: string;
  email: string;
  senhaHash: string;
  ativo: boolean;
  tentativasFalhas: number;
  bloqueadoAte: Date | null;
  especialidades?: string[];
}

/**
 * Usuário do sistema. Classe abstrata: só existem os perfis concretos
 * (Administrador, Gestor, Tecnico e Solicitante).
 *
 * As permissões são métodos polimórficos: cada subclasse responde do seu jeito,
 * e o restante do sistema pergunta ao objeto em vez de testar o perfil.
 */
export abstract class Usuario {
  static readonly MAX_TENTATIVAS = 5;
  static readonly MINUTOS_BLOQUEIO = 15;

  private readonly id: string;
  private nome: string;
  private email: string;
  private senhaHash: string;
  private ativo: boolean;
  private tentativasFalhas: number;
  private bloqueadoAte: Date | null;

  protected constructor(dados: DadosUsuario) {
    this.id = dados.id;
    this.nome = Usuario.validarNome(dados.nome);
    this.email = Usuario.validarEmail(dados.email);
    exigir(texto(dados.senhaHash).length > 0, 'A senha é obrigatória.');
    this.senhaHash = dados.senhaHash;
    this.ativo = dados.ativo;
    this.tentativasFalhas = dados.tentativasFalhas;
    this.bloqueadoAte = dados.bloqueadoAte;
  }

  abstract getPerfil(): Perfil;

  // Permissões (polimorfismo). Por padrão, nenhuma; cada perfil libera as suas.
  podeGerenciarUsuarios(): boolean {
    return false;
  }
  podeGerenciarEquipamentos(): boolean {
    return false;
  }
  podeAbrirChamado(): boolean {
    return false;
  }
  podeGerenciarOrdens(): boolean {
    return false;
  }
  podeExecutarOrdens(): boolean {
    return false;
  }

  /**
   * Autentica o usuário (UH01).
   * - Usuário inativo nunca autentica (RN02 / UH01-CA04).
   * - Após 5 tentativas sem sucesso, o acesso fica bloqueado por 15 minutos (UH01-CA05).
   */
  autenticar(senha: string, verificador: VerificadorDeSenha, agora: Date): boolean {
    if (!this.ativo || this.estaBloqueado(agora)) {
      return false;
    }
    if (verificador.comparar(senha, this.senhaHash)) {
      this.tentativasFalhas = 0;
      this.bloqueadoAte = null;
      return true;
    }
    this.tentativasFalhas += 1;
    if (this.tentativasFalhas >= Usuario.MAX_TENTATIVAS) {
      this.bloqueadoAte = new Date(agora.getTime() + Usuario.MINUTOS_BLOQUEIO * 60_000);
      this.tentativasFalhas = 0;
    }
    return false;
  }

  estaBloqueado(agora: Date): boolean {
    return this.bloqueadoAte !== null && this.bloqueadoAte.getTime() > agora.getTime();
  }

  atualizarDados(nome: string, email: string): void {
    this.nome = Usuario.validarNome(nome);
    this.email = Usuario.validarEmail(email);
  }

  alterarSenha(novoHash: string): void {
    exigir(texto(novoHash).length > 0, 'A senha é obrigatória.');
    this.senhaHash = novoHash;
  }

  /** Usuários são inativados, nunca excluídos, para preservar o histórico (UH02-CA05). */
  inativar(): void {
    this.ativo = false;
  }

  reativar(): void {
    this.ativo = true;
  }

  estaAtivo(): boolean {
    return this.ativo;
  }

  getId(): string {
    return this.id;
  }
  getNome(): string {
    return this.nome;
  }
  getEmail(): string {
    return this.email;
  }
  getSenhaHash(): string {
    return this.senhaHash;
  }
  getTentativasFalhas(): number {
    return this.tentativasFalhas;
  }
  getBloqueadoAte(): Date | null {
    return this.bloqueadoAte;
  }

  /** Cria o objeto da subclasse correta a partir do perfil (fábrica). */
  static criar(perfil: Perfil, dados: DadosUsuario): Usuario {
    switch (perfil) {
      case Perfil.ADMINISTRADOR:
        return new Administrador(dados);
      case Perfil.GESTOR:
        return new Gestor(dados);
      case Perfil.TECNICO:
        return new Tecnico(dados);
      case Perfil.SOLICITANTE:
        return new Solicitante(dados);
    }
  }

  private static validarNome(nome: string): string {
    const valor = texto(nome);
    exigir(valor.length >= 2, 'O nome é obrigatório.');
    return valor;
  }

  private static validarEmail(email: string): string {
    const valor = texto(email).toLowerCase();
    exigir(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor), 'Informe um e-mail válido.');
    return valor;
  }
}

export class Administrador extends Usuario {
  constructor(dados: DadosUsuario) {
    super(dados);
  }
  getPerfil(): Perfil {
    return Perfil.ADMINISTRADOR;
  }
  override podeGerenciarUsuarios(): boolean {
    return true;
  }
}

export class Gestor extends Usuario {
  constructor(dados: DadosUsuario) {
    super(dados);
  }
  getPerfil(): Perfil {
    return Perfil.GESTOR;
  }
  override podeGerenciarEquipamentos(): boolean {
    return true;
  }
  override podeAbrirChamado(): boolean {
    return true;
  }
  override podeGerenciarOrdens(): boolean {
    return true;
  }
}

export class Tecnico extends Usuario {
  private especialidades: string[];

  constructor(dados: DadosUsuario) {
    super(dados);
    this.especialidades = Tecnico.normalizar(dados.especialidades ?? []);
  }
  getPerfil(): Perfil {
    return Perfil.TECNICO;
  }
  override podeExecutarOrdens(): boolean {
    return true;
  }
  getEspecialidades(): string[] {
    return [...this.especialidades];
  }
  definirEspecialidades(especialidades: string[]): void {
    this.especialidades = Tecnico.normalizar(especialidades);
  }
  private static normalizar(lista: string[]): string[] {
    return [...new Set(lista.map((e) => texto(e)).filter((e) => e.length > 0))];
  }
}

export class Solicitante extends Usuario {
  constructor(dados: DadosUsuario) {
    super(dados);
  }
  getPerfil(): Perfil {
    return Perfil.SOLICITANTE;
  }
  override podeAbrirChamado(): boolean {
    return true;
  }
}
